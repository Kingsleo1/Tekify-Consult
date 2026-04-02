import express from "express";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";
import cors from "cors";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { TEKIFY_SERVICES } from "./services/pricingService";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("--- SERVER INITIALIZING ---");
console.log("Time:", new Date().toISOString());
console.log("Platform:", process.platform);
console.log("Node Version:", process.version);

// Initialize Supabase lazily
let supabase: any = null;
const getSupabase = () => {
  if (!supabase) {
    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "";
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
    if (!supabaseUrl || !supabaseKey) {
      console.error("CRITICAL: Supabase environment variables are missing on the server.");
    }
    let validUrl = "https://placeholder.supabase.co";
    if (supabaseUrl) {
      if (supabaseUrl.startsWith("http")) {
        validUrl = supabaseUrl;
      } else if (supabaseUrl.includes(".")) {
        validUrl = `https://${supabaseUrl}`;
      } else {
        validUrl = `https://${supabaseUrl}.supabase.co`;
      }
    }
    supabase = createClient(validUrl, supabaseKey || "placeholder");
  }
  return supabase;
};

// Initialize Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

const app = express();

app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// --- API ROUTES ---

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Debug Customers
app.get("/api/debug/customers", async (req, res) => {
  try {
    const { data, error } = await getSupabase().from('tekify_customers').select('*');
    res.json({ data, error });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/api/debug/insert", async (req, res) => {
  try {
    const { data, error } = await getSupabase().from('tekify_bookings').insert([{
      customer_id: '3c9da58d-9fd4-412c-9fd1-391dcec02c77',
      service_id: 'dm-foundation',
      notes: 'Test booking'
    }]).select();
    res.json({ data, error });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/api/debug/columns", async (req, res) => {
  try {
    // Supabase JS client doesn't support querying information_schema directly.
    // Let's try to use RPC or just fetch a single row to see what's there.
    const { data, error } = await getSupabase().from('tekify_customers').select('*').limit(1);
    res.json({ data, error });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// Services Catalog
app.get("/api/services", (req, res) => {
  res.json(TEKIFY_SERVICES);
});

// Create Booking
app.post("/api/bookings", async (req, res) => {
    const { customer, serviceId, notes } = req.body;

    try {
      // 1. Find or Create Customer
      const { data: existingCustomers, error: findError } = await getSupabase()
        .from("tekify_customers")
        .select("id")
        .ilike("email", customer.email.trim())
        .limit(1);

      if (findError) {
        console.error("Find Customer Error:", findError);
      }

      let customerId;
      if (existingCustomers && existingCustomers.length > 0) {
        customerId = existingCustomers[0].id;
      } else {
        // Generate a UUID to prevent null or duplicate id errors
        const customerToInsert = { 
          ...customer, 
          id: crypto.randomUUID(),
          email: customer.email.trim().toLowerCase() 
        };
        const { data: newCustomer, error: custError } = await getSupabase()
          .from("tekify_customers")
          .insert([customerToInsert])
          .select()
          .single();
        
        if (custError) {
          // If it failed because it was created in the meantime (race condition)
          if (custError.code === '23505') {
            const { data: retryCustomers } = await getSupabase()
              .from("tekify_customers")
              .select("id")
              .ilike("email", customer.email.trim())
              .limit(1);
            if (retryCustomers && retryCustomers.length > 0) {
              customerId = retryCustomers[0].id;
            } else {
              throw custError;
            }
          } else {
            throw custError;
          }
        } else {
          customerId = newCustomer.id;
        }
      }

      // 2. Create Booking
      const { data: booking, error: bookError } = await getSupabase()
        .from("tekify_bookings")
        .insert([{
          customer_id: customerId,
          service_id: serviceId,
          notes: notes,
          status: 'pending'
        }])
        .select()
        .single();

      if (bookError) throw bookError;

      // 3. Send Confirmation Email
      try {
        const mailOptions = {
          from: `"Tekify Consult" <${process.env.SMTP_USER || 'noreply@tekify.com'}>`,
          to: customer.email,
          subject: "Booking Request Received - Tekify Consult",
          text: `Hello ${customer.full_name},\n\nThank you for choosing Tekify Consult. We have received your booking request for ${serviceId}. Our team will review it and get back to you shortly.\n\nBest regards,\nTekify Consult Team`,
        };

        await transporter.sendMail(mailOptions);
      } catch (emailError) {
        console.error("Failed to send booking email:", emailError);
      }

      res.status(201).json(booking);
    } catch (error: any) {
      console.error("Booking Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Admin: Approve Booking & Create Invoice
  app.post("/api/admin/bookings/:id/invoice", async (req, res) => {
    const bookingId = req.params.id;
    const VAT_RATE = 0.075;

    try {
      // 1. Get Booking & Customer & Service Info
      const { data: booking, error: bError } = await getSupabase()
        .from("tekify_bookings")
        .select(`
          *,
          tekify_customers (*),
          tekify_services (*)
        `)
        .eq("id", bookingId)
        .single();

      if (bError || !booking) throw new Error("Booking not found");

      // 2. Create Invoice (Price Lock)
      const invoiceNumber = `INV-${Date.now()}`;
      const service = booking.tekify_services;
      if (!service) throw new Error("Service not found in database");

      const subtotal = Number(service.price);
      const taxAmount = subtotal * VAT_RATE;
      const totalAmount = subtotal + taxAmount;

      const { data: invoice, error: invError } = await getSupabase()
        .from("tekify_invoices")
        .insert([{
          invoice_number: invoiceNumber,
          customer_id: booking.customer_id,
          booking_id: bookingId,
          total_amount: totalAmount,
          tax_amount: taxAmount,
          status: 'unpaid',
          due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 7 days due
        }])
        .select()
        .single();

      if (invError) throw invError;

      // 3. Create Invoice Items (Snapshotting)
      const { error: itemError } = await getSupabase()
        .from("tekify_invoice_items")
        .insert([{
          invoice_id: invoice.id,
          service_id: service.id,
          service_name: service.name,
          unit_price: service.price,
          quantity: 1,
          total: service.price
        }]);

      if (itemError) throw itemError;

      // 4. Update Booking Status
      await getSupabase()
        .from("tekify_bookings")
        .update({ status: 'invoiced' })
        .eq("id", bookingId);

      // 5. Send Invoice Email
      try {
        const mailOptions = {
          from: `"Tekify Consult Invoicing" <${process.env.SMTP_USER || 'noreply@tekify.com'}>`,
          to: booking.tekify_customers.email,
          subject: `Invoice ${invoiceNumber} from Tekify Consult`,
          html: `
            <h1>Invoice ${invoiceNumber}</h1>
            <p>Hello ${booking.tekify_customers.full_name},</p>
            <p>Your invoice for <strong>${service.name}</strong> is ready.</p>
            <p>Subtotal: ₦${subtotal.toLocaleString()}</p>
            <p>VAT (7.5%): ₦${taxAmount.toLocaleString()}</p>
            <p><strong>Total Amount Due: ₦${totalAmount.toLocaleString()}</strong></p>
            <p>Please make payment to the provided bank details.</p>
            <br/>
            <p>Best regards,<br/>Tekify Consult</p>
          `,
        };

        await transporter.sendMail(mailOptions);
      } catch (emailError) {
        console.error("Failed to send invoice email:", emailError);
      }

      res.json(invoice);
    } catch (error: any) {
      console.error("Invoice Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Admin: Record Payment & Send Receipt
  app.post("/api/admin/invoices/:id/pay", async (req, res) => {
    const invoiceId = req.params.id;
    const { paymentMethod } = req.body;

    try {
      // 1. Get Invoice & Customer
      const { data: invoice, error: invError } = await getSupabase()
        .from("tekify_invoices")
        .select(`
          *,
          tekify_customers (*)
        `)
        .eq("id", invoiceId)
        .single();

      if (invError || !invoice) throw new Error("Invoice not found");

      // 2. Create Receipt
      const receiptNumber = `RCP-${Date.now()}`;
      const { data: receipt, error: recError } = await getSupabase()
        .from("tekify_receipts")
        .insert([{
          receipt_number: receiptNumber,
          invoice_id: invoiceId,
          payment_method: paymentMethod,
          amount_paid: invoice.total_amount
        }])
        .select()
        .single();

      if (recError) throw recError;

      // 3. Update Invoice Status
      await getSupabase()
        .from("tekify_invoices")
        .update({ status: 'paid', paid_at: new Date().toISOString() })
        .eq("id", invoiceId);

      // 4. Send Receipt Email
      try {
        const mailOptions = {
          from: `"Tekify Consult Receipts" <${process.env.SMTP_USER || 'noreply@tekify.com'}>`,
          to: invoice.tekify_customers.email,
          subject: `Receipt ${receiptNumber} from Tekify Consult`,
          html: `
            <h1>Payment Received</h1>
            <p>Hello ${invoice.tekify_customers.full_name},</p>
            <p>We have received your payment of ₦${Number(invoice.total_amount).toLocaleString()} for Invoice ${invoice.invoice_number}.</p>
            <p>Receipt Number: ${receiptNumber}</p>
            <br/>
            <p>Thank you for your business!<br/>Tekify Consult</p>
          `,
        };

        await transporter.sendMail(mailOptions);
      } catch (emailError) {
        console.error("Failed to send receipt email:", emailError);
      }

      res.json(receipt);
    } catch (error: any) {
      console.error("Payment Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // --- MANUAL INVOICE CREATION ---
  app.post("/api/admin/invoices", async (req, res) => {
    const { customerId, items, dueDate, additionalNote } = req.body;
    const VAT_RATE = 0.075;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Items array is required and must not be empty" });
    }

    try {
      const invoiceNumber = `INV-${Date.now()}`;
      const subtotal = items.reduce((acc: number, item: any) => acc + (item.unit_price * item.quantity), 0);
      const taxAmount = subtotal * VAT_RATE;
      const totalAmount = subtotal + taxAmount;

      const { data: invoice, error: invError } = await getSupabase()
        .from("tekify_invoices")
        .insert([{
          invoice_number: invoiceNumber,
          customer_id: customerId,
          total_amount: totalAmount,
          tax_amount: taxAmount,
          status: 'unpaid',
          due_date: dueDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          additional_note: additionalNote
        }])
        .select()
        .single();

      if (invError) throw invError;

      const invoiceItems = items.map((item: any) => ({
        invoice_id: invoice.id,
        service_id: item.service_id || null,
        service_name: item.service_name,
        unit_price: item.unit_price,
        quantity: item.quantity,
        total: item.unit_price * item.quantity
      }));

      const { error: itemError } = await getSupabase()
        .from("tekify_invoice_items")
        .insert(invoiceItems);

      if (itemError) throw itemError;

      res.json(invoice);
    } catch (error: any) {
      console.error("Manual Invoice Error:", error);
      
      // Check for Postgres not-null constraint violation on service_id
      if (error.code === '23502' && error.column === 'service_id') {
        return res.status(500).json({ 
          error: "Database Schema Error: Custom items require the 'service_id' column to be nullable. Please run the provided SQL command to fix this." 
        });
      }

      res.status(500).json({ error: error.message || "An unexpected error occurred" });
    }
  });

  // --- UPDATE INVOICE ---
  app.put("/api/admin/invoices/:id", async (req, res) => {
    const invoiceId = req.params.id;
    const { customerId, items, dueDate, additionalNote } = req.body;
    const VAT_RATE = 0.075;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Items array is required and must not be empty" });
    }

    try {
      const subtotal = items.reduce((acc: number, item: any) => acc + (item.unit_price * item.quantity), 0);
      const taxAmount = subtotal * VAT_RATE;
      const totalAmount = subtotal + taxAmount;

      // Update invoice record
      const { data: invoice, error: invError } = await getSupabase()
        .from("tekify_invoices")
        .update({
          customer_id: customerId,
          total_amount: totalAmount,
          tax_amount: taxAmount,
          due_date: dueDate,
          additional_note: additionalNote
        })
        .eq("id", invoiceId)
        .select()
        .single();

      if (invError) throw invError;

      // Delete existing items
      const { error: delError } = await getSupabase()
        .from("tekify_invoice_items")
        .delete()
        .eq("invoice_id", invoiceId);

      if (delError) throw delError;

      // Insert new items
      const invoiceItems = items.map((item: any) => ({
        invoice_id: invoiceId,
        service_id: item.service_id || null,
        service_name: item.service_name,
        unit_price: item.unit_price,
        quantity: item.quantity,
        total: item.unit_price * item.quantity
      }));

      const { error: itemError } = await getSupabase()
        .from("tekify_invoice_items")
        .insert(invoiceItems);

      if (itemError) throw itemError;

      res.json(invoice);
    } catch (error: any) {
      console.error("Update Invoice Error:", error);
      
      // Check for Postgres not-null constraint violation on service_id
      if (error.code === '23502' && error.column === 'service_id') {
        return res.status(500).json({ 
          error: "Database Schema Error: Custom items require the 'service_id' column to be nullable. Please run the provided SQL command to fix this." 
        });
      }

      res.status(500).json({ error: error.message || "An unexpected error occurred" });
    }
  });

  // --- MANUAL RECEIPT CREATION ---
  app.post("/api/admin/receipts", async (req, res) => {
    const { invoiceId, paymentMethod, amountPaid, additionalNote, additionalItems } = req.body;

    try {
      const receiptNumber = `RCP-${Date.now()}`;
      const { data: receipt, error: recError } = await getSupabase()
        .from("tekify_receipts")
        .insert([{
          receipt_number: receiptNumber,
          invoice_id: invoiceId,
          payment_method: paymentMethod,
          amount_paid: amountPaid,
          additional_note: additionalNote,
          additional_items: additionalItems || []
        }])
        .select()
        .single();

      if (recError) throw recError;

      // Update invoice status if fully paid
      const { data: invoice } = await getSupabase()
        .from("tekify_invoices")
        .select("total_amount")
        .eq("id", invoiceId)
        .single();

      if (invoice && amountPaid >= invoice.total_amount) {
        await getSupabase()
          .from("tekify_invoices")
          .update({ status: 'paid', paid_at: new Date().toISOString() })
          .eq("id", invoiceId);
      }

      // Send Receipt Email
      try {
        const { data: fullInvoice } = await getSupabase()
          .from("tekify_invoices")
          .select(`
            *,
            tekify_customers (*)
          `)
          .eq("id", invoiceId)
          .single();

        if (fullInvoice && fullInvoice.tekify_customers) {
          const mailOptions = {
            from: `"Tekify Consult Receipts" <${process.env.SMTP_USER || 'noreply@tekify.com'}>`,
            to: fullInvoice.tekify_customers.email,
            subject: `Receipt ${receiptNumber} from Tekify Consult`,
            html: `
              <h1>Payment Received</h1>
              <p>Hello ${fullInvoice.tekify_customers.full_name},</p>
              <p>We have received your payment of ₦${Number(amountPaid).toLocaleString()} for Invoice ${fullInvoice.invoice_number}.</p>
              <p>Receipt Number: ${receiptNumber}</p>
              ${additionalNote ? `<p><strong>Note:</strong> ${additionalNote}</p>` : ''}
              <br/>
              <p>Thank you for your business!<br/>Tekify Consult</p>
            `,
          };

          await transporter.sendMail(mailOptions);
        }
      } catch (emailError) {
        console.error("Failed to send manual receipt email:", emailError);
      }

      res.json(receipt);
    } catch (error: any) {
      console.error("Manual Receipt Error:", error);
      res.status(500).json({ error: error.message || "An unexpected error occurred" });
    }
  });

  // --- UPDATE RECEIPT ---
  app.put("/api/admin/receipts/:id", async (req, res) => {
    const receiptId = req.params.id;
    const { paymentMethod, amountPaid, additionalNote, additionalItems } = req.body;

    try {
      const { data: receipt, error: recError } = await getSupabase()
        .from("tekify_receipts")
        .update({
          payment_method: paymentMethod,
          amount_paid: amountPaid,
          additional_note: additionalNote,
          additional_items: additionalItems || []
        })
        .eq("id", receiptId)
        .select()
        .single();

      if (recError) throw recError;

      res.json(receipt);
    } catch (error: any) {
      console.error("Update Receipt Error:", error);
      res.status(500).json({ error: error.message || "An unexpected error occurred" });
    }
  });

  // --- LOGO PROXY ---
  app.get("/api/logo", async (req, res) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

    try {
      const response = await fetch("https://lh3.googleusercontent.com/d/19jz5FTeD_4ULC8yqiW8vtsN9Oox4CAKW", {
        signal: controller.signal
      });
      clearTimeout(timeout);

      if (!response.ok) throw new Error(`Failed to fetch logo: ${response.statusText}`);
      
      const buffer = await response.arrayBuffer();
      res.set("Content-Type", response.headers.get("content-type") || "image/jpeg");
      res.set("Cache-Control", "public, max-age=86400");
      res.send(Buffer.from(buffer));
    } catch (error: any) {
      clearTimeout(timeout);
      console.error("Logo proxy error:", error.message);
      // Fallback to a placeholder if the logo fails
      res.redirect("https://picsum.photos/seed/tekify/200/200");
    }
  });

async function startServer() {
  console.log("Starting server process...");
  console.log("NODE_ENV:", process.env.NODE_ENV);
  
  const PORT = parseInt(process.env.PORT || "3000", 10);
  console.log(`Configured to listen on port: ${PORT}`);

  // --- VITE MIDDLEWARE ---
  const isProd = process.env.NODE_ENV === "production" || process.env.VERCEL !== undefined;
  
  if (!isProd) {
    console.log("Running in DEVELOPMENT mode with Vite middleware");
    try {
      const { createServer: createViteServer } = await import("vite");
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    } catch (err: any) {
      console.error("Failed to load Vite middleware, falling back to static", err.message);
      const distPath = path.join(__dirname, "dist");
      if (fs.existsSync(distPath)) {
        app.use(express.static(distPath));
        app.get("*splat", (req, res) => {
          res.sendFile(path.join(distPath, "index.html"));
        });
      } else {
        app.get("*", (req, res) => {
          res.status(500).send("Server is in development mode but Vite failed to load and no production build (dist/) was found. Please run 'npm run build' or check server logs.");
        });
      }
    }
  } else {
    console.log("Running in PRODUCTION mode serving static files from /dist");
    // dist is in the root, server.js is in dist-server/
    const distPath = path.join(__dirname, "..", "dist");
    console.log("Static files path:", distPath);
    
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get("*splat", (req, res) => {
        const indexPath = path.join(distPath, "index.html");
        if (fs.existsSync(indexPath)) {
          res.sendFile(indexPath);
        } else {
          res.status(404).send("Production build found (dist/) but index.html is missing. Please check your build process.");
        }
      });
    } else {
      app.get("*", (req, res) => {
        res.status(500).send(`Production build directory not found at: ${distPath}. Please run 'npm run build' before starting the server in production mode.`);
      });
    }
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SUCCESS: Server is listening on 0.0.0.0:${PORT}`);
    console.log(`Health check available at http://0.0.0.0:${PORT}/api/health`);
  });
}

// Only start the server if not running on Vercel
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  startServer().catch(err => {
    console.error("FATAL: Failed to start server:", err);
    process.exit(1);
  });
}

export default app;

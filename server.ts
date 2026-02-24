import express from "express";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";
import cors from "cors";
import { TEKIFY_SERVICES } from "./services/pricingService";

// Initialize Supabase lazily
let supabase: any = null;
const getSupabase = () => {
  if (!supabase) {
    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "";
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
    if (!supabaseUrl || !supabaseKey) {
      console.error("CRITICAL: Supabase environment variables are missing on the server.");
    }
    supabase = createClient(supabaseUrl || "https://placeholder.supabase.co", supabaseKey || "placeholder");
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

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // --- API ROUTES ---

  // Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
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
      const { data: existingCustomer } = await getSupabase()
        .from("tekify_customers")
        .select("id")
        .eq("email", customer.email)
        .single();

      let customerId;
      if (existingCustomer) {
        customerId = existingCustomer.id;
      } else {
        const { data: newCustomer, error: custError } = await getSupabase()
          .from("tekify_customers")
          .insert([customer])
          .select()
          .single();
        if (custError) throw custError;
        customerId = newCustomer.id;
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
    const { customerId, items, dueDate } = req.body;
    const VAT_RATE = 0.075;

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
          due_date: dueDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
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
      res.status(500).json({ error: error.message });
    }
  });

  // --- UPDATE INVOICE ---
  app.put("/api/admin/invoices/:id", async (req, res) => {
    const invoiceId = req.params.id;
    const { customerId, items, dueDate } = req.body;
    const VAT_RATE = 0.075;

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
          due_date: dueDate
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
      res.status(500).json({ error: error.message });
    }
  });

  // --- MANUAL RECEIPT CREATION ---
  app.post("/api/admin/receipts", async (req, res) => {
    const { invoiceId, paymentMethod, amountPaid } = req.body;

    try {
      const receiptNumber = `RCP-${Date.now()}`;
      const { data: receipt, error: recError } = await getSupabase()
        .from("tekify_receipts")
        .insert([{
          receipt_number: receiptNumber,
          invoice_id: invoiceId,
          payment_method: paymentMethod,
          amount_paid: amountPaid
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
      res.status(500).json({ error: error.message });
    }
  });

  // --- UPDATE RECEIPT ---
  app.put("/api/admin/receipts/:id", async (req, res) => {
    const receiptId = req.params.id;
    const { paymentMethod, amountPaid } = req.body;

    try {
      const { data: receipt, error: recError } = await getSupabase()
        .from("tekify_receipts")
        .update({
          payment_method: paymentMethod,
          amount_paid: amountPaid
        })
        .eq("id", receiptId)
        .select()
        .single();

      if (recError) throw recError;

      res.json(receipt);
    } catch (error: any) {
      console.error("Update Receipt Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // --- LOGO PROXY ---
  app.get("/api/logo", async (req, res) => {
    try {
      const response = await fetch("https://lh3.googleusercontent.com/d/19jz5FTeD_4ULC8yqiW8vtsN9Oox4CAKW");
      if (!response.ok) throw new Error("Failed to fetch logo");
      const buffer = await response.arrayBuffer();
      res.set("Content-Type", response.headers.get("content-type") || "image/jpeg");
      res.set("Cache-Control", "public, max-age=86400");
      res.send(Buffer.from(buffer));
    } catch (error) {
      res.status(500).send("Error fetching logo");
    }
  });

  // --- VITE MIDDLEWARE ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile("dist/index.html", { root: "." });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

// @ts-ignore
import html2pdf from 'html2pdf.js';
import { BUSINESS_INFO } from '../constants';

export const generateInvoicePDF = (invoice: any) => {
  const element = document.createElement('div');
  
  const itemsHtml = invoice.tekify_invoice_items?.map((item: any) => `
    <tr style="border-bottom: 1px solid #f1f5f9;">
      <td style="padding: 20px 0;">
        <p style="font-size: 16px; font-weight: 700; margin: 0;">${item.service_name}</p>
        <p style="font-size: 12px; color: #64748b; margin-top: 4px;">Qty: ${item.quantity || 1} x ₦${Number(item.unit_price).toLocaleString()}</p>
      </td>
      <td style="text-align: right; padding: 20px 0; font-size: 16px; font-weight: 700;">₦${Number(item.total_price).toLocaleString()}</td>
    </tr>
  `).join('') || `
    <tr style="border-bottom: 1px solid #f1f5f9;">
      <td style="padding: 20px 0;">
        <p style="font-size: 16px; font-weight: 700; margin: 0;">Service</p>
      </td>
      <td style="text-align: right; padding: 20px 0; font-size: 16px; font-weight: 700;">₦${Number(invoice.total_amount).toLocaleString()}</td>
    </tr>
  `;

  element.innerHTML = `
    <div style="padding: 40px; font-family: sans-serif; color: #1e293b;">
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 60px;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <img src="${BUSINESS_INFO.logo}" alt="Logo" style="height: 48px; object-fit: contain;" crossorigin="anonymous" />
          <div>
            <h1 style="font-size: 28px; font-weight: 900; margin: 0; text-transform: uppercase; letter-spacing: -1px; color: #0f172a;">${BUSINESS_INFO.name}</h1>
            <p style="font-size: 12px; color: #64748b; margin-top: 4px;">${BUSINESS_INFO.address}</p>
            <p style="font-size: 12px; color: #64748b; margin-top: 2px;">${BUSINESS_INFO.phone} | ${BUSINESS_INFO.email}</p>
            <p style="font-size: 12px; color: #64748b; margin-top: 2px;">${BUSINESS_INFO.website}</p>
          </div>
        </div>
        <div style="text-align: right;">
          <h2 style="font-size: 32px; font-weight: 900; margin: 0; color: #2563eb; letter-spacing: 1px;">INVOICE</h2>
          <p style="font-size: 16px; font-weight: 700; margin-top: 4px; color: #475569;">#${invoice.invoice_number}</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px; background-color: #f8fafc; padding: 24px; border-radius: 12px;">
        <div>
          <h3 style="font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; color: #64748b; margin-bottom: 12px;">Billed To</h3>
          <p style="font-size: 16px; font-weight: 700; margin: 0; color: #0f172a;">${invoice.tekify_customers?.full_name}</p>
          <p style="font-size: 14px; color: #475569; margin: 4px 0;">${invoice.tekify_customers?.email}</p>
          <p style="font-size: 14px; color: #475569; margin: 0;">${invoice.tekify_customers?.phone}</p>
        </div>
        <div style="text-align: right;">
          <h3 style="font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; color: #64748b; margin-bottom: 12px;">Invoice Details</h3>
          <p style="font-size: 14px; margin: 4px 0; color: #0f172a;"><span style="color: #64748b; display: inline-block; width: 80px;">Issued:</span> <strong>${new Date(invoice.created_at).toLocaleDateString()}</strong></p>
          <p style="font-size: 14px; margin: 4px 0; color: #0f172a;"><span style="color: #64748b; display: inline-block; width: 80px;">Due Date:</span> <strong>${new Date(invoice.due_date).toLocaleDateString()}</strong></p>
          <p style="font-size: 14px; margin: 0; color: #0f172a;"><span style="color: #64748b; display: inline-block; width: 80px;">Status:</span> <strong style="color: ${invoice.status === 'paid' ? '#10b981' : '#ef4444'};">${invoice.status.toUpperCase()}</strong></p>
        </div>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 40px;">
        <thead>
          <tr style="border-bottom: 2px solid #e2e8f0; background-color: #f1f5f9;">
            <th style="text-align: left; padding: 16px 20px; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; color: #475569; border-radius: 8px 0 0 8px;">Description</th>
            <th style="text-align: right; padding: 16px 20px; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; color: #475569; border-radius: 0 8px 8px 0;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>

      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <div style="width: 45%; background-color: #f8fafc; padding: 20px; border-radius: 12px; border-left: 4px solid #2563eb;">
          <h3 style="font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; color: #64748b; margin-bottom: 12px;">Payment Information</h3>
          <p style="font-size: 14px; margin: 4px 0; color: #0f172a;"><span style="color: #64748b;">Bank:</span> <strong>${BUSINESS_INFO.accountDetails.bankName}</strong></p>
          <p style="font-size: 14px; margin: 4px 0; color: #0f172a;"><span style="color: #64748b;">Account Name:</span> <strong>${BUSINESS_INFO.accountDetails.accountName}</strong></p>
          <p style="font-size: 14px; margin: 4px 0; color: #0f172a;"><span style="color: #64748b;">Account No:</span> <strong>${BUSINESS_INFO.accountDetails.accountNumber}</strong></p>
        </div>

        <div style="width: 300px; background-color: #f8fafc; padding: 24px; border-radius: 12px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
            <span style="font-size: 14px; color: #475569;">Subtotal</span>
            <span style="font-size: 14px; font-weight: 700; color: #0f172a;">₦${(Number(invoice.total_amount) - Number(invoice.tax_amount || 0)).toLocaleString()}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 2px solid #e2e8f0;">
            <span style="font-size: 14px; color: #475569;">VAT (7.5%)</span>
            <span style="font-size: 14px; font-weight: 700; color: #0f172a;">₦${Number(invoice.tax_amount || 0).toLocaleString()}</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 18px; font-weight: 900; color: #0f172a;">Total</span>
            <span style="font-size: 24px; font-weight: 900; color: #2563eb;">₦${Number(invoice.total_amount).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div style="margin-top: 80px; padding-top: 30px; border-top: 2px solid #f1f5f9; text-align: center;">
        <p style="font-size: 14px; color: #0f172a; font-weight: 700; margin-bottom: 8px;">Thank you for your business!</p>
        <p style="font-size: 12px; color: #64748b;">If you have any questions about this invoice, please contact us.</p>
      </div>
    </div>
  `;

  const customerName = invoice.tekify_customers?.full_name?.replace(/[^a-zA-Z0-9]/g, '_') || 'Customer';
  const opt = {
    margin: 0,
    filename: `${customerName}_Invoice_${invoice.invoice_number}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save();
};

export const generateReceiptPDF = (receipt: any) => {
  const element = document.createElement('div');
  
  const itemsHtml = receipt.tekify_invoices?.tekify_invoice_items?.map((item: any) => `
    <tr style="border-bottom: 1px solid #f1f5f9;">
      <td style="padding: 16px 0;">
        <p style="font-size: 14px; font-weight: 700; margin: 0;">${item.service_name}</p>
      </td>
      <td style="text-align: right; padding: 16px 0; font-size: 14px; font-weight: 700;">₦${Number(item.total_price).toLocaleString()}</td>
    </tr>
  `).join('') || `
    <tr style="border-bottom: 1px solid #f1f5f9;">
      <td style="padding: 16px 0;">
        <p style="font-size: 14px; font-weight: 700; margin: 0;">Services</p>
      </td>
      <td style="text-align: right; padding: 16px 0; font-size: 14px; font-weight: 700;">₦${Number(receipt.amount_paid).toLocaleString()}</td>
    </tr>
  `;

  element.innerHTML = `
    <div style="padding: 40px; font-family: sans-serif; color: #1e293b;">
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 60px;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <img src="${BUSINESS_INFO.logo}" alt="Logo" style="height: 48px; object-fit: contain;" crossorigin="anonymous" />
          <div>
            <h1 style="font-size: 28px; font-weight: 900; margin: 0; text-transform: uppercase; letter-spacing: -1px; color: #0f172a;">${BUSINESS_INFO.name}</h1>
            <p style="font-size: 12px; color: #64748b; margin-top: 4px;">${BUSINESS_INFO.address}</p>
            <p style="font-size: 12px; color: #64748b; margin-top: 2px;">${BUSINESS_INFO.phone} | ${BUSINESS_INFO.email}</p>
            <p style="font-size: 12px; color: #64748b; margin-top: 2px;">${BUSINESS_INFO.website}</p>
          </div>
        </div>
        <div style="text-align: right;">
          <h2 style="font-size: 32px; font-weight: 900; margin: 0; color: #10b981; letter-spacing: 1px;">RECEIPT</h2>
          <p style="font-size: 16px; font-weight: 700; margin-top: 4px; color: #475569;">#${receipt.receipt_number}</p>
        </div>
      </div>

      <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 40px; border-radius: 16px; margin-bottom: 40px; text-align: center; border: 1px solid #e2e8f0;">
        <h3 style="font-size: 14px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; color: #64748b; margin-bottom: 12px;">Amount Paid</h3>
        <p style="font-size: 56px; font-weight: 900; margin: 0; color: #0f172a; letter-spacing: -1px;">₦${Number(receipt.amount_paid).toLocaleString()}</p>
        <div style="display: inline-block; background-color: #d1fae5; color: #059669; padding: 6px 16px; border-radius: 20px; font-size: 14px; font-weight: 700; margin-top: 16px;">
          Payment Successful via ${receipt.payment_method}
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px;">
        <div style="background-color: #f8fafc; padding: 24px; border-radius: 12px;">
          <h3 style="font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; color: #64748b; margin-bottom: 12px;">Paid By</h3>
          <p style="font-size: 16px; font-weight: 700; margin: 0; color: #0f172a;">${receipt.tekify_invoices?.tekify_customers?.full_name}</p>
          <p style="font-size: 14px; color: #475569; margin: 4px 0;">${receipt.tekify_invoices?.tekify_customers?.email}</p>
        </div>
        <div style="background-color: #f8fafc; padding: 24px; border-radius: 12px; text-align: right;">
          <h3 style="font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; color: #64748b; margin-bottom: 12px;">Payment Details</h3>
          <p style="font-size: 14px; margin: 4px 0; color: #0f172a;"><span style="color: #64748b; display: inline-block; width: 80px;">Date:</span> <strong>${new Date(receipt.issued_at).toLocaleDateString()}</strong></p>
          <p style="font-size: 14px; margin: 4px 0; color: #0f172a;"><span style="color: #64748b; display: inline-block; width: 80px;">Invoice Ref:</span> <strong>${receipt.tekify_invoices?.invoice_number}</strong></p>
        </div>
      </div>

      <div style="margin-bottom: 40px;">
        <h3 style="font-size: 14px; font-weight: 900; color: #0f172a; margin-bottom: 16px; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">Payment For</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>
      </div>

      <div style="margin-top: 60px; padding-top: 30px; border-top: 2px solid #f1f5f9; text-align: center;">
        <p style="font-size: 14px; color: #0f172a; font-weight: 700; margin-bottom: 8px;">Thank you for your payment!</p>
        <p style="font-size: 12px; color: #64748b;">This is a computer-generated receipt and does not require a signature.</p>
      </div>
    </div>
  `;

  const customerName = receipt.tekify_invoices?.tekify_customers?.full_name?.replace(/[^a-zA-Z0-9]/g, '_') || 'Customer';
  const opt = {
    margin: 0,
    filename: `${customerName}_Receipt_${receipt.receipt_number}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save();
};

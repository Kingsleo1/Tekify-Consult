// @ts-ignore
import html2pdf from 'html2pdf.js';
import { BUSINESS_INFO } from '../constants';

export const generateInvoicePDF = (invoice: any) => {
  const element = document.createElement('div');
  
  const itemsHtml = invoice.tekify_invoice_items?.map((item: any) => `
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 16px 12px;">
        <p style="font-size: 14px; font-weight: 600; color: #1e293b; margin: 0;">${item.service_name}</p>
      </td>
      <td style="padding: 16px 12px; text-align: center;">
        <p style="font-size: 14px; color: #64748b; margin: 0;">${item.quantity || 1}</p>
      </td>
      <td style="padding: 16px 12px; text-align: right;">
        <p style="font-size: 14px; color: #64748b; margin: 0;">₦${Number(item.unit_price).toLocaleString()}</p>
      </td>
      <td style="padding: 16px 12px; text-align: right;">
        <p style="font-size: 14px; font-weight: 600; color: #1e293b; margin: 0;">₦${Number(item.total).toLocaleString()}</p>
      </td>
    </tr>
  `).join('') || `
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 16px 12px;" colspan="3">
        <p style="font-size: 14px; font-weight: 600; color: #1e293b; margin: 0;">Service</p>
      </td>
      <td style="padding: 16px 12px; text-align: right;">
        <p style="font-size: 14px; font-weight: 600; color: #1e293b; margin: 0;">₦${Number(invoice.total_amount).toLocaleString()}</p>
      </td>
    </tr>
  `;

  element.innerHTML = `
    <div style="padding: 48px; font-family: 'Inter', sans-serif; color: #334155; line-height: 1.5;">
      <!-- Header -->
      <div style="display: flex; justify-content: space-between; margin-bottom: 48px;">
        <div style="display: flex; gap: 20px; align-items: flex-start;">
          <img src="${BUSINESS_INFO.logo}" alt="Logo" style="height: 64px; width: auto; object-fit: contain;" crossorigin="anonymous" />
          <div>
            <h1 style="font-size: 24px; font-weight: 800; color: #0f172a; margin: 0 0 4px 0; letter-spacing: -0.5px;">${BUSINESS_INFO.name}</h1>
            <p style="font-size: 13px; color: #64748b; margin: 0;">${BUSINESS_INFO.address}</p>
            <p style="font-size: 13px; color: #64748b; margin: 2px 0;">${BUSINESS_INFO.phone} • ${BUSINESS_INFO.email}</p>
            <p style="font-size: 13px; color: #64748b; margin: 0;">${BUSINESS_INFO.website}</p>
          </div>
        </div>
        <div style="text-align: right;">
          <h2 style="font-size: 36px; font-weight: 800; color: #e2e8f0; margin: 0; line-height: 1;">INVOICE</h2>
          <p style="font-size: 16px; font-weight: 600; color: #475569; margin-top: 8px;">#${invoice.invoice_number}</p>
          <div style="margin-top: 16px; display: inline-block; padding: 6px 12px; background: ${invoice.status === 'paid' ? '#dcfce7' : '#fee2e2'}; border-radius: 6px;">
            <span style="font-size: 12px; font-weight: 700; color: ${invoice.status === 'paid' ? '#166534' : '#991b1b'}; text-transform: uppercase; letter-spacing: 0.5px;">${invoice.status}</span>
          </div>
        </div>
      </div>

      <!-- Client & Details -->
      <div style="display: flex; justify-content: space-between; margin-bottom: 48px; gap: 40px;">
        <div style="flex: 1;">
          <h3 style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin-bottom: 12px;">Bill To</h3>
          <p style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 0 0 4px 0;">${invoice.tekify_customers?.full_name}</p>
          <p style="font-size: 14px; color: #475569; margin: 0;">${invoice.tekify_customers?.email}</p>
          <p style="font-size: 14px; color: #475569; margin: 2px 0 0 0;">${invoice.tekify_customers?.phone || ''}</p>
        </div>
        <div style="flex: 1; text-align: right;">
          <h3 style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin-bottom: 12px;">Invoice Details</h3>
          <div style="display: inline-block; text-align: left;">
            <div style="display: grid; grid-template-columns: 100px 1fr; gap: 8px; margin-bottom: 4px;">
              <span style="font-size: 13px; color: #64748b;">Issue Date:</span>
              <span style="font-size: 13px; font-weight: 600; color: #0f172a;">${new Date(invoice.created_at).toLocaleDateString()}</span>
            </div>
            <div style="display: grid; grid-template-columns: 100px 1fr; gap: 8px;">
              <span style="font-size: 13px; color: #64748b;">Due Date:</span>
              <span style="font-size: 13px; font-weight: 600; color: #0f172a;">${new Date(invoice.due_date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Items Table -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 40px;">
        <thead>
          <tr style="background-color: #f8fafc; border-bottom: 2px solid #e2e8f0;">
            <th style="text-align: left; padding: 12px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b;">Description</th>
            <th style="text-align: center; padding: 12px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; width: 80px;">Qty</th>
            <th style="text-align: right; padding: 12px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; width: 120px;">Unit Price</th>
            <th style="text-align: right; padding: 12px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; width: 120px;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>

      <!-- Summary & Payment -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 40px;">
        <div style="flex: 1;">
          <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; border: 1px solid #e2e8f0;">
            <h3 style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin-bottom: 12px;">Payment Information</h3>
            <div style="display: grid; grid-template-columns: 100px 1fr; gap: 8px; margin-bottom: 4px;">
              <span style="font-size: 13px; color: #64748b;">Bank Name:</span>
              <span style="font-size: 13px; font-weight: 600; color: #0f172a;">${BUSINESS_INFO.accountDetails.bankName}</span>
            </div>
            <div style="display: grid; grid-template-columns: 100px 1fr; gap: 8px; margin-bottom: 4px;">
              <span style="font-size: 13px; color: #64748b;">Account Name:</span>
              <span style="font-size: 13px; font-weight: 600; color: #0f172a;">${BUSINESS_INFO.accountDetails.accountName}</span>
            </div>
            <div style="display: grid; grid-template-columns: 100px 1fr; gap: 8px;">
              <span style="font-size: 13px; color: #64748b;">Account No:</span>
              <span style="font-size: 13px; font-weight: 600; color: #0f172a;">${BUSINESS_INFO.accountDetails.accountNumber}</span>
            </div>
          </div>
          
          ${invoice.additional_note ? `
            <div style="margin-top: 24px;">
              <h3 style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin-bottom: 8px;">Notes</h3>
              <p style="font-size: 13px; color: #475569; line-height: 1.6;">${invoice.additional_note}</p>
            </div>
          ` : ''}
        </div>

        <div style="width: 280px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
            <span style="font-size: 14px; color: #64748b;">Subtotal</span>
            <span style="font-size: 14px; font-weight: 600; color: #0f172a;">₦${(Number(invoice.total_amount) - Number(invoice.tax_amount || 0)).toLocaleString()}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #e2e8f0;">
            <span style="font-size: 14px; color: #64748b;">VAT (7.5%)</span>
            <span style="font-size: 14px; font-weight: 600; color: #0f172a;">₦${Number(invoice.tax_amount || 0).toLocaleString()}</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 16px; font-weight: 700; color: #0f172a;">Total Due</span>
            <span style="font-size: 20px; font-weight: 800; color: #2563eb;">₦${Number(invoice.total_amount).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div style="margin-top: 60px; padding-top: 24px; border-top: 1px solid #e2e8f0; text-align: center;">
        <p style="font-size: 14px; font-weight: 600; color: #0f172a; margin-bottom: 4px;">Thank you for your business!</p>
        <p style="font-size: 12px; color: #94a3b8;">Please include the invoice number in your payment reference.</p>
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
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 12px 0;">
        <p style="font-size: 13px; font-weight: 600; color: #1e293b; margin: 0;">${item.service_name}</p>
      </td>
      <td style="text-align: right; padding: 12px 0;">
        <p style="font-size: 13px; font-weight: 600; color: #1e293b; margin: 0;">₦${Number(item.total).toLocaleString()}</p>
      </td>
    </tr>
  `).join('') || `
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 12px 0;">
        <p style="font-size: 13px; font-weight: 600; color: #1e293b; margin: 0;">Services</p>
      </td>
      <td style="text-align: right; padding: 12px 0;">
        <p style="font-size: 13px; font-weight: 600; color: #1e293b; margin: 0;">₦${Number(receipt.amount_paid).toLocaleString()}</p>
      </td>
    </tr>
  `;

  element.innerHTML = `
    <div style="padding: 48px; font-family: 'Inter', sans-serif; color: #334155; line-height: 1.5;">
      <!-- Header -->
      <div style="display: flex; justify-content: space-between; margin-bottom: 48px;">
        <div style="display: flex; gap: 20px; align-items: flex-start;">
          <img src="${BUSINESS_INFO.logo}" alt="Logo" style="height: 64px; width: auto; object-fit: contain;" crossorigin="anonymous" />
          <div>
            <h1 style="font-size: 24px; font-weight: 800; color: #0f172a; margin: 0 0 4px 0; letter-spacing: -0.5px;">${BUSINESS_INFO.name}</h1>
            <p style="font-size: 13px; color: #64748b; margin: 0;">${BUSINESS_INFO.address}</p>
            <p style="font-size: 13px; color: #64748b; margin: 2px 0;">${BUSINESS_INFO.phone} • ${BUSINESS_INFO.email}</p>
            <p style="font-size: 13px; color: #64748b; margin: 0;">${BUSINESS_INFO.website}</p>
          </div>
        </div>
        <div style="text-align: right;">
          <h2 style="font-size: 36px; font-weight: 800; color: #e2e8f0; margin: 0; line-height: 1;">RECEIPT</h2>
          <p style="font-size: 16px; font-weight: 600; color: #475569; margin-top: 8px;">#${receipt.receipt_number}</p>
        </div>
      </div>

      <!-- Main Card -->
      <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); padding: 40px; border-radius: 16px; margin-bottom: 40px; text-align: center; border: 1px solid #bbf7d0;">
        <h3 style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: #166534; margin-bottom: 12px;">Amount Paid</h3>
        <p style="font-size: 48px; font-weight: 800; margin: 0; color: #14532d; letter-spacing: -1px;">₦${Number(receipt.amount_paid).toLocaleString()}</p>
        <div style="display: inline-flex; align-items: center; gap: 8px; background-color: rgba(255,255,255,0.6); padding: 8px 16px; border-radius: 20px; margin-top: 16px;">
          <div style="width: 8px; height: 8px; border-radius: 50%; background-color: #166534;"></div>
          <span style="font-size: 13px; font-weight: 700; color: #14532d;">Paid via ${receipt.payment_method}</span>
        </div>
      </div>

      <!-- Details Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px;">
        <div style="background-color: #f8fafc; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0;">
          <h3 style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin-bottom: 16px;">Paid By</h3>
          <p style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 0 0 4px 0;">${receipt.tekify_invoices?.tekify_customers?.full_name}</p>
          <p style="font-size: 14px; color: #475569; margin: 0;">${receipt.tekify_invoices?.tekify_customers?.email}</p>
        </div>
        <div style="background-color: #f8fafc; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0; text-align: right;">
          <h3 style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin-bottom: 16px;">Payment Details</h3>
          <div style="margin-bottom: 8px;">
            <span style="font-size: 13px; color: #64748b; margin-right: 12px;">Date Paid:</span>
            <span style="font-size: 14px; font-weight: 600; color: #0f172a;">${new Date(receipt.issued_at).toLocaleDateString()}</span>
          </div>
          <div>
            <span style="font-size: 13px; color: #64748b; margin-right: 12px;">Invoice Ref:</span>
            <span style="font-size: 14px; font-weight: 600; color: #0f172a;">${receipt.tekify_invoices?.invoice_number}</span>
          </div>
        </div>
      </div>

      <!-- Items & Notes -->
      <div style="margin-bottom: 40px;">
        <h3 style="font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 16px; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">Payment For</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        ${receipt.additional_note ? `
          <div style="margin-top: 32px; background-color: #fffbeb; padding: 16px; border-radius: 8px; border: 1px solid #fcd34d;">
            <h3 style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #b45309; margin-bottom: 8px;">Notes</h3>
            <p style="font-size: 13px; color: #92400e; line-height: 1.6; margin: 0;">${receipt.additional_note}</p>
          </div>
        ` : ''}
      </div>

      <!-- Footer -->
      <div style="margin-top: 60px; padding-top: 24px; border-top: 1px solid #e2e8f0; text-align: center;">
        <p style="font-size: 14px; font-weight: 600; color: #0f172a; margin-bottom: 4px;">Thank you for your payment!</p>
        <p style="font-size: 12px; color: #94a3b8;">This is a computer-generated receipt and does not require a signature.</p>
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

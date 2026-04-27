import React, { useEffect, useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Download,
  Loader2,
  Plus,
  X,
  FileText,
  CreditCard,
  Trash2,
  Calendar
} from 'lucide-react';
import { supabase } from '../../services/supabaseClient';
import { TekifyReceipt, TekifyInvoice } from '../../types';
import { generateReceiptPDF } from '../../services/PDFService';
import { toast } from 'sonner';

const AdminReceipts: React.FC = () => {
  const [receipts, setReceipts] = useState<TekifyReceipt[]>([]);
  const [pendingInvoices, setPendingInvoices] = useState<TekifyInvoice[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingReceiptId, setEditingReceiptId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [selectedInvoiceId, setSelectedInvoiceId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Bank Transfer');
  const [amountPaid, setAmountPaid] = useState<number>(0);
  const [additionalNote, setAdditionalNote] = useState('');
  const [additionalItems, setAdditionalItems] = useState<any[]>([]);
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Custom Item State
  const [customItemName, setCustomItemName] = useState('');
  const [customItemPrice, setCustomItemPrice] = useState<number>(0);
  const [customItemQty, setCustomItemQty] = useState<number>(1);

  const fetchReceipts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('tekify_receipts')
      .select(`
        *,
        tekify_invoices (
          *,
          tekify_customers (*),
          tekify_invoice_items (*)
        )
      `)
      .order('issued_at', { ascending: false });

    if (error) console.error("Fetch Error:", error);
    else setReceipts(data || []);
    setLoading(false);
  };

  const fetchPendingInvoices = async () => {
    const { data } = await supabase
      .from('tekify_invoices')
      .select('*, tekify_customers(*), tekify_invoice_items(*)')
      .eq('status', 'unpaid')
      .order('invoice_number');
    setPendingInvoices(data || []);
  };

  const fetchServices = async () => {
    const { data } = await supabase.from('tekify_services').select('*').order('name');
    setServices(data || []);
  };

  useEffect(() => {
    fetchReceipts();
    fetchPendingInvoices();
    fetchServices();
  }, []);

  const handleInvoiceSelect = (id: string) => {
    setSelectedInvoiceId(id);
    const invoice = pendingInvoices.find(i => i.id === id);
    if (invoice) {
      setAmountPaid(Number(invoice.total_amount));
      setAdditionalItems([]);
    }
  };

  const handleAddService = (serviceId: string) => {
    if (!serviceId) return;
    const service = services.find(s => s.id === serviceId);
    if (service) {
      const newItem = {
        service_id: service.id,
        service_name: service.name,
        unit_price: Number(service.price),
        quantity: 1,
        total: Number(service.price)
      };
      setAdditionalItems([...additionalItems, newItem]);
      setAmountPaid(prev => prev + newItem.total);
    }
  };

  const handleAddCustomItem = () => {
    if (!customItemName || customItemPrice <= 0 || customItemQty <= 0) {
      return toast.error("Please fill all custom item fields correctly");
    }
    const newItem = {
      service_id: null,
      service_name: customItemName,
      unit_price: customItemPrice,
      quantity: customItemQty,
      total: customItemPrice * customItemQty
    };
    setAdditionalItems([...additionalItems, newItem]);
    setAmountPaid(prev => prev + newItem.total);
    setCustomItemName('');
    setCustomItemPrice(0);
    setCustomItemQty(1);
  };

  const handleRemoveAdditionalItem = (index: number) => {
    const item = additionalItems[index];
    setAmountPaid(prev => prev - item.total);
    setAdditionalItems(additionalItems.filter((_, i) => i !== index));
  };

  const handleEditReceipt = (receipt: any) => {
    setEditingReceiptId(receipt.id);
    setPaymentMethod(receipt.payment_method);
    setAmountPaid(Number(receipt.amount_paid));
    setAdditionalNote(receipt.additional_note || '');
    setAdditionalItems(receipt.additional_items || []);
    setShowEditModal(true);
  };

  const handleUpdateReceipt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amountPaid <= 0) return toast.error("Please enter a valid amount");

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/admin/receipts/${editingReceiptId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethod,
          amountPaid,
          additionalNote,
          additionalItems
        })
      });

      if (response.ok) {
        toast.success("Receipt updated successfully!");
        setShowEditModal(false);
        setEditingReceiptId(null);
        setPaymentMethod('Bank Transfer');
        setAmountPaid(0);
        setAdditionalNote('');
        setAdditionalItems([]);
        fetchReceipts();
      } else {
        const err = await response.json();
        toast.error(`Error: ${err.error}`);
      }
    } catch (error) {
      console.error("Update Receipt Error:", error);
      toast.error("Failed to update receipt");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateReceipt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoiceId) return toast.error("Please select an invoice");
    if (amountPaid <= 0) return toast.error("Please enter a valid amount");

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/admin/receipts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoiceId: selectedInvoiceId,
          paymentMethod,
          amountPaid,
          additionalNote,
          additionalItems,
          paymentDate
        })
      });

      if (response.ok) {
        toast.success("Receipt created successfully!");
        setShowCreateModal(false);
        setSelectedInvoiceId('');
        setAmountPaid(0);
        setAdditionalNote('');
        setAdditionalItems([]);
        setPaymentDate(new Date().toISOString().split('T')[0]);
        fetchReceipts();
        fetchPendingInvoices();
      } else {
        const err = await response.json();
        toast.error(`Error: ${err.error}`);
      }
    } catch (error) {
      console.error("Create Receipt Error:", error);
      toast.error("Failed to create receipt");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="w-full lg:w-auto">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 dark:text-white">Receipt Management</h2>
          <p className="text-slate-500 font-medium mt-2">View and download payment confirmations.</p>
        </div>
        <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4">
          <button 
            onClick={() => setShowCreateModal(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl hover:scale-105 transition-all"
          >
            <Plus className="w-4 h-4" /> Create Receipt
          </button>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search receipts..." 
                className="w-full pl-12 pr-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              />
            </div>
            <button className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl text-slate-500 hover:text-primary-600 transition-all">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Receipts Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl md:rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-xl overflow-hidden w-full">
        <div className="w-full overflow-x-auto overflow-y-hidden break-words touch-pan-x">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/5">
                <th className="px-6 md:px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Receipt #</th>
                <th className="px-6 md:px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Invoice #</th>
                <th className="px-6 md:px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Client</th>
                <th className="px-6 md:px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Amount Paid</th>
                <th className="px-6 md:px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Method</th>
                <th className="px-6 md:px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 md:px-8 py-20 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary-600 mx-auto" />
                  </td>
                </tr>
              ) : receipts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 md:px-8 py-20 text-center text-slate-400 font-bold">No receipts found.</td>
                </tr>
              ) : receipts.map((receipt) => (
                <tr key={receipt.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                  <td className="px-6 md:px-8 py-6">
                    <div className="font-black text-emerald-600 dark:text-emerald-400">{receipt.receipt_number}</div>
                    <div className="text-[10px] text-slate-400 font-bold">Issued: {new Date(receipt.issued_at || '').toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 md:px-8 py-6">
                    <div className="text-sm font-bold text-slate-600 dark:text-slate-400">{receipt.tekify_invoices?.invoice_number}</div>
                  </td>
                  <td className="px-6 md:px-8 py-6">
                    <div className="font-bold text-slate-900 dark:text-white">{receipt.tekify_invoices?.tekify_customers?.full_name}</div>
                    <div className="text-xs text-slate-500">{receipt.tekify_invoices?.tekify_customers?.email}</div>
                  </td>
                  <td className="px-6 md:px-8 py-6">
                    <div className="text-sm font-black text-slate-900 dark:text-white">₦{Number(receipt.amount_paid).toLocaleString()}</div>
                  </td>
                  <td className="px-6 md:px-8 py-6">
                    <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      {receipt.payment_method}
                    </span>
                  </td>
                  <td className="px-6 md:px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => generateReceiptPDF(receipt)}
                        className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg transition-all"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleEditReceipt(receipt)}
                        className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg transition-all"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Receipt Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl md:rounded-[3rem] shadow-2xl border border-slate-200 dark:border-white/5 overflow-hidden flex flex-col max-h-[95vh] md:max-h-[90vh]">
            <div className="p-6 md:p-8 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
              <h3 className="text-xl md:text-2xl font-black tracking-tighter text-slate-900 dark:text-white">Record New Payment</h3>
              <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-all">
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>
            
            <form onSubmit={handleCreateReceipt} className="p-6 md:p-10 space-y-6 md:space-y-8 overflow-y-auto">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Select Unpaid Invoice</label>
                <div className="relative group">
                  <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                  <select 
                    required
                    value={selectedInvoiceId}
                    onChange={(e) => handleInvoiceSelect(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 transition-all appearance-none dark:text-white text-sm"
                  >
                    <option value="" className="dark:bg-slate-900">Select an invoice...</option>
                    {pendingInvoices.map(i => (
                      <option key={i.id} value={i.id} className="dark:bg-slate-900">
                        {i.invoice_number} - {i.tekify_customers?.full_name} (₦{Number(i.total_amount).toLocaleString()})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Payment Method</label>
                  <div className="relative group">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                    <select 
                      required
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full pl-12 pr-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 transition-all appearance-none dark:text-white text-sm"
                    >
                      <option value="Bank Transfer" className="dark:bg-slate-900">Bank Transfer</option>
                      <option value="Cash" className="dark:bg-slate-900">Cash</option>
                      <option value="POS" className="dark:bg-slate-900">POS</option>
                      <option value="Online" className="dark:bg-slate-900">Online</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Amount Paid (₦)</label>
                  <input 
                    type="number" 
                    required
                    value={amountPaid}
                    onChange={(e) => setAmountPaid(Number(e.target.value))}
                    className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Payment Date</label>
                <div className="relative group">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                  <input 
                    type="date" 
                    required
                    value={paymentDate}
                    onChange={(e) => setPaymentDate(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Additional Note</label>
                <textarea
                  value={additionalNote}
                  onChange={(e) => setAdditionalNote(e.target.value)}
                  placeholder="Add any additional notes or terms..."
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white min-h-[100px] text-sm"
                />
              </div>

              {/* Additional Items Section */}
              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-white/5">
                <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Additional Services / Items</h4>
                
                {additionalItems.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {additionalItems.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-4 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10">
                        <div>
                          <p className="font-bold text-sm text-slate-900 dark:text-white">{item.service_name}</p>
                          <p className="text-xs text-slate-500">{item.quantity} x ₦{Number(item.unit_price).toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="font-black text-slate-900 dark:text-white">₦{Number(item.total).toLocaleString()}</p>
                          <button type="button" onClick={() => handleRemoveAdditionalItem(index)} className="text-red-500 hover:text-red-600 p-1">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Add Existing Service</label>
                    <select 
                      onChange={(e) => {
                        handleAddService(e.target.value);
                        e.target.value = '';
                      }}
                      className="w-full px-6 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all appearance-none dark:text-white text-sm"
                    >
                      <option value="" className="dark:bg-slate-900">Select a service to add...</option>
                      {services.map(s => (
                        <option key={s.id} value={s.id} className="dark:bg-slate-900">{s.name} - ₦{Number(s.price).toLocaleString()}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Or Add Custom Item</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input 
                      type="text" 
                      placeholder="Item Name" 
                      value={customItemName}
                      onChange={(e) => setCustomItemName(e.target.value)}
                      className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg outline-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white text-sm"
                    />
                    <input 
                      type="number" 
                      placeholder="Price (₦)" 
                      value={customItemPrice || ''}
                      onChange={(e) => setCustomItemPrice(Number(e.target.value))}
                      className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg outline-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white text-sm"
                    />
                    <div className="flex gap-2">
                      <input 
                        type="number" 
                        placeholder="Qty" 
                        value={customItemQty || ''}
                        onChange={(e) => setCustomItemQty(Number(e.target.value))}
                        className="w-20 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg outline-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white text-sm"
                      />
                      <button 
                        type="button"
                        onClick={handleAddCustomItem}
                        className="flex-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-bold text-xs hover:scale-105 transition-all"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowCreateModal(false)}
                  className="w-full sm:flex-1 px-8 py-4 bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full sm:flex-1 px-8 py-4 bg-emerald-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-3"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirm Payment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Edit Receipt Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl md:rounded-[3rem] shadow-2xl border border-slate-200 dark:border-white/5 overflow-hidden flex flex-col max-h-[95vh] md:max-h-[90vh]">
            <div className="p-6 md:p-8 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
              <h3 className="text-xl md:text-2xl font-black tracking-tighter text-slate-900 dark:text-white">Edit Receipt</h3>
              <button onClick={() => { setShowEditModal(false); setEditingReceiptId(null); }} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-all">
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>
            
            <form onSubmit={handleUpdateReceipt} className="p-6 md:p-10 space-y-6 md:space-y-8 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Payment Method</label>
                  <div className="relative group">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                    <select 
                      required
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full pl-12 pr-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 transition-all appearance-none dark:text-white text-sm"
                    >
                      <option value="Bank Transfer" className="dark:bg-slate-900">Bank Transfer</option>
                      <option value="Cash" className="dark:bg-slate-900">Cash</option>
                      <option value="POS" className="dark:bg-slate-900">POS</option>
                      <option value="Online" className="dark:bg-slate-900">Online</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Amount Paid (₦)</label>
                  <input 
                    type="number" 
                    required
                    value={amountPaid}
                    onChange={(e) => setAmountPaid(Number(e.target.value))}
                    className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Additional Note</label>
                <textarea
                  value={additionalNote}
                  onChange={(e) => setAdditionalNote(e.target.value)}
                  placeholder="Add any additional notes or terms..."
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white min-h-[100px] text-sm"
                />
              </div>

              {/* Additional Items Section */}
              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-white/5">
                <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Additional Services / Items</h4>
                
                {additionalItems.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {additionalItems.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-4 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10">
                        <div>
                          <p className="font-bold text-sm text-slate-900 dark:text-white">{item.service_name}</p>
                          <p className="text-xs text-slate-500">{item.quantity} x ₦{Number(item.unit_price).toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="font-black text-slate-900 dark:text-white">₦{Number(item.total).toLocaleString()}</p>
                          <button type="button" onClick={() => handleRemoveAdditionalItem(index)} className="text-red-500 hover:text-red-600 p-1">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Add Existing Service</label>
                    <select 
                      onChange={(e) => {
                        handleAddService(e.target.value);
                        e.target.value = '';
                      }}
                      className="w-full px-6 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all appearance-none dark:text-white text-sm"
                    >
                      <option value="" className="dark:bg-slate-900">Select a service to add...</option>
                      {services.map(s => (
                        <option key={s.id} value={s.id} className="dark:bg-slate-900">{s.name} - ₦{Number(s.price).toLocaleString()}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Or Add Custom Item</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input 
                      type="text" 
                      placeholder="Item Name" 
                      value={customItemName}
                      onChange={(e) => setCustomItemName(e.target.value)}
                      className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg outline-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white text-sm"
                    />
                    <input 
                      type="number" 
                      placeholder="Price (₦)" 
                      value={customItemPrice || ''}
                      onChange={(e) => setCustomItemPrice(Number(e.target.value))}
                      className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg outline-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white text-sm"
                    />
                    <div className="flex gap-2">
                      <input 
                        type="number" 
                        placeholder="Qty" 
                        value={customItemQty || ''}
                        onChange={(e) => setCustomItemQty(Number(e.target.value))}
                        className="w-20 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg outline-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white text-sm"
                      />
                      <button 
                        type="button"
                        onClick={handleAddCustomItem}
                        className="flex-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-bold text-xs hover:scale-105 transition-all"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={() => { setShowEditModal(false); setEditingReceiptId(null); }}
                  className="w-full sm:flex-1 px-8 py-4 bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full sm:flex-1 px-8 py-4 bg-emerald-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-3"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Update Receipt'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReceipts;

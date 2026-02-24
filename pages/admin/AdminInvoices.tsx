import React, { useEffect, useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  CreditCard, 
  Download,
  Loader2,
  CheckCircle2,
  Clock,
  Plus,
  X,
  Trash2,
  User,
  Calendar as CalendarIcon,
  Tag
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '../../services/supabaseClient';
import { TekifyInvoice, TekifyCustomer } from '../../types';
import { generateInvoicePDF } from '../../services/PDFService';

const AdminInvoices: React.FC = () => {
  const [invoices, setInvoices] = useState<TekifyInvoice[]>([]);
  const [customers, setCustomers] = useState<TekifyCustomer[]>([]);
  const [dbServices, setDbServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingInvoiceId, setEditingInvoiceId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [items, setItems] = useState<any[]>([
    { service_id: '', service_name: '', unit_price: 0, quantity: 1 }
  ]);

  const fetchInvoices = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('tekify_invoices')
      .select(`
        *,
        tekify_customers (*),
        tekify_invoice_items (*)
      `)
      .order('created_at', { ascending: false });

    if (error) console.error("Fetch Error:", error);
    else setInvoices(data || []);
    setLoading(false);
  };

  const fetchCustomers = async () => {
    const { data } = await supabase.from('tekify_customers').select('*').order('full_name');
    setCustomers(data || []);
  };

  const fetchServices = async () => {
    const { data } = await supabase.from('tekify_services').select('*').order('name');
    setDbServices(data || []);
  };

  useEffect(() => {
    fetchInvoices();
    fetchCustomers();
    fetchServices();
  }, []);

  const handleAddItem = () => {
    setItems([...items, { service_id: '', service_name: '', unit_price: 0, quantity: 1 }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...items];
    if (field === 'service_id') {
      const service = dbServices.find(s => s.id === value);
      if (service) {
        newItems[index] = {
          ...newItems[index],
          service_id: service.id,
          service_name: service.name,
          unit_price: service.price
        };
      } else {
        newItems[index] = {
          ...newItems[index],
          service_id: '',
          service_name: '',
          unit_price: 0
        };
      }
    } else {
      newItems[index][field] = value;
    }
    setItems(newItems);
  };

  const handleEditInvoice = (invoice: any) => {
    setEditingInvoiceId(invoice.id);
    setSelectedCustomerId(invoice.customer_id);
    setDueDate(invoice.due_date ? new Date(invoice.due_date).toISOString().split('T')[0] : '');
    
    if (invoice.tekify_invoice_items && invoice.tekify_invoice_items.length > 0) {
      setItems(invoice.tekify_invoice_items.map((item: any) => ({
        service_id: item.service_id || '',
        service_name: item.service_name || '',
        unit_price: item.unit_price || 0,
        quantity: item.quantity || 1
      })));
    } else {
      setItems([{ service_id: '', service_name: '', unit_price: 0, quantity: 1 }]);
    }
    
    setShowEditModal(true);
  };

  const handleUpdateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomerId) return toast.error("Please select a customer");
    if (items.some(item => !item.service_name || item.unit_price <= 0)) return toast.error("Please fill all item details");

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/admin/invoices/${editingInvoiceId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: selectedCustomerId,
          items,
          dueDate
        })
      });

      if (response.ok) {
        toast.success("Invoice updated successfully!");
        setShowEditModal(false);
        setEditingInvoiceId(null);
        setItems([{ service_id: '', service_name: '', unit_price: 0, quantity: 1 }]);
        setSelectedCustomerId('');
        fetchInvoices();
      } else {
        const err = await response.json();
        toast.error(`Error: ${err.error}`);
      }
    } catch (error) {
      console.error("Update Invoice Error:", error);
      toast.error("Failed to update invoice");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomerId) return toast.error("Please select a customer");
    if (items.some(item => !item.service_name || item.unit_price <= 0)) return toast.error("Please fill all item details");

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/admin/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: selectedCustomerId,
          items,
          dueDate
        })
      });

      if (response.ok) {
        toast.success("Invoice created successfully!");
        setShowCreateModal(false);
        setItems([{ service_id: '', service_name: '', unit_price: 0, quantity: 1 }]);
        setSelectedCustomerId('');
        fetchInvoices();
      } else {
        const err = await response.json();
        toast.error(`Error: ${err.error}`);
      }
    } catch (error) {
      console.error("Create Invoice Error:", error);
      toast.error("Failed to create invoice");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRecordPayment = async (id: string) => {
    const method = window.prompt("Enter payment method (e.g. Bank Transfer, Cash):", "Bank Transfer");
    if (!method) return;

    setProcessingId(id);
    try {
      const response = await fetch(`/api/admin/invoices/${id}/pay`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentMethod: method })
      });
      if (response.ok) {
        toast.success("Payment recorded and receipt sent!");
        await fetchInvoices();
      } else {
        const err = await response.json();
        toast.error(`Error: ${err.error}`);
      }
    } catch (error) {
      console.error("Payment API Error:", error);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">Invoice Management</h2>
          <p className="text-slate-500 font-medium mt-2">Track payments and manage financial records.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-3 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl hover:scale-105 transition-all"
          >
            <Plus className="w-4 h-4" /> Create Invoice
          </button>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search invoices..." 
              className="pl-12 pr-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            />
          </div>
          <button className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl text-slate-500 hover:text-primary-600 transition-all">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Invoices Table */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/5">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Invoice #</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Client</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Amount</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary-600 mx-auto" />
                  </td>
                </tr>
              ) : invoices.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-slate-400 font-bold">No invoices found.</td>
                </tr>
              ) : invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="font-black text-primary-600 dark:text-primary-400">{invoice.invoice_number}</div>
                    <div className="text-[10px] text-slate-400 font-bold">Issued: {new Date(invoice.issued_at || '').toLocaleDateString()}</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="font-bold text-slate-900 dark:text-white">{invoice.tekify_customers?.full_name}</div>
                    <div className="text-xs text-slate-500">{invoice.tekify_customers?.email}</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-sm font-black text-slate-900 dark:text-white">₦{Number(invoice.total_amount).toLocaleString()}</div>
                  </td>
                  <td className="px-8 py-6">
                    <StatusBadge status={invoice.status} />
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      {invoice.status === 'unpaid' && (
                        <button 
                          onClick={() => handleRecordPayment(invoice.id!)}
                          disabled={processingId === invoice.id}
                          className="p-2 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-lg transition-all"
                          title="Record Payment"
                        >
                          {processingId === invoice.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <CreditCard className="w-5 h-5" />}
                        </button>
                      )}
                      <button 
                        onClick={() => generateInvoicePDF(invoice)}
                        className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg transition-all"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleEditInvoice(invoice)}
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

      {/* Create Invoice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-[3rem] shadow-2xl border border-slate-200 dark:border-white/5 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-8 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
              <h3 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">Create New Invoice</h3>
              <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-all">
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>
            
            <form onSubmit={handleCreateInvoice} className="p-10 space-y-8 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Select Customer</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                    <select 
                      required
                      value={selectedCustomerId}
                      onChange={(e) => setSelectedCustomerId(e.target.value)}
                      className="w-full pl-12 pr-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 transition-all appearance-none dark:text-white"
                    >
                      <option value="" className="dark:bg-slate-900">Select a customer...</option>
                      {customers.map(c => <option key={c.id} value={c.id} className="dark:bg-slate-900">{c.full_name} ({c.email})</option>)}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Due Date</label>
                  <div className="relative group">
                    <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                    <input 
                      type="date" 
                      required
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full pl-12 pr-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Invoice Items</label>
                  <button 
                    type="button" 
                    onClick={handleAddItem}
                    className="text-[10px] font-black uppercase tracking-widest text-primary-600 hover:text-primary-700 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-3 h-3" /> Add Item
                  </button>
                </div>

                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 gap-4 items-end bg-slate-50 dark:bg-white/5 p-6 rounded-2xl border border-slate-200 dark:border-white/10">
                      <div className="col-span-12 md:col-span-5 space-y-2">
                        <label className="text-[8px] font-black uppercase tracking-widest text-slate-400">Service / Description</label>
                        <div className="relative group">
                          <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
                          <select 
                            value={item.service_id}
                            onChange={(e) => handleItemChange(index, 'service_id', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl outline-none text-sm appearance-none dark:text-white"
                          >
                            <option value="" className="dark:bg-slate-900">Custom Item...</option>
                            {dbServices.map(s => <option key={s.id} value={s.id} className="dark:bg-slate-900">{s.name}</option>)}
                          </select>
                        </div>
                        {!item.service_id && (
                          <input 
                            type="text"
                            placeholder="Custom description"
                            value={item.service_name}
                            onChange={(e) => handleItemChange(index, 'service_name', e.target.value)}
                            className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl outline-none text-sm mt-2 dark:text-white"
                          />
                        )}
                      </div>
                      <div className="col-span-6 md:col-span-3 space-y-2">
                        <label className="text-[8px] font-black uppercase tracking-widest text-slate-400">Unit Price (₦)</label>
                        <input 
                          type="number"
                          value={item.unit_price}
                          onChange={(e) => handleItemChange(index, 'unit_price', Number(e.target.value))}
                          className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl outline-none text-sm dark:text-white"
                        />
                      </div>
                      <div className="col-span-4 md:col-span-2 space-y-2">
                        <label className="text-[8px] font-black uppercase tracking-widest text-slate-400">Qty</label>
                        <input 
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                          className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl outline-none text-sm dark:text-white"
                        />
                      </div>
                      <div className="col-span-2 md:col-span-2 flex justify-end">
                        <button 
                          type="button" 
                          onClick={() => handleRemoveItem(index)}
                          className="p-3 text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-end pt-8 border-t border-slate-100 dark:border-white/5">
                <div className="space-y-1">
                  <div className="flex justify-between gap-8 text-xs font-bold text-slate-500">
                    <span>Subtotal:</span>
                    <span>₦{items.reduce((acc, item) => acc + (item.unit_price * item.quantity), 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between gap-8 text-xs font-bold text-slate-500">
                    <span>VAT (7.5%):</span>
                    <span>₦{(items.reduce((acc, item) => acc + (item.unit_price * item.quantity), 0) * 0.075).toLocaleString()}</span>
                  </div>
                  <div className="pt-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Amount</p>
                    <p className="text-3xl font-black text-slate-900 dark:text-white">
                      ₦{(items.reduce((acc, item) => acc + (item.unit_price * item.quantity), 0) * 1.075).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button 
                    type="button" 
                    onClick={() => setShowCreateModal(false)}
                    className="px-8 py-4 bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="px-8 py-4 bg-primary-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary-600/20 flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Generate Invoice'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Edit Invoice Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-[3rem] shadow-2xl border border-slate-200 dark:border-white/5 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-8 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
              <h3 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">Edit Invoice</h3>
              <button onClick={() => { setShowEditModal(false); setEditingInvoiceId(null); }} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-all">
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>
            
            <form onSubmit={handleUpdateInvoice} className="p-10 space-y-8 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Select Customer</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                    <select 
                      required
                      value={selectedCustomerId}
                      onChange={(e) => setSelectedCustomerId(e.target.value)}
                      className="w-full pl-12 pr-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 transition-all appearance-none dark:text-white"
                    >
                      <option value="" className="dark:bg-slate-900">Select a customer...</option>
                      {customers.map(c => <option key={c.id} value={c.id} className="dark:bg-slate-900">{c.full_name} ({c.email})</option>)}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Due Date</label>
                  <div className="relative group">
                    <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                    <input 
                      type="date" 
                      required
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full pl-12 pr-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Invoice Items</label>
                  <button 
                    type="button" 
                    onClick={handleAddItem}
                    className="text-[10px] font-black uppercase tracking-widest text-primary-600 hover:text-primary-700 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-3 h-3" /> Add Item
                  </button>
                </div>

                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 gap-4 items-end bg-slate-50 dark:bg-white/5 p-6 rounded-2xl border border-slate-200 dark:border-white/10">
                      <div className="col-span-12 md:col-span-5 space-y-2">
                        <label className="text-[8px] font-black uppercase tracking-widest text-slate-400">Service / Description</label>
                        <div className="relative group">
                          <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
                          <select 
                            value={item.service_id}
                            onChange={(e) => handleItemChange(index, 'service_id', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl outline-none text-sm appearance-none dark:text-white"
                          >
                            <option value="" className="dark:bg-slate-900">Custom Item...</option>
                            {dbServices.map(s => <option key={s.id} value={s.id} className="dark:bg-slate-900">{s.name}</option>)}
                          </select>
                        </div>
                        {!item.service_id && (
                          <input 
                            type="text"
                            placeholder="Custom description"
                            value={item.service_name}
                            onChange={(e) => handleItemChange(index, 'service_name', e.target.value)}
                            className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl outline-none text-sm mt-2 dark:text-white"
                          />
                        )}
                      </div>
                      <div className="col-span-6 md:col-span-3 space-y-2">
                        <label className="text-[8px] font-black uppercase tracking-widest text-slate-400">Unit Price (₦)</label>
                        <input 
                          type="number"
                          value={item.unit_price}
                          onChange={(e) => handleItemChange(index, 'unit_price', Number(e.target.value))}
                          className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl outline-none text-sm dark:text-white"
                        />
                      </div>
                      <div className="col-span-4 md:col-span-2 space-y-2">
                        <label className="text-[8px] font-black uppercase tracking-widest text-slate-400">Qty</label>
                        <input 
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                          className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl outline-none text-sm dark:text-white"
                        />
                      </div>
                      <div className="col-span-2 md:col-span-2 flex justify-end">
                        <button 
                          type="button" 
                          onClick={() => handleRemoveItem(index)}
                          className="p-3 text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-end pt-8 border-t border-slate-100 dark:border-white/5">
                <div className="space-y-1">
                  <div className="flex justify-between gap-8 text-xs font-bold text-slate-500">
                    <span>Subtotal:</span>
                    <span>₦{items.reduce((acc, item) => acc + (item.unit_price * item.quantity), 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between gap-8 text-xs font-bold text-slate-500">
                    <span>VAT (7.5%):</span>
                    <span>₦{(items.reduce((acc, item) => acc + (item.unit_price * item.quantity), 0) * 0.075).toLocaleString()}</span>
                  </div>
                  <div className="pt-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Amount</p>
                    <p className="text-3xl font-black text-slate-900 dark:text-white">
                      ₦{(items.reduce((acc, item) => acc + (item.unit_price * item.quantity), 0) * 1.075).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button 
                    type="button" 
                    onClick={() => { setShowEditModal(false); setEditingInvoiceId(null); }}
                    className="px-8 py-4 bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="px-8 py-4 bg-primary-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary-600/20 flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Update Invoice'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const styles: any = {
    unpaid: 'bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400',
    paid: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
    overdue: 'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400',
    cancelled: 'bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-400'
  };

  return (
    <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${styles[status] || 'bg-slate-100 text-slate-600'}`}>
      {status}
    </span>
  );
};

export default AdminInvoices;

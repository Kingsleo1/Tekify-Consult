import React, { useEffect, useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  FilePlus,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '../../services/supabaseClient';
import { TekifyBooking } from '../../types';

const AdminBookings: React.FC = () => {
  const [bookings, setBookings] = useState<TekifyBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchBookings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('tekify_bookings')
      .select(`
        *,
        tekify_customers (*)
      `)
      .order('created_at', { ascending: false });

    if (error) console.error("Fetch Error:", error);
    else setBookings(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleApprove = async (id: string) => {
    setProcessingId(id);
    const { error } = await supabase
      .from('tekify_bookings')
      .update({ status: 'approved' })
      .eq('id', id);
    
    if (!error) await fetchBookings();
    setProcessingId(null);
  };

  const handleCreateInvoice = async (id: string) => {
    setProcessingId(id);
    try {
      const response = await fetch(`/api/admin/bookings/${id}/invoice`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        toast.success("Invoice created and sent successfully!");
        await fetchBookings();
      } else {
        const err = await response.json();
        toast.error(`Error: ${err.error}`);
      }
    } catch (error) {
      console.error("Invoice API Error:", error);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">Booking Management</h2>
          <p className="text-slate-500 font-medium mt-2">Review and process client service requests.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search bookings..." 
              className="pl-12 pr-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            />
          </div>
          <button className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl text-slate-500 hover:text-primary-600 transition-all">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Bookings Table */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/5">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Client</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Service</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Date</th>
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
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-slate-400 font-bold">No bookings found.</td>
                </tr>
              ) : bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="font-bold text-slate-900 dark:text-white">{booking.tekify_customers?.full_name}</div>
                    <div className="text-xs text-slate-500">{booking.tekify_customers?.email}</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-sm font-bold text-slate-700 dark:text-slate-300">{booking.service_id}</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {new Date(booking.created_at || '').toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <StatusBadge status={booking.status} />
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      {booking.status === 'pending' && (
                        <button 
                          onClick={() => handleApprove(booking.id!)}
                          disabled={processingId === booking.id}
                          className="p-2 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-lg transition-all"
                          title="Approve"
                        >
                          {processingId === booking.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                        </button>
                      )}
                      {booking.status === 'approved' && (
                        <button 
                          onClick={() => handleCreateInvoice(booking.id!)}
                          disabled={processingId === booking.id}
                          className="p-2 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-600/10 rounded-lg transition-all"
                          title="Create Invoice"
                        >
                          {processingId === booking.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <FilePlus className="w-5 h-5" />}
                        </button>
                      )}
                      <button className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg transition-all">
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
    </div>
  );
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const styles: any = {
    pending: 'bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400',
    approved: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
    invoiced: 'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
    cancelled: 'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400'
  };

  return (
    <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${styles[status] || 'bg-slate-100 text-slate-600'}`}>
      {status}
    </span>
  );
};

export default AdminBookings;

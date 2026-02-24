import React, { useEffect, useState } from 'react';
import { 
  Search, 
  Filter, 
  Mail, 
  CheckCircle2, 
  XCircle,
  Loader2,
  Clock
} from 'lucide-react';
import { supabase } from '../../services/supabaseClient';

const AdminEmailLogs: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('tekify_email_logs')
      .select('*')
      .order('sent_at', { ascending: false });

    if (error) console.error("Fetch Error:", error);
    else setLogs(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">Email Automation Logs</h2>
          <p className="text-slate-500 font-medium mt-2">Monitor outgoing transactional emails.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search logs..." 
              className="pl-12 pr-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            />
          </div>
          <button className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl text-slate-500 hover:text-primary-600 transition-all">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Logs Table */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/5">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Timestamp</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Recipient</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Subject</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary-600 mx-auto" />
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center text-slate-400 font-bold">No email logs found.</td>
                </tr>
              ) : logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="text-sm font-bold text-slate-900 dark:text-white">{new Date(log.sent_at).toLocaleString()}</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="font-bold text-slate-900 dark:text-white">{log.tekify_customers?.full_name || 'System'}</div>
                    <div className="text-xs text-slate-500">{log.recipient_email}</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-sm font-medium text-slate-600 dark:text-slate-400">{log.subject}</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      {log.status === 'sent' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : log.status === 'failed' ? (
                        <XCircle className="w-4 h-4 text-red-500" />
                      ) : (
                        <Clock className="w-4 h-4 text-orange-500" />
                      )}
                      <span className={`text-[10px] font-black uppercase tracking-widest ${log.status === 'sent' ? 'text-emerald-500' : log.status === 'failed' ? 'text-red-500' : 'text-orange-500'}`}>
                        {log.status}
                      </span>
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

export default AdminEmailLogs;

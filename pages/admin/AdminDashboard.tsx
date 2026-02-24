import React, { useEffect, useState } from 'react';
import { 
  Users, 
  CalendarCheck, 
  FileText, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock
} from 'lucide-react';
import { supabase } from '../../services/supabaseClient';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    bookings: 0,
    invoices: 0,
    revenue: 0,
    customers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { count: bCount } = await supabase.from('tekify_bookings').select('*', { count: 'exact', head: true });
        const { count: iCount } = await supabase.from('tekify_invoices').select('*', { count: 'exact', head: true });
        const { count: cCount } = await supabase.from('tekify_customers').select('*', { count: 'exact', head: true });
        const { data: revData } = await supabase.from('tekify_invoices').select('total_amount').eq('status', 'paid');
        
        const totalRevenue = revData?.reduce((acc, curr) => acc + Number(curr.total_amount), 0) || 0;

        setStats({
          bookings: bCount || 0,
          invoices: iCount || 0,
          customers: cCount || 0,
          revenue: totalRevenue
        });
      } catch (error) {
        console.error("Stats Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="animate-pulse space-y-8">
    <div className="h-12 w-48 bg-slate-200 dark:bg-white/5 rounded-xl"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-slate-200 dark:bg-white/5 rounded-3xl"></div>)}
    </div>
  </div>;

  return (
    <div className="space-y-12">
      <header>
        <h2 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">Dashboard Overview</h2>
        <p className="text-slate-500 font-medium mt-2">Welcome back, Admin. Here's what's happening today.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard 
          icon={<CalendarCheck className="w-6 h-6" />} 
          label="Total Bookings" 
          value={stats.bookings.toString()} 
          trend="+12%" 
          trendUp={true} 
          color="bg-blue-500"
        />
        <StatCard 
          icon={<FileText className="w-6 h-6" />} 
          label="Active Invoices" 
          value={stats.invoices.toString()} 
          trend="+5%" 
          trendUp={true} 
          color="bg-purple-500"
        />
        <StatCard 
          icon={<TrendingUp className="w-6 h-6" />} 
          label="Total Revenue" 
          value={`₦${stats.revenue.toLocaleString()}`} 
          trend="+18%" 
          trendUp={true} 
          color="bg-emerald-500"
        />
        <StatCard 
          icon={<Users className="w-6 h-6" />} 
          label="Total Customers" 
          value={stats.customers.toString()} 
          trend="+3%" 
          trendUp={true} 
          color="bg-orange-500"
        />
      </div>

      {/* Recent Activity & Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-200 dark:border-white/5 shadow-xl">
          <h3 className="text-xl font-black tracking-tight text-slate-900 dark:text-white mb-8">Revenue Growth</h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {[40, 70, 45, 90, 65, 80, 95, 60, 85, 100, 75, 90].map((h, i) => (
              <div key={i} className="flex-1 bg-primary-600/20 dark:bg-primary-600/10 rounded-t-lg relative group">
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-primary-600 rounded-t-lg transition-all duration-1000" 
                  style={{ height: `${h}%` }}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-200 dark:border-white/5 shadow-xl">
          <h3 className="text-xl font-black tracking-tight text-slate-900 dark:text-white mb-8">Recent Bookings</h3>
          <div className="space-y-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">New Booking Request</p>
                  <p className="text-xs text-slate-500">2 hours ago</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-primary-600" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string; trend: string; trendUp: boolean; color: string }> = ({ icon, label, value, trend, trendUp, color }) => (
  <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-white/5 shadow-xl group hover:-translate-y-1 transition-all duration-300">
    <div className="flex justify-between items-start mb-6">
      <div className={`w-12 h-12 ${color} text-white rounded-2xl flex items-center justify-center shadow-lg`}>
        {icon}
      </div>
      <div className={`flex items-center gap-1 text-xs font-black ${trendUp ? 'text-emerald-500' : 'text-red-500'}`}>
        {trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {trend}
      </div>
    </div>
    <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">{label}</h4>
    <p className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white">{value}</p>
  </div>
);

export default AdminDashboard;

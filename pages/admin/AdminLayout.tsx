import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  FileText, 
  Receipt, 
  LogOut,
  Package,
  Mail,
  Users,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { supabase } from '../../services/supabaseClient';

const AdminLayout: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error("Auth session error:", error);
      }
      setSession(session);
      setLoading(false);
      if (!session) navigate('/admin/login');
    }).catch(err => {
      console.error("Failed to get session:", err);
      setLoading(false);
      navigate('/admin/login');
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) navigate('/admin/login');
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="w-12 h-12 animate-spin text-primary-600" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-500">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-white/5 flex items-center justify-between px-6 z-40">
        <h1 className="text-lg font-black tracking-tighter text-slate-900 dark:text-white uppercase italic">
          Tekify <span className="text-primary-600 dark:text-primary-400 not-italic text-sm">Admin</span>
        </h1>
        <button 
          onClick={() => setSidebarOpen(true)}
          className="p-2 text-slate-500 hover:text-primary-600 transition-all"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-white/5 flex flex-col fixed h-screen z-50 shadow-2xl transition-all duration-300
        ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'}
        ${desktopCollapsed ? 'lg:w-20' : 'lg:w-64'}
      `}>
        <div className={`p-8 border-b border-slate-100 dark:border-white/5 flex items-center ${desktopCollapsed ? 'justify-center px-4' : 'justify-between'} flex-shrink-0`}>
          {!desktopCollapsed && (
            <h1 className="text-xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic whitespace-nowrap overflow-hidden">
              Tekify <span className="text-primary-600 dark:text-primary-400 not-italic">Admin</span>
            </h1>
          )}
          {desktopCollapsed && (
            <h1 className="text-xl font-black tracking-tighter text-primary-600 dark:text-primary-400 uppercase italic">
              T
            </h1>
          )}
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 text-slate-400 hover:text-red-500 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Desktop Collapse Toggle */}
        <button
          onClick={() => setDesktopCollapsed(!desktopCollapsed)}
          className="hidden lg:flex absolute -right-4 top-20 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-full p-1.5 text-slate-400 hover:text-primary-600 shadow-sm transition-all z-50"
        >
          {desktopCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-white/10">
          <AdminNavLink to="/admin" end icon={<LayoutDashboard className="w-5 h-5 min-w-[20px]" />} label="Dashboard" collapsed={desktopCollapsed} onClick={() => setSidebarOpen(false)} />
          <AdminNavLink to="/admin/customers" icon={<Users className="w-5 h-5 min-w-[20px]" />} label="Customers" collapsed={desktopCollapsed} onClick={() => setSidebarOpen(false)} />
          <AdminNavLink to="/admin/bookings" icon={<CalendarCheck className="w-5 h-5 min-w-[20px]" />} label="Bookings" collapsed={desktopCollapsed} onClick={() => setSidebarOpen(false)} />
          <AdminNavLink to="/admin/invoices" icon={<FileText className="w-5 h-5 min-w-[20px]" />} label="Invoices" collapsed={desktopCollapsed} onClick={() => setSidebarOpen(false)} />
          <AdminNavLink to="/admin/receipts" icon={<Receipt className="w-5 h-5 min-w-[20px]" />} label="Receipts" collapsed={desktopCollapsed} onClick={() => setSidebarOpen(false)} />
          <AdminNavLink to="/admin/services" icon={<Package className="w-5 h-5 min-w-[20px]" />} label="Services" collapsed={desktopCollapsed} onClick={() => setSidebarOpen(false)} />
          <AdminNavLink to="/admin/emails" icon={<Mail className="w-5 h-5 min-w-[20px]" />} label="Email Logs" collapsed={desktopCollapsed} onClick={() => setSidebarOpen(false)} />
          
          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/5 lg:hidden">
             <button 
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
            >
              <LogOut className="w-5 h-5 min-w-[20px]" />
              <span>Sign Out</span>
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-white/5 flex-shrink-0 hidden lg:block">
          <button 
            onClick={handleSignOut}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all ${desktopCollapsed ? 'justify-center' : ''}`}
            title={desktopCollapsed ? "Sign Out" : undefined}
          >
            <LogOut className="w-5 h-5 min-w-[20px]" />
            {!desktopCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 p-8 md:p-12 pt-24 lg:pt-12 transition-all duration-300 ${desktopCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

const AdminNavLink: React.FC<{ to: string; icon: React.ReactNode; label: string; end?: boolean; collapsed?: boolean; onClick?: () => void }> = ({ to, icon, label, end, collapsed, onClick }) => (
  <NavLink
    to={to}
    end={end}
    onClick={onClick}
    title={collapsed ? label : undefined}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap overflow-hidden ${
        isActive
          ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20'
          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
      } ${collapsed ? 'justify-center px-0' : ''}`
    }
  >
    {icon}
    {!collapsed && <span>{label}</span>}
  </NavLink>
);

export default AdminLayout;

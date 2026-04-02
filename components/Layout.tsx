import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, Sun, Moon } from 'lucide-react';
import { NAV_LINKS, BUSINESS_INFO } from '../constants';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return true; // Default to dark mode
    }
    return true;
  });

  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Handle Theme Change
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden selection:bg-primary-500 selection:text-white bg-background-light dark:bg-background-darker transition-colors duration-500">
      
      {/* Background Gradients - Immersive Atmosphere */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-accent-purple/20 dark:bg-accent-purple/10 rounded-full blur-[120px] animate-blob mix-blend-normal opacity-70"></div>
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-accent-cyan/20 dark:bg-accent-cyan/10 rounded-full blur-[120px] animate-blob animation-delay-2000 mix-blend-normal opacity-70"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[60%] bg-primary-500/20 dark:bg-primary-500/10 rounded-full blur-[120px] animate-blob animation-delay-4000 mix-blend-normal opacity-70"></div>
      </div>

      {/* Navigation - Floating Premium Rail */}
      <nav className="sticky top-0 z-50 w-full px-2 sm:px-6 lg:px-8 py-2 sm:py-4">
        <div className="max-w-7xl mx-auto">
          <div className="glass-panel rounded-xl sm:rounded-2xl border border-slate-200/50 dark:border-white/10 shadow-2xl backdrop-blur-2xl px-4 sm:px-6 h-16 sm:h-20 flex justify-between items-center transition-all duration-500">
            {/* Logo */}
            <NavLink to="/" className="flex-shrink-0 flex items-center gap-2 sm:gap-3 cursor-pointer group">
              <div className="relative">
                {!logoError && (
                  <img 
                    src={BUSINESS_INFO.logo} 
                    alt={`${BUSINESS_INFO.name} Logo`}
                    onError={() => setLogoError(true)}
                    referrerPolicy="no-referrer"
                    className="h-8 sm:h-12 w-auto object-contain transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                  />
                )}
                <div className="absolute -inset-1 bg-primary-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="hidden xs:block">
                <h1 className="text-base sm:text-xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic">
                  Tekify <span className="text-primary-600 dark:text-primary-400 not-italic">Consult</span>
                </h1>
              </div>
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-2">
              <div className="flex bg-slate-100/50 dark:bg-white/5 rounded-full p-1 border border-slate-200/50 dark:border-white/5 backdrop-blur-md mr-4">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-500 ${
                        isActive 
                          ? 'bg-white dark:bg-slate-800 text-primary-600 dark:text-white shadow-lg transform scale-105' 
                          : 'text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>

              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme}
                className="p-3 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-primary-500 dark:hover:text-white transition-all duration-500 border border-slate-200/50 dark:border-white/5 mr-3 shadow-inner group"
                aria-label="Toggle Theme"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
                ) : (
                  <Moon className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-500" />
                )}
              </button>

              <NavLink
                to="/booking#booking-form"
                className="px-8 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-black uppercase tracking-widest shadow-xl hover:shadow-primary-500/20 hover:scale-105 active:scale-95 transition-all duration-500 border border-transparent dark:border-white/10"
              >
                Get Started
              </NavLink>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2 sm:gap-4">
              <button 
                onClick={toggleTheme}
                className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-white/5"
              >
                {isDark ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg active:scale-90 transition-all duration-300"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown - Full Screen Immersive */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-[60] bg-background-light/95 dark:bg-background-darker/95 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-300 overflow-y-auto">
            <div className="flex flex-col min-h-full p-8">
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-2">
                  {!logoError && (
                    <img 
                      src={BUSINESS_INFO.logo} 
                      alt={`${BUSINESS_INFO.name} Logo`}
                      onError={() => setLogoError(true)}
                      referrerPolicy="no-referrer"
                      className="h-10 w-auto object-contain"
                    />
                  )}
                  <h1 className="text-xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic">
                    Tekify <span className="text-primary-600 dark:text-primary-400 not-italic">Consult</span>
                  </h1>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-full bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-grow space-y-4">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-6 py-5 rounded-2xl text-2xl font-black uppercase tracking-tighter transition-all duration-300 ${
                        isActive
                          ? 'bg-primary-600 text-white shadow-2xl shadow-primary-600/30 translate-x-4'
                          : 'text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-white'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-slate-200 dark:border-white/10">
                <NavLink
                  to="/booking#booking-form"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center px-6 py-5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-lg font-black uppercase tracking-widest shadow-2xl"
                >
                  Book Now
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow relative z-10">
        {children}
      </main>

      {/* Footer - Modern Split Layout */}
      <footer className="relative bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/5 pt-16 sm:pt-24 pb-12 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16 lg:gap-12">
            
            {/* Brand Info */}
            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-center gap-3">
                {!logoError && (
                  <img 
                    src={BUSINESS_INFO.logo} 
                    alt={`${BUSINESS_INFO.name} Logo`}
                    onError={() => setLogoError(true)}
                    referrerPolicy="no-referrer"
                    className="h-10 sm:h-12 w-auto object-contain"
                  />
                )}
                <h2 className="text-xl sm:text-2xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic">
                  Tekify <span className="text-primary-600 dark:text-primary-400 not-italic">Consult</span>
                </h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
                We engineer digital excellence. From AI-driven automation to enterprise cloud systems, we transform your vision into high-performance reality.
              </p>
              <div className="flex space-x-3 sm:space-x-4">
                {[
                  { Icon: Facebook, url: BUSINESS_INFO.socials.facebook },
                  { Icon: Twitter, url: BUSINESS_INFO.socials.twitter },
                  { Icon: Linkedin, url: BUSINESS_INFO.socials.linkedin },
                  { Icon: Instagram, url: BUSINESS_INFO.socials.instagram }
                ].map(({ Icon, url }, i) => (
                  <a 
                    key={i} 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary-600 hover:text-white transition-all duration-500 hover:-translate-y-2 shadow-sm"
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5"/>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary-600 dark:text-primary-400 mb-8">Navigation</h3>
              <ul className="space-y-4">
                {NAV_LINKS.map(link => (
                   <li key={link.path}>
                     <NavLink to={link.path} className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-white transition-all duration-300 flex items-center gap-3 group">
                       <span className="w-2 h-[2px] bg-slate-300 dark:bg-slate-700 group-hover:w-4 group-hover:bg-primary-500 transition-all duration-300"></span>
                       {link.label}
                     </NavLink>
                   </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary-600 dark:text-primary-400 mb-8">Expertise</h3>
              <ul className="space-y-4">
                {['Web Engineering', 'Mobile Ecosystems', 'Cloud Architecture', 'AI Integration', 'Business Strategy'].map((item, i) => (
                  <li key={i}>
                    <Link to="/services" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-white transition-all duration-300 flex items-center gap-3 group">
                      <span className="w-2 h-[2px] bg-slate-300 dark:bg-slate-700 group-hover:w-4 group-hover:bg-primary-500 transition-all duration-300"></span>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary-600 dark:text-primary-400 mb-6 sm:mb-8">Connect</h3>
              <ul className="space-y-4 sm:space-y-6">
                <li className="flex items-start gap-3 sm:gap-4 group">
                  <div className="p-2.5 sm:p-3 bg-slate-100 dark:bg-white/5 rounded-xl sm:rounded-2xl text-slate-600 dark:text-slate-400 group-hover:bg-primary-600 group-hover:text-white transition-all duration-500">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="text-sm font-bold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    {BUSINESS_INFO.address}
                  </div>
                </li>
                <li className="flex items-center gap-3 sm:gap-4 group">
                   <div className="p-2.5 sm:p-3 bg-slate-100 dark:bg-white/5 rounded-xl sm:rounded-2xl text-slate-600 dark:text-slate-400 group-hover:bg-primary-600 group-hover:text-white transition-all duration-500">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="text-sm font-bold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    {BUSINESS_INFO.phone.split(',').map((p, i) => (
                      <div key={i}>{p.trim()}</div>
                    ))}
                  </div>
                </li>
                <li className="flex items-center gap-3 sm:gap-4 group">
                   <div className="p-2.5 sm:p-3 bg-slate-100 dark:bg-white/5 rounded-xl sm:rounded-2xl text-slate-600 dark:text-slate-400 group-hover:bg-primary-600 group-hover:text-white transition-all duration-500">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="text-sm font-bold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    {BUSINESS_INFO.email}
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-white/5 mt-24 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600">
              &copy; {new Date().getFullYear()} Tekify Consult. Engineered for the future.
            </p>
            <div className="flex items-center gap-8">
              <Link to="/admin" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600 hover:text-primary-500 transition-colors">Admin Portal</Link>
              <Link to="/privacy" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600 hover:text-primary-500 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600 hover:text-primary-500 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Rocket, MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, Hexagon, Sun, Moon } from 'lucide-react';
import { NAV_LINKS, BUSINESS_INFO } from '../constants';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      // Default to dark mode if no preference is saved
      return true;
    }
    return true;
  });

  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
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
    <div className="min-h-screen flex flex-col relative overflow-x-hidden selection:bg-primary-500 selection:text-white">
      
      {/* Background Gradients - Adjusted for both modes */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent-purple/30 dark:bg-accent-purple/10 rounded-full blur-[120px] animate-blob mix-blend-multiply dark:mix-blend-normal opacity-50 dark:opacity-100"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-accent-cyan/30 dark:bg-accent-cyan/10 rounded-full blur-[120px] animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-normal opacity-50 dark:opacity-100"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-primary-500/30 dark:bg-primary-500/10 rounded-full blur-[120px] animate-blob animation-delay-4000 mix-blend-multiply dark:mix-blend-normal opacity-50 dark:opacity-100"></div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 w-full glass-panel border-b-0 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <NavLink to="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer group">
              {!logoError ? (
                <img 
                  src={BUSINESS_INFO.logo} 
                  alt={`${BUSINESS_INFO.name} Logo`}
                  onError={() => setLogoError(true)}
                  className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-purple rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Hexagon className="w-6 h-6 fill-current" />
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Tekify<span className="text-primary-600 dark:text-primary-500">Consult</span>
                </h1>
              </div>
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1">
              <div className="flex bg-white/50 dark:bg-slate-800/50 rounded-full p-1 border border-slate-200 dark:border-white/5 backdrop-blur-md mr-4 shadow-sm">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        isActive 
                          ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-white shadow-md transform scale-105' 
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
                className="p-2.5 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary-500 dark:hover:text-white transition-colors border border-slate-200 dark:border-white/5 mr-3 shadow-sm"
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <NavLink
                to="/booking"
                className="px-6 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Get Started
              </NavLink>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-4">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 shadow-sm"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden glass-panel border-t border-slate-200 dark:border-white/5 animate-in slide-in-from-top-5 duration-200 absolute w-full z-50">
            <div className="px-4 pt-2 pb-6 space-y-2">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-100 dark:border-primary-500/20'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <NavLink
                to="/booking"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center mt-4 px-4 py-3 rounded-xl bg-primary-600 text-white font-bold shadow-md"
              >
                Book Now
              </NavLink>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative bg-white dark:bg-background-darker border-t border-slate-200 dark:border-white/5 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            
            {/* Brand Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                {!logoError ? (
                  <img 
                    src={BUSINESS_INFO.logo} 
                    alt={`${BUSINESS_INFO.name} Logo`}
                    onError={() => setLogoError(true)}
                    className="h-12 w-auto object-contain"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-accent-purple rounded-lg flex items-center justify-center text-white shadow-md">
                      <Hexagon className="w-5 h-5 fill-current" />
                  </div>
                )}
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Tekify Consult</h2>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
                Empowering businesses with global standard digital solutions and IT consulting. We transform ideas into powerful technologies.
              </p>
              <div className="flex space-x-4">
                {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500 dark:hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-sm">
                    <Icon className="w-4 h-4"/>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Company</h3>
              <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                {NAV_LINKS.map(link => (
                   <li key={link.path}><NavLink to={link.path} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-primary-200 dark:bg-primary-800 group-hover:bg-primary-500 transition-colors"></span>{link.label}</NavLink></li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Expertise</h3>
              <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                {['Web Development', 'Mobile Applications', 'Cloud Infrastructure', 'AI & Automation', 'Digital Marketing'].map((item, i) => (
                  <li key={i}><Link to="/services" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-primary-200 dark:bg-primary-800 group-hover:bg-primary-500 transition-colors"></span>{item}</Link></li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Contact</h3>
              <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
                <li className="flex items-start gap-3">
                  <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                    <MapPin className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  </div>
                  <span className="mt-1">{BUSINESS_INFO.address}</span>
                </li>
                <li className="flex items-center gap-3">
                   <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                    <Phone className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  </div>
                  <span>{BUSINESS_INFO.phone}</span>
                </li>
                <li className="flex items-center gap-3">
                   <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                    <Mail className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  </div>
                  <span>{BUSINESS_INFO.email}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 dark:text-slate-500">
            <p>&copy; {new Date().getFullYear()} Tekify Consult. All rights reserved.</p>
            <p className="flex items-center gap-1">Designed with <span className="text-red-500 animate-pulse">♥</span> in Abuja</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../constants';
import PageHero from '../components/PageHero';

const Contact: React.FC = () => {
  const inputClasses = "w-full px-8 py-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400 font-medium";

  return (
    <div className="min-h-screen transition-colors duration-500">
      <PageHero 
        title="Get in Touch"
        description="Have a question or want to discuss a project? We'd love to hear from you."
      />

      <div className="py-16 lg:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Contact Info - Technical Grid Style */}
          <div className="space-y-16 animate-in fade-in slide-in-from-left-8 duration-700 delay-100">
            <div className="space-y-12">
              <div className="flex items-start gap-4 sm:gap-8 group">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-500/10 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary-600 group-hover:text-white transition-all duration-500 shadow-inner">
                  <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-primary-600 dark:text-primary-400 group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary-600 dark:text-primary-400 mb-1 sm:mb-2">Visit Our Office</h3>
                  <p className="text-xl sm:text-2xl font-black tracking-tighter text-slate-900 dark:text-white leading-tight">{BUSINESS_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 sm:gap-8 group">
                 <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent-purple/10 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-accent-purple group-hover:text-white transition-all duration-500 shadow-inner">
                  <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-accent-purple group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-accent-purple mb-1 sm:mb-2">Email Us</h3>
                  <p className="text-xl sm:text-2xl font-black tracking-tighter text-slate-900 dark:text-white leading-tight break-all">{BUSINESS_INFO.email}</p>
                  <p className="text-xs sm:text-sm text-primary-600 dark:text-primary-400 mt-1 sm:mt-2 font-black uppercase tracking-widest">Response within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4 sm:gap-8 group">
                 <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent-cyan/10 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-accent-cyan group-hover:text-white transition-all duration-500 shadow-inner">
                  <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-accent-cyan group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-accent-cyan mb-1 sm:mb-2">Call Us</h3>
                  <div className="text-xl sm:text-2xl font-black tracking-tighter text-slate-900 dark:text-white leading-tight">
                    {BUSINESS_INFO.phone.split(',').map((p, i) => (
                      <div key={i}>{p.trim()}</div>
                    ))}
                  </div>
                  <p className="text-sm text-slate-400 dark:text-slate-600 mt-2 font-black uppercase tracking-widest">Mon-Fri from 9am to 6pm</p>
                </div>
              </div>
            </div>

            {/* Map - Brutalist Frame */}
            <div className="w-full h-80 bg-slate-100 dark:bg-slate-900 rounded-[3rem] overflow-hidden relative shadow-2xl border-4 border-white dark:border-slate-800 group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.816694682054!2d7.4277773!3d9.074444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0b0000000001%3A0x0!2sKado%2C%20Abuja!5e0!3m2!1sen!2sng!4v1620000000000!5m2!1sen!2sng" 
                width="100%" 
                height="100%" 
                style={{border:0, filter: 'grayscale(100%) contrast(1.2) brightness(0.8)'}} 
                loading="lazy"
                title="Office Location"
                className="opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000"
              ></iframe>
            </div>
          </div>

          {/* Form - Premium Card */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 md:p-12 lg:p-16 rounded-[2rem] md:rounded-[4rem] border border-slate-200 dark:border-white/5 shadow-2xl animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
            <h3 className="text-3xl sm:text-4xl font-black tracking-tighter text-slate-900 dark:text-white mb-8 sm:mb-10">Send us a Message</h3>
            <form className="space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 ml-2">Full Name</label>
                  <input type="text" className={inputClasses} placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 ml-2">Phone Number</label>
                  <input type="tel" className={inputClasses} placeholder="+234 ..." />
                </div>
              </div>
              
              <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 ml-2">Email Address</label>
                  <input type="email" className={inputClasses} placeholder="john@example.com" />
              </div>

              <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 ml-2">Subject</label>
                  <select className={inputClasses}>
                    <option className="bg-white dark:bg-slate-800">General Inquiry</option>
                    <option className="bg-white dark:bg-slate-800">Get a Quote</option>
                    <option className="bg-white dark:bg-slate-800">Support</option>
                    <option className="bg-white dark:bg-slate-800">Partnership</option>
                  </select>
              </div>

              <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 ml-2">Your Message</label>
                  <textarea rows={4} className={inputClasses} placeholder="Tell us about your project..."></textarea>
              </div>

              <button type="button" className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-widest py-6 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-2xl shadow-primary-500/20">
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;

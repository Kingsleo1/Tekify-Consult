import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../constants';
import PageHero from '../components/PageHero';

const Contact: React.FC = () => {
  const inputClasses = "w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400";

  return (
    <div className="min-h-screen">
      <PageHero 
        title="Get in Touch"
        description="Have a question or want to discuss a project? We'd love to hear from you."
      />

      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div className="space-y-10 animate-in fade-in slide-in-from-left-8 duration-700 delay-100">
            <div className="space-y-8">
              <div className="flex items-start space-x-6 p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-primary-500/30 transition-colors">
                <div className="w-12 h-12 bg-primary-50 dark:bg-primary-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Visit Our Office</h3>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">{BUSINESS_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-6 p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-primary-500/30 transition-colors">
                 <div className="w-12 h-12 bg-primary-50 dark:bg-primary-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Email Us</h3>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">{BUSINESS_INFO.email}</p>
                  <p className="text-sm text-primary-500 mt-1 font-medium">We respond within 24 hours.</p>
                </div>
              </div>

              <div className="flex items-start space-x-6 p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-primary-500/30 transition-colors">
                 <div className="w-12 h-12 bg-primary-50 dark:bg-primary-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Call Us</h3>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">{BUSINESS_INFO.phone}</p>
                  <p className="text-sm text-slate-400 mt-1">Mon-Fri from 9am to 6pm.</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="w-full h-64 bg-slate-200 dark:bg-slate-800 rounded-3xl overflow-hidden relative shadow-inner">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.816694682054!2d7.4277773!3d9.074444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0b0000000001%3A0x0!2sKado%2C%20Abuja!5e0!3m2!1sen!2sng!4v1620000000000!5m2!1sen!2sng" 
                width="100%" 
                height="100%" 
                style={{border:0, filter: 'grayscale(100%) invert(10%)'}} 
                loading="lazy"
                title="Office Location"
                className="opacity-70 hover:opacity-100 transition-opacity duration-500"
              ></iframe>
            </div>
          </div>

          {/* Form */}
          <div className="glass-panel p-8 md:p-10 rounded-3xl animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Send us a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Name</label>
                  <input type="text" className={inputClasses} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Phone</label>
                  <input type="tel" className={inputClasses} />
                </div>
              </div>
              
              <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email</label>
                  <input type="email" className={inputClasses} />
              </div>

              <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Subject</label>
                  <select className={inputClasses}>
                    <option className="dark:bg-slate-800">General Inquiry</option>
                    <option className="dark:bg-slate-800">Get a Quote</option>
                    <option className="dark:bg-slate-800">Support</option>
                    <option className="dark:bg-slate-800">Partnership</option>
                  </select>
              </div>

              <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Message</label>
                  <textarea rows={4} className={inputClasses}></textarea>
              </div>

              <button type="button" className="w-full bg-primary-600 text-white font-bold py-4 rounded-xl hover:bg-primary-700 shadow-lg hover:shadow-primary-600/30 transition-all">
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
import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Calendar, Clock, User, Mail, Phone, CheckCircle2, CreditCard, MessageCircle } from 'lucide-react';
import { SERVICES } from '../constants';
import PageHero from '../components/PageHero';

const InputWrapper = ({ icon: Icon, children }: { icon: any, children?: React.ReactNode }) => (
  <div className="relative">
    <Icon className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
    {children}
  </div>
);

const Booking: React.FC = () => {
  const location = useLocation();
  const initialServiceId = location.state?.serviceId || '';
  
  const [step, setStep] = useState(1);
  const [bookingMethod, setBookingMethod] = useState<'online' | 'whatsapp'>('online');
  const [formData, setFormData] = useState({
    service: initialServiceId,
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (bookingMethod === 'whatsapp') {
      const serviceDetails = SERVICES.find(s => s.id === formData.service);
      const text = `*New Booking Request*%0A%0A` +
        `I would like to book a service:%0A` +
        `*Service:* ${serviceDetails?.title || 'Not Selected'}%0A` +
        `*Price Estimate:* ${serviceDetails?.price || 'N/A'}%0A` +
        `*Date:* ${formData.date}%0A` +
        `*Time:* ${formData.time}%0A%0A` +
        `*Customer Details:*%0A` +
        `Name: ${formData.name}%0A` +
        `Email: ${formData.email}%0A` +
        `Phone: ${formData.phone}%0A` +
        `Notes: ${formData.notes}`;
       
       window.open(`https://wa.me/2348031175589?text=${text}`, '_blank');
    }
    
    setStep(3); // Success state
  };

  const inputClasses = "w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400";

  return (
    <div className="min-h-screen">
      <PageHero 
        title="Start Your Project"
        description="Tell us about your needs and schedule a consultation with our experts."
      />
      
      <div className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        
        {/* Progress Steps */}
        <div className="mb-12 flex justify-center">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step >= 1 ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>1</div>
            <div className={`w-20 h-1 rounded-full mx-2 ${step >= 2 ? 'bg-primary-500' : 'bg-slate-200 dark:bg-slate-800'}`}></div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step >= 2 ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>2</div>
            <div className={`w-20 h-1 rounded-full mx-2 ${step >= 3 ? 'bg-primary-500' : 'bg-slate-200 dark:bg-slate-800'}`}></div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step >= 3 ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
              <CheckCircle2 className="w-5 h-5"/>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-3xl shadow-xl overflow-hidden p-8 md:p-12">
            
            {step === 1 && (
              <form onSubmit={() => setStep(2)} className="animate-in fade-in slide-in-from-right-8 duration-500">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Select Service Details</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Service Required</label>
                    <div className="relative">
                      <select 
                        name="service" 
                        value={formData.service} 
                        onChange={handleChange}
                        className={`${inputClasses} pl-4 appearance-none`}
                        required
                      >
                        <option value="" className="dark:bg-slate-800">Select a service...</option>
                        {SERVICES.map(s => (
                          <option key={s.id} value={s.id} className="dark:bg-slate-800">{s.title} - {s.price}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-4 pointer-events-none">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Preferred Date</label>
                      <InputWrapper icon={Calendar}>
                        <input 
                          type="date" 
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          className={inputClasses}
                          required
                        />
                      </InputWrapper>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Preferred Time</label>
                      <InputWrapper icon={Clock}>
                        <select
                           name="time"
                           value={formData.time}
                           onChange={handleChange}
                           className={inputClasses}
                           required
                        >
                          <option value="" className="dark:bg-slate-800">Select time...</option>
                          <option value="09:00" className="dark:bg-slate-800">09:00 AM</option>
                          <option value="11:00" className="dark:bg-slate-800">11:00 AM</option>
                          <option value="14:00" className="dark:bg-slate-800">02:00 PM</option>
                          <option value="16:00" className="dark:bg-slate-800">04:00 PM</option>
                        </select>
                      </InputWrapper>
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-4 rounded-xl hover:opacity-90 transition-opacity mt-6 shadow-lg">
                    Next Step
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmit} className="animate-in fade-in slide-in-from-right-8 duration-500">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Personal Information</h2>
                
                <div className="space-y-6">
                  <InputWrapper icon={User}>
                    <input 
                      type="text" 
                      name="name" 
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClasses}
                      required
                    />
                  </InputWrapper>
                  
                  <InputWrapper icon={Mail}>
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClasses}
                      required
                    />
                  </InputWrapper>

                  <InputWrapper icon={Phone}>
                    <input 
                      type="tel" 
                      name="phone" 
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputClasses}
                      required
                    />
                  </InputWrapper>

                  <div>
                    <textarea 
                      name="notes"
                      rows={4}
                      placeholder="Describe your project requirements..."
                      value={formData.notes}
                      onChange={handleChange}
                      className={`${inputClasses} pl-4`}
                    ></textarea>
                  </div>

                  {/* Booking Method Selection */}
                  <div className="space-y-4 pt-4">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">How would you like to proceed?</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setBookingMethod('online')}
                        className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                          bookingMethod === 'online' 
                            ? 'bg-primary-50 border-primary-500 text-primary-700 dark:bg-primary-900/20 dark:border-primary-500 dark:text-primary-300 ring-1 ring-primary-500' 
                            : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-primary-500/50'
                        }`}
                      >
                        <CreditCard className="w-6 h-6" />
                        <span className="font-bold">Pay Online</span>
                        <span className="text-xs opacity-75">Secure Checkout</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setBookingMethod('whatsapp')}
                        className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                          bookingMethod === 'whatsapp' 
                            ? 'bg-green-50 border-green-500 text-green-700 dark:bg-green-900/20 dark:border-green-500 dark:text-green-300 ring-1 ring-green-500' 
                            : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-green-500/50'
                        }`}
                      >
                        <MessageCircle className="w-6 h-6" />
                        <span className="font-bold">Book via WhatsApp</span>
                        <span className="text-xs opacity-75">Chat with Agent</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button type="button" onClick={() => setStep(1)} className="w-1/3 bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white font-bold py-4 rounded-xl hover:bg-slate-200 dark:hover:bg-white/20 transition-colors">
                      Back
                    </button>
                    <button type="submit" className={`w-2/3 text-white font-bold py-4 rounded-xl transition-colors shadow-lg ${bookingMethod === 'whatsapp' ? 'bg-green-600 hover:bg-green-700 shadow-green-600/30' : 'bg-primary-600 hover:bg-primary-700 shadow-primary-600/30'}`}>
                      {bookingMethod === 'whatsapp' ? 'Continue to WhatsApp' : 'Confirm Booking'}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {step === 3 && (
              <div className="text-center py-10 animate-in zoom-in duration-500">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${bookingMethod === 'whatsapp' ? 'bg-green-100 dark:bg-green-500/20' : 'bg-primary-100 dark:bg-primary-500/20'}`}>
                   {bookingMethod === 'whatsapp' ? <MessageCircle className="w-12 h-12 text-green-500" /> : <CheckCircle2 className="w-12 h-12 text-primary-500" />}
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                    {bookingMethod === 'whatsapp' ? 'Opening WhatsApp...' : 'Request Received!'}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
                    {bookingMethod === 'whatsapp' 
                    ? "We are redirecting you to our WhatsApp line to finalize your booking details."
                    : `Thanks ${formData.name}. We've logged your request for ${SERVICES.find(s => s.id === formData.service)?.title}.`
                    }
                </p>
                {bookingMethod === 'online' && (
                    <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-xl text-sm text-slate-500 dark:text-slate-400 mb-8 border border-slate-200 dark:border-white/5">
                        Check your inbox ({formData.email}) for the confirmation ticket.
                    </div>
                )}
                <Link to="/" className="inline-block bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold px-10 py-4 rounded-full hover:scale-105 transition-transform">
                  Return Home
                </Link>
              </div>
            )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Booking;
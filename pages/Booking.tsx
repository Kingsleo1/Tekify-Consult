import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Calendar, Clock, User, Mail, Phone, CheckCircle2, CreditCard, MessageCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '../services/supabaseClient';
import { ServicePlan } from '../types';
import { BUSINESS_INFO } from '../constants';
import PageHero from '../components/PageHero';

const InputWrapper = ({ icon: Icon, children }: { icon: any, children?: React.ReactNode }) => (
  <div className="relative group">
    <Icon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
    {children}
  </div>
);

const Booking: React.FC = () => {
  const location = useLocation();
  const initialServiceId = location.state?.serviceId || '';
  
  const [step, setStep] = useState(1);
  const [bookingMethod, setBookingMethod] = useState<'online' | 'whatsapp'>('online');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [services, setServices] = useState<ServicePlan[]>([]);
  // const [loadingServices, setLoadingServices] = useState(true);
  const [formData, setFormData] = useState({
    service: initialServiceId,
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await supabase.from('tekify_services').select('*').order('name');
      setServices(data || []);
      // setLoadingServices(false);
    };
    fetchServices();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const serviceDetails = services.find(s => s.id === formData.service);

    if (bookingMethod === 'whatsapp') {
      const text = `*New Booking Request*%0A%0A` +
        `I would like to book a service:%0A` +
        `*Service:* ${serviceDetails?.name || 'Not Selected'}%0A` +
        `*Price Estimate:* ₦${Number(serviceDetails?.price || 0).toLocaleString()}%0A` +
        `*Date:* ${formData.date}%0A` +
        `*Time:* ${formData.time}%0A%0A` +
        `*Customer Details:*%0A` +
        `Name: ${formData.name}%0A` +
        `Email: ${formData.email}%0A` +
        `Phone: ${formData.phone}%0A` +
        `Notes: ${formData.notes}`;
       
       window.open(`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${text}`, '_blank');
       setStep(3);
    } else {
      try {
        const response = await fetch('/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer: {
              full_name: formData.name,
              email: formData.email,
              phone: formData.phone
            },
            serviceId: formData.service,
            notes: formData.notes
          })
        });

        if (response.ok) {
          setStep(3);
          toast.success("Booking request submitted successfully!");
        } else {
          const err = await response.json();
          toast.error(`Error: ${err.error}`);
        }
      } catch (error) {
        console.error("Booking Submission Error:", error);
        toast.error("Failed to submit booking. Please try again.");
      }
    }
    
    setIsSubmitting(false);
  };

  const inputClasses = "w-full pl-16 pr-6 py-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400 font-medium";

  return (
    <div className="min-h-screen transition-colors duration-500">
      <PageHero 
        title="Start Your Project"
        description="Tell us about your needs and schedule a consultation with our experts."
      />
      
      <div id="booking-form" className="py-16 lg:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Progress Steps - Modern Minimal */}
        <div className="mb-24 flex justify-center">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg transition-all duration-500 ${step >= 1 ? 'bg-primary-600 text-white shadow-2xl shadow-primary-600/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>1</div>
            <div className={`w-16 h-1 rounded-full ${step >= 2 ? 'bg-primary-600' : 'bg-slate-200 dark:bg-slate-800'} transition-all duration-500`}></div>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg transition-all duration-500 ${step >= 2 ? 'bg-primary-600 text-white shadow-2xl shadow-primary-600/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>2</div>
            <div className={`w-16 h-1 rounded-full ${step >= 3 ? 'bg-primary-600' : 'bg-slate-200 dark:bg-slate-800'} transition-all duration-500`}></div>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg transition-all duration-500 ${step >= 3 ? 'bg-green-500 text-white shadow-2xl shadow-green-500/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
              <CheckCircle2 className="w-6 h-6"/>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[4rem] shadow-2xl border border-slate-200 dark:border-white/5 overflow-hidden p-12 md:p-20">
            
            {step === 1 && (
              <form onSubmit={() => setStep(2)} className="animate-in fade-in slide-in-from-right-8 duration-500">
                <h2 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white mb-12">Select Service Details</h2>
                
                <div className="space-y-10">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 ml-2">Service Required</label>
                    <div className="relative group">
                      <select 
                        name="service" 
                        value={formData.service} 
                        onChange={handleChange}
                        className={`${inputClasses} pl-6 appearance-none`}
                        required
                      >
                        <option value="" className="bg-white dark:bg-slate-800">Select a service...</option>
                        {services.map(s => (
                          <option key={s.id} value={s.id} className="bg-white dark:bg-slate-800">{s.name} - ₦{Number(s.price).toLocaleString()}</option>
                        ))}
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 ml-2">Preferred Date</label>
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
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 ml-2">Preferred Time</label>
                      <InputWrapper icon={Clock}>
                        <select
                           name="time"
                           value={formData.time}
                           onChange={handleChange}
                           className={inputClasses}
                           required
                        >
                          <option value="" className="bg-white dark:bg-slate-800">Select time...</option>
                          <option value="09:00" className="bg-white dark:bg-slate-800">09:00 AM</option>
                          <option value="11:00" className="bg-white dark:bg-slate-800">11:00 AM</option>
                          <option value="14:00" className="bg-white dark:bg-slate-800">02:00 PM</option>
                          <option value="16:00" className="bg-white dark:bg-slate-800">04:00 PM</option>
                        </select>
                      </InputWrapper>
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-widest py-6 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-2xl mt-8">
                    Next Step
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmit} className="animate-in fade-in slide-in-from-right-8 duration-500">
                <h2 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white mb-12">Personal Information</h2>
                
                <div className="space-y-8">
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
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 ml-2">Project Requirements</label>
                    <textarea 
                      name="notes"
                      rows={4}
                      placeholder="Describe your project requirements..."
                      value={formData.notes}
                      onChange={handleChange}
                      className={`${inputClasses} pl-8`}
                    ></textarea>
                  </div>

                  {/* Booking Method Selection */}
                  <div className="space-y-6 pt-8">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-2">How would you like to proceed?</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <button
                        type="button"
                        onClick={() => setBookingMethod('online')}
                        className={`p-8 rounded-[2.5rem] border-2 flex flex-col items-center justify-center gap-4 transition-all duration-500 ${
                          bookingMethod === 'online' 
                            ? 'bg-primary-500/10 border-primary-600 text-primary-600 dark:text-primary-400 shadow-2xl shadow-primary-500/20' 
                            : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400 hover:border-primary-500/50'
                        }`}
                      >
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${bookingMethod === 'online' ? 'bg-primary-600 text-white' : 'bg-slate-200 dark:bg-white/5 text-slate-400'} transition-all duration-500 shadow-inner`}>
                          <CreditCard className="w-7 h-7" />
                        </div>
                        <span className="font-black uppercase tracking-widest">Pay Online</span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Secure Checkout</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setBookingMethod('whatsapp')}
                        className={`p-8 rounded-[2.5rem] border-2 flex flex-col items-center justify-center gap-4 transition-all duration-500 ${
                          bookingMethod === 'whatsapp' 
                            ? 'bg-green-500/10 border-green-600 text-green-600 dark:text-green-400 shadow-2xl shadow-green-500/20' 
                            : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400 hover:border-green-500/50'
                        }`}
                      >
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${bookingMethod === 'whatsapp' ? 'bg-green-600 text-white' : 'bg-slate-200 dark:bg-white/5 text-slate-400'} transition-all duration-500 shadow-inner`}>
                          <MessageCircle className="w-7 h-7" />
                        </div>
                        <span className="font-black uppercase tracking-widest">WhatsApp</span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Chat with Agent</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6 mt-12">
                    <button type="button" onClick={() => setStep(1)} className="sm:w-1/3 bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white font-black uppercase tracking-widest py-6 rounded-2xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all">
                      Back
                    </button>
                    <button type="submit" className={`sm:w-2/3 text-white font-black uppercase tracking-widest py-6 rounded-2xl transition-all duration-300 shadow-2xl ${bookingMethod === 'whatsapp' ? 'bg-green-600 hover:bg-green-700 shadow-green-600/30' : 'bg-primary-600 hover:bg-primary-700 shadow-primary-600/30'}`}>
                      {bookingMethod === 'whatsapp' ? 'Continue to WhatsApp' : 'Confirm Booking'}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {step === 3 && (
              <div className="text-center py-16 animate-in zoom-in duration-700">
                <div className={`w-32 h-32 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 ${bookingMethod === 'whatsapp' ? 'bg-green-500/10' : 'bg-primary-500/10'} shadow-inner`}>
                   {bookingMethod === 'whatsapp' ? <MessageCircle className="w-16 h-16 text-green-600 dark:text-green-400" /> : <CheckCircle2 className="w-16 h-16 text-primary-600 dark:text-primary-400" />}
                </div>
                <h2 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white mb-6">
                    {bookingMethod === 'whatsapp' ? 'Opening WhatsApp...' : 'Request Received!'}
                </h2>
                <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-md mx-auto font-medium leading-relaxed">
                    {bookingMethod === 'whatsapp' 
                    ? "We are redirecting you to our WhatsApp line to finalize your booking details."
                    : `Thanks ${formData.name}. We've logged your request for ${services.find(s => s.id === formData.service)?.name}.`
                    }
                </p>
                {bookingMethod === 'online' && (
                    <div className="p-8 bg-slate-50 dark:bg-white/5 rounded-[2rem] text-sm font-bold text-slate-500 dark:text-slate-400 mb-12 border border-slate-200 dark:border-white/5">
                        {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : `Check your inbox (${formData.email}) for the confirmation ticket.`}
                    </div>
                )}
                <Link to="/" className="inline-block bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-widest px-16 py-6 rounded-2xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl">
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

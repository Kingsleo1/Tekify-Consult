import React from 'react';
import { MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../constants';

const WhatsAppButton: React.FC = () => {
  const handleClick = () => {
    window.open(`https://wa.me/${BUSINESS_INFO.whatsapp}?text=Hello%20Tekify%20Consult,%20I%20would%20like%20to%20enquire%20about...`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 left-8 z-50 flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-[1.5rem] shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-8 h-8 group-hover:rotate-12 transition-transform duration-500" />
      <span className="absolute left-20 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap -translate-x-4 group-hover:translate-x-0 border border-slate-100 dark:border-white/5">
        Chat with us
      </span>
    </button>
  );
};

export default WhatsAppButton;

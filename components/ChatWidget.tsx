import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Bot, X, MessageSquare } from 'lucide-react';
import TekiAlly from './TekiAlly';
import { BUSINESS_INFO } from '../constants';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTekiOpen, setIsTekiOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${BUSINESS_INFO.whatsapp}?text=Hello%20Tekify%20Consult,%20I%20would%20like%20to%20enquire%20about...`, '_blank');
    setIsOpen(false);
  };

  const handleTekiClick = () => {
    setIsTekiOpen(true);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4" ref={widgetRef}>
      {/* Menu Options */}
      {isOpen && (
        <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200 mb-2">
          <button
            onClick={handleTekiClick}
            className="flex items-center gap-3 px-5 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl shadow-xl hover:scale-105 transition-all group border border-slate-100 dark:border-white/10"
          >
            <span className="text-sm font-bold">Chat with AI</span>
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
              <Bot className="w-5 h-5" />
            </div>
          </button>

          <button
            onClick={handleWhatsAppClick}
            className="flex items-center gap-3 px-5 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl shadow-xl hover:scale-105 transition-all group border border-slate-100 dark:border-white/10"
          >
            <span className="text-sm font-bold">WhatsApp</span>
            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
              <MessageCircle className="w-5 h-5" />
            </div>
          </button>
        </div>
      )}

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-16 h-16 rounded-[1.5rem] shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 z-50 ${
          isOpen ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 rotate-90' : 'bg-primary-600 text-white'
        }`}
      >
        {isOpen ? <X className="w-8 h-8" /> : <MessageSquare className="w-8 h-8" />}
      </button>

      {/* Teki Ally Window */}
      <TekiAlly isOpen={isTekiOpen} onClose={() => setIsTekiOpen(false)} />
    </div>
  );
};

export default ChatWidget;

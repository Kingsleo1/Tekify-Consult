import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Minimize2, Sparkles, User, Download, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { sendMessageToTeki } from '../services/geminiService';
import { ChatMessage } from '../types';

const TekiAlly: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm Teki Ally, your AI consultant. How can I help grow your business today?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const stream = await sendMessageToTeki(userMsg);
      
      setMessages(prev => [...prev, { role: 'model', text: '' }]);
      
      let fullText = '';
      
      for await (const chunk of stream) {
        fullText += chunk;
        setMessages(prev => {
          const newHistory = [...prev];
          const lastMsg = newHistory[newHistory.length - 1];
          if (lastMsg.role === 'model') {
            lastMsg.text = fullText;
          }
          return newHistory;
        });
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again or contact our support.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const downloadResponse = (text: string, index: number) => {
    const element = document.createElement("a");
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `teki-ally-response-${index + 1}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const clearChat = () => {
    if (window.confirm("Are you sure you want to clear the chat history?")) {
      setMessages([{ role: 'model', text: "Hello! I'm Teki Ally, your AI consultant. How can I help grow your business today?" }]);
    }
  };

  return (
    <>
      {/* Toggle Button - Modern Floating */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-16 h-16 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[1.5rem] shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group animate-float"
        >
          <Bot className="w-8 h-8 group-hover:rotate-12 transition-transform duration-500" />
          <span className="absolute -top-2 -right-2 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-primary-500 border-4 border-white dark:border-slate-900"></span>
          </span>
        </button>
      )}

      {/* Chat Window - Immersive Glass */}
      <div 
        ref={chatRef}
        className={`fixed bottom-8 right-8 z-50 w-[calc(100vw-4rem)] md:w-[600px] flex flex-col transition-all duration-500 transform origin-bottom-right ${isOpen ? 'scale-100 opacity-100 h-[min(950px,calc(100vh-4rem))]' : 'scale-90 opacity-0 h-0 pointer-events-none'}`}
      >
        <div className="flex-1 flex flex-col bg-white dark:bg-slate-950 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-slate-200 dark:border-white/10 overflow-hidden relative">
            
            {/* Background Atmosphere */}
            <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-40">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-500/20 via-transparent to-accent-purple/20"></div>
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-500/30 blur-[100px] rounded-full animate-pulse"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent-purple/30 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Header - Premium Minimal */}
            <div className="relative p-8 flex items-center justify-between border-b border-slate-100 dark:border-white/5 bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl flex items-center justify-center shadow-xl">
                  <Bot className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-black tracking-tighter text-slate-900 dark:text-white leading-none mb-1">Teki Ally</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Active Intelligence</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={clearChat}
                  title="Clear Chat"
                  className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <button onClick={() => setIsOpen(false)} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-all">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Area - Clean Editorial */}
            <div className="relative flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex max-w-[95%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-4`}>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg mt-1 ${msg.role === 'user' ? 'bg-slate-900 text-white' : 'bg-white dark:bg-slate-800 text-primary-600 dark:text-primary-400 border border-slate-100 dark:border-white/5'}`}>
                      {msg.role === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className={`p-6 rounded-[2rem] text-sm font-medium leading-relaxed shadow-xl ${
                        msg.role === 'user' 
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-br-none' 
                          : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 border border-slate-100 dark:border-white/5 rounded-bl-none'
                      } ${msg.isError ? 'bg-red-500/10 text-red-500 border-red-500/20' : ''}`}>
                        {msg.role === 'model' ? (
                          <div className="markdown-body prose dark:prose-invert prose-sm max-w-none">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {msg.text || (isLoading && idx === messages.length - 1 ? "..." : "")}
                            </ReactMarkdown>
                          </div>
                        ) : (
                          msg.text
                        )}
                        {isLoading && idx === messages.length - 1 && !msg.text && (
                          <div className="flex gap-1.5 h-5 items-center">
                              <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                              <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                              <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          </div>
                        )}
                      </div>
                      {msg.role === 'model' && msg.text && (
                        <button 
                          onClick={() => downloadResponse(msg.text, idx)}
                          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary-600 transition-colors ml-4"
                        >
                          <Download className="w-3 h-3" />
                          Download Response
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area - Modern Floating */}
            <div className="relative p-8 pb-6 bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl border-t border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 focus-within:ring-2 focus-within:ring-primary-500 transition-all shadow-inner">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask anything..."
                  className="flex-1 bg-transparent outline-none text-slate-900 dark:text-white text-sm font-medium placeholder-slate-400"
                  disabled={isLoading}
                />
                <button 
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isLoading}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 ${
                    inputValue.trim() && !isLoading 
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl hover:scale-110 active:scale-90' 
                      : 'bg-slate-200 dark:bg-white/10 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-4 flex items-center justify-center gap-3">
                <div className="h-[1px] flex-1 bg-slate-100 dark:bg-white/5"></div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 dark:text-slate-600">Tekify Intelligence</p>
                <div className="h-[1px] flex-1 bg-slate-100 dark:bg-white/5"></div>
              </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default TekiAlly;

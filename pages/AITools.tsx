import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Image as ImageIcon, Video, Mic, MapPin, Zap, Brain, 
  Sparkles, Send, Upload, Play, Loader2, Music, Volume2, 
  Languages, FileAudio, ExternalLink 
} from 'lucide-react';
import PageHero from '../components/PageHero';
import { 
  generateTextContent, 
  generateImage, 
  analyzeImage, 
  generateVeoVideo, 
  generateSpeech, 
  transcribeAudio, 
  playAudioBuffer,
  GenerationMode
} from '../services/geminiService';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';

const AITools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'vision' | 'audio'>('chat');

  return (
    <div className="min-h-screen pb-32 transition-colors duration-500">
      <PageHero 
        title="AI Tools Playground"
        description="Experience the raw power of Gemini. Generate videos, analyze images, chat with maps grounding, and more."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="bg-white dark:bg-slate-900 rounded-[4rem] shadow-2xl border border-slate-200 dark:border-white/5 overflow-hidden min-h-[900px] flex flex-col">
          
          {/* Tabs - Modern Minimal */}
          <div className="flex border-b border-slate-200 dark:border-white/5 overflow-x-auto bg-slate-50/50 dark:bg-white/5">
            <button 
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-10 px-8 flex items-center justify-center gap-4 font-black uppercase tracking-widest text-xs transition-all whitespace-nowrap relative group ${activeTab === 'chat' ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
            >
              <Bot className={`w-5 h-5 ${activeTab === 'chat' ? 'scale-110' : 'group-hover:scale-110'} transition-transform`} />
              Chat & Knowledge
              {activeTab === 'chat' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-600 rounded-full"></div>}
            </button>
            <button 
              onClick={() => setActiveTab('vision')}
              className={`flex-1 py-10 px-8 flex items-center justify-center gap-4 font-black uppercase tracking-widest text-xs transition-all whitespace-nowrap relative group ${activeTab === 'vision' ? 'text-accent-purple' : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
            >
              <ImageIcon className={`w-5 h-5 ${activeTab === 'vision' ? 'scale-110' : 'group-hover:scale-110'} transition-transform`} />
              Vision Studio
              {activeTab === 'vision' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent-purple rounded-full"></div>}
            </button>
            <button 
              onClick={() => setActiveTab('audio')}
              className={`flex-1 py-10 px-8 flex items-center justify-center gap-4 font-black uppercase tracking-widest text-xs transition-all whitespace-nowrap relative group ${activeTab === 'audio' ? 'text-accent-cyan' : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
            >
              <Mic className={`w-5 h-5 ${activeTab === 'audio' ? 'scale-110' : 'group-hover:scale-110'} transition-transform`} />
              Audio Lab
              {activeTab === 'audio' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent-cyan rounded-full"></div>}
            </button>
          </div>

          <div className="p-8 md:p-16 flex-1 bg-white dark:bg-slate-900">
            {activeTab === 'chat' && <ChatTool />}
            {activeTab === 'vision' && <VisionTool />}
            {activeTab === 'audio' && <AudioTool />}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-Components ---

const ChatTool: React.FC = () => {
  const [messages, setMessages] = useState<{role: 'user'|'model', text: string, metadata?: any}[]>([]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<GenerationMode>('standard');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      let location = undefined;
      if (mode === 'maps') {
         try {
           const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
             navigator.geolocation.getCurrentPosition(resolve, reject);
           });
           location = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
         } catch (e) {
           console.warn("Location access denied, using defaults");
           location = { latitude: 9.0765, longitude: 7.3986 }; // Abuja
         }
      }

      const result = await generateTextContent(userMsg, mode, location);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: result.text || "No response generated.",
        metadata: result.groundingMetadata
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Error: Could not generate response." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[700px] flex flex-col bg-slate-50 dark:bg-black/20 rounded-[3rem] border border-slate-200 dark:border-white/5 overflow-hidden shadow-inner">
      
      {/* Config Bar - Technical Style */}
      <div className="p-6 bg-white dark:bg-white/5 border-b border-slate-200 dark:border-white/5 flex flex-wrap gap-6 items-center">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Engine Mode:</span>
        <div className="flex flex-wrap gap-3">
            {[
              { id: 'standard', icon: Bot, label: 'Standard' },
              { id: 'fast', icon: Zap, label: 'Fast' },
              { id: 'thinking', icon: Brain, label: 'Thinking' },
              { id: 'maps', icon: MapPin, label: 'Maps' }
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setMode(m.id as GenerationMode)}
                className={`flex items-center gap-3 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                  mode === m.id 
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl' 
                    : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-white/10'
                }`}
              >
                <m.icon className="w-4 h-4" />
                {m.label}
              </button>
            ))}
        </div>
      </div>

      {/* Messages - Clean Editorial */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8" ref={scrollRef}>
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-slate-400">
            <div className="w-24 h-24 bg-primary-500/10 rounded-[2rem] flex items-center justify-center mb-8 animate-float">
              <Sparkles className="w-10 h-10 text-primary-600 dark:text-primary-400" />
            </div>
            <p className="font-black uppercase tracking-widest text-xs">Select a mode and start chatting</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[85%] p-8 rounded-[2.5rem] text-lg font-medium leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-br-none shadow-2xl' 
                : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 rounded-bl-none shadow-xl border border-slate-100 dark:border-white/5'
            }`}>
              <div className="whitespace-pre-wrap">{msg.text}</div>
              
              {/* Maps Grounding Display */}
              {msg.metadata?.groundingChunks && (
                 <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/10 space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Verified Sources:</p>
                    <div className="grid gap-3">
                      {msg.metadata.groundingChunks.map((chunk: any, ci: number) => {
                         if (chunk.web?.uri) {
                           return (
                             <a key={ci} href={chunk.web.uri} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-xs font-bold bg-slate-50 dark:bg-black/20 p-4 rounded-2xl hover:bg-primary-600 hover:text-white transition-all duration-300 group/link">
                               <ExternalLink className="w-4 h-4 text-primary-600 dark:text-primary-400 group-hover/link:text-white" />
                               <span className="truncate">{chunk.web.title || chunk.web.uri}</span>
                             </a>
                           )
                         }
                         return null;
                      })}
                    </div>
                 </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] rounded-bl-none flex items-center gap-4 shadow-xl border border-slate-100 dark:border-white/5">
                <Loader2 className="w-5 h-5 animate-spin text-primary-600 dark:text-primary-400" />
                <span className="text-sm font-black uppercase tracking-widest text-slate-400">Gemini is thinking...</span>
             </div>
          </div>
        )}
      </div>

      {/* Input - Modern Floating */}
      <div className="p-8 border-t border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900">
        <div className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 px-8 py-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium text-lg"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="p-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-2xl"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

const VisionTool: React.FC = () => {
  const [subTab, setSubTab] = useState<'generate' | 'analyze' | 'video'>('generate');
  const [prompt, setPrompt] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<string | string[] | null>(null);
  
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [imageSize, setImageSize] = useState('1K');
  const [veoRatio, setVeoRatio] = useState<'16:9' | '9:16'>('16:9');

  const handleAction = async () => {
    setIsLoading(true);
    setOutput(null);
    try {
      if (subTab === 'generate') {
        const images = await generateImage(prompt, aspectRatio, imageSize);
        setOutput(images);
      } else if (subTab === 'analyze') {
        if (!file) return;
        const result = await analyzeImage(file, prompt);
        setOutput(result);
      } else if (subTab === 'video') {
        if (!file) return;
        const videoUrl = await generateVeoVideo(file, prompt, veoRatio);
        setOutput(videoUrl);
      }
    } catch (e) {
      console.error(e);
      alert("Operation failed. See console.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  return (
    <div className="flex flex-col gap-12">
      {/* Sub Tabs - Pill Style */}
      <div className="flex gap-4 flex-wrap">
         {[
           { id: 'generate', label: 'Generate' },
           { id: 'analyze', label: 'Analyze' },
           { id: 'video', label: 'Animate' }
         ].map(t => (
           <button 
            key={t.id}
            onClick={() => setSubTab(t.id as any)} 
            className={`px-8 py-3 rounded-full font-black uppercase tracking-widest text-[10px] border-2 transition-all duration-300 ${subTab === t.id ? 'bg-accent-purple text-white border-accent-purple shadow-xl shadow-accent-purple/20' : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400 hover:border-accent-purple/50'}`}
           >
             {t.label}
           </button>
         ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* Controls - Hardware Style */}
        <div className="space-y-10 bg-slate-50 dark:bg-black/20 p-10 rounded-[3rem] border border-slate-200 dark:border-white/5 shadow-inner">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 ml-2">Creative Prompt</label>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-6 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 h-48 focus:ring-2 focus:ring-accent-purple outline-none transition-all font-medium text-lg"
              placeholder={subTab === 'generate' ? "A futuristic cyberpunk city..." : "Describe this image..."}
            />
          </div>

          {(subTab === 'analyze' || subTab === 'video') && (
             <div>
               <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 ml-2">Source Asset</label>
               <div className="relative border-4 border-dashed border-slate-200 dark:border-white/10 rounded-[2rem] p-12 text-center hover:bg-white dark:hover:bg-white/5 transition-all duration-500 group">
                 <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                 <Upload className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-4 group-hover:scale-110 transition-transform duration-500" />
                 <p className="text-sm font-black uppercase tracking-widest text-slate-400">{file ? file.name : "Drop file or click to upload"}</p>
               </div>
             </div>
          )}

          {subTab === 'generate' && (
            <div className="grid grid-cols-2 gap-8">
               <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 ml-2">Aspect Ratio</label>
                  <select value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)} className="w-full p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 font-black uppercase tracking-widest text-xs">
                    {["1:1", "3:4", "4:3", "9:16", "16:9", "2:3", "3:2", "21:9"].map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
               </div>
               <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 ml-2">Resolution</label>
                  <select value={imageSize} onChange={(e) => setImageSize(e.target.value)} className="w-full p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 font-black uppercase tracking-widest text-xs">
                    {["1K", "2K", "4K"].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
               </div>
            </div>
          )}

          {subTab === 'video' && (
             <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 ml-2">Video Format</label>
                <select value={veoRatio} onChange={(e) => setVeoRatio(e.target.value as any)} className="w-full p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 font-black uppercase tracking-widest text-xs">
                   <option value="16:9">Landscape (16:9)</option>
                   <option value="9:16">Portrait (9:16)</option>
                </select>
             </div>
          )}

          <button 
            onClick={handleAction}
            disabled={isLoading || (!prompt && subTab === 'generate') || (!file && subTab !== 'generate')}
            className="w-full py-6 bg-accent-purple text-white rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-4 shadow-2xl shadow-accent-purple/30"
          >
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />}
            {subTab === 'generate' ? "Generate Image" : subTab === 'analyze' ? "Analyze Image" : "Render Video"}
          </button>
        </div>

        {/* Output - Immersive Display */}
        <div className="bg-slate-100 dark:bg-black/40 rounded-[3rem] flex items-center justify-center min-h-[500px] border border-slate-200 dark:border-white/5 overflow-hidden shadow-2xl relative">
           {isLoading ? (
             <div className="text-center p-12">
               <div className="w-24 h-24 bg-accent-purple/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 animate-spin-slow">
                 <Loader2 className="w-12 h-12 text-accent-purple" />
               </div>
               <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 animate-pulse">{subTab === 'video' ? "Rendering Cinematic Video..." : "Synthesizing Assets..."}</p>
             </div>
           ) : output ? (
             <div className="w-full h-full p-8 flex items-center justify-center">
                {subTab === 'generate' && Array.isArray(output) && output.map((src, i) => (
                  <img key={i} src={src} alt="Generated" className="w-full h-auto rounded-[2rem] shadow-2xl" />
                ))}
                {subTab === 'analyze' && typeof output === 'string' && (
                  <div className="p-10 bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl text-slate-900 dark:text-slate-200 whitespace-pre-wrap font-medium leading-relaxed text-lg border border-slate-100 dark:border-white/5">
                    {output}
                  </div>
                )}
                {subTab === 'video' && typeof output === 'string' && (
                  <video controls className="w-full rounded-[2rem] shadow-2xl" src={output}></video>
                )}
             </div>
           ) : (
             <div className="text-slate-400 text-center p-12">
               <div className="w-24 h-24 bg-slate-200 dark:bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
                 <ImageIcon className="w-10 h-10 opacity-30" />
               </div>
               <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Output will appear here</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

const AudioTool: React.FC = () => {
  const [subTab, setSubTab] = useState<'tts' | 'transcribe' | 'live'>('tts');
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('Kore');
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const [isLiveConnected, setIsLiveConnected] = useState(false);
  
  const handleTTS = async () => {
    if (!text) return;
    setIsLoading(true);
    try {
      const buffer = await generateSpeech(text, voice);
      playAudioBuffer(buffer);
    } catch(e) { console.error(e); }
    finally { setIsLoading(false); }
  };

  const handleTranscribe = async () => {
    if (!file) return;
    setIsLoading(true);
    try {
      const txt = await transcribeAudio(file);
      setResult(txt);
    } catch(e) { console.error(e); }
    finally { setIsLoading(false); }
  };

  return (
     <div className="flex flex-col gap-12">
       <div className="flex gap-4 flex-wrap">
         {[
           { id: 'tts', label: 'Speech Synthesis' },
           { id: 'transcribe', label: 'Transcription' },
           { id: 'live', label: 'Live Session' }
         ].map(t => (
           <button 
            key={t.id}
            onClick={() => setSubTab(t.id as any)} 
            className={`px-8 py-3 rounded-full font-black uppercase tracking-widest text-[10px] border-2 transition-all duration-300 ${subTab === t.id ? 'bg-accent-cyan text-white border-accent-cyan shadow-xl shadow-accent-cyan/20' : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400 hover:border-accent-cyan/50'}`}
           >
             {t.label}
           </button>
         ))}
      </div>

      <div className="bg-slate-50 dark:bg-black/20 p-12 md:p-20 rounded-[4rem] border border-slate-200 dark:border-white/5 min-h-[500px] shadow-inner">
         
         {subTab === 'tts' && (
           <div className="max-w-3xl mx-auto space-y-10">
             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
               <h3 className="text-3xl font-black tracking-tighter flex items-center gap-4 text-slate-900 dark:text-white">
                 <div className="w-12 h-12 bg-accent-cyan/10 rounded-2xl flex items-center justify-center text-accent-cyan">
                   <Volume2 className="w-6 h-6" />
                 </div>
                 Generate Speech
               </h3>
               <select value={voice} onChange={(e) => setVoice(e.target.value)} className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 font-black uppercase tracking-widest text-xs outline-none focus:ring-2 focus:ring-accent-cyan">
                 {['Kore', 'Puck', 'Charon', 'Fenrir', 'Zephyr'].map(v => <option key={v} value={v} className="dark:bg-slate-800">{v}</option>)}
               </select>
             </div>
             <textarea 
               value={text} 
               onChange={(e) => setText(e.target.value)}
               className="w-full p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 h-56 focus:ring-2 focus:ring-accent-cyan outline-none transition-all font-medium text-lg"
               placeholder="Enter text to speak..."
             />
             <button 
              onClick={handleTTS} 
              disabled={isLoading || !text}
              className="w-full py-6 bg-accent-cyan text-white rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-4 shadow-2xl shadow-accent-cyan/30"
             >
               {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Play className="w-6 h-6" />} Synthesize & Play
             </button>
           </div>
         )}

         {subTab === 'transcribe' && (
            <div className="max-w-3xl mx-auto space-y-10">
               <h3 className="text-3xl font-black tracking-tighter flex items-center gap-4 text-slate-900 dark:text-white">
                 <div className="w-12 h-12 bg-accent-cyan/10 rounded-2xl flex items-center justify-center text-accent-cyan">
                   <FileAudio className="w-6 h-6" />
                 </div>
                 Audio Transcription
               </h3>
               <div className="relative border-4 border-dashed border-slate-200 dark:border-white/10 rounded-[3rem] p-16 text-center hover:bg-white dark:hover:bg-white/5 transition-all duration-500 group">
                 <input type="file" accept="audio/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer" />
                 <Upload className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600 mb-6 group-hover:scale-110 transition-transform duration-500" />
                 <p className="text-sm font-black uppercase tracking-widest text-slate-400">{file ? file.name : "Drop audio or click to upload"}</p>
               </div>
               <button 
                onClick={handleTranscribe}
                disabled={isLoading || !file}
                className="w-full py-6 bg-accent-cyan text-white rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-4 shadow-2xl shadow-accent-cyan/30"
               >
                 {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Languages className="w-6 h-6" />} Start Transcription
               </button>
               {result && (
                 <div className="p-10 bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl text-slate-900 dark:text-slate-200 whitespace-pre-wrap font-medium leading-relaxed text-lg border border-slate-100 dark:border-white/5">
                   {result}
                 </div>
               )}
            </div>
         )}

         {subTab === 'live' && (
           <div className="h-full flex flex-col items-center justify-center">
             {!isLiveConnected ? (
                <div className="text-center space-y-10">
                   <div className="w-32 h-32 bg-accent-cyan/10 rounded-[2.5rem] flex items-center justify-center mx-auto animate-pulse shadow-inner">
                     <Mic className="w-12 h-12 text-accent-cyan" />
                   </div>
                   <div className="space-y-4">
                     <h3 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">Live Conversation</h3>
                     <p className="text-lg text-slate-500 max-w-md font-medium">Connect to Gemini Live (Native Audio) to have a real-time voice conversation.</p>
                   </div>
                   <LiveSessionButton onConnect={() => setIsLiveConnected(true)} />
                </div>
             ) : (
                <div className="text-center space-y-12 w-full max-w-lg">
                   <div className="flex justify-center gap-4 h-24 items-center">
                      {[...Array(7)].map((_, i) => (
                        <div key={i} className="w-4 bg-accent-cyan rounded-full animate-bounce" style={{ height: `${20 + Math.random() * 80}%`, animationDuration: `${0.4 + Math.random() * 0.6}s` }}></div>
                      ))}
                   </div>
                   <p className="text-2xl font-black uppercase tracking-[0.4em] text-accent-cyan animate-pulse">Listening...</p>
                   <button onClick={() => window.location.reload()} className="px-12 py-5 bg-red-500 text-white rounded-2xl font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl shadow-red-500/20">End Session</button>
                </div>
             )}
           </div>
         )}
      </div>
     </div>
  );
};

// --- Live API Handler Component ---

const LiveSessionButton: React.FC<{ onConnect: () => void }> = ({ onConnect }) => {
  const startSession = async () => {
    onConnect();
    // Live API Implementation
    // Note: In a real app, manage this state/cleanup more robustly
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 16000});
    const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
    const outputNode = outputAudioContext.createGain();
    outputNode.connect(outputAudioContext.destination); // Connect to speakers

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    
    let nextStartTime = 0;
    const sources = new Set<AudioBufferSourceNode>();

    // Encode/Decode helpers specifically for Live API (PCM)
    const encodePCM = (bytes: Uint8Array) => {
        let binary = '';
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) { binary += String.fromCharCode(bytes[i]); }
        return btoa(binary);
    };

    const decodePCM = (base64: string) => {
        const binaryString = atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) { bytes[i] = binaryString.charCodeAt(i); }
        return bytes;
    };

    const decodeAudioData = async (data: Uint8Array, ctx: AudioContext) => {
        const dataInt16 = new Int16Array(data.buffer);
        const buffer = ctx.createBuffer(1, dataInt16.length, 24000);
        const channelData = buffer.getChannelData(0);
        for (let i = 0; i < dataInt16.length; i++) {
             channelData[i] = dataInt16[i] / 32768.0;
        }
        return buffer;
    };

    const sessionPromise = ai.live.connect({
      model: 'gemini-2.5-flash-native-audio-preview-12-2025',
      callbacks: {
        onopen: () => {
          const source = inputAudioContext.createMediaStreamSource(stream);
          const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
          scriptProcessor.onaudioprocess = (e) => {
             const inputData = e.inputBuffer.getChannelData(0);
             const l = inputData.length;
             const int16 = new Int16Array(l);
             for (let i = 0; i < l; i++) { int16[i] = inputData[i] * 32768; }
             
             const pcmBlob = {
               data: encodePCM(new Uint8Array(int16.buffer)),
               mimeType: 'audio/pcm;rate=16000'
             };
             
             sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
          };
          source.connect(scriptProcessor);
          scriptProcessor.connect(inputAudioContext.destination);
        },
        onmessage: async (msg: LiveServerMessage) => {
           const audioData = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
           if (audioData) {
             nextStartTime = Math.max(nextStartTime, outputAudioContext.currentTime);
             const buffer = await decodeAudioData(decodePCM(audioData), outputAudioContext);
             const source = outputAudioContext.createBufferSource();
             source.buffer = buffer;
             source.connect(outputNode);
             source.start(nextStartTime);
             nextStartTime += buffer.duration;
             sources.add(source);
             source.onended = () => sources.delete(source);
           }
        },
        onclose: () => console.log("Session closed"),
        onerror: (e) => console.error(e)
      },
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } }
      }
    });
  };

  return (
    <button onClick={startSession} className="px-8 py-4 bg-accent-cyan text-white rounded-full font-bold hover:bg-cyan-600 shadow-lg transition-all transform hover:scale-105">
       Start Connection
    </button>
  );
};

export default AITools;

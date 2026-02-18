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
    <div className="min-h-screen pb-20">
      <PageHero 
        title="AI Tools Playground"
        description="Experience the raw power of Gemini. Generate videos, analyze images, chat with maps grounding, and more."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-white/5 overflow-hidden min-h-[800px] flex flex-col">
          
          {/* Tabs */}
          <div className="flex border-b border-slate-200 dark:border-white/5 overflow-x-auto">
            <button 
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-6 px-4 flex items-center justify-center gap-3 font-bold transition-all whitespace-nowrap ${activeTab === 'chat' ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/10 border-b-2 border-primary-600' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
            >
              <Bot className="w-5 h-5" />
              Chat & Knowledge
            </button>
            <button 
              onClick={() => setActiveTab('vision')}
              className={`flex-1 py-6 px-4 flex items-center justify-center gap-3 font-bold transition-all whitespace-nowrap ${activeTab === 'vision' ? 'text-accent-purple bg-purple-50 dark:bg-purple-900/10 border-b-2 border-accent-purple' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
            >
              <ImageIcon className="w-5 h-5" />
              Vision Studio
            </button>
            <button 
              onClick={() => setActiveTab('audio')}
              className={`flex-1 py-6 px-4 flex items-center justify-center gap-3 font-bold transition-all whitespace-nowrap ${activeTab === 'audio' ? 'text-accent-cyan bg-cyan-50 dark:bg-cyan-900/10 border-b-2 border-accent-cyan' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
            >
              <Mic className="w-5 h-5" />
              Audio Lab
            </button>
          </div>

          <div className="p-6 md:p-8 flex-1 bg-slate-50 dark:bg-black/20">
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
        // Simple mock location or try to get real
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
    <div className="h-[600px] flex flex-col bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden">
      
      {/* Config Bar */}
      <div className="p-4 bg-slate-100 dark:bg-white/5 border-b border-slate-200 dark:border-white/5 flex flex-wrap gap-4 items-center">
        <span className="text-sm font-bold text-slate-500">Mode:</span>
        <div className="flex gap-2">
            {[
              { id: 'standard', icon: Bot, label: 'Standard (Pro)' },
              { id: 'fast', icon: Zap, label: 'Fast (Flash Lite)' },
              { id: 'thinking', icon: Brain, label: 'Deep Thinker' },
              { id: 'maps', icon: MapPin, label: 'Maps Grounding' }
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setMode(m.id as GenerationMode)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  mode === m.id 
                    ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-white/10' 
                    : 'text-slate-500 hover:bg-white/50 dark:hover:bg-white/5'
                }`}
              >
                <m.icon className="w-4 h-4" />
                {m.label}
              </button>
            ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-slate-400">
            <Sparkles className="w-12 h-12 mb-4 opacity-50" />
            <p>Select a mode and start chatting!</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-primary-600 text-white rounded-br-none' 
                : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-none'
            }`}>
              <div className="whitespace-pre-wrap">{msg.text}</div>
              
              {/* Maps Grounding Display */}
              {msg.metadata?.groundingChunks && (
                 <div className="mt-3 pt-3 border-t border-black/10 dark:border-white/10 space-y-2">
                    <p className="text-xs font-bold uppercase opacity-70">Sources:</p>
                    {msg.metadata.groundingChunks.map((chunk: any, ci: number) => {
                       if (chunk.web?.uri) {
                         return (
                           <a key={ci} href={chunk.web.uri} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs bg-white/50 dark:bg-black/20 p-2 rounded hover:bg-white dark:hover:bg-black/40 transition-colors">
                             <ExternalLink className="w-3 h-3" />
                             {chunk.web.title || chunk.web.uri}
                           </a>
                         )
                       }
                       return null;
                    })}
                 </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-2xl rounded-bl-none flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Gemini is thinking...</span>
             </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-200 dark:border-white/5 bg-white dark:bg-slate-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="p-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
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
  
  // Configs
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
    <div className="flex flex-col gap-6">
      {/* Sub Tabs */}
      <div className="flex gap-4">
         <button onClick={() => setSubTab('generate')} className={`px-4 py-2 rounded-lg font-bold text-sm border ${subTab === 'generate' ? 'bg-accent-purple text-white border-accent-purple' : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10'}`}>Generate Image</button>
         <button onClick={() => setSubTab('analyze')} className={`px-4 py-2 rounded-lg font-bold text-sm border ${subTab === 'analyze' ? 'bg-accent-purple text-white border-accent-purple' : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10'}`}>Analyze Image</button>
         <button onClick={() => setSubTab('video')} className={`px-4 py-2 rounded-lg font-bold text-sm border ${subTab === 'video' ? 'bg-accent-purple text-white border-accent-purple' : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10'}`}>Animate with Veo</button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-white/5">
          <div>
            <label className="block text-sm font-bold mb-2">Prompt</label>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 h-32"
              placeholder={subTab === 'generate' ? "A futuristic cyberpunk city..." : "Describe this image..."}
            />
          </div>

          {(subTab === 'analyze' || subTab === 'video') && (
             <div>
               <label className="block text-sm font-bold mb-2">Upload Image</label>
               <div className="relative border-2 border-dashed border-slate-300 dark:border-white/20 rounded-xl p-8 text-center hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                 <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                 <Upload className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                 <p className="text-sm text-slate-500">{file ? file.name : "Click to upload"}</p>
               </div>
             </div>
          )}

          {subTab === 'generate' && (
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-bold mb-2">Aspect Ratio</label>
                  <select value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)} className="w-full p-2 rounded-lg bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10">
                    {["1:1", "3:4", "4:3", "9:16", "16:9", "2:3", "3:2", "21:9"].map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
               </div>
               <div>
                  <label className="block text-sm font-bold mb-2">Size</label>
                  <select value={imageSize} onChange={(e) => setImageSize(e.target.value)} className="w-full p-2 rounded-lg bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10">
                    {["1K", "2K", "4K"].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
               </div>
            </div>
          )}

          {subTab === 'video' && (
             <div>
                <label className="block text-sm font-bold mb-2">Video Ratio</label>
                <select value={veoRatio} onChange={(e) => setVeoRatio(e.target.value as any)} className="w-full p-2 rounded-lg bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10">
                   <option value="16:9">Landscape (16:9)</option>
                   <option value="9:16">Portrait (9:16)</option>
                </select>
             </div>
          )}

          <button 
            onClick={handleAction}
            disabled={isLoading || (!prompt && subTab === 'generate') || (!file && subTab !== 'generate')}
            className="w-full py-3 bg-accent-purple text-white rounded-xl font-bold hover:bg-purple-600 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            {subTab === 'generate' ? "Generate" : subTab === 'analyze' ? "Analyze" : "Create Video"}
          </button>
        </div>

        {/* Output */}
        <div className="bg-slate-200 dark:bg-black/40 rounded-2xl flex items-center justify-center min-h-[300px] border border-slate-300 dark:border-white/5 overflow-hidden">
           {isLoading ? (
             <div className="text-center">
               <Loader2 className="w-10 h-10 animate-spin mx-auto text-accent-purple mb-4" />
               <p className="text-slate-500 animate-pulse">{subTab === 'video' ? "Rendering Video (may take a minute)..." : "Processing..."}</p>
             </div>
           ) : output ? (
             <div className="w-full h-full p-4">
                {subTab === 'generate' && Array.isArray(output) && output.map((src, i) => (
                  <img key={i} src={src} alt="Generated" className="w-full h-auto rounded-xl shadow-lg" />
                ))}
                {subTab === 'analyze' && typeof output === 'string' && (
                  <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
                    {output}
                  </div>
                )}
                {subTab === 'video' && typeof output === 'string' && (
                  <video controls className="w-full rounded-xl shadow-lg" src={output}></video>
                )}
             </div>
           ) : (
             <div className="text-slate-400 text-center">
               <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
               <p>Output will appear here</p>
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

  // Live State
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
     <div className="flex flex-col gap-6">
       <div className="flex gap-4">
         <button onClick={() => setSubTab('tts')} className={`px-4 py-2 rounded-lg font-bold text-sm border ${subTab === 'tts' ? 'bg-accent-cyan text-white border-accent-cyan' : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10'}`}>Text to Speech</button>
         <button onClick={() => setSubTab('transcribe')} className={`px-4 py-2 rounded-lg font-bold text-sm border ${subTab === 'transcribe' ? 'bg-accent-cyan text-white border-accent-cyan' : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10'}`}>Transcription</button>
         <button onClick={() => setSubTab('live')} className={`px-4 py-2 rounded-lg font-bold text-sm border ${subTab === 'live' ? 'bg-accent-cyan text-white border-accent-cyan' : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10'}`}>Live Conversation</button>
      </div>

      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-white/5 min-h-[400px]">
         
         {subTab === 'tts' && (
           <div className="max-w-2xl mx-auto space-y-6">
             <div className="flex justify-between items-center">
               <h3 className="text-xl font-bold flex items-center gap-2"><Volume2 /> Generate Speech</h3>
               <select value={voice} onChange={(e) => setVoice(e.target.value)} className="p-2 rounded border border-slate-200 dark:border-white/10 bg-transparent">
                 {['Kore', 'Puck', 'Charon', 'Fenrir', 'Zephyr'].map(v => <option key={v} value={v} className="dark:bg-slate-800">{v}</option>)}
               </select>
             </div>
             <textarea 
               value={text} 
               onChange={(e) => setText(e.target.value)}
               className="w-full p-4 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 h-40"
               placeholder="Enter text to speak..."
             />
             <button 
              onClick={handleTTS} 
              disabled={isLoading || !text}
              className="w-full py-4 bg-accent-cyan text-white rounded-xl font-bold hover:bg-cyan-600 transition-colors flex items-center justify-center gap-2"
             >
               {isLoading ? <Loader2 className="animate-spin" /> : <Play />} Speak
             </button>
           </div>
         )}

         {subTab === 'transcribe' && (
            <div className="max-w-2xl mx-auto space-y-6">
               <h3 className="text-xl font-bold flex items-center gap-2"><FileAudio /> Audio Transcription</h3>
               <div className="relative border-2 border-dashed border-slate-300 dark:border-white/20 rounded-xl p-12 text-center hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                 <input type="file" accept="audio/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer" />
                 <Upload className="w-10 h-10 mx-auto text-slate-400 mb-4" />
                 <p className="font-bold">{file ? file.name : "Upload Audio File"}</p>
               </div>
               <button 
                onClick={handleTranscribe}
                disabled={isLoading || !file}
                className="w-full py-4 bg-accent-cyan text-white rounded-xl font-bold hover:bg-cyan-600 transition-colors flex items-center justify-center gap-2"
               >
                 {isLoading ? <Loader2 className="animate-spin" /> : <Languages />} Transcribe
               </button>
               {result && (
                 <div className="p-6 bg-slate-50 dark:bg-black/20 rounded-xl whitespace-pre-wrap border border-slate-200 dark:border-white/10">
                   {result}
                 </div>
               )}
            </div>
         )}

         {subTab === 'live' && (
           <div className="h-full flex flex-col items-center justify-center">
             {!isLiveConnected ? (
                <div className="text-center space-y-6">
                   <div className="w-24 h-24 bg-accent-cyan/10 rounded-full flex items-center justify-center mx-auto animate-pulse">
                     <Mic className="w-10 h-10 text-accent-cyan" />
                   </div>
                   <h3 className="text-2xl font-bold">Start Live Conversation</h3>
                   <p className="text-slate-500 max-w-md">Connect to Gemini Live (Native Audio) to have a real-time voice conversation.</p>
                   <LiveSessionButton onConnect={() => setIsLiveConnected(true)} />
                </div>
             ) : (
                <div className="text-center space-y-8 w-full max-w-lg">
                   <div className="flex justify-center gap-2 h-16 items-center">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-3 bg-accent-cyan rounded-full animate-bounce" style={{ height: `${Math.random() * 100}%`, animationDuration: `${0.5 + Math.random()}s` }}></div>
                      ))}
                   </div>
                   <p className="text-xl font-mono text-accent-cyan">LISTENING...</p>
                   <button onClick={() => window.location.reload()} className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600">End Session</button>
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

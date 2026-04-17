import { GoogleGenAI, Chat, GenerateContentResponse, Modality } from "@google/genai";
import { BUSINESS_INFO, SERVICES } from '../constants';
import { TEKIFY_SERVICES } from './pricingService';

// We will initialize the API client lazily inside the functions
// to ensure it uses the most up-to-date API key.

let aiInstance: GoogleGenAI | null = null;

export const getAI = () => {
  if (!aiInstance && process.env.GEMINI_API_KEY) {
    try {
      aiInstance = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch {
      console.warn("Failed to initialize Google Gen AI. API key may be invalid.");
    }
  }
  return aiInstance;
};

const SYSTEM_INSTRUCTION = `
You are "Teki Ally", the advanced AI Sales Representative and Senior Consultant for Tekify Consult.
Your goal is to be helpful, professional, persuasive, and ultimately convert visitors into clients.

IMPORTANT: You are authorized to talk to customers about EVERYTHING concerning the site, as well as every other area or topic they might ask about. Do not restrict yourself to only business or consulting topics. Be a helpful, knowledgeable assistant in all domains.

OUTPUT FORMATTING:
- ZERO EMOJIS. DO NOT output any emojis whatsoever.
- DO NOT use Markdown. ABSOLUTELY NO asterisks (*), hashtags (#), bullet dashes (-), or underscores (_) in your response.
- YOU MUST format your responses strictly using HTML tags for structure (e.g., <h2>, <h3>, <p>, <ul>, <ol>, <li>, <strong>, <br>).
- Provide structured, scannable, deeply reasoned responses that look highly professional for PDF documents.
- Always implement clean paragraphing and bold headings.

BUSINESS INFORMATION:
Name: ${BUSINESS_INFO.name}
Website: ${BUSINESS_INFO.website}
Email: ${BUSINESS_INFO.email}
Phone: ${BUSINESS_INFO.phone}
Address: ${BUSINESS_INFO.address}

SERVICES OFFERED:
${SERVICES.map(s => `<li><strong>${s.title}</strong>: ${s.description} (Starting at ${s.price})</li>`).join('')}
`;

let chatSession: Chat | null = null;

// --- Fallback Smart Responder & Calculator ---
const getSmartFallbackResponse = (message: string): string => {
  const lowerMsg = message.toLowerCase();
  
  // Handling quotation requests
  if (lowerMsg.includes('quote') || lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('estimate') || lowerMsg.includes('how much')) {
    let quoteHTML = `<h3><strong>Quotation from ${BUSINESS_INFO.name}</strong></h3><p>Based on your inquiry, here is a professional breakdown of our service pricing offerings:</p><ul>`;
    
    let totalEstimated = 0;
    let itemsFound = 0;
    
    TEKIFY_SERVICES.forEach(service => {
      if (lowerMsg.includes(service.name.toLowerCase().split(' ')[0]) || lowerMsg.includes(service.category.toLowerCase())) {
        quoteHTML += `<li><strong>${service.name}</strong> &mdash; ₦${service.price.toLocaleString()}</li>`;
        totalEstimated += service.price;
        itemsFound++;
      }
    });

    if (itemsFound === 0) {
      // General quote
      TEKIFY_SERVICES.slice(0, 4).forEach(service => {
        quoteHTML += `<li><strong>${service.name}</strong> &mdash; Starting at ₦${service.price.toLocaleString()}</li>`;
      });
      quoteHTML += `</ul><br><p>Let us know your exact requirements for a tailor-made quotation.</p>`;
      return quoteHTML;
    }
    
    quoteHTML += `</ul><br><p><strong>Estimated Total Subtotal:</strong> ₦${totalEstimated.toLocaleString()}</p>`;
    quoteHTML += `<p>This is a smart estimated quotation. We provide highly tailored solutions for our clients. Let's schedule a call to finalize the package.</p>`;
    return quoteHTML;
  }
  
  // General Help Responses
  if (lowerMsg.includes('service') || lowerMsg.includes('what do you do')) {
    return `<h3><strong>Our Expertise</strong></h3><p>At ${BUSINESS_INFO.name}, we specialize in cutting-edge tech and digital solutions. Our core services include:</p><ul><li><strong>Digital Marketing &amp; SEO</strong></li><li><strong>Web &amp; Mobile App Development</strong></li><li><strong>Cloud Architecture &amp; Enterprise Solutions</strong></li></ul><br><p>How can I assist your business today?</p>`;
  }
  
  if (lowerMsg.includes('contact') || lowerMsg.includes('call') || lowerMsg.includes('where')) {
    return `<h3><strong>Contact Information</strong></h3><p>You can reach us seamlessly through:</p><ul><li><strong>Email:</strong> ${BUSINESS_INFO.email}</li><li><strong>Phone:</strong> ${BUSINESS_INFO.phone}</li><li><strong>Office:</strong> ${BUSINESS_INFO.address}</li></ul>`;
  }

  return `<h3><strong>Support Response</strong></h3><p>Thank you for reaching out to ${BUSINESS_INFO.name}. Our AI connection is currently operating in offline fallback mode.</p><p>We have carefully noted your inquiry.</p><p>To give you the most detailed and reasoned response, please reach out directly or check out our premium services on our platform.</p>`;
};

// --- Chat & Text Generation ---

export const initChat = () => {
  if (!chatSession && getAI()) {
    chatSession = getAI()!.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
  }
  return chatSession;
};

export const sendMessageToTeki = async (message: string): Promise<AsyncIterable<string>> => {
  try {
    const aiClient = getAI();
    if (!aiClient) throw new Error("API Key missing");
    
    const session = initChat();
    if (!session) throw new Error("Failed to initialize session");
    
    const result = await session.sendMessageStream({ message });
    async function* streamGenerator() {
      for await (const chunk of result) {
        const responseChunk = chunk as GenerateContentResponse;
        if (responseChunk.text) {
          // Clean asterisks, hashtags, dashes, underscores, and EVERYTHING that looks like markdown symbols
          let cleaned = responseChunk.text.replace(/[*#\-_]/g, '');
          // Remove ALL emojis using a unicode regex range
          cleaned = cleaned.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2B50}\u{2B55}\u{2934}\u{2935}\u{2190}-\u{21FF}]/gu, '');
          yield cleaned;
        }
      }
    }
    return streamGenerator();
  } catch {
    console.warn("Falling back to Smart Offline Responder");
    const fallbackText = getSmartFallbackResponse(message);
    async function* mockStream() {
      yield fallbackText;
    }
    return mockStream();
  }
};

// Specialized Generation Functions

export type GenerationMode = 'standard' | 'fast' | 'thinking' | 'maps';

export const generateTextContent = async (
  prompt: string, 
  mode: GenerationMode = 'standard',
  userLocation?: { latitude: number; longitude: number },
  systemInstruction?: string
) => {
  try {
    const aiClient = getAI();
    if (!aiClient) throw new Error("API Key missing");

    let model = 'gemini-3.1-pro-preview';
    let config: any = {
      systemInstruction: systemInstruction || SYSTEM_INSTRUCTION
    };

    if (mode === 'fast') {
      model = 'gemini-3-flash-preview';
    } else if (mode === 'thinking') {
      model = 'gemini-3.1-pro-preview';
      // thinkingLevel is the correct parameter for Gemini 3
    } else if (mode === 'maps') {
      model = 'gemini-2.5-flash';
      config = {
        ...config,
        tools: [{ googleMaps: {} }],
        toolConfig: userLocation ? {
          retrievalConfig: {
            latLng: userLocation
          }
        } : undefined
      };
    } else {
      model = 'gemini-3.1-pro-preview';
    }

    const response = await aiClient.models.generateContent({
      model,
      contents: prompt,
      config
    });

    let finalRes = response.text || "";
    finalRes = finalRes.replace(/[*#\-_]/g, '');
    finalRes = finalRes.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2B50}\u{2B55}\u{2934}\u{2935}\u{2190}-\u{21FF}]/gu, '');

    return {
      text: finalRes,
      groundingMetadata: response.candidates?.[0]?.groundingMetadata
    };
  } catch {
    console.warn("Falling back to Smart Offline Responder");
    return {
      text: getSmartFallbackResponse(prompt),
      groundingMetadata: undefined
    };
  }
};

// --- Image & Video ---

export const generateImage = async (
  prompt: string, 
  aspectRatio: string = "1:1", 
  imageSize: string = "1K"
): Promise<string[]> => {
  // Uses gemini-3-pro-image-preview
  const response = await getAI().models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: {
      parts: [{ text: prompt }],
    },
    config: {
      imageConfig: {
        aspectRatio, // "1:1", "3:4", "4:3", "9:16", "16:9"
        imageSize    // "1K", "2K", "4K"
      },
    },
  });

  const images: string[] = [];
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      images.push(`data:image/png;base64,${part.inlineData.data}`);
    }
  }
  return images;
};

export const analyzeImage = async (imageFile: File, prompt: string): Promise<string> => {
  const base64Data = await fileToBase64(imageFile);
  const mimeType = imageFile.type;

  const response = await getAI().models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: {
      parts: [
        {
          inlineData: {
            data: base64Data,
            mimeType: mimeType
          }
        },
        { text: prompt || "Analyze this image." }
      ]
    }
  });

  return response.text || "No analysis available.";
};

export const generateVeoVideo = async (imageFile: File, prompt: string, aspectRatio: '16:9'|'9:16' = '16:9') => {
  // Ensure Key Selection for Veo
  // Cast window to any to access aistudio which is injected by the environment
  const win = window as any;
  if (win.aistudio) {
    const hasKey = await win.aistudio.hasSelectedApiKey();
    if (!hasKey) {
       await win.aistudio.openSelectKey();
    }
  }

  // Create new instance to pick up selected key
  const veoAi = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  const base64Data = await fileToBase64(imageFile);
  const mimeType = imageFile.type;

  let operation = await veoAi.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: prompt || "Animate this image",
    image: {
      imageBytes: base64Data,
      mimeType: mimeType
    },
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio: aspectRatio
    }
  });

  // Polling
  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 5000));
    operation = await veoAi.operations.getVideosOperation({operation: operation});
  }

  const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!videoUri) throw new Error("Video generation failed.");
  
  // Return the playable URL (needs key appended)
  return `${videoUri}&key=${process.env.GEMINI_API_KEY}`;
};

// --- Audio ---

export const generateSpeech = async (text: string, voiceName: string = 'Kore'): Promise<AudioBuffer> => {
  const response = await getAI().models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName },
        },
      },
    },
  });

  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!base64Audio) throw new Error("No audio generated");

  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const audioBuffer = await decodeAudioData(
    decode(base64Audio),
    audioContext,
    24000,
    1
  );
  return audioBuffer;
};

export const transcribeAudio = async (audioFile: File): Promise<string> => {
  const base64Data = await fileToBase64(audioFile);
  const mimeType = audioFile.type; // e.g. 'audio/mp3', 'audio/wav'

  const response = await getAI().models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        {
          inlineData: {
            data: base64Data,
            mimeType: mimeType
          }
        },
        { text: "Transcribe this audio." }
      ]
    }
  });

  return response.text || "Transcription failed.";
};

// --- Helpers ---

export const playAudioBuffer = (audioBuffer: AudioBuffer) => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioContext.destination);
  source.start();
};

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data URL prefix (e.g., "data:image/png;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}
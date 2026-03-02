import { GoogleGenAI, Chat, GenerateContentResponse, Modality } from "@google/genai";
import { BUSINESS_INFO, SERVICES } from '../constants';

// We will initialize the API client lazily inside the functions
// to ensure it uses the most up-to-date API key.

let aiInstance: GoogleGenAI | null = null;
export const getAI = () => {
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiInstance;
};

const SYSTEM_INSTRUCTION = `
You are "Teki Ally", the advanced AI Sales Representative and Senior Consultant for Tekify Consult.
Your goal is to be helpful, professional, persuasive, and ultimately convert visitors into clients.

IMPORTANT: You are authorized to talk to customers about EVERYTHING concerning the site, as well as every other area or topic they might ask about. Do not restrict yourself to only business or consulting topics. Be a helpful, knowledgeable assistant in all domains.

OUTPUT FORMATTING:
- Use clear headings (##) and subheadings (###) to organize information.
- Use bullet points and numbered lists for readability.
- Use bold text for emphasis on key benefits or features.
- Provide structured, scannable responses that look professional.
- The frontend will render your markdown, so the user will see properly formatted text, not raw * or # characters.

BUSINESS INFORMATION:
Name: ${BUSINESS_INFO.name}
Website: ${BUSINESS_INFO.website}
Email: ${BUSINESS_INFO.email}
Phone: ${BUSINESS_INFO.phone}
Address: ${BUSINESS_INFO.address}

SERVICES OFFERED:
${SERVICES.map(s => `- ${s.title}: ${s.description} (Starting at ${s.price})`).join('\n')}
`;

let chatSession: Chat | null = null;

// --- Chat & Text Generation ---

export const initChat = () => {
  if (!chatSession) {
    chatSession = getAI().chats.create({
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
  const session = initChat();
  try {
    const result = await session.sendMessageStream({ message });
    async function* streamGenerator() {
      for await (const chunk of result) {
        const responseChunk = chunk as GenerateContentResponse;
        if (responseChunk.text) {
          yield responseChunk.text;
        }
      }
    }
    return streamGenerator();
  } catch (error) {
    console.error("Error talking to Teki:", error);
    throw error;
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
    // Standard chat bot experience
    model = 'gemini-3.1-pro-preview';
  }

  const response = await getAI().models.generateContent({
    model,
    contents: prompt,
    config
  });

  return {
    text: response.text,
    groundingMetadata: response.candidates?.[0]?.groundingMetadata
  };
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
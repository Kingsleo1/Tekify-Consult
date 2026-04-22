import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

export const getSupabase = (): SupabaseClient => {
  if (!supabaseInstance) {
    const getEnvVars = () => {
      // 1. Give priority to dynamically injected window variables (vital for cloud environments)
      if (typeof window !== 'undefined' && (window as any).__ENV__) {
        const env = (window as any).__ENV__;
        if (env.SUPABASE_URL && env.SUPABASE_ANON_KEY) {
          return { url: env.SUPABASE_URL, key: env.SUPABASE_ANON_KEY };
        }
      }
      // 2. Fallback to Vite statically replaced variables
      if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_URL) {
         return { url: import.meta.env.VITE_SUPABASE_URL, key: import.meta.env.VITE_SUPABASE_ANON_KEY };
      }
      // 3. Fallback to Node runtime variables
      if (typeof process !== 'undefined' && process.env) {
         return { 
           url: process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL, 
           key: process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY 
         };
      }
      return { url: '', key: '' };
    };

    const envConfig = getEnvVars();
    const supabaseUrl = envConfig.url;
    const supabaseAnonKey = envConfig.key;

    if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder')) {
      console.warn("Supabase environment variables are missing or invalid. Some features may not work.");
    } else {
      console.log("Supabase client initialized with URL:", supabaseUrl.substring(0, 20) + "...");
    }
    
    // Ensure URL is valid for createClient
    let validUrl = 'https://placeholder.supabase.co';
    if (supabaseUrl) {
      if (supabaseUrl.startsWith('http')) {
        validUrl = supabaseUrl;
      } else if (supabaseUrl.includes('.')) {
        validUrl = `https://${supabaseUrl}`;
      } else {
        // Assume it's a project ID
        validUrl = `https://${supabaseUrl}.supabase.co`;
      }
    }
    const validKey = supabaseAnonKey || 'placeholder';

    supabaseInstance = createClient(validUrl, validKey);
  }
  return supabaseInstance;
};

// Export a proxy or just the getter
export const supabase = new Proxy({} as SupabaseClient, {
  get: (target, prop: keyof SupabaseClient) => {
    const instance = getSupabase();
    const value = instance[prop];
    if (typeof value === 'function') {
      return value.bind(instance);
    }
    return value;
  }
});

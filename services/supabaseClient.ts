import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

export const getSupabase = (): SupabaseClient => {
  if (!supabaseInstance) {
    const getEnvVars = () => {
      // 1. Give priority to Vite statically replaced variables (Standard for Production)
      const viteUrl = import.meta.env?.VITE_SUPABASE_URL;
      const viteKey = import.meta.env?.VITE_SUPABASE_ANON_KEY;

      if (viteUrl && viteKey && !viteUrl.includes('placeholder')) {
        return { url: viteUrl, key: viteKey };
      }

      // 2. Fallback to dynamically injected window variables (pattern for some cloud environments)
      if (typeof window !== 'undefined' && (window as any).__ENV__) {
        const env = (window as any).__ENV__;
        if (env.SUPABASE_URL && env.SUPABASE_ANON_KEY && !env.SUPABASE_URL.includes('placeholder')) {
          return { url: env.SUPABASE_URL, key: env.SUPABASE_ANON_KEY };
        }
      }

      // 3. Fallback to Node runtime variables (SSR or local tests)
      if (typeof process !== 'undefined' && process.env) {
         const pUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
         const pKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
         if (pUrl && pKey && !pUrl.includes('placeholder')) {
           return { url: pUrl, key: pKey };
         }
      }

      return { url: '', key: '' };
    };

    const envConfig = getEnvVars();
    let supabaseUrl = envConfig.url;
    let supabaseAnonKey = envConfig.key;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error(
        "CRITICAL ERROR: Supabase environment variables (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY) are missing. " +
        "If you are deployed on Vercel, you MUST add these to your Project Settings > Environment Variables."
      );
      // Fallback to placeholder to prevent immediate crash, but fetch will fail as user reported
      supabaseUrl = 'https://placeholder.supabase.co';
      supabaseAnonKey = 'placeholder';
    } else {
      console.log("Supabase client initialized successfully.");
    }
    
    // Ensure URL is valid
    let validUrl = supabaseUrl;
    if (!validUrl.startsWith('http')) {
      if (validUrl.includes('.')) {
        validUrl = `https://${validUrl}`;
      } else {
        validUrl = `https://${validUrl}.supabase.co`;
      }
    }

    supabaseInstance = createClient(validUrl, supabaseAnonKey);
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

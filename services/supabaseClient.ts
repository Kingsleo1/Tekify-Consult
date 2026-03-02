import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

export const getSupabase = (): SupabaseClient => {
  if (!supabaseInstance) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

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

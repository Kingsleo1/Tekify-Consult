import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

export const getSupabase = (): SupabaseClient => {
  if (!supabaseInstance) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder')) {
      console.warn("Supabase environment variables are missing or invalid. Some features may not work.");
    } else {
      console.log("Supabase client initialized with URL:", supabaseUrl.substring(0, 20) + "...");
    }
    
    // Ensure URL is valid for createClient
    const validUrl = (supabaseUrl && supabaseUrl.startsWith('http')) ? supabaseUrl : 'https://placeholder.supabase.co';
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

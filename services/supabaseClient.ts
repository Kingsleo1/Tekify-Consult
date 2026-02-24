import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

export const getSupabase = (): SupabaseClient => {
  if (!supabaseInstance) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn("Supabase environment variables are missing. Some features may not work.");
      // Return a dummy client or handle it gracefully in components
      // For now, we'll still try to create it but it might fail if URL is empty
      // Better to throw a clear error when used, or return a proxy
    }
    
    supabaseInstance = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder');
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

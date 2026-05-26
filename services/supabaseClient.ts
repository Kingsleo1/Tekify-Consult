import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

export const getEnvVars = () => {
  // 1. Give priority to Vite statically replaced variables (Standard for Production)
  const viteUrl = import.meta.env?.VITE_SUPABASE_URL;
  const viteKey = import.meta.env?.VITE_SUPABASE_ANON_KEY;

  if (viteUrl && viteKey && !viteUrl.includes('placeholder') && !viteKey.includes('placeholder')) {
    return { url: viteUrl, key: viteKey };
  }

  // 2. Fallback to dynamically injected window variables (pattern for some cloud environments)
  if (typeof window !== 'undefined' && (window as any).__ENV__) {
    const env = (window as any).__ENV__;
    if (env.SUPABASE_URL && env.SUPABASE_ANON_KEY && !env.SUPABASE_URL.includes('placeholder') && !env.SUPABASE_ANON_KEY.includes('placeholder')) {
      return { url: env.SUPABASE_URL, key: env.SUPABASE_ANON_KEY };
    }
  }

  // 3. Fallback to Node runtime variables (SSR or local tests)
  if (typeof process !== 'undefined' && process.env) {
     const pUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
     const pKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
     if (pUrl && pKey && !pUrl.includes('placeholder') && !pKey.includes('placeholder')) {
       return { url: pUrl, key: pKey };
     }
  }

  return { url: '', key: '' };
};

export const getSupabase = (): SupabaseClient => {
  if (!supabaseInstance) {
    const envConfig = getEnvVars();
    let supabaseUrl = envConfig.url;
    let supabaseAnonKey = envConfig.key;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn(
        "CRITICAL WARNING: Supabase environment variables (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY) are missing. " +
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

    supabaseInstance = createClient(validUrl, supabaseAnonKey, {
      global: {
        fetch: async (input, init) => {
          try {
            return await fetch(input, init);
          } catch (err: any) {
            console.warn("Supabase network request failed. Returning offline-friendly safety response.", err);
            return new Response(JSON.stringify({
              error: "Failed to fetch",
              message: err.message || "Network request failed. Using fallback.",
              statusCode: 500
            }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        }
      }
    });
  }
  return supabaseInstance;
};

// Export a proxy or just the getter
export const supabase = new Proxy({} as SupabaseClient, {
  get: (target, prop: keyof SupabaseClient) => {
    // Determine if Supabase is unconfigured / placeholder
    const envVars = getEnvVars();
    const isUnconfigured = !envVars.url || !envVars.key || envVars.url.includes('placeholder') || envVars.key.includes('placeholder');

    if (isUnconfigured) {
      if (prop === 'from') {
        return () => {
          const queryBuilder: any = {
            select: () => queryBuilder,
            insert: () => queryBuilder,
            update: () => queryBuilder,
            delete: () => queryBuilder,
            eq: () => queryBuilder,
            order: () => queryBuilder,
            limit: () => queryBuilder,
            single: () => queryBuilder,
            then: (onfulfilled: any) => {
              const mockResponse = { data: [], error: null, count: 0 };
              return Promise.resolve(onfulfilled ? onfulfilled(mockResponse) : mockResponse);
            },
            catch: (onrejected: any) => {
              if (onrejected) {
                return Promise.resolve(onrejected(null));
              }
              return Promise.resolve();
            }
          };
          return queryBuilder;
        };
      }

      if (prop === 'auth') {
        return {
          getSession: () => Promise.resolve({ data: { session: null }, error: null }),
          onAuthStateChange: () => {
            return { data: { subscription: { unsubscribe: () => {} } } };
          },
          signOut: () => Promise.resolve({ error: null }),
          signInWithPassword: () => Promise.resolve({ data: { session: null }, error: { message: 'Supabase unconfigured' } }),
        };
      }
    }

    const instance = getSupabase();
    const value = instance[prop];
    if (typeof value === 'function') {
      return value.bind(instance);
    }
    return value;
  }
});

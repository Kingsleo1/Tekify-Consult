import { createClient } from '@supabase/supabase-js';

const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const key = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!url || !key) {
  console.log("Missing URL or Key");
  process.exit(1);
}

const supabase = createClient(validUrl(url), key);

function validUrl(u) {
  if (u.startsWith('http')) return u;
  if (u.includes('.')) return `https://${u}`;
  return `https://${u}.supabase.co`;
}

async function test() {
  console.log("URL:", validUrl(url).substring(0, 20) + "...");
  const { data, error } = await supabase.from('tekify_services').select('*').limit(1);
  if (error) {
    console.error("DB Error:", error.message);
  } else {
    console.log("DB Success:", data);
  }
}
test();

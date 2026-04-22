import { createClient } from '@supabase/supabase-js';

const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const key = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

const supabase = createClient(validUrl(url), key);

function validUrl(u) {
  if (u.startsWith('http')) return u;
  if (u.includes('.')) return `https://${u}`;
  return `https://${u}.supabase.co`;
}

async function test() {
  const { data: bData, error: bErr } = await supabase.from('tekify_bookings').select('*').limit(1);
  console.log("Bookings:", bErr ? bErr : bData);

  const { data: cData, error: cErr } = await supabase.from('tekify_customers').select('*').limit(1);
  console.log("Customers:", cErr ? cErr : "Success");
}
test();

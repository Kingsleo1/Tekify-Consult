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
  const { data: bData, error: bErr } = await supabase.from('tekify_bookings').insert([{
      customer_id: '3c9da58d-9fd4-412c-9fd1-391dcec02c77',
      service_id: 'dm-foundation',
      notes: 'Test booking ANON RLS'
    }]).select();
  console.log("Bookings Insert RLS result:", bErr ? bErr : bData);
}
test();

// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { supabase } from '../../../src/lib/api';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
};

type data = {
  user_id: string;
};
const isValidUser = async (email: string, password: string) => {
  const { data, error } = await supabase
    .from('auth')
    .select('auth!inner (user_id), user_info!inner(user_id)')
    .eq('auth.email', email)
    .eq('auth.password', password);

  if (error) throw error;
  return new Response(JSON.stringify({ user_id: data['user_id'] }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status: 200,
  });
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const { name } = await req.json();
  const data = {
    message: `Hello ${name}!`,
  };
  const body = await req.json();
  return isValidUser(body.email, body.password);
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'

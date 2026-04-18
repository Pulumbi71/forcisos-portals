import { createClient } from '@supabase/supabase-js';
import { createBrowserClient as createSupabaseBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ppbaaayehejlwdhuytfo.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwYmFhYXllaGVqbHdkaHV5dGZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5NTg5NTQsImV4cCI6MjA5MTUzNDk1NH0.hUuBRwzVGccTfVE4xKxYG-eZjGWYmOhHXSWQWtoq0Yw';

// Server-side client factory
export function createSupabaseClient() {
  return createClient(supabaseUrl, supabaseAnonKey);
}

// Browser client factory for SSR
export function createBrowserClient() {
  return createSupabaseBrowserClient(supabaseUrl, supabaseAnonKey);
}

// Default server client instance
export const supabase = createSupabaseClient();

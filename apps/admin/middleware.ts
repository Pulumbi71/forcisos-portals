import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ppbaaayehejlwdhuytfo.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwYmFhYXllaGVqbHdkaHV5dGZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5NTg5NTQsImV4cCI6MjA5MTUzNDk1NH0.hUuBRwzVGccTfVE4xKxYG-eZjGWYmOhHXSWQWtoq0Yw';

export async function middleware(request: NextRequest) {
  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() { return request.cookies.getAll(); },
      setAll() {},
    },
  });
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.redirect(new URL('/login', request.url));
  const role = session.user?.user_metadata?.role;
  if (role !== 'administrator') return NextResponse.redirect(new URL('/unauthorized', request.url));
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!login|api|_next|.*\\..*).*)'],
};

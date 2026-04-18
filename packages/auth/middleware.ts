import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { UserRole } from '@forcisos/types';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config';

export interface AuthMiddlewareOptions {
  requiredRole?: UserRole;
  publicRoutes?: string[];
}

export async function withAuth(
  request: NextRequest,
  options: AuthMiddlewareOptions = {}
) {
  const { requiredRole, publicRoutes = [] } = options;

  const pathname = request.nextUrl.pathname;

  // Allow public routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Create Supabase server client
  let supabase;
  try {
    supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // This won't actually set cookies here, but we handle it in the response
        },
      },
    });
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Get session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Redirect to login if no session
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Check role if required
  if (requiredRole) {
    const userRole = session.user?.user_metadata?.role as UserRole | undefined;

    if (!userRole || userRole !== requiredRole) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  return NextResponse.next();
}

export function roleGuard(role: UserRole) {
  return (request: NextRequest) => {
    return withAuth(request, { requiredRole: role });
  };
}

import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { UserRole } from '@forcisos/types';

export interface AuthMiddlewareOptions { requiredRoles?: UserRole[]; publicRoutes?: string[]; }

export async function withAuth(request: NextRequest, options: AuthMiddlewareOptions = {}) {
  const { requiredRoles = [], publicRoutes = [] } = options;
  const pathname = request.nextUrl.pathname;
  if (publicRoutes.some((route) => pathname.startsWith(route))) return NextResponse.next();
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return NextResponse.redirect(new URL('/login', request.url));
  if (token.error === 'RefreshAccessTokenError') return NextResponse.redirect(new URL('/login', request.url));
  if (requiredRoles.length > 0) {
    const userRole = (token.user as Record<string, string>)?.role;
    if (!userRole || !requiredRoles.includes(userRole as UserRole)) return NextResponse.redirect(new URL('/login?error=unauthorized', request.url));
  }
  return NextResponse.next();
}

export function roleGuard(...roles: UserRole[]) {
  return (request: NextRequest) => withAuth(request, { requiredRoles: roles });
}

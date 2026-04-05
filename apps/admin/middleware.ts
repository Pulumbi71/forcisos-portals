import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@forcisos/auth/middleware';

const ADMIN_ACCESS_KEY = process.env.ADMIN_ACCESS_KEY || 'fc-admin-2024';

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Protect admin login page - require access key
  if (pathname === '/login') {
    const accessKey = request.nextUrl.searchParams.get('key');
    if (accessKey !== ADMIN_ACCESS_KEY) {
      return new NextResponse('Not Found', { status: 404 });
    }
  }

  return withAuth(request, {
    requiredRoles: ['administrator'],
    publicRoutes: ['/login', '/api'],
  });
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};

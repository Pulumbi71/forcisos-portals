import { withAuth } from '@forcisos/auth/middleware';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  return withAuth(request, {
    requiredRoles: ['fc_member'] as any[],
  });
}

export const config = {
  matcher: ['/((?!login|api|_next|.*\\..*).*)'],
};

import { withAuth, roleGuard } from '@forcisos/auth/middleware';

export const middleware = roleGuard('administrator');

export const config = {
  matcher: ['/((?!login|api|_next|.*\\..*).*)'],
};

import { roleGuard } from '@forcisos/auth';

export const middleware = roleGuard('administrator');

export const config = {
  matcher: ['/((?!login|api|_next|.*\\..*).*)'],
};

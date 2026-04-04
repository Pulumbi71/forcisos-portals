import { roleGuard } from '@forcisos/auth/middleware';

export const middleware = roleGuard('fc_student');

export const config = {
  matcher: ['/((?!login|api|_next|.*\\..*).*)'],
};

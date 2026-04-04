import { roleGuard } from '@forcisos/auth/middleware';

export const middleware = roleGuard('fc_trainer');

export const config = {
  matcher: ['/((?!login|api|_next|.*\\..*).*)'],
};

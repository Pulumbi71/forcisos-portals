import { roleGuard } from '@forcisos/auth';

export const middleware = roleGuard('fc_partner');

export const config = {
  matcher: ['/((?!login|api|_next|.*\\..*).*)'],
};

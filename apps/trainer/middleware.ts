import { roleGuard } from '@forcisos/auth';

export const middleware = roleGuard('fc_trainer');

export const config = {
  matcher: ['/((?!login|reset-password|api|_next|.*\\..*).*)'],
};

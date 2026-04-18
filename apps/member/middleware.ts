import { roleGuard } from '@forcisos/auth';

export const middleware = roleGuard('fc_student');

export const config = {
  matcher: ['/((?!login|api|_next|.*\\..*).*)'],
};

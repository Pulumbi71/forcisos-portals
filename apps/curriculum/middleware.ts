import { roleGuard } from '@forcisos/auth';

export const middleware = roleGuard('fc_curriculum_mgr');

export const config = {
  matcher: ['/((?!login|api|_next|.*\\..*).*)'],
};

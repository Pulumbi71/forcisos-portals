import { roleGuard } from '@forcisos/auth';

export const middleware = roleGuard(['fc_curriculum_mgr', 'administrator']);

export const config = {
  matcher: ['/((?!login|reset-password|api|_next|.*\\..*).*)'],
};

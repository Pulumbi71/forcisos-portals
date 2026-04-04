import { roleGuard } from '@forcisos/auth';

const roleMap: Record<string, any> = {
  partner: 'fc_partner',
  curriculum: ['fc_curriculum_mgr', 'administrator'],
};

export const middleware = roleGuard(roleMap['$app']);

export const config = {
  matcher: ['/((?!login|api|_next|.*\\..*).*)'],
};

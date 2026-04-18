export { authConfig } from './config';
export { withAuth, roleGuard, type AuthMiddlewareOptions } from './middleware';
export {
  useUser,
  usePortalAccess,
  useIsAuthenticated,
  useAuthError,
} from './hooks';
export { WithAuth, RoleGuard, AdminGuard, CurriculumGuard } from './guards';

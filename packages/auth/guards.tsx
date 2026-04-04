'use client';

import { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { UserRole } from '@forcisos/types';

interface WithAuthProps { children: ReactNode; requiredRoles?: UserRole[]; fallback?: ReactNode; }

export function WithAuth({ children, requiredRoles = [], fallback = <div>Access denied. Please log in.</div> }: WithAuthProps) {
  const { data: session, status } = useSession();
  if (status === 'loading') return <div>Loading...</div>;
  if (!session || !session.user) return fallback;
  if (requiredRoles.length > 0) {
    const userRole = (session.user as Record<string, string>)?.role;
    if (!userRole || !requiredRoles.includes(userRole as UserRole)) return fallback;
  }
  return <>{children}</>;
}

interface RoleGuardProps { children: ReactNode; roles: UserRole[]; fallback?: ReactNode; }

export function RoleGuard({ children, roles, fallback = <div>You do not have permission to view this content.</div> }: RoleGuardProps) {
  const { data: session, status } = useSession();
  if (status === 'loading') return <div>Loading...</div>;
  if (!session?.user) return fallback;
  const userRole = (session.user as Record<string, string>)?.role;
  if (!roles.includes(userRole as UserRole)) return fallback;
  return <>{children}</>;
}

export function AdminGuard({ children, fallback = <div>Admin access required.</div> }: { children: ReactNode; fallback?: ReactNode; }) {
  return <RoleGuard roles={['administrator']} fallback={fallback}>{children}</RoleGuard>;
}

export function CurriculumGuard({ children, fallback = <div>Curriculum manager access required.</div> }: { children: ReactNode; fallback?: ReactNode; }) {
  return <RoleGuard roles={['fc_curriculum_mgr', 'administrator']} fallback={fallback}>{children}</RoleGuard>;
}

'use client';

import { useSession } from 'next-auth/react';
import { User, UserRole, Portal } from '@forcisos/types';

interface UseUserReturn { user: User | undefined; loading: boolean; error: string | null; }

export function useUser(): UseUserReturn {
  const { data: session, status } = useSession();
  return { user: session?.user as User | undefined, loading: status === 'loading', error: status === 'unauthenticated' ? 'Not authenticated' : null };
}

export function usePortalAccess() {
  const { data: session, status } = useSession();
  const user = session?.user as (User & { token?: string }) | undefined;
  const portals: Portal[] = [
    { id: 'admin', name: 'Admin Portal', slug: 'admin', url: 'https://fcisoadmin.forcisos.com', description: 'Administrator Dashboard', icon: 'Shield', requiredRoles: ['administrator'] },
    { id: 'member', name: 'Member Portal', slug: 'member', url: 'https://member.forcisos.com', description: 'Member Dashboard', icon: 'Users', requiredRoles: ['fc_student'] },
    { id: 'trainer', name: 'Trainer Portal', slug: 'trainer', url: 'https://trainer.forcisos.com', description: 'Trainer Dashboard', icon: 'BookOpen', requiredRoles: ['fc_trainer'] },
    { id: 'partner', name: 'Partner Portal', slug: 'partner', url: 'https://partner.forcisos.com', description: 'Partner Dashboard', icon: 'Building2', requiredRoles: ['fc_partner'] },
    { id: 'curriculum', name: 'Curriculum Portal', slug: 'curriculum', url: 'https://curriculum.forcisos.com', description: 'Curriculum Management', icon: 'BookMarked', requiredRoles: ['fc_curriculum_mgr', 'administrator'] },
  ];
  const accessiblePortals = portals.filter((portal) => {
    if (!user) return false;
    if (portal.id === 'admin') return false;
    return portal.requiredRoles.includes(user.role as UserRole);
  });
  const hasAccessToRole = (role: UserRole): boolean => { if (!user) return false; return user.role === role; };
  return {
    user, loading: status === 'loading', authenticated: status === 'authenticated',
    allPortals: portals, accessiblePortals, hasAccessToRole,
    canAccessAdmin: user?.role === 'administrator',
    canAccessMember: user?.role === 'fc_student' || user?.role === 'administrator' || user?.role === 'fc_trainer',
    canAccessTrainer: user?.role === 'fc_trainer' || user?.role === 'administrator',
    canAccessPartner: user?.role === 'fc_partner' || user?.role === 'administrator',
    canAccessCurriculum: user?.role === 'fc_curriculum_mgr' || user?.role === 'administrator',
  };
}

export function useIsAuthenticated(): boolean { const { status } = useSession(); return status === 'authenticated'; }
export function useAuthError(): string | null { const { status } = useSession(); if (status === 'unauthenticated') return 'Not authenticated'; return null; }

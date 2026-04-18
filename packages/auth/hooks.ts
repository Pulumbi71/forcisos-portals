'use client';

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { User, UserRole, Portal } from '@forcisos/types';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config';

interface UseUserReturn {
  user: User | undefined;
  loading: boolean;
  error: string | null;
}

// Create Supabase browser client
function createSupabaseBrowserClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

export function useUser(): UseUserReturn {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    const getUser = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          const userData: User = {
            id: session.user.id,
            email: session.user.email || '',
            firstName: session.user.user_metadata?.firstName || '',
            lastName: session.user.user_metadata?.lastName || '',
            role: (session.user.user_metadata?.role || 'fc_student') as UserRole,
            avatar: session.user.user_metadata?.avatar,
            bio: session.user.user_metadata?.bio,
            createdAt: session.user.created_at || new Date().toISOString(),
            updatedAt: session.user.updated_at || new Date().toISOString(),
          };
          setUser(userData);
        } else {
          setUser(undefined);
          setError('Not authenticated');
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Auth error';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      getUser();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user, loading, error };
}

export function usePortalAccess() {
  const { user, loading } = useUser();

  const portals: Portal[] = [
    {
      id: 'admin',
      name: 'Admin Portal',
      slug: 'admin',
      url: 'https://fcisoadmin.forcisos.com',
      description: 'Administrator Dashboard',
      icon: 'Shield',
      requiredRoles: ['administrator'],
    },
    {
      id: 'member',
      name: 'Member Portal',
      slug: 'member',
      url: 'https://member.forcisos.com',
      description: 'Member Dashboard',
      icon: 'Users',
      requiredRoles: ['fc_student'],
    },
    {
      id: 'trainer',
      name: 'Trainer Portal',
      slug: 'trainer',
      url: 'https://trainer.forcisos.com',
      description: 'Trainer Dashboard',
      icon: 'BookOpen',
      requiredRoles: ['fc_trainer'],
    },
    {
      id: 'partner',
      name: 'Partner Portal',
      slug: 'partner',
      url: 'https://partner.forcisos.com',
      description: 'Partner Dashboard',
      icon: 'Building2',
      requiredRoles: ['fc_partner'],
    },
    {
      id: 'curriculum',
      name: 'Curriculum Portal',
      slug: 'curriculum',
      url: 'https://curriculum.forcisos.com',
      description: 'Curriculum Management',
      icon: 'BookMarked',
      requiredRoles: ['fc_curriculum_mgr', 'administrator'],
    },
  ];

  const accessiblePortals = portals.filter((portal) => {
    if (!user) return false;
    if (portal.id === 'admin') return false; // Hidden from portal picker for security
    return portal.requiredRoles.includes(user.role as UserRole);
  });

  const hasAccessToRole = (role: UserRole): boolean => {
    if (!user) return false;
    return user.role === role;
  };

  return {
    user,
    loading,
    authenticated: !loading && !!user,
    allPortals: portals,
    accessiblePortals,
    hasAccessToRole,
    canAccessAdmin: user?.role === 'administrator',
    canAccessMember:
      user?.role === 'fc_student' ||
      user?.role === 'administrator' ||
      user?.role === 'fc_trainer',
    canAccessTrainer: user?.role === 'fc_trainer' || user?.role === 'administrator',
    canAccessPartner: user?.role === 'fc_partner' || user?.role === 'administrator',
    canAccessCurriculum:
      user?.role === 'fc_curriculum_mgr' || user?.role === 'administrator',
  };
}

export function useIsAuthenticated(): boolean {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setAuthenticated(!!session);
    };

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      checkAuth();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return authenticated;
}

export function useAuthError(): string | null {
  const { error } = useUser();
  return error;
}

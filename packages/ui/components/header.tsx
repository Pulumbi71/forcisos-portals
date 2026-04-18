'use client';

import { Bell, Settings, LogOut, Menu } from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';
import { useUser, usePortalAccess } from '@forcisos/auth';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ppbaaayehejlwdhuytfo.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwYmFhYXllaGVqbHdkaHV5dGZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5NTg5NTQsImV4cCI6MjA5MTUzNDk1NH0.hUuBRwzVGccTfVE4xKxYG-eZjGWYmOhHXSWQWtoq0Yw';

async function handleSignOut() {
  const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  await supabase.auth.signOut();
  window.location.href = '/login';
}
import { useState } from 'react';
import Link from 'next/link';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const { user } = useUser();
  const { accessiblePortals } = usePortalAccess();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showPortalPicker, setShowPortalPicker] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-navy">{title}</h1>
        </div>

        <div className="flex items-center gap-4">
          <button
            className="relative p-2 text-gray-600 hover:text-navy transition-colors"
            title="Notifications"
          >
            <Bell size={24} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-cta-red rounded-full" />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowPortalPicker(!showPortalPicker)}
              className="px-3 py-2 text-sm bg-light-bg text-navy rounded-lg hover:bg-teal hover:text-white transition-colors"
            >
              Portals
            </button>

            {showPortalPicker && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                {accessiblePortals.map((portal) => (
                  <a
                    key={portal.id}
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-light-bg transition-colors first:rounded-t-lg last:rounded-b-lg border-b last:border-b-0"
                  >
                    {portal.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-light-bg transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-teal text-white flex items-center justify-center text-sm font-bold">
                {user?.firstName?.charAt(0)}
              </div>
              <span className="hidden sm:inline text-sm font-medium text-navy">
                {user?.firstName}
              </span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-navy">{user?.email}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>

                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-light-bg transition-colors"
                >
                  <Settings size={16} className="inline mr-2" />
                  Settings
                </Link>

                <button
                  onClick={() => handleSignOut()}
                  className="w-full text-left px-4 py-2 text-sm text-cta-red hover:bg-light-bg transition-colors rounded-b-lg"
                >
                  <LogOut size={16} className="inline mr-2" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

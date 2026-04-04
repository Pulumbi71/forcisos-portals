'use client';

import { ReactNode } from 'react';
import { Sidebar, NavItem } from './sidebar';
import { Header } from './header';

interface PortalLayoutProps { children: ReactNode; navItems: NavItem[]; logo: React.ReactNode; sidebarTitle: string; headerTitle: string; }

export function PortalLayout({ children, navItems, logo, sidebarTitle, headerTitle }: PortalLayoutProps) {
  return (
    <div className="min-h-screen bg-light-bg">
      <Sidebar items={navItems} logo={logo} title={sidebarTitle} />
      <div className="md:ml-64 flex flex-col min-h-screen">
        <Header title={headerTitle} />
        <main className="flex-1 p-4 md:p-6">{children}</main>
        <footer className="border-t border-gray-200 bg-white p-4 md:p-6 text-center text-sm text-gray-500"><p>\u00a9 {new Date().getFullYear()} Forcisos. All rights reserved.</p></footer>
      </div>
    </div>
  );
}

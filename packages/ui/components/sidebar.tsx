'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useUser } from '@forcisos/auth';
import clsx from 'clsx';

export interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string | number;
  active?: boolean;
}

interface SidebarProps { items: NavItem[]; logo: React.ReactNode; title: string; }

export function Sidebar({ items, logo, title }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  return (
    <>
      <button className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-navy text-white" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X size={24} /> : <Menu size={24} />}</button>
      <div className={clsx('fixed inset-0 bg-black/50 md:hidden transition-opacity z-40', isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none')} onClick={() => setIsOpen(false)} />
      <aside className={clsx('fixed left-0 top-0 h-screen w-64 bg-navy text-white flex flex-col overflow-y-auto transition-transform md:translate-x-0 z-40', isOpen ? 'translate-x-0' : '-translate-x-full')}>
        <div className="p-6 border-b border-teal/20"><div className="flex items-center gap-3 mb-2">{logo}<h1 className="text-xl font-bold">{title}</h1></div>{user && <p className="text-xs text-teal">{user.firstName} {user.lastName}</p>}</div>
        <nav className="flex-1 p-4 space-y-2">{items.map((item) => (<Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className={clsx('flex items-center justify-between gap-3 px-4 py-2 rounded-lg transition-colors', item.active ? 'bg-teal text-navy font-semibold' : 'text-gray-300 hover:bg-navy-light hover:text-white')}><span className="flex items-center gap-3">{item.icon}{item.label}</span>{item.badge && <span className="bg-cta-red text-white text-xs px-2 py-1 rounded-full">{item.badge}</span>}</Link>))}</nav>
        <div className="p-4 border-t border-teal/20"><button onClick={() => signOut({ callbackUrl: '/login' })} className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-cta-red hover:text-white transition-colors"><LogOut size={20} />Sign Out</button></div>
      </aside>
      <div className="hidden md:block md:w-64" />
    </>
  );
}

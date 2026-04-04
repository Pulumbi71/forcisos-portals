'use client';

import { PortalLayout } from '@forcisos/ui';
import { MessageSquare, Home } from 'lucide-react';

export default function CommunicationsPage() {
  const navItems = [
    { label: 'Dashboard', href: '/', icon: <Home size={20} /> },
    { label: 'Communications', href: '/communications', icon: <MessageSquare size={20} />, active: true },
  ];

  return (
    <PortalLayout
      navItems={navItems}
      logo={<MessageSquare className="text-teal" size={24} />}
      sidebarTitle="Admin Portal"
      headerTitle="Communications"
    >
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <p className="text-gray-600">Communications content coming soon</p>
      </div>
    </PortalLayout>
  );
}

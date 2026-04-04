'use client';

import { PortalLayout } from '@forcisos/ui';
import { FileText, Home } from 'lucide-react';

export default function LicensesPage() {
  const navItems = [
    { label: 'Dashboard', href: '/', icon: <Home size={20} /> },
    { label: 'Licenses', href: '/licenses', icon: <FileText size={20} />, active: true },
  ];

  return (
    <PortalLayout
      navItems={navItems}
      logo={<FileText className="text-teal" size={24} />}
      sidebarTitle="Partner Portal"
      headerTitle="License Management"
    >
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <p className="text-gray-600">License management content coming soon</p>
      </div>
    </PortalLayout>
  );
}

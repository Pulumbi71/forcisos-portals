'use client';

import { PortalLayout, ComingSoon } from '@forcisos/ui';
import { DollarSign, Home } from 'lucide-react';

export default function FinancialsPage() {
  const navItems = [
    { label: 'Dashboard', href: '/', icon: <Home size={20} /> },
    { label: 'Financials', href: '/financials', icon: <DollarSign size={20} />, active: true },
  ];

  return (
    <PortalLayout
      navItems={navItems}
      logo={<DollarSign className="text-teal" size={24} />}
      sidebarTitle="Partner Portal"
      headerTitle="Financials"
    >
      <ComingSoon title="Financials" message="Financial dashboard is coming soon" />
    </PortalLayout>
  );
}

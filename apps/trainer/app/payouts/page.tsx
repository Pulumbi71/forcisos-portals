'use client';

import { PortalLayout, ComingSoon } from '@forcisos/ui';
import { DollarSign, Home } from 'lucide-react';

export default function PayoutsPage() {
  const navItems = [
    { label: 'Dashboard', href: '/', icon: <Home size={20} /> },
    { label: 'Payouts', href: '/payouts', icon: <DollarSign size={20} />, active: true },
  ];

  return (
    <PortalLayout
      navItems={navItems}
      logo={<DollarSign className="text-teal" size={24} />}
      sidebarTitle="Trainer Portal"
      headerTitle="Payouts"
    >
      <ComingSoon title="Payout System" message="Payout management is coming soon" />
    </PortalLayout>
  );
}

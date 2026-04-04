'use client';

import { PortalLayout, FormField } from '@forcisos/ui';
import { Settings, Home } from 'lucide-react';

export default function ProfilePage() {
  const navItems = [
    { label: 'Dashboard', href: '/', icon: <Home size={20} /> },
    { label: 'Profile', href: '/profile', icon: <Settings size={20} />, active: true },
  ];

  return (
    <PortalLayout
      navItems={navItems}
      logo={<Settings className="text-teal" size={24} />}
      sidebarTitle="Member Portal"
      headerTitle="My Profile"
    >
      <div className="max-w-2xl mx-auto bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-navy mb-6">Profile Settings</h2>
        <div className="space-y-4">
          <FormField label="First Name" defaultValue="John" />
          <FormField label="Last Name" defaultValue="Doe" />
          <FormField label="Email" type="email" defaultValue="john@example.com" disabled />
          <button className="px-6 py-2 bg-teal text-white rounded-lg hover:bg-teal/90 transition-colors font-medium">
            Save Changes
          </button>
        </div>
      </div>
    </PortalLayout>
  );
}

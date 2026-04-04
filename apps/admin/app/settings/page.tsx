'use client';

import { PortalLayout, FormField } from '@forcisos/ui';
import { Settings, Home } from 'lucide-react';

export default function SettingsPage() {
  const navItems = [
    { label: 'Dashboard', href: '/', icon: <Home size={20} /> },
    { label: 'Settings', href: '/settings', icon: <Settings size={20} />, active: true },
  ];

  return (
    <PortalLayout
      navItems={navItems}
      logo={<Settings className="text-teal" size={24} />}
      sidebarTitle="Admin Portal"
      headerTitle="System Settings"
    >
      <div className="max-w-2xl mx-auto bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-navy mb-6">System Configuration</h2>
        <div className="space-y-4">
          <FormField label="Site Name" defaultValue="Forcisos" />
          <FormField label="Site URL" defaultValue="https://forcisos.com" />
          <FormField label="Support Email" defaultValue="support@forcisos.com" />
          <button className="px-6 py-2 bg-teal text-white rounded-lg hover:bg-teal/90 transition-colors font-medium">
            Save Settings
          </button>
        </div>
      </div>
    </PortalLayout>
  );
}

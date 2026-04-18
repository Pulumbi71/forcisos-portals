'use client';

import { usePortalAccess } from '@forcisos/auth';
import { LayoutDashboard } from 'lucide-react';

export function PortalPicker() {
  const { accessiblePortals } = usePortalAccess();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {accessiblePortals.map((portal) => (
        <a
          key={portal.id}
          href={portal.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg hover:border-teal transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-light-bg rounded-lg flex items-center justify-center text-teal">
              <LayoutDashboard size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-navy">{portal.name}</h3>
              <p className="text-sm text-gray-600">{portal.description}</p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

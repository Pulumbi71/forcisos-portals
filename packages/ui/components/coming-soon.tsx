'use client';

import { Clock } from 'lucide-react';

interface ComingSoonProps {
  title?: string;
  message?: string;
}

export function ComingSoon({
  title = 'Coming Soon',
  message = 'This feature is currently under development.',
}: ComingSoonProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4">
      <div className="w-20 h-20 bg-light-bg rounded-full flex items-center justify-center text-teal/50 mb-6">
        <Clock size={40} />
      </div>

      <h2 className="text-2xl font-bold text-navy mb-2">{title}</h2>
      <p className="text-gray-600 text-center max-w-md">{message}</p>

      <div className="mt-8 text-sm text-gray-500">
        Check back soon for updates
      </div>
    </div>
  );
}

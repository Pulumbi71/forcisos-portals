'use client';

import { ReactNode } from 'react';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-light-bg rounded-full flex items-center justify-center text-teal/50">
          {icon}
        </div>
      </div>

      <h3 className="text-lg font-semibold text-navy mb-2">{title}</h3>
      <p className="text-gray-500 mb-6">{description}</p>

      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-2 bg-teal text-white rounded-lg hover:bg-teal/90 transition-colors font-medium"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

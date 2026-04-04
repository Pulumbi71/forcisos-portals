'use client';

import clsx from 'clsx';

type BadgeStatus = 'success' | 'warning' | 'error' | 'info' | 'neutral';

interface BadgeProps {
  status: BadgeStatus;
  label: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Badge({ status, label, size = 'md' }: BadgeProps) {
  const baseClasses = 'font-medium rounded-full inline-flex items-center';

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const statusClasses = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-cta-red/10 text-cta-red',
    info: 'bg-teal/10 text-teal',
    neutral: 'bg-gray-100 text-gray-800',
  };

  return (
    <span
      className={clsx(
        baseClasses,
        sizeClasses[size],
        statusClasses[status]
      )}
    >
      {label}
    </span>
  );
}

'use client';

import clsx from 'clsx';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'navy' | 'teal' | 'white';
}

export function LoadingSpinner({ size = 'md', color = 'navy' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  const colorClasses = {
    navy: 'border-navy border-t-teal',
    teal: 'border-teal border-t-navy',
    white: 'border-white border-t-teal',
  };

  return (
    <div
      className={clsx(
        'rounded-full animate-spin',
        sizeClasses[size],
        colorClasses[color]
      )}
    />
  );
}

interface SkeletonProps {
  count?: number;
  height?: string;
  width?: string;
}

export function Skeleton({ count = 1, height = 'h-4', width = 'w-full' }: SkeletonProps) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={clsx(
            'bg-gray-200 rounded-lg animate-pulse',
            height,
            width
          )}
        />
      ))}
    </div>
  );
}

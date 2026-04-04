'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import clsx from 'clsx';

interface StatCardProps { icon: React.ReactNode; label: string; value: string | number; trend?: { value: number; isPositive: boolean; label: string; }; onClick?: () => void; }

export function StatCard({ icon, label, value, trend, onClick }: StatCardProps) {
  return (
    <div className={clsx('bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all', onClick && 'cursor-pointer')} onClick={onClick}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-light-bg rounded-lg flex items-center justify-center text-teal">{icon}</div>
        {trend && (<div className={clsx('flex items-center gap-1 text-sm font-semibold', trend.isPositive ? 'text-green-600' : 'text-cta-red')}>{trend.isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}{Math.abs(trend.value)}%</div>)}
      </div>
      <p className="text-sm text-gray-600 mb-2">{label}</p>
      <p className="text-3xl font-bold text-navy mb-2">{value}</p>
      {trend && <p className="text-xs text-gray-500">{trend.label}</p>}
    </div>
  );
}

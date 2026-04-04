'use client';

import { PortalLayout, StatCard } from '@forcisos/ui';
import { Building2, Home, Users, BarChart3, FileText, MessageSquare, DollarSign, Settings } from 'lucide-react';

export default function PartnerDashboard() {
  const navItems = [
    { label: 'Dashboard', href: '/', icon: <Home size={20} />, active: true },
    { label: 'Licenses', href: '/licenses', icon: <FileText size={20} /> },
    { label: 'Employees', href: '/employees', icon: <Users size={20} /> },
    { label: 'Documents', href: '/documents', icon: <FileText size={20} /> },
    { label: 'Branding', href: '/branding', icon: <Building2 size={20} /> },
    { label: 'Communications', href: '/communications', icon: <MessageSquare size={20} /> },
    { label: 'Financials', href: '/financials', icon: <DollarSign size={20} /> },
    { label: 'Reports', href: '/reports', icon: <BarChart3 size={20} /> },
  ];

  const stats = [
    {
      icon: <FileText size={24} />,
      label: 'Active Licenses',
      value: '12',
      trend: { value: 2, isPositive: true, label: 'new this month' },
    },
    {
      icon: <Users size={24} />,
      label: 'Total Employees',
      value: '45',
      trend: { value: 5, isPositive: true, label: 'new this month' },
    },
    {
      icon: <BarChart3 size={24} />,
      label: 'Completion Rate',
      value: '78%',
      trend: { value: 3, isPositive: true, label: 'vs last month' },
    },
    {
      icon: <DollarSign size={24} />,
      label: 'Monthly Cost',
      value: '$8,950',
      trend: { value: 5, isPositive: false, label: 'vs last month' },
    },
  ];

  return (
    <PortalLayout
      navItems={navItems}
      logo={<Building2 className="text-teal" size={24} />}
      sidebarTitle="Partner Portal"
      headerTitle="Partnership Dashboard"
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-navy mb-4">License Overview</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="pb-4 border-b border-gray-100 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-navy">Course {i}</p>
                    <span className="text-xs font-semibold text-teal">{i * 10}/50</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-teal h-2 rounded-full"
                      style={{ width: `${i * 20}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-navy mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-3 bg-light-bg rounded-lg text-sm">
                  <p className="font-medium text-navy">Employee {i} completed Course A</p>
                  <p className="text-xs text-gray-600 mt-1">{i} days ago</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}

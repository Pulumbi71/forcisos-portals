'use client';

import { ReactNode } from 'react';
import { PortalLayout, StatCard, Sidebar, Header } from '@forcisos/ui';
import { Users, DollarSign, BookOpen, UserCheck, Settings, FileText, ShoppingCart, MessageSquare, LogBook, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();

  const navItems = [
    { label: 'Dashboard', href: '/', icon: <Home size={20} />, active: true },
    { label: 'Users', href: '/users', icon: <Users size={20} /> },
    { label: 'Registrations', href: '/registrations', icon: <UserCheck size={20} /> },
    { label: 'Orders', href: '/orders', icon: <ShoppingCart size={20} /> },
    { label: 'Partnerships', href: '/partnerships', icon: <FileText size={20} /> },
    { label: 'Coupons', href: '/coupons', icon: <Settings size={20} /> },
    { label: 'Bookings', href: '/bookings', icon: <MessageSquare size={20} /> },
    { label: 'Communications', href: '/communications', icon: <MessageSquare size={20} /> },
    { label: 'Audit Log', href: '/audit-log', icon: <LogBook size={20} /> },
    { label: 'Settings', href: '/settings', icon: <Settings size={20} /> },
  ];

  const stats = [
    {
      icon: <Users size={24} />,
      label: 'Total Users',
      value: '1,234',
      trend: { value: 12, isPositive: true, label: 'vs last month' },
    },
    {
      icon: <DollarSign size={24} />,
      label: 'Total Revenue',
      value: '$45,670',
      trend: { value: 8, isPositive: true, label: 'vs last month' },
    },
    {
      icon: <BookOpen size={24} />,
      label: 'Active Cohorts',
      value: '24',
      trend: { value: 5, isPositive: true, label: 'vs last month' },
    },
    {
      icon: <UserCheck size={24} />,
      label: 'Pending Registrations',
      value: '18',
      trend: { value: 3, isPositive: false, label: 'vs last month' },
    },
  ];

  return (
    <PortalLayout
      navItems={navItems}
      logo={<Settings className="text-teal" size={24} />}
      sidebarTitle="Admin Portal"
      headerTitle="Dashboard"
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-navy mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-navy">User Registration Approved</p>
                    <p className="text-xs text-gray-500">user{i}@example.com</p>
                  </div>
                  <span className="text-xs text-gray-500">{i} mins ago</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-navy mb-4">System Status</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">API Server</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Database</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Payment Gateway</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Email Service</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">Degraded</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}

'use client';

import { PortalLayout, StatCard } from '@forcisos/ui';
import { BookOpen, Home, Users, Award, BarChart3, DollarSign, Clock } from 'lucide-react';

export default function TrainerDashboard() {
  const navItems = [
    { label: 'Dashboard', href: '/', icon: <Home size={20} />, active: true },
    { label: 'Teaching', href: '/teaching', icon: <BookOpen size={20} /> },
    { label: 'Learning', href: '/learning', icon: <BookOpen size={20} /> },
    { label: 'Notes', href: '/notes', icon: <Award size={20} /> },
    { label: 'Students', href: '/students', icon: <Users size={20} /> },
    { label: 'Schedule', href: '/schedule', icon: <Clock size={20} /> },
    { label: 'Statistics', href: '/stats', icon: <BarChart3 size={20} /> },
    { label: 'Payouts', href: '/payouts', icon: <DollarSign size={20} /> },
  ];

  const stats = [
    {
      icon: <BookOpen size={24} />,
      label: 'Courses Teaching',
      value: '4',
      trend: { value: 1, isPositive: true, label: 'new this month' },
    },
    {
      icon: <Users size={24} />,
      label: 'Total Students',
      value: '156',
      trend: { value: 12, isPositive: true, label: 'new students' },
    },
    {
      icon: <Award size={24} />,
      label: 'Average Rating',
      value: '4.9',
      trend: { value: 0.2, isPositive: true, label: 'vs last month' },
    },
    {
      icon: <DollarSign size={24} />,
      label: 'Pending Payout',
      value: '$2,450',
      trend: { value: 8, isPositive: true, label: 'vs last month' },
    },
  ];

  return (
    <PortalLayout
      navItems={navItems}
      logo={<BookOpen className="text-teal" size={24} />}
      sidebarTitle="Trainer Portal"
      headerTitle="Teaching Dashboard"
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-navy mb-4">Upcoming Sessions</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="pb-4 border-b border-gray-100 last:border-0">
                  <p className="font-medium text-navy">Course {i}: Session Name</p>
                  <p className="text-sm text-gray-600 mt-1">Students: {(i + 1) * 15}</p>
                  <p className="text-xs text-gray-500 mt-1">Today at {10 + i}:00 AM</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-navy mb-4">Course Performance</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-navy">Course {i}</p>
                    <span className="text-xs font-semibold text-teal">{80 + i * 3}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-teal h-2 rounded-full"
                      style={{ width: `${80 + i * 3}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}

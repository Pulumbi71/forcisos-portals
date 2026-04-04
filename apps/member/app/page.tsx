'use client';

import { PortalLayout, StatCard } from '@forcisos/ui';
import { BookOpen, Home, Award, Clock, Calendar, ShoppingCart, Settings, Bell } from 'lucide-react';

export default function MemberDashboard() {
  const navItems = [
    { label: 'Dashboard', href: '/', icon: <Home size={20} />, active: true },
    { label: 'Courses', href: '/courses', icon: <BookOpen size={20} /> },
    { label: 'My Courses', href: '/my-courses', icon: <BookOpen size={20} /> },
    { label: 'Certificates', href: '/certificates', icon: <Award size={20} /> },
    { label: 'Bookings', href: '/bookings', icon: <Calendar size={20} /> },
    { label: 'Orders', href: '/orders', icon: <ShoppingCart size={20} /> },
    { label: 'Profile', href: '/profile', icon: <Settings size={20} /> },
    { label: 'Notifications', href: '/notifications', icon: <Bell size={20} /> },
  ];

  const stats = [
    {
      icon: <BookOpen size={24} />,
      label: 'Enrolled Courses',
      value: '5',
      trend: { value: 2, isPositive: true, label: 'new this month' },
    },
    {
      icon: <Clock size={24} />,
      label: 'Learning Hours',
      value: '142',
      trend: { value: 8, isPositive: true, label: 'vs last month' },
    },
    {
      icon: <Award size={24} />,
      label: 'Certificates Earned',
      value: '3',
      trend: { value: 1, isPositive: true, label: 'this month' },
    },
    {
      icon: <Calendar size={24} />,
      label: 'Upcoming Sessions',
      value: '4',
      trend: { value: 0, isPositive: true, label: 'this week' },
    },
  ];

  return (
    <PortalLayout
      navItems={navItems}
      logo={<BookOpen className="text-teal" size={24} />}
      sidebarTitle="Member Portal"
      headerTitle="My Learning Dashboard"
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-navy mb-4">Current Learning</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="pb-4 border-b border-gray-100 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-navy">Course {i}: Advanced Topic</p>
                    <span className="text-xs font-semibold text-teal">{i * 20}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-teal h-2 rounded-full transition-all"
                      style={{ width: `${i * 20}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Module {i} of 5 completed</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-navy mb-4">Upcoming Sessions</h2>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-light-bg rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-navy">Session {i}</p>
                    <p className="text-xs text-gray-600">Course Title</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-teal">Today</p>
                    <p className="text-xs text-gray-600">{10 + i}:00 AM</p>
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

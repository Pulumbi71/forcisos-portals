'use client';

import { PortalLayout, StatCard } from '@forcisos/ui';
import { BookMarked, Home, Users, DollarSign, BarChart3, FileText, Grid3x3, Tag } from 'lucide-react';

export default function CurriculumDashboard() {
  const navItems = [
    { label: 'Dashboard', href: '/', icon: <Home size={20} />, active: true },
    { label: 'Courses', href: '/courses', icon: <BookMarked size={20} /> },
    { label: 'Modules', href: '/courses', icon: <Grid3x3 size={20} /> },
    { label: 'Cohorts', href: '/cohorts', icon: <Users size={20} /> },
    { label: 'Trainers', href: '/trainers', icon: <Users size={20} /> },
    { label: 'Reviews', href: '/reviews', icon: <FileText size={20} /> },
    { label: 'Statistics', href: '/statistics', icon: <BarChart3 size={20} /> },
    { label: 'Categories', href: '/categories', icon: <Tag size={20} /> },
  ];

  const stats = [
    {
      icon: <BookMarked size={24} />,
      label: 'Total Courses',
      value: '28',
      trend: { value: 3, isPositive: true, label: 'new this month' },
    },
    {
      icon: <Users size={24} />,
      label: 'Active Cohorts',
      value: '15',
      trend: { value: 2, isPositive: true, label: 'new cohorts' },
    },
    {
      icon: <DollarSign size={24} />,
      label: 'Total Revenue',
      value: '$124,560',
      trend: { value: 18, isPositive: true, label: 'vs last month' },
    },
    {
      icon: <BarChart3 size={24} />,
      label: 'Avg Completion',
      value: '82%',
      trend: { value: 4, isPositive: true, label: 'vs last month' },
    },
  ];

  return (
    <PortalLayout
      navItems={navItems}
      logo={<BookMarked className="text-teal" size={24} />}
      sidebarTitle="Curriculum Portal"
      headerTitle="Curriculum Management"
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-navy mb-4">Popular Courses</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="font-medium text-navy">Course {i}: Advanced Topic</p>
                    <p className="text-sm text-gray-600 mt-1">{(i + 1) * 23} enrollments</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-teal">4.{8 - i}</p>
                    <p className="text-xs text-gray-500">rating</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-navy mb-4">Pending Reviews</h2>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-3 bg-light-bg rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-navy">Review {i}</p>
                      <p className="text-xs text-gray-600 mt-1">Course {i}</p>
                    </div>
                    <button className="text-teal hover:text-teal/80 text-sm font-semibold">
                      Review
                    </button>
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

'use client';

import { PortalLayout } from '@forcisos/ui';
import { BookOpen, Home } from 'lucide-react';

export default function MyCoursesPage() {
  const navItems = [
    { label: 'Dashboard', href: '/', icon: <Home size={20} /> },
    { label: 'My Courses', href: '/my-courses', icon: <BookOpen size={20} />, active: true },
  ];

  return (
    <PortalLayout
      navItems={navItems}
      logo={<BookOpen className="text-teal" size={24} />}
      sidebarTitle="Member Portal"
      headerTitle="My Courses"
    >
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <p className="text-gray-600">My courses content coming soon</p>
      </div>
    </PortalLayout>
  );
}

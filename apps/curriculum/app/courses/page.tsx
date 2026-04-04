'use client';

import { PortalLayout, DataTable, Column } from '@forcisos/ui';
import { BookMarked, Home, Plus } from 'lucide-react';
import { Course } from '@forcisos/types';
import Link from 'next/link';

export default function CoursesPage() {
  const navItems = [
    { label: 'Dashboard', href: '/', icon: <Home size={20} /> },
    { label: 'Courses', href: '/courses', icon: <BookMarked size={20} />, active: true },
  ];

  const courses: Course[] = [
    {
      id: '1',
      title: 'React Fundamentals',
      description: 'Learn React basics',
      category: 'Development',
      level: 'beginner',
      duration: 40,
      price: 99.99,
      instructorId: 'trainer1',
      status: 'published',
      enrollmentCount: 234,
      rating: 4.8,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-20',
    },
  ];

  const columns: Column<Course>[] = [
    { key: 'title', label: 'Title', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'level', label: 'Level', sortable: true, render: (v) => <span className="capitalize">{v}</span> },
    { key: 'enrollmentCount', label: 'Enrollments', sortable: true },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (v) => <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded capitalize">{v}</span>,
    },
  ];

  return (
    <PortalLayout
      navItems={navItems}
      logo={<BookMarked className="text-teal" size={24} />}
      sidebarTitle="Curriculum Portal"
      headerTitle="Courses"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-navy">Course Catalog</h2>
            <p className="text-gray-600 mt-1">Manage all courses</p>
          </div>
          <Link
            href="/courses/new"
            className="flex items-center gap-2 px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal/90 transition-colors font-medium"
          >
            <Plus size={20} />
            New Course
          </Link>
        </div>

        <DataTable
          data={courses}
          columns={columns}
          searchable
          onRowClick={(course) => {
            window.location.href = `/courses/${course.id}`;
          }}
        />
      </div>
    </PortalLayout>
  );
}

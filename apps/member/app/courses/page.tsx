'use client';

import { PortalLayout, EmptyState } from '@forcisos/ui';
import { BookOpen, Home, Filter } from 'lucide-react';
import { useState } from 'react';

interface CourseCard {
  id: string;
  title: string;
  category: string;
  level: string;
  price: number;
  rating: number;
  image: string;
}

export default function CoursesPage() {
  const navItems = [
    { label: 'Dashboard', href: '/', icon: <Home size={20} /> },
    { label: 'Courses', href: '/courses', icon: <BookOpen size={20} />, active: true },
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const courses: CourseCard[] = [
    {
      id: '1',
      title: 'Introduction to React',
      category: 'Development',
      level: 'beginner',
      price: 99.99,
      rating: 4.8,
      image: 'https://via.placeholder.com/200x150/00BCD4/ffffff?text=React',
    },
    {
      id: '2',
      title: 'Advanced TypeScript',
      category: 'Development',
      level: 'advanced',
      price: 149.99,
      rating: 4.9,
      image: 'https://via.placeholder.com/200x150/1B2A4A/ffffff?text=TypeScript',
    },
    {
      id: '3',
      title: 'Business Analytics',
      category: 'Business',
      level: 'intermediate',
      price: 79.99,
      rating: 4.6,
      image: 'https://via.placeholder.com/200x150/E63946/ffffff?text=Analytics',
    },
  ];

  const categories = ['all', 'Development', 'Business', 'Design'];

  return (
    <PortalLayout
      navItems={navItems}
      logo={<BookOpen className="text-teal" size={24} />}
      sidebarTitle="Member Portal"
      headerTitle="Course Catalog"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-navy">Available Courses</h2>
            <p className="text-gray-600 mt-1">Explore and enroll in courses</p>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors capitalize ${
                selectedCategory === cat
                  ? 'bg-teal text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-teal'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <p className="text-xs font-semibold text-teal mb-1">{course.category}</p>
                  <h3 className="text-lg font-bold text-navy mb-2">{course.title}</h3>

                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2 py-1 bg-light-bg text-navy text-xs font-semibold rounded capitalize">
                      {course.level}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-semibold text-navy">{course.rating}</span>
                      <span className="text-yellow-500">★</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-navy">${course.price}</span>
                    <button className="px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal/90 transition-colors font-medium">
                      Enroll
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<BookOpen size={48} />}
            title="No courses found"
            description="Try adjusting your filters"
          />
        )}
      </div>
    </PortalLayout>
  );
}

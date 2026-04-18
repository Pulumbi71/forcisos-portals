'use client';

import { Home, BookMarked, LayoutGrid, Users, UserCheck, FileText, BarChart3, Tag } from 'lucide-react';
import React from 'react';

export function getNavItems(active: string) {
  return [
    { label: 'Dashboard', href: '/', icon: <Home size={20} />, active: active === 'dashboard' },
    { label: 'Courses', href: '/courses', icon: <BookMarked size={20} />, active: active === 'courses' },
    { label: 'Modules', href: '/modules', icon: <LayoutGrid size={20} />, active: active === 'modules' },
    { label: 'Cohorts', href: '/cohorts', icon: <Users size={20} />, active: active === 'cohorts' },
    { label: 'Trainers', href: '/trainers', icon: <UserCheck size={20} />, active: active === 'trainers' },
    { label: 'Reviews', href: '/reviews', icon: <FileText size={20} />, active: active === 'reviews' },
    { label: 'Statistics', href: '/statistics', icon: <BarChart3 size={20} />, active: active === 'statistics' },
    { label: 'Categories', href: '/categories', icon: <Tag size={20} />, active: active === 'categories' },
  ];
}

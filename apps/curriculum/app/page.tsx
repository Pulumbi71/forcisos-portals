'use client';

import { PortalLayout, StatCard } from '@forcisos/ui';
import { BookMarked, Home, Users, DollarSign, BarChart3, FileText, LayoutGrid, Tag } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@forcisos/supabase';
import { getNavItems } from '../lib/nav-items';

interface Module {
  id: string;
  title: string;
  is_featured: boolean;
  sort_order: number;
}

interface Review {
  id: string;
  review_text: string;
  score: number;
}

interface Enrollment {
  price_paid: number;
}

export default function CurriculumDashboard() {
  const [loading, setLoading] = useState(true);
  const [totalModules, setTotalModules] = useState(0);
  const [activeCohorts, setActiveCohorts] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [popularModules, setPopularModules] = useState<Module[]>([]);
  const [pendingReviews, setPendingReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);

  const navItems = getNavItems('dashboard');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const { count: modulesCount, error: modulesError } = await supabase
          .from('modules')
          .select('*', { count: 'exact', head: true });
        if (modulesError) throw modulesError;
        setTotalModules(modulesCount || 0);

        const { count: cohortsCount, error: cohortsError } = await supabase
          .from('cohorts')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'active');
        if (cohortsError) throw cohortsError;
        setActiveCohorts(cohortsCount || 0);

        const { data: enrollments, error: enrollmentsError } = await supabase
          .from('cohort_enrollments')
          .select('price_paid');
        if (enrollmentsError) throw enrollmentsError;
        const revenue = enrollments?.reduce((sum: number, e: Enrollment) => sum + (e.price_paid || 0), 0) || 0;
        setTotalRevenue(revenue);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-gray-600">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  const navItems2 = getNavItems('dashboard');
  const stats = [
    { icon: <BookMarked size={24} />, label: 'Total Modules', value: totalModules.toString(), trend: { value: 0, isPositive: true, label: 'in system' } },
    { icon: <Users size={24} />, label: 'Active Cohorts', value: activeCohorts.toString(), trend: { value: 0, isPositive: true, label: 'running now' } },
    { icon: <DollarSign size={24} />, label: 'Total Revenue', value: `$${totalRevenue.toLocaleString('en-US')}`, trend: { value: 0, isPositive: true, label: 'all time' } },
  ];
  return (
    <PortalLayout navItems={navItems2} logo={<BookMarked className="text-teal" size={24} />} sidebarTitle="Curriculum Portal" headerTitle="Curriculum Management">
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>
      </div>
    </PortalLayout>
  );
}

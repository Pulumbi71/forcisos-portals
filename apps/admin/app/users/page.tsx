'use client';

import { useState } from 'react';
import { PortalLayout, DataTable, Column, EmptyState } from '@forcisos/ui';
import { Plus, Users, Settings, Home } from 'lucide-react';
import { User } from '@forcisos/types';
import Link from 'next/link';

export default function UsersPage() {
  const navItems = [
    { label: 'Dashboard', href: '/', icon: <Home size={20} /> },
    { label: 'Users', href: '/users', icon: <Users size={20} />, active: true },
  ];

  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      role: 'fc_student',
      avatar: 'https://via.placeholder.com/40',
      bio: 'Passionate learner',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
    },
    {
      id: '2',
      email: 'jane.smith@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
      role: 'fc_trainer',
      avatar: 'https://via.placeholder.com/40',
      bio: 'Expert instructor',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-22',
    },
    {
      id: '3',
      email: 'admin@example.com',
      firstName: 'Admin',
      lastName: 'User',
      role: 'administrator',
      avatar: 'https://via.placeholder.com/40',
      bio: 'System administrator',
      createdAt: '2024-01-05',
      updatedAt: '2024-01-23',
    },
  ]);

  const columns: Column<User>[] = [
    {
      key: 'email',
      label: 'Email',
      sortable: true,
      filterable: true,
    },
    {
      key: 'firstName',
      label: 'First Name',
      sortable: true,
    },
    {
      key: 'lastName',
      label: 'Last Name',
      sortable: true,
    },
    {
      key: 'role',
      label: 'Role',
      sortable: true,
      render: (value) => (
        <span className="px-2 py-1 bg-teal/10 text-teal text-xs font-semibold rounded-full">
          {value}
        </span>
      ),
    },
    {
      key: 'createdAt',
      label: 'Created',
      sortable: true,
      render: (value) => new Date(value as string).toLocaleDateString(),
    },
  ];

  return (
    <PortalLayout
      navItems={navItems}
      logo={<Users className="text-teal" size={24} />}
      sidebarTitle="Admin Portal"
      headerTitle="Users Management"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-navy">All Users</h2>
            <p className="text-gray-600 mt-1">Manage user accounts and roles</p>
          </div>
          <Link
            href="/users/new"
            className="flex items-center gap-2 px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal/90 transition-colors font-medium"
          >
            <Plus size={20} />
            Add User
          </Link>
        </div>

        {users.length > 0 ? (
          <DataTable
            data={users}
            columns={columns}
            searchable
            selectable
            onRowClick={(user) => {
              window.location.href = `/users/${user.id}`;
            }}
          />
        ) : (
          <EmptyState
            icon={<Users size={48} />}
            title="No users found"
            description="Start by creating your first user account"
            action={{
              label: 'Create User',
              onClick: () => (window.location.href = '/users/new'),
            }}
          />
        )}
      </div>
    </PortalLayout>
  );
}

'use client';

import { useState } from 'react';
import { PortalLayout, DataTable, Column, EmptyState } from '@forcisos/ui';
import { UserCheck, Home, Check, X } from 'lucide-react';

interface Registration {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export default function RegistrationsPage() {
  const navItems = [
    { label: 'Dashboard', href: '/', icon: <Home size={20} /> },
    { label: 'Registrations', href: '/registrations', icon: <UserCheck size={20} />, active: true },
  ];

  const [registrations, setRegistrations] = useState<Registration[]>([
    {
      id: '1',
      email: 'newuser1@example.com',
      firstName: 'Alice',
      lastName: 'Johnson',
      status: 'pending',
      submittedAt: '2024-01-23T10:30:00Z',
    },
    {
      id: '2',
      email: 'newuser2@example.com',
      firstName: 'Bob',
      lastName: 'Williams',
      status: 'pending',
      submittedAt: '2024-01-22T15:45:00Z',
    },
  ]);

  const columns: Column<Registration>[] = [
    {
      key: 'email',
      label: 'Email',
      sortable: true,
    },
    {
      key: 'firstName',
      label: 'Name',
      sortable: true,
      render: (_, row) => `${row.firstName} ${row.lastName}`,
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
          value === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          value === 'approved' ? 'bg-green-100 text-green-800' :
          'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      ),
    },
    {
      key: 'submittedAt',
      label: 'Submitted',
      sortable: true,
      render: (value) => new Date(value as string).toLocaleDateString(),
    },
  ];

  const handleApprove = async (id: string) => {
    setRegistrations(registrations.map(r =>
      r.id === id ? { ...r, status: 'approved' as const } : r
    ));
    alert('Registration approved');
  };

  const handleReject = async (id: string) => {
    setRegistrations(registrations.map(r =>
      r.id === id ? { ...r, status: 'rejected' as const } : r
    ));
    alert('Registration rejected');
  };

  const pendingRegistrations = registrations.filter(r => r.status === 'pending');

  return (
    <PortalLayout
      navItems={navItems}
      logo={<UserCheck className="text-teal" size={24} />}
      sidebarTitle="Admin Portal"
      headerTitle="Registrations"
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-navy">Pending Registrations</h2>
          <p className="text-gray-600 mt-1">Review and approve new user registrations</p>
        </div>

        {pendingRegistrations.length > 0 ? (
          <div className="space-y-4">
            {pendingRegistrations.map((reg) => (
              <div key={reg.id} className="bg-white border border-gray-200 rounded-lg p-6 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-navy">{reg.firstName} {reg.lastName}</p>
                  <p className="text-sm text-gray-600">{reg.email}</p>
                  <p className="text-xs text-gray-500 mt-1">Submitted {new Date(reg.submittedAt).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(reg.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    <Check size={18} />
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(reg.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    <X size={18} />
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<UserCheck size={48} />}
            title="No pending registrations"
            description="All registration requests have been reviewed"
          />
        )}
      </div>
    </PortalLayout>
  );
}

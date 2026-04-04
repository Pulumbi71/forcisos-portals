'use client';

import { useState } from 'react';
import { PortalLayout, FormField, Modal } from '@forcisos/ui';
import { Users, Home, Save, ArrowLeft } from 'lucide-react';
import { User, UserRole } from '@forcisos/types';
import Link from 'next/link';

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const navItems = [
    { label: 'Dashboard', href: '/', icon: <Home size={20} /> },
    { label: 'Users', href: '/users', icon: <Users size={20} />, active: true },
  ];

  const [user, setUser] = useState<User>({
    id: params.id,
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'fc_student',
    avatar: 'https://via.placeholder.com/40',
    bio: 'Passionate learner',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    alert('User updated successfully');
  };

  const handleRoleChange = (newRole: UserRole) => {
    setUser({ ...user, role: newRole });
    setShowRoleModal(false);
  };

  return (
    <PortalLayout
      navItems={navItems}
      logo={<Users className="text-teal" size={24} />}
      sidebarTitle="Admin Portal"
      headerTitle={`User: ${user.firstName} ${user.lastName}`}
    >
      <div className="space-y-6">
        <Link
          href="/users"
          className="flex items-center gap-2 text-teal hover:text-teal/80 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Users
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-navy mb-6">Personal Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <FormField
                  label="First Name"
                  value={user.firstName}
                  onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                />
                <FormField
                  label="Last Name"
                  value={user.lastName}
                  onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                />
              </div>

              <div className="mb-6">
                <FormField
                  label="Email"
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>

              <div className="mb-6">
                <FormField
                  label="Bio"
                  as="textarea"
                  value={user.bio || ''}
                  onChange={(e) => setUser({ ...user, bio: e.target.value })}
                />
              </div>

              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal/90 disabled:opacity-50 transition-colors font-medium"
              >
                <Save size={20} />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-navy mb-4">Account Details</h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">User ID</label>
                  <p className="text-sm text-gray-600 mt-1">{user.id}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Role</label>
                  <button
                    onClick={() => setShowRoleModal(true)}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-left hover:bg-light-bg transition-colors capitalize font-medium text-navy"
                  >
                    {user.role}
                  </button>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Created</label>
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(user.createdAt).toLocaleString()}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Last Updated</label>
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(user.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-navy mb-4">Actions</h2>
              <button className="w-full px-4 py-2 border border-cta-red text-cta-red rounded-lg hover:bg-cta-red/10 transition-colors font-medium">
                Delete User
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        title="Change User Role"
      >
        <div className="space-y-3">
          {(['administrator', 'fc_curriculum_mgr', 'fc_trainer', 'fc_partner', 'fc_student'] as UserRole[]).map((role) => (
            <button
              key={role}
              onClick={() => handleRoleChange(role)}
              className={`w-full p-3 border rounded-lg transition-colors capitalize font-medium ${
                user.role === role
                  ? 'bg-teal text-white border-teal'
                  : 'border-gray-300 text-gray-700 hover:bg-light-bg'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </Modal>
    </PortalLayout>
  );
}

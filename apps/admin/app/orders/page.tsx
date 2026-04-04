'use client';

import { PortalLayout, DataTable, Column } from '@forcisos/ui';
import { ShoppingCart, Home } from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  customerEmail: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

export default function OrdersPage() {
  const navItems = [
    { label: 'Dashboard', href: '/', icon: <Home size={20} /> },
    { label: 'Orders', href: '/orders', icon: <ShoppingCart size={20} />, active: true },
  ];

  const orders: Order[] = [
    {
      id: '1',
      orderNumber: 'ORD-001',
      customerEmail: 'customer1@example.com',
      amount: 99.99,
      status: 'completed',
      createdAt: '2024-01-20',
    },
    {
      id: '2',
      orderNumber: 'ORD-002',
      customerEmail: 'customer2@example.com',
      amount: 149.99,
      status: 'pending',
      createdAt: '2024-01-22',
    },
  ];

  const columns: Column<Order>[] = [
    { key: 'orderNumber', label: 'Order #', sortable: true },
    { key: 'customerEmail', label: 'Customer', sortable: true },
    {
      key: 'amount',
      label: 'Amount',
      sortable: true,
      render: (value) => `$${value}`,
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
          value === 'completed' ? 'bg-green-100 text-green-800' :
          value === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      ),
    },
    {
      key: 'createdAt',
      label: 'Date',
      sortable: true,
      render: (value) => new Date(value as string).toLocaleDateString(),
    },
  ];

  return (
    <PortalLayout
      navItems={navItems}
      logo={<ShoppingCart className="text-teal" size={24} />}
      sidebarTitle="Admin Portal"
      headerTitle="Orders"
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-navy">All Orders</h2>
          <p className="text-gray-600 mt-1">View and manage customer orders</p>
        </div>

        <DataTable
          data={orders}
          columns={columns}
          searchable
          onRowClick={(order) => {
            window.location.href = `/orders/${order.id}`;
          }}
        />
      </div>
    </PortalLayout>
  );
}

import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { ReactNode } from 'react';
import './globals.css';
import Providers from './providers';
import { authConfig } from '@forcisos/auth';

export const metadata: Metadata = {
  title: 'Admin Portal - Forcisos',
  description: 'Administrator Dashboard',
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authConfig);

  return (
    <html lang="en">
      <body className="bg-light-bg">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

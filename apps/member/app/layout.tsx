import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Member Portal - Forcisos',
  description: 'Member Learning Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-light-bg">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

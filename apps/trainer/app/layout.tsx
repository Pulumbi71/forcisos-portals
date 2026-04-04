import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Trainer Portal - Forcisos',
  description: 'Trainer Dashboard',
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

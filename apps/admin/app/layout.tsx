import type { Metadata } from 'next';
import { ReactNode } from 'react';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Admin Portal - Forcisos',
  description: 'Administrator Dashboard',
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-light-bg">
        {children}
      </body>
    </html>
  );
}

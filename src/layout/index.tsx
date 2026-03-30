import { type ReactNode } from 'react';
import Header from '@/organisms/header';
import Sidebar from '@/organisms/sidebar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />
      <main className="ml-64 pt-21.25 min-h-screen">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}

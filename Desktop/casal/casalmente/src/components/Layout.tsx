import { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
  showHeader?: boolean;
}

export default function Layout({ children, showHeader = false }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-rose-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      {showHeader && <Header />}
      <main className={showHeader ? 'pt-20' : ''}>
        {children}
      </main>
    </div>
  );
}
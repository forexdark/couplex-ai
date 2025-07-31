import { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
  showHeader?: boolean;
}

export default function Layout({ children, showHeader = false }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-rose-50">
      {showHeader && <Header />}
      <main className={showHeader ? 'pt-20' : ''}>
        {children}
      </main>
    </div>
  );
}
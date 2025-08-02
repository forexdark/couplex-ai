import { ReactNode } from 'react';
import Header from './Header';
import Navigation from './Navigation';
import PageTransition from './PageTransition';

interface LayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showNavigation?: boolean;
  navigationTitle?: string;
  navigationActions?: React.ReactNode;
}

export default function Layout({ 
  children, 
  showHeader = false,
  showNavigation = false,
  navigationTitle,
  navigationActions
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-rose-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      {showHeader && <Header />}
      {showNavigation && (
        <Navigation 
          title={navigationTitle}
          customActions={navigationActions}
        />
      )}
      <main className={`${showHeader ? 'pt-20' : ''} ${showNavigation ? 'pt-14' : ''}`}>
        <PageTransition>
          {children}
        </PageTransition>
      </main>
    </div>
  );
}
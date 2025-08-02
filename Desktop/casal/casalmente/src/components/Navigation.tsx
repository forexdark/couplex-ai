import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

interface NavigationProps {
  title?: string;
  showBackButton?: boolean;
  showDashboardButton?: boolean;
  customActions?: React.ReactNode;
}

export default function Navigation({ 
  title, 
  showBackButton = true, 
  showDashboardButton = true, 
  customActions 
}: NavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const handleBack = () => {
    // Se há histórico, volta. Senão, vai para dashboard
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/dashboard');
    }
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  // Não mostra navegação na home e auth
  if (location.pathname === '/' || location.pathname === '/auth') {
    return null;
  }

  return (
    <div className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 sticky top-16 z-40">
      <div className="container-app">
        <div className="flex items-center justify-between h-14">
          {/* Left: Back Button */}
          <div className="flex items-center space-x-3">
            {showBackButton && (
              <button
                onClick={handleBack}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-all"
                title="Voltar"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="hidden sm:inline">Voltar</span>
              </button>
            )}

            {/* Page Title */}
            {title && (
              <div className="flex items-center space-x-2">
                <div className="w-1 h-6 bg-gradient-to-b from-rose-500 to-primary-500 rounded-full"></div>
                <h1 className="text-lg font-semibold text-neutral-900 dark:text-white">{title}</h1>
              </div>
            )}
          </div>

          {/* Center: Custom Actions */}
          <div className="flex-1 flex justify-center">
            {customActions}
          </div>

          {/* Right: Dashboard Button */}
          <div className="flex items-center">
            {showDashboardButton && location.pathname !== '/dashboard' && (
              <button
                onClick={handleDashboard}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-rose-500 to-primary-500 hover:from-rose-600 hover:to-primary-600 rounded-lg transition-all transform hover:scale-105 shadow-soft"
                title="Dashboard"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span className="hidden sm:inline">Dashboard</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
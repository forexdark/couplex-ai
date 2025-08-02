import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

export default function Header() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-100">
      <div className="container-app">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={user ? '/dashboard' : '/'} className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-primary-500 rounded-xl flex items-center justify-center shadow-soft">
              <span className="text-white text-xl font-semibold">💕</span>
            </div>
            <div>
              <h1 className="text-xl font-bold font-display bg-gradient-to-r from-rose-600 to-primary-600 bg-clip-text text-transparent">
                CoupleX
              </h1>
              <p className="text-xs text-neutral-500 -mt-1">{t('header.subtitle')}</p>
            </div>
          </Link>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {!user && (
              <>
                <a href="#funcionalidades" className="px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors">
                  {t('header.features')}
                </a>
                <a href="#precos" className="px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors">
                  {t('header.pricing')}
                </a>
                <a href="#como-funciona" className="px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors">
                  {t('header.howItWorks')}
                </a>
              </>
            )}
          </nav>

          {/* Right Side Menu */}
          <div className="flex items-center space-x-3">
            {/* Language Selector */}
            <LanguageSelector />
            
            {user ? (
              <>
                {/* Dashboard Button */}
                <Link 
                  to="/dashboard" 
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v14l-5-3-5 3V5z" />
                  </svg>
                  <span>Dashboard</span>
                </Link>
                
                {/* Settings Button */}
                <Link 
                  to="/configuracoes" 
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{t('header.settings')}</span>
                </Link>
                
                {/* User Info */}
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-neutral-700">{t('header.hello')}, {user.displayName || 'Usuário'}</p>
                  <p className="text-xs text-neutral-500">{t('header.connected')}</p>
                </div>
                
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  title={t('header.logout')}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/auth"
                  className="btn-secondary text-sm"
                >
                  {t('header.login')}
                </Link>
                <Link
                  to="/auth?mode=signup"
                  className="btn-primary text-sm"
                >
                  {t('header.signup')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
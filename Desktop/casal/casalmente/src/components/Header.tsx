import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Header() {
  const { user, logout } = useAuth();
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
                CoupleX AI
              </h1>
              <p className="text-xs text-neutral-500 -mt-1">Mentora dos Relacionamentos</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {user ? (
              <Link 
                to="/configuracoes" 
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <span>⚙️</span>
                <span>Configurações</span>
              </Link>
            ) : (
              <>
                <a href="#funcionalidades" className="px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors">
                  Funcionalidades
                </a>
                <a href="#precos" className="px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors">
                  Preços
                </a>
                <a href="#como-funciona" className="px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors">
                  Como Funciona
                </a>
              </>
            )}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-neutral-700">Olá, {user.displayName || 'Usuário'}</p>
                  <p className="text-xs text-neutral-500">Conectado</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  title="Sair"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/auth"
                  className="btn-secondary text-sm"
                >
                  Entrar
                </Link>
                <Link
                  to="/auth?mode=signup"
                  className="btn-primary text-sm"
                >
                  Começar Grátis
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
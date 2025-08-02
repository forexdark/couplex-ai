import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Layout from '../components/Layout';

export default function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, login, register, loginWithGoogle } = useAuth();
  
  const [isLogin, setIsLogin] = useState(searchParams.get('mode') !== 'signup');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        if (!formData.name.trim()) {
          throw new Error('Nome é obrigatório');
        }
        await register(formData.email, formData.password, formData.name);
      }
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Erro na autenticação:', error);
      
      // Firebase error messages in Portuguese
      const errorMessages: { [key: string]: string } = {
        'auth/user-not-found': 'Usuário não encontrado',
        'auth/wrong-password': 'Senha incorreta',
        'auth/email-already-in-use': 'Este email já está sendo usado',
        'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres',
        'auth/invalid-email': 'Email inválido',
        'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde',
        'auth/network-request-failed': 'Erro de conexão. Verifique sua internet'
      };
      
      setError(errorMessages[error.code] || error.message || 'Erro ao processar solicitação');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError('');
    
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Erro no login com Google:', error);
      setError('Erro ao fazer login com Google. Tente novamente.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <Link to="/" className="inline-flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-primary-500 rounded-xl flex items-center justify-center shadow-soft">
                <span className="text-white text-xl">💕</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold font-display bg-gradient-to-r from-rose-600 to-primary-600 bg-clip-text text-transparent">
                  CoupleX
                </h1>
                <p className="text-xs text-neutral-500">Terapeuta Digital</p>
              </div>
            </Link>
            
            <h2 className="text-3xl font-bold font-display text-neutral-900 mb-2">
              {isLogin ? 'Bem-vindo de volta!' : 'Vamos salvar seu relacionamento'}
            </h2>
            <p className="text-neutral-600">
              {isLogin 
                ? 'Entre na sua conta para continuar' 
                : 'Crie sua conta gratuita e comece hoje mesmo'
              }
            </p>
          </div>

          {/* Form Card */}
          <div className="card">
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 mb-2">
                    Seu nome
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required={!isLogin}
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="Como você gostaria de ser chamado?"
                  />
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-neutral-700 mb-2">
                  Senha
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="••••••••"
                />
                {!isLogin && (
                  <p className="text-xs text-neutral-500 mt-1">Mínimo de 6 caracteres</p>
                )}
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-center">
                    <span className="text-red-500 mr-2">⚠️</span>
                    <p className="text-red-700 text-sm font-medium">{error}</p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full text-base py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    {isLogin ? 'Entrando...' : 'Criando conta...'}
                  </div>
                ) : (
                  <>
                    <span className="mr-2">{isLogin ? '🚀' : '💕'}</span>
                    {isLogin ? 'Entrar' : 'Criar minha conta grátis'}
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-neutral-500 font-medium">ou</span>
              </div>
            </div>

            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="w-full bg-white border-2 border-neutral-200 hover:border-neutral-300 text-neutral-700 font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-soft hover:shadow-glow flex items-center justify-center"
            >
              {googleLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-neutral-400 border-t-transparent mr-2"></div>
                  Conectando com Google...
                </div>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continuar com Google
                </>
              )}
            </button>

            {/* Toggle Mode */}
            <div className="mt-8 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-rose-600 hover:text-rose-700 font-semibold transition-colors duration-200"
              >
                {isLogin 
                  ? 'Não tem conta? Cadastre-se gratuitamente'
                  : 'Já tem conta? Fazer login'
                }
              </button>
            </div>

            {/* Motivation Message for Signup */}
            {!isLogin && (
              <div className="mt-6 p-4 bg-gradient-to-r from-rose-50 to-primary-50 rounded-xl border border-rose-200">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">💝</span>
                  <div>
                    <p className="text-sm font-semibold text-rose-800 mb-1">
                      Transforme seu relacionamento hoje!
                    </p>
                    <p className="text-xs text-rose-700">
                      Junte-se a milhares de casais que já salvaram seus relacionamentos com nossa IA especializada.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="text-center text-neutral-500 text-sm">
            <p>Ao continuar, você concorda com nossos</p>
            <p>
              <a href="#" className="text-rose-600 hover:underline">Termos de Uso</a>
              {' '} e {' '}
              <a href="#" className="text-rose-600 hover:underline">Política de Privacidade</a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
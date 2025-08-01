import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';

// Pages
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import LanguagesOfLove from './pages/LanguagesOfLove';
import EmotionalDiary from './pages/EmotionalDiary';
import CoupleCalendar from './pages/CoupleCalendar';
import AIChat from './pages/AIChat';

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 via-white to-rose-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-primary-500 rounded-2xl flex items-center justify-center shadow-soft mb-4 mx-auto animate-pulse">
            <span className="text-white text-2xl">💕</span>
          </div>
          <p className="text-neutral-600 font-medium">Carregando CoupleX AI...</p>
        </div>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/auth" replace />;
}

// Public Route Component (redirects if logged in)
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 via-white to-rose-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-primary-500 rounded-2xl flex items-center justify-center shadow-soft mb-4 mx-auto animate-pulse">
            <span className="text-white text-2xl">💕</span>
          </div>
          <p className="text-neutral-600 font-medium">Carregando CoupleX AI...</p>
        </div>
      </div>
    );
  }

  return user ? <Navigate to="/dashboard" replace /> : <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/linguagens-do-amor" element={<LanguagesOfLove />} />
          <Route path="/auth" element={
            <PublicRoute>
              <Auth />
            </PublicRoute>
          } />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/chat" element={
            <ProtectedRoute>
              <AIChat />
            </ProtectedRoute>
          } />
          <Route path="/diario-emocional" element={
            <ProtectedRoute>
              <EmotionalDiary />
            </ProtectedRoute>
          } />
          <Route path="/calendario-casal" element={
            <ProtectedRoute>
              <CoupleCalendar />
            </ProtectedRoute>
          } />
          
          {/* Redirect any unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
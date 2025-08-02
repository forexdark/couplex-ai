import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { ThemeProvider } from './contexts/ThemeContext';
import { CoupleProvider } from './contexts/CoupleContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { GamificationProvider } from './contexts/GamificationContext';
import { EmotionalDiaryProvider } from './contexts/EmotionalDiaryContext';
import { SmartRemindersProvider } from './contexts/SmartRemindersContext';
import { PersonalizedContentProvider } from './contexts/PersonalizedContentContext';

// Pages
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import LanguagesOfLove from './pages/LanguagesOfLove';
import EmotionalDiary from './pages/EmotionalDiary';
import CoupleCalendar from './pages/CoupleCalendar';
import AIChat from './pages/AIChat';
import PersonalizedSurprises from './pages/PersonalizedSurprises';
import RelationshipGoals from './pages/RelationshipGoals';
import CrisisMode from './pages/CrisisMode';
import Settings from './pages/Settings';
import ConquestGuide from './pages/ConquestGuide';
import ReconquestGuide from './pages/ReconquestGuide';
import ActionPlans from './pages/ActionPlans';
import CoupleProfileSetup from './pages/CoupleProfileSetup';

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
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <GamificationProvider>
            <CoupleProvider>
              <NotificationProvider>
                <EmotionalDiaryProvider>
                  <SmartRemindersProvider>
                    <PersonalizedContentProvider>
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
          <Route path="/surpresas-personalizadas" element={
            <ProtectedRoute>
              <PersonalizedSurprises />
            </ProtectedRoute>
          } />
          <Route path="/metas-relacionamento" element={
            <ProtectedRoute>
              <RelationshipGoals />
            </ProtectedRoute>
          } />
          <Route path="/modo-crise" element={
            <ProtectedRoute>
              <CrisisMode />
            </ProtectedRoute>
          } />
          <Route path="/configuracoes" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
          <Route path="/guia-conquista" element={
            <ProtectedRoute>
              <ConquestGuide />
            </ProtectedRoute>
          } />
          <Route path="/guia-reconquista" element={
            <ProtectedRoute>
              <ReconquestGuide />
            </ProtectedRoute>
          } />
          <Route path="/planos-acao" element={
            <ProtectedRoute>
              <ActionPlans />
            </ProtectedRoute>
          } />
          <Route path="/perfil-casal" element={
            <ProtectedRoute>
              <CoupleProfileSetup />
            </ProtectedRoute>
          } />
          
          {/* Redirect any unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
                    </PersonalizedContentProvider>
                  </SmartRemindersProvider>
                </EmotionalDiaryProvider>
              </NotificationProvider>
            </CoupleProvider>
          </GamificationProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
    );
}

export default App;
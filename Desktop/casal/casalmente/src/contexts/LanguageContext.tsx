import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'pt' | 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Traduções completas para PT/EN/ES
const translations = {
  pt: {
    // Header
    'header.title': 'CoupleX AI',
    'header.subtitle': 'Mentora dos Relacionamentos',
    'header.features': 'Funcionalidades',
    'header.pricing': 'Preços',
    'header.howItWorks': 'Como Funciona',
    'header.settings': 'Configurações',
    'header.login': 'Entrar',
    'header.signup': 'Começar Grátis',
    'header.logout': 'Sair',
    'header.hello': 'Olá',
    'header.connected': 'Conectado',
    
    // Dashboard
    'dashboard.welcome': 'Bem-vindo de volta',
    'dashboard.goodMorning': 'Bom dia',
    'dashboard.goodAfternoon': 'Boa tarde',
    'dashboard.goodEvening': 'Boa noite',
    'dashboard.reconnectionJourney': 'Jornada de reconexão',
    'dashboard.dailyCheckIn': 'Check-in Diário',
    'dashboard.dailyTip': 'Dica do Dia',
    'dashboard.todayInfo': 'Informações de hoje',
    'dashboard.quickAccess': 'Acesso Rápido',
    
    // Quick Access Menu
    'menu.diary': 'Diário',
    'menu.calendar': 'Calendário',
    'menu.aiChat': 'Chat IA',
    'menu.goals': 'Metas',
    'menu.surprises': 'Surpresas',
    'menu.crisis': 'Crise',
    'menu.settings': 'Configurações',
    'menu.guides': 'Guias',
    
    // Settings
    'settings.title': 'Configurações',
    'settings.profile': 'Perfil',
    'settings.partner': 'Parceiro(a)',
    'settings.privacy': 'Privacidade',
    'settings.language': 'Idioma',
    'settings.theme': 'Tema',
    'settings.notifications': 'Notificações',
    'settings.invitePartner': 'Convidar Parceiro(a)',
    'settings.coupleType': 'Tipo de Relacionamento',
    'settings.relationshipGoals': 'Objetivos do Relacionamento',
    
    // Gamification
    'gamification.level': 'Nível',
    'gamification.points': 'Pontos',
    'gamification.achievements': 'Conquistas',
    'gamification.streak': 'Sequência',
    'gamification.nextLevel': 'Próximo Nível',
    'gamification.dailyChallenge': 'Desafio Diário',
    'gamification.weeklyGoal': 'Meta Semanal',
    
    // Couple Types
    'coupleType.heterosexual': 'Casal Heterossexual',
    'coupleType.homosexual': 'Casal Homossexual',
    'coupleType.longDistance': 'Relacionamento à Distância',
    'coupleType.newParents': 'Recém-Pais',
    'coupleType.secondMarriage': 'Segunda União',
    'coupleType.dating': 'Namorando',
    'coupleType.engaged': 'Noivos',
    'coupleType.married': 'Casados',
    
    // Guides
    'guides.conquestTitle': 'Como Conquistar um Novo Amor',
    'guides.reconquestTitle': 'Como Reconquistar um Amor Perdido',
    'guides.readMore': 'Ler Mais',
    'guides.start': 'Começar',
    
    // Common
    'common.save': 'Salvar',
    'common.cancel': 'Cancelar',
    'common.edit': 'Editar',
    'common.delete': 'Excluir',
    'common.confirm': 'Confirmar',
    'common.loading': 'Carregando...',
    'common.success': 'Sucesso!',
    'common.error': 'Erro',
    'common.warning': 'Aviso',
    'common.info': 'Informação',
  },
  
  en: {
    // Header
    'header.title': 'CoupleX AI',
    'header.subtitle': 'Relationship Mentor',
    'header.features': 'Features',
    'header.pricing': 'Pricing',
    'header.howItWorks': 'How It Works',
    'header.settings': 'Settings',
    'header.login': 'Login',
    'header.signup': 'Start Free',
    'header.logout': 'Logout',
    'header.hello': 'Hello',
    'header.connected': 'Connected',
    
    // Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.goodMorning': 'Good morning',
    'dashboard.goodAfternoon': 'Good afternoon',
    'dashboard.goodEvening': 'Good evening',
    'dashboard.reconnectionJourney': 'Reconnection Journey',
    'dashboard.dailyCheckIn': 'Daily Check-in',
    'dashboard.dailyTip': 'Daily Tip',
    'dashboard.todayInfo': "Today's Information",
    'dashboard.quickAccess': 'Quick Access',
    
    // Quick Access Menu
    'menu.diary': 'Diary',
    'menu.calendar': 'Calendar',
    'menu.aiChat': 'AI Chat',
    'menu.goals': 'Goals',
    'menu.surprises': 'Surprises',
    'menu.crisis': 'Crisis',
    'menu.settings': 'Settings',
    'menu.guides': 'Guides',
    
    // Settings
    'settings.title': 'Settings',
    'settings.profile': 'Profile',
    'settings.partner': 'Partner',
    'settings.privacy': 'Privacy',
    'settings.language': 'Language',
    'settings.theme': 'Theme',
    'settings.notifications': 'Notifications',
    'settings.invitePartner': 'Invite Partner',
    'settings.coupleType': 'Relationship Type',
    'settings.relationshipGoals': 'Relationship Goals',
    
    // Gamification
    'gamification.level': 'Level',
    'gamification.points': 'Points',
    'gamification.achievements': 'Achievements',
    'gamification.streak': 'Streak',
    'gamification.nextLevel': 'Next Level',
    'gamification.dailyChallenge': 'Daily Challenge',
    'gamification.weeklyGoal': 'Weekly Goal',
    
    // Couple Types
    'coupleType.heterosexual': 'Heterosexual Couple',
    'coupleType.homosexual': 'Homosexual Couple',
    'coupleType.longDistance': 'Long Distance Relationship',
    'coupleType.newParents': 'New Parents',
    'coupleType.secondMarriage': 'Second Marriage',
    'coupleType.dating': 'Dating',
    'coupleType.engaged': 'Engaged',
    'coupleType.married': 'Married',
    
    // Guides
    'guides.conquestTitle': 'How to Win a New Love',
    'guides.reconquestTitle': 'How to Win Back a Lost Love',
    'guides.readMore': 'Read More',
    'guides.start': 'Start',
    
    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.confirm': 'Confirm',
    'common.loading': 'Loading...',
    'common.success': 'Success!',
    'common.error': 'Error',
    'common.warning': 'Warning',
    'common.info': 'Information',
  },
  
  es: {
    // Header
    'header.title': 'CoupleX AI',
    'header.subtitle': 'Mentora de Relaciones',
    'header.features': 'Características',
    'header.pricing': 'Precios',
    'header.howItWorks': 'Cómo Funciona',
    'header.settings': 'Configuración',
    'header.login': 'Iniciar Sesión',
    'header.signup': 'Comenzar Gratis',
    'header.logout': 'Cerrar Sesión',
    'header.hello': 'Hola',
    'header.connected': 'Conectado',
    
    // Dashboard
    'dashboard.welcome': 'Bienvenido de vuelta',
    'dashboard.goodMorning': 'Buenos días',
    'dashboard.goodAfternoon': 'Buenas tardes',
    'dashboard.goodEvening': 'Buenas noches',
    'dashboard.reconnectionJourney': 'Jornada de reconexión',
    'dashboard.dailyCheckIn': 'Check-in Diario',
    'dashboard.dailyTip': 'Consejo del Día',
    'dashboard.todayInfo': 'Información de hoy',
    'dashboard.quickAccess': 'Acceso Rápido',
    
    // Quick Access Menu
    'menu.diary': 'Diario',
    'menu.calendar': 'Calendario',
    'menu.aiChat': 'Chat IA',
    'menu.goals': 'Metas',
    'menu.surprises': 'Sorpresas',
    'menu.crisis': 'Crisis',
    'menu.settings': 'Configuración',
    'menu.guides': 'Guías',
    
    // Settings
    'settings.title': 'Configuración',
    'settings.profile': 'Perfil',
    'settings.partner': 'Pareja',
    'settings.privacy': 'Privacidad',
    'settings.language': 'Idioma',
    'settings.theme': 'Tema',
    'settings.notifications': 'Notificaciones',
    'settings.invitePartner': 'Invitar Pareja',
    'settings.coupleType': 'Tipo de Relación',
    'settings.relationshipGoals': 'Objetivos de la Relación',
    
    // Gamification
    'gamification.level': 'Nivel',
    'gamification.points': 'Puntos',
    'gamification.achievements': 'Logros',
    'gamification.streak': 'Racha',
    'gamification.nextLevel': 'Próximo Nivel',
    'gamification.dailyChallenge': 'Desafío Diario',
    'gamification.weeklyGoal': 'Meta Semanal',
    
    // Couple Types
    'coupleType.heterosexual': 'Pareja Heterosexual',
    'coupleType.homosexual': 'Pareja Homosexual',
    'coupleType.longDistance': 'Relación a Distancia',
    'coupleType.newParents': 'Nuevos Padres',
    'coupleType.secondMarriage': 'Segunda Unión',
    'coupleType.dating': 'Novios',
    'coupleType.engaged': 'Comprometidos',
    'coupleType.married': 'Casados',
    
    // Guides
    'guides.conquestTitle': 'Cómo Conquistar un Nuevo Amor',
    'guides.reconquestTitle': 'Cómo Reconquistar un Amor Perdido',
    'guides.readMore': 'Leer Más',
    'guides.start': 'Comenzar',
    
    // Common
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
    'common.edit': 'Editar',
    'common.delete': 'Eliminar',
    'common.confirm': 'Confirmar',
    'common.loading': 'Cargando...',
    'common.success': '¡Éxito!',
    'common.error': 'Error',
    'common.warning': 'Advertencia',
    'common.info': 'Información',
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    const browserLanguage = navigator.language.split('-')[0];
    
    if (savedLanguage && ['pt', 'en', 'es'].includes(savedLanguage)) {
      return savedLanguage as Language;
    }
    
    if (['pt', 'en', 'es'].includes(browserLanguage)) {
      return browserLanguage as Language;
    }
    
    return 'pt'; // Default to Portuguese
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
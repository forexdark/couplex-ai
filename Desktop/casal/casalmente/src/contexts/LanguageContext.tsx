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
    'header.title': 'CoupleX',
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
    'dashboard.todayInfo': 'Resumo do Dia',
    'dashboard.quickAccess': 'Acesso Rápido',
    'dashboard.specialFeatures': 'Funcionalidades Especiais',
    'dashboard.todayDate': 'Data de hoje',
    'dashboard.todayAgenda': 'Agenda de hoje',
    'dashboard.specialDates': 'Datas especiais',
    'dashboard.moodToday': 'Como você está se sentindo hoje?',
    'dashboard.changeMood': 'Alterar',
    'dashboard.moodTips': 'Dicas para seu humor',
    'dashboard.startCheckIn': 'Começar Check-in Diário',
    'dashboard.openDiary': 'Abrir Diário',
    'dashboard.chatMentor': 'Chat com a Mentora',
    'dashboard.dailyTipTitle': 'Dica do Dia',
    'dashboard.tryThis': 'Vou tentar isso!',
    'dashboard.generateNewTip': 'Gerar nova dica',
    'dashboard.makeCheckIn': 'Fazer Check-in',
    'dashboard.completeProfile': 'Complete seu Perfil do Casal',
    'dashboard.profileProgress': 'Seu perfil está {progress}% completo. Complete para receber conteúdo personalizado!',
    'dashboard.completeProfileBtn': 'Completar Perfil',
    'dashboard.relationshipToday': 'Como está seu relacionamento hoje? Vamos trabalhar juntos para fortalecê-lo.',
    'dashboard.shareFeeling': 'Compartilhe como você está se sentindo.',
    
    // Dashboard - Mood tips and daily tips
    'dashboard.useCalendar': 'Use o Calendário do Casal para agendar compromissos',
    'dashboard.planSomething': 'Que tal planejar algo especial?',
    'dashboard.configureEvents': 'Configure eventos importantes no seu calendário para não esquecer nunca mais!',
    
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
    
    // Home Page
    'home.heroTagline': 'Sua Mentora dos Relacionamentos',
    'home.heroTitle1': 'A conexão',
    'home.heroTitle2': 'esfriou',
    'home.heroTitle3': 'CoupleX',
    'home.heroTitle4': 'te ajuda a reacender',
    'home.heroSubtitle': 'Reacenda a paixão, reconecte corações e fortaleça seu relacionamento com nossa companheira especializada em salvar famílias.',
    'home.ctaPrimary': 'Começar Agora - Grátis',
    'home.ctaSecondary': 'Conhecer sua Mentora',
    'home.trustBadge1': '4.9/5 de satisfação',
    'home.trustBadge2': '+15.000 casais salvos',
    'home.trustBadge3': '100% privado e seguro',
    'home.problemsTitle': 'Reconhece esses sinais no seu relacionamento?',
    'home.problemsSubtitle': 'Se você se identifica com 2 ou mais situações abaixo, seu relacionamento precisa de atenção urgente.',
    'home.reviewsTitle': '+15.000 casais já salvaram seus relacionamentos',
    'home.reviewsSubtitle': 'Veja como a CoupleX transformou a vida de casais reais que estavam prestes a terminar',
    'home.statsLabel1': 'Casais Salvos',
    'home.statsLabel2': 'Avaliação Média',
    'home.statsLabel3': 'Taxa de Sucesso',
    'home.statsLabel4': 'Primeiros Resultados',
    'home.languagesTitle': 'Descubra sua Linguagem do Amor',
    'home.languagesSubtitle': 'Baseado no best-seller de Gary Chapman, nosso quiz revela como você expressa e recebe amor. Conhecer sua linguagem e a do seu parceiro pode transformar completamente o relacionamento!',
    'home.pricingTitle': 'Escolha o plano ideal para salvar seu relacionamento',
    'home.pricingSubtitle': 'Comece grátis e evolua conforme sua jornada de reconexão avança. Todos os planos incluem nossa mentora disponível 24/7.',
    'home.finalCtaTitle': 'Não deixe seu relacionamento chegar ao fim',
    'home.finalCtaSubtitle': 'A cada dia que passa sem agir, vocês se distanciam mais. Comece hoje mesmo e veja a diferença em 7 dias.',
    'home.finalCtaButton': 'Salvar meu relacionamento agora',
    
    // Home Page - Problems Section
    'home.problemsFight': 'Brigam por qualquer coisa',
    'home.problemsFightDesc': 'Pequenos problemas viram grandes discussões que machucam vocês dois.',
    'home.problemsCommunication': 'Falta comunicação',
    'home.problemsCommunicationDesc': 'Vocês não conseguem mais conversar sem que vire conflito ou frieza.',
    'home.problemsPhone': 'Mais tempo no celular',
    'home.problemsPhoneDesc': 'Preferem o telefone à companhia um do outro, perdendo a intimidade.',
    'home.problemsAffection': 'Carinho diminuiu',
    'home.problemsAffectionDesc': 'Beijos, abraços e momentos especiais estão cada vez mais raros.',
    'home.problemsIntimacy': 'Intimidade em baixa',
    'home.problemsIntimacyDesc': 'A conexão física e emocional não é mais como antes.',
    'home.problemsGivingUp': 'Pensando em desistir',
    'home.problemsGivingUpDesc': 'Às vezes vocês se perguntam se vale a pena continuar tentando.',
    'home.problemsUrgent': 'Se você se identificou com 2 ou mais situações',
    'home.problemsUrgentAction': '⚡ Começar a mudança agora',
    
    // Home Page - How it Works Section
    'home.howItWorksTitle': 'Como vamos reacender a chama do seu amor',
    'home.howItWorksSubtitle': 'Sua mentora especializada em reconexão está aqui para guiar vocês 24/7, com orientação personalizada para resgatar a paixão e fortalecer laços.',
    'home.companion': 'Sua Companheira de Jornada',
    'home.companionDesc': 'Entendo as emoções do casal e identifico onde está a desconexão para guiar vocês de volta ao amor.',
    'home.guidance': 'Orientação Sob Medida',
    'home.guidanceDesc': 'Cada relacionamento é único. Crio estratégias personalizadas baseadas na história de vocês dois.',
    'home.alwaysThere': 'Sempre ao Seu Lado',
    'home.alwaysThereDesc': 'Nos momentos mais difíceis, estou aqui. 24 horas por dia, 7 dias por semana, sem julgamentos.',
    'home.crisis': 'Mediação nas Crises',
    'home.crisisDesc': 'Quando tudo parece perdido, ajudo vocês a encontrarem o caminho de volta um para o outro.',
    
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
    'header.title': 'CoupleX',
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
    'dashboard.todayInfo': "Today's Summary",
    'dashboard.quickAccess': 'Quick Access',
    'dashboard.specialFeatures': 'Special Features',
    'dashboard.todayDate': "Today's date",
    'dashboard.todayAgenda': "Today's agenda",
    'dashboard.specialDates': 'Special dates',
    'dashboard.moodToday': 'How are you feeling today?',
    'dashboard.changeMood': 'Change',
    'dashboard.moodTips': 'Tips for your mood',
    'dashboard.startCheckIn': 'Start Daily Check-in',
    'dashboard.openDiary': 'Open Diary',
    'dashboard.chatMentor': 'Chat with Mentor',
    'dashboard.dailyTipTitle': 'Daily Tip',
    'dashboard.tryThis': "I'll try this!",
    'dashboard.generateNewTip': 'Generate new tip',
    'dashboard.makeCheckIn': 'Make Check-in',
    'dashboard.completeProfile': 'Complete your Couple Profile',
    'dashboard.profileProgress': 'Your profile is {progress}% complete. Complete it to receive personalized content!',
    'dashboard.completeProfileBtn': 'Complete Profile',
    'dashboard.relationshipToday': 'How is your relationship today? Let\'s work together to strengthen it.',
    'dashboard.shareFeeling': 'Share how you are feeling.',
    
    // Dashboard - Mood tips and daily tips
    'dashboard.useCalendar': 'Use the Couple Calendar to schedule appointments',
    'dashboard.planSomething': 'How about planning something special?',
    'dashboard.configureEvents': 'Set up important events in your calendar so you never forget again!',
    
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
    
    // Home Page
    'home.heroTagline': 'Your Relationship Mentor',
    'home.heroTitle1': 'The connection',
    'home.heroTitle2': 'cooled down',
    'home.heroTitle3': 'CoupleX',
    'home.heroTitle4': 'helps you reignite it',
    'home.heroSubtitle': 'Reignite passion, reconnect hearts and strengthen your relationship with our companion specialized in saving families.',
    'home.ctaPrimary': 'Start Now - Free',
    'home.ctaSecondary': 'Meet your Mentor',
    'home.trustBadge1': '4.9/5 satisfaction',
    'home.trustBadge2': '+15,000 couples saved',
    'home.trustBadge3': '100% private and secure',
    'home.problemsTitle': 'Do you recognize these signs in your relationship?',
    'home.problemsSubtitle': 'If you identify with 2 or more situations below, your relationship needs urgent attention.',
    'home.reviewsTitle': '+15,000 couples have already saved their relationships',
    'home.reviewsSubtitle': 'See how CoupleX transformed the lives of real couples who were about to break up',
    'home.statsLabel1': 'Couples Saved',
    'home.statsLabel2': 'Average Rating',
    'home.statsLabel3': 'Success Rate',
    'home.statsLabel4': 'First Results',
    'home.languagesTitle': 'Discover your Love Language',
    'home.languagesSubtitle': 'Based on Gary Chapman\'s bestseller, our quiz reveals how you express and receive love. Knowing your language and your partner\'s can completely transform the relationship!',
    'home.pricingTitle': 'Choose the ideal plan to save your relationship',
    'home.pricingSubtitle': 'Start free and evolve as your reconnection journey advances. All plans include our mentor available 24/7.',
    'home.finalCtaTitle': 'Don\'t let your relationship come to an end',
    'home.finalCtaSubtitle': 'Every day that passes without action, you drift further apart. Start today and see the difference in 7 days.',
    'home.finalCtaButton': 'Save my relationship now',
    
    // Home Page - Problems Section
    'home.problemsFight': 'Fight over anything',
    'home.problemsFightDesc': 'Small problems become big arguments that hurt both of you.',
    'home.problemsCommunication': 'Lack of communication',
    'home.problemsCommunicationDesc': 'You can no longer talk without it becoming conflict or coldness.',
    'home.problemsPhone': 'More time on phone',
    'home.problemsPhoneDesc': 'You prefer the phone to each other\'s company, losing intimacy.',
    'home.problemsAffection': 'Affection decreased',
    'home.problemsAffectionDesc': 'Kisses, hugs and special moments are increasingly rare.',
    'home.problemsIntimacy': 'Low intimacy',
    'home.problemsIntimacyDesc': 'Physical and emotional connection is not like before.',
    'home.problemsGivingUp': 'Thinking of giving up',
    'home.problemsGivingUpDesc': 'Sometimes you wonder if it\'s worth continuing to try.',
    'home.problemsUrgent': 'If you identified with 2 or more situations',
    'home.problemsUrgentAction': '⚡ Start the change now',
    
    // Home Page - How it Works Section
    'home.howItWorksTitle': 'How we will reignite your love\'s flame',
    'home.howItWorksSubtitle': 'Your reconnection specialist mentor is here to guide you 24/7, with personalized guidance to rescue passion and strengthen bonds.',
    'home.companion': 'Your Journey Companion',
    'home.companionDesc': 'I understand couples\' emotions and identify where the disconnection is to guide you back to love.',
    'home.guidance': 'Tailored Guidance',
    'home.guidanceDesc': 'Every relationship is unique. I create personalized strategies based on your story together.',
    'home.alwaysThere': 'Always by Your Side',
    'home.alwaysThereDesc': 'In the most difficult moments, I\'m here. 24 hours a day, 7 days a week, without judgment.',
    'home.crisis': 'Crisis Mediation',
    'home.crisisDesc': 'When everything seems lost, I help you find your way back to each other.',
    
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
    'header.title': 'CoupleX',
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
    'dashboard.todayInfo': 'Resumen del Día',
    'dashboard.quickAccess': 'Acceso Rápido',
    'dashboard.specialFeatures': 'Características Especiales',
    'dashboard.todayDate': 'Fecha de hoy',
    'dashboard.todayAgenda': 'Agenda de hoy',
    'dashboard.specialDates': 'Fechas especiales',
    'dashboard.moodToday': '¿Cómo te sientes hoy?',
    'dashboard.changeMood': 'Cambiar',
    'dashboard.moodTips': 'Consejos para tu estado de ánimo',
    'dashboard.startCheckIn': 'Comenzar Check-in Diario',
    'dashboard.openDiary': 'Abrir Diario',
    'dashboard.chatMentor': 'Chat con Mentora',
    'dashboard.dailyTipTitle': 'Consejo del Día',
    'dashboard.tryThis': '¡Voy a intentar esto!',
    'dashboard.generateNewTip': 'Generar nuevo consejo',
    'dashboard.makeCheckIn': 'Hacer Check-in',
    'dashboard.completeProfile': 'Completa tu Perfil de Pareja',
    'dashboard.profileProgress': 'Tu perfil está {progress}% completo. ¡Complétalo para recibir contenido personalizado!',
    'dashboard.completeProfileBtn': 'Completar Perfil',
    'dashboard.relationshipToday': '¿Cómo está tu relación hoy? Trabajemos juntos para fortalecerla.',
    'dashboard.shareFeeling': 'Comparte cómo te sientes.',
    
    // Dashboard - Mood tips and daily tips
    'dashboard.useCalendar': 'Usa el Calendario de Pareja para programar citas',
    'dashboard.planSomething': '¿Qué tal planear algo especial?',
    'dashboard.configureEvents': '¡Configura eventos importantes en tu calendario para no olvidar nunca más!',
    
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
    
    // Home Page
    'home.heroTagline': 'Tu Mentora de Relaciones',
    'home.heroTitle1': 'La conexión',
    'home.heroTitle2': 'se enfrió',
    'home.heroTitle3': 'CoupleX',
    'home.heroTitle4': 'te ayuda a reavivarla',
    'home.heroSubtitle': 'Reavivar la pasión, reconectar corazones y fortalecer tu relación con nuestra compañera especializada en salvar familias.',
    'home.ctaPrimary': 'Comenzar Ahora - Gratis',
    'home.ctaSecondary': 'Conocer tu Mentora',
    'home.trustBadge1': '4.9/5 de satisfacción',
    'home.trustBadge2': '+15.000 parejas salvadas',
    'home.trustBadge3': '100% privado y seguro',
    'home.problemsTitle': '¿Reconoces estas señales en tu relación?',
    'home.problemsSubtitle': 'Si te identificas con 2 o más situaciones a continuación, tu relación necesita atención urgente.',
    'home.reviewsTitle': '+15.000 parejas ya han salvado sus relaciones',
    'home.reviewsSubtitle': 'Ve cómo CoupleX transformó las vidas de parejas reales que estaban a punto de terminar',
    'home.statsLabel1': 'Parejas Salvadas',
    'home.statsLabel2': 'Calificación Promedio',
    'home.statsLabel3': 'Tasa de Éxito',
    'home.statsLabel4': 'Primeros Resultados',
    'home.languagesTitle': 'Descubre tu Lenguaje del Amor',
    'home.languagesSubtitle': 'Basado en el best-seller de Gary Chapman, nuestro quiz revela cómo expresas y recibes amor. ¡Conocer tu lenguaje y el de tu pareja puede transformar completamente la relación!',
    'home.pricingTitle': 'Elige el plan ideal para salvar tu relación',
    'home.pricingSubtitle': 'Comienza gratis y evoluciona conforme avanza tu viaje de reconexión. Todos los planes incluyen nuestra mentora disponible 24/7.',
    'home.finalCtaTitle': 'No dejes que tu relación llegue a su fin',
    'home.finalCtaSubtitle': 'Cada día que pasa sin actuar, se alejan más. Comienza hoy mismo y ve la diferencia en 7 días.',
    'home.finalCtaButton': 'Salvar mi relación ahora',
    
    // Home Page - Problems Section
    'home.problemsFight': 'Pelean por cualquier cosa',
    'home.problemsFightDesc': 'Pequeños problemas se convierten en grandes discusiones que los lastiman a ambos.',
    'home.problemsCommunication': 'Falta comunicación',
    'home.problemsCommunicationDesc': 'Ya no pueden hablar sin que se convierta en conflicto o frialdad.',
    'home.problemsPhone': 'Más tiempo en el teléfono',
    'home.problemsPhoneDesc': 'Prefieren el teléfono a la compañía del otro, perdiendo la intimidad.',
    'home.problemsAffection': 'El cariño disminuyó',
    'home.problemsAffectionDesc': 'Besos, abrazos y momentos especiales son cada vez más raros.',
    'home.problemsIntimacy': 'Intimidad baja',
    'home.problemsIntimacyDesc': 'La conexión física y emocional ya no es como antes.',
    'home.problemsGivingUp': 'Pensando en rendirse',
    'home.problemsGivingUpDesc': 'A veces se preguntan si vale la pena seguir intentando.',
    'home.problemsUrgent': 'Si te identificaste con 2 o más situaciones',
    'home.problemsUrgentAction': '⚡ Comenzar el cambio ahora',
    
    // Home Page - How it Works Section
    'home.howItWorksTitle': 'Cómo vamos a reavivar la llama de su amor',
    'home.howItWorksSubtitle': 'Tu mentora especialista en reconexión está aquí para guiarlos 24/7, con orientación personalizada para rescatar la pasión y fortalecer vínculos.',
    'home.companion': 'Tu Compañera de Viaje',
    'home.companionDesc': 'Entiendo las emociones de las parejas e identifico dónde está la desconexión para guiarlos de vuelta al amor.',
    'home.guidance': 'Orientación a Medida',
    'home.guidanceDesc': 'Cada relación es única. Creo estrategias personalizadas basadas en su historia juntos.',
    'home.alwaysThere': 'Siempre a Tu Lado',
    'home.alwaysThereDesc': 'En los momentos más difíciles, estoy aquí. 24 horas al día, 7 días a la semana, sin juicios.',
    'home.crisis': 'Mediación en Crisis',
    'home.crisisDesc': 'Cuando todo parece perdido, los ayudo a encontrar el camino de vuelta el uno al otro.',
    
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
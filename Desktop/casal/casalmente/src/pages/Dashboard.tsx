import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../contexts/LanguageContext';
import { useGamification } from '../contexts/GamificationContext';
import { usePersonalizedContent } from '../contexts/PersonalizedContentContext';
import SmartRemindersWidget from '../components/SmartRemindersWidget';

export default function Dashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { userProgress, getDailyChallenge, updateStreak } = useGamification();
  const { coupleProfile, getProfileCompleteness } = usePersonalizedContent();
  const [currentMood, setCurrentMood] = useState('');
  const [currentMoodObj, setCurrentMoodObj] = useState<any>(null);
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [dailyTip, setDailyTip] = useState(true);

  useEffect(() => {
    // Atualizar streak quando o usuário acessa o dashboard
    updateStreak();
  }, []);

  const dailyChallenge = getDailyChallenge();
  const profileCompleteness = getProfileCompleteness();

  const moods = [
    { 
      emoji: '😍', 
      label: 'Apaixonado(a)', 
      color: 'from-pink-400 to-rose-500',
      tips: [
        "Aproveite esse momento! Expresse seus sentimentos ao seu parceiro.",
        "Criem memórias especiais - tirem fotos, escrevam bilhetes carinhosos.",
        "Que tal uma surpresa romântica? Mesmo pequena, fará diferença!"
      ]
    },
    { 
      emoji: '😊', 
      label: 'Feliz', 
      color: 'from-yellow-400 to-orange-500',
      tips: [
        "Compartilhe essa alegria! Conte ao seu parceiro o que te deixou feliz.",
        "Que tal dançarem juntos ou ouvirem uma música especial?",
        "Sua energia positiva é contagiante - use-a para fortalecer a conexão!"
      ]
    },
    { 
      emoji: '😌', 
      label: 'Tranquilo(a)', 
      color: 'from-green-400 to-teal-500',
      tips: [
        "Aproveite essa paz para conversas profundas e significativas.",
        "Que tal um momento de qualidade juntos? Sem pressa, só vocês dois.",
        "Use essa tranquilidade para se desconectar do digital e se reconectar."
      ]
    },
    { 
      emoji: '😐', 
      label: 'Neutro', 
      color: 'from-gray-400 to-neutral-500',
      tips: [
        "Que tal fazer algo diferente hoje? Quebrem a rotina juntos!",
        "Uma conversa interessante pode mudar completamente seu dia.",
        "Definam um pequeno objetivo juntos - isso pode trazer energia nova!"
      ]
    },
    { 
      emoji: '😔', 
      label: 'Triste', 
      color: 'from-blue-400 to-indigo-500',
      tips: [
        "Não precisa carregar tudo sozinho(a). Converse com seu parceiro.",
        "Aceite esse sentimento. Sua vulnerabilidade pode aproximar vocês.",
        "Que tal um momento acolhedor? Um chá, uma conversa, um abraço."
      ]
    },
    { 
      emoji: '😤', 
      label: 'Irritado(a)', 
      color: 'from-red-400 to-red-600',
      tips: [
        "Respire fundo antes de falar. Conte até 10, depois expresse-se.",
        "Que tal uma caminhada para esfriar a cabeça antes de conversar?",
        "Pergunte-se: 'O que realmente está me incomodando?' Vá à raiz."
      ]
    },
  ];

  const dailyTips = [
    "Envie uma mensagem carinhosa para seu parceiro agora mesmo!",
    "Que tal planejar um encontro especial para vocês dois?",
    "Conversem sobre algo que vocês gostam de fazer juntos.",
    "Um abraço sincero pode resolver muitos conflitos.",
    "Que tal desligar os celulares e se conectarem de verdade?",
    "Façam uma atividade nova juntos hoje.",
    "Relembrem um momento especial que viveram juntos.",
    "Expressem gratidão um ao outro por algo específico.",
    "Criem um objetivo pequeno para alcançar juntos esta semana."
  ];

  const handleMoodSelect = (mood: any) => {
    setCurrentMood(mood.label);
    setCurrentMoodObj(mood);
    setShowMoodSelector(false);
  };

  const handleChangeMood = () => {
    setCurrentMood('');
    setCurrentMoodObj(null);
    setShowMoodSelector(true);
  };

  return (
    <Layout showHeader>
      <div className="container-app py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-display text-neutral-900 mb-2">
            {t('dashboard.welcome')}, {user?.displayName?.split(' ')[0] || 'querido(a)'}!
          </h1>
          <p className="text-neutral-600">
            Como está seu relacionamento hoje? Vamos trabalhar juntos para fortalecê-lo.
          </p>
        </div>

        {/* Today's Summary - Moved to top */}
        <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center flex-shrink-0">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2-2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">{t('dashboard.todayInfo')}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white/70 rounded-lg p-4">
                  <p className="text-neutral-700 font-semibold mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v16a2 2 0 002 2z" />
                    </svg>
                    {t('dashboard.todayDate')}:
                  </p>
                  <p className="text-neutral-600 text-sm">
                    {new Date().toLocaleDateString('pt-BR', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
                <div className="bg-white/70 rounded-lg p-4">
                  <p className="text-green-700 font-semibold mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    {t('dashboard.todayAgenda')}:
                  </p>
                  <p className="text-neutral-600 text-sm">• Use o Calendário do Casal para agendar compromissos</p>
                  <p className="text-neutral-600 text-sm">• Que tal planejar algo especial?</p>
                </div>
                <div className="bg-white/70 rounded-lg p-4">
                  <p className="text-purple-700 font-semibold mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {t('dashboard.specialDates')}:
                  </p>
                  <p className="text-neutral-600 text-sm">Configure eventos importantes no seu calendário para não esquecer nunca mais!</p>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Menu de Acesso Rápido */}
        <div className="card mb-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {t('dashboard.quickAccess')}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>, title: t('menu.diary'), link: '/diario-emocional', color: 'purple' },
              { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v16a2 2 0 002 2z" /></svg>, title: t('menu.calendar'), link: '/calendario-casal', color: 'green' },
              { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>, title: t('menu.aiChat'), link: '/chat', color: 'blue' },
              { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>, title: t('menu.goals'), link: '/metas-relacionamento', color: 'orange' },
              { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>, title: t('menu.surprises'), link: '/surpresas-personalizadas', color: 'yellow' }
            ].map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className={`group flex flex-col items-center p-3 rounded-xl border-2 border-transparent hover:border-${item.color}-200 bg-gradient-to-br from-${item.color}-50 to-${item.color}-100 hover:from-${item.color}-100 hover:to-${item.color}-200 transition-all duration-300 transform hover:-translate-y-1`}
              >
                <div className={`w-10 h-10 bg-gradient-to-r from-${item.color}-400 to-${item.color}-500 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-lg`}>
                  <div className="text-white">{item.icon}</div>
                </div>
                <span className={`text-xs font-semibold text-${item.color}-700 text-center leading-tight`}>
                  {item.title}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Check-in Diário e Dica do Dia lado a lado */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Check-in Diário */}
          <div className="card h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-neutral-900">{t('dashboard.dailyCheckIn')}</h2>
                <p className="text-neutral-600 text-sm">{t('dashboard.moodToday')}</p>
              </div>
            </div>
            
            {currentMood ? (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <p className="text-green-800 font-semibold mb-2 sm:mb-0">
                      Hoje você está: <strong>{currentMood}</strong> {currentMoodObj?.emoji}
                    </p>
                    <button 
                      onClick={handleChangeMood}
                      className="btn-secondary text-sm px-3 py-1"
                    >
                      {t('dashboard.changeMood')}
                    </button>
                  </div>
                  
                  {currentMoodObj?.tips && (
                    <div className="bg-white/70 rounded-lg p-3">
                      <p className="text-green-800 font-semibold mb-2 text-sm flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        {t('dashboard.moodTips')}:
                      </p>
                      <div className="space-y-2">
                        {currentMoodObj.tips.slice(0, 2).map((tip: string, index: number) => (
                          <div key={index} className="bg-white rounded-lg p-2 border border-green-200">
                            <p className="text-green-700 text-xs leading-relaxed">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                {showMoodSelector ? (
                  <div className="grid grid-cols-3 gap-3">
                    {moods.map((mood, index) => (
                      <button
                        key={index}
                        onClick={() => handleMoodSelect(mood)}
                        className="group p-3 rounded-xl border-2 border-neutral-200 hover:border-rose-300 transition-all text-center bg-white hover:bg-rose-50"
                      >
                        <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">{mood.emoji}</div>
                        <div className="text-xs font-medium text-neutral-700 group-hover:text-rose-700">
                          {mood.label}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-neutral-600 mb-4">Compartilhe como você está se sentindo.</p>
                    <button 
                      onClick={() => setShowMoodSelector(true)}
                      className="btn-primary w-full flex items-center justify-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {t('dashboard.makeCheckIn')}
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* Spacer para manter altura uniforme */}
            <div className="flex-1"></div>
          </div>

          {/* Dica do Dia */}
          {dailyTip && (
            <div className="card bg-gradient-to-r from-rose-50 to-primary-50 border-2 border-rose-200 relative h-full flex flex-col">
              <button 
                onClick={() => {
                  // Generate new tip by forcing re-render
                  setDailyTip(false);
                  setTimeout(() => setDailyTip(true), 100);
                }}
                className="absolute top-4 right-4 text-neutral-400 hover:text-rose-600 transition-colors"
                title={t('dashboard.generateNewTip')}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-primary-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="flex-1 flex flex-col">
                  <h2 className="text-xl font-bold text-neutral-900 mb-2">{t('dashboard.dailyTipTitle')}</h2>
                  <p className="text-neutral-700 mb-4 leading-relaxed flex-1">
                    {dailyTips[Math.floor(Math.random() * dailyTips.length)]}
                  </p>
                  <button className="btn-primary text-sm w-full flex items-center justify-center mt-auto">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {t('dashboard.tryThis')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>


        {/* Smart Reminders Widget */}
        <div className="mb-8">
          <SmartRemindersWidget />
        </div>

        {/* Funcionalidades Adicionais */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            {t('dashboard.specialFeatures')}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
                title: 'Quiz Linguagens do Amor',
                description: 'Descubram as linguagens do amor de vocês',
                color: 'from-purple-400 to-pink-400',
                link: '/linguagens-do-amor',
                badge: 'Popular'
              },
              {
                icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
                title: 'Modo Crise',
                description: 'Suporte imediato para momentos difíceis',
                color: 'from-red-500 to-red-600',
                link: '/modo-crise',
                badge: 'Urgente'
              },
              {
                icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
                title: profileCompleteness < 100 ? 'Complete seu Perfil' : 'Perfil do Casal',
                description: profileCompleteness < 100 ? `${profileCompleteness}% completo. Personalize sua experiência!` : 'Veja e edite o perfil do seu relacionamento',
                color: profileCompleteness < 100 ? 'from-amber-500 to-orange-500' : 'from-green-500 to-emerald-500',
                link: '/perfil-casal',
                badge: profileCompleteness < 100 ? `${profileCompleteness}%` : 'Completo'
              },
              {
                icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>,
                title: 'Planos de Ação',
                description: 'Estratégias personalizadas para seu relacionamento',
                color: 'from-indigo-500 to-purple-500',
                link: '/planos-acao',
                badge: 'Personalizado'
              }
            ].map((feature, index) => (
              <Link 
                key={index} 
                to={feature.link}
                className="group relative card-hover bg-white rounded-2xl border-2 border-neutral-200 hover:border-rose-300 p-6 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="absolute top-4 right-4">
                  <span className={`${feature.color.includes('red') ? 'bg-red-100 text-red-600' : feature.color.includes('amber') ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-600'} text-xs font-semibold px-2 py-1 rounded-full`}>
                    {feature.badge}
                  </span>
                </div>
                <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-base font-bold font-display text-neutral-900 mb-2 group-hover:text-rose-700 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 text-xs leading-relaxed">
                  {feature.description}
                </p>
                <div className="mt-4 flex items-center text-rose-600 font-semibold text-xs">
                  <span>Acessar</span>
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  );
}
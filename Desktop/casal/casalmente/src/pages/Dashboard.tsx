import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../contexts/LanguageContext';
import { useGamification } from '../contexts/GamificationContext';

export default function Dashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { userProgress, getDailyChallenge, updateStreak } = useGamification();
  const [currentMood, setCurrentMood] = useState('');
  const [currentMoodObj, setCurrentMoodObj] = useState<any>(null);
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [dailyTip, setDailyTip] = useState(true);

  useEffect(() => {
    // Atualizar streak quando o usuário acessa o dashboard
    updateStreak();
  }, []);

  const dailyChallenge = getDailyChallenge();

  const moods = [
    { 
      emoji: '😍', 
      label: 'Apaixonado(a)', 
      color: 'from-pink-400 to-rose-500',
      tips: [
        "💕 Aproveite esse momento! Expresse seus sentimentos ao seu parceiro.",
        "📸 Criem memórias especiais - tirem fotos, escrevam bilhetes carinhosos.",
        "🎁 Que tal uma surpresa romântica? Mesmo pequena, fará diferença!"
      ]
    },
    { 
      emoji: '😊', 
      label: 'Feliz', 
      color: 'from-yellow-400 to-orange-500',
      tips: [
        "✨ Compartilhe essa alegria! Conte ao seu parceiro o que te deixou feliz.",
        "🎵 Que tal dançarem juntos ou ouvirem uma música especial?",
        "🍯 Sua energia positiva é contagiante - use-a para fortalecer a conexão!"
      ]
    },
    { 
      emoji: '😌', 
      label: 'Tranquilo(a)', 
      color: 'from-green-400 to-teal-500',
      tips: [
        "🧘 Aproveite essa paz para conversas profundas e significativas.",
        "🌅 Que tal um momento de qualidade juntos? Sem pressa, só vocês dois.",
        "📱 Use essa tranquilidade para se desconectar do digital e se reconectar."
      ]
    },
    { 
      emoji: '😐', 
      label: 'Neutro', 
      color: 'from-gray-400 to-neutral-500',
      tips: [
        "⚡ Que tal fazer algo diferente hoje? Quebrem a rotina juntos!",
        "💬 Uma conversa interessante pode mudar completamente seu dia.",
        "🎯 Definam um pequeno objetivo juntos - isso pode trazer energia nova!"
      ]
    },
    { 
      emoji: '😔', 
      label: 'Triste', 
      color: 'from-blue-400 to-indigo-500',
      tips: [
        "🤗 Não precisa carregar tudo sozinho(a). Converse com seu parceiro.",
        "💙 Aceite esse sentimento. Sua vulnerabilidade pode aproximar vocês.",
        "☕ Que tal um momento acolhedor? Um chá, uma conversa, um abraço."
      ]
    },
    { 
      emoji: '😤', 
      label: 'Irritado(a)', 
      color: 'from-red-400 to-red-600',
      tips: [
        "🌬️ Respire fundo antes de falar. Conte até 10, depois expresse-se.",
        "🚶 Que tal uma caminhada para esfriar a cabeça antes de conversar?",
        "💭 Pergunte-se: 'O que realmente está me incomodando?' Vá à raiz."
      ]
    },
  ];

  const dailyTips = [
    "💕 Envie uma mensagem carinhosa para seu parceiro agora mesmo!",
    "🌟 Que tal planejar um encontro especial para vocês dois?",
    "💬 Conversem sobre algo que vocês gostam de fazer juntos.",
    "🤗 Um abraço sincero pode resolver muitos conflitos.",
    "📱 Que tal desligar os celulares e se conectarem de verdade?",
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
            {t('dashboard.welcome')}, {user?.displayName?.split(' ')[0] || 'querido(a)'}! 💕
          </h1>
          <p className="text-neutral-600">
            Como está seu relacionamento hoje? Vamos trabalhar juntos para fortalecê-lo.
          </p>
        </div>

        {/* Gamification Progress Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-r from-primary-500 to-rose-500 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">{t('gamification.level')}</p>
                <p className="text-2xl font-bold">{userProgress.level}</p>
              </div>
              <div className="text-3xl">🏆</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">{t('gamification.points')}</p>
                <p className="text-2xl font-bold">{userProgress.totalPoints}</p>
              </div>
              <div className="text-3xl">⭐</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">{t('gamification.streak')}</p>
                <p className="text-2xl font-bold">{userProgress.streak} dias</p>
              </div>
              <div className="text-3xl">🔥</div>
            </div>
          </div>
        </div>

        {/* Daily Challenge */}
        {dailyChallenge && (
          <div className="card bg-gradient-to-r from-purple-500 to-indigo-500 text-white mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg mb-1">{t('gamification.dailyChallenge')}</h3>
                <p className="opacity-90">{dailyChallenge.title}</p>
                <p className="text-sm opacity-75 mt-1">{dailyChallenge.description}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl mb-2">🎯</div>
                <p className="text-sm opacity-90">+{dailyChallenge.points} pontos</p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Navigation Menu */}
        <div className="card mb-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-4 flex items-center">
            <span className="mr-2">🧭</span>
            Acesso Rápido às Funcionalidades
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-10 gap-3">
            {[
              { icon: '📝', title: t('menu.diary'), link: '/diario-emocional', color: 'purple' },
              { icon: '📅', title: t('menu.calendar'), link: '/calendario-casal', color: 'green' },
              { icon: '💬', title: t('menu.aiChat'), link: '/chat', color: 'blue' },
              { icon: '🎯', title: t('menu.goals'), link: '/metas-relacionamento', color: 'orange' },
              { icon: '🎁', title: t('menu.surprises'), link: '/surpresas-personalizadas', color: 'yellow' },
              { icon: '🆘', title: t('menu.crisis'), link: '/modo-crise', color: 'red' },
              { icon: '📚', title: t('menu.guides'), link: '/guia-conquista', color: 'pink' },
              { icon: '🔄', title: 'Reconquista', link: '/guia-reconquista', color: 'amber' },
              { icon: '📋', title: 'Planos', link: '/planos-acao', color: 'indigo' },
              { icon: '⚙️', title: t('menu.settings'), link: '/configuracoes', color: 'gray' }
            ].map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className={`group flex flex-col items-center p-4 rounded-xl border-2 border-transparent hover:border-${item.color}-200 bg-gradient-to-br from-${item.color}-50 to-${item.color}-100 hover:from-${item.color}-100 hover:to-${item.color}-200 transition-all duration-300 transform hover:-translate-y-1`}
              >
                <div className={`w-12 h-12 bg-gradient-to-r from-${item.color}-400 to-${item.color}-500 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-lg`}>
                  <span className="text-white text-xl">{item.icon}</span>
                </div>
                <span className={`text-sm font-semibold text-${item.color}-700 text-center`}>
                  {item.title}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Guia de Primeiros Passos - Movido para cima */}
        <div className="card bg-gradient-to-br from-rose-500 via-primary-500 to-purple-600 text-white max-w-4xl mx-auto mb-8">
          <div className="text-center mb-6">
            <div className="text-4xl mb-4">🌟</div>
            <h2 className="text-3xl font-bold font-display mb-4">
              Bem-vindo, {user?.displayName?.split(' ')[0] || 'querido(a)'}!
            </h2>
            <p className="text-rose-100 text-lg">
              Sua jornada de reconexão amorosa começa aqui. Vamos fortalecer seu relacionamento juntos!
            </p>
          </div>

          {/* Progress Steps */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className={`bg-white/10 backdrop-blur-sm rounded-xl p-4 border-2 ${currentMood ? 'border-green-300' : 'border-white/30'}`}>
              <div className="text-2xl mb-2">{currentMood ? '✅' : '1️⃣'}</div>
              <h3 className="font-bold mb-2">Check-in Diário</h3>
              <p className="text-sm text-rose-100">
                {currentMood ? 'Concluído! Continue compartilhando seus sentimentos.' : 'Compartilhe como você está se sentindo hoje.'}
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border-2 border-white/30">
              <div className="text-2xl mb-2">2️⃣</div>
              <h3 className="font-bold mb-2">Converse com a IA</h3>
              <p className="text-sm text-rose-100">
                Nossa mentora está aqui para te ouvir e orientar sempre que precisar.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border-2 border-white/30">
              <div className="text-2xl mb-2">3️⃣</div>
              <h3 className="font-bold mb-2">Explore as Ferramentas</h3>
              <p className="text-sm text-rose-100">
                Use o diário, calendário, metas e muito mais para fortalecer o relacionamento.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {currentMood ? (
              <>
                <Link 
                  to="/chat" 
                  className="bg-white text-rose-600 px-6 py-3 rounded-xl font-semibold hover:bg-rose-50 transition-colors text-center"
                >
                  💬 Conversar com a Mentora
                </Link>
                <Link 
                  to="/diario-emocional" 
                  className="bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors text-center"
                >
                  📝 Abrir Diário
                </Link>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setShowMoodSelector(true)}
                  className="bg-white text-rose-600 px-8 py-3 rounded-xl font-semibold hover:bg-rose-50 transition-colors"
                >
                  💝 Começar Check-in Diário
                </button>
                <Link 
                  to="/chat" 
                  className="bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors text-center"
                >
                  💬 Chat com a Mentora
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Today's Overview - Informações de hoje sozinho */}
        <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="text-white text-2xl">📅</span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Informações de Hoje</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white/70 rounded-lg p-4">
                  <p className="text-neutral-700 font-semibold mb-2">
                    📍 <strong>Data de hoje:</strong>
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
                  <p className="text-green-700 font-semibold mb-2">✅ Agenda de hoje:</p>
                  <p className="text-neutral-600 text-sm">• Use o Calendário do Casal para agendar compromissos</p>
                  <p className="text-neutral-600 text-sm">• Que tal planejar algo especial? 💕</p>
                </div>
                <div className="bg-white/70 rounded-lg p-4">
                  <p className="text-purple-700 font-semibold mb-2">💝 Datas especiais:</p>
                  <p className="text-neutral-600 text-sm">Configure eventos importantes no seu calendário para não esquecer nunca mais!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Check-in Diário e Dica do Dia lado a lado */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Check-in Diário */}
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-2xl">💭</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-neutral-900">Check-in Diário</h2>
                <p className="text-neutral-600 text-sm">Como você está se sentindo hoje?</p>
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
                      Alterar
                    </button>
                  </div>
                  
                  {currentMoodObj?.tips && (
                    <div className="bg-white/70 rounded-lg p-3">
                      <p className="text-green-800 font-semibold mb-2 text-sm flex items-center">
                        <span className="mr-2">💡</span>
                        Dicas para seu humor:
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
                      className="btn-primary w-full"
                    >
                      <span className="mr-2">💝</span>
                      Fazer Check-in
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Dica do Dia */}
          {dailyTip && (
            <div className="card bg-gradient-to-r from-rose-50 to-primary-50 border-2 border-rose-200 relative">
              <button 
                onClick={() => setDailyTip(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600"
              >
                ✕
              </button>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-primary-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">💕</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-neutral-900 mb-2">Dica do Dia</h2>
                  <p className="text-neutral-700 mb-4 leading-relaxed">
                    {dailyTips[Math.floor(Math.random() * dailyTips.length)]}
                  </p>
                  <button className="btn-primary text-sm w-full">Vou tentar isso! 💕</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Funcionalidades Adicionais */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center">
            <span className="mr-2">🌟</span>
            Funcionalidades Especiais
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '💝',
                title: 'Quiz Linguagens do Amor',
                description: 'Descubram as linguagens do amor de vocês',
                color: 'from-purple-400 to-pink-400',
                link: '/linguagens-do-amor',
                badge: 'Popular'
              },
              {
                icon: '💬',
                title: 'Chat com Mentora IA',
                description: 'Conselhos e orientações personalizadas 24/7',
                color: 'from-blue-500 to-cyan-500',
                link: '/chat',
                badge: 'Sempre Disponível'
              },
              {
                icon: '🎯',
                title: 'Metas do Relacionamento',
                description: 'Definam e acompanhem objetivos como casal',
                color: 'from-orange-500 to-red-500',
                link: '/metas-relacionamento',
                badge: 'Progresso'
              }
            ].map((feature, index) => (
              <Link 
                key={index} 
                to={feature.link}
                className="group relative card-hover bg-white rounded-2xl border-2 border-neutral-200 hover:border-rose-300 p-6 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="absolute top-4 right-4">
                  <span className="bg-rose-100 text-rose-600 text-xs font-semibold px-2 py-1 rounded-full">
                    {feature.badge}
                  </span>
                </div>
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                  <span className="text-white text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-lg font-bold font-display text-neutral-900 mb-2 group-hover:text-rose-700 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
                <div className="mt-4 flex items-center text-rose-600 font-semibold text-sm">
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
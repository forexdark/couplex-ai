import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const { user } = useAuth();
  const [currentMood, setCurrentMood] = useState('');
  const [currentMoodObj, setCurrentMoodObj] = useState<any>(null);
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [dailyTip, setDailyTip] = useState(true);

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
            Olá, {user?.displayName?.split(' ')[0] || 'querido(a)'}! 💕
          </h1>
          <p className="text-neutral-600">
            Como está seu relacionamento hoje? Vamos trabalhar juntos para fortalecê-lo.
          </p>
        </div>

        {/* Quick Navigation Menu */}
        <div className="card mb-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-4 flex items-center">
            <span className="mr-2">🧭</span>
            Acesso Rápido às Funcionalidades
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { icon: '📝', title: 'Diário', link: '/diario-emocional', color: 'purple' },
              { icon: '📅', title: 'Calendário', link: '/calendario-casal', color: 'green' },
              { icon: '💬', title: 'Chat IA', link: '/chat', color: 'blue' },
              { icon: '🎯', title: 'Metas', link: '/metas-relacionamento', color: 'orange' },
              { icon: '🎁', title: 'Surpresas', link: '/surpresas-personalizadas', color: 'yellow' },
              { icon: '🆘', title: 'Crise', link: '/modo-crise', color: 'red' }
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

        {/* Today's Overview */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Today Info Card */}
          <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl">📅</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-neutral-900 mb-2">Informações de Hoje</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-neutral-700">
                    <strong>Data:</strong> {new Date().toLocaleDateString('pt-BR', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  <div className="bg-white/70 rounded-lg p-3 mt-3">
                    <p className="text-green-700 font-medium mb-1">✅ Agenda de hoje:</p>
                    <p className="text-neutral-600 text-xs">• Use o Calendário do Casal para agendar compromissos</p>
                    <p className="text-neutral-600 text-xs">• Que tal planejar algo especial? 💕</p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3">
                    <p className="text-purple-700 font-medium mb-1">💝 Datas especiais:</p>
                    <p className="text-neutral-600 text-xs">Configure eventos importantes no seu calendário para não esquecer nunca mais!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Tip */}
          {dailyTip && (
            <div className="card bg-gradient-to-r from-rose-50 to-primary-50 border-2 border-rose-200 relative">
              <button 
                onClick={() => setDailyTip(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600"
              >
                ✕
              </button>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">💕</span>
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 mb-2">Dica do Dia</h3>
                  <p className="text-neutral-700 mb-4">
                    {dailyTips[Math.floor(Math.random() * dailyTips.length)]}
                  </p>
                  <button className="btn-primary text-sm">Vou tentar isso! 💕</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mood Check-in - Seção Principal */}
        <div className="card mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-2xl">💭</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Check-in Diário</h2>
              <p className="text-neutral-600 text-sm">Como você está se sentindo hoje?</p>
            </div>
          </div>
          
          {currentMood ? (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <p className="text-green-800 font-semibold text-lg mb-2 sm:mb-0">
                    Hoje você está: <strong>{currentMood}</strong> {currentMoodObj?.emoji}
                  </p>
                  <button 
                    onClick={handleChangeMood}
                    className="btn-secondary text-sm px-4 py-2"
                  >
                    Alterar Humor
                  </button>
                </div>
                
                {currentMoodObj?.tips && (
                  <div className="bg-white/70 rounded-lg p-4">
                    <p className="text-green-800 font-semibold mb-3 flex items-center">
                      <span className="mr-2">💡</span>
                      Dicas personalizadas para seu humor:
                    </p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {currentMoodObj.tips.map((tip: string, index: number) => (
                        <div key={index} className="bg-white rounded-lg p-3 border border-green-200">
                          <p className="text-green-700 text-sm leading-relaxed">{tip}</p>
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
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {moods.map((mood, index) => (
                    <button
                      key={index}
                      onClick={() => handleMoodSelect(mood)}
                      className="group p-4 rounded-xl border-2 border-neutral-200 hover:border-rose-300 transition-all text-center bg-white hover:bg-rose-50"
                    >
                      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{mood.emoji}</div>
                      <div className="text-sm font-medium text-neutral-700 group-hover:text-rose-700">
                        {mood.label}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-neutral-600 mb-6">Compartilhe como você está se sentindo para receber dicas personalizadas.</p>
                  <button 
                    onClick={() => setShowMoodSelector(true)}
                    className="btn-primary px-8 py-3 text-lg"
                  >
                    <span className="mr-2">💝</span>
                    Fazer Check-in Diário
                  </button>
                </div>
              )}
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


        {/* Guia de Primeiros Passos */}
        <div className="card bg-gradient-to-br from-rose-500 via-primary-500 to-purple-600 text-white max-w-4xl mx-auto">
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
      </div>
    </Layout>
  );
}
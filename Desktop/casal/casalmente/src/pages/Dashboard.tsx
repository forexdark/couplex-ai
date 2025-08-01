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
            Olá, {user?.displayName?.split(' ')[0] || 'Usuário'}! 💕
          </h1>
          <p className="text-neutral-600">
            Como está seu relacionamento hoje? Vamos trabalhar juntos para fortalecê-lo.
          </p>
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
                    <p className="text-neutral-600 text-xs">• Nenhum compromisso do casal hoje</p>
                    <p className="text-neutral-600 text-xs">• Que tal planejar algo especial? 💕</p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3">
                    <p className="text-purple-700 font-medium mb-1">💝 Data especial:</p>
                    <p className="text-neutral-600 text-xs">Não é uma data comemorativa hoje, mas todo dia pode ser especial quando estamos com quem amamos!</p>
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

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Mood Check-in */}
          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white">💭</span>
              </div>
              <h3 className="text-xl font-bold text-neutral-900">Check-in Diário</h3>
            </div>
            
            {currentMood ? (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-green-800 font-medium">
                      Hoje você está: <strong>{currentMood}</strong> {currentMoodObj?.emoji}
                    </p>
                    <button 
                      onClick={handleChangeMood}
                      className="text-green-600 text-sm font-medium hover:underline"
                    >
                      Alterar
                    </button>
                  </div>
                  
                  {currentMoodObj?.tips && (
                    <div className="bg-white/70 rounded-lg p-3">
                      <p className="text-green-800 font-semibold mb-2 text-sm">
                        💡 Dicas personalizadas para seu humor:
                      </p>
                      <div className="space-y-2">
                        {currentMoodObj.tips.map((tip: string, index: number) => (
                          <div key={index} className="flex items-start gap-2">
                            <span className="text-green-500 text-xs mt-1">•</span>
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
                <p className="text-neutral-600 mb-4">Como você está se sentindo hoje?</p>
                {showMoodSelector ? (
                  <div className="grid grid-cols-3 gap-2">
                    {moods.map((mood, index) => (
                      <button
                        key={index}
                        onClick={() => handleMoodSelect(mood)}
                        className="p-3 rounded-xl border-2 border-neutral-200 hover:border-rose-300 transition-all text-center group"
                      >
                        <div className="text-2xl mb-1">{mood.emoji}</div>
                        <div className="text-xs text-neutral-600 group-hover:text-rose-600">
                          {mood.label}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <button 
                    onClick={() => setShowMoodSelector(true)}
                    className="btn-secondary w-full"
                  >
                    Registrar humor de hoje 💝
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Quick Chat */}
          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white">💬</span>
              </div>
              <h3 className="text-xl font-bold text-neutral-900">Chat com IA</h3>
            </div>
            <p className="text-neutral-600 mb-4">
              Precisa de conselhos urgentes? A terapeuta IA está sempre disponível.
            </p>
            <Link to="/chat" className="btn-primary w-full text-center">
              <span className="mr-2">🚀</span>
              Conversar com a Mentora
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            {
              icon: '📝',
              title: 'Diário Emocional',
              description: 'Registre seus sentimentos e receba orientações personalizadas',
              color: 'from-purple-500 to-pink-500',
              link: '/diario-emocional',
              status: 'available'
            },
            {
              icon: '📅',
              title: 'Calendário do Casal',
              description: 'Organizem encontros e datas especiais',
              color: 'from-green-500 to-teal-500',
              link: '/calendario-casal',
              status: 'available'
            },
            {
              icon: '💝',
              title: 'Quiz Linguagens do Amor',
              description: 'Descubram as linguagens do amor de vocês',
              color: 'from-purple-400 to-pink-400',
              link: '/linguagens-do-amor',
              status: 'available'
            },
            {
              icon: '🎯',
              title: 'Metas do Relacionamento',
              description: 'Definam e acompanhem objetivos como casal',
              color: 'from-orange-500 to-red-500',
              link: '/metas-relacionamento',
              status: 'available'
            },
            {
              icon: '🎁',
              title: 'Surpresas Personalizadas',
              description: 'Ideias de presentes e momentos especiais baseadas na IA',
              color: 'from-yellow-500 to-orange-500',
              link: '/surpresas-personalizadas',
              status: 'available'
            },
            {
              icon: '🆘',
              title: 'Modo Crise',
              description: 'Protocolo especial para conflitos urgentes',
              color: 'from-red-500 to-pink-500',
              link: '/modo-crise',
              status: 'available'
            }
          ].map((feature, index) => (
            <div key={index} className="card hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1">
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center shadow-soft mb-4`}>
                <span className="text-white text-2xl">{feature.icon}</span>
              </div>
              <h3 className="text-lg font-bold font-display text-neutral-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-neutral-600 mb-4 text-sm">
                {feature.description}
              </p>
              {feature.status === 'available' ? (
                <Link 
                  to={feature.link}
                  className="btn-primary text-sm w-full text-center"
                >
                  Usar agora ✨
                </Link>
              ) : (
                <button 
                  className="btn-secondary opacity-75 text-sm w-full"
                  disabled
                >
                  Em breve 🚧
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="card text-center bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200">
            <div className="text-2xl font-bold text-rose-600">1</div>
            <div className="text-sm text-rose-700">Dias no CoupleX AI</div>
          </div>
          <div className="card text-center bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <div className="text-2xl font-bold text-blue-600">0</div>
            <div className="text-sm text-blue-700">Conversas com IA</div>
          </div>
          <div className="card text-center bg-gradient-to-br from-green-50 to-teal-50 border-green-200">
            <div className="text-2xl font-bold text-green-600">0</div>
            <div className="text-sm text-green-700">Metas Alcançadas</div>
          </div>
          <div className="card text-center bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
            <div className="text-2xl font-bold text-yellow-600">0</div>
            <div className="text-sm text-yellow-700">Memórias Salvas</div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="card bg-gradient-to-r from-neutral-900 to-neutral-800 text-white text-center max-w-2xl mx-auto">
          <div className="text-4xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold font-display mb-4">
            Bem-vindo à sua jornada de reconexão!
          </h2>
          <p className="text-neutral-300 mb-6">
            Você deu o primeiro passo para fortalecer seu relacionamento. 
            Nossa IA especializada está aqui para ajudar vocês 24/7.
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
            <p className="text-sm text-neutral-200">
              💡 <strong>Próximo passo:</strong> {currentMood ? 'Explore nossas funcionalidades e converse com a mentora!' : 'Faça seu check-in diário para receber orientações personalizadas.'}
            </p>
          </div>
          {currentMood ? (
            <Link to="/chat" className="bg-white text-neutral-800 px-6 py-3 rounded-xl font-semibold hover:bg-neutral-100 transition-colors inline-block">
              Conversar com a Mentora 💕
            </Link>
          ) : (
            <button 
              onClick={() => setShowMoodSelector(true)}
              className="bg-white text-neutral-800 px-6 py-3 rounded-xl font-semibold hover:bg-neutral-100 transition-colors"
            >
              Fazer Check-in Diário 💕
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}
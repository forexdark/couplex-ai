import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout showHeader>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-primary-50"></div>
        <div className="relative container-app py-20 sm:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="animate-fade-in">
              <div className="inline-flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-rose-200 mb-8">
                <span className="text-rose-600 text-sm font-medium">💕 Sua Mentora dos Relacionamentos</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-display text-neutral-900 mb-6 leading-tight">
                A conexão <span className="bg-gradient-to-r from-rose-500 to-primary-500 bg-clip-text text-transparent">esfriou</span>?
                <br />
                <span className="bg-gradient-to-r from-primary-500 to-rose-500 bg-clip-text text-transparent">CoupleX AI</span> te ajuda a reacender
              </h1>
              
              <p className="text-xl sm:text-2xl text-neutral-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                Reacenda a paixão, reconecte corações e fortaleça seu relacionamento com nossa companheira especializada em salvar famílias.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link
                  to="/auth?mode=signup"
                  className="btn-primary text-lg px-8 py-4 shadow-glow"
                >
                  🚀 Começar Agora - Grátis
                </Link>
                <Link
                  to="#como-funciona"
                  className="btn-secondary text-lg px-8 py-4"
                >
                  💡 Conhecer sua Mentora
                </Link>
              </div>
              
              <div className="flex items-center justify-center space-x-6 text-sm text-neutral-500">
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                  <span>4.9/5 de satisfação</span>
                </div>
                <div>+15.000 casais salvos</div>
                <div>🔒 100% privado e seguro</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problemas" className="py-20 bg-white">
        <div className="container-app">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold font-display text-neutral-900 mb-6">
              Reconhece esses sinais no seu relacionamento?
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Se você se identifica com 2 ou mais situações abaixo, seu relacionamento precisa de atenção urgente.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: '💔',
                title: 'Brigam por qualquer coisa',
                description: 'Pequenos problemas viram grandes discussões que machucam vocês dois.',
                color: 'border-red-200 bg-red-50'
              },
              {
                icon: '🤐',
                title: 'Falta comunicação',
                description: 'Vocês não conseguem mais conversar sem que vire conflito ou frieza.',
                color: 'border-orange-200 bg-orange-50'
              },
              {
                icon: '📱',
                title: 'Mais tempo no celular',
                description: 'Preferem o telefone à companhia um do outro, perdendo a intimidade.',
                color: 'border-blue-200 bg-blue-50'
              },
              {
                icon: '😔',
                title: 'Carinho diminuiu',
                description: 'Beijos, abraços e momentos especiais estão cada vez mais raros.',
                color: 'border-purple-200 bg-purple-50'
              },
              {
                icon: '🛌',
                title: 'Intimidade em baixa',
                description: 'A conexão física e emocional não é mais como antes.',
                color: 'border-pink-200 bg-pink-50'
              },
              {
                icon: '😢',
                title: 'Pensando em desistir',
                description: 'Às vezes vocês se perguntam se vale a pena continuar tentando.',
                color: 'border-gray-200 bg-gray-50'
              }
            ].map((problem, index) => (
              <div key={index} className={`card hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1 ${problem.color} border-2`}>
                <div className="text-5xl mb-4">{problem.icon}</div>
                <h3 className="text-xl font-bold font-display text-neutral-900 mb-3">{problem.title}</h3>
                <p className="text-neutral-700 leading-relaxed">{problem.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="inline-block card bg-gradient-to-r from-primary-50 to-rose-50 border-2 border-primary-200">
              <p className="text-xl font-semibold text-primary-900 mb-4">
                <strong>Se você se identificou com 2 ou mais situações</strong>, seu relacionamento precisa de ajuda urgente.
              </p>
              <Link
                to="/auth?mode=signup"
                className="btn-primary text-lg"
              >
                ⚡ Começar a mudança agora
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="como-funciona" className="py-20 bg-gradient-to-br from-neutral-50 to-rose-50">
        <div className="container-app">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold font-display text-neutral-900 mb-6">
              Como vamos reacender a chama do seu amor
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Sua mentora especializada em reconexão está aqui para guiar vocês 24/7, 
              com orientação personalizada para resgatar a paixão e fortalecer laços.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-20">
            <div className="space-y-6 lg:space-y-8">
              <div className="flex items-start space-x-4 p-4 lg:p-6 rounded-2xl bg-white/50 hover:bg-white/70 transition-all duration-300 border border-rose-100">
                <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-primary-500 rounded-xl flex items-center justify-center shadow-soft flex-shrink-0">
                  <span className="text-white text-xl">💕</span>
                </div>
                <div>
                  <h3 className="text-lg lg:text-xl font-bold font-display text-neutral-900 mb-2">
                    Sua Companheira de Jornada
                  </h3>
                  <p className="text-neutral-700 text-sm lg:text-base">
                    Entendo as emoções do casal e identifico onde está a desconexão para guiar vocês de volta ao amor.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 lg:p-6 rounded-2xl bg-white/50 hover:bg-white/70 transition-all duration-300 border border-rose-100">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-rose-500 rounded-xl flex items-center justify-center shadow-soft flex-shrink-0">
                  <span className="text-white text-xl">🌟</span>
                </div>
                <div>
                  <h3 className="text-lg lg:text-xl font-bold font-display text-neutral-900 mb-2">
                    Orientação Sob Medida
                  </h3>
                  <p className="text-neutral-700 text-sm lg:text-base">
                    Cada relacionamento é único. Crio estratégias personalizadas baseadas na história de vocês dois.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 lg:p-6 rounded-2xl bg-white/50 hover:bg-white/70 transition-all duration-300 border border-rose-100">
                <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-primary-500 rounded-xl flex items-center justify-center shadow-soft flex-shrink-0">
                  <span className="text-white text-xl">🌙</span>
                </div>
                <div>
                  <h3 className="text-lg lg:text-xl font-bold font-display text-neutral-900 mb-2">
                    Sempre ao Seu Lado
                  </h3>
                  <p className="text-neutral-700 text-sm lg:text-base">
                    Nos momentos mais difíceis, estou aqui. 24 horas por dia, 7 dias por semana, sem julgamentos.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 lg:p-6 rounded-2xl bg-white/50 hover:bg-white/70 transition-all duration-300 border border-rose-100">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-rose-500 rounded-xl flex items-center justify-center shadow-soft flex-shrink-0">
                  <span className="text-white text-xl">🆘</span>
                </div>
                <div>
                  <h3 className="text-lg lg:text-xl font-bold font-display text-neutral-900 mb-2">
                    Mediação nas Crises
                  </h3>
                  <p className="text-neutral-700 text-sm lg:text-base">
                    Quando tudo parece perdido, ajudo vocês a encontrarem o caminho de volta um para o outro.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative mt-8 lg:mt-0">
              <div className="card bg-white shadow-glow border-2 border-rose-100 max-w-md mx-auto lg:max-w-none">
                <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-neutral-100">
                  <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-primary-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">💕</span>
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">Sua Mentora</p>
                    <p className="text-xs text-neutral-500">💚 Sempre disponível</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-rose-50 to-primary-50 rounded-2xl p-4 border border-rose-100">
                    <p className="text-neutral-700 text-sm leading-relaxed">
                      "Olá! 💕 Posso sentir que vocês estão enfrentando momentos difíceis. Não se preocupem, estou aqui para guiá-los de volta ao amor. Vou compartilhar uma técnica que já salvou milhares de relacionamentos..."
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span>Agora</span>
                    <span className="flex items-center space-x-1">
                      <span>💝</span>
                      <span>Feito com carinho</span>
                    </span>
                  </div>
                  
                  <div className="bg-neutral-50 rounded-2xl p-3 text-center">
                    <p className="text-xs text-neutral-600 mb-2">Próximos passos sugeridos:</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <span className="bg-rose-100 text-rose-700 px-2 py-1 rounded-full text-xs">💬 Comunicação</span>
                      <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">💕 Intimidade</span>
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">🎯 Metas</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div id="funcionalidades" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '📝',
                title: 'Diário Emocional',
                description: 'Registre sentimentos e receba orientação especializada'
              },
              {
                icon: '💭',
                title: 'Check-in Diário',
                description: 'Acompanhe o humor e receba dicas personalizadas'
              },
              {
                icon: '🎯',
                title: 'Metas do Casal',
                description: 'Definam objetivos juntos e acompanhem o progresso'
              },
              {
                icon: '🆘',
                title: 'Modo Crise',
                description: 'Protocolo de emergência para conflitos graves'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 card hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-bold font-display text-neutral-900 mb-2">{feature.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Languages of Love Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container-app">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow">
                <span className="text-3xl">💝</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold font-display text-neutral-900 mb-6">
                Descubra sua Linguagem do Amor
              </h2>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                Baseado no best-seller de Gary Chapman, nosso quiz revela como você expressa e recebe amor. 
                Conhecer sua linguagem e a do seu parceiro pode transformar completamente o relacionamento!
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-4 mb-8">
              {[
                { emoji: '💬', name: 'Palavras de Afirmação', color: 'from-blue-400 to-indigo-500' },
                { emoji: '⏰', name: 'Tempo de Qualidade', color: 'from-green-400 to-teal-500' },
                { emoji: '🎁', name: 'Presentes', color: 'from-purple-400 to-pink-500' },
                { emoji: '🤝', name: 'Atos de Serviço', color: 'from-orange-400 to-red-500' },
                { emoji: '🤗', name: 'Toque Físico', color: 'from-rose-400 to-red-500' }
              ].map((lang, index) => (
                <div key={index} className="bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-white/50 hover:bg-white/90 transition-all duration-300">
                  <div className={`w-12 h-12 bg-gradient-to-r ${lang.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <span className="text-xl">{lang.emoji}</span>
                  </div>
                  <h4 className="text-sm font-bold text-neutral-800 leading-tight">{lang.name}</h4>
                </div>
              ))}
            </div>

            <div className="card bg-white/80 backdrop-blur-sm border-2 border-purple-200 mb-8">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-1 text-left">
                  <h3 className="text-2xl font-bold font-display text-neutral-900 mb-4">
                    ✨ Quiz Gratuito das 5 Linguagens
                  </h3>
                  <ul className="space-y-2 text-neutral-700 mb-6">
                    <li className="flex items-center">
                      <span className="text-purple-500 mr-3">✓</span>
                      <span>6 perguntas baseadas no livro original</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-purple-500 mr-3">✓</span>
                      <span>Resultado personalizado com dicas exclusivas</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-purple-500 mr-3">✓</span>
                      <span>Orientações para o seu parceiro também</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-purple-500 mr-3">✓</span>
                      <span>Compartilhável para descobrirem juntos</span>
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <Link
                    to="/linguagens-do-amor"
                    className="btn-primary text-lg px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <span className="mr-2">💝</span>
                    Descobrir Minha Linguagem
                  </Link>
                  <p className="text-sm text-neutral-500 mt-3">
                    ⚡ Leva apenas 2 minutos
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-neutral-600 text-sm">
                💡 <strong>Já conhece sua linguagem?</strong> Compartilhe com seu parceiro para que vocês se conectem ainda mais profundamente!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precos" className="py-20 bg-white">
        <div className="container-app">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold font-display text-neutral-900 mb-6">
              Escolha o plano ideal para salvar seu relacionamento
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Comece grátis e evolua conforme sua jornada de reconexão avança. 
              Todos os planos incluem nossa mentora disponível 24/7.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Plano Grátis */}
            <div className="card border-2 border-neutral-200 hover:border-neutral-300 transition-all duration-300 relative">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-neutral-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🌱</span>
                </div>
                <h3 className="text-2xl font-bold font-display text-neutral-900 mb-2">Grátis</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-neutral-900">R$ 0</span>
                  <span className="text-neutral-600">/mês</span>
                </div>
                <p className="text-neutral-600 text-sm">Para conhecer nossa mentora</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>3 conversas por dia com a mentora</span>
                </li>
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>Check-in diário de humor</span>
                </li>
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>Dicas básicas de relacionamento</span>
                </li>
                <li className="flex items-center text-sm text-neutral-400">
                  <span className="text-neutral-300 mr-3">✗</span>
                  <span>Planos personalizados</span>
                </li>
                <li className="flex items-center text-sm text-neutral-400">
                  <span className="text-neutral-300 mr-3">✗</span>
                  <span>Modo crise 24/7</span>
                </li>
                <li className="flex items-center text-sm text-neutral-400">
                  <span className="text-neutral-300 mr-3">✗</span>
                  <span>Relatórios mensais</span>
                </li>
              </ul>

              <Link to="/auth?mode=signup" className="btn-secondary w-full text-center">
                Começar Grátis
              </Link>
            </div>

            {/* Plano Ternura - Mais Popular */}
            <div className="card border-2 border-rose-300 hover:border-rose-400 transition-all duration-300 relative transform scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-rose-500 to-primary-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                  ✨ Mais Popular
                </div>
              </div>

              <div className="text-center mb-6 pt-4">
                <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">💕</span>
                </div>
                <h3 className="text-2xl font-bold font-display text-neutral-900 mb-2">Ternura</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-rose-600">R$ 19</span>
                  <span className="text-2xl font-bold text-rose-600">,90</span>
                  <span className="text-neutral-600">/mês</span>
                </div>
                <p className="text-neutral-600 text-sm">Para casais que querem se reconectar</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-3">✓</span>
                  <span><strong>Conversas ilimitadas</strong> com a mentora</span>
                </li>
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>Check-in e análise emocional completa</span>
                </li>
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-3">✓</span>
                  <span><strong>Planos personalizados</strong> de reconexão</span>
                </li>
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>Calendário do casal integrado</span>
                </li>
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>Diário emocional compartilhado</span>
                </li>
                <li className="flex items-center text-sm text-neutral-400">
                  <span className="text-neutral-300 mr-3">✗</span>
                  <span>Modo crise avançado</span>
                </li>
              </ul>

              <Link to="/auth?mode=signup" className="btn-primary w-full text-center">
                Escolher Ternura 💕
              </Link>
            </div>

            {/* Plano Amor */}
            <div className="card border-2 border-primary-200 hover:border-primary-300 transition-all duration-300 relative">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">❤️</span>
                </div>
                <h3 className="text-2xl font-bold font-display text-neutral-900 mb-2">Amor</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-primary-600">R$ 39</span>
                  <span className="text-2xl font-bold text-primary-600">,90</span>
                  <span className="text-neutral-600">/mês</span>
                </div>
                <p className="text-neutral-600 text-sm">Para casais que querem o máximo</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-3">✓</span>
                  <span><strong>Tudo do plano Ternura</strong></span>
                </li>
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-3">✓</span>
                  <span><strong>Modo crise 24/7</strong> com mediação</span>
                </li>
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-3">✓</span>
                  <span><strong>Relatórios mensais</strong> de progresso</span>
                </li>
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>Quiz das 5 Linguagens do Amor</span>
                </li>
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>Metas avançadas para o casal</span>
                </li>
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-3">✓</span>
                  <span><strong>Suporte prioritário</strong></span>
                </li>
              </ul>

              <Link to="/auth?mode=signup" className="btn-primary w-full text-center bg-gradient-to-r from-primary-500 to-rose-600">
                Escolher Amor ❤️
              </Link>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="text-center mt-16">
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-neutral-500 mb-8">
              <div className="flex items-center gap-2">
                <span className="text-green-500">🔒</span>
                <span>Pagamento 100% seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500">↻</span>
                <span>Cancele quando quiser</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">⭐</span>
                <span>7 dias de garantia</span>
              </div>
            </div>
            
            <p className="text-neutral-600 text-sm max-w-2xl mx-auto">
              💝 <strong>Garantia de satisfação:</strong> Se em 7 dias você não sentir uma melhoria real no seu relacionamento, 
              devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container-app text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-bold font-display text-neutral-900 mb-6">
              Não deixe seu relacionamento chegar ao fim
            </h2>
            <p className="text-xl text-neutral-600 mb-10">
              A cada dia que passa sem agir, vocês se distanciam mais. 
              <strong className="text-neutral-800"> Comece hoje mesmo</strong> e veja a diferença em 7 dias.
            </p>

            <div className="card bg-gradient-to-r from-rose-50 to-primary-50 border-2 border-rose-200 mb-10">
              <h3 className="text-2xl font-bold font-display text-neutral-900 mb-6">✨ Comece Gratuitamente</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center mb-8">
                <div className="bg-white rounded-xl p-4 shadow-soft">
                  <span className="text-3xl block mb-2">🆓</span>
                  <p className="font-semibold text-neutral-900">7 dias grátis</p>
                  <p className="text-sm text-neutral-600">Teste sem compromisso</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-soft">
                  <span className="text-3xl block mb-2">🔒</span>
                  <p className="font-semibold text-neutral-900">100% Privado</p>
                  <p className="text-sm text-neutral-600">Suas conversas são seguras</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-soft">
                  <span className="text-3xl block mb-2">📱</span>
                  <p className="font-semibold text-neutral-900">Acesso total</p>
                  <p className="text-sm text-neutral-600">Web, mobile e tablet</p>
                </div>
              </div>
            </div>

            <Link
              to="/auth?mode=signup"
              className="btn-primary text-xl px-12 py-5 shadow-glow mb-6 inline-block"
            >
              🚀 Salvar meu relacionamento agora
            </Link>

            <p className="text-sm text-neutral-500">
              Cancele quando quiser • Sem compromisso • Resultados em 7 dias
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12">
        <div className="container-app">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-primary-500 rounded-xl flex items-center justify-center shadow-soft">
                <span className="text-white text-xl">💕</span>
              </div>
              <span className="text-2xl font-bold font-display">CoupleX AI</span>
            </div>
            <p className="text-neutral-400 mb-6">
              Salvando relacionamentos com inteligência artificial especializada
            </p>
            <div className="flex flex-wrap justify-center space-x-6 text-sm text-neutral-400 mb-6">
              <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-white transition-colors">Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Contato</a>
              <a href="#" className="hover:text-white transition-colors">Suporte</a>
            </div>
            <p className="text-xs text-neutral-500">
              © 2024 CoupleX AI. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </Layout>
  );
}
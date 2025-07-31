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
                <span className="text-rose-600 text-sm font-medium">💕 Terapeuta de Casais com IA</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-display text-neutral-900 mb-6 leading-tight">
                A conexão <span className="bg-gradient-to-r from-rose-500 to-primary-500 bg-clip-text text-transparent">esfriou</span>?
                <br />
                <span className="bg-gradient-to-r from-primary-500 to-rose-500 bg-clip-text text-transparent">CoupleX AI</span> te ajuda a reacender
              </h1>
              
              <p className="text-xl sm:text-2xl text-neutral-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                Recupere a intimidade, melhore a comunicação e fortaleça seu relacionamento com nossa IA especializada em terapia de casais.
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
                  💡 Conhecer a IA Terapeuta
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
              Como o CoupleX AI vai salvar seu relacionamento
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Nossa IA terapeuta especializada em relacionamentos oferece orientação 24/7, 
              personalizada para os problemas específicos do seu casal.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-primary-500 rounded-xl flex items-center justify-center shadow-soft">
                  <span className="text-white text-xl">🧠</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display text-neutral-900 mb-2">
                    Terapeuta Digital Especializada
                  </h3>
                  <p className="text-neutral-700">
                    Análise emocional inteligente que identifica padrões destrutivos na comunicação e oferece soluções personalizadas.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-rose-500 rounded-xl flex items-center justify-center shadow-soft">
                  <span className="text-white text-xl">💝</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display text-neutral-900 mb-2">
                    Conselhos Personalizados
                  </h3>
                  <p className="text-neutral-700">
                    Estratégias específicas para o seu tipo de relacionamento, baseadas em milhares de casos de sucesso.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-primary-500 rounded-xl flex items-center justify-center shadow-soft">
                  <span className="text-white text-xl">🌙</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display text-neutral-900 mb-2">
                    Disponível 24/7
                  </h3>
                  <p className="text-neutral-700">
                    Ajuda imediata quando mais precisam, sem horário marcado ou lista de espera.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-rose-500 rounded-xl flex items-center justify-center shadow-soft">
                  <span className="text-white text-xl">🆘</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display text-neutral-900 mb-2">
                    Protocolo de Crise
                  </h3>
                  <p className="text-neutral-700">
                    Processo estruturado para reconciliação em momentos críticos do relacionamento.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="card bg-white shadow-glow border-2 border-rose-100">
                <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-neutral-100">
                  <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-primary-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🤖</span>
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">Terapeuta IA</p>
                    <p className="text-xs text-neutral-500">Online agora</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-neutral-50 rounded-2xl p-4">
                    <p className="text-neutral-700 text-sm">
                      "Percebo que vocês estão passando por um momento difícil. Vou te ensinar uma técnica que já ajudou milhares de casais a se reconectarem..."
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span>Agora</span>
                    <span className="flex items-center space-x-1">
                      <span>💝</span>
                      <span>Resposta personalizada</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
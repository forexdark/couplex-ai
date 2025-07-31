import Layout from '../components/Layout';
import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <Layout showHeader>
      <div className="container-app py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-display text-neutral-900 mb-4">
            Bem-vindo, {user?.displayName || 'Usuário'}! 💕
          </h1>
          <p className="text-xl text-neutral-600">
            Seu dashboard personalizado está sendo preparado...
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Placeholder Cards */}
          {[
            {
              icon: '📝',
              title: 'Diário Emocional',
              description: 'Registre seus sentimentos e receba conselhos da IA',
              color: 'from-purple-500 to-pink-500'
            },
            {
              icon: '💭',
              title: 'Check-in Diário',
              description: 'Como você e seu parceiro estão se sentindo hoje?',
              color: 'from-blue-500 to-cyan-500'
            },
            {
              icon: '📅',
              title: 'Calendário do Casal',
              description: 'Organize encontros e datas especiais',
              color: 'from-green-500 to-teal-500'
            },
            {
              icon: '🎯',
              title: 'Metas do Relacionamento',
              description: 'Definam objetivos juntos e acompanhem o progresso',
              color: 'from-orange-500 to-red-500'
            },
            {
              icon: '📄',
              title: 'Notas Importantes',
              description: 'Guarde memórias e reflexões importantes',
              color: 'from-indigo-500 to-purple-500'
            },
            {
              icon: '🆘',
              title: 'Modo Crise',
              description: 'Protocolo de ajuda para momentos difíceis',
              color: 'from-red-500 to-pink-500'
            }
          ].map((feature, index) => (
            <div key={index} className="card hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1">
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center shadow-soft mb-4`}>
                <span className="text-white text-2xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-bold font-display text-neutral-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-neutral-600 mb-4">
                {feature.description}
              </p>
              <button className="btn-secondary text-sm w-full">
                Em breve
              </button>
            </div>
          ))}
        </div>

        {/* Welcome Message */}
        <div className="card bg-gradient-to-r from-rose-50 to-primary-50 border-2 border-rose-200 mt-12 text-center max-w-2xl mx-auto">
          <div className="text-4xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold font-display text-neutral-900 mb-4">
            Parabéns por dar o primeiro passo!
          </h2>
          <p className="text-neutral-700 mb-6">
            Você acabou de entrar na jornada para fortalecer seu relacionamento. 
            Nossa IA especializada está pronta para te ajudar 24/7.
          </p>
          <div className="bg-white rounded-xl p-4 mb-4">
            <p className="text-sm text-neutral-600">
              💡 <strong>Dica:</strong> Comece registrando como você está se sentindo hoje. 
              Quanto mais você usar, melhores serão os conselhos personalizados!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
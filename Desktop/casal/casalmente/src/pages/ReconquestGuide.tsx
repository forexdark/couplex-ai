import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useGamification } from '../contexts/GamificationContext';
import Layout from '../components/Layout';

export default function ReconquestGuide() {
  const { t } = useLanguage();
  const { addPoints } = useGamification();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const guideSteps = [
    {
      title: "Análise Honesta da Situação",
      icon: "🔍",
      content: [
        "Identifique as verdadeiras causas do fim do relacionamento",
        "Assuma sua parte de responsabilidade sem se culpar excessivamente",
        "Analise se a reconquista é realmente o que você quer",
        "Avalie se há possibilidade real de mudança e crescimento",
        "Considere o tempo necessário para cicatrização das feridas"
      ],
      exercise: "Escreva uma carta para si mesmo explicando o que realmente aconteceu",
      points: 60
    },
    {
      title: "Período de Reflexão e Crescimento",
      icon: "🌱",
      content: [
        "Mantenha distância para permitir que as emoções se acalmem",
        "Trabalhe em seus pontos fracos identificados na análise",
        "Busque terapia ou aconselhamento se necessário",
        "Desenvolva novas habilidades e interesses",
        "Fortaleça outras relações importantes em sua vida"
      ],
      exercise: "Crie um plano de 30 dias para seu desenvolvimento pessoal",
      points: 80
    },
    {
      title: "Reconstruindo sua Autoestima",
      icon: "💪",
      content: [
        "Foque em suas qualidades e conquistas pessoais",
        "Pratique atividades que tragam alegria e satisfação",
        "Cuide da sua saúde física e mental",
        "Reconecte-se com amigos e família",
        "Celebre pequenas vitórias diárias"
      ],
      exercise: "Liste 10 coisas que você ama em si mesmo",
      points: 70
    },
    {
      title: "Avaliando o Momento Certo",
      icon: "⏰",
      content: [
        "Aguarde que as emoções intensas diminuam de ambos os lados",
        "Observe sinais de que a pessoa pode estar aberta ao diálogo",
        "Considere eventos especiais ou datas significativas",
        "Certifique-se de que suas motivações são puras",
        "Tenha um plano, mas seja flexível"
      ],
      exercise: "Defina 3 indicadores que mostram que é o momento certo para agir",
      points: 75
    },
    {
      title: "O Primeiro Contato Estratégico",
      icon: "📞",
      content: [
        "Comece com uma mensagem simples e respeitosa",
        "Evite ser dramático ou pressionar para encontros imediatos",
        "Mostre que você mudou através de ações, não palavras",
        "Seja genuíno e admita seus erros sem se diminuir",
        "Respeite se a pessoa não estiver pronta para conversar"
      ],
      exercise: "Pratique sua mensagem inicial com um amigo de confiança",
      points: 85
    },
    {
      title: "Demonstrando Mudança Genuína",
      icon: "🦋",
      content: [
        "Mostre através de ações que você trabalhou seus problemas",
        "Compartilhe de forma sutil seu crescimento pessoal",
        "Evite prometer mudanças - demonstre que já mudou",
        "Seja consistente em seu novo comportamento",
        "Mantenha a humildade e paciência no processo"
      ],
      exercise: "Documente 5 mudanças concretas que você fez",
      points: 90
    },
    {
      title: "Reconstruindo a Confiança",
      icon: "🤝",
      content: [
        "Seja transparente em suas intenções e sentimentos",
        "Cumpra todas as promessas, por menores que sejam",
        "Dê espaço e tempo para que a confiança seja reconstruída",
        "Aceite que o processo pode ser lento e ter retrocessos",
        "Demonstre que você valoriza a pessoa além do relacionamento"
      ],
      exercise: "Identifique 3 formas específicas de demonstrar confiabilidade",
      points: 95
    },
    {
      title: "Criando uma Nova Dinâmica",
      icon: "🌟",
      content: [
        "Não tente voltar ao que era antes - construam algo novo",
        "Estabeleçam novos padrões de comunicação e resolução de conflitos",
        "Criem novas memórias positivas juntos",
        "Definam expectativas claras e realistas",
        "Celebrem os pequenos progressos no caminho"
      ],
      exercise: "Planeje 3 atividades novas que vocês nunca fizeram juntos",
      points: 100
    },
    {
      title: "Lidando com a Possível Rejeição",
      icon: "💔",
      content: [
        "Aceite que nem sempre é possível reconquistar alguém",
        "Respeite a decisão da outra pessoa, mesmo que doa",
        "Use a experiência como aprendizado para futuros relacionamentos",
        "Mantenha sua dignidade e não implore ou insista",
        "Foque em seu bem-estar e continue crescendo"
      ],
      exercise: "Escreva uma carta de gratidão pelos momentos bons vividos",
      points: 80
    }
  ];

  const handleStepComplete = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex]);
      addPoints(guideSteps[stepIndex].points, `Etapa concluída: ${guideSteps[stepIndex].title}`);
    }
  };

  const nextStep = () => {
    if (currentStep < guideSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentGuideStep = guideSteps[currentStep];
  const isStepCompleted = completedSteps.includes(currentStep);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-800 mb-4">
            {t('guides.reconquestTitle')}
          </h1>
          <p className="text-lg text-neutral-600">
            Estratégias inteligentes para reconquistar um amor perdido
          </p>
          
          {/* Progress Bar */}
          <div className="mt-6 bg-neutral-200 rounded-full h-3 max-w-md mx-auto">
            <div 
              className="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(completedSteps.length / guideSteps.length) * 100}%` }}
            />
          </div>
          <p className="text-sm text-neutral-500 mt-2">
            {completedSteps.length} de {guideSteps.length} etapas concluídas
          </p>
        </div>

        {/* Warning Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
          <div className="flex items-start space-x-3">
            <div className="text-amber-500 text-xl">⚠️</div>
            <div>
              <h3 className="font-semibold text-amber-800 mb-1">Importante</h3>
              <p className="text-amber-700 text-sm">
                A reconquista deve ser baseada em mudança genuína e respeito mútuo. 
                Nunca use manipulação ou pressão. Se a pessoa não demonstrar interesse, 
                respeite sua decisão.
              </p>
            </div>
          </div>
        </div>

        {/* Step Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {guideSteps.map((step, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all ${
                  currentStep === index
                    ? 'bg-amber-500 text-white scale-110'
                    : completedSteps.includes(index)
                    ? 'bg-green-500 text-white'
                    : 'bg-neutral-200 text-neutral-600 hover:bg-neutral-300'
                }`}
              >
                {completedSteps.includes(index) ? '✅' : step.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Current Step Content */}
        <div className="bg-white rounded-2xl shadow-soft p-8 mb-6">
          <div className="flex items-center mb-6">
            <div className="text-4xl mr-4">{currentGuideStep.icon}</div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-800">
                {currentGuideStep.title}
              </h2>
              <p className="text-sm text-amber-600">
                Etapa {currentStep + 1} de {guideSteps.length}
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            {currentGuideStep.content.map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-neutral-700">{item}</p>
              </div>
            ))}
          </div>

          {/* Exercise */}
          <div className="bg-amber-50 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-amber-800 mb-2 flex items-center">
              <span className="mr-2">📝</span>
              Exercício de Reflexão
            </h3>
            <p className="text-amber-700">{currentGuideStep.exercise}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Anterior
            </button>

            <button
              onClick={() => handleStepComplete(currentStep)}
              disabled={isStepCompleted}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                isStepCompleted
                  ? 'bg-green-500 text-white cursor-not-allowed'
                  : 'bg-amber-500 hover:bg-amber-600 text-white'
              }`}
            >
              {isStepCompleted ? (
                <>
                  <span className="mr-2">✅</span>
                  Concluído (+{currentGuideStep.points} pontos)
                </>
              ) : (
                <>
                  Marcar como Concluído (+{currentGuideStep.points} pontos)
                </>
              )}
            </button>

            <button
              onClick={nextStep}
              disabled={currentStep === guideSteps.length - 1}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Próximo →
            </button>
          </div>
        </div>

        {/* Summary Card */}
        {completedSteps.length === guideSteps.length && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-soft p-8 text-white text-center">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold mb-2">Parabéns pela jornada!</h3>
            <p className="text-lg opacity-90 mb-4">
              Você completou todas as etapas do guia de reconquista!
            </p>
            <p className="text-sm opacity-80 mb-4">
              Total de pontos ganhos: {guideSteps.reduce((sum, step) => sum + step.points, 0)}
            </p>
            <p className="text-sm opacity-90">
              Lembre-se: o crescimento pessoal que você adquiriu neste processo 
              é valioso independentemente do resultado da reconquista.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
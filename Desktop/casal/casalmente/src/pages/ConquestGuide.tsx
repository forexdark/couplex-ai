import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useGamification } from '../contexts/GamificationContext';
import Layout from '../components/Layout';

export default function ConquestGuide() {
  const { t } = useLanguage();
  const { addPoints } = useGamification();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const guideSteps = [
    {
      title: "Autoconhecimento: A Base de Tudo",
      icon: "🪞",
      content: [
        "Antes de conquistar alguém, você precisa se conhecer profundamente",
        "Identifique seus valores, interesses e objetivos de vida",
        "Trabalhe sua autoestima e confiança interior",
        "Desenvolva seus talentos e paixões pessoais",
        "Pratique o amor próprio e autocuidado diário"
      ],
      exercise: "Liste 5 qualidades suas e 3 aspectos que gostaria de melhorar",
      points: 50
    },
    {
      title: "Construindo sua Melhor Versão",
      icon: "💪",
      content: [
        "Cuide da sua aparência física com exercícios e alimentação saudável",
        "Desenvolva habilidades de comunicação e escuta ativa",
        "Cultive hobbies interessantes e enriquecedores",
        "Mantenha um círculo social diverso e positivo",
        "Invista em seu crescimento profissional e intelectual"
      ],
      exercise: "Escolha 1 nova atividade para desenvolver nos próximos 30 dias",
      points: 75
    },
    {
      title: "Identificando o Perfil Ideal",
      icon: "🎯",
      content: [
        "Defina claramente que tipo de pessoa você busca",
        "Considere valores, objetivos de vida e compatibilidade",
        "Identifique onde essas pessoas costumam frequentar",
        "Seja realista sobre suas expectativas",
        "Mantenha-se aberto a surpresas positivas"
      ],
      exercise: "Crie uma lista das 10 qualidades mais importantes no seu parceiro ideal",
      points: 60
    },
    {
      title: "Criando Oportunidades de Encontro",
      icon: "🌟",
      content: [
        "Participe de eventos e atividades do seu interesse",
        "Use aplicativos de relacionamento de forma estratégica",
        "Aceite convites sociais e seja mais sociável",
        "Pratique esportes ou atividades em grupo",
        "Voluntarie-se em causas que você acredita"
      ],
      exercise: "Planeje 3 atividades sociais para as próximas 2 semanas",
      points: 80
    },
    {
      title: "A Arte da Primeira Impressão",
      icon: "✨",
      content: [
        "Sorria genuinamente e mantenha contato visual",
        "Demonstre interesse genuíno na pessoa",
        "Faça perguntas abertas e escute atentamente",
        "Seja autêntico, não tente ser alguém que não é",
        "Mantenha um tom de conversa leve e positivo"
      ],
      exercise: "Pratique iniciar 3 conversas casuais esta semana",
      points: 70
    },
    {
      title: "Desenvolvendo a Conexão",
      icon: "💫",
      content: [
        "Encontre pontos em comum e interesses compartilhados",
        "Use humor de forma inteligente e respeitosa",
        "Demonstre vulnerabilidade apropriada",
        "Respeite o espaço e tempo da outra pessoa",
        "Seja consistente em suas ações e palavras"
      ],
      exercise: "Identifique 3 formas de aprofundar uma conversa interessante",
      points: 85
    },
    {
      title: "Navegando os Primeiros Encontros",
      icon: "🌹",
      content: [
        "Planeje encontros criativos e memoráveis",
        "Mantenha o foco na pessoa, não no celular",
        "Divida as despesas ou alterne quem paga",
        "Seja pontual e confiável",
        "Termine o encontro querendo mais"
      ],
      exercise: "Planeje 5 ideias criativas para primeiros encontros",
      points: 90
    },
    {
      title: "Construindo Intimidade Emocional",
      icon: "💖",
      content: [
        "Compartilhe suas experiências e histórias pessoais",
        "Demonstre empatia e compreensão",
        "Apoie os sonhos e objetivos da pessoa",
        "Crie momentos especiais e únicos juntos",
        "Seja paciente com o desenvolvimento natural da relação"
      ],
      exercise: "Prepare 3 histórias pessoais significativas para compartilhar",
      points: 95
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
            {t('guides.conquestTitle')}
          </h1>
          <p className="text-lg text-neutral-600">
            Guia completo para encontrar e conquistar um novo amor
          </p>
          
          {/* Progress Bar */}
          <div className="mt-6 bg-neutral-200 rounded-full h-3 max-w-md mx-auto">
            <div 
              className="bg-gradient-to-r from-rose-500 to-primary-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(completedSteps.length / guideSteps.length) * 100}%` }}
            />
          </div>
          <p className="text-sm text-neutral-500 mt-2">
            {completedSteps.length} de {guideSteps.length} etapas concluídas
          </p>
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
                    ? 'bg-primary-500 text-white scale-110'
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
              <p className="text-sm text-primary-600">
                Etapa {currentStep + 1} de {guideSteps.length}
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            {currentGuideStep.content.map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-neutral-700">{item}</p>
              </div>
            ))}
          </div>

          {/* Exercise */}
          <div className="bg-primary-50 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-primary-800 mb-2 flex items-center">
              <span className="mr-2">📝</span>
              Exercício Prático
            </h3>
            <p className="text-primary-700">{currentGuideStep.exercise}</p>
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
                  : 'bg-primary-500 hover:bg-primary-600 text-white'
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
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold mb-2">Parabéns!</h3>
            <p className="text-lg opacity-90 mb-4">
              Você concluiu todas as etapas do guia de conquista!
            </p>
            <p className="text-sm opacity-80">
              Total de pontos ganhos: {guideSteps.reduce((sum, step) => sum + step.points, 0)}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
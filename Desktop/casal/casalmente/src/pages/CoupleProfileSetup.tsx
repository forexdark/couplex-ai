import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { usePersonalizedContent, CoupleType, RelationshipStage, CommunicationStyle } from '../contexts/PersonalizedContentContext';
import { useGamification } from '../contexts/GamificationContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function CoupleProfileSetup() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { coupleProfile, updateProfile, getProfileCompleteness } = usePersonalizedContent();
  const { addPoints, unlockAchievement } = useGamification();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    type: 'heterosexual_dating' as CoupleType,
    stage: 'new' as RelationshipStage,
    communicationStyle: 'direct' as CommunicationStyle,
    relationshipDuration: 0,
    livingTogether: false,
    hasChildren: false,
    primaryChallenges: [] as string[],
    strengths: [] as string[],
    goals: [] as string[],
    culturalBackground: [] as string[],
    languages: [] as string[],
    specialCircumstances: [] as string[]
  });

  const totalSteps = 6;

  useEffect(() => {
    if (coupleProfile) {
      setFormData(prev => ({ ...prev, ...coupleProfile }));
    }
  }, [coupleProfile]);

  const coupleTypes = [
    { value: 'heterosexual_dating', label: 'Casal Heterossexual - Namorando', icon: '👫' },
    { value: 'heterosexual_engaged', label: 'Casal Heterossexual - Noivos', icon: '💍' },
    { value: 'heterosexual_married', label: 'Casal Heterossexual - Casados', icon: '💒' },
    { value: 'homosexual_male_dating', label: 'Casal Gay - Namorando', icon: '👬' },
    { value: 'homosexual_male_engaged', label: 'Casal Gay - Noivos', icon: '💍' },
    { value: 'homosexual_male_married', label: 'Casal Gay - Casados', icon: '💒' },
    { value: 'homosexual_female_dating', label: 'Casal Lésbico - Namorando', icon: '👭' },
    { value: 'homosexual_female_engaged', label: 'Casal Lésbico - Noivos', icon: '💍' },
    { value: 'homosexual_female_married', label: 'Casal Lésbico - Casados', icon: '💒' },
    { value: 'long_distance', label: 'Relacionamento à Distância', icon: '🌍' },
    { value: 'new_parents', label: 'Novos Pais', icon: '👶' },
    { value: 'second_marriage', label: 'Segundo Casamento', icon: '💕' },
    { value: 'polyamorous', label: 'Relacionamento Poliamoroso', icon: '💞' },
    { value: 'age_gap', label: 'Diferença de Idade Significativa', icon: '⚖️' },
    { value: 'intercultural', label: 'Casal Intercultural', icon: '🌐' },
    { value: 'blended_family', label: 'Família Mista', icon: '👨‍👩‍👧‍👦' }
  ];

  const relationshipStages = [
    { value: 'new', label: 'Relacionamento Novo', description: 'Menos de 1 ano', icon: '🌱' },
    { value: 'established', label: 'Relacionamento Estabelecido', description: '1-5 anos', icon: '🌳' },
    { value: 'challenging', label: 'Passando por Desafios', description: 'Enfrentando dificuldades', icon: '⚡' },
    { value: 'thriving', label: 'Relacionamento Próspero', description: 'Muito bem atualmente', icon: '🌟' },
    { value: 'recovering', label: 'Em Recuperação', description: 'Superando uma crise', icon: '🔄' }
  ];

  const communicationStyles = [
    { value: 'direct', label: 'Direto', description: 'Gosta de falar claramente e objetivamente', icon: '🎯' },
    { value: 'gentle', label: 'Suave', description: 'Prefere abordagens delicadas e cuidadosas', icon: '🕊️' },
    { value: 'analytical', label: 'Analítico', description: 'Gosta de pensar e planejar antes de falar', icon: '🧠' },
    { value: 'emotional', label: 'Emocional', description: 'Expressa sentimentos de forma intensa', icon: '💖' },
    { value: 'practical', label: 'Prático', description: 'Foca em soluções e resultados', icon: '🔧' }
  ];

  const commonChallenges = [
    'Comunicação', 'Intimidade física', 'Intimidade emocional', 'Tempo de qualidade',
    'Diferenças financeiras', 'Família e sogros', 'Ciúmes', 'Confiança', 
    'Divisão de tarefas', 'Futuro e planos', 'Diferenças de personalidade',
    'Trabalho e carreira', 'Amizades', 'Conflitos não resolvidos'
  ];

  const commonStrengths = [
    'Comunicação aberta', 'Confiança mútua', 'Apoio emocional', 'Diversão juntos',
    'Valores similares', 'Objetivos compartilhados', 'Respeito mútuo', 'Química física',
    'Crescimento pessoal', 'Flexibilidade', 'Senso de humor', 'Lealdade',
    'Aventura e espontaneidade', 'Estabilidade emocional'
  ];

  const relationshipGoals = [
    'Melhorar comunicação', 'Aumentar intimidade', 'Resolver conflitos melhor',
    'Mais tempo de qualidade', 'Crescer juntos', 'Planejar o futuro',
    'Manter romance vivo', 'Equilibrar vida pessoal e relacionamento',
    'Superar desafios passados', 'Fortalecer confiança', 'Ser mais pacientes',
    'Apoiar sonhos individuais', 'Criar tradições juntos', 'Manter independência saudável'
  ];

  const handleArrayToggle = (field: keyof typeof formData, value: string) => {
    const currentArray = formData[field] as string[];
    setFormData(prev => ({
      ...prev,
      [field]: currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value]
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    updateProfile(formData);
    
    // Gamificação
    const completeness = getProfileCompleteness();
    if (completeness >= 100) {
      addPoints(100, 'Perfil do casal 100% completo');
      unlockAchievement('profile_completed');
    } else if (completeness >= 70) {
      addPoints(50, 'Perfil do casal quase completo');
    }

    navigate('/dashboard');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-neutral-800 mb-2">
                Tipo de Relacionamento
              </h2>
              <p className="text-neutral-600">
                Selecione a opção que melhor descreve seu relacionamento
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {coupleTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setFormData(prev => ({ ...prev, type: type.value }))}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    formData.type === type.value
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{type.icon}</div>
                    <div>
                      <div className="font-semibold text-neutral-800">
                        {type.label}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-neutral-800 mb-2">
                Estágio do Relacionamento
              </h2>
              <p className="text-neutral-600">
                Como você descreveria o momento atual do seu relacionamento?
              </p>
            </div>

            <div className="space-y-4">
              {relationshipStages.map((stage) => (
                <button
                  key={stage.value}
                  onClick={() => setFormData(prev => ({ ...prev, stage: stage.value }))}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    formData.stage === stage.value
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{stage.icon}</div>
                    <div>
                      <div className="font-semibold text-neutral-800">
                        {stage.label}
                      </div>
                      <div className="text-sm text-neutral-600">
                        {stage.description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-neutral-800 mb-2">
                Estilo de Comunicação
              </h2>
              <p className="text-neutral-600">
                Como vocês preferem se comunicar em geral?
              </p>
            </div>

            <div className="space-y-4">
              {communicationStyles.map((style) => (
                <button
                  key={style.value}
                  onClick={() => setFormData(prev => ({ ...prev, communicationStyle: style.value }))}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    formData.communicationStyle === style.value
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{style.icon}</div>
                    <div>
                      <div className="font-semibold text-neutral-800">
                        {style.label}
                      </div>
                      <div className="text-sm text-neutral-600">
                        {style.description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-neutral-800 mb-2">
                Informações Gerais
              </h2>
              <p className="text-neutral-600">
                Algumas informações para personalizar ainda mais sua experiência
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Há quanto tempo estão juntos? (em meses)
                </label>
                <input
                  type="number"
                  value={formData.relationshipDuration}
                  onChange={(e) => setFormData(prev => ({ ...prev, relationshipDuration: Number(e.target.value) }))}
                  className="input-field"
                  min="0"
                  max="600"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="livingTogether"
                    checked={formData.livingTogether}
                    onChange={(e) => setFormData(prev => ({ ...prev, livingTogether: e.target.checked }))}
                    className="w-5 h-5 text-primary-600 rounded"
                  />
                  <label htmlFor="livingTogether" className="text-neutral-700">
                    Moram juntos
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="hasChildren"
                    checked={formData.hasChildren}
                    onChange={(e) => setFormData(prev => ({ ...prev, hasChildren: e.target.checked }))}
                    className="w-5 h-5 text-primary-600 rounded"
                  />
                  <label htmlFor="hasChildren" className="text-neutral-700">
                    Têm filhos (próprios ou do relacionamento)
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-neutral-800 mb-2">
                Desafios e Forças
              </h2>
              <p className="text-neutral-600">
                Selecione os principais desafios e pontos fortes do seu relacionamento
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="font-semibold text-neutral-800 mb-4">
                  Principais Desafios (selecione até 5)
                </h3>
                <div className="flex flex-wrap gap-2">
                  {commonChallenges.map((challenge) => (
                    <button
                      key={challenge}
                      onClick={() => handleArrayToggle('primaryChallenges', challenge)}
                      disabled={formData.primaryChallenges.length >= 5 && !formData.primaryChallenges.includes(challenge)}
                      className={`px-3 py-2 rounded-full text-sm transition-all ${
                        formData.primaryChallenges.includes(challenge)
                          ? 'bg-red-500 text-white'
                          : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 disabled:opacity-50'
                      }`}
                    >
                      {challenge}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-neutral-800 mb-4">
                  Principais Forças (selecione até 5)
                </h3>
                <div className="flex flex-wrap gap-2">
                  {commonStrengths.map((strength) => (
                    <button
                      key={strength}
                      onClick={() => handleArrayToggle('strengths', strength)}
                      disabled={formData.strengths.length >= 5 && !formData.strengths.includes(strength)}
                      className={`px-3 py-2 rounded-full text-sm transition-all ${
                        formData.strengths.includes(strength)
                          ? 'bg-green-500 text-white'
                          : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 disabled:opacity-50'
                      }`}
                    >
                      {strength}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-neutral-800 mb-2">
                Objetivos do Relacionamento
              </h2>
              <p className="text-neutral-600">
                O que vocês gostariam de melhorar ou alcançar juntos?
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-neutral-800 mb-4">
                Selecione seus principais objetivos (até 5)
              </h3>
              <div className="flex flex-wrap gap-2">
                {relationshipGoals.map((goal) => (
                  <button
                    key={goal}
                    onClick={() => handleArrayToggle('goals', goal)}
                    disabled={formData.goals.length >= 5 && !formData.goals.includes(goal)}
                    className={`px-3 py-2 rounded-full text-sm transition-all ${
                      formData.goals.includes(goal)
                        ? 'bg-primary-500 text-white'
                        : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 disabled:opacity-50'
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-800 mb-4">
            Configuração do Perfil do Casal
          </h1>
          <p className="text-lg text-neutral-600">
            Personalize sua experiência para receber conteúdo mais relevante
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-neutral-600">
              Etapa {currentStep} de {totalSteps}
            </span>
            <span className="text-sm text-neutral-600">
              {Math.round((currentStep / totalSteps) * 100)}%
            </span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <div
              className="bg-primary-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Anterior
          </button>
          
          <div className="flex items-center space-x-2">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index + 1 <= currentStep ? 'bg-primary-500' : 'bg-neutral-300'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={handleNext}
            className="btn-primary"
          >
            {currentStep === totalSteps ? 'Finalizar' : 'Próximo →'}
          </button>
        </div>
      </div>
    </Layout>
  );
}
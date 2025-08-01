import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../hooks/useAuth';

interface CrisisAssessment {
  conflictType: string;
  intensity: number;
  duration: string;
  trigger: string;
  emotions: string[];
  previous: boolean;
  communication: string;
}

export default function CrisisMode() {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [assessment, setAssessment] = useState<CrisisAssessment>({
    conflictType: '',
    intensity: 5,
    duration: '',
    trigger: '',
    emotions: [],
    previous: false,
    communication: ''
  });
  const [recommendations, setRecommendations] = useState<any>(null);

  const conflictTypes = [
    { value: 'argument', label: 'Discussão/Briga', emoji: '🗣️' },
    { value: 'misunderstanding', label: 'Mal-entendido', emoji: '🤔' },
    { value: 'betrayal', label: 'Traição/Desconfiança', emoji: '💔' },
    { value: 'distance', label: 'Distanciamento', emoji: '🚶‍♂️' },
    { value: 'jealousy', label: 'Ciúmes', emoji: '👁️' },
    { value: 'family', label: 'Problemas familiares', emoji: '👨‍👩‍👧‍👦' },
    { value: 'intimacy', label: 'Problemas de intimidade', emoji: '💕' },
    { value: 'other', label: 'Outro', emoji: '❓' }
  ];

  const emotions = [
    { value: 'angry', label: 'Raiva', emoji: '😡' },
    { value: 'sad', label: 'Tristeza', emoji: '😢' },
    { value: 'hurt', label: 'Magoado(a)', emoji: '💔' },
    { value: 'confused', label: 'Confuso(a)', emoji: '😕' },
    { value: 'frustrated', label: 'Frustrado(a)', emoji: '😤' },
    { value: 'disappointed', label: 'Decepcionado(a)', emoji: '😞' },
    { value: 'anxious', label: 'Ansioso(a)', emoji: '😰' },
    { value: 'lonely', label: 'Sozinho(a)', emoji: '😔' }
  ];

  const generateRecommendations = () => {
    const { conflictType, intensity, emotions, communication } = assessment;
    
    let immediateActions = [];
    let mediumTerm = [];
    let longTerm = [];
    let avoidActions = [];

    // Ações imediatas baseadas na intensidade
    if (intensity >= 8) {
      immediateActions = [
        "🌬️ Faça 5 respirações profundas antes de qualquer ação",
        "⏰ Peça um tempo de 30 minutos para se acalmar",
        "🚶‍♂️ Saia para uma caminhada rápida se possível",
        "💧 Beba água e cuide do básico (comer, descansar)"
      ];
    } else if (intensity >= 5) {
      immediateActions = [
        "🤝 Procure seu parceiro para uma conversa calma",
        "💭 Reflita sobre o que realmente está incomodando",
        "📝 Escreva seus sentimentos antes de falar",
        "❤️ Lembre-se do amor que vocês sentem um pelo outro"
      ];
    } else {
      immediateActions = [
        "💬 Converse abertamente sobre o que aconteceu",
        "🤗 Ofereça um abraço de reconciliação",
        "☕ Façam algo relaxante juntos",
        "💕 Reafirmem o compromisso um com o outro"
      ];
    }

    // Ações baseadas no tipo de conflito
    switch (conflictType) {
      case 'argument':
        mediumTerm = [
          "🗣️ Pratiquem a comunicação não-violenta",
          "📋 Estabeleçam regras para discussões futuras",
          "🤝 Definam um sinal para 'pausa' quando os ânimos esquentarem"
        ];
        break;
      case 'misunderstanding':
        mediumTerm = [
          "💬 Façam perguntas esclarecedoras antes de assumir",
          "🔄 Repitam o que entenderam para confirmar",
          "📱 Evitem discussões importantes por mensagem"
        ];
        break;
      case 'betrayal':
        mediumTerm = [
          "🛡️ Busquem ajuda profissional - este é um caso sério",
          "📝 Conversem sobre limites e expectativas",
          "⏰ Deem tempo para a cura emocional"
        ];
        break;
      case 'distance':
        mediumTerm = [
          "📅 Agendem tempo de qualidade obrigatório",
          "💕 Retomem atividades que faziam juntos",
          "🎯 Definam uma meta comum para trabalhar juntos"
        ];
        break;
    }

    // Ações de longo prazo
    longTerm = [
      "📚 Leiam um livro sobre relacionamentos juntos",
      "💑 Considerem terapia de casal preventiva",
      "🎯 Trabalhem nas metas do relacionamento",
      "🔄 Façam check-ins regulares sobre como está o relacionamento"
    ];

    // O que evitar
    if (emotions.includes('angry')) {
      avoidActions.push("❌ Não tome decisões importantes quando estiver com raiva");
    }
    if (intensity >= 7) {
      avoidActions.push("❌ Evite discussões até se acalmar completamente");
      avoidActions.push("❌ Não use palavras como 'sempre' ou 'nunca'");
    }
    avoidActions.push("❌ Não envolva outras pessoas no conflito (família/amigos)");
    avoidActions.push("❌ Evite trazer problemas do passado");

    return { immediateActions, mediumTerm, longTerm, avoidActions };
  };

  const handleEmotionToggle = (emotion: string) => {
    setAssessment(prev => ({
      ...prev,
      emotions: prev.emotions.includes(emotion)
        ? prev.emotions.filter(e => e !== emotion)
        : [...prev.emotions, emotion]
    }));
  };

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      const recs = generateRecommendations();
      setRecommendations(recs);
      setStep(7);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const restartAssessment = () => {
    setStep(1);
    setAssessment({
      conflictType: '',
      intensity: 5,
      duration: '',
      trigger: '',
      emotions: [],
      previous: false,
      communication: ''
    });
    setRecommendations(null);
  };

  return (
    <Layout showHeader>
      <div className="container-app py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-display text-neutral-900 mb-2">
            Modo Crise 🆘
          </h1>
          <p className="text-neutral-600">
            Vamos te ajudar a navegar por este momento difícil com orientações personalizadas.
          </p>
        </div>

        {step <= 6 && (
          <div className="card max-w-2xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-neutral-700">Avaliação da Situação</span>
                <span className="text-sm font-bold text-rose-600">Passo {step} de 6</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-rose-500 to-primary-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(step / 6) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Step 1: Conflict Type */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-neutral-900 text-center">
                  Que tipo de situação vocês estão enfrentando?
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {conflictTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setAssessment({...assessment, conflictType: type.value})}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        assessment.conflictType === type.value
                          ? 'border-rose-300 bg-rose-50'
                          : 'border-neutral-200 hover:border-rose-200'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{type.emoji}</span>
                        <span className="font-medium text-neutral-800">{type.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Intensity */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-neutral-900 text-center">
                  Em uma escala de 1 a 10, qual a intensidade da situação?
                </h2>
                <div className="text-center">
                  <div className="text-6xl font-bold text-rose-600 mb-4">{assessment.intensity}</div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={assessment.intensity}
                    onChange={(e) => setAssessment({...assessment, intensity: parseInt(e.target.value)})}
                    className="w-full h-3 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-neutral-500 mt-2">
                    <span>1 - Leve</span>
                    <span>10 - Muito grave</span>
                  </div>
                  <div className="mt-4 p-4 bg-neutral-50 rounded-xl">
                    <p className="text-sm text-neutral-700">
                      {assessment.intensity <= 3 && "💙 Situação leve - conseguimos resolver isso juntos"}
                      {assessment.intensity >= 4 && assessment.intensity <= 6 && "🟡 Situação moderada - precisamos de atenção"}
                      {assessment.intensity >= 7 && assessment.intensity <= 8 && "🟠 Situação séria - vamos trabalhar nisso com cuidado"}
                      {assessment.intensity >= 9 && "🔴 Situação muito grave - considere ajuda profissional"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Duration */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-neutral-900 text-center">
                  Há quanto tempo este problema existe?
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { value: 'today', label: 'Começou hoje', emoji: '🆕' },
                    { value: 'week', label: 'Esta semana', emoji: '📅' },
                    { value: 'month', label: 'Este mês', emoji: '🗓️' },
                    { value: 'months', label: 'Alguns meses', emoji: '📆' },
                    { value: 'long', label: 'Muito tempo', emoji: '⏰' }
                  ].map((duration) => (
                    <button
                      key={duration.value}
                      onClick={() => setAssessment({...assessment, duration: duration.value})}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        assessment.duration === duration.value
                          ? 'border-rose-300 bg-rose-50'
                          : 'border-neutral-200 hover:border-rose-200'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{duration.emoji}</span>
                        <span className="font-medium text-neutral-800">{duration.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Emotions */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-neutral-900 text-center">
                  Como você está se sentindo? (Pode escolher mais de um)
                </h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {emotions.map((emotion) => (
                    <button
                      key={emotion.value}
                      onClick={() => handleEmotionToggle(emotion.value)}
                      className={`p-3 rounded-xl border-2 transition-all text-left ${
                        assessment.emotions.includes(emotion.value)
                          ? 'border-rose-300 bg-rose-50'
                          : 'border-neutral-200 hover:border-rose-200'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{emotion.emoji}</span>
                        <span className="font-medium text-neutral-800">{emotion.label}</span>
                        {assessment.emotions.includes(emotion.value) && (
                          <span className="ml-auto text-rose-500">✓</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Communication */}
            {step === 5 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-neutral-900 text-center">
                  Como está a comunicação entre vocês agora?
                </h2>
                <div className="space-y-4">
                  {[
                    { value: 'not_talking', label: 'Não estamos conversando', emoji: '😶', color: 'red' },
                    { value: 'arguing', label: 'Só discutindo/brigando', emoji: '😡', color: 'red' },
                    { value: 'basic', label: 'Só o básico necessário', emoji: '😐', color: 'yellow' },
                    { value: 'trying', label: 'Tentando conversar', emoji: '🤔', color: 'blue' },
                    { value: 'good', label: 'Conversando bem', emoji: '😊', color: 'green' }
                  ].map((comm) => (
                    <button
                      key={comm.value}
                      onClick={() => setAssessment({...assessment, communication: comm.value})}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                        assessment.communication === comm.value
                          ? 'border-rose-300 bg-rose-50'
                          : 'border-neutral-200 hover:border-rose-200'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{comm.emoji}</span>
                        <span className="font-medium text-neutral-800">{comm.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 6: Trigger */}
            {step === 6 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-neutral-900 text-center">
                  O que você acha que causou esta situação?
                </h2>
                <textarea
                  rows={4}
                  value={assessment.trigger}
                  onChange={(e) => setAssessment({...assessment, trigger: e.target.value})}
                  className="input resize-none"
                  placeholder="Descreva brevemente o que aconteceu ou o que pode ter causado este problema..."
                />
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-sm text-blue-800">
                    💡 <strong>Dica:</strong> Tente ser específico e evite generalizações. 
                    Foque no que aconteceu, não em julgamentos sobre seu parceiro.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button 
                onClick={handlePrevious}
                disabled={step === 1}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  step === 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                }`}
              >
                ← Anterior
              </button>
              <button 
                onClick={handleNext}
                disabled={
                  (step === 1 && !assessment.conflictType) ||
                  (step === 4 && assessment.emotions.length === 0) ||
                  (step === 5 && !assessment.communication) ||
                  (step === 6 && !assessment.trigger)
                }
                className="btn-primary px-6"
              >
                {step === 6 ? 'Gerar Recomendações' : 'Próximo →'}
              </button>
            </div>
          </div>
        )}

        {/* Recommendations */}
        {step === 7 && recommendations && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Suas Recomendações Personalizadas
              </h2>
              <p className="text-neutral-600">
                Com base na sua situação, aqui estão as orientações da sua mentora:
              </p>
            </div>

            {/* Immediate Actions */}
            <div className="card">
              <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center">
                <span className="mr-2">🚨</span>
                Ações Imediatas (Agora)
              </h3>
              <div className="space-y-3">
                {recommendations.immediateActions.map((action: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 rounded-xl">
                    <span className="text-red-500 font-bold">•</span>
                    <p className="text-red-800">{action}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Medium Term */}
            <div className="card">
              <h3 className="text-xl font-bold text-blue-600 mb-4 flex items-center">
                <span className="mr-2">📋</span>
                Próximos Passos (Esta semana)
              </h3>
              <div className="space-y-3">
                {recommendations.mediumTerm.map((action: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-xl">
                    <span className="text-blue-500 font-bold">•</span>
                    <p className="text-blue-800">{action}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Long Term */}
            <div className="card">
              <h3 className="text-xl font-bold text-green-600 mb-4 flex items-center">
                <span className="mr-2">🌱</span>
                Fortalecimento (Longo prazo)
              </h3>
              <div className="space-y-3">
                {recommendations.longTerm.map((action: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-xl">
                    <span className="text-green-500 font-bold">•</span>
                    <p className="text-green-800">{action}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Avoid Actions */}
            <div className="card">
              <h3 className="text-xl font-bold text-yellow-600 mb-4 flex items-center">
                <span className="mr-2">⚠️</span>
                O que Evitar
              </h3>
              <div className="space-y-3">
                {recommendations.avoidActions.map((action: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-xl">
                    <span className="text-yellow-500 font-bold">•</span>
                    <p className="text-yellow-800">{action}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid md:grid-cols-3 gap-4">
              <Link to="/chat" className="btn-primary text-center">
                💬 Conversar com a Mentora
              </Link>
              <button 
                onClick={restartAssessment}
                className="btn-secondary text-center"
              >
                🔄 Nova Avaliação
              </button>
              <Link to="/dashboard" className="btn-secondary text-center">
                🏠 Voltar ao Dashboard
              </Link>
            </div>

            {/* Emergency Notice */}
            {assessment.intensity >= 9 && (
              <div className="card bg-red-50 border-2 border-red-200">
                <h3 className="text-lg font-bold text-red-800 mb-3 flex items-center">
                  <span className="mr-2">🚨</span>
                  Atenção: Situação Grave
                </h3>
                <p className="text-red-700 mb-4">
                  Com base na gravidade da situação, recomendamos fortemente buscar ajuda profissional. 
                  Um terapeuta de casal pode oferecer suporte especializado.
                </p>
                <div className="bg-white/70 rounded-lg p-3">
                  <p className="text-sm text-red-600 font-medium">
                    📞 Em casos de violência doméstica, procure ajuda imediatamente: 
                    Central de Atendimento à Mulher - 180
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
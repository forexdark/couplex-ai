import { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../hooks/useAuth';

interface Surprise {
  id: string;
  category: 'romantic' | 'fun' | 'gift' | 'experience' | 'gesture';
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  cost: 'free' | 'low' | 'medium' | 'high';
  duration: string;
  materials?: string[];
  steps: string[];
  tips: string[];
}

export default function PersonalizedSurprises() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentSurprise, setCurrentSurprise] = useState<Surprise | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const categories = [
    { value: 'all', label: 'Todas', emoji: '✨' },
    { value: 'romantic', label: 'Românticas', emoji: '💕' },
    { value: 'fun', label: 'Diversão', emoji: '🎉' },
    { value: 'gift', label: 'Presentes', emoji: '🎁' },
    { value: 'experience', label: 'Experiências', emoji: '🌟' },
    { value: 'gesture', label: 'Gestos', emoji: '💝' }
  ];

  const surprises: Surprise[] = [
    {
      id: '1',
      category: 'romantic',
      title: 'Jantar à Luz de Velas em Casa',
      description: 'Transforme sua sala em um restaurante romântico',
      difficulty: 'easy',
      cost: 'low',
      duration: '2-3 horas',
      materials: ['Velas', 'Música romântica', 'Flores', 'Comida favorita'],
      steps: [
        'Limpe e organize o ambiente',
        'Coloque velas pela sala e mesa',
        'Prepare ou peça a comida favorita do casal',
        'Escolha uma playlist romântica',
        'Vista-se de forma especial',
        'Desligue celulares e TV'
      ],
      tips: [
        'Prepare tudo sem que seu parceiro veja',
        'Use pétalas de rosa espalhadas',
        'Escreva um bilhete carinhoso'
      ]
    },
    {
      id: '2',
      category: 'gift',
      title: 'Álbum de Memórias Personalizado',
      description: 'Crie um álbum com as melhores lembranças do casal',
      difficulty: 'medium',
      cost: 'low',
      duration: '3-4 horas',
      materials: ['Álbum de fotos', 'Fotos impressas', 'Canetas coloridas', 'Adesivos'],
      steps: [
        'Selecione as melhores fotos do relacionamento',
        'Imprima as fotos em boa qualidade',
        'Organize cronologicamente',
        'Escreva legendas carinhosas para cada momento',
        'Decore as páginas com desenhos e adesivos',
        'Adicione uma carta na última página'
      ],
      tips: [
        'Inclua fotos desde o início do relacionamento',
        'Escreva sobre o que sentia em cada momento',
        'Deixe páginas em branco para novas memórias'
      ]
    },
    {
      id: '3',
      category: 'experience',
      title: 'Caça ao Tesouro Romântica',
      description: 'Crie pistas pela casa levando a uma surpresa final',
      difficulty: 'medium',
      cost: 'free',
      duration: '1-2 horas',
      materials: ['Papel', 'Caneta', 'Pequenos presentes ou bilhetes'],
      steps: [
        'Escolha 5-7 locais especiais da casa',
        'Escreva pistas criativas para cada local',
        'Coloque pequenos presentes ou bilhetes em cada parada',
        'Prepare uma surpresa especial no final',
        'Teste o percurso antes',
        'Entregue a primeira pista com um sorriso'
      ],
      tips: [
        'Use lugares com significado para vocês',
        'Faça pistas que remetem a memórias do casal',
        'A surpresa final pode ser simples mas significativa'
      ]
    },
    {
      id: '4',
      category: 'gesture',
      title: 'Café da Manhã na Cama',
      description: 'Acorde seu amor com um café da manhã especial',
      difficulty: 'easy',
      cost: 'low',
      duration: '30-45 minutos',
      materials: ['Bandeja', 'Comidas favoritas', 'Suco/café', 'Flor', 'Bilhete'],
      steps: [
        'Acorde mais cedo sem fazer barulho',
        'Prepare os alimentos favoritos do seu parceiro',
        'Organize tudo em uma bandeja bonita',
        'Adicione uma flor e um bilhete carinhoso',
        'Leve até o quarto com cuidado',
        'Acorde seu amor com um beijo'
      ],
      tips: [
        'Prepare na noite anterior o que for possível',
        'Capriche na apresentação',
        'Inclua algo que ele/ela ama comer'
      ]
    },
    {
      id: '5',
      category: 'fun',
      title: 'Noite de Jogos e Diversão',
      description: 'Uma noite divertida com jogos e competições do casal',
      difficulty: 'easy',
      cost: 'free',
      duration: '2-3 horas',
      materials: ['Jogos de tabuleiro/cartas', 'Petiscos', 'Bebidas', 'Música'],
      steps: [
        'Escolha 3-4 jogos diferentes',
        'Prepare petiscos e bebidas',
        'Crie um sistema de pontuação',
        'Defina prêmios divertidos para o vencedor',
        'Coloque música ambiente',
        'Divirtam-se sem pressa'
      ],
      tips: [
        'Alternem entre jogos de estratégia e sorte',
        'Criem apostas divertidas',
        'O importante é se divertir, não ganhar'
      ]
    },
    {
      id: '6',
      category: 'romantic',
      title: 'Sessão de Massagem Relaxante',
      description: 'Uma noite de relaxamento e conexão íntima',
      difficulty: 'easy',
      cost: 'low',
      duration: '1-2 horas',
      materials: ['Óleo de massagem', 'Velas', 'Música relaxante', 'Toalhas'],
      steps: [
        'Aqueça o ambiente e diminua as luzes',
        'Coloque música relaxante',
        'Aqueça o óleo de massagem',
        'Começe com movimentos suaves',
        'Foquem na conexão e intimidade',
        'Revezem quem faz a massagem'
      ],
      tips: [
        'Aprendam técnicas básicas no YouTube',
        'Comuniquem o que sentem bem',
        'Não tenham pressa, aproveitem o momento'
      ]
    }
  ];

  const filteredSurprises = selectedCategory === 'all' 
    ? surprises 
    : surprises.filter(s => s.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCostColor = (cost: string) => {
    switch (cost) {
      case 'free': return 'bg-green-100 text-green-700';
      case 'low': return 'bg-blue-100 text-blue-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'high': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleSurpriseClick = (surprise: Surprise) => {
    setCurrentSurprise(surprise);
    setShowDetails(true);
  };

  return (
    <Layout showHeader>
      <div className="container-app py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-display text-neutral-900 mb-2">
            Surpresas Personalizadas 🎁
          </h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Ideias especiais criadas pela IA para vocês dois. Escolha uma categoria e descubra 
            maneiras únicas de surpreender seu parceiro e fortalecer seu relacionamento.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.value
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-rose-100'
              }`}
            >
              <span className="mr-2">{category.emoji}</span>
              {category.label}
            </button>
          ))}
        </div>

        {/* Surprises Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredSurprises.map((surprise) => (
            <div 
              key={surprise.id} 
              className="card hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              onClick={() => handleSurpriseClick(surprise)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(surprise.difficulty)}`}>
                    {surprise.difficulty === 'easy' && '⭐ Fácil'}
                    {surprise.difficulty === 'medium' && '⭐⭐ Médio'}
                    {surprise.difficulty === 'hard' && '⭐⭐⭐ Difícil'}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCostColor(surprise.cost)}`}>
                    {surprise.cost === 'free' && '💰 Grátis'}
                    {surprise.cost === 'low' && '💰 Baixo'}
                    {surprise.cost === 'medium' && '💰💰 Médio'}
                    {surprise.cost === 'high' && '💰💰💰 Alto'}
                  </span>
                </div>
                <span className="text-2xl">
                  {surprise.category === 'romantic' && '💕'}
                  {surprise.category === 'fun' && '🎉'}
                  {surprise.category === 'gift' && '🎁'}
                  {surprise.category === 'experience' && '🌟'}
                  {surprise.category === 'gesture' && '💝'}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                {surprise.title}
              </h3>
              <p className="text-neutral-600 text-sm mb-4">
                {surprise.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span>⏱️ {surprise.duration}</span>
                <span className="bg-rose-50 text-rose-600 px-2 py-1 rounded-full font-medium">
                  Ver detalhes →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Surprise Details Modal */}
        {showDetails && currentSurprise && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="card max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-neutral-900">{currentSurprise.title}</h2>
                <button 
                  onClick={() => setShowDetails(false)}
                  className="text-neutral-400 hover:text-neutral-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* Description and Info */}
                <div>
                  <p className="text-neutral-700 mb-4">{currentSurprise.description}</p>
                  <div className="flex flex-wrap gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentSurprise.difficulty)}`}>
                      {currentSurprise.difficulty === 'easy' && '⭐ Fácil'}
                      {currentSurprise.difficulty === 'medium' && '⭐⭐ Médio'}
                      {currentSurprise.difficulty === 'hard' && '⭐⭐⭐ Difícil'}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCostColor(currentSurprise.cost)}`}>
                      {currentSurprise.cost === 'free' && '💰 Grátis'}
                      {currentSurprise.cost === 'low' && '💰 Baixo custo'}
                      {currentSurprise.cost === 'medium' && '💰💰 Custo médio'}
                      {currentSurprise.cost === 'high' && '💰💰💰 Custo alto'}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                      ⏱️ {currentSurprise.duration}
                    </span>
                  </div>
                </div>

                {/* Materials */}
                {currentSurprise.materials && (
                  <div className="bg-blue-50 rounded-xl p-4">
                    <h3 className="font-bold text-blue-900 mb-3 flex items-center">
                      <span className="mr-2">🛍️</span>
                      Materiais necessários:
                    </h3>
                    <ul className="space-y-1">
                      {currentSurprise.materials.map((material, index) => (
                        <li key={index} className="text-blue-800 text-sm flex items-center">
                          <span className="text-blue-500 mr-2">•</span>
                          {material}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Steps */}
                <div className="bg-green-50 rounded-xl p-4">
                  <h3 className="font-bold text-green-900 mb-3 flex items-center">
                    <span className="mr-2">📝</span>
                    Passo a passo:
                  </h3>
                  <ol className="space-y-2">
                    {currentSurprise.steps.map((step, index) => (
                      <li key={index} className="text-green-800 text-sm flex items-start">
                        <span className="bg-green-200 text-green-800 w-6 h-6 rounded-full text-xs flex items-center justify-center mr-3 mt-0.5 font-semibold">
                          {index + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Tips */}
                <div className="bg-yellow-50 rounded-xl p-4">
                  <h3 className="font-bold text-yellow-900 mb-3 flex items-center">
                    <span className="mr-2">💡</span>
                    Dicas especiais:
                  </h3>
                  <ul className="space-y-2">
                    {currentSurprise.tips.map((tip, index) => (
                      <li key={index} className="text-yellow-800 text-sm flex items-start">
                        <span className="text-yellow-500 mr-2">✨</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <div className="text-center pt-4">
                  <button 
                    onClick={() => setShowDetails(false)}
                    className="btn-primary px-8"
                  >
                    Vou fazer essa surpresa! 💕
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredSurprises.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
              Nenhuma surpresa encontrada
            </h3>
            <p className="text-neutral-600">
              Selecione uma categoria diferente para ver mais opções.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useGamification } from '../contexts/GamificationContext';
import { useAuth } from '../hooks/useAuth';
import Layout from '../components/Layout';

interface Task {
  id: string;
  title: string;
  description: string;
  category: 'communication' | 'intimacy' | 'fun' | 'growth' | 'crisis';
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  completed: boolean;
  completedAt?: Date;
  dueDate?: Date;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  tasks: string[];
  duration: number; // days
  points: number;
  category: string;
  completed: boolean;
  startedAt?: Date;
}

export default function ActionPlans() {
  const { t } = useLanguage();
  const { addPoints, completeChallenge } = useGamification();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'tasks' | 'challenges'>('tasks');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  // Tarefas predefinidas
  const predefinedTasks: Task[] = [
    {
      id: 'daily_gratitude',
      title: 'Expressar Gratidão Diária',
      description: 'Diga ao seu parceiro(a) uma coisa pela qual você é grato hoje',
      category: 'communication',
      difficulty: 'easy',
      points: 25,
      completed: false
    },
    {
      id: 'active_listening',
      title: 'Praticar Escuta Ativa',
      description: 'Durante 10 minutos, escute seu parceiro(a) sem interromper ou dar conselhos',
      category: 'communication',
      difficulty: 'medium',
      points: 40,
      completed: false
    },
    {
      id: 'surprise_gesture',
      title: 'Gesto Surpresa',
      description: 'Faça algo inesperado e carinhoso para seu parceiro(a) hoje',
      category: 'intimacy',
      difficulty: 'easy',
      points: 35,
      completed: false
    },
    {
      id: 'phone_free_dinner',
      title: 'Jantar sem Celular',
      description: 'Jantem juntos sem celulares ou distrações por pelo menos 30 minutos',
      category: 'intimacy',
      difficulty: 'medium',
      points: 45,
      completed: false
    },
    {
      id: 'new_activity',
      title: 'Atividade Nova Juntos',
      description: 'Experimentem algo que nunca fizeram juntos antes',
      category: 'fun',
      difficulty: 'medium',
      points: 50,
      completed: false
    },
    {
      id: 'love_letter',
      title: 'Carta de Amor',
      description: 'Escreva uma carta expressando seus sentimentos profundos',
      category: 'intimacy',
      difficulty: 'hard',
      points: 75,
      completed: false
    },
    {
      id: 'conflict_resolution',
      title: 'Resolver Conflito Pendente',
      description: 'Abordem uma questão não resolvida com calma e empatia',
      category: 'crisis',
      difficulty: 'hard',
      points: 80,
      completed: false
    },
    {
      id: 'future_planning',
      title: 'Planejar o Futuro',
      description: 'Conversem sobre seus sonhos e planos para os próximos 5 anos',
      category: 'growth',
      difficulty: 'medium',
      points: 55,
      completed: false
    }
  ];

  // Desafios predefinidos
  const predefinedChallenges: Challenge[] = [
    {
      id: 'week_appreciation',
      title: 'Semana da Apreciação',
      description: 'Durante 7 dias, expressar diariamente uma qualidade que você admira no seu parceiro(a)',
      tasks: [
        'Dia 1: Elogie uma qualidade física',
        'Dia 2: Reconheça uma habilidade especial',
        'Dia 3: Agradeça por algo que fizeram recentemente',
        'Dia 4: Elogie o jeito como lidam com desafios',
        'Dia 5: Reconheça como contribuem para o relacionamento',
        'Dia 6: Elogie uma qualidade emocional',
        'Dia 7: Celebre o que mais ama neles'
      ],
      duration: 7,
      points: 200,
      category: 'communication',
      completed: false
    },
    {
      id: 'intimacy_month',
      title: 'Mês da Reconexão Íntima',
      description: 'Um mês focado em fortalecer a intimidade física e emocional',
      tasks: [
        'Semana 1: Conversas profundas diárias (20 min)',
        'Semana 2: Toques não-sexuais frequentes (abraços, carícias)',
        'Semana 3: Atividades românticas planejadas',
        'Semana 4: Tempo de qualidade sem distrações'
      ],
      duration: 30,
      points: 500,
      category: 'intimacy',
      completed: false
    },
    {
      id: 'adventure_challenge',
      title: 'Desafio da Aventura',
      description: 'Duas semanas explorando coisas novas juntos',
      tasks: [
        'Experimentar uma comida que nunca provaram',
        'Visitar um lugar novo na cidade',
        'Aprender algo novo juntos',
        'Fazer uma atividade física diferente',
        'Assistir um gênero de filme que não gostam',
        'Cozinhar uma receita complexa juntos',
        'Fazer um projeto criativo em dupla'
      ],
      duration: 14,
      points: 350,
      category: 'fun',
      completed: false
    }
  ];

  useEffect(() => {
    if (user) {
      loadTasks();
      loadChallenges();
    }
  }, [user]);

  const loadTasks = () => {
    const saved = localStorage.getItem(`tasks_${user?.uid}`);
    if (saved) {
      const parsedTasks = JSON.parse(saved).map((task: any) => ({
        ...task,
        completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
        dueDate: task.dueDate ? new Date(task.dueDate) : undefined
      }));
      setTasks(parsedTasks);
    } else {
      setTasks(predefinedTasks);
    }
  };

  const loadChallenges = () => {
    const saved = localStorage.getItem(`challenges_${user?.uid}`);
    if (saved) {
      const parsedChallenges = JSON.parse(saved).map((challenge: any) => ({
        ...challenge,
        startedAt: challenge.startedAt ? new Date(challenge.startedAt) : undefined
      }));
      setChallenges(parsedChallenges);
    } else {
      setChallenges(predefinedChallenges);
    }
  };

  const saveTasks = (updatedTasks: Task[]) => {
    if (user) {
      localStorage.setItem(`tasks_${user.uid}`, JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    }
  };

  const saveChallenges = (updatedChallenges: Challenge[]) => {
    if (user) {
      localStorage.setItem(`challenges_${user.uid}`, JSON.stringify(updatedChallenges));
      setChallenges(updatedChallenges);
    }
  };

  const completeTask = (taskId: string) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId && !task.completed) {
        addPoints(task.points, `Tarefa concluída: ${task.title}`);
        return {
          ...task,
          completed: true,
          completedAt: new Date()
        };
      }
      return task;
    });
    saveTasks(updatedTasks);
  };

  const startChallenge = (challengeId: string) => {
    const updatedChallenges = challenges.map(challenge => {
      if (challenge.id === challengeId && !challenge.startedAt) {
        return {
          ...challenge,
          startedAt: new Date()
        };
      }
      return challenge;
    });
    saveChallenges(updatedChallenges);
  };

  const completeChallengeAction = (challengeId: string) => {
    const updatedChallenges = challenges.map(challenge => {
      if (challenge.id === challengeId && !challenge.completed) {
        addPoints(challenge.points, `Desafio concluído: ${challenge.title}`);
        completeChallenge(challengeId);
        return {
          ...challenge,
          completed: true
        };
      }
      return challenge;
    });
    saveChallenges(updatedChallenges);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-neutral-600 bg-neutral-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      communication: '💬',
      intimacy: '💕',
      fun: '🎉',
      growth: '🌱',
      crisis: '🆘'
    };
    return icons[category] || '📋';
  };

  const filteredTasks = selectedCategory === 'all' 
    ? tasks 
    : tasks.filter(task => task.category === selectedCategory);

  const filteredChallenges = selectedCategory === 'all' 
    ? challenges 
    : challenges.filter(challenge => challenge.category === selectedCategory);

  const categories = [
    { id: 'all', name: 'Todas', icon: '📋' },
    { id: 'communication', name: 'Comunicação', icon: '💬' },
    { id: 'intimacy', name: 'Intimidade', icon: '💕' },
    { id: 'fun', name: 'Diversão', icon: '🎉' },
    { id: 'growth', name: 'Crescimento', icon: '🌱' },
    { id: 'crisis', name: 'Resolução', icon: '🆘' }
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-800 mb-4">
            Planos de Ação Interativos
          </h1>
          <p className="text-lg text-neutral-600">
            Tarefas e desafios personalizados para fortalecer seu relacionamento
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-neutral-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('tasks')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === 'tasks'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-800'
              }`}
            >
              📝 Tarefas Diárias
            </button>
            <button
              onClick={() => setActiveTab('challenges')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === 'challenges'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-800'
              }`}
            >
              🏆 Desafios
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-neutral-600 hover:bg-neutral-50 border border-neutral-200'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map(task => (
              <div
                key={task.id}
                className={`bg-white rounded-xl shadow-soft p-6 transition-all ${
                  task.completed ? 'opacity-75 ring-2 ring-green-200' : 'hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{getCategoryIcon(task.category)}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(task.difficulty)}`}>
                      {task.difficulty === 'easy' ? 'Fácil' : task.difficulty === 'medium' ? 'Médio' : 'Difícil'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-primary-600">
                      +{task.points} pts
                    </span>
                  </div>
                </div>

                <h3 className="font-semibold text-neutral-800 mb-2">
                  {task.title}
                </h3>
                <p className="text-neutral-600 text-sm mb-4">
                  {task.description}
                </p>

                <button
                  onClick={() => completeTask(task.id)}
                  disabled={task.completed}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${
                    task.completed
                      ? 'bg-green-500 text-white cursor-not-allowed'
                      : 'bg-primary-500 hover:bg-primary-600 text-white'
                  }`}
                >
                  {task.completed ? '✅ Concluída' : 'Marcar como Concluída'}
                </button>

                {task.completed && task.completedAt && (
                  <p className="text-xs text-green-600 mt-2 text-center">
                    Concluída em {task.completedAt.toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Challenges Tab */}
        {activeTab === 'challenges' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredChallenges.map(challenge => (
              <div
                key={challenge.id}
                className={`bg-white rounded-xl shadow-soft p-6 transition-all ${
                  challenge.completed ? 'opacity-75 ring-2 ring-green-200' : 'hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{getCategoryIcon(challenge.category)}</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-medium">
                      {challenge.duration} dias
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-primary-600">
                      +{challenge.points} pts
                    </span>
                  </div>
                </div>

                <h3 className="font-bold text-neutral-800 mb-2 text-lg">
                  {challenge.title}
                </h3>
                <p className="text-neutral-600 mb-4">
                  {challenge.description}
                </p>

                {/* Tasks List */}
                <div className="mb-6">
                  <h4 className="font-semibold text-neutral-700 mb-2">Etapas:</h4>
                  <ul className="space-y-2">
                    {challenge.tasks.map((task, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm">
                        <span className="w-5 h-5 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-neutral-600">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  {!challenge.startedAt && !challenge.completed && (
                    <button
                      onClick={() => startChallenge(challenge.id)}
                      className="w-full py-2 px-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-all"
                    >
                      🚀 Iniciar Desafio
                    </button>
                  )}

                  {challenge.startedAt && !challenge.completed && (
                    <div className="space-y-2">
                      <div className="text-sm text-neutral-600 text-center">
                        Iniciado em {challenge.startedAt.toLocaleDateString()}
                      </div>
                      <button
                        onClick={() => completeChallengeAction(challenge.id)}
                        className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all"
                      >
                        ✅ Marcar como Concluído
                      </button>
                    </div>
                  )}

                  {challenge.completed && (
                    <div className="w-full py-2 px-4 bg-green-500 text-white rounded-lg font-medium text-center">
                      🏆 Desafio Concluído!
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
import { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../hooks/useAuth';

interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'communication' | 'intimacy' | 'fun' | 'growth' | 'routine' | 'future';
  priority: 'high' | 'medium' | 'low';
  deadline: string;
  status: 'not_started' | 'in_progress' | 'completed';
  progress: number;
  milestones: Milestone[];
  partnerA: string;
  partnerB: string;
}

interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  completedBy?: string;
  completedDate?: string;
}

export default function RelationshipGoals() {
  const { user } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentGoal, setCurrentGoal] = useState<Partial<Goal>>({
    title: '',
    description: '',
    category: 'communication',
    priority: 'medium',
    deadline: '',
    status: 'not_started',
    progress: 0,
    milestones: [],
    partnerA: 'Você',
    partnerB: 'Seu parceiro'
  });

  const categories = [
    { value: 'all', label: 'Todas', emoji: '🎯', color: 'neutral' },
    { value: 'communication', label: 'Comunicação', emoji: '💬', color: 'blue' },
    { value: 'intimacy', label: 'Intimidade', emoji: '💕', color: 'rose' },
    { value: 'fun', label: 'Diversão', emoji: '🎉', color: 'yellow' },
    { value: 'growth', label: 'Crescimento', emoji: '🌱', color: 'green' },
    { value: 'routine', label: 'Rotina', emoji: '📅', color: 'purple' },
    { value: 'future', label: 'Futuro', emoji: '🌟', color: 'indigo' }
  ];

  const goalTemplates = [
    {
      category: 'communication',
      title: 'Conversar 20 minutos por dia',
      description: 'Estabelecer um momento diário para conversar sobre sentimentos e experiências',
      milestones: [
        'Definir horário fixo para conversar',
        'Praticar escuta ativa',
        'Compartilhar 3 coisas boas do dia',
        'Conversar sobre sonhos e medos'
      ]
    },
    {
      category: 'intimacy',
      title: 'Reacender a paixão',
      description: 'Trabalhar na conexão física e emocional do relacionamento',
      milestones: [
        'Planejar encontro romântico mensal',
        'Demonstrar afeto físico diariamente',
        'Expressar admiração um pelo outro',
        'Criar momentos de intimidade'
      ]
    },
    {
      category: 'fun',
      title: 'Fazer algo novo juntos mensalmente',
      description: 'Quebrar a rotina experimentando atividades diferentes todos os meses',
      milestones: [
        'Listar atividades que gostaríamos de tentar',
        'Fazer primeira atividade nova',
        'Experimentar hobby juntos',
        'Viajar para lugar novo'
      ]
    },
    {
      category: 'growth',
      title: 'Crescer juntos como casal',
      description: 'Desenvolver aspectos pessoais e do relacionamento',
      milestones: [
        'Definir valores importantes para nós',
        'Apoiar objetivos individuais',
        'Ler livro sobre relacionamentos',
        'Fazer terapia de casal'
      ]
    }
  ];

  const filteredGoals = selectedCategory === 'all' 
    ? goals 
    : goals.filter(g => g.category === selectedCategory);

  const getCategoryConfig = (category: string) => {
    return categories.find(c => c.value === category) || categories[0];
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'in_progress': return 'bg-blue-100 text-blue-700';
      case 'not_started': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleSaveGoal = () => {
    if (!currentGoal.title || !currentGoal.description) return;

    const milestones: Milestone[] = currentGoal.milestones?.map((title, index) => ({
      id: (index + 1).toString(),
      title: title as string,
      completed: false
    })) || [];

    const newGoal: Goal = {
      id: Date.now().toString(),
      title: currentGoal.title,
      description: currentGoal.description,
      category: currentGoal.category as Goal['category'],
      priority: currentGoal.priority as Goal['priority'],
      deadline: currentGoal.deadline || '',
      status: 'not_started',
      progress: 0,
      milestones,
      partnerA: 'Você',
      partnerB: 'Seu parceiro'
    };

    setGoals([...goals, newGoal]);
    setCurrentGoal({
      title: '',
      description: '',
      category: 'communication',
      priority: 'medium',
      deadline: '',
      status: 'not_started',
      progress: 0,
      milestones: [],
      partnerA: 'Você',
      partnerB: 'Seu parceiro'
    });
    setShowForm(false);
  };

  const toggleMilestone = (goalId: string, milestoneId: string) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const updatedMilestones = goal.milestones.map(milestone => {
          if (milestone.id === milestoneId) {
            return {
              ...milestone,
              completed: !milestone.completed,
              completedBy: !milestone.completed ? user?.displayName?.split(' ')[0] || 'Você' : undefined,
              completedDate: !milestone.completed ? new Date().toLocaleDateString('pt-BR') : undefined
            };
          }
          return milestone;
        });
        
        const completedCount = updatedMilestones.filter(m => m.completed).length;
        const progress = Math.round((completedCount / updatedMilestones.length) * 100);
        const status = progress === 100 ? 'completed' : progress > 0 ? 'in_progress' : 'not_started';
        
        return { ...goal, milestones: updatedMilestones, progress, status };
      }
      return goal;
    }));
  };

  const useTemplate = (template: any) => {
    setCurrentGoal({
      ...currentGoal,
      title: template.title,
      description: template.description,
      category: template.category,
      milestones: template.milestones
    });
  };

  return (
    <Layout showHeader>
      <div className="container-app py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold font-display text-neutral-900 mb-2">
              Metas do Relacionamento 🎯
            </h1>
            <p className="text-neutral-600">
              Definam e acompanhem objetivos importantes para fortalecer o relacionamento de vocês.
            </p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="btn-primary mt-4 sm:mt-0"
          >
            ✨ Nova Meta
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
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

        {/* Goals List */}
        <div className="space-y-6 mb-8">
          {filteredGoals.length === 0 ? (
            <div className="card text-center py-12">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                {selectedCategory === 'all' ? 'Nenhuma meta criada ainda' : 'Nenhuma meta nesta categoria'}
              </h3>
              <p className="text-neutral-600 mb-6 max-w-md mx-auto">
                {selectedCategory === 'all' 
                  ? 'Criem metas juntos para fortalecer o relacionamento e acompanhar o progresso.'
                  : 'Selecione outra categoria ou crie uma nova meta.'}
              </p>
              <button 
                onClick={() => setShowForm(true)}
                className="btn-primary"
              >
                🎯 Criar Primeira Meta
              </button>
            </div>
          ) : (
            filteredGoals.map((goal) => {
              const categoryConfig = getCategoryConfig(goal.category);
              return (
                <div key={goal.id} className="card">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 bg-gradient-to-r from-${categoryConfig.color}-400 to-${categoryConfig.color}-500 rounded-2xl flex items-center justify-center`}>
                        <span className="text-2xl">{categoryConfig.emoji}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-1">{goal.title}</h3>
                        <p className="text-neutral-600 text-sm">{goal.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                        {goal.priority === 'high' && '🔴 Alta'}
                        {goal.priority === 'medium' && '🟡 Média'}
                        {goal.priority === 'low' && '🟢 Baixa'}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                        {goal.status === 'completed' && '✅ Concluída'}
                        {goal.status === 'in_progress' && '🔄 Em andamento'}
                        {goal.status === 'not_started' && '⏳ Não iniciada'}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-neutral-700">Progresso</span>
                      <span className="text-sm font-bold text-rose-600">{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-rose-500 to-primary-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Milestones */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-neutral-800 flex items-center">
                      <span className="mr-2">📋</span>
                      Marcos do progresso:
                    </h4>
                    {goal.milestones.map((milestone) => (
                      <div 
                        key={milestone.id}
                        className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                          milestone.completed 
                            ? 'bg-green-50 border-green-200' 
                            : 'bg-neutral-50 border-neutral-200 hover:border-rose-200'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => toggleMilestone(goal.id, milestone.id)}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                              milestone.completed
                                ? 'bg-green-500 border-green-500 text-white'
                                : 'border-neutral-300 hover:border-rose-400'
                            }`}
                          >
                            {milestone.completed && '✓'}
                          </button>
                          <span className={`font-medium ${
                            milestone.completed ? 'text-green-800 line-through' : 'text-neutral-700'
                          }`}>
                            {milestone.title}
                          </span>
                        </div>
                        {milestone.completed && milestone.completedBy && (
                          <div className="text-xs text-green-600">
                            ✓ {milestone.completedBy} • {milestone.completedDate}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Goal Info */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-neutral-200">
                    <div className="flex items-center space-x-4 text-sm text-neutral-500">
                      {goal.deadline && (
                        <span>📅 Prazo: {new Date(goal.deadline).toLocaleDateString('pt-BR')}</span>
                      )}
                      <span>👥 {goal.partnerA} & {goal.partnerB}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="card max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-neutral-900">Nova Meta do Relacionamento</h2>
                <button 
                  onClick={() => setShowForm(false)}
                  className="text-neutral-400 hover:text-neutral-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* Templates */}
                <div>
                  <h3 className="font-semibold text-neutral-700 mb-3">💡 Use um modelo ou crie do zero:</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {goalTemplates.map((template, index) => {
                      const categoryConfig = getCategoryConfig(template.category);
                      return (
                        <button
                          key={index}
                          onClick={() => useTemplate(template)}
                          className="text-left p-3 rounded-xl border-2 border-neutral-200 hover:border-rose-300 transition-all"
                        >
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="text-xl">{categoryConfig.emoji}</span>
                            <span className="font-medium text-neutral-800">{template.title}</span>
                          </div>
                          <p className="text-xs text-neutral-600">{template.description}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Goal Details */}
                <div className="grid gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Título da meta
                    </label>
                    <input
                      type="text"
                      value={currentGoal.title}
                      onChange={(e) => setCurrentGoal({...currentGoal, title: e.target.value})}
                      className="input"
                      placeholder="Ex: Melhorar nossa comunicação diária"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Descrição
                    </label>
                    <textarea
                      rows={3}
                      value={currentGoal.description}
                      onChange={(e) => setCurrentGoal({...currentGoal, description: e.target.value})}
                      className="input resize-none"
                      placeholder="Descreva o que vocês querem alcançar..."
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        Categoria
                      </label>
                      <select
                        value={currentGoal.category}
                        onChange={(e) => setCurrentGoal({...currentGoal, category: e.target.value as Goal['category']})}
                        className="input"
                      >
                        {categories.slice(1).map((cat) => (
                          <option key={cat.value} value={cat.value}>{cat.emoji} {cat.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        Prioridade
                      </label>
                      <select
                        value={currentGoal.priority}
                        onChange={(e) => setCurrentGoal({...currentGoal, priority: e.target.value as Goal['priority']})}
                        className="input"
                      >
                        <option value="high">🔴 Alta</option>
                        <option value="medium">🟡 Média</option>
                        <option value="low">🟢 Baixa</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        Prazo (opcional)
                      </label>
                      <input
                        type="date"
                        value={currentGoal.deadline}
                        onChange={(e) => setCurrentGoal({...currentGoal, deadline: e.target.value})}
                        className="input"
                      />
                    </div>
                  </div>

                  {/* Milestones */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Marcos do progresso (pressione Enter para adicionar)
                    </label>
                    <div className="space-y-2">
                      {(currentGoal.milestones || []).map((milestone, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={milestone as string}
                            onChange={(e) => {
                              const updatedMilestones = [...(currentGoal.milestones || [])];
                              updatedMilestones[index] = e.target.value;
                              setCurrentGoal({...currentGoal, milestones: updatedMilestones});
                            }}
                            className="input flex-1"
                            placeholder="Ex: Definir horário para conversar"
                          />
                          <button
                            onClick={() => {
                              const updatedMilestones = (currentGoal.milestones || []).filter((_, i) => i !== index);
                              setCurrentGoal({...currentGoal, milestones: updatedMilestones});
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const updatedMilestones = [...(currentGoal.milestones || []), ''];
                          setCurrentGoal({...currentGoal, milestones: updatedMilestones});
                        }}
                        className="btn-secondary text-sm w-full"
                      >
                        + Adicionar marco
                      </button>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={() => setShowForm(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={handleSaveGoal}
                    className="btn-primary flex-1"
                  >
                    🎯 Criar Meta
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
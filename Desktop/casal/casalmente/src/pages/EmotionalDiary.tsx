import { useState, useEffect } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import Layout from '../components/Layout';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../contexts/LanguageContext';
import { useEmotionalDiary, MoodEntry } from '../contexts/EmotionalDiaryContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function EmotionalDiary() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const {
    entries,
    currentAnalysis,
    isLoading,
    addEntry,
    deleteEntry,
    getAnalysis,
    getInsights,
    exportData
  } = useEmotionalDiary();

  const [activeTab, setActiveTab] = useState<'entries' | 'analysis' | 'insights'>('entries');
  const [showForm, setShowForm] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<MoodEntry | null>(null);
  const [formData, setFormData] = useState({
    mood: 'neutral' as MoodEntry['mood'],
    moodScore: 3,
    emotions: [] as string[],
    title: '',
    content: '',
    triggers: [] as string[],
    gratitude: '',
    reflection: '',
    visibility: 'private' as MoodEntry['visibility'],
    tags: [] as string[]
  });

  const moods = [
    { value: 'very_sad', label: 'Muito Triste', emoji: '😢', score: 1, color: 'text-red-600' },
    { value: 'sad', label: 'Triste', emoji: '😔', score: 2, color: 'text-orange-600' },
    { value: 'neutral', label: 'Neutro', emoji: '😐', score: 3, color: 'text-gray-600' },
    { value: 'happy', label: 'Feliz', emoji: '😊', score: 4, color: 'text-green-600' },
    { value: 'very_happy', label: 'Muito Feliz', emoji: '😍', score: 5, color: 'text-emerald-600' }
  ];

  const emotions = [
    'feliz', 'triste', 'ansioso', 'calmo', 'irritado', 'amoroso', 'solitário',
    'confiante', 'inseguro', 'grato', 'frustrado', 'esperançoso', 'preocupado',
    'empolgado', 'cansado', 'orgulhoso', 'envergonhado', 'curioso', 'nostálgico'
  ];

  const commonTriggers = [
    'discussão', 'trabalho', 'família', 'dinheiro', 'saúde', 'tempo junto',
    'comunicação', 'intimidade', 'estresse', 'saudade', 'ciúme', 'insegurança'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await addEntry({
      mood: formData.mood,
      moodScore: formData.moodScore,
      emotions: formData.emotions,
      title: formData.title,
      content: formData.content,
      triggers: formData.triggers,
      gratitude: formData.gratitude,
      reflection: formData.reflection,
      visibility: formData.visibility,
      tags: formData.tags
    });

    // Reset form
    setFormData({
      mood: 'neutral',
      moodScore: 3,
      emotions: [],
      title: '',
      content: '',
      triggers: [],
      gratitude: '',
      reflection: '',
      visibility: 'private',
      tags: []
    });
    setShowForm(false);
  };

  const handleEmotionToggle = (emotion: string) => {
    setFormData(prev => ({
      ...prev,
      emotions: prev.emotions.includes(emotion)
        ? prev.emotions.filter(e => e !== emotion)
        : [...prev.emotions, emotion]
    }));
  };

  const handleTriggerToggle = (trigger: string) => {
    setFormData(prev => ({
      ...prev,
      triggers: prev.triggers.includes(trigger)
        ? prev.triggers.filter(t => t !== trigger)
        : [...prev.triggers, trigger]
    }));
  };

  const getCurrentMood = () => {
    return moods.find(m => m.value === formData.mood) || moods[2];
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Chart data preparation
  const last30Days = entries.slice(0, 30).reverse();
  const moodChartData = {
    labels: last30Days.map(entry => 
      new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit' }).format(entry.date)
    ),
    datasets: [
      {
        label: 'Humor Diário',
        data: last30Days.map(entry => entry.moodScore),
        borderColor: 'rgb(236, 72, 153)',
        backgroundColor: 'rgba(236, 72, 153, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const weeklyMoodData = currentAnalysis?.weeklyPattern ? {
    labels: currentAnalysis.weeklyPattern.map(day => day.day),
    datasets: [
      {
        label: 'Humor Médio por Dia da Semana',
        data: currentAnalysis.weeklyPattern.map(day => day.avgMood),
        backgroundColor: [
          'rgba(239, 68, 68, 0.6)',
          'rgba(245, 158, 11, 0.6)',
          'rgba(34, 197, 94, 0.6)',
          'rgba(59, 130, 246, 0.6)',
          'rgba(147, 51, 234, 0.6)',
          'rgba(236, 72, 153, 0.6)',
          'rgba(14, 165, 233, 0.6)'
        ]
      }
    ]
  } : null;

  const emotionsData = currentAnalysis?.dominantEmotions ? {
    labels: currentAnalysis.dominantEmotions.slice(0, 5),
    datasets: [
      {
        data: currentAnalysis.dominantEmotions.slice(0, 5).map(() => Math.random() * 20 + 10),
        backgroundColor: [
          'rgba(236, 72, 153, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(147, 51, 234, 0.8)'
        ]
      }
    ]
  } : null;

  const insights = getInsights();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-800 mb-4">
            📔 Diário Emocional Avançado
          </h1>
          <p className="text-lg text-neutral-600">
            Acompanhe sua jornada emocional e descubra padrões no seu relacionamento
          </p>
        </div>

        {/* Quick Stats */}
        {currentAnalysis && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl p-4 text-white">
              <div className="text-2xl mb-1">{currentAnalysis.averageMood.toFixed(1)}/5</div>
              <div className="text-sm opacity-90">Humor Médio</div>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-4 text-white">
              <div className="text-2xl mb-1">{entries.length}</div>
              <div className="text-sm opacity-90">Total de Entradas</div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-4 text-white">
              <div className="text-2xl mb-1">
                {currentAnalysis.moodTrend === 'improving' ? '📈' : 
                 currentAnalysis.moodTrend === 'declining' ? '📉' : '➡️'}
              </div>
              <div className="text-sm opacity-90">
                {currentAnalysis.moodTrend === 'improving' ? 'Melhorando' : 
                 currentAnalysis.moodTrend === 'declining' ? 'Declinando' : 'Estável'}
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl p-4 text-white">
              <div className="text-2xl mb-1">{insights.length}</div>
              <div className="text-sm opacity-90">Insights Disponíveis</div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-neutral-100 rounded-lg p-1">
            {[
              { id: 'entries', label: '📝 Entradas', icon: '📝' },
              { id: 'analysis', label: '📊 Análise', icon: '📊' },
              { id: 'insights', label: '💡 Insights', icon: '💡' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Entries Tab */}
        {activeTab === 'entries' && (
          <div>
            {/* Add Entry Button */}
            <div className="text-center mb-8">
              <button
                onClick={() => setShowForm(true)}
                className="btn-primary text-lg px-8 py-3"
              >
                ➕ Nova Entrada
              </button>
            </div>

            {/* New Entry Form */}
            {showForm && (
              <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                      {/* Mood Selection */}
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-3">
                          Como você está se sentindo?
                        </label>
                        <div className="grid grid-cols-5 gap-2">
                          {moods.map((mood) => (
                            <button
                              key={mood.value}
                              type="button"
                              onClick={() => setFormData(prev => ({ 
                                ...prev, 
                                mood: mood.value, 
                                moodScore: mood.score 
                              }))}
                              className={`p-4 rounded-xl text-center transition-all ${
                                formData.mood === mood.value
                                  ? 'bg-primary-500 text-white scale-105'
                                  : 'bg-neutral-100 hover:bg-neutral-200'
                              }`}
                            >
                              <div className="text-2xl mb-1">{mood.emoji}</div>
                              <div className="text-xs">{mood.label}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Title */}
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Título da entrada
                        </label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                          className="input-field"
                          placeholder="Ex: Um dia especial com meu amor"
                          required
                        />
                      </div>

                      {/* Content */}
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Como foi seu dia? *
                        </label>
                        <textarea
                          value={formData.content}
                          onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                          className="input-field min-h-[120px]"
                          placeholder="Descreva seus sentimentos, o que aconteceu, como se sente sobre o relacionamento..."
                          required
                        />
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* Emotions */}
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-3">
                          Quais emoções você sentiu?
                        </label>
                        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                          {emotions.map((emotion) => (
                            <button
                              key={emotion}
                              type="button"
                              onClick={() => handleEmotionToggle(emotion)}
                              className={`px-3 py-1 rounded-full text-sm transition-all ${
                                formData.emotions.includes(emotion)
                                  ? 'bg-primary-500 text-white'
                                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                              }`}
                            >
                              {emotion}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Triggers */}
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-3">
                          O que influenciou seu humor?
                        </label>
                        <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                          {commonTriggers.map((trigger) => (
                            <button
                              key={trigger}
                              type="button"
                              onClick={() => handleTriggerToggle(trigger)}
                              className={`px-3 py-1 rounded-full text-sm transition-all ${
                                formData.triggers.includes(trigger)
                                  ? 'bg-amber-500 text-white'
                                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                              }`}
                            >
                              {trigger}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Gratitude */}
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Pelo que você é grato hoje?
                        </label>
                        <textarea
                          value={formData.gratitude}
                          onChange={(e) => setFormData(prev => ({ ...prev, gratitude: e.target.value }))}
                          className="input-field min-h-[80px]"
                          placeholder="Ex: Sou grato pelo carinho que meu parceiro demonstrou hoje..."
                        />
                      </div>

                      {/* Reflection */}
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Reflexão
                        </label>
                        <textarea
                          value={formData.reflection}
                          onChange={(e) => setFormData(prev => ({ ...prev, reflection: e.target.value }))}
                          className="input-field min-h-[80px]"
                          placeholder="O que você aprendeu hoje? Como pode melhorar?"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end space-x-4 mt-8">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="btn-secondary"
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn-primary">
                      💾 Salvar Entrada
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Entries List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {entries.map((entry) => {
                const mood = moods.find(m => m.value === entry.mood) || moods[2];
                return (
                  <div key={entry.id} className="bg-white rounded-xl shadow-soft p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{mood.emoji}</div>
                        <div>
                          <div className={`font-semibold ${mood.color}`}>
                            {mood.label}
                          </div>
                          <div className="text-sm text-neutral-500">
                            {formatDate(entry.date)}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteEntry(entry.id)}
                        className="text-neutral-400 hover:text-red-500 transition-colors"
                      >
                        🗑️
                      </button>
                    </div>

                    <h3 className="font-semibold text-neutral-800 mb-2">
                      {entry.title}
                    </h3>
                    <p className="text-neutral-600 text-sm mb-3 line-clamp-3">
                      {entry.content}
                    </p>

                    {entry.emotions.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {entry.emotions.slice(0, 3).map((emotion) => (
                          <span
                            key={emotion}
                            className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs"
                          >
                            {emotion}
                          </span>
                        ))}
                        {entry.emotions.length > 3 && (
                          <span className="px-2 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs">
                            +{entry.emotions.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {entry.gratitude && (
                      <div className="bg-green-50 border-l-4 border-green-400 p-3 mt-3">
                        <div className="text-sm text-green-700">
                          <strong>Gratidão:</strong> {entry.gratitude}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {entries.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📔</div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                  Seu diário está vazio
                </h3>
                <p className="text-neutral-600 mb-6">
                  Comece a registrar suas emoções e descubra padrões no seu relacionamento
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="btn-primary"
                >
                  ✨ Criar primeira entrada
                </button>
              </div>
            )}
          </div>
        )}

        {/* Analysis Tab */}
        {activeTab === 'analysis' && currentAnalysis && (
          <div className="space-y-8">
            {/* Mood Trend Chart */}
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <h3 className="text-xl font-bold text-neutral-800 mb-4">
                📈 Evolução do Humor (Últimos 30 dias)
              </h3>
              <div className="h-64">
                <Line 
                  data={moodChartData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 5,
                        ticks: {
                          stepSize: 1
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Weekly Pattern */}
              {weeklyMoodData && (
                <div className="bg-white rounded-2xl shadow-soft p-6">
                  <h3 className="text-xl font-bold text-neutral-800 mb-4">
                    📅 Padrão Semanal
                  </h3>
                  <div className="h-64">
                    <Bar 
                      data={weeklyMoodData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false
                          }
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            max: 5
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Dominant Emotions */}
              {emotionsData && (
                <div className="bg-white rounded-2xl shadow-soft p-6">
                  <h3 className="text-xl font-bold text-neutral-800 mb-4">
                    💭 Emoções Dominantes
                  </h3>
                  <div className="h-64">
                    <Doughnut 
                      data={emotionsData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'bottom'
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <h3 className="text-xl font-bold text-neutral-800 mb-4">
                💡 Recomendações Baseadas na Análise
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentAnalysis.recommendedActions.map((action, index) => (
                  <div key={index} className="bg-primary-50 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="text-primary-600 mt-1">💡</div>
                      <p className="text-primary-800">{action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Insights Tab */}
        {activeTab === 'insights' && (
          <div className="space-y-6">
            {insights.map((insight, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-soft p-6">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">💡</div>
                  <div>
                    <p className="text-lg text-neutral-800">{insight}</p>
                  </div>
                </div>
              </div>
            ))}

            {insights.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                  Ainda não há insights suficientes
                </h3>
                <p className="text-neutral-600">
                  Continue registrando suas emoções para receber insights personalizados
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
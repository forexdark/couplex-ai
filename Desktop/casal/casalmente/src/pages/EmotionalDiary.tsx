import { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../hooks/useAuth';

interface DiaryEntry {
  id: string;
  date: string;
  mood: string;
  moodEmoji: string;
  title: string;
  content: string;
  gratitude: string;
  improvement: string;
  partnerRating: number;
}

export default function EmotionalDiary() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<Partial<DiaryEntry>>({
    mood: '',
    moodEmoji: '',
    title: '',
    content: '',
    gratitude: '',
    improvement: '',
    partnerRating: 3
  });

  const moods = [
    { emoji: '😍', label: 'Apaixonado(a)', value: 'apaixonado' },
    { emoji: '😊', label: 'Feliz', value: 'feliz' },
    { emoji: '😌', label: 'Tranquilo(a)', value: 'tranquilo' },
    { emoji: '😐', label: 'Neutro', value: 'neutro' },
    { emoji: '😔', label: 'Triste', value: 'triste' },
    { emoji: '😤', label: 'Irritado(a)', value: 'irritado' },
  ];

  const handleSaveEntry = () => {
    const newEntry: DiaryEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('pt-BR'),
      mood: currentEntry.mood || 'neutro',
      moodEmoji: currentEntry.moodEmoji || '😐',
      title: currentEntry.title || '',
      content: currentEntry.content || '',
      gratitude: currentEntry.gratitude || '',
      improvement: currentEntry.improvement || '',
      partnerRating: currentEntry.partnerRating || 3
    };

    setEntries([newEntry, ...entries]);
    setCurrentEntry({
      mood: '',
      moodEmoji: '',
      title: '',
      content: '',
      gratitude: '',
      improvement: '',
      partnerRating: 3
    });
    setShowForm(false);
  };

  const selectMood = (mood: any) => {
    setCurrentEntry({
      ...currentEntry,
      mood: mood.value,
      moodEmoji: mood.emoji
    });
  };

  return (
    <Layout showHeader>
      <div className="container-app py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold font-display text-neutral-900 mb-2">
              Diário Emocional 📝
            </h1>
            <p className="text-neutral-600">
              Registre seus sentimentos e receba orientações personalizadas da sua mentora.
            </p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="btn-primary mt-4 sm:mt-0"
          >
            ✨ Nova Entrada
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-neutral-900">Nova Entrada do Diário</h2>
                <button 
                  onClick={() => setShowForm(false)}
                  className="text-neutral-400 hover:text-neutral-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* Mood Selection */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-3">
                    Como você está se sentindo hoje?
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {moods.map((mood) => (
                      <button
                        key={mood.value}
                        onClick={() => selectMood(mood)}
                        className={`p-4 rounded-xl border-2 transition-all text-center ${
                          currentEntry.mood === mood.value
                            ? 'border-rose-300 bg-rose-50'
                            : 'border-neutral-200 hover:border-rose-200'
                        }`}
                      >
                        <div className="text-3xl mb-2">{mood.emoji}</div>
                        <div className="text-sm text-neutral-700">{mood.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Título da entrada
                  </label>
                  <input
                    type="text"
                    value={currentEntry.title}
                    onChange={(e) => setCurrentEntry({...currentEntry, title: e.target.value})}
                    className="input"
                    placeholder="Ex: Um dia especial com meu amor..."
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    O que aconteceu hoje? Como você se sente?
                  </label>
                  <textarea
                    rows={4}
                    value={currentEntry.content}
                    onChange={(e) => setCurrentEntry({...currentEntry, content: e.target.value})}
                    className="input resize-none"
                    placeholder="Descreva seus sentimentos, o que aconteceu no seu relacionamento hoje..."
                  />
                </div>

                {/* Gratitude */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Pelo que você é grato(a) hoje?
                  </label>
                  <input
                    type="text"
                    value={currentEntry.gratitude}
                    onChange={(e) => setCurrentEntry({...currentEntry, gratitude: e.target.value})}
                    className="input"
                    placeholder="Ex: Pelo abraço carinhoso que recebi..."
                  />
                </div>

                {/* Partner Rating */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Como avalia seu relacionamento hoje?
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setCurrentEntry({...currentEntry, partnerRating: rating})}
                        className={`w-10 h-10 rounded-full transition-all ${
                          (currentEntry.partnerRating || 3) >= rating
                            ? 'bg-rose-500 text-white'
                            : 'bg-neutral-200 text-neutral-600'
                        }`}
                      >
                        ❤️
                      </button>
                    ))}
                    <span className="ml-4 text-sm text-neutral-600">
                      {currentEntry.partnerRating === 1 && 'Difícil'}
                      {currentEntry.partnerRating === 2 && 'Complicado'}
                      {currentEntry.partnerRating === 3 && 'Normal'}
                      {currentEntry.partnerRating === 4 && 'Bom'}
                      {currentEntry.partnerRating === 5 && 'Incrível'}
                    </span>
                  </div>
                </div>

                {/* Improvement */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    O que você pode melhorar amanhã?
                  </label>
                  <input
                    type="text"
                    value={currentEntry.improvement}
                    onChange={(e) => setCurrentEntry({...currentEntry, improvement: e.target.value})}
                    className="input"
                    placeholder="Ex: Ser mais paciente, demonstrar mais carinho..."
                  />
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
                    onClick={handleSaveEntry}
                    className="btn-primary flex-1"
                  >
                    💕 Salvar Entrada
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Entries List */}
        {entries.length === 0 ? (
          <div className="card text-center py-12">
            <div className="text-6xl mb-4">📖</div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
              Seu diário está vazio
            </h3>
            <p className="text-neutral-600 mb-6 max-w-md mx-auto">
              Comece registrando como você se sente hoje. Sua mentora usará essas informações 
              para oferecer conselhos mais personalizados.
            </p>
            <button 
              onClick={() => setShowForm(true)}
              className="btn-primary"
            >
              ✨ Fazer Primeira Entrada
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {entries.map((entry) => (
              <div key={entry.id} className="card">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{entry.moodEmoji}</div>
                    <div>
                      <h3 className="text-xl font-bold text-neutral-900">{entry.title}</h3>
                      <p className="text-sm text-neutral-500">{entry.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <div
                        key={rating}
                        className={`w-6 h-6 rounded-full ${
                          entry.partnerRating >= rating
                            ? 'bg-rose-500 text-white'
                            : 'bg-neutral-200'
                        } flex items-center justify-center text-xs`}
                      >
                        ❤️
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-neutral-700 mb-4 leading-relaxed">{entry.content}</p>

                {entry.gratitude && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                    <p className="text-sm font-semibold text-green-800 mb-1">
                      🙏 Gratidão do dia:
                    </p>
                    <p className="text-green-700">{entry.gratitude}</p>
                  </div>
                )}

                {entry.improvement && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <p className="text-sm font-semibold text-blue-800 mb-1">
                      🎯 Para melhorar:
                    </p>
                    <p className="text-blue-700">{entry.improvement}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
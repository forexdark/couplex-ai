import { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../hooks/useAuth';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'date' | 'anniversary' | 'goal' | 'surprise' | 'important';
  description: string;
  reminder: boolean;
}

export default function CoupleCalendar() {
  const { user } = useAuth();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Partial<CalendarEvent>>({
    title: '',
    date: '',
    time: '',
    type: 'date',
    description: '',
    reminder: true
  });

  const eventTypes = [
    { value: 'date', label: 'Encontro Romântico', emoji: '💕', color: 'rose' },
    { value: 'anniversary', label: 'Data Especial', emoji: '🎉', color: 'purple' },
    { value: 'goal', label: 'Meta do Casal', emoji: '🎯', color: 'blue' },
    { value: 'surprise', label: 'Surpresa', emoji: '🎁', color: 'yellow' },
    { value: 'important', label: 'Importante', emoji: '⚡', color: 'red' }
  ];

  const getTypeConfig = (type: string) => {
    return eventTypes.find(t => t.value === type) || eventTypes[0];
  };

  const handleSaveEvent = () => {
    if (!currentEvent.title || !currentEvent.date) return;

    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: currentEvent.title,
      date: currentEvent.date,
      time: currentEvent.time || '12:00',
      type: currentEvent.type as CalendarEvent['type'],
      description: currentEvent.description || '',
      reminder: currentEvent.reminder !== false
    };

    setEvents([...events, newEvent].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    setCurrentEvent({
      title: '',
      date: '',
      time: '',
      type: 'date',
      description: '',
      reminder: true
    });
    setShowForm(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isToday = (dateString: string) => {
    const today = new Date().toDateString();
    const eventDate = new Date(dateString).toDateString();
    return today === eventDate;
  };

  const isUpcoming = (dateString: string) => {
    const today = new Date();
    const eventDate = new Date(dateString);
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7;
  };

  return (
    <Layout 
      showHeader 
      showNavigation 
      navigationTitle="📅 Calendário do Casal"
      navigationActions={
        <button 
          onClick={() => setShowForm(true)}
          className="btn-primary text-sm px-3 py-2"
        >
          ✨ Novo Evento
        </button>
      }
    >
      <div className="container-app py-8">
        {/* Welcome Message */}
        <div className="text-center mb-8">
          <p className="text-lg text-neutral-600 dark:text-neutral-300">
            Organize encontros, datas especiais e momentos importantes para vocês dois.
          </p>
        </div>

        {/* Upcoming Events Alert */}
        {events.filter(event => isUpcoming(event.date)).length > 0 && (
          <div className="card bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 mb-8">
            <h3 className="text-lg font-bold text-yellow-800 mb-4 flex items-center">
              <span className="mr-2">⚡</span>
              Próximos Eventos (7 dias)
            </h3>
            <div className="space-y-3">
              {events.filter(event => isUpcoming(event.date)).map((event) => {
                const typeConfig = getTypeConfig(event.type);
                return (
                  <div key={event.id} className="flex items-center justify-between bg-white/70 rounded-xl p-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{typeConfig.emoji}</span>
                      <div>
                        <p className="font-semibold text-neutral-800">{event.title}</p>
                        <p className="text-sm text-neutral-600">{formatDate(event.date)}</p>
                      </div>
                    </div>
                    {isToday(event.date) && (
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        HOJE!
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="card max-w-[95vw] sm:max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideInUp">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-neutral-900">Novo Evento</h2>
                <button 
                  onClick={() => setShowForm(false)}
                  className="text-neutral-400 hover:text-neutral-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* Event Type */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-3">
                    Tipo de evento
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {eventTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setCurrentEvent({...currentEvent, type: type.value as CalendarEvent['type']})}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          currentEvent.type === type.value
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

                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Título do evento
                  </label>
                  <input
                    type="text"
                    value={currentEvent.title}
                    onChange={(e) => setCurrentEvent({...currentEvent, title: e.target.value})}
                    className="input"
                    placeholder="Ex: Jantar romântico, Aniversário de namoro..."
                  />
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Data
                    </label>
                    <input
                      type="date"
                      value={currentEvent.date}
                      onChange={(e) => setCurrentEvent({...currentEvent, date: e.target.value})}
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Horário
                    </label>
                    <input
                      type="time"
                      value={currentEvent.time}
                      onChange={(e) => setCurrentEvent({...currentEvent, time: e.target.value})}
                      className="input"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Descrição
                  </label>
                  <textarea
                    rows={3}
                    value={currentEvent.description}
                    onChange={(e) => setCurrentEvent({...currentEvent, description: e.target.value})}
                    className="input resize-none"
                    placeholder="Detalhes sobre o evento, local, observações..."
                  />
                </div>

                {/* Reminder */}
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="reminder"
                    checked={currentEvent.reminder}
                    onChange={(e) => setCurrentEvent({...currentEvent, reminder: e.target.checked})}
                    className="w-5 h-5 text-rose-500 rounded focus:ring-rose-500"
                  />
                  <label htmlFor="reminder" className="text-sm font-medium text-neutral-700">
                    🔔 Lembrar-me deste evento
                  </label>
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
                    onClick={handleSaveEvent}
                    className="btn-primary flex-1"
                  >
                    📅 Salvar Evento
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Events List */}
        <div className="space-y-6">
          {events.length === 0 ? (
            <div className="card text-center py-12">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                Seu calendário está vazio
              </h3>
              <p className="text-neutral-600 mb-6 max-w-md mx-auto">
                Comece planejando momentos especiais para vocês dois. 
                Um relacionamento forte precisa de tempo de qualidade planejado.
              </p>
              <button 
                onClick={() => setShowForm(true)}
                className="btn-primary"
              >
                📅 Planejar Primeiro Encontro
              </button>
            </div>
          ) : (
            events.map((event) => {
              const typeConfig = getTypeConfig(event.type);
              return (
                <div key={event.id} className={`card hover:shadow-glow transition-all duration-300 ${
                  isToday(event.date) ? 'border-2 border-red-300 bg-red-50' : ''
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 bg-gradient-to-r from-${typeConfig.color}-400 to-${typeConfig.color}-500 rounded-2xl flex items-center justify-center`}>
                        <span className="text-2xl">{typeConfig.emoji}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-1">{event.title}</h3>
                        <p className="text-neutral-600 text-sm mb-1">{formatDate(event.date)}</p>
                        <div className="flex items-center space-x-4 text-sm text-neutral-500">
                          <span>🕒 {event.time}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${typeConfig.color}-100 text-${typeConfig.color}-700`}>
                            {typeConfig.label}
                          </span>
                        </div>
                      </div>
                    </div>
                    {isToday(event.date) && (
                      <div className="text-center">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          HOJE!
                        </span>
                      </div>
                    )}
                  </div>

                  {event.description && (
                    <p className="text-neutral-700 mb-4 pl-20">{event.description}</p>
                  )}

                  {event.reminder && (
                    <div className="pl-20">
                      <span className="inline-flex items-center text-sm text-neutral-500">
                        <span className="mr-2">🔔</span>
                        Lembrete ativado
                      </span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </Layout>
  );
}
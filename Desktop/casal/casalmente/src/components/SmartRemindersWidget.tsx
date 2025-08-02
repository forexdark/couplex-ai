import { useState } from 'react';
import { useSmartReminders, SmartReminder } from '../contexts/SmartRemindersContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function SmartRemindersWidget() {
  const { t } = useLanguage();
  const {
    getActiveReminders,
    completeReminder,
    snoozeReminder,
    dismissReminder,
    isAnalyzing
  } = useSmartReminders();

  const [expandedReminder, setExpandedReminder] = useState<string | null>(null);
  const activeReminders = getActiveReminders();

  const getPriorityColor = (priority: SmartReminder['priority']) => {
    switch (priority) {
      case 'urgent': return 'border-red-500 bg-red-50';
      case 'high': return 'border-orange-500 bg-orange-50';
      case 'medium': return 'border-blue-500 bg-blue-50';
      case 'low': return 'border-green-500 bg-green-50';
      default: return 'border-neutral-300 bg-neutral-50';
    }
  };

  const getPriorityIcon = (priority: SmartReminder['priority']) => {
    switch (priority) {
      case 'urgent': return '🚨';
      case 'high': return '⚠️';
      case 'medium': return '💡';
      case 'low': return 'ℹ️';
      default: return '📋';
    }
  };

  const getTypeIcon = (type: SmartReminder['type']) => {
    const icons = {
      check_in: '📝',
      appreciation: '💕',
      quality_time: '⏰',
      communication: '💬',
      self_care: '🧘',
      celebration: '🎉',
      conflict_resolution: '🤝'
    };
    return icons[type] || '📋';
  };

  const handleComplete = (id: string) => {
    completeReminder(id);
    setExpandedReminder(null);
  };

  const handleSnooze = (id: string, hours: number) => {
    snoozeReminder(id, hours);
    setExpandedReminder(null);
  };

  const handleDismiss = (id: string) => {
    dismissReminder(id);
    setExpandedReminder(null);
  };

  if (activeReminders.length === 0 && !isAnalyzing) {
    return (
      <div className="bg-white rounded-2xl shadow-soft p-6">
        <div className="text-center">
          <div className="text-4xl mb-3">🧠</div>
          <h3 className="font-semibold text-neutral-800 mb-2">
            IA Monitorando seu Relacionamento
          </h3>
          <p className="text-sm text-neutral-600">
            Nossa IA está analisando seus padrões para oferecer lembretes personalizados
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-soft p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">🧠</div>
          <div>
            <h3 className="font-bold text-neutral-800">Lembretes Inteligentes</h3>
            <p className="text-sm text-neutral-600">Baseados em IA contextual</p>
          </div>
        </div>
        {isAnalyzing && (
          <div className="flex items-center space-x-2 text-primary-600">
            <div className="animate-spin w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full"></div>
            <span className="text-sm">Analisando...</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {activeReminders.slice(0, 5).map((reminder) => (
          <div
            key={reminder.id}
            className={`border-l-4 rounded-lg p-4 transition-all ${getPriorityColor(reminder.priority)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="text-xl flex-shrink-0">
                  {getTypeIcon(reminder.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-neutral-800">
                      {reminder.title}
                    </h4>
                    <span className="text-xs">
                      {getPriorityIcon(reminder.priority)}
                    </span>
                    {reminder.aiGenerated && (
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full text-xs font-medium">
                        IA
                      </span>
                    )}
                  </div>
                  
                  <p className="text-neutral-700 text-sm mb-2">
                    {reminder.message}
                  </p>

                  {expandedReminder === reminder.id && (
                    <div className="mt-3 space-y-3">
                      <div className="bg-white/80 rounded-lg p-3">
                        <div className="text-xs text-neutral-500 mb-1">Ação Sugerida:</div>
                        <div className="text-sm text-neutral-700">
                          {reminder.suggestedAction}
                        </div>
                      </div>
                      
                      <div className="bg-white/80 rounded-lg p-3">
                        <div className="text-xs text-neutral-500 mb-1">Por que agora?</div>
                        <div className="text-sm text-neutral-700">
                          {reminder.contextReason}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleComplete(reminder.id)}
                          className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs font-medium transition-colors"
                        >
                          ✅ Concluído
                        </button>
                        
                        <button
                          onClick={() => handleSnooze(reminder.id, 1)}
                          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-medium transition-colors"
                        >
                          ⏰ Lembrar em 1h
                        </button>
                        
                        <button
                          onClick={() => handleSnooze(reminder.id, 24)}
                          className="px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-xs font-medium transition-colors"
                        >
                          📅 Amanhã
                        </button>
                        
                        <button
                          onClick={() => handleDismiss(reminder.id)}
                          className="px-3 py-1 bg-neutral-400 hover:bg-neutral-500 text-white rounded-lg text-xs font-medium transition-colors"
                        >
                          ❌ Dispensar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <button
                onClick={() => setExpandedReminder(
                  expandedReminder === reminder.id ? null : reminder.id
                )}
                className="text-neutral-400 hover:text-neutral-600 transition-colors ml-2"
              >
                {expandedReminder === reminder.id ? '▲' : '▼'}
              </button>
            </div>

            {/* Quick Actions for collapsed state */}
            {expandedReminder !== reminder.id && (
              <div className="flex items-center justify-between mt-3">
                <div className="text-xs text-neutral-500">
                  {reminder.scheduledFor.toLocaleTimeString('pt-BR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleComplete(reminder.id)}
                    className="text-green-600 hover:text-green-700 transition-colors"
                    title="Marcar como concluído"
                  >
                    ✅
                  </button>
                  <button
                    onClick={() => setExpandedReminder(reminder.id)}
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                    title="Ver detalhes"
                  >
                    👁️
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {activeReminders.length > 5 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-neutral-600">
            +{activeReminders.length - 5} lembretes adicionais
          </p>
        </div>
      )}

      {activeReminders.length === 0 && isAnalyzing && (
        <div className="text-center py-6">
          <div className="animate-pulse text-2xl mb-2">🤖</div>
          <p className="text-sm text-neutral-600">
            Analisando seus padrões para gerar lembretes personalizados...
          </p>
        </div>
      )}
    </div>
  );
}
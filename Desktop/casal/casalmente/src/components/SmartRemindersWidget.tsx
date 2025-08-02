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
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft p-4 border border-neutral-100 dark:border-neutral-700">
        <div className="text-center">
          <div className="text-2xl mb-2">🧠</div>
          <h3 className="font-medium text-neutral-800 dark:text-neutral-200 mb-1 text-sm">
            IA Monitorando seu Relacionamento
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            Nossa IA está analisando seus padrões para oferecer lembretes personalizados
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft p-3 sm:p-4 border border-neutral-100 dark:border-neutral-700">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center space-x-2">
          <div className="text-lg sm:text-xl">🧠</div>
          <div>
            <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 text-sm">Lembretes Inteligentes</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">IA contextual</p>
          </div>
        </div>
        {isAnalyzing && (
          <div className="flex items-center space-x-1 text-primary-600 dark:text-primary-400">
            <div className="animate-spin w-3 h-3 border-2 border-primary-600 dark:border-primary-400 border-t-transparent rounded-full"></div>
            <span className="text-xs">Analisando...</span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {activeReminders.slice(0, 3).map((reminder) => (
          <div
            key={reminder.id}
            className={`border-l-3 rounded-lg p-3 transition-all bg-neutral-50 dark:bg-neutral-700/50 border-l-primary-500`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-2 flex-1">
                <div className="text-sm flex-shrink-0">
                  {getTypeIcon(reminder.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-neutral-800 dark:text-neutral-200 text-sm">
                      {reminder.title}
                    </h4>
                    <span className="text-xs">
                      {getPriorityIcon(reminder.priority)}
                    </span>
                    {reminder.aiGenerated && (
                      <span className="px-1.5 py-0.5 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-full text-xs font-medium">
                        IA
                      </span>
                    )}
                  </div>
                  
                  <p className="text-neutral-600 dark:text-neutral-400 text-xs mb-2 line-clamp-2">
                    {reminder.message}
                  </p>

                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center justify-between mt-2">
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                {reminder.scheduledFor.toLocaleTimeString('pt-BR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleComplete(reminder.id)}
                  className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors text-sm"
                  title="Marcar como concluído"
                >
                  ✅
                </button>
                <button
                  onClick={() => handleSnooze(reminder.id, 1)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm"
                  title="Lembrar em 1h"
                >
                  ⏰
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeReminders.length > 3 && (
        <div className="mt-3 text-center">
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            +{activeReminders.length - 3} lembretes adicionais
          </p>
        </div>
      )}

      {activeReminders.length === 0 && isAnalyzing && (
        <div className="text-center py-4">
          <div className="animate-pulse text-lg mb-1">🤖</div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            Analisando seus padrões...
          </p>
        </div>
      )}
    </div>
  );
}
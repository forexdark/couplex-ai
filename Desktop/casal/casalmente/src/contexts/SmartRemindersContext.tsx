import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useEmotionalDiary } from './EmotionalDiaryContext';
import { useGamification } from './GamificationContext';
import { useCouple } from './CoupleContext';
import { useNotifications } from './NotificationContext';

export interface SmartReminder {
  id: string;
  type: 'check_in' | 'appreciation' | 'quality_time' | 'communication' | 'self_care' | 'celebration' | 'conflict_resolution';
  title: string;
  message: string;
  suggestedAction: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  scheduledFor: Date;
  contextReason: string; // Why this reminder was generated
  aiGenerated: boolean;
  completed: boolean;
  snoozedUntil?: Date;
  category: 'emotional' | 'behavioral' | 'relationship' | 'personal';
  triggers: string[]; // What triggered this reminder
}

export interface AIInsight {
  id: string;
  type: 'pattern' | 'suggestion' | 'warning' | 'celebration';
  title: string;
  description: string;
  confidence: number; // 0-1
  dataPoints: string[];
  actionable: boolean;
  urgency: 'low' | 'medium' | 'high';
  generatedAt: Date;
}

interface SmartRemindersContextType {
  reminders: SmartReminder[];
  aiInsights: AIInsight[];
  isAnalyzing: boolean;
  generateReminders: () => Promise<void>;
  completeReminder: (id: string) => void;
  snoozeReminder: (id: string, hours: number) => void;
  dismissReminder: (id: string) => void;
  getActiveReminders: () => SmartReminder[];
  getInsightsByType: (type: AIInsight['type']) => AIInsight[];
  scheduleCustomReminder: (reminder: Omit<SmartReminder, 'id' | 'aiGenerated'>) => void;
}

const SmartRemindersContext = createContext<SmartRemindersContextType | undefined>(undefined);

export function SmartRemindersProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { entries, currentAnalysis } = useEmotionalDiary();
  const { userProgress } = useGamification();
  const { partner, isConnected } = useCouple();
  const { addNotification, sendPartnerNotification } = useNotifications();

  const [reminders, setReminders] = useState<SmartReminder[]>([]);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (user) {
      loadReminders();
      loadInsights();
      // Executar análise inteligente a cada 6 horas
      const interval = setInterval(generateReminders, 6 * 60 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [user]);

  useEffect(() => {
    // Gerar lembretes quando novos dados estão disponíveis
    if (entries.length > 0 || currentAnalysis) {
      setTimeout(generateReminders, 2000); // Delay para evitar múltiplas execuções
    }
  }, [entries.length, currentAnalysis]);

  const loadReminders = () => {
    const saved = localStorage.getItem(`smart_reminders_${user?.uid}`);
    if (saved) {
      const parsed = JSON.parse(saved).map((reminder: any) => ({
        ...reminder,
        scheduledFor: new Date(reminder.scheduledFor),
        snoozedUntil: reminder.snoozedUntil ? new Date(reminder.snoozedUntil) : undefined
      }));
      setReminders(parsed);
    }
  };

  const loadInsights = () => {
    const saved = localStorage.getItem(`ai_insights_${user?.uid}`);
    if (saved) {
      const parsed = JSON.parse(saved).map((insight: any) => ({
        ...insight,
        generatedAt: new Date(insight.generatedAt)
      }));
      setAiInsights(parsed);
    }
  };

  const saveReminders = (updatedReminders: SmartReminder[]) => {
    if (user) {
      localStorage.setItem(`smart_reminders_${user.uid}`, JSON.stringify(updatedReminders));
      setReminders(updatedReminders);
    }
  };

  const saveInsights = (updatedInsights: AIInsight[]) => {
    if (user) {
      localStorage.setItem(`ai_insights_${user.uid}`, JSON.stringify(updatedInsights));
      setAiInsights(updatedInsights);
    }
  };

  const generateReminders = async () => {
    if (!user || isAnalyzing) return;
    
    setIsAnalyzing(true);
    
    try {
      const newReminders: SmartReminder[] = [];
      const newInsights: AIInsight[] = [];
      
      // Análise baseada no diário emocional
      if (currentAnalysis && entries.length > 0) {
        // Verificar tendência de humor
        if (currentAnalysis.moodTrend === 'declining') {
          newReminders.push({
            id: `mood_support_${Date.now()}`,
            type: 'communication',
            title: 'Momento para Conversar',
            message: 'Notamos que seu humor tem estado mais baixo. Que tal conversar com seu parceiro sobre como está se sentindo?',
            suggestedAction: 'Inicie uma conversa honesta sobre seus sentimentos',
            priority: 'high',
            scheduledFor: new Date(Date.now() + 30 * 60 * 1000), // 30 minutos
            contextReason: 'Tendência de humor em declínio detectada',
            aiGenerated: true,
            completed: false,
            category: 'emotional',
            triggers: ['mood_declining']
          });

          newInsights.push({
            id: `insight_mood_${Date.now()}`,
            type: 'warning',
            title: 'Tendência de Humor Preocupante',
            description: `Seu humor tem declinado nos últimos dias. Isso pode afetar seu relacionamento. É importante abordar isso com cuidado.`,
            confidence: 0.8,
            dataPoints: [`Humor médio: ${currentAnalysis.averageMood.toFixed(1)}/5`, 'Tendência: Declinando'],
            actionable: true,
            urgency: 'medium',
            generatedAt: new Date()
          });
        }

        // Verificar emoções dominantes
        if (currentAnalysis.dominantEmotions.includes('ansioso') || currentAnalysis.dominantEmotions.includes('estresse')) {
          newReminders.push({
            id: `stress_relief_${Date.now()}`,
            type: 'self_care',
            title: 'Hora de Relaxar Juntos',
            message: 'Você tem demonstrado sinais de ansiedade. Que tal uma atividade relaxante com seu parceiro?',
            suggestedAction: 'Pratiquem meditação, yoga ou simplesmente conversem em um ambiente calmo',
            priority: 'medium',
            scheduledFor: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 horas
            contextReason: 'Alto nível de ansiedade detectado',
            aiGenerated: true,
            completed: false,
            category: 'emotional',
            triggers: ['anxiety_detected']
          });
        }

        if (currentAnalysis.dominantEmotions.includes('solitário')) {
          newReminders.push({
            id: `quality_time_${Date.now()}`,
            type: 'quality_time',
            title: 'Tempo de Qualidade Necessário',
            message: 'Você tem se sentido solitário. É hora de planejar um momento especial com seu parceiro.',
            suggestedAction: 'Organizem um encontro sem distrações, apenas vocês dois',
            priority: 'high',
            scheduledFor: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 horas
            contextReason: 'Sentimento de solidão identificado',
            aiGenerated: true,
            completed: false,
            category: 'relationship',
            triggers: ['loneliness_detected']
          });
        }
      }

      // Análise baseada na gamificação
      if (userProgress.streak === 0) {
        newReminders.push({
          id: `streak_recovery_${Date.now()}`,
          type: 'check_in',
          title: 'Hora de Voltar aos Trilhos',
          message: 'Você perdeu sua sequência diária. Que tal fazer um check-in rápido para retomar o hábito?',
          suggestedAction: 'Faça seu check-in emocional hoje',
          priority: 'medium',
          scheduledFor: new Date(Date.now() + 60 * 60 * 1000), // 1 hora
          contextReason: 'Sequência diária perdida',
          aiGenerated: true,
          completed: false,
          category: 'behavioral',
          triggers: ['streak_broken']
        });
      } else if (userProgress.streak >= 7) {
        newReminders.push({
          id: `streak_celebration_${Date.now()}`,
          type: 'celebration',
          title: 'Parabéns pela Consistência!',
          message: `Você manteve uma sequência de ${userProgress.streak} dias! Celebrem essa conquista juntos.`,
          suggestedAction: 'Façam algo especial para comemorar',
          priority: 'low',
          scheduledFor: new Date(Date.now() + 30 * 60 * 1000), // 30 minutos
          contextReason: 'Sequência longa alcançada',
          aiGenerated: true,
          completed: false,
          category: 'relationship',
          triggers: ['streak_milestone']
        });
      }

      // Análise baseada na conexão do casal
      if (isConnected && partner) {
        // Lembrete de apreciação regular
        const lastAppreciation = reminders.find(r => r.type === 'appreciation' && !r.completed);
        if (!lastAppreciation) {
          newReminders.push({
            id: `appreciation_${Date.now()}`,
            type: 'appreciation',
            title: 'Momento de Gratidão',
            message: `Quando foi a última vez que você disse algo especial para ${partner.displayName}?`,
            suggestedAction: 'Expresse uma qualidade que você admira no seu parceiro',
            priority: 'medium',
            scheduledFor: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 horas
            contextReason: 'Rotina de apreciação',
            aiGenerated: true,
            completed: false,
            category: 'relationship',
            triggers: ['appreciation_routine']
          });
        }
      }

      // Lembretes baseados em padrões temporais
      const now = new Date();
      const isWeekend = now.getDay() === 0 || now.getDay() === 6;
      const isEvening = now.getHours() >= 18;

      if (isWeekend && isEvening) {
        newReminders.push({
          id: `weekend_quality_${Date.now()}`,
          type: 'quality_time',
          title: 'Final de Semana Perfeito',
          message: 'É fim de semana à noite - o momento ideal para reconectar com seu parceiro.',
          suggestedAction: 'Desliguem os celulares e tenham uma conversa profunda',
          priority: 'medium',
          scheduledFor: new Date(Date.now() + 15 * 60 * 1000), // 15 minutos
          contextReason: 'Padrão temporal favorável',
          aiGenerated: true,
          completed: false,
          category: 'relationship',
          triggers: ['weekend_evening']
        });
      }

      // Remover duplicatas e reminders antigos
      const existingIds = reminders.map(r => r.id);
      const filteredNewReminders = newReminders.filter(r => !existingIds.includes(r.id));
      
      // Limitar a 10 lembretes ativos
      const activeReminders = reminders.filter(r => !r.completed && new Date() < r.scheduledFor);
      const totalReminders = [...activeReminders, ...filteredNewReminders].slice(0, 10);
      
      if (filteredNewReminders.length > 0) {
        saveReminders([...reminders, ...filteredNewReminders]);
        
        // Notificar sobre novos insights importantes
        filteredNewReminders.forEach(reminder => {
          if (reminder.priority === 'high' || reminder.priority === 'urgent') {
            addNotification({
              type: 'system',
              title: '🧠 IA Detectou Algo Importante',
              message: reminder.title,
              actionUrl: '/dashboard'
            });
          }
        });
      }

      if (newInsights.length > 0) {
        const existingInsightIds = aiInsights.map(i => i.id);
        const filteredNewInsights = newInsights.filter(i => !existingInsightIds.includes(i.id));
        
        if (filteredNewInsights.length > 0) {
          saveInsights([...aiInsights, ...filteredNewInsights]);
        }
      }

    } catch (error) {
      console.error('Erro ao gerar lembretes inteligentes:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const completeReminder = (id: string) => {
    const updatedReminders = reminders.map(reminder =>
      reminder.id === id ? { ...reminder, completed: true } : reminder
    );
    saveReminders(updatedReminders);

    const reminder = reminders.find(r => r.id === id);
    if (reminder && isConnected) {
      sendPartnerNotification(
        'system',
        'Progresso no Relacionamento',
        `Seu parceiro completou: ${reminder.title}`,
        '/dashboard'
      );
    }
  };

  const snoozeReminder = (id: string, hours: number) => {
    const snoozedUntil = new Date();
    snoozedUntil.setHours(snoozedUntil.getHours() + hours);

    const updatedReminders = reminders.map(reminder =>
      reminder.id === id ? { ...reminder, snoozedUntil } : reminder
    );
    saveReminders(updatedReminders);
  };

  const dismissReminder = (id: string) => {
    const updatedReminders = reminders.filter(reminder => reminder.id !== id);
    saveReminders(updatedReminders);
  };

  const getActiveReminders = (): SmartReminder[] => {
    const now = new Date();
    return reminders.filter(reminder => 
      !reminder.completed && 
      reminder.scheduledFor <= now &&
      (!reminder.snoozedUntil || reminder.snoozedUntil <= now)
    ).sort((a, b) => {
      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  };

  const getInsightsByType = (type: AIInsight['type']): AIInsight[] => {
    return aiInsights.filter(insight => insight.type === type)
      .sort((a, b) => b.generatedAt.getTime() - a.generatedAt.getTime());
  };

  const scheduleCustomReminder = (reminderData: Omit<SmartReminder, 'id' | 'aiGenerated'>) => {
    const newReminder: SmartReminder = {
      ...reminderData,
      id: `custom_${Date.now()}`,
      aiGenerated: false
    };

    saveReminders([...reminders, newReminder]);
  };

  return (
    <SmartRemindersContext.Provider value={{
      reminders,
      aiInsights,
      isAnalyzing,
      generateReminders,
      completeReminder,
      snoozeReminder,
      dismissReminder,
      getActiveReminders,
      getInsightsByType,
      scheduleCustomReminder
    }}>
      {children}
    </SmartRemindersContext.Provider>
  );
}

export function useSmartReminders() {
  const context = useContext(SmartRemindersContext);
  if (context === undefined) {
    throw new Error('useSmartReminders must be used within a SmartRemindersProvider');
  }
  return context;
}
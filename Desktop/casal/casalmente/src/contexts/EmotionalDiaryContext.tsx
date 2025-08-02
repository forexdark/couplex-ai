import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useGamification } from './GamificationContext';

export interface MoodEntry {
  id: string;
  date: Date;
  mood: 'very_sad' | 'sad' | 'neutral' | 'happy' | 'very_happy';
  moodScore: number; // 1-5
  emotions: string[];
  title: string;
  content: string;
  triggers?: string[];
  gratitude?: string;
  reflection?: string;
  visibility: 'private' | 'partner' | 'both';
  tags: string[];
  audioNote?: string; // URL para nota de áudio
  photoUrl?: string; // URL para foto anexada
}

export interface MoodAnalysis {
  averageMood: number;
  moodTrend: 'improving' | 'declining' | 'stable';
  dominantEmotions: string[];
  commonTriggers: string[];
  bestDays: string[]; // dias da semana
  recommendedActions: string[];
  weeklyPattern: { day: string; avgMood: number }[];
  monthlyPattern: { week: number; avgMood: number }[];
}

interface EmotionalDiaryContextType {
  entries: MoodEntry[];
  currentAnalysis: MoodAnalysis | null;
  isLoading: boolean;
  addEntry: (entry: Omit<MoodEntry, 'id' | 'date'>) => Promise<void>;
  updateEntry: (id: string, updates: Partial<MoodEntry>) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
  getEntriesByDateRange: (startDate: Date, endDate: Date) => MoodEntry[];
  getAnalysis: (days?: number) => MoodAnalysis;
  exportData: (format: 'json' | 'csv') => string;
  getInsights: () => string[];
}

const EmotionalDiaryContext = createContext<EmotionalDiaryContextType | undefined>(undefined);

const emotionsList = [
  'feliz', 'triste', 'ansioso', 'calmo', 'irritado', 'amoroso', 'solitário',
  'confiante', 'inseguro', 'grato', 'frustrado', 'esperançoso', 'preocupado',
  'empolgado', 'cansado', 'orgulhoso', 'envergonhado', 'curioso', 'entediado',
  'inspirado', 'overwhelmed', 'peaceful', 'jealous', 'nostalgic', 'optimistic'
];

export function EmotionalDiaryProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { addPoints, unlockAchievement } = useGamification();
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [currentAnalysis, setCurrentAnalysis] = useState<MoodAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadEntries();
    }
  }, [user]);

  useEffect(() => {
    if (entries.length > 0) {
      const analysis = getAnalysis();
      setCurrentAnalysis(analysis);
    }
  }, [entries]);

  const loadEntries = async () => {
    setIsLoading(true);
    try {
      const saved = localStorage.getItem(`diary_entries_${user?.uid}`);
      if (saved) {
        const parsedEntries = JSON.parse(saved).map((entry: any) => ({
          ...entry,
          date: new Date(entry.date)
        }));
        setEntries(parsedEntries);
      }
    } catch (error) {
      console.error('Erro ao carregar entradas do diário:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveEntries = (updatedEntries: MoodEntry[]) => {
    if (user) {
      localStorage.setItem(`diary_entries_${user.uid}`, JSON.stringify(updatedEntries));
      setEntries(updatedEntries);
    }
  };

  const addEntry = async (entryData: Omit<MoodEntry, 'id' | 'date'>) => {
    const newEntry: MoodEntry = {
      ...entryData,
      id: `entry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      date: new Date()
    };

    const updatedEntries = [newEntry, ...entries];
    saveEntries(updatedEntries);

    // Gamificação
    addPoints(35, 'Nova entrada no diário emocional');
    
    // Conquistas baseadas em quantidade de entradas
    if (updatedEntries.length === 1) {
      unlockAchievement('first_diary_entry');
    } else if (updatedEntries.length === 10) {
      unlockAchievement('diary_entries_10');
    } else if (updatedEntries.length === 30) {
      unlockAchievement('diary_entries_30');
    }

    // Conquista por consistência (7 dias seguidos)
    if (checkConsecutiveDays(updatedEntries, 7)) {
      unlockAchievement('diary_streak_7');
    }
  };

  const updateEntry = async (id: string, updates: Partial<MoodEntry>) => {
    const updatedEntries = entries.map(entry =>
      entry.id === id ? { ...entry, ...updates } : entry
    );
    saveEntries(updatedEntries);
  };

  const deleteEntry = async (id: string) => {
    const updatedEntries = entries.filter(entry => entry.id !== id);
    saveEntries(updatedEntries);
  };

  const getEntriesByDateRange = (startDate: Date, endDate: Date): MoodEntry[] => {
    return entries.filter(entry => 
      entry.date >= startDate && entry.date <= endDate
    );
  };

  const checkConsecutiveDays = (entryList: MoodEntry[], targetDays: number): boolean => {
    if (entryList.length < targetDays) return false;

    const sortedEntries = [...entryList].sort((a, b) => b.date.getTime() - a.date.getTime());
    let consecutiveDays = 1;
    
    for (let i = 1; i < sortedEntries.length; i++) {
      const currentDate = new Date(sortedEntries[i].date);
      const previousDate = new Date(sortedEntries[i-1].date);
      
      const dayDiff = Math.floor((previousDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (dayDiff === 1) {
        consecutiveDays++;
        if (consecutiveDays >= targetDays) return true;
      } else {
        consecutiveDays = 1;
      }
    }
    
    return false;
  };

  const getAnalysis = (days: number = 30): MoodAnalysis => {
    if (entries.length === 0) {
      return {
        averageMood: 3,
        moodTrend: 'stable',
        dominantEmotions: [],
        commonTriggers: [],
        bestDays: [],
        recommendedActions: [],
        weeklyPattern: [],
        monthlyPattern: []
      };
    }

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    const recentEntries = entries.filter(entry => entry.date >= cutoffDate);
    
    // Calcular humor médio
    const averageMood = recentEntries.reduce((sum, entry) => sum + entry.moodScore, 0) / recentEntries.length;
    
    // Determinar tendência
    const firstHalf = recentEntries.slice(Math.floor(recentEntries.length / 2));
    const secondHalf = recentEntries.slice(0, Math.floor(recentEntries.length / 2));
    
    const firstHalfAvg = firstHalf.reduce((sum, entry) => sum + entry.moodScore, 0) / firstHalf.length;
    const secondHalfAvg = secondHalf.reduce((sum, entry) => sum + entry.moodScore, 0) / secondHalf.length;
    
    let moodTrend: 'improving' | 'declining' | 'stable' = 'stable';
    if (secondHalfAvg - firstHalfAvg > 0.3) moodTrend = 'improving';
    else if (firstHalfAvg - secondHalfAvg > 0.3) moodTrend = 'declining';
    
    // Emoções dominantes
    const emotionCount: { [key: string]: number } = {};
    recentEntries.forEach(entry => {
      entry.emotions.forEach(emotion => {
        emotionCount[emotion] = (emotionCount[emotion] || 0) + 1;
      });
    });
    
    const dominantEmotions = Object.entries(emotionCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([emotion]) => emotion);
    
    // Gatilhos comuns
    const triggerCount: { [key: string]: number } = {};
    recentEntries.forEach(entry => {
      entry.triggers?.forEach(trigger => {
        triggerCount[trigger] = (triggerCount[trigger] || 0) + 1;
      });
    });
    
    const commonTriggers = Object.entries(triggerCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([trigger]) => trigger);
    
    // Melhores dias da semana
    const dayMoods: { [key: string]: number[] } = {};
    const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    
    recentEntries.forEach(entry => {
      const dayName = dayNames[entry.date.getDay()];
      if (!dayMoods[dayName]) dayMoods[dayName] = [];
      dayMoods[dayName].push(entry.moodScore);
    });
    
    const bestDays = Object.entries(dayMoods)
      .map(([day, moods]) => ({ 
        day, 
        avg: moods.reduce((sum, mood) => sum + mood, 0) / moods.length 
      }))
      .sort((a, b) => b.avg - a.avg)
      .slice(0, 3)
      .map(({ day }) => day);
    
    // Padrão semanal
    const weeklyPattern = dayNames.map(day => ({
      day,
      avgMood: dayMoods[day] 
        ? dayMoods[day].reduce((sum, mood) => sum + mood, 0) / dayMoods[day].length 
        : 3
    }));
    
    // Padrão mensal (últimas 4 semanas)
    const monthlyPattern: { week: number; avgMood: number }[] = [];
    for (let week = 0; week < 4; week++) {
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - (week * 7));
      const weekEnd = new Date();
      weekEnd.setDate(weekEnd.getDate() - ((week + 1) * 7));
      
      const weekEntries = recentEntries.filter(entry => 
        entry.date <= weekStart && entry.date > weekEnd
      );
      
      const avgMood = weekEntries.length > 0 
        ? weekEntries.reduce((sum, entry) => sum + entry.moodScore, 0) / weekEntries.length 
        : 3;
      
      monthlyPattern.unshift({ week: week + 1, avgMood });
    }
    
    // Ações recomendadas baseadas na análise
    const recommendedActions = getRecommendedActions(averageMood, moodTrend, dominantEmotions);
    
    return {
      averageMood,
      moodTrend,
      dominantEmotions,
      commonTriggers,
      bestDays,
      recommendedActions,
      weeklyPattern,
      monthlyPattern
    };
  };

  const getRecommendedActions = (avgMood: number, trend: string, emotions: string[]): string[] => {
    const actions: string[] = [];
    
    if (avgMood < 3) {
      actions.push('Considere conversar com seu parceiro sobre como está se sentindo');
      actions.push('Pratique atividades que trazem alegria ao seu relacionamento');
      actions.push('Talvez seja hora de buscar apoio profissional');
    } else if (avgMood > 4) {
      actions.push('Continue fazendo o que está funcionando bem!');
      actions.push('Compartilhe essa energia positiva com seu parceiro');
    }
    
    if (trend === 'declining') {
      actions.push('Identifique o que pode estar causando essa mudança');
      actions.push('Planeje atividades especiais com seu parceiro');
    }
    
    if (emotions.includes('ansioso') || emotions.includes('preocupado')) {
      actions.push('Pratique técnicas de relaxamento juntos');
      actions.push('Converse abertamente sobre suas preocupações');
    }
    
    if (emotions.includes('solitário')) {
      actions.push('Planeje mais tempo de qualidade com seu parceiro');
      actions.push('Expressem mais afeto físico e emocional');
    }
    
    return actions.slice(0, 5);
  };

  const exportData = (format: 'json' | 'csv'): string => {
    if (format === 'json') {
      return JSON.stringify(entries, null, 2);
    } else {
      const headers = ['Data', 'Humor', 'Emoções', 'Título', 'Conteúdo'];
      const csvContent = [
        headers.join(','),
        ...entries.map(entry => [
          entry.date.toISOString().split('T')[0],
          entry.moodScore.toString(),
          entry.emotions.join(';'),
          `"${entry.title}"`,
          `"${entry.content}"`
        ].join(','))
      ].join('\n');
      
      return csvContent;
    }
  };

  const getInsights = (): string[] => {
    const analysis = currentAnalysis || getAnalysis();
    const insights: string[] = [];
    
    if (analysis.moodTrend === 'improving') {
      insights.push('📈 Seu humor tem melhorado consistentemente - continue assim!');
    } else if (analysis.moodTrend === 'declining') {
      insights.push('📉 Seu humor tem estado mais baixo - que tal conversar com seu parceiro?');
    }
    
    if (analysis.averageMood > 4) {
      insights.push('😊 Você tem mantido um humor muito positivo no relacionamento!');
    } else if (analysis.averageMood < 2.5) {
      insights.push('💙 Percebemos que você tem passado por momentos difíceis - estamos aqui para apoiar');
    }
    
    if (analysis.bestDays.length > 0) {
      insights.push(`🌟 Seus melhores dias são: ${analysis.bestDays.slice(0, 2).join(' e ')}`);
    }
    
    if (analysis.dominantEmotions.includes('grato')) {
      insights.push('🙏 A gratidão tem sido uma emoção forte em você - isso é maravilhoso!');
    }
    
    return insights;
  };

  return (
    <EmotionalDiaryContext.Provider value={{
      entries,
      currentAnalysis,
      isLoading,
      addEntry,
      updateEntry,
      deleteEntry,
      getEntriesByDateRange,
      getAnalysis,
      exportData,
      getInsights
    }}>
      {children}
    </EmotionalDiaryContext.Provider>
  );
}

export function useEmotionalDiary() {
  const context = useContext(EmotionalDiaryContext);
  if (context === undefined) {
    throw new Error('useEmotionalDiary must be used within an EmotionalDiaryProvider');
  }
  return context;
}
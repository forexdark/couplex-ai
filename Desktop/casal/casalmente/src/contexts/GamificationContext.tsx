import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  unlockedAt?: Date;
  category: 'daily' | 'weekly' | 'milestone' | 'special';
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  type: 'daily' | 'weekly' | 'monthly';
  completed: boolean;
  progress: number;
  maxProgress: number;
  expiresAt: Date;
}

interface UserProgress {
  level: number;
  totalPoints: number;
  currentLevelPoints: number;
  pointsToNextLevel: number;
  streak: number;
  lastActivity: Date | null;
}

interface GamificationContextType {
  userProgress: UserProgress;
  achievements: Achievement[];
  challenges: Challenge[];
  unlockedAchievements: Achievement[];
  addPoints: (points: number, reason: string) => void;
  completeChallenge: (challengeId: string) => void;
  unlockAchievement: (achievementId: string) => void;
  updateStreak: () => void;
  getDailyChallenge: () => Challenge | null;
  getWeeklyChallenge: () => Challenge | null;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

// Conquistas disponíveis
const availableAchievements: Achievement[] = [
  {
    id: 'first_login',
    title: 'Primeiro Passo',
    description: 'Fez seu primeiro login no CoupleX AI',
    icon: '🎯',
    points: 50,
    category: 'milestone'
  },
  {
    id: 'daily_streak_7',
    title: 'Semana Dedicada',
    description: 'Manteve uma sequência de 7 dias consecutivos',
    icon: '🔥',
    points: 200,
    category: 'daily'
  },
  {
    id: 'daily_streak_30',
    title: 'Mês de Compromisso',
    description: 'Manteve uma sequência de 30 dias consecutivos',
    icon: '🏆',
    points: 500,
    category: 'daily'
  },
  {
    id: 'partner_connected',
    title: 'Unidos Digitalmente',
    description: 'Conectou-se com seu parceiro(a)',
    icon: '💕',
    points: 100,
    category: 'milestone'
  },
  {
    id: 'first_goal_completed',
    title: 'Meta Alcançada',
    description: 'Completou sua primeira meta de relacionamento',
    icon: '✅',
    points: 150,
    category: 'milestone'
  },
  {
    id: 'diary_entries_10',
    title: 'Reflexivo',
    description: 'Fez 10 entradas no diário emocional',
    icon: '📔',
    points: 300,
    category: 'weekly'
  },
  {
    id: 'ai_conversations_20',
    title: 'Conversador',
    description: 'Teve 20 conversas com a IA',
    icon: '🤖',
    points: 250,
    category: 'weekly'
  },
  {
    id: 'surprise_planned',
    title: 'Romântico',
    description: 'Planejou uma surpresa para o parceiro(a)',
    icon: '🎁',
    points: 180,
    category: 'special'
  }
];

// Função para calcular nível baseado em pontos
const calculateLevel = (totalPoints: number): number => {
  return Math.floor(totalPoints / 1000) + 1;
};

// Função para calcular pontos necessários para próximo nível
const getPointsToNextLevel = (totalPoints: number): number => {
  const currentLevel = calculateLevel(totalPoints);
  const nextLevelPoints = currentLevel * 1000;
  return nextLevelPoints - totalPoints;
};

// Função para calcular pontos do nível atual
const getCurrentLevelPoints = (totalPoints: number): number => {
  const currentLevel = calculateLevel(totalPoints);
  const levelStartPoints = (currentLevel - 1) * 1000;
  return totalPoints - levelStartPoints;
};

export function GamificationProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [userProgress, setUserProgress] = useState<UserProgress>({
    level: 1,
    totalPoints: 0,
    currentLevelPoints: 0,
    pointsToNextLevel: 1000,
    streak: 0,
    lastActivity: null
  });
  const [achievements] = useState<Achievement[]>(availableAchievements);
  const [unlockedAchievements, setUnlockedAchievements] = useState<Achievement[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    if (user) {
      loadUserProgress();
      generateDailyChallenges();
    }
  }, [user]);

  const loadUserProgress = () => {
    const saved = localStorage.getItem(`gamification_${user?.uid}`);
    if (saved) {
      const data = JSON.parse(saved);
      setUserProgress({
        ...data,
        lastActivity: data.lastActivity ? new Date(data.lastActivity) : null
      });
      
      const savedAchievements = localStorage.getItem(`achievements_${user?.uid}`);
      if (savedAchievements) {
        const achData = JSON.parse(savedAchievements);
        setUnlockedAchievements(achData.map((a: any) => ({
          ...a,
          unlockedAt: new Date(a.unlockedAt)
        })));
      }
    } else {
      // Primeira vez - dar conquista de primeiro login
      setTimeout(() => {
        unlockAchievement('first_login');
      }, 1000);
    }
  };

  const saveUserProgress = (progress: UserProgress) => {
    if (user) {
      localStorage.setItem(`gamification_${user.uid}`, JSON.stringify(progress));
    }
  };

  const saveAchievements = (achs: Achievement[]) => {
    if (user) {
      localStorage.setItem(`achievements_${user.uid}`, JSON.stringify(achs));
    }
  };

  const addPoints = (points: number, reason: string) => {
    setUserProgress(prev => {
      const newTotalPoints = prev.totalPoints + points;
      const newProgress: UserProgress = {
        ...prev,
        totalPoints: newTotalPoints,
        level: calculateLevel(newTotalPoints),
        currentLevelPoints: getCurrentLevelPoints(newTotalPoints),
        pointsToNextLevel: getPointsToNextLevel(newTotalPoints),
        lastActivity: new Date()
      };
      
      saveUserProgress(newProgress);
      
      // Verificar conquistas baseadas em pontos
      checkPointAchievements(newTotalPoints);
      
      return newProgress;
    });
    
    console.log(`+${points} pontos: ${reason}`);
  };

  const unlockAchievement = (achievementId: string) => {
    const achievement = achievements.find(a => a.id === achievementId);
    if (!achievement) return;
    
    const alreadyUnlocked = unlockedAchievements.some(a => a.id === achievementId);
    if (alreadyUnlocked) return;
    
    const unlockedAchievement = {
      ...achievement,
      unlockedAt: new Date()
    };
    
    setUnlockedAchievements(prev => {
      const updated = [...prev, unlockedAchievement];
      saveAchievements(updated);
      return updated;
    });
    
    // Adicionar pontos da conquista
    addPoints(achievement.points, `Conquista: ${achievement.title}`);
    
    // Mostrar notificação
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(`🏆 Conquista Desbloqueada!`, {
        body: `${achievement.title}: ${achievement.description}`,
        icon: '/favicon.ico'
      });
    }
  };

  const completeChallenge = (challengeId: string) => {
    setChallenges(prev => prev.map(challenge => {
      if (challenge.id === challengeId && !challenge.completed) {
        addPoints(challenge.points, `Desafio: ${challenge.title}`);
        return { ...challenge, completed: true, progress: challenge.maxProgress };
      }
      return challenge;
    }));
  };

  const updateStreak = () => {
    const today = new Date();
    const lastActivity = userProgress.lastActivity;
    
    setUserProgress(prev => {
      let newStreak = prev.streak;
      
      if (lastActivity) {
        const daysDiff = Math.floor((today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysDiff === 1) {
          // Consecutivo
          newStreak += 1;
        } else if (daysDiff > 1) {
          // Quebrou a sequência
          newStreak = 1;
        }
        // Se daysDiff === 0, já ativo hoje, mantém streak
      } else {
        newStreak = 1;
      }
      
      const newProgress = {
        ...prev,
        streak: newStreak,
        lastActivity: today
      };
      
      saveUserProgress(newProgress);
      
      // Verificar conquistas de streak
      if (newStreak === 7) {
        unlockAchievement('daily_streak_7');
      } else if (newStreak === 30) {
        unlockAchievement('daily_streak_30');
      }
      
      return newProgress;
    });
  };

  const checkPointAchievements = (totalPoints: number) => {
    // Aqui poderia verificar conquistas baseadas em pontos totais
    // Por exemplo, conquistas a cada 1000, 5000, 10000 pontos, etc.
  };

  const generateDailyChallenges = () => {
    const today = new Date();
    const dailyChallenges: Challenge[] = [
      {
        id: 'daily_checkin',
        title: 'Check-in Diário',
        description: 'Faça seu check-in emocional hoje',
        points: 25,
        type: 'daily',
        completed: false,
        progress: 0,
        maxProgress: 1,
        expiresAt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
      },
      {
        id: 'ai_conversation',
        title: 'Conversa com IA',
        description: 'Tenha uma conversa com a IA hoje',
        points: 30,
        type: 'daily',
        completed: false,
        progress: 0,
        maxProgress: 1,
        expiresAt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
      },
      {
        id: 'diary_entry',
        title: 'Entrada no Diário',
        description: 'Escreva uma entrada no seu diário emocional',
        points: 35,
        type: 'daily',
        completed: false,
        progress: 0,
        maxProgress: 1,
        expiresAt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
      }
    ];
    
    setChallenges(dailyChallenges);
  };

  const getDailyChallenge = (): Challenge | null => {
    const dailyChallenge = challenges.find(c => c.type === 'daily' && !c.completed);
    return dailyChallenge || null;
  };

  const getWeeklyChallenge = (): Challenge | null => {
    const weeklyChallenge = challenges.find(c => c.type === 'weekly' && !c.completed);
    return weeklyChallenge || null;
  };

  return (
    <GamificationContext.Provider value={{
      userProgress,
      achievements,
      challenges,
      unlockedAchievements,
      addPoints,
      completeChallenge,
      unlockAchievement,
      updateStreak,
      getDailyChallenge,
      getWeeklyChallenge
    }}>
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification() {
  const context = useContext(GamificationContext);
  if (context === undefined) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
}
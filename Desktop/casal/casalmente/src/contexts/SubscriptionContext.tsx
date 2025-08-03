import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import { stripeService } from '../services/stripeService';

export type PlanType = 'free' | 'passion' | 'love' | 'master';
export type BillingInterval = 'monthly' | 'yearly';
export type TrialStatus = 'active' | 'expired' | 'unused' | 'none';

export interface PlanFeatures {
  // Recursos básicos
  basicChat: boolean;
  moodTracking: boolean;
  dailyTips: boolean;
  
  // Recursos de casal
  coupleFeatures: boolean;
  sharedCalendar: boolean;
  relationshipGoals: boolean;
  personalizedSurprises: boolean;
  
  // Recursos premium
  unlimitedChat: boolean;
  languagesOfLove: boolean;
  crisisMode: boolean;
  actionPlans: boolean;
  emotionalDiary: boolean;
  smartReminders: boolean;
  
  // Recursos exclusivos
  aiCoaching: boolean;
  prioritySupport: boolean;
  advancedAnalytics: boolean;
  customContent: boolean;
}

export interface PlanPricing {
  monthly: number;
  yearly: number;
  stripeMonthlyPriceId: string;
  stripeYearlyPriceId: string;
}

export interface UserSubscription {
  plan: PlanType;
  features: PlanFeatures;
  subscriptionId?: string;
  customerId?: string;
  expiresAt?: Date;
  isActive: boolean;
  billingInterval?: BillingInterval;
  trialStatus: TrialStatus;
  trialEndsAt?: Date;
  coupleDiscount: boolean;
  referralCode?: string;
  referredBy?: string;
  referralDiscountExpiry?: Date;
}

interface SubscriptionContextType {
  subscription: UserSubscription;
  hasFeature: (feature: keyof PlanFeatures) => boolean;
  upgradeToPlan: (plan: PlanType, billingInterval?: BillingInterval) => Promise<boolean>;
  startTrial: () => Promise<boolean>;
  createCheckoutSession: (plan: PlanType, billingInterval: BillingInterval) => Promise<string>;
  generateReferralCode: () => string;
  applyReferralCode: (code: string) => Promise<boolean>;
  calculatePrice: (plan: PlanType, billingInterval: BillingInterval) => number;
  loading: boolean;
}

// Configuração de preços
export const PLAN_PRICING: Record<PlanType, PlanPricing | null> = {
  free: null,
  passion: {
    monthly: 19.90,
    yearly: 199.90,
    stripeMonthlyPriceId: 'price_passion_monthly_brl',
    stripeYearlyPriceId: 'price_passion_yearly_brl'
  },
  love: {
    monthly: 39.90,
    yearly: 399.90,
    stripeMonthlyPriceId: 'price_love_monthly_brl',
    stripeYearlyPriceId: 'price_love_yearly_brl'
  },
  master: null
};

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

// Definição das features por plano
const PLAN_FEATURES: Record<PlanType, PlanFeatures> = {
  free: {
    // Recursos básicos limitados
    basicChat: true,
    moodTracking: true,
    dailyTips: true,
    
    // Recursos de casal bloqueados
    coupleFeatures: false,
    sharedCalendar: false,
    relationshipGoals: false,
    personalizedSurprises: false,
    
    // Recursos premium bloqueados
    unlimitedChat: false,
    languagesOfLove: false,
    crisisMode: false,
    actionPlans: false,
    emotionalDiary: false,
    smartReminders: false,
    
    // Recursos exclusivos bloqueados
    aiCoaching: false,
    prioritySupport: false,
    advancedAnalytics: false,
    customContent: false,
  },
  
  passion: {
    // Recursos básicos
    basicChat: true,
    moodTracking: true,
    dailyTips: true,
    
    // Recursos de casal liberados
    coupleFeatures: true,
    sharedCalendar: true,
    relationshipGoals: true,
    personalizedSurprises: true,
    
    // Alguns recursos premium
    unlimitedChat: true,
    languagesOfLove: true,
    crisisMode: false, // Apenas no Love
    actionPlans: true,
    emotionalDiary: true,
    smartReminders: true,
    
    // Recursos exclusivos bloqueados
    aiCoaching: false,
    prioritySupport: false,
    advancedAnalytics: false,
    customContent: false,
  },
  
  love: {
    // Todos os recursos anteriores
    basicChat: true,
    moodTracking: true,
    dailyTips: true,
    coupleFeatures: true,
    sharedCalendar: true,
    relationshipGoals: true,
    personalizedSurprises: true,
    unlimitedChat: true,
    languagesOfLove: true,
    actionPlans: true,
    emotionalDiary: true,
    smartReminders: true,
    
    // Recursos premium exclusivos
    crisisMode: true,
    aiCoaching: true,
    prioritySupport: true,
    advancedAnalytics: true,
    customContent: true,
  },
  
  master: {
    // Acesso total para administradores
    basicChat: true,
    moodTracking: true,
    dailyTips: true,
    coupleFeatures: true,
    sharedCalendar: true,
    relationshipGoals: true,
    personalizedSurprises: true,
    unlimitedChat: true,
    languagesOfLove: true,
    crisisMode: true,
    actionPlans: true,
    emotionalDiary: true,
    smartReminders: true,
    aiCoaching: true,
    prioritySupport: true,
    advancedAnalytics: true,
    customContent: true,
  }
};

// Lista de emails master
const MASTER_EMAILS = [
  'gabrielpsiravegna@gmail.com'
];

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<UserSubscription>({
    plan: 'free',
    features: PLAN_FEATURES.free,
    isActive: true,
    trialStatus: 'none',
    coupleDiscount: false,
  });
  const [loading, setLoading] = useState(true);

  // Determinar plano do usuário
  useEffect(() => {
    if (!user) {
      setSubscription({
        plan: 'free',
        features: PLAN_FEATURES.free,
        isActive: true,
        trialStatus: 'none',
        coupleDiscount: false,
      });
      setLoading(false);
      return;
    }

    // Verificar se é usuário master
    if (user.email && MASTER_EMAILS.includes(user.email)) {
      setSubscription({
        plan: 'master',
        features: PLAN_FEATURES.master,
        isActive: true,
        trialStatus: 'none',
        coupleDiscount: false,
      });
      setLoading(false);
      return;
    }

    // Buscar dados do usuário do localStorage (substituir por Firebase depois)
    const userDataKey = `user_subscription_${user.uid}`;
    const savedData = localStorage.getItem(userDataKey);
    
    if (savedData) {
      const userData = JSON.parse(savedData);
      
      // Verificar se trial expirou
      let effectivePlan = userData.plan;
      let trialStatus = userData.trialStatus;
      
      if (userData.trialStatus === 'active' && userData.trialEndsAt) {
        const trialEnd = new Date(userData.trialEndsAt);
        if (new Date() > trialEnd) {
          trialStatus = 'expired';
          effectivePlan = 'free'; // Volta para free após trial
        }
      }
      
      setSubscription({
        ...userData,
        plan: effectivePlan,
        features: PLAN_FEATURES[effectivePlan as PlanType],
        trialStatus,
        trialEndsAt: userData.trialEndsAt ? new Date(userData.trialEndsAt) : undefined,
        expiresAt: userData.expiresAt ? new Date(userData.expiresAt) : undefined,
        referralDiscountExpiry: userData.referralDiscountExpiry ? new Date(userData.referralDiscountExpiry) : undefined,
      });
    } else {
      // Novo usuário - verificar se pode iniciar trial
      const canStartTrial = !localStorage.getItem(`trial_used_${user.uid}`);
      
      setSubscription({
        plan: 'free',
        features: PLAN_FEATURES.free,
        isActive: true,
        trialStatus: canStartTrial ? 'unused' : 'none',
        coupleDiscount: false,
      });
    }
    
    setLoading(false);
  }, [user]);

  const hasFeature = (feature: keyof PlanFeatures): boolean => {
    return subscription.features[feature];
  };

  // Iniciar trial de 7 dias do plano Paixão
  const startTrial = async (): Promise<boolean> => {
    try {
      if (!user || subscription.trialStatus !== 'unused') return false;
      
      const trialEndsAt = new Date();
      trialEndsAt.setDate(trialEndsAt.getDate() + 7);
      
      const newSubscription = {
        ...subscription,
        plan: 'passion' as PlanType,
        features: PLAN_FEATURES.passion,
        trialStatus: 'active' as TrialStatus,
        trialEndsAt,
        isActive: true,
      };
      
      // Salvar no localStorage
      localStorage.setItem(`user_subscription_${user.uid}`, JSON.stringify(newSubscription));
      localStorage.setItem(`trial_used_${user.uid}`, 'true');
      
      setSubscription(newSubscription);
      return true;
    } catch (error) {
      console.error('Erro ao iniciar trial:', error);
      return false;
    }
  };

  // Calcular preço com descontos
  const calculatePrice = (plan: PlanType, billingInterval: BillingInterval): number => {
    const pricing = PLAN_PRICING[plan];
    if (!pricing) return 0;
    
    let basePrice = billingInterval === 'monthly' ? pricing.monthly : pricing.yearly;
    
    // Aplicar desconto de casal (20%)
    if (subscription.coupleDiscount) {
      basePrice *= 0.8;
    }
    
    // Aplicar desconto de indicação (10%)
    if (subscription.referralDiscountExpiry && new Date() < subscription.referralDiscountExpiry) {
      basePrice *= 0.9;
    }
    
    return Math.round(basePrice * 100) / 100; // Arredondar para 2 casas decimais
  };

  // Gerar código de indicação
  const generateReferralCode = (): string => {
    if (!user) return '';
    return `COUPLE${user.uid.substring(0, 8).toUpperCase()}`;
  };

  // Aplicar código de indicação
  const applyReferralCode = async (code: string): Promise<boolean> => {
    try {
      if (!user) return false;
      
      // Verificar se código é válido (simular por agora)
      if (!code.startsWith('COUPLE')) return false;
      
      const discountExpiry = new Date();
      discountExpiry.setMonth(discountExpiry.getMonth() + 1);
      
      const newSubscription = {
        ...subscription,
        referredBy: code,
        referralDiscountExpiry: discountExpiry,
      };
      
      localStorage.setItem(`user_subscription_${user.uid}`, JSON.stringify(newSubscription));
      setSubscription(newSubscription);
      
      return true;
    } catch (error) {
      console.error('Erro ao aplicar código de indicação:', error);
      return false;
    }
  };

  // Criar sessão de checkout Stripe
  const createCheckoutSession = async (plan: PlanType, billingInterval: BillingInterval): Promise<string> => {
    try {
      if (!user) throw new Error('Usuário não logado');
      
      const pricing = PLAN_PRICING[plan];
      if (!pricing) throw new Error('Plano inválido');
      
      const priceId = billingInterval === 'monthly' ? pricing.stripeMonthlyPriceId : pricing.stripeYearlyPriceId;
      
      return await stripeService.createCheckoutSession({
        priceId,
        userId: user.uid,
        userEmail: user.email || '',
        plan,
        billingInterval,
        referralCode: subscription.referredBy,
        coupleDiscount: subscription.coupleDiscount,
      });
      
    } catch (error) {
      console.error('Erro ao criar sessão de checkout:', error);
      throw error;
    }
  };

  const upgradeToPlan = async (plan: PlanType, billingInterval: BillingInterval = 'monthly'): Promise<boolean> => {
    try {
      if (!user) return false;

      // Para planos pagos, criar sessão de checkout
      if (plan === 'passion' || plan === 'love') {
        const checkoutUrl = await createCheckoutSession(plan, billingInterval);
        window.location.href = checkoutUrl;
        return true;
      }
      
      // Para downgrades, aplicar imediatamente
      const newSubscription = {
        ...subscription,
        plan,
        features: PLAN_FEATURES[plan],
        isActive: true,
        trialStatus: 'none' as TrialStatus,
      };
      
      localStorage.setItem(`user_subscription_${user.uid}`, JSON.stringify(newSubscription));
      setSubscription(newSubscription);
      
      return true;
    } catch (error) {
      console.error('Erro ao fazer upgrade do plano:', error);
      return false;
    }
  };

  return (
    <SubscriptionContext.Provider value={{ 
      subscription, 
      hasFeature, 
      upgradeToPlan,
      startTrial,
      createCheckoutSession,
      generateReferralCode,
      applyReferralCode,
      calculatePrice,
      loading 
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription deve ser usado dentro de um SubscriptionProvider');
  }
  return context;
}

// Hook para verificar se o usuário tem acesso a uma feature
export function useFeatureAccess(feature: keyof PlanFeatures) {
  const { hasFeature } = useSubscription();
  return hasFeature(feature);
}

// Componente para restringir acesso a features
interface FeatureGuardProps {
  feature: keyof PlanFeatures;
  children: ReactNode;
  fallback?: ReactNode;
  showUpgrade?: boolean;
}

export function FeatureGuard({ feature, children, fallback, showUpgrade = true }: FeatureGuardProps) {
  const { hasFeature, subscription, startTrial } = useSubscription();
  
  if (hasFeature(feature)) {
    return <>{children}</>;
  }
  
  if (fallback) {
    return <>{fallback}</>;
  }
  
  if (showUpgrade) {
    const canStartTrial = subscription.trialStatus === 'unused';
    const isTrialExpired = subscription.trialStatus === 'expired';
    
    return (
      <div className="card border-2 border-rose-200 bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 text-center p-6">
        <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-2xl">🔒</span>
        </div>
        <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          {canStartTrial ? 'Experimente Grátis!' : 'Recurso Premium'}
        </h3>
        
        {canStartTrial ? (
          <>
            <p className="text-neutral-600 dark:text-neutral-300 mb-4">
              Teste o <strong>Plano Paixão</strong> por 7 dias grátis e acesse todos os recursos premium!
            </p>
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg p-3 mb-4">
              <p className="text-green-800 dark:text-green-300 text-sm font-medium">
                ✨ 7 dias grátis • Sem cobrança inicial • Cancele quando quiser
              </p>
            </div>
            <button 
              onClick={startTrial}
              className="btn-primary w-full mb-3"
            >
              🚀 Começar Trial Grátis
            </button>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Após o trial, você escolhe se quer continuar
            </p>
          </>
        ) : (
          <>
            <p className="text-neutral-600 dark:text-neutral-300 mb-4">
              Este recurso está disponível nos planos Paixão e Amor.
              {isTrialExpired && ' Seu trial expirou.'}
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              Plano atual: <span className="font-semibold capitalize">{subscription.plan}</span>
            </p>
            <div className="flex gap-2 justify-center">
              <button 
                onClick={() => window.location.href = '/planos'}
                className="btn-primary"
              >
                Fazer Upgrade 💕
              </button>
              <button 
                onClick={() => window.location.href = '/planos'}
                className="btn-secondary text-sm"
              >
                Ver Planos
              </button>
            </div>
          </>
        )}
      </div>
    );
  }
  
  return null;
}
import { useState } from 'react';
import { useSubscription, PlanType, BillingInterval, PLAN_PRICING } from '../contexts/SubscriptionContext';

interface PlanSelectorProps {
  onPlanSelect?: (plan: PlanType, billing: BillingInterval) => void;
  currentPlan?: PlanType;
  showTrial?: boolean;
}

const PLAN_INFO = {
  passion: {
    name: 'Paixão',
    description: 'Ideal para casais que querem fortalecer a conexão',
    emoji: '💕',
    features: [
      'Chat ilimitado com IA',
      'Calendário compartilhado',
      'Metas de relacionamento',
      'Surpresas personalizadas',
      'Linguagens do amor',
      'Planos de ação',
      'Diário emocional',
      'Lembretes inteligentes'
    ],
    color: 'from-rose-500 to-pink-500',
    bgColor: 'from-rose-50 to-pink-50',
    darkBgColor: 'from-rose-900/20 to-pink-900/20',
  },
  love: {
    name: 'Amor',
    description: 'Recursos premium para relacionamentos profundos',
    emoji: '💖',
    features: [
      'Todos os recursos do Paixão',
      'Modo Crise 24/7',
      'AI Coaching personalizado',
      'Suporte prioritário',
      'Análises avançadas',
      'Conteúdo exclusivo',
      'Acesso antecipado a novidades'
    ],
    color: 'from-purple-500 to-pink-500',
    bgColor: 'from-purple-50 to-pink-50',
    darkBgColor: 'from-purple-900/20 to-pink-900/20',
  }
};

export default function PlanSelector({ onPlanSelect, currentPlan, showTrial = true }: PlanSelectorProps) {
  const { subscription, upgradeToPlan, startTrial, calculatePrice, generateReferralCode } = useSubscription();
  const [selectedBilling, setSelectedBilling] = useState<BillingInterval>('monthly');
  const [loading, setLoading] = useState(false);

  const handlePlanUpgrade = async (plan: PlanType) => {
    setLoading(true);
    try {
      if (onPlanSelect) {
        onPlanSelect(plan, selectedBilling);
      } else {
        await upgradeToPlan(plan, selectedBilling);
      }
    } catch (error) {
      console.error('Erro ao fazer upgrade:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartTrial = async () => {
    setLoading(true);
    try {
      const success = await startTrial();
      if (success) {
        console.log('Trial iniciado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao iniciar trial:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDiscountedPrice = (plan: PlanType): number => {
    return calculatePrice(plan, selectedBilling);
  };

  const getOriginalPrice = (plan: PlanType): number => {
    const pricing = PLAN_PRICING[plan];
    if (!pricing) return 0;
    return selectedBilling === 'monthly' ? pricing.monthly : pricing.yearly;
  };

  const hasDiscount = (plan: PlanType): boolean => {
    return getDiscountedPrice(plan) < getOriginalPrice(plan);
  };

  const calculateSavings = (plan: PlanType): string => {
    if (selectedBilling === 'yearly') {
      const pricing = PLAN_PRICING[plan];
      if (!pricing) return '';
      
      const monthlyTotal = pricing.monthly * 12;
      const yearlyPrice = getDiscountedPrice(plan);
      const savings = monthlyTotal - yearlyPrice;
      
      return `Economize R$ ${savings.toFixed(2)}/ano`;
    }
    return '';
  };

  return (
    <div className="space-y-6">
      {/* Seletor de período de cobrança */}
      <div className="flex justify-center">
        <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1 flex">
          <button
            onClick={() => setSelectedBilling('monthly')}
            className={`px-4 py-2 rounded-md transition-all duration-200 ${
              selectedBilling === 'monthly'
                ? 'bg-white dark:bg-neutral-700 shadow-sm font-medium'
                : 'text-neutral-600 dark:text-neutral-400'
            }`}
          >
            Mensal
          </button>
          <button
            onClick={() => setSelectedBilling('yearly')}
            className={`px-4 py-2 rounded-md transition-all duration-200 relative ${
              selectedBilling === 'yearly'
                ? 'bg-white dark:bg-neutral-700 shadow-sm font-medium'
                : 'text-neutral-600 dark:text-neutral-400'
            }`}
          >
            Anual
            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              -15%
            </span>
          </button>
        </div>
      </div>

      {/* Trial Banner */}
      {showTrial && subscription.trialStatus === 'unused' && (
        <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-6 text-center border border-green-200 dark:border-green-800">
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">
            Experimente 7 dias grátis!
          </h3>
          <p className="text-green-700 dark:text-green-400 mb-4">
            Teste todas as funcionalidades do Plano Paixão sem compromisso
          </p>
          <button
            onClick={handleStartTrial}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {loading ? 'Iniciando...' : '🚀 Começar Trial Grátis'}
          </button>
        </div>
      )}

      {/* Planos */}
      <div className="grid md:grid-cols-2 gap-6">
        {Object.entries(PLAN_INFO).map(([planKey, info]) => {
          const plan = planKey as PlanType;
          const pricing = PLAN_PRICING[plan];
          const isCurrentPlan = currentPlan === plan || subscription.plan === plan;
          const discountedPrice = getDiscountedPrice(plan);
          const originalPrice = getOriginalPrice(plan);
          const showDiscount = hasDiscount(plan);

          if (!pricing) return null;

          return (
            <div
              key={plan}
              className={`relative rounded-2xl border-2 transition-all duration-300 ${
                isCurrentPlan
                  ? 'border-rose-500 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20'
                  : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-rose-300 dark:hover:border-rose-600'
              }`}
            >
              {isCurrentPlan && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-rose-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Plano Atual
                  </span>
                </div>
              )}

              <div className="p-6">
                {/* Header do plano */}
                <div className="text-center mb-6">
                  <div className="text-4xl mb-2">{info.emoji}</div>
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                    {info.name}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {info.description}
                  </p>
                </div>

                {/* Preço */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {showDiscount && (
                      <span className="text-lg text-neutral-500 dark:text-neutral-400 line-through">
                        R$ {originalPrice.toFixed(2)}
                      </span>
                    )}
                    <span className="text-3xl font-bold text-neutral-900 dark:text-white">
                      R$ {discountedPrice.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="text-neutral-600 dark:text-neutral-400">
                    /{selectedBilling === 'monthly' ? 'mês' : 'ano'}
                  </div>

                  {selectedBilling === 'yearly' && (
                    <div className="text-sm text-green-600 dark:text-green-400 font-medium mt-1">
                      {calculateSavings(plan)}
                    </div>
                  )}

                  {showDiscount && (
                    <div className="flex flex-wrap gap-1 justify-center mt-2">
                      {subscription.coupleDiscount && (
                        <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 rounded text-xs">
                          20% Desconto Casal
                        </span>
                      )}
                      {subscription.referralDiscountExpiry && new Date() < subscription.referralDiscountExpiry && (
                        <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded text-xs">
                          10% Indicação
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Funcionalidades */}
                <div className="space-y-3 mb-6">
                  {info.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
                      </div>
                      <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Botão de ação */}
                <button
                  onClick={() => handlePlanUpgrade(plan)}
                  disabled={loading || isCurrentPlan}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                    isCurrentPlan
                      ? 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 cursor-not-allowed'
                      : `bg-gradient-to-r ${info.color} text-white hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none`
                  }`}
                >
                  {loading ? (
                    'Processando...'
                  ) : isCurrentPlan ? (
                    'Plano Ativo'
                  ) : (
                    `Escolher ${info.name}`
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Código de indicação */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 text-center border border-blue-200 dark:border-blue-800">
        <h4 className="text-lg font-bold text-blue-900 dark:text-blue-300 mb-2">
          💝 Indique e Ganhe
        </h4>
        <p className="text-blue-700 dark:text-blue-400 mb-4">
          Compartilhe seu código e ganhe 10% de desconto no próximo mês quando alguém assinar!
        </p>
        <div className="bg-white dark:bg-neutral-800 rounded-lg p-3 mb-4 border border-blue-200 dark:border-blue-700">
          <code className="text-blue-600 dark:text-blue-400 font-mono text-lg font-bold">
            {generateReferralCode()}
          </code>
        </div>
        <p className="text-sm text-blue-600 dark:text-blue-400">
          Sua pessoa indicada também ganha desconto especial!
        </p>
      </div>

      {/* Garantia */}
      <div className="text-center text-sm text-neutral-500 dark:text-neutral-400">
        <p>🔒 Pagamento 100% seguro via Stripe</p>
        <p>📞 Suporte dedicado para assinantes</p>
        <p>❌ Cancele a qualquer momento</p>
      </div>
    </div>
  );
}
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useSubscription, PlanType, BillingInterval } from '../contexts/SubscriptionContext';

interface PaymentSuccessData {
  plan: PlanType;
  billingInterval: BillingInterval;
  userId: string;
  email: string;
  referralCode?: string;
  coupleDiscount?: boolean;
  sessionId?: string;
}

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { subscription } = useSubscription();
  const [processing, setProcessing] = useState(true);
  const [paymentData, setPaymentData] = useState<PaymentSuccessData | null>(null);
  const [onboardingStep, setOnboardingStep] = useState(0);

  useEffect(() => {
    processPaymentSuccess();
  }, [searchParams, user]);

  const processPaymentSuccess = async () => {
    try {
      // Extrair dados da URL
      const plan = searchParams.get('plan') as PlanType;
      const billing = searchParams.get('billing') as BillingInterval;
      const userId = searchParams.get('user');
      const email = searchParams.get('email');
      const sessionId = searchParams.get('session_id');
      const referral = searchParams.get('referral') || undefined;
      const couple = searchParams.get('couple') === 'true';

      if (!plan || !billing || !userId || !email) {
        throw new Error('Dados de pagamento inválidos');
      }

      const data: PaymentSuccessData = {
        plan,
        billingInterval: billing,
        userId,
        email,
        sessionId,
        referralCode: referral,
        coupleDiscount: couple,
      };

      setPaymentData(data);

      // Simular processamento de confirmação de pagamento
      await simulatePaymentConfirmation(data);
      
      setProcessing(false);
      
      // Iniciar onboarding automático
      setTimeout(() => startOnboarding(), 2000);

    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      setProcessing(false);
      // Redirecionar para uma página de erro
      setTimeout(() => navigate('/dashboard'), 3000);
    }
  };

  const simulatePaymentConfirmation = async (data: PaymentSuccessData): Promise<void> => {
    // Em produção, aqui você:
    // 1. Verificaria o webhook do Stripe
    // 2. Atualizaria o banco de dados
    // 3. Ativaria a assinatura do usuário
    
    console.log('Confirmando pagamento para:', data);
    
    // Simular delay de processamento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Atualizar localStorage com nova assinatura (simular Firebase)
    if (user) {
      const expiresAt = new Date();
      expiresAt.setMonth(expiresAt.getMonth() + (data.billingInterval === 'yearly' ? 12 : 1));

      const newSubscription = {
        plan: data.plan,
        features: subscription.features, // Será atualizado pelo contexto
        subscriptionId: `sub_${Date.now()}`,
        customerId: `cus_${data.userId}`,
        expiresAt: expiresAt.toISOString(),
        isActive: true,
        billingInterval: data.billingInterval,
        trialStatus: 'none' as const,
        coupleDiscount: data.coupleDiscount || false,
        referredBy: data.referralCode,
      };

      localStorage.setItem(`user_subscription_${user.uid}`, JSON.stringify(newSubscription));
      
      // Força atualização da página para recarregar o contexto
      window.location.reload();
    }
  };

  const startOnboarding = () => {
    setOnboardingStep(1);
  };

  const completeOnboarding = () => {
    navigate('/dashboard', { replace: true });
  };

  const onboardingSteps = [
    {
      title: 'Bem-vindo ao CoupleX!',
      description: 'Seu plano foi ativado com sucesso. Vamos configurar tudo para você.',
      action: 'Começar',
    },
    {
      title: 'Configure seu Perfil',
      description: 'Adicione informações sobre seu relacionamento para personalizar a experiência.',
      action: 'Configurar Perfil',
      route: '/perfil-casal',
    },
    {
      title: 'Descubra suas Linguagens do Amor',
      description: 'Faça o quiz para entender como vocês expressam e recebem amor.',
      action: 'Fazer Quiz',
      route: '/linguagens-do-amor',
    },
    {
      title: 'Explore os Recursos',
      description: 'Conheça todas as funcionalidades disponíveis no seu plano.',
      action: 'Ir para Dashboard',
      route: '/dashboard',
    },
  ];

  if (processing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-green-900/20">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <span className="text-white text-3xl">💳</span>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
              Processando Pagamento...
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Aguarde enquanto confirmamos seu pagamento e ativamos sua assinatura.
            </p>
          </div>

          <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full animate-pulse w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (onboardingStep === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-green-900/20">
        <div className="text-center space-y-8 max-w-md">
          {/* Animação de sucesso */}
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <span className="text-white text-4xl">✅</span>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-white text-lg">🎉</span>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-green-800 dark:text-green-300">
              Pagamento Confirmado!
            </h1>
            
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg border border-green-200 dark:border-green-800">
              <div className="space-y-3 text-left">
                <div className="flex justify-between">
                  <span className="font-medium">Plano:</span>
                  <span className="capitalize text-green-600 dark:text-green-400 font-bold">
                    {paymentData?.plan}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Cobrança:</span>
                  <span className="text-green-600 dark:text-green-400">
                    {paymentData?.billingInterval === 'monthly' ? 'Mensal' : 'Anual'}
                  </span>
                </div>
                {paymentData?.coupleDiscount && (
                  <div className="flex justify-between">
                    <span className="font-medium">Desconto Casal:</span>
                    <span className="text-purple-600 dark:text-purple-400">20% OFF</span>
                  </div>
                )}
                {paymentData?.referralCode && (
                  <div className="flex justify-between">
                    <span className="font-medium">Código Usado:</span>
                    <span className="text-blue-600 dark:text-blue-400 font-mono">
                      {paymentData.referralCode}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <p className="text-neutral-600 dark:text-neutral-400">
              Sua assinatura foi ativada com sucesso! Agora você tem acesso a todos os recursos premium.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Onboarding steps
  const currentStep = onboardingSteps[onboardingStep - 1];
  const isLastStep = onboardingStep === onboardingSteps.length;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-pink-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-rose-900/20 p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-neutral-600 dark:text-neutral-400">
            <span>Configuração Inicial</span>
            <span>{onboardingStep}/{onboardingSteps.length}</span>
          </div>
          <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-rose-500 to-pink-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(onboardingStep / onboardingSteps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step content */}
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
            <span className="text-white text-2xl">
              {onboardingStep === 1 ? '👋' : onboardingStep === 2 ? '👤' : onboardingStep === 3 ? '💕' : '🚀'}
            </span>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
              {currentStep.title}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              {currentStep.description}
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => {
                if (currentStep.route) {
                  navigate(currentStep.route);
                } else if (isLastStep) {
                  completeOnboarding();
                } else {
                  setOnboardingStep(onboardingStep + 1);
                }
              }}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
            >
              {currentStep.action}
            </button>

            {onboardingStep > 1 && (
              <button
                onClick={() => setOnboardingStep(onboardingStep - 1)}
                className="w-full text-neutral-600 dark:text-neutral-400 py-2"
              >
                Voltar
              </button>
            )}

            <button
              onClick={completeOnboarding}
              className="w-full text-neutral-500 dark:text-neutral-500 py-2 text-sm"
            >
              Pular para Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
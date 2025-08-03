import { PlanType, BillingInterval, PLAN_PRICING } from '../contexts/SubscriptionContext';

export interface CheckoutSessionData {
  priceId: string;
  userId: string;
  userEmail: string;
  plan: PlanType;
  billingInterval: BillingInterval;
  referralCode?: string;
  coupleDiscount: boolean;
  successUrl?: string;
  cancelUrl?: string;
}

export interface StripeCustomer {
  id: string;
  email: string;
  name?: string;
}

export interface SubscriptionData {
  id: string;
  customerId: string;
  priceId: string;
  status: 'active' | 'canceled' | 'past_due' | 'unpaid';
  currentPeriodStart: number;
  currentPeriodEnd: number;
  cancelAtPeriodEnd: boolean;
}

// Simulação da API Stripe para desenvolvimento
class StripeService {
  private apiUrl = '/api/stripe'; // Em produção, seria sua API backend

  async createCheckoutSession(data: CheckoutSessionData): Promise<string> {
    try {
      // Em um ambiente real, isso seria uma chamada para sua API backend
      // que comunicaria com o Stripe
      const response = await fetch(`${this.apiUrl}/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          successUrl: data.successUrl || `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: data.cancelUrl || `${window.location.origin}/cancel`,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar sessão de checkout');
      }

      const { url } = await response.json();
      return url;
    } catch (error) {
      console.error('Erro no StripeService.createCheckoutSession:', error);
      
      // Fallback para desenvolvimento - simular URL de checkout
      if (process.env.NODE_ENV === 'development') {
        console.warn('Modo desenvolvimento: simulando checkout Stripe');
        return this.simulateCheckoutUrl(data);
      }
      
      throw error;
    }
  }

  async createCustomer(email: string, name?: string): Promise<StripeCustomer> {
    try {
      const response = await fetch(`${this.apiUrl}/create-customer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar cliente');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro no StripeService.createCustomer:', error);
      
      // Fallback para desenvolvimento
      if (process.env.NODE_ENV === 'development') {
        return {
          id: `cus_dev_${Date.now()}`,
          email,
          name,
        };
      }
      
      throw error;
    }
  }

  async getSubscription(subscriptionId: string): Promise<SubscriptionData> {
    try {
      const response = await fetch(`${this.apiUrl}/subscription/${subscriptionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar assinatura');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro no StripeService.getSubscription:', error);
      throw error;
    }
  }

  async cancelSubscription(subscriptionId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiUrl}/subscription/${subscriptionId}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao cancelar assinatura');
      }

      return true;
    } catch (error) {
      console.error('Erro no StripeService.cancelSubscription:', error);
      throw error;
    }
  }

  // Método para simular URL de checkout em desenvolvimento
  private simulateCheckoutUrl(data: CheckoutSessionData): string {
    const params = new URLSearchParams({
      plan: data.plan,
      billing: data.billingInterval,
      user: data.userId,
      email: data.userEmail,
      ...(data.referralCode && { referral: data.referralCode }),
      ...(data.coupleDiscount && { couple: 'true' }),
    });

    // Simular redirecionamento para página de sucesso após 3 segundos
    setTimeout(() => {
      const successUrl = `${window.location.origin}/payment-success?${params.toString()}`;
      console.log('Simulando pagamento bem-sucedido, redirecionando para:', successUrl);
      window.location.href = successUrl;
    }, 3000);

    return `https://checkout.stripe.com/pay/cs_test_simulate#${params.toString()}`;
  }

  // Método para validar e processar webhook do Stripe
  async processWebhook(payload: any, signature: string): Promise<boolean> {
    try {
      // Em produção, você validaria a assinatura do webhook aqui
      // const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
      
      console.log('Processando webhook Stripe:', payload);
      
      switch (payload.type) {
        case 'checkout.session.completed':
          await this.handleCheckoutCompleted(payload.data.object);
          break;
        case 'invoice.payment_succeeded':
          await this.handlePaymentSucceeded(payload.data.object);
          break;
        case 'customer.subscription.deleted':
          await this.handleSubscriptionCanceled(payload.data.object);
          break;
        default:
          console.log(`Tipo de evento não tratado: ${payload.type}`);
      }

      return true;
    } catch (error) {
      console.error('Erro ao processar webhook:', error);
      return false;
    }
  }

  private async handleCheckoutCompleted(session: any) {
    console.log('Checkout completado:', session);
    // Aqui você atualizaria o banco de dados com os dados da assinatura
    // e ativaria o plano do usuário
  }

  private async handlePaymentSucceeded(invoice: any) {
    console.log('Pagamento bem-sucedido:', invoice);
    // Aqui você confirmaria o pagamento e manteria a assinatura ativa
  }

  private async handleSubscriptionCanceled(subscription: any) {
    console.log('Assinatura cancelada:', subscription);
    // Aqui você desativaria o plano do usuário
  }

  // Método utilitário para calcular preços com desconto
  calculateDiscountedPrice(plan: PlanType, billingInterval: BillingInterval, discounts: {
    couple?: boolean;
    referral?: boolean;
  }): number {
    const pricing = PLAN_PRICING[plan];
    if (!pricing) return 0;

    let price = billingInterval === 'monthly' ? pricing.monthly : pricing.yearly;

    // Aplicar desconto de casal (20%)
    if (discounts.couple) {
      price *= 0.8;
    }

    // Aplicar desconto de indicação (10%)
    if (discounts.referral) {
      price *= 0.9;
    }

    return Math.round(price * 100) / 100;
  }
}

export const stripeService = new StripeService();
export default stripeService;
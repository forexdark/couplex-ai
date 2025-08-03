import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import PlanSelector from '../components/PlanSelector';
import { useSubscription, PlanType, BillingInterval } from '../contexts/SubscriptionContext';

export default function Plans() {
  const navigate = useNavigate();
  const { subscription } = useSubscription();
  const [showReferralInput, setShowReferralInput] = useState(false);
  const [referralCode, setReferralCode] = useState('');

  const handlePlanSelect = (plan: PlanType, billing: BillingInterval) => {
    console.log(`Plano selecionado: ${plan} - ${billing}`);
    // O PlanSelector já gerencia o upgrade através do contexto
  };

  const applyReferralCode = async () => {
    if (!referralCode.trim()) return;
    
    try {
      // A lógica de aplicar código está no contexto
      console.log('Aplicando código de indicação:', referralCode);
      setShowReferralInput(false);
      setReferralCode('');
    } catch (error) {
      console.error('Erro ao aplicar código:', error);
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white">
            Escolha o Plano Ideal
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Fortaleça seu relacionamento com ferramentas inteligentes e personalizadas. 
            Comece com 7 dias grátis no Plano Paixão!
          </p>

          {/* Status atual */}
          {subscription.plan !== 'free' && (
            <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Plano atual: <span className="font-semibold capitalize">{subscription.plan}</span>
              {subscription.trialStatus === 'active' && ' (Trial)'}
            </div>
          )}
        </div>

        {/* Comparação de planos */}
        <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-8 text-neutral-900 dark:text-white">
            Compare os Planos
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-700">
                  <th className="text-left py-4 px-4 font-medium text-neutral-600 dark:text-neutral-400">
                    Recursos
                  </th>
                  <th className="text-center py-4 px-4 font-bold text-neutral-900 dark:text-white">
                    Free
                  </th>
                  <th className="text-center py-4 px-4 font-bold text-rose-600 dark:text-rose-400">
                    Paixão
                  </th>
                  <th className="text-center py-4 px-4 font-bold text-purple-600 dark:text-purple-400">
                    Amor
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                <tr>
                  <td className="py-3 px-4">Chat com IA básico</td>
                  <td className="text-center py-3 px-4">✅</td>
                  <td className="text-center py-3 px-4">✅</td>
                  <td className="text-center py-3 px-4">✅</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Acompanhamento de humor</td>
                  <td className="text-center py-3 px-4">✅</td>
                  <td className="text-center py-3 px-4">✅</td>
                  <td className="text-center py-3 px-4">✅</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Chat ilimitado com IA</td>
                  <td className="text-center py-3 px-4">❌</td>
                  <td className="text-center py-3 px-4">✅</td>
                  <td className="text-center py-3 px-4">✅</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Calendário do casal</td>
                  <td className="text-center py-3 px-4">❌</td>
                  <td className="text-center py-3 px-4">✅</td>
                  <td className="text-center py-3 px-4">✅</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Surpresas personalizadas</td>
                  <td className="text-center py-3 px-4">❌</td>
                  <td className="text-center py-3 px-4">✅</td>
                  <td className="text-center py-3 px-4">✅</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Linguagens do amor</td>
                  <td className="text-center py-3 px-4">❌</td>
                  <td className="text-center py-3 px-4">✅</td>
                  <td className="text-center py-3 px-4">✅</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Modo Crise 24/7</td>
                  <td className="text-center py-3 px-4">❌</td>
                  <td className="text-center py-3 px-4">❌</td>
                  <td className="text-center py-3 px-4">✅</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">AI Coaching personalizado</td>
                  <td className="text-center py-3 px-4">❌</td>
                  <td className="text-center py-3 px-4">❌</td>
                  <td className="text-center py-3 px-4">✅</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Suporte prioritário</td>
                  <td className="text-center py-3 px-4">❌</td>
                  <td className="text-center py-3 px-4">❌</td>
                  <td className="text-center py-3 px-4">✅</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Seletor de planos */}
        <PlanSelector 
          onPlanSelect={handlePlanSelect}
          currentPlan={subscription.plan}
          showTrial={true}
        />

        {/* Código de indicação */}
        {!showReferralInput ? (
          <div className="text-center">
            <button
              onClick={() => setShowReferralInput(true)}
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              💝 Tenho um código de indicação
            </button>
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg border border-blue-200 dark:border-blue-700">
              <h3 className="text-lg font-bold text-blue-900 dark:text-blue-300 mb-4">
                Código de Indicação
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                  placeholder="COUPLE12345678"
                  className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                />
                <div className="flex gap-2">
                  <button
                    onClick={applyReferralCode}
                    disabled={!referralCode.trim()}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-400 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    Aplicar Código
                  </button>
                  <button
                    onClick={() => {
                      setShowReferralInput(false);
                      setReferralCode('');
                    }}
                    className="px-4 py-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FAQ */}
        <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center mb-8 text-neutral-900 dark:text-white">
            Perguntas Frequentes
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-neutral-900 dark:text-white mb-2">
                  Como funciona o trial de 7 dias?
                </h4>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  Teste todas as funcionalidades do Plano Paixão gratuitamente por 7 dias. 
                  Não há cobrança inicial e você pode cancelar a qualquer momento.
                </p>
              </div>
              
              <div>
                <h4 className="font-bold text-neutral-900 dark:text-white mb-2">
                  Posso cancelar a assinatura?
                </h4>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  Sim! Você pode cancelar sua assinatura a qualquer momento. 
                  Continuará tendo acesso aos recursos até o final do período pago.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-neutral-900 dark:text-white mb-2">
                  Como funciona o desconto de casal?
                </h4>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  Quando ambos os parceiros têm planos ativos e se verificam como casal, 
                  cada um recebe 20% de desconto nas mensalidades.
                </p>
              </div>
              
              <div>
                <h4 className="font-bold text-neutral-900 dark:text-white mb-2">
                  O pagamento é seguro?
                </h4>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  Sim! Utilizamos o Stripe, uma das plataformas de pagamento mais seguras do mundo, 
                  com criptografia de nível bancário.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
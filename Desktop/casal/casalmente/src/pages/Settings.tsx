import { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../hooks/useAuth';

export default function Settings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
    partnerName: '',
    relationshipStart: '',
    publicProfile: false,
    shareData: true,
    language: 'pt-BR'
  });
  
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteMessage, setInviteMessage] = useState('');

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    // Aqui implementaríamos a lógica para salvar as configurações no Firebase
    console.log('Salvando configurações:', settings);
    alert('Configurações salvas com sucesso!');
  };

  const handleInvitePartner = () => {
    // Aqui implementaríamos a lógica para enviar convite
    console.log('Enviando convite para:', inviteEmail);
    console.log('Mensagem:', inviteMessage);
    alert('Convite enviado com sucesso!');
    setShowInviteModal(false);
    setInviteEmail('');
    setInviteMessage('');
  };

  return (
    <Layout showHeader>
      <div className="container-app py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-display text-neutral-900 mb-2">
            Configurações ⚙️
          </h1>
          <p className="text-neutral-600">
            Personalize sua experiência no CoupleX AI e gerencie sua conta.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Perfil do Usuário */}
          <div className="lg:col-span-2 space-y-8">
            {/* Informações Pessoais */}
            <div className="card">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center">
                <span className="mr-2">👤</span>
                Informações Pessoais
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-rose-500 to-primary-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl">
                      {user?.displayName?.charAt(0) || '💕'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">
                      {user?.displayName || 'Usuário'}
                    </h3>
                    <p className="text-neutral-600">{user?.email}</p>
                    <button className="text-rose-600 text-sm hover:underline mt-1">
                      Alterar foto do perfil
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Nome do parceiro(a)
                    </label>
                    <input
                      type="text"
                      value={settings.partnerName}
                      onChange={(e) => handleSettingChange('partnerName', e.target.value)}
                      className="input"
                      placeholder="Nome do seu parceiro"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Início do relacionamento
                    </label>
                    <input
                      type="date"
                      value={settings.relationshipStart}
                      onChange={(e) => handleSettingChange('relationshipStart', e.target.value)}
                      className="input"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Convite do Cônjuge */}
            <div className="card bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4 flex items-center">
                <span className="mr-2">💌</span>
                Convidar Parceiro(a)
              </h2>
              <p className="text-neutral-700 mb-6">
                Convide seu parceiro para usar o CoupleX AI juntos e compartilhar a jornada de reconexão.
              </p>
              
              <div className="bg-white/70 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-purple-800 mb-2">Benefícios de usar juntos:</h3>
                <ul className="text-purple-700 text-sm space-y-1">
                  <li>• Calendário compartilhado para eventos do casal</li>
                  <li>• Metas de relacionamento em conjunto</li>
                  <li>• Chat com IA sobre questões do casal</li>
                  <li>• Progresso sincronizado em todas as funcionalidades</li>
                </ul>
              </div>

              <button 
                onClick={() => setShowInviteModal(true)}
                className="btn-primary w-full"
              >
                💕 Enviar Convite
              </button>
            </div>

            {/* Preferências */}
            <div className="card">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center">
                <span className="mr-2">🎨</span>
                Preferências
              </h2>
              
              <div className="space-y-6">
                {/* Tema */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-3">
                    Tema da aplicação
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleSettingChange('theme', 'light')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        settings.theme === 'light'
                          ? 'border-rose-300 bg-rose-50'
                          : 'border-neutral-200 hover:border-rose-200'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-white border border-neutral-300 rounded-lg flex items-center justify-center">
                          <span className="text-yellow-500">☀️</span>
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-neutral-900">Claro</div>
                          <div className="text-xs text-neutral-600">Tema padrão</div>
                        </div>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => handleSettingChange('theme', 'dark')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        settings.theme === 'dark'
                          ? 'border-rose-300 bg-rose-50'
                          : 'border-neutral-200 hover:border-rose-200'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-neutral-800 border border-neutral-600 rounded-lg flex items-center justify-center">
                          <span className="text-blue-400">🌙</span>
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-neutral-900">Escuro</div>
                          <div className="text-xs text-neutral-600">Em breve</div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Notificações */}
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-semibold text-neutral-700">
                      Notificações
                    </label>
                    <p className="text-xs text-neutral-600">Receber lembretes e dicas</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('notifications', !settings.notifications)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.notifications ? 'bg-rose-500' : 'bg-neutral-300'
                    }`}
                  >
                    <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                      settings.notifications ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                {/* Privacidade */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-semibold text-neutral-700">
                        Perfil público
                      </label>
                      <p className="text-xs text-neutral-600">Permitir que outros usuários vejam seu perfil</p>
                    </div>
                    <button
                      onClick={() => handleSettingChange('publicProfile', !settings.publicProfile)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        settings.publicProfile ? 'bg-rose-500' : 'bg-neutral-300'
                      }`}
                    >
                      <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                        settings.publicProfile ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-semibold text-neutral-700">
                        Compartilhar dados para melhorias
                      </label>
                      <p className="text-xs text-neutral-600">Ajudar a melhorar a IA com dados anônimos</p>
                    </div>
                    <button
                      onClick={() => handleSettingChange('shareData', !settings.shareData)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        settings.shareData ? 'bg-rose-500' : 'bg-neutral-300'
                      }`}
                    >
                      <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                        settings.shareData ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Plano Atual */}
            <div className="card bg-gradient-to-r from-green-50 to-teal-50 border-2 border-green-200">
              <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center">
                <span className="mr-2">💎</span>
                Plano Atual
              </h3>
              <div className="space-y-3">
                <div className="bg-white/70 rounded-lg p-3">
                  <p className="font-semibold text-green-800">Paixão</p>
                  <p className="text-sm text-green-700">R$ 19,90/mês</p>
                </div>
                <button className="btn-secondary w-full text-sm">
                  Gerenciar Plano
                </button>
              </div>
            </div>

            {/* Suporte */}
            <div className="card">
              <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center">
                <span className="mr-2">🆘</span>
                Suporte
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span>📚</span>
                    <span className="text-sm">Central de Ajuda</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span>💬</span>
                    <span className="text-sm">Falar com Suporte</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span>⭐</span>
                    <span className="text-sm">Avaliar App</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Ações da Conta */}
            <div className="card">
              <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center">
                <span className="mr-2">🔐</span>
                Conta
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span>🔑</span>
                    <span className="text-sm">Alterar Senha</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span>📤</span>
                    <span className="text-sm">Exportar Dados</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span>🗑️</span>
                    <span className="text-sm">Excluir Conta</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Botão Salvar */}
        <div className="mt-8 text-center">
          <button onClick={handleSaveSettings} className="btn-primary px-8">
            💾 Salvar Configurações
          </button>
        </div>

        {/* Modal de Convite */}
        {showInviteModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="card max-w-2xl w-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-neutral-900">Convidar Parceiro(a)</h2>
                <button 
                  onClick={() => setShowInviteModal(false)}
                  className="text-neutral-400 hover:text-neutral-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Email do parceiro(a)
                  </label>
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="input"
                    placeholder="email@exemplo.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Mensagem personalizada (opcional)
                  </label>
                  <textarea
                    rows={4}
                    value={inviteMessage}
                    onChange={(e) => setInviteMessage(e.target.value)}
                    className="input resize-none"
                    placeholder="Olá amor! Descobri um app incrível que pode nos ajudar a fortalecer nosso relacionamento. Vamos usar juntos?"
                  />
                </div>

                <div className="bg-purple-50 rounded-xl p-4">
                  <h3 className="font-semibold text-purple-800 mb-2">Preview do convite:</h3>
                  <div className="bg-white rounded-lg p-4 border-2 border-purple-200">
                    <p className="text-sm text-neutral-700 mb-3">
                      <strong>{user?.displayName}</strong> convidou você para usar o CoupleX AI juntos!
                    </p>
                    {inviteMessage && (
                      <p className="text-sm text-neutral-600 italic mb-3">"{inviteMessage}"</p>
                    )}
                    <button className="bg-gradient-to-r from-rose-500 to-primary-500 text-white px-4 py-2 rounded-lg text-sm">
                      Aceitar Convite 💕
                    </button>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={() => setShowInviteModal(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={handleInvitePartner}
                    className="btn-primary flex-1"
                    disabled={!inviteEmail}
                  >
                    💌 Enviar Convite
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
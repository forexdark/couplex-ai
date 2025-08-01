import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';

interface PartnerInfo {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
}

interface CoupleContextType {
  partner: PartnerInfo | null;
  coupleId: string | null;
  isConnected: boolean;
  inviteCode: string | null;
  sendInvite: (email: string, message?: string) => Promise<void>;
  acceptInvite: (inviteCode: string) => Promise<void>;
  disconnectPartner: () => Promise<void>;
  generateInviteCode: () => Promise<string>;
}

const CoupleContext = createContext<CoupleContextType | undefined>(undefined);

export function CoupleProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [partner, setPartner] = useState<PartnerInfo | null>(null);
  const [coupleId, setCoupleId] = useState<string | null>(null);
  const [inviteCode, setInviteCode] = useState<string | null>(null);

  const isConnected = !!partner && !!coupleId;

  useEffect(() => {
    if (user) {
      // Aqui implementaríamos a lógica para buscar informações do parceiro no Firebase
      checkPartnerConnection();
    }
  }, [user]);

  const checkPartnerConnection = async () => {
    // Simulação - na implementação real, buscaríamos no Firebase
    const savedPartner = localStorage.getItem(`partner_${user?.uid}`);
    const savedCoupleId = localStorage.getItem(`coupleId_${user?.uid}`);
    
    if (savedPartner && savedCoupleId) {
      setPartner(JSON.parse(savedPartner));
      setCoupleId(savedCoupleId);
    }
  };

  const generateInviteCode = async (): Promise<string> => {
    // Gerar código único
    const code = `COUPLE_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`.toUpperCase();
    setInviteCode(code);
    
    // Na implementação real, salvaríamos no Firebase
    localStorage.setItem(`inviteCode_${user?.uid}`, code);
    
    return code;
  };

  const sendInvite = async (email: string, message?: string) => {
    if (!user) throw new Error('Usuário não autenticado');
    
    const code = await generateInviteCode();
    
    // Simulação de envio de email - na implementação real, usaríamos Firebase Functions
    const inviteData = {
      from: user.displayName || user.email,
      fromUid: user.uid,
      to: email,
      message: message || `${user.displayName} convidou você para usar o CoupleX AI juntos!`,
      inviteCode: code,
      timestamp: new Date().toISOString()
    };
    
    // Salvar convite pendente
    localStorage.setItem(`pendingInvite_${code}`, JSON.stringify(inviteData));
    
    console.log('Convite enviado:', inviteData);
    
    // Simulação de notificação
    setTimeout(() => {
      alert(`Convite enviado para ${email}! Código: ${code}`);
    }, 1000);
  };

  const acceptInvite = async (inviteCode: string) => {
    if (!user) throw new Error('Usuário não autenticado');
    
    // Buscar convite pendente
    const inviteData = localStorage.getItem(`pendingInvite_${inviteCode}`);
    if (!inviteData) {
      throw new Error('Código de convite inválido ou expirado');
    }
    
    const invite = JSON.parse(inviteData);
    
    // Criar conexão entre os parceiros
    const newCoupleId = `couple_${invite.fromUid}_${user.uid}`;
    const partnerInfo: PartnerInfo = {
      uid: invite.fromUid,
      displayName: invite.from,
      email: invite.from // Na implementação real, buscaríamos o email correto
    };
    
    // Salvar conexão
    setCoupleId(newCoupleId);
    setPartner(partnerInfo);
    
    localStorage.setItem(`coupleId_${user.uid}`, newCoupleId);
    localStorage.setItem(`partner_${user.uid}`, JSON.stringify(partnerInfo));
    
    // Limpar convite usado
    localStorage.removeItem(`pendingInvite_${inviteCode}`);
    
    console.log('Convite aceito! Parceiros conectados:', { user: user.uid, partner: invite.fromUid });
  };

  const disconnectPartner = async () => {
    if (!user) return;
    
    setPartner(null);
    setCoupleId(null);
    setInviteCode(null);
    
    localStorage.removeItem(`partner_${user?.uid}`);
    localStorage.removeItem(`coupleId_${user?.uid}`);
    localStorage.removeItem(`inviteCode_${user?.uid}`);
    
    console.log('Parceiros desconectados');
  };

  return (
    <CoupleContext.Provider value={{
      partner,
      coupleId,
      isConnected,
      inviteCode,
      sendInvite,
      acceptInvite,
      disconnectPartner,
      generateInviteCode
    }}>
      {children}
    </CoupleContext.Provider>
  );
}

export function useCouple() {
  const context = useContext(CoupleContext);
  if (context === undefined) {
    throw new Error('useCouple must be used within a CoupleProvider');
  }
  return context;
}
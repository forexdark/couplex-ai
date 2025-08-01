import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useCouple } from './CoupleContext';

interface Notification {
  id: string;
  type: 'goal_completed' | 'event_reminder' | 'check_in' | 'message' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  fromPartner?: boolean;
  actionUrl?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  sendPartnerNotification: (type: Notification['type'], title: string, message: string, actionUrl?: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { partner, isConnected } = useCouple();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    if (user) {
      loadNotifications();
      
      // Simular notificações de exemplo para demonstração
      setTimeout(() => {
        if (isConnected) {
          addNotification({
            type: 'system',
            title: 'Bem-vindo ao CoupleX AI!',
            message: `Você e ${partner?.displayName} agora estão conectados! Explorem as funcionalidades juntos.`,
            fromPartner: false
          });
        }
      }, 2000);
    }
  }, [user, isConnected]);

  const loadNotifications = () => {
    const saved = localStorage.getItem(`notifications_${user?.uid}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      setNotifications(parsed.map((n: any) => ({
        ...n,
        timestamp: new Date(n.timestamp)
      })));
    }
  };

  const saveNotifications = (notifs: Notification[]) => {
    if (user) {
      localStorage.setItem(`notifications_${user.uid}`, JSON.stringify(notifs));
    }
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      read: false
    };

    const updated = [newNotification, ...notifications].slice(0, 50); // Manter apenas 50 notificações
    setNotifications(updated);
    saveNotifications(updated);

    // Mostrar notificação no browser se permitido
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico'
      });
    }
  };

  const markAsRead = (id: string) => {
    const updated = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    saveNotifications(updated);
  };

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    saveNotifications(updated);
  };

  const removeNotification = (id: string) => {
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    saveNotifications(updated);
  };

  const sendPartnerNotification = (
    type: Notification['type'], 
    title: string, 
    message: string, 
    actionUrl?: string
  ) => {
    if (!isConnected || !partner) return;

    // Na implementação real, enviaríamos via Firebase para o parceiro
    // Por agora, vamos simular adicionando à nossa própria lista como se fosse do parceiro
    setTimeout(() => {
      addNotification({
        type,
        title: `💕 ${title}`,
        message: `${partner.displayName}: ${message}`,
        fromPartner: true,
        actionUrl
      });
    }, 1000);

    console.log('Notificação enviada para o parceiro:', { type, title, message });
  };

  // Solicitar permissão para notificações do browser
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      removeNotification,
      sendPartnerNotification
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
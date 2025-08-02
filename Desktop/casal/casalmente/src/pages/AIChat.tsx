import { useState, useRef, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../hooks/useAuth';
import { groqService } from '../services/groqService';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'exercise';
}

export default function AIChat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      content: `Olá, ${user?.displayName?.split(' ')[0] || 'querido(a)'}! 💕 

Sou sua mentora pessoal dos relacionamentos. Estou aqui para te ouvir, te aconselhar e te ajudar a fortalecer seu relacionamento de forma genuína e carinhosa.

Pode me contar o que está acontecendo? Como vocês estão se sentindo ultimamente? Lembre-se: não há julgamentos aqui, apenas acolhimento e orientação. ✨`,
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Test Groq connection on component mount
  useEffect(() => {
    const testGroqConnection = async () => {
      console.log('🔍 Testing Groq connection on component mount...');
      await groqService.testConnection();
    };
    testGroqConnection();
  }, []);


  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputValue,
      timestamp: new Date(),
      type: 'text'
    };

    const currentInput = inputValue;
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Use Groq AI service for real AI responses
      console.log('🚀 AIChat: Calling Groq service with message:', currentInput);
      const aiResponseContent = await groqService.sendMessage(currentInput);
      console.log('🎯 AIChat: Received response from Groq:', aiResponseContent.substring(0, 50) + '...');
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: aiResponseContent,
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Erro ao obter resposta da IA:', error);
      
      // Fallback response if AI fails
      const fallbackResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: 'Desculpe, tive um problema técnico. Pode repetir sua pergunta? 💕',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, fallbackResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickSuggestions = [
    "Estamos brigando muito ultimamente 😔",
    "Sinto que perdemos a intimidade 💔",
    "Não sabemos mais como conversar 🤐",
    "Estou pensando em terminar 😢",
    "Como posso demonstrar mais amor? 💕",
    "Nosso relacionamento está na rotina 🔄"
  ];

  const handleQuickSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
  };

  return (
    <Layout showHeader>
      <div className="container-app py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-display text-neutral-900 dark:text-white mb-2">
            Chat com sua Mentora 💬
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300">
            Sua companheira especializada em relacionamentos está aqui para te ouvir e orientar.
          </p>
        </div>

        {/* Chat Container */}
        <div className="card h-[600px] flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${
                  message.sender === 'user' 
                    ? 'bg-gradient-to-r from-rose-500 to-primary-500 text-white rounded-2xl rounded-br-none'
                    : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-2xl rounded-bl-none'
                } p-4`}>
                  {message.sender === 'ai' && (
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-rose-500 to-primary-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">💕</span>
                      </div>
                      <span className="text-xs font-medium text-neutral-600 dark:text-neutral-300">Sua Mentora</span>
                    </div>
                  )}
                  <div className="whitespace-pre-line leading-relaxed">
                    {message.content}
                  </div>
                  <div className={`text-xs mt-2 ${
                    message.sender === 'user' ? 'text-white/70' : 'text-neutral-500 dark:text-neutral-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString('pt-BR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-neutral-100 text-neutral-800 rounded-2xl rounded-bl-none p-4 max-w-[80%]">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-rose-500 to-primary-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">💕</span>
                    </div>
                    <span className="text-xs font-medium text-neutral-600">Sua Mentora</span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          {messages.length <= 1 && (
            <div className="p-4 border-t border-neutral-200">
              <p className="text-sm text-neutral-600 mb-3">💡 Sugestões para começar:</p>
              <div className="flex flex-wrap gap-2">
                {quickSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickSuggestion(suggestion)}
                    className="text-sm bg-neutral-100 hover:bg-rose-50 hover:text-rose-700 px-3 py-2 rounded-full transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-neutral-200">
            <div className="flex space-x-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Digite sua mensagem..."
                className="flex-1 input"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="btn-primary px-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Enviar 💕
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
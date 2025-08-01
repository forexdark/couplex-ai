import { useState, useRef, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../hooks/useAuth';

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

  // Biblioteca de respostas da IA terapeuta
  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    // Respostas sobre brigas e conflitos
    if (message.includes('briga') || message.includes('discussão') || message.includes('conflito')) {
      return `Entendo que vocês estão passando por conflitos. 💙 Isso é mais comum do que imagina - todos os casais brigam.

**O importante é COMO vocês lidam com isso:**

🌟 **Durante uma discussão:**
• Respirem fundo antes de falar
• Usem "eu sinto" ao invés de "você sempre"
• Foquem no problema, não na pessoa

💡 **Que tal tentarem a técnica do "Time Out"?** Quando os ânimos estiverem exaltados, um de vocês pode dizer "Preciso de uns minutos" e voltam a conversar quando estiverem mais calmos.

Me conte: sobre o que vocês mais discutem? Posso te dar dicas específicas. 💕`;
    }

    // Respostas sobre falta de comunicação
    if (message.includes('comunicação') || message.includes('conversar') || message.includes('falar')) {
      return `A comunicação é o coração de qualquer relacionamento. 💕 Quando ela falha, tudo fica mais difícil.

**Vamos reconstruir essa ponte:**

🗣️ **Conversas de qualidade:**
• Escolham um momento sem distrações (celular longe!)
• Perguntem "Como foi seu dia?" e realmente ouçam
• Compartilhem 3 coisas boas que aconteceram

❤️ **Expressem apreciação:**
• "Obrigado(a) por..."
• "Admiro quando você..."
• "Me sinto amado(a) quando..."

🔄 **Ritual diário:** 15 minutos todas as noites só para conversar, sem TV ou celular.

O que vocês mais sentem falta de conversar? Sobre sonhos, medos, ou o dia a dia mesmo?`;
    }

    // Respostas sobre intimidade
    if (message.includes('intimidade') || message.includes('carinho') || message.includes('físico') || message.includes('beijar')) {
      return `A intimidade física e emocional são fundamentais. 💕 Quando uma diminui, a outra também pode ser afetada.

**Reconectando com carinho:**

🤗 **Pequenos gestos diários:**
• Abraços de 20 segundos (liberam oxitocina!)
• Segurar a mão enquanto assistem TV
• Beijo de "bom dia" e "boa noite" sempre

💝 **Criar momentos íntimos:**
• Banho de lua (sem conotação sexual, só relaxar juntos)
• Massagem nas costas depois de um dia difícil
• Dançar na sala, mesmo sem música

🌙 **Conversas na cama:** Antes de dormir, compartilhem algo que amam um no outro.

A intimidade se reconstrói devagar, com paciência. Como vocês costumavam demonstrar carinho no início do relacionamento?`;
    }

    // Respostas sobre rotina/tédio
    if (message.includes('rotina') || message.includes('tédio') || message.includes('monótono') || message.includes('igual')) {
      return `A rotina pode ser uma armadilha silenciosa nos relacionamentos. 🔄 Mas a boa notícia é que pequenas mudanças fazem uma grande diferença!

**Quebrando a monotonia:**

✨ **Micro-aventuras:**
• Jantar em um lugar novo da cidade
• Caminhar por um bairro que nunca visitaram
• Cozinhar uma receita exótica juntos

💑 **Redescobrir um ao outro:**
• Façam perguntas que nunca fizeram: "Qual seu sonho mais louco?"
• Compartilhem memórias da infância
• Criem uma lista de desejos do casal

🎯 **Objetivos juntos:**
• Planejem uma viagem (mesmo que pequena)
• Aprendam algo novo juntos
• Tenham um projeto em comum

Qual foi a última vez que vocês fizeram algo pela primeira vez juntos? Que tipo de atividade vocês gostariam de experimentar?`;
    }

    // Respostas sobre insegurança/ciúmes
    if (message.includes('ciúme') || message.includes('insegurança') || message.includes('confiança') || message.includes('desconfia')) {
      return `Ciúmes e inseguranças são desafios delicados, mas superáveis com trabalho mútuo. 💙

**Construindo confiança:**

🛡️ **Para quem sente ciúmes:**
• Identifique o gatilho: é medo de abandono? Experiências passadas?
• Comunique sem acusar: "Me sinto inseguro(a) quando..."
• Pratique autocompaixão - você merece amor

💕 **Para quem está sendo questionado(a):**
• Seja paciente - insegurança não é sobre você, é sobre dor
• Ofereça reasseguramento: "Você é importante para mim"
• Demonstre através de ações, não só palavras

🌱 **Juntos vocês podem:**
• Estabelecer combinados claros sobre limites
• Criar rituais de conexão diária
• Trabalhar a autoestima individual

O que te faz sentir mais inseguro(a)? Vamos trabalhar isso juntos, passo a passo. 💕`;
    }

    // Respostas sobre pensamentos de separação
    if (message.includes('separar') || message.includes('terminar') || message.includes('acabar') || message.includes('desistir')) {
      return `Sei que deve estar sendo muito difícil pensar nisso. 😢 Mas o fato de estar aqui, buscando ajuda, mostra que ainda há amor e esperança.

**Antes de tomar decisões definitivas:**

💭 **Reflita:**
• O que vocês tinham de bom no início?
• Quais problemas são resolvíveis e quais são diferenças de valores?
• Vocês realmente tentaram todas as estratégias de reconexão?

🔄 **Última tentativa consciente:**
• 30 dias de esforço real dos dois
• Implementem 3 mudanças concretas
• Busquem terapia de casal se possível

💕 **Lembrem-se:** Todo relacionamento passa por crises. As que saem mais fortes são aquelas onde ambos se comprometem com a solução.

Me conte: o que te fez se apaixonar por essa pessoa? Ainda há resquícios desses sentimentos?`;
    }

    // Respostas sobre estresse/pressão externa
    if (message.includes('estresse') || message.includes('trabalho') || message.includes('família') || message.includes('pressão')) {
      return `Pressões externas podem impactar muito o relacionamento. 💼👨‍👩‍👧‍👦 É importante proteger o casal dessas influências.

**Criando um escudo protetor:**

🛡️ **Limites saudáveis:**
• O relacionamento de vocês é prioridade
• Família e amigos devem apoiar, não interferir
• Trabalho é importante, mas não pode consumir tudo

💑 **Tempo sagrado:**
• 1 hora por dia só para vocês
• 1 dia no fim de semana sem falar de problemas
• Ritual de "deixar o mundo lá fora"

🌟 **Equipe contra o mundo:**
• "Nós contra o problema", nunca "eu contra você"
• Tomem decisões importantes juntos
• Apoiem-se mutuamente nos desafios

Que tipo de pressão externa está afetando mais vocês? Trabalho, família, financeiro? Vamos criar estratégias específicas. 💪`;
    }

    // Resposta geral/padrão
    return `Obrigada por compartilhar isso comigo. 💕 Cada relacionamento é único, e estou aqui para te ajudar de forma personalizada.

**Para te ajudar melhor, me conte:**
• Como vocês estão se sentindo ultimamente?
• Qual é a principal dificuldade que enfrentam?
• O que mais sentem falta no relacionamento?

Alguns temas comuns que posso te ajudar:
💔 Conflitos e discussões
💬 Problemas de comunicação  
💕 Reconectar intimidade
🔄 Quebrar a rotina
💙 Lidar com inseguranças
⚡ Gerenciar estresse externo

Estou aqui para te ouvir e orientar. Pode confiar em mim! ✨`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputValue,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simular delay da IA
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: getAIResponse(inputValue),
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
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
          <h1 className="text-3xl font-bold font-display text-neutral-900 mb-2">
            Chat com sua Mentora 💬
          </h1>
          <p className="text-neutral-600">
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
                    : 'bg-neutral-100 text-neutral-800 rounded-2xl rounded-bl-none'
                } p-4`}>
                  {message.sender === 'ai' && (
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-rose-500 to-primary-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">💕</span>
                      </div>
                      <span className="text-xs font-medium text-neutral-600">Sua Mentora</span>
                    </div>
                  )}
                  <div className="whitespace-pre-line leading-relaxed">
                    {message.content}
                  </div>
                  <div className={`text-xs mt-2 ${
                    message.sender === 'user' ? 'text-white/70' : 'text-neutral-500'
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
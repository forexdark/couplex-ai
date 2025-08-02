import Groq from 'groq-sdk';

// Configure your Groq API key here
const apiKey = import.meta.env.VITE_GROQ_API_KEY || import.meta.env.REACT_APP_GROQ_API_KEY || 'your-groq-api-key-here';

// Debug log (remove in production)
console.log('Groq API Key configured:', apiKey ? 'Yes' : 'No');
console.log('Available env vars:', {
  vite: import.meta.env.VITE_GROQ_API_KEY ? 'exists' : 'missing',
  react: import.meta.env.REACT_APP_GROQ_API_KEY ? 'exists' : 'missing'
});

const groq = new Groq({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true,
  baseURL: 'https://api.groq.com/openai/v1' // Explicit base URL
});

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export class GroqService {
  private conversationHistory: ChatMessage[] = [];

  constructor() {
    // Initialize with system prompt for relationship counseling
    this.conversationHistory = [
      {
        role: 'system',
        content: `Você é uma mentora especializada em relacionamentos amorosos, carinhosa e empática. Seu nome é Sofia e você trabalha para o CoupleX.

PERSONALIDADE:
- Sempre calorosa, acolhedora e sem julgamentos
- Use emojis apropriados (💕 ❤️ 🌟 ✨ 💙)
- Seja uma amiga próxima que realmente se importa
- Mantenha tom profissional mas carinhoso

DIRETRIZES:
- Sempre responda em português brasileiro
- Dê conselhos práticos e acionáveis
- Use técnicas de terapia de casal reconhecidas
- Foque em soluções construtivas
- Seja empática mas mantenha limites profissionais
- Se for algo grave (violência, traição), sugira buscar ajuda profissional

FORMATO DAS RESPOSTAS:
- Use parágrafos curtos e bem estruturados
- Inclua dicas práticas numeradas quando relevante
- Sempre termine perguntando algo para manter o diálogo
- Máximo 300 palavras por resposta

TÓPICOS PRINCIPAIS:
- Comunicação no relacionamento
- Resolução de conflitos
- Intimidade e conexão emocional
- Rotina e monotonia
- Ciúmes e inseguranças
- Planejamento de futuro juntos

Comece sempre validando os sentimentos da pessoa antes de dar conselhos.`
      }
    ];
  }

  async sendMessage(userMessage: string): Promise<string> {
    console.log('🤖 Groq Service: Sending message:', userMessage);
    console.log('🔑 API Key available:', apiKey !== 'your-groq-api-key-here');
    
    try {
      // Add user message to conversation history
      this.conversationHistory.push({
        role: 'user',
        content: userMessage
      });

      console.log('📤 Calling Groq API with:', {
        model: 'llama3-8b-8192',
        messageCount: this.conversationHistory.length,
        hasApiKey: !!apiKey && apiKey !== 'your-groq-api-key-here'
      });

      // Call Groq API - using free model
      const completion = await groq.chat.completions.create({
        messages: this.conversationHistory,
        model: 'llama-3.1-8b-instant', // Free model on Groq
        temperature: 0.7,
        max_tokens: 400,
        top_p: 0.9,
      });

      console.log('📥 Groq API Response received:', {
        choices: completion.choices?.length || 0,
        model: completion.model,
        usage: completion.usage
      });

      const assistantResponse = completion.choices[0]?.message?.content || 
        'Desculpe, tive um problema técnico. Pode repetir sua pergunta? 💕';

      console.log('✅ Groq AI Response:', assistantResponse.substring(0, 100) + '...');

      // Add assistant response to conversation history
      this.conversationHistory.push({
        role: 'assistant',
        content: assistantResponse
      });

      // Keep conversation history manageable (last 10 messages)
      if (this.conversationHistory.length > 11) { // 1 system + 10 messages
        this.conversationHistory = [
          this.conversationHistory[0], // Keep system message
          ...this.conversationHistory.slice(-10) // Keep last 10 messages
        ];
      }

      return assistantResponse;
    } catch (error) {
      console.error('❌ Erro ao chamar Groq API:', error);
      console.error('🔍 Error details:', {
        message: error.message,
        status: error.status || 'unknown',
        type: error.constructor.name
      });
      
      // Fallback to basic responses if API fails
      console.log('🔄 Using fallback response');
      return this.getFallbackResponse(userMessage);
    }
  }

  private getFallbackResponse(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('oi') || lowerMessage.includes('olá')) {
      return `Olá! 💕 Sou a Sofia, sua mentora de relacionamentos. Como posso te ajudar hoje? Me conte o que está acontecendo com vocês dois.`;
    }
    
    if (lowerMessage.includes('briga') || lowerMessage.includes('conflito')) {
      return `Entendo que vocês estão passando por conflitos. 💙 Respirem fundo - vamos trabalhar nisso juntos. Me conte mais sobre o que está acontecendo entre vocês.`;
    }
    
    if (lowerMessage.includes('comunicação')) {
      return `A comunicação é fundamental no relacionamento. 🗣️ Vamos reconstruir essa ponte entre vocês. Que tipo de dificuldade vocês estão enfrentando para se comunicar?`;
    }
    
    return `Obrigada por compartilhar isso comigo. 💕 Sua confiança é muito importante. Pode me contar mais detalhes para que eu possa te ajudar melhor?`;
  }

  clearHistory(): void {
    this.conversationHistory = this.conversationHistory.slice(0, 1); // Keep only system message
  }

  // Test method to verify API connectivity
  async testConnection(): Promise<boolean> {
    try {
      console.log('🧪 Testing Groq API connection...');
      const response = await groq.chat.completions.create({
        messages: [{ role: 'user', content: 'Hi' }],
        model: 'llama-3.1-8b-instant',
        max_tokens: 10
      });
      console.log('✅ Groq API test successful:', response.choices[0]?.message?.content);
      return true;
    } catch (error) {
      console.error('❌ Groq API test failed:', error);
      return false;
    }
  }
}

export const groqService = new GroqService();
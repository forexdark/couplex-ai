# CoupleX AI - Terapeuta Digital para Casais 💕

Uma aplicação moderna de terapia de casais com IA, projetada para ajudar casais a se reconectarem e fortalecerem seus relacionamentos.

## 🚀 Funcionalidades

- **Terapeuta IA 24/7**: Conselhos personalizados baseados em terapia de casais
- **Dashboard Personalizado**: Acompanhe o progresso do seu relacionamento
- **Diário Emocional**: Registre sentimentos e receba orientação
- **Check-in Diário**: Monitore o bem-estar emocional do casal
- **Calendário do Casal**: Organize encontros e datas especiais
- **Metas de Relacionamento**: Definam e acompanhem objetivos juntos
- **Modo Crise**: Protocolo de emergência para conflitos graves
- **Autenticação Segura**: Login com email/senha ou Google

## 🛠️ Tecnologias

- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** + **PostCSS**
- **Firebase** (Authentication + Firestore)
- **React Router DOM**
- **Fontes**: Inter + Poppins (Google Fonts)

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd casalmente
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Preencha o arquivo `.env` com suas credenciais do Firebase:
```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

5. Execute o projeto:
```bash
npm run dev
```

## 🏗️ Build

Para fazer o build de produção:
```bash
npm run build
```

Para visualizar o build:
```bash
npm run preview
```

## 🎨 Design

O design foi inspirado em interfaces modernas como cal.ai, com foco em:
- **Responsividade mobile-first**
- **Paleta emocional** (rosa/vermelho para conexão amorosa)
- **Tipografia elegante** (Inter + Poppins)
- **Componentes glassmorphism**
- **Animações suaves**
- **Sombras e gradientes modernos**

## 📱 PWA Ready

O projeto está preparado para ser convertido em PWA (Progressive Web App) no futuro, com:
- Estrutura modular de componentes
- Layout responsivo
- Performance otimizada
- Offline-first architecture (preparado)

## 🔐 Segurança

- Autenticação Firebase com validação
- Variáveis de ambiente para credenciais
- Validação de formulários
- Tratamento de erros robusto
- Headers de segurança

## 🚀 Deploy

O projeto pode ser facilmente deployado em:
- **Vercel** (recomendado)
- **Netlify**
- **Firebase Hosting**

## 👥 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 💝 Sobre

CoupleX AI foi criado com amor para ajudar casais em todo o Brasil a fortalecerem seus relacionamentos através da tecnologia e inteligência artificial especializada em terapia de casais.

---

**Desenvolvido com 💕 para salvar relacionamentos**
import { useState } from 'react';
import Layout from '../components/Layout';

interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    language: string;
  }[];
}

interface LanguageResult {
  name: string;
  description: string;
  emoji: string;
  color: string;
  tips: string[];
  partnerTips: string[];
}

export default function LanguagesOfLove() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({
    palavras: 0,
    tempo: 0,
    presentes: 0,
    atos: 0,
    toque: 0
  });
  const [showResult, setShowResult] = useState(false);
  const [userLanguage, setUserLanguage] = useState<string>('');

  const languages: { [key: string]: LanguageResult } = {
    palavras: {
      name: 'Palavras de Afirmação',
      emoji: '💬',
      color: 'from-blue-500 to-indigo-500',
      description: 'Você se sente amado(a) quando ouve elogios, encorajamento e palavras carinhosas. Frases como "Você é incrível" ou "Estou orgulhoso(a) de você" fazem seu coração disparar.',
      tips: [
        'Expresse seus sentimentos com palavras todos os dias',
        'Envie mensagens carinhosas durante o dia',
        'Elogie conquistas, mesmo as pequenas',
        'Diga "eu te amo" sempre que sentir vontade',
        'Escreva bilhetes românticos ocasionalmente'
      ],
      partnerTips: [
        'Se seu parceiro tem essa linguagem, elogie-o frequentemente',
        'Envie mensagens de texto carinhosas durante o dia',
        'Diga como você se sente orgulhoso(a) dele',
        'Evite críticas duras - use palavras construtivas',
        'Comemore suas conquistas com palavras de encorajamento'
      ]
    },
    tempo: {
      name: 'Tempo de Qualidade',
      emoji: '⏰',
      color: 'from-green-500 to-teal-500',
      description: 'Você se sente amado(a) quando recebe atenção total do seu parceiro. Conversas profundas, atividades juntos e momentos sem distrações são essenciais para você.',
      tips: [
        'Reserve momentos exclusivos para estar com seu parceiro',
        'Desligue celular e TV durante conversas importantes',
        'Planejem atividades que ambos gostem',
        'Pratique escuta ativa nas conversas',
        'Criem tradições especiais só de vocês dois'
      ],
      partnerTips: [
        'Dedique tempo exclusivo sem distrações',
        'Façam atividades que ele(a) gosta regularmente',
        'Conversem sobre os sonhos e medos um do outro',
        'Evite usar celular quando estão juntos',
        'Planejem encontros regulares, mesmo que simples'
      ]
    },
    presentes: {
      name: 'Presentes',
      emoji: '🎁',
      color: 'from-purple-500 to-pink-500',
      description: 'Você se sente amado(a) através de gestos simbólicos e lembranças. Não precisa ser caro - o que importa é o pensamento e o carinho por trás do presente.',
      tips: [
        'Observe o que seu parceiro menciona querer',
        'Dê presentes surpresa sem ocasião especial',
        'Faça presentes caseiros e personalizados',
        'Guarde objetos que tenham significado especial',
        'Lembre-se de datas importantes com algo simbólico'
      ],
      partnerTips: [
        'Dê pequenos presentes regularmente, não só em datas especiais',
        'Observe dicas sobre coisas que ele(a) gostaria de ter',
        'Presentes feitos à mão têm valor especial',
        'Traga lembranças quando viajar',
        'O valor não importa - o pensamento sim'
      ]
    },
    atos: {
      name: 'Atos de Serviço',
      emoji: '🤝',
      color: 'from-orange-500 to-red-500',
      description: 'Você se sente amado(a) quando seu parceiro faz coisas para ajudá-lo(a). Ações falam mais alto que palavras - lavar louça, cozinhar ou resolver problemas são gestos de amor.',
      tips: [
        'Observe o que seu parceiro precisa de ajuda',
        'Faça tarefas domésticas sem ser pedido',
        'Resolva problemas práticos dele(a)',
        'Cozinhe algo especial ocasionalmente',
        'Cuide dos detalhes que facilitam a vida dele(a)'
      ],
      partnerTips: [
        'Ajude com tarefas que ele(a) não gosta',
        'Antecipe necessidades práticas',
        'Mantenha promessas - confiabilidade é amor',
        'Faça coisas que economizem tempo dele(a)',
        'Resolva problemas sem que precise pedir'
      ]
    },
    toque: {
      name: 'Toque Físico',
      emoji: '🤗',
      color: 'from-rose-500 to-red-500',
      description: 'Você se sente amado(a) através do contato físico. Abraços, beijos, carinhos e proximidade física são fundamentais para se sentir conectado(a) e seguro(a).',
      tips: [
        'Demonstre afeto através de toques carinhosos',
        'Abraços longos são especialmente importantes',
        'Segure a mão do seu parceiro sempre que possível',
        'Faça massagens relaxantes ocasionalmente',
        'Mantenha proximidade física no dia a dia'
      ],
      partnerTips: [
        'Dê abraços frequentes e carinhos espontâneos',
        'Segure a mão dele(a) em público',
        'Faça massagens quando estiver estressado(a)',
        'Mantenha contato físico durante conversas',
        'Um toque suave pode acalmar em momentos difíceis'
      ]
    }
  };

  const questions: Question[] = [
    {
      id: 1,
      question: "O que mais faz você se sentir amado(a)?",
      options: [
        { text: "Quando meu parceiro me elogia e diz coisas carinhosas", language: "palavras" },
        { text: "Quando passamos tempo juntos conversando ou fazendo atividades", language: "tempo" },
        { text: "Quando recebo presentes ou lembranças, mesmo pequenas", language: "presentes" },
        { text: "Quando meu parceiro me ajuda com tarefas ou resolve problemas", language: "atos" },
        { text: "Quando recebo abraços, carinhos ou proximidade física", language: "toque" }
      ]
    },
    {
      id: 2,
      question: "Quando você quer demonstrar amor, você prefere:",
      options: [
        { text: "Dizer palavras doces e elogios sinceros", language: "palavras" },
        { text: "Passar tempo de qualidade fazendo algo especial juntos", language: "tempo" },
        { text: "Dar um presente ou surpresa que mostre que pensei na pessoa", language: "presentes" },
        { text: "Fazer algo útil ou ajudar com tarefas do dia a dia", language: "atos" },
        { text: "Dar abraços, beijos ou demonstrar carinho físico", language: "toque" }
      ]
    },
    {
      id: 3,
      question: "O que mais machuca você em um relacionamento?",
      options: [
        { text: "Quando meu parceiro me critica ou fala de forma harsh", language: "palavras" },
        { text: "Quando ele(a) está sempre ocupado(a) e não temos tempo juntos", language: "tempo" },
        { text: "Quando ele(a) esquece datas importantes ou nunca me dá presentes", language: "presentes" },
        { text: "Quando eu tenho que fazer tudo sozinho(a) e não recebo ajuda", language: "atos" },
        { text: "Quando há pouco contato físico ou carinho entre nós", language: "toque" }
      ]
    },
    {
      id: 4,
      question: "Em um dia difícil, o que mais te confortaria?",
      options: [
        { text: "Ouvir palavras de encorajamento e apoio", language: "palavras" },
        { text: "Ter alguém para conversar e me dar atenção total", language: "tempo" },
        { text: "Receber uma surpresa ou mimo que mostre cuidado", language: "presentes" },
        { text: "Ter alguém que resolva problemas práticos por mim", language: "atos" },
        { text: "Receber um abraço apertado e carinho físico", language: "toque" }
      ]
    },
    {
      id: 5,
      question: "Como você gostaria que seu parceiro reagisse quando você conta uma conquista?",
      options: [
        { text: "Me elogiando e dizendo como se sente orgulhoso(a)", language: "palavras" },
        { text: "Parando tudo para me ouvir e celebrar comigo", language: "tempo" },
        { text: "Me dando algo especial para comemorar", language: "presentes" },
        { text: "Se oferecendo para ajudar com os próximos passos", language: "atos" },
        { text: "Me abraçando forte e demonstrando alegria física", language: "toque" }
      ]
    },
    {
      id: 6,
      question: "Se seu parceiro só pudesse fazer UMA coisa por semana, você preferiria que fosse:",
      options: [
        { text: "Me mandar mensagens carinhosas todos os dias", language: "palavras" },
        { text: "Reservar uma noite só para conversarmos", language: "tempo" },
        { text: "Me trazer uma pequena surpresa", language: "presentes" },
        { text: "Cuidar de algo que eu preciso fazer", language: "atos" },
        { text: "Me dar massagem ou carinho físico", language: "toque" }
      ]
    }
  ];

  const handleAnswer = (language: string) => {
    setAnswers(prev => ({
      ...prev,
      [language]: prev[language] + 1
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calcular resultado
      const maxScore = Math.max(...Object.values({...answers, [language]: answers[language] + 1}));
      const result = Object.entries({...answers, [language]: answers[language] + 1})
        .find(([_, score]) => score === maxScore)?.[0] || 'palavras';
      
      setUserLanguage(result);
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({
      palavras: 0,
      tempo: 0,
      presentes: 0,
      atos: 0,
      toque: 0
    });
    setShowResult(false);
    setUserLanguage('');
  };

  if (showResult && userLanguage) {
    const result = languages[userLanguage];
    
    return (
      <Layout showHeader>
        <div className="container-app py-12">
          {/* Result Header */}
          <div className="text-center mb-12">
            <div className={`w-24 h-24 bg-gradient-to-r ${result.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow`}>
              <span className="text-4xl">{result.emoji}</span>
            </div>
            <h1 className="text-4xl font-bold font-display text-neutral-900 mb-4">
              Sua Linguagem do Amor é:
            </h1>
            <h2 className="text-3xl font-bold text-rose-600 mb-6">
              {result.name}
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              {result.description}
            </p>
          </div>

          {/* Tips for User */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="card">
              <h3 className="text-2xl font-bold font-display text-neutral-900 mb-6 flex items-center">
                <span className="mr-3">💝</span>
                Dicas para Você
              </h3>
              <ul className="space-y-4">
                {result.tips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-rose-500 mr-3 mt-1">•</span>
                    <span className="text-neutral-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold font-display text-neutral-900 mb-6 flex items-center">
                <span className="mr-3">💕</span>
                Dicas para seu Parceiro
              </h3>
              <ul className="space-y-4">
                {result.partnerTips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary-500 mr-3 mt-1">•</span>
                    <span className="text-neutral-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* All Languages Overview */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold font-display text-neutral-900 text-center mb-8">
              Conheça todas as 5 Linguagens do Amor
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(languages).map(([key, lang]) => (
                <div 
                  key={key} 
                  className={`card hover:shadow-glow transition-all duration-300 ${
                    key === userLanguage ? 'border-2 border-rose-300 bg-rose-50' : ''
                  }`}
                >
                  <div className="text-center mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${lang.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <span className="text-2xl">{lang.emoji}</span>
                    </div>
                    <h4 className="text-xl font-bold font-display text-neutral-900 mb-2">
                      {lang.name}
                    </h4>
                    {key === userLanguage && (
                      <span className="bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        Sua Linguagem!
                      </span>
                    )}
                  </div>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {lang.description.substring(0, 120)}...
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button 
                onClick={resetQuiz}
                className="btn-secondary px-8 py-3"
              >
                🔄 Refazer o Quiz
              </button>
              <button className="btn-primary px-8 py-3">
                💕 Compartilhar Resultado
              </button>
            </div>
            
            <div className="card bg-gradient-to-r from-rose-50 to-primary-50 border-2 border-rose-200 max-w-2xl mx-auto">
              <h4 className="text-xl font-bold text-neutral-900 mb-4">
                💡 Quer descobrir a linguagem do seu parceiro?
              </h4>
              <p className="text-neutral-700 mb-6">
                Compartilhe este quiz com seu parceiro para descobrirem as linguagens um do outro 
                e fortalecerem ainda mais o relacionamento!
              </p>
              <button className="btn-primary">
                📱 Enviar Quiz para meu Parceiro
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      showHeader 
      showNavigation 
      navigationTitle="💕 Linguagens do Amor"
    >
      <div className="container-app py-12">
        {/* Welcome Message */}
        <div className="text-center mb-12">
          <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto mb-8">
            Baseado no livro best-seller de Gary Chapman, este quiz vai revelar como você 
            expressa e recebe amor de forma mais profunda.
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex justify-between text-sm text-neutral-600 mb-2">
              <span>Questão {currentQuestion + 1} de {questions.length}</span>
              <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-rose-500 to-primary-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="max-w-4xl mx-auto">
          <div className="card bg-white shadow-glow border-2 border-rose-100 mb-8">
            <h2 className="text-2xl font-bold font-display text-neutral-900 mb-8 text-center">
              {questions[currentQuestion].question}
            </h2>
            
            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.language)}
                  className="w-full p-6 text-left border-2 border-neutral-200 rounded-2xl hover:border-rose-300 hover:bg-rose-50 transition-all duration-200 group"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-neutral-100 group-hover:bg-rose-200 rounded-full flex items-center justify-center mr-4 transition-colors">
                      <span className="text-neutral-600 group-hover:text-rose-700 font-bold">
                        {String.fromCharCode(65 + index)}
                      </span>
                    </div>
                    <span className="text-neutral-700 group-hover:text-neutral-900 text-lg">
                      {option.text}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 5 Languages Preview */}
          <div className="grid md:grid-cols-5 gap-4 text-center">
            {Object.entries(languages).map(([key, lang]) => (
              <div key={key} className="p-4 bg-white/50 rounded-xl border border-neutral-200">
                <div className="text-3xl mb-2">{lang.emoji}</div>
                <h4 className="text-sm font-bold text-neutral-800">{lang.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
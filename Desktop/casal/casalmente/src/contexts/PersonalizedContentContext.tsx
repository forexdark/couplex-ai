import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from './LanguageContext';

export type CoupleType = 
  | 'heterosexual_dating' 
  | 'heterosexual_engaged' 
  | 'heterosexual_married'
  | 'homosexual_male_dating'
  | 'homosexual_male_engaged'
  | 'homosexual_male_married'
  | 'homosexual_female_dating'
  | 'homosexual_female_engaged'
  | 'homosexual_female_married'
  | 'long_distance'
  | 'new_parents'
  | 'second_marriage'
  | 'polyamorous'
  | 'age_gap'
  | 'intercultural'
  | 'blended_family';

export type RelationshipStage = 'new' | 'established' | 'challenging' | 'thriving' | 'recovering';

export type CommunicationStyle = 'direct' | 'gentle' | 'analytical' | 'emotional' | 'practical';

export interface CoupleProfile {
  id: string;
  type: CoupleType;
  stage: RelationshipStage;
  communicationStyle: CommunicationStyle;
  relationshipDuration: number; // months
  livingTogether: boolean;
  hasChildren: boolean;
  primaryChallenges: string[];
  strengths: string[];
  goals: string[];
  culturalBackground?: string[];
  languages?: string[];
  specialCircumstances?: string[];
}

export interface PersonalizedContent {
  id: string;
  type: 'article' | 'exercise' | 'tip' | 'challenge' | 'script' | 'meditation';
  title: string;
  content: string;
  targetAudience: CoupleType[];
  relevantStages: RelationshipStage[];
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // minutes
  category: 'communication' | 'intimacy' | 'conflict' | 'growth' | 'fun' | 'parenting';
  culturallyAdapted: boolean;
  lgbtqFriendly: boolean;
  polyamoryFriendly: boolean;
}

interface PersonalizedContentContextType {
  coupleProfile: CoupleProfile | null;
  personalizedContent: PersonalizedContent[];
  isLoading: boolean;
  updateProfile: (profile: Partial<CoupleProfile>) => void;
  getRecommendedContent: (category?: string, limit?: number) => PersonalizedContent[];
  getContentByType: (type: PersonalizedContent['type']) => PersonalizedContent[];
  searchContent: (query: string) => PersonalizedContent[];
  markContentAsViewed: (contentId: string) => void;
  rateContent: (contentId: string, rating: number) => void;
  getProfileCompleteness: () => number;
}

const PersonalizedContentContext = createContext<PersonalizedContentContextType | undefined>(undefined);

// Base de conteúdo personalizado
const contentDatabase: PersonalizedContent[] = [
  // Conteúdo para casais heterossexuais
  {
    id: 'hetero_communication_1',
    type: 'exercise',
    title: 'Exercício: 5 Linguagens do Amor para Casais Heterossexuais',
    content: `
    Este exercício foi adaptado especificamente para dinâmicas de relacionamentos heterossexuais:
    
    **Para ela:**
    - Identifique qual linguagem do amor mais ressoa com você
    - Comunique claramente suas necessidades emocionais
    - Observe como seu parceiro expressa amor de forma diferente
    
    **Para ele:**
    - Pratique a escuta ativa sem tentar "resolver" imediatamente
    - Expresse seus sentimentos de forma mais verbal se necessário
    - Reconheça gestos sutis de carinho
    
    **Juntos:**
    - Criem um "dicionário de amor" personalizado
    - Definam momentos específicos para expressão afetiva
    - Celebrem as diferenças nas formas de amar
    `,
    targetAudience: ['heterosexual_dating', 'heterosexual_engaged', 'heterosexual_married'],
    relevantStages: ['new', 'established', 'challenging'],
    tags: ['comunicação', 'linguagens do amor', 'heterossexual'],
    difficulty: 'beginner',
    estimatedTime: 30,
    category: 'communication',
    culturallyAdapted: false,
    lgbtqFriendly: false,
    polyamoryFriendly: false
  },

  // Conteúdo para casais LGBTQ+
  {
    id: 'lgbt_pride_communication',
    type: 'article',
    title: 'Navegando a Identidade Sexual no Relacionamento',
    content: `
    **Para Casais LGBTQ+: Fortalecendo a Conexão através da Autenticidade**
    
    Relacionamentos LGBTQ+ enfrentam desafios únicos que requerem abordagens específicas:
    
    **Comunicação sobre Identidade:**
    - Conversem abertamente sobre suas jornadas de autodescoberta
    - Respeitem os tempos diferentes de "saída do armário"
    - Apoiem-se mutuamente em situações sociais desafiadoras
    
    **Construindo Suporte Mútuo:**
    - Criem um ambiente seguro para expressão autêntica
    - Desenvolvam estratégias para lidar com preconceito externo
    - Celebrem suas identidades únicas dentro do relacionamento
    
    **Intimidade Autêntica:**
    - Explorem formas de intimidade que honrem suas identidades
    - Comuniquem necessidades específicas sem julgamento
    - Construam intimidade além das expectativas heteronormativas
    `,
    targetAudience: ['homosexual_male_dating', 'homosexual_male_engaged', 'homosexual_male_married', 'homosexual_female_dating', 'homosexual_female_engaged', 'homosexual_female_married'],
    relevantStages: ['new', 'established', 'challenging', 'thriving'],
    tags: ['LGBTQ+', 'identidade', 'apoio', 'autenticidade'],
    difficulty: 'intermediate',
    estimatedTime: 20,
    category: 'communication',
    culturallyAdapted: true,
    lgbtqFriendly: true,
    polyamoryFriendly: false
  },

  // Conteúdo para relacionamentos à distância
  {
    id: 'long_distance_intimacy',
    type: 'challenge',
    title: 'Desafio: 30 Dias de Conexão à Distância',
    content: `
    **Desafio Especial para Relacionamentos à Distância**
    
    **Semana 1 - Comunicação Criativa:**
    - Dia 1-2: Enviem áudios longos compartilhando o dia
    - Dia 3-4: Escrevam cartas digitais detalhadas
    - Dia 5-7: Façam videochamadas temáticas (jantar virtual, passeio pela casa)
    
    **Semana 2 - Intimidade Emocional:**
    - Dia 8-10: Compartilhem medos e sonhos profundos
    - Dia 11-14: Façam jogos de perguntas íntimas online
    
    **Semana 3 - Experiências Compartilhadas:**
    - Dia 15-17: Assistam filmes/séries simultaneamente
    - Dia 18-21: Cozinhem a mesma receita cada um em sua casa
    
    **Semana 4 - Planejamento do Futuro:**
    - Dia 22-24: Planejem o próximo encontro em detalhes
    - Dia 25-28: Definam metas de relacionamento
    - Dia 29-30: Celebrem a jornada e conexão mantida
    `,
    targetAudience: ['long_distance'],
    relevantStages: ['new', 'established', 'challenging'],
    tags: ['distância', 'conexão', 'intimidade virtual'],
    difficulty: 'intermediate',
    estimatedTime: 45,
    category: 'intimacy',
    culturallyAdapted: false,
    lgbtqFriendly: true,
    polyamoryFriendly: true
  },

  // Conteúdo para novos pais
  {
    id: 'new_parents_connection',
    type: 'tip',
    title: 'Mantendo a Conexão com Bebê em Casa',
    content: `
    **Estratégias para Novos Pais Manterem o Romance Vivo**
    
    **Micro-Momentos de Conexão:**
    - Abraços de 20 segundos durante as trocas de turno
    - Mensagens de texto carinhosas durante o dia
    - Olhares cúmplices durante as mamadas/alimentação
    
    **Comunicação Eficiente:**
    - Check-ins rápidos de 5 minutos sobre sentimentos
    - Sistema de sinais para necessidades (descanso, ajuda, carinho)
    - Conversas sobre divisão de tarefas sem julgamento
    
    **Intimidade Adaptada:**
    - Redefinam intimidade além do físico
    - Encontrem momentos para toques não-sexuais
    - Celebrem pequenas conquistas juntos
    
    **Autocuidado Individual:**
    - Revezem tempo para descanso pessoal
    - Mantenham hobbies individuais quando possível
    - Busquem ajuda sem culpa
    `,
    targetAudience: ['new_parents'],
    relevantStages: ['challenging', 'recovering'],
    tags: ['parentalidade', 'bebê', 'conexão', 'cansaço'],
    difficulty: 'beginner',
    estimatedTime: 15,
    category: 'parenting',
    culturallyAdapted: false,
    lgbtqFriendly: true,
    polyamoryFriendly: false
  },

  // Conteúdo para relacionamentos poliamorosos
  {
    id: 'poly_communication',
    type: 'script',
    title: 'Scripts de Comunicação para Relacionamentos Poliamorosos',
    content: `
    **Scripts para Conversas Importantes em Relacionamentos Poliamorosos**
    
    **Para Expressar Necessidades:**
    "Preciso conversar sobre algo importante para mim. Posso ter sua atenção completa por alguns minutos? É sobre [tópico específico] e como isso afeta nosso relacionamento."
    
    **Para Lidar com Ciúmes:**
    "Estou sentindo ciúmes sobre [situação específica]. Sei que é minha responsabilidade processar isso, mas gostaria do seu apoio. Podemos conversar sobre como me sinto mais seguro(a)?"
    
    **Para Negociar Tempo:**
    "Gostaria de planejar nosso tempo juntos para as próximas semanas. O que é mais importante para você? Como podemos equilibrar nossas necessidades com outros relacionamentos?"
    
    **Para Estabelecer Limites:**
    "Preciso estabelecer um limite sobre [situação]. Isso não é sobre controlar você, mas sobre meu bem-estar. Podemos encontrar uma solução que funcione para todos?"
    
    **Para Check-ins Regulares:**
    "Como você está se sentindo sobre nosso relacionamento ultimamente? Há algo que gostaria de ajustar ou celebrar?"
    `,
    targetAudience: ['polyamorous'],
    relevantStages: ['new', 'established', 'challenging'],
    tags: ['poliamor', 'comunicação', 'ciúmes', 'limites'],
    difficulty: 'advanced',
    estimatedTime: 25,
    category: 'communication',
    culturallyAdapted: false,
    lgbtqFriendly: true,
    polyamoryFriendly: true
  },

  // Conteúdo para segundo casamento
  {
    id: 'second_marriage_blending',
    type: 'exercise',
    title: 'Integrando Famílias em Segundos Casamentos',
    content: `
    **Exercício: Construindo Uma Nova Família Unida**
    
    **Fase 1 - Mapeamento Familiar (Semana 1-2):**
    - Cada parceiro desenha sua árvore genealógica atual
    - Identifiquem tradições familiares importantes
    - Discutam expectativas sobre papéis familiares
    
    **Fase 2 - Criação de Novas Tradições (Semana 3-4):**
    - Escolham 3 tradições de cada família para manter
    - Criem 2 novas tradições únicas da nova família
    - Definam rituais para momentos especiais
    
    **Fase 3 - Integração Gradual (Mês 2):**
    - Atividades semanais incluindo todos os membros
    - Conversas individuais com cada criança/membro
    - Momentos só do casal para manter conexão
    
    **Fase 4 - Ajustes e Celebração (Mês 3):**
    - Avaliem o que está funcionando bem
    - Ajustem estratégias que não estão fluindo
    - Celebrem progressos e marcos alcançados
    `,
    targetAudience: ['second_marriage', 'blended_family'],
    relevantStages: ['new', 'challenging'],
    tags: ['segundo casamento', 'família mista', 'integração', 'crianças'],
    difficulty: 'advanced',
    estimatedTime: 60,
    category: 'growth',
    culturallyAdapted: false,
    lgbtqFriendly: true,
    polyamoryFriendly: false
  }
];

export function PersonalizedContentProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [coupleProfile, setCoupleProfile] = useState<CoupleProfile | null>(null);
  const [personalizedContent, setPersonalizedContent] = useState<PersonalizedContent[]>(contentDatabase);
  const [isLoading, setIsLoading] = useState(false);
  const [viewedContent, setViewedContent] = useState<string[]>([]);
  const [contentRatings, setContentRatings] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    if (user) {
      loadProfile();
      loadViewedContent();
      loadContentRatings();
    }
  }, [user]);

  const loadProfile = () => {
    const saved = localStorage.getItem(`couple_profile_${user?.uid}`);
    if (saved) {
      setCoupleProfile(JSON.parse(saved));
    }
  };

  const loadViewedContent = () => {
    const saved = localStorage.getItem(`viewed_content_${user?.uid}`);
    if (saved) {
      setViewedContent(JSON.parse(saved));
    }
  };

  const loadContentRatings = () => {
    const saved = localStorage.getItem(`content_ratings_${user?.uid}`);
    if (saved) {
      setContentRatings(JSON.parse(saved));
    }
  };

  const saveProfile = (profile: CoupleProfile) => {
    if (user) {
      localStorage.setItem(`couple_profile_${user.uid}`, JSON.stringify(profile));
      setCoupleProfile(profile);
    }
  };

  const updateProfile = (updates: Partial<CoupleProfile>) => {
    if (!coupleProfile) {
      const newProfile: CoupleProfile = {
        id: `profile_${Date.now()}`,
        type: 'heterosexual_dating',
        stage: 'new',
        communicationStyle: 'direct',
        relationshipDuration: 0,
        livingTogether: false,
        hasChildren: false,
        primaryChallenges: [],
        strengths: [],
        goals: [],
        ...updates
      };
      saveProfile(newProfile);
    } else {
      const updatedProfile = { ...coupleProfile, ...updates };
      saveProfile(updatedProfile);
    }
  };

  const getRecommendedContent = (category?: string, limit: number = 10): PersonalizedContent[] => {
    if (!coupleProfile) return personalizedContent.slice(0, limit);

    let filtered = personalizedContent.filter(content => {
      // Filtrar por tipo de casal
      const matchesType = content.targetAudience.includes(coupleProfile.type);
      
      // Filtrar por estágio do relacionamento
      const matchesStage = content.relevantStages.includes(coupleProfile.stage);
      
      // Filtrar por categoria se especificada
      const matchesCategory = !category || content.category === category;
      
      // Verificar compatibilidade cultural/orientação
      const isLGBTQCompatible = content.lgbtqFriendly || !coupleProfile.type.includes('homosexual');
      const isPolyCompatible = content.polyamoryFriendly || coupleProfile.type !== 'polyamorous';
      
      return matchesType && matchesStage && matchesCategory && isLGBTQCompatible && isPolyCompatible;
    });

    // Priorizar conteúdo não visualizado
    const unviewed = filtered.filter(content => !viewedContent.includes(content.id));
    const viewed = filtered.filter(content => viewedContent.includes(content.id));
    
    // Ordenar por relevância (conteúdo não visto primeiro, depois por rating)
    const sorted = [...unviewed, ...viewed].sort((a, b) => {
      const ratingA = contentRatings[a.id] || 0;
      const ratingB = contentRatings[b.id] || 0;
      return ratingB - ratingA;
    });

    return sorted.slice(0, limit);
  };

  const getContentByType = (type: PersonalizedContent['type']): PersonalizedContent[] => {
    return personalizedContent.filter(content => content.type === type);
  };

  const searchContent = (query: string): PersonalizedContent[] => {
    const lowercaseQuery = query.toLowerCase();
    return personalizedContent.filter(content =>
      content.title.toLowerCase().includes(lowercaseQuery) ||
      content.content.toLowerCase().includes(lowercaseQuery) ||
      content.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  };

  const markContentAsViewed = (contentId: string) => {
    if (!viewedContent.includes(contentId)) {
      const updated = [...viewedContent, contentId];
      setViewedContent(updated);
      if (user) {
        localStorage.setItem(`viewed_content_${user.uid}`, JSON.stringify(updated));
      }
    }
  };

  const rateContent = (contentId: string, rating: number) => {
    const updated = { ...contentRatings, [contentId]: rating };
    setContentRatings(updated);
    if (user) {
      localStorage.setItem(`content_ratings_${user.uid}`, JSON.stringify(updated));
    }
  };

  const getProfileCompleteness = (): number => {
    if (!coupleProfile) return 0;
    
    const fields = [
      coupleProfile.type,
      coupleProfile.stage,
      coupleProfile.communicationStyle,
      coupleProfile.relationshipDuration > 0,
      coupleProfile.primaryChallenges.length > 0,
      coupleProfile.strengths.length > 0,
      coupleProfile.goals.length > 0
    ];
    
    const completedFields = fields.filter(field => field).length;
    return Math.round((completedFields / fields.length) * 100);
  };

  return (
    <PersonalizedContentContext.Provider value={{
      coupleProfile,
      personalizedContent,
      isLoading,
      updateProfile,
      getRecommendedContent,
      getContentByType,
      searchContent,
      markContentAsViewed,
      rateContent,
      getProfileCompleteness
    }}>
      {children}
    </PersonalizedContentContext.Provider>
  );
}

export function usePersonalizedContent() {
  const context = useContext(PersonalizedContentContext);
  if (context === undefined) {
    throw new Error('usePersonalizedContent must be used within a PersonalizedContentProvider');
  }
  return context;
}
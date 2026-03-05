export type Course = {
  id: number;
  code: string;
  name: string;
  area: string;
  workload: string;
  modality: string;
  schedule: string;
  featured?: boolean;
};

export const courses: Course[] = [
  {
    id: 1,
    code: 'CC-001',
    name: 'Interpretação e Auditor Interno normas ISO 37001 e ISO 37301',
    area: 'Compliance & Antissuborno',
    workload: 'A definir',
    modality: 'A definir',
    schedule: 'On-demand',
    featured: true
  },
  {
    id: 2,
    code: 'CC-002',
    name: 'Interpretação e Implementação da ISO/UNDP PAS 53002:2024',
    area: 'Compliance & Antissuborno',
    workload: 'A definir',
    modality: 'A definir',
    schedule: 'On-demand',
    featured: true
  },
  {
    id: 3,
    code: 'CC-003',
    name: 'Gestão de Riscos com base na Norma ISO 31008:2018',
    area: 'Gestão de Riscos',
    workload: 'A definir',
    modality: 'A definir',
    schedule: 'On-demand',
    featured: true
  },
  {
    id: 4,
    code: 'CC-004',
    name: 'Auditoria e Investigações Internas com base nas normas ISO 19011 e 37008',
    area: 'Auditoria & Investigações',
    workload: 'A definir',
    modality: 'A definir',
    schedule: 'On-demand'
  },
  {
    id: 5,
    code: 'CC-005',
    name: 'Framework Princípios ESG ISO IW48:2024',
    area: 'ESG',
    workload: 'A definir',
    modality: 'A definir',
    schedule: 'On-demand'
  },
  {
    id: 6,
    code: 'CC-006',
    name: 'Curso Avançado de ESG de Impacto Reputacional',
    area: 'ESG & Reputação',
    workload: 'A definir',
    modality: 'A definir',
    schedule: 'On-demand'
  },
  {
    id: 7,
    code: 'CC-007',
    name: 'Gestão de Risco de Fraude',
    area: 'Risco & Fraude',
    workload: 'A definir',
    modality: 'A definir',
    schedule: 'On-demand'
  },
  {
    id: 8,
    code: 'CC-008',
    name: 'Curso Executivo: Direito e Finanças Para Gestores',
    area: 'Direito & Finanças',
    workload: 'A definir',
    modality: 'A definir',
    schedule: 'On-demand'
  },
  {
    id: 9,
    code: 'CC-009',
    name: 'Curso Executivo: Governança, Risco, Compliance e Reputação Empresarial',
    area: 'Governança & Compliance',
    workload: 'A definir',
    modality: 'A definir',
    schedule: 'On-demand',
    featured: true
  },
  {
    id: 10,
    code: 'CC-010',
    name: 'Implementação e Gestão de Escritórios de Projectos (PMO)',
    area: 'Projectos (PMO)',
    workload: 'A definir',
    modality: 'A definir',
    schedule: 'On-demand'
  },
  {
    id: 11,
    code: 'CC-011',
    name: 'Gestão da Mudança',
    area: 'Mudança Organizacional',
    workload: 'A definir',
    modality: 'A definir',
    schedule: 'On-demand'
  },
  {
    id: 12,
    code: 'CC-012',
    name: 'Curso Global Gestão Financeira e Controlo de Gestão',
    area: 'Finanças & Controlo',
    workload: 'A definir',
    modality: 'A definir',
    schedule: 'On-demand'
  },
  {
    id: 13,
    code: 'CC-013',
    name: 'Análise de Investimento Custo-Benefício',
    area: 'Finanças & Investimentos',
    workload: 'A definir',
    modality: 'A definir',
    schedule: 'On-demand'
  },
  {
    id: 14,
    code: 'CC-014',
    name: 'Ética nas Negociações e Contratações',
    area: 'Ética & Contratações',
    workload: 'A definir',
    modality: 'A definir',
    schedule: 'On-demand'
  },
  {
    id: 15,
    code: 'CC-015',
    name: 'Gestão de Tesouraria',
    area: 'Tesouraria',
    workload: 'A definir',
    modality: 'A definir',
    schedule: 'On-demand'
  },
  {
    id: 16,
    code: 'CC-016',
    name: 'Gestão de Património',
    area: 'Património',
    workload: 'A definir',
    modality: 'A definir',
    schedule: 'On-demand'
  },
  {
    id: 17,
    code: 'CC-017',
    name: 'Segurança da Informação e Risco Cibernético',
    area: 'Segurança da Informação',
    workload: 'A definir',
    modality: 'A definir',
    schedule: 'On-demand',
    featured: true
  },
  {
    id: 18,
    code: 'CC-018',
    name: 'Regulamentação e Compliance no Mercado de Capitais',
    area: 'Mercado de Capitais & Compliance',
    workload: 'A definir',
    modality: 'A definir',
    schedule: 'On-demand'
  },
  {
    id: 19,
    code: 'CC-019',
    name: 'Prevenção e Combate à Procrastinação, Sedentarismo e Esgotamento Mental',
    area: 'Bem-estar & Produtividade',
    workload: 'A definir',
    modality: 'A definir',
    schedule: 'On-demand'
  },
  {
    id: 20,
    code: 'CC-020',
    name:
      'Curso de Especialização em Prevenção e Combate à Corrupção, Branqueamento de Capitais e Contrabando de Produtos Petrolíferos em Angola',
    area: 'Compliance & Anticorrupção',
    workload: 'A definir',
    modality: 'A definir',
    schedule: 'On-demand'
  },
  {
    id: 21,
    code: 'CC-021',
    name: 'Green Compliance',
    area: 'Compliance Ambiental',
    workload: 'A definir',
    modality: 'A definir',
    schedule: 'On-demand'
  },
  {
    id: 22,
    code: 'CC-022',
    name: 'Compliance Officer',
    area: 'Compliance Profissional',
    workload: 'A definir',
    modality: 'A definir',
    schedule: 'On-demand'
  },
  {
    id: 23,
    code: 'CC-023',
    name: 'Governance Officer',
    area: 'Governança Profissional',
    workload: 'A definir',
    modality: 'A definir',
    schedule: 'On-demand'
  },
  {
    id: 24,
    code: 'CC-024',
    name: 'Auditoria Contabilística e Financeira',
    area: 'Auditoria & Contabilidade',
    workload: 'A definir',
    modality: 'A definir',
    schedule: 'On-demand'
  },
  {
    id: 25,
    code: 'CC-025',
    name: 'Secretariado Executivo',
    area: 'Administração',
    workload: 'A definir',
    modality: 'A definir',
    schedule: 'On-demand'
  },
  {
    id: 26,
    code: 'CC-026',
    name: 'Gestão de Tempo, Foco e Produtividade',
    area: 'Produtividade',
    workload: 'A definir',
    modality: 'A definir',
    schedule: 'On-demand'
  },
  {
    id: 27,
    code: 'CC-027',
    name: 'Liderança e Gestão de Equipas',
    area: 'Liderança',
    workload: 'A definir',
    modality: 'A definir',
    schedule: 'On-demand'
  },
  {
    id: 28,
    code: 'CC-028',
    name: 'Gestão de Carreiras e Plano de Sucessão',
    area: 'Gestão de Pessoas',
    workload: 'A definir',
    modality: 'A definir',
    schedule: 'On-demand'
  },
  {
    id: 29,
    code: 'CC-029',
    name: 'Curso Global Avançado Governança Corporativa e Compliance',
    area: 'Governança Corporativa',
    workload: 'A definir',
    modality: 'A definir',
    schedule: 'On-demand',
    featured: true
  },
  {
    id: 30,
    code: 'CC-030',
    name: 'Fundamentos em Gestão de Projectos',
    area: 'Projectos',
    workload: 'A definir',
    modality: 'A definir',
    schedule: 'On-demand'
  },
  {
    id: 31,
    code: 'CC-031',
    name: 'Balanced ScoreCard + OKR Master',
    area: 'Estratégia & Performance',
    workload: 'A definir',
    modality: 'A definir',
    schedule: 'On-demand',
    featured: true
  },
  {
    id: 32,
    code: 'CC-032',
    name: 'Gestão de Fundo Social / Caixa de Previdência',
    area: 'Previdência',
    workload: 'A definir',
    modality: 'A definir',
    schedule: 'On-demand'
  },
  {
    id: 33,
    code: 'CC-033',
    name: 'Contabilidade para Instituições Financeiras: IFRS e regulação específica',
    area: 'Contabilidade & IFRS',
    workload: 'A definir',
    modality: 'A definir',
    schedule: 'On-demand'
  },
  {
    id: 34,
    code: 'CC-034',
    name: 'Administração de Contas a Pagar e a Receber',
    area: 'Finanças Operacionais',
    workload: 'A definir',
    modality: 'A definir',
    schedule: 'On-demand'
  }
];

export const featuredCourses = courses.filter((course) => course.featured);

export const getCourseById = (id: number) => courses.find((course) => course.id === id);

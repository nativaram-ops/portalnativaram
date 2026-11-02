/**
 * Catálogo Oficial de Graduações Sagradas — Cooperativa Nativaram
 *
 * Em estrita observância à Resolução CONAD nº 01/2010 e ao purismo botânico,
 * o feitio tradicional da Ayahuasca em Cruzeiro do Sul/AC utiliza exclusivamente
 * o binômio Cipó Tucunacá (Banisteriopsis caapi var. Tucunaca) e Folha Chacrona Rainha (Psychotria viridis)
 * com água pura de nascente, sem aditivos aleatórios.
 */

export interface GraduacaoSacramento {
  id: string;
  codigo: string;
  nomeSagrado: string;
  arquetipo: string;
  proporcaoBiomassa: string;
  porcaoSugerida: string;
  duracaoEstimada: string;
  perfilLiturgico: string;
  indicacaoRito: string;
  rateioAtacado5a10L: string;
  rateioAtacado10a20L: string;
  perfilFitoquimico?: string;
  destaque: boolean;
}

export const PARAMETROS_OPERACIONAIS_FEITIO = {
  origemFeitio: "Cruzeiro do Sul, Acre — Amazônia Ocidental",
  pontoApoioLogistico: "Serra, Espírito Santo — Sudeste",
  cipoAdotado: "Banisteriopsis caapi var. Tucunaca (Caule liso e cilíndrico, 92,3% polimorfismo genético)",
  folhaAdotada: "Psychotria viridis (Chacrona Rainha colhida ao amanhecer com rezo feminino)",
  pedidoMinimoLitros: 5,
  antecedenciaMinimaDias: 30,
  destinacaoExclusiva: "Pessoas Jurídicas religiosas constituídas (Ata de Fundação e CNPJ)",
  perfilHarmalasTucunaca: {
    harmina: "9,21 mg/g (Inibição reversível seletiva da MAO-A periférica - RIMA)",
    thh: "4,20 mg/g (Tetra-hidroharmina: inibidor fraco de recaptação de serotonina, estabiliza visões)",
    harmalina: "0,65 mg/g (Teor residual ínfimo: previne tremores motores periféricos e náuseas somáticas)",
  },
};

export const GRADUACOES_SACRAMENTAIS: GraduacaoSacramento[] = [
  {
    id: "3.1_MAINUMBI",
    codigo: "3.1",
    nomeSagrado: "Mainumbi",
    arquetipo: "Beija-flor / Voo Suave e Manso",
    proporcaoBiomassa: "3 kg de biomassa vegetal por litro",
    porcaoSugerida: "90 a 120 ml",
    duracaoEstimada: "2 a 3 horas",
    perfilLiturgico: "Límpido, sutil e acolhedor. Proporciona expansão mansa da presença e serenidade sensorial.",
    indicacaoRito: "Ideal para iniciantes, círculos de oração tranquilos, vigílias mansas e ritos de acalento.",
    rateioAtacado5a10L: "R$ 220,00 / Litro",
    rateioAtacado10a20L: "R$ 200,00 / Litro",
    perfilFitoquimico: "Rico em THH e Harmina equilibradas, voo leve sem desgaste somático.",
    destaque: false,
  },
  {
    id: "5.1_PITUA",
    codigo: "5.1",
    nomeSagrado: "Pituã",
    arquetipo: "Bem-te-vi / Equilíbrio e Firmeza",
    proporcaoBiomassa: "5 kg de biomassa vegetal por litro",
    porcaoSugerida: "70 a 100 ml",
    duracaoEstimada: "3 horas",
    perfilLiturgico: "Harmonia estável entre força do cipó e luz da folha. Miração equilibrada e alinhamento do ritmo.",
    indicacaoRito: "Padrão recomendado para rituais regulares da congregação e trabalhos coletivos de reequilíbrio vital.",
    rateioAtacado5a10L: "R$ 260,00 / Litro",
    rateioAtacado10a20L: "R$ 240,00 / Litro",
    perfilFitoquimico: "Concentração intermediária estável, clareza mental prolongada.",
    destaque: true,
  },
  {
    id: "7.1_ANHANGATA",
    codigo: "7.1",
    nomeSagrado: "Anhangatã",
    arquetipo: "Rouxinol / Canto Profundo e Transformação",
    proporcaoBiomassa: "7 kg de biomassa vegetal por litro",
    porcaoSugerida: "50 a 90 ml",
    duracaoEstimada: "3 a 4 horas",
    perfilLiturgico: "Densidade firme e expansão de presença prolongada. Condução ritualística com cantos e introspecção íntima.",
    indicacaoRito: "Indicado para congregações experientes, vigílias noturnas e trabalhos de transformação pessoal profunda.",
    rateioAtacado5a10L: "R$ 320,00 / Litro",
    rateioAtacado10a20L: "R$ 300,00 / Litro",
    perfilFitoquimico: "Alta densidade alcaloídica com retenção terpênica integral.",
    destaque: false,
  },
  {
    id: "10.1_WIRAPURU",
    codigo: "10.1",
    nomeSagrado: "Wirapuru",
    arquetipo: "Uirapuru / Condução de Alta Força (Semi-Mel)",
    proporcaoBiomassa: "10 kg de biomassa vegetal por litro",
    porcaoSugerida: "30 a 50 ml",
    duracaoEstimada: "4 a 5 horas",
    perfilLiturgico: "Consistência densa, altíssima concentração fitoquímica e presença solene. Conexão espiritual profunda.",
    indicacaoRito: "Exclusivo para dirigentes litúrgicos, mestres de cerimônia e trabalhos de alta egrégora espiritual.",
    rateioAtacado5a10L: "R$ 380,00 / Litro",
    rateioAtacado10a20L: "R$ 360,00 / Litro",
    perfilFitoquimico: "Graduação institucional suprema (Semi-Mel). Máxima extração de THH e Harmina nativas.",
    destaque: false,
  },
  {
    id: "SACRAMENTO_MEL",
    codigo: "MEL",
    nomeSagrado: "Sacramento Mel",
    arquetipo: "Redução Pura / Alta Densidade Logística (12 a 15:1)",
    proporcaoBiomassa: "Concentração máxima por evaporação lenta",
    porcaoSugerida: "15 a 30 ml (ou diluição litúrgica proporcional)",
    duracaoEstimada: "4 a 5 horas",
    perfilLiturgico: "Consistência de mel nobre, ideal para preservação por longos períodos e redução do volume de transporte.",
    indicacaoRito: "Casas em regiões remotas que necessitam de estabilidade prolongada. Rateio operacional sob consulta.",
    rateioAtacado5a10L: "R$ 460,00 / Litro",
    rateioAtacado10a20L: "R$ 420,00 / Litro",
    destaque: false,
  },
  {
    id: "SACRAMENTO_GEL",
    codigo: "GEL",
    nomeSagrado: "Sacramento Gel",
    arquetipo: "Alquimia Ancestral Extrema (20:1 para reidratação)",
    proporcaoBiomassa: "Decocção tradicional purista de densidade extrema",
    porcaoSugerida: "Porção personalizada por dirigente",
    duracaoEstimada: "4 a 6 horas",
    perfilLiturgico: "Grau supremo de pureza sem aditivos químicos, retendo o perfil terpênico e alcaloídico original intacto.",
    indicacaoRito: "Rituais de alta solenidade e conservação litúrgica avançada. Rateio operacional sob consulta.",
    rateioAtacado5a10L: "R$ 1.250,00 / kg",
    rateioAtacado10a20L: "R$ 1.100,00 / kg",
    destaque: false,
  },
];

export function getGraduacaoPorId(id: string): GraduacaoSacramento | undefined {
  return GRADUACOES_SACRAMENTAIS.find((g) => g.id === id);
}

/**
 * Tabela Evolutiva Canônica de Rateio por Volume
 * Modelo de cooperativismo de rateio operacional sem fins lucrativos (Lei 5.764/71 e CONAD 01/2010).
 */
export interface ItemTabelaEvolutiva {
  graduacaoId: string;
  codigo: string;
  nome: string;
  unidade: "Litro" | "Quilo (kg)";
  valor5a10L: number;
  valor10a20L: number;
  valorAcima20L: string;
  economiaPorUnidade: number;
  proporcaoBiomassa: string;
  observacao: string;
}

export const TABELA_EVOLUTIVA_RATEIO: ItemTabelaEvolutiva[] = [
  {
    graduacaoId: "3.1_MAINUMBI",
    codigo: "3.1",
    nome: "Mainumbi",
    unidade: "Litro",
    valor5a10L: 220,
    valor10a20L: 200,
    valorAcima20L: "A combinar",
    economiaPorUnidade: 20,
    proporcaoBiomassa: "3 kg/L",
    observacao: "Voo suave e manso",
  },
  {
    graduacaoId: "5.1_PITUA",
    codigo: "5.1",
    nome: "Pituã",
    unidade: "Litro",
    valor5a10L: 260,
    valor10a20L: 240,
    valorAcima20L: "A combinar",
    economiaPorUnidade: 20,
    proporcaoBiomassa: "5 kg/L",
    observacao: "Padrão canônico de equilíbrio",
  },
  {
    graduacaoId: "7.1_ANHANGATA",
    codigo: "7.1",
    nome: "Anhangatã",
    unidade: "Litro",
    valor5a10L: 320,
    valor10a20L: 300,
    valorAcima20L: "A combinar",
    economiaPorUnidade: 20,
    proporcaoBiomassa: "7 kg/L",
    observacao: "Densidade firme e força elevada",
  },
  {
    graduacaoId: "10.1_WIRAPURU",
    codigo: "10.1",
    nome: "Wirapuru (Semi-Mel)",
    unidade: "Litro",
    valor5a10L: 380,
    valor10a20L: 360,
    valorAcima20L: "A combinar",
    economiaPorUnidade: 20,
    proporcaoBiomassa: "10 kg/L",
    observacao: "Alta concentração hiperosmótica",
  },
  {
    graduacaoId: "SACRAMENTO_MEL",
    codigo: "12 a 15x1",
    nome: "Sacramento Mel",
    unidade: "Litro",
    valor5a10L: 460,
    valor10a20L: 420,
    valorAcima20L: "A combinar",
    economiaPorUnidade: 40,
    proporcaoBiomassa: "Redução lenta 12-15x1",
    observacao: "Redução nobre para preservação e frete",
  },
  {
    graduacaoId: "SACRAMENTO_GEL",
    codigo: "20.1",
    nome: "Sacramento Gel",
    unidade: "Quilo (kg)",
    valor5a10L: 1250,
    valor10a20L: 1100,
    valorAcima20L: "A combinar",
    economiaPorUnidade: 150,
    proporcaoBiomassa: "Pasta/Gel purista 20:1",
    observacao: "Alta densidade para reidratação",
  },
];

export const CONDICOES_RATEIO_COOPERATIVO = {
  experienciaFeitio: "Feitio artesanal e manual em Cruzeiro do Sul/AC com mais de 28 anos de tradição",
  binomioSagrado: "100% Cipó Tucunacá e Folha Chacrona Rainha colhida com rezo ao amanhecer",
  pedidoMinimoLitros: 5,
  graduacaoSugeridaPadrao: "10x1 Semi-Mel",
  antecedenciaMinimaDias: 30,
  pagamentoVista: "Valores para contribuições à vista",
  parcelamento: "Parcelamento disponível com acréscimo exclusivo das taxas da operadora de cartão",
  faixaAcima20L: "Valores a combinar com o Conselho Gestor, condicionados ao custo de matéria-prima e encargos operacionais do feitio na floresta.",
  missaoCooperativa: "Cooperativa sem fins lucrativos dedicada à salvaguarda do sacramento e viabilização solidária para congregações, apoiando projetos comunitários de acolhimento social e reequilíbrio vital.",
};

export interface ResultadoCalculoCota {
  faixa: "abaixoMinimo" | "5a10L" | "10a20L" | "acima20L";
  faixaLabel: string;
  valorUnitario: number;
  valorTotal: number;
  economiaTotal: number;
  aCombinar: boolean;
  unidade: string;
}

/**
 * Calcula a cota unitária e total de rateio para uma determinada graduação e quantidade
 */
export function obterCotaRateio(graduacaoIdOuCodigo: string, quantidade: number): ResultadoCalculoCota {
  const item = TABELA_EVOLUTIVA_RATEIO.find(
    (t) =>
      t.graduacaoId === graduacaoIdOuCodigo ||
      t.codigo === graduacaoIdOuCodigo ||
      t.graduacaoId.startsWith(graduacaoIdOuCodigo)
  ) || TABELA_EVOLUTIVA_RATEIO[1]; // Pituã como fallback padrão

  const unidade = item.unidade;

  if (quantidade > 20) {
    return {
      faixa: "acima20L",
      faixaLabel: "Acima de 20 Litros/kg (A combinar)",
      valorUnitario: item.valor10a20L,
      valorTotal: quantidade * item.valor10a20L,
      economiaTotal: quantidade * item.economiaPorUnidade,
      aCombinar: true,
      unidade,
    };
  }

  if (quantidade >= 10) {
    return {
      faixa: "10a20L",
      faixaLabel: "Escala Solidária de 10 a 20 Litros/kg",
      valorUnitario: item.valor10a20L,
      valorTotal: quantidade * item.valor10a20L,
      economiaTotal: quantidade * item.economiaPorUnidade,
      aCombinar: false,
      unidade,
    };
  }

  if (quantidade >= 5) {
    return {
      faixa: "5a10L",
      faixaLabel: "Lote de 5 a 10 Litros/kg",
      valorUnitario: item.valor5a10L,
      valorTotal: quantidade * item.valor5a10L,
      economiaTotal: 0,
      aCombinar: false,
      unidade,
    };
  }

  // Abaixo de 5 Litros (alerta de mínimo)
  return {
    faixa: "abaixoMinimo",
    faixaLabel: "Abaixo do Pedido Mínimo (Base 5 a 10L)",
    valorUnitario: item.valor5a10L,
    valorTotal: quantidade * item.valor5a10L,
    economiaTotal: 0,
    aCombinar: false,
    unidade,
  };
}

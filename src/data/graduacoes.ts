/**
 * Catálogo Oficial de Graduações Sagradas — Nativaram Brasil
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
    rateioAtacado5a10L: "Disponibilizado após credenciamento institucional",
    rateioAtacado10a20L: "Disponibilizado após credenciamento institucional",
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
    rateioAtacado5a10L: "Disponibilizado após credenciamento institucional",
    rateioAtacado10a20L: "Disponibilizado após credenciamento institucional",
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
    rateioAtacado5a10L: "Disponibilizado após credenciamento institucional",
    rateioAtacado10a20L: "Disponibilizado após credenciamento institucional",
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
    rateioAtacado5a10L: "Disponibilizado após credenciamento institucional",
    rateioAtacado10a20L: "Disponibilizado após credenciamento institucional",
    perfilFitoquimico: "Graduação institucional suprema (Semi-Mel). Máxima extração de THH e Harmina nativas.",
    destaque: false,
  },
  {
    id: "SACRAMENTO_MEL",
    codigo: "MEL",
    nomeSagrado: "Sacramento Mel",
    arquetipo: "Redução Pura / Alta Densidade Logística",
    proporcaoBiomassa: "Concentração máxima por evaporação lenta",
    porcaoSugerida: "15 a 30 ml (ou diluição litúrgica proporcional)",
    duracaoEstimada: "4 a 5 horas",
    perfilLiturgico: "Consistência de mel nobre, ideal para preservação por longos períodos e redução do volume de transporte.",
    indicacaoRito: "Casas em regiões remotas que necessitam de estabilidade prolongada. Rateio operacional sob consulta.",
    rateioAtacado5a10L: "Sob consulta prévia institucional",
    rateioAtacado10a20L: "Sob consulta prévia institucional",
    destaque: false,
  },
  {
    id: "SACRAMENTO_GEL",
    codigo: "GEL",
    nomeSagrado: "Sacramento Gel",
    arquetipo: "Alquimia Ancestral Extrema",
    proporcaoBiomassa: "Decocção tradicional purista de densidade extrema",
    porcaoSugerida: "Porção personalizada por dirigente",
    duracaoEstimada: "4 a 6 horas",
    perfilLiturgico: "Grau supremo de pureza sem aditivos químicos, retendo o perfil terpênico e alcaloídico original intacto.",
    indicacaoRito: "Rituais de alta solenidade e conservação litúrgica avançada. Rateio operacional sob consulta.",
    rateioAtacado5a10L: "Sob consulta prévia institucional",
    rateioAtacado10a20L: "Sob consulta prévia institucional",
    destaque: false,
  },
];

export function getGraduacaoPorId(id: string): GraduacaoSacramento | undefined {
  return GRADUACOES_SACRAMENTAIS.find((g) => g.id === id);
}

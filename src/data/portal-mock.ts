/**
 * Mock Data — Portal do Dirigente
 * Dados de demonstração para templos, lotes e logística.
 * Extraídos de PortalDirigenteClient.tsx para separação de responsabilidades.
 */

export interface TemploMock {
  id: string;
  nome: string;
  cidade: string;
  dirigente: string;
  cnpj: string;
  status: string;
  graduacao: string;
  volume: string;
  dataAprovacao: string;
  membros: number;
  conadAprovado: boolean;
}

export interface LoteFeitioMock {
  lote: string;
  tipo: string;
  volume: string;
  status: string;
  feitor: string;
  origem: string;
  laudo: string;
  microbiologico: string;
}

export interface EnvioLogisticaMock {
  codigo: string;
  templo: string;
  lote: string;
  item: string;
  tipoEmbalagem: string;
  status: string;
  previsao: string;
  rastreio: string;
}

// Mock data de congregações cadastradas
export const templosIniciais: TemploMock[] = [
  {
    id: "NAT-TEMPLO-842",
    nome: "Templo Céu do Cruzeiro",
    cidade: "São Paulo / SP",
    dirigente: "Padrinho Marcos Silva",
    cnpj: "34.567.890/0001-12",
    status: "HOMOLOGADO",
    graduacao: "10.1 Wirapuru (Semi-Mel)",
    volume: "10 Litros",
    dataAprovacao: "14/05/2025",
    membros: 45,
    conadAprovado: true,
  },
  {
    id: "NAT-TEMPLO-913",
    nome: "Fraternidade Rainha da Floresta",
    cidade: "Belo Horizonte / MG",
    dirigente: "Madrinha Helena Costa",
    cnpj: "45.678.901/0001-23",
    status: "EM_ANALISE",
    graduacao: "Alquimia Sagrada Mel",
    volume: "5 kg",
    dataAprovacao: "Pendente",
    membros: 60,
    conadAprovado: true,
  },
  {
    id: "NAT-TEMPLO-955",
    nome: "Centro Espiritual Aliança de Luz",
    cidade: "Curitiba / PR",
    dirigente: "Dirigente Carlos Mendes",
    cnpj: "56.789.012/0001-34",
    status: "TRIAGEM_LITURGICA",
    graduacao: "5.1 Pituã (Bem-te-vi)",
    volume: "15 Litros",
    dataAprovacao: "Pendente",
    membros: 30,
    conadAprovado: false,
  },
  {
    id: "NAT-TEMPLO-982",
    nome: "Templo Caminho Solar",
    cidade: "Brasília / DF",
    dirigente: "Dirigente Ana Terra",
    cnpj: "67.890.123/0001-45",
    status: "HOMOLOGADO",
    graduacao: "7.1 Anhangatã (Rouxinol)",
    volume: "20 Litros",
    dataAprovacao: "02/02/2026",
    membros: 80,
    conadAprovado: true,
  },
];

// Mock data de lotes de feitio no Acre
export const lotesFeitio: LoteFeitioMock[] = [
  {
    lote: "AC-2026-08",
    tipo: "10.1 Wirapuru (Semi-Mel)",
    volume: "120 Litros",
    status: "CONCLUIDO_LACRADO",
    feitor: "Mestre Caboclo (28 anos de dieta)",
    origem: "Cruzeiro do Sul, Acre",
    laudo: "Conforme (Harmina: 9,21 | THH: 4,20)",
    microbiologico: "Aprovado (Zero Coli)",
  },
  {
    lote: "AC-2026-09",
    tipo: "Alquimia Sagrada Mel (Alta Redução)",
    volume: "45 kg",
    status: "EM_REDUCAO_LENTA",
    feitor: "Mestre Caboclo",
    origem: "Cruzeiro do Sul, Acre",
    laudo: "Em análise refratométrica",
    microbiologico: "Em análise",
  },
  {
    lote: "AC-2026-10",
    tipo: "7.1 Anhangatã (Rouxinol)",
    volume: "80 Litros",
    status: "COLHEITA_CHACRONA",
    feitor: "Família Tradicional Feitora",
    origem: "Cruzeiro do Sul, Acre",
    laudo: "Agendado",
    microbiologico: "Pendente",
  },
  {
    lote: "AC-2026-11",
    tipo: "Alquimia Sagrada Gel (Densidade Máxima)",
    volume: "20 kg",
    status: "PLANEJADO",
    feitor: "Mestre Caboclo",
    origem: "Cruzeiro do Sul, Acre",
    laudo: "Programado",
    microbiologico: "Programado",
  },
];

// Mock data de envios e logística
export const enviosLogistica: EnvioLogisticaMock[] = [
  {
    codigo: "ENV-2026-441",
    templo: "Templo Céu do Cruzeiro (São Paulo/SP)",
    lote: "Lote #AC-2026-08",
    item: "10.1 Wirapuru — 10 Litros",
    tipoEmbalagem: "Caixa Isotérmica Lacrada #08-A",
    status: "EM_TRANSITO_REFRIGERADO",
    previsao: "Chegada em 48h",
    rastreio: "NTV-SP-842-BR",
  },
  {
    codigo: "ENV-2026-442",
    templo: "Fraternidade Rainha da Floresta (Belo Horizonte/MG)",
    lote: "Lote #AC-2026-09",
    item: "Alquimia Sagrada Mel — 5 kg",
    tipoEmbalagem: "Acondicionamento Especial Hermético",
    status: "AGUARDANDO_DESPACHO",
    previsao: "Em preparação no entreposto Serra/ES",
    rastreio: "NTV-MG-913-BR",
  },
  {
    codigo: "ENV-2026-439",
    templo: "Templo Caminho Solar (Brasília/DF)",
    lote: "Lote #AC-2026-07",
    item: "7.1 Anhangatã — 20 Litros",
    tipoEmbalagem: "Caixa Isotérmica Selada #07-D",
    status: "ENTREGUE_CONSAGRADO",
    previsao: "Concluído",
    rastreio: "NTV-DF-982-BR",
  },
];

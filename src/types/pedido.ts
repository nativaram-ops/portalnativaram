/**
 * Definições de Tipos — Solicitações de Partilha Litúrgica & Cadeia de Custódia
 * Portal do Dirigente — Cooperativa Etnobotânica Nativaram Brasil
 *
 * Em estrita observância à Resolução CONAD nº 01/2010 e ao Dicionário de Linguagem do AGENTS.md.
 */

export type StatusPedido =
  | "SOLICITADO"
  | "HOMOLOGADO_CONSELHO"
  | "EM_FEITIO_ACRE"
  | "AGUARDANDO_DESPACHO"
  | "EM_TRANSITO_REFRIGERADO"
  | "ENTREGUE_CONSAGRADO"
  | "CANCELADO_AJUSTE";

export interface ItemPedido {
  id: string;
  tipo: "GRADUACAO_AYAHUASCA" | "RAPE_SAGRADO" | "ARTEFATO_SAGRADO";
  nome: string;
  codigoOuSubtitulo: string;
  quantidade: number;
  unidade: "Litros" | "Frascos (20g)" | "Unidades" | "kg";
  rateioUnitarioEstimado: number;
  rateioTotalEstimado: number;
}

export interface HistoricoStatus {
  status: StatusPedido;
  dataHora: string;
  observacao: string;
  responsavel: string;
}

export interface PedidoLiturgico {
  id: string; // Ex: SOL-2026-X8P4
  temploId: string; // Ex: NAT-TEMPLO-842
  temploNome: string;
  cidade: string;
  estado: string;
  dirigenteNome: string;
  dirigenteTelefone: string;
  dirigenteEmail: string;
  cnpj: string;
  itens: ItemPedido[];
  rateioTotal: number;
  dataCerimoniaPretendida: string;
  mensagemIntencao: string;
  status: StatusPedido;
  loteVinculado?: string;
  codigoRastreio?: string;
  previsaoEntrega?: string;
  observacoesInternas?: string;
  historico: HistoricoStatus[];
  criadoEm: string;
  atualizadoEm: string;
}

export interface NovoPedidoInput {
  temploId: string;
  temploNome: string;
  cidade: string;
  estado: string;
  dirigenteNome: string;
  dirigenteTelefone: string;
  dirigenteEmail: string;
  cnpj: string;
  itens: Omit<ItemPedido, "rateioTotalEstimado">[];
  dataCerimoniaPretendida: string;
  mensagemIntencao: string;
}

export interface AtualizarPedidoInput {
  status?: StatusPedido;
  loteVinculado?: string;
  codigoRastreio?: string;
  previsaoEntrega?: string;
  observacoesInternas?: string;
  observacaoHistorico?: string;
  responsavel?: string;
}

export interface MetricasPedidos {
  totalSolicitacoes: number;
  solicitacoesPendentes: number;
  emFeitioNoAcre: number;
  emTransitoRefrigerado: number;
  entreguesConsagrados: number;
  litrosTotaisProgramados: number;
}

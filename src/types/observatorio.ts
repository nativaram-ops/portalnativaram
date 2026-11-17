export type EixoTematicoObservatorio =
  | "ayahuasca"
  | "etnobotanica_jurua"
  | "seguranca_imao"
  | "direito_conad"
  | "agrofloresta";

export interface EixoObservatorioInfo {
  id: EixoTematicoObservatorio;
  rotulo: string;
  descricaoCurta: string;
  queryPadrao: string;
}

export interface ArtigoAcademicoExterno {
  doi: string;
  titulo: string;
  autores: string;
  ano: string;
  periodico: string;
  resumo: string;
  urlOrigem: string;
  pdfAbertoUrl?: string;
  acessoAberto: boolean;
  fonteApi: "EUROPE_PMC" | "CROSSREF" | "OPENALEX";
}

export interface AnexoEstudoPublicado {
  id: string;
  doi: string;
  titulo: string;
  autores: string;
  ano: string;
  periodico: string;
  urlOrigem: string;
  pdfAbertoUrl?: string;
  eixoTematico: EixoTematicoObservatorio;
  paisOrigem?: string;
  sinteseLinguagemClara: string;
  notaDirigente?: string;
  statusRevisao: "REVISAO_EXTERNA_PARES";
  adicionadoPorCodigo: string;
  adicionadoPorNome: string;
  criadoEm: string;
}

export interface ResultadoBuscaAcademica {
  consulta: string;
  totalEncontrado: number;
  artigos: ArtigoAcademicoExterno[];
  fontesConsultadas: string[];
  emCache: boolean;
}

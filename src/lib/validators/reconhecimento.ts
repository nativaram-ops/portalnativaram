import { z } from "zod";

export const ReconhecimentoSchema = z.object({
  // 1. Identidade e Perfil Litúrgico
  tipoVinculo: z.enum(
    [
      "GRUPO_EM_FORMACAO",
      "REZADOR_AUTONOMO",
      "CIRCULO_ESTUDOS",
      "COMUNIDADE_TRADICIONAL",
    ],
    {
      errorMap: () => ({
        message: "Selecione como seu núcleo ou prática espiritual se caracteriza.",
      }),
    }
  ),
  nomeIdentificacao: z
    .string()
    .min(3, {
      message: "Informe o nome do grupo, ponto de oração ou denominação do rezo (mínimo 3 letras).",
    }),
  linhagemEspiritual: z
    .string()
    .min(3, {
      message: "Descreva a linhagem espiritual de estudo (ex: Xamanismo, Santo Daime, Barquinha, Linha Nativa, Estudos Livres).",
    }),
  tempoJornada: z
    .string()
    .min(2, {
      message: "Informe há quanto tempo caminha com o sacramento vegetal.",
    }),

  // 2. Parâmetros Litúrgicos e Partilha
  quantidadeParticipantes: z
    .string()
    .min(1, {
      message: "Informe a média de participantes ou pessoas comungantes nos trabalhos.",
    }),
  frequenciaEncontros: z.enum(
    ["SEMANAL", "QUINZENAL", "MENSAL", "BIMESTRAL", "EVENTUAL"],
    {
      errorMap: () => ({
        message: "Selecione a periodicidade aproximada dos encontros.",
      }),
    }
  ),
  graduacaoPretendida: z.enum(
    [
      "3.1_MAINUMBI",
      "5.1_PITUA",
      "7.1_ANHANGATA",
      "10.1_WIRAPURU",
      "SACRAMENTO_MEL",
      "SACRAMENTO_GEL",
      "OUTRAS_GRADUACOES_COMBINAR",
    ],
    {
      errorMap: () => ({
        message: "Selecione a graduação pretendida para a partilha litúrgica.",
      }),
    }
  ),
  litragemEstimadaMensal: z
    .string()
    .min(1, {
      message: "Informe a litragem mensal aproximada (sugestão inicial de rateio cooperativo: a partir de 5 litros).",
    }),
  intencaoTrabalho: z
    .string()
    .min(15, {
      message: "Compartilhe suscintamente a intenção dos trabalhos e o momento atual do grupo.",
    }),
  duvidasOuNecessidades: z.string().optional(),

  // 3. Guardião Responsável e Contato Fraterno
  nomeResponsavel: z
    .string()
    .min(3, {
      message: "Nome completo do guardião ou condutor responsável pelos trabalhos.",
    }),
  telefoneContato: z
    .string()
    .min(10, {
      message: "Telefone com DDD ou WhatsApp ativo para contato do Conselho.",
    }),
  emailContato: z
    .string()
    .email({
      message: "E-mail válido para envio de informativos litúrgicos e orientações.",
    }),
  cidade: z
    .string()
    .min(2, {
      message: "Cidade onde os trabalhos e orações são realizados.",
    }),
  estado: z
    .string()
    .length(2, {
      message: "Sigla do Estado (UF) com 2 letras (ex: SP, RJ, MG, AC, ES).",
    }),
  metodoContatoPreferencial: z.enum(["WHATSAPP", "TELEFONE", "EMAIL"], {
    errorMap: () => ({
      message: "Selecione o canal de retorno preferencial.",
    }),
  }),

  // 4. Compromissos de Sacralidade & Responsabilidade
  concordaUsoLiturgico: z.literal(true, {
    errorMap: () => ({
      message:
        "O condutor deve firmar o compromisso de uso estritamente espiritual, sem comércio nem mercantilização (CONAD 01/2010).",
    }),
  }),
  planejamentoAntecedencia30Dias: z.literal(true, {
    errorMap: () => ({
      message:
        "O grupo deve estar ciente da antecedência necessária de 30 dias para preparo no Acre e transporte aéreo.",
    }),
  }),
  compromissoTriagemSeguranca: z.literal(true, {
    errorMap: () => ({
      message:
        "O responsável deve zelar pela triagem de segurança dos participantes (atenção a interações e ambiente protegido).",
    }),
  }),
});

export type ReconhecimentoInput = z.infer<typeof ReconhecimentoSchema>;

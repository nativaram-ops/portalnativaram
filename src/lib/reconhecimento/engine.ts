import { ReconhecimentoInput } from "../validators/reconhecimento";
import { getGraduacaoPorId } from "../../data/graduacoes";

export interface ReconhecimentoDossier {
  protocolo: string;
  dataSubmissao: string;
  data: ReconhecimentoInput;
  graduacaoInfo?: ReturnType<typeof getGraduacaoPorId>;
}

/**
 * Gera protocolo institucional de acolhimento fraterno
 * Exemplo: REC-2026-M4P9
 */
export function generateProtocoloReconhecimento(): string {
  const year = new Date().getFullYear();
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `REC-${year}-${randomSuffix}`;
}

const TIPO_VINCULO_LABEL: Record<string, string> = {
  GRUPO_EM_FORMACAO: "Núcleo / Grupo Litúrgico em Formação",
  REZADOR_AUTONOMO: "Rezador Tradicional / Condutor Autônomo",
  CIRCULO_ESTUDOS: "Círculo de Estudos & Orações",
  COMUNIDADE_TRADICIONAL: "Comunidade Tradicional / Círculo Familiar",
};

/**
 * Formata o dossiê de reconhecimento para envio direto ao Conselho da Cooperativa via WhatsApp
 */
export function formatReconhecimentoWhatsApp(
  dossier: ReconhecimentoDossier
): string {
  const { protocolo, data } = dossier;
  const graduacao = getGraduacaoPorId(data.graduacaoPretendida);
  const nomeGraduacao = graduacao
    ? `${graduacao.codigo} ${graduacao.nomeSagrado}`
    : data.graduacaoPretendida;
  const tipoLabel = TIPO_VINCULO_LABEL[data.tipoVinculo] || data.tipoVinculo;

  const msg = [
    `*COOPERATIVA NATIVARAM — FICHA DE ACOLHIMENTO LITÚRGICO*`,
    `🌿 *Protocolo Fraterno:* \`${protocolo}\``,
    `📅 *Data de Submissão:* ${dossier.dataSubmissao}`,
    ``,
    `🪶 *PERFIL & CAMINHADA ESPIRITUAL:*`,
    `• *Caracterização:* ${tipoLabel}`,
    `• *Identificação do Grupo/Rezo:* ${data.nomeIdentificacao}`,
    `• *Linhagem / Tradição:* ${data.linhagemEspiritual}`,
    `• *Tempo de Caminhada:* ${data.tempoJornada}`,
    ``,
    `👤 *GUARDIÃO RESPONSÁVEL:*`,
    `• *Nome:* ${data.nomeResponsavel}`,
    `• *Contato / WhatsApp:* ${data.telefoneContato}`,
    `• *E-mail:* ${data.emailContato}`,
    `• *Localidade:* ${data.cidade}/${data.estado}`,
    `• *Canal Preferencial:* ${data.metodoContatoPreferencial}`,
    ``,
    `✨ *PARÂMETROS DA PARTILHA LITÚRGICA:*`,
    `• *Participantes Estimados:* ${data.quantidadeParticipantes} pessoas`,
    `• *Periodicidade:* ${data.frequenciaEncontros}`,
    `• *Graduação Pretendida:* ${nomeGraduacao}`,
    `• *Estimativa de Partilha:* ~${data.litragemEstimadaMensal} litros/mês`,
    `• *Intenção dos Trabalhos:* "${data.intencaoTrabalho}"`,
  ];

  if (data.duvidasOuNecessidades && data.duvidasOuNecessidades.trim().length > 0) {
    msg.push(`• *Dúvidas ou Assessoria:* "${data.duvidasOuNecessidades.trim()}"`);
  }

  msg.push(
    ``,
    `⚖️ *COMPROMISSOS DE SACRALIDADE & SEGURANÇA:*`,
    ` [x] Uso estritamente espiritual e litúrgico (CONAD nº 01/2010)`,
    ` [x] Compromisso contra qualquer comércio ou mercantilização`,
    ` [x] Consciência de antecedência mínima (30 dias para feitio no Acre)`,
    ` [x] Zeladoria pela triagem de segurança dos participantes`,
    ``,
    `_Acolhimento de núcleo em desenvolvimento submetido para apreciação e diálogo fraterno com o Conselho Gestor da Cooperativa Nativaram._`
  );

  return encodeURIComponent(msg.join("\n"));
}

/**
 * Retorna campos obrigatórios por etapa para navegação controlada do formulário
 */
export const STAGE_FIELDS_RECONHECIMENTO: Record<number, (keyof ReconhecimentoInput)[]> = {
  1: ["tipoVinculo", "nomeIdentificacao", "linhagemEspiritual", "tempoJornada"],
  2: [
    "quantidadeParticipantes",
    "frequenciaEncontros",
    "graduacaoPretendida",
    "litragemEstimadaMensal",
    "intencaoTrabalho",
  ],
  3: [
    "nomeResponsavel",
    "telefoneContato",
    "emailContato",
    "cidade",
    "estado",
    "metodoContatoPreferencial",
    "concordaUsoLiturgico",
    "planejamentoAntecedencia30Dias",
    "compromissoTriagemSeguranca",
  ],
};

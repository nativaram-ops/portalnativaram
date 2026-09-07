import { CredenciamentoInput } from "@/lib/validators/credenciamento";
import { getGraduacaoPorId } from "@/data/graduacoes";

export interface CredenciamentoDossier {
  protocolo: string;
  dataSubmissao: string;
  data: CredenciamentoInput;
  graduacaoInfo?: ReturnType<typeof getGraduacaoPorId>;
}

/**
 * Gera protocolo institucional de credenciamento
 * Exemplo: NAT-2026-A8K9
 */
export function generateProtocoloLiturgico(): string {
  const year = new Date().getFullYear();
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `NAT-${year}-${randomSuffix}`;
}

/**
 * Formata o dossiê institucional para envio direto ao Conselho Guardião via WhatsApp
 */
export function formatDossierForWhatsApp(
  dossier: CredenciamentoDossier
): string {
  const { protocolo, data } = dossier;
  const graduacao = getGraduacaoPorId(data.graduacaoPretendida);
  const nomeGraduacao = graduacao ? `${graduacao.codigo} ${graduacao.nomeSagrado}` : data.graduacaoPretendida;

  const msg = [
    `*NATIVARAM BRASIL — PROTOCOLO DE CREDENCIAMENTO LITÚRGICO*`,
    `📜 *Protocolo Oficial:* \`${protocolo}\``,
    `📅 *Data de Submissão:* ${dossier.dataSubmissao}`,
    ``,
    `🏛️ *DADOS DA INSTITUIÇÃO:*`,
    `• *Entidade:* ${data.nomeInstituicao}`,
    `• *CNPJ:* ${data.cnpj}`,
    `• *Data Fundação:* ${data.dataFundacao}`,
    `• *Sede Litúrgica:* ${data.enderecoTemplo}, ${data.cidade}/${data.estado}`,
    ``,
    `👤 *DIRIGENTE LITÚRGICO:*`,
    `• *Nome:* ${data.nomeDirigente}`,
    `• *CPF:* ${data.cpfDirigente}`,
    `• *Tempo de Linhagem:* ${data.tempoLinhagemAnos} ano(s)`,
    `• *Contato:* ${data.telefoneContato}`,
    `• *E-mail:* ${data.emailOficial}`,
    ``,
    `🌿 *PARÂMETROS DA CONGREGAÇÃO:*`,
    `• *Membros Ativos:* ~${data.numeroMembrosAtivos} comungantes`,
    `• *Periodicidade:* ${data.frequenciaRituais}`,
    `• *Graduação Solicitada:* ${nomeGraduacao}`,
    `• *Propósito Litúrgico:* "${data.intencaoTrabalho}"`,
    ``,
    `⚖️ *CONFORMIDADE REGULATÓRIA E SEGURANÇA:*`,
    ` [x] Anuência à Resolução CONAD nº 01/2010`,
    ` [x] Declaração de Ausência de Fins Lucrativos`,
    ` [x] Compromisso de Antecedência Mínima (30 dias)`,
    ` [x] Protocolo de Triagem e Washout ISRS (5 semanas)`,
    ``,
    `_Aguardamos o contato do Conselho Guardião para agendamento da chamada de alinhamento litúrgico e envio da ata constitutiva._`,
  ];

  return encodeURIComponent(msg.join("\n"));
}

/**
 * Retorna campos obrigatórios por etapa para navegação controlada do formulário
 */
export const STAGE_FIELDS: Record<number, (keyof CredenciamentoInput)[]> = {
  1: ["nomeInstituicao", "cnpj", "dataFundacao", "enderecoTemplo", "cidade", "estado"],
  2: ["nomeDirigente", "cpfDirigente", "tempoLinhagemAnos", "telefoneContato", "emailOficial"],
  3: ["numeroMembrosAtivos", "frequenciaRituais", "graduacaoPretendida", "intencaoTrabalho"],
  4: ["concordaComConad012010", "declaraAusenciaFinsLucrativos", "planejamento30Dias", "termoSegurancaIntegrativa"],
};

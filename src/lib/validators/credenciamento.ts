import { z } from "zod";

export const CredenciamentoSchema = z.object({
  // Dados da Instituição / Templo Religioso
  nomeInstituicao: z
    .string()
    .min(3, { message: "O nome da instituição/templo deve conter ao menos 3 caracteres." }),
  cnpj: z
    .string()
    .min(14, { message: "CNPJ da entidade religiosa ou associativa é obrigatório." }),
  dataFundacao: z
    .string()
    .min(4, { message: "Data de fundação ou ata de constituição é necessária." }),
  enderecoTemplo: z
    .string()
    .min(5, { message: "Endereço litúrgico completo do templo ou ponto de oração." }),
  cidade: z.string().min(2, { message: "Cidade da sede litúrgica." }),
  estado: z.string().length(2, { message: "Sigla do Estado (UF) em 2 letras (ex: SP, RJ, ES, AC)." }),

  // Dirigente Litúrgico Responsável
  nomeDirigente: z
    .string()
    .min(3, { message: "Nome completo do dirigente ou padrinho responsável pelos trabalhos." }),
  cpfDirigente: z
    .string()
    .min(11, { message: "CPF do dirigente responsável." }),
  tempoLinhagemAnos: z
    .number({ invalid_type_error: "Informe os anos de experiência cerimonial." })
    .min(1, { message: "Necessário ao menos 1 ano de condução cerimonial comprovada." }),
  telefoneContato: z
    .string()
    .min(10, { message: "Telefone institucional ou WhatsApp ativo para contato dos guardiões." }),
  emailOficial: z
    .string()
    .email({ message: "E-mail institucional ou corporativo válido." }),

  // Parâmetros Litúrgicos e da Congregação
  numeroMembrosAtivos: z
    .number({ invalid_type_error: "Informe o número estimado de membros." })
    .min(1, { message: "Número de membros ativos da congregação." }),
  frequenciaRituais: z.enum(["SEMANAL", "QUINZENAL", "MENSAL", "EVENTUAL"], {
    errorMap: () => ({ message: "Selecione a periodicidade dos encontros litúrgicos." }),
  }),
  graduacaoPretendida: z.enum([
    "3.1_MAINUMBI",
    "5.1_PITUA",
    "7.1_ANHANGATA",
    "10.1_WIRAPURU",
    "MEDICINA_MEL",
    "MEDICINA_GEL",
    "OUTRAS_GRADUACOES_COMBINAR",
  ], {
    errorMap: () => ({ message: "Selecione a graduação ou formato pretendido para os trabalhos." }),
  }),
  intencaoTrabalho: z
    .string()
    .min(20, { message: "Descreva suscintamente o propósito espiritual e as diretrizes do templo." }),

  // Termos Mandatórios de Blindagem Legal e Deontologia
  concordaComConad012010: z.literal(true, {
    errorMap: () => ({
      message: "A instituição deve anuir formalmente à Resolução CONAD nº 01/2010.",
    }),
  }),
  declaraAusenciaFinsLucrativos: z.literal(true, {
    errorMap: () => ({
      message: "O templo deve declarar que o sacramento é desprovido de comércio ou lucro.",
    }),
  }),
  planejamento30Dias: z.literal(true, {
    errorMap: () => ({
      message: "A congregação deve respeitar a antecedência mínima mandatória de 30 dias para o feitio.",
    }),
  }),
});

export type CredenciamentoInput = z.infer<typeof CredenciamentoSchema>;

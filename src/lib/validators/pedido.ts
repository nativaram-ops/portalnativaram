import { z } from "zod";

export const ItemPedidoSchema = z.object({
  id: z.string().min(1, "Identificador do sacramento é obrigatório"),
  tipo: z.enum(["GRADUACAO_AYAHUASCA", "RAPE_SAGRADO", "ARTEFATO_SAGRADO"]),
  nome: z.string().min(2, "Nome do sacramento é obrigatório"),
  codigoOuSubtitulo: z.string().default(""),
  quantidade: z.number().min(1, "Quantidade mínima é 1"),
  unidade: z.enum(["Litros", "Frascos (20g)", "Unidades", "kg"]),
  rateioUnitarioEstimado: z.number().min(0),
});

export const NovoPedidoSchema = z.object({
  temploId: z.string().min(2, "Código de homologação do templo é obrigatório"),
  temploNome: z.string().min(3, "Nome do templo/instituição é obrigatório"),
  cidade: z.string().min(2, "Cidade é obrigatória"),
  estado: z.string().min(2, "Estado (UF) é obrigatório"),
  dirigenteNome: z.string().min(3, "Nome do dirigente litúrgico é obrigatório"),
  dirigenteTelefone: z
    .string()
    .min(10, "Telefone ou WhatsApp do dirigente com DDD é obrigatório"),
  dirigenteEmail: z.string().email("E-mail institucional válido é obrigatório"),
  cnpj: z.string().min(14, "CNPJ da instituição religiosa é obrigatório"),
  itens: z.array(ItemPedidoSchema).min(1, "Selecione ao menos um sacramento para a partilha litúrgica"),
  dataCerimoniaPretendida: z
    .string()
    .min(4, "Informe a data prevista para a cerimônia litúrgica"),
  mensagemIntencao: z
    .string()
    .min(5, "Compartilhe a intenção ou observações litúrgicas para o Conselho"),
});

export const AtualizarPedidoSchema = z.object({
  status: z
    .enum([
      "SOLICITADO",
      "HOMOLOGADO_CONSELHO",
      "EM_FEITIO_ACRE",
      "AGUARDANDO_DESPACHO",
      "EM_TRANSITO_REFRIGERADO",
      "ENTREGUE_CONSAGRADO",
      "CANCELADO_AJUSTE",
    ])
    .optional(),
  loteVinculado: z.string().optional(),
  codigoRastreio: z.string().optional(),
  previsaoEntrega: z.string().optional(),
  observacoesInternas: z.string().optional(),
  observacaoHistorico: z.string().optional(),
  responsavel: z.string().optional(),
});

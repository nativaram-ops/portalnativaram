import { z } from "zod";

/**
 * Schema para registro de novas solicitações de credenciamento/homologação.
 * Nota: Não inclui `status`, `loginGerado` nem `senhaGerada`, garantindo que o Zod
 * remova (strip) qualquer tentativa de sobrescrever o status inicial (`PENDENTE_LIBERACAO`).
 */
export const RegistrarSolicitacaoSchema = z.object({
  id: z.string().trim().min(3).max(64).optional(),
  tipo: z
    .enum(["INSTITUICAO_FORMAL", "GRUPO_INFORMAL"])
    .default("INSTITUICAO_FORMAL"),
  nomeEntidade: z
    .string()
    .trim()
    .min(2, "Nome da instituição ou grupo é obrigatório")
    .max(160),
  nomeResponsavel: z
    .string()
    .trim()
    .min(2, "Nome do dirigente ou guardião responsável é obrigatório")
    .max(120),
  telefone: z
    .string()
    .trim()
    .min(8, "Telefone de contato com DDD é obrigatório")
    .max(30),
  email: z
    .string()
    .trim()
    .email("E-mail inválido")
    .optional()
    .or(z.literal(""))
    .default(""),
  cidade: z.string().trim().max(100).optional().default(""),
  estado: z.string().trim().max(10).optional().default(""),
  cnpj: z.string().trim().max(30).optional(),
  linhagem: z
    .string()
    .trim()
    .max(160)
    .optional()
    .default("Tradição Ancestral"),
  graduacao: z.string().trim().max(80).optional().default("5.1 Pituã"),
  volumeEstimado: z.string().trim().max(60).optional().default("5 Litros"),
  intencao: z
    .string()
    .trim()
    .max(1000)
    .optional()
    .default("Ritos de oração e reconexão espiritual."),
});

export type RegistrarSolicitacaoInput = z.infer<typeof RegistrarSolicitacaoSchema>;

/**
 * Schema para dados complementares opcionais enviados pelo Conselho no ato da homologação.
 */
export const HomologarComplementoSchema = z.object({
  tipo: z.enum(["INSTITUICAO_FORMAL", "GRUPO_INFORMAL"]).optional(),
  nomeEntidade: z.string().trim().max(160).optional(),
  nomeResponsavel: z.string().trim().max(120).optional(),
  telefone: z.string().trim().max(30).optional(),
  email: z.string().trim().max(160).optional(),
  cidade: z.string().trim().max(100).optional(),
  estado: z.string().trim().max(10).optional(),
  linhagem: z.string().trim().max(160).optional(),
  graduacao: z.string().trim().max(80).optional(),
  volumeEstimado: z.string().trim().max(60).optional(),
  intencao: z.string().trim().max(1000).optional(),
});

export type HomologarComplementoInput = z.infer<typeof HomologarComplementoSchema>;

/**
 * Schema para verificação de credenciais litúrgicas e administrativas.
 */
export const VerificarChaveSchema = z.object({
  login: z
    .string()
    .trim()
    .min(2, "Código de acesso não informado.")
    .max(120),
  senha: z
    .string()
    .trim()
    .min(4, "Chave de segurança inválida.")
    .max(120),
});

export type VerificarChaveInput = z.infer<typeof VerificarChaveSchema>;

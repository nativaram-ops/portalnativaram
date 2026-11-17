import { z } from "zod";
import { EixoObservatorioInfo, EixoTematicoObservatorio } from "@/types/observatorio";
import { verificarConformidadeTexto } from "./comunidade";

export const EIXOS_OBSERVATORIO: EixoObservatorioInfo[] = [
  {
    id: "ayahuasca",
    rotulo: "Ayahuasca & Alcaloides",
    descricaoCurta: "Fitoquímica de Banisteriopsis caapi, Psychotria viridis e β-carbolinas.",
    queryPadrao: "Banisteriopsis caapi ayahuasca alkaloids",
  },
  {
    id: "etnobotanica_jurua",
    rotulo: "Etnobotânica Amazônica",
    descricaoCurta: "Saberes tradicionais da Amazônia, Acre e usos de plantas sagradas.",
    queryPadrao: "ayahuasca ethnobotany Amazon indigenous ritual",
  },
  {
    id: "seguranca_imao",
    rotulo: "Segurança IMAO & Triagem",
    descricaoCurta: "Toxicocinética, serotonina e prevenção de interações farmacológicas.",
    queryPadrao: "ayahuasca harmine MAO-A serotonin pharmacokinetics safety",
  },
  {
    id: "direito_conad",
    rotulo: "CONAD & Direito Religioso",
    descricaoCurta: "Regulamentação do uso religioso no Brasil, patrimônio e liberdade de culto.",
    queryPadrao: "ayahuasca Brazil religious regulation CONAD cultural heritage",
  },
  {
    id: "agrofloresta",
    rotulo: "Agrofloresta & Nicotiana",
    descricaoCurta: "Manejo florestal comunitário na Amazônia e etnobotânica de Nicotiana rustica.",
    queryPadrao: "agroforestry Acre Amazonia biodiversity OR Nicotiana rustica ethnobotany",
  },
];

export const EIXO_LABELS: Record<EixoTematicoObservatorio, string> = {
  ayahuasca: "Ayahuasca & Alcaloides",
  etnobotanica_jurua: "Etnobotânica Amazônica",
  seguranca_imao: "Segurança IMAO & Triagem",
  direito_conad: "CONAD & Direito Religioso",
  agrofloresta: "Agrofloresta & Nicotiana",
};

const httpsUrlSchema = z
  .string()
  .trim()
  .max(500, "Link muito extenso.")
  .refine((v) => /^https:\/\/\S+$/i.test(v), "Informe um link completo começando com https://");

export const BuscarPesquisasQuerySchema = z.object({
  q: z.string().trim().max(200, "Termo de busca muito longo.").optional().default(""),
  doi: z.string().trim().max(200, "DOI muito longo.").optional(),
  eixo: z
    .enum(["ayahuasca", "etnobotanica_jurua", "seguranca_imao", "direito_conad", "agrofloresta"])
    .optional(),
  somenteAcessoAberto: z.boolean().optional().default(false),
  formato: z.enum(["json", "markdown"]).optional().default("json"),
});

export const NovoAnexoObservatorioSchema = z.object({
  doi: z
    .string()
    .trim()
    .max(200)
    .transform((raw) =>
      raw.replace(/^https?:\/\/(dx\.)?doi\.org\//i, "").trim()
    )
    .refine((v) => /^10\.\d{4,9}\/\S+$/i.test(v), "Informe um DOI válido (ex: 10.3390/ph13110334)."),
  titulo: z.string().trim().min(5, "Título muito curto.").max(320, "Título muito longo."),
  autores: z.string().trim().min(2, "Informe os autores.").max(320, "Lista de autores muito longa."),
  ano: z
    .string()
    .trim()
    .refine((v) => {
      if (!/^\d{4}$/.test(v)) return false;
      const n = Number(v);
      return n >= 1900 && n <= new Date().getFullYear() + 1;
    }, "Informe o ano de publicação com 4 dígitos."),
  periodico: z.string().trim().min(2, "Informe o periódico ou livro.").max(240),
  urlOrigem: httpsUrlSchema,
  pdfAbertoUrl: z
    .string()
    .trim()
    .max(500)
    .optional()
    .or(z.literal(""))
    .refine((v) => !v || /^https:\/\/\S+$/i.test(v), "Link do PDF aberto deve usar https://"),
  eixoTematico: z.enum([
    "ayahuasca",
    "etnobotanica_jurua",
    "seguranca_imao",
    "direito_conad",
    "agrofloresta",
  ]),
  paisOrigem: z.string().trim().max(80, "Origem limitada a 80 caracteres.").optional(),
  sinteseLinguagemClara: z
    .string()
    .trim()
    .min(20, "Escreva uma síntese clara de pelo menos 20 caracteres.")
    .max(800, "Mantenha a síntese objetiva (até 800 caracteres, padrão linguagem clara)."),
  notaDirigente: z.string().trim().max(500, "Nota limitada a 500 caracteres.").optional(),
});

/**
 * Valida que o comentário institucional anexado não viola o Dicionário Semântico (AGENTS.md).
 */
export function validarConformidadeAnexo(sintese: string, notaDirigente?: string) {
  return verificarConformidadeTexto(`${sintese} ${notaDirigente || ""}`);
}

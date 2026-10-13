import { z } from "zod";
import { AlertaConformidadeLinguagem } from "@/types/comunidade";

/**
 * ============================================================
 * DICIONÁRIO DE ENGENHARIA DE LINGUAGEM & COMPLIANCE CONAD/ANVISA
 * Regra Obrigatória do Projeto (AGENTS.md)
 * ============================================================
 */
export const TERMOS_PROIBIDOS_MAP: Record<string, { sugestao: string; motivo: string }> = {
  medicina: {
    sugestao: "sabedoria botânica, alquimia vegetal ou sacramento",
    motivo: "Evita conotação alopática/médica sem registro farmacológico.",
  },
  medicinas: {
    sugestao: "alquimias vegetais, sacramentos ou preparados tradicionais",
    motivo: "Evita caracterização de medicamento não registrado na Anvisa.",
  },
  remedio: {
    sugestao: "preparado de força ou tradição da floresta",
    motivo: "Resolução CONAD 01/2010 restringe o uso ao âmbito estritamente litúrgico.",
  },
  remedios: {
    sugestao: "alquimias tradicionais ou sacramentos da floresta",
    motivo: "Uso litúrgico protegido pela CF/88 não pode alegar propriedades de remédio.",
  },
  cura: {
    sugestao: "florescimento, reequilíbrio vital ou harmonização sensorial",
    motivo: "Proibição da Anvisa e CONAD contra qualquer promessa de cura clínica.",
  },
  curar: {
    sugestao: "harmonizar, acolher, suavizar ou reequilibrar",
    motivo: "Alegação terapêutica direta é vedada pela regulação sanitária.",
  },
  tratamento: {
    sugestao: "protocolo de autocuidado ou rito de reconexão",
    motivo: "Termo de conotação clínica/ambulatorial.",
  },
  terapia: {
    sugestao: "jornada de introspecção ou prática de acalento",
    motivo: "Evita equiparação com prática médica ou psicológica regulamentada.",
  },
  dose: {
    sugestao: "porção sugerida, gotas de intenção ou cálice litúrgico",
    motivo: "Linguagem posológica deve ser evitada em contextos tradicionais.",
  },
  dosagem: {
    sugestao: "medida de afeto ou proporção recomendada",
    motivo: "Linguagem farmacêutica alopática não aplicável a sacramentos.",
  },
  snuff: {
    sugestao: "rapé sagrado ou sacramento da floresta",
    motivo: "Descaracteriza o artefato como fumo recreativo comercial.",
  },
  alucinogeno: {
    sugestao: "expansão de presença ou introspecção profunda",
    motivo: "Termo estigmatizante descolado do contexto ritualístico protegido.",
  },
  psicodelico: {
    sugestao: "percepção sutil ou experiência de força espiritual",
    motivo: "Terminologia contracultural/recreativa vedada na governança litúrgica.",
  },
  loja: {
    sugestao: "portal da cooperativa ou espaço de rateio fraterno",
    motivo: "A entidade opera sem fins lucrativos sob a Lei 5.764/71.",
  },
  venda: {
    sugestao: "partilha fraterna ou rateio de custos",
    motivo: "Sacramentos religiosos não são mercadorias comercializáveis.",
  },
  comprar: {
    sugestao: "solicitar credenciamento ou apoiar a cooperativa",
    motivo: "Acesso mediante homologação canônica de templo, não compra.",
  },
  preco: {
    sugestao: "cota de rateio ou contribuição cooperativa",
    motivo: "Não há precificação comercial; há rateio de insumos de feitio.",
  },
  produto: {
    sugestao: "sacramento, preparado tradicional ou artefato sagrado",
    motivo: "Sacramentos não possuem caráter de mercadoria de prateleira.",
  },
  cliente: {
    sugestao: "irmão cooperado, associado ou templo credenciado",
    motivo: "Relação institucional entre pares cooperados e congregações.",
  },
};

/**
 * Escaneia um texto e retorna alertas amigáveis caso encontre violações de compliance.
 */
export function verificarConformidadeTexto(texto: string): AlertaConformidadeLinguagem[] {
  if (!texto) return [];
  const alertas: AlertaConformidadeLinguagem[] = [];
  const normalizado = texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // Remove acentos para matching robusto

  for (const [termo, info] of Object.entries(TERMOS_PROIBIDOS_MAP)) {
    const termoSemAcento = termo
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    
    // Regex de palavra inteira com limites de palavra (\b)
    const regex = new RegExp(`\\b${termoSemAcento}\\b`, "i");
    if (regex.test(normalizado)) {
      alertas.push({
        termoDetectado: termo,
        sugestaoAprovada: info.sugestao,
        motivoConad: info.motivo,
      });
    }
  }

  return alertas;
}

// ══════════════════════════════════════════════════════════
// SCHEMAS DE VALIDAÇÃO ZOD
// ══════════════════════════════════════════════════════════

export const PublicacaoSchema = z.object({
  titulo: z
    .string()
    .min(5, "O título deve ter no mínimo 5 caracteres")
    .max(120, "O título deve ter no máximo 120 caracteres"),
  resumo: z
    .string()
    .min(10, "O resumo deve ter no mínimo 10 caracteres")
    .max(300, "O resumo deve ter no máximo 300 caracteres"),
  conteudoMarkdown: z
    .string()
    .min(30, "O conteúdo deve ter no mínimo 30 caracteres"),
  categoria: z.enum([
    "REFLEXAO_DOUTRINARIA",
    "RELATO_VIVENCIA",
    "BOTANICA_TRADICIONAL",
    "ARTE_E_POESIA",
    "COMUNICADO_LITURGICO",
    "ESTUDO_ETNOFARMACEUTICO",
  ]),
  imagemCapa: z.string().optional(),
  fotosGaleria: z.array(z.string()).optional().default([]),
  anexos: z
    .array(
      z.object({
        nome: z.string().min(2),
        url: z.string().url("URL de anexo inválida"),
        tamanho: z.string().optional(),
        tipo: z.enum(["PDF", "SLIDE", "DOCUMENTO", "LINK_EXTERNO"]),
      })
    )
    .optional()
    .default([]),
  embeds: z
    .array(
      z.object({
        plataforma: z.enum([
          "INSTAGRAM",
          "YOUTUBE",
          "SPOTIFY",
          "NOTEBOOKLM",
          "OUTRO",
        ]),
        url: z.string().url("URL do embed inválida"),
        titulo: z.string().optional(),
      })
    )
    .optional()
    .default([]),
  status: z.enum(["PUBLICADO", "RASCUNHO", "ARQUIVADO"]).default("PUBLICADO"),
  destaque: z.boolean().optional().default(false),
});

export const PerfilTemploSchema = z.object({
  nomeInstituicao: z.string().min(3, "Nome do templo muito curto"),
  dirigenteResponsavel: z.string().min(3, "Nome do dirigente obrigatório"),
  linhagem: z.string().min(3, "Linhagem doutrinária obrigatória"),
  cidade: z.string().min(2, "Cidade obrigatória"),
  estado: z.string().min(2, "Estado obrigatório"),
  bioApresentacao: z.string().min(20, "Apresentação deve ter no mínimo 20 caracteres"),
  fotoPerfilUrl: z.string().optional(),
  fotoCapaUrl: z.string().optional(),
  fotosEspaco: z.array(z.string()).optional().default([]),
  redesSociais: z
    .object({
      instagram: z.string().optional(),
      youtube: z.string().optional(),
      spotify: z.string().optional(),
      facebook: z.string().optional(),
      website: z.string().optional(),
    })
    .default({}),
  whatsappContato: z.string().optional(),
  emailContato: z.string().email("E-mail inválido").optional().or(z.literal("")),
  publicado: z.boolean().default(true),
});

export const ItemAgendaSchema = z.object({
  tituloRito: z.string().min(3, "Título do encontro obrigatório"),
  descricao: z.string().optional(),
  dataEvento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data deve estar no formato AAAA-MM-DD"),
  horarioInicio: z.string().regex(/^\d{2}:\d{2}$/, "Horário deve estar no formato HH:MM"),
  vagasInfo: z.string().optional(),
  linkInscricao: z.string().optional(),
  status: z.enum(["CONFIRMADO", "CANCELADO", "CONCLUIDO"]).default("CONFIRMADO"),
});

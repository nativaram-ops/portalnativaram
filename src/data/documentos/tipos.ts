/**
 * Formato único dos documentos da Central de Documentos (Portal do Dirigente).
 *
 * Cada documento é descrito uma vez, como dados. A folha A4 (React) e o arquivo
 * Markdown (download/cópia) são gerados a partir da mesma estrutura, para que o
 * PDF impresso e o arquivo baixado nunca divirjam (plano 011, B5).
 *
 * Texto inline aceita apenas `**negrito**`.
 */

export interface ContextoDocumento {
  temploNome: string;
  temploCidade: string;
  temploDirigente: string;
  temploRegistro: string;
  /** Data de emissão por extenso (ex.: "02 de novembro de 2026"). */
  dataEmissao: string;
}

export type CorDestaque = "vermelho" | "laranja" | "azul" | "amarelo" | "roxo" | "neutro";

export type Bloco =
  /** Parágrafo corrido. */
  | { tipo: "paragrafo"; texto: string }
  /** Caixa de destaque (nota, alerta, base normativa). */
  | { tipo: "nota"; texto: string; cor?: CorDestaque }
  /** Lista com marcadores ou numerada. */
  | { tipo: "lista"; itens: string[]; ordenada?: boolean }
  /** Itens de marcar: cada item vira "[ ] item". */
  | { tipo: "checklist"; itens: string[] }
  /** Campos a preencher: cada rótulo vira "Rótulo: ______". */
  | { tipo: "campos"; campos: string[]; colunas?: 1 | 2 | 4 }
  /** Tabela; `linhasEmBranco` acrescenta linhas vazias para preenchimento. */
  | {
      tipo: "tabela";
      colunas: string[];
      linhas: string[][];
      linhasEmBranco?: number;
      /** Índices de linhas a destacar em vermelho (vetos). */
      destaque?: number[];
    }
  /** Caixa colorida com título e blocos internos (ex.: grupos da matriz). */
  | { tipo: "grupo"; titulo: string; cor: CorDestaque; blocos: Bloco[] }
  /** Linhas de assinatura. */
  | {
      tipo: "assinaturas";
      assinantes: { rotulo: string; detalhe?: string }[];
      localData?: boolean;
    };

export interface Secao {
  titulo?: string;
  blocos: Bloco[];
}

export type IconeDocumento =
  | "anamnese"
  | "termo"
  | "ata"
  | "transito"
  | "menores"
  | "parecer"
  | "reconfirmacao"
  | "emergencia"
  | "guia"
  | "cartao"
  | "privacidade";

export interface DocumentoModelo {
  /** Identificador estável (usado na aba e no nome do arquivo). */
  id: string;
  /** Número de exibição com dois dígitos ("01", "02"…). */
  numero: string;
  /** Rótulo curto da aba (sem o número). */
  rotuloCurto: string;
  /** Linha de apoio da aba. */
  resumo: string;
  icone: IconeDocumento;
  titulo: string;
  subtitulo: string;
  versao: string;
  /** Data da versão no formato AAAA-MM-DD. */
  dataVersao: string;
  /** Revisões humanas ainda pendentes (ex.: "Revisão clínica pendente: …"). Vazio = revisado. */
  revisaoPendente: string[];
  /** Nome-base do arquivo .md baixado. */
  arquivo: string;
  montar: (ctx: ContextoDocumento) => Secao[];
}

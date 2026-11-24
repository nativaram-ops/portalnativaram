export interface EstudoItem {
  id: string;
  titulo: string;
  subtitulo: string;
  categoria: "ayahuasca" | "rapes" | "compliance" | "etnociencia";
  categoriaLabel: string;
  /** Arquivo em public/documentos/ (PDF ou Markdown). */
  pdfArquivo: string;
  /** Tamanho real do arquivo, conferido por scripts/test-biblioteca.mjs. */
  pdfTamanho: string;
  ano: string;
  autorOuFonte: string;
  resumo: string;
  principaisDescobertas: string[];
  referenciasAcademicas: string[];
  capitulos: {
    titulo: string;
    conteudo: string;
  }[];
}

/**
 * Biblioteca pública enxuta (plano 011, item A10). Cada item aponta para um arquivo
 * existente em public/documentos/. Documentos internos (pareceres, manuais de
 * comunicação, estratégia de anúncios) ficam fora do ar, em docs/fontes/internos/.
 */
export const estudosData: EstudoItem[] = [
  {
    id: "feitio-e-graduacoes-da-ayahuasca",
    titulo: "O Feitio da Ayahuasca: Preparação, Sinergia Botânica e Graduações de Força",
    subtitulo: "Nota técnica de divulgação: cosmologia indígena, proporções de cipó e folha, cozimento e graduações na tradição",
    categoria: "ayahuasca",
    categoriaLabel: "Ayahuasca & Feitio • Nota técnica",
    pdfArquivo: "feitio-e-graduacoes-da-ayahuasca.md",
    pdfTamanho: "13,9 KB",
    ano: "2026",
    autorOuFonte: "Cooperativa Nativaram (síntese de literatura publicada)",
    resumo:
      "Nota técnica em texto aberto que reúne o que a literatura publicada descreve sobre o feitio da Ayahuasca: os contextos de uso entre os Huni Kuin e nas religiões brasileiras, a sinergia entre o cipó Banisteriopsis caapi e a folha Psychotria viridis, as proporções de biomassa, as fases de cozimento e apuração e as graduações simples, reconcentrado e mel. Não é estudo original: não traz laudo nem análise própria da cooperativa, e não é indicação de uso.",
    principaisDescobertas: [
      "Proporção de 3:1 a 4:1 entre cipó e folha descrita na literatura para um feitio equilibrado.",
      "Duas fases de extração: decocção (4 a 6 horas por ciclo) e apuração em fogo brando (6 a 12 horas).",
      "Graduações simples, reconcentrado e mel, descritas como categorias da tradição.",
      "Seção de cuidados de segurança na acolhida de participantes das cerimônias.",
    ],
    referenciasAcademicas: [
      "The pharmacological interaction of compounds in ayahuasca: a systematic review (Revista Brasileira de Psiquiatria, SciELO)",
      "Toxicokinetics and Toxicodynamics of Ayahuasca Alkaloids (Pharmaceuticals, MDPI, 2020)",
      "Cantos xamânicos Huni Kuin: cerimônias de ayahuasca, cosmologias e pontes entre mundos (Revista Vórtex)",
    ],
    capitulos: [
      {
        titulo: "1. Cosmologia indígena e o feitio",
        conteudo:
          "Entre os Huni Kuin, a bebida é chamada de nixi pae, o fio de luz. O feitio é compreendido como processo de comunicação espiritual, conduzido por cantos que colorem as mirações ou suavizam a força da bebida.",
      },
      {
        titulo: "2. Graduações de força",
        conteudo:
          "As graduações diferem pela densidade obtida na apuração e pelo número de vezes que o mesmo líquido foi reprocessado com plantas frescas: do grau simples, usado nas sessões regulares, ao grau mel, de consistência densa.",
      },
    ],
  },
];

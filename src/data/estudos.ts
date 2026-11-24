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
  {
    id: "rapes-sagrados-floresta-e-ciencia",
    titulo: "Rapés Sagrados: Essências entre a Floresta e a Ciência",
    subtitulo: "Caderno etnobotânico do rapé: nomes científicos, lendas, história e ecologia",
    categoria: "rapes",
    categoriaLabel: "Rapés Sagrados • Caderno",
    pdfArquivo: "nativaram-rapes-sagrados-floresta-e-ciencia.md",
    pdfTamanho: "26,2 KB",
    ano: "2026",
    autorOuFonte: "Cooperativa Nativaram",
    resumo:
      "Caderno em texto aberto sobre as plantas usadas no rapé sagrado: nome científico, povos associados, contexto histórico, lenda, dimensão espiritual segundo a tradição e notas de ecologia. Conteúdo cultural e etnobotânico. Não é oferta. O rapé contém tabaco e nicotina, que causam dependência. Proibido para menores de 18 anos. Cantos, provérbios e povos associados a cada planta ainda estão em conferência com as comunidades citadas.",
    principaisDescobertas: [
      "Notas culturais e botânicas sobre as plantas e cinzas associadas ao rapé.",
      "Aviso de tabaco e nicotina e restrição a maiores de 18 anos.",
      "Notas de ecologia e conservação das espécies de origem.",
    ],
    referenciasAcademicas: [
      "Relatos de tradição oral dos povos citados (em conferência)",
      "Literatura etnobotânica sobre plantas amazônicas (referências específicas em revisão)",
    ],
    capitulos: [
      {
        titulo: "1. Raízes ancestrais e resistência cultural",
        conteudo:
          "O rapé sagrado é patrimônio imaterial de resistência dos povos da floresta. Mais que um preparado botânico, é um rito de sintonização, oração ativa e harmonia sensorial.",
      },
      {
        titulo: "2. As plantas e a tradição",
        conteudo:
          "Cada nota relaciona a planta de origem, a família botânica, a lenda associada e a dimensão espiritual atribuída pela tradição, sempre como relato de fé e sem finalidade clínica.",
      },
    ],
  },
];

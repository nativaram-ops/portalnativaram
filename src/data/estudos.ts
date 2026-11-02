export interface EstudoItem {
  id: string;
  titulo: string;
  subtitulo: string;
  categoria: "ayahuasca" | "rapes" | "sananga" | "compliance" | "etnociencia";
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
    id: "documento-institucional-nativaram",
    titulo: "Documento Institucional da Cooperativa Nativaram",
    subtitulo: "Manifesto, etnociência, feitio da Ayahuasca, rapés sagrados e segurança integrativa",
    categoria: "etnociencia",
    categoriaLabel: "Institucional",
    pdfArquivo: "documento-institucional-nativaram.pdf",
    pdfTamanho: "965 KB",
    ano: "2026",
    autorOuFonte: "Cooperativa Nativaram",
    resumo:
      "Apresentação institucional da cooperativa em oito capítulos: a gênese do projeto, o diálogo entre saber tradicional e ciência, o feitio da Ayahuasca e o cipó Tucunacá, o sistema de graduações, a alquimia das cinzas do rapé, um panorama dos rapés partilhados e as regras de conformidade e segurança integrativa. Versão em revisão: o arquivo ainda traz a identidade visual antiga e será substituído por uma edição atualizada.",
    principaisDescobertas: [
      "Organização cooperativa sem fins lucrativos, sob a Lei 5.764/71 e a Resolução CONAD nº 01/2010.",
      "Origem do feitio em Cruzeiro do Sul, Acre, com apoio logístico em Serra, Espírito Santo.",
      "Panorama das tradições da Ayahuasca e do rapé sagrado partilhadas com templos credenciados.",
      "Capítulo próprio de conformidade jurídica e segurança integrativa (+18).",
    ],
    referenciasAcademicas: [
      "Documento institucional da cooperativa, sem bibliografia própria",
      "Resolução CONAD nº 01, de 25 de janeiro de 2010 (DOU nº 17, 26/01/2010, Seção 1)",
    ],
    capitulos: [
      {
        titulo: "1. A governança do cooperativismo etnobotânico",
        conteudo:
          "A Cooperativa Nativaram opera como sociedade cooperativa de apoio mútuo. As decisões e a destinação dos excedentes do rateio de custos são deliberadas em assembleia e reinvestidas na sustentação dos feitores, na estruturação de viveiros agroflorestais e na salvaguarda dos territórios tradicionais.",
      },
    ],
  },
  {
    id: "comentario-resolucao-conad-01-2010",
    titulo: "Comentário da Cooperativa Nativaram sobre a Resolução CONAD 01/2010",
    subtitulo: "Leitura da cooperativa sobre o uso religioso da Ayahuasca. Não substitui o texto oficial da resolução.",
    categoria: "compliance",
    categoriaLabel: "Governança & CONAD",
    pdfArquivo: "comentario-cooperativa-nativaram-resolucao-conad-01-2010.pdf",
    pdfTamanho: "4,1 KB",
    ano: "2026",
    autorOuFonte: "Cooperativa Nativaram (comentário; o texto oficial é do CONAD)",
    resumo:
      "Nota de uma página com a leitura da cooperativa sobre a Resolução CONAD nº 01/2010, que trata do uso religioso da Ayahuasca. O comentário mistura trechos da norma com recomendações internas da cooperativa sobre transporte e documentação; essas recomendações não são exigências da resolução. Para o texto legal, consulte a publicação oficial do Ministério da Justiça, indicada nesta página.",
    principaisDescobertas: [
      "A resolução publica o Relatório Final do Grupo Multidisciplinar de Trabalho (GMT) sobre o uso religioso da Ayahuasca.",
      "O relatório trata como incompatível com o uso religioso o plantio, o preparo e a ministração com fins de lucro.",
      "Recomendação da cooperativa (não exigência da norma): manter atas, estatuto e cadastro atualizados para a remessa entre templos.",
    ],
    referenciasAcademicas: [
      "Resolução CONAD nº 01, de 25 de janeiro de 2010 (DOU nº 17, 26/01/2010, Seção 1, p. 57-60)",
      "Constituição Federal de 1988, Art. 5º, inciso VI",
    ],
    capitulos: [
      {
        titulo: "1. O que é norma e o que é recomendação",
        conteudo:
          "A Resolução CONAD nº 01/2010 reconhece a legitimidade do uso religioso da Ayahuasca e publica os princípios deontológicos do Relatório Final do GMT. Os procedimentos de transporte e a lista de documentos citados no comentário são recomendações da Cooperativa Nativaram aos templos credenciados, e não requisitos do texto oficial.",
      },
    ],
  },
  {
    id: "feitio-e-graduacoes-da-ayahuasca",
    titulo: "O Feitio da Ayahuasca: Preparação, Sinergia Botânica e Graduações de Força",
    subtitulo: "Nota técnica de divulgação: cosmologia indígena, proporções de cipó e folha, cozimento e graduações",
    categoria: "ayahuasca",
    categoriaLabel: "Ayahuasca & Feitio • Nota técnica",
    pdfArquivo: "feitio-e-graduacoes-da-ayahuasca.md",
    pdfTamanho: "14,7 KB",
    ano: "2026",
    autorOuFonte: "Cooperativa Nativaram (síntese de literatura publicada)",
    resumo:
      "Nota técnica em texto aberto que reúne o que a literatura publicada descreve sobre o feitio da Ayahuasca: os contextos de uso entre os Huni Kuin e nas religiões brasileiras, a sinergia entre o cipó Banisteriopsis caapi e a folha Psychotria viridis, as proporções de biomassa, as fases de cozimento e apuração e as graduações simples, reconcentrado e mel. Não é estudo original: não traz laudo nem análise própria da cooperativa.",
    principaisDescobertas: [
      "Proporção de 3:1 a 4:1 entre cipó e folha descrita na literatura para um feitio equilibrado.",
      "Duas fases de extração: decocção (4 a 6 horas por ciclo) e apuração em fogo brando (6 a 12 horas).",
      "Graduações simples, reconcentrado e mel, com porções litúrgicas de referência para cada uma.",
      "Seção de cuidados e contraindicações para a acolhida de participantes nos templos.",
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
          "As graduações diferem pela densidade obtida na apuração e pelo número de vezes que o mesmo líquido foi reprocessado com plantas frescas: do grau simples, usado nas sessões regulares, ao grau mel, de consistência densa e partilhado em pequenas colheres.",
      },
    ],
  },
  {
    id: "rapes-sagrados-floresta-e-ciencia",
    titulo: "Rapés Sagrados: Essências entre a Floresta e a Ciência",
    subtitulo: "Caderno etnobotânico das essências de rapé: nomes científicos, lendas, dimensão espiritual e precauções",
    categoria: "rapes",
    categoriaLabel: "Rapés Sagrados • Caderno",
    pdfArquivo: "nativaram-rapes-sagrados-floresta-e-ciencia.md",
    pdfTamanho: "45,2 KB",
    ano: "2026",
    autorOuFonte: "Cooperativa Nativaram",
    resumo:
      "Caderno em texto aberto com as fichas das essências de rapé sagrado: nome científico, povos associados, contexto histórico, lenda, dimensão espiritual segundo a tradição, precauções e notas de ecologia. Esta versão retirou as alegações fisiológicas sem fonte verificável. Cantos, provérbios e povos associados a cada essência ainda estão em conferência com as comunidades citadas.",
    principaisDescobertas: [
      "Fichas de mais de 20 essências, de Tsunu e 7 Ervas a Rapé de Rainha.",
      "Precauções de uso em cada ficha, com acesso restrito a maiores de 18 anos.",
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
        titulo: "2. As fichas das essências",
        conteudo:
          "Cada ficha relaciona a planta de origem, a família botânica, a lenda associada e a dimensão espiritual atribuída pela tradição, sempre como relato de fé e sem finalidade clínica.",
      },
    ],
  },
  {
    id: "catalogo-rapes-v4",
    titulo: "Catálogo Geral dos Rapés Sagrados (edição v4)",
    subtitulo: "Fichas das 29 essências partilhadas pela cooperativa, com introdução sobre a alquimia das cinzas",
    categoria: "rapes",
    categoriaLabel: "Rapés Sagrados • Catálogo",
    pdfArquivo: "nativaram-catalogo-v4.pdf",
    pdfTamanho: "281 KB",
    ano: "2026",
    autorOuFonte: "Cooperativa Nativaram",
    resumo:
      "Catálogo em PDF das 29 essências de rapé sagrado partilhadas com templos credenciados, de 7 Ervas a Veia de Pajé, com uma introdução sobre a alquimia das cinzas e uma seção final de sustentabilidade e segurança. Versão em revisão: o arquivo ainda traz a identidade visual e o vocabulário antigos e será substituído por uma edição revisada.",
    principaisDescobertas: [
      "29 fichas de essências, organizadas em ordem alfabética.",
      "Introdução sobre o papel das cinzas de cascas nobres no preparo tradicional.",
      "Seção final de sustentabilidade e segurança integrativa.",
    ],
    referenciasAcademicas: ["Catálogo da cooperativa, sem bibliografia própria"],
    capitulos: [
      {
        titulo: "1. Organização do catálogo",
        conteudo:
          "Cada essência tem uma ficha própria. As cascas e ervas são descritas com a família botânica de origem e o manejo sustentável adotado, mantendo as árvores em pé e protegendo espécies ameaçadas como a Ararajuba (Guaruba guarouba).",
      },
    ],
  },
  {
    id: "manifesto-etnobotanico",
    titulo: "Manifesto Etnobotânico da Cooperativa Nativaram",
    subtitulo: "Apresentação visual sobre a aliança entre a tradição da floresta e a ciência",
    categoria: "etnociencia",
    categoriaLabel: "Manifesto & Etnociência • Apresentação",
    pdfArquivo: "manifesto-etnobotanico-cooperativa-nativaram.pdf",
    pdfTamanho: "18,1 MB",
    ano: "2026",
    autorOuFonte: "Cooperativa Nativaram (apresentação gerada com Google NotebookLM)",
    resumo:
      "Apresentação em slides sobre o diálogo entre o conhecimento oral dos povos da floresta e a ciência, a cadeia agroflorestal no Acre e a conservação da fauna. Arquivo pesado (18 MB) e só com imagens, sem texto selecionável: uma versão leve e em texto está em preparação.",
    principaisDescobertas: [
      "Diálogo entre a memória viva da floresta e os métodos da ciência.",
      "Cadeia agroflorestal no Acre com remuneração justa para famílias extrativistas e feitores.",
      "Conservação dos sítios de nidificação da Ararajuba (Guaruba guarouba).",
    ],
    referenciasAcademicas: ["Apresentação da cooperativa, sem bibliografia própria"],
    capitulos: [
      {
        titulo: "1. O futuro é ancestral",
        conteudo:
          "O manifesto visual afirma que a tecnologia mais refinada do planeta está nos ecossistemas e na memória das populações originárias. A cooperativa se coloca como guardiã desse legado, protegendo-o da mercantilização predatória.",
      },
    ],
  },
  {
    id: "sobre-nos-cooperativa-nativaram",
    titulo: "Sobre Nós: História da Cooperativa Nativaram",
    subtitulo: "Povos originários, etnociência e a trajetória da cooperativa no Acre",
    categoria: "etnociencia",
    categoriaLabel: "Manifesto & Etnociência",
    pdfArquivo: "sobre-nos-cooperativa-nativaram.pdf",
    pdfTamanho: "2,6 MB",
    ano: "2026",
    autorOuFonte: "Cooperativa Nativaram",
    resumo:
      "Apresentação da história da cooperativa e da convivência com os povos da floresta no Acre. Arquivo só com imagens, sem texto selecionável: uma versão leve e em texto está em preparação.",
    principaisDescobertas: [
      "Trajetória da cooperativa junto aos povos da floresta no Acre.",
      "Manejo agroflorestal com trabalho digno para populações tradicionais.",
      "Ação cooperativa sem fins lucrativos de acolhimento e apoio comunitário.",
    ],
    referenciasAcademicas: ["Apresentação da cooperativa, sem bibliografia própria"],
    capitulos: [
      {
        titulo: "1. A filosofia da cooperativa",
        conteudo:
          "Não buscamos subordinar o saber milenar ao crivo da tecnocracia nem diluir o sagrado em modismos. Promovemos um espaço de aprendizado mútuo, em que o cuidado com a botânica dá base para que a sacralidade espiritual floresça.",
      },
    ],
  },
];

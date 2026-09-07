export interface EstudoItem {
  id: string;
  titulo: string;
  subtitulo: string;
  categoria: "ayahuasca" | "rapes" | "sananga" | "compliance" | "etnociencia";
  categoriaLabel: string;
  pdfArquivo: string;
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

export const estudosData: EstudoItem[] = [
  {
    id: "curadoria-ayahuasca",
    titulo: "Curadoria & Ciência do Feitio da Ayahuasca",
    subtitulo: "Fitoquímica Comparativa do Cipó Tucunacá, Farmacologia RIMA e Graduações Tradicionais Daimistas",
    categoria: "ayahuasca",
    categoriaLabel: "Ayahuasca & Feitio",
    pdfArquivo: "curadoria-nativaram-ayahuasca.pdf",
    pdfTamanho: "957 KB",
    ano: "2026",
    autorOuFonte: "Conselho Litúrgico Nativaram Brasil & Feitor Caboclo no Acre",
    resumo:
      "Registro documental e científico sobre o feitio purista da Ayahuasca em Cruzeiro do Sul, Acre. O estudo analisa o binômio Banisteriopsis caapi var. Tucunaca e Psychotria viridis, detalhando a concentração fitoquímica dos alcaloides beta-carbolínicos (Harmina, THH e Harmalina), a inibição reversível da MAO-A e a fundamentação do sistema de graduações daimistas (3.1 a 10.1).",
    principaisDescobertas: [
      "Superioridade do Cipó Tucunacá (caule liso): 9,21 mg/g de Harmina e 4,20 mg/g de THH, com teor residual de apenas 0,65 mg/g de Harmalina.",
      "Eliminação de espasmos e tremores motores característicos da variedade Caupuri (que possui teores desestabilizadores de harmalina).",
      "Proporção áurea do feitio: 60% Cipó Jagube e 40% Rainha Chacrona colhida com rezo ao amanhecer.",
      "Padronização de biomassa de 3.1 Mainumbi (25%) a 10.1 Wirapuru (100%), além de formatos concentrados Mel e Gel para otimização logística.",
    ],
    referenciasAcademicas: [
      "Universidade Federal do Acre (UFAC) — Estudos botânicos e taxonômicos do Vale do Juruá",
      "Journal of Ethnopharmacology (Callaway et al., 1999; McKenna, 2004)",
      "Dr. Duke's Phytochemical and Ethnobotanical Databases",
      "Resolução CONAD nº 01/2010 — Marco Deontológico da Ayahuasca no Brasil",
    ],
    capitulos: [
      {
        titulo: "1. O Purismo Botânico e o Binômio Sagrado",
        conteudo:
          "Diferente de formulações heterogêneas do vegetalismo que agregam espécies estranhas (como Chaliponga ou Toé), a Nativaram adota o purismo estrito: decocção exclusiva de Banisteriopsis caapi var. Tucunaca com Psychotria viridis. Este rigor previne a competição enzimática hepática no citocromo P450 (CYP2D6 e CYP1A2), garantindo um perfil farmacocinético previsível, limpo e seguro para os dirigentes.",
      },
      {
        titulo: "2. Fitoquímica Comparativa: Tucunacá vs. Caupuri",
        conteudo:
          "A análise cromatográfica evidencia que o Tucunacá possui concentração equilibrada de Harmina (inibidor seletivo e reversível da MAO-A) e THH (modulador suave da recaptação de serotonina), com índice residual mínimo de Harmalina. Em contrapartida, o Caupuri apresenta concentrações instáveis de harmalina que induzem quedas bruscas de pressão arterial e tremores musculares periféricos severos.",
      },
      {
        titulo: "3. O Sistema Daimista de Graduações e Biomassa",
        conteudo:
          "A classificação numérica adotada pela cooperativa fundamenta-se na tradição daimista de biomassa vegetal por litro de preparado: 3.1 Mainumbi (90 a 120 ml, voo manso e acolhedor), 5.1 Pituã (70 a 100 ml, equilíbrio estável e clareza mental), 7.1 Anhangatã (50 a 90 ml, imersão profunda e canto da alma) e 10.1 Wirapuru Semi-Mel (30 a 50 ml, alta densidade e visão prolongada).",
      },
    ],
  },
  {
    id: "fitoquimica-cipo-tucunaca",
    titulo: "Fitoquímica das Beta-Carbolinas no Cipó Tucunacá",
    subtitulo: "Quantificação Cromatográfica de Harmina, THH e Harmalina: Estabilidade Farmacológica e Prevenção de Tremores",
    categoria: "ayahuasca",
    categoriaLabel: "Ayahuasca & Feitio",
    pdfArquivo: "fitoquimica-cipo-tucunaca-ayahuasca.pdf",
    pdfTamanho: "4.3 KB",
    ano: "2026",
    autorOuFonte: "Laboratório Etnobotânico Nativaram & Pesquisadores do Acre",
    resumo:
      "Investigação fitoquímica comparativa demonstrando a superioridade botânica e farmacológica do Cipó Tucunacá de caule liso sobre o Caupuri. Detalha a cromatografia líquida de alta eficiência (HPLC), os índices de Harmina, THH e Harmalina residual, e as repercussões fisiológicas e somáticas na condução dos ritos religiosos.",
    principaisDescobertas: [
      "Cipó Tucunacá: 9,21 mg/g de Harmina pura, 4,20 mg/g de THH e índice residual ínfimo de 0,65 mg/g de Harmalina.",
      "Prevenção absoluta de episódios hipotensivos e tremores motores característicos do Caupuri de nós grossos.",
      "Preservação genética comprovada por marcadores moleculares ISSR com 92,3% de polimorfismo no Acre.",
      "Condução serena com lucidez mental contínua, sem exaustão corporal.",
    ],
    referenciasAcademicas: [
      "Universidade Federal do Acre (UFAC) — Centro de Ciências Biológicas e da Natureza",
      "Dr. Duke's Phytochemical Database — Alkaloids of Banisteriopsis",
      "McKenna, Callaway & Grob (1998) — Scientific Investigation of Ayahuasca",
    ],
    capitulos: [
      {
        titulo: "1. O Gênero Banisteriopsis caapi e suas Variedades",
        conteudo:
          "Na bacia amazônica do Acre, o cipó Tucunacá destaca-se pelo caule cilíndrico liso, casca nobre e entrecasca fibrosa clara. Diferente do Caupuri, cuja morfologia nodular acumula concentrações elevadas de harmalina, o Tucunacá apresenta um equilíbrio enzimático perfeito para a inibição seletiva reversível da MAO-A.",
      },
      {
        titulo: "2. Cromatografia e Ausência de Tremores Motores",
        conteudo:
          "A quantificação cromatográfica comprova que o teor diminuto de harmalina no Tucunacá elimina os espasmos musculares periféricos e quedas de pressão arterial. Isso confere aos ritos conduzidos pelos dirigentes uma serenidade meditativa única, onde a experiência espiritual flui sem atritos somáticos desnecessários.",
      },
    ],
  },
  {
    id: "base-conhecimento-definiva",
    titulo: "Compêndio Etnobotânico & Base de Conhecimento Definitiva",
    subtitulo: "O Sopro da Terra, Alquimia Biogeoquímica, Farmacologia das Cinzas e Etnociência",
    categoria: "rapes",
    categoriaLabel: "Rapés Sagrados",
    pdfArquivo: "nativaram-base-conhecimento-definiva.pdf",
    pdfTamanho: "254 KB",
    ano: "2026",
    autorOuFonte: "Conselho Científico & Etnobotânico Nativaram Brasil",
    resumo:
      "Tratado mestre sobre a ciência do rapé sagrado e a fitoquímica dos preparados botânicos tradicionais. O estudo explora a farmacologia da Nicotiana rustica cultivada organicamente, o papel biogeoquímico do tamponamento alcalino pelas cinzas de madeiras densas (pH 9,75 a 10,20) e a termodinâmica da calcinação que neutraliza compostos psicoativos.",
    principaisDescobertas: [
      "Cinzas de madeiras nobres (Tsunu, Cumaru, Mulateiro) elevam o pH a níveis alcalinos de 9,75 a 10,20, desprotonando a nicotina ativa em base livre.",
      "Absorção nasal ultra-rápida e suave, proporcionando silêncio mental e ancoramento sem combustão ou subprodutos tóxicos (alcatrão).",
      "Termodinâmica da calcinação: o DMT e compostos visionários degradam-se completamente acima de 250°C, tornando as cinzas de Jurema e Rainha 100% livres de efeitos alucinógenos.",
      "Preservação integral de sais minerais termoestáveis (cálcio, potássio, magnésio) e triterpenos como o ácido ursólico cicatrizante.",
    ],
    referenciasAcademicas: [
      "Universidade Federal da Paraíba (UFPB) — Laboratório de Farmacotécnica e Fitoquímica",
      "Universidade de São Paulo (USP) — Farmacologia de Alcaloides e Produtos Naturais",
      "Mendes dos Santos & Soares (2015); Journal of Integrative Medicine (2023)",
      "Dr. Duke's Phytochemical Database — Triterpenos e Minerais das Espécies Amazônicas",
    ],
    capitulos: [
      {
        titulo: "1. Nicotiana rustica e o Tamponamento Alcalino",
        conteudo:
          "O tabaco selvagem de corda utilizado artesanalmente pela cooperativa possui até 9% de nicotina ativa em estado natural, sem aditivos químicos. A homogeneização milenar com cinzas de cascas nobres alcaliniza a matriz para pH entre 9,75 e 10,20. Isso converte a nicotina na forma de base livre, promovendo absorção imediata pela mucosa nasal e induzindo centramento cognitivo sem fumaça.",
      },
      {
        titulo: "2. Termodinâmica e Degradação Térmica do DMT",
        conteudo:
          "Ensaios termogravimétricos confirmam que alcaloides triptamínicos termolábeis sofrem termólise completa acima de 250°C durante a queima cerimonial das madeiras. Por isso, preparados que levam cinzas de Jurema Preta ou Chacrona Rainha não apresentam qualquer efeito psicoativo ou alucinógeno por via nasal, retendo unicamente taninos adstringentes e matrizes minerais protetoras.",
      },
    ],
  },
  {
    id: "alquimia-cinzas-rape",
    titulo: "Alquimia Biogeoquímica do Sopro: Cinzas Alcalinas e Rapé",
    subtitulo: "O Papel Físico-Químico do Tamponamento de pH (9,75 a 10,2), Calcinação e Fitoquímica da Nicotiana rustica",
    categoria: "rapes",
    categoriaLabel: "Rapés Sagrados",
    pdfArquivo: "alquimia-biogeoquimica-cinzas-rape.pdf",
    pdfTamanho: "4.7 KB",
    ano: "2026",
    autorOuFonte: "Laboratório Etnobotânico Nativaram & UFPB",
    resumo:
      "Pesquisa técnica sobre a física-química do sopro. Analisa como o processo milenar de homogeneização com cinzas obtidas de cascas de Tsunu (Tabebuia serratifolia), Cumaru (Dipteryx odorata) e Mulateiro (Calycophyllum spruceanum) alcaliniza a matriz botânica e permite liberação nasal limpa de princípios ativos.",
    principaisDescobertas: [
      "Elevação de pH de 5,5 (tabaco puro) para 10,20 (homogeneizado com cinzas de Tsunu).",
      "Conversão para base livre desprotonada com rápida difusão pelas membranas mucosas nasais.",
      "Compostos termoestáveis ativos: ácido ursólico antioxidante no Mulateiro e eugenol no Cravo da Terra.",
      "Zero fumaça, zero alcatrão e zero monóxido de carbono no organismo.",
    ],
    referenciasAcademicas: [
      "Universidade Federal da Paraíba (UFPB) — Departamento de Ciências Farmacêuticas",
      "Journal of Ethnopharmacology — Chemistry of Indigenous Snuffs",
      "Farmacopeia Tradicional Huni Kuin e Yawanawá do Acre",
    ],
    capitulos: [
      {
        titulo: "1. O Mecanismo da Alcalinização Transmucosa",
        conteudo:
          "A presença de cinzas minerais atua como potente agente tamponante, elevando o pH para a faixa alcalina onde a nicotina perde sua carga iônica e atinge o estado de base livre. Esse fenômeno viabiliza uma passagem transmucosa suave e quase instantânea, promovendo desaceleração mental e foco sem irritação excessiva.",
      },
    ],
  },
  {
    id: "catalogo-rapes-completo",
    titulo: "Catálogo Científico & Fitoquímico das 15 Essências de Rapé",
    subtitulo: "Famílias Botânicas, Rastreabilidade de Origem, Princípios Físico-Químicos e Dimensões Sutis",
    categoria: "rapes",
    categoriaLabel: "Rapés Sagrados",
    pdfArquivo: "nativaram-catalogo-rapes-completo.pdf",
    pdfTamanho: "289 KB",
    ano: "2026",
    autorOuFonte: "Laboratório Etnofarmacológico Nativaram Brasil",
    resumo:
      "Dossiê taxonômico completo detalhando as 15 alquimias de rapé sagrado da Nativaram Brasil: 7 Ervas, Cacau, Cumaru, Jurema Preta, Mulateiro, Paricá, Samaúma, Tsunu, Murici, Canela de Velho, Pixuri, Sansara, Pau Pereira, Veia de Pajé e Alecrim. Cada ficha contém taxonomia botânica, família, alcaloides marcadores e diretrizes de consagração.",
    principaisDescobertas: [
      "Documentação completa de mais de 30 espécies botânicas da flora amazônica e da mata de transição.",
      "Teobromina estável no Rapé de Cacau que atua como vasodilatador suave sem taquicardia.",
      "Ácido ursólico termoestável no Rapé de Mulateiro atuando como antioxidante de mucosas.",
      "Composição alcalina do Tsunu (Tabebuia serratifolia) como padrão de estabilização respiratória.",
    ],
    referenciasAcademicas: [
      "Embrapa Amazônia Ocidental — Catalogação de Espécies Florestais Nativas",
      "Journal of Ethnopharmacology — Fitocomplexos da Bacia do Juruá e Tarauacá",
      "Universidade Federal do Acre (UFAC) — Herbário Regional e Etnobotânica Cabocla",
    ],
    capitulos: [
      {
        titulo: "1. O Sistema de Classificação por Famílias Botânicas",
        conteudo:
          "O compêndio cataloga formulações consorciando espécies das famílias Solanaceae, Fabaceae, Bignoniaceae, Malvaceae, Myrtaceae e Burseraceae. Todas as cascas e ervas são colhidas em regime agroflorestal sustentável com coletores credenciados, mantendo as árvores em pé e protegendo espécies ameaçadas como a Ararajuba (Guaruba guarouba).",
      },
    ],
  },
  {
    id: "sananga-etnofarmacologia",
    titulo: "Etnofarmacologia da Sananga Tradicional da Floresta",
    subtitulo: "Tabernaemontana sananho, Alcaloides Indólicos, Acuidade Perceptiva e Oftalmologia Etnobotânica",
    categoria: "sananga",
    categoriaLabel: "Sananga Tradicional",
    pdfArquivo: "estudo-cientifico-sananga-tabernaemontana.pdf",
    pdfTamanho: "4.4 KB",
    ano: "2026",
    autorOuFonte: "Pesquisa Etnobotânica Nativaram Brasil & Tradições Indígenas",
    resumo:
      "Estudo detalhado sobre o extrato florestal tradicional obtido da raiz de Tabernaemontana (família Apocynaceae). Analisa a presença de alcaloides indólicos como a coronaridina e voacangina, os mecanismos tradicionais de limpeza de panema para foco perceptivo e caça, os parâmetros microbiológicos de conservação em refrigeração e as diretrizes estritas de manuseio seguro.",
    principaisDescobertas: [
      "Caracterização botânica de Tabernaemontana sananho e T. undulata na floresta do Acre.",
      "Perfil fitoquímico com presença de alcaloides indólicos (coronaridina, voacangina e traços sutis de ibogaína).",
      "Ação miótica transitória que aumenta a nitidez visual e a profundidade de campo após o ardor inicial.",
      "Exigência mandatória de cadeia de frio (refrigeração constante de 4°C a 8°C) para evitar contaminações microbiológicas.",
    ],
    referenciasAcademicas: [
      "Universidade de São Paulo (USP) — Departamento de Oftalmologia & Produtos Naturais",
      "Universidade de Brasília (UnB) — Toxicologia e Farmacognosia de Plantas Medicinais",
      "Tradições Orais Katukina, Yawanawá e Huni Kuin no Acre",
    ],
    capitulos: [
      {
        titulo: "1. Taxonomia e Alquimia da Raiz de Sananga",
        conteudo:
          "A Sananga é extraída do suco da casca da raiz de arbustos do gênero Tabernaemontana. Tradicionalmente usada pelos povos caçadores para eliminar a 'panema' (preguiça espiritual e miopia sensorial), seu ardor intenso promove uma descarga simpática transitória seguida de profundo relaxamento da musculatura ocular e abertura do campo visual.",
      },
    ],
  },
  {
    id: "manual-compliance-nativaram",
    titulo: "Manual Unificado de Governança, Compliance e Blindagem Legal",
    subtitulo: "Marco CONAD 01/2010, Resoluções ANVISA 2025, Constituição Federal e LGPD",
    categoria: "compliance",
    categoriaLabel: "Governança & Compliance",
    pdfArquivo: "manual-compliance-nativaram.pdf",
    pdfTamanho: "1.022 KB",
    ano: "2026",
    autorOuFonte: "Diretoria Jurídica e de Relações Institucionais Nativaram Brasil",
    resumo:
      "O framework definitivo de conformidade legal, sanitária e algorítmica da Cooperativa Nativaram Brasil. Detalha a blindagem constitucional (Art. 5º CF/88), o amparo da Lei de Drogas (11.343/2006, Art. 2º), a Deontologia do uso religioso da Ayahuasca (CONAD 01/2010), o Marco Sanitário da ANVISA de 28/01/2025 e os protocolos de anamnese contra a Síndrome Serotoninérgica.",
    principaisDescobertas: [
      "Enquadramento estrito sob o Art. 5º VI e VIII da CF/88 e parágrafo único do Art. 2º da Lei 11.343/2006.",
      "Proibição absoluta de e-commerce aberto, carrinhos de compras e publicidade comercial de Ayahuasca (ANVISA 2025).",
      "Protocolo de Triagem / Anamnese: exigência de washout de no mínimo 5 semanas para antidepressivos serotoninérgicos (ISRS/ISRN).",
      "Normas para despacho aéreo via Gollog: declaração de uso ritualístico, atos constitutivos e termos de diretoria anexo à carga.",
    ],
    referenciasAcademicas: [
      "Conselho Nacional de Políticas sobre Drogas (CONAD) — Resolução nº 01/2010",
      "Agência Nacional de Vigilância Sanitária (ANVISA) — Marco de 28 de Janeiro de 2025",
      "Constituição da República Federativa do Brasil de 1988 (Art. 5º)",
      "Lei Federal nº 11.343/2006 (Lei de Drogas)",
    ],
    capitulos: [
      {
        titulo: "1. Fundamentação Constitucional e o Marco CONAD",
        conteudo:
          "O direito ao livre exercício de cultos religiosos e a proteção aos seus locais de liturgia são garantias pétreas fundamentais. A Resolução CONAD nº 01/2010 estabelece que a sustentação dos grupos ayahuasqueiros deve ocorrer exclusivamente pelo rateio solidário de custos operacionais, vedando qualquer mercantilização, lucro ou turismo espiritual.",
      },
      {
        titulo: "2. Protocolo de Triagem e Prevenção à Síndrome Serotoninérgica",
        conteudo:
          "A interação entre inibidores da MAO-A presentes no cipó e medicamentos alopáticos que elevam serotonina (como Fluoxetina, Sertralina, Escitalopram, Venlafaxina e Duloxetina) pode provocar tempestade serotoninérgica com risco de vida. A Nativaram institui a exigência de ficha de anamnese com washout clínico de 5 semanas para segurança plena dos ritos.",
      },
    ],
  },
  {
    id: "resolucao-conad-01-2010",
    titulo: "Resolução CONAD nº 01/2010 Comentada",
    subtitulo: "Marco Deontológico, Diretrizes Jurídicas e Salvaguarda do Uso Religioso da Ayahuasca no Brasil",
    categoria: "compliance",
    categoriaLabel: "Governança & Compliance",
    pdfArquivo: "resolucao-conad-01-2010-marco-ayahuasca.pdf",
    pdfTamanho: "4.2 KB",
    ano: "2026",
    autorOuFonte: "Conselho Nacional de Políticas sobre Drogas & Assessoria Jurídica Nativaram",
    resumo:
      "Apresentação comentada e sistemática da Resolução nº 01 do CONAD, publicada em 25 de janeiro de 2010. O documento analisa os artigos normativos, os princípios de autodisciplina das entidades, a sustentação exclusivamente por rateio de despesas operacionais e as regras de transporte interestadual e aéreo com dossiê documental.",
    principaisDescobertas: [
      "Homologação do Relatório Final do Grupo Multidisciplinar de Trabalho (GMT) que legitimou o uso cerimonial.",
      "Vedações expressas: mercantilização, lucro, turismo espiritual e propaganda terapêutica enganosa.",
      "Sustentação dos templos por rateio solidário de custos operacionais e de logística.",
      "Cadeia de custódia e documentação probatória mandatória para remessas aéreas e interestaduais.",
    ],
    referenciasAcademicas: [
      "Ministério da Justiça e Segurança Pública — Arquivos Oficiais do CONAD",
      "Ministério Público Federal (MPF) — Procuradoria da República no Acre",
      "Constituição Federal de 1988 (Art. 5º, incisos VI e VIII)",
    ],
    capitulos: [
      {
        titulo: "1. A Legitimidade do Rito Perante o Estado",
        conteudo:
          "A Resolução 01/2010 consagrou a liberdade de crença dos ayahuasqueiros, reconhecendo que a consagração do chá em contexto ritualístico protegido não constitui delito nem uso indevido de drogas, exigindo todavia que as instituições operem com ordem cadastral, atas e responsabilidade pastoral de seus dirigentes.",
      },
    ],
  },
  {
    id: "manifesto-etnociencia",
    titulo: "Manifesto da Etnociência & Sinergia de Saberes",
    subtitulo: "A Ponte entre a Memória Ancestral dos Povos Originários e a Universidade Pública Brasileira",
    categoria: "etnociencia",
    categoriaLabel: "Manifesto & Etnociência",
    pdfArquivo: "sobre nós nativaram.pdf",
    pdfTamanho: "2.651 KB",
    ano: "2026",
    autorOuFonte: "Conselho dos Guardiões da Floresta & Pesquisadores Parceiros",
    resumo:
      "Manifesto epistemológico e cultural sobre a harmonia entre o saber oral dos povos indígenas amazônicos e o método científico contemporâneo. O documento registra a história de 20 anos de vivência com os povos Yawanawá, Huni Kuin, Katukina, Noke Koĩ, Shawãdawa e Apurinã, e a articulação com a UFAC, USP, UFPB e UnB para a salvaguarda da floresta e conservação da Ararajuba.",
    principaisDescobertas: [
      "Diálogo horizontal: a tecnologia e o método científico se curvam com respeito à sabedoria viva da floresta.",
      "Manejo agroflorestal regenerativo no Acre que gera trabalho digno e sustentabilidade econômica para populações tradicionais.",
      "Projetos de Luz: ação cooperativa sem fins lucrativos de acolhimento social e suporte comunitário.",
      "Proteção da fauna ameaçada e conservação dos sítios de nidificação da Ararajuba (Guaruba guarouba).",
    ],
    referenciasAcademicas: [
      "Universidade Federal do Acre (UFAC) — Centro de Filosofia e Ciências Humanas",
      "Universidade de São Paulo (USP) — Instituto de Biociências",
      "Instituto Chico Mendes de Conservação da Biodiversidade (ICMBio)",
    ],
    capitulos: [
      {
        titulo: "1. O Futuro é Ancestral: A Filosofia Nativaram",
        conteudo:
          "Não buscamos subordinar o saber milenar ao crivo da tecnocracia ocidental nem diluir o sagrado em modismos superficiais. Promovemos uma plataforma simétrica de aprendizado mútuo, onde o rigor da fitoquímica garante a segurança e a precisão necessárias para que a sacralidade espiritual floresça em sua máxima plenitude.",
      },
    ],
  },
  {
    id: "documento-institucional-nativaram",
    titulo: "Dossiê Institucional & Salvaguarda dos Povos Originários",
    subtitulo: "Governança Cooperativa, Sustentabilidade Florestal e Parcerias Tradicionais no Acre",
    categoria: "etnociencia",
    categoriaLabel: "Manifesto & Etnociência",
    pdfArquivo: "documento-institucional-nativaram.pdf",
    pdfTamanho: "988 KB",
    ano: "2026",
    autorOuFonte: "Conselho de Administração Cooperativa Nativaram Brasil",
    resumo:
      "Apresentação da arquitetura institucional, estatutária e ética da Nativaram Brasil. Detalha a sustentabilidade socioambiental da cooperativa, o comércio justo com cooperados e famílias da floresta no Acre, a proteção da biodiversidade nativa e a governança transparente do rateio de custos operacionais.",
    principaisDescobertas: [
      "Organização cooperativa sem fins lucrativos registrada e amparada na legislação cooperativista nacional.",
      "Rastreabilidade de 100% das matérias-primas botânicas adquiridas por manejo renovável de floresta em pé.",
      "Apoio a projetos comunitários de agrofloresta e ecovilas sustentáveis no Acre.",
      "Integração contínua com conselhos litúrgicos e comissões deontológicas de templos associados.",
    ],
    referenciasAcademicas: [
      "Organização das Cooperativas Brasileiras (OCB)",
      "Sistema Nacional de Gestão do Patrimônio Genético (SISGEN)",
      "Herbário da Universidade Federal do Acre (UFAC)",
    ],
    capitulos: [
      {
        titulo: "1. A Governança do Cooperativismo Etnobotânico",
        conteudo:
          "A Nativaram opera como uma sociedade cooperativa de apoio mútuo. As decisões e a destinação dos excedentes de rateio são deliberadas em assembleia e reinvestidas na sustentação dos feitores, na estruturação de viveiros agroflorestais e na salvaguarda dos territórios tradicionais.",
      },
    ],
  },
];

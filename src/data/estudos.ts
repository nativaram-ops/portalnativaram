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
      {
        titulo: "4. Taxonomia das Lianas: Variedades de Caapi e Primos Malpighiaceae",
        conteudo:
          "Na bacia amazônica ocidental, a liana Banisteriopsis caapi manifesta etnovariedades consagradas: o Tucunacá (caule liso e espiralado, abundante em THH e Harmina com mínima harmalina, nosso padrão ouro); o Caupuri (caule com nós bulbosos e calosidades circulares em rosário, associado a limpezas telúricas intensas); o Ourinho (casca delgada com tons dourados e nós discretos, suave e de acalento); e o Cipó Preto/Yagé Negro (escuro, rico em taninos e betacarbolinas densas de vigília profunda). Parentes botânicos da mesma família Malpighiaceae incluem a Banisteriopsis muricata (cipó-vermelho de zonas de transição e cerrado) e as lianas do gênero Tetrapterys (T. mucronata e T. methystica), consagradas milenarmente por etnias do Alto Rio Negro e Vaupés (Tukano, Desana, Barasana) em rituais autóctones.",
      },
      {
        titulo: "5. A Folha Rainha: Psychotria viridis e Primas Botânicas",
        conteudo:
          "A fonte de luz da miração é a folha tenra de Psychotria viridis (Rubiaceae), colhida nas primeiras horas da aurora sob preces dedicadas à Rainha da Floresta, antes que a foto-oxidação solar degrade o N,N-DMT estocado nos vacúolos celulares. Sua prima botânica no mesmo gênero, a Psychotria carthagenensis (Samiruka ou Amiruca), comum em várzeas e beiras de igarapés, exibe morfologia foliar similar, porém com teores menores e erráticos de triptaminas, sendo utilizada em certas tradições como moduladora de suavidade. Em contrapartida, a Chaliponga (Diplopterys cabrerana), embora seja uma trepadeira da família Malpighiaceae (família do cipó!), acumula triptaminas nas folhas e é utilizada no Noroeste Amazônico (Colômbia/Equador), mas é categoricamente vetada no padrão Nativaram para preservar a integridade estrita do binômio canônico brasileiro.",
      },
      {
        titulo: "6. Ayahuasca Tradicional Amazônica vs. Anayahuascas",
        conteudo:
          "O termo 'Anahuasca' foi cunhado pelo etnobotânico Jonathan Ott para definir análogos não tradicionais que buscam reproduzir mecanicamente a fórmula [IMAO + DMT] utilizando substitutos exóticos ou laboratoriais. A Nativaram recusa com veemência tais preparações: 1) A Arruda Síria (Peganum harmala) é saturada de Harmalina neurotóxica periférica e desprovida de THH, gerando ataxia motora, tremores severos, sudorese fria e hipotensão abrupta; 2) A casca da raiz de Jurema Preta (Mimosa hostilis) é impregnada de taninos condensados pirogálicos altamente irritantes que causam inflamação gástrica aguda e sobrecarga renal; 3) A combinação caótica de alcaloides estranhos inibe imprevisivelmente as isoenzimas CYP2D6 e CYP1A2 do citocromo P450, elevando o risco de crises hipertensivas e Síndrome Serotoninérgica; e 4) Apenas a Ayahuasca tradicional amazônica (B. caapi + P. viridis) possui respaldo ancestral e salvaguarda legal pela Resolução CONAD nº 01/2010 no Brasil.",
      },
      {
        titulo: "7. Cinética do Feitio: Panos de Menores Micras e Ponto de Apuro",
        conteudo:
          "O processo de cozimento decorre em fogo brando (85°C a 96°C) em tachos de aço inox cirúrgico ao longo de 10 a 14 horas por tacho. A clarificação do líquido extraído é executada exclusivamente através de panos técnicos de menores micras, sem deixar massa vegetal, sedimentos ou qualquer resíduo que não deveria permanecer na bebida. O apuro em tacho de acabamento com agitação compassada por remo de madeira nobre atinge o ponto exato de densidade límpida, tonalidade rubi translúcida, aroma balsâmico e estabilidade físico-química estrita.",
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
    pdfArquivo: "nativaram-catalogo-v4.pdf",
    pdfTamanho: "281 KB",
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
  {
    id: "nativaram-sacred-guide-slide-deck",
    titulo: "Guia Sagrado de Curadoria Etnobotânica (Slide Deck Oficial)",
    subtitulo: "Apresentação Visual das 15 Alquimias de Rapé, Cinzas Nobres e Tradições da Floresta gerada no Google NotebookLM",
    categoria: "rapes",
    categoriaLabel: "Rapés Sagrados • Slide Deck",
    pdfArquivo: "nativaram-sacred-guide-slide-deck.pdf",
    pdfTamanho: "13.5 MB",
    ano: "2026",
    autorOuFonte: "Google NotebookLM • Caderno Rapés Indígenas Nativaram",
    resumo:
      "Apresentação visual completa em alta resolução gerada no Google NotebookLM a partir do cruzamento de mais de 200 fontes botânicas, compêndios fitoquímicos e saberes dos povos originários do Acre. Abrange os arquétipos fitoenergéticos das 15 essências de rapé sagrado, o papel de tamponamento das cinzas de Tsunu e Cumaru, e as diretrizes de consagração e aterramento.",
    principaisDescobertas: [
      "Catalogação iconográfica das 15 alquimias de rapé sagrado da Nativaram Brasil com perfis sensoriais detalhados.",
      "Mecanismo fitoquímico da alcalinização transmucosa via cinzas de Tsunu, elevando o pH e convertendo a nicotina ativa em base livre.",
      "Termodinâmica da calcinação tradicional que garante a neutralização de quaisquer compostos termoestáveis visionários.",
      "Orientações rituais com os instrumentos de poder (Kuripe e Tepi) sob frequência harmônica de 432Hz.",
    ],
    referenciasAcademicas: [
      "Google NotebookLM — Caderno Rapés Indígenas (215 fontes catalogadas)",
      "Herbário da Universidade Federal do Acre (UFAC) — Acervo de Botânica Tradicional",
      "Journal of Ethnopharmacology — Chemistry and Pharmacodynamics of Amazonian Snuffs",
    ],
    capitulos: [
      {
        titulo: "1. Arquitetura da Apresentação Visual",
        conteudo:
          "O Slide Deck sintetiza os módulos fundamentais da herança botânica dos rapés tradicionais, organizando em lâminas visuais a botânica de Nicotiana rustica, as cinzas medicinais de Tsunu, Cumaru e Mulateiro, os compostos fitoenergéticos e os princípios éticos da aliança com os povos Yawanawá e Huni Kuin.",
      },
      {
        titulo: "2. Consagração e Aterramento Telúrico",
        conteudo:
          "Explora o simbolismo do sopro como oração ativa e instrumento de silenciamento mental, recomendando o preparo do ambiente com intenção focada e música harmônica orgânica afinada em 432Hz.",
      },
    ],
  },
  {
    id: "nativaram-ethnobotanical-manifesto-slide-deck",
    titulo: "Manifesto Etnobotânico & Povos Originários (Slide Deck Oficial)",
    subtitulo: "Apresentação Visual sobre a Aliança entre Tradição da Floresta e Ciência Moderna gerada no Google NotebookLM",
    categoria: "etnociencia",
    categoriaLabel: "Manifesto & Etnociência",
    pdfArquivo: "nativaram-ethnobotanical-manifesto-slide-deck.pdf",
    pdfTamanho: "18.9 MB",
    ano: "2026",
    autorOuFonte: "Google NotebookLM • Caderno Etnociência Nativaram",
    resumo:
      "Apresentação visual institucional estruturada pelo Google NotebookLM a partir dos manuscritos históricos, estatutos e manifestos epistêmicos da Nativaram Brasil. Detalha a simetria entre o conhecimento oral milenar dos pajés amazônicos e os métodos contemporâneos de fitoquímica, destacando a preservação da fauna e dos territórios sagrados.",
    principaisDescobertas: [
      "Diálogo simétrico de saberes: validação recíproca entre a memória viva da mata e a cromatografia laboratorial.",
      "Cadeia de valor agroflorestal no Acre com remuneração justa para famílias extrativistas e feitores credenciados.",
      "Salvaguarda dos ecossistemas de nidificação da Ararajuba (Guaruba guarouba) e espécies nativas ameaçadas.",
      "Doutrina de transparência cooperativa sob o regime de rateio de despesas operacionais da Resolução CONAD 01/2010.",
    ],
    referenciasAcademicas: [
      "Google NotebookLM — Caderno Etnociência e Assessoria Nativaram",
      "Universidade de São Paulo (USP) — Instituto de Biociências",
      "Universidade Federal do Acre (UFAC) — Centro de Filosofia e Ciências Humanas",
    ],
    capitulos: [
      {
        titulo: "1. O Futuro é Ancestral",
        conteudo:
          "O manifesto visual reafirma que a tecnologia mais avançada do planeta reside nos ecossistemas e na memória das populações originárias. A cooperativa atua como guardiã desse legado, viabilizando sua permanência íntegra e imune à mercantilização predatória.",
      },
    ],
  },
  {
    id: "rapes-sagrados-floresta-e-ciencia",
    titulo: "Rapés Sagrados: Essências Entre a Floresta e a Ciência",
    subtitulo: "Tratado Etnobotânico Completo de 25 Páginas: Taxonomia, Sabedoria dos Pajés e Mecanismos Farmacológicos",
    categoria: "rapes",
    categoriaLabel: "Rapés Sagrados • Dossiê",
    pdfArquivo: "nativaram-rapes-sagrados-floresta-e-ciencia.pdf",
    pdfTamanho: "88 KB (25 Páginas)",
    ano: "2026",
    autorOuFonte: "Conselho Etnobotânico Nativaram & Tradições Yawanawá, Huni Kuin e Katukina",
    resumo:
      "Obra magna de referência sobre os rapés sagrados, integrando a sabedoria dos mestres indígenas do Acre aos estudos acadêmicos internacionais. Examina a fisiologia da absorção nasal sem combustão, a fitoquímica da Nicotiana rustica orgânica, a biogeoquímica das cinzas de cascas nobres e as fichas descritivas detalhadas das principais essências tradicionais.",
    principaisDescobertas: [
      "Compêndio abrangente de 25 páginas cobrindo botânica, etnofarmacologia, cosmologia e protocolos de aplicação.",
      "Análise físico-química da liberação transmucosa por tamponamento de pH (9,75 a 10,20) que evita a inalação de fumaça ou alcatrão.",
      "Caracterização dos alcaloides e princípios ativos termoestáveis em madeiras sagradas (ácido ursólico, lapachol, teobromina, eugenol).",
      "Rastreabilidade completa com cadastro no SisGen e apoio comunitário direto aos povos guardiões.",
    ],
    referenciasAcademicas: [
      "Conselho Etnobotânico Nativaram Brasil — Caderno Oficial NotebookLM (59.000 caracteres de documentação)",
      "Universidade Federal da Paraíba (UFPB) — Departamento de Ciências Farmacêuticas",
      "Universidade Federal do Acre (UFAC) — Etnofarmacologia e Produtos Naturais",
    ],
    capitulos: [
      {
        titulo: "1. Raízes Ancestrais e Resistência Cultural",
        conteudo:
          "O documento estabelece que o rapé sagrado é um patrimônio imaterial milenar de resistência dos povos da floresta. Longe de ser um produto comercial vulgar, é um preparado ritual de sintonização, oração ativa e harmonia sensorial.",
      },
      {
        titulo: "2. A Alquimia Fitoquímica das Essências",
        conteudo:
          "Apresenta o estudo detalhado das essências de Tsunu, Cumaru, Murici, Cacau, Canela de Velho, Jurema Preta e 7 Ervas, relacionando o perfil aromático, a família botânica e o alinhamento com os centros sutis de presença.",
      },
    ],
  },
  {
    id: "feitio-purista-ayahuasca",
    titulo: "Ciência do Feitio Purista da Ayahuasca & Variedades de Banisteriopsis",
    subtitulo: "Farmacogenômica Comparativa, Ausência de Espasmos Motores e Rastreabilidade do Cipó Tucunacá",
    categoria: "ayahuasca",
    categoriaLabel: "Ayahuasca & Feitio",
    pdfArquivo: "nativaram-estudo-feitio-purista-ayahuasca.pdf",
    pdfTamanho: "38 KB (10 Páginas)",
    ano: "2026",
    autorOuFonte: "Caderno NotebookLM Ayahuasca • Pesquisadores e Feitores do Acre",
    resumo:
      "Dossiê técnico detalhado de 10 páginas sobre a ciência do feitio purista em Cruzeiro do Sul e Tarauacá. Compara o perfil fitoquímico do Cipó Tucunacá (Banisteriopsis caapi var. Tucunaca) em relação ao Caupuri, demonstrando a estabilidade da inibição da MAO-A pela Harmina e THH, a mitigação de quedas hipotensivas abruptas e a pureza botânica sem aditivos exógenos.",
    principaisDescobertas: [
      "Concentração equilibrada de Harmina (9,21 mg/g) e THH (4,20 mg/g) com índice residual ínfimo de Harmalina (0,65 mg/g).",
      "Eliminação de espasmos motores severos e tremores musculares observados na variedade Caupuri de nós espessos.",
      "Preservação da homeostase enzimática hepática evitando sobrecargas no citocromo P450 (CYP2D6 e CYP1A2).",
      "Fundamentação deontológica sob as diretrizes do Conselho Nacional de Políticas sobre Drogas (CONAD 01/2010).",
    ],
    referenciasAcademicas: [
      "Universidade Federal do Acre (UFAC) — Centro de Ciências Biológicas e da Natureza",
      "Caderno NotebookLM Ayahuasca (179 fontes catalogadas)",
      "Journal of Ethnopharmacology (McKenna et al., Callaway et al.)",
    ],
    capitulos: [
      {
        titulo: "1. O Purismo Botânico Estrito",
        conteudo:
          "A decocção exclusiva de Banisteriopsis caapi com Psychotria viridis sem introdução de plantas aditivas garante previsibilidade farmacocinética e segurança integrativa absoluta para as congregações religiosas.",
      },
      {
        titulo: "2. Fitoquímica e Serenidade Cerimonial",
        conteudo:
          "Demonstra que o equilíbrio alcaloídico do Tucunacá proporciona um estado de recolhimento límpido, permitindo que a meditação espiritual e os hinos fluam sem sobrecarga somática.",
      },
    ],
  },
  {
    id: "relatorio-assessoria-governanca",
    titulo: "Manual Unificado de Governança, Compliance e Conformidade Algorítmica",
    subtitulo: "Diretrizes RDC ANVISA 2025/2026, Engenharia de Linguagem, Barreira do Pronome e Protocolo CAPI",
    categoria: "compliance",
    categoriaLabel: "Governança & Compliance",
    pdfArquivo: "nativaram-relatorio-assessoria-governanca.pdf",
    pdfTamanho: "13.3 KB (3 Páginas)",
    ano: "2026",
    autorOuFonte: "Assessoria Jurídica Nativaram Brasil • Caderno NotebookLM",
    resumo:
      "Documento normativo mestre de governança para 2026 estruturado pelo NotebookLM. Sintetiza a blindagem regulatória da cooperativa frente às resoluções sanitárias da ANVISA, a vedação absoluta de e-commerce e mercantilização da Ayahuasca, o checklist preventivo de comunicação, a evasão de termos biomédicos e a governança de dados sensíveis sob o protocolo Server-to-Server CAPI.",
    principaisDescobertas: [
      "Conformidade rigorosa com a Resolução Sanitária de 28/01/2025 e RDCs 951/2024 e 907/2024 da ANVISA.",
      "Dicionário mestre de engenharia de linguagem: substituição mandatória de termos do cluster médico por termos etnobotânicos e de bem-estar.",
      "Regra da Barreira do Pronome para prevenir flagging algorítmico em plataformas digitais.",
      "Migração obrigatória para Server-to-Server CAPI respeitando o direito à privacidade e LGPD.",
    ],
    referenciasAcademicas: [
      "Google NotebookLM — Caderno Assessoria Nativaram (189 fontes catalogadas)",
      "Agência Nacional de Vigilância Sanitária (ANVISA) — Marco de Janeiro de 2025",
      "Conselho Nacional de Autorregulamentação Publicitária (CONAR)",
    ],
    capitulos: [
      {
        titulo: "1. Blindagem Regulatória e Sanitária",
        conteudo:
          "A preservação da cooperativa assenta-se na renúncia explícita a qualquer alegação terapêutica clínica. O portal e os documentos operam no campo da valorização cultural, etnobotânica e apoio logístico ritual.",
      },
      {
        titulo: "2. Engenharia de Linguagem Preventiva",
        conteudo:
          "A adoção de termos como 'harmonização sensorial', 'alquimia botânica' e 'sacramento' protege o projeto contra penalidades administrativas e suspensão de registros digitais.",
      },
    ],
  },
];

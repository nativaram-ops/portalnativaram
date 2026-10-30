/**
 * Base de Conhecimento e Dados da Assessoria Litúrgica — Portal do Dirigente
 * Cooperativa Nativaram
 *
 * Fontes Oficiais do Caderno de Segurança (Google NotebookLM - 222 fontes + Protocolo Clínico de Medicamentos Controlados):
 * - Resolução CONAD nº 01/2010 (Diretrizes para o Uso Religioso da Ayahuasca)
 * - Constituição Federal de 1988 (Art. 5º, VI e VIII; Art. 215 e 216)
 * - Lei Federal nº 11.343/2006 (Art. 2º, parágrafo único)
 * - Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)
 * - Lei nº 13.787/2018 e CFM 1.821/2007 (Guarda de prontuários por 20 anos)
 * - Compêndio Etnofarmacológico, Tabela Oficial de Medicamentos Controlados, Hunter Toxicity Criteria e Zendo Project
 */

export type DiretrizOperacionalPdf =
  | "NAO_PODE_PARTICIPAR"
  | "CASO_CLINICO_NAO_RECOMENDADO"
  | "INTERROMPER_DIAS_ANTES"
  | "NAO_TOMAR_NO_DIA";

export interface InteracaoMedicamentosa {
  id: string;
  classeNumero: number;
  classeFarmacologica: string;
  principioAtivo: string;
  nomesComerciais: string[];
  nivelRisco: "LETAL_ABSOLUTO" | "SEVERO_MODERADO" | "COMPATIVEL_MONITORADO";
  diretrizPdf?: DiretrizOperacionalPdf;
  mecanismo: string;
  viasMetabolicas: string;
  meiaVida: string;
  washoutMinimo: string;
  recomendacaoLiturgica: string;
}

export interface FaqDirigenteItem {
  id: string;
  categoria: "CONSERVACAO" | "DOSAGENS" | "JURIDICO_CONAD" | "CONDUCAO_RITUAL";
  pergunta: string;
  resposta: string;
  destaqueConselho?: string;
}

export interface ItemDiluicaoWirapuru {
  volumeInicial10: string;
  aguaEstreilAdicionar: string;
  volumeFinal: string;
  graduacaoObtida: string;
  calicesEstimados60ml: number;
}

/**
 * Nota Canônica de Exceção Clínica — Tratamento de Desintoxicação (Tabela Oficial de Medicamentos Controlados)
 */
export const EXCECAO_DESINTOXICACAO_PDF = {
  titulo: "EXCEÇÃO CLÍNICA: PROTOCOLO DE DESINTOXICAÇÃO E DEPENDÊNCIA QUÍMICA",
  descricao:
    "Em protocolos de desintoxicação (dependência química ou alcoolismo), normalmente é utilizada a associação de vários ansiolíticos, antipsicóticos e até anticonvulsivantes. Nestes casos específicos, o dirigente e o conselho clínico devem analisar o caso individualmente, obrigatoriamente com aval médico formal, acompanhamento transdisciplinar (Projetos de Luz) e redução de danos supervisionada.",
};

/**
 * Matriz Exaustiva das 20 Classes Farmacológicas e 52 Grupos de Princípios Ativos em Interação com Ayahuasca
 * Consolidando integralmente a Tabela Oficial de Medicamentos Controlados + Farmacocinética CYP450 / MAO-A / 5-HT2A
 */
export const INTERACOES_MEDICAMENTOSAS: InteracaoMedicamentosa[] = [
  // ============================================================================
  // CLASSE 1: ANTIPARKINSONIANOS DOPAMINÉRGICOS E IMAO-B (VERMELHO: NÃO PODE PARTICIPAR)
  // ============================================================================
  {
    id: "antiparkinson-levodopa",
    classeNumero: 1,
    classeFarmacologica: "Antiparkinsonianos (Precursores de Dopamina)",
    principioAtivo: "Levodopa (isolada ou + Benserazida / Carbidopa)",
    nomesComerciais: ["Prolopa", "Prolopa BD", "Prolopa HBS", "Sinemet", "Parkidopa", "Cronomet"],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "NAO_PODE_PARTICIPAR",
    mecanismo:
      "A Levodopa é convertida em dopamina e noradrenalina. Com a inibição da MAO-A pelas beta-carbolinas (Harmina/Harmalina), ocorre acúmulo catecolaminérgico agudo, desencadeando crise hipertensiva maligna, taquiarritmias graves, hipertermia, rigidez muscular e alucinações delirantes.",
    viasMetabolicas: "Descarboxilação periférica e central (DDC), metabolização via MAO-A, MAO-B e COMT.",
    meiaVida: "1,5 a 3 horas (efeito farmacodinâmico prolongado).",
    washoutMinimo: "NÃO PODE PARTICIPAR (Uso contínuo vital / Vetado)",
    recomendacaoLiturgica:
      "NÃO PODE PARTICIPAR (Classificação Vermelha). Paciente não deve suspender medicação antiparkinsoniana e está formalmente vetado de comungar Ayahuasca.",
  },
  {
    id: "antiparkinson-selegilina",
    classeNumero: 1,
    classeFarmacologica: "Antiparkinsonianos (Inibidores Irreversíveis da MAO-B)",
    principioAtivo: "Cloridrato de Selegilina / Mesilato de Rasagilina",
    nomesComerciais: ["Niar", "Jumexil", "Deprilan", "Elepril", "Azilect"],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "NAO_PODE_PARTICIPAR",
    mecanismo:
      "Inibidor irreversível de MAO-B que, em associação com os RIMA da Ayahuasca (inibidores de MAO-A), bloqueia simultaneamente ambas as isoformas da monoamina oxidase (MAO-A + MAO-B), gerando choque hipertensivo catecolaminérgico e toxicidade serotoninérgica.",
    viasMetabolicas: "Hepática: CYP2B6, CYP2C19 (gera metabólitos L-anfetamina e L-metanfetamina).",
    meiaVida: "Inibição enzimática irreversível (14 a 28 dias para regeneração).",
    washoutMinimo: "NÃO PODE PARTICIPAR (Vetado / Mínimo 28 dias se suspenso por neurologista)",
    recomendacaoLiturgica:
      "NÃO PODE PARTICIPAR (Classificação Vermelha). Risco cardiovascular e neurológico crítico.",
  },
  {
    id: "antiparkinson-pramipexol-biperideno",
    classeNumero: 1,
    classeFarmacologica: "Antiparkinsonianos (Agonistas Dopaminérgicos e Anticolinérgicos)",
    principioAtivo: "Pramipexol / Biperideno / Amantadina",
    nomesComerciais: ["Sifrol", "Pisa", "Stabil", "Akineton", "Cinetol", "Mantidan"],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "NAO_PODE_PARTICIPAR",
    mecanismo:
      "O Biperideno possui potente ação anticolinérgica central (risco de síndrome anticolinérgica delirante e hipertermia); Pramipexol e Amantadina hiperestimulam vias dopaminérgicas mesolímbicas.",
    viasMetabolicas: "Renal (Pramipexol) e Hepática (Biperideno).",
    meiaVida: "8 a 24 horas.",
    washoutMinimo: "NÃO PODE PARTICIPAR",
    recomendacaoLiturgica: "NÃO PODE PARTICIPAR (Classificação Vermelha).",
  },

  // ============================================================================
  // CLASSE 2: ANTIPSICÓTICOS TÍPICOS - 1ª GERAÇÃO (VERMELHO: NÃO PODE PARTICIPAR)
  // ============================================================================
  {
    id: "antipsicoticos-haloperidol",
    classeNumero: 2,
    classeFarmacologica: "Antipsicóticos Típicos (Butirofenonas - 1ª Geração)",
    principioAtivo: "Haloperidol / Decanoato de Haloperidol",
    nomesComerciais: ["Haldol", "Haldol Decanoato", "Halo", "Uni Haloper"],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "NAO_PODE_PARTICIPAR",
    mecanismo:
      "Antagonista D2 potente metabolizado por CYP2D6 e CYP3A4 (enzimas inibidas pela Harmina/Harmalina). Aumenta o risco de Síndrome Neuroléptica Maligna, distonia laríngea aguda, arritmia por prolongamento QT e surto psicótico dissociativo.",
    viasMetabolicas: "Hepática: CYP2D6, CYP3A4, glicuronidação.",
    meiaVida: "Oral: 14 a 37 horas | Decanoato injetável: 21 dias.",
    washoutMinimo: "NÃO PODE PARTICIPAR (Exclusão definitiva por perfil psiquiátrico)",
    recomendacaoLiturgica:
      "NÃO PODE PARTICIPAR (Classificação Vermelha). Contraindicação absoluta pelo uso do fármaco e pelo diagnóstico de base (CONAD 01/2010).",
  },
  {
    id: "antipsicoticos-fenotiazinicos",
    classeNumero: 2,
    classeFarmacologica: "Antipsicóticos Típicos (Fenotiazínicos)",
    principioAtivo: "Clorpromazina / Levomepromazina / Flufenazina / Trifluoperazina",
    nomesComerciais: ["Amplictil", "Longactil", "Neozine", "Levozine", "Anatensol", "Flufenan", "Stelazine"],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "NAO_PODE_PARTICIPAR",
    mecanismo:
      "Bloqueio dopaminérgico, alfa-adrenérgico e colinérgico severo. A inibição do CYP2D6 pelas beta-carbolinas eleva os níveis séricos das fenotiazinas a patamares cardiotóxicos (hipotensão grave, bloqueio atrioventricular e redução do limiar convulsivo).",
    viasMetabolicas: "Hepática: CYP2D6 (via principal), CYP1A2.",
    meiaVida: "20 a 40 horas (formas depósito: semanas).",
    washoutMinimo: "NÃO PODE PARTICIPAR (Exclusão definitiva)",
    recomendacaoLiturgica:
      "NÃO PODE PARTICIPAR (Classificação Vermelha). Veto absoluto para Amplictil, Neozine, Anatensol e Stelazine.",
  },
  {
    id: "antipsicoticos-pimozida-sulpirida",
    classeNumero: 2,
    classeFarmacologica: "Antipsicóticos Típicos (Difenilbutilpiperidinas e Benzamidas)",
    principioAtivo: "Pimozida / Sulpirida / Zuclopentixol",
    nomesComerciais: ["Orap", "Dogmatil", "Equilid", "Miradol", "Clopixol"],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "NAO_PODE_PARTICIPAR",
    mecanismo:
      "A Pimozida (Orap) sofre forte inibição metabólica via CYP3A4 e CYP2D6 pela Harmina, apresentando altíssimo risco de arritmia ventricular fatal (Torsades de Pointes) e parada cardíaca. Sulpirida (Dogmatil) e Zuclopentixol indicam transtorno psicótico ou neuropsiquiátrico incompatível.",
    viasMetabolicas: "Hepática: CYP3A4, CYP2D6, CYP1A2 (Pimozida) | Renal (Sulpirida).",
    meiaVida: "Pimozida: 55 horas | Sulpirida: 8 a 14 horas.",
    washoutMinimo: "NÃO PODE PARTICIPAR (Exclusão definitiva)",
    recomendacaoLiturgica:
      "NÃO PODE PARTICIPAR (Classificação Vermelha). Veto estrito para Orap e Dogmatil.",
  },

  // ============================================================================
  // CLASSE 3: ANTIPSICÓTICOS ATÍPICOS - 2ª E 3ª GERAÇÃO (VERMELHO: NÃO PODE PARTICIPAR)
  // ============================================================================
  {
    id: "antipsicoticos-risperidona-olanzapina-quetiapina",
    classeNumero: 3,
    classeFarmacologica: "Antipsicóticos Atípicos (2ª Geração)",
    principioAtivo: "Risperidona / Quetiapina / Olanzapina / Paliperidona",
    nomesComerciais: [
      "Risperdal",
      "Zargus",
      "Riss",
      "Viverdal",
      "Seroquel",
      "Queropax",
      "Kitapen",
      "Zyprexa",
      "Zap",
      "Crisapina",
      "Invega",
    ],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "NAO_PODE_PARTICIPAR",
    mecanismo:
      "Antagonistas 5-HT2A e D2. Além de competirem diretamente pelo mesmo receptor 5-HT2A do DMT (causando dissociação caótica ou reação paradoxal), são metabolizados por CYP2D6, CYP3A4 e CYP1A2 (bloqueados pela Harmina/Harmalina), com risco de toxicidade aguda e descompensação psicótica.",
    viasMetabolicas: "Hepática: CYP2D6 e CYP3A4 (Risperidona/Quetiapina), CYP1A2 (Olanzapina).",
    meiaVida: "6 a 50 horas.",
    washoutMinimo: "NÃO PODE PARTICIPAR (Exclusão definitiva)",
    recomendacaoLiturgica:
      "NÃO PODE PARTICIPAR (Classificação Vermelha). Veto absoluto para Risperdal, Zargus, Seroquel e Zyprexa (salvo avaliação médica em protocolo de desintoxicação assistida).",
  },
  {
    id: "antipsicoticos-clozapina-amissulprida-aripiprazol",
    classeNumero: 3,
    classeFarmacologica: "Antipsicóticos Atípicos (Clozapina, Benzamidas e 3ª Geração)",
    principioAtivo: "Clozapina / Amissulprida / Aripiprazol / Ziprasidona / Lurasidona",
    nomesComerciais: ["Leponex", "Pinazan", "Socian", "Abilify", "Aristab", "Confilify", "Geodon", "Latuda"],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "NAO_PODE_PARTICIPAR",
    mecanismo:
      "A Clozapina (Leponex) reduz severamente o limiar convulsivo e é metabolizada por CYP1A2 e CYP3A4 (inibidos pela Ayahuasca), podendo causar convulsões, miocardite e delírio tóxico. Amissulprida (Socian), Aripiprazol e Ziprasidona sinalizam quadros psicóticos ou bipolares incompatíveis.",
    viasMetabolicas: "Hepática: CYP1A2, CYP2D6, CYP3A4.",
    meiaVida: "12 a 75 horas (Aripiprazol: até 94h com metabólito).",
    washoutMinimo: "NÃO PODE PARTICIPAR (Exclusão definitiva)",
    recomendacaoLiturgica:
      "NÃO PODE PARTICIPAR (Classificação Vermelha). Veto absoluto para Leponex, Socian e Abilify/Aristab.",
  },

  // ============================================================================
  // CLASSE 4: ESTABILIZADORES DE HUMOR — LÍTIO (VERMELHO: NÃO PODE PARTICIPAR)
  // ============================================================================
  {
    id: "estabilizador-carbonato-litio",
    classeNumero: 4,
    classeFarmacologica: "Estabilizante de Humor (Sais de Lítio)",
    principioAtivo: "Carbonato de Lítio",
    nomesComerciais: ["Carbolitium", "Carbolitium CR", "Priadel", "Litiocar", "Carlit"],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "NAO_PODE_PARTICIPAR",
    mecanismo:
      "MECANISMO LETAL: O Lítio inibe a enzima inositol monofosfatase (IMPase), depletando o inositol livre neuronal e gerando hipersensibilização extrema dos receptores 5-HT2A. A entrada de DMT e beta-carbolinas deflagra descargas epilépticas corticais maciças ( ~47% de incidência de convulsões tônico-clônicas e Status Epilepticus refratário), além de toxicidade renal aguda agravada pela purga/desidratação.",
    viasMetabolicas: "Exclusivamente Renal (95% inalterado; janela terapêutica estreitíssima).",
    meiaVida: "18 a 36 horas.",
    washoutMinimo: "NÃO PODE PARTICIPAR (Veto absoluto e permanente / mínimo 30 dias se suspenso no passado por psiquiatra)",
    recomendacaoLiturgica:
      "NÃO PODE PARTICIPAR (Classificação Vermelha). Portadores de Transtorno Afetivo Bipolar em uso de Carbolitium ou Priadel estão terminantemente proibidos de consagrar Ayahuasca.",
  },

  // ============================================================================
  // CLASSE 5: ANTICONVULSIVANTES E ANTIEPILÉPTICOS (VERMELHO: NÃO PODE PARTICIPAR)
  // ============================================================================
  {
    id: "anticonvulsivante-valproico",
    classeNumero: 5,
    classeFarmacologica: "Anticonvulsivantes e Moduladores GABAérgicos",
    principioAtivo: "Ácido Valpróico / Valproato de Sódio / Divalproato de Sódio",
    nomesComerciais: ["Depakene", "Depakote", "Depakote ER", "Valpakene", "Torval CR", "Zyvalprex"],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "NAO_PODE_PARTICIPAR",
    mecanismo:
      "A Ayahuasca reduz o limiar convulsivo cortical e produz estímulo autonômico intenso. A associação com Ácido Valpróico/Divalproato envolve competição metabólica hepática, risco de hiperamonemia, encefalopatia e desencadeamento de crises epilépticas ou virada afetiva.",
    viasMetabolicas: "Hepática: Glicuronidação (UGT), beta-oxidação mitocondrial e CYP2C9/CYP2C19.",
    meiaVida: "9 a 16 horas.",
    washoutMinimo: "NÃO PODE PARTICIPAR (Vetado)",
    recomendacaoLiturgica:
      "NÃO PODE PARTICIPAR (Classificação Vermelha). Veto expresso para Depakene, Depakote e Valpakene.",
  },
  {
    id: "anticonvulsivante-carbamazepina-fenitoina",
    classeNumero: 5,
    classeFarmacologica: "Anticonvulsivantes Bloqueadores de Canais de Sódio",
    principioAtivo: "Carbamazepina / Oxcarbazepina / Fenitoína",
    nomesComerciais: ["Tegretol", "Tegretol CR", "Tegretard", "Trileptal", "Hidantal", "Fenital"],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "NAO_PODE_PARTICIPAR",
    mecanismo:
      "A Carbamazepina (Tegretol) possui estrutura tricíclica relacionada aos ADTs e é metabolizada pelo CYP3A4; a Fenitoína (Hidantal) tem cinética saturável via CYP2C9/CYP2C19. A inibição enzimática pelas beta-carbolinas pode causar intoxicação anticonvulsivante aguda (ataxia, nistagmo, bloqueio cardíaco) ou crise convulsiva no salão.",
    viasMetabolicas: "Hepática: CYP3A4 (Carbamazepina), CYP2C9/CYP2C19 (Fenitoína).",
    meiaVida: "Carbamazepina: 12-17h (uso crônico) | Fenitoína: 22h (dependente da dose).",
    washoutMinimo: "NÃO PODE PARTICIPAR (Vetado)",
    recomendacaoLiturgica:
      "NÃO PODE PARTICIPAR (Classificação Vermelha). Veto expresso para Tegretol e Hidantal.",
  },
  {
    id: "anticonvulsivante-fenobarbital-lamotrigina",
    classeNumero: 5,
    classeFarmacologica: "Anticonvulsivantes Barbitúricos e Feniltriazinas",
    principioAtivo: "Fenobarbital / Lamotrigina / Topiramato / Levetiracetam",
    nomesComerciais: ["Gardenal", "Edhanol", "Barbitron", "Lamictal", "Neural", "Lamitor", "Topamax", "Keppra"],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "NAO_PODE_PARTICIPAR",
    mecanismo:
      "O Fenobarbital (Gardenal/Edhanol) é um barbitúrico depressor profundo do SNC com alto risco de depressão respiratória e colapso em sinergia com alcaloides harmala. A Lamotrigina (Lamictal) e o Topiramato indicam epilepsia ou transtorno bipolar em estabilização.",
    viasMetabolicas: "Hepática: CYP2C9, CYP2C19 e UGT1A4.",
    meiaVida: "Fenobarbital: 53 a 118 horas | Lamotrigina: 25 a 33 horas.",
    washoutMinimo: "NÃO PODE PARTICIPAR (Vetado)",
    recomendacaoLiturgica:
      "NÃO PODE PARTICIPAR (Classificação Vermelha). Veto expresso para Gardenal, Edhanol e Lamictal.",
  },

  // ============================================================================
  // CLASSE 6: HIPNÓTICOS NÃO-BENZODIAZEPÍNICOS / DROGAS Z (LARANJA ESCURO: NÃO RECOMENDADO)
  // ============================================================================
  {
    id: "hipnoticos-zolpidem",
    classeNumero: 6,
    classeFarmacologica: "Hipnóticos Indutores de Sono (Drogas Z Não-Benzodiazepínicas)",
    principioAtivo: "Hemitartarato de Zolpidem / Zopiclona / Eszopiclona",
    nomesComerciais: ["Stilnox", "Stilnox CR", "Patz", "Turno", "Lioram", "Imovane", "Neuropax", "Prysma", "Ezonia"],
    nivelRisco: "SEVERO_MODERADO",
    diretrizPdf: "CASO_CLINICO_NAO_RECOMENDADO",
    mecanismo:
      "Agonista seletivo da subunidade alfa-1 do receptor GABA-A. Na tabela clínica de referência, o uso contínuo configura CASO CLÍNICO NÃO RECOMENDADO. A associação com Ayahuasca (ou o uso logo após o rito para forçar o sono) provoca parassonias graves, sonambulismo agitado, amnésia anterógrada, alucinações hipnagógicas delirantes e perda do controle motor.",
    viasMetabolicas: "Hepática: CYP3A4 (principal), CYP2C9, CYP1A2.",
    meiaVida: "2,5 a 3 horas (formas CR: 6 a 8 horas).",
    washoutMinimo: "Caso clínico NÃO recomendado (Mínimo absoluto de 48h a 72h sem uso se liberado por médico)",
    recomendacaoLiturgica:
      "CASO CLÍNICO NÃO RECOMENDADO (Classificação Laranja Escuro). Jamais permitir que o participante tome Stilnox/Zolpidem na véspera, no dia ou ao término da sessão.",
  },

  // ============================================================================
  // CLASSE 7: ANSIOLÍTICOS BENZODIAZEPÍNICOS E AZAPIRONAS (LARANJA: NÃO TOMAR NO DIA)
  // ============================================================================
  {
    id: "ansioliticos-alprazolam-bromazepam",
    classeNumero: 7,
    classeFarmacologica: "Ansiolíticos Benzodiazepínicos de Curta/Média Ação",
    principioAtivo: "Alprazolam / Bromazepam",
    nomesComerciais: ["Frontal", "Frontal XR", "Apraz", "Altrox", "Lexotan", "Somalium", "Deptran"],
    nivelRisco: "COMPATIVEL_MONITORADO",
    diretrizPdf: "NAO_TOMAR_NO_DIA",
    mecanismo:
      "Moduladores alostéricos positivos GABA-A metabolizados pelo CYP3A4 (enzima inibida pela Harmina). Se tomados no dia da sessão, causam sedação excessiva, ataxia (risco de queda no salão), amnésia e bloqueio da vivência integrativa. Atenção: não suspender abruptamente por semanas se houver dependência física (risco de abstinência); a diretriz operacional é NÃO TOMAR NO DIA.",
    viasMetabolicas: "Hepática: CYP3A4.",
    meiaVida: "Alprazolam: 11-15h | Bromazepam: 12-20h.",
    washoutMinimo: "NÃO TOMAR NO DIA (Intervalo de 24h antes e 24h após a cerimônia)",
    recomendacaoLiturgica:
      "NÃO TOMAR NO DIA (Classificação Laranja). Orientar o participante a não ingerir Frontal, Apraz, Altrox, Lexotan ou Somalium nas 24h do rito.",
  },
  {
    id: "ansioliticos-clonazepam-diazepam",
    classeNumero: 7,
    classeFarmacologica: "Ansiolíticos Benzodiazepínicos de Longa Ação",
    principioAtivo: "Clonazepam / Diazepam",
    nomesComerciais: [
      "Rivotril",
      "Clonotril",
      "Navotrax",
      "Zilepam",
      "Valium",
      "Ansilive",
      "Compaz",
      "Dienpax",
      "Noan",
    ],
    nivelRisco: "COMPATIVEL_MONITORADO",
    diretrizPdf: "NAO_TOMAR_NO_DIA",
    mecanismo:
      "Deprimem o SNC via potencialização GABAérgica. Nota clínica crucial: verificar se o uso do Rivotril/Valium é para ansiedade/insônia (regra: NÃO TOMAR NO DIA) ou para Epilepsia/Convulsão (regra: NÃO PODE PARTICIPAR). Jamais exigir suspensão abrupta prolongada de altas doses de Rivotril pelo risco de crise convulsiva de abstinência.",
    viasMetabolicas: "Hepática: CYP3A4, CYP2C19.",
    meiaVida: "Clonazepam: 30-40h | Diazepam: 20-50h (Nordiazepam: até 100h).",
    washoutMinimo: "NÃO TOMAR NO DIA (Se uso ansiolítico leve/moderado: suspender nas 24h do dia do rito)",
    recomendacaoLiturgica:
      "NÃO TOMAR NO DIA (Classificação Laranja) para quadros de ansiedade/sono. Se o uso for anticonvulsivante, aplica-se veto absoluto.",
  },
  {
    id: "ansioliticos-lorazepam-clobazam-cloxazolam-flunitrazepam",
    classeNumero: 7,
    classeFarmacologica: "Ansiolíticos Benzodiazepínicos Diversos e Hipnóticos",
    principioAtivo: "Lorazepam / Clobazam / Cloxazolam / Flunitrazepam / Midazolam",
    nomesComerciais: [
      "Lorax",
      "Ansilor",
      "Lorenin",
      "Loserdal",
      "Max-pax",
      "Mesmerin",
      "Ativan",
      "Temesta",
      "Tavor",
      "Frizium",
      "Urbanil",
      "Clozal",
      "Elum",
      "Olcadil",
      "Rohypnol",
      "Dormonid",
    ],
    nivelRisco: "COMPATIVEL_MONITORADO",
    diretrizPdf: "NAO_TOMAR_NO_DIA",
    mecanismo:
      "Potencialização GABA-A com risco de depressão psicomotora, hipotensão ortostática, confusão mental e embotamento da consciência durante o trabalho espiritual.",
    viasMetabolicas: "Hepática: Glicuronidação direta (Lorazepam) ou CYP3A4/CYP2C19.",
    meiaVida: "10 a 40 horas.",
    washoutMinimo: "NÃO TOMAR NO DIA (Intervalo mínimo de 24h a 48h)",
    recomendacaoLiturgica:
      "NÃO TOMAR NO DIA (Classificação Laranja). Atenção redobrada a idosos pelo risco de tontura e queda.",
  },
  {
    id: "ansioliticos-clordiazepoxido-limbitrol",
    classeNumero: 7,
    classeFarmacologica: "Ansiolíticos Benzodiazepínicos e Associações (Alerta Limbitrol)",
    principioAtivo: "Clordiazepóxido (Isolado vs. Associado à Amitriptilina)",
    nomesComerciais: ["Psicosedim", "Menotensil", "Limbitrol (CONTÉM AMITRIPTILINA!)"],
    nivelRisco: "SEVERO_MODERADO",
    diretrizPdf: "NAO_TOMAR_NO_DIA",
    mecanismo:
      "O Clordiazepóxido isolado (Psicosedim, Menotensil) é um benzodiazepínico clássico (Não tomar no dia). CONTUDO, o medicamento comercial LIMBITROL contém Clordiazepóxido + Cloridrato de Amitriptilina (Antidepressivo Tricíclico), exigindo interrupção semanas antes pelo risco de Síndrome Serotoninérgica e arritmia!",
    viasMetabolicas: "Hepática: CYP3A4 (Clordiazepóxido) e CYP2D6 (Amitriptilina).",
    meiaVida: "5 a 30 horas (metabólito desmetildiazepam: até 100h).",
    washoutMinimo: "Clordiazepóxido isolado: NÃO TOMAR NO DIA | Limbitrol (com Amitriptilina): 21 dias de washout!",
    recomendacaoLiturgica:
      "Conferir a caixa do medicamento: se for Limbitrol, tratar como Antidepressivo Tricíclico (suspensão médica de 21 dias). Se for Clordiazepóxido isolado, não tomar no dia.",
  },
  {
    id: "ansioliticos-buspirona",
    classeNumero: 7,
    classeFarmacologica: "Ansiolíticos Azapironas (Agonistas Serotoninérgicos 5-HT1A)",
    principioAtivo: "Cloridrato de Buspirona",
    nomesComerciais: ["Ansitec", "Ansienon", "Buspar", "Buspanil"],
    nivelRisco: "SEVERO_MODERADO",
    diretrizPdf: "NAO_TOMAR_NO_DIA",
    mecanismo:
      "Diferente dos benzodiazepínicos, a Buspirona atua como agonista parcial dos receptores de serotonina 5-HT1A (mesmo subtipo modulado pelo DMT) e é metabolizada pelo CYP3A4. O uso no mesmo dia da Ayahuasca pode gerar disforia, tontura intensa, parestesias e sobrecarga serotoninérgica leve a moderada.",
    viasMetabolicas: "Hepática: CYP3A4 (sofre forte efeito de primeira passagem).",
    meiaVida: "2 a 4 horas (metabólito 1-PP: 6 horas).",
    washoutMinimo: "NÃO TOMAR NO DIA (Recomendado suspender 48h a 72h antes da sessão)",
    recomendacaoLiturgica:
      "NÃO TOMAR NO DIA (Classificação Laranja). Idealmente manter pausa de 48h a 72h antes do trabalho.",
  },

  // ============================================================================
  // CLASSE 8: ANTIDEPRESSIVOS ISRS (AZUL: INTERROMPER DIAS ANTES / WASHOUT)
  // ============================================================================
  {
    id: "isrs-fluoxetina",
    classeNumero: 8,
    classeFarmacologica: "Antidepressivos ISRS (Meia-Vida Ultra-Longa)",
    principioAtivo: "Cloridrato de Fluoxetina",
    nomesComerciais: [
      "Prozac",
      "Verotina",
      "Daforin",
      "Deprax",
      "Lovan",
      "Prozen",
      "Sarafem",
      "Selectus",
      "Symbyax (Fluoxetina + Olanzapina)",
      "Eufor",
      "Fluxene",
    ],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "INTERROMPER_DIAS_ANTES",
    mecanismo:
      "Bloqueio potente de SERT somado à inibição da MAO-A pela Harmina/Harmalina e à ação da THH. A Fluoxetina e seu metabólito ativo Norfluoxetina inibem potentemente o CYP2D6 e permanecem no organismo por semanas, causando Síndrome Serotoninérgica fulminante mesmo 2 ou 3 semanas após parar o comprimido! Atenção: Symbyax associa Fluoxetina + Olanzapina (antipsicótico).",
    viasMetabolicas: "Hepática: CYP2D6 (autoinibição potente), CYP2C9, CYP3A4.",
    meiaVida: "Fluoxetina: 1 a 4 dias | Norfluoxetina (metabólito ativo): 7 a 15 dias!",
    washoutMinimo: "35 a 45 dias (5 a 6 semanas completas sob supervisão médica)",
    recomendacaoLiturgica:
      "INTERROMPER DIAS ANTES COM AVAL MÉDICO (Classificação Azul / Risco Letal se em uso). Exige o maior tempo de washout da farmacologia (mínimo de 5 a 6 semanas).",
  },
  {
    id: "isrs-sertralina",
    classeNumero: 8,
    classeFarmacologica: "Antidepressivos ISRS (Inibidores Seletivos da Recaptação de Serotonina)",
    principioAtivo: "Cloridrato de Sertralina",
    nomesComerciais: ["Zoloft", "Sercerin", "Novativ", "Tolrest", "Serenata", "Assert", "Dieloft"],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "INTERROMPER_DIAS_ANTES",
    mecanismo:
      "Inibição potente do transportador SERT. Em associação com as beta-carbolinas do Mariri (RIMA), impede tanto a recaptação quanto a degradação enzimática da serotonina, provocando Síndrome Serotoninérgica (clônus, hiperreflexia, hipertermia >38,5°C e colapso autonômico).",
    viasMetabolicas: "Hepática: CYP2B6, CYP2C19, CYP2D6, CYP3A4.",
    meiaVida: "26 horas (Desmetilsertralina: 62 a 104 horas).",
    washoutMinimo: "14 a 21 dias (2 a 3 semanas completas sob desmame médico)",
    recomendacaoLiturgica:
      "INTERROMPER DIAS ANTES COM AVAL MÉDICO (Classificação Azul). Participação vetada durante o uso ativo.",
  },
  {
    id: "isrs-escitalopram-citalopram",
    classeNumero: 8,
    classeFarmacologica: "Antidepressivos ISRS (Alta Seletividade Serotoninérgica)",
    principioAtivo: "Oxalato de Escitalopram / Bromidrato de Citalopram",
    nomesComerciais: [
      "Cipralex",
      "Lexapro",
      "Exodus",
      "Reconter",
      "Espran",
      "Cipramil",
      "Procimax",
      "Città",
      "Denyl",
      "Alcytam",
    ],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "INTERROMPER_DIAS_ANTES",
    mecanismo:
      "ISRS de altíssima seletividade para o SERT, além de apresentarem risco dose-dependente de prolongamento do intervalo QT no eletrocardiograma (arritmia ventricular potencializada pela inibição de CYP2C19/CYP3A4 e pela sobrecarga serotoninérgica).",
    viasMetabolicas: "Hepática: CYP2C19, CYP3A4, CYP2D6.",
    meiaVida: "Escitalopram: 27-32h | Citalopram: 35h.",
    washoutMinimo: "14 a 21 dias (2 a 3 semanas completas sob desmame médico)",
    recomendacaoLiturgica:
      "INTERROMPER DIAS ANTES COM AVAL MÉDICO (Classificação Azul). Contraindicação absoluta durante o uso ativo.",
  },
  {
    id: "isrs-paroxetina-fluvoxamina",
    classeNumero: 8,
    classeFarmacologica: "Antidepressivos ISRS (Inibidores Potentes de CYP2D6 / CYP1A2)",
    principioAtivo: "Cloridrato de Paroxetina / Maleato de Fluvoxamina",
    nomesComerciais: ["Pondera", "Aropax", "Cebrilin", "Moratus", "Roxetin", "Dumyrox", "Luvox", "Revoc"],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "INTERROMPER_DIAS_ANTES",
    mecanismo:
      "A Paroxetina (Pondera/Aropax) é o mais potente inibidor de SERT e de CYP2D6; a Fluvoxamina (Dumyrox/Luvox) é um potente inibidor de CYP1A2 e CYP2C19 (bloqueando a metabolização da própria Harmina e gerando toxicidade dupla: serotoninérgica e por alcaloides harmala).",
    viasMetabolicas: "Hepática: CYP2D6 (Paroxetina) | CYP1A2 e CYP2D6 (Fluvoxamina).",
    meiaVida: "Paroxetina: 21h | Fluvoxamina: 15-22h.",
    washoutMinimo: "14 a 21 dias (2 a 3 semanas completas sob supervisão médica)",
    recomendacaoLiturgica:
      "INTERROMPER DIAS ANTES COM AVAL MÉDICO (Classificação Azul). Atenção à síndrome de descontinuação da Paroxetina (desmame deve ser lento e médico).",
  },

  // ============================================================================
  // CLASSE 9: ANTIDEPRESSIVOS DUAIS - ISRSN (AZUL: INTERROMPER DIAS ANTES)
  // ============================================================================
  {
    id: "isrsn-venlafaxina-desvenlafaxina-duloxetina",
    classeNumero: 9,
    classeFarmacologica: "Antidepressivos Duais ISRSN (Serotonina e Noradrenalina)",
    principioAtivo: "Venlafaxina / Desvenlafaxina / Duloxetina",
    nomesComerciais: [
      "Efexor",
      "Efexor XR",
      "Alenthus XR",
      "Venlift OD",
      "Venlax",
      "Pristiq",
      "Elifore",
      "Deller",
      "Zysal",
      "Cymbalta",
      "Velija",
      "Dual",
      "Cymbi",
    ],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "INTERROMPER_DIAS_ANTES",
    mecanismo:
      "Bloqueio duplo de SERT (serotonina) e NET (noradrenalina). A combinação com os RIMA da Ayahuasca deflagra tanto Síndrome Serotoninérgica quanto Crise Hipertensiva Adrenérgica Severa (PA > 180/120 mmHg, cefaleia em trovoada, hipertermia e rabdomiólise).",
    viasMetabolicas: "Hepática: CYP2D6, CYP3A4 e CYP1A2 (Duloxetina).",
    meiaVida: "Venlafaxina + ODV: 11-13h | Duloxetina: 12-17h.",
    washoutMinimo: "14 a 21 dias (2 a 3 semanas completas sob supervisão médica)",
    recomendacaoLiturgica:
      "INTERROMPER DIAS ANTES COM AVAL MÉDICO (Classificação Azul). Jamais suspender Venlafaxina/Pristiq abruptamente sem acompanhamento médico devido ao forte rebote.",
  },

  // ============================================================================
  // CLASSE 10: ANTIDEPRESSIVOS TRICÍCLICOS E TETRACÍCLICOS (AZUL: INTERROMPER DIAS ANTES)
  // ============================================================================
  {
    id: "triciclicos-amitriptilina-clomipramina-imipramina-nortriptilina-maprotilina",
    classeNumero: 10,
    classeFarmacologica: "Antidepressivos Tricíclicos (ADTs) e Tetracíclicos",
    principioAtivo: "Amitriptilina / Clomipramina / Imipramina / Nortriptilina / Maprotilina",
    nomesComerciais: [
      "Tryptanol",
      "Amytril",
      "Protanol",
      "Anafranil",
      "Clo",
      "Tofranil",
      "Nortelor",
      "Pamelor",
      "Ludiomil",
    ],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "INTERROMPER_DIAS_ANTES",
    mecanismo:
      "A Clomipramina (Anafranil/Clo), Amitriptilina (Tryptanol/Amytril) e Imipramina (Tofranil) bloqueiam potentemente a recaptação de serotonina e noradrenalina, além de bloquearem canais de sódio cardíacos. Como são metabolizados pelo CYP2D6 (inibido pela Harmina), seus níveis plasmáticos disparam, causando Síndrome Serotoninérgica letal, convulsões (especialmente Maprotilina/Ludiomil) e arritmias cardíacas fatais. (Atenção também ao uso de Amitriptilina em doses baixas para enxaqueca ou fibromialgia!).",
    viasMetabolicas: "Hepática: CYP2D6 (via crítica), CYP1A2, CYP2C19, CYP3A4.",
    meiaVida: "Amitriptilina: 10-26h | Nortriptilina: 18-44h | Clomipramina: 20-40h | Maprotilina: 27-58h.",
    washoutMinimo: "21 dias (3 semanas completas sob supervisão médica)",
    recomendacaoLiturgica:
      "INTERROMPER DIAS ANTES COM AVAL MÉDICO (Classificação Azul). Mesmo doses baixas de Amitriptilina (10mg/25mg para dor ou sono) exigem suspensão prévia!",
  },

  // ============================================================================
  // CLASSE 11: ANTIDEPRESSIVOS ATÍPICOS E MODULADORES (AZUL: INTERROMPER DIAS ANTES)
  // ============================================================================
  {
    id: "atipicos-bupropiona-mirtazapina-trazodona-reboxetina-tianeptina-vortioxetina",
    classeNumero: 11,
    classeFarmacologica: "Antidepressivos Atípicos, Moduladores e IRND/IRN",
    principioAtivo: "Bupropiona / Mirtazapina / Trazodona / Reboxetina / Tianeptina / Vortioxetina / Agomelatina",
    nomesComerciais: [
      "Zyban",
      "Bup",
      "Wellbutrin XL",
      "Zetron",
      "Remeron",
      "Razapina",
      "Triticum",
      "Donaren",
      "Loredon",
      "Edronax",
      "Prolift",
      "Stablon",
      "Brintellix",
      "Valdoxan",
    ],
    nivelRisco: "SEVERO_MODERADO",
    diretrizPdf: "INTERROMPER_DIAS_ANTES",
    mecanismo:
      "Bupropiona (Zyban/Bup) inibe CYP2D6, eleva dopamina/noradrenalina e reduz drasticamente o limiar convulsivo. Vortioxetina (Brintellix) e Trazodona (Donaren/Triticum) modulam múltiplos receptores 5-HT e SERT (risco serotoninérgico). Reboxetina (Edronax/Prolift) eleva noradrenalina (risco hipertensivo). Mirtazapina (Remeron) e Tianeptina (Stablon) exigem washout para evitar sobrecarga monoaminérgica.",
    viasMetabolicas: "Hepática: CYP2B6, CYP2D6, CYP3A4, CYP1A2.",
    meiaVida: "Trazodona: 7-12h | Bupropiona: 20-37h | Mirtazapina: 20-40h | Vortioxetina: 57-66h.",
    washoutMinimo: "14 a 21 dias (Vortioxetina exige 21 a 28 dias devido à meia-vida longa de 66h)",
    recomendacaoLiturgica:
      "INTERROMPER DIAS ANTES COM AVAL MÉDICO (Classificação Azul). Atenção a pacientes que usam Zyban/Bup para parar de fumar ou Donaren para insônia!",
  },

  // ============================================================================
  // CLASSE 12: ANTIDEPRESSIVOS IMAO IRREVERSÍVEIS E RIMA SINTÉTICOS (AZUL / LETAL)
  // ============================================================================
  {
    id: "imao-tranilcipromina-moclobemida",
    classeNumero: 12,
    classeFarmacologica: "Antidepressivos IMAO Irreversíveis e RIMA Sintéticos",
    principioAtivo: "Tranilcipromina / Tranilcipromina + Trifluoperazina / Moclobemida",
    nomesComerciais: ["Parnate", "Stelapar (Tranilcipromina + Trifluoperazina)", "Aurorix", "Nardil", "Marplan"],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "INTERROMPER_DIAS_ANTES",
    mecanismo:
      "Parnate e Stelapar inativam de forma irreversível as enzimas MAO-A e MAO-B (e o Stelapar ainda contém o antipsicótico Trifluoperazina). A Moclobemida (Aurorix) é um IMAO-A sintético. A soma farmacológica com as beta-carbolinas da Ayahuasca provoca crise hipertensiva fulminante, hemorragia intracraniana, hipertermia maligna e colapso cardiovascular.",
    viasMetabolicas: "Inativação covalente da MAO (Parnate/Stelapar) | Hepática CYP2C19/CYP2D6 (Moclobemida).",
    meiaVida: "Regeneração enzimática da MAO leva de 14 a 28 dias.",
    washoutMinimo: "Parnate / Stelapar: 28 a 35 dias (ou veto absoluto) | Moclobemida (Aurorix): 14 dias",
    recomendacaoLiturgica:
      "INTERROMPER DIAS ANTES COM AVAL MÉDICO (Classificação Azul / Risco Letal Absoluto). Stelapar possui dupla contraindicação (IMAO + Antipsicótico).",
  },

  // ============================================================================
  // CLASSE 13: ESTIMULANTES DO SNC / DERIVADOS ANFETAMÍNICOS (AZUL: INTERROMPER DIAS ANTES)
  // ============================================================================
  {
    id: "estimulantes-metilfenidato-lisdexanfetamina",
    classeNumero: 13,
    classeFarmacologica: "Estimulantes do SNC e Derivados Anfetamínicos (TDAH / Narcolepsia)",
    principioAtivo: "Cloridrato de Metilfenidato / Dimesilato de Lisdexanfetamina / Modafinila",
    nomesComerciais: ["Ritalina", "Ritalina LA", "Concerta", "Medato", "Consiv", "Venvanse", "Juneve", "Lyberdia", "Stavigile"],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "INTERROMPER_DIAS_ANTES",
    mecanismo:
      "Promovem liberação maciça e bloqueio da recaptação de dopamina e noradrenalina na fenda sináptica. Na presença da inibição da MAO-A pela Ayahuasca, as catecolaminas não são degradadas, desencadeando crise hipertensiva aguda, taquiarritmias, vasoespasmo coronariano/cerebral, hipertermia e crises de pânico ou paranoia severa.",
    viasMetabolicas: "Desesterificação por CES1A1 (Metilfenidato) | Hidrólise eritrocitária em D-anfetamina (Venvanse).",
    meiaVida: "Metilfenidato: 2-4h (Concerta: até 12h) | Lisdexanfetamina (D-anfetamina): 10-12h.",
    washoutMinimo: "7 a 14 dias antes da cerimônia (mínimo de 7 dias para Ritalina e 10 a 14 dias para Venvanse)",
    recomendacaoLiturgica:
      "INTERROMPER DIAS ANTES (Classificação Azul). Confirmar com o participante se faz uso de Ritalina, Concerta ou Venvanse para estudo/TDAH.",
  },

  // ============================================================================
  // CLASSE 14: MODERADORES DE APETITE E ANOREXÍGENOS (AZUL: INTERROMPER DIAS ANTES)
  // ============================================================================
  {
    id: "anorexigenos-sibutramina",
    classeNumero: 14,
    classeFarmacologica: "Moderadores de Apetite e Anorexígenos Serotoninérgicos/Adrenérgicos",
    principioAtivo: "Cloridrato de Sibutramina / Anfepramona / Femproporex / Mazindol",
    nomesComerciais: [
      "Meridia",
      "Reductil",
      "Sibutral",
      "Plenty",
      "Saciette",
      "Biomag",
      "Vazy",
      "Sibus",
      "Dualid",
      "Hipofagin",
      "Inibex",
      "Fagolipo",
    ],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "INTERROMPER_DIAS_ANTES",
    mecanismo:
      "PERIGO OCULTO GRAVÍSSIMO: A Sibutramina (Biomag, Vazy, Sibutral, Reductil, Plenty, Saciette) foi originalmente desenvolvida como um antidepressivo inibidor da recaptação de serotonina e noradrenalina (ISRSN)! Sua combinação com a Ayahuasca provoca Síndrome Serotoninérgica fulminante e Crise Hipertensiva/Infarto. Muitos participantes omitem seu uso por considerarem apenas um 'fármaco para emagrecer'.",
    viasMetabolicas: "Hepática: CYP2B6 e CYP3A4 (gera metabólitos ativos M1 e M2 de longa duração).",
    meiaVida: "Metabólitos ativos M1 e M2: 14 a 16 horas.",
    washoutMinimo: "14 a 21 dias (2 a 3 semanas completas antes do ritual)",
    recomendacaoLiturgica:
      "INTERROMPER DIAS ANTES (Classificação Azul / Risco Letal). Perguntar ativamente na triagem sobre fármacos ou fórmulas manipuladas para emagrecimento!",
  },

  // ============================================================================
  // CLASSE 15: ANALGÉSICOS OPIOIDES SEROTONINÉRGICOS (AZUL: INTERROMPER DIAS ANTES)
  // ============================================================================
  {
    id: "opioides-tramadol-meperidina-metadona",
    classeNumero: 15,
    classeFarmacologica: "Analgésicos Opioides Serotoninérgicos e Narcóticos",
    principioAtivo: "Tramadol / Meperidina (Petidina) / Metadona / Fentanil / Tapentadol / Codeína",
    nomesComerciais: [
      "Tramal",
      "Ultracet (Tramadol + Paracetamol)",
      "Revange",
      "Sylador",
      "Dolantina",
      "Dolosal",
      "Mytedom",
      "Durogesic",
      "Palexis",
      "Tylex",
      "Paco",
    ],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "INTERROMPER_DIAS_ANTES",
    mecanismo:
      "O Tramadol (Tramal/Ultracet), a Meperidina (Dolantina), a Metadona (Mytedom) e o Tapentadol inibem diretamente a recaptação de serotonina (SERT) e reduzem o limiar convulsivo. A associação com os IMAO da Ayahuasca desencadeia Síndrome Serotoninérgica letal, convulsões generalizadas e depressão respiratória.",
    viasMetabolicas: "Hepática: CYP2D6 e CYP3A4.",
    meiaVida: "Tramadol: 6-9h | Metadona: 15-60h.",
    washoutMinimo: "Tramadol/Codeína: 10 a 14 dias | Metadona: 21 a 28 dias",
    recomendacaoLiturgica:
      "INTERROMPER DIAS ANTES COM AVAL MÉDICO (Classificação Azul / Risco Letal). Atenção a analgésicos prescritos para hérnia de disco, pós-operatório ou fibromialgia (Tramal/Ultracet).",
  },

  // ============================================================================
  // CLASSE 16: ANTIMIGRANOSOS / ENXAQUECA (AZUL: INTERROMPER DIAS ANTES)
  // ============================================================================
  {
    id: "enxaqueca-triptanos-ergotaminicos",
    classeNumero: 16,
    classeFarmacologica: "Antimigranosos (Triptanos Agonistas 5-HT1B/1D e Ergotamínicos)",
    principioAtivo: "Sumatriptano / Naratriptano / Zolmitriptano / Rizatriptano / Ergotamina / Dihidroergotamina",
    nomesComerciais: ["Sumax", "Imigran", "Naramig", "Zomig", "Maxalt", "Cefaliv", "Cefalium", "Ormigrein", "Tonopan"],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "INTERROMPER_DIAS_ANTES",
    mecanismo:
      "Os Triptanos (Sumax, Naramig) são agonistas diretos de receptores de serotonina (5-HT1B/1D) e dependem da enzima MAO-A para serem degradados! Em combinação com a Ayahuasca, sofrem acúmulo tóxico, causando Síndrome Serotoninérgica e vasoespasmo coronariano ou cerebral severo (isquemia/infarto). Ergotamínicos (Cefaliv/Ormigrein) causam vasoconstrição periférica grave.",
    viasMetabolicas: "Degradação direta via MAO-A (Sumatriptano/Rizatriptano) e CYP1A2 (Zolmitriptano).",
    meiaVida: "2 a 6 horas (Ergotamina: efeito vasoconstritor dura até 24-48h).",
    washoutMinimo: "5 a 7 dias antes e pelo menos 48h após a sessão",
    recomendacaoLiturgica:
      "INTERROMPER DIAS ANTES (Classificação Azul). Se o participante tiver dor de cabeça antes ou durante o rito, JAMAIS permitir o uso de Sumax, Naramig, Cefaliv ou Ormigrein.",
  },

  // ============================================================================
  // CLASSE 17: ANTIGRIPAIS, XAROPES (DXM) E ANTI-HISTAMÍNICOS (AZUL: INTERROMPER DIAS ANTES)
  // ============================================================================
  {
    id: "antigripais-dextrometorfano-pseudoefedrina-clorfeniramina",
    classeNumero: 17,
    classeFarmacologica: "Antitussígenos (DXM), Descongestionantes Simpatomiméticos e Anti-histamínicos",
    principioAtivo: "Dextrometorfano (DXM) / Pseudoefedrina / Fenilefrina / Clorfeniramina / Dexclorfeniramina / Prometazina",
    nomesComerciais: [
      "Vick 44E",
      "Benalet TSC",
      "Silencium",
      "Claritin-D",
      "Allegra D",
      "Decongex Plus",
      "Resfenol",
      "Coristina D",
      "Benegrip",
      "Multigrip",
      "Polaramine",
      "Fenergan",
    ],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "INTERROMPER_DIAS_ANTES",
    mecanismo:
      "O Dextrometorfano (presente em xaropes para tosse seca como Vick 44E) e a Clorfeniramina (presente em antigripais como Resfenol, Coristina D e Benegrip) são potentes inibidores da recaptação de serotonina (SERT), podendo precipitar Síndrome Serotoninérgica clássica com IMAO! Além disso, a Pseudoefedrina e a Fenilefrina (Claritin-D, Allegra D, Decongex) causam descarga adrenérgica e crise hipertensiva.",
    viasMetabolicas: "Hepática: CYP2D6 (fortemente inibido pela Harmina/Harmalina).",
    meiaVida: "4 a 24 horas.",
    washoutMinimo: "5 a 7 dias antes da cerimônia",
    recomendacaoLiturgica:
      "INTERROMPER DIAS ANTES (Classificação Azul). Alertar todos os participantes a não tomarem xaropes para tosse, antigripais ou descongestionantes nasais na semana do trabalho.",
  },

  // ============================================================================
  // CLASSE 18: ANTIBIÓTICOS COM AÇÃO IMAO E INIBIDORES POTENTES DE CYP (VERMELHO/AZUL)
  // ============================================================================
  {
    id: "antibioticos-linezolida-inibidores-cyp",
    classeNumero: 18,
    classeFarmacologica: "Antibióticos com Ação IMAO, Antifúngicos Azólicos e Antirretrovirais",
    principioAtivo: "Linezolida / Azul de Metileno / Furazolidona / Isoniazida / Ciprofloxacino / Claritromicina / Fluconazol / Ritonavir",
    nomesComerciais: ["Zyvox", "Girotto", "Cipro", "Klaricid", "Zoltec", "Norvir", "Kaletra"],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "NAO_PODE_PARTICIPAR",
    mecanismo:
      "A Linezolida (Zyvox), o Azul de Metileno e a Furazolidona são antibióticos/antissépticos com potente ação inibidora da monoamina oxidase (IMAO) — sua associação com Ayahuasca gera Síndrome Serotoninérgica e Crise Hipertensiva fatal. Já o Ciprofloxacino inibe fortemente o CYP1A2, e a Claritromicina, Fluconazol e Ritonavir inibem potentemente o CYP3A4/CYP2D6, bloqueando a depuração hepática da Harmina e Harmalina.",
    viasMetabolicas: "Inibição de MAO-A/B e inibição das isoenzimas hepáticas CYP1A2, CYP2D6 e CYP3A4.",
    meiaVida: "Variável (5 a 30 horas).",
    washoutMinimo: "Linezolida: 14 dias após fim do tratamento | Ciprofloxacino/Claritromicina/Fluconazol: 5 a 7 dias após término",
    recomendacaoLiturgica:
      "NÃO PODE PARTICIPAR durante o ciclo de antibiótico (especialmente Linezolida, Ciprofloxacino ou Claritromicina). Aguardar recuperação infecciosa e washout.",
  },

  // ============================================================================
  // CLASSE 19: ANÁLOGOS DE GLP-1 / CANETAS EMAGRECEDORAS E ANTIDIABÉTICOS (LARANJA: CAUTELA / NÃO NO DIA)
  // ============================================================================
  {
    id: "glp1-ozempic-mounjaro-saxenda",
    classeNumero: 19,
    classeFarmacologica: "Agonistas de GLP-1 / GIP (Canetas Emagrecedoras e Antidiabéticos)",
    principioAtivo: "Semaglutida / Tirzepatida / Liraglutida / Dulaglutida / Insulina / Sulfonilureias",
    nomesComerciais: [
      "Ozempic",
      "Wegovy",
      "Rybelsus",
      "Mounjaro",
      "Saxenda",
      "Victoza",
      "Trulicity",
      "Daonil (Glibenclamida)",
      "Diamicron (Gliclazida)",
    ],
    nivelRisco: "COMPATIVEL_MONITORADO",
    diretrizPdf: "NAO_TOMAR_NO_DIA",
    mecanismo:
      "ALERTA CLÍNICO CONTEMPORÂNEO: Os análogos de GLP-1 (Ozempic, Wegovy, Mounjaro, Saxenda) provocam retardo acentuado do esvaziamento gástrico (gastroparesia farmacológica). Isso retém alimentos e a própria Ayahuasca no estômago por muitas horas, alterando a curva de absorção e aumentando o risco de vômitos incoercíveis, refluxo severo, broncoaspiração durante a purga e hipoglicemia aguda se associado a jejum prolongado.",
    viasMetabolicas: "Degradação proteolítica endógena (sem interação direta com SERT, porém forte interação fisiológica gástrica e glicêmica).",
    meiaVida: "Liraglutida (Saxenda): 13h | Semaglutida (Ozempic/Wegovy): 7 dias | Tirzepatida (Mounjaro): 5 dias.",
    washoutMinimo: "NÃO APLICAR NO DIA nem nas 48h anteriores à cerimônia; dieta líquida/leve nas 24h prévias",
    recomendacaoLiturgica:
      "NÃO APLICAR NO DIA (Classificação Laranja). Exigir alimentação leve de fácil digestão nas 24h anteriores, monitorar glicemia (ter mel/glicose no salão) e manter o participante sentado ou em decúbito lateral durante a limpeza (purga).",
  },

  // ============================================================================
  // CLASSE 20: FITOTERÁPICOS SEROTONINÉRGICOS, ANTIEMÉTICOS E VASOATIVOS (AZUL / LARANJA)
  // ============================================================================
  {
    id: "fitoterapicos-hiperico-5htp-mucuna-kava",
    classeNumero: 20,
    classeFarmacologica: "Fitoterápicos Serotoninérgicos, Precursores e Estimulantes Botânicos",
    principioAtivo:
      "Erva-de-São-João (Hypericum perforatum) / 5-HTP / L-Triptofano / Mucuna pruriens (L-DOPA) / Kava-Kava / Ioimbina / Ginseng",
    nomesComerciais: ["Hipérico", "Jarsin", "Remotiv", "5-HTP Manipulado", "Triptofano", "Mucuna L-Dopa", "Kava-Kava", "Yohimbine"],
    nivelRisco: "SEVERO_MODERADO",
    diretrizPdf: "INTERROMPER_DIAS_ANTES",
    mecanismo:
      "A Erva-de-São-João e o 5-HTP elevam diretamente a serotonina sináptica (risco de Síndrome Serotoninérgica). A Mucuna pruriens contém Levodopa natural e a Ioimbina bloqueia receptores alfa-2 adrenérgicos (risco de crise hipertensiva e taquicardia severa). A Kava-Kava causa sedação excessiva e sobrecarga hepática.",
    viasMetabolicas: "Hepática: CYP3A4, CYP1A2, CYP2D6 e MAO-A.",
    meiaVida: "24 a 48 horas.",
    washoutMinimo: "Erva-de-São-João: 14 dias | 5-HTP, Triptofano, Mucuna, Ioimbina e Kava-Kava: 7 dias",
    recomendacaoLiturgica:
      "INTERROMPER DIAS ANTES (Classificação Azul). Questionar sempre sobre suplementos manipulados, cápsulas naturais para humor, libido ou pré-treinos.",
  },
  {
    id: "antiemeticos-vasoativos-gabapentinoides",
    classeNumero: 20,
    classeFarmacologica: "Antieméticos, Vasoativos (PDE5), Betabloqueadores e Gabapentinoides",
    principioAtivo: "Ondansetrona / Metoclopramida / Bromoprida / Sildenafila / Tadalafila / Propranolol / Pregabalina / Gabapentina",
    nomesComerciais: ["Vonau Flash", "Zofran", "Plasil", "Digesan", "Viagra", "Cialis", "Inderal", "Lyrica", "Neurontin"],
    nivelRisco: "COMPATIVEL_MONITORADO",
    diretrizPdf: "NAO_TOMAR_NO_DIA",
    mecanismo:
      "A Ondansetrona (Vonau) atua em receptores 5-HT3 e a Metoclopramida (Plasil) é metabolizada por CYP2D6 com risco de reação extrapiramidal (distonia aguda). Sildenafila/Tadalafila (Viagra/Cialis) causam vasodilatação e taquicardia reflexa. Pregabalina/Gabapentina (Lyrica/Neurontin) potencializam tontura e ataxia motora (se usadas para epilepsia, aplica-se veto).",
    viasMetabolicas: "Hepática (CYP2D6, CYP3A4) e Renal (Pregabalina/Gabapentina).",
    meiaVida: "4 a 17 horas.",
    washoutMinimo: "NÃO TOMAR NO DIA (Suspender nas 24h a 48h anteriores à sessão)",
    recomendacaoLiturgica:
      "NÃO TOMAR NO DIA (Classificação Laranja). Nunca administrar Plasil ou Vonau preventivamente antes do rito, pois a purga é um mecanismo fisiológico e ritual de segurança.",
  },
];

/**
 * Tabela Técnica de Diluição e Reconstituição de 10:1 Wirapuru
 * Fonte: Documento 04 - Catálogo Técnico das Graduações (NotebookLM)
 */
export const TABELA_DILUICAO_WIRAPURU: ItemDiluicaoWirapuru[] = [
  {
    volumeInicial10: "1 Litro (10:1 Wirapuru)",
    aguaEstreilAdicionar: "430 ml de água estéril (45-50°C)",
    volumeFinal: "1,43 Litros",
    graduacaoObtida: "7:1 (Anhangatã)",
    calicesEstimados60ml: 24,
  },
  {
    volumeInicial10: "1 Litro (10:1 Wirapuru)",
    aguaEstreilAdicionar: "1.000 ml de água estéril (45-50°C)",
    volumeFinal: "2,00 Litros",
    graduacaoObtida: "5:1 (Pituã - Equilíbrio Canônico)",
    calicesEstimados60ml: 33,
  },
  {
    volumeInicial10: "1 Litro (10:1 Wirapuru)",
    aguaEstreilAdicionar: "2.330 ml de água estéril (45-50°C)",
    volumeFinal: "3,33 Litros",
    graduacaoObtida: "3:1 (Mainumbi - Suave)",
    calicesEstimados60ml: 55,
  },
  {
    volumeInicial10: "5 Litros (10:1 Wirapuru)",
    aguaEstreilAdicionar: "5.000 ml de água estéril (45-50°C)",
    volumeFinal: "10,00 Litros",
    graduacaoObtida: "5:1 (Pituã - Equilíbrio Canônico)",
    calicesEstimados60ml: 166,
  },
];

/**
 * Critérios Diagnósticos de Hunter para Toxicidade Serotoninérgica
 */
export const CRITERIOS_HUNTER = [
  "Clônus espontâneo presente",
  "Clônus induzível ACOMPANHADO de agitação psicomotora ou diaforese profusa",
  "Clônus ocular ACOMPANHADO de agitação ou sudorese intensa",
  "Tremor generalizado ACOMPANHADO de hiperreflexia",
  "Hipertonia muscular ACOMPANHADA de temperatura corporal > 38,5°C e clônus ocular/induzível",
];

/**
 * Alerta Crítico: Fisiopatologia e Risco de Lítio + Ayahuasca
 * Fonte: Compêndio Etnofarmacológico (NotebookLM)
 */
export const TOXICIDADE_LITIO = {
  resumo:
    "O Carbonato de Lítio (Carbolitium, Priadel, Litiocar) em combinação com os alcaloides da Ayahuasca deflagra convulsões generalizadas e Status Epilepticus refratário com risco iminente de óbito ou encefalopatia anóxica permanente.",
  mecanismo:
    "Inibição de IMPase, depleção de inositol livre, acúmulo de IP3/DAG e hipersensibilização dos receptores 5-HT2A no córtex cerebral.",
  incidenciaConvulsao:
    "Aproximadamente 47% dos relatos clínicos documentados de coadministração de psicodélicos clássicos com Lítio resultam em convulsões graves e internação em UTI.",
  diretriz:
    "CONTRAINDICAÇÃO ABSOLUTA E DEFINITIVA. Portadores de transtorno afetivo bipolar medicados com Lítio estão terminantemente vetados de comungar Ayahuasca.",
};

/**
 * 12 Perguntas Frequentes Aprofundadas para a Liderança do Templo
 */
export const FAQ_DIRIGENTE: FaqDirigenteItem[] = [
  {
    id: "faq-1",
    categoria: "CONSERVACAO",
    pergunta: "Como deve ser armazenado o sacramento nas dependências do templo?",
    resposta:
      "Em sua embalagem original concentrada (10:1 Wirapuru), o sacramento é protegido pela alta densidade de sólidos solúveis (65 a 72 °Brix), conservando-se perfeitamente estável por 12 a 18 meses em local fresco, seco, arejado e ao abrigo da luz solar direta. Uma vez diluído com água mineral estéril, o sacramento perde a barreira hiperosmótica e deve ser mantido obrigatoriamente sob refrigeração contínua (entre 2°C e 8°C), devendo ser consagrado no prazo máximo de 60 dias.",
    destaqueConselho:
      "Regra Canônica: Nunca armazene garrafas diluídas fora da refrigeração por mais de algumas horas.",
  },
  {
    id: "faq-2",
    categoria: "CONSERVACAO",
    pergunta: "A garrafa chegou estufada ou fez barulho de pressão ao abrir. A bebida estragou?",
    resposta:
      "Não estragou. A Ayahuasca purista é rica em carboidratos complexos e açúcares naturais provenientes da casca do cipó e folhas de chacrona. Oscilações térmicas de transporte interestadual podem ativar uma fermentação bioorgânica suave com liberação de gás carbônico (CO₂). Basta abrir a tampa com suavidade e calma, aliviando o respiro gradualmente. A presença de gás natural não altera a composição dos alcaloides (DMT, Harmina, Harmalina e THH) e não compromete a sacralidade da bebida.",
  },
  {
    id: "faq-3",
    categoria: "CONSERVACAO",
    pergunta: "Como lidar com a borra e a sedimentação sólida no fundo da garrafa?",
    resposta:
      "A matéria vegetal que se deposita no fundo é composta por micropartículas botânicas nobres e cristais naturais de alcaloides precipitados em repouso. Antes de iniciar o ritual e servir o sacramento, o dirigente deve agitar a garrafa vigorosamente em movimentos circulares para homogeneizar a bebida, garantindo que o primeiro e o último cálice tenham exatamente o mesmo teor de força fitoquímica.",
  },
  {
    id: "faq-4",
    categoria: "DOSAGENS",
    pergunta: "Qual a porção recomendada por pessoa em cada graduação?",
    resposta:
      "A calibração varia conforme a graduação fitoquímica: na graduação 3:1 Mainumbi (suave), a porção sugerida é de 90 a 120 ml; na graduação 5:1 Pituã (equilibrada canônica), de 70 a 100 ml; na graduação 7:1 Anhangatã (alta concentração), 50 a 80 ml; e na graduação 10:1 Wirapuru servida pura (semi-mel), apenas 30 a 45 ml por participante. Para pessoas em primeira comunhão, sempre inicie com porção conservadora reduzida (50% da medida padrão) e avalie a resposta corporal.",
    destaqueConselho:
      "Regra de Ouro: Mais vale uma porção moderada com ancoramento sereno do que uma sobrecarga somática que induza pânico ou fuga da experiência.",
  },
  {
    id: "faq-5",
    categoria: "DOSAGENS",
    pergunta: "Quando e como permitir a 2ª porção (o repasse) no ritual?",
    resposta:
      "O repasse jamais deve ser automático. O dirigente ou fiscal de apoio deve observar o participante após no mínimo 60 a 90 minutos da primeira comunhão. Se a pessoa estiver centrada, lúcida, sem vômitos repetitivos e solicitar conscientemente maior aprofundamento, serve-se uma porção moderada (metade da primeira medida). Caso a pessoa esteja demonstrando desorientação, angústia ou catarse intensa, a 2ª porção deve ser carinhosamente postergada.",
  },
  {
    id: "faq-6",
    categoria: "CONDUCAO_RITUAL",
    pergunta: "O que fazer se um participante entrar em processo emocional intenso ou pânico ('peia')?",
    resposta:
      "Aplique os 4 Princípios do Zendo Project: (1) Criar um espaço seguro e acolhedor fora do salão principal; (2) Acompanhar sem tentar guiar ou interpretar visões; (3) Conversar através da respiração (inspirar em 4s, expirar em 6s) sem tentar interromper o fluxo; e (4) Lembrar que o difícil não é mau, validando o sentimento. Nunca administre ansiolíticos ou calmantes alopáticos. Mantenha fiscalização visual contínua até o completo retorno.",
    destaqueConselho:
      "Nunca isole a pessoa em quarto escuro ou fechado. Mantenha presença silenciosa e uma âncora humana de segurança.",
  },
  {
    id: "faq-7",
    categoria: "CONDUCAO_RITUAL",
    pergunta: "Como agir em caso de hipotensão (queda de pressão) ou desidratação pós-purga?",
    resposta:
      "A emese repetitiva e o suor podem causar fraqueza transitória. Se o participante relatar escurecimento de vista ou tontura, deite-o com as pernas elevadas a 30 graus (Posição de Trendelenburg) para favorecer o retorno venoso cerebral. Ofereça água em pequenos goles ou sais de reidratação oral. Se houver suspeita de hipoglicemia por jejum prolongado, aplique a Regra dos 15: ofereça 1 sachê de mel puro ou 15g de carboidrato de rápida absorção.",
  },
  {
    id: "faq-8",
    categoria: "JURIDICO_CONAD",
    pergunta: "Menores de 18 anos podem participar das cerimônias do templo?",
    resposta:
      "De acordo com a Resolução CONAD nº 01/2010 (Item 4.1), a participação de crianças e adolescentes é permitida desde que ocorra sob a estrita responsabilidade e mediante autorização formal e expressa de ambos os pais ou responsáveis legais presentes na cerimônia. O dirigente deve avaliar com prudência a maturidade do jovem, orientar a família e administrar porções mínimas simbólicas.",
    destaqueConselho:
      "Exigência: O templo deve arquivar a autorização assinada pelos pais junto à cópia dos documentos de identidade.",
  },
  {
    id: "faq-9",
    categoria: "JURIDICO_CONAD",
    pergunta: "Como o templo deve se portar caso receba fiscalização da Polícia ou Vigilância Sanitária?",
    resposta:
      "Receba as autoridades com cordialidade, serenidade e respeito. Dirija-os à sala administrativa da congregação e apresente a Pasta de Salvaguarda Jurídica do Templo contendo: Ata de Fundação da Instituição, Estatuto Social com finalidade religiosa explícita, CNPJ ativo, cópia integral da Resolução CONAD nº 01/2010 (que atesta a legalidade do uso religioso da Ayahuasca), Termo de Custódia e Rateio emitido pela Cooperativa Nativaram e o Livro de Frequência. Explique com firmeza que não há comercialização e que a prática é amparada pelo Art. 5º, VI da Constituição Federal.",
  },
  {
    id: "faq-10",
    categoria: "JURIDICO_CONAD",
    pergunta: "Como transportar garrafas de Ayahuasca em viagens aéreas ou rodoviárias?",
    resposta:
      "O transporte interestadual para a realização de cerimônias do templo é perfeitamente legal. O dirigente deve transportar as garrafas lacradas, devidamente rotuladas com identificação institucional da congregação, acompanhadas da Declaração de Trânsito Litúrgico de Sacramento (disponível para download neste portal), cópia da Ata do Templo e da Resolução CONAD nº 01/2010. Na bagagem despachada, as garrafas devem ser envoltas em plástico bolha e caixa isotérmica protegida.",
  },
  {
    id: "faq-11",
    categoria: "CONDUCAO_RITUAL",
    pergunta: "Posso ministrar Rapé Sagrado e Sananga no mesmo trabalho de Ayahuasca?",
    resposta:
      "Sim, é uma prática canônica tradicional, desde que respeitada a ordem sensorial e as condições do participante. O Rapé Sagrado deve ser soprado com intenção de centramento, alinhamento dos pensamentos e ancoramento físico, preferencialmente antes da ingestão da Ayahuasca ou após o auge da miração para assentamento. A Sananga deve ser ministrada apenas a quem desejar limpeza ocular e energética profunda, com aviso prévio de que não se deve usar lentes de contato e que haverá ardor transitório por 3 a 5 minutos.",
  },
  {
    id: "faq-12",
    categoria: "JURIDICO_CONAD",
    pergunta: "Qual o procedimento correto para cobrança das contribuições dos participantes?",
    resposta:
      "A Resolução CONAD nº 01/2010 veda taxativamente o comércio, venda de ingressos ou lucro sobre a Ayahuasca. O templo pode e deve instituir uma contribuição solidária ou taxa de rateio de manutenção da cerimônia (para cobrir os custos de luz, limpeza, lenha, alimentação comunitária e a cota de rateio cooperativo do sacramento). Essa contribuição deve ser transparente, estatutária e jamais atrelada ao conceito de 'compra de porção'.",
  },
];

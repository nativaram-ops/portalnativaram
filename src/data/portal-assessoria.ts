/**
 * Base de Conhecimento e Dados da Assessoria Litúrgica — Portal do Dirigente
 * Cooperativa Nativaram
 *
 * Fontes Oficiais do Caderno de Segurança (Google NotebookLM - 222 fontes):
 * - Resolução CONAD nº 01/2010 (Diretrizes para o Uso Religioso da Ayahuasca)
 * - Constituição Federal de 1988 (Art. 5º, VI e VIII; Art. 215 e 216)
 * - Lei Federal nº 11.343/2006 (Art. 2º, parágrafo único)
 * - Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)
 * - Lei nº 13.787/2018 e CFM 1.821/2007 (Guarda de prontuários por 20 anos)
 * - Compêndio Etnofarmacológico, Hunter Toxicity Criteria e Zendo Project
 */

export interface InteracaoMedicamentosa {
  id: string;
  classeNumero: number;
  classeFarmacologica: string;
  principioAtivo: string;
  nomesComerciais: string[];
  nivelRisco: "LETAL_ABSOLUTO" | "SEVERO_MODERADO" | "COMPATIVEL_MONITORADO";
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
 * Matriz Exaustiva das 15 Classes Farmacológicas e Interações com Ayahuasca
 * Baseada no Compêndio de Etnofarmacologia e Cinética de Depuração (5 a 7 x t1/2)
 */
export const INTERACOES_MEDICAMENTOSAS: InteracaoMedicamentosa[] = [
  // 1. ISRS
  {
    id: "isrs-fluoxetina",
    classeNumero: 1,
    classeFarmacologica: "ISRS (Inibidores Seletivos da Recaptação de Serotonina)",
    principioAtivo: "Fluoxetina",
    nomesComerciais: ["Prozac", "Daforin", "Verotina", "Fluxene"],
    nivelRisco: "LETAL_ABSOLUTO",
    mecanismo:
      "Bloqueio potente de SERT somado à inibição reversível da MAO-A pela Harmina/Harmalina. Inibe fortemente a enzima CYP2D6 (mesma via de depuração do DMT e Harmina), multiplicando o tempo de exposição e gerando Síndrome Serotoninérgica fulminante.",
    viasMetabolicas: "Hepática: CYP2D6 (inibição forte), CYP2C9, CYP3A4. Autoinibição enzimática.",
    meiaVida: "Fluoxetina: 1 a 4 dias. Metabólito ativo (Norfluoxetina): 7 a 15 dias.",
    washoutMinimo: "35 a 45 dias (5 a 6 semanas completas)",
    recomendacaoLiturgica:
      "VETADA categoricamente a participação. O desmame jamais deve ser conduzido pelo dirigente e exige supervisão do médico psiquiatra assistente.",
  },
  {
    id: "isrs-sertralina",
    classeNumero: 1,
    classeFarmacologica: "ISRS (Inibidores Seletivos da Recaptação de Serotonina)",
    principioAtivo: "Cloridrato de Sertralina",
    nomesComerciais: ["Zoloft", "Assert", "Tolrest", "Serenata"],
    nivelRisco: "LETAL_ABSOLUTO",
    mecanismo:
      "Inibição da recaptação de serotonina combinada com inibição de degradação pela MAO-A. Risco iminente de tempestade serotoninérgica e labilidade hemodinâmica severa.",
    viasMetabolicas: "Hepática: CYP2B6, CYP2C19, CYP2D6, CYP3A4.",
    meiaVida: "26 horas (Desmetilsertralina: 62 a 104 horas).",
    washoutMinimo: "21 a 28 dias (3 a 4 semanas completas)",
    recomendacaoLiturgica:
      "Participação vetada até a conclusão comprovada do período de washout sob expressa anuência médica.",
  },
  {
    id: "isrs-escitalopram",
    classeNumero: 1,
    classeFarmacologica: "ISRS (Inibidores Seletivos da Recaptação de Serotonina)",
    principioAtivo: "Oxalato de Escitalopram",
    nomesComerciais: ["Lexapro", "Reconter", "Exodus", "Espran"],
    nivelRisco: "LETAL_ABSOLUTO",
    mecanismo:
      "ISRS de altíssima seletividade. Elevação maciça de monoaminas em fenda sináptica quando em sinergia com as beta-carbolinas da Ayahuasca.",
    viasMetabolicas: "Hepática: CYP2C19, CYP3A4, CYP2D6.",
    meiaVida: "27 a 32 horas.",
    washoutMinimo: "21 a 28 dias (3 a 4 semanas completas)",
    recomendacaoLiturgica:
      "Contraindicação absoluta. O templo não deve flexibilizar o acolhimento sob hipótese alguma.",
  },
  {
    id: "isrs-paroxetina",
    classeNumero: 1,
    classeFarmacologica: "ISRS (Inibidores Seletivos da Recaptação de Serotonina)",
    principioAtivo: "Cloridrato de Paroxetina",
    nomesComerciais: ["Aropax", "Pondera", "Benicar", "Moratus"],
    nivelRisco: "LETAL_ABSOLUTO",
    mecanismo:
      "Forte inibição de SERT aliada a efeitos anticolinérgicos e potente inibição de CYP2D6. Risco extremo de toxicidade serotoninérgica e hipertermia.",
    viasMetabolicas: "Hepática: CYP2D6 (inibição potente), CYP3A4.",
    meiaVida: "21 horas.",
    washoutMinimo: "21 a 28 dias (3 a 4 semanas)",
    recomendacaoLiturgica: "Vetado até transcorrido o período integral de segurança clínica.",
  },
  {
    id: "isrs-citalopram",
    classeNumero: 1,
    classeFarmacologica: "ISRS (Inibidores Seletivos da Recaptação de Serotonina)",
    principioAtivo: "Bromidrato de Citalopram",
    nomesComerciais: ["Cipramil", "Procimax", "Città"],
    nivelRisco: "LETAL_ABSOLUTO",
    mecanismo:
      "Hiperestimulação central de receptores 5-HT, risco de arritmias cardíacas por prolongamento do intervalo QT e colapso circulatório.",
    viasMetabolicas: "Hepática: CYP2C19, CYP3A4, CYP2D6.",
    meiaVida: "35 horas.",
    washoutMinimo: "21 a 28 dias (3 a 4 semanas)",
    recomendacaoLiturgica: "Participação suspensa até descontinuação médica integral.",
  },

  // 2. ISRSN (Duais)
  {
    id: "isrsn-venlafaxina",
    classeNumero: 2,
    classeFarmacologica: "ISRSN (Inibidores Duais de Serotonina e Noradrenalina)",
    principioAtivo: "Cloridrato de Venlafaxina",
    nomesComerciais: ["Efexor XR", "Alenthus XR", "Venlax"],
    nivelRisco: "LETAL_ABSOLUTO",
    mecanismo:
      "Bloqueio simultâneo de SERT e NET. O excesso de noradrenalina exacerba as manifestações simpáticas autonômicas, resultando em crise hipertensiva severa e taquiarritmias ventriculares.",
    viasMetabolicas: "Hepática: CYP2D6 (formação de O-desmetilvenlafaxina), CYP3A4.",
    meiaVida: "Venlafaxina: 5 horas. Metabólito ativo (ODV): 11 horas.",
    washoutMinimo: "21 a 28 dias (3 a 4 semanas)",
    recomendacaoLiturgica: "Risco gravíssimo. Não acolher até desmame concluído sob laudo psiquiátrico.",
  },
  {
    id: "isrsn-duloxetina",
    classeNumero: 2,
    classeFarmacologica: "ISRSN (Inibidores Duais de Serotonina e Noradrenalina)",
    principioAtivo: "Cloridrato de Duloxetina",
    nomesComerciais: ["Cymbalta", "Velija", "Dual", "Cymbi"],
    nivelRisco: "LETAL_ABSOLUTO",
    mecanismo:
      "Inibição dual potente de recaptação de 5-HT e noradrenalina. Risco crítico de tempestade adrenérgica, hipertermia maligna e rabdomiólise.",
    viasMetabolicas: "Hepática: CYP1A2, CYP2D6.",
    meiaVida: "12 a 17 horas.",
    washoutMinimo: "21 a 28 dias (3 a 4 semanas)",
    recomendacaoLiturgica: "Contraindicação estrita.",
  },
  {
    id: "isrsn-desvenlafaxina",
    classeNumero: 2,
    classeFarmacologica: "ISRSN (Inibidores Duais de Serotonina e Noradrenalina)",
    principioAtivo: "Succinato de Desvenlafaxina",
    nomesComerciais: ["Pristiq", "Elifore", "Deller", "Zysal"],
    nivelRisco: "LETAL_ABSOLUTO",
    mecanismo: "Potente ação sobre SERT e NET com risco de pico hipertensivo agudo e Síndrome Serotoninérgica.",
    viasMetabolicas: "Hepática: UGT e CYP3A4.",
    meiaVida: "11 a 13 horas.",
    washoutMinimo: "21 a 28 dias (3 a 4 semanas)",
    recomendacaoLiturgica: "Vetado categoricamente.",
  },

  // 3. SAIS DE LÍTIO (ESTABILIZADORES DE HUMOR)
  {
    id: "litio",
    classeNumero: 3,
    classeFarmacologica: "Sais de Lítio (Estabilizador de Humor)",
    principioAtivo: "Carbonato de Lítio",
    nomesComerciais: ["Carbolitium", "Litiocar", "Carlit"],
    nivelRisco: "LETAL_ABSOLUTO",
    mecanismo:
      "MECANISMO LETAL: O lítio inibe a enzima inositol monofosfatase (IMPase), esgotando o inositol livre celular e acumulando IP3 e DAG. Isso gera HIPERSENSIBILIZAÇÃO E UP-REGULATION DOS RECEPTORES 5-HT2A. Quando o DMT se liga ao cérebro sensibilizado, deflagra descargas paroxísticas síncronas corticais, resultando em STATUS EPILEPTICUS REFRATÁRIO, convulsões tônico-clônicas generalizadas, isquemia anóxica cerebral e óbito. Estudos relatam ~47% de convulsão em coadministração!",
    viasMetabolicas: "Exclusivamente Renal: Filtração glomerular direta (95% inalterado).",
    meiaVida: "18 a 24 horas (excede 36h em idosos ou renais).",
    washoutMinimo: "Mínimo de 30 dias (tempo para restabelecer estoques de inositol)",
    recomendacaoLiturgica:
      "CONTRAINDICAÇÃO ABSOLUTA E DEFINITIVA. Portadores de Bipolaridade medicados com Lítio NÃO PODEM consagrar Ayahuasca em nenhuma hipótese.",
  },

  // 4. TRICÍCLICOS (ADTs)
  {
    id: "triciclicos-amitriptilina",
    classeNumero: 4,
    classeFarmacologica: "Antidepressivos Tricíclicos (ADTs)",
    principioAtivo: "Cloridrato de Amitriptilina",
    nomesComerciais: ["Tryptanol", "Amytril", "Trisomil"],
    nivelRisco: "LETAL_ABSOLUTO",
    mecanismo:
      "Bloqueio de recaptação de serotonina somado a bloqueio de canais de sódio no miocárdio e ação anticolinérgica. Risco de arritmias ventriculares fatais (torsades de pointes) e colapso circulatório.",
    viasMetabolicas: "Hepática: CYP2D6, CYP2C19, CYP3A4.",
    meiaVida: "Amitriptilina: 10-26h (Nortriptilina: 18-44h).",
    washoutMinimo: "21 dias (3 semanas)",
    recomendacaoLiturgica: "Vetado categoricamente.",
  },
  {
    id: "triciclicos-clomipramina",
    classeNumero: 4,
    classeFarmacologica: "Antidepressivos Tricíclicos (ADTs)",
    principioAtivo: "Cloridrato de Clomipramina",
    nomesComerciais: ["Anafranil", "Clo"],
    nivelRisco: "LETAL_ABSOLUTO",
    mecanismo: "Potente inibidor de SERT entre os tricíclicos. Risco extremo de crise serotoninérgica e convulsões.",
    viasMetabolicas: "Hepática: CYP2D6, CYP1A2, CYP3A4.",
    meiaVida: "20 a 40 horas.",
    washoutMinimo: "21 a 28 dias",
    recomendacaoLiturgica: "Vetado categoricamente.",
  },

  // 5. ATÍPICOS E MODULADORES
  {
    id: "atipicos-vortioxetina",
    classeNumero: 5,
    classeFarmacologica: "Antidepressivos Atípicos e Moduladores",
    principioAtivo: "Vortioxetina",
    nomesComerciais: ["Brintellix"],
    nivelRisco: "LETAL_ABSOLUTO",
    mecanismo: "Modulador multimodal serotoninérgico (agonista/antagonista em múltiplos subtipos 5-HT) e inibidor de SERT.",
    viasMetabolicas: "Hepática: CYP2D6, CYP3A4.",
    meiaVida: "57 a 66 horas.",
    washoutMinimo: "21 a 28 dias",
    recomendacaoLiturgica: "Contraindicação estrita.",
  },
  {
    id: "atipicos-bupropiona",
    classeNumero: 5,
    classeFarmacologica: "Antidepressivos Atípicos (IRND)",
    principioAtivo: "Cloridrato de Bupropiona",
    nomesComerciais: ["Wellbutrin", "Bup", "Zetron"],
    nivelRisco: "SEVERO_MODERADO",
    mecanismo:
      "Inibidor da recaptação de dopamina e noradrenalina. Diminui significativamente o limiar convulsivo cortical, aumentando o risco de crises epilépticas sob a intensidade somática do ritual.",
    viasMetabolicas: "Hepática: CYP2B6 (formação de hidroxibupropiona).",
    meiaVida: "14 a 21 horas (metabólitos ativos: 20 a 37 horas).",
    washoutMinimo: "14 a 21 dias (2 a 3 semanas)",
    recomendacaoLiturgica: "Descontinuação supervisionada antes da consagração.",
  },
  {
    id: "atipicos-trazodona",
    classeNumero: 5,
    classeFarmacologica: "Antidepressivos Atípicos (SARI)",
    principioAtivo: "Cloridrato de Trazodona",
    nomesComerciais: ["Donaren", "Loredon"],
    nivelRisco: "SEVERO_MODERADO",
    mecanismo: "Ação serotoninérgica antagonista 5-HT2A em baixas doses e agonista/inibidor de recaptação em doses maiores.",
    viasMetabolicas: "Hepática: CYP3A4.",
    meiaVida: "7 a 12 horas.",
    washoutMinimo: "14 dias",
    recomendacaoLiturgica: "Suspensão gradual sob supervisão médica.",
  },

  // 6. IMAOS FARMACOLÓGICOS IRREVERSÍVEIS
  {
    id: "imao-tranilcipromina",
    classeNumero: 6,
    classeFarmacologica: "IMAOs Farmacológicos Irreversíveis",
    principioAtivo: "Tranilcipromina",
    nomesComerciais: ["Parnate"],
    nivelRisco: "LETAL_ABSOLUTO",
    mecanismo:
      "Destrói covalentemente a enzima MAO. A sobreposição com a Ayahuasca gera inativação enzimática absoluta, crise hipertensiva severa e choque circulatório.",
    viasMetabolicas: "Inativação irreversível da enzima MAO.",
    meiaVida: "Plasmática curta (2,5h), porém inibição irreversível.",
    washoutMinimo: "28 a 35 dias (tempo para biossíntese de novo das enzimas)",
    recomendacaoLiturgica: "Risco fatal. Não admitir sem período integral de regeneração.",
  },

  // 7. ANTICONVULSIVANTES
  {
    id: "anticonvulsivantes-carbamazepina",
    classeNumero: 7,
    classeFarmacologica: "Anticonvulsivantes / Estabilizadores",
    principioAtivo: "Carbamazepina / Valproato / Lamotrigina",
    nomesComerciais: ["Tegretol", "Depakene", "Lamictal"],
    nivelRisco: "SEVERO_MODERADO",
    mecanismo: "Modulação de canais iônicos e GABA. Se o uso for para epilepsia, há contraindicação clínica permanente.",
    viasMetabolicas: "Hepática: CYP3A4, UGT.",
    meiaVida: "12 a 35 horas.",
    washoutMinimo: "14 a 21 dias",
    recomendacaoLiturgica: "Avaliar etiologia: epilepsia é critério de exclusão definitiva do ritual.",
  },

  // 8. GABAPENTINOIDES
  {
    id: "gabapentinoides-pregabalina",
    classeNumero: 8,
    classeFarmacologica: "Gabapentinoides",
    principioAtivo: "Pregabalina / Gabapentina",
    nomesComerciais: ["Lyrica", "Neurontin", "Insit"],
    nivelRisco: "SEVERO_MODERADO",
    mecanismo: "Ligação às subunidades alfa-2-delta dos canais de cálcio. Risco de sedação excessiva e ataxia motora no salão.",
    viasMetabolicas: "Exclusivamente Renal (inalterada).",
    meiaVida: "6 a 7 horas.",
    washoutMinimo: "7 a 10 dias",
    recomendacaoLiturgica: "Avaliar indicação médica antes de admitir.",
  },

  // 9. ANTIPSICÓTICOS ATÍPICOS (2ª GERAÇÃO)
  {
    id: "antipsicoticos-quetiapina",
    classeNumero: 9,
    classeFarmacologica: "Antipsicóticos Atípicos (Segunda Geração)",
    principioAtivo: "Quetiapina / Olanzapina / Risperidona / Aripiprazol",
    nomesComerciais: ["Seroquel", "Zyprexa", "Risperdal", "Abilify"],
    nivelRisco: "LETAL_ABSOLUTO",
    mecanismo:
      "O uso dessas substâncias é forte marcador de histórico de psicose, esquizofrenia ou transtorno bipolar grave, condições que contraindicam formalmente o uso de Ayahuasca.",
    viasMetabolicas: "Hepática: CYP2D6, CYP3A4.",
    meiaVida: "Quetiapina: 6h | Olanzapina: 30h | Aripiprazol: 75h.",
    washoutMinimo: "21 a 28 dias",
    recomendacaoLiturgica: "CONTRAINDICAÇÃO ABSOLUTA por perfil psiquiátrico de base.",
  },

  // 10. ANTIPSICÓTICOS TÍPICOS (1ª GERAÇÃO)
  {
    id: "antipsicoticos-haloperidol",
    classeNumero: 10,
    classeFarmacologica: "Antipsicóticos Típicos (Primeira Geração)",
    principioAtivo: "Haloperidol / Clorpromazina",
    nomesComerciais: ["Haldol", "Amplictil"],
    nivelRisco: "LETAL_ABSOLUTO",
    mecanismo: "Bloqueio potente D2 e efeitos extrapiramidais. Indica histórico psiquiátrico incompatível com expansão de consciência.",
    viasMetabolicas: "Hepática: CYP3A4, CYP2D6.",
    meiaVida: "14 a 26 horas.",
    washoutMinimo: "14 a 21 dias",
    recomendacaoLiturgica: "Contraindicação absoluta permanente.",
  },

  // 11. BENZODIAZEPÍNICOS
  {
    id: "benzodiazepinicos-clonazepam",
    classeNumero: 11,
    classeFarmacologica: "Benzodiazepínicos (Ansiolíticos)",
    principioAtivo: "Clonazepam / Diazepam / Alprazolam",
    nomesComerciais: ["Rivotril", "Valium", "Frontal"],
    nivelRisco: "SEVERO_MODERADO",
    mecanismo:
      "Potencializadores de GABA. O uso agudo amortece o transe litúrgico e pode mascarar sinais clínicos de alarme. O desmame abrupto causa convulsões por abstinência.",
    viasMetabolicas: "Hepática: CYP3A4, CYP2C19.",
    meiaVida: "Clonazepam: 30-40h | Diazepam: 20-50h (Nordiazepam: até 100h).",
    washoutMinimo: "21 a 28 dias (descontinuação gradual supervisionada)",
    recomendacaoLiturgica: "Nunca suspender abruptamente. Exigir orientação psiquiátrica de desmame.",
  },

  // 12. ESTIMULANTES DO SNC (TDAH E ANOREXÍGENOS)
  {
    id: "estimulantes-ritalina",
    classeNumero: 12,
    classeFarmacologica: "Estimulantes do SNC (TDAH e Anorexígenos)",
    principioAtivo: "Metilfenidato / Lisdexanfetamina / Sibutramina",
    nomesComerciais: ["Ritalina", "Concerta", "Venvanse", "Juneve"],
    nivelRisco: "LETAL_ABSOLUTO",
    mecanismo:
      "Estímulo simpático maciço aliado ao bloqueio de degradação de catecolaminas pelas beta-carbolinas da Ayahuasca. Risco agudo de pico hipertensivo (>180/120), arritmias ventriculares malignas e AVC.",
    viasMetabolicas: "Hepática e renal.",
    meiaVida: "Metilfenidato: 2-3h | D-anfetamina: 10-12h.",
    washoutMinimo: "7 a 14 dias",
    recomendacaoLiturgica: "Participação suspensa até conclusão do período de washout.",
  },

  // 13. ANALGÉSICOS OPIOIDES
  {
    id: "opioides-tramadol",
    classeNumero: 13,
    classeFarmacologica: "Analgésicos Opioides Serotoninérgicos",
    principioAtivo: "Cloridrato de Tramadol / Meperidina / Metadona",
    nomesComerciais: ["Tramal", "Sylador", "Dolosal"],
    nivelRisco: "LETAL_ABSOLUTO",
    mecanismo:
      "O Tramadol e a Meperidina atuam diretamente como inibidores da recaptação de serotonina e proconvulsivantes. Associação com Ayahuasca causa Síndrome Serotoninérgica letal e parada cardiorrespiratória.",
    viasMetabolicas: "Hepática: CYP2D6, CYP3A4.",
    meiaVida: "Tramadol: 6 a 7 horas.",
    washoutMinimo: "10 a 14 dias",
    recomendacaoLiturgica: "Contraindicação absoluta. Diversos registros internacionais de óbito por essa combinação.",
  },

  // 14. FITOTERÁPICOS E SUPLEMENTOS SEROTONINÉRGICOS
  {
    id: "fitoterapicos-hiperico",
    classeNumero: 14,
    classeFarmacologica: "Fitoterápicos e Suplementos Serotoninérgicos",
    principioAtivo: "Erva-de-São-João (Hypericum perforatum) / 5-HTP / L-Triptofano",
    nomesComerciais: ["Hipérico", "5-HTP manipulado", "Triptofano"],
    nivelRisco: "SEVERO_MODERADO",
    mecanismo: "O hipérico e o 5-HTP aumentam diretamente o pool de serotonina. Risco moderado a severo de hipertermia e toxicidade.",
    viasMetabolicas: "Hepática: indução de CYP3A4.",
    meiaVida: "Variável (24 a 48 horas).",
    washoutMinimo: "14 dias (2 semanas)",
    recomendacaoLiturgica: "Suspender com antecedência mínima de 14 dias.",
  },

  // 15. DESCONGESTIONANTES E ANTIGRIPAIS
  {
    id: "descongestionantes-dextrometorfano",
    classeNumero: 15,
    classeFarmacologica: "Descongestionantes Nasais e Antitussígenos",
    principioAtivo: "Dextrometorfano / Pseudoefedrina / Efedrina",
    nomesComerciais: ["Vick Pyrena", "Benalet", "Resfenol", "Decongex"],
    nivelRisco: "SEVERO_MODERADO",
    mecanismo:
      "O Dextrometorfano é um potente inibidor de SERT (risco de Síndrome Serotoninérgica). A Pseudoefedrina e Efedrina causam vasoconstrição adrenérgica severa com risco de crise hipertensiva.",
    viasMetabolicas: "Hepática: CYP2D6.",
    meiaVida: "Dextrometorfano: 2 a 4 horas (metabolizadores lentos: até 24h).",
    washoutMinimo: "72 horas a 7 dias",
    recomendacaoLiturgica: "Suspender todo xarope antigripal antes do rito.",
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
    "O Carbonato de Lítio (Carbolitium, Litiocar) em combinação com os alcaloides da Ayahuasca deflagra convulsões generalizadas e Status Epilepticus refratário com risco iminente de óbito ou encefalopatia anóxica permanente.",
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
    pergunta: "Qual a dosagem recomendada por pessoa em cada graduação?",
    resposta:
      "A calibração varia conforme a graduação fitoquímica: na graduação 3:1 Mainumbi (suave), a dose sugerida é de 90 a 120 ml; na graduação 5:1 Pituã (equilibrada canônica), a dose é de 70 a 100 ml; na graduação 7:1 Anhangatã (alta concentração), 50 a 80 ml; e na graduação 10:1 Wirapuru servida pura (semi-mel), apenas 30 a 45 ml por participante. Para pessoas em primeira comunhão, sempre inicie com dosagem conservadora reduzida (50% da dose padrão) e avalie a resposta corporal.",
    destaqueConselho:
      "Regra de Ouro: Mais vale uma dose moderada com ancoramento sereno do que uma sobrecarga somática que induza pânico ou fuga da experiência.",
  },
  {
    id: "faq-5",
    categoria: "DOSAGENS",
    pergunta: "Quando e como permitir a 2ª dose (o repasse) no ritual?",
    resposta:
      "O repasse jamais deve ser automático. O dirigente ou fiscal de apoio deve observar o participante após no mínimo 60 a 90 minutos da primeira comunhão. Se a pessoa estiver centrada, lúcida, sem vômitos repetitivos e solicitar conscientemente maior aprofundamento, serve-se uma porção moderada (metade da primeira dose). Caso a pessoa esteja demonstrando desorientação, angústia ou catarse intensa, a 2ª dose deve ser carinhosamente postergada.",
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
      "A Resolução CONAD nº 01/2010 veda taxativamente o comércio, venda de ingressos ou lucro sobre a Ayahuasca. O templo pode e deve instituir uma contribuição solidária ou taxa de rateio de manutenção da cerimônia (para cobrir os custos de luz, limpeza, lenha, alimentação comunitária e a cota de rateio cooperativo do sacramento). Essa contribuição deve ser transparente, estatutária e jamais atrelada ao conceito de 'compra de dose'.",
  },
];

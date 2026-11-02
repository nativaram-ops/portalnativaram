/**
 * Base de Conhecimento e Dados da Assessoria Litúrgica — Portal do Dirigente
 * Cooperativa Nativaram
 *
 * Referências do Caderno de Segurança:
 * - Resolução CONAD nº 01/2010 (Diretrizes para o Uso Religioso da Ayahuasca)
 * - Constituição Federal de 1988 (Art. 5º, VI e VIII; Art. 215 e 216)
 * - Lei Federal nº 11.343/2006 (Art. 2º, parágrafo único)
 * - Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)
 * - Compêndio Etnofarmacológico, Tabela de Medicamentos Controlados, Hunter Toxicity Criteria e Zendo Project
 *
 * Matriz de interações (plano 010, parte A): cada entrada declara o motivo da restrição,
 * o nível de evidência, as fontes com URL e o status de revisão clínica. Nenhuma entrada
 * foi revisada por médico ou farmacêutico até agora (revisao.status = "PENDENTE").
 */

export type DiretrizOperacionalPdf =
  | "NAO_PODE_PARTICIPAR"
  | "CASO_CLINICO_NAO_RECOMENDADO"
  | "INTERROMPER_DIAS_ANTES"
  | "NAO_TOMAR_NO_DIA";

/** Por que a entrada restringe a participação: interação farmacológica, condição de saúde de base, ou ambos. */
export type MotivoRestricao = "INTERACAO" | "CONDICAO_DE_BASE" | "AMBOS";

/** A ensaio clínico · B série/relato de caso · C farmacologia/bula · D extrapolação */
export type NivelEvidencia = "A" | "B" | "C" | "D";

export interface FonteReferencia {
  titulo: string;
  url: string;
  ano: number;
}

export interface RevisaoClinica {
  status: "PENDENTE" | "REVISADO";
  data?: string;
  responsavel?: string;
}

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
  motivo: MotivoRestricao;
  evidencia: NivelEvidencia;
  fontes: FonteReferencia[];
  revisao: RevisaoClinica;
  /** Grafias alternativas e nomes populares usados pela busca. */
  termosBusca?: string[];
}

export const ROTULOS_EVIDENCIA: Record<NivelEvidencia, string> = {
  A: "A · Ensaio clínico",
  B: "B · Série ou relato de caso",
  C: "C · Farmacologia ou bula",
  D: "D · Extrapolação",
};

export const ROTULOS_MOTIVO: Record<MotivoRestricao, string> = {
  INTERACAO: "Interação com a Ayahuasca",
  CONDICAO_DE_BASE: "Condição de saúde de base",
  AMBOS: "Interação e condição de base",
};

const REVISAO_PENDENTE: RevisaoClinica = Object.freeze({ status: "PENDENTE" }) as RevisaoClinica;

const FONTE_NAYAK_2021: FonteReferencia = {
  titulo:
    "Nayak SM et al. Classic Psychedelic Coadministration with Lithium, but Not Lamotrigine, is Associated with Seizures. Pharmacopsychiatry",
  url: "https://pubmed.ncbi.nlm.nih.gov/34348413/",
  ano: 2021,
};

const FONTE_HALMAN_2024: FonteReferencia = {
  titulo:
    "Halman A et al. Drug–drug interactions involving classic psychedelics: A systematic review. J Psychopharmacol",
  url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10851641/",
  ano: 2024,
};

const FONTE_SKLEROV_2005: FonteReferencia = {
  titulo:
    "Sklerov J et al. A fatal intoxication following the ingestion of 5-MeO-DMT in an ayahuasca preparation. J Anal Toxicol",
  url: "https://pubmed.ncbi.nlm.nih.gov/16356341/",
  ano: 2005,
};

const FONTE_BULA_CICLOBENZAPRINA: FonteReferencia = {
  titulo: "Bula de ciclobenzaprina (DailyMed, consultada em 2026)",
  url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ca74d27a-f7c6-462d-a913-1cfa061bd8f3",
  ano: 2026,
};

const FONTE_ASA_GLP1_2024: FonteReferencia = {
  titulo:
    "Guia multissociedades sobre agonistas de GLP-1 antes de procedimentos (American Society of Anesthesiologists e outras)",
  url: "https://asahq.org/about-asa/newsroom/news-releases/2024/10/new-multi-society-glp-1-guidance",
  ano: 2024,
};

const FONTE_BULA_SEPURIN: FonteReferencia = {
  titulo: "Bula do Sepurin — contraindicações e interações do azul de metileno (consultada em 2026)",
  url: "https://bula.com.br/sepurin/contraindicacao",
  ano: 2026,
};

const JANELA_A_DEFINIR = "Janela a definir pelo revisor clínico (não usar até a definição)";

/**
 * Pendências clínicas da auditoria (plano 010, seções A1 e A2/A3).
 * Contradições entre a matriz, o compêndio e a ficha de anamnese, e decisões que só
 * um médico ou farmacêutico pode tomar. Nenhuma foi resolvida por agente.
 */
export const PENDENCIAS_CLINICAS: string[] = [
  "Benzodiazepínicos (Rivotril, Frontal, Valium): a matriz diz NÃO TOMAR NO DIA (24 h); o compêndio diz 21 a 28 dias de washout; a ficha de anamnese só lista, sem janela.",
  "ISRS exceto fluoxetina: a matriz diz 14 a 21 dias; o compêndio e a ficha de anamnese dizem 21 a 28 dias.",
  "ISRSN (venlafaxina, duloxetina): a matriz diz 14 a 21 dias; o compêndio e a ficha de anamnese dizem 21 a 28 dias.",
  "Antipsicóticos: a matriz diz exclusão definitiva; o compêndio diz ao mesmo tempo '21 a 28 dias' e 'contraindicação absoluta'.",
  "Anticonvulsivantes: a matriz diz veto (vermelho); o compêndio diz 14 a 21 dias.",
  "Gabapentinoides (Lyrica): a matriz diz não tomar no dia; o compêndio diz 7 a 10 dias.",
  "Transtorno bipolar: o compêndio contraindica o Tipo I; a ficha de anamnese contraindica Tipo I ou II.",
  "Pressão arterial: o compêndio impede a participação com ≥ 160/100; a ficha marca hipertensão com ≥ 140/90. Falta uma tabela única com triagem (140/90), impedimento no dia (160/100) e emergência (180/110 → SAMU), com os números finais definidos pelo revisor clínico.",
  "Lamotrigina, topiramato e levetiracetam: veto vermelho mantido; a auditoria propõe que a decisão dependa do motivo do uso, pois a interação não foi demonstrada (Nayak 2021).",
  "Ciprofloxacino, claritromicina, fluconazol e ritonavir: vermelho mantido; a auditoria propõe laranja ou azul com decisão médica, porque não são IMAOs.",
  "Anti-histamínicos (clorfeniramina, dexclorfeniramina, prometazina): azul e nível 'letal' mantidos; a auditoria propõe laranja (sedação).",
  "Isoniazida: mantida com os IMAOs ocultos (vermelho) pela ação inibidora fraca da MAO; confirmar a classificação.",
  "Entradas novas da seção A3 sem janela numérica: ciclobenzaprina, isometepteno, atomoxetina, cetamina/escetamina, domperidona e eixo QT, pré-treinos, substâncias cerimoniais e recreativas.",
  "Furazolidona: nenhuma marca comercial verificada no Brasil (a marca 'Girotto' foi removida por não ter sido localizada).",
  "Todas as marcas comerciais precisam de conferência na base da ANVISA; 'Nardil' e 'Marplan' foram removidas por não serem comercializadas no Brasil.",
  "O nível de evidência (A a D) de cada entrada foi atribuído por agente a partir do tipo de dado disponível; confirmar entrada por entrada.",
];

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
 * Matriz de Classes Farmacológicas e Princípios Ativos em Interação com Ayahuasca.
 * Contagens (classes, entradas, marcas) são calculadas a partir destes dados; não fixar números no código.
 * Lista NÃO exaustiva: não estar aqui não significa ser seguro.
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
    motivo: "AMBOS",
    evidencia: "C",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["parkinson"],
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
    motivo: "AMBOS",
    evidencia: "C",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["parkinson", "imao-b"],
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
    motivo: "AMBOS",
    evidencia: "D",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["parkinson"],
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
    motivo: "AMBOS",
    evidencia: "D",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["antipsicotico"],
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
    motivo: "AMBOS",
    evidencia: "D",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["antipsicotico"],
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
    motivo: "AMBOS",
    evidencia: "C",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["antipsicotico"],
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
    motivo: "AMBOS",
    evidencia: "D",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["antipsicotico"],
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
    motivo: "AMBOS",
    evidencia: "D",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["antipsicotico"],
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
      "Em 62 relatos online de uso de psicodélicos clássicos com lítio, 47% descreveram convulsão e 39% descreveram atendimento médico (Nayak et al., 2021). São relatos autodeclarados (Erowid e Reddit), quase todos com LSD ou psilocibina, não com Ayahuasca: a evidência é fraca, mas o sinal é grave e consistente, por isso o veto é mantido. Hipótese de mecanismo, não demonstrada: o lítio inibe a enzima inositol monofosfatase (IMPase) e poderia alterar a sinalização ligada ao receptor 5-HT2A. Soma-se o risco de toxicidade do próprio lítio, de janela terapêutica estreita, agravado pelo vômito e pela desidratação da purga.",
    viasMetabolicas: "Exclusivamente Renal (95% inalterado; janela terapêutica estreitíssima).",
    meiaVida: "18 a 36 horas.",
    washoutMinimo: "NÃO PODE PARTICIPAR (Veto absoluto e permanente / mínimo 30 dias se suspenso no passado por psiquiatra)",
    recomendacaoLiturgica:
      "NÃO PODE PARTICIPAR (Classificação Vermelha). Portadores de Transtorno Afetivo Bipolar em uso de Carbolitium ou Priadel estão terminantemente proibidos de consagrar Ayahuasca.",
    motivo: "AMBOS",
    evidencia: "B",
    fontes: [FONTE_NAYAK_2021, FONTE_HALMAN_2024],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["litio", "carbonato de litio", "sal de litio"],
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
    motivo: "AMBOS",
    evidencia: "D",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["valproato", "divalproato"],
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
    motivo: "AMBOS",
    evidencia: "C",
    fontes: [],
    revisao: REVISAO_PENDENTE,
  },
  {
    id: "anticonvulsivante-fenobarbital",
    classeNumero: 5,
    classeFarmacologica: "Anticonvulsivantes Barbitúricos",
    principioAtivo: "Fenobarbital",
    nomesComerciais: ["Gardenal", "Edhanol", "Barbitron"],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "NAO_PODE_PARTICIPAR",
    mecanismo:
      "O Fenobarbital (Gardenal/Edhanol) é um barbitúrico depressor profundo do SNC, com risco de depressão respiratória somada à sedação dos alcaloides harmala. O uso também indica epilepsia, condição que por si só exige avaliação médica.",
    viasMetabolicas: "Hepática: CYP2C9 e CYP2C19.",
    meiaVida: "53 a 118 horas.",
    washoutMinimo: "NÃO PODE PARTICIPAR (Vetado)",
    recomendacaoLiturgica:
      "NÃO PODE PARTICIPAR (Classificação Vermelha). Veto expresso para Gardenal e Edhanol.",
    motivo: "AMBOS",
    evidencia: "C",
    fontes: [],
    revisao: REVISAO_PENDENTE,
  },
  {
    id: "anticonvulsivante-lamotrigina-topiramato-levetiracetam",
    classeNumero: 5,
    classeFarmacologica: "Anticonvulsivantes (Veto pela Condição de Base)",
    principioAtivo: "Lamotrigina / Topiramato / Levetiracetam",
    nomesComerciais: ["Lamictal", "Neural", "Lamitor", "Topamax", "Keppra"],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "NAO_PODE_PARTICIPAR",
    mecanismo:
      "O veto desta entrada decorre da CONDIÇÃO DE BASE (epilepsia ou transtorno bipolar em estabilização), não de uma interação letal demonstrada. Nayak et al. (2021) não encontraram convulsões em 34 relatos online de uso de psicodélicos clássicos com lamotrigina. Para topiramato e levetiracetam não há dado de interação localizado. A decisão depende do motivo do uso e do parecer do médico assistente; a classificação vermelha foi mantida até a revisão clínica.",
    viasMetabolicas: "Hepática: glicuronidação UGT1A4 (Lamotrigina) | Renal, em grande parte inalterado (Topiramato, Levetiracetam).",
    meiaVida: "Lamotrigina: 25 a 33 horas | Topiramato e Levetiracetam: variável (consultar bula).",
    washoutMinimo: "NÃO PODE PARTICIPAR (Veto pela condição de base; decisão individual com o médico assistente)",
    recomendacaoLiturgica:
      "NÃO PODE PARTICIPAR (Classificação Vermelha mantida até revisão clínica). Perguntar o motivo do uso: epilepsia mantém o veto; outros usos dependem de parecer médico. Nunca orientar a suspensão por conta própria.",
    motivo: "CONDICAO_DE_BASE",
    evidencia: "B",
    fontes: [FONTE_NAYAK_2021, FONTE_HALMAN_2024],
    revisao: REVISAO_PENDENTE,
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
    motivo: "INTERACAO",
    evidencia: "D",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["remedio para dormir", "indutor de sono"],
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
    motivo: "INTERACAO",
    evidencia: "D",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["calmante", "tarja preta", "benzodiazepinico"],
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
    motivo: "AMBOS",
    evidencia: "D",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["calmante", "tarja preta", "benzodiazepinico"],
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
    motivo: "INTERACAO",
    evidencia: "D",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["calmante", "benzodiazepinico"],
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
    motivo: "INTERACAO",
    evidencia: "C",
    fontes: [],
    revisao: REVISAO_PENDENTE,
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
    motivo: "INTERACAO",
    evidencia: "C",
    fontes: [],
    revisao: REVISAO_PENDENTE,
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
    motivo: "INTERACAO",
    evidencia: "C",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["isrs", "antidepressivo"],
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
    motivo: "INTERACAO",
    evidencia: "C",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["isrs", "antidepressivo"],
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
    motivo: "INTERACAO",
    evidencia: "C",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["isrs", "antidepressivo"],
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
    motivo: "INTERACAO",
    evidencia: "C",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["isrs", "antidepressivo"],
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
    motivo: "INTERACAO",
    evidencia: "C",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["isrsn", "antidepressivo"],
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
    motivo: "INTERACAO",
    evidencia: "C",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["triciclico", "antidepressivo"],
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
    motivo: "INTERACAO",
    evidencia: "C",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["antidepressivo"],
  },

  // ============================================================================
  // CLASSE 12: ANTIDEPRESSIVOS IMAO IRREVERSÍVEIS E RIMA SINTÉTICOS (AZUL / LETAL)
  // ============================================================================
  {
    id: "imao-tranilcipromina-moclobemida",
    classeNumero: 12,
    classeFarmacologica: "Antidepressivos IMAO Irreversíveis e RIMA Sintéticos",
    principioAtivo: "Tranilcipromina / Tranilcipromina + Trifluoperazina / Moclobemida",
    nomesComerciais: ["Parnate", "Stelapar (Tranilcipromina + Trifluoperazina)", "Aurorix"],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "INTERROMPER_DIAS_ANTES",
    mecanismo:
      "Parnate e Stelapar inativam de forma irreversível as enzimas MAO-A e MAO-B (e o Stelapar ainda contém o antipsicótico Trifluoperazina). A Moclobemida (Aurorix) é um IMAO-A sintético. A soma farmacológica com as beta-carbolinas da Ayahuasca provoca crise hipertensiva fulminante, hemorragia intracraniana, hipertermia maligna e colapso cardiovascular.",
    viasMetabolicas: "Inativação covalente da MAO (Parnate/Stelapar) | Hepática CYP2C19/CYP2D6 (Moclobemida).",
    meiaVida: "Regeneração enzimática da MAO leva de 14 a 28 dias.",
    washoutMinimo: "Parnate / Stelapar: 28 a 35 dias (ou veto absoluto) | Moclobemida (Aurorix): 14 dias",
    recomendacaoLiturgica:
      "INTERROMPER DIAS ANTES COM AVAL MÉDICO (Classificação Azul / Risco Letal Absoluto). Stelapar possui dupla contraindicação (IMAO + Antipsicótico).",
    motivo: "INTERACAO",
    evidencia: "C",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["imao", "antidepressivo"],
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
    motivo: "INTERACAO",
    evidencia: "C",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["tdah"],
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
    motivo: "INTERACAO",
    evidencia: "C",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["emagrecer", "inibidor de apetite", "formula para emagrecer"],
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
    motivo: "INTERACAO",
    evidencia: "C",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["opioide", "petidina"],
  },

  // ============================================================================
  // CLASSE 16: ANTIMIGRANOSOS / ENXAQUECA (AZUL: INTERROMPER DIAS ANTES)
  // ============================================================================
  {
    id: "enxaqueca-triptanos-ergotaminicos",
    classeNumero: 16,
    classeFarmacologica: "Antimigranosos (Triptanos Agonistas 5-HT1B/1D e Ergotamínicos)",
    principioAtivo: "Sumatriptano / Naratriptano / Zolmitriptano / Rizatriptano / Eletriptano / Ergotamina / Dihidroergotamina",
    nomesComerciais: ["Sumax", "Imigran", "Naramig", "Zomig", "Maxalt", "Cefaliv", "Cefalium", "Ormigrein", "Tonopan"],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "INTERROMPER_DIAS_ANTES",
    mecanismo:
      "Os triptanos são agonistas de receptores de serotonina 5-HT1B/1D. Sumatriptano e rizatriptano são degradados principalmente pela MAO-A, assim como o metabólito ativo do zolmitriptano; com a MAO-A inibida pela Ayahuasca, os níveis podem subir, com risco de toxicidade serotoninérgica e vasoespasmo coronariano ou cerebral. Naratriptano e eletriptano não dependem da MAO-A (eliminação renal e via CYP3A4, respectivamente), mas mantêm o efeito serotoninérgico e vasoconstritor, por isso a orientação conservadora é a mesma para todo o grupo. Ergotamínicos (Cefaliv/Ormigrein) causam vasoconstrição periférica grave.",
    viasMetabolicas:
      "MAO-A (Sumatriptano, Rizatriptano e o metabólito ativo do Zolmitriptano, formado via CYP1A2) | Renal e CYP (Naratriptano) | CYP3A4 (Eletriptano e Ergotamínicos).",
    meiaVida: "2 a 6 horas (Ergotamina: efeito vasoconstritor dura até 24-48h).",
    washoutMinimo: "5 a 7 dias antes e pelo menos 48h após a sessão",
    recomendacaoLiturgica:
      "INTERROMPER DIAS ANTES (Classificação Azul). Se o participante tiver dor de cabeça antes ou durante o rito, JAMAIS permitir o uso de Sumax, Naramig, Cefaliv ou Ormigrein.",
    motivo: "INTERACAO",
    evidencia: "C",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["triptano", "enxaqueca"],
  },

  // ============================================================================
  // CLASSE 17: ANTIGRIPAIS, XAROPES (DXM) E ANTI-HISTAMÍNICOS (AZUL: INTERROMPER DIAS ANTES)
  // ============================================================================
  {
    id: "antigripais-dextrometorfano-simpatomimeticos",
    classeNumero: 17,
    classeFarmacologica: "Antitussígenos (DXM), Descongestionantes Simpatomiméticos e Antigripais de Associação",
    principioAtivo: "Dextrometorfano (DXM) / Pseudoefedrina / Fenilefrina",
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
    ],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "INTERROMPER_DIAS_ANTES",
    mecanismo:
      "O Dextrometorfano (xaropes para tosse seca como o Vick 44E) inibe a recaptação de serotonina e, com IMAO, pode precipitar Síndrome Serotoninérgica; é metabolizado pelo CYP2D6. A Pseudoefedrina e a Fenilefrina (Claritin-D, Allegra D, Decongex Plus) são simpatomiméticos: com a MAO inibida, podem causar descarga adrenérgica e crise hipertensiva. Antigripais de associação (Resfenol, Coristina D, Benegrip, Multigrip) combinam vários ativos, como analgésico, anti-histamínico, descongestionante e cafeína; foram classificados aqui pelo componente mais restritivo, e a composição de cada um deve ser conferida na bula.",
    viasMetabolicas: "Hepática: CYP2D6 (DXM) | MAO e sulfatação (Fenilefrina) | Renal, em grande parte inalterada (Pseudoefedrina).",
    meiaVida: "4 a 24 horas.",
    washoutMinimo: "5 a 7 dias antes da cerimônia",
    recomendacaoLiturgica:
      "INTERROMPER DIAS ANTES (Classificação Azul). Alertar todos os participantes a não tomarem xaropes para tosse, antigripais ou descongestionantes nasais na semana do trabalho.",
    motivo: "INTERACAO",
    evidencia: "C",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["xarope para tosse", "antigripal", "descongestionante", "dxm"],
  },
  {
    id: "antigripais-anti-histaminicos-clorfeniramina-prometazina",
    classeNumero: 17,
    classeFarmacologica: "Anti-histamínicos de Primeira Geração (Sedativos)",
    principioAtivo: "Clorfeniramina / Dexclorfeniramina / Prometazina",
    nomesComerciais: ["Polaramine", "Fenergan"],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "INTERROMPER_DIAS_ANTES",
    mecanismo:
      "A Clorfeniramina tem ação fraca no transportador de serotonina (SERT). O risco principal deste grupo é a sedação e o efeito anticolinérgico (boca seca, confusão, retenção urinária), somados aos efeitos da Ayahuasca. A Prometazina (Fenergan) é uma fenotiazina com efeito sedativo e anticolinérgico. A auditoria propõe classificar este grupo como laranja (sedação); a classificação atual foi mantida até a revisão clínica.",
    viasMetabolicas: "Hepática: CYP2D6 (Clorfeniramina e Prometazina).",
    meiaVida: "Variável (consultar bula).",
    washoutMinimo: "5 a 7 dias antes da cerimônia",
    recomendacaoLiturgica:
      "INTERROMPER DIAS ANTES (Classificação Azul mantida até revisão clínica). Perguntar sobre antialérgicos e antigripais usados na semana do trabalho.",
    motivo: "INTERACAO",
    evidencia: "C",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["antialergico", "anti-histaminico"],
  },

  // ============================================================================
  // CLASSE 18: ANTIBIÓTICOS COM AÇÃO IMAO E INIBIDORES POTENTES DE CYP (VERMELHO/AZUL)
  // ============================================================================
  {
    id: "imao-ocultos-linezolida-azul-metileno-furazolidona",
    classeNumero: 18,
    classeFarmacologica: "Anti-infecciosos e Antissépticos com Ação IMAO",
    principioAtivo: "Linezolida / Azul de Metileno / Furazolidona / Isoniazida",
    nomesComerciais: ["Zyvox", "Sepurin (Metenamina + Azul de Metileno)"],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "NAO_PODE_PARTICIPAR",
    mecanismo:
      "A Linezolida (Zyvox), o Azul de Metileno e a Furazolidona inibem a monoamina oxidase. Somados aos IMAO-A da Ayahuasca, há risco de Síndrome Serotoninérgica e crise hipertensiva. O Sepurin, antisséptico urinário de venda comum, associa metenamina e azul de metileno, e a sua bula descreve a inibição da MAO com risco serotoninérgico. A Isoniazida tem ação inibidora da MAO descrita como fraca e foi mantida neste grupo até a revisão clínica.",
    viasMetabolicas: "Inibição da MAO (Linezolida, Azul de Metileno, Furazolidona) | Hepática: acetilação via NAT2 (Isoniazida).",
    meiaVida: "Variável (consultar bula).",
    washoutMinimo:
      "NÃO PODE PARTICIPAR durante o uso | Linezolida: 14 dias após fim do tratamento | Demais: janela a definir pelo revisor clínico",
    recomendacaoLiturgica:
      "NÃO PODE PARTICIPAR (Classificação Vermelha) durante o uso. Perguntar ativamente sobre antissépticos urinários (Sepurin) e antibióticos recentes.",
    motivo: "INTERACAO",
    evidencia: "C",
    fontes: [FONTE_BULA_SEPURIN],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["azul de metileno", "antisseptico urinario", "metenamina", "infeccao urinaria"],
  },
  {
    id: "inibidores-cyp-ciprofloxacino-claritromicina-fluconazol-ritonavir",
    classeNumero: 18,
    classeFarmacologica: "Antibióticos, Antifúngicos Azólicos e Antirretrovirais Inibidores de CYP",
    principioAtivo: "Ciprofloxacino / Claritromicina / Fluconazol / Ritonavir",
    nomesComerciais: ["Cipro", "Klaricid", "Zoltec", "Norvir", "Kaletra"],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "NAO_PODE_PARTICIPAR",
    mecanismo:
      "Estes fármacos não são IMAOs. O Ciprofloxacino inibe o CYP1A2; a Claritromicina e o Ritonavir inibem o CYP3A4 (o Ritonavir também o CYP2D6); o Fluconazol inibe CYP2C9, CYP2C19 e CYP3A4. Isso pode reduzir a depuração hepática da Harmina e da Harmalina e prolongar o efeito. A gravidade depende do fármaco, da dose e da infecção em curso. A auditoria propõe tratar este grupo como decisão médica (laranja ou azul); a classificação vermelha foi mantida até a revisão clínica.",
    viasMetabolicas:
      "Inibição de CYP1A2 (Ciprofloxacino), CYP3A4 (Claritromicina, Fluconazol, Ritonavir), CYP2C9/CYP2C19 (Fluconazol) e CYP2D6 (Ritonavir).",
    meiaVida: "Variável (consultar bula).",
    washoutMinimo:
      "Ciprofloxacino/Claritromicina/Fluconazol: 5 a 7 dias após término | Ritonavir (uso contínuo): não suspender; decisão do infectologista",
    recomendacaoLiturgica:
      "NÃO PODE PARTICIPAR durante o ciclo de antibiótico ou antifúngico (classificação mantida até revisão clínica). Aguardar recuperação infecciosa e washout. Antirretrovirais nunca devem ser suspensos para participar.",
    motivo: "AMBOS",
    evidencia: "D",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["antibiotico", "antifungico", "antirretroviral"],
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
    washoutMinimo:
      "Agentes diários (Liraglutida, Semaglutida oral): não aplicar/tomar no dia | Agentes semanais (Semaglutida, Tirzepatida, Dulaglutida): suspender a aplicação da semana só por decisão do prescritor | Dieta líquida nas 24h anteriores",
    recomendacaoLiturgica:
      "NÃO TOMAR NO DIA os agentes diários (Classificação Laranja). Para os agentes semanais, quem decide suspender a aplicação da semana é o prescritor, sobretudo em fase de escalonamento ou com sintomas gástricos. Dieta líquida nas 24h anteriores, monitorar glicemia (ter mel/glicose no salão) e manter o participante sentado ou em decúbito lateral durante a limpeza (purga). Regra adaptada do guia multissociedades de 2024 para procedimentos com sedação; não há estudo com Ayahuasca.",
    motivo: "AMBOS",
    evidencia: "D",
    fontes: [FONTE_ASA_GLP1_2024],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["caneta emagrecedora", "canetinha", "emagrecer", "diabetes"],
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
    motivo: "INTERACAO",
    evidencia: "C",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["erva de sao joao", "suplemento"],
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
    motivo: "INTERACAO",
    evidencia: "D",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["enjoo", "gabapentinoide"],
  },

  // ============================================================================
  // ENTRADAS NOVAS DA AUDITORIA (PLANO 010, SEÇÃO A3) — TODAS COM REVISÃO CLÍNICA PENDENTE
  // ============================================================================
  {
    id: "tdah-atomoxetina",
    classeNumero: 13,
    classeFarmacologica: "Não Estimulantes para TDAH (Inibidor da Recaptação de Noradrenalina)",
    principioAtivo: "Cloridrato de Atomoxetina",
    nomesComerciais: ["Atentah"],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "INTERROMPER_DIAS_ANTES",
    mecanismo:
      "A Atomoxetina inibe a recaptação de noradrenalina. A bula contraindica o uso junto com IMAO pelo risco de reações graves, como crise hipertensiva. É metabolizada pelo CYP2D6, enzima que as beta-carbolinas podem inibir.",
    viasMetabolicas: "Hepática: CYP2D6.",
    meiaVida: "Variável (consultar bula); mais longa em metabolizadores lentos do CYP2D6.",
    washoutMinimo: JANELA_A_DEFINIR,
    recomendacaoLiturgica:
      "INTERROMPER DIAS ANTES COM AVAL MÉDICO (Classificação Azul, revisão clínica pendente). Perguntar sobre tratamento de TDAH mesmo quando a pessoa diz que não usa estimulante.",
    motivo: "INTERACAO",
    evidencia: "C",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["tdah"],
  },
  {
    id: "relaxante-muscular-ciclobenzaprina",
    classeNumero: 21,
    classeFarmacologica: "Relaxantes Musculares de Ação Central (Estrutura Tricíclica)",
    principioAtivo: "Cloridrato de Ciclobenzaprina",
    nomesComerciais: [
      "Miosan",
      "Mirtax",
      "Benziflex",
    ],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "INTERROMPER_DIAS_ANTES",
    mecanismo:
      "A Ciclobenzaprina tem estrutura tricíclica, próxima à da Amitriptilina. A bula americana (DailyMed) contraindica o uso junto com IMAO ou nos 14 dias após a suspensão de um IMAO, pelo risco de Síndrome Serotoninérgica, crise hiperpirética e convulsões. É um dos relaxantes musculares mais vendidos no Brasil, e quem usa costuma não lembrar dele como medicamento controlado.",
    viasMetabolicas: "Hepática: CYP3A4, CYP1A2 e, em menor grau, CYP2D6.",
    meiaVida: "Cerca de 18 horas (faixa de 8 a 37 horas, segundo a bula americana).",
    washoutMinimo: JANELA_A_DEFINIR,
    recomendacaoLiturgica:
      "INTERROMPER DIAS ANTES COM AVAL MÉDICO (Classificação Azul, revisão clínica pendente). Perguntar ativamente sobre relaxantes musculares usados para dor nas costas, torcicolo ou contratura.",
    motivo: "INTERACAO",
    evidencia: "C",
    fontes: [FONTE_BULA_CICLOBENZAPRINA],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["relaxante muscular", "miorrelaxante"],
  },
  {
    id: "analgesico-isometepteno",
    classeNumero: 22,
    classeFarmacologica: "Analgésicos Associados a Simpatomimético (Cefaleia)",
    principioAtivo: "Mucato de Isometepteno (associado a Dipirona e Cafeína)",
    nomesComerciais: ["Neosaldina", "Dipirona + Isometepteno + Cafeína (genéricos)"],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "INTERROMPER_DIAS_ANTES",
    mecanismo:
      "O Isometepteno é um simpatomimético vasoconstritor. O uso junto com inibidores da MAO é contraindicado em bula pelo risco de crise hipertensiva. É um dos analgésicos mais vendidos no país, usado para dor de cabeça, e costuma ser omitido na triagem.",
    viasMetabolicas: "Não detalhada (consultar bula).",
    meiaVida: "Variável (consultar bula).",
    washoutMinimo: JANELA_A_DEFINIR,
    recomendacaoLiturgica:
      "INTERROMPER DIAS ANTES (Classificação Azul, revisão clínica pendente). Se houver dor de cabeça antes ou durante o rito, não oferecer Neosaldina nem genéricos com Isometepteno.",
    motivo: "INTERACAO",
    evidencia: "C",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["dor de cabeca", "cefaleia"],
  },
  {
    id: "nmda-cetamina-escetamina",
    classeNumero: 23,
    classeFarmacologica: "Antagonistas NMDA (Anestésico Dissociativo e Depressão Resistente)",
    principioAtivo: "Cetamina / Escetamina",
    nomesComerciais: ["Spravato"],
    nivelRisco: "SEVERO_MODERADO",
    diretrizPdf: "INTERROMPER_DIAS_ANTES",
    mecanismo:
      "Antagonistas do receptor NMDA, com efeito dissociativo. A Escetamina (Spravato, spray nasal) é usada em depressão resistente, sob supervisão em serviço de saúde, e eleva a pressão arterial nas horas seguintes à aplicação. Não há dado de interação com Ayahuasca; somam-se a elevação da pressão, o efeito dissociativo e o quadro psiquiátrico de base.",
    viasMetabolicas: "Hepática: CYP3A4 e CYP2B6.",
    meiaVida: "Variável (consultar bula).",
    washoutMinimo: JANELA_A_DEFINIR,
    recomendacaoLiturgica:
      "INTERROMPER DIAS ANTES COM AVAL MÉDICO (Classificação Azul, revisão clínica pendente). Quem está em tratamento de depressão resistente precisa de parecer do psiquiatra antes de participar.",
    motivo: "AMBOS",
    evidencia: "D",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["ketamina", "esketamina", "ketamine"],
  },
  {
    id: "eixo-qt-domperidona",
    classeNumero: 24,
    classeFarmacologica: "Fármacos que Prolongam o Intervalo QT",
    principioAtivo: "Domperidona / Azitromicina / Hidroxicloroquina",
    nomesComerciais: ["Motilium", "Peridal"],
    nivelRisco: "SEVERO_MODERADO",
    diretrizPdf: "INTERROMPER_DIAS_ANTES",
    mecanismo:
      "A Domperidona, usada para náusea e má digestão, prolonga o intervalo QT e é metabolizada pelo CYP3A4. Também prolongam o QT a Azitromicina, a Hidroxicloroquina, a Ondansetrona em dose alta (classe 20) e a Metadona (classe 15). O risco de arritmia cresce quando esses fármacos se somam entre si, a vômitos com perda de potássio ou a outras substâncias que alteram o ritmo cardíaco, como a ibogaína (classe 27). Não há dado sobre o efeito da Ayahuasca no QT; esta entrada serve de triagem do eixo QT.",
    viasMetabolicas: "Hepática: CYP3A4 (Domperidona) | Variável nos demais (consultar bula).",
    meiaVida: "Variável (consultar bula).",
    washoutMinimo: JANELA_A_DEFINIR,
    recomendacaoLiturgica:
      "INTERROMPER DIAS ANTES COM AVAL MÉDICO (Classificação Azul, revisão clínica pendente). Perguntar sobre medicamentos para enjoo, antibióticos recentes e histórico de arritmia ou desmaio.",
    motivo: "AMBOS",
    evidencia: "C",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["intervalo qt", "arritmia", "enjoo"],
  },
  {
    id: "suplementos-pre-treino-termogenicos",
    classeNumero: 25,
    classeFarmacologica: "Suplementos Pré-Treino e Termogênicos (Estimulantes Adrenérgicos)",
    principioAtivo: "Sinefrina / Cafeína Anidra em Dose Alta / DMAA (Dimetilamilamina)",
    nomesComerciais: [],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "INTERROMPER_DIAS_ANTES",
    mecanismo:
      "Pré-treinos e termogênicos combinam estimulantes adrenérgicos: Sinefrina (laranja-amarga), Cafeína anidra em dose alta e DMAA. Muitos também contêm Ioimbina (ver classe 20). Com a MAO inibida pela Ayahuasca, há risco de sobrecarga adrenérgica: taquicardia, crise hipertensiva e arritmia. Os rótulos costumam ser incompletos, e a pessoa raramente lembra desses produtos na triagem.",
    viasMetabolicas: "Variável (consultar rótulo e bula).",
    meiaVida: "Variável (consultar bula).",
    washoutMinimo: JANELA_A_DEFINIR,
    recomendacaoLiturgica:
      "INTERROMPER DIAS ANTES (Classificação Azul, revisão clínica pendente). Perguntar ativamente sobre suplementos de academia, pré-treinos, termogênicos e 'queimadores de gordura'.",
    motivo: "INTERACAO",
    evidencia: "C",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["pre-treino", "pre treino", "termogenico", "queimador de gordura", "suplemento de academia", "laranja amarga"],
  },
  {
    id: "cardiovasculares-clonidina-betabloqueadores-nitratos-amiodarona",
    classeNumero: 26,
    classeFarmacologica: "Cardiovasculares e Anti-hipertensivos (Triagem de Cardiopatia)",
    principioAtivo:
      "Clonidina / Betabloqueadores (Atenolol, Metoprolol, Carvedilol) / Nitratos (Isossorbida, Nitroglicerina) / Amiodarona",
    nomesComerciais: [],
    nivelRisco: "SEVERO_MODERADO",
    diretrizPdf: "CASO_CLINICO_NAO_RECOMENDADO",
    mecanismo:
      "O uso destes fármacos indica doença cardiovascular (hipertensão, angina, arritmia ou insuficiência cardíaca), que é o principal motivo de cautela: a Ayahuasca eleva a frequência cardíaca e a pressão arterial nas primeiras horas, e o vômito e a desidratação da purga podem causar hipotensão. Betabloqueadores e Clonidina podem somar bradicardia e hipotensão; nitratos, hipotensão; a Amiodarona prolonga o intervalo QT (ver classe 24) e tem meia-vida muito longa. Propranolol: ver classe 20. Suspender por conta própria é perigoso (rebote hipertensivo da Clonidina e dos betabloqueadores).",
    viasMetabolicas: "Variável (consultar bula).",
    meiaVida: "Variável (consultar bula); Amiodarona: semanas.",
    washoutMinimo: "NÃO SUSPENDER POR CONTA PRÓPRIA — participação depende de avaliação do cardiologista",
    recomendacaoLiturgica:
      "CASO CLÍNICO NÃO RECOMENDADO sem parecer do cardiologista (Classificação Laranja Escuro, revisão clínica pendente). Medir pressão arterial e frequência cardíaca antes do rito. Nunca orientar a suspensão de medicação cardiovascular.",
    motivo: "AMBOS",
    evidencia: "D",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["pressao alta", "hipertensao", "cardiopatia", "angina", "betabloqueador", "nitrato"],
  },
  {
    id: "cerimonial-5-meo-dmt-bufo",
    classeNumero: 27,
    classeFarmacologica: "Substâncias de Contexto Cerimonial e Enteógenos",
    principioAtivo: "5-MeO-DMT (secreção do sapo Bufo alvarius ou sintético)",
    nomesComerciais: [],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "INTERROMPER_DIAS_ANTES",
    mecanismo:
      "O 5-MeO-DMT é degradado principalmente pela MAO-A. Com as beta-carbolinas da Ayahuasca, seus níveis e sua duração podem subir de forma imprevisível. Há um óbito publicado após a ingestão de 5-MeO-DMT em preparado com harmala (Sklerov et al., J Anal Toxicol, 2005), com causalidade contestada.",
    viasMetabolicas: "MAO-A (principal) | CYP2D6 (gera bufotenina).",
    meiaVida: "Variável.",
    washoutMinimo: "Janela a definir pelo revisor clínico (nunca associar no mesmo período)",
    recomendacaoLiturgica:
      "INTERROMPER DIAS ANTES (Classificação Azul, revisão clínica pendente). Nunca associar Bufo/5-MeO-DMT à Ayahuasca no mesmo trabalho nem no mesmo período.",
    motivo: "INTERACAO",
    evidencia: "B",
    fontes: [FONTE_SKLEROV_2005],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["sapo", "bufo", "bufo alvarius", "5-meo", "5 meo", "5meo"],
  },
  {
    id: "cerimonial-kambo",
    classeNumero: 27,
    classeFarmacologica: "Substâncias de Contexto Cerimonial e Enteógenos",
    principioAtivo: "Kambô (secreção da rã Phyllomedusa bicolor)",
    nomesComerciais: [],
    nivelRisco: "SEVERO_MODERADO",
    diretrizPdf: "INTERROMPER_DIAS_ANTES",
    mecanismo:
      "A secreção contém peptídeos bioativos que causam vômito intenso, queda de pressão e taquicardia. Há relatos de hiponatremia grave pela ingestão de grande volume de água no ritual. Não há dado de interação com Ayahuasca; somam-se vômito, desidratação e alteração de pressão.",
    viasMetabolicas: "Não estabelecida.",
    meiaVida: "Variável.",
    washoutMinimo: "Janela a definir pelo revisor clínico (não associar no mesmo período)",
    recomendacaoLiturgica:
      "INTERROMPER DIAS ANTES (Classificação Azul, revisão clínica pendente). Perguntar a data da última aplicação de kambô.",
    motivo: "INTERACAO",
    evidencia: "D",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["kambo", "kampu", "vacina do sapo", "phyllomedusa"],
  },
  {
    id: "cerimonial-ibogaina",
    classeNumero: 27,
    classeFarmacologica: "Substâncias de Contexto Cerimonial e Enteógenos",
    principioAtivo: "Ibogaína (Tabernanthe iboga)",
    nomesComerciais: [],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "INTERROMPER_DIAS_ANTES",
    mecanismo:
      "A Ibogaína prolonga o intervalo QT, e há óbitos por arritmia publicados com o seu uso isolado. É metabolizada pelo CYP2D6 em noribogaína, de eliminação lenta. A associação com Ayahuasca não foi estudada; somam-se o risco cardíaco e o efeito serotoninérgico.",
    viasMetabolicas: "Hepática: CYP2D6 (gera noribogaína).",
    meiaVida: "Variável; o metabólito noribogaína permanece por dias.",
    washoutMinimo: "Janela a definir pelo revisor clínico (não associar no mesmo período)",
    recomendacaoLiturgica:
      "INTERROMPER DIAS ANTES (Classificação Azul, revisão clínica pendente). Perguntar sobre tratamentos com iboga ou ibogaína e sobre histórico cardíaco.",
    motivo: "INTERACAO",
    evidencia: "D",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["iboga"],
  },
  {
    id: "cerimonial-arruda-siria-peganum-harmala",
    classeNumero: 27,
    classeFarmacologica: "Substâncias de Contexto Cerimonial e Enteógenos",
    principioAtivo: "Arruda-síria (Peganum harmala)",
    nomesComerciais: [],
    nivelRisco: "SEVERO_MODERADO",
    diretrizPdf: "INTERROMPER_DIAS_ANTES",
    mecanismo:
      "As sementes de arruda-síria contêm as mesmas beta-carbolinas do cipó (Harmina e Harmalina), em concentração alta. Usada junto da Ayahuasca, dobra a carga de inibidores da MAO-A e de alcaloides harmala, com mais risco de vômito, hipotensão e tremor, e reforça todas as interações desta matriz.",
    viasMetabolicas: "Hepática: CYP1A2 e CYP2D6 (Harmina e Harmalina).",
    meiaVida: "Variável.",
    washoutMinimo: "Janela a definir pelo revisor clínico (não associar no mesmo período)",
    recomendacaoLiturgica:
      "INTERROMPER DIAS ANTES (Classificação Azul, revisão clínica pendente). Não reforçar o sacramento com arruda-síria ou extrato de harmala.",
    motivo: "INTERACAO",
    evidencia: "C",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["arruda siria", "harmala", "harmal", "peganum"],
  },
  {
    id: "cerimonial-jurema",
    classeNumero: 27,
    classeFarmacologica: "Substâncias de Contexto Cerimonial e Enteógenos",
    principioAtivo: "Jurema-preta (Mimosa tenuiflora / Mimosa hostilis)",
    nomesComerciais: [],
    nivelRisco: "SEVERO_MODERADO",
    diretrizPdf: "INTERROMPER_DIAS_ANTES",
    mecanismo:
      "A casca da raiz da jurema-preta contém DMT. Usada junto da Ayahuasca, soma DMT a uma carga de inibidores da MAO-A já presente, com efeito mais intenso e menos previsível.",
    viasMetabolicas: "MAO-A (DMT).",
    meiaVida: "Variável.",
    washoutMinimo: "Janela a definir pelo revisor clínico (não associar no mesmo período)",
    recomendacaoLiturgica:
      "INTERROMPER DIAS ANTES (Classificação Azul, revisão clínica pendente). Perguntar sobre uso recente de jurema ou vinho da jurema.",
    motivo: "INTERACAO",
    evidencia: "D",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["jurema preta", "mimosa hostilis", "mimosa tenuiflora", "vinho da jurema"],
  },
  {
    id: "cerimonial-san-pedro-mescalina",
    classeNumero: 27,
    classeFarmacologica: "Substâncias de Contexto Cerimonial e Enteógenos",
    principioAtivo: "Mescalina (cacto San Pedro / Huachuma; Peiote)",
    nomesComerciais: [],
    nivelRisco: "SEVERO_MODERADO",
    diretrizPdf: "INTERROMPER_DIAS_ANTES",
    mecanismo:
      "A Mescalina é uma fenetilamina psicodélica com efeito simpatomimético (taquicardia, elevação de pressão) e duração longa. A combinação com inibidores da MAO não foi estudada; o efeito pode ficar mais intenso e prolongado.",
    viasMetabolicas: "Renal (grande parte inalterada) e desaminação oxidativa.",
    meiaVida: "Variável.",
    washoutMinimo: "Janela a definir pelo revisor clínico (não associar no mesmo período)",
    recomendacaoLiturgica:
      "INTERROMPER DIAS ANTES (Classificação Azul, revisão clínica pendente). Perguntar sobre uso recente de San Pedro, Huachuma ou Peiote.",
    motivo: "INTERACAO",
    evidencia: "D",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["san pedro", "huachuma", "wachuma", "peiote", "peyote"],
  },
  {
    id: "recreativa-mdma",
    classeNumero: 28,
    classeFarmacologica: "Substâncias Recreativas",
    principioAtivo: "MDMA (Ecstasy)",
    nomesComerciais: [],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "INTERROMPER_DIAS_ANTES",
    mecanismo:
      "O MDMA provoca liberação maciça de serotonina, dopamina e noradrenalina. Com inibidores da MAO, há relatos de Síndrome Serotoninérgica grave e hipertermia, inclusive fatais. É uma das associações de maior risco desta matriz.",
    viasMetabolicas: "Hepática: CYP2D6 (principal), CYP1A2, CYP2B6 e CYP3A4.",
    meiaVida: "Variável.",
    washoutMinimo: "Janela a definir pelo revisor clínico (nunca associar)",
    recomendacaoLiturgica:
      "INTERROMPER DIAS ANTES (Classificação Azul, revisão clínica pendente). Perguntar de forma direta e sem julgamento sobre uso recente.",
    motivo: "INTERACAO",
    evidencia: "C",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["ecstasy", "extase", "bala", "molly"],
  },
  {
    id: "recreativa-cocaina",
    classeNumero: 28,
    classeFarmacologica: "Substâncias Recreativas",
    principioAtivo: "Cocaína (pó ou crack)",
    nomesComerciais: [],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "INTERROMPER_DIAS_ANTES",
    mecanismo:
      "A Cocaína bloqueia a recaptação de dopamina, noradrenalina e serotonina e é vasoconstritora. Com inibidores da MAO, soma risco de crise hipertensiva, arritmia, infarto, AVC e toxicidade serotoninérgica.",
    viasMetabolicas: "Hidrólise por esterases plasmáticas e hepáticas | CYP3A4 (norcocaína).",
    meiaVida: "Curta (cerca de 1 hora).",
    washoutMinimo: "Janela a definir pelo revisor clínico (nunca associar)",
    recomendacaoLiturgica:
      "INTERROMPER DIAS ANTES (Classificação Azul, revisão clínica pendente). Perguntar de forma direta e sem julgamento sobre uso recente.",
    motivo: "INTERACAO",
    evidencia: "C",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["crack"],
  },
  {
    id: "recreativa-anfetaminas",
    classeNumero: 28,
    classeFarmacologica: "Substâncias Recreativas",
    principioAtivo: "Anfetaminas e Metanfetamina sem prescrição ('rebite', 'cristal')",
    nomesComerciais: [],
    nivelRisco: "LETAL_ABSOLUTO",
    diretrizPdf: "INTERROMPER_DIAS_ANTES",
    mecanismo:
      "Anfetaminas liberam dopamina e noradrenalina (e, em menor grau, serotonina). Com a MAO inibida, as catecolaminas não são degradadas, com risco de crise hipertensiva, hipertermia, arritmia e AVC. Para Lisdexanfetamina e Metilfenidato prescritos, ver classe 13.",
    viasMetabolicas: "Hepática: CYP2D6 | Excreção renal dependente do pH urinário.",
    meiaVida: "Variável.",
    washoutMinimo: "Janela a definir pelo revisor clínico (nunca associar)",
    recomendacaoLiturgica:
      "INTERROMPER DIAS ANTES (Classificação Azul, revisão clínica pendente). Perguntar de forma direta e sem julgamento sobre uso recente.",
    motivo: "INTERACAO",
    evidencia: "C",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["rebite", "cristal", "metanfetamina", "speed"],
  },
  {
    id: "recreativa-alcool",
    classeNumero: 28,
    classeFarmacologica: "Substâncias Recreativas",
    principioAtivo: "Álcool (bebidas alcoólicas)",
    nomesComerciais: [],
    nivelRisco: "SEVERO_MODERADO",
    diretrizPdf: "NAO_TOMAR_NO_DIA",
    mecanismo:
      "O álcool deprime o SNC e piora a desidratação da purga e o discernimento durante a cerimônia. Algumas bebidas fermentadas (cervejas artesanais ou não pasteurizadas, vinhos tintos) contêm tiramina, que pode elevar a pressão quando a MAO-A está inibida. Em quem tem dependência, a interrupção abrupta pode causar abstinência grave (ver a nota de exceção de desintoxicação).",
    viasMetabolicas: "Hepática: álcool desidrogenase e CYP2E1.",
    meiaVida: "Eliminação de ordem zero (depende da quantidade ingerida).",
    washoutMinimo: "NÃO TOMAR NO DIA (janela de abstinência anterior a definir pelo revisor clínico)",
    recomendacaoLiturgica:
      "NÃO TOMAR NO DIA (Classificação Amarela, revisão clínica pendente). Em caso de dependência, não exigir abstinência abrupta sem acompanhamento médico.",
    motivo: "AMBOS",
    evidencia: "C",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["alcool", "bebida alcoolica", "cerveja", "vinho", "cachaca", "etanol"],
  },
  {
    id: "recreativa-cannabis",
    classeNumero: 28,
    classeFarmacologica: "Substâncias Recreativas",
    principioAtivo: "Cannabis (maconha, haxixe e derivados com THC)",
    nomesComerciais: [],
    nivelRisco: "SEVERO_MODERADO",
    diretrizPdf: "NAO_TOMAR_NO_DIA",
    mecanismo:
      "A Cannabis eleva a frequência cardíaca e pode intensificar ansiedade e desorientação e, em pessoas predispostas, desencadear episódios psicóticos. Não há dado consistente de interação farmacocinética com Ayahuasca; o principal cuidado é a soma de efeitos e o histórico psiquiátrico.",
    viasMetabolicas: "Hepática: CYP2C9 e CYP3A4 (THC).",
    meiaVida: "Variável; o THC se acumula no tecido adiposo com uso frequente.",
    washoutMinimo: "NÃO TOMAR NO DIA (janela anterior a definir pelo revisor clínico)",
    recomendacaoLiturgica:
      "NÃO TOMAR NO DIA (Classificação Amarela, revisão clínica pendente). Perguntar sobre histórico pessoal ou familiar de psicose.",
    motivo: "AMBOS",
    evidencia: "D",
    fontes: [],
    revisao: REVISAO_PENDENTE,
    termosBusca: ["maconha", "haxixe", "thc", "skunk"],
  },
];

/** Remove acentos, caixa e espaços das pontas, para comparar "Lítio" com "litio". */
export function normalizarTexto(texto: string): string {
  return texto.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();
}

export interface OpcoesBuscaInteracoes {
  /** Também procura no mecanismo, nas vias metabólicas e na conduta (pode trazer entradas que só citam o termo de passagem). */
  incluirTextoLivre?: boolean;
}

function escaparRegex(texto: string): string {
  return texto.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Busca na matriz sem diferenciar acentos. Ordem de prioridade:
 * 0. marca, princípio ativo ou termo de busca que começa com o termo (ou tem palavra que começa com ele)
 * 1. marca, princípio ativo ou termo de busca que contém o termo
 * 2. nome da classe farmacológica
 * 3. texto livre (mecanismo, vias, conduta), só com `incluirTextoLivre`
 * Termo vazio devolve a lista inteira, na ordem original.
 */
export function buscarInteracoes(
  termo: string,
  lista: InteracaoMedicamentosa[] = INTERACOES_MEDICAMENTOSAS,
  opcoes: OpcoesBuscaInteracoes = {}
): InteracaoMedicamentosa[] {
  const alvo = normalizarTexto(termo);
  if (!alvo) return [...lista];

  const inicioDePalavra = new RegExp(`(^|[^a-z0-9])${escaparRegex(alvo)}`);

  const pontuar = (item: InteracaoMedicamentosa): number | null => {
    const camposPrimarios = [item.principioAtivo, ...item.nomesComerciais, ...(item.termosBusca ?? [])].map(
      normalizarTexto
    );
    if (camposPrimarios.some((c) => inicioDePalavra.test(c))) return 0;
    if (camposPrimarios.some((c) => c.includes(alvo))) return 1;
    if (normalizarTexto(item.classeFarmacologica).includes(alvo)) return 2;
    if (opcoes.incluirTextoLivre) {
      const livre = [item.mecanismo, item.viasMetabolicas, item.recomendacaoLiturgica].map(normalizarTexto);
      if (livre.some((c) => c.includes(alvo))) return 3;
    }
    return null;
  };

  return lista
    .map((item, indice) => ({ item, indice, pontos: pontuar(item) }))
    .filter((r): r is { item: InteracaoMedicamentosa; indice: number; pontos: number } => r.pontos !== null)
    .sort((a, b) => a.pontos - b.pontos || a.indice - b.indice)
    .map((r) => r.item);
}

/** Número de classes farmacológicas distintas na lista (o selo da interface é calculado daqui). */
export function contarClasses(lista: InteracaoMedicamentosa[] = INTERACOES_MEDICAMENTOSAS): number {
  return new Set(lista.map((i) => i.classeNumero)).size;
}

/** Exemplos de marcas (ou princípios ativos, quando não há marca) de uma cor da tabela, na ordem da matriz. */
export function exemplosPorDiretriz(
  diretriz: DiretrizOperacionalPdf,
  limite = 8,
  lista: InteracaoMedicamentosa[] = INTERACOES_MEDICAMENTOSAS
): string[] {
  const nomes: string[] = [];
  for (const item of lista) {
    if ((item.diretrizPdf || "INTERROMPER_DIAS_ANTES") !== diretriz) continue;
    const primeiro = item.nomesComerciais[0] ?? item.principioAtivo.split(" (")[0];
    if (!nomes.includes(primeiro)) nomes.push(primeiro);
    if (nomes.length >= limite) break;
  }
  return nomes;
}

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
 * Alerta Crítico: Lítio + psicodélicos clássicos
 * Fonte: Nayak et al., 2021 (relatos online autodeclarados). Revisão clínica pendente.
 */
export const TOXICIDADE_LITIO = {
  resumo:
    "O Carbonato de Lítio (Carbolitium, Priadel, Litiocar) associado a psicodélicos clássicos aparece em relatos com convulsões generalizadas e necessidade de atendimento médico. Não há estudo com Ayahuasca; o veto é mantido pela gravidade do sinal.",
  mecanismo:
    "Hipótese, não demonstrada: inibição da enzima inositol monofosfatase (IMPase) pelo lítio, com alteração da sinalização ligada ao receptor 5-HT2A.",
  incidenciaConvulsao:
    "Em 62 relatos online autodeclarados de uso de psicodélicos clássicos com lítio, 47% descreveram convulsão e 39% atendimento médico (Nayak et al., 2021). Evidência fraca, mas o sinal é grave e consistente.",
  diretriz:
    "CONTRAINDICAÇÃO ABSOLUTA E DEFINITIVA. Portadores de transtorno afetivo bipolar medicados com Lítio estão terminantemente vetados de comungar Ayahuasca.",
  fontes: [FONTE_NAYAK_2021, FONTE_HALMAN_2024],
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
      "O que diz a norma: a Resolução CONAD nº 01/2010 deixa a participação de crianças e adolescentes à decisão dos pais ou responsáveis legais, no exercício do poder familiar. O que é política interna da casa: exigir a presença de ambos os pais ou responsáveis na cerimônia e a autorização assinada são cautelas recomendadas pela Cooperativa, não exigências da resolução. Em qualquer caso, o dirigente deve avaliar com prudência a maturidade do jovem, orientar a família e servir apenas porções mínimas simbólicas.",
    destaqueConselho:
      "Política interna recomendada (não exigência da CONAD): arquivar a autorização assinada pelos pais ou responsáveis junto à cópia dos documentos de identidade.",
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
      "O transporte para as cerimônias do templo é amparado pela Resolução CONAD nº 01/2010 para fins religiosos em território nacional. Em viagem aérea, verifique antes as regras da companhia aérea para transporte de líquidos, na bagagem de mão e na despachada. O transporte internacional não está coberto pela resolução e depende da legislação de cada país. O dirigente deve transportar as garrafas lacradas, devidamente rotuladas com identificação institucional da congregação, acompanhadas da Declaração de Trânsito Litúrgico de Sacramento (disponível para download neste portal), cópia da Ata do Templo e da Resolução CONAD nº 01/2010. Na bagagem despachada, as garrafas devem ser envoltas em plástico bolha e caixa isotérmica protegida.",
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

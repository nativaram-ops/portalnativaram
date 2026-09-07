/**
 * Catálogo Oficial de Alquimias Sagradas, Rapés e Artefatos — Nativaram Brasil
 *
 * Em estrita observância à Resolução CONAD nº 01/2010, Marco Sanitário ANVISA e
 * Dossiê de Compliance Etnobotânico Nativaram Brasil.
 * Todo texto obedece rigorosamente ao Dicionário de Engenharia de Linguagem.
 */

export interface SacramentoRape {
  id: string;
  nome: string;
  nomeCientifico: string;
  familiaBotanica: string;
  biomaOrigem: string;
  pHMedio: string;
  perfilFitoquimico: string;
  propositoTradicional: string;
  goldenCopy: string;
  elementos: string[];
}

export interface ArtefatoSagrado {
  id: string;
  nome: string;
  categoria: "APLICADOR" | "AROMATIZADOR" | "PREPARADO_FLORESTAL";
  material: string;
  acabamento: string;
  descricaoSimbólica: string;
  cuidadosManejo: string;
  goldenCopy: string;
}

export const RAPES_TRADICIONAIS: SacramentoRape[] = [
  {
    id: "TSUNU",
    nome: "Rapé Sagrado de Tsunú",
    nomeCientifico: "Nicotiana rustica & Platycyamus regnellii",
    familiaBotanica: "Solanaceae & Fabaceae",
    biomaOrigem: "Floresta Amazônica / Transição Mata Atlântica",
    pHMedio: "9,75 a 10,2 (Tamponamento alcalino de alta presença)",
    perfilFitoquimico: "Tabaco selvagem puro enriquecido com cinzas calcinadas de Pau Pereira, ricas em sais minerais e potássio.",
    propositoTradicional: "Pilar fundamental da floresta. Alinhamento geral, aterramento telúrico profundo e silenciamento mental.",
    goldenCopy: "A força e a solidez do Tsunú em uma alquimia botânica nobre e artesanal. Notas amadeiradas profundas criadas para acompanhar os seus rituais de respiração, proporcionando um instante de calmaria interior, foco límpido e ancoragem profunda na terra. Uma pausa consciente para o seu dia.",
    elementos: ["Tabaco Orgânico Selvagem", "Cinzas de Tsunú (Pau Pereira)"],
  },
  {
    id: "MULATEIRO",
    nome: "Rapé Sagrado de Mulateiro",
    nomeCientifico: "Nicotiana rustica & Calycophyllum spruceanum",
    familiaBotanica: "Solanaceae & Rubiaceae",
    biomaOrigem: "Floresta Amazônica",
    pHMedio: "9,60 a 9,90",
    perfilFitoquimico: "Cinzas ricas em ácido ursólico e lignanas antioxidantes termoestáveis que resistem à calcinação de até 300°C.",
    propositoTradicional: "Árvore da regeneração. Alinhamento dos hemisférios mentais, liberação de tensões na nuca e ombros, e sopro de renascimento.",
    goldenCopy: "Inspirado na árvore do renascimento amazônico, esta alquimia combina cinzas ricas em compostos nobres e notas herbais suaves. Desenvolvido de forma artesanal para harmonizar a rotina, inspirar clareza mental e incentivar o desapego das tensões diárias, promovendo um respirar tranquilo e renovado.",
    elementos: ["Tabaco Orgânico Selvagem", "Cinzas de Mulateiro"],
  },
  {
    id: "SAMAUMA",
    nome: "Rapé Sagrado de Samaúma",
    nomeCientifico: "Nicotiana rustica & Ceiba pentandra",
    familiaBotanica: "Solanaceae & Malvaceae",
    biomaOrigem: "Floresta Amazônica",
    pHMedio: "9,80 a 10,10",
    perfilFitoquimico: "Cinzas aveludadas repletas de óxidos de cálcio e potássio condutivos.",
    propositoTradicional: "Mãe das Árvores. Conexão com as matriarcas da floresta, proteção áurica e aterramento celular.",
    goldenCopy: "A imponência da Mãe da Floresta em uma composição aveludada. Desenvolvido para sintonizar a firmeza de espírito e a proteção sutil, trazendo a serenidade das copas altas e a solidez da terra úmida para momentos de quietude.",
    elementos: ["Tabaco Orgânico Selvagem", "Cinzas de Samaúma"],
  },
  {
    id: "VEIA_DE_PAJE",
    nome: "Rapé Sagrado de Veia de Pajé",
    nomeCientifico: "Nicotiana rustica & Epipremnum aureum & Ceiba pentandra",
    familiaBotanica: "Solanaceae & Araceae & Malvaceae",
    biomaOrigem: "Floresta Amazônica",
    pHMedio: "9,50 a 9,80",
    perfilFitoquimico: "Folhas em formato anatômico cardíaco calcinadas com madeiras nobres, ricas em bioflavonoides.",
    propositoTradicional: "Ativação do ânimo, acolhimento do Chakra Cardíaco e dispersão de desânimos estagnados.",
    goldenCopy: "Uma alquimia tradicional que convida à expansão da presença e ao aquecimento do centro do peito. Traz notas acolhedoras desenhadas para desbloquear o desânimo e renovar a disposição com gentileza.",
    elementos: ["Tabaco Orgânico Selvagem", "Veia de Pajé", "Cinzas de Samaúma"],
  },
  {
    id: "CACAU_SELVAGEM",
    nome: "Rapé Sagrado de Cacau Selvagem",
    nomeCientifico: "Nicotiana rustica & Theobroma cacao",
    familiaBotanica: "Solanaceae & Malvaceae",
    biomaOrigem: "Floresta Amazônica",
    pHMedio: "9,40 a 9,70",
    perfilFitoquimico: "Fitoquimicamente rico em teobromina termoestável, conservando sua força após a calcinação.",
    propositoTradicional: "Alimento dos Deuses. Abertura do Chakra Cardíaco, empatia, amor-próprio e liberação de angústias íntimas.",
    goldenCopy: "O abraço acolhedor do cacau silvestre em uma composição fina, fitoquimicamente rica em teobromina estável. Notas de fundo quentes criadas para harmonizar o seu rito diário de introspecção, abrindo espaço para a empatia, a amorosidade consigo mesmo e a quietude calma do peito.",
    elementos: ["Tabaco Orgânico Selvagem", "Casca de Cacau Selvagem", "Cinzas Selecionadas"],
  },
  {
    id: "PASSIFLORA",
    nome: "Rapé Sagrado de Passiflora",
    nomeCientifico: "Nicotiana rustica & Passiflora incarnata",
    familiaBotanica: "Solanaceae & Passifloraceae",
    biomaOrigem: "Zonas Tropicais Brasileiras",
    pHMedio: "9,30 a 9,60",
    perfilFitoquimico: "Compostos estáveis de passiflora que atuam na harmonização sensorial e desaceleração noturna.",
    propositoTradicional: "Acalento do sistema nervoso, calmaria profunda para o descanso e harmonização do ritmo acelerado.",
    goldenCopy: "A doçura mansa da flor do maracujá em uma composição delicada e relaxante. Um convite ao bem-estar e ao repouso consciente, suavizando o ritmo de pensamentos após um dia intenso.",
    elementos: ["Tabaco Orgânico Selvagem", "Passiflora", "Cinzas de Tsunú"],
  },
  {
    id: "MURICI",
    nome: "Rapé Sagrado de Murici",
    nomeCientifico: "Nicotiana rustica & Byrsonima crassifolia",
    familiaBotanica: "Solanaceae & Malpighiaceae",
    biomaOrigem: "Cerrado e Transição Amazônica",
    pHMedio: "9,70 a 10,00",
    perfilFitoquimico: "Cinzas altamente condutivas e adstringentes, ricas em ferro e potássio mineral.",
    propositoTradicional: "Força do guerreiro. Estímulo do baixo ventre, superação de indecisões e revigoramento físico.",
    goldenCopy: "Notas densas e terrosas do muricizeiro que despertam a firmeza de propósito e a postura resoluta. Ideal para ritos matinais que demandam ancoragem e clareza de decisão.",
    elementos: ["Tabaco Orgânico Selvagem", "Casca de Murici Calcinada"],
  },
  {
    id: "NISSURAL",
    nome: "Rapé Sagrado de Nissural",
    nomeCientifico: "Nicotiana rustica & Rubiaceae sp. & Platycyamus regnellii",
    familiaBotanica: "Solanaceae & Rubiaceae",
    biomaOrigem: "Floresta Amazônica Profunda",
    pHMedio: "9,60 a 9,90",
    perfilFitoquimico: "Alquimia botânica sob sigilo etnobotânico caboclo, com cinzas cristalinas e voláteis aromáticos sutis.",
    propositoTradicional: "Silenciamento agudo da mente, clareza de insights em meditações profundas e oração silenciosa.",
    goldenCopy: "Uma alquimia de aroma extraordinariamente etéreo e refinado. Concebido para pausas meditativas solenes, promovendo o silêncio interior límpido e a elevação sensorial.",
    elementos: ["Tabaco Orgânico Selvagem", "Nissural Tradicional", "Cinzas de Pau Pereira"],
  },
  {
    id: "SETE_ERVAS",
    nome: "Rapé Sagrado de 7 Ervas",
    nomeCientifico: "Nicotiana rustica & Complexo Fitoenergético Tradicional",
    familiaBotanica: "Complexo Multibotânico",
    biomaOrigem: "Biomas Integrados Brasileiros",
    pHMedio: "9,50 a 9,80",
    perfilFitoquimico: "Blend com Tsunú, Eucalipto, Artemísia, Alecrim, Canela de Velho e Erva Baleeira.",
    propositoTradicional: "Escudo de proteção, limpeza de energias densas externas e desobstrução das vias respiratórias superiores.",
    goldenCopy: "Sete forças botânicas unidas em um único sopro de resguardo. Frescor revigorante e notas canforadas sutis que envolvem o campo sutil em uma atmosfera de acolhimento e renovação.",
    elementos: ["Tabaco Selvagem", "Tsunú", "Eucalipto", "Artemísia", "Alecrim", "Canela de Velho", "Baleeira"],
  },
  {
    id: "JUREMA_PRETA",
    nome: "Rapé Sagrado de Jurema Preta",
    nomeCientifico: "Nicotiana rustica & Mimosa tenuiflora",
    familiaBotanica: "Solanaceae & Fabaceae",
    biomaOrigem: "Caatinga e Matas Secas",
    pHMedio: "9,80 a 10,15",
    perfilFitoquimico: "Cinzas densas de calcinação acima de 250°C (100% livre de DMT por degradação térmica total), ricas em taninos nobres.",
    propositoTradicional: "Força e resiliência do sertão. Ancoramento absoluto na matéria, blindagem energética e firmeza.",
    goldenCopy: "A resiliência inabalável da Jurema em cinzas de queima cerimonial completa. Traz a solidez e a firmeza da terra seca, convidando à coragem interior e ao enraizamento seguro diante das oscilações do cotidiano.",
    elementos: ["Tabaco Orgânico Selvagem", "Cinzas Cerimoniais de Jurema Preta"],
  },
];

export const SANANGA_ANCESTRAL = {
  id: "SANANGA_ANCESTRAL_10ML",
  nome: "Sananga Ancestral — Extrato Botânico Tradicional 10ml",
  nomeCientifico: "Tabernaemontana sananho",
  biomaOrigem: "Floresta Amazônica Ocidental",
  apresentacao: "Frasco de vidro âmbar com conta-gotas de 10 ml",
  composicao: "Extrato aquoso tradicional de raízes e cascas de Tabernaemontana sananho em água pura de nascente. Fórmula viva, crua e 100% natural sem conservantes químicos.",
  propositoTradicional: "Harmonização sensorial, limpeza de cargas densas estagnadas (panema), facilitação do foco sutil e clareza da visão interior (Ajna).",
  protocoloConservacao: "Manter sob refrigeração contínua (geladeira ou congelador). Retirar cerca de 30 a 40 minutos antes da prática para retorno à temperatura ambiente.",
  restricoesSeguranca: [
    "Uso estritamente contraindicado para portadores de lentes de contato (remover 24h antes e aguardar 24h após a prática).",
    "Não recomendado para pessoas que passaram por cirurgias oculares recentes sem liberação médica formal.",
    "Não esfregar os olhos após a aplicação das gotas de intenção.",
    "Extrato botânico de uso tradicional etnobotânico. Não é colírio alopático nem medicamento.",
  ],
  goldenCopy: "Uma sabedoria botânica milenar extraída com respeito às tradições da floresta. Apoia a harmonização sensorial e o equilíbrio interior, atuando na facilitação do foco consciente e convidando à clareza da visão íntima durante práticas meditativas de quietude.",
};

export const ARTEFATOS_SAGRADOS: ArtefatoSagrado[] = [
  {
    id: "KURIPE_JACARANDA",
    nome: "Kuripe em Jacarandá e Bambu Imperial",
    categoria: "APLICADOR",
    material: "Jacarandá nobre de manejo florestal e Bambu Imperial tratado termicamente",
    acabamento: "Tratamento hidrofóbico vegetal com Óleo de Tungue e resinas naturais",
    descricaoSimbólica: "Instrumento individual de autocuidado. O jacarandá confere a firmeza da floresta, enquanto o bambu simboliza a resiliência e a flexibilidade humana.",
    cuidadosManejo: "Conservar ao abrigo de umidade excessiva e sol direto. Limpeza a seco com pincel macio.",
    goldenCopy: "Uma peça única de design contemporâneo esculpida à mão em jacarandá nobre e bambu imperial tratado. Mais do que um aplicador, este artefato utilitário atua como um elegante marcador de transição espacial, guiando suas práticas de meditação, foco e presença consciente com a beleza da matéria natural.",
  },
  {
    id: "TEPI_LITURGICO",
    nome: "Tepi Cerimonial de Partilha",
    categoria: "APLICADOR",
    material: "Bambu nobre alongado, detalhes em fios de algodão natural e grafismo rupestre",
    acabamento: "Óleo de tungue natural e resinas vegetais",
    descricaoSimbólica: "Instrumento ritualístico de condutor para consagrador. Representa a ponte de rezo, sopro de alento e aliança fraterna.",
    cuidadosManejo: "Guardar em estojo protegido, mantendo as vias limpas após cada cerimônia de partilha.",
    goldenCopy: "Esculpido para ritos coletivos de quietude, o Tepi Nativaram une a precisão da lutheria tradicional aos grafismos rupestres da Amazônia. Uma ponte de confiança e respeito mútuo em círculos de celebração da floresta.",
  },
  {
    id: "ESSENCIA_BREU_BRANCO",
    nome: "Essência Ambiental de Breu Branco 30ml",
    categoria: "AROMATIZADOR",
    material: "Resina pura de Protium heptaphyllum coletada por comunidades de Itacoatiara",
    acabamento: "Frasco âmbar conta-gotas com tampa lacrada",
    descricaoSimbólica: "O aroma sagrado do sub-bosque amazônico. Purificação sutil da atmosfera e ancoramento de ambientes de oração.",
    cuidadosManejo: "Conservar em local fresco. Diluir algumas gotas em difusores de ambiente.",
    goldenCopy: "Deixe-se envolver pelas notas verdes, cítricas e resinosas do verdadeiro breu branco sob o dossel amazônico. Uma experiência olfativa pura, desenvolvida para sintonizar a atmosfera da sua casa, promovendo conforto olfativo sofisticado, frescor e uma suave sensação de acolhimento em seu refúgio diário.",
  },
];

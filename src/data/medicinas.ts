export interface Medicina {
  slug: string;
  nome: string;
  subtitulo: string;
  tipo: "rape" | "sananga" | "ayahuasca" | "artefato";
  composicaoBotanica: string;
  familiaBotanica: string;
  feitioRastreabilidade: string;
  alquimiaFitoquimica: string;
  beneficios: {
    fisico: string;
    mental: string;
    sutil: string;
  };
  diretrizes: string;
  cuidados: string;
  referencias: string;
  forca: "suave" | "intermediaria" | "forte" | "extra-forte";
  chakras: string[];
  emoji: string;
  foto?: string;
  foto15g?: string;
  disponivel15g?: boolean;
}

export const medicinas: Medicina[] = [
  {
    slug: "7-ervas",
    nome: "Rapé 7 Ervas",
    subtitulo:
      "A Força da Natureza em Sintonia e Limpeza Total",
    tipo: "rape",
    composicaoBotanica:
      "Tabebuia serratifolia (Tsunu), Eucalyptus globulus (Eucalipto), Artemisia vulgaris (Artemísia), Rosmarinus officinalis (Alecrim), Anadenanthera colubrina (Angico), Cordia verbenacea (Catissaral) e Nissural.",
    familiaBotanica:
      "Solanaceae, Fabaceae, Myrtaceae, Asteraceae, Lamiaceae e Rubiaceae.",
    feitioRastreabilidade:
      "Confeccionado artesanalmente por nosso feitor caboclo com mais de 20 anos de estudos. Matérias-primas obtidas de forma renovável e sustentável em parcerias com casas de plantas locais e coletores regionais.",
    alquimiaFitoquimica:
      "Ao unir o tabaco forte com as cinzas alcalinas do Tsunu e os óleos naturais do Eucalipto e do Alecrim, esta mistura cria uma resposta imediata de desobstrução e foco, preservando os sais minerais e nutrientes essenciais das folhas mesmo após o fogo da queima.",
    beneficios: {
      fisico:
        "Presente em cerimônias de abertura de trabalhos, quando a casa se prepara para a reza coletiva.",
      mental:
        "Usado tradicionalmente em momentos de concentração e reza, antes de estudos e orações.",
      sutil:
        "Associado na tradição aos sete centros de energia (chakras), como rito de firmeza e proteção do espaço sagrado.",
    },
    diretrizes:
      "Consagre em um local bem calmo. Sente-se de forma confortável, faça uma respiração profunda e use o kuripe ou o tepi com um sopro firme e amoroso. Sintonize o ambiente com as frequências harmônicas de 432Hz.",
    cuidados:
      "Contém nicotina. Não recomendado para mulheres grávidas ou em período de amamentação, e pessoas com alta sensibilidade ao fumo.",
    referencias:
      "Mendes dos Santos & Soares (2015); Journal of Integrative Medicine (2023).",
    forca: "intermediaria",
    chakras: ["Todos os 7 chakras"],
    emoji: "🌿",
    foto: "/assets/sacramentos/25g/7-ervas.jpg",
    disponivel15g: true,
  },
  {
    slug: "cacau",
    nome: "Rapé de Cacau",
    subtitulo:
      "O Sopro do Acolhimento, Doçura e Harmonização do Coração",
    tipo: "rape",
    composicaoBotanica:
      "Nicotiana rustica (Tabaco Sagrado) e Theobroma cacao (Cacau Selvagem).",
    familiaBotanica: "Solanaceae e Malvaceae (antiga Sterculiaceae).",
    feitioRastreabilidade:
      "Desenvolvido de forma artesanal por nosso feitor caboclo sob a egrégora de estudos de mais de duas décadas em tradições da floresta. Matéria-prima botânica obtida de fontes sustentáveis e renováveis.",
    alquimiaFitoquimica:
      "O cacau fornece a teobromina, um composto altamente resistente ao calor que mantém 90% de sua força após a queima ritualística. A teobromina atua abrindo suavemente os vasos de sangue e relaxando o sistema cardiovascular.",
    beneficios: {
      fisico:
        "Consagrado tradicionalmente em encontros de partilha e cerimônias de comunhão entre os irmãos da casa.",
      mental:
        "Acompanha momentos de reconexão e pausa consciente dentro da liturgia.",
      sutil:
        "Associado na tradição ao Chakra Cardíaco, símbolo de empatia e união da corrente.",
    },
    diretrizes:
      "Consagre quando buscar um momento de reconexão consigo mesmo. Sente-se confortavelmente, use um kuripe ou tepi, respirando de forma pausada pela boca, integrando os sentimentos na frequência harmônica de 432Hz.",
    cuidados:
      "Contém nicotina. Evitar uso concomitante com estimulantes cardíacos sintéticos pesados.",
    referencias: "Rocha (2023); Yunka (2026); Vida — Tradições de Valor (2026).",
    forca: "suave",
    chakras: ["Chakra Cardíaco (Anahata)"],
    emoji: "🤎",
    foto: "/assets/sacramentos/25g/cacau.jpg",
    disponivel15g: true,
  },
  {
    slug: "cumaru",
    nome: "Rapé de Cumaru",
    subtitulo:
      "Força Vital e Ancoragem Telúrica",
    tipo: "rape",
    composicaoBotanica:
      "Nicotiana rustica, Dipteryx odorata (Cumaru) e Protium heptaphyllum (Breu Preto).",
    familiaBotanica: "Solanaceae, Fabaceae e Burseraceae.",
    feitioRastreabilidade:
      "Desenvolvido de maneira artesanal por nosso feitor caboclo, com a sabedoria e a força de mais de 20 anos de estudos profundos em diversas etnias do Acre. Matéria-prima coletada de forma renovável.",
    alquimiaFitoquimica:
      "Embora a cumarina original se degrade parcialmente com altas temperaturas, a queima lenta deixa uma cinza mineral rica em potássio e cálcio biodisponíveis combinados com os óleos balsâmicos do Breu Preto.",
    beneficios: {
      fisico:
        "Consagrado em ritos de firmeza e proteção, quando o trabalho pede postura e presença.",
      mental:
        "Usado tradicionalmente em momentos de concentração e silêncio antes da reza.",
      sutil:
        "Associado na tradição ao elemento terra e aos Chakras Básico e Coronário, como rito de enraizamento.",
    },
    diretrizes:
      "Consagre com firme intenção de proteção e firmeza. Prepare um espaço silencioso e consagre com sopro firme. Realize o expurgo das toxinas, sintonizando o ambiente com sonoridades orgânicas de 432Hz.",
    cuidados:
      "Contém nicotina. Apenas para adultos (+18). Siga as orientações de proporção segura e respeitosa.",
    referencias:
      "Oliveira et al. (2020); Huni Kuin Tradition (2023); Vida — Tradições de Valor (2026).",
    forca: "forte",
    chakras: ["Chakra Básico (Muladhara)", "Chakra Coronário (Sahasrara)"],
    emoji: "🛡️",
    foto: "/assets/sacramentos/25g/cumaru.jpg",
    disponivel15g: true,
  },
  {
    slug: "jurema-preta",
    nome: "Rapé de Jurema Preta",
    subtitulo:
      "Enraizamento Sagrado, Firmeza e Visão Ancestral",
    tipo: "rape",
    composicaoBotanica:
      "Nicotiana rustica e Mimosa tenuiflora (Jurema Preta / hostilis).",
    familiaBotanica: "Solanaceae e Fabaceae (Mimosoideae).",
    feitioRastreabilidade:
      "Confeccionado de forma artesanal e sob rezas de enraizamento pelo nosso feitor caboclo. Toda a matéria-prima é de origem renovável, obtida eticamente em parcerias sustentáveis.",
    alquimiaFitoquimica:
      "Preparado a partir da casca da raiz da Jurema Preta, moída e unida ao tabaco segundo o feitio tradicional. Contém nicotina natural do tabaco.",
    beneficios: {
      fisico:
        "Consagrado tradicionalmente ao anoitecer, em cerimônias de silêncio e introspecção.",
      mental:
        "Acompanha ritos de firmeza e recolhimento, quando a corrente busca presença e quietude.",
      sutil:
        "Associado na tradição ao Chakra Básico (Muladhara) e à conexão com a energia da terra.",
    },
    diretrizes:
      "Consagre preferencialmente ao anoitecer em silêncio e introspecção. Aplique de forma uniforme nas duas narinas e segure o fôlego nasal, cuspindo os resíduos. Use frequências de 432Hz para estabilizar.",
    cuidados:
      "Contém nicotina. Não recomendado para grávidas, lactantes ou indivíduos com sensibilidade severa ao tabaco.",
    referencias:
      "Lima (2020); de Souza et al. (2008); Kariri-Xocó Tradition (2023); Vida — Tradições de Valor (2026).",
    forca: "forte",
    chakras: ["Chakra Básico (Muladhara)"],
    emoji: "🌳",
    foto: "/assets/sacramentos/25g/jurema-preta.jpg",
    disponivel15g: true,
    foto15g: "/assets/sacramentos/15g/jurema-preta-15g.jpg",
  },
  {
    slug: "passiflora",
    nome: "Rapé de Passiflora",
    subtitulo:
      "Acalento Noturno, Serenidade dos Sentidos e Harmonização do Ritmo",
    tipo: "rape",
    composicaoBotanica:
      "Nicotiana rustica, Passiflora incarnata (Flor de Maracujá Silvestre) e cinzas alcalinas de Tsunú (Platycyamus regnellii).",
    familiaBotanica: "Solanaceae, Passifloraceae e Fabaceae.",
    feitioRastreabilidade:
      "Confeccionado de forma artesanal pelo nosso feitor caboclo com mais de 20 anos de caminhada prática na floresta. Folhas e flores colhidas sob manejo sustentável.",
    alquimiaFitoquimica:
      "Rico em flavonoides naturais estáveis (como crisina e apigenina) combinados ao tamponamento alcalino das cinzas de Tsunú (pH 9,30 a 9,60), favorecendo a desaceleração suave e a quietude mental.",
    beneficios: {
      fisico:
        "Consagrado tradicionalmente ao entardecer, em ritos de encerramento e recolhimento.",
      mental:
        "Acompanha vigílias mansas e momentos de quietude dentro da liturgia.",
      sutil:
        "Associado na tradição aos Chakras Cardíaco (Anahata) e Frontal (Ajna), como preparação para a vigília.",
    },
    diretrizes:
      "Consagre preferencialmente ao entardecer ou antes do repouso noturno. Receba o sopro suave e mantenha a respiração tranquila. Sintonize com sons serenos da natureza em 432Hz.",
    cuidados:
      "Contém nicotina. Destinado exclusivamente a adultos (+18) em contexto litúrgico e contemplativo.",
    referencias:
      "Mendes dos Santos & Soares (2015); Tradições Botânicas Brasileiras (2025); Cooperativa Nativaram (2026).",
    forca: "suave",
    chakras: ["Chakra Cardíaco (Anahata)", "Chakra Frontal (Ajna)"],
    emoji: "🌸",
    foto: "/assets/sacramentos/25g/pixuri.jpg",
    disponivel15g: true,
  },
  {
    slug: "mulateiro",
    nome: "Rapé de Mulateiro",
    subtitulo:
      "O Sopro da Renovação, Juventude e Desapego",
    tipo: "rape",
    composicaoBotanica:
      "Nicotiana rustica e Calycophyllum spruceanum (Mulateiro / Capirona).",
    familiaBotanica: "Solanaceae e Rubiaceae.",
    feitioRastreabilidade:
      "Confeccionado de maneira 100% artesanal pelo nosso feitor caboclo, que carrega a força de mais de 20 anos de estudos profundos e dietas na floresta. Matéria-prima de origem renovável.",
    alquimiaFitoquimica:
      "A casca do Mulateiro é extremamente rica em ácido ursólico e lignanas com potente ação antioxidante. O ácido ursólico é termoestável e preserva até 80% de sua atividade na calcinação.",
    beneficios: {
      fisico:
        "Presente em rituais de transição e na abertura de novos ciclos dentro da casa.",
      mental:
        "Usado tradicionalmente em momentos de concentração e reza voltados ao desapego.",
      sutil:
        "Associado na tradição ao Chakra Básico (Muladhara) e ao Chakra Frontal, como rito de proteção e aterramento.",
    },
    diretrizes:
      "Consagre em rituais de transição, ao buscar iniciar novos ciclos de vida com vigor. Use o kuripe ou tepi, aplicando em ambas as narinas de forma equilibrada. Sintonize com sons de água e frequências de 432Hz.",
    cuidados:
      "Contém nicotina. Siga as orientações de uso respeitoso e focado.",
    referencias:
      "Silva et al. (2021); Yawanawa Tradition (2023); Nhanderu Xamanismo (2026).",
    forca: "intermediaria",
    chakras: ["Chakra Básico (Muladhara)", "Chakra Frontal (Ajna)"],
    emoji: "🔄",
    foto: "/assets/sacramentos/25g/mulateiro.jpg",
    disponivel15g: true,
  },
  {
    slug: "murici",
    nome: "Rapé de Murici",
    subtitulo:
      "O Sopro do Vigor, Resistência e Força Física",
    tipo: "rape",
    composicaoBotanica:
      "Nicotiana rustica e Byrsonima crassifolia (Murici).",
    familiaBotanica: "Solanaceae e Malpighiaceae.",
    feitioRastreabilidade:
      "Confeccionado artesanalmente por nosso feitor caboclo sob a egrégora de estudos de mais de duas décadas. Matéria-prima botânica obtida de fontes renováveis.",
    alquimiaFitoquimica:
      "A casca do Murici é uma fonte abundante de ferro, potássio, vitamina C e taninos. A calcinação controlada resulta em uma cinza rica em potássio e ferro bioativos que aumentam a condutividade e a resposta corporal de vigor.",
    beneficios: {
      fisico:
        "Consagrado tradicionalmente no início do dia e antes de trabalhos longos da corrente.",
      mental:
        "Acompanha momentos de presença e foco na reza coletiva.",
      sutil:
        "Associado na tradição ao Plexo Solar e ao Chakra Cardíaco, símbolo de coragem e força vital.",
    },
    diretrizes:
      "Consagre no início do dia ou antes de sessões que demandem alta resistência física. Segure o fôlego nasal no momento do sopro e cuspa os resíduos. Use sons graves de terra em 432Hz.",
    cuidados:
      "Contém nicotina. Não recomendado para indivíduos hipertensos graves sem acompanhamento.",
    referencias:
      "Pereira (2019); Sateré-Mawé Tradition (2023); Clube do Haux (2026); Nativaram Brasil (2026).",
    forca: "intermediaria",
    chakras: ["Plexo Solar (Manipura)", "Chakra Cardíaco (Anahata)"],
    emoji: "⚡",
    foto: "/assets/sacramentos/25g/murici.jpg",
    disponivel15g: true,
    foto15g: "/assets/sacramentos/15g/murici-15g.jpg",
  },
  {
    slug: "nissural",
    nome: "Rapé de Nissural",
    subtitulo:
      "O Sopro do Silêncio e Conexão com os Avós",
    tipo: "rape",
    composicaoBotanica:
      "Nicotiana rustica, cinzas de Tsunu e folhas de Nissural (Rubiaceae - sigilo xamânico).",
    familiaBotanica:
      "Solanaceae, Fabaceae e Rubiaceae (sigilo etnobotânico).",
    feitioRastreabilidade:
      "Preparado de forma sagrada e sob rezas de conexão por nosso feitor caboclo. Matéria-prima coletada de forma ecológica e sustentável.",
    alquimiaFitoquimica:
      "Estudos preliminares sugerem que a folha de Nissural é rica em fitocomplexos nobres. A moagem ultrafina preservada em cinzas alcalinas de Tsunu facilita o tráfego de neurotransmissores de introspecção.",
    beneficios: {
      fisico:
        "Consagrado em momentos de oração profunda e cerimônias de estudo íntimo.",
      mental:
        "Usado tradicionalmente em momentos de concentração, silêncio e reza.",
      sutil:
        "Associado na tradição aos Chakras Coronário e Frontal e à conexão com os avós da floresta.",
    },
    diretrizes:
      "Consagre em momentos de profunda oração, busca de orientação espiritual ou cerimônias de estudo íntimo. Aplique com um sopro suave e focado. Use sons de harpas, flautas e frequências de 432Hz.",
    cuidados:
      "Contém nicotina. Requer uso respeitoso e focado, evitando consagração em ambientes ruidosos.",
    referencias:
      "Tradição Yawanawá (2022); RAPÉS SAGRADOS (2025); Nativaram Brasil (2026).",
    forca: "suave",
    chakras: ["Chakra Coronário (Sahasrara)", "Chakra Frontal (Ajna)"],
    emoji: "🙏",
    foto: "/assets/sacramentos/25g/nissural.jpg",
    disponivel15g: true,
    foto15g: "/assets/sacramentos/15g/nissural-15g.jpg",
  },
  {
    slug: "parica",
    nome: "Rapé de Paricá",
    subtitulo:
      "A Força do Guerreiro, Diagnóstico e Fogo da Transformação",
    tipo: "rape",
    composicaoBotanica:
      "Nicotiana rustica e cinzas da casca do tronco de Paricá (Schizolobium amazonicum / Anadenanthera).",
    familiaBotanica: "Solanaceae e Fabaceae (Mimosoideae).",
    feitioRastreabilidade:
      "Confeccionado artesanalmente por nosso feitor caboclo sob a egrégora de estudos de mais de duas décadas em diversas etnias da Amazônia. Matéria-prima de origem renovável.",
    alquimiaFitoquimica:
      "Diferente de pós inalados visionários como o Yopo, o rapé feito com a casca de Schizolobium amazonicum é livre de efeitos visionários. A queima acima de 250°C degrada totalmente qualquer composto triptamínico, resultando em uma cinza altamente alcalina de rápida ação.",
    beneficios: {
      fisico:
        "Consagrado em trabalhos de força, com postura firme e intenção focada, sob orientação do dirigente.",
      mental:
        "Usado tradicionalmente em ritos de firmeza, quando a corrente pede atenção e presença.",
      sutil:
        "Associado na tradição ao Chakra Coronário e ao Plexo Solar, símbolo do guerreiro interior.",
    },
    diretrizes:
      "Por ser um rapé de força extra-forte, consagre com postura firme e intenção focada. Mantenha a respiração pela boca. Sintonize com sons de fogueira, tambor cerimonial em 432Hz.",
    cuidados:
      "Contém nicotina. Não recomendado para iniciantes sem acompanhamento ou pessoas com crises inflamatórias agudas da mucosa.",
    referencias:
      "Santos (2019); Vida — Tradições de Valor (2026); Yanomami Tradition (2023); Nativaram Brasil (2026).",
    forca: "extra-forte",
    chakras: ["Chakra Coronário (Sahasrara)", "Plexo Solar (Manipura)"],
    emoji: "🔥",
    foto: "/assets/sacramentos/25g/parica.jpg",
    disponivel15g: true,
  },
  {
    slug: "pixuri",
    nome: "Rapé de Pixuri",
    subtitulo:
      "O Escudo de Proteção e Guardião do Sono",
    tipo: "rape",
    composicaoBotanica:
      "Nicotiana rustica, cinzas de Tsunu e sementes de Pixuri (Licaria puchury-major).",
    familiaBotanica: "Solanaceae, Fabaceae e Lauraceae.",
    feitioRastreabilidade:
      "Confeccionado de forma artesanal sob rezas de proteção por nosso feitor caboclo. Matéria-prima coletada de forma ecológica em casas de plantas locais parceiras.",
    alquimiaFitoquimica:
      "As sementes de Pixuri contêm teores elevados de linalol (composto sedativo e neuroprotetor). Processo de moagem ultrafina à sombra que preserva os fitocomplexos aromáticos que atuam no relaxamento celular.",
    beneficios: {
      fisico:
        "Consagrado tradicionalmente ao anoitecer, em ritos de encerramento dos trabalhos.",
      mental:
        "Acompanha momentos de silêncio e recolhimento ao fim da jornada litúrgica.",
      sutil:
        "Associado na tradição aos Chakras Frontal e Cardíaco, como rito de proteção noturna.",
    },
    diretrizes:
      "Consagre ao anoitecer ou antes de deitar em seu espaço de repouso. Aplique com um sopro longo, suave e acolhedor. Permaneça em silêncio de olhos fechados. Use músicas relaxantes e frequências de 432Hz.",
    cuidados:
      "Contém nicotina. Conservar o frasco âmbar fechado para evitar a volatilização de seus aromas nobres.",
    referencias:
      "Ribeiro (2022); HariOM Roots (2026); Vida — Tradições de Valor (2026).",
    forca: "suave",
    chakras: ["Chakra Frontal (Ajna)", "Chakra Cardíaco (Anahata)"],
    emoji: "🌙",
    foto: "/assets/sacramentos/25g/pixuri.jpg",
    disponivel15g: true,
  },
  {
    slug: "rainha",
    nome: "Rapé de Rainha (Chacrona)",
    subtitulo:
      "Conexão ao Sagrado Feminino e Paz Interna",
    tipo: "rape",
    composicaoBotanica:
      "Nicotiana rustica, cinzas alcalinas de Tsunu e folhas de Chacrona (Psychotria viridis).",
    familiaBotanica: "Solanaceae, Fabaceae e Rubiaceae.",
    feitioRastreabilidade:
      "Confeccionado de forma artesanal por nosso feitor caboclo sob a egrégora de estudos de mais de 20 anos de dietas e vivências na Amazônia. Matéria-prima de origem 100% renovável.",
    alquimiaFitoquimica:
      "Embora a folha in natura contenha compostos visionários, o calor do feitio acima de 200°C provoca a degradação térmica completa do DMT. O rapé não possui efeitos psicoativos, retendo flavonoides e taninos termoestáveis que equilibram as células mucosas.",
    beneficios: {
      fisico:
        "Presente em cerimônias de rezo feminino e em ritos de recolhimento da casa.",
      mental:
        "Acompanha momentos de meditação e silêncio dentro da liturgia.",
      sutil:
        "Associado na tradição ao Chakra Cardíaco (Anahata) e ao Chakra Frontal (Ajna), símbolo da sensibilidade intuitiva.",
    },
    diretrizes:
      "Consagre em ambiente silencioso com foco em meditação, autocuidado ou rituais de harmonização emocional. Receba o sopro suave de olhos fechados. Use músicas de rezo feminino em 432Hz.",
    cuidados:
      "Contém nicotina. Não recomendado para grávidas devido a contrações vasculares locais sutilizadas.",
    referencias:
      "Nunes et al. (2021); Sateré-Mawé Tradition (2023); Nativaram Brasil (2026).",
    forca: "suave",
    chakras: ["Chakra Cardíaco (Anahata)", "Chakra Frontal (Ajna)"],
    emoji: "👑",
    foto: "/assets/sacramentos/25g/rainha.jpg",
    disponivel15g: true,
    foto15g: "/assets/sacramentos/15g/rainha-15g.jpg",
  },
  {
    slug: "samauma",
    nome: "Rapé de Samaúma",
    subtitulo:
      "Conexão Vertical, Firmeza e Alinhamento Espiritual",
    tipo: "rape",
    composicaoBotanica:
      "Nicotiana rustica, cinzas de Samaúma (Ceiba pentandra) e casca de Ipê-Amarelo (Handroanthus serratifolius).",
    familiaBotanica: "Solanaceae, Malvaceae e Bignoniaceae.",
    feitioRastreabilidade:
      "Desenvolvido de forma artesanal sob rezas de alinhamento pelo nosso feitor caboclo. Colheita manual de cascas de árvores caídas e de galhos de fontes renováveis.",
    alquimiaFitoquimica:
      "As cinzas de Samaúma e Ipê-Amarelo são extremamente ricas em óxidos de potássio, cálcio e lapachol residual. Essa elevada riqueza de eletrólitos minerais confere ao preparado uma altíssima condutividade, facilitando as sinapses neurais de foco.",
    beneficios: {
      fisico:
        "Consagrado em ritos de alinhamento, com a coluna ereta e sopro firme.",
      mental:
        "Usado tradicionalmente em momentos de busca de orientação e firmeza de propósito.",
      sutil:
        "Associado na tradição ao Chakra Básico (Muladhara) e ao Chakra Coronário, como rito de conexão vertical.",
    },
    diretrizes:
      "Consagre em momentos que necessite de orientação, firmeza de propósito ou realinhamento geral. Sente-se com a coluna ereta. Use kuripe ou tepi com sopro firme. Sintonize com sons da mata e tambor em 432Hz.",
    cuidados:
      "Contém nicotina. Evitar o uso se houver quadros de sinusite inflamatória aguda.",
    referencias:
      "Almeida (2020); Handroanthus Studies (2022); Kuntanawa Tradition (2023); Nativaram Brasil (2026).",
    forca: "forte",
    chakras: ["Chakra Básico (Muladhara)", "Chakra Coronário (Sahasrara)"],
    emoji: "🌲",
    foto: "/assets/sacramentos/25g/tsunu.jpg",
    disponivel15g: true,
  },
  {
    slug: "canela-de-velho",
    nome: "Rapé de Canela de Velho",
    subtitulo:
      "Sabedoria dos Anciãos, Firmeza Estrutural e Enraizamento",
    tipo: "rape",
    composicaoBotanica:
      "Nicotiana rustica, cinzas alcalinas de Tsunú (Platycyamus regnellii) e folhas de Canela de Velho (Miconia albicans).",
    familiaBotanica: "Solanaceae, Fabaceae e Melastomataceae.",
    feitioRastreabilidade:
      "Confeccionado de forma 100% artesanal sob rezas de firmeza por nosso feitor caboclo, com mais de 20 anos de estudos nas matas. Matéria-prima obtida de forma renovável e sustentável.",
    alquimiaFitoquimica:
      "As folhas de Miconia albicans concentram flavonoides e compostos triterpênicos nobres (ácido oleanólico e ácido ursólico) que, integrados às cinzas alcalinas de Tsunú (pH 9,65 a 9,95), promovem estabilidade e presença corporal.",
    beneficios: {
      fisico:
        "Consagrado em ritos de ancoramento e antes de vigílias longas da corrente.",
      mental:
        "Acompanha estudos prolongados e momentos de escuta atenta na liturgia.",
      sutil:
        "Associado na tradição ao Chakra Básico (Muladhara) e ao Plexo Solar (Manipura), em memória dos anciãos da floresta.",
    },
    diretrizes:
      "Consagre em ritos de ancoramento, estudos prolongados ou antes de vigílias que peçam estabilidade física e serenidade. Use o kuripe ou tepi de forma focada e respeitosa em sintonia de 432Hz.",
    cuidados:
      "Contém nicotina. Voltado exclusivamente a adultos (+18) sob propósito claro de introspecção.",
    referencias:
      "Estudos Etnobotânicos de Miconia albicans (2022); Sabedoria Tradicional da Floresta (2025); Cooperativa Nativaram (2026).",
    forca: "intermediaria",
    chakras: ["Chakra Básico (Muladhara)", "Plexo Solar (Manipura)"],
    emoji: "🍃",
    foto: "/assets/sacramentos/25g/7-ervas.jpg",
    disponivel15g: true,
  },
  {
    slug: "tsunu",
    nome: "Rapé de Tsunu",
    subtitulo:
      "O Sopro Clássico de Alinhamento Geral, Foco e Aterramento",
    tipo: "rape",
    composicaoBotanica:
      "Nicotiana rustica e cinzas refinadas da casca da árvore de Tsunu (Platycyamus regnellii - Pau Pereira).",
    familiaBotanica: "Solanaceae e Fabaceae.",
    feitioRastreabilidade:
      "Confeccionado de maneira artesanal pelo nosso feitor caboclo sob a egrégora de estudos de mais de 20 anos em diversas nações da Amazônia. Matéria-prima obtida de forma ética e sustentável.",
    alquimiaFitoquimica:
      "As cascas de Tsunu calcinadas produzem cinzas altamente alcalinas que elevam o pH da cavidade nasal (pH entre 9,75 e 10,2). Esse processo transforma toda a nicotina ativa em base livre de absorção instantânea e altíssima eficácia cognitiva.",
    beneficios: {
      fisico:
        "Rapé clássico das cerimônias de abertura e encerramento de trabalhos.",
      mental:
        "Usado tradicionalmente em momentos de concentração e reza, ao início ou ao fim do dia.",
      sutil:
        "Associado na tradição a todos os chakras, como rito de aterramento e alinhamento geral.",
    },
    diretrizes:
      "A sabedoria botânica básica perfeita para sua jornada de oração ou bem-estar. Consagre ao acordar para despertar a mente, ou no final do dia para descarregar o cansaço. Use kuripe ou tepi. Sintonize em 432Hz.",
    cuidados:
      "Contém nicotina. Não recomendado para grávidas, lactantes ou pessoas hipertensas sem controle médico.",
    referencias:
      "Gupta et al. (2021); Yawanawa Tradition (2023); RAPÉS SAGRADOS (2025); Nativaram Brasil (2026).",
    forca: "intermediaria",
    chakras: ["Todos os 7 chakras"],
    emoji: "⚖️",
    foto: "/assets/sacramentos/25g/tsunu.jpg",
    disponivel15g: true,
  },
  {
    slug: "veia-de-paje",
    nome: "Rapé Veia de Pajé",
    subtitulo:
      "Circulação Ativa, Harmonização do Coração e Força de Yube",
    tipo: "rape",
    composicaoBotanica:
      "Nicotiana rustica, Epipremnum aureum (Cipó Jiboia) e cinzas condutoras de Samaúma (Ceiba pentandra).",
    familiaBotanica: "Solanaceae, Araceae e Malvaceae.",
    feitioRastreabilidade:
      "Confeccionado artesanalmente sob rezas de harmonização profunda por nosso feitor caboclo com mais de 20 anos de estudos em diversas etnias da Amazônia. Matéria-prima coletada de forma ecológica.",
    alquimiaFitoquimica:
      "Une as cinzas de Samaúma às folhas moídas de Cipó-Jiboia que contêm fitocomplexos nobres, saponinas e linalol termoestável. Essa sinergia promove a pureza das vias respiratórias superiores e apoia a vitalidade natural do organismo.",
    beneficios: {
      fisico:
        "Consagrado em cerimônias de harmonização, com respiração pausada e sopro firme.",
      mental:
        "Acompanha momentos de meditação e reza em busca de orientação.",
      sutil:
        "Associado na tradição aos Chakras Cardíaco e Frontal e à força espiritual da serpente Yube.",
    },
    diretrizes:
      "Consagre em sessões de harmonização de linhagens emocionais antigas ou quando buscar orientação e forte proteção da floresta. Aplique de forma firme com o kuripe ou tepi, respirando de forma pausada pela boca. Sintonize em 432Hz.",
    cuidados:
      "Contém nicotina. Rapé de força intermediária a forte. Não consagrar em momentos de enxaquecas agudas nas têmporas.",
    referencias:
      "Funasa (2018); Arara-Shawãdawa Tradition (2023); RAPÉS SAGRADOS (2025); Nativaram Brasil (2026).",
    forca: "forte",
    chakras: ["Chakra Cardíaco (Anahata)", "Chakra Frontal (Ajna)"],
    emoji: "🐍",
    foto: "/assets/sacramentos/25g/veia-de-paje.jpg",
    disponivel15g: true,
  },
];

export const forcaLabels: Record<Medicina["forca"], { label: string; color: string }> = {
  suave: { label: "Suave", color: "text-emerald-400" },
  intermediaria: { label: "Intermediária", color: "text-ambar-400" },
  forte: { label: "Forte", color: "text-orange-400" },
  "extra-forte": { label: "Extra-Forte", color: "text-red-400" },
};

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
      "Sete Ervas em Sintonia na Abertura dos Trabalhos",
    tipo: "rape",
    composicaoBotanica:
      "Tabebuia serratifolia (Tsunu), Eucalyptus globulus (Eucalipto), Artemisia vulgaris (Artemísia), Rosmarinus officinalis (Alecrim), Anadenanthera colubrina (Angico), Cordia verbenacea (Catissaral) e Nissural.",
    familiaBotanica:
      "Solanaceae, Fabaceae, Myrtaceae, Asteraceae, Lamiaceae e Rubiaceae.",
    feitioRastreabilidade:
      "Confeccionado artesanalmente por nosso feitor caboclo com mais de 20 anos de estudos. Matérias-primas obtidas de forma renovável e sustentável em parcerias com casas de plantas locais e coletores regionais.",
    alquimiaFitoquimica:
      "Reúne o tabaco às cinzas alcalinas do Tsunu e às folhas secas de Eucalipto, Alecrim, Artemísia, Angico, Catissaral e Nissural, moídas e peneiradas segundo o feitio tradicional. Contém nicotina natural do tabaco.",
    beneficios: {
      fisico:
        "Presente em cerimônias de abertura de trabalhos, quando a casa se prepara para a reza coletiva.",
      mental:
        "Usado tradicionalmente em momentos de concentração e reza, antes de estudos e orações.",
      sutil:
        "Associado na tradição aos sete centros de energia (chakras), como rito de firmeza e proteção do espaço sagrado.",
    },
    diretrizes:
      "Consagrado dentro da cerimônia, na abertura dos trabalhos, sob orientação do dirigente da casa credenciada. O sopro é aplicado com kuripe ou tepi, de forma firme e respeitosa. Muitas casas acompanham o rito com cantos ou sons em 432Hz.",
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
      "O Sopro do Acolhimento e da Comunhão da Corrente",
    tipo: "rape",
    composicaoBotanica:
      "Nicotiana rustica (Tabaco Sagrado) e Theobroma cacao (Cacau Selvagem).",
    familiaBotanica: "Solanaceae e Malvaceae (antiga Sterculiaceae).",
    feitioRastreabilidade:
      "Desenvolvido de forma artesanal por nosso feitor caboclo sob a egrégora de estudos de mais de duas décadas em tradições da floresta. Matéria-prima botânica obtida de fontes sustentáveis e renováveis.",
    alquimiaFitoquimica:
      "Une o tabaco sagrado ao cacau selvagem, torrado e moído no feitio tradicional. Em muitas tradições da floresta, o cacau é planta de partilha e comunhão. Contém nicotina natural do tabaco.",
    beneficios: {
      fisico:
        "Consagrado tradicionalmente em encontros de partilha e cerimônias de comunhão entre os irmãos da casa.",
      mental:
        "Acompanha momentos de reconexão e pausa consciente dentro da liturgia.",
      sutil:
        "Associado na tradição ao Chakra Cardíaco, símbolo de empatia e união da corrente.",
    },
    diretrizes:
      "Consagrado em cerimônias de partilha e comunhão, sob orientação do dirigente da casa credenciada. O sopro é recebido sentado, com kuripe ou tepi, em respiração pausada pela boca. Cantos ou sons em 432Hz podem acompanhar o rito.",
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
      "Firmeza e Ancoragem na Terra",
    tipo: "rape",
    composicaoBotanica:
      "Nicotiana rustica, Dipteryx odorata (Cumaru) e Protium heptaphyllum (Breu Preto).",
    familiaBotanica: "Solanaceae, Fabaceae e Burseraceae.",
    feitioRastreabilidade:
      "Desenvolvido de maneira artesanal por nosso feitor caboclo, com a sabedoria e a força de mais de 20 anos de estudos profundos em diversas etnias do Acre. Matéria-prima coletada de forma renovável.",
    alquimiaFitoquimica:
      "Une o tabaco às sementes de Cumaru e à resina de Breu Preto, de aroma balsâmico, em queima lenta e moagem artesanal. Contém nicotina natural do tabaco.",
    beneficios: {
      fisico:
        "Consagrado em ritos de firmeza e proteção, quando o trabalho pede postura e presença.",
      mental:
        "Usado tradicionalmente em momentos de concentração e silêncio antes da reza.",
      sutil:
        "Associado na tradição ao elemento terra e aos Chakras Básico e Coronário, como rito de enraizamento.",
    },
    diretrizes:
      "Consagrado em ritos de proteção e firmeza, sob orientação do dirigente da casa credenciada. O espaço é preparado em silêncio e o sopro é firme. Sons orgânicos em 432Hz podem acompanhar o rito.",
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
      "Enraizamento Sagrado, Firmeza e Memória dos Antigos",
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
      "Consagrado tradicionalmente ao anoitecer, em cerimônias de silêncio conduzidas pelo dirigente da casa credenciada. O sopro é aplicado de forma uniforme nas duas narinas e os resíduos são cuspidos. Sons em 432Hz podem acompanhar o rito.",
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
      "A Flor do Maracujá Silvestre nos Ritos de Encerramento",
    tipo: "rape",
    composicaoBotanica:
      "Nicotiana rustica, Passiflora incarnata (Flor de Maracujá Silvestre) e cinzas alcalinas de Tsunú (Platycyamus regnellii).",
    familiaBotanica: "Solanaceae, Passifloraceae e Fabaceae.",
    feitioRastreabilidade:
      "Confeccionado de forma artesanal pelo nosso feitor caboclo com mais de 20 anos de caminhada prática na floresta. Folhas e flores colhidas sob manejo sustentável.",
    alquimiaFitoquimica:
      "Une o tabaco às flores e folhas de maracujá silvestre (Passiflora incarnata), secas à sombra, e às cinzas alcalinas de Tsunú, moídas segundo o feitio tradicional. Contém nicotina natural do tabaco.",
    beneficios: {
      fisico:
        "Consagrado tradicionalmente ao entardecer, em ritos de encerramento e recolhimento.",
      mental:
        "Acompanha vigílias mansas e momentos de quietude dentro da liturgia.",
      sutil:
        "Associado na tradição aos Chakras Cardíaco (Anahata) e Frontal (Ajna), como preparação para a vigília.",
    },
    diretrizes:
      "Consagrado ao entardecer, nos ritos de encerramento e recolhimento da casa, sob orientação do dirigente. O sopro é suave e a respiração, tranquila. Sons da natureza em 432Hz podem acompanhar o rito.",
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
      "O Sopro da Renovação de Ciclos e do Desapego",
    tipo: "rape",
    composicaoBotanica:
      "Nicotiana rustica e Calycophyllum spruceanum (Mulateiro / Capirona).",
    familiaBotanica: "Solanaceae e Rubiaceae.",
    feitioRastreabilidade:
      "Confeccionado de maneira 100% artesanal pelo nosso feitor caboclo, que carrega a força de mais de 20 anos de estudos profundos e dietas na floresta. Matéria-prima de origem renovável.",
    alquimiaFitoquimica:
      "Une o tabaco à casca do Mulateiro, árvore amazônica conhecida por renovar a própria casca e, por isso, símbolo de renovação nas tradições da floresta. A casca é seca, queimada e moída no feitio artesanal. Contém nicotina natural do tabaco.",
    beneficios: {
      fisico:
        "Presente em rituais de transição e na abertura de novos ciclos dentro da casa.",
      mental:
        "Usado tradicionalmente em momentos de concentração e reza voltados ao desapego.",
      sutil:
        "Associado na tradição ao Chakra Básico (Muladhara) e ao Chakra Frontal, como rito de proteção e aterramento.",
    },
    diretrizes:
      "Consagrado em ritos de transição e na abertura de novos ciclos da casa, sob orientação do dirigente. O sopro é aplicado com kuripe ou tepi, de forma equilibrada nas duas narinas. Sons de água e frequências de 432Hz podem acompanhar o rito.",
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
      "O Sopro da Coragem nos Trabalhos Longos da Corrente",
    tipo: "rape",
    composicaoBotanica:
      "Nicotiana rustica e Byrsonima crassifolia (Murici).",
    familiaBotanica: "Solanaceae e Malpighiaceae.",
    feitioRastreabilidade:
      "Confeccionado artesanalmente por nosso feitor caboclo sob a egrégora de estudos de mais de duas décadas. Matéria-prima botânica obtida de fontes renováveis.",
    alquimiaFitoquimica:
      "Une o tabaco à casca do Murici, árvore do cerrado e da Amazônia, calcinada em fogo controlado e moída no feitio artesanal. Contém nicotina natural do tabaco.",
    beneficios: {
      fisico:
        "Consagrado tradicionalmente na abertura de trabalhos longos da corrente.",
      mental:
        "Acompanha momentos de presença e foco na reza coletiva.",
      sutil:
        "Associado na tradição ao Plexo Solar e ao Chakra Cardíaco, símbolo de coragem e força vital.",
    },
    diretrizes:
      "Consagrado na abertura de trabalhos longos da corrente, sob orientação do dirigente da casa credenciada. No momento do sopro, o fôlego nasal é mantido e os resíduos são cuspidos. Sons graves de terra em 432Hz podem acompanhar o rito.",
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
      "Une o tabaco às cinzas alcalinas de Tsunu e às folhas de Nissural, planta da família Rubiaceae cujo preparo é guardado em sigilo pela tradição. A moagem é ultrafina. Contém nicotina natural do tabaco.",
    beneficios: {
      fisico:
        "Consagrado em momentos de oração profunda e cerimônias de estudo íntimo.",
      mental:
        "Usado tradicionalmente em momentos de concentração, silêncio e reza.",
      sutil:
        "Associado na tradição aos Chakras Coronário e Frontal e à conexão com os avós da floresta.",
    },
    diretrizes:
      "Consagrado em momentos de oração profunda e em cerimônias de estudo, sob orientação do dirigente da casa credenciada. O sopro é suave e focado. Sons de harpas, flautas e frequências de 432Hz podem acompanhar o rito.",
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
      "A Força do Guerreiro e o Fogo da Transformação",
    tipo: "rape",
    composicaoBotanica:
      "Nicotiana rustica e cinzas da casca do tronco de Paricá (Schizolobium amazonicum / Anadenanthera).",
    familiaBotanica: "Solanaceae e Fabaceae (Mimosoideae).",
    feitioRastreabilidade:
      "Confeccionado artesanalmente por nosso feitor caboclo sob a egrégora de estudos de mais de duas décadas em diversas etnias da Amazônia. Matéria-prima de origem renovável.",
    alquimiaFitoquimica:
      "Une o tabaco às cinzas da casca do tronco de Paricá, queimada em fogo alto e moída no feitio tradicional. É um preparado de força extra-forte, reservado a trabalhos de força. Contém nicotina natural do tabaco.",
    beneficios: {
      fisico:
        "Consagrado em trabalhos de força, com postura firme e intenção focada, sob orientação do dirigente.",
      mental:
        "Usado tradicionalmente em ritos de firmeza, quando a corrente pede atenção e presença.",
      sutil:
        "Associado na tradição ao Chakra Coronário e ao Plexo Solar, símbolo do guerreiro interior.",
    },
    diretrizes:
      "Por ser de força extra-forte, é consagrado em trabalhos de força, com postura firme, sob orientação direta do dirigente da casa credenciada. A respiração é mantida pela boca. Sons de fogueira e tambor cerimonial em 432Hz podem acompanhar o rito.",
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
      "O Escudo de Proteção nos Ritos de Encerramento",
    tipo: "rape",
    composicaoBotanica:
      "Nicotiana rustica, cinzas de Tsunu e sementes de Pixuri (Licaria puchury-major).",
    familiaBotanica: "Solanaceae, Fabaceae e Lauraceae.",
    feitioRastreabilidade:
      "Confeccionado de forma artesanal sob rezas de proteção por nosso feitor caboclo. Matéria-prima coletada de forma ecológica em casas de plantas locais parceiras.",
    alquimiaFitoquimica:
      "Une o tabaco às cinzas de Tsunu e às sementes de Pixuri, de aroma intenso, moídas à sombra no feitio artesanal para guardar o perfume das sementes. Contém nicotina natural do tabaco.",
    beneficios: {
      fisico:
        "Consagrado tradicionalmente ao anoitecer, em ritos de encerramento dos trabalhos.",
      mental:
        "Acompanha momentos de silêncio e recolhimento ao fim da jornada litúrgica.",
      sutil:
        "Associado na tradição aos Chakras Frontal e Cardíaco, como rito de proteção noturna.",
    },
    diretrizes:
      "Consagrado ao anoitecer, nos ritos de encerramento dos trabalhos, sob orientação do dirigente da casa credenciada. O sopro é longo e suave, seguido de silêncio de olhos fechados. Cantos suaves e frequências de 432Hz podem acompanhar o rito.",
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
      "Conexão ao Sagrado Feminino e ao Recolhimento",
    tipo: "rape",
    composicaoBotanica:
      "Nicotiana rustica, cinzas alcalinas de Tsunu e folhas de Chacrona (Psychotria viridis).",
    familiaBotanica: "Solanaceae, Fabaceae e Rubiaceae.",
    feitioRastreabilidade:
      "Confeccionado de forma artesanal por nosso feitor caboclo sob a egrégora de estudos de mais de 20 anos de dietas e vivências na Amazônia. Matéria-prima de origem 100% renovável.",
    alquimiaFitoquimica:
      "Une o tabaco às cinzas alcalinas de Tsunu e às folhas de Chacrona (Psychotria viridis), secas, queimadas e moídas no feitio tradicional. Nas tradições da ayahuasca, a Chacrona é chamada de Rainha, e o nome deste rapé guarda essa memória. Contém nicotina natural do tabaco.",
    beneficios: {
      fisico:
        "Presente em cerimônias de rezo feminino e em ritos de recolhimento da casa.",
      mental:
        "Acompanha momentos de meditação e silêncio dentro da liturgia.",
      sutil:
        "Associado na tradição ao Chakra Cardíaco (Anahata) e ao Chakra Frontal (Ajna), símbolo da sensibilidade intuitiva.",
    },
    diretrizes:
      "Consagrado em cerimônias de rezo feminino e em ritos de recolhimento da casa, sob orientação de quem dirige o trabalho. O sopro é suave, recebido de olhos fechados. Cantos de rezo feminino em 432Hz podem acompanhar o rito.",
    cuidados:
      "Contém nicotina. Não recomendado para grávidas ou lactantes.",
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
      "Une o tabaco às cinzas de Samaúma, a grande árvore da floresta amazônica, e à casca de Ipê-Amarelo, colhidas de árvores caídas e de galhos, queimadas e moídas no feitio artesanal. Contém nicotina natural do tabaco.",
    beneficios: {
      fisico:
        "Consagrado em ritos de alinhamento, com a coluna ereta e sopro firme.",
      mental:
        "Usado tradicionalmente em momentos de busca de orientação e firmeza de propósito.",
      sutil:
        "Associado na tradição ao Chakra Básico (Muladhara) e ao Chakra Coronário, como rito de conexão vertical.",
    },
    diretrizes:
      "Consagrado em ritos de alinhamento e firmeza de propósito, sob orientação do dirigente da casa credenciada. O sopro é recebido sentado, com a coluna ereta, por kuripe ou tepi. Sons da mata e tambor em 432Hz podem acompanhar o rito.",
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
      "Sabedoria dos Anciãos e Enraizamento",
    tipo: "rape",
    composicaoBotanica:
      "Nicotiana rustica, cinzas alcalinas de Tsunú (Platycyamus regnellii) e folhas de Canela de Velho (Miconia albicans).",
    familiaBotanica: "Solanaceae, Fabaceae e Melastomataceae.",
    feitioRastreabilidade:
      "Confeccionado de forma 100% artesanal sob rezas de firmeza por nosso feitor caboclo, com mais de 20 anos de estudos nas matas. Matéria-prima obtida de forma renovável e sustentável.",
    alquimiaFitoquimica:
      "Une o tabaco às cinzas alcalinas de Tsunú e às folhas de Canela de Velho (Miconia albicans), planta do cerrado, secas e moídas no feitio artesanal. Contém nicotina natural do tabaco.",
    beneficios: {
      fisico:
        "Consagrado em ritos de ancoramento e antes de vigílias longas da corrente.",
      mental:
        "Acompanha estudos prolongados e momentos de escuta atenta na liturgia.",
      sutil:
        "Associado na tradição ao Chakra Básico (Muladhara) e ao Plexo Solar (Manipura), em memória dos anciãos da floresta.",
    },
    diretrizes:
      "Consagrado em ritos de ancoramento e antes de vigílias longas da corrente, sob orientação do dirigente da casa credenciada. O sopro é aplicado com kuripe ou tepi, de forma focada e respeitosa. Sons em 432Hz podem acompanhar o rito.",
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
      "O Sopro Clássico de Abertura e Encerramento dos Trabalhos",
    tipo: "rape",
    composicaoBotanica:
      "Nicotiana rustica e cinzas refinadas da casca da árvore de Tsunu (Platycyamus regnellii - Pau Pereira).",
    familiaBotanica: "Solanaceae e Fabaceae.",
    feitioRastreabilidade:
      "Confeccionado de maneira artesanal pelo nosso feitor caboclo sob a egrégora de estudos de mais de 20 anos em diversas nações da Amazônia. Matéria-prima obtida de forma ética e sustentável.",
    alquimiaFitoquimica:
      "Une o tabaco às cinzas da casca de Tsunu (Pau Pereira), base tradicional de muitos rapés amazônicos. A casca é calcinada e peneirada até virar pó fino. Contém nicotina natural do tabaco.",
    beneficios: {
      fisico:
        "Rapé clássico das cerimônias de abertura e encerramento de trabalhos.",
      mental:
        "Usado tradicionalmente em momentos de concentração e reza, na abertura ou no encerramento dos trabalhos.",
      sutil:
        "Associado na tradição a todos os chakras, como rito de aterramento e alinhamento geral.",
    },
    diretrizes:
      "Rapé clássico das cerimônias de abertura e encerramento de trabalhos, consagrado sob orientação do dirigente da casa credenciada. O sopro é aplicado com kuripe ou tepi. Sons em 432Hz podem acompanhar o rito.",
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
      "A Força de Yube e a Proteção da Floresta",
    tipo: "rape",
    composicaoBotanica:
      "Nicotiana rustica, Epipremnum aureum (Cipó Jiboia) e cinzas condutoras de Samaúma (Ceiba pentandra).",
    familiaBotanica: "Solanaceae, Araceae e Malvaceae.",
    feitioRastreabilidade:
      "Confeccionado artesanalmente sob rezas de harmonização profunda por nosso feitor caboclo com mais de 20 anos de estudos em diversas etnias da Amazônia. Matéria-prima coletada de forma ecológica.",
    alquimiaFitoquimica:
      "Une o tabaco às folhas moídas de Cipó-Jiboia e às cinzas de Samaúma, no feitio artesanal. A jiboia remete a Yube, a serpente sagrada das tradições do Acre. Contém nicotina natural do tabaco.",
    beneficios: {
      fisico:
        "Consagrado em cerimônias de harmonização, com respiração pausada e sopro firme.",
      mental:
        "Acompanha momentos de meditação e reza em busca de orientação.",
      sutil:
        "Associado na tradição aos Chakras Cardíaco e Frontal e à força espiritual da serpente Yube.",
    },
    diretrizes:
      "Consagrado em cerimônias de proteção e de busca de orientação espiritual, sob orientação do dirigente da casa credenciada. O sopro é firme, com kuripe ou tepi, e a respiração, pausada pela boca. Sons em 432Hz podem acompanhar o rito.",
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

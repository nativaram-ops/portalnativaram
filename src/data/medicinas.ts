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
      "Confeccionado artesanalmente por nosso feitor caboclo com mais de 20 anos de estudos. Matérias-primas adquiridas de forma renovável e sustentável em parcerias com casas de plantas locais e coletores regionais.",
    alquimiaFitoquimica:
      "Ao unir o tabaco forte com as cinzas alcalinas do Tsunu e os óleos naturais do Eucalipto e do Alecrim, esta mistura cria uma resposta imediata de desobstrução e foco, preservando os sais minerais e nutrientes essenciais das folhas mesmo após o fogo da queima.",
    beneficios: {
      fisico:
        "Ajuda na limpeza profunda do peito e do nariz, aliviando gripes, tosses e resfriados sazonais de forma rápida e natural.",
      mental:
        "Traz uma clareza de pensamento maravilhosa, ajudando a se concentrar em tarefas difíceis sem aquela sensação de estafa.",
      sutil:
        "Alinha e equilibra os sete centros de energia (chakras) do corpo, criando um verdadeiro campo de proteção ao redor.",
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
        "Melhora a circulação do corpo, aliviando a fadiga muscular e as tensões causadas pela estafa física.",
      mental:
        "Estimula os hormônios do bem-estar e da felicidade no cérebro, diminuindo sentimentos de tristeza profunda e desânimo.",
      sutil:
        "Atua diretamente no Chakra Cardíaco (no coração), acolhendo dores emocionais e abrindo os canais da empatia e da união.",
    },
    diretrizes:
      "Consagre quando buscar um momento de reconexão consigo mesmo. Sente-se confortavelmente, use um kuripe ou tepi, respirando de forma pausada pela boca, integrando os sentimentos na frequência harmônica de 432Hz.",
    cuidados:
      "Contém nicotina. Evitar uso concomitante com estimulantes cardíacos sintéticos pesados.",
    referencias: "Rocha (2023); Yunka (2026); Vida Produtos de Valor (2026).",
    forca: "suave",
    chakras: ["Chakra Cardíaco (Anahata)"],
    emoji: "🤎",
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
        "Potente broncodilatador e descongestionante pulmonar. Alivia dores de cabeça causadas por peso nos seios da face.",
      mental:
        "Corta na hora o fluxo de pensamentos repetitivos, obsessivos ou loops de preocupação, trazendo estabilidade cognitiva e foco.",
      sutil:
        "Trabalha como um escudo protetor, promovendo uma forte ligação com o elemento terra (enraizamento) nos Chakras Básico e Coronário.",
    },
    diretrizes:
      "Consagre com firme intenção de proteção e firmeza. Prepare um espaço silencioso e consagre com sopro firme. Realize o expurgo das toxinas, sintonizando o ambiente com sonoridades orgânicas de 432Hz.",
    cuidados:
      "Contém nicotina. Apenas para adultos (+18). Siga as orientações de proporção segura e respeitosa.",
    referencias:
      "Oliveira et al. (2020); Huni Kuin Tradition (2023); Vida Produtos de Valor (2026).",
    forca: "forte",
    chakras: ["Chakra Básico (Muladhara)", "Chakra Coronário (Sahasrara)"],
    emoji: "🛡️",
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
      "Confeccionado de forma artesanal e sob rezas de enraizamento pelo nosso feitor caboclo. Toda a matéria-prima é de origem renovável, adquirida eticamente em parcerias sustentáveis.",
    alquimiaFitoquimica:
      "O fitoativo visionário DMT presente na casca da raiz viva sofre degradação térmica completa acima de 250°C. Assim, o rapé é 100% livre de efeitos psicoativos, retendo taninos cicatrizantes e minerais termoestáveis.",
    beneficios: {
      fisico:
        "Atua como um potente adstringente e cicatrizante natural das vias nasais superiores, reduzindo a irritação de mucosas.",
      mental:
        "Promove uma estabilização imediata contra descompassos emocionais, devolvendo o equilíbrio e a presença.",
      sutil:
        "Ativa intensamente o Chakra Básico (Muladhara), trazendo presença física absoluta e conectando com a energia da terra.",
    },
    diretrizes:
      "Consagre preferencialmente ao anoitecer em silêncio e introspecção. Aplique de forma uniforme nas duas narinas e segure o fôlego nasal, cuspindo os resíduos. Use frequências de 432Hz para estabilizar.",
    cuidados:
      "Contém nicotina. Não recomendado para grávidas, lactantes ou indivíduos com sensibilidade severa ao tabaco.",
    referencias:
      "Lima (2020); de Souza et al. (2008); Kariri-Xocó Tradition (2023); Vida Produtos de Valor (2026).",
    forca: "forte",
    chakras: ["Chakra Básico (Muladhara)"],
    emoji: "🌳",
  },
  {
    slug: "mentolado",
    nome: "Rapé Mentolado",
    subtitulo:
      "O Sopro Gelado do Foco e Clareza Imediata",
    tipo: "rape",
    composicaoBotanica:
      "Nicotiana rustica, Mentha arvensis / Mentha sp. (Menta) e cinzas vegetais nobres.",
    familiaBotanica: "Solanaceae e Lamiaceae.",
    feitioRastreabilidade:
      "Confeccionado de forma artesanal pelo nosso feitor caboclo com base em mais de 20 anos de caminhada prática. Menta e fumo de casas de plantas locais credenciadas.",
    alquimiaFitoquimica:
      "O mentol natural é um composto terpênico altamente volátil. O feitio exclusivo garante que a menta seja homogeneizada em etapas estritamente frias pós-calcinação, preservando 100% de sua potência.",
    beneficios: {
      fisico:
        "Rápida desobstrução das vias aéreas superiores. Conforto de enxaquecas, dores de cabeça tensionais e cansaço visual.",
      mental:
        "Promove uma rápida agilidade mental e foco ativo através do estímulo térmico, nutrindo a vitalidade diurna.",
      sutil:
        "Atua 'esfriando' e equilibrando o excesso de energia acumulada no Chakra Frontal (Terceiro Olho) e do Plexo Solar.",
    },
    diretrizes:
      "Consagre durante o dia, em momentos de cansaço extremo. Ao receber o sopro firme, mantenha a respiração pela boca e sinta a onda de gelo subindo e limpando sua cabeça. Sintonize com sons naturais de 432Hz.",
    cuidados:
      "Contém nicotina. Evitar se houver extrema sensibilidade ao frio periférico.",
    referencias:
      "Souza (2022); Cephalalgia (2023); Dreamkeepers (2026); Nhanderu Xamanismo (2026).",
    forca: "intermediaria",
    chakras: ["Chakra Frontal (Ajna)", "Plexo Solar (Manipura)"],
    emoji: "❄️",
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
        "Cicatrizante natural e protetor das vias respiratórias, aliviando o peso e as pressões acumuladas na cabeça.",
      mental:
        "Estimula o equilíbrio bilateral, quebrando pensamentos obsessivos e ajudando a dissolver tensões intelectuais.",
      sutil:
        "Ativa vigorosamente o Chakra Básico (Muladhara) e o Chakra Frontal, propiciando proteção áurica e forte aterramento.",
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
      "Confeccionado artesanalmente por nosso feitor caboclo sob a egrégora de estudos de mais de duas décadas. Matéria-prima botânica adquirida de fontes renováveis.",
    alquimiaFitoquimica:
      "A casca do Murici é uma fonte abundante de ferro, potássio, vitamina C e taninos. A calcinação controlada resulta em uma cinza rica em potássio e ferro bioativos que aumentam a condutividade e a resposta corporal de vigor.",
    beneficios: {
      fisico:
        "Reduz os sintomas de desconfortos respiratórios, atuando como um anti-inflamatório que ajuda a nutrir o vigor corporal.",
      mental:
        "Nutre a vitalidade mental, ativando as vias cognitivas de ação, presença e foco sob estresse intelectual.",
      sutil:
        "Fortalece o Chakra Umbilical (Plexo Solar) e o Chakra Cardíaco, trazendo coragem e equilibrando a energia vital.",
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
        "Alivia tensões na região da testa e cabeça, auxiliando no conforto de dores de origem tensional e cansaço visual.",
      mental:
        "Promove um estado de clareza intuitiva, acalmando o pensar acelerado e organizando as sinapses para a meditação.",
      sutil:
        "Atua diretamente no Chakra Coronário e no Chakra Frontal, limpando os canais superiores e criando proteção.",
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
      "Diferente de pós inalados alucinógenos como o Yopo, o rapé feito com a casca de Schizolobium amazonicum é livre de efeitos visionários. A queima acima de 250°C degrada totalmente qualquer composto triptamínico, resultando em uma cinza altamente alcalina de rápida ação.",
    beneficios: {
      fisico:
        "Desobstrução profunda das vias aéreas superiores, promovendo conforto imediato da pressão sinusal e cansaços oculares.",
      mental:
        "Ativação de hiperconsciência, cortando loops de preocupação, medos e cansaços intelectuais.",
      sutil:
        "Abre o Chakra Coronário e o Plexo Solar, dispensando bloqueios áuricos e ativando o guerreiro interior.",
    },
    diretrizes:
      "Por ser um rapé de força extra-forte, consagre com postura firme e intenção focada. Mantenha a respiração pela boca. Sintonize com sons de fogueira, tambor de cura em 432Hz.",
    cuidados:
      "Contém nicotina. Não recomendado para iniciantes sem acompanhamento ou pessoas com crises inflamatórias agudas da mucosa.",
    referencias:
      "Santos (2019); Vida Produtos de Valor (2026); Yanomami Tradition (2023); Nativaram Brasil (2026).",
    forca: "extra-forte",
    chakras: ["Chakra Coronário (Sahasrara)", "Plexo Solar (Manipura)"],
    emoji: "🔥",
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
        "Vasodilatador natural suave, auxiliando no conforto de cefaleias circulatórias e promovendo relaxamento muscular do corpo.",
      mental:
        "Reduz as tensões mentais diárias e a agitação pré-sono, induzindo o cérebro a emitir ondas de relaxamento profundo (alfa e theta).",
      sutil:
        "Proteção áurica com foco no Chakra Frontal e Cardíaco, criando um escudo contra pesadelos e sintonias densas noturnas.",
    },
    diretrizes:
      "Consagre ao anoitecer ou antes de deitar em seu espaço de repouso. Aplique com um sopro longo, suave e acolhedor. Permaneça em silêncio de olhos fechados. Use músicas relaxantes e frequências de 432Hz.",
    cuidados:
      "Contém nicotina. Conservar o frasco âmbar fechado para evitar a volatilização de seus aromas nobres.",
    referencias:
      "Ribeiro (2022); HariOM Roots (2026); Vida Produtos de Valor (2026).",
    forca: "suave",
    chakras: ["Chakra Frontal (Ajna)", "Chakra Cardíaco (Anahata)"],
    emoji: "🌙",
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
        "Ação anti-inflamatória e protetora local das mucosas superiores nasais, auxiliando na redução de irritações respiratórias.",
      mental:
        "Estimula a síntese de serotonina e endorfinas, diminuindo as tensões do dia e promovendo paz mental.",
      sutil:
        "Ativa de forma doce o Chakra Cardíaco (Anahata) e o Chakra Frontal (Ajna), equilibrando a sensibilidade intuitiva.",
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
        "Expande de forma natural a capacidade respiratória pulmonar superior e auxilia na redução de estresses musculares posturais.",
      mental:
        "Acalma o fluxo desordenado de preocupações lógicas diárias, organizando as ideias e aumentando a clareza para decisões.",
      sutil:
        "Ativa intensamente o Chakra Básico (Muladhara - enraizamento) e o Chakra Coronário, promovendo conexão vertical.",
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
  },
  {
    slug: "sansara",
    nome: "Rapé de Sansara",
    subtitulo:
      "O Sopro do Desapego, Quebra de Padrões e Harmonização de Ciclos",
    tipo: "rape",
    composicaoBotanica:
      "Nicotiana rustica, cinzas de Tsunu e folhas secas moídas de Sansara (Justicia sp. - sigilo xamânico).",
    familiaBotanica: "Solanaceae, Fabaceae e Acanthaceae.",
    feitioRastreabilidade:
      "Confeccionado de forma 100% artesanal sob rezas de libertação por nosso feitor caboclo, com mais de 20 anos de estudos nas matas. Matéria-prima adquirida de forma renovável e sustentável.",
    alquimiaFitoquimica:
      "As cinzas alcalinas de Tsunu (pH ≈ 9,5) misturadas às folhas ricas em flavonoides e alcaloides sedativos de Sansara despolarizam suavemente os receptores nasais, reduzindo a liberação de noradrenalina e promovendo o relaxamento dos lobos cerebrais.",
    beneficios: {
      fisico:
        "Alivia tensões na região de ombros e pescoço provocados por somatizações corporais e cansaços intelectuais crônicos.",
      mental:
        "Favorece a quebra de hábitos repetitivos e silencia as tensões acumuladas na cabeça, promovendo clareza de foco.",
      sutil:
        "Forte atuação nos Chakras Frontal e Cardíaco, facilitando a limpeza de impressões de ambientes carregados.",
    },
    diretrizes:
      "Consagre em momentos de transição de vida ou quando sentir que precisa de um 'recomeço' mental. Use o kuripe ou tepi de forma focada e respeitosa. Sintonize com bacias de cristal e sons acústicos em 432Hz.",
    cuidados:
      "Contém nicotina. Voltado exclusivamente a adultos (+18) sob propósito claro de introspecção.",
    referencias:
      "Nukini & Shawadawa Interviews (ISA, 2023); RAPÉS SAGRADOS (2025); Nativaram Brasil (2026).",
    forca: "intermediaria",
    chakras: ["Chakra Frontal (Ajna)", "Chakra Cardíaco (Anahata)"],
    emoji: "🔓",
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
      "Confeccionado de maneira artesanal pelo nosso feitor caboclo sob a egrégora de estudos de mais de 20 anos em diversas nações da Amazônia. Matéria-prima adquirida de forma ética e sustentável.",
    alquimiaFitoquimica:
      "As cascas de Tsunu calcinadas produzem cinzas altamente alcalinas que elevam o pH da cavidade nasal (pH entre 9,75 e 10,2). Esse processo transforma toda a nicotina ativa em base livre de absorção instantânea e altíssima eficácia cognitiva.",
    beneficios: {
      fisico:
        "Excepcional limpador do trato respiratório superior. Nutre a sensação de vigor corporal e renova o tônus.",
      mental:
        "Oferece o equilíbrio perfeito entre o alerta focado e o relaxamento sereno. Zera os ruídos mentais com rapidez e precisão.",
      sutil:
        "Alinha todos os Chakras do corpo, promovendo uma profunda ancoragem (aterramento) e limpeza de energias estagnadas.",
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
      "Une as cinzas de Samaúma às folhas moídas de Cipó-Jiboia que contêm fitocomplexos nobres, saponinas e linalol termoestável. Essa sinergia desintoxica as vias aéreas superiores e atua de forma imunoestimulante.",
    beneficios: {
      fisico:
        "Atua limpando e tonificando o fluxo circulatório corporal geral, aliviando a fadiga profunda e cansaço de pernas pesadas.",
      mental:
        "Excelente facilitador do transe meditativo calmo (ondas theta), limpando a estafa intelectual e favorecendo a clareza.",
      sutil:
        "Foco intenso no Chakra Cardíaco e no Chakra Frontal, ativando a força de harmonização espiritual da serpente cósmica Yube.",
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
  },
];

export const forcaLabels: Record<Medicina["forca"], { label: string; color: string }> = {
  suave: { label: "Suave", color: "text-emerald-400" },
  intermediaria: { label: "Intermediária", color: "text-ambar-400" },
  forte: { label: "Forte", color: "text-orange-400" },
  "extra-forte": { label: "Extra-Forte", color: "text-red-400" },
};

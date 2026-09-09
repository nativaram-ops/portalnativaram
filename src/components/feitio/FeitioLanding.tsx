"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FlaskConical,
  Sparkles,
  Scale,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Compass,
  ArrowRight,
  Flame,
  Droplets,
  PackageCheck,
  Layers,
  Leaf,
  Info,
  ChevronDown,
  Sun,
  Eye,
  TreePine,
  Award,
  Scroll,
  BookOpen,
  Filter,
  ShieldAlert,
  AlertTriangle,
  Microscope,
  Check,
  X,
} from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionDivider } from "@/components/ui/SectionDivider";

interface FaqItem {
  pergunta: string;
  resposta: string;
}

const faqsFeitio: FaqItem[] = [
  {
    pergunta: "Por que a Nativaram adota o purismo estrito sem plantas aditivas?",
    resposta:
      "Diferente de algumas vertentes do vegetalismo que incorporam dezenas de plantas aditivas ou análogos botânicos com perfis fitoquímicos instáveis (como a Chaliponga rica em 5-MeO-DMT ou a Arruda Síria), a Nativaram limita a decocção estritamente ao binômio Cipó Jagube/Mariri e Folha Chacrona Rainha. Esse purismo botânico evita a polifarmácia descontrolada, onde metabólitos competem pelas vias enzimáticas hepáticas do citocromo P450 (como CYP2D6 e CYP1A2). O resultado é um sacramento limpo, fisiologicamente seguro, com previsibilidade fitoquímica e suave transição espiritual.",
  },
  {
    pergunta: "O que são as chamadas 'Anayahuascas' ou análogos e por que a Nativaram as recusa?",
    resposta:
      "O termo 'Anahuasca', popularizado na década de 1990 pelo etnobotânico Jonathan Ott, designa formulações não tradicionais que tentam reproduzir quimicamente a fórmula [IMAO + DMT] utilizando plantas exóticas ou substâncias de laboratório, como a Arruda Síria (Peganum harmala) e a Jurema Preta (Mimosa hostilis/tenuiflora) ou sais puros (Pharmahuasca). A Nativaram não aceita nem compactua com tais análogos: a Arruda Síria é saturada de Harmalina neurotóxica periférica e desprovida de THH (Tetra-hidroharmina), causando colapsos motores, hipotensão severa e náuseas espásticas; a raiz de Jurema oral possui taninos pirogálicos altamente irritantes para a mucosa estomacal; e, juridicamente, apenas a Ayahuasca tradicional amazônica (Banisteriopsis caapi + Psychotria viridis) é protegida pela Resolução CONAD nº 01/2010 como patrimônio biocultural e litúrgico.",
  },
  {
    pergunta: "Quais as diferenças entre o Cipó Tucunacá e as outras variedades e primos botânicos?",
    resposta:
      "O Cipó Tucunacá (Banisteriopsis caapi var. Tucunaca) é o padrão ouro da Nativaram por seu caule liso e perfil cromatográfico rico em Harmina e THH, com teor residual mínimo de Harmalina, garantindo uma condução lúcida e sem tremores motores. Outras variedades legítimas como o Caupuri (caule nodoso e rosariado) e o Ourinho (casca dourada e nós suaves) carregam nuances telúricas ou de purga física distinta. Primos botânicos da mesma família Malpighiaceae, como Banisteriopsis muricata e Tetrapterys mucronata, possuem longa tradição indígena no Noroeste Amazônico, mas não se confundem com a calibração canônica do Tucunacá acreano.",
  },
  {
    pergunta: "Como ocorrem as variações sazonais de cipó colhido no Acre?",
    resposta:
      "A colheita na floresta amazônica respeita as estações de chuva e as cheias dos rios em Cruzeiro do Sul/AC. Embora o Cipó Tucunacá seja o padrão de excelência pelo alto teor de THH e teor residual mínimo de harmalina, a alta demanda litúrgica e os ciclos ecológicos nem sempre permitem a colheita ininterrupta desta única variedade. Nesses períodos sazonais, operamos com cipós botânicos estreitamente aparentados colhidos de forma 100% ética e sustentável. Cada lote é calibrado e analisado na proporção com a folha Rainha, garantindo a mesma nobreza de consagração com sutis nuances de força.",
  },
  {
    pergunta: "Qual é a melhor forma de armazenar o sacramento após o recebimento?",
    resposta:
      "O sacramento deve ser conservado em local fresco, arejado e protegido da luz solar direta. Para períodos superiores a 30 dias, recomenda-se mantê-lo sob refrigeração constante (entre 2°C e 6°C) para estabilizar a composição fitoquímica e prevenir processos naturais de fermentação acética. Ao abrir o recipiente para uma cerimônia, utilize utensílios limpos e secos.",
  },
  {
    pergunta: "Como é calculado o rateio de custos do feitio?",
    resposta:
      "Sendo uma cooperativa sem fins lucrativos em estrita observância à Resolução CONAD nº 01/2010, o rateio cooperativo destina-se exclusivamente ao ressarcimento das despesas reais de produção: os dias de fogo e vigília na floresta do Acre, a remuneração digna da família do feitor caboclo, o manejo sustentável das plantas, as embalagens de grau alimentício estéril e a logística refrigerada/segura até o Sudeste e os templos cadastrados.",
  },
  {
    pergunta: "Qual a diferença prática entre as graduações 3.1, 5.1, 7.1 e 10.1?",
    resposta:
      "A numeração tradicional reflete a quantidade de biomassa vegetal (quilos de cipó e folha) concentrada por litro de sacramento. A graduação 3.1 Mainumbi proporciona uma conexão suave e límpida, ideal para iniciantes e orações mansas; a 5.1 Pituã confere equilíbrio firme e harmonização estável; a 7.1 Anhangatã aprofunda os cantos, a reflexão e a ressignificação íntima; e a 10.1 Wirapuru (Semi-Mel) possui consistência densa e alta egrégora para mirações prolongadas e condução litúrgica avançada.",
  },
];

export function FeitioLanding() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeFeitioVideo, setActiveFeitioVideo] = useState<"caldeirao" | "bateria" | "garrafa">("caldeirao");

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };


  return (
    <div className="space-y-0">
      {/* ═══════════════════════════════════════════
          HERO — A SAGRADA ALQUIMIA DO FEITIO PURISTA
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-24 sm:py-32">
        {/* Imagem de Fundo com Overlay Cinematográfico */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/feitio/curadas/feitio-noturno-caldeiroes.jpg"
            alt="Vigília noturna na Casa de Feitio da Nativaram em Cruzeiro do Sul, Acre"
            fill
            priority
            className="object-cover object-center brightness-60 scale-105 transition-transform duration-1000"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-floresta-950 via-floresta-950/70 to-floresta-950/30" />
          <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        </div>

        {/* Glow Dourado do Fogo */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-ambar-500/[0.14] rounded-full blur-[130px] pointer-events-none z-0" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <AnimateOnScroll>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-ambar-500/30 bg-floresta-950/85 backdrop-blur-md px-5 py-2 text-xs font-semibold tracking-[0.18em] text-ambar-400 uppercase shadow-solar">
              <Flame className="h-3.5 w-3.5 text-ambar-400 animate-flicker" />
              <span>Registro Documental • Cruzeiro do Sul, Acre • Feitio Ancestral</span>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={150}>
            <h1 className="font-serif text-display-md sm:text-display-lg lg:text-display-2xl font-bold text-areia-100 text-glow leading-tight">
              A Sagrada Alquimia do
              <br />
              <span className="text-gradient-solar">Feitio Purista</span>
            </h1>
          </AnimateOnScroll>

          <AnimateOnScroll delay={300}>
            <p className="text-base sm:text-lg lg:text-xl text-areia-200/95 leading-relaxed italic max-w-3xl mx-auto font-serif">
              &ldquo;Onde a oração contínua, o fogo sagrado e a ciência da terra consagram a aliança entre o Cipó e a Folha Rainha no coração da floresta amazônica.&rdquo;
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll delay={450}>
            {/* Badges de Autoridade */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <div className="inline-flex items-center gap-2 rounded-xl border border-ambar-500/20 bg-floresta-900/80 px-3.5 py-2 text-xs text-areia-200 backdrop-blur-sm">
                <Flame className="h-3.5 w-3.5 text-ambar-400" />
                <span>Mais de 28 Anos de Vigília & Feitio</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-xl border border-ambar-500/20 bg-floresta-900/80 px-3.5 py-2 text-xs text-areia-200 backdrop-blur-sm">
                <Droplets className="h-3.5 w-3.5 text-ambar-400" />
                <span>Água Pura de Nascente Amazônica</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-xl border border-ambar-500/20 bg-floresta-900/80 px-3.5 py-2 text-xs text-areia-200 backdrop-blur-sm">
                <Leaf className="h-3.5 w-3.5 text-ambar-400" />
                <span>Purismo Botânico Sem Aditivos</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-xl border border-ambar-500/20 bg-floresta-900/80 px-3.5 py-2 text-xs text-areia-200 backdrop-blur-sm">
                <Scale className="h-3.5 w-3.5 text-ambar-400" />
                <span>Graduações Litúrgicas Calibradas</span>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={600}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a href="#cosmovisao" className="btn-primary">
                <Sparkles className="h-4 w-4" />
                <span>Cosmovisão & Nomes Sagrados</span>
              </a>
              <a href="#alquimia" className="btn-secondary">
                <FlaskConical className="h-4 w-4" />
                <span>A Alquimia do Preparo</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider variant="solar" />

      {/* ═══════════════════════════════════════════
          CAPÍTULO I: A COSMOVISÃO, OS NOMES SAGRADOS & AS ETNIAS
          ═══════════════════════════════════════════ */}
      <section id="cosmovisao" className="py-section-lg lg:py-section-xl bg-floresta-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-16">
          <AnimateOnScroll className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[11px] font-bold text-ambar-400 uppercase tracking-[0.25em] font-mono">
              Capítulo I • Origem Imemorial
            </span>
            <h2 className="font-serif text-display-sm sm:text-display-md font-bold text-areia-100">
              A Cosmovisão Sagrada:
              <br />
              <span className="text-gradient-solar">Povos da Floresta & Nomes do Sacramento</span>
            </h2>
            <p className="text-sm sm:text-base text-areia-300 font-light leading-relaxed">
              Antes de qualquer formulação técnica, a Ayahuasca é um portal cósmico vivenciado há milênios pelos povos originários da bacia amazônica. Conheça as diversas denominações, memórias e linhagens que consagram essa sabedoria botânica viva.
            </p>
          </AnimateOnScroll>

          {/* Grid dos Nomes Sagrados e Etnias */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Huni Kuin - Nixi Pae */}
            <AnimateOnScroll delay={100}>
              <div className="card-liturgico rounded-2xl p-6 sm:p-7 space-y-4 h-full flex flex-col justify-between border-t-2 border-t-amber-500">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-ambar-400 uppercase">Povo Huni Kuin (Kaxinawá)</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-ambar-500/20 text-ambar-300">Acre • Brasil</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-areia-100">
                    Nixi Pae
                  </h3>
                  <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
                    Na cosmologia Huni Kuin, <em>Nixi</em> significa cipó e <em>Pae</em> representa a força, a embriaguez sagrada e a visão de clareza. Conforme a tradição oral, o sacramento foi revelado pelo ancestral Yube, que conheceu os mistérios das águas profundas com a mulher Jiboia e recebeu os cantos sagrados (*Pakariba*) e os padrões geométricos ancestrais (*Kene*) que guiam a miração.
                  </p>
                </div>
                <div className="pt-3 border-t border-ambar-500/15 text-[11px] font-mono text-ambar-400/80">
                  Cantos de Miração • Força das Águas
                </div>
              </div>
            </AnimateOnScroll>

            {/* 2. Yawanawá - Uni */}
            <AnimateOnScroll delay={200}>
              <div className="card-liturgico rounded-2xl p-6 sm:p-7 space-y-4 h-full flex flex-col justify-between border-t-2 border-t-amber-500">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-ambar-400 uppercase">Povo Yawanawá</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-ambar-500/20 text-ambar-300">Rio Gregório • Acre</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-areia-100">
                    Uni
                  </h3>
                  <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
                    Para o Povo da Queixada, o sacramento é denominado <em>Uni</em> — o alimento do espírito e a chave da coragem interior. Sob a tutela espiritual de mestres pajés históricos, o Uni é consumido em dietas de isolamento na mata, unindo a música cerimonial, a força do Pequi Sagrado e as rezas de fortalecimento que protegem o povo da terra.
                  </p>
                </div>
                <div className="pt-3 border-t border-ambar-500/15 text-[11px] font-mono text-ambar-400/80">
                  Coragem Espiritual • Rezos Ancestrais
                </div>
              </div>
            </AnimateOnScroll>

            {/* 3. Ashaninka - Kamarampi */}
            <AnimateOnScroll delay={300}>
              <div className="card-liturgico rounded-2xl p-6 sm:p-7 space-y-4 h-full flex flex-col justify-between border-t-2 border-t-amber-500">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-ambar-400 uppercase">Povo Ashaninka</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-ambar-500/20 text-ambar-300">Rio Amônia • Fronteira Peru/AC</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-areia-100">
                    Kamarampi
                  </h3>
                  <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
                    Da raiz tradicional que expressa a limpeza integral e a clarividência, o <em>Kamarampi</em> é conduzido pelo <em>Sheripiari</em> (líder espiritual Ashaninka). É utilizado para restaurar o equilíbrio psíquico individual, apaziguar tensões comunitárias e receber os direcionamentos dos espíritos guardiões da floresta (*Kamari*).
                  </p>
                </div>
                <div className="pt-3 border-t border-ambar-500/15 text-[11px] font-mono text-ambar-400/80">
                  Purificação & Paz Comunitária
                </div>
              </div>
            </AnimateOnScroll>

            {/* 4. Tradição Quéchua - Ayahuasca */}
            <AnimateOnScroll delay={400}>
              <div className="card-liturgico rounded-2xl p-6 sm:p-7 space-y-4 h-full flex flex-col justify-between border-t-2 border-t-amber-500">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-ambar-400 uppercase">Matriz Andino-Amazônica Quéchua</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-ambar-500/20 text-ambar-300">Peru • Bolívia • Equador</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-areia-100">
                    Ayahuasca (Liana das Almas)
                  </h3>
                  <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
                    A denominação mais difundida globalmente origina-se do idioma Quéchua: <em>Aya</em> (espírito, ancestral, alma que transcende) e <em>Huasca</em> (corda, liana, cipó). Literalmente, <em>&ldquo;O Cipó dos Espíritos&rdquo;</em> ou <em>&ldquo;A Liana das Almas&rdquo;</em> — o elo ontológico que permite à consciência humana transitar entre a realidade terrena (*Kay Pacha*) e o cosmos sutil (*Hanan Pacha*).
                  </p>
                </div>
                <div className="pt-3 border-t border-ambar-500/15 text-[11px] font-mono text-ambar-400/80">
                  Etimologia Quéchua • Ponte Cósmica
                </div>
              </div>
            </AnimateOnScroll>

            {/* 5. Povos da Alta Amazônia - Yagé */}
            <AnimateOnScroll delay={500}>
              <div className="card-liturgico rounded-2xl p-6 sm:p-7 space-y-4 h-full flex flex-col justify-between border-t-2 border-t-amber-500">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-ambar-400 uppercase">Kofán • Siona • Inga</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-ambar-500/20 text-ambar-300">Colômbia • Alto Putumayo</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-areia-100">
                    Yagé (Iajé)
                  </h3>
                  <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
                    Na Amazônia colombiana e no sopé dos Andes, os <em>Taitas</em> consagram o <em>Yagé</em> acompanhados pelo som suave dos ramos de <em>Waira sacha</em> e das gaitas tradicionais. O sacramento é respeitado como o mestre do discernimento, onde a purificação física é a condição indispensável para a harmonização espiritual com a Mãe Terra.
                  </p>
                </div>
                <div className="pt-3 border-t border-ambar-500/15 text-[11px] font-mono text-ambar-400/80">
                  Tradição dos Taitas • Sopé dos Andes
                </div>
              </div>
            </AnimateOnScroll>

            {/* 6. Shuar - Natem & Outras Etnias */}
            <AnimateOnScroll delay={600}>
              <div className="card-liturgico rounded-2xl p-6 sm:p-7 space-y-4 h-full flex flex-col justify-between border-t-2 border-t-amber-500">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-ambar-400 uppercase">Shuar • Noke Koĩ • Shawãdawa</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-ambar-500/20 text-ambar-300">Amazônia Ocidental</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-areia-100">
                    Natem & Rituais de Pajelança
                  </h3>
                  <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
                    Entre os Shuar, o <em>Natem</em> é comungado pelos <em>Wishin</em> nas cascatas sagradas em busca do poder visionário. Paralelamente, nas nações Katukina (Noke Koĩ), Shawãdawa (Arara) e Apurinã do Acre, o cipó sagrado é reverenciado como o grande guardião da floresta, que atua em sinergia com o rapé tradicional e a sabedoria da terra.
                  </p>
                </div>
                <div className="pt-3 border-t border-ambar-500/15 text-[11px] font-mono text-ambar-400/80">
                  Visão dos Wishin • Tradições do Acre
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <SectionDivider variant="floresta" />

      {/* ═══════════════════════════════════════════
          CAPÍTULO II: AS DOUTRINAS BRASILEIRAS (O SINCRETISMO CABOCLO)
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg lg:py-section-xl bg-floresta-900/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-16">
          <AnimateOnScroll className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[11px] font-bold text-ambar-400 uppercase tracking-[0.25em] font-mono">
              Capítulo II • Sincretismo & Fé Brasileira
            </span>
            <h2 className="font-serif text-display-sm sm:text-display-md font-bold text-areia-100">
              As Três Grandes Escolas
              <br />
              <span className="text-gradient-solar">E a Síntese Litúrgica Nativaram</span>
            </h2>
            <p className="text-sm sm:text-base text-areia-300 font-light leading-relaxed">
              No século XX, o encontro entre os povos da floresta, os seringueiros e a mística popular brasileira deu origem a tradições religiosas genuinamente nacionais, reconhecidas por sua disciplina, devoção e nobreza cerimonial.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 1. Santo Daime */}
            <AnimateOnScroll delay={100}>
              <div className="card-elevated rounded-2xl p-7 space-y-4 h-full flex flex-col justify-between border-t-2 border-t-amber-500/60">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-ambar-400 uppercase">
                    <Scroll className="h-4 w-4" />
                    <span>Santo Daime • Década de 1930</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-areia-100">
                    A Doutrina do Mestre Irineu
                  </h3>
                  <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
                    Fundada nos seringais de Rio Branco/AC pelo maranhense <strong className="text-areia-100 font-medium">Raimundo Irineu Serra</strong> após receber visões da Rainha da Floresta. O sacramento recebeu o nome revelado de <strong>Daime</strong> (*&ldquo;Dai-me Força, Dai-me Luz, Dai-me Amor&rdquo;*). A liturgia do feitio daimista é uma das mais consagradas do mundo: os homens batem o Jagube em ritmo ritmado ao som de hinos e marchas, enquanto as mulheres realizam a catação e limpeza foliar em oração contínua.
                  </p>
                </div>
                <div className="pt-3 border-t border-ambar-500/15 text-[11px] font-mono text-areia-400">
                  Nome: <strong>Daime</strong> • Disciplina e Hinários
                </div>
              </div>
            </AnimateOnScroll>

            {/* 2. União do Vegetal */}
            <AnimateOnScroll delay={200}>
              <div className="card-elevated rounded-2xl p-7 space-y-4 h-full flex flex-col justify-between border-t-2 border-t-amber-500/60">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-ambar-400 uppercase">
                    <BookOpen className="h-4 w-4" />
                    <span>União do Vegetal • 1961</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-areia-100">
                    A Ordem de Mestre Gabriel
                  </h3>
                  <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
                    Criada em 22 de julho de 1961 nos seringais da fronteira de Rondônia com a Bolívia por <strong className="text-areia-100 font-medium">José Gabriel da Costa</strong> (Mestre Gabriel). O sacramento é denominado <strong>Vegetal</strong> ou <strong>Hoasca</strong>. A preparação litúrgica — chamada <em>Preparo</em> — é conduzida pelo Mestre do Preparo sob concentração mental profunda, silêncio e transmissão verbal das <em>Chamadas</em>, ensinamentos cantados que revelam a cosmologia de Salomão, de Caiano e o caminho da paz universal.
                  </p>
                </div>
                <div className="pt-3 border-t border-ambar-500/15 text-[11px] font-mono text-areia-400">
                  Nome: <strong>Vegetal / Hoasca</strong> • Chamadas & Luz Mental
                </div>
              </div>
            </AnimateOnScroll>

            {/* 3. A Barquinha */}
            <AnimateOnScroll delay={300}>
              <div className="card-elevated rounded-2xl p-7 space-y-4 h-full flex flex-col justify-between border-t-2 border-t-amber-500/60">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-ambar-400 uppercase">
                    <Compass className="h-4 w-4" />
                    <span>A Barquinha • 1945</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-areia-100">
                    A Linha de Frei Daniel
                  </h3>
                  <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
                    Instituída em 1945 em Rio Branco/AC pelo maranhense <strong className="text-areia-100 font-medium">Daniel Pereira de Mattos</strong> (Frei Daniel). Comungando o sacramento como <strong>Luz Divina</strong> ou Daime, os irmãos vestem fardas azuis de marinheiros celestiais, entoando Salmos e terços. Sua tônica espiritual primordial é a <em>caridade irrestrita</em>, acolhendo os aflitos, necessitados e enfermos do corpo e do espírito, em sincretismo com as falanges do mar e os espíritos da luz.
                  </p>
                </div>
                <div className="pt-3 border-t border-ambar-500/15 text-[11px] font-mono text-areia-400">
                  Nome: <strong>Luz Divina</strong> • Caridade & Salmos
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          {/* O Elo com a Nativaram Brasil */}
          <div className="card-liturgico rounded-3xl p-8 sm:p-10 border border-ambar-500/30 space-y-4">
            <div className="flex items-center gap-3">
              <Sun className="h-6 w-6 text-ambar-400" />
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-areia-100">
                Como Tudo Converge para a Nativaram Brasil
              </h3>
            </div>
            <p className="text-sm sm:text-base text-areia-300 font-light leading-relaxed">
              A Cooperativa Etnobotânica Nativaram Brasil não se coloca como uma nova igreja e não disputa dogmas religiosos com nenhuma escola. Nossa vocação é atuar como uma <strong className="text-areia-100 font-medium">Casa Guardiã de Retaguarda e Apoio Botânico</strong>: servindo templos no geral que necessitam desse apoio logístico e operacional, com sacramentos de pureza absoluta, sem misturas e sem desvios comerciais. Honramos a história de cada pajé e de cada mestre que abriu os caminhos para que essa luz sagrada chegasse até nós.
            </p>
          </div>
        </div>
      </section>

      <SectionDivider variant="solar" />

      {/* ═══════════════════════════════════════════
          CAPÍTULO III: A ALQUIMIA PERFEITA DO PREPARO DA AYAHUASCA
          ═══════════════════════════════════════════ */}
      <section id="alquimia" className="py-section-lg lg:py-section-xl bg-floresta-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-16">
          <AnimateOnScroll className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[11px] font-bold text-ambar-400 uppercase tracking-[0.25em] font-mono">
              Capítulo III • Fitoquímica & Tradição
            </span>
            <h2 className="font-serif text-display-sm sm:text-display-md font-bold text-areia-100">
              A Melhor Alquimia
              <br />
              <span className="text-gradient-solar">Para Preparar a Ayahuasca</span>
            </h2>
            <p className="text-sm sm:text-base text-areia-300 font-light leading-relaxed">
              O preparo da Ayahuasca é a consagração máxima da química sagrada: o encontro harmônico entre a temperatura, o tempo de cozimento, a lixiviação lenta dos alcaloides e a oração contínua.
            </p>
          </AnimateOnScroll>

          {/* Os 6 Passos da Alquimia do Preparo */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Proporção Sagrada */}
            <div className="card-elevated rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2.5 text-ambar-400">
                <Scale className="h-5 w-5" />
                <span className="text-xs font-mono font-bold uppercase">1. Proporção Sagrada de Biomassa</span>
              </div>
              <h4 className="font-serif text-base font-bold text-areia-100">Equilíbrio Cipó / Folha</h4>
              <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
                A alquimia começa na dosagem precisa entre o Jagube (a força que ancora e inibe de forma reversível a enzima MAO-A) e a Chacrona Rainha (a luz que abre a percepção interior). Tradicionalmente calibrada entre 60/40 e 70/30 em biomassa tratada e pesada, garantindo firmeza sem sobrecarga gástrica.
              </p>
            </div>

            {/* 2. Água de Nascente */}
            <div className="card-elevated rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2.5 text-ambar-400">
                <Droplets className="h-5 w-5" />
                <span className="text-xs font-mono font-bold uppercase">2. Pureza Hídrica Amazônica</span>
              </div>
              <h4 className="font-serif text-base font-bold text-areia-100">Água Cristalina de Nascente</h4>
              <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
                Utilizamos exclusivamente água pura de vertentes preservadas da floresta do Acre, com pH neutro natural (~6.2 a 6.8), completamente desprovida de cloração, sulfatos, metais pesados ou agentes químicos industriais que possam oxidar os alcaloides triptamínicos sensíveis.
              </p>
            </div>

            {/* 3. Colheita de Rezo */}
            <div className="card-elevated rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2.5 text-ambar-400">
                <Leaf className="h-5 w-5" />
                <span className="text-xs font-mono font-bold uppercase">3. Colheita no Frescor da Manhã</span>
              </div>
              <h4 className="font-serif text-base font-bold text-areia-100">Chacrona Rainha com Rezo</h4>
              <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
                As folhas de <em>Psychotria viridis</em> são colhidas ao amanhecer sob preces direcionadas à Rainha da Floresta, antes que a incidência solar forte desencadeie a foto-oxidação enzimática dos vacúolos celulares. A seleção manual descarta qualquer folha imperfeita, preservando a pureza máxima do N,N-DMT natural.
              </p>
            </div>

            {/* 4. Maceração em Madeira */}
            <div className="card-elevated rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2.5 text-ambar-400">
                <TreePine className="h-5 w-5" />
                <span className="text-xs font-mono font-bold uppercase">4. Quebração Tradicional com Malhos</span>
              </div>
              <h4 className="font-serif text-base font-bold text-areia-100">Abertura dos Feixes Vasculares</h4>
              <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
                As lianas são desfeitas ritmicamente com malhos pesados de madeira de lei sobre cepos rústicos, sem o emprego de lâminas de ferro que possam alterar os sucos vegetais. Esse impacto mecânico abre as fibras longitudinais do cipó, facilitando a lixiviação completa da Harmina e da THH durante o cozimento.
              </p>
            </div>

            {/* 5. Decocções Sequenciais */}
            <div className="card-elevated rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2.5 text-ambar-400">
                <Flame className="h-5 w-5" />
                <span className="text-xs font-mono font-bold uppercase">5. Fervura Branda & Múltiplos Apuros</span>
              </div>
              <h4 className="font-serif text-base font-bold text-areia-100">Cinética de Cozimento Lento</h4>
              <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
                A cocção é conduzida sob fogo a lenha brando e constante (entre 85°C e 96°C) em tachos de aço inoxidável cirúrgico, ao longo de 10 a 14 horas por tacho. Realizam-se decocções sucessivas para extrair integralmente os princípios ativos sem pirólise térmica nem destruição molecular.
              </p>
            </div>

            {/* 6. Clarificação em Menores Micras */}
            <div className="card-elevated rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2.5 text-ambar-400">
                <Filter className="h-5 w-5" />
                <span className="text-xs font-mono font-bold uppercase">6. Clarificação em Menores Micras</span>
              </div>
              <h4 className="font-serif text-base font-bold text-areia-100">Filtragem Fina & Ponto do Apuro</h4>
              <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
                O líquido extraído é submetido a uma filtragem minuciosa em que usamos panos de menores micras, sem deixar massa vegetal, sedimentos ou qualquer resíduo que não deveria permanecer na bebida. Em seguida, a cocção é concentrada lentamente em tacho de acabamento com agitação contínua por remo de madeira de lei, atingindo o ponto sagrado de densidade cristalina, tom rubi translúcido e estabilidade somática impecável.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="floresta" />

      {/* ═══════════════════════════════════════════
          CAPÍTULO IV: COMPÊNDIO TAXONÔMICO DOS CIPÓS E SEUS PRIMOS
          ═══════════════════════════════════════════ */}
      <section id="cipos" className="py-section-lg lg:py-section-xl bg-floresta-900/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-16">
          <AnimateOnScroll className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[11px] font-bold text-ambar-400 uppercase tracking-[0.25em] font-mono">
              Capítulo IV • Etnobotânica das Lianas
            </span>
            <h2 className="font-serif text-display-sm sm:text-display-md font-bold text-areia-100">
              Espécies de Cipós &
              <br />
              <span className="text-gradient-solar">Seus Primos Botânicos</span>
            </h2>
            <p className="text-sm sm:text-base text-areia-300 font-light leading-relaxed">
              O Cipó Jagube/Mariri pertence à família botânica <strong className="text-areia-100">Malpighiaceae</strong>. Conheça as etnovariedades consagradas de <em>Banisteriopsis caapi</em> na Amazônia ocidental e as espécies aparentadas consagradas pelos povos da floresta.
            </p>
          </AnimateOnScroll>

          {/* Grid de Variedades de Banisteriopsis caapi */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Tucunacá */}
            <div className="card-elevated rounded-2xl p-6 space-y-3 border-t-2 border-t-amber-400">
              <div className="flex items-center justify-between text-xs font-mono text-ambar-400">
                <span>Padrão Ouro Nativaram</span>
                <Award className="h-4 w-4" />
              </div>
              <h4 className="font-serif text-lg font-bold text-areia-100">Cipó Tucunacá</h4>
              <span className="text-xs text-amber-300/80 font-mono italic">Banisteriopsis caapi var. Tucunaca</span>
              <p className="text-xs text-areia-300 font-light leading-relaxed">
                Possui caule liso, cilíndrico e espiralado, sem nós pronunciados. Destaca-se pelo perfil fitoquímico canônico: rica abundância de <strong>Harmina</strong> e <strong>Tetra-hidroharmina (THH)</strong> com teor residual mínimo de Harmalina. Proporciona miração lúcida, ancoramento manso e navegação somática limpa, sem tremores motores.
              </p>
            </div>

            {/* 2. Caupuri */}
            <div className="card-elevated rounded-2xl p-6 space-y-3 border-t-2 border-t-amber-500/60">
              <div className="flex items-center justify-between text-xs font-mono text-ambar-400">
                <span>Força Telúrica</span>
                <TreePine className="h-4 w-4" />
              </div>
              <h4 className="font-serif text-lg font-bold text-areia-100">Cipó Caupuri</h4>
              <span className="text-xs text-amber-300/80 font-mono italic">Banisteriopsis caapi var. Caupuri</span>
              <p className="text-xs text-areia-300 font-light leading-relaxed">
                Reconhecido pelos nódulos esféricos e calosidades bulbosas salientes ao longo de toda a liana (formato de rosário). Carrega uma energia física densa e profunda, associada tradicionalmente a limpezas orgânicas vigorosas e maior intensidade somática inicial.
              </p>
            </div>

            {/* 3. Ourinho */}
            <div className="card-elevated rounded-2xl p-6 space-y-3 border-t-2 border-t-amber-500/60">
              <div className="flex items-center justify-between text-xs font-mono text-ambar-400">
                <span>Suavidade & Clareza</span>
                <Sun className="h-4 w-4" />
              </div>
              <h4 className="font-serif text-lg font-bold text-areia-100">Cipó Ourinho</h4>
              <span className="text-xs text-amber-300/80 font-mono italic">Banisteriopsis caapi var. Ourinho</span>
              <p className="text-xs text-areia-300 font-light leading-relaxed">
                Liana de casca delgada com tonalidades áureas brilhantes ao corte e nós discretos. Reverenciado por comunidades da floresta pela fineza vibratória, leveza gástrica e por proporcionar uma interiorização límpida, de acolhimento e harmonização sutil.
              </p>
            </div>

            {/* 4. Cipó Preto / Yagé Negro */}
            <div className="card-elevated rounded-2xl p-6 space-y-3 border-t-2 border-t-amber-500/60">
              <div className="flex items-center justify-between text-xs font-mono text-ambar-400">
                <span>Ancoramento Profundo</span>
                <Compass className="h-4 w-4" />
              </div>
              <h4 className="font-serif text-lg font-bold text-areia-100">Cipó Preto / Yagé</h4>
              <span className="text-xs text-amber-300/80 font-mono italic">Etnovariedade Florestal</span>
              <p className="text-xs text-areia-300 font-light leading-relaxed">
                Possui córtex escuro, textura rígida e alta concentração de taninos naturais da mata fechada. Tradicionalmente consagrado em ritos noturnos de cura profunda e vigília nas tradições do Noroeste Amazônico, gerando estados de imersão densa e introspecção solene.
              </p>
            </div>
          </div>

          {/* Primos Botânicos da Família Malpighiaceae */}
          <div className="rounded-3xl border border-ambar-500/30 bg-floresta-950 p-8 sm:p-10 space-y-6">
            <div className="flex items-center gap-3">
              <Microscope className="h-6 w-6 text-ambar-400" />
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-areia-100">
                Primos Botânicos da Família Malpighiaceae na Pan-Amazônia
              </h3>
            </div>
            <p className="text-sm text-areia-300 font-light leading-relaxed">
              Além das variedades canônicas de <em>Banisteriopsis caapi</em>, a floresta amazônica abriga parentes botânicos que sintetizam beta-carbolinas e desempenham papéis específicos na etnofarmacologia indígena:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="rounded-xl border border-ambar-500/20 bg-floresta-900/40 p-5 space-y-2">
                <span className="text-xs font-mono text-ambar-400 font-bold uppercase">Cipó-Vermelho</span>
                <h5 className="font-serif text-base font-bold text-areia-100">Banisteriopsis muricata</h5>
                <p className="text-xs text-areia-300 font-light leading-relaxed">
                  Espécie prima que cresce em ecótonos de transição e áreas de cerrado amazônico. Apresenta alcaloides beta-carbolínicos similares, sendo utilizada por certas etnias em regiões onde a <em>caapi</em> não prolifera com abundância.
                </p>
              </div>
              <div className="rounded-xl border border-ambar-500/20 bg-floresta-900/40 p-5 space-y-2">
                <span className="text-xs font-mono text-ambar-400 font-bold uppercase">Alto Rio Negro & Vaupés</span>
                <h5 className="font-serif text-base font-bold text-areia-100">Tetrapterys mucronata</h5>
                <p className="text-xs text-areia-300 font-light leading-relaxed">
                  Liana da mesma família Malpighiaceae consagrada milenarmente por etnias como Tukano, Desana e Barasana. Produz uma decocção de cor acinzentada e sabor muito amargo em cerimônias de iniciação xamânica autóctone.
                </p>
              </div>
              <div className="rounded-xl border border-ambar-500/20 bg-floresta-900/40 p-5 space-y-2">
                <span className="text-xs font-mono text-ambar-400 font-bold uppercase">Amazônia Ocidental</span>
                <h5 className="font-serif text-base font-bold text-areia-100">Alicia anisopetala</h5>
                <p className="text-xs text-areia-300 font-light leading-relaxed">
                  Historicamente classificada no gênero <em>Mascagnia</em>, é uma liana de morfologia semelhante encontrada na bacia ocidental amazônica, estudada pela etnobotânica como componente de preparações xamânicas tradicionais.
                </p>
              </div>
            </div>
          </div>

          {/* Nota de Manejo Florestal e Transparência da Safra */}
          <div className="rounded-3xl border-2 border-ambar-500/40 bg-floresta-950 p-8 sm:p-12 space-y-6 shadow-elevated-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-ambar-500/[0.08] rounded-full blur-[90px] pointer-events-none" />

            <div className="flex items-center gap-3 border-b border-ambar-500/20 pb-4">
              <Info className="h-6 w-6 text-ambar-400 shrink-0" />
              <h3 className="font-serif text-lg sm:text-xl font-bold text-areia-100">
                Nota Oficial de Manejo Florestal & Transparência da Safra no Acre
              </h3>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-areia-200 leading-relaxed font-light">
              <p>
                A <strong className="text-areia-100 font-semibold">Cooperativa Etnobotânica Nativaram Brasil</strong> pauta todas as suas relações na mais alta transparência, verdade e respeito litúrgico perante seus associados, dirigentes e templos credenciados.
              </p>
              <p>
                Embora a variedade <strong className="text-ambar-300 font-semibold">Cipó Tucunacá</strong> (<em>Banisteriopsis caapi var. Tucunaca</em>) seja o nosso padrão áureo de feitio — em razão do seu perfil cromatográfico nobre, abundante em THH e com residual mínimo de harmalina —, é imperativo esclarecer que as dinâmicas naturais da floresta amazônica, os ciclos de chuvas nas cheias dos igarapés e a alta demanda litúrgica no Acre <strong className="text-areia-100 font-medium">nem sempre permitem a colheita exclusiva e ininterrupta desta única variedade botânica</strong>.
              </p>
              <p>
                Nesses períodos sazonais de manejo, operamos o feitio com <strong className="text-areia-100 font-medium">etnotáxons e cipós estreitamente aparentados à espécie</strong> (como variedades selecionadas de Caupuri suave e Ourinho silvestre), colhidos de forma 100% ética, manual e sustentável por extrativistas tradicionais cadastrados.
              </p>
              <p>
                Cada lote é minuciosamente acompanhado e validado pela sabedoria do nosso experiente <strong className="text-areia-100 font-medium">mestre feitor caboclo</strong> e pela nossa rede de <strong className="text-areia-100 font-medium">centros de feitio credenciados no Acre</strong>. Calibramos cada cocção na proporção ideal de Jagube e folhas de Chacrona Rainha, assegurando uma experiência sacramental de altíssima pureza, firmeza e estabilidade aos templos associados.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-ambar-400/90">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Manejo Sustentável Certificado
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Calibração Lote a Lote
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Ausência Total de Adulterantes
              </span>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="solar" />

      {/* ═══════════════════════════════════════════
          CAPÍTULO V: A CHACRONA RAINHA & SUAS PRIMAS BOTÂNICAS
          ═══════════════════════════════════════════ */}
      <section id="chacrona" className="py-section-lg lg:py-section-xl bg-floresta-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-16">
          <AnimateOnScroll className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[11px] font-bold text-ambar-400 uppercase tracking-[0.25em] font-mono">
              Capítulo V • Etnociência da Folha Sagrada
            </span>
            <h2 className="font-serif text-display-sm sm:text-display-md font-bold text-areia-100">
              A Chacrona Rainha &
              <br />
              <span className="text-gradient-solar">Suas Primas Botânicas</span>
            </h2>
            <p className="text-sm sm:text-base text-areia-300 font-light leading-relaxed">
              Enquanto o cipó ancora a força espiritual e inibe a enzima MAO-A, as folhas fornecem a luz que ilumina a miração. Conheça as espécies do gênero <em>Psychotria</em> e os contrastes com outras fontes foliares da pan-amazônia.
            </p>
          </AnimateOnScroll>

          {/* Grid Comparativo da Chacrona e Primas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Psychotria viridis */}
            <div className="card-elevated rounded-2xl p-7 space-y-4 border-t-2 border-t-amber-400 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-ambar-400">
                  <span>A Folha Sagrada</span>
                  <Leaf className="h-4 w-4" />
                </div>
                <h4 className="font-serif text-lg font-bold text-areia-100">Chacrona Rainha</h4>
                <span className="text-xs text-amber-300/80 font-mono italic">Psychotria viridis (Rubiaceae)</span>
                <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
                  O arbusto canônico de sub-bosque sombreado da floresta amazônica. Suas folhas tenras armazenam <strong>N,N-DMT natural</strong> puro nos vacúolos celulares. Possui baixíssimo teor de taninos adstringentes e compostos agressivos, permitindo uma decocção límpida, suave ao trato gastrointestinal e de elevação contemplativa pura.
                </p>
              </div>
              <div className="pt-3 border-t border-ambar-500/15 text-[11px] font-mono text-emerald-400">
                ✓ Padrão exclusivo do feitio Nativaram
              </div>
            </div>

            {/* 2. Psychotria carthagenensis */}
            <div className="card-elevated rounded-2xl p-7 space-y-4 border-t-2 border-t-amber-500/60 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-ambar-400">
                  <span>Prima Direta de Várzea</span>
                  <Compass className="h-4 w-4" />
                </div>
                <h4 className="font-serif text-lg font-bold text-areia-100">Samiruka / Amiruca</h4>
                <span className="text-xs text-amber-300/80 font-mono italic">Psychotria carthagenensis (Rubiaceae)</span>
                <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
                  Prima botânica no mesmo gênero, muito frequente em matas de várzea e margens úmidas de rios. Possui morfologia foliar bastante parecida com a <em>P. viridis</em>, porém exibe teores significativamente menores e altamente oscilantes de triptaminas. Em algumas linhagens tradicionais ribeirinhas, é consagrada como planta de acalento sutil e orações de harmonização.
                </p>
              </div>
              <div className="pt-3 border-t border-ambar-500/15 text-[11px] font-mono text-areia-400">
                • Etnofarmacologia tradicional de acalento
              </div>
            </div>

            {/* 3. Diplopterys cabrerana (Chaliponga) */}
            <div className="card-elevated rounded-2xl p-7 space-y-4 border-t-2 border-t-rose-500/60 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-rose-400">
                  <span>Prima Trepadeira Exógena</span>
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <h4 className="font-serif text-lg font-bold text-areia-100">Chaliponga / Oco-Yagé</h4>
                <span className="text-xs text-rose-300/80 font-mono italic">Diplopterys cabrerana (Malpighiaceae)</span>
                <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
                  Curiosamente, não é da família do café (Rubiaceae), mas uma liana trepadeira da família do cipó (Malpighiaceae) cujas folhas acumulam triptaminas. Utilizada por etnias da Colômbia e Equador. <strong>Vetada no padrão Nativaram:</strong> seu perfil metabólico diverge da tradição canônica brasileira do binômio Tucunacá + Chacrona, gerando oscilações fisiológicas imprevisíveis.
                </p>
              </div>
              <div className="pt-3 border-t border-rose-500/20 text-[11px] font-mono text-rose-400">
                ✕ Vetada no padrão purista Nativaram
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="floresta" />

      {/* ═══════════════════════════════════════════
          CAPÍTULO VI: AYAHUASCA TRADICIONAL VS. ANAYAHUASCAS
          ═══════════════════════════════════════════ */}
      <section id="anayahuascas" className="py-section-lg lg:py-section-xl bg-floresta-900/70">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-16">
          <AnimateOnScroll className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-[0.25em] font-mono">
              Capítulo VI • Rigor & Diferenciação Científica
            </span>
            <h2 className="font-serif text-display-sm sm:text-display-md font-bold text-areia-100">
              Ayahuasca Tradicional Amazônica
              <br />
              <span className="text-gradient-solar">vs. "Anayahuascas" e Análogos</span>
            </h2>
            <p className="text-sm sm:text-base text-areia-300 font-light leading-relaxed">
              O termo <strong className="text-areia-100 font-medium">"Anahuasca"</strong> (popularizado pelo etnobotânico Jonathan Ott na década de 1990) designa formulações artificiais ou misturas de plantas não amazônicas que buscam mimetizar quimicamente a fórmula [IMAO + DMT]. Entenda os motivos técnicos, biológicos e legais que tornam a Ayahuasca tradicional insubstituível.
            </p>
          </AnimateOnScroll>

          {/* Dossiê Comparativo de 4 Eixos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Eixo 1: Perfil Harmala */}
            <div className="card-elevated rounded-2xl p-7 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-ambar-500/10 text-ambar-400">
                  <Scale className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold text-ambar-400 uppercase">Eixo Farmacológico 1</span>
                  <h4 className="font-serif text-base font-bold text-areia-100">Tríade Harmala vs. Neurotoxicidade da Harmalina</h4>
                </div>
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
                <div className="rounded-xl border border-emerald-500/30 bg-floresta-950/70 p-4 space-y-1.5">
                  <strong className="text-emerald-400 font-mono text-xs flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5" /> Ayahuasca Tradicional (Banisteriopsis caapi)
                  </strong>
                  <p>
                    Rica em <strong>Harmina (9,21 mg/g)</strong> e <strong>Tetra-hidroharmina / THH (4,20 mg/g)</strong>. O THH atua como modulador suave da recaptação de serotonina, promovendo estabilidade emocional, recolhimento pacífico e clareza contemplativa, enquanto a Harmalina permanece em teores residuais seguros (~0,65 mg/g).
                  </p>
                </div>
                <div className="rounded-xl border border-rose-500/30 bg-floresta-950/70 p-4 space-y-1.5">
                  <strong className="text-rose-400 font-mono text-xs flex items-center gap-1.5">
                    <X className="h-3.5 w-3.5" /> Anahuasca com Arruda Síria (Peganum harmala)
                  </strong>
                  <p>
                    Quase desprovida de THH e saturada de <strong>Harmalina</strong> (&gt;50% a 65% dos alcaloides totais). A harmalina pura age como potente tremorígeno periférico sobre os canais iônicos, desencadeando tremores violentos incontroláveis, ataxia motora, sudorese fria, náuseas espásticas e quedas abruptas de pressão arterial.
                  </p>
                </div>
              </div>
            </div>

            {/* Eixo 2: Agressão da Mucosa & Taninos */}
            <div className="card-elevated rounded-2xl p-7 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-ambar-500/10 text-ambar-400">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold text-ambar-400 uppercase">Eixo Fisiológico 2</span>
                  <h4 className="font-serif text-base font-bold text-areia-100">Digestibilidade Folhear vs. Agressão por Taninos</h4>
                </div>
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
                <div className="rounded-xl border border-emerald-500/30 bg-floresta-950/70 p-4 space-y-1.5">
                  <strong className="text-emerald-400 font-mono text-xs flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5" /> Folhas de Chacrona (Psychotria viridis)
                  </strong>
                  <p>
                    A extração é feita exclusivamente a partir de folhas tenras da floresta, que liberam os alcaloides em solução aquosa limpa, sem compostos cáusticos, preservando as vilosidades estomacais e intestinais do participante com excelente tolerância orgânica.
                  </p>
                </div>
                <div className="rounded-xl border border-rose-500/30 bg-floresta-950/70 p-4 space-y-1.5">
                  <strong className="text-rose-400 font-mono text-xs flex items-center gap-1.5">
                    <X className="h-3.5 w-3.5" /> Jurema Preta Oral (Mimosa hostilis / tenuiflora)
                  </strong>
                  <p>
                    A casca da raiz da Jurema contém concentrações massivas de <strong>taninos condensados pirogálicos</strong> e saponinas adstringentes. Quando ingerida em misturas orais associada a IMAO, provoca inflamação aguda da mucosa gástrica, vômitos refratários e sobrecarga nos glomérulos renais.
                  </p>
                </div>
              </div>
            </div>

            {/* Eixo 3: Farmacocinética Hepática */}
            <div className="card-elevated rounded-2xl p-7 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-ambar-500/10 text-ambar-400">
                  <FlaskConical className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold text-ambar-400 uppercase">Eixo Bioquímico 3</span>
                  <h4 className="font-serif text-base font-bold text-areia-100">Cinética Enzimática & Risco Serotoninérgico</h4>
                </div>
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
                <div className="rounded-xl border border-emerald-500/30 bg-floresta-950/70 p-4 space-y-1.5">
                  <strong className="text-emerald-400 font-mono text-xs flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5" /> Inibição Reversível Canônica (RIMA)
                  </strong>
                  <p>
                    O binômio amazônico atua como RIMA (Inibidor Reversível e Seletivo da MAO-A). A ligação é passageira e respeita a metabolização hepática pelas vias do citocromo P450, desvanecendo de forma suave e fisiologicamente segura em poucas horas.
                  </p>
                </div>
                <div className="rounded-xl border border-rose-500/30 bg-floresta-950/70 p-4 space-y-1.5">
                  <strong className="text-rose-400 font-mono text-xs flex items-center gap-1.5">
                    <X className="h-3.5 w-3.5" /> Competição Caótica no Citocromo P450
                  </strong>
                  <p>
                    Anahuascas e formulações de Pharmahuasca competem desordenadamente pelas isoenzimas <code>CYP2D6</code> e <code>CYP1A2</code>, elevando de maneira crítica o risco de crises hipertensivas por acúmulo de tiramina e Síndrome Serotoninérgica grave.
                  </p>
                </div>
              </div>
            </div>

            {/* Eixo 4: Legalidade e CONAD */}
            <div className="card-elevated rounded-2xl p-7 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-ambar-500/10 text-ambar-400">
                  <Scroll className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold text-ambar-400 uppercase">Eixo Jurídico 4</span>
                  <h4 className="font-serif text-base font-bold text-areia-100">Amparo Litúrgico CONAD vs. Zoneamento Ilícito</h4>
                </div>
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
                <div className="rounded-xl border border-emerald-500/30 bg-floresta-950/70 p-4 space-y-1.5">
                  <strong className="text-emerald-400 font-mono text-xs flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5" /> Resolução CONAD nº 01/2010 & IPHAN
                  </strong>
                  <p>
                    A salvaguarda legal e constitucional para uso religioso no Brasil ampara estritamente a bebida tradicional amazônica (<em>Banisteriopsis caapi</em> + <em>Psychotria viridis</em>), reconhecida como Patrimônio Cultural Imaterial pelo IPHAN com proteção jurídica às entidades religiosas.
                  </p>
                </div>
                <div className="rounded-xl border border-rose-500/30 bg-floresta-950/70 p-4 space-y-1.5">
                  <strong className="text-rose-400 font-mono text-xs flex items-center gap-1.5">
                    <X className="h-3.5 w-3.5" /> Ausência de Salvaguarda Legal para Análogos
                  </strong>
                  <p>
                    Análogos botânicos sintéticos ou exóticos (Arruda Síria, casca de Jurema oral em misturas com IMAO e Pharmahuascas) não possuem histórico ritual nem reconhecimento pelo CONAD, enquadrando-se em manipulação perigosa fora do amparo litúrgico brasileiro.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="solar" />

      {/* ═══════════════════════════════════════════
          CAPÍTULO VII: COMPARAÇÃO FITOQUÍMICA DETALHADA DOS ALCALOIDES
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg lg:py-section-xl bg-floresta-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
          <AnimateOnScroll className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[11px] font-bold text-ambar-400 uppercase tracking-[0.25em] font-mono">
              Capítulo VII • Rigor Farmacobotânico
            </span>
            <h2 className="font-serif text-display-sm sm:text-display-md font-bold text-areia-100">
              Perfil Fitoquímico & Alcaloides Harmala
            </h2>
            <p className="text-sm text-areia-300 font-light">
              A quantificação laboratorial que diferencia o Tucunacá selecionado e garante a estabilidade somática do sacramento.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll delay={150}>
            <div className="card-elevated rounded-2xl p-6 sm:p-10 space-y-8">
              {/* Tabela Cromatográfica */}
              <div className="overflow-x-auto rounded-xl border border-ambar-500/30 shadow-inner">
                <table className="w-full text-left text-xs">
                  <thead className="bg-floresta-900 text-ambar-400 border-b border-ambar-500/30">
                    <tr>
                      <th className="p-4 font-serif text-sm">Alcaloide Harmala</th>
                      <th className="p-4 font-serif text-sm">Concentração (HPLC)</th>
                      <th className="p-4 font-serif text-sm">Ação Farmacológica Principal</th>
                      <th className="p-4 font-serif text-sm">Efeito na Condução Ritual</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ambar-500/10 text-areia-300">
                    <tr className="bg-floresta-950/70 hover:bg-floresta-900/40 transition-colors">
                      <td className="p-4 font-semibold text-areia-100 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-ambar-400" />
                        Harmina
                      </td>
                      <td className="p-4 font-mono text-amber-300 font-bold">9,21 mg/g</td>
                      <td className="p-4">Inibição reversível e seletiva da enzima MAO-A periférica (RIMA).</td>
                      <td className="p-4">Garante que o DMT atravesse a barreira gástrica sem degradação.</td>
                    </tr>
                    <tr className="bg-floresta-900/40 hover:bg-floresta-900/60 transition-colors">
                      <td className="p-4 font-semibold text-areia-100 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-ambar-400" />
                        Tetra-hidroharmina (THH)
                      </td>
                      <td className="p-4 font-mono text-amber-300 font-bold">4,20 mg/g</td>
                      <td className="p-4">Inibidor fraco da recaptação de serotonina (SERT) e modulador 5-HT2A.</td>
                      <td className="p-4">Sustenta o estado meditativo lúcido, prolongado e sem oscilações abruptas.</td>
                    </tr>
                    <tr className="bg-floresta-950/70 hover:bg-floresta-900/40 transition-colors">
                      <td className="p-4 font-semibold text-areia-100 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        Harmalina
                      </td>
                      <td className="p-4 font-mono text-emerald-400 font-bold">0,65 mg/g (Traço)</td>
                      <td className="p-4">Teor residual. Altas concentrações causam toxicidade motora periférica.</td>
                      <td className="p-4">A baixa taxa elimina tremores violentos e quedas severas de pressão.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Destaque Diferencial Somático */}
              <div className="rounded-xl border border-ambar-500/25 bg-floresta-950 p-5 text-xs sm:text-sm text-areia-300 leading-relaxed flex items-start gap-3.5">
                <ShieldCheck className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-areia-100">Por que o Tucunacá e os cipós próximos são insubstituíveis?</strong> Diferente de clones selvagens que acumulam harmalina instável — geradora de sudorese fria, taquicardias desordenadas e tremores musculares que desgastam o participante —, o padrão Nativaram proporciona um recolhimento suave, profunda clareza mental e uma navegação interior límpida.
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider variant="floresta" />

      {/* ═══════════════════════════════════════════
          CAPÍTULO VI: GALERIA DOCUMENTAL (FOTOS E VÍDEO REAL)
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg lg:py-section-xl bg-floresta-900/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
          <AnimateOnScroll className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[11px] font-bold text-ambar-400 uppercase tracking-[0.25em] font-mono">
              Capítulo VIII • Registro de Campo
            </span>
            <h2 className="font-serif text-display-sm sm:text-display-md font-bold text-areia-100">
              Galeria Documental do Feitio
            </h2>
            <p className="text-sm text-areia-400 font-light">
              Testemunho fotográfico e videográfico da rotina de cozimento e oração na floresta de Cruzeiro do Sul/AC.
            </p>
          </AnimateOnScroll>

          {/* Grid de Fotos Expandida com as Novas Imagens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Foto 1: Consagração da Chacrona no Caldeirão */}
            <AnimateOnScroll delay={100}>
              <div className="card-elevated rounded-2xl overflow-hidden group h-full flex flex-col justify-between">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src="/assets/feitio/curadas/feitio-chacrona-fresca-caldeirao.jpg"
                    alt="Folhas frescas e reluzentes de Chacrona (Psychotria viridis) repousando sobre as fibras de cipó no caldeirão"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-floresta-950 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 rounded-full bg-floresta-900/90 border border-ambar-500/30 px-3 py-1 text-[10px] font-mono uppercase text-ambar-400">
                    Amanhecer no Acre
                  </span>
                </div>
                <div className="p-5 space-y-1.5">
                  <h4 className="font-serif text-base font-bold text-areia-100">Folhas Frescas da Rainha</h4>
                  <p className="text-xs text-areia-400 font-light leading-relaxed">
                    Folhas selecionadas de <em>Psychotria viridis</em> acomodadas com oração e reverência sobre o leito de cipó macerado.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Foto 2: Lianas de Cipó no Barracão Tradicional */}
            <AnimateOnScroll delay={200}>
              <div className="card-elevated rounded-2xl overflow-hidden group h-full flex flex-col justify-between">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src="/assets/feitio/curadas/feitio-lianas-tucunaca-barracao.jpg"
                    alt="Pilhas tradicionais de cipó Banisteriopsis caapi colhidas na floresta sob o barracão do feitio em Cruzeiro do Sul"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-floresta-950 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 rounded-full bg-floresta-900/90 border border-ambar-500/30 px-3 py-1 text-[10px] font-mono uppercase text-ambar-400">
                    Barracão Tradicional
                  </span>
                </div>
                <div className="p-5 space-y-1.5">
                  <h4 className="font-serif text-base font-bold text-areia-100">Lianas Sagradas no Barracão</h4>
                  <p className="text-xs text-areia-400 font-light leading-relaxed">
                    Armazenamento e trituração do cipó com malhos de madeira de lei, preservando a pureza sem contato ferroso oxidativo.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Foto 3: Caldeirões Fumegantes sob a Floresta */}
            <AnimateOnScroll delay={300}>
              <div className="card-elevated rounded-2xl overflow-hidden group h-full flex flex-col justify-between">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src="/assets/feitio/curadas/feitio-caldeirao-fumegante-floresta.jpg"
                    alt="Caldeirão fumegante com vapor sagrado sob a chuva e vegetação tropical no Acre"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-floresta-950 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 rounded-full bg-floresta-900/90 border border-ambar-500/30 px-3 py-1 text-[10px] font-mono uppercase text-ambar-400">
                    Vapor da Floresta
                  </span>
                </div>
                <div className="p-5 space-y-1.5">
                  <h4 className="font-serif text-base font-bold text-areia-100">Cozimento Vivo na Mata</h4>
                  <p className="text-xs text-areia-400 font-light leading-relaxed">
                    Extração lenta por fervura sob a cobertura da floresta amazônica, apurando a alquimia viva do sacramento.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Foto 4: Camadas de Folha e Cipó */}
            <AnimateOnScroll delay={400}>
              <div className="card-elevated rounded-2xl overflow-hidden group h-full flex flex-col justify-between">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src="/assets/feitio/curadas/feitio-panelas-chacrona-cipo.jpg"
                    alt="Camadas precisas de cipó macerado cobertas com folhas verdes frescas de Chacrona Rainha"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-floresta-950 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 rounded-full bg-floresta-900/90 border border-ambar-500/30 px-3 py-1 text-[10px] font-mono uppercase text-ambar-400">
                    Armação dos Tachos
                  </span>
                </div>
                <div className="p-5 space-y-1.5">
                  <h4 className="font-serif text-base font-bold text-areia-100">Armação em Camadas</h4>
                  <p className="text-xs text-areia-400 font-light leading-relaxed">
                    Acomodação intercalada de cipó e folha nos tachos de aço inox para circulação térmica ideal.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Foto 5: Fervura e Redução */}
            <AnimateOnScroll delay={500}>
              <div className="card-elevated rounded-2xl overflow-hidden group h-full flex flex-col justify-between">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src="/assets/feitio/curadas/feitio-fervura-chacrona.jpg"
                    alt="O sacramento borbulhando em tom avermelhado no tacho de cozimento contínuo"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-floresta-950 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 rounded-full bg-floresta-900/90 border border-ambar-500/30 px-3 py-1 text-[10px] font-mono uppercase text-ambar-400">
                    O Ponto do Apuro
                  </span>
                </div>
                <div className="p-5 space-y-1.5">
                  <h4 className="font-serif text-base font-bold text-areia-100">Redução e Agitação Manual</h4>
                  <p className="text-xs text-areia-400 font-light leading-relaxed">
                    Agitação lenta com remo de madeira para evaporação homogênea e concentração nobre dos princípios ativos.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Foto 6: O Sacramento Envasado */}
            <AnimateOnScroll delay={600}>
              <div className="card-elevated rounded-2xl overflow-hidden group h-full flex flex-col justify-between">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src="/assets/feitio/curadas/feitio-garrafa-tronco.jpg"
                    alt="Frasco de Ayahuasca pura recém-feita erguido contra tronco de árvore na floresta do Acre"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-floresta-950 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 rounded-full bg-floresta-900/90 border border-ambar-500/30 px-3 py-1 text-[10px] font-mono uppercase text-ambar-400">
                    Padrão de Pureza
                  </span>
                </div>
                <div className="p-5 space-y-1.5">
                  <h4 className="font-serif text-base font-bold text-areia-100">O Sacramento Envasado</h4>
                  <p className="text-xs text-areia-400 font-light leading-relaxed">
                    Pureza inalterada, consistência densa e envasamento sob estrito controle sanitário e de temperatura.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Vídeo do Feitio */}
          {(() => {
            const feitioVideos = {
              caldeirao: {
                id: "caldeirao" as const,
                title: "O Borbulhar do Sacramento no Caldeirão",
                tabLabel: "Fervura no Caldeirão",
                badge: "Registro em Vídeo • Casa de Feitio no Acre",
                desc: "Fervura tradicional em caldeirão de aço inox sob a noite da floresta amazônica: o feitor colhe e examina o borbulhar, a consistência translúcida avermelhada e o ponto exato da redução com o rezo da mata.",
                src: "/assets/feitio/curadas/feitio-video-caldeirao-borbulhando.mp4",
                poster: "/assets/feitio/curadas/feitio-poster-caldeirao-borbulhando.jpg",
              },
              bateria: {
                id: "bateria" as const,
                title: "Fileira de Caldeirões em Fervura Contínua",
                tabLabel: "Caldeirões em Fila",
                badge: "Estrutura Tradicional • Cruzeiro do Sul/AC",
                desc: "Visão panorâmica da bateria de caldeirões de aço inox em cozimento simultâneo, com colunas de vapor subindo sob a estrutura rústica de madeira na floresta do Acre.",
                src: "/assets/feitio/curadas/feitio-video-caldeiroes-inox.mp4",
                poster: "/assets/feitio/curadas/feitio-poster-caldeiroes-inox.jpg",
              },
              garrafa: {
                id: "garrafa" as const,
                title: "Inspeção e Padrão Visual do Sacramento Envasado",
                tabLabel: "Inspeção do Sacramento",
                badge: "Inspeção Visual • Pureza & Resfriamento",
                desc: "Inspeção de cor rubi-âmbar, fluidez e densidade do sacramento recém-envasado, comprovando a eficácia da filtragem em menores micras sem depósito de borras ou sedimentos espessos.",
                src: "/assets/feitio/curadas/feitio-video-garrafa-sacramento.mp4",
                poster: "/assets/feitio/curadas/feitio-poster-garrafa-sacramento.jpg",
              },
            };
            const currentVideo = feitioVideos[activeFeitioVideo];

            return (
              <div className="rounded-3xl border border-ambar-500/30 bg-floresta-950 p-6 sm:p-10 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-ambar-500/20 pb-4">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-ambar-400 uppercase">
                      <Flame className="h-4 w-4" />
                      <span>{currentVideo.badge}</span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-areia-100">
                      {currentVideo.title}
                    </h3>
                  </div>

                  {/* Tabs de Seleção de Registro */}
                  <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-floresta-900/80 border border-ambar-500/20">
                    {Object.values(feitioVideos).map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveFeitioVideo(item.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          activeFeitioVideo === item.id
                            ? "bg-ambar-500 text-floresta-950 font-bold shadow-md"
                            : "text-areia-300 hover:text-ambar-300 hover:bg-floresta-800/50"
                        }`}
                      >
                        {item.tabLabel}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-2xl overflow-hidden border border-ambar-500/30 bg-black shadow-inner">
                  <video
                    key={currentVideo.src}
                    ref={(el) => {
                      if (el) {
                        el.muted = true;
                        el.defaultMuted = true;
                      }
                    }}
                    controls
                    muted
                    autoPlay
                    loop
                    playsInline
                    preload="metadata"
                    poster={currentVideo.poster}
                    className="w-full h-full object-cover"
                  >
                    <source src={currentVideo.src} type="video/mp4" />
                    Seu navegador não suporta a reprodução deste vídeo.
                  </video>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-areia-400 max-w-4xl mx-auto font-light border-t border-ambar-500/10 pt-3">
                  <p className="flex-1 text-center sm:text-left">
                    {currentVideo.desc}
                  </p>
                  <span className="text-[11px] font-mono text-ambar-400/80 bg-floresta-900 px-2.5 py-1 rounded-full border border-ambar-500/15 whitespace-nowrap">
                    Vídeo Silencioso • Sem Áudio
                  </span>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      <SectionDivider variant="solar" />

      {/* ═══════════════════════════════════════════
          CAPÍTULO IX: SISTEMA DE GRADUAÇÕES & COOPERATIVISMO
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg lg:py-section-xl bg-floresta-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
          <AnimateOnScroll className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[11px] font-bold text-ambar-400 uppercase tracking-[0.25em] font-mono">
              Capítulo IX • Padronização Tradicional
            </span>
            <h2 className="font-serif text-display-sm sm:text-display-md font-bold text-areia-100">
              Sistema de Graduações & Forças Sagradas
            </h2>
            <p className="text-sm text-areia-300 font-light">
              Classificação fundamentada na quantidade de biomassa vegetal concentrada por litro e tempo ritualístico de condução.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll delay={150}>
            <div className="card-elevated rounded-2xl p-6 sm:p-10 space-y-8">
              <div className="overflow-x-auto rounded-xl border border-ambar-500/30 shadow-inner">
                <table className="w-full text-left text-xs">
                  <thead className="bg-floresta-900 text-ambar-400 border-b border-ambar-500/30">
                    <tr>
                      <th className="p-4 font-serif text-sm">Graduação Sagrada</th>
                      <th className="p-4 font-serif text-sm">Porção Sugerida</th>
                      <th className="p-4 font-serif text-sm">Duração Rito</th>
                      <th className="p-4 font-serif text-sm">Propósito Litúrgico & Miração</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ambar-500/10 text-areia-300">
                    <tr className="bg-floresta-950/70 hover:bg-floresta-900/40 transition-colors">
                      <td className="p-4 font-semibold text-areia-100">
                        <div>3.1 Mainumbi <span className="text-areia-400 font-normal italic">(Beija-flor)</span></div>
                        <span className="text-[10px] text-ambar-400/80 font-normal">Voo leve, acolhedor e sutil</span>
                      </td>
                      <td className="p-4 font-mono text-areia-200">90 a 120 ml</td>
                      <td className="p-4">2 a 3 horas</td>
                      <td className="p-4">Ideal para orações mansas, acolhimento de novos buscadores e harmonização sensorial suave.</td>
                    </tr>
                    <tr className="bg-floresta-900/40 hover:bg-floresta-900/60 transition-colors">
                      <td className="p-4 font-semibold text-areia-100">
                        <div>5.1 Pituã <span className="text-areia-400 font-normal italic">(Bem-te-vi)</span></div>
                        <span className="text-[10px] text-ambar-400/80 font-normal">Equilíbrio estável e firmeza</span>
                      </td>
                      <td className="p-4 font-mono text-areia-200">70 a 100 ml</td>
                      <td className="p-4">3 horas</td>
                      <td className="p-4">Clareza mental, centramento e alinhamento do campo comunitário em trabalhos regulares.</td>
                    </tr>
                    <tr className="bg-floresta-950/70 hover:bg-floresta-900/40 transition-colors">
                      <td className="p-4 font-semibold text-areia-100">
                        <div>7.1 Anhangatã <span className="text-areia-400 font-normal italic">(Rouxinol)</span></div>
                        <span className="text-[10px] text-ambar-400/80 font-normal">Canto profundo e imersão</span>
                      </td>
                      <td className="p-4 font-mono text-areia-200">50 a 90 ml</td>
                      <td className="p-4">3 a 4 horas</td>
                      <td className="p-4">Indicado para ritos de autocuidado íntimo, firmeza de canto, ressignificação de histórias e meditação profunda.</td>
                    </tr>
                    <tr className="bg-floresta-900/40 hover:bg-floresta-900/60 transition-colors">
                      <td className="p-4 font-semibold text-areia-100">
                        <div>10.1 Wirapuru <span className="text-areia-400 font-normal italic">(Semi-Mel)</span></div>
                        <span className="text-[10px] text-amber-400 font-normal">Força vibrante de alta egrégora</span>
                      </td>
                      <td className="p-4 font-mono text-amber-300 font-bold">30 a 50 ml</td>
                      <td className="p-4 font-medium text-amber-300">4 a 5 horas</td>
                      <td className="p-4">Concentração densa com consistência untuosa; miração de longo alcance para dirigentes e alta egrégora espiritual.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Princípio de Economia Solidária e Rateio de Custos */}
              <div className="card-editorial bg-floresta-950 p-6 rounded-xl border border-ambar-500/20 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-ambar-400 uppercase">
                  <Scale className="h-4 w-4" />
                  <span>Vedação Mercantil & Rateio Cooperativo</span>
                </div>
                <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
                  A Cooperativa Nativaram opera estritamente sem fins lucrativos. As contribuições solidárias para ressarcimento de despesas são exclusivas a templos previamente homologados e cobrem o sustento dos extrativistas locais, a manutenção dos tachos de feitio e o frete logístico especializado de Cruzeiro do Sul/AC até o centro de partilha. Não existe precificação por dose ou comércio aberto ao público.
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider variant="floresta" />

      {/* ═══════════════════════════════════════════
          CAPÍTULO X: PERGUNTAS FREQUENTES SOBRE O FEITIO
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg lg:py-section-xl bg-floresta-900/40">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
          <AnimateOnScroll className="text-center space-y-3">
            <span className="text-[11px] font-bold text-ambar-400 uppercase tracking-[0.25em] font-mono">
              Capítulo X • Dúvidas Técnicas & Litúrgicas
            </span>
            <h2 className="font-serif text-display-sm sm:text-display-md font-bold text-areia-100">
              Perguntas Frequentes
              <br />
              <span className="text-gradient-solar">Sobre o Feitio da Ayahuasca</span>
            </h2>
            <p className="text-sm text-areia-400 font-light">
              Respostas completas para dirigentes de templos e sacerdotes credenciados.
            </p>
          </AnimateOnScroll>

          <div className="space-y-4">
            {faqsFeitio.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-ambar-500/20 bg-floresta-950 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-serif font-bold text-areia-100 hover:text-ambar-400 transition-colors"
                  >
                    <span>{faq.pergunta}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-ambar-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-areia-300 font-light leading-relaxed border-t border-ambar-500/10">
                      {faq.resposta}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <SectionDivider variant="solar" />

      {/* ═══════════════════════════════════════════
          CAPÍTULO IX: CTA FINAL & CREDENCIAMENTO DO TEMPLO
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg lg:py-section-xl bg-floresta-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-ambar-500/[0.08] rounded-full blur-[130px] pointer-events-none" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <AnimateOnScroll>
            <div className="space-y-4">
              <span className="text-[11px] font-bold text-ambar-400 uppercase tracking-[0.25em] font-mono">
                Aliança com os Guardiões
              </span>
              <h2 className="font-serif text-display-sm sm:text-display-md lg:text-display-lg font-bold text-areia-100">
                Consagre a Força da Floresta no Seu Templo
              </h2>
              <p className="text-sm sm:text-base text-areia-300 font-light max-w-2xl mx-auto leading-relaxed">
                Dirigentes e centros espirituais que buscam segurança fitoquímica, rastreabilidade e respeito irrestrito às normas deontológicas do CONAD podem solicitar o credenciamento litúrgico institucional junto à Cooperativa Nativaram.
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={200}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/credenciamento" className="btn-primary w-full sm:w-auto">
                <Sparkles className="h-4 w-4" />
                <span>Solicitar Credenciamento Litúrgico</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/estudos" className="btn-secondary w-full sm:w-auto">
                <FlaskConical className="h-4 w-4 text-ambar-400" />
                <span>Ver Dossiês Fitoquímicos em PDF</span>
              </Link>
            </div>
          </AnimateOnScroll>

          {/* Aviso Mandatório de Segurança Integrativa (+18) */}
          <div className="pt-8 border-t border-ambar-500/15 max-w-3xl mx-auto text-[11px] text-areia-400/70 leading-relaxed font-light">
            <strong className="text-areia-300 font-medium">Aviso de Segurança Integrativa (+18):</strong> O sacramento da Ayahuasca destina-se exclusivamente à comunhão litúrgica e cerimonial em templos devidamente autorizados, respaldado pelo Artigo 5º da Constituição Federal de 1988 e pelas diretrizes da Resolução CONAD nº 01/2010. É terminantemente proibido o comércio profano, a remessa não homologada e a consagração em ambientes recreativos. A Cooperativa Nativaram não realiza consultas médicas ou promessas de cura, atuando em estrita observância à deontologia espiritual.
          </div>
        </div>
      </section>
    </div>
  );
}

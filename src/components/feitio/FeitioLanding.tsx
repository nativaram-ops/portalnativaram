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
            src="/assets/feitio/curadas/feitio-vigilia-noturna-feitor.jpg"
            alt="Vigília noturna do Feitor Caboclo na Casa de Feitio da Nativaram em Cruzeiro do Sul, Acre"
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
              A Cooperativa Etnobotânica Nativaram Brasil não se coloca como uma nova igreja e não disputa dogmas religiosos com nenhuma escola. Nossa vocação é atuar como uma <strong className="text-areia-100 font-medium">Casa Guardiã de Retaguarda e Apoio Botânico</strong>: servindo templos daimistas, núcleos da UDV, casas da Barquinha, centros xamânicos e círculos universalistas com sacramentos de pureza absoluta, sem misturas e sem desvios comerciais. Honramos a história de cada pajé e de cada mestre que abriu os caminhos para que essa luz sagrada chegasse até nós.
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
              O feitio da Ayahuasca é a consagração máxima da química sagrada: o encontro harmônico entre a temperatura, o tempo de fervura, a lixiviação dos alcaloides e a oração contínua.
            </p>
          </AnimateOnScroll>

          {/* Os 6 Passos da Alquimia Perfeita */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Proporção Sagrada */}
            <div className="card-elevated rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2.5 text-ambar-400">
                <Scale className="h-5 w-5" />
                <span className="text-xs font-mono font-bold uppercase">1. Proporção Sagrada de Biomassa</span>
              </div>
              <h4 className="font-serif text-base font-bold text-areia-100">Equilíbrio Cipó / Folha</h4>
              <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
                A alquimia começa na proporção entre o Jagube (a força que ancora e inibe a enzima MAO-A) e a Chacrona Rainha (a luz que ilumina a miração). Tradicionalmente calibrada entre 60/40 e 70/30 em biomassa tratada, garantindo firmeza sem sobrecarga gástrica.
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
                Utilizamos exclusivamente água de nascente límpida da floresta do Acre, com pH neutro natural (~6.2 a 6.8), livre de cloração, metais pesados ou agentes químicos industriais que possam oxidar os alcaloides triptamínicos sensíveis.
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
                As folhas de <em>Psychotria viridis</em> são colhidas ao amanhecer, sob preces direcionadas à Rainha da Floresta. A seleção manual descarta qualquer folha imperfeita ou ressecada, preservando a concentração máxima de DMT natural intacta nos vacúolos celulares.
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
                As lianas são trituradas ritmicamente com malhos pesados de madeira de lei sobre cepos rústicos, sem lâminas metálicas. Esse processo físico abre as fibras longitudinais do cipó, permitindo a extração aquosa completa da Harmina e da THH durante a fervura.
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
                O cozimento é conduzido sob fogo a lenha brando e constante (entre 85°C e 98°C) em tachos de aço inox por 10 a 14 horas por cozimento. Realizam-se decocções sucessivas para lixiviar totalmente os princípios ativos sem destruição por choque térmico violento.
              </p>
            </div>

            {/* 6. Apuro e Redução */}
            <div className="card-elevated rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2.5 text-ambar-400">
                <Sparkles className="h-5 w-5" />
                <span className="text-xs font-mono font-bold uppercase">6. O Ponto Sagrado do Apuro</span>
              </div>
              <h4 className="font-serif text-base font-bold text-areia-100">Concentração e Clarificação</h4>
              <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
                O líquido extraído é filtrado em tecidos de puro algodão e concentrado lentamente em tacho de acabamento com agitação contínua por remo de madeira. O ponto de apuro é alcançado quando o sacramento adquire brilho rubi profundo, aroma balsâmico e consistência nobre.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="floresta" />

      {/* ═══════════════════════════════════════════
          CAPÍTULO IV: NOTA INSTITUCIONAL DE TRANSPARÊNCIA DO CIPÓ
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg lg:py-section-xl bg-floresta-900/60">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="rounded-3xl border-2 border-ambar-500/40 bg-floresta-950 p-8 sm:p-12 space-y-6 shadow-elevated-lg relative overflow-hidden">
              {/* Efeito Glow Dourado de Fundo */}
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
                  Cada lote é minuciosamente analisado pelo nosso experiente feitor caboclo, calibrado na proporção de folhas de Chacrona Rainha e testado para assegurar uma experiência sacramental de altíssima pureza, firmeza e segurança integrativa, apresentando apenas <strong className="text-ambar-400 font-medium">sutis, mansas e harmônicas variações de intensidade e força espiritual</strong>.
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
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider variant="solar" />

      {/* ═══════════════════════════════════════════
          CAPÍTULO V: COMPARAÇÃO FITOQUÍMICA DETALHADA DOS ALCALOIDES
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg lg:py-section-xl bg-floresta-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
          <AnimateOnScroll className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[11px] font-bold text-ambar-400 uppercase tracking-[0.25em] font-mono">
              Capítulo V • Rigor Farmacobotânico
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
              Capítulo VI • Registro de Campo
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
            {/* Foto 1: Colheita de Rezo da Chacrona */}
            <AnimateOnScroll delay={100}>
              <div className="card-elevated rounded-2xl overflow-hidden group h-full flex flex-col justify-between">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src="/assets/feitio/curadas/feitio-colheita-rezo-chacrona.jpg"
                    alt="Colheita de rezo das folhas de Chacrona Rainha ao amanhecer na floresta amazônica do Acre"
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
                  <h4 className="font-serif text-base font-bold text-areia-100">Colheita de Rezo da Rainha</h4>
                  <p className="text-xs text-areia-400 font-light leading-relaxed">
                    Folhas frescas de <em>Psychotria viridis</em> colhidas uma a uma com oração ao Sagrado Feminino.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Foto 2: Quebração do Cipó com Malhos */}
            <AnimateOnScroll delay={200}>
              <div className="card-elevated rounded-2xl overflow-hidden group h-full flex flex-col justify-between">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src="/assets/feitio/curadas/feitio-quebracao-cipo-malhos.jpg"
                    alt="Homens triturando o cipó Banisteriopsis caapi com malhos de madeira de lei sobre cepos rústicos"
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
                  <h4 className="font-serif text-base font-bold text-areia-100">Quebração das Lianas</h4>
                  <p className="text-xs text-areia-400 font-light leading-relaxed">
                    Abertura mecânica das fibras do cipó com malhos de madeira, sem contato oxidativo com lâminas ferrosas.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Foto 3: Vigília Noturna do Feitor */}
            <AnimateOnScroll delay={300}>
              <div className="card-elevated rounded-2xl overflow-hidden group h-full flex flex-col justify-between">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src="/assets/feitio/curadas/feitio-vigilia-noturna-feitor.jpg"
                    alt="O Feitor Caboclo vigiando o caldeirão fervente sob a noite da floresta amazônica"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-floresta-950 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 rounded-full bg-floresta-900/90 border border-ambar-500/30 px-3 py-1 text-[10px] font-mono uppercase text-ambar-400">
                    Vigília Noturna
                  </span>
                </div>
                <div className="p-5 space-y-1.5">
                  <h4 className="font-serif text-base font-bold text-areia-100">Oração Contínua no Fogo</h4>
                  <p className="text-xs text-areia-400 font-light leading-relaxed">
                    Mais de 28 anos de dietas de isolamento sintonizados na chama que apura o sacramento.
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
          <div className="rounded-3xl border border-ambar-500/30 bg-floresta-950 p-6 sm:p-10 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-ambar-500/20 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-ambar-400 uppercase">
                  <Flame className="h-4 w-4" />
                  <span>Registro em Vídeo • Casa de Feitio no Acre</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-areia-100">
                  O Borbulhar da Medicina no Caldeirão
                </h3>
              </div>
              <span className="text-xs font-mono text-ambar-300 bg-floresta-900 px-3 py-1.5 rounded-full border border-ambar-500/20">
                Registro Original de Campo
              </span>
            </div>

            <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-2xl overflow-hidden border border-ambar-500/30 bg-black shadow-inner">
              <video
                controls
                preload="metadata"
                poster="/assets/feitio/curadas/feitio-fervura-chacrona.jpg"
                className="w-full h-full object-cover"
              >
                <source src="/assets/feitio/curadas/feitio-video-fervura.mp4" type="video/mp4" />
                Seu navegador não suporta a reprodução deste vídeo.
              </video>
            </div>
            <p className="text-center text-xs text-areia-400 max-w-2xl mx-auto font-light">
              Fervura tradicional em caldeirões de aço inox sob a noite da floresta amazônica: a evaporação serena garante a conservação plena das propriedades fitoquímicas e respeita a sacralidade do rezo.
            </p>
          </div>
        </div>
      </section>

      <SectionDivider variant="solar" />

      {/* ═══════════════════════════════════════════
          CAPÍTULO VII: SISTEMA DE GRADUAÇÕES & COOPERATIVISMO
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg lg:py-section-xl bg-floresta-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
          <AnimateOnScroll className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[11px] font-bold text-ambar-400 uppercase tracking-[0.25em] font-mono">
              Capítulo VII • Padronização Tradicional
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
          CAPÍTULO VIII: PERGUNTAS FREQUENTES SOBRE O FEITIO
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg lg:py-section-xl bg-floresta-900/40">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
          <AnimateOnScroll className="text-center space-y-3">
            <span className="text-[11px] font-bold text-ambar-400 uppercase tracking-[0.25em] font-mono">
              Capítulo VIII • Dúvidas Técnicas & Litúrgicas
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

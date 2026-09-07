import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Leaf,
  Scale,
  HeartHandshake,
  CheckCircle2,
  FlaskConical,
  Lock,
  ArrowRight,
  Flame,
  Droplets,
  Plane,
  ShieldCheck,
  FileText,
  Calendar,
  MapPin,
  Clock,
  Users,
  Award,
  ChevronRight,
  ShieldAlert,
  Sun,
  Compass,
} from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

export default function HomePage() {
  const faqItems = [
    {
      pergunta: "Como a Cooperativa Nativaram compreende a natureza sagrada da Ayahuasca?",
      resposta:
        "Entendemos a Ayahuasca como um portal sagrado e sacramento milenar. Zelamos pela integridade de cada processo, realizando uma seleção prévia de todos aqueles a quem destinamos nosso preparado sagrado, garantindo que chegue a mãos que honrem seu propósito espiritual e mantenham viva a corrente de luz, respeito e fraternidade.",
      destaque: "A conexão com o sagrado vem através do equilíbrio, harmonia e leveza.",
    },
    {
      pergunta: "Quais são as origens e referências que norteiam o preparo do sacramento?",
      resposta:
        "Nossa alquimia consciente nasce da união entre o Rigor Doutrinário — herdando o padrão de qualidade, ordem e pureza das grandes escolas ayahuasqueiras (Santo Daime e UDV) —, a Sabedoria Ancestral dos povos originários no trato com as plantas mestras e a Prática Constante de anos de aprimoramento técnico e vigília espiritual.",
      destaque: "Herança daimista e da UDV combinada à ciência ancestral dos povos da floresta.",
    },
    {
      pergunta: "Como entender a numeração das graduações (ex: 3.1 a 10.1)?",
      resposta:
        "A numeração parte da referência ao estudo tradicional daimista, onde o sacramento é dividido rigorosamente pela concentração de matéria-prima (biomassa de cipó e folha por litro). Essa métrica garante que o dirigente e o buscador compreendam com exatidão a densidade energética de cada preparado, alinhando a escolha ao rigor e propósito do trabalho espiritual.",
      destaque: "Métrica tradicional de biomassa que confere previsibilidade energética e litúrgica.",
    },
    {
      pergunta: "Como funciona a logística aérea expressa via Gollog com documentação?",
      resposta:
        "O transporte por via aérea é a rota que preserva a pureza e a energia viva do sacramento sem necessidade de conservantes. Todo despacho voa via Gollog acompanhado de dossiê completo: declaração de uso ritualístico e destinação religiosa assinada pelos dirigentes, cópia da ata de constituição e CNPJs de ambas as entidades. O lote desembarca no aeroporto mais próximo ou é entregue na sede da instituição.",
      destaque: "Remessa aérea protegida que elimina semanas de calor e riscos de fermentação do transporte rodoviário.",
    },
    {
      pergunta: "Por que é necessário o planejamento com antecedência de 30 dias?",
      resposta:
        "O sacramento não provém de linhas de montagem industriais, mas de um ritual solene de respeito à natureza. É necessário respeitar o ciclo de colheita sustentável na mata, o tempo de repouso das plantas, os dias de vigília e feitio sob fogo a lenha, a análise do lote e a tramitação do despacho aéreo documental.",
      destaque: "Respeito ao ciclo natural da floresta e rigor no controle de qualidade de cada remessa.",
    },
    {
      pergunta: "Como funciona o rateio cooperativo de custos operacionais?",
      resposta:
        "Por expressa determinação legal e estatutária, a Nativaram não visa lucro. O valor cooperativo por litro representa exclusivamente o rateio solidário das despesas reais incorridas: sustentação dos feitores tradicionais na floresta, manejo ecológico sustentável, recipientes apropriados e frete aéreo de Cruzeiro do Sul. A prestação é transparente aos templos associados.",
      destaque: "Sem fins lucrativos: rateio solidário conforme a Resolução CONAD nº 01/2010.",
    },
  ];

  return (
    <div className="space-y-0">
      {/* ═══════════════════════════════════════════
          HERO — O Portal Sagrado & Apoio Litúrgico
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden pb-16 pt-32 lg:pb-24">
        {/* Imagem de Fundo do Feitio */}
        <Image
          src="/assets/feitio/curadas/feitio-noturno-caldeiroes.jpg"
          alt="Feitio sagrado da Ayahuasca em Cruzeiro do Sul, Acre — caldeirões sob a noite amazônica"
          fill
          priority
          className="object-cover object-center brightness-[0.50] contrast-105"
          sizes="100vw"
        />

        {/* Overlay de Gradiente */}
        <div className="gradient-hero-overlay absolute inset-0" />

        {/* Brilho Solar Radial */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[650px] bg-ambar-500/[0.08] rounded-full blur-[130px] pointer-events-none" />

        {/* Conteúdo do Hero */}
        <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 z-10">
          <div className="max-w-3xl space-y-6">
            <AnimateOnScroll delay={150}>
              <div className="inline-flex items-center gap-2 rounded-full border border-ambar-500/40 bg-floresta-950/80 backdrop-blur-md px-4 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-ambar-300 uppercase shadow-solar">
                <Sparkles className="h-3 w-3 text-ambar-400" />
                <span>Ponte Ética & Salvaguarda do Sagrado Sacramento</span>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={300}>
              <h1 className="font-serif text-display-sm sm:text-display-md lg:text-display-lg font-bold text-areia-100 text-glow leading-[1.08]">
                O Portal Sagrado,
                <br />
                <span className="text-gradient-solar">Alquimia Consciente</span>
                <br />
                <span className="text-areia-200/90">& Apoio aos Templos de Luz</span>
              </h1>
            </AnimateOnScroll>

            <AnimateOnScroll delay={450}>
              <p className="text-sm sm:text-base text-areia-200/90 leading-relaxed max-w-2xl font-light">
                A Cooperativa Nativaram entende a Ayahuasca como um portal sagrado.
                Conectamos dirigentes de instituições religiosas devidamente regulamentadas
                a centros e mestres feitores tradicionais de <strong>Cruzeiro do Sul, no Acre</strong>.
                Um elo de equilíbrio, harmonia e leveza: herança das grandes escolas ayahuasqueiras,
                blindagem documental e <strong>despacho aéreo expresso via Gollog</strong> para todo o Brasil.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={600}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Link href="/credenciamento" className="btn-primary flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold tracking-wide">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Solicitar Credenciamento do Templo</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="#sacralidade" className="btn-secondary flex items-center justify-center gap-2 text-xs sm:text-sm">
                  <Flame className="h-4 w-4 text-ambar-400" />
                  <span>Nossa Nota de Sacralidade</span>
                </Link>
              </div>
            </AnimateOnScroll>

            {/* Aviso Litúrgico */}
            <AnimateOnScroll delay={750}>
              <p className="text-[11px] text-areia-400 flex items-center gap-2 pt-1 font-mono">
                <Lock className="h-3 w-3 text-ambar-400" />
                <span>Destinação exclusiva a pessoas jurídicas religiosas constituídas (CNPJ e Ata de Fundação).</span>
              </p>
            </AnimateOnScroll>
          </div>
        </div>

        {/* Localização Badge */}
        <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-10 hidden md:block">
          <div className="inline-flex items-center gap-2.5 rounded-full bg-floresta-950/80 backdrop-blur-md border border-ambar-500/25 px-4 py-2 text-[11px] font-medium text-ambar-300">
            <Flame className="h-3.5 w-3.5 text-ambar-400 animate-flicker" />
            <span>Cruzeiro do Sul • Acre • Vale do Juruá</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          BARRA DE PILARES SAGRADOS
          ═══════════════════════════════════════════ */}
      <section className="bg-floresta-950 border-y border-ambar-500/15">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: MapPin,
                title: "Feitio no Acre",
                desc: "Tradição cabocla no Vale do Juruá/AC",
              },
              {
                icon: Sun,
                title: "Alquimia Consciente",
                desc: "Equilíbrio, harmonia e alta vibração",
              },
              {
                icon: Plane,
                title: "Envio Aéreo Gollog",
                desc: "Despacho expresso e pureza preservada",
              },
              {
                icon: Scale,
                title: "Blindagem CONAD 01/2010",
                desc: "Rigor litúrgico e sem fins lucrativos",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-ambar-500/25 bg-floresta-900 text-ambar-400">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-semibold text-areia-100">{title}</h4>
                  <p className="text-[11px] text-areia-400 leading-tight">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          NOTA DE RESPONSABILIDADE E SACRALIDADE
          ═══════════════════════════════════════════ */}
      <section className="py-section-md lg:py-section-lg relative overflow-hidden bg-gradient-to-b from-floresta-950 via-floresta-900/40 to-floresta-950" id="sacralidade">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-radial-ambar pointer-events-none" />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative">
          <AnimateOnScroll>
            <div className="card-elevated rounded-3xl p-8 sm:p-14 border-ambar-500/35 bg-gradient-to-br from-floresta-900/90 via-floresta-950 to-floresta-900/80 shadow-solar text-center space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-ambar-500/15 border border-ambar-500/30 px-4 py-1.5 text-[11px] font-semibold tracking-widest text-ambar-300 uppercase">
                <Flame className="h-3.5 w-3.5 text-ambar-400 animate-flicker" />
                <span>Nota de Responsabilidade & Sacralidade</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-areia-100 max-w-3xl mx-auto leading-snug">
                &ldquo;A Cooperativa Nativaram entende a Ayahuasca como um portal sagrado.&rdquo;
              </h2>

              <div className="space-y-4 max-w-3xl mx-auto text-sm sm:text-base text-areia-200/90 leading-relaxed font-light">
                <p>
                  Por isso, zelamos pela integridade de cada processo, realizando uma seleção prévia
                  de todos aqueles a quem destinamos nosso sagrado sacramento. Nosso compromisso é garantir
                  que ele chegue a mãos que honrem seu propósito espiritual, mantendo viva a corrente de luz e respeito.
                </p>
                <p className="text-amber-200/90 italic font-serif text-base sm:text-lg">
                  &ldquo;Entendemos que a conexão com o sagrado vem através do equilíbrio, harmonia e leveza;
                  nosso preparado de força é o espelho dessa busca constante.&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-ambar-500/20 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded-xl bg-floresta-950/60 border border-ambar-500/15">
                  <span className="text-[10px] font-mono text-ambar-400 uppercase tracking-widest block">Compromisso</span>
                  <span className="font-serif text-xs sm:text-sm font-semibold text-areia-100">Seleção Litúrgica Prévia</span>
                </div>
                <div className="p-3 rounded-xl bg-floresta-950/60 border border-ambar-500/15">
                  <span className="text-[10px] font-mono text-ambar-400 uppercase tracking-widest block">Propósito</span>
                  <span className="font-serif text-xs sm:text-sm font-semibold text-areia-100">Corrente de Luz & Respeito</span>
                </div>
                <div className="p-3 rounded-xl bg-floresta-950/60 border border-ambar-500/15">
                  <span className="text-[10px] font-mono text-ambar-400 uppercase tracking-widest block">Sintonia</span>
                  <span className="font-serif text-xs sm:text-sm font-semibold text-areia-100">Equilíbrio, Harmonia & Leveza</span>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider variant="solar" />

      {/* ═══════════════════════════════════════════
          PRINCÍPIOS DO NOSSO FEITIO E ORIGEM DO ESTUDO
          ═══════════════════════════════════════════ */}
      <section className="py-section-md lg:py-section-lg" id="principios-feitio">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ambar-400 flex items-center justify-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-ambar-400" />
              Alquimia Consciente
            </p>
            <h2 className="font-serif text-display-sm sm:text-display-md font-bold text-areia-100">
              Princípios do Nosso Feitio & Origem do Estudo
            </h2>
            <p className="text-sm text-areia-300 max-w-2xl mx-auto leading-relaxed font-light">
              Nosso sacramento é fruto de uma alquimia consciente, onde a ciência do espírito encontra a disciplina da prática. Nossos princípios norteadores nascem de um estudo profundo que une três vertentes fundamentais:
            </p>
          </AnimateOnScroll>

          {/* 3 Pilares Doutrinários Fundamentais */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* 1. Rigor Doutrinário */}
            <AnimateOnScroll delay={100}>
              <div className="card-elevated rounded-2xl p-8 space-y-5 h-full flex flex-col justify-between border-ambar-500/25 bg-floresta-900/60 shadow-solar">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-ambar-400 bg-floresta-950/80 px-2.5 py-1 rounded border border-ambar-500/20">
                      Pilar I
                    </span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ambar-500/20 border border-ambar-500/30 text-ambar-300">
                      <Scale className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-areia-100">
                    Rigor Doutrinário
                  </h3>
                  <p className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
                    Herdamos o padrão de qualidade, a ordem e a pureza no preparo das grandes escolas ayahuasqueiras (<strong>Santo Daime e UDV</strong>). Cada etapa do feitio respeita o silêncio, a concentração e a hierarquia espiritual consagrada.
                  </p>
                </div>
                <div className="pt-3 border-t border-ambar-500/15 text-[11px] text-ambar-300 font-mono">
                  ✦ Padrão das grandes linhagens
                </div>
              </div>
            </AnimateOnScroll>

            {/* 2. Sabedoria Ancestral */}
            <AnimateOnScroll delay={200}>
              <div className="card-elevated rounded-2xl p-8 space-y-5 h-full flex flex-col justify-between border-ambar-500/25 bg-floresta-900/60 shadow-solar">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-ambar-400 bg-floresta-950/80 px-2.5 py-1 rounded border border-ambar-500/20">
                      Pilar II
                    </span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ambar-500/20 border border-ambar-500/30 text-ambar-300">
                      <Leaf className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-areia-100">
                    Sabedoria Ancestral
                  </h3>
                  <p className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
                    Honramos o conhecimento milenar dos <strong>povos originários</strong> no trato, diálogo e colheita com as plantas mestras da Amazônia. O respeito ao tempo das estações, ao orvalho da manhã e aos espíritos guardiões da floresta.
                  </p>
                </div>
                <div className="pt-3 border-t border-ambar-500/15 text-[11px] text-ambar-300 font-mono">
                  ✦ Memória viva da floresta
                </div>
              </div>
            </AnimateOnScroll>

            {/* 3. Prática Constante */}
            <AnimateOnScroll delay={300}>
              <div className="card-elevated rounded-2xl p-8 space-y-5 h-full flex flex-col justify-between border-ambar-500/25 bg-floresta-900/60 shadow-solar">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-ambar-400 bg-floresta-950/80 px-2.5 py-1 rounded border border-ambar-500/20">
                      Pilar III
                    </span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ambar-500/20 border border-ambar-500/30 text-ambar-300">
                      <Flame className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-areia-100">
                    Prática Constante
                  </h3>
                  <p className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
                    O equilíbrio de cada feitio é resultado de <strong>anos de dedicação e aprimoramento técnico</strong> do nosso feitor caboclo, garantindo um preparado seguro, harmônico e de alta vibração para a condução solene dos ritos.
                  </p>
                </div>
                <div className="pt-3 border-t border-ambar-500/15 text-[11px] text-ambar-300 font-mono">
                  ✦ Segurança & alta vibração
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          {/* O Equilíbrio Sagrado das Matérias-Primas (A Proporção das Plantas) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <AnimateOnScroll className="lg:col-span-6 space-y-5">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-ambar-400">
                  Harmonia das Matérias-Primas
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-areia-100">
                  O Equilíbrio Sagrado: Jagube & Rainha
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
                No feitio tradicional, o equilíbrio manifesta-se na proporção equilibrada entre o <strong>Cipó Jagube (60%)</strong> e a <strong>Folha Chacrona Rainha (40%)</strong>.
                Não é uma fórmula mecânica, mas a união harmoniosa entre a estrutura que ancora e a luz que eleva:
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-xl border border-ambar-500/25 bg-floresta-950/70 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-amber-300 font-serif">60% Cipó Tucunacá (Caule Liso) — Força & Firmeza</span>
                    <span className="text-[10px] text-amber-400/80 font-mono">Harmina & THH</span>
                  </div>
                  <p className="text-xs text-areia-300 font-light leading-relaxed">
                    Variedade de caule liso nobre que proporciona um alinhamento sereno e lúcido, com teor residual ínfimo de harmalina (0,65 mg/g), prevenindo os tremores somáticos e náuseas severas causadas pela variedade Caupuri.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-emerald-500/25 bg-floresta-950/70 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-emerald-300 font-serif">40% Folha Chacrona Rainha — Luz & Visão Cristalina</span>
                    <span className="text-[10px] text-emerald-400/80 font-mono">Colheita ao Amanhecer</span>
                  </div>
                  <p className="text-xs text-areia-300 font-light leading-relaxed">
                    Folhas frescas de <em>Psychotria viridis</em> colhidas exclusivamente no orvalho do alvorecer sob rezo, trazendo a clareza mental, as mirações serenas e a expansão harmoniosa da consciência.
                  </p>
                </div>
              </div>

              <div className="rounded-xl p-4 bg-floresta-950 border border-ambar-500/20 space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-amber-400">60% Força Estrutural (Jagube)</span>
                  <span className="text-emerald-400">40% Luz & Claridade (Rainha)</span>
                </div>
                <div className="h-2.5 rounded-full bg-floresta-800 overflow-hidden flex">
                  <div className="h-full bg-gradient-to-r from-amber-600 to-amber-400 w-[60%]" />
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 w-[40%]" />
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll className="lg:col-span-6" direction="right">
              <div className="relative rounded-2xl overflow-hidden border border-ambar-500/30 shadow-elevated group">
                <div className="relative h-80 sm:h-96 lg:h-[460px]">
                  <Image
                    src="/assets/feitio/curadas/feitio-panelas-chacrona-cipo.jpg"
                    alt="Feitio da Ayahuasca: camadas sagradas de Chacrona e Cipó em tachos de aço inox"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-floresta-950 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-floresta-950/85 backdrop-blur-md border border-ambar-500/20 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-ambar-400 tracking-wider">
                      Cozimento sob Vigília em Aço Inox
                    </span>
                    <p className="text-xs text-areia-200 font-light">
                      Fogo a lenha contínuo, água pura de fonte e preces durante as 12 horas de decocção sob a abóbada estrelada do Acre.
                    </p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <SectionDivider variant="floresta" />

      {/* ═══════════════════════════════════════════
          A PONTE ÉTICA: COMO CONECTAMOS O FEITIO AO SEU TEMPLO
          ═══════════════════════════════════════════ */}
      <section className="py-section-md lg:py-section-lg bg-floresta-950/60" id="como-funciona">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ambar-400">
              Apoio Operacional & Fraternidade
            </p>
            <h2 className="font-serif text-display-sm sm:text-display-md font-bold text-areia-100">
              A Ponte Ética entre o Acre e o seu Templo
            </h2>
            <p className="text-sm text-areia-300 max-w-2xl mx-auto leading-relaxed font-light">
              Muitos dirigentes de instituições fora da Amazônia enfrentam a impossibilidade de manter estrutura fabril própria na floresta. A Nativaram constrói uma aliança ética e jurídica para que o sacramento chegue com integridade, pureza e segurança ao altar.
            </p>
          </AnimateOnScroll>

          {/* 4 Etapas da Ponte Ética */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                icon: Users,
                title: "Feitores Regulamentados",
                subtitle: "Aliança no Acre",
                desc: "Contato direto com instituições e mestres feitores tradicionais devidamente constituídos em Cruzeiro do Sul/AC, com mais de 28 anos de dietas e capacidade de feitio regular.",
              },
              {
                num: "02",
                icon: FlaskConical,
                title: "Padrão de Feitio & Pureza",
                subtitle: "Alquimia em Aço Inox",
                desc: "Preparo purista com Cipó Tucunacá e Rainha Chacrona colhida com oração ao amanhecer, em caldeirões de inox sob fogo a lenha. Sem aditivos ou misturas impróprias.",
              },
              {
                num: "03",
                icon: FileText,
                title: "Dossiê & Conformidade",
                subtitle: "Blindagem CONAD 01/2010",
                desc: "Elaboração de termos litúrgicos formais, atas de diretoria e comprovação de personalidade jurídica para respaldo pleno da remessa perante as autoridades.",
              },
              {
                num: "04",
                icon: Plane,
                title: "Despacho Aéreo Gollog",
                subtitle: "Pontualidade & Frescor",
                desc: "Embarque por carga aérea expressa direto ao aeroporto mais próximo ou à sede litúrgica do templo, preservando a pureza biológica do sacramento.",
              },
            ].map(({ num, icon: Icon, title, subtitle, desc }, i) => (
              <AnimateOnScroll key={num} delay={i * 120}>
                <div className="card-elevated rounded-2xl p-6 sm:p-7 space-y-4 h-full flex flex-col justify-between border-ambar-500/20 hover:border-ambar-500/40">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-3xl font-bold text-ambar-400/50">{num}</span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-ambar-500/25 bg-floresta-800/60 text-ambar-400">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-ambar-400">{subtitle}</span>
                      <h3 className="font-serif text-lg font-bold text-areia-100">{title}</h3>
                    </div>
                    <p className="text-xs text-areia-300 leading-relaxed font-light">{desc}</p>
                  </div>
                  <div className="pt-2 border-t border-ambar-500/10 text-[10px] text-ambar-300/80 font-mono">
                    Etapa {num} da Cadeia de Custódia
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Infográfico Esquemático */}
          <AnimateOnScroll className="mt-12">
            <div className="rounded-2xl border border-ambar-500/25 bg-gradient-to-r from-floresta-950 via-floresta-900 to-floresta-950 p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center">
                <div className="space-y-1.5 p-4 rounded-xl bg-floresta-950/60 border border-ambar-500/15">
                  <span className="text-[10px] font-mono text-ambar-400 uppercase tracking-widest">Origem Sagrada</span>
                  <h4 className="font-serif text-base font-bold text-areia-100">Cruzeiro do Sul, Acre</h4>
                  <p className="text-xs text-areia-400">Feito em caldeirões de inox sob rezo tradicional</p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-ambar-300 bg-ambar-500/15 border border-ambar-500/30 px-3 py-1 rounded-full">
                    <Plane className="h-3.5 w-3.5" />
                    <span>Voo Direto Gollog Cargas</span>
                  </div>
                  <div className="w-full max-w-[200px] h-[2px] bg-gradient-to-r from-ambar-500/20 via-ambar-400 to-ambar-500/20" />
                  <span className="text-[10px] text-areia-400">Com declaração litúrgica CONAD 01/2010</span>
                </div>
                <div className="space-y-1.5 p-4 rounded-xl bg-floresta-950/60 border border-ambar-500/15">
                  <span className="text-[10px] font-mono text-ambar-400 uppercase tracking-widest">Destino Litúrgico</span>
                  <h4 className="font-serif text-base font-bold text-areia-100">Seu Templo Credenciado</h4>
                  <p className="text-xs text-areia-400">Entrega no aeroporto ou na sede da instituição</p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider variant="solar" />

      {/* ═══════════════════════════════════════════
          COMPREENSÃO TÉCNICA E CONCENTRAÇÃO (GRADUAÇÕES & PRECEITOS)
          ═══════════════════════════════════════════ */}
      <section className="py-section-md lg:py-section-lg" id="graduacoes">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Lado Esquerdo: Compreensão Técnica e os Dois Preceitos Sagrados */}
            <AnimateOnScroll className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
              <div className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ambar-400 flex items-center gap-2">
                  <Compass className="h-3.5 w-3.5" />
                  Estudo Tradicional Daimista
                </p>
                <h2 className="font-serif text-display-sm font-bold text-areia-100">
                  Compreensão Técnica
                  <br />
                  <span className="text-gradient-solar">& Concentração</span>
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
                A numeração que define nossas graduações (ex: <strong>3.1, 5.1, 7.1, 10.1</strong>) parte da referência ao estudo tradicional daimista.
                Neste sistema, o sacramento é dividido rigorosamente pela concentração de matéria-prima utilizada. Essa métrica garante que o dirigente e o buscador compreendam a <strong>densidade energética de cada preparado</strong>, permitindo uma escolha alinhada ao rigor do trabalho espiritual.
              </p>

              {/* Os 2 Preceitos Fundamentais */}
              <div className="space-y-3.5 pt-2">
                <div className="p-4 rounded-xl bg-floresta-900/80 border border-ambar-500/30 space-y-1.5">
                  <span className="text-xs font-bold text-ambar-300 flex items-center gap-1.5">
                    <span>1️⃣</span> Porções Sugeridas: O Sacramento é Soberano
                  </span>
                  <p className="text-xs text-areia-300 leading-relaxed font-light">
                    Estas medidas são médias baseadas na experiência de nossos feitios. O sacramento é soberano; atente-se sempre à sensibilidade individual e ao propósito litúrgico do momento.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-floresta-900/80 border border-ambar-500/30 space-y-1.5">
                  <span className="text-xs font-bold text-ambar-300 flex items-center gap-1.5">
                    <span>2️⃣</span> Manipulação Sagrada: O Rito de Servir
                  </span>
                  <p className="text-xs text-areia-300 leading-relaxed font-light">
                    O processo de servir o sacramento é um rito sagrado. Mantenha o ambiente em oração e reverência, preservando a força depositada em cada gota.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/feitio"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-ambar-400 hover:text-ambar-300 transition-colors"
                >
                  <span>Ver estudo fitoquímico completo e tabela de rateio</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </AnimateOnScroll>

            {/* Lado Direito: As 4 Graduações + Mel/Gel */}
            <div className="lg:col-span-7 space-y-4">
              {[
                {
                  grad: "3.1",
                  name: "Mainumbi",
                  bird: "Beija-flor",
                  dose: "90 a 120 ml",
                  duracao: "3h a 4h",
                  rateio: "R$ 200/L",
                  strength: 25,
                  desc: "Voo manso e acolhedor. Ideal para ritos de acolhimento fraterno, introspecções suaves e iniciantes na sagrada comunhão vegetal.",
                },
                {
                  grad: "5.1",
                  name: "Pituã",
                  bird: "Bem-te-vi",
                  dose: "70 a 100 ml",
                  duracao: "4h a 5h",
                  rateio: "R$ 250/L",
                  strength: 50,
                  desc: "Clareza mental cristalina, equilíbrio perene e firmeza serena. Proporciona harmonização completa do campo cerimonial e foco meditativo.",
                },
                {
                  grad: "7.1",
                  name: "Anhangatã",
                  bird: "Rouxinol",
                  dose: "50 a 90 ml",
                  duracao: "5h a 6h",
                  rateio: "R$ 310/L",
                  strength: 75,
                  desc: "Miração límpida e canto da alma. Indicado para ritos solenes, celebrações doutrinárias profundas e trabalhos espirituais de alinhamento.",
                },
                {
                  grad: "10.1",
                  name: "Wirapuru",
                  bird: "Semi-Mel",
                  dose: "30 a 50 ml",
                  duracao: "6h a 8h",
                  rateio: "R$ 380/L",
                  strength: 100,
                  desc: "Densidade máxima e visão de longo alcance. Concentração robusta de cipó Tucunacá para vigílias litúrgicas e sustentação de egrégoras elevadas.",
                  featured: true,
                },
              ].map(({ grad, name, bird, dose, duracao, rateio, strength, desc, featured }, i) => (
                <AnimateOnScroll key={grad} delay={i * 90} direction="right">
                  <div
                    className={`rounded-xl p-5 sm:p-6 space-y-3 transition-all duration-300 ${
                      featured
                        ? "card-elevated ring-1 ring-ambar-500/40 bg-floresta-900/80 shadow-solar"
                        : "card-liturgico"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-baseline gap-2.5">
                        <span
                          className={`font-serif text-2xl font-bold ${
                            featured ? "text-ambar-300" : "text-ambar-400"
                          }`}
                        >
                          {grad}
                        </span>
                        <span className="font-serif text-lg font-semibold text-areia-100">
                          {name}
                        </span>
                        <span className="text-[11px] text-areia-400 italic">
                          ({bird})
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-mono">
                        <span className="text-areia-300 bg-floresta-800/80 border border-ambar-500/20 px-2 py-0.5 rounded">
                          Porção: {dose}
                        </span>
                        <span className="text-ambar-300/90 bg-ambar-500/10 border border-ambar-500/20 px-2 py-0.5 rounded">
                          Rateio: {rateio}
                        </span>
                      </div>
                    </div>

                    {/* Barra de Densidade */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 rounded-full bg-floresta-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-ambar-600 via-ambar-500 to-ambar-400 transition-all duration-1000"
                          style={{ width: `${strength}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-ambar-400/80 font-mono w-8 text-right">
                        {strength}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-areia-400/70 font-mono">
                      <span>Ciclo ritualístico: ~{duracao}</span>
                      <span>HPLC Tucunacá • Cruzeiro do Sul (AC)</span>
                    </div>

                    <p className="text-xs text-areia-300 leading-relaxed font-light">
                      {desc}
                    </p>
                  </div>
                </AnimateOnScroll>
              ))}

              {/* Formatos Especiais Mel & Gel */}
              <AnimateOnScroll delay={400} direction="right">
                <div className="rounded-xl border border-ambar-500/35 bg-gradient-to-br from-floresta-900 via-floresta-950 to-floresta-900 p-6 space-y-3.5 shadow-solar">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-ambar-500/15 pb-3">
                    <div className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-ambar-400" />
                      <h4 className="font-serif text-sm sm:text-base font-bold text-areia-100">
                        Formatos Especiais de Otimização: Mel & Gel
                      </h4>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-ambar-300 bg-ambar-500/20 border border-ambar-500/40 px-2.5 py-0.5 rounded-full w-fit">
                      Economia Logística
                    </span>
                  </div>
                  <p className="text-xs text-areia-200 leading-relaxed font-light">
                    Para congregações com grande número de associados ou situadas em estados mais distantes, disponibilizamos
                    o sacramento nas consistências <strong>Mel</strong> e <strong>Gel</strong>. Essas graduações superconcentradas
                    permitem <strong>reduzir drasticamente o peso e o volume do frete aéreo</strong>, mantendo estabilidade e conservação excelentes por meses.
                  </p>
                  <div className="flex items-center justify-between pt-1 text-[11px] text-ambar-300/90 font-mono">
                    <span>Sob encomenda prévia na ficha de credenciamento</span>
                    <Link href="/credenciamento" className="inline-flex items-center gap-1 font-semibold hover:text-ambar-300 transition-colors">
                      <span>Solicitar</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="minimal" />

      {/* ═══════════════════════════════════════════
          LOGÍSTICA AÉREA GOLLOG & SEGURANÇA DOCUMENTAL
          ═══════════════════════════════════════════ */}
      <section className="py-section-md lg:py-section-lg bg-floresta-950/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ambar-400 flex items-center justify-center gap-2">
              <Plane className="h-3.5 w-3.5" />
              Agilidade & Rastreabilidade Nacional
            </p>
            <h2 className="font-serif text-display-sm sm:text-display-md font-bold text-areia-100">
              Logística Aérea Expressa via Gollog
            </h2>
            <p className="text-sm text-areia-300 max-w-2xl mx-auto leading-relaxed font-light">
              Do aeroporto de Cruzeiro do Sul ou Rio Branco até a sua congregação. Cada remessa é tratada com veneração sagrada e estrita segurança operacional.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <AnimateOnScroll delay={100}>
              <div className="card-elevated rounded-2xl p-7 space-y-4 h-full flex flex-col justify-between border-ambar-500/20">
                <div className="space-y-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ambar-500/15 border border-ambar-500/30 text-ambar-400">
                    <Clock className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-areia-100">
                    Zero Degradação Térmica
                  </h3>
                  <p className="text-xs text-areia-300 leading-relaxed font-light">
                    O transporte aéreo expresso via Gollog elimina os riscos de longas jornadas rodoviárias pela BR-364.
                    O sacramento viaja em ambiente pressurizado e chega fresco, preservando intactos todos os princípios botânicos sem acidificação acidental.
                  </p>
                </div>
                <div className="text-[11px] font-mono text-ambar-400/90 pt-3 border-t border-ambar-500/10">
                  ✈️ Voo com rastreamento aéreo
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={200}>
              <div className="card-elevated rounded-2xl p-7 space-y-4 h-full flex flex-col justify-between border-ambar-500/30 bg-floresta-900/60 shadow-solar">
                <div className="space-y-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ambar-500/20 border border-ambar-500/40 text-ambar-300">
                    <FileText className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-areia-100">
                    Blindagem Documental Completa
                  </h3>
                  <p className="text-xs text-areia-200 leading-relaxed font-light">
                    Cada caixa é lacrada com fita de custódia e viaja acompanhada de pasta física e digital contendo:
                    Declaração de Uso Ritualístico (Res. CONAD 01/2010), Estatuto Social, Ata de Posse da Diretoria e Cartão CNPJ do templo destinatário e da cooperativa remetente.
                  </p>
                </div>
                <div className="text-[11px] font-mono text-ambar-300 pt-3 border-t border-ambar-500/20">
                  📜 Conformidade com órgãos fiscalizadores
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={300}>
              <div className="card-elevated rounded-2xl p-7 space-y-4 h-full flex flex-col justify-between border-ambar-500/20">
                <div className="space-y-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ambar-500/15 border border-ambar-500/30 text-ambar-400">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-areia-100">
                    Planejamento de 30 Dias
                  </h3>
                  <p className="text-xs text-areia-300 leading-relaxed font-light">
                    Para garantir que o cronograma cerimonial do seu templo nunca seja interrompido, operamos com prazo mínimo de
                    <strong> 30 dias de antecedência</strong>. Esse intervalo honra a colheita no tempo da mata, o feitio consciente e a tramitação do despacho aéreo.
                  </p>
                </div>
                <div className="text-[11px] font-mono text-ambar-400/90 pt-3 border-t border-ambar-500/10">
                  📅 Previsibilidade litúrgica para o dirigente
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <SectionDivider variant="solar" />

      {/* ═══════════════════════════════════════════
          BLINDAGEM JURÍDICA & DEONTOLOGIA CONAD
          ═══════════════════════════════════════════ */}
      <section className="py-section-md lg:py-section-lg bg-floresta-950/70" id="compliance">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ambar-400 flex items-center justify-center gap-2">
              <Scale className="h-3.5 w-3.5" />
              Segurança Jurídico-Institucional
            </p>
            <h2 className="font-serif text-display-sm sm:text-display-md font-bold text-areia-100">
              Marco Regulatório & Deontologia
            </h2>
            <p className="text-sm text-areia-300 max-w-2xl mx-auto leading-relaxed font-light">
              Toda a atuação da Cooperativa Nativaram Brasil é amparada pelos pilares do direito constitucional brasileiro e das normativas sanitárias vigentes.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                badge: "CF / 1988",
                title: "Art. 5º, VI & VIII",
                desc: "Inviolabilidade da liberdade de consciência e de crença, sendo assegurado o livre exercício dos cultos religiosos e a proteção aos seus locais de liturgia.",
              },
              {
                badge: "Lei 11.343/2006",
                title: "Art. 2º, Parágrafo Único",
                desc: "Ressalva legal expressa na Lei de Drogas que autoriza o plantio, cultivo e colheita exclusivamente para fins rituais e religiosos.",
              },
              {
                badge: "CONAD 01/2010",
                title: "Resolução Deontológica",
                desc: "Regulamentação federal do uso religioso da Ayahuasca no Brasil. Veda o comércio, o turismo espiritual e o lucro, respaldando o rateio operacional de custos.",
              },
              {
                badge: "ANVISA 2025",
                title: "Marco Sanitário Digital",
                desc: "Proibição estrita de e-commerce e venda digital indiscriminada. Nosso portal é 100% institucional, educativo e voltado a pessoas jurídicas religiosas.",
              },
            ].map(({ badge, title, desc }, i) => (
              <AnimateOnScroll key={title} delay={i * 100}>
                <div className="card-liturgico rounded-2xl p-6 space-y-3 h-full flex flex-col justify-between border-ambar-500/20">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-ambar-400 bg-floresta-800/80 px-2 py-0.5 rounded border border-ambar-500/20">
                      {badge}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-areia-100">{title}</h3>
                    <p className="text-xs text-areia-400 leading-relaxed font-light">{desc}</p>
                  </div>
                  <div className="pt-2 border-t border-ambar-500/10 text-[10px] text-ambar-400/80 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Conformidade Estrita</span>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          <AnimateOnScroll className="mt-10 text-center">
            <Link
              href="/compliance"
              className="inline-flex items-center gap-2 text-xs font-semibold text-ambar-400 hover:text-ambar-300 transition-colors"
            >
              <span>Consultar dossiê jurídico completo e protocolos de anamnese</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider variant="minimal" />

      {/* ═══════════════════════════════════════════
          VOZES DOS GUARDIÕES & DIRIGENTES
          ═══════════════════════════════════════════ */}
      <section className="py-section-md lg:py-section-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ambar-400 flex items-center justify-center gap-2">
              <HeartHandshake className="h-3.5 w-3.5" />
              Confiança Litúrgica
            </p>
            <h2 className="font-serif text-display-sm sm:text-display-md font-bold text-areia-100">
              Vozes dos Guardiões & Dirigentes
            </h2>
            <p className="text-sm text-areia-300 max-w-2xl mx-auto leading-relaxed font-light">
              Depoimentos fraternos de dirigentes de congregações parceiras que confiam na fiação da Nativaram.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                nome: "Padrinho Marcelo F.",
                cargo: "Dirigente Espiritual",
                local: "São Paulo • SP",
                graduacao: "Graduação 10.1 Wirapuru",
                depoimento:
                  "O apoio da Nativaram trouxe uma paz inestimável para a nossa casa. Ter a certeza da procedência pura com o Cipó Tucunacá e da reverência ao feitio tradicional acabou com os desconfortos somáticos pesados nos trabalhos. O despacho aéreo via Gollog sempre chega pontual e com a documentação impecável.",
              },
              {
                nome: "Madre Helena S.",
                cargo: "Guardiã Litúrgica",
                local: "Belo Horizonte • MG",
                graduacao: "Graduação 5.1 Pituã & Rapé Sagrado",
                depoimento:
                  "A seriedade documental e o respeito ao sagrado são exemplares. Para nós, dirigentes, a blindagem com base no CONAD nos traz absoluta tranquilidade perante os associados e os órgãos fiscalizadores. É uma verdadeira corrente de luz com a floresta.",
              },
              {
                nome: "Dirigente Renato B.",
                cargo: "Presidente Institucional",
                local: "Curitiba • PR",
                graduacao: "Graduação 7.1 Anhangatã & Gel",
                depoimento:
                  "A estabilidade de cada lote é notável. Não há variações desagradáveis de consistência ou acidez. Adotamos o formato Gel para otimizar o frete aéreo e a experiência foi perfeita. A Nativaram honra a tradição sagrada do Acre com altíssimo rigor técnico e doutrinário.",
              },
            ].map(({ nome, cargo, local, graduacao, depoimento }, i) => (
              <AnimateOnScroll key={nome} delay={i * 120}>
                <div className="card-elevated rounded-2xl p-7 space-y-4 h-full flex flex-col justify-between border-ambar-500/20">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-ambar-500/15 pb-3">
                      <div>
                        <h4 className="font-serif text-sm font-bold text-areia-100">{nome}</h4>
                        <p className="text-[11px] text-ambar-400/90">{cargo} • {local}</p>
                      </div>
                      <span className="text-[10px] font-mono text-areia-400 bg-floresta-800/80 px-2 py-0.5 rounded border border-ambar-500/15">
                        Homologado
                      </span>
                    </div>
                    <p className="text-xs text-areia-300 leading-relaxed italic font-light">
                      &ldquo;{depoimento}&rdquo;
                    </p>
                  </div>
                  <div className="text-[10px] text-ambar-300 font-mono pt-2 border-t border-ambar-500/10">
                    🌿 {graduacao}
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="floresta" />

      {/* ═══════════════════════════════════════════
          PASSO A PASSO DO CREDENCIAMENTO
          ═══════════════════════════════════════════ */}
      <section className="py-section-md lg:py-section-lg bg-floresta-950/70" id="credenciamento-passos">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ambar-400">
              Processo de Homologação Litúrgica
            </p>
            <h2 className="font-serif text-display-sm font-bold text-areia-100">
              Como Credenciar o Seu Templo
            </h2>
            <p className="text-sm text-areia-300 max-w-lg mx-auto font-light">
              O acesso ao sacramento e o apoio logístico exigem validação prévia em 3 etapas formais. Não enviamos a pessoas físicas avulsas.
            </p>
          </AnimateOnScroll>

          {/* Timeline */}
          <div className="relative space-y-8 pl-12 sm:pl-16">
            <div className="timeline-line" />

            {[
              {
                step: "1",
                title: "Preenchimento dos Dados da Entidade",
                desc: "Comprovação da personalidade jurídica religiosa ou associativa — CNPJ ativo, Ata de Constituição, Estatuto Social e endereço da sede cerimonial.",
              },
              {
                step: "2",
                title: "Identificação do Dirigente Responsável",
                desc: "Documentação civil, histórico de condução espiritual de trabalhos e termo de responsabilidade litúrgica perante os associados.",
              },
              {
                step: "3",
                title: "Termo de Adesão à Deontologia (CONAD 01/2010)",
                desc: "Concordância formal com a ausência de fins lucrativos, adoção de protocolos de anamnese (washout de substâncias incompatíveis) e homologação do conselho.",
              },
            ].map(({ step, title, desc }, i) => (
              <AnimateOnScroll key={step} delay={i * 150}>
                <div className="relative">
                  <div className="absolute -left-12 sm:-left-16 top-0">
                    <span className="number-marker">{step}</span>
                  </div>
                  <div className="card-elevated rounded-xl p-6 sm:p-7 space-y-2 border-ambar-500/20">
                    <h3 className="font-serif text-lg font-bold text-areia-100">{title}</h3>
                    <p className="text-xs text-areia-300 leading-relaxed font-light">{desc}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Banner de Ação de Credenciamento */}
          <AnimateOnScroll className="mt-14">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-floresta-900 via-floresta-800 to-floresta-900 p-8 sm:p-10 text-center border border-ambar-500/30 shadow-solar">
              <div className="absolute inset-0 bg-radial-ambar pointer-events-none" />
              <div className="relative space-y-4 max-w-xl mx-auto">
                <div className="inline-flex items-center gap-2 rounded-full bg-ambar-500/20 border border-ambar-500/40 px-3.5 py-1 text-[11px] font-semibold text-ambar-300">
                  <Award className="h-3.5 w-3.5 text-ambar-400" />
                  <span>Adesão Cooperativa para Instituições</span>
                </div>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-areia-100">
                  Deseja iniciar o credenciamento do seu templo?
                </h4>
                <p className="text-xs text-areia-200 leading-relaxed font-light">
                  Preencha o formulário institucional seguro. Nosso conselho entrará em contato para validação dos dados e alinhamento do cronograma cerimonial.
                </p>
                <div className="pt-2">
                  <Link href="/credenciamento" className="btn-primary inline-flex items-center gap-2 text-xs font-semibold px-6 py-3">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Iniciar Formulário de Credenciamento</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider variant="floresta" />

      {/* ═══════════════════════════════════════════
          FAQ INTERATIVO PARA DIRIGENTES
          ═══════════════════════════════════════════ */}
      <section className="py-section-md lg:py-section-lg">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ambar-400">
              Esclarecimentos Litúrgicos & Operacionais
            </p>
            <h2 className="font-serif text-display-sm font-bold text-areia-100">
              Perguntas Frequentes dos Dirigentes
            </h2>
            <p className="text-sm text-areia-300 font-light">
              Respostas claras sobre a sacralidade, as linhagens doutrinárias, o transporte Gollog e o padrão do feitio.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <FaqAccordion items={faqItems} />
          </AnimateOnScroll>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PORTAL DO DIRIGENTE TEASER & CTA FINAL
          ═══════════════════════════════════════════ */}
      <section className="pb-section-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="card-liturgico rounded-2xl p-7 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border-ambar-500/30 bg-floresta-900/70 shadow-solar">
              <div className="flex items-center gap-5 text-center md:text-left">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-floresta-800 border border-ambar-500/30 text-ambar-400 shrink-0 shadow-elevated">
                  <Lock className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-lg font-bold text-areia-100">
                    Já é uma instituição credenciada pela Nativaram?
                  </h4>
                  <p className="text-xs text-areia-300 font-light max-w-lg">
                    Acesse o ambiente restrito do dirigente para emissão de laudos de custódia, rastreamento de remessas aéreas Gollog e acompanhamento do rateio cooperativo.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link href="/portal-dirigente" className="btn-secondary text-xs font-semibold px-5 py-2.5">
                  Acessar Portal do Dirigente
                </Link>
                <Link href="/contato" className="btn-primary text-xs font-semibold px-5 py-2.5">
                  Falar com Guardiões
                </Link>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}

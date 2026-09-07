import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
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
} from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionDivider } from "@/components/ui/SectionDivider";

export const metadata: Metadata = {
  title: "Ciência do Feitio Purista & Botânica Sagrada | Nativaram Brasil",
  description:
    "Registro documental do feitio tradicional da Ayahuasca em Cruzeiro do Sul/AC. Cipó Tucunacá, fitoquímica comparativa, sistema de graduações daimistas (3.1 a 10.1) e controle fitoquímico purista.",
  openGraph: {
    title: "Ciência do Feitio Purista & Botânica | Nativaram Brasil",
    description:
      "Registro documental fotográfico do feitio ancestral da Ayahuasca no Acre: Cipó Tucunacá e Folha Chacrona Rainha.",
    images: [
      {
        url: "/assets/feitio/curadas/feitio-noturno-caldeiroes.jpg",
        width: 1200,
        height: 800,
        alt: "Caldeirões acesos no feitio noturno da Ayahuasca em Cruzeiro do Sul, Acre",
      },
    ],
  },
};

export default function FeitioPage() {
  return (
    <div className="space-y-0">
      {/* ═══════════════════════════════════════════
          HERO — Registro Documental Cinematográfico
          ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-section-lg lg:py-section-xl">
        {/* Glow de fundo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-ambar-500/[0.06] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <AnimateOnScroll>
              <div className="inline-flex items-center gap-2 rounded-full border border-ambar-500/20 bg-floresta-900/70 backdrop-blur-md px-4 py-1.5 text-[11px] font-semibold tracking-[0.15em] text-ambar-400 uppercase">
                <FlaskConical className="h-3.5 w-3.5" />
                <span>Registro Documental • Cruzeiro do Sul, Acre</span>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={150}>
              <h1 className="font-serif text-display-md sm:text-display-lg lg:text-display-xl font-bold text-areia-100 text-glow leading-[1.08]">
                A Ciência do{" "}
                <span className="text-gradient-solar">
                  Feitio Purista
                </span>
              </h1>
            </AnimateOnScroll>

            <AnimateOnScroll delay={300}>
              <p className="text-base sm:text-lg text-areia-300 leading-relaxed max-w-2xl mx-auto font-light">
                Rigor cerimonial, dietas de isolamento na floresta amazônica e fitoquímica ancestral. Conheça em detalhes o preparo do sacramento sagrado pelas mãos de nossos mestres feitores.
              </p>
            </AnimateOnScroll>
          </div>

          {/* Hero Feature Image: Feitio Noturno */}
          <AnimateOnScroll delay={400}>
            <div className="relative overflow-hidden rounded-2xl border border-ambar-500/30 bg-floresta-950 shadow-elevated group">
              <div className="relative h-72 sm:h-96 md:h-[520px] w-full">
                <Image
                  src="/assets/feitio/curadas/feitio-noturno-caldeiroes.jpg"
                  alt="Casa de feitio em Cruzeiro do Sul/AC com os caldeirões fumegantes na noite amazônica"
                  fill
                  priority
                  className="object-cover object-center brightness-95 contrast-105 group-hover:scale-[1.02] transition-transform duration-700"
                  sizes="(max-width: 1280px) 100vw, 1200px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-floresta-950 via-floresta-950/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                  <div className="space-y-2 max-w-xl">
                    <div className="inline-flex items-center gap-2 rounded-full bg-ambar-500/20 px-3.5 py-1 text-[11px] font-semibold text-ambar-300 backdrop-blur-md border border-ambar-500/30">
                      <Flame className="h-3.5 w-3.5 text-ambar-400 animate-flicker" />
                      <span>Feitio Ancestral sob Vigília Espiritual</span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-areia-100 drop-shadow-md">
                      Casa de Feitio em Cruzeiro do Sul, Acre
                    </h3>
                    <p className="text-xs sm:text-sm text-areia-200/90 leading-relaxed drop-shadow font-light">
                      Vapor perfumado de cipó e chacrona subindo dos caldeirões de aço inox sob a noite da floresta, em rezo contínuo de consagração e purificação.
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-xs text-ambar-300/90 bg-floresta-900/90 px-4 py-2.5 rounded-xl border border-ambar-500/30 backdrop-blur-md font-mono">
                    Amazônia Ocidental • Ponto Zero
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider variant="solar" />

      {/* ═══════════════════════════════════════════
          O CIPÓ TUCUNACÁ VS CAUPURI
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
          <AnimateOnScroll>
            <div className="card-elevated rounded-2xl p-6 sm:p-10 lg:p-12 space-y-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-ambar-500/20 pb-6">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-ambar-400">
                    <Compass className="h-4 w-4" />
                    <span>Botânica Tradicional Comparativa</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-areia-100">
                    O Cipó Tucunacá vs Caupuri
                  </h2>
                </div>
                <div className="rounded-full bg-ambar-500/10 px-4 py-1.5 text-xs font-medium text-ambar-300 border border-ambar-500/20">
                  Taxonomia e Alcaloides RIMA
                </div>
              </div>

              <p className="text-sm sm:text-base text-areia-300 leading-relaxed">
                Enquanto a taxonomia botânica clássica agrupa as variedades de <em>Banisteriopsis caapi</em> sob uma única denominação de espécie, os mestres feitores da floresta distinguem rigorosamente seus etnotáxons. A <strong>Nativaram Brasil</strong> utiliza exclusivamente o <strong>Cipó Tucunacá</strong> (<em>B. caapi var. Tucunaca</em>), de caule cilíndrico e liso, colhido em manejo sustentável na floresta nativa do Acre.
              </p>

              {/* Grid com as fotos reais da colheita e preparo do cipó */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Foto 1: Colheita do Cipó com o Feitor */}
                <div className="group overflow-hidden rounded-xl border border-ambar-500/30 bg-floresta-950 space-y-3">
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                    <Image
                      src="/assets/feitio/curadas/feitio-cipo-colheita.jpg"
                      alt="Pilhas de Cipó Mariri Tucunacá colhido com o feitor caboclo na estrutura de manejo no Acre"
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-floresta-950 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 rounded-full bg-floresta-900/90 border border-ambar-500/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-ambar-400">
                      Colheita e Seleção
                    </span>
                  </div>
                  <div className="p-5 pt-1 space-y-1.5">
                    <h4 className="font-serif text-base font-bold text-areia-100">
                      Manejo e Pesagem de Cipó Tucunacá
                    </h4>
                    <p className="text-xs text-areia-400 leading-relaxed">
                      Pilhas de cipó cilíndrico com seleção minuciosa na estrutura rústica de manejo em Cruzeiro do Sul/AC. Matéria-prima colhida na maturidade plena e pesada com rigor.
                    </p>
                  </div>
                </div>

                {/* Foto 2: Folhas de Chacrona e Cipó no Caldeirão */}
                <div className="group overflow-hidden rounded-xl border border-ambar-500/30 bg-floresta-950 space-y-3">
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                    <Image
                      src="/assets/feitio/curadas/feitio-panelas-chacrona-cipo.jpg"
                      alt="Camadas de Cipó macerado cobertas com folhas verdes frescas de Chacrona Rainha"
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-floresta-950 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 rounded-full bg-floresta-900/90 border border-ambar-500/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-ambar-400">
                      Binômio Consagrado
                    </span>
                  </div>
                  <div className="p-5 pt-1 space-y-1.5">
                    <h4 className="font-serif text-base font-bold text-areia-100">
                      Acomodação de Chacrona e Mariri
                    </h4>
                    <p className="text-xs text-areia-400 leading-relaxed">
                      Folhas viçosas de <em>Psychotria viridis</em> (Chacrona Rainha) intercaladas em camadas precisas sobre o Cipó macerado dentro dos tachos de aço inoxidável.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tabela Comparativa de Fitoquímica */}
              <div className="space-y-4 pt-2">
                <h3 className="font-serif text-lg font-bold text-areia-100">
                  Perfil Cromatográfico dos Alcaloides Harmala
                </h3>
                <div className="overflow-x-auto rounded-xl border border-ambar-500/30 shadow-inner">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-floresta-900 text-ambar-400 border-b border-ambar-500/30">
                      <tr>
                        <th className="p-4 font-serif text-sm">Alcaloide Harmala</th>
                        <th className="p-4 font-serif text-sm">Concentração (mg/g)</th>
                        <th className="p-4 font-serif text-sm">Ação Farmacológica & Efeito Litúrgico</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ambar-500/10 text-areia-300">
                      <tr className="bg-floresta-950/70 hover:bg-floresta-900/40 transition-colors">
                        <td className="p-4 font-semibold text-areia-100 flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-ambar-400" />
                          Harmina
                        </td>
                        <td className="p-4 font-mono text-amber-300 font-bold">9,21 mg/g</td>
                        <td className="p-4">Inibição reversível e seletiva da enzima MAO-A (RIMA), garantindo a ativação oral do sacramento.</td>
                      </tr>
                      <tr className="bg-floresta-900/40 hover:bg-floresta-900/60 transition-colors">
                        <td className="p-4 font-semibold text-areia-100 flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-ambar-400" />
                          Tetra-hidroharmina (THH)
                        </td>
                        <td className="p-4 font-mono text-amber-300 font-bold">4,20 mg/g</td>
                        <td className="p-4">Modulação serotoninérgica (SERT fraco); sustenta o estado contemplativo límpido e sereno.</td>
                      </tr>
                      <tr className="bg-floresta-950/70 hover:bg-floresta-900/40 transition-colors">
                        <td className="p-4 font-semibold text-areia-100 flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-emerald-400" />
                          Harmalina
                        </td>
                        <td className="p-4 font-mono text-emerald-400 font-bold">0,65 mg/g (Nível Traço)</td>
                        <td className="p-4">Teor residual. A baixa concentração evita tremores motores violentos, taquicardias e desconforto somático severo.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="rounded-xl border border-ambar-500/20 bg-floresta-950/90 p-5 text-xs text-areia-300 leading-relaxed flex items-start gap-3.5">
                  <ShieldCheck className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-400">Diferença Somática Crucial:</strong> O cipó da variedade <em>Caupuri</em> (com nós esféricos e calosidades) acumula elevados índices de harmalina, causadora de náuseas abruptas, tremores motores e oscilações bruscas de pressão arterial. O <strong>Tucunacá</strong> nativo que utilizamos proporciona firmeza interior, ancoramento equilibrado e uma travessia cerimonial lúcida e segura.
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider variant="botanical" />

      {/* ═══════════════════════════════════════════
          BENTO GALLERY DOCUMENTAL: ALQUIMIA EM INOX
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <AnimateOnScroll>
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold text-ambar-400 uppercase tracking-[0.15em]">
                <Droplets className="h-4 w-4" />
                <span>Cozimento e Concentração Térmica</span>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={150}>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-areia-100">
                A Alquimia nos Tachos de Aço Inoxidável
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll delay={300}>
              <p className="text-xs sm:text-sm text-areia-400 font-light">
                Registros fotográficos do processo de cozimento contínuo, controle de temperatura e redução do chá sagrado.
              </p>
            </AnimateOnScroll>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Foto 1: Fileira de Caldeirões */}
            <AnimateOnScroll delay={100}>
              <div className="card-elevated overflow-hidden rounded-2xl border border-ambar-500/20 group h-full flex flex-col justify-between">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src="/assets/feitio/curadas/feitio-caldeiroes-fileira.jpg"
                    alt="Fileira de caldeirões em inox fumegando na casa de feitio em Cruzeiro do Sul"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-floresta-950 via-transparent to-transparent" />
                </div>
                <div className="p-5 space-y-1.5">
                  <h4 className="font-serif text-base font-bold text-areia-100">
                    Bateria de Caldeirões em Inox
                  </h4>
                  <p className="text-xs text-areia-400 leading-relaxed font-light">
                    Estrutura com água pura de nascente amazônica e controle gradual de evaporação.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Foto 2: Fervura do Chá de Chacrona */}
            <AnimateOnScroll delay={200}>
              <div className="card-elevated overflow-hidden rounded-2xl border border-ambar-500/20 group h-full flex flex-col justify-between">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src="/assets/feitio/curadas/feitio-fervura-chacrona.jpg"
                    alt="Chá de Ayahuasca fervendo avermelhado e borbulhante sendo mexido com remo de madeira"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-floresta-950 via-transparent to-transparent" />
                </div>
                <div className="p-5 space-y-1.5">
                  <h4 className="font-serif text-base font-bold text-areia-100">
                    Redução Fitoquímica e Agitação
                  </h4>
                  <p className="text-xs text-areia-400 leading-relaxed font-light">
                    O sacramento borbulhante em tom avermelhado característico, com extração completa dos alcaloides.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Foto 3: Garrafa no Tronco */}
            <AnimateOnScroll delay={300}>
              <div className="card-elevated overflow-hidden rounded-2xl border border-ambar-500/20 group h-full flex flex-col justify-between sm:col-span-2 lg:col-span-1">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src="/assets/feitio/curadas/feitio-garrafa-tronco.jpg"
                    alt="Frasco de Ayahuasca pura recém-feita erguido contra o tronco na floresta do Acre"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-floresta-950 via-transparent to-transparent" />
                </div>
                <div className="p-5 space-y-1.5">
                  <h4 className="font-serif text-base font-bold text-areia-100">
                    O Sacramento Envasado
                  </h4>
                  <p className="text-xs text-areia-400 leading-relaxed font-light">
                    Cor profunda, consistência nobre e pureza inalterada, mantida sob estrito padrão sanitário.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Registro em Vídeo do Feitio */}
          <AnimateOnScroll delay={400}>
            <div className="overflow-hidden rounded-2xl border border-ambar-500/30 bg-floresta-950/90 shadow-elevated p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-ambar-500/20 pb-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 text-[11px] font-semibold text-ambar-400 uppercase tracking-[0.15em]">
                    <Flame className="h-3.5 w-3.5 text-ambar-400" />
                    <span>Vigília em Movimento • Registro em Vídeo</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-areia-100">
                    O Borbulhar da Medicina no Caldeirão
                  </h3>
                </div>
                <span className="text-[11px] font-medium text-ambar-300/90 bg-floresta-900/90 px-3.5 py-1.5 rounded-full border border-ambar-500/20">
                  Vídeo Original do Feitio • Cruzeiro do Sul/AC
                </span>
              </div>
              <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-xl overflow-hidden border border-ambar-500/30 bg-black shadow-inner">
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
                Cozimento tradicional nos tachos de inox com remo de madeira: a vaporização lenta preserva a pureza fitoquímica dos alcaloides e o respeito ao rezo sagrado da floresta.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider variant="minimal" />

      {/* ═══════════════════════════════════════════
          SISTEMA DE GRADUAÇÕES & COOPERATIVISMO PRODUTIVO
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
          <AnimateOnScroll>
            <div className="card-elevated rounded-2xl p-6 sm:p-10 lg:p-12 space-y-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-ambar-500/20 pb-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-floresta-900 border border-ambar-500/30 text-ambar-400">
                    <Scale className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-areia-100">
                      Sistema de Graduações & Cooperativismo Produtivo
                    </h2>
                    <p className="text-xs text-ambar-400 font-medium">
                      Padronização tradicional por proporção de biomassa, tempo de fervura e apoio mútuo
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-ambar-500/10 border border-ambar-500/30 px-3.5 py-1.5 text-xs font-semibold text-ambar-300">
                  Sem Fins Lucrativos • Cooperativismo Produtivo
                </span>
              </div>

              <p className="text-sm sm:text-base text-areia-300 leading-relaxed">
                Sob o modelo de <strong>cooperativismo produtivo</strong>, a Nativaram une congregações guardiãs e mestres feitores em uma rede fraterna de sustentação mútua. Todo o aporte cooperativo cobre exclusivamente os custos dos dias de feitio no Acre, os honorários dignos da família do feitor caboclo, as diárias de colheita sustentável e a logística de transporte seguro de Cruzeiro do Sul/AC até os templos homologados em todo o Brasil.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 overflow-x-auto rounded-xl border border-ambar-500/30 shadow-inner">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-floresta-900 text-ambar-400 border-b border-ambar-500/30">
                      <tr>
                        <th className="p-4 font-serif text-sm">Graduação Sagrada</th>
                        <th className="p-4 font-serif text-sm">Porção Sugerida</th>
                        <th className="p-4 font-serif text-sm">Duração Rito</th>
                        <th className="p-4 font-serif text-sm">Cooperativismo Produtivo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ambar-500/10 text-areia-300">
                      <tr className="bg-floresta-950/70 hover:bg-floresta-900/40 transition-colors">
                        <td className="p-4 font-semibold text-areia-100">
                          <div>3.1 Mainumbi <span className="text-areia-400 font-normal italic">(Beija-flor)</span></div>
                          <span className="text-[10px] text-ambar-400/80 font-normal">Voo suave, acolhedor e participantes iniciantes</span>
                        </td>
                        <td className="p-4 font-mono text-areia-200">90 a 120 ml</td>
                        <td className="p-4">2 a 3 horas</td>
                        <td className="p-4 font-medium text-amber-300">Tabela Evolutiva sob Demanda</td>
                      </tr>
                      <tr className="bg-floresta-900/40 hover:bg-floresta-900/60 transition-colors">
                        <td className="p-4 font-semibold text-areia-100">
                          <div>5.1 Pituã <span className="text-areia-400 font-normal italic">(Bem-te-vi)</span></div>
                          <span className="text-[10px] text-ambar-400/80 font-normal">Equilíbrio estável, firmeza e harmonização geral</span>
                        </td>
                        <td className="p-4 font-mono text-areia-200">70 a 100 ml</td>
                        <td className="p-4">3 horas</td>
                        <td className="p-4 font-medium text-amber-300">Tabela Evolutiva sob Demanda</td>
                      </tr>
                      <tr className="bg-floresta-950/70 hover:bg-floresta-900/40 transition-colors">
                        <td className="p-4 font-semibold text-areia-100">
                          <div>7.1 Anhangatã <span className="text-areia-400 font-normal italic">(Rouxinol)</span></div>
                          <span className="text-[10px] text-ambar-400/80 font-normal">Canto profundo, imersão e ressignificação íntima</span>
                        </td>
                        <td className="p-4 font-mono text-areia-200">50 a 90 ml</td>
                        <td className="p-4">3 a 4 horas</td>
                        <td className="p-4 font-medium text-amber-300">Tabela Evolutiva sob Demanda</td>
                      </tr>
                      <tr className="bg-floresta-900/90 hover:bg-floresta-900 transition-colors">
                        <td className="p-4 font-bold text-ambar-400">
                          <div>10.1 Wirapuru <span className="text-ambar-300 font-normal italic">(Semi-Mel)</span></div>
                          <span className="text-[10px] text-areia-300 font-normal">Concentração densa, miração prolongada e alta egrégora</span>
                        </td>
                        <td className="p-4 font-mono text-areia-200">30 a 50 ml</td>
                        <td className="p-4">4 a 5 horas</td>
                        <td className="p-4 font-bold text-amber-300">Tabela Evolutiva sob Demanda</td>
                      </tr>
                      <tr className="bg-floresta-950/90 border-t border-ambar-500/20 hover:bg-floresta-900/40 transition-colors">
                        <td className="p-4 font-semibold text-ambar-300" colSpan={2}>
                          <div>Outras Graduações Sob Medida</div>
                          <span className="text-[10px] text-areia-400 font-normal">Graduações intermediárias ou feitios específicos adaptados à linhagem litúrgica do templo</span>
                        </td>
                        <td className="p-4 italic text-areia-400">Sob demanda</td>
                        <td className="p-4 font-semibold text-ambar-400">Mediante combinado antecipado</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Imagem do Lote Feito */}
                <div className="lg:col-span-4 rounded-xl border border-ambar-500/30 overflow-hidden bg-floresta-950 space-y-2 group">
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src="/assets/feitio/curadas/feitio-lote-garrafas.jpg"
                      alt="Centenas de garrafas de Ayahuasca alinhadas no chão resfriando após o feitio em Cruzeiro do Sul"
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-3 text-[11px] text-areia-400 leading-tight text-center font-light">
                    Lote litúrgico recém-confeccionado sob demanda em repouso e resfriamento natural no Acre.
                  </div>
                </div>
              </div>

              {/* Bloco de Tabela Evolutiva */}
              <div className="rounded-xl border border-ambar-500/20 bg-floresta-900/50 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="font-serif text-sm sm:text-base font-bold text-areia-100 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-ambar-400" />
                    Tabela Evolutiva de Apoio Cooperativo
                  </h4>
                  <p className="text-xs text-areia-300/90 leading-relaxed max-w-3xl">
                    Praticamos uma <strong>tabela evolutiva de valores mediante a quantidade solicitada</strong> pela instituição: quanto maior o volume programado em conjunto pelo templo, mais otimizamos a logística e a colheita, reduzindo proporcionalmente a cota unitária por litro. A tabela detalhada com projeções é disponibilizada diretamente aos dirigentes cadastrados.
                  </p>
                </div>
                <Link
                  href="/credenciamento"
                  className="btn-primary text-xs flex-shrink-0 inline-flex items-center gap-2 font-bold uppercase tracking-wider"
                >
                  <span>Consultar Tabela</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* SEÇÃO ESPECIAL: MEDICINA MEL & MEDICINA GEL */}
              <div className="pt-6 border-t border-ambar-500/20 space-y-6">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 text-[11px] font-semibold text-ambar-400 uppercase tracking-[0.15em]">
                    <Droplets className="h-3.5 w-3.5 text-ambar-400" />
                    <span>Inovação Tradicional • Redução de Volume e Custos Logísticos</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-areia-100">
                    Formatos Especiais: Medicina Mel & Medicina Gel
                  </h3>
                  <p className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
                    Dependendo da necessidade específica e da localização do templo, produzimos o sacramento também nas consistências <strong>Mel</strong> e <strong>Gel</strong>. Essas formas foram desenvolvidas para <strong>melhorar ainda mais os custos logísticos e operacionais</strong> de transporte interestadual, garantindo altíssima conservação e conveniência para as instituições congregais.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Card Medicina Mel */}
                  <div className="rounded-xl border border-ambar-500/30 bg-gradient-to-br from-floresta-900/90 to-floresta-950 p-6 space-y-4 hover:border-ambar-400/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ambar-500/10 border border-ambar-500/30 text-ambar-400">
                          <Droplets className="h-5 w-5" />
                        </div>
                        <h4 className="font-serif text-lg font-bold text-areia-100">
                          Medicina Mel
                        </h4>
                      </div>
                      <span className="rounded-full bg-ambar-500/15 border border-ambar-500/30 px-3 py-1 text-[10px] font-semibold text-ambar-300 uppercase tracking-wider">
                        Valores a Combinar
                      </span>
                    </div>
                    <p className="text-xs text-areia-300 leading-relaxed font-light">
                      Feitio submetido a processo de evaporação branda e lenta até atingir textura espessa e untuosa como o mel da mata. Reduz drasticamente o volume e peso para envio aéreo e rodoviário, gerando economia expressiva para congregações distantes do Acre, com diluição litúrgica facilitada ou consagração concentrada.
                    </p>
                    <div className="pt-2 border-t border-ambar-500/10 flex items-center justify-between text-[11px] text-ambar-400/80">
                      <span>Eficiência Logística: <strong>Até 70% menos volume</strong></span>
                      <span className="italic">Feitio sob demanda</span>
                    </div>
                  </div>

                  {/* Card Medicina Gel */}
                  <div className="rounded-xl border border-ambar-500/30 bg-gradient-to-br from-floresta-900/90 to-floresta-950 p-6 space-y-4 hover:border-ambar-400/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ambar-500/10 border border-ambar-500/30 text-ambar-400">
                          <Layers className="h-5 w-5" />
                        </div>
                        <h4 className="font-serif text-lg font-bold text-areia-100">
                          Medicina Gel
                        </h4>
                      </div>
                      <span className="rounded-full bg-ambar-500/15 border border-ambar-500/30 px-3 py-1 text-[10px] font-semibold text-ambar-300 uppercase tracking-wider">
                        Valores a Combinar
                      </span>
                    </div>
                    <p className="text-xs text-areia-300 leading-relaxed font-light">
                      Extrato sacramental de altíssima concentração fitoquímica e textura gelatinosa estável. Desenvolvido para máxima conservação biológica sem necessidade de refrigeração imediata agressiva durante trajetos complexos. Solução primordial para reservas litúrgicas estratégicas da congregação.
                    </p>
                    <div className="pt-2 border-t border-ambar-500/10 flex items-center justify-between text-[11px] text-ambar-400/80">
                      <span>Conservação: <strong>Estabilidade fitoquímica estendida</strong></span>
                      <span className="italic">Feitio sob demanda</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-floresta-950/70 border border-ambar-500/20 p-4 text-center text-xs text-areia-400 font-light">
                  <span className="text-ambar-300 font-medium">Nota aos Dirigentes:</span> As medicinas nas consistências Mel e Gel e as graduações personalizadas necessitam de planejamento antecipado junto ao feitor caboclo devido ao ciclo estendido de fervura e colheita. Os valores e cotas operacionais são <strong>a combinar</strong> de acordo com a escala solicitada pela instituição.
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider variant="solar" />

      {/* ═══════════════════════════════════════════
          CADEIA DE CUSTÓDIA & LOGÍSTICA REFRIGERADA
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
          <AnimateOnScroll>
            <div className="card-elevated rounded-2xl p-6 sm:p-10 lg:p-12 space-y-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-floresta-900 border border-ambar-500/30 text-ambar-400">
                  <PackageCheck className="h-6 w-6" />
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-areia-100">
                  Cadeia de Custódia & Logística Segura
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-5 rounded-xl border border-ambar-500/30 overflow-hidden bg-floresta-950 group">
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src="/assets/feitio/curadas/feitio-embalagem-custodia.jpg"
                      alt="Garrafas de sacramento acomodadas em caixa térmica isotérmica lacrada para envio refrigerado"
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>
                  <div className="p-3.5 text-center text-xs text-areia-400 font-light">
                    Caixa térmica isotérmica lacrada com número de lote para dirigentes.
                  </div>
                </div>

                <div className="md:col-span-7 space-y-5 text-xs sm:text-sm text-areia-300 leading-relaxed">
                  <p>
                    Para assegurar a não-degradação biológica e a conservação estrita dos princípios fitoquímicos, todo o envio litúrgico é realizado em recipientes isotérmicos vedados com rastreabilidade de lote.
                  </p>
                  <ul className="space-y-3 text-xs text-areia-300">
                    <li className="flex items-start gap-3 p-3 rounded-lg bg-floresta-950/60 border border-ambar-500/10">
                      <CheckCircle2 className="h-4 w-4 text-ambar-400 flex-shrink-0 mt-0.5" />
                      <span><strong>Origem Declarada:</strong> Cruzeiro do Sul/AC com laudo fitoquímico e comprovante de procedência botânica.</span>
                    </li>
                    <li className="flex items-start gap-3 p-3 rounded-lg bg-floresta-950/60 border border-ambar-500/10">
                      <CheckCircle2 className="h-4 w-4 text-ambar-400 flex-shrink-0 mt-0.5" />
                      <span><strong>Destinatário Exclusivo:</strong> Dirigentes e templos religiosos registrados com ata homologada.</span>
                    </li>
                    <li className="flex items-start gap-3 p-3 rounded-lg bg-floresta-950/60 border border-ambar-500/10">
                      <CheckCircle2 className="h-4 w-4 text-ambar-400 flex-shrink-0 mt-0.5" />
                      <span><strong>Prazo Mandatório:</strong> Pedido mínimo com 30 dias de antecedência para respeitar o ciclo do rezo e do feitio.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* CTA Banner */}
          <AnimateOnScroll delay={200}>
            <div className="text-center pt-8">
              <Link
                href="/credenciamento"
                className="btn-primary inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider"
              >
                <Sparkles className="h-4 w-4" />
                <span>Solicitar Credenciamento Litúrgico do Templo</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}

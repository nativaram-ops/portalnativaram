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
} from "lucide-react";
import { AnimateOnScroll, StaggerChildren } from "@/components/ui/AnimateOnScroll";
import { SectionDivider } from "@/components/ui/SectionDivider";

export default function HomePage() {
  return (
    <div className="space-y-0">
      {/* ═══════════════════════════════════════════
          HERO — Full Viewport Cinematic
          ═══════════════════════════════════════════ */}
      <section className="relative h-[90vh] min-h-[600px] max-h-[1000px] flex items-end overflow-hidden">
        {/* Background Image */}
        <Image
          src="/assets/feitio/curadas/feitio-noturno-caldeiroes.jpg"
          alt="Feitio da Ayahuasca em Cruzeiro do Sul, Acre — caldeirões fumegantes na noite amazônica"
          fill
          priority
          className="object-cover object-center brightness-[0.6]"
          sizes="100vw"
        />

        {/* Gradient Overlay */}
        <div className="gradient-hero-overlay absolute inset-0" />

        {/* Radial glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-ambar-500/[0.06] rounded-full blur-[120px] pointer-events-none" />

        {/* Content */}
        <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24 z-10">
          <div className="max-w-3xl space-y-6">
            <AnimateOnScroll delay={200}>
              <div className="inline-flex items-center gap-2 rounded-full border border-ambar-500/30 bg-floresta-950/60 backdrop-blur-md px-4 py-1.5 text-[11px] font-semibold tracking-[0.15em] text-ambar-400 uppercase">
                <Sparkles className="h-3 w-3" />
                <span>Salvaguarda Litúrgica & Cooperativismo</span>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={400}>
              <h1 className="font-serif text-display-sm sm:text-display-md lg:text-display-lg font-bold text-areia-100 text-glow">
                Preservação, Pureza
                <br />
                <span className="text-gradient-solar">& Acesso Legal</span>
                <br />
                <span className="text-areia-200/90">ao Sacramento</span>
              </h1>
            </AnimateOnScroll>

            <AnimateOnScroll delay={600}>
              <p className="text-sm sm:text-base text-areia-300/80 leading-relaxed max-w-xl">
                Ponte ética e fitoquímica entre a Amazônia Ocidental e os templos
                religiosos de todo o Brasil. Feitio purista, conformidade
                jurídica e apoio operacional cooperativo.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={800}>
              <div className="flex flex-col sm:flex-row items-start gap-3 pt-2">
                <Link href="/credenciamento" className="btn-primary">
                  <span>Solicitar Credenciamento</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/feitio" className="btn-secondary">
                  <FlaskConical className="h-4 w-4 text-ambar-400" />
                  <span>Ciência do Feitio</span>
                </Link>
              </div>
            </AnimateOnScroll>
          </div>
        </div>

        {/* Location Badge */}
        <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-floresta-950/70 backdrop-blur-md border border-ambar-500/20 px-3 py-1.5 text-[10px] font-medium text-ambar-300/80">
            <Flame className="h-3 w-3 text-ambar-400" />
            Cruzeiro do Sul • Acre • Amazônia
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TRUST BADGES (under hero)
          ═══════════════════════════════════════════ */}
      <section className="bg-floresta-950 border-b border-ambar-500/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { icon: CheckCircle2, text: "Cipó Tucunacá Puro" },
              { icon: CheckCircle2, text: "Sem Fins Lucrativos" },
              { icon: CheckCircle2, text: "Manejo Sustentável no Acre" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-areia-400"
              >
                <Icon className="h-3.5 w-3.5 text-ambar-500/70 flex-shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          OS 4 PILARES — Numbered Cards
          ═══════════════════════════════════════════ */}
      <section className="py-section-md lg:py-section-lg" id="pilares">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ambar-400/80">
              Fundações & Deontologia
            </p>
            <h2 className="font-serif text-display-sm sm:text-display-md font-bold text-areia-100">
              Os Quatro Pilares
            </h2>
            <p className="text-sm text-areia-400 leading-relaxed max-w-xl mx-auto">
              Como cooperativa, asseguramos que o sacramento seja partilhado com
              rigor técnico, legitimidade jurídica e veneração espiritual.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {[
              {
                num: "01",
                icon: FlaskConical,
                title: "Ciência do Feitio Purista",
                desc: "Exclusividade do binômio Cipó Tucunacá (caule liso) e Chacrona Rainha. Sem aditivos químicos ou polifarmácia.",
              },
              {
                num: "02",
                icon: Scale,
                title: "Legalidade & CONAD",
                desc: "Amparo constitucional (Art. 5º CF/88), Lei de Drogas (11.343/06), Resolução CONAD 01/2010 e Marco ANVISA 2025.",
              },
              {
                num: "03",
                icon: HeartHandshake,
                title: "Apoio aos Templos",
                desc: "Solução cooperativa para congregações sem estrutura fabril própria na Amazônia. Estabilidade e laudos de custódia.",
              },
              {
                num: "04",
                icon: Leaf,
                title: "Manejo Regenerativo",
                desc: "Comércio justo com casas de plantas locais. Preservação da Ararajuba (Guaruba guarouba) e espécies nativas.",
              },
            ].map(({ num, icon: Icon, title, desc }, i) => (
              <AnimateOnScroll key={num} delay={i * 150}>
                <div className="card-elevated rounded-2xl p-8 space-y-5 h-full">
                  <div className="flex items-start gap-5">
                    <span className="number-marker">{num}</span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-ambar-500/25 bg-floresta-800/60 text-ambar-400">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-areia-100">
                    {title}
                  </h3>
                  <p className="text-xs text-areia-400 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="solar" />

      {/* ═══════════════════════════════════════════
          REGISTRO DOCUMENTAL — Editorial Layout
          ═══════════════════════════════════════════ */}
      <section className="py-section-md lg:py-section-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="max-w-2xl space-y-3 mb-16">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ambar-400/80 flex items-center gap-2">
              <Flame className="h-3.5 w-3.5" />
              Registro Documental de Origem
            </p>
            <h2 className="font-serif text-display-sm sm:text-display-md font-bold text-areia-100">
              Do Coração da Floresta
              <br />
              <span className="text-gradient-solar">ao Seu Altar</span>
            </h2>
          </AnimateOnScroll>

          {/* Editorial alternating layout */}
          <div className="space-y-12 lg:space-y-16">
            {/* Step 1 */}
            <AnimateOnScroll>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                <div className="lg:col-span-7 image-reveal rounded-2xl overflow-hidden border border-ambar-500/15">
                  <div className="relative h-64 sm:h-80 lg:h-96">
                    <Image
                      src="/assets/feitio/curadas/feitio-cipo-colheita.jpg"
                      alt="Colheita de Cipó Mariri no Acre"
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  </div>
                </div>
                <div className="lg:col-span-5 space-y-3">
                  <span className="text-[10px] font-bold text-ambar-400 uppercase tracking-[0.2em]">
                    01 — Colheita & Seleção
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-areia-100">
                    Cipó Tucunacá Nativo
                  </h3>
                  <p className="text-sm text-areia-400 leading-relaxed">
                    Manejo sustentável e seleção criteriosa dos caules lisos em
                    Cruzeiro do Sul/AC. Matéria-prima colhida na maturidade
                    plena pelo feitor caboclo.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Step 2 — reversed */}
            <AnimateOnScroll>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                <div className="lg:col-span-5 space-y-3 lg:order-1">
                  <span className="text-[10px] font-bold text-ambar-400 uppercase tracking-[0.2em]">
                    02 — O Binômio Sagrado
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-areia-100">
                    Camadas de Chacrona
                  </h3>
                  <p className="text-sm text-areia-400 leading-relaxed">
                    Folhas frescas de <em>Psychotria viridis</em> (Chacrona
                    Rainha) consorciadas ao cipó macerado nos tachos de aço
                    inoxidável.
                  </p>
                </div>
                <div className="lg:col-span-7 lg:order-2 image-reveal rounded-2xl overflow-hidden border border-ambar-500/15">
                  <div className="relative h-64 sm:h-80 lg:h-96">
                    <Image
                      src="/assets/feitio/curadas/feitio-panelas-chacrona-cipo.jpg"
                      alt="Chacrona e Cipó no tacho"
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Step 3 */}
            <AnimateOnScroll>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                <div className="lg:col-span-7 image-reveal rounded-2xl overflow-hidden border border-ambar-500/15">
                  <div className="relative h-64 sm:h-80 lg:h-96">
                    <Image
                      src="/assets/feitio/curadas/feitio-lote-garrafas.jpg"
                      alt="Lote de Ayahuasca resfriando"
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  </div>
                </div>
                <div className="lg:col-span-5 space-y-3">
                  <span className="text-[10px] font-bold text-ambar-400 uppercase tracking-[0.2em]">
                    03 — Resfriamento Natural
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-areia-100">
                    Lote Padronizado
                  </h3>
                  <p className="text-sm text-areia-400 leading-relaxed">
                    Repouso cerimonial dos frascos envasados sob estrito controle
                    higiênico e energético antes da distribuição litúrgica.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Step 4 — reversed */}
            <AnimateOnScroll>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                <div className="lg:col-span-5 space-y-3 lg:order-1">
                  <span className="text-[10px] font-bold text-ambar-400 uppercase tracking-[0.2em]">
                    04 — Cadeia de Custódia
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-areia-100">
                    Envio Isotérmico
                  </h3>
                  <p className="text-sm text-areia-400 leading-relaxed">
                    Remessa aérea protegida com laudo de lote diretamente para
                    templos credenciados em todo o Brasil.
                  </p>
                </div>
                <div className="lg:col-span-7 lg:order-2 image-reveal rounded-2xl overflow-hidden border border-ambar-500/15">
                  <div className="relative h-64 sm:h-80 lg:h-96">
                    <Image
                      src="/assets/feitio/curadas/feitio-embalagem-custodia.jpg"
                      alt="Embalagem isotérmica para transporte seguro"
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Link para página completa */}
          <AnimateOnScroll className="mt-12 text-center">
            <Link
              href="/feitio"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ambar-400 hover:text-ambar-300 transition-colors"
            >
              <span>Ver processo completo do feitio</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider variant="minimal" />

      {/* ═══════════════════════════════════════════
          SISTEMA DE GRADUAÇÕES
          ═══════════════════════════════════════════ */}
      <section className="py-section-md lg:py-section-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Title & Description */}
            <AnimateOnScroll className="lg:col-span-5 lg:sticky lg:top-32 space-y-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ambar-400/80 flex items-center gap-2">
                <FlaskConical className="h-3.5 w-3.5" />
                Padronização Litúrgica
              </p>
              <h2 className="font-serif text-display-sm font-bold text-areia-100">
                O Sistema de
                <br />
                <span className="text-gradient-solar">Graduações</span>
              </h2>
              <p className="text-sm text-areia-400 leading-relaxed">
                Fundamentado na tradição daimista, a classificação das forças é
                calculada pela biomassa de cipó e folha por litro. Precisão
                fitoquímica que confere previsibilidade e segurança aos
                dirigentes.
              </p>
              <Link
                href="/feitio"
                className="inline-flex items-center gap-2 text-xs font-semibold text-ambar-400 hover:text-ambar-300 transition-colors"
              >
                <span>Estudo fitoquímico completo</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </AnimateOnScroll>

            {/* Right: Graduation Cards */}
            <div className="lg:col-span-7 space-y-4">
              {[
                {
                  grad: "3.1",
                  name: "Mainumbi",
                  bird: "Beija-flor",
                  dose: "90–120 ml",
                  strength: 25,
                  desc: "Voo suave e sutil. Ideal para introspecções mansas e participantes iniciantes.",
                },
                {
                  grad: "5.1",
                  name: "Pituã",
                  bird: "Bem-te-vi",
                  dose: "70–100 ml",
                  strength: 50,
                  desc: "Clareza mental, equilíbrio estável e percepção intermediária. Harmonização do campo.",
                },
                {
                  grad: "7.1",
                  name: "Anhangatã",
                  bird: "Rouxinol",
                  dose: "50–90 ml",
                  strength: 75,
                  desc: "Imersão espiritual profunda. Trabalhos de cura e ressignificação íntima.",
                },
                {
                  grad: "10.1",
                  name: "Wirapuru",
                  bird: "Semi-Mel",
                  dose: "30–50 ml",
                  strength: 100,
                  desc: "Concentração densa. Miração prolongada e condução de alta egrégora.",
                  featured: true,
                },
              ].map(({ grad, name, bird, dose, strength, desc, featured }, i) => (
                <AnimateOnScroll key={grad} delay={i * 100} direction="right">
                  <div
                    className={`rounded-xl p-6 space-y-3 transition-all duration-300 ${
                      featured
                        ? "card-elevated ring-1 ring-ambar-500/25"
                        : "card-liturgico"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
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
                      <span className="text-[11px] text-areia-400 font-mono">
                        {dose}
                      </span>
                    </div>

                    {/* Intensity Bar */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1 rounded-full bg-floresta-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-ambar-600 to-ambar-400 transition-all duration-1000"
                          style={{ width: `${strength}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-ambar-400/70 font-mono w-8 text-right">
                        {strength}%
                      </span>
                    </div>

                    <p className="text-xs text-areia-400 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </AnimateOnScroll>
              ))}

              {/* Formatos Especiais Mel & Gel + Cooperativismo Produtivo */}
              <AnimateOnScroll delay={450} direction="right">
                <div className="rounded-xl border border-ambar-500/30 bg-gradient-to-br from-floresta-900/90 via-floresta-950 to-floresta-900/60 p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-ambar-500/15 pb-3">
                    <div className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-ambar-400" />
                      <h4 className="font-serif text-sm sm:text-base font-bold text-areia-100">
                        Formatos Especiais: Medicina Mel & Gel
                      </h4>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-ambar-300 bg-ambar-500/15 border border-ambar-500/30 px-2.5 py-0.5 rounded-full w-fit">
                      Valores a Combinar
                    </span>
                  </div>
                  <p className="text-xs text-areia-300 leading-relaxed font-light">
                    Produzimos também o sacramento nas consistências <strong>Mel</strong> e <strong>Gel</strong> para congregações que buscam <strong>otimizar os custos logísticos e operacionais</strong> (redução expressiva do volume de frete e alta conservação). Também disponibilizamos <strong>outras graduações sob medida</strong> mediante combinado antecipado.
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-[11px] text-ambar-400/90">
                    <span>Cooperativismo produtivo com tabela evolutiva por quantidade</span>
                    <Link
                      href="/feitio"
                      className="inline-flex items-center gap-1 font-semibold hover:text-ambar-300 transition-colors"
                    >
                      <span>Ver detalhes do feitio</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="floresta" />

      {/* ═══════════════════════════════════════════
          CREDENCIAMENTO — Timeline Vertical
          ═══════════════════════════════════════════ */}
      <section className="py-section-md lg:py-section-lg">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ambar-400/80">
              Cadeia de Custódia Litúrgica
            </p>
            <h2 className="font-serif text-display-sm font-bold text-areia-100">
              Credenciamento dos Templos
            </h2>
            <p className="text-sm text-areia-400 max-w-lg mx-auto">
              O apoio logístico e operacional exige aprovação prévia em 3 etapas
              formais. Não enviamos sacramento a pessoas físicas avulsas.
            </p>
          </AnimateOnScroll>

          {/* Timeline */}
          <div className="relative space-y-8 pl-12 sm:pl-16">
            {/* Vertical line */}
            <div className="timeline-line" />

            {[
              {
                step: "1",
                title: "Dados da Entidade Solicitante",
                desc: "Comprovação da personalidade jurídica religiosa ou associativa — CNPJ ativo, Ata de Constituição e endereço litúrgico.",
              },
              {
                step: "2",
                title: "Dirigente / Padrinho Responsável",
                desc: "Documentação civil, histórico de condução de trabalhos espirituais e declaração de responsabilidade perante os membros.",
              },
              {
                step: "3",
                title: "Assinatura do Termo de Deontologia",
                desc: "Concordância expressa com a Res. CONAD 01/2010 e termo declarando ausência de fins lucrativos no rateio operacional.",
              },
            ].map(({ step, title, desc }, i) => (
              <AnimateOnScroll key={step} delay={i * 200}>
                <div className="relative">
                  <div className="absolute -left-12 sm:-left-16 top-0">
                    <span className="number-marker">{step}</span>
                  </div>
                  <div className="card-elevated rounded-xl p-6 sm:p-8 space-y-2">
                    <h3 className="font-serif text-lg font-bold text-areia-100">
                      {title}
                    </h3>
                    <p className="text-xs text-areia-400 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* CTA Banner */}
          <AnimateOnScroll className="mt-16">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-floresta-900 via-floresta-800 to-floresta-900 p-8 sm:p-10 text-center border border-ambar-500/20">
              <div className="absolute inset-0 bg-radial-ambar pointer-events-none" />
              <div className="relative space-y-4">
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-areia-100">
                  Deseja credenciar o seu templo?
                </h4>
                <p className="text-xs text-areia-300 max-w-md mx-auto">
                  Inicie o processo de triagem cadastral para avaliação do
                  conselho de guardiões.
                </p>
                <Link href="/credenciamento" className="btn-primary">
                  <Sparkles className="h-4 w-4" />
                  <span>Preencher Formulário de Triagem</span>
                </Link>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PORTAL DO DIRIGENTE TEASER
          ═══════════════════════════════════════════ */}
      <section className="pb-section-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="card-liturgico rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-floresta-800 border border-ambar-500/20 text-ambar-400 flex-shrink-0">
                  <Lock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-areia-100">
                    Instituição credenciada?
                  </h4>
                  <p className="text-xs text-areia-400">
                    Acesse o ambiente restrito para status de remessas e laudos.
                  </p>
                </div>
              </div>
              <Link href="/portal-dirigente" className="btn-secondary flex-shrink-0">
                Acessar Portal
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}

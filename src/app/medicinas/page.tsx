import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  Sparkles,
  ArrowRight,
  HeartHandshake,
  ArrowDown,
  ShieldCheck,
  FlaskConical,
  Atom,
  Scale,
  Shield,
} from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { MedicinasCatalogClient } from "@/components/medicinas/MedicinasCatalogClient";

export const metadata: Metadata = {
  title: "Compêndio Etnobotânico & Tradições Sagradas | Cooperativa Nativaram",
  description:
    "Compêndio etnobotânico dos 15 rapés sagrados (25g e 15g), Sananga ancestral, resinas sagradas e artefatos cerimoniais da Cooperativa Nativaram. Alquimia purista em consonância com as etnias originárias e o regime cooperativo.",
  openGraph: {
    title: "Compêndio Etnobotânico & Tradições Sagradas | Cooperativa Nativaram",
    description:
      "Compêndio etnobotânico: 15 rapés sagrados (25g e 15g), Sananga tradicional, resinas e artefatos de força da Amazônia.",
    images: [
      {
        url: "/assets/nativaram-oficial/institucional/rapes-linha-completa-25g.png",
        width: 1200,
        height: 630,
        alt: "Linha Completa de Sacramentos Tradicionais Cooperativa Nativaram",
      },
    ],
  },
};


export default function MedicinasPage() {

  return (
    <div className="space-y-0">
      {/* ═══════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-section-md lg:py-section-lg">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-ambar-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Badge de Identificação do Compêndio */}
          <AnimateOnScroll>
            <div className="inline-flex items-center gap-2 rounded-full border border-ambar-500/30 bg-floresta-900/80 backdrop-blur-md px-4 py-1.5 text-[11px] font-semibold tracking-[0.15em] text-ambar-300 uppercase shadow-[0_0_12px_rgba(212,163,89,0.15)]">
              <Sparkles className="h-3.5 w-3.5 text-ambar-400" />
              <span>Compêndio Etnobotânico & Tradições Sagradas</span>
            </div>
          </AnimateOnScroll>

          {/* Título Principal */}
          <AnimateOnScroll delay={150}>
            <div className="space-y-3">
              <h1 className="font-serif text-display-sm sm:text-display-md lg:text-display-lg font-bold text-areia-100 text-glow">
                Sacramentos &<br />
                <span className="text-gradient-solar">Tradições Botânicas</span>
              </h1>
              <p className="font-serif text-xs sm:text-sm text-ambar-400/90 tracking-wider max-w-2xl mx-auto">
                Compêndio de Rapés Sagrados, Sananga Ancestral, Resinas e Artefatos da Floresta Amazônica para Culto Religioso e Prática Contemplativa
              </p>
            </div>
          </AnimateOnScroll>

          {/* Chamadas de Ação */}
          <AnimateOnScroll delay={250}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/credenciamento"
                className="btn-primary inline-flex items-center gap-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider px-6 py-3.5 shadow-lg group"
              >
                <ShieldCheck className="h-4 w-4 text-floresta-950" />
                <span>Solicitar Credenciamento Litúrgico</span>
                <ArrowRight className="h-3.5 w-3.5 text-floresta-950 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <a
                href="#catalogo-rapes"
                className="btn-secondary inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-5 py-3"
              >
                <span>Explorar Compêndio Etnobotânico</span>
                <ArrowDown className="h-3.5 w-3.5" />
              </a>
            </div>
          </AnimateOnScroll>

          {/* Card de Esclarecimento Institucional: Soberania Ancestral & Cooperativismo */}
          <AnimateOnScroll delay={350}>
            <div className="card-elevated max-w-4xl mx-auto rounded-2xl p-6 sm:p-8 text-left border border-ambar-500/25 bg-gradient-to-br from-floresta-900/95 via-floresta-950 to-floresta-900/90 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-ambar-500/20 pb-3">
                <div className="flex items-center gap-2.5 text-ambar-400">
                  <HeartHandshake className="h-5 w-5 flex-shrink-0" />
                  <h3 className="font-serif text-base sm:text-lg font-bold text-areia-100">
                    Soberania Ancestral & Sustentabilidade das Comunidades Guardiãs
                  </h3>
                </div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-ambar-300/90 bg-ambar-500/10 border border-ambar-500/20 px-2.5 py-1 rounded-full w-fit">
                  Regime Cooperativo • Lei 5.764/71
                </span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
                <p>
                  Todos os sacramentos botânicos e artefatos sagrados apresentados neste compêndio são integrados ao ecossistema da <strong>Cooperativa Etnobotânica Nativaram Brasil</strong>. A partilha destas medicinas é regida pelo rateio cooperativo de custos, sem margem de lucro mercantil, em estrita conformidade com a legislação cooperativista e a salvaguarda de cultos religiosos tradicionais.
                </p>
                <p>
                  A produção material dos sacramentos é conduzida de forma autônoma por nosso mestre feitor caboclo e por centros tradicionais credenciados no Acre, sob o estudo fitoquímico e padronização da Nativaram. Nossa conexão com os povos originários <strong>(Yawanawá, Huni Kuin, Katukina, Noke Koĩ, Shawãdawa e Apurinã)</strong> reside estritamente na salvaguarda intelectual e procedimental de seus saberes ancestrais, sem qualquer vínculo produtivo direto com as aldeias.
                </p>
              </div>

              <div className="pt-3 border-t border-ambar-500/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-ambar-300/90">
                <span className="flex items-center gap-1.5 font-medium">
                  <Shield className="h-3.5 w-3.5 text-ambar-400" />
                  Acesso e partilha reservados a templos, dirigentes e associados credenciados.
                </span>
                <Link
                  href="/credenciamento"
                  className="font-bold underline hover:text-ambar-200 transition-colors inline-flex items-center gap-1 w-fit"
                >
                  <span>Credenciar minha instituição</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3 CATEGORY BANNERS
          ═══════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-section-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              src: "/assets/banners/1.png",
              title: "15 Rapés Sagrados",
              desc: "Calcinação purista de cinzas nobres e tabaco orgânico curado à sombra.",
              href: "#catalogo-rapes",
              cta: "Explorar variedades",
            },
            {
              src: "/assets/banners/2.png",
              title: "Sananga Ancestral",
              desc: "Extrato botânico puro de Tabernaemontana sananho para acuidade e visão sutil.",
              href: "#sananga-secao",
              cta: "Ver diretrizes",
            },
            {
              src: "/assets/banners/3.png",
              title: "Resinas & Defumações",
              desc: "Breu Branco amazônico, Palo Santo nativo e Olíbano de alta pureza.",
              href: "#defumacao-secao",
              cta: "Conhecer resinas",
            },
          ].map(({ src, title, desc, href, cta }, i) => (
            <AnimateOnScroll key={title} delay={i * 150}>
              <a
                href={href}
                className="group card-elevated rounded-2xl overflow-hidden flex flex-col h-full"
              >
                <div className="image-reveal relative h-48 w-full">
                  <Image
                    src={src}
                    alt={title}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-floresta-950 via-transparent to-transparent opacity-60" />
                </div>
                <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-areia-100 group-hover:text-ambar-400 transition-colors">
                      {title}
                    </h3>
                    <p className="text-xs text-areia-400 leading-relaxed mt-1">
                      {desc}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ambar-400 group-hover:text-ambar-300 transition-colors pt-2">
                    {cta}
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </a>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CIÊNCIA BIOGEOQUÍMICA DOS RAPÉS
          ═══════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-section-sm">
        <AnimateOnScroll>
          <div className="card-elevated rounded-2xl p-6 sm:p-10 border border-ambar-500/25 bg-gradient-to-b from-floresta-900/90 via-floresta-950 to-floresta-900/80 space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-ambar-500/20 bg-floresta-800/60 px-3 py-1 text-[11px] font-semibold text-ambar-300 uppercase tracking-widest">
                <FlaskConical className="h-3.5 w-3.5 text-ambar-400" />
                <span>Rigor Científico & Tradição Etnobotânica</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-areia-100">
                Ciência Biogeoquímica dos Rapés Sagrados
              </h2>
              <p className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
                Compreenda a sinergia molecular ancestral entre a biomassa de <em>Nicotiana rustica</em> e a matriz mineral de cinzas nobres calcinadas, documentada em pesquisas de etnofarmacologia e ensaios de pureza da Nativaram Brasil.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Alcalinização Tamponada */}
              <div className="rounded-xl border border-ambar-500/15 bg-floresta-950/70 p-6 space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ambar-500/10 border border-ambar-500/20 text-ambar-400">
                    <Atom className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-areia-100">
                    Tamponamento Alcalino (pH 9,75 a 10,2)
                  </h3>
                  <p className="text-xs text-areia-300 leading-relaxed font-light">
                    As cinzas de madeiras densas amazônicas (Tsunú, Cumaru, Mulateiro, Murici) atuam como tampão alcalinizante. Ao elevar o pH da cavidade nasal para a faixa de <strong>9,75 a 10,2</strong>, desprotonam a nicotina para a forma de <em>base livre lipofílica</em>, promovendo absorção limpa, rápida e transmembrana sem nenhuma necessidade de combustão ou inalação de fumaça.
                  </p>
                </div>
                <div className="pt-3 border-t border-ambar-500/10 text-[10px] font-mono text-ambar-400/80">
                  Absorção Transmembrana • Sem Combustão
                </div>
              </div>

              {/* Card 2: Calcinação > 250°C */}
              <div className="rounded-xl border border-ambar-500/15 bg-floresta-950/70 p-6 space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <Scale className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-areia-100">
                    Calcinação Purista (&gt; 250°C)
                  </h3>
                  <p className="text-xs text-areia-300 leading-relaxed font-light">
                    O rito de calcinação controlada em alta temperatura assegura a destruição termolítica completa de compostos voláteis e alcaloides visionários termolábeis (como DMT). O rapé consagrado é <strong>estritamente não-alucinógeno</strong>, constituindo um sacramento telúrico de puro ancoramento, silêncio mental e presença sensorial no aqui-agora.
                  </p>
                </div>
                <div className="pt-3 border-t border-ambar-500/10 text-[10px] font-mono text-emerald-400/80">
                  Zero Alcaloides Visionários • Estabilidade Térmica
                </div>
              </div>

              {/* Card 3: Moagem Ultrafina & Pureza */}
              <div className="rounded-xl border border-ambar-500/15 bg-floresta-950/70 p-6 space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-areia-100">
                    Moagem Micronizada & Frasco Âmbar
                  </h3>
                  <p className="text-xs text-areia-300 leading-relaxed font-light">
                    Peneiramento artesanal em malhas de padrão cirúrgico ultrafino, garantindo granulometria micronizada homogênea que acolhe as mucosas sem atrito agressivo. Envasado em frascos de vidro âmbar farmacêutico herméticos com lacre inviolável, resguardando os óleos essenciais contra foto-oxidação e umidade da floresta.
                  </p>
                </div>
                <div className="pt-3 border-t border-ambar-500/10 text-[10px] font-mono text-blue-400/80">
                  Proteção UV-Âmbar • Pureza Microbiana
                </div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      <SectionDivider variant="solar" />

      {/* ═══════════════════════════════════════════
          COMPÊNDIO INTERATIVO DE SACRAMENTOS
          ═══════════════════════════════════════════ */}
      <MedicinasCatalogClient />


      {/* ═══════════════════════════════════════════
          CTA BANNER
          ═══════════════════════════════════════════ */}
      <section className="py-section-sm mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-floresta-900 via-floresta-800 to-floresta-900 p-8 sm:p-10 text-center border border-ambar-500/15">
            <div className="absolute inset-0 bg-radial-ambar pointer-events-none" />
            <div className="relative space-y-4">
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-areia-100">
                Deseja partilhar esses sacramentos?
              </h4>
              <p className="text-xs text-areia-300 max-w-md mx-auto">
                Inicie o credenciamento litúrgico para avaliação do conselho de
                guardiões.
              </p>
              <Link href="/credenciamento" className="btn-primary">
                <Sparkles className="h-4 w-4" />
                <span>Solicitar Credenciamento</span>
              </Link>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Disclaimer */}
      <section className="pb-section-sm mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-ambar-500/20 bg-floresta-950/70 p-6 text-[11px] text-areia-300/80 leading-relaxed text-center space-y-2 font-light">
          <p>
            <strong className="text-ambar-400 font-semibold uppercase tracking-wider">
              Aviso de Segurança Integrativa & Conformidade (+18):
            </strong>{" "}
            Os sacramentos etnobotânicos da Nativaram Brasil são preparados artesanais e tradicionais de matriz vegetal e mineral. Contêm nicotina natural de <em>Nicotiana rustica</em>. Destinados exclusivamente ao uso litúrgico, religioso tradicional e práticas meditativas por associados maiores de 18 anos.
          </p>
          <p className="text-[10px] text-areia-400/70">
            Estes preparados não possuem finalidade terapêutica, farmacológica ou diagnóstica, não sendo medicamentos nem substitutos de cuidados médicos convencionais. Contraindicado para gestantes, lactantes, pessoas com histórico de cardiopatias severas ou hipertensão descompensada e indivíduos com sensibilidade ao tabaco.
          </p>
        </div>
      </section>
    </div>
  );
}

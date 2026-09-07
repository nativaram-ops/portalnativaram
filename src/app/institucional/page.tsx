import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Compass,
  Sparkles,
  HeartHandshake,
  ShieldCheck,
  TreePine,
  ArrowRight,
} from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionDivider } from "@/components/ui/SectionDivider";

export const metadata: Metadata = {
  title: "O Manifesto & Doutrina | Nativaram Brasil",
  description:
    "A gênese dos Nascidos do Raio de Sol, a Alquimia entre Dois Mundos e a Etnociência da Floresta. Preservação purista e salvaguarda das medicinas ancestrais.",
  openGraph: {
    title: "O Manifesto & Doutrina | Nativaram Brasil",
    description:
      "Nascidos do Raio de Sol — A Alquimia entre Dois Mundos e a Salvaguarda Ancestral.",
    images: [
      {
        url: "/assets/feitio/curadas/feitio-garrafa-tronco.jpg",
        width: 1200,
        height: 800,
        alt: "O Sacramento Ancestral no coração da floresta amazônica",
      },
    ],
  },
};

export default function InstitucionalPage() {
  return (
    <div className="space-y-0">
      {/* ═══════════════════════════════════════════
          HERO — Citação Display
          ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-section-lg lg:py-section-xl">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-ambar-500/[0.05] rounded-full blur-[100px] pointer-events-none" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <AnimateOnScroll>
            <div className="inline-flex items-center gap-2 rounded-full border border-ambar-500/20 bg-floresta-900/60 backdrop-blur-md px-4 py-1.5 text-[11px] font-semibold tracking-[0.15em] text-ambar-400 uppercase">
              <Compass className="h-3 w-3" />
              <span>Manifesto • História • Etnociência</span>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={200}>
            <h1 className="font-serif text-display-md sm:text-display-lg lg:text-display-xl font-bold text-areia-100 text-glow">
              Nascidos do
              <br />
              <span className="text-gradient-solar">Raio de Sol</span>
            </h1>
          </AnimateOnScroll>

          <AnimateOnScroll delay={400}>
            <p className="text-base sm:text-lg text-areia-300/80 leading-relaxed italic max-w-2xl mx-auto">
              &ldquo;O Futuro é Ancestral: onde a inteligência da tecnologia se
              curva à sabedoria da floresta para traduzir a cura e despertar o
              espírito.&rdquo;
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider variant="solar" />

      {/* ═══════════════════════════════════════════
          A GÊNESE — Split Screen
          ═══════════════════════════════════════════ */}
      <section className="py-section-md lg:py-section-lg">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Text */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-ambar-400/80 uppercase tracking-[0.2em]">
                    Capítulo I
                  </span>
                  <h2 className="font-serif text-display-sm font-bold text-areia-100">
                    A Gênese Nativaram
                  </h2>
                </div>
                <div className="space-y-4 text-sm text-areia-300 leading-relaxed">
                  <p>
                    A{" "}
                    <strong className="text-areia-100">
                      Cooperativa Etnobotânica Nativaram Brasil
                    </strong>{" "}
                    (cujo significado sagrado é{" "}
                    <em>&ldquo;Nascidos do Raio de Sol&rdquo;</em>) nasce do
                    entendimento inegociável de que a jornada espiritual exige
                    entrega de alma e integridade em cada etapa.
                  </p>
                  <p className="text-areia-400">
                    Rejeitamos veementemente qualquer tipo de exploração
                    predatória, mercantilização da floresta, apropriação
                    desordenada ou banalização comercial do sagrado. O rateio de
                    custos é apenas o veículo para garantir a sustentabilidade
                    das famílias extrativistas locais,{" "}
                    <strong className="text-areia-200">
                      operando estritamente sem fins lucrativos
                    </strong>
                    .
                  </p>
                </div>
              </div>

              {/* Image */}
              <div className="image-reveal rounded-2xl overflow-hidden border border-ambar-500/15 shadow-elevated-md">
                <div className="relative h-80 sm:h-96 lg:h-[480px]">
                  <Image
                    src="/assets/feitio/curadas/feitio-garrafa-tronco.jpg"
                    alt="Frasco de Ayahuasca sagrada apoiado em tronco na floresta do Acre"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-floresta-950/60 via-transparent to-transparent" />
                </div>
                <p className="p-4 text-[11px] text-areia-400/70 text-center italic">
                  O Sacramento Nativaram: presença viva da floresta amazônica
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ALQUIMIA ENTRE DOIS MUNDOS — 50/50 Split
          ═══════════════════════════════════════════ */}
      <section className="py-section-md lg:py-section-lg bg-floresta-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <h2 className="font-serif text-display-sm font-bold text-areia-100">
              A Alquimia Entre
              <br />
              <span className="text-gradient-solar">Dois Mundos</span>
            </h2>
            <p className="text-sm text-areia-400">
              A simbiose viva entre a sabedoria imemorial dos pajés e o rigor
              fitoquímico contemporâneo.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* A Floresta Ancestral */}
            <AnimateOnScroll delay={0}>
              <div className="card-elevated rounded-2xl overflow-hidden h-full flex flex-col">
                <div className="image-reveal relative h-64 sm:h-72 w-full">
                  <Image
                    src="/assets/feitio/curadas/feitio-cipo-colheita.jpg"
                    alt="Manejo do Cipó na floresta com o feitor caboclo"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-floresta-950 via-transparent to-transparent" />
                </div>
                <div className="p-6 sm:p-8 space-y-3 flex-1">
                  <div className="flex items-center gap-2 text-ambar-400 font-semibold text-[11px] uppercase tracking-[0.15em]">
                    <TreePine className="h-3.5 w-3.5" />
                    <span>Sabedoria Tradicional</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-areia-100">
                    A Floresta Ancestral
                  </h3>
                  <p className="text-xs text-areia-400 leading-relaxed">
                    Mais de 20 anos de imersão profunda do nosso feitor caboclo
                    com os mestres e pajés das nações{" "}
                    <strong className="text-areia-200">
                      Yawanawá, Huni Kuin, Katukina, Noke Koĩ, Shawãdawa e
                      Apurinã
                    </strong>
                    .
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            {/* A Cidade & A Ciência */}
            <AnimateOnScroll delay={200}>
              <div className="card-elevated rounded-2xl overflow-hidden h-full flex flex-col">
                <div className="image-reveal relative h-64 sm:h-72 w-full">
                  <Image
                    src="/assets/feitio/curadas/feitio-noturno-caldeiroes.jpg"
                    alt="Vigília noturna e controle de cozimento nos caldeirões"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-floresta-950 via-transparent to-transparent" />
                </div>
                <div className="p-6 sm:p-8 space-y-3 flex-1">
                  <div className="flex items-center gap-2 text-ambar-400 font-semibold text-[11px] uppercase tracking-[0.15em]">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Rigor Clínico & Jurídico</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-areia-100">
                    A Cidade & A Ciência
                  </h3>
                  <p className="text-xs text-areia-400 leading-relaxed">
                    Validação com fitoquímica indexada e pesquisas de grandes
                    universidades brasileiras:{" "}
                    <strong className="text-areia-200">
                      UFAC, USP, UFPB, UnB
                    </strong>
                    .
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <SectionDivider variant="floresta" />

      {/* ═══════════════════════════════════════════
          PROJETOS DE LUZ
          ═══════════════════════════════════════════ */}
      <section className="py-section-md lg:py-section-lg">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <HeartHandshake className="h-6 w-6 text-ambar-400" />
                <h2 className="font-serif text-display-sm font-bold text-areia-100">
                  Projetos de Luz
                </h2>
              </div>

              <div className="card-editorial">
                <p className="text-sm text-areia-300 leading-relaxed">
                  Nossa atuação reverte contribuições operacionais em
                  praxeologia social terapêutica por meio dos{" "}
                  <strong className="text-areia-100">
                    &ldquo;Projetos de Luz&rdquo;
                  </strong>{" "}
                  — iniciativas voluntárias focadas no acolhimento de pessoas
                  enfrentando dependência química, alcoolismo, depressão
                  profunda e traumas existenciais agudos.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="card-elevated rounded-xl p-6 space-y-3">
                  <span className="text-[11px] font-bold text-ambar-400/80 uppercase tracking-[0.15em]">
                    Ecovila & Agrofloresta
                  </span>
                  <p className="text-xs text-areia-400 leading-relaxed">
                    Financiamento e estruturação de comunidade autossustentável
                    em sistemas agroflorestais regenerativos no Acre.
                  </p>
                </div>
                <div className="card-elevated rounded-xl p-6 space-y-3">
                  <span className="text-[11px] font-bold text-ambar-400/80 uppercase tracking-[0.15em]">
                    Preservação da Ararajuba
                  </span>
                  <p className="text-xs text-areia-400 leading-relaxed">
                    Manejo florestal que assegura a proteção ativa aos habitats
                    e ninhos da Ararajuba (
                    <em>Guaruba guarouba</em>).
                  </p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-section-md">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center">
            <Link href="/credenciamento" className="btn-primary">
              <Sparkles className="h-4 w-4" />
              <span>Solicitar Credenciamento Litúrgico do Templo</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}

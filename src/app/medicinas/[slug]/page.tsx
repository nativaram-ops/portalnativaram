import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Leaf,
  Brain,
  Sparkles,
  BookOpen,
  AlertTriangle,
  FlaskConical,
  Compass,
  Shield,
  Flame,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import { medicinas, forcaLabels } from "@/data/medicinas";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionDivider } from "@/components/ui/SectionDivider";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return medicinas.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const med = medicinas.find((m) => m.slug === slug);
  if (!med) return { title: "Sacramento não encontrado" };
  return {
    title: `${med.nome} | Nativaram Brasil`,
    description: `${med.subtitulo}. Composição botânica: ${med.composicaoBotanica}. Confeccionado artesanalmente com mais de 20 anos de tradição.`,
  };
}

const forcaIcons: Record<string, React.ReactNode> = {
  suave: <Leaf className="h-3.5 w-3.5" />,
  intermediaria: <Sparkles className="h-3.5 w-3.5" />,
  forte: <Shield className="h-3.5 w-3.5" />,
  "extra-forte": <Flame className="h-3.5 w-3.5" />,
};

export default async function MedicinaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const med = medicinas.find((m) => m.slug === slug);
  if (!med) notFound();

  const { label: forcaLabel, color: forcaColor } = forcaLabels[med.forca];

  return (
    <div className="space-y-0 pb-20">
      {/* ═══════════════════════════════════════════
          BREADCRUMB & HERO
          ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-section-md lg:py-section-lg">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-ambar-500/[0.05] rounded-full blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Breadcrumb */}
          <AnimateOnScroll>
            <Link
              href="/medicinas"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ambar-400 hover:text-ambar-300 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Voltar ao Compêndio das Medicinas</span>
            </Link>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7 space-y-6">
              <AnimateOnScroll delay={100}>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-4xl" aria-hidden="true">
                    {med.emoji}
                  </span>
                  <div
                    className={`flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider border border-current/20 ${forcaColor}`}
                  >
                    {forcaIcons[med.forca]}
                    <span>{forcaLabel}</span>
                  </div>
                  <span className="rounded-full bg-floresta-900/80 border border-ambar-500/20 px-3.5 py-1 text-[11px] font-semibold text-ambar-300">
                    Feitio Caboclo Tradicional
                  </span>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll delay={200}>
                <h1 className="font-serif text-display-md sm:text-display-lg lg:text-display-xl font-bold text-areia-100 text-glow leading-[1.08]">
                  {med.nome}
                </h1>
              </AnimateOnScroll>

              <AnimateOnScroll delay={300}>
                <p className="text-base sm:text-lg text-ambar-400/90 italic leading-relaxed font-light">
                  &ldquo;{med.subtitulo}&rdquo;
                </p>
              </AnimateOnScroll>

              {/* Chakras */}
              <AnimateOnScroll delay={350}>
                <div className="flex flex-wrap gap-2 pt-1">
                  {med.chakras.map((chakra) => (
                    <span
                      key={chakra}
                      className="inline-flex items-center gap-1.5 rounded-full bg-floresta-800/80 border border-ambar-500/20 px-3.5 py-1 text-xs text-areia-200"
                    >
                      <Compass className="h-3 w-3 text-ambar-400" />
                      {chakra}
                    </span>
                  ))}
                </div>
              </AnimateOnScroll>

              {/* Selos de Rigor Litúrgico */}
              <AnimateOnScroll delay={400}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-areia-300 pt-2">
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-floresta-900/60 border border-ambar-500/15">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span>100% Livre de Aditivos Sintéticos</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-floresta-900/60 border border-ambar-500/15">
                    <span className="h-2 w-2 rounded-full bg-ambar-400" />
                    <span>Frasco Âmbar Hermético</span>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Card Fotográfico Documental da Medicina */}
            <div className="md:col-span-5">
              <AnimateOnScroll delay={250}>
                <div className="card-elevated overflow-hidden rounded-2xl border border-ambar-500/30 group">
                  <div className="relative h-72 sm:h-80 w-full overflow-hidden">
                    <Image
                      src="/assets/banners/frasco-rape-apresentacao.jpeg"
                      alt={`Apresentação cerimonial do ${med.nome}`}
                      fill
                      priority
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-floresta-950 via-floresta-950/20 to-transparent" />
                  </div>
                  <div className="p-5 space-y-1.5 bg-floresta-950/90 border-t border-ambar-500/20">
                    <div className="flex items-center justify-between text-[11px] text-ambar-400 font-semibold uppercase tracking-wider font-mono">
                      <span>Rastreabilidade de Origem</span>
                      <span>Acre / Amazônia</span>
                    </div>
                    <p className="text-xs text-areia-300 font-light leading-relaxed">
                      Preparo sob rezo em dieta cerimonial. Moagem ultrafina em cinzas minerais ativas.
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="solar" />

      {/* ═══════════════════════════════════════════
          COMPOSIÇÃO & FITOQUÍMICA
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimateOnScroll delay={100}>
              <div className="card-elevated rounded-2xl p-8 space-y-4 h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 text-ambar-400">
                    <FlaskConical className="h-5 w-5" />
                    <h2 className="font-serif text-lg font-bold text-areia-100">
                      Composição Botânica
                    </h2>
                  </div>
                  <p className="text-sm text-areia-300 leading-relaxed italic font-serif">
                    {med.composicaoBotanica}
                  </p>
                </div>
                <div className="pt-3 border-t border-ambar-500/15">
                  <p className="text-xs text-areia-400">
                    <span className="font-semibold text-areia-300">Famílias Botânicas:</span>{" "}
                    {med.familiaBotanica}
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={200}>
              <div className="card-elevated rounded-2xl p-8 space-y-4 h-full">
                <div className="flex items-center gap-2.5 text-ambar-400">
                  <Sparkles className="h-5 w-5" />
                  <h2 className="font-serif text-lg font-bold text-areia-100">
                    Alquimia & Fitoquímica
                  </h2>
                </div>
                <p className="text-sm text-areia-300 leading-relaxed font-light">
                  {med.alquimiaFitoquimica}
                </p>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Benefícios nos 3 Planos */}
          <div className="space-y-6 pt-4">
            <AnimateOnScroll>
              <div className="text-center max-w-xl mx-auto space-y-2">
                <span className="text-[11px] font-semibold text-ambar-400 uppercase tracking-[0.15em]">
                  Ação Integrativa
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-areia-100">
                  Benefícios Multidimensionais
                </h2>
              </div>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Físico */}
              <AnimateOnScroll delay={100}>
                <div className="card-elevated rounded-2xl p-6 space-y-4 h-full">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-950/60 border border-emerald-500/30">
                      <Leaf className="h-5 w-5 text-emerald-400" />
                    </div>
                    <h3 className="font-serif text-base font-bold text-emerald-400">
                      Plano Físico
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
                    {med.beneficios.fisico}
                  </p>
                </div>
              </AnimateOnScroll>

              {/* Mental */}
              <AnimateOnScroll delay={200}>
                <div className="card-elevated rounded-2xl p-6 space-y-4 h-full">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-950/60 border border-blue-500/30">
                      <Brain className="h-5 w-5 text-blue-400" />
                    </div>
                    <h3 className="font-serif text-base font-bold text-blue-400">
                      Plano Mental
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
                    {med.beneficios.mental}
                  </p>
                </div>
              </AnimateOnScroll>

              {/* Sutil */}
              <AnimateOnScroll delay={300}>
                <div className="card-elevated rounded-2xl p-6 space-y-4 h-full">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-950/60 border border-purple-500/30">
                      <Sparkles className="h-5 w-5 text-purple-400" />
                    </div>
                    <h3 className="font-serif text-base font-bold text-purple-400">
                      Plano Sutil
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
                    {med.beneficios.sutil}
                  </p>
                </div>
              </AnimateOnScroll>
            </div>
          </div>

          {/* Diretrizes & Rastreabilidade */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
            <AnimateOnScroll delay={100}>
              <div className="card-elevated rounded-2xl p-8 space-y-4 h-full">
                <div className="flex items-center gap-2.5 text-ambar-400">
                  <BookOpen className="h-5 w-5" />
                  <h2 className="font-serif text-lg font-bold text-areia-100">
                    Diretrizes para a Consagração
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
                  {med.diretrizes}
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={200}>
              <div className="card-elevated rounded-2xl p-8 space-y-4 h-full">
                <div className="flex items-center gap-2.5 text-ambar-400">
                  <Compass className="h-5 w-5" />
                  <h2 className="font-serif text-lg font-bold text-areia-100">
                    Feitio & Rastreabilidade
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
                  {med.feitioRastreabilidade}
                </p>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Cuidados */}
          <AnimateOnScroll delay={300}>
            <div className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-amber-400">
                <AlertTriangle className="h-5 w-5" />
                <h2 className="font-serif text-lg font-bold">
                  Cuidados & Contraindicações
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
                {med.cuidados}
              </p>
              <p className="text-[11px] text-areia-400 pt-3 border-t border-amber-500/15 font-light">
                <strong className="text-areia-300 font-medium">Referências:</strong> {med.referencias}
              </p>
            </div>
          </AnimateOnScroll>

          {/* CTA Box */}
          <AnimateOnScroll delay={350}>
            <div className="card-elevated rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 border-ambar-500/30">
              <div className="space-y-1.5 text-center sm:text-left">
                <h4 className="font-serif text-xl font-bold text-areia-100">
                  Deseja partilhar este sacramento em seu templo?
                </h4>
                <p className="text-xs sm:text-sm text-areia-300 font-light">
                  Inicie o processo de credenciamento litúrgico para avaliação do conselho de guardiões.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <a
                  href={`https://wa.me/5568999979104?text=${encodeURIComponent(`Olá, gostaria de consultar a disponibilidade e rateio cooperativo do sacramento ${med.nome}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex-shrink-0 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider w-full sm:w-auto justify-center"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-400" />
                  <span>Consultar Rateio</span>
                </a>
                <Link
                  href="/credenciamento"
                  className="btn-primary flex-shrink-0 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider w-full sm:w-auto justify-center"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Credenciamento</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Disclaimer */}
          <div className="pt-4">
            <div className="rounded-xl border border-ambar-500/20 bg-floresta-950/70 p-5 text-[10px] text-areia-300/80 leading-relaxed text-center font-light space-y-1.5">
              <p>
                <strong className="text-ambar-400 font-semibold uppercase tracking-wider">Aviso de Segurança Integrativa & Conformidade (+18):</strong>{" "}
                Nossos sacramentos são 100% naturais e confeccionados de forma artesanal sob rígido padrão de pureza e respeito às tradições dos povos originários. Contêm nicotina natural de <em>Nicotiana rustica</em>.
              </p>
              <p className="text-areia-400/70">
                O uso de rapé sagrado é um sacramento ancestral de bem-estar, meditação e centramento sensorial, desprovido de finalidade clínica ou farmacológica. Destinado exclusivamente a práticas religiosas tradicionais e contemplativas para associados maiores de 18 anos. Contraindicado para gestantes, lactantes, pessoas com histórico de cardiopatias severas ou hipertensão descompensada e indivíduos com sensibilidade ao tabaco.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

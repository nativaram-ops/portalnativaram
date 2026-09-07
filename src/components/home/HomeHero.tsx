import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ShieldCheck, ArrowRight, Flame, Lock } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Badge } from "@/components/ui/Badge";

export const HomeHero = () => {
  return (
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
            <Badge variant="solar" dot icon={<Sparkles className="h-3 w-3 text-ambar-400" />}>
              Ponte Ética & Salvaguarda do Sagrado Sacramento
            </Badge>
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
              <Link
                href="/credenciamento"
                className="btn-primary flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold tracking-wide"
              >
                <ShieldCheck className="h-4 w-4" />
                <span>Solicitar Credenciamento do Templo</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#sacralidade"
                className="btn-secondary flex items-center justify-center gap-2 text-xs sm:text-sm"
              >
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
        <Badge variant="floresta" icon={<Flame className="h-3.5 w-3.5 text-ambar-400 animate-flicker" />}>
          Cruzeiro do Sul • Acre • Vale do Juruá
        </Badge>
      </div>
    </section>
  );
};

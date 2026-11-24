import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ShieldCheck, ArrowRight, Flame, Lock, HeartPulse } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Badge } from "@/components/ui/Badge";

export const HomeHero = () => {
  return (
    <section className="relative min-h-[86dvh] lg:min-h-[90dvh] flex items-end overflow-hidden pb-14 pt-28 lg:pb-20">
      {/* Imagem de Fundo do Feitio */}
      <Image
        src="/assets/feitio/curadas/feitio-noturno-caldeiroes.jpg"
        alt="Feitio sagrado da Ayahuasca em Cruzeiro do Sul, Acre — caldeirões sob a noite amazônica"
        fill
        priority
        className="object-cover object-center brightness-[0.48] contrast-105"
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
              Projeto em Constituição • Site Institucional
            </Badge>
          </AnimateOnScroll>

          <AnimateOnScroll delay={300}>
            <h1 className="font-serif text-display-sm sm:text-display-md lg:text-display-lg font-bold text-areia-100 text-glow leading-[1.06] tracking-display text-balance">
              Salvaguarda Litúrgica,
              <br />
              <span className="text-gradient-solar">Memória do Feitio</span>
              <br />
              <span className="text-areia-200/90">&amp; Tradição da Floresta</span>
            </h1>
          </AnimateOnScroll>

          <AnimateOnScroll delay={450}>
            <p className="text-sm sm:text-base text-areia-200/95 leading-relaxed max-w-2xl font-light text-pretty">
              A Cooperativa Nativaram é um projeto de cooperativa em constituição, ainda sem registro e sem CNPJ, ligado à tradição do feitio de <strong>Cruzeiro do Sul, no Acre</strong>. <strong>Este site é institucional. Não vendemos, não recebemos pedidos e não fazemos envios.</strong>
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll delay={600}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link
                href="/entidades-religiosas"
                className="btn-primary btn-press flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold tracking-wide"
              >
                <ShieldCheck className="h-4 w-4" />
                <span>Entidades Religiosas</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/seguranca"
                className="btn-secondary btn-press flex items-center justify-center gap-2 text-xs sm:text-sm"
              >
                <HeartPulse className="h-4 w-4 text-ambar-400" />
                <span>Segurança e Redução de Danos</span>
              </Link>
              <Link
                href="#caminhos-portal"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-ambar-300 hover:text-ambar-200 underline underline-offset-4 decoration-ambar-500/40 px-2 py-2"
              >
                <span>Ver os 3 Caminhos</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </AnimateOnScroll>

          {/* Aviso Litúrgico */}
          <AnimateOnScroll delay={750}>
            <p className="text-[11px] text-areia-300 flex items-center gap-2 pt-1 font-mono">
              <Lock className="h-3 w-3 text-ambar-400 shrink-0" />
              <span>Conteúdo para maiores de 18 anos • Uso do sacramento só em contexto religioso, nos termos da Resolução CONAD nº 1/2010.</span>
            </p>
          </AnimateOnScroll>
        </div>
      </div>

      {/* Localização Badge */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-10 hidden md:block">
        <Badge variant="floresta" icon={<Flame className="h-3.5 w-3.5 text-ambar-400" />}>
          Cruzeiro do Sul • Acre • Vale do Juruá
        </Badge>
      </div>
    </section>
  );
};

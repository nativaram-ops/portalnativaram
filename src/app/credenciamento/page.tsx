import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import {
  ShieldCheck,
  Building2,
  FileCheck2,
  Lock,
  Compass,
  CheckCircle2,
  Scale,
  Sparkles,
} from "lucide-react";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { CredenciamentoForm } from "@/components/forms/CredenciamentoForm";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export const metadata: Metadata = {
  title: "Credenciamento Litúrgico Institucional | Nativaram Brasil",
  description:
    "Processo de homologação formal e cadastral para entidades religiosas, templos de oração e círculos xamânicos sob estrita observância à Resolução CONAD nº 01/2010 e CF/88.",
  openGraph: {
    title: "Credenciamento Litúrgico Institucional | Nativaram Brasil",
    description:
      "Acesso cooperativo exclusivo para casas religiosas e templos homologados perante o conselho de guardiões da Nativaram Brasil.",
    url: "https://nativaramcoop.eco.br/credenciamento",
    images: [
      {
        url: "/assets/projetos-de-luz/projeto-luz-altar.jpg",
        width: 1200,
        height: 675,
        alt: "Credenciamento Litúrgico Institucional — Nativaram Brasil",
      },
    ],
  },
};

export default function CredenciamentoPage() {
  return (
    <div className="space-y-0">
      {/* ═══════════════════════════════════════════
          HERO — CREDENCIAMENTO LITÚRGICO INSTITUCIONAL
          ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-section-lg lg:py-section-xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-ambar-500/[0.10] rounded-full blur-[140px] pointer-events-none" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <AnimateOnScroll>
            <div className="inline-flex items-center gap-2 rounded-full border border-ambar-500/30 bg-floresta-900/80 backdrop-blur-md px-4 py-1.5 text-xs font-semibold tracking-[0.16em] text-ambar-400 uppercase shadow-solar">
              <ShieldCheck className="h-4 w-4 text-ambar-400" />
              <span>Exclusivo para Entidades Religiosas & Templos Constituídos</span>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={150}>
            <h1 className="font-serif text-display-md sm:text-display-lg lg:text-display-xl font-bold text-areia-100 text-glow leading-[1.08]">
              Credenciamento Litúrgico{" "}
              <span className="text-gradient-solar">Institucional</span>
            </h1>
          </AnimateOnScroll>

          <AnimateOnScroll delay={300}>
            <p className="text-base sm:text-lg text-areia-200 max-w-3xl mx-auto leading-relaxed font-light">
              Em estrita conformidade com o <strong>Artigo 5º, VI da Constituição Federal</strong> e a <strong>Resolução CONAD nº 01/2010</strong>, o provimento cooperativo de sacramentos botânicos tradicionais é reservado a congregações homologadas pelo Conselho Guardião da Nativaram Brasil.
            </p>
          </AnimateOnScroll>

          {/* Três Pilares da Homologação */}
          <AnimateOnScroll delay={450}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left max-w-4xl mx-auto">
              <div className="rounded-xl border border-ambar-500/20 bg-floresta-950/80 p-4 space-y-1.5">
                <div className="flex items-center gap-2 text-ambar-400 font-serif font-bold text-xs">
                  <Building2 className="h-4 w-4" />
                  <span>1. Personalidade Jurídica ou Ata</span>
                </div>
                <p className="text-[11px] text-areia-300 font-light leading-relaxed">
                  Validação documental do templo ou declaração formal de fé do dirigente litúrgico.
                </p>
              </div>

              <div className="rounded-xl border border-ambar-500/20 bg-floresta-950/80 p-4 space-y-1.5">
                <div className="flex items-center gap-2 text-ambar-400 font-serif font-bold text-xs">
                  <Lock className="h-4 w-4" />
                  <span>2. Ausência de Fins Lucrativos</span>
                </div>
                <p className="text-[11px] text-areia-300 font-light leading-relaxed">
                  Compromisso formal contra qualquer comércio ou mercantilização do sagrado.
                </p>
              </div>

              <div className="rounded-xl border border-ambar-500/20 bg-floresta-950/80 p-4 space-y-1.5">
                <div className="flex items-center gap-2 text-ambar-400 font-serif font-bold text-xs">
                  <Scale className="h-4 w-4" />
                  <span>3. Rateio Operacional Solidário</span>
                </div>
                <p className="text-[11px] text-areia-300 font-light leading-relaxed">
                  Participação cooperativa transparente nos custos reais de feitio, lenha, embalagens virgens higienizadas e logística.
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider variant="solar" />

      {/* ═══════════════════════════════════════════
          FORMULÁRIO MULTI-ETAPAS COM ENGINE DE DOMÍNIO
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg relative">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
          <AnimateOnScroll>
            <CredenciamentoForm />
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider variant="minimal" />

      {/* ═══════════════════════════════════════════
          DISCLAIMER JURÍDICO OBRIGATÓRIO (CONAD 01/2010)
          ═══════════════════════════════════════════ */}
      <section className="py-8 bg-floresta-950/60">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-ambar-400 uppercase tracking-wider">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Marco Legal & Conformidade Ética</span>
          </div>
          <p className="text-[11px] text-areia-400 leading-relaxed font-light">
            A Cooperativa Etnobotânica Nativaram Brasil não pratica comércio eletrônico nem disponibiliza sacramentos ao público leigo. Todo o processo de acolhimento e sustentação litúrgica atende estritamente às diretrizes fixadas pela Resolução nº 01 do Conselho Nacional de Políticas sobre Drogas (CONAD), de 25 de janeiro de 2010.
          </p>
        </div>
      </section>
    </div>
  );
}

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
  Clock,
  KeyRound,
  Send,
} from "lucide-react";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { CredenciamentoForm } from "@/components/forms/CredenciamentoForm";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { JornadaNavTracker } from "@/components/funil";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Credenciamento Litúrgico Institucional | Cooperativa Nativaram",
  description:
    "Processo de homologação formal e cadastral para entidades religiosas, templos de oração e círculos xamânicos sob estrita observância à Resolução CONAD nº 01/2010 e CF/88.",
  openGraph: {
    title: "Credenciamento Litúrgico Institucional | Cooperativa Nativaram",
    description:
      "Acesso cooperativo exclusivo para casas religiosas e templos homologados perante o conselho de guardiões da Cooperativa Nativaram.",
    url: "https://nativaramcoop.eco.br/credenciamento",
    images: [
      {
        url: "/assets/projetos-de-luz/projeto-luz-altar.jpg",
        width: 1200,
        height: 675,
        alt: "Credenciamento Litúrgico Institucional — Cooperativa Nativaram",
      },
    ],
  },
};

export default function CredenciamentoPage() {
  return (
    <div className="space-y-0">
      {/* Indicador Superior do Caminho Didático */}
      <JornadaNavTracker etapaAtual={5} />

      {/* ═══════════════════════════════════════════
          HERO — CREDENCIAMENTO LITÚRGICO INSTITUCIONAL
          ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-section-lg lg:py-section-xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-ambar-500/[0.10] rounded-full blur-[140px] pointer-events-none" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <AnimateOnScroll>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="emerald" dot icon={<CheckCircle2 className="h-3 w-3" />}>
                Etapa 5 de 5 • Clímax da Salvaguarda Litúrgica
              </Badge>
              <Badge variant="solar" icon={<ShieldCheck className="h-3 w-3 text-ambar-400" />}>
                Exclusivo para Casas &amp; Templos Constituídos
              </Badge>
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
              Em estrita conformidade com o <strong>Artigo 5º, VI da Constituição Federal</strong> e a <strong>Resolução CONAD nº 01/2010</strong>, o provimento cooperativo de sacramentos botânicos tradicionais é reservado a congregações homologadas pelo Conselho Guardião da Cooperativa Nativaram.
            </p>
          </AnimateOnScroll>

          {/* Timeline de Homologação em 3 Passos Claros */}
          <AnimateOnScroll delay={400}>
            <div className="rounded-2xl border border-ambar-500/25 bg-floresta-950/90 p-6 text-left max-w-4xl mx-auto shadow-elevated-md space-y-4">
              <div className="flex items-center gap-2 text-ambar-400 font-mono text-xs font-bold uppercase tracking-wider">
                <Clock className="h-4 w-4" />
                <span>Como Funciona o Processo de Homologação em 3 Passos:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-floresta-900/60 border border-ambar-500/15 space-y-1">
                  <span className="text-ambar-400 font-bold block font-mono text-[11px]">
                    1. Submissão Digital
                  </span>
                  <p className="text-areia-300 font-light text-[11px] leading-relaxed">
                    Preenchimento do formulário abaixo com os dados cadastrais da instituição religiosa e ata ou declaração formal.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-floresta-900/60 border border-ambar-500/15 space-y-1">
                  <span className="text-ambar-400 font-bold block font-mono text-[11px]">
                    2. Análise Ética (48h)
                  </span>
                  <p className="text-areia-300 font-light text-[11px] leading-relaxed">
                    O Conselho Guardião avalia o alinhamento deontológico e o compromisso contra a mercantilização em até 48 horas úteis.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-floresta-900/60 border border-ambar-500/15 space-y-1">
                  <span className="text-emerald-400 font-bold block font-mono text-[11px]">
                    3. Acesso Homologado
                  </span>
                  <p className="text-areia-300 font-light text-[11px] leading-relaxed">
                    Com a homologação deferida, o dirigente recebe as credenciais de acesso seguro ao Portal do Dirigente.
                  </p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Três Pilares da Homologação */}
          <AnimateOnScroll delay={500}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-left max-w-4xl mx-auto">
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
            A Cooperativa Etnobotânica Nativaram não pratica comércio eletrônico nem disponibiliza sacramentos ao público leigo. Todo o processo de acolhimento e sustentação litúrgica atende estritamente às diretrizes fixadas pela Resolução nº 01 do Conselho Nacional de Políticas sobre Drogas (CONAD), de 25 de janeiro de 2010.
          </p>
        </div>
      </section>
    </div>
  );
}

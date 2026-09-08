"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Scale,
  BookOpen,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  HeartHandshake,
  Lock,
  ArrowRight,
} from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const pilaresSemanticos = [
  {
    titulo: "Sabedoria Botânica & Alquimia",
    substitui: "Em substituição a vocabulário clínico ou farmacêutico",
    explicacao:
      "Nossos preparados são frutos da etnobotânica tradicional amazônica. Não atuamos como indústria alopática nem exercemos atos privativos da medicina.",
    icone: Sparkles,
    tag: "Herança Ancestral",
  },
  {
    titulo: "Florescimento & Harmonização",
    substitui: "Em substituição a alegações de cura de patologias",
    explicacao:
      "Em total respeito ao marco sanitário da ANVISA, não prometemos desfechos clínicos. Promovemos pausas conscientes, reequilíbrio vital e serenidade aos sentidos.",
    icone: HeartHandshake,
    tag: "Marco Sanitário ANVISA",
  },
  {
    titulo: "Partilha Cooperativa & Rateio",
    substitui: "Em substituição a comércio, lojas e fins lucrativos",
    explicacao:
      "A Resolução CONAD nº 01/2010 veda peremptoriamente a exploração comercial da Ayahuasca. Todos os valores destinam-se exclusivamente ao rateio de custos de feitio e logística.",
    icone: Scale,
    tag: "Veda Comercial CONAD",
  },
  {
    titulo: "Sacramento & Templos de Luz",
    substitui: "Em substituição a mercadorias e consumo genérico",
    explicacao:
      "Sob o amparo do Art. 5º, VI da Carta Magna (liberdade de culto), o acolhimento litúrgico é restrito a dirigentes credenciados e instituições legalmente constituídas.",
    icone: Lock,
    tag: "Art. 5º, VI da CF/88",
  },
];

const equivalenciasSemanticas = [
  {
    termoTradicional: "Sabedoria botânica, alquimia vegetal e preparado de força",
    razaoLegal: "Atos e substâncias privativas da área médica não se confundem com a tradição etnobotânica comunitária.",
  },
  {
    termoTradicional: "Florescimento, reequilíbrio vital e harmonização sensorial",
    razaoLegal: "Zero alegações clínicas de cura ou tratamento de doenças, conforme normativas da ANVISA.",
  },
  {
    termoTradicional: "Protocolo de autocuidado, ritual de suavidade e pausa consciente",
    razaoLegal: "Acolhimento da sensibilidade humana sob a ótica da espiritualidade e da expansão de presença.",
  },
  {
    termoTradicional: "Rateio de custos, contribuição cooperativa e apoio logístico",
    razaoLegal: "Cumprimento da proibição expressa de comercialização com fins lucrativos (CONAD 01/2010).",
  },
  {
    termoTradicional: "Cooperado, associado e templo devidamente credenciado",
    razaoLegal: "Relacionamento institucional entre membros de uma irmandade litúrgica, sem relação de consumo comum.",
  },
  {
    termoTradicional: "Sacramento sagrado e preparado botânico tradicional",
    razaoLegal: "Reconhecimento da sacralidade das plantas de poder pelos órgãos de soberania cultural do Brasil.",
  },
];

export const HomeNotaSemantica = () => {
  const [expandido, setExpandido] = useState(false);

  return (
    <section
      id="semantica"
      className="py-section-sm lg:py-section-md relative overflow-hidden bg-gradient-to-b from-floresta-950 via-floresta-900/50 to-floresta-950 border-b border-ambar-500/15"
    >
      {/* Brilho Solar Difuso */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-radial-ambar pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
        <AnimateOnScroll>
          <Card
            variant="elevated"
            glow
            className="rounded-3xl p-6 sm:p-10 lg:p-12 border-ambar-500/30 bg-gradient-to-br from-floresta-900/95 via-floresta-950 to-floresta-900/90 text-left space-y-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
          >
            {/* Topo / Header da Nota */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-ambar-500/20 pb-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="solar"
                    dot
                    icon={<Scale className="h-3.5 w-3.5 text-ambar-400" />}
                  >
                    Salvaguarda Semântica & Deontologia
                  </Badge>
                  <span className="text-[11px] font-mono font-medium text-ambar-300/80 bg-ambar-500/10 border border-ambar-500/20 px-2.5 py-0.5 rounded-full">
                    Resolução CONAD nº 01/2010 • Marco Sanitário ANVISA
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-areia-100 tracking-tight leading-snug">
                  A Força das Nossas Palavras:{" "}
                  <span className="text-gradient-solar block sm:inline">
                    Por Que Escolhemos Esta Semântica?
                  </span>
                </h2>
              </div>

              <div className="shrink-0 flex items-center gap-2 text-xs font-mono text-areia-300/80 bg-floresta-950/80 border border-ambar-500/25 px-3.5 py-2 rounded-xl">
                <BookOpen className="h-4 w-4 text-ambar-400 shrink-0" />
                <span>Rigor Linguístico & Proteção Legal</span>
              </div>
            </div>

            {/* Explicação Central Introdutória */}
            <p className="text-sm sm:text-base text-areia-200/90 leading-relaxed font-light max-w-4xl">
              Em nosso portal, cada termo é selecionado com profundo respeito à tradição da floresta e estrita
              obediência às <strong>regras vigentes no Brasil</strong>. Por determinação da <strong>Resolução CONAD nº 01/2010</strong> e
              das diretrizes sanitárias da <strong>ANVISA</strong>, a Ayahuasca e os preparados etnobotânicos destinam-se
              exclusivamente à prática litúrgica, comunitária e de elevação sensorial. <strong>Não praticamos comércio, não realizamos promessas clínicas e não atuamos como drogaria ou consultório</strong>.
              Nossa linguagem é o reflexo direto dessa salvaguarda.
            </p>

            {/* Grid dos 4 Pilares da Linguagem */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {pilaresSemanticos.map((pilar, idx) => {
                const Icone = pilar.icone;
                return (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-floresta-950/85 border border-ambar-500/20 hover:border-ambar-500/40 transition-all duration-300 space-y-2.5 group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-floresta-900 border border-ambar-500/30 text-ambar-400 group-hover:text-ambar-300 group-hover:scale-105 transition-all">
                          <Icone className="h-4 w-4" />
                        </div>
                        <h3 className="font-serif text-sm sm:text-base font-semibold text-areia-100 group-hover:text-ambar-300 transition-colors">
                          {pilar.titulo}
                        </h3>
                      </div>
                      <span className="text-[10px] font-mono text-ambar-400/90 bg-ambar-500/10 px-2 py-0.5 rounded-md border border-ambar-500/15">
                        {pilar.tag}
                      </span>
                    </div>

                    <div className="text-[11px] font-mono text-amber-300/70 italic">
                      {pilar.substitui}
                    </div>

                    <p className="text-xs text-areia-300/80 leading-relaxed font-light">
                      {pilar.explicacao}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Seção Expansível: Dicionário e Equivalências */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setExpandido(!expandido)}
                className="w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-floresta-950/70 hover:bg-floresta-950 border border-ambar-500/25 hover:border-ambar-500/45 text-areia-200 transition-all text-xs sm:text-sm font-medium"
                aria-expanded={expandido}
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="h-4 w-4 text-ambar-400" />
                  <span>
                    {expandido
                      ? "Ocultar Guia de Equivalência de Linguagem"
                      : "✦ Entenda em detalhes como nossa linguagem cumpre as regras vigentes"}
                  </span>
                </div>
                {expandido ? (
                  <ChevronUp className="h-4 w-4 text-ambar-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-ambar-400" />
                )}
              </button>

              {expandido && (
                <div className="mt-3 p-4 sm:p-6 rounded-2xl bg-floresta-950/90 border border-ambar-500/20 space-y-4 animate-fade-in">
                  <div className="text-xs text-areia-300 leading-relaxed">
                    Abaixo apresentamos como estruturamos os conceitos sagrados e cooperativos para afastar qualquer
                    duplicidade de interpretação regulatória perante as autoridades competentes:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {equivalenciasSemanticas.map((eq, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-floresta-900/60 border border-ambar-500/15 space-y-1.5"
                      >
                        <div className="text-xs font-semibold text-ambar-300 font-serif flex items-center gap-1.5">
                          <ShieldCheck className="h-3.5 w-3.5 text-ambar-400 shrink-0" />
                          <span>{eq.termoTradicional}</span>
                        </div>
                        <p className="text-[11px] text-areia-300/80 font-light leading-relaxed">
                          {eq.razaoLegal}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-ambar-500/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-areia-400 font-light">
                    <span>
                      Amparo legal: CF/88 art. 5º VI; Resolução CONAD nº 01/2010; Diretrizes ANVISA 2025.
                    </span>
                    <Link
                      href="/compliance"
                      className="inline-flex items-center gap-1 text-ambar-400 hover:text-ambar-300 font-semibold underline underline-offset-4"
                    >
                      <span>Ver Marco Legal Completo</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Rodapé Interno do Card */}
            <div className="pt-4 border-t border-ambar-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="text-xs text-areia-400 font-light">
                <span className="text-amber-400 font-semibold">Garantia aos Templos:</span> Toda comunicação é blindada
                juridicamente para proteger a legitimidade das instituições parceiras e dos dirigentes responsáveis.
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/compliance"
                  className="btn-secondary text-xs py-2 px-4 flex items-center gap-1.5"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-ambar-400" />
                  <span>Marco Legal & CONAD</span>
                </Link>
                <Link
                  href="#sacralidade"
                  className="text-xs text-amber-300 hover:text-amber-200 underline underline-offset-4 font-medium"
                >
                  Nota de Sacralidade ↓
                </Link>
              </div>
            </div>
          </Card>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

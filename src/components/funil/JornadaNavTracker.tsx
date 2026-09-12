"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  TreePine,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export interface EtapaJornada {
  id: number;
  slug: string;
  label: string;
  tituloCurto: string;
  href: string;
  icone: React.ElementType;
}

export const etapasJornada: EtapaJornada[] = [
  {
    id: 1,
    slug: "institucional",
    label: "Etapa 1 de 5",
    tituloCurto: "Origem & Vocação",
    href: "/institucional",
    icone: Compass,
  },
  {
    id: 2,
    slug: "feitio",
    label: "Etapa 2 de 5",
    tituloCurto: "Feitio Purista",
    href: "/feitio",
    icone: TreePine,
  },
  {
    id: 3,
    slug: "sacramentos",
    label: "Etapa 3 de 5",
    tituloCurto: "Sacramentos Sagrados",
    href: "/sacramentos",
    icone: Sparkles,
  },
  {
    id: 4,
    slug: "compliance",
    label: "Etapa 4 de 5",
    tituloCurto: "Marco Legal & CONAD",
    href: "/compliance",
    icone: ShieldCheck,
  },
  {
    id: 5,
    slug: "credenciamento",
    label: "Etapa 5 de 5",
    tituloCurto: "Credenciamento Litúrgico",
    href: "/credenciamento",
    icone: CheckCircle2,
  },
];

interface JornadaNavTrackerProps {
  etapaAtual: 1 | 2 | 3 | 4 | 5;
  className?: string;
}

export const JornadaNavTracker: React.FC<JornadaNavTrackerProps> = ({
  etapaAtual,
  className = "",
}) => {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Caminho Didático da Salvaguarda Litúrgica"
      className={`w-full py-2 sm:py-3 px-3 sm:px-4 bg-floresta-950/85 border-b border-ambar-500/15 backdrop-blur-md sticky top-[56px] sm:top-[60px] md:top-[65px] z-30 ${className}`}
    >
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 text-xs">
        {/* Indicador de Cabeçalho do Caminho */}
        <div className="flex items-center gap-2 text-areia-300 font-sans shrink-0">
          <span className="flex h-2 w-2 rounded-full bg-ambar-400 animate-pulse" />
          <span className="font-semibold text-ambar-400 uppercase tracking-wider text-[10px] font-mono">
            Jornada de Salvaguarda
          </span>
          <span className="text-areia-500">•</span>
          <span className="text-areia-200 font-medium text-[11px]">
            Etapa {etapaAtual} de 5
          </span>
        </div>

        {/* Stepper Sequencial com Links */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto w-full sm:w-auto pb-0.5 sm:pb-0 touch-scroll-x justify-start sm:justify-end">
          {etapasJornada.map((etapa, idx) => {
            const Icon = etapa.icone;
            const isAtiva = etapa.id === etapaAtual;
            const isConcluida = etapa.id < etapaAtual;

            return (
              <React.Fragment key={etapa.id}>
                <Link
                  href={etapa.href}
                  className={`group flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all duration-200 whitespace-nowrap text-[11px] ${
                    isAtiva
                      ? "bg-ambar-500/20 text-ambar-300 font-semibold border border-ambar-500/40 shadow-sm"
                      : isConcluida
                      ? "text-emerald-400 hover:text-emerald-300 hover:bg-floresta-900/60 font-medium"
                      : "text-areia-400/80 hover:text-areia-100 hover:bg-floresta-900/40"
                  }`}
                  title={`${etapa.label}: ${etapa.tituloCurto}`}
                >
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold shrink-0 ${
                      isAtiva
                        ? "bg-ambar-500 text-floresta-950"
                        : isConcluida
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-floresta-800 text-areia-400 border border-areia-500/20"
                    }`}
                  >
                    {isConcluida ? "✓" : etapa.id}
                  </span>
                  <span className="hidden lg:inline">{etapa.tituloCurto}</span>
                  <span className="lg:hidden">{etapa.tituloCurto.split(" ")[0]}</span>
                </Link>

                {idx < etapasJornada.length - 1 && (
                  <ArrowRight
                    className={`h-3 w-3 shrink-0 ${
                      isConcluida ? "text-emerald-500/60" : "text-areia-600/60"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

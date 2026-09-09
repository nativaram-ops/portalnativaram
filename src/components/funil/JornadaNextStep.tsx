import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

interface JornadaNextStepProps {
  etapaAtual: 1 | 2 | 3 | 4;
  tituloEtapaAtual: string;
  proximaEtapaNumero: 2 | 3 | 4 | 5;
  proximaEtapaTitulo: string;
  proximaEtapaDescricao: string;
  proximaEtapaHref: string;
  textoBotao: string;
  isClimax?: boolean;
}

export const JornadaNextStep: React.FC<JornadaNextStepProps> = ({
  etapaAtual,
  tituloEtapaAtual,
  proximaEtapaNumero,
  proximaEtapaTitulo,
  proximaEtapaDescricao,
  proximaEtapaHref,
  textoBotao,
  isClimax = false,
}) => {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-floresta-950 via-floresta-900/30 to-floresta-950 relative overflow-hidden border-t border-ambar-500/15">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-radial-ambar opacity-70 pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative">
        <AnimateOnScroll>
          <Card
            variant={isClimax ? "solar" : "liturgico"}
            glow
            className={`rounded-3xl p-6 sm:p-10 text-center space-y-6 ${
              isClimax
                ? "border-ambar-500/50 bg-gradient-to-br from-floresta-900 via-floresta-950 to-floresta-900 shadow-[0_0_50px_rgba(212,163,89,0.15)]"
                : "border-ambar-500/25 bg-floresta-950/90"
            }`}
          >
            {/* Header de Etapa Concluída */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="emerald" dot icon={<CheckCircle2 className="h-3 w-3" />}>
                Etapa {etapaAtual} de 5 Concluída: {tituloEtapaAtual}
              </Badge>
              <Badge variant="solar" icon={<Sparkles className="h-3 w-3" />}>
                Próximo Passo no Caminho
              </Badge>
            </div>

            {/* Chamada da Próxima Etapa */}
            <div className="space-y-3 max-w-2xl mx-auto">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-ambar-400 font-bold">
                Etapa {proximaEtapaNumero} de 5 • Aprofundamento Contínuo
              </span>
              <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-areia-100 leading-snug">
                {proximaEtapaTitulo}
              </h3>
              <p className="text-sm sm:text-base text-areia-300 font-light leading-relaxed">
                {proximaEtapaDescricao}
              </p>
            </div>

            {/* Botão de Transição Fluida */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href={proximaEtapaHref}
                className={
                  isClimax
                    ? "btn-primary text-sm sm:text-base px-8 py-3.5 shadow-solar group scale-105"
                    : "btn-primary text-xs sm:text-sm px-7 py-3 group"
                }
              >
                <span>{textoBotao}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              {isClimax && (
                <Link
                  href="/portal-dirigente"
                  className="btn-secondary text-xs sm:text-sm px-5 py-3 text-areia-300 hover:text-areia-100"
                >
                  <ShieldCheck className="h-4 w-4 text-ambar-400" />
                  <span>Já é dirigente homologado? Acesse o Portal</span>
                </Link>
              )}
            </div>
          </Card>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

import React from "react";
import { Flame } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const HomeNotaSacralidade = () => {
  return (
    <section
      className="py-section-md lg:py-section-lg relative overflow-hidden bg-gradient-to-b from-floresta-950 via-floresta-900/40 to-floresta-950"
      id="sacralidade"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-radial-ambar pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative">
        <AnimateOnScroll>
          <Card
            variant="elevated"
            glow
            className="rounded-3xl p-8 sm:p-14 border-ambar-500/35 bg-gradient-to-br from-floresta-900/95 via-floresta-950 to-floresta-900/85 text-center space-y-7"
          >
            <div className="flex justify-center">
              <Badge variant="solar" dot icon={<Flame className="h-3.5 w-3.5 text-ambar-400 animate-flicker" />}>
                Nota de Responsabilidade & Sacralidade
              </Badge>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-areia-100 max-w-3xl mx-auto leading-snug">
              &ldquo;A Cooperativa Nativaram entende a Ayahuasca como um portal sagrado.&rdquo;
            </h2>

            <div className="space-y-4 max-w-3xl mx-auto text-sm sm:text-base text-areia-200/90 leading-relaxed font-light">
              <p>
                Por isso, zelamos pela integridade de cada processo, realizando uma seleção prévia
                de todos aqueles a quem destinamos nosso sagrado sacramento. Nosso compromisso é garantir
                que ele chegue a mãos que honrem seu propósito espiritual, mantendo viva a corrente de luz e respeito.
              </p>
              <p className="text-amber-200/90 italic font-serif text-base sm:text-lg">
                &ldquo;Entendemos que a conexão com o sagrado vem através do equilíbrio, harmonia e leveza;
                nosso preparado de força é o espelho dessa busca constante.&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-ambar-500/20 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-3.5 rounded-xl bg-floresta-950/70 border border-ambar-500/15">
                <span className="text-[10px] font-mono text-ambar-400 uppercase tracking-widest block">
                  Compromisso
                </span>
                <span className="font-serif text-xs sm:text-sm font-semibold text-areia-100">
                  Seleção Litúrgica Prévia
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-floresta-950/70 border border-ambar-500/15">
                <span className="text-[10px] font-mono text-ambar-400 uppercase tracking-widest block">
                  Propósito
                </span>
                <span className="font-serif text-xs sm:text-sm font-semibold text-areia-100">
                  Corrente de Luz & Respeito
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-floresta-950/70 border border-ambar-500/15">
                <span className="text-[10px] font-mono text-ambar-400 uppercase tracking-widest block">
                  Sintonia
                </span>
                <span className="font-serif text-xs sm:text-sm font-semibold text-areia-100">
                  Equilíbrio, Harmonia & Leveza
                </span>
              </div>
            </div>
          </Card>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

import React from "react";
import Image from "next/image";
import { FileText } from "lucide-react";

export const PortalLaudosCustodia: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="card-elevated rounded-2xl p-6 sm:p-10 space-y-8 border-ambar-500/25">
        <div className="flex items-center gap-3 border-b border-ambar-500/15 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-floresta-900 border border-ambar-500/30 text-ambar-400">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-areia-100">
              Laudo de Conformidade & Cadeia de Custódia — Lote #AC-2026-08
            </h3>
            <p className="text-xs text-ambar-400 font-medium">
              Rastreabilidade documental, fitoquímica e controle microbiológico
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="rounded-xl border border-ambar-500/20 bg-floresta-950/90 p-4 space-y-1">
            <span className="text-areia-400 block font-light">Feitor Responsável</span>
            <span className="font-semibold text-areia-100 font-serif">Mestre Caboclo (28 anos)</span>
          </div>
          <div className="rounded-xl border border-ambar-500/20 bg-floresta-950/90 p-4 space-y-1">
            <span className="text-areia-400 block font-light">Origem da Biomassa</span>
            <span className="font-semibold text-areia-100 font-serif">Cruzeiro do Sul, Acre</span>
          </div>
          <div className="rounded-xl border border-ambar-500/20 bg-floresta-950/90 p-4 space-y-1">
            <span className="text-areia-400 block font-light">Perfil de Alcaloides</span>
            <span className="font-semibold text-amber-300 font-mono">Harmina 9,21 • THH 4,20</span>
          </div>
          <div className="rounded-xl border border-ambar-500/20 bg-floresta-950/90 p-4 space-y-1">
            <span className="text-areia-400 block font-light">Laudo Microbiológico</span>
            <span className="font-semibold text-emerald-400">100% Conforme (Zero Coli)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div className="overflow-hidden rounded-xl border border-ambar-500/30 bg-floresta-950 group">
            <div className="relative h-52 w-full overflow-hidden">
              <Image
                src="/assets/feitio/curadas/feitio-lote-garrafas.jpg"
                alt="Conferência do lote de sacramentos após resfriamento no Acre"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, 40vw"
              />
            </div>
            <div className="p-3.5 text-[11px] text-areia-400 text-center font-light">
              Registro de conferência e lacração do Lote #AC-2026-08 em Cruzeiro do Sul/AC.
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-ambar-500/30 bg-floresta-950 group">
            <div className="relative h-52 w-full overflow-hidden">
              <Image
                src="/assets/feitio/curadas/feitio-embalagem-custodia.jpg"
                alt="Embalagem isotérmica do sacramento preparada para despacho"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, 40vw"
              />
            </div>
            <div className="p-3.5 text-[11px] text-areia-400 text-center font-light">
              Embalagem isotérmica refrigerada selada para envio aéreo protegido.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

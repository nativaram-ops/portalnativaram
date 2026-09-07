import React from "react";

export const PortalCooperativismo: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="font-serif text-xl font-bold text-areia-100">
          Matriz de Cooperativismo Produtivo & Escala de Volume
        </h3>
        <p className="text-xs text-areia-400 font-light">
          Planejamento de cotas solidárias por litro e parâmetros para formatos especiais Mel e Gel.
        </p>
      </div>

      <div className="card-elevated rounded-2xl p-6 sm:p-8 space-y-6 border-ambar-500/20">
        <h4 className="font-serif text-base font-bold text-areia-100">
          Princípio da Tabela Evolutiva por Quantidade
        </h4>
        <p className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
          A cooperativa não visa lucro. Toda a arrecadação é dimensionada de forma regressiva na cota unitária: quanto maior o lote solicitado pela congregação (ou por um conjunto de templos de uma mesma região), mais diluído fica o custo de frete aéreo e das diárias de campo na floresta, beneficiando fraternalmente toda a irmandade.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-floresta-900/60 border border-ambar-500/15 space-y-1.5">
            <span className="text-ambar-400 font-bold text-xs uppercase tracking-wider">
              Lotes Básicos (5 a 10L)
            </span>
            <p className="text-xs text-areia-300 font-light">
              Atendimento litúrgico para cerimônias de pequeno porte com despacho regular.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-floresta-900/60 border border-ambar-500/15 space-y-1.5">
            <span className="text-amber-300 font-bold text-xs uppercase tracking-wider">
              Lotes Médios (10 a 30L)
            </span>
            <p className="text-xs text-areia-300 font-light">
              Otimização da caixa isotérmica completa, reduzindo o rateio de frete proporcional por litro.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-floresta-900/60 border border-ambar-500/15 space-y-1.5">
            <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider">
              Formatos Mel & Gel
            </span>
            <p className="text-xs text-areia-300 font-light">
              Concentração extrema de volume para envio compartilhado sem perda somática.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

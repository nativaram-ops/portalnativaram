"use client";

import React, { useState } from "react";
import {
  Scale,
  Sparkles,
  TreePine,
  ShieldCheck,
  Calculator,
  ArrowRight,
  Printer,
  HeartHandshake,
  Clock,
  Coins,
  CheckCircle2,
  Droplets,
  Layers,
  HelpCircle,
  TrendingDown,
  Info,
} from "lucide-react";
import {
  TABELA_EVOLUTIVA_RATEIO,
  CONDICOES_RATEIO_COOPERATIVO,
  obterCotaRateio,
} from "@/data/graduacoes";

interface PortalCooperativismoProps {
  onIrParaCalculadora?: () => void;
  onIrParaSolicitacao?: () => void;
}

export const PortalCooperativismo: React.FC<PortalCooperativismoProps> = ({
  onIrParaCalculadora,
  onIrParaSolicitacao,
}) => {
  // Estado do Simulador Rápido de Rateio
  const [graduacaoSimulada, setGraduacaoSimulada] = useState<string>("5.1_PITUA");
  const [volumeSimulado, setVolumeSimulado] = useState<number>(10);

  const resultadoSimulacao = obterCotaRateio(graduacaoSimulada, volumeSimulado);
  const itemGrad =
    TABELA_EVOLUTIVA_RATEIO.find((t) => t.graduacaoId === graduacaoSimulada) ||
    TABELA_EVOLUTIVA_RATEIO[1];

  const handleImprimir = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Cabeçalho Solene Institucional */}
      <div className="print-hidden p-6 rounded-2xl bg-floresta-950/85 border border-ambar-500/25 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-elevated-sm">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-ambar-400" />
            <h3 className="font-serif text-lg md:text-xl font-bold text-areia-100">
              Tabela Evolutiva de Cotas de Rateio por Volume
            </h3>
          </div>
          <p className="text-xs md:text-sm text-areia-300 font-light max-w-3xl leading-relaxed">
            Modelo de cooperativismo de rateio operacional sem fins lucrativos (Lei nº 5.764/1971 e Resolução CONAD nº 01/2010). Quanto maior o lote solicitado pela congregação, mais diluídos tornam-se os custos de logística aérea refrigerada e as diárias de feitio na floresta.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleImprimir}
            className="btn-secondary text-xs inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl"
            title="Imprimir Tabela para Pasta do Templo"
          >
            <Printer className="h-3.5 w-3.5 text-ambar-400" />
            <span>Imprimir A4</span>
          </button>
          {onIrParaCalculadora && (
            <button
              onClick={onIrParaCalculadora}
              className="btn-primary text-xs inline-flex items-center gap-1.5 px-4 py-2 rounded-xl shadow-solar"
            >
              <Calculator className="h-3.5 w-3.5" />
              <span>Calculadora</span>
            </button>
          )}
        </div>
      </div>

      {/* Destaques do Feitio e Purismo Botânico */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
        <div className="p-4 rounded-xl bg-floresta-950/70 border border-ambar-500/15 space-y-1">
          <div className="flex items-center gap-2 text-ambar-400 font-mono text-[10px] uppercase tracking-wider font-bold">
            <TreePine className="h-3.5 w-3.5" />
            <span>Tradição Amazônica</span>
          </div>
          <div className="font-bold text-areia-100 text-xs">28+ Anos de Feitio</div>
          <p className="text-areia-400 text-[11px] font-light leading-relaxed">
            Produzida artesanalmente no Vale do Juruá em Cruzeiro do Sul/AC com rezo e respeito ancestral.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-floresta-950/70 border border-ambar-500/15 space-y-1">
          <div className="flex items-center gap-2 text-ambar-400 font-mono text-[10px] uppercase tracking-wider font-bold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Binômio Sagrado</span>
          </div>
          <div className="font-bold text-areia-100 text-xs">Tucunacá &amp; Rainha</div>
          <p className="text-areia-400 text-[11px] font-light leading-relaxed">
            Cipó Tucunacá autêntico e folha Chacrona colhida com rezo matinal. Isento de anayahuascas.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-floresta-950/70 border border-ambar-500/15 space-y-1">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-[10px] uppercase tracking-wider font-bold">
            <HeartHandshake className="h-3.5 w-3.5" />
            <span>Sem Fins Lucrativos</span>
          </div>
          <div className="font-bold text-areia-100 text-xs">Rateio Solidário</div>
          <p className="text-areia-400 text-[11px] font-light leading-relaxed">
            Contribuições direcionadas à manutenção das famílias no Acre, logística e projetos de acolhimento.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-floresta-950/70 border border-ambar-500/15 space-y-1">
          <div className="flex items-center gap-2 text-amber-300 font-mono text-[10px] uppercase tracking-wider font-bold">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Destinação Litúrgica</span>
          </div>
          <div className="font-bold text-areia-100 text-xs">Templos Homologados</div>
          <p className="text-areia-400 text-[11px] font-light leading-relaxed">
            Atendimento exclusivo para congregações credenciadas amparadas na Resolução CONAD nº 01/2010.
          </p>
        </div>
      </div>

      {/* TABELA EVOLUTIVA OFICIAL — DOCUMENTO A4 IMPRIMÍVEL */}
      <div className="documento-a4-impressao p-6 rounded-2xl bg-floresta-950/90 border border-ambar-500/30 space-y-5 shadow-elevated-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-ambar-500/20 pb-4">
          <div>
            <span className="text-[10px] font-mono uppercase text-ambar-400 tracking-widest block">
              Tabela de Rateio Solidário de Feitio e Logística
            </span>
            <h4 className="font-serif text-lg font-bold text-areia-100">
              Escala de Cotas Operacionais por Volume
            </h4>
          </div>
          <span className="text-xs font-mono text-amber-300 bg-amber-950/70 border border-amber-500/30 px-3 py-1 rounded-full">
            Válido para Pagamento à Vista • Parcelamento c/ Taxa de Cartão
          </span>
        </div>

        {/* Tabela de Dados */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-areia-200 border-collapse">
            <thead>
              <tr className="border-b border-ambar-500/20 text-[11px] font-mono uppercase text-ambar-400 tracking-wider">
                <th className="pb-3 pr-3 font-bold">Graduação &amp; Nome Sagrado</th>
                <th className="pb-3 pr-3 font-bold">Proporção Biomassa</th>
                <th className="pb-3 pr-3 font-bold">Faixa 5 a 10 Litros</th>
                <th className="pb-3 pr-3 font-bold text-emerald-400">Faixa 10 a 20 Litros</th>
                <th className="pb-3 font-bold text-right">Acima de 20 Litros</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ambar-500/10 font-mono text-xs">
              {TABELA_EVOLUTIVA_RATEIO.map((item) => (
                <tr
                  key={item.graduacaoId}
                  className="hover:bg-floresta-900/40 transition-colors"
                >
                  <td className="py-3.5 pr-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-floresta-900 border border-ambar-500/30 text-ambar-400 px-2 py-0.5 rounded text-[11px] font-bold">
                        {item.codigo}
                      </span>
                      <span className="font-serif font-bold text-areia-100">
                        {item.nome}
                      </span>
                    </div>
                    <span className="text-[10px] text-areia-400/80 font-sans block mt-0.5">
                      {item.observacao}
                    </span>
                  </td>

                  <td className="py-3.5 pr-3 text-areia-300 font-sans">
                    {item.proporcaoBiomassa}
                  </td>

                  <td className="py-3.5 pr-3">
                    <span className="font-bold text-areia-100">
                      R$ {item.valor5a10L.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-[10px] text-areia-400 font-sans block">
                      por {item.unidade}
                    </span>
                  </td>

                  <td className="py-3.5 pr-3">
                    <div className="inline-flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
                      <span className="font-bold text-emerald-300">
                        R$ {item.valor10a20L.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-sans">
                        / {item.unidade}
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-sans flex items-center gap-0.5 mt-0.5">
                      <TrendingDown className="h-3 w-3" />
                      Economia de R$ {item.economiaPorUnidade},00/{item.unidade.split(" ")[0].toLowerCase()}
                    </span>
                  </td>

                  <td className="py-3.5 text-right">
                    <span className="text-amber-300 font-medium font-sans bg-amber-950/40 border border-amber-500/20 px-2.5 py-1 rounded-lg text-[11px]">
                      A combinar
                    </span>
                    <span className="text-[9px] text-areia-400 font-sans block mt-0.5">
                      Sazonalidade de insumos
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Rodapé Informativo da Tabela */}
        <div className="pt-3 border-t border-ambar-500/15 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-areia-300 font-light">
          <div className="p-3 rounded-xl bg-floresta-900/50 border border-ambar-500/10 space-y-1">
            <span className="font-mono text-[10px] text-ambar-400 uppercase font-bold block flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> Pedido sob Encomenda
            </span>
            <p className="text-[11px] leading-relaxed">
              Mínimo operacional de <strong>5 litros</strong> (recomendação padrão: 10x1 semi-mel). Antecedência mínima sugerida de <strong>30 dias</strong> para assegurar qualidade no feitio tradicional.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-floresta-900/50 border border-ambar-500/10 space-y-1">
            <span className="font-mono text-[10px] text-amber-300 uppercase font-bold block flex items-center gap-1">
              <Coins className="h-3.5 w-3.5" /> Condições de Rateio
            </span>
            <p className="text-[11px] leading-relaxed">
              Valores base calculados para pagamento à vista. Parcelamento fraterno disponível com repasse estrito das tarifas cobradas pela operadora de cartão de crédito.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-floresta-900/50 border border-ambar-500/10 space-y-1">
            <span className="font-mono text-[10px] text-emerald-400 uppercase font-bold block flex items-center gap-1">
              <HeartHandshake className="h-3.5 w-3.5" /> Destinação Social
            </span>
            <p className="text-[11px] leading-relaxed">
              Parte das contribuições apoia o fortalecimento do projeto e o acolhimento integrativo de irmãos em processos de recuperação e transformação de vida.
            </p>
          </div>
        </div>
      </div>

      {/* SIMULADOR INTERATIVO DE COTA & ECONOMIA POR VOLUME */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-floresta-950 via-floresta-900 to-floresta-950 border border-ambar-500/30 space-y-5 shadow-elevated-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-ambar-500/20 pb-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Calculator className="h-4 w-4 text-ambar-400" />
              <h4 className="font-serif text-base font-bold text-areia-100">
                Simulador Rápido de Rateio por Graduação &amp; Volume
              </h4>
            </div>
            <p className="text-xs text-areia-300 font-light">
              Selecione a graduação e o volume para visualizar a cota exata aplicada à sua congregação.
            </p>
          </div>

          <span className="text-[11px] font-mono text-ambar-400 bg-floresta-950 px-2.5 py-1 rounded-lg border border-ambar-500/20">
            {resultadoSimulacao.faixaLabel}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Controles de Simulação (7 Colunas) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Seletor de Graduação */}
            <div className="space-y-2">
              <label className="text-xs font-serif font-bold text-areia-100 block">
                1. Selecione o Sacramento / Graduação:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {TABELA_EVOLUTIVA_RATEIO.map((item) => (
                  <button
                    key={item.graduacaoId}
                    type="button"
                    onClick={() => setGraduacaoSimulada(item.graduacaoId)}
                    className={`p-2.5 rounded-xl text-left transition-all border text-xs ${
                      graduacaoSimulada === item.graduacaoId
                        ? "bg-floresta-900 border-ambar-500 text-areia-100 shadow-solar"
                        : "bg-floresta-900/40 border-ambar-500/15 text-areia-300 hover:bg-floresta-900/70"
                    }`}
                  >
                    <span className="text-[10px] font-mono font-bold text-ambar-400 block">
                      {item.codigo}
                    </span>
                    <span className="font-serif font-bold text-xs block truncate">
                      {item.nome}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Seletor de Volume */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-serif font-bold text-areia-100">
                  2. Volume Desejado ({itemGrad.unidade}):
                </label>
                <span className="text-xs font-mono font-bold text-ambar-400 bg-floresta-900 px-2 py-0.5 rounded border border-ambar-500/20">
                  {volumeSimulado} {itemGrad.unidade}
                </span>
              </div>

              {/* Botões rápidos */}
              <div className="grid grid-cols-6 gap-1.5">
                {[5, 8, 10, 15, 20, 25].map((vol) => (
                  <button
                    key={vol}
                    type="button"
                    onClick={() => setVolumeSimulado(vol)}
                    className={`py-1.5 rounded-lg text-xs font-semibold text-center transition-all ${
                      volumeSimulado === vol
                        ? "bg-ambar-500 text-floresta-950 font-bold"
                        : "bg-floresta-900/60 text-areia-300 hover:bg-floresta-800 border border-ambar-500/15"
                    }`}
                  >
                    {vol}{itemGrad.unidade === "Litro" ? "L" : "kg"}
                  </button>
                ))}
              </div>

              {/* Slider */}
              <input
                type="range"
                min={1}
                max={30}
                step={1}
                value={volumeSimulado}
                onChange={(e) => setVolumeSimulado(Number(e.target.value))}
                className="w-full accent-ambar-500 cursor-pointer mt-1"
              />
            </div>
          </div>

          {/* Resultado da Simulação (5 Colunas) */}
          <div className="lg:col-span-5 p-5 rounded-2xl bg-floresta-950/90 border border-ambar-500/35 space-y-4 shadow-elevated-sm">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-mono text-ambar-400 uppercase tracking-widest block">
                Cota de Rateio Total Estimada
              </span>
              <div className="font-serif text-3xl font-black text-areia-100 text-glow">
                {resultadoSimulacao.aCombinar
                  ? "Sob Consulta"
                  : `R$ ${resultadoSimulacao.valorTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
              </div>
              <p className="text-xs text-areia-300 font-light">
                {volumeSimulado} {itemGrad.unidade} de {itemGrad.codigo} {itemGrad.nome}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-ambar-500/15">
              <div className="p-2.5 rounded-xl bg-floresta-900/60 border border-ambar-500/10">
                <span className="text-[9px] font-mono text-ambar-400 uppercase block">Cota Unitária</span>
                <div className="font-bold text-areia-100 text-sm mt-0.5">
                  R$ {resultadoSimulacao.valorUnitario.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </div>
                <span className="text-[9px] text-areia-400">por {itemGrad.unidade.split(" ")[0].toLowerCase()}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-floresta-900/60 border border-ambar-500/10">
                <span className="text-[9px] font-mono text-emerald-400 uppercase block">Economia Gerada</span>
                <div className="font-bold text-emerald-400 text-sm mt-0.5">
                  {resultadoSimulacao.economiaTotal > 0
                    ? `R$ ${resultadoSimulacao.economiaTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
                    : "Faixa Base"}
                </div>
                <span className="text-[9px] text-areia-400">
                  {resultadoSimulacao.economiaTotal > 0 ? "Por escala cooperativa" : "Lotes 5 a 10L"}
                </span>
              </div>
            </div>

            {volumeSimulado < 5 && (
              <div className="p-2 rounded-lg bg-amber-950/40 border border-amber-500/30 text-[11px] text-amber-200/90 flex items-start gap-1.5">
                <Info className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Lote mínimo de feitio e despacho refrigerado: <strong>5 Litros</strong>.
                </span>
              </div>
            )}

            {onIrParaSolicitacao && (
              <button
                onClick={onIrParaSolicitacao}
                className="btn-primary w-full justify-center text-xs py-2.5 shadow-solar flex items-center gap-2 mt-2"
              >
                <span>Montar Solicitação com Este Volume</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

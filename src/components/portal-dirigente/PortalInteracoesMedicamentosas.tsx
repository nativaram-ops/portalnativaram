"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  AlertTriangle,
  ShieldCheck,
  Printer,
  Clock,
  FlaskConical,
  XCircle,
  HelpCircle,
  HeartPulse,
  Flame,
  Zap,
  PhoneCall,
  Activity,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  INTERACOES_MEDICAMENTOSAS,
  CRITERIOS_HUNTER,
  TOXICIDADE_LITIO,
  InteracaoMedicamentosa,
} from "@/data/portal-assessoria";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const PortalInteracoesMedicamentosas: React.FC = () => {
  const [busca, setBusca] = useState("");
  const [filtroRisco, setFiltroRisco] = useState<string>("TODOS");
  const [expandidoId, setExpandidoId] = useState<string | null>(null);

  const farmacosFiltrados = useMemo(() => {
    return INTERACOES_MEDICAMENTOSAS.filter((f) => {
      const matchBusca =
        f.principioAtivo.toLowerCase().includes(busca.toLowerCase()) ||
        f.nomesComerciais.some((nc) => nc.toLowerCase().includes(busca.toLowerCase())) ||
        f.classeFarmacologica.toLowerCase().includes(busca.toLowerCase()) ||
        f.viasMetabolicas.toLowerCase().includes(busca.toLowerCase());

      const matchFiltro =
        filtroRisco === "TODOS" || f.nivelRisco === filtroRisco;

      return matchBusca && matchFiltro;
    });
  }, [busca, filtroRisco]);

  const handleImprimir = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const toggleExpandir = (id: string) => {
    setExpandidoId(expandidoId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho de Orientação (Oculto na Impressão) */}
      <div className="print-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl bg-floresta-950/80 border border-ambar-500/20">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <HeartPulse className="h-4 w-4 text-red-400" />
            <span className="font-serif text-base font-bold text-areia-100">
              Compêndio de Etnofarmacologia &amp; Interações Medicamentosas
            </span>
          </div>
          <p className="text-xs text-areia-300 font-light max-w-2xl leading-relaxed">
            Consulte as 15 classes farmacológicas do compêndio oficial, cinéticas de depuração (janela biológica de 5 a 7 meias-vidas de eliminação), vias enzimáticas (CYP2D6/CYP3A4) e protocolos de salvaguarda da vida.
          </p>
        </div>

        <button
          onClick={handleImprimir}
          className="btn-primary text-xs inline-flex items-center gap-2 px-4 py-2.5 shadow-solar shrink-0"
        >
          <Printer className="h-4 w-4" />
          <span>Imprimir Compêndio em A4 / PDF</span>
        </button>
      </div>

      {/* Alerta Sanitário de Altíssimo Impacto: LÍTIO & STATUS EPILEPTICUS */}
      <div className="p-4 sm:p-5 rounded-2xl border-l-4 border-l-red-500 bg-red-950/40 border border-red-500/30 text-xs text-areia-200 space-y-2.5 shadow-lg">
        <div className="flex items-center gap-2 text-red-400 font-bold uppercase tracking-wider font-mono text-xs">
          <Zap className="h-4 w-4 text-red-400 animate-pulse" />
          <span>ALERTA MÁXIMO DE SEGURANÇA: CARBONATO DE LÍTIO (STATUS EPILEPTICUS &amp; MORTE CEREBRAL)</span>
        </div>
        <p className="leading-relaxed font-light text-areia-200">
          {TOXICIDADE_LITIO.resumo}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-mono text-[11px]">
          <div className="bg-red-950/60 p-2.5 rounded-lg border border-red-500/20">
            <span className="text-red-300 font-bold block">Fisiopatologia</span>
            <span className="text-areia-300 text-[10px]">{TOXICIDADE_LITIO.mecanismo}</span>
          </div>
          <div className="bg-red-950/60 p-2.5 rounded-lg border border-red-500/20">
            <span className="text-red-300 font-bold block">Incidência em Casos Clínicos</span>
            <span className="text-red-200 font-bold">{TOXICIDADE_LITIO.incidenciaConvulsao}</span>
            <span className="text-areia-400 text-[10px] block mt-0.5">Disparos paroxísticos corticais generalizados.</span>
          </div>
          <div className="bg-red-950/60 p-2.5 rounded-lg border border-red-500/20">
            <span className="text-red-300 font-bold block">Diretriz Institucional</span>
            <span className="text-red-400 font-bold">{TOXICIDADE_LITIO.diretriz}</span>
          </div>
        </div>
      </div>

      {/* Card de Diagnóstico Rápido: CRITÉRIOS DE HUNTER PARA SÍNDROME SEROTONINÉRGICA */}
      <div className="p-4 sm:p-5 rounded-2xl bg-floresta-900/60 border border-amber-500/30 text-xs text-areia-200 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider font-mono text-xs">
            <Activity className="h-4 w-4 text-amber-400" />
            <span>CRITÉRIOS DE HUNTER — DIAGNÓSTICO RÁPIDO DE TOXICIDADE SEROTONINÉRGICA</span>
          </div>
          <span className="text-[10px] font-mono text-areia-400 bg-floresta-950/80 px-2 py-0.5 rounded border border-amber-500/20">
            Padrão Ouro Internacional (Sensibilidade 84% / Especificidade 97%)
          </span>
        </div>
        <p className="text-areia-300 font-light leading-relaxed">
          Se o participante tiver ingerido qualquer substância serotoninérgica e apresentar <strong>PELO MENOS UM</strong> dos achados abaixo, diagnostica-se Síndrome Serotoninérgica aguda. Acione imediatamente o <strong>SAMU 192</strong> e posicione o participante em <strong>Posição Lateral de Segurança (PLS)</strong>:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 font-mono text-[11px]">
          {CRITERIOS_HUNTER.map((crit, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2 p-2.5 rounded-xl bg-floresta-950/80 border border-amber-500/15"
            >
              <span className="text-amber-400 font-bold shrink-0">{idx + 1}.</span>
              <span className="text-areia-200 leading-snug">{crit}</span>
            </div>
          ))}
        </div>
        <div className="pt-1 flex items-center gap-2 text-[11px] text-red-300">
          <PhoneCall className="h-3.5 w-3.5 text-red-400 shrink-0" />
          <span>Ao ligar para o 192: informe com clareza a ingestão de Inibidores da MAO (Ayahuasca) e o medicamento suspeito.</span>
        </div>
      </div>

      {/* Barra de Busca e Filtros de Risco (Oculto na Impressão) */}
      <div className="print-hidden flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Campo de Busca Rápida */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-areia-400" />
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar princípio ativo, marca comercial ou classe (ex: Fluoxetina, Venlafaxina, Lítio, Ritalina, Tramadol, Zolpidem)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-floresta-900/60 border border-ambar-500/20 text-xs text-areia-100 placeholder-areia-400/60 focus:outline-none focus:border-ambar-500/50"
          />
        </div>

        {/* Filtros Rápidos por Risco */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: "TODOS", label: "Todas as 15 Classes" },
            { id: "LETAL_ABSOLUTO", label: "🔴 Risco Letal (VETADO)", cor: "text-red-400" },
            { id: "SEVERO_MODERADO", label: "🟡 Relativo / Parecer Médico", cor: "text-amber-400" },
            { id: "COMPATIVEL_MONITORADO", label: "🟢 Compatíveis", cor: "text-emerald-400" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFiltroRisco(f.id)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                filtroRisco === f.id
                  ? "bg-ambar-500 text-floresta-950 font-bold shadow"
                  : "bg-floresta-900/40 text-areia-300 hover:bg-floresta-800/50 border border-ambar-500/10"
              }`}
            >
              <span className={f.cor}>{f.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ÁREA DE TABELA / DOCUMENTO IMPRESSO EM A4 */}
      <div className="documento-a4-impressao rounded-2xl bg-floresta-950/90 border border-ambar-500/20 p-5 sm:p-6 space-y-4">
        {/* Cabeçalho da Impressão (Aparece no papel) */}
        <div className="hidden print:block text-center border-b-2 border-pedra-800 pb-3 mb-4">
          <h2 className="font-serif text-lg font-bold uppercase text-pedra-950">
            Cooperativa Nativaram • Compêndio Oficial de Etnofarmacologia e Incompatibilidades
          </h2>
          <p className="text-xs text-pedra-600 font-mono">
            Documento Restrito de Salvaguarda Litúrgica, Triagem Sanitária e Apoio a Emergências Médicas
          </p>
        </div>

        {/* Contador de Resultados */}
        <div className="print-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-areia-400 font-mono">
          <span>Exibindo {farmacosFiltrados.length} princípios ativos cadastrados no acervo técnico</span>
          <span className="text-ambar-400">Toque no item para expandir a farmacocinética</span>
        </div>

        {/* 1. VISUALIZAÇÃO MOBILE: CARDS TÁTEIS ADAPTATIVOS (block md:hidden) */}
        <div className="block md:hidden space-y-3 print-hidden">
          {farmacosFiltrados.map((item) => {
            const isLetal = item.nivelRisco === "LETAL_ABSOLUTO";
            const isSevero = item.nivelRisco === "SEVERO_MODERADO";
            const isExpandido = expandidoId === item.id;

            return (
              <div
                key={`mob-${item.id}`}
                onClick={() => toggleExpandir(item.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isLetal
                    ? "border-red-500/40 bg-red-950/20"
                    : isSevero
                    ? "border-amber-500/30 bg-floresta-950/80"
                    : "border-ambar-500/15 bg-floresta-950/60"
                } ${isExpandido ? "ring-1 ring-ambar-400/40 shadow-solar" : ""}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono text-ambar-400/80 block">
                      Classe {item.classeNumero} • {item.classeFarmacologica}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-areia-100">
                      {item.principioAtivo}
                    </h4>
                  </div>
                  <div className="shrink-0">
                    {isExpandido ? (
                      <ChevronUp className="h-4 w-4 text-ambar-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-areia-400" />
                    )}
                  </div>
                </div>

                <p className="text-[11px] text-areia-400/80 mt-1">
                  Exemplos: {item.nomesComerciais.join(", ")}
                </p>

                {/* Badges de Risco e Washout */}
                <div className="flex flex-wrap items-center gap-2 pt-2.5">
                  {isLetal && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold font-mono text-red-400 bg-red-950/60 border border-red-500/30 px-2 py-0.5 rounded">
                      <XCircle className="h-3 w-3" />
                      RISCO LETAL
                    </span>
                  )}
                  {isSevero && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold font-mono text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded">
                      <AlertTriangle className="h-3 w-3" />
                      EXIGE LAUDO
                    </span>
                  )}
                  {!isLetal && !isSevero && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                      <ShieldCheck className="h-3 w-3" />
                      COMPATÍVEL
                    </span>
                  )}

                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-ambar-300 bg-floresta-900 px-2 py-0.5 rounded border border-ambar-500/20">
                    <Clock className="h-3 w-3 text-ambar-400" />
                    Washout: {item.washoutMinimo}
                  </span>
                </div>

                <p className="text-xs text-areia-300/90 font-light leading-relaxed pt-2 mt-2 border-t border-ambar-500/10">
                  <strong className="text-areia-100 font-semibold">Diretriz:</strong> {item.recomendacaoLiturgica}
                </p>

                {/* Conteúdo Expandido no Mobile */}
                {isExpandido && (
                  <div className="mt-3 pt-3 border-t border-ambar-500/20 space-y-2 text-xs font-mono animate-fade-in">
                    <div className="p-3 rounded-lg bg-floresta-900/80 border border-ambar-500/15 space-y-1">
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                        Mecanismo de Interação com Ayahuasca
                      </span>
                      <p className="text-[11px] text-areia-200 font-sans font-light leading-relaxed">
                        {item.mecanismo}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-2 text-[10px]">
                      <div className="p-2.5 rounded-lg bg-floresta-900/60 border border-ambar-500/15">
                        <span className="text-amber-400 font-bold block">Vias CYP450</span>
                        <span className="text-areia-300 font-sans">{item.viasMetabolicas}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-floresta-900/60 border border-ambar-500/15">
                        <span className="text-amber-400 font-bold block">Cinética de Eliminação</span>
                        <span className="text-areia-300 font-sans">
                          t½: {item.meiaVida} • Janela de Washout: {item.washoutMinimo}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 2. VISUALIZAÇÃO DESKTOP & IMPRESSÃO A4 (hidden md:block print:block) */}
        <div className="hidden md:block print:block overflow-x-auto">
          <table className="w-full text-left text-xs text-areia-200 border-collapse">
            <thead>
              <tr className="border-b border-ambar-500/20 text-[11px] font-mono uppercase text-ambar-400 tracking-wider">
                <th className="pb-3 font-bold">Medicamento / Nomes Comerciais</th>
                <th className="pb-3 font-bold">Classe Farmacológica</th>
                <th className="pb-3 font-bold">Classificação de Risco</th>
                <th className="pb-3 font-bold">Janela Biológica (Washout)</th>
                <th className="pb-3 font-bold">Diretriz da Dirigência</th>
                <th className="pb-3 font-bold print-hidden text-center">Detalhes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ambar-500/10 font-light">
              {farmacosFiltrados.map((item) => {
                const isLetal = item.nivelRisco === "LETAL_ABSOLUTO";
                const isSevero = item.nivelRisco === "SEVERO_MODERADO";
                const isExpandido = expandidoId === item.id;

                return (
                  <React.Fragment key={item.id}>
                    <tr
                      onClick={() => toggleExpandir(item.id)}
                      className={`cursor-pointer hover:bg-floresta-900/40 transition-colors ${
                        isLetal ? "bg-red-950/10" : ""
                      } ${isExpandido ? "bg-floresta-900/50" : ""}`}
                    >
                      <td className="py-3.5 pr-4 align-top">
                        <div className="font-semibold text-areia-100 text-sm">
                          {item.principioAtivo}
                        </div>
                        <div className="text-[10px] text-areia-400/80 mt-0.5">
                          Exemplos: {item.nomesComerciais.join(", ")}
                        </div>
                      </td>

                      <td className="py-3.5 pr-4 align-top text-xs text-areia-300">
                        <span className="font-mono text-[10px] text-ambar-400/80 block">
                          Classe {item.classeNumero}
                        </span>
                        {item.classeFarmacologica}
                      </td>

                      <td className="py-3.5 pr-4 align-top">
                        {isLetal && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold font-mono text-red-400 bg-red-950/60 border border-red-500/30 px-2 py-0.5 rounded">
                            <XCircle className="h-3 w-3" />
                            RISCO LETAL (VETADO)
                          </span>
                        )}
                        {isSevero && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold font-mono text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded">
                            <AlertTriangle className="h-3 w-3" />
                            EXIGE LAUDO / CUIDADO
                          </span>
                        )}
                        {!isLetal && !isSevero && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                            <ShieldCheck className="h-3 w-3" />
                            COMPATÍVEL
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 pr-4 align-top font-mono text-[11px] text-ambar-300">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 shrink-0 text-ambar-400" />
                          <span>{item.washoutMinimo}</span>
                        </div>
                        <div className="text-[9px] text-areia-400 font-mono mt-0.5">
                          t½: {item.meiaVida}
                        </div>
                      </td>

                      <td className="py-3.5 align-top text-xs text-areia-300/90 leading-relaxed max-w-xs">
                        {item.recomendacaoLiturgica}
                      </td>

                      <td className="py-3.5 align-middle print-hidden text-center">
                        <button
                          type="button"
                          className="text-areia-400 hover:text-ambar-400 transition-colors p-1"
                          aria-label="Expandir detalhes farmacológicos"
                        >
                          {isExpandido ? (
                            <ChevronUp className="h-4 w-4 text-ambar-400" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </button>
                      </td>
                    </tr>

                    {/* Linha Expandida com Farmacocinética e Vias Enzimáticas */}
                    {(isExpandido || false) && (
                      <tr className="bg-floresta-900/70 border-b border-ambar-500/20">
                        <td colSpan={6} className="p-4 space-y-2 text-xs">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-[11px]">
                            <div className="p-3 rounded-xl bg-floresta-950/90 border border-ambar-500/20 space-y-1">
                              <span className="text-ambar-400 font-bold uppercase tracking-wider block">
                                Mecanismo Farmacológico &amp; Interação com Inibidores de MAO
                              </span>
                              <p className="text-areia-200 font-sans font-light leading-relaxed">
                                {item.mecanismo}
                              </p>
                            </div>
                            <div className="p-3 rounded-xl bg-floresta-950/90 border border-ambar-500/20 space-y-2">
                              <div>
                                <span className="text-ambar-400 font-bold uppercase tracking-wider block">
                                  Vias Metabólicas &amp; Citocromo P450
                                </span>
                                <span className="text-areia-300 font-sans font-light">
                                  {item.viasMetabolicas}
                                </span>
                              </div>
                              <div>
                                <span className="text-ambar-400 font-bold uppercase tracking-wider block">
                                  Cinética de Depuração Linear
                                </span>
                                <span className="text-areia-300 font-sans font-light">
                                  Meia-vida ($t_{"{1/2}"}$): {item.meiaVida} • Janela segura: {item.washoutMinimo}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>

          {farmacosFiltrados.length === 0 && (
            <div className="text-center py-10 text-areia-400 text-xs">
              Nenhum medicamento encontrado para a busca &quot;{busca}&quot;. Em caso de dúvida sobre um fármaco não listado, submeta para a curadoria da cooperativa via canal de apoio litúrgico.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  AlertTriangle,
  ShieldCheck,
  Printer,
  Clock,
  XCircle,
  HeartPulse,
  Zap,
  PhoneCall,
  Activity,
  ChevronDown,
  ChevronUp,
  Info,
  FileSpreadsheet,
  Download,
  X,
  LayoutGrid,
  Columns,
  Siren,
  Pill,
} from "lucide-react";
import {
  INTERACOES_MEDICAMENTOSAS,
  CRITERIOS_HUNTER,
  TOXICIDADE_LITIO,
  EXCECAO_DESINTOXICACAO_PDF,
  DiretrizOperacionalPdf,
} from "@/data/portal-assessoria";
import {
  exportarMedicamentosExcel,
  exportarMedicamentosCSV,
  exportarMedicamentosPDF,
} from "@/lib/export-medicamentos";

const BADGES_DIRETRIZ_PDF: Record<
  DiretrizOperacionalPdf,
  {
    label: string;
    curto: string;
    badgeClass: string;
    cardBorderClass: string;
    headerBgClass: string;
    descricaoCurta: string;
  }
> = {
  NAO_PODE_PARTICIPAR: {
    label: "🔴 NÃO PODE PARTICIPAR",
    curto: "🔴 Veto Absoluto",
    badgeClass: "text-red-200 bg-red-950/90 border-red-500/50",
    cardBorderClass: "border-red-500/40 bg-red-950/15 hover:border-red-500/60",
    headerBgClass: "bg-red-950/40 border-b border-red-500/30",
    descricaoCurta:
      "Lítio (Carbolitium), Antipsicóticos (Haldol, Risperdal, Seroquel, Zyprexa), Anticonvulsivantes (Depakene, Tegretol, Gardenal, Lamictal), Antiparkinsonianos (Prolopa) e Antidepressivos em uso ativo.",
  },
  CASO_CLINICO_NAO_RECOMENDADO: {
    label: "🟠 CASO CLÍNICO NÃO RECOMENDADO",
    curto: "🟠 Caso Não Recomendado",
    badgeClass: "text-orange-200 bg-orange-950/90 border-orange-500/50",
    cardBorderClass:
      "border-orange-500/40 bg-orange-950/15 hover:border-orange-500/60",
    headerBgClass: "bg-orange-950/40 border-b border-orange-500/30",
    descricaoCurta:
      "Hipnóticos Não-Benzodiazepínicos 'Z' (Zolpidem / Stilnox, Patz, Turno, Zopiclona, Eszopiclona). Risco de sonambulismo dissociativo e amnésia.",
  },
  INTERROMPER_DIAS_ANTES: {
    label: "🔵 INTERROMPER DIAS ANTES (WASHOUT)",
    curto: "🔵 Interromper Dias Antes",
    badgeClass: "text-sky-200 bg-sky-950/90 border-sky-500/50",
    cardBorderClass: "border-sky-500/35 bg-sky-950/15 hover:border-sky-500/55",
    headerBgClass: "bg-sky-950/40 border-b border-sky-500/30",
    descricaoCurta:
      "Estimulantes (Ritalina, Venvanse), Opioides (Tramadol), Triptanos (Sumax, Naramig), Linezolida, Antieméticos (Vonau, Plasil), GLP-1 (Ozempic, Mounjaro) e Desmame Médico de Antidepressivos.",
  },
  NAO_TOMAR_NO_DIA: {
    label: "🟡 NÃO TOMAR NO DIA",
    curto: "🟡 Não Tomar no Dia",
    badgeClass: "text-amber-200 bg-amber-950/90 border-amber-500/50",
    cardBorderClass:
      "border-amber-500/35 bg-amber-950/15 hover:border-amber-500/55",
    headerBgClass: "bg-amber-950/40 border-b border-amber-500/30",
    descricaoCurta:
      "Ansiolíticos Benzodiazepínicos (Rivotril, Frontal, Lexotan, Diazepam/Valium, Lorax, Olcadil, Rohypnol, Dormonid), Relaxantes Musculares (Miosan, Dorflex) e Descongestionantes (Neosoro).",
  },
};

const ATALHOS_BUSCA_RAPIDA = [
  "Fluoxetina",
  "Rivotril",
  "Carbolitium",
  "Zolpidem",
  "Venvanse",
  "Ozempic",
  "Seroquel",
  "Limbitrol",
  "Tramadol",
  "Prolopa",
  "Depakote",
  "Ritalina",
];

type ModoVisualizacao = "CARDS_DETALHADOS" | "QUADRO_4_CORES" | "EMERGENCIA";

export const PortalInteracoesMedicamentosas: React.FC = () => {
  const [busca, setBusca] = useState("");
  const [filtroRisco, setFiltroRisco] = useState<string>("TODOS");
  const [expandidoId, setExpandidoId] = useState<string | null>(null);
  const [modoVisao, setModoVisao] =
    useState<ModoVisualizacao>("CARDS_DETALHADOS");

  const contagensPorCor = useMemo(() => {
    const mapa: Record<string, number> = {
      TODOS: INTERACOES_MEDICAMENTOSAS.length,
      NAO_PODE_PARTICIPAR: 0,
      CASO_CLINICO_NAO_RECOMENDADO: 0,
      INTERROMPER_DIAS_ANTES: 0,
      NAO_TOMAR_NO_DIA: 0,
    };
    for (const item of INTERACOES_MEDICAMENTOSAS) {
      const dir = item.diretrizPdf || "INTERROMPER_DIAS_ANTES";
      mapa[dir] = (mapa[dir] || 0) + 1;
    }
    return mapa;
  }, []);

  const totalMarcasCadastradas = useMemo(() => {
    return INTERACOES_MEDICAMENTOSAS.reduce(
      (acc, item) => acc + item.nomesComerciais.length,
      0
    );
  }, []);

  const farmacosFiltrados = useMemo(() => {
    return INTERACOES_MEDICAMENTOSAS.filter((f) => {
      const termo = busca.trim().toLowerCase();
      const matchBusca =
        !termo ||
        f.principioAtivo.toLowerCase().includes(termo) ||
        f.nomesComerciais.some((nc) => nc.toLowerCase().includes(termo)) ||
        f.classeFarmacologica.toLowerCase().includes(termo) ||
        f.viasMetabolicas.toLowerCase().includes(termo) ||
        f.mecanismo.toLowerCase().includes(termo) ||
        f.recomendacaoLiturgica.toLowerCase().includes(termo);

      const matchFiltro =
        filtroRisco === "TODOS" ||
        f.nivelRisco === filtroRisco ||
        f.diretrizPdf === filtroRisco;

      return matchBusca && matchFiltro;
    });
  }, [busca, filtroRisco]);

  const toggleExpandir = (id: string) => {
    setExpandidoId(expandidoId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* 1. CABEÇALHO PRINCIPAL COM BOTÕES DIRETOS DE DOWNLOAD (PDF & EXCEL) */}
      <div className="print-hidden rounded-2xl bg-floresta-950/95 border border-ambar-500/30 p-5 sm:p-6 shadow-xl space-y-5">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-red-500/15 text-red-300 border border-red-500/30">
                <HeartPulse className="h-3.5 w-3.5 text-red-400" />
                Protocolo Clínico CONAD 01/2010
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-ambar-500/15 text-ambar-300 border border-ambar-500/30">
                20 Classes • {totalMarcasCadastradas} Medicamentos Listados
              </span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-areia-100">
              Tabela Oficial de Medicamentos Controlados &amp; Conflitos com Ayahuasca
            </h3>
            <p className="text-xs sm:text-sm text-areia-300 font-light max-w-3xl leading-relaxed">
              Consulte instantaneamente pelo celular ou computador qualquer medicamento, marca comercial ou princípio ativo, ou baixe a tabela completa em{" "}
              <strong className="text-areia-100">PDF A4</strong> e{" "}
              <strong className="text-areia-100">Planilha Excel (.xls / .csv)</strong> para manter impressa na recepção do templo.
            </p>
          </div>

          {/* Botões de Download em Destaque */}
          <div className="grid grid-cols-1 sm:grid-cols-3 xl:flex xl:flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={exportarMedicamentosPDF}
              className="px-4 py-3 rounded-xl text-xs font-bold inline-flex items-center justify-center gap-2 bg-ambar-500 hover:bg-ambar-400 text-floresta-950 shadow-solar transition-all active:scale-95"
              title="Gerar documento PDF A4 da Tabela Oficial de Medicamentos Controlados"
            >
              <Printer className="h-4 w-4 shrink-0" />
              <span>Baixar Lista em PDF (A4)</span>
            </button>

            <button
              type="button"
              onClick={exportarMedicamentosExcel}
              className="px-4 py-3 rounded-xl text-xs font-bold inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all active:scale-95"
              title="Baixar planilha Excel (.xls) colorida com todas as marcas comerciais e tempos de washout"
            >
              <FileSpreadsheet className="h-4 w-4 shrink-0" />
              <span>Baixar em Excel (.xls)</span>
            </button>

            <button
              type="button"
              onClick={exportarMedicamentosCSV}
              className="px-3.5 py-3 rounded-xl text-xs font-semibold inline-flex items-center justify-center gap-2 bg-floresta-900 hover:bg-floresta-800 text-areia-200 border border-ambar-500/30 transition-all"
              title="Baixar arquivo CSV universal para Excel ou Google Planilhas"
            >
              <Download className="h-4 w-4 text-ambar-400 shrink-0" />
              <span>Baixar CSV</span>
            </button>
          </div>
        </div>

        {/* 2. BARRA DE BUSCA RÁPIDA + PÍLULAS DE ATALHO (NO TOPO PARA CELULAR E PC) */}
        <div className="pt-2 border-t border-ambar-500/15 space-y-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-ambar-400" />
            <input
              type="text"
              value={busca}
              onChange={(e) => {
                setBusca(e.target.value);
                if (modoVisao === "EMERGENCIA") {
                  setModoVisao("CARDS_DETALHADOS");
                }
              }}
              placeholder="Digite o nome do remédio ou princípio ativo (ex: Rivotril, Prozac, Carbolitium, Zolpidem, Venvanse, Ozempic, Tramadol)..."
              className="w-full pl-11 pr-10 py-3 rounded-xl bg-floresta-900/90 border border-ambar-500/35 text-xs sm:text-sm text-areia-100 placeholder-areia-400/70 focus:outline-none focus:border-ambar-400 focus:ring-2 focus:ring-ambar-400/20"
            />
            {busca && (
              <button
                type="button"
                onClick={() => setBusca("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg bg-floresta-800 text-areia-300 hover:text-white"
                title="Limpar busca"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Pílulas de Consulta em 1 Toque */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-mono text-areia-400 mr-1">
              Consulta rápida:
            </span>
            {ATALHOS_BUSCA_RAPIDA.map((termo) => {
              const ativo = busca.toLowerCase() === termo.toLowerCase();
              return (
                <button
                  key={termo}
                  type="button"
                  onClick={() => {
                    setBusca(ativo ? "" : termo);
                    if (modoVisao === "EMERGENCIA") {
                      setModoVisao("CARDS_DETALHADOS");
                    }
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all border ${
                    ativo
                      ? "bg-ambar-500 text-floresta-950 font-bold border-ambar-400"
                      : "bg-floresta-900/70 text-areia-300 border-ambar-500/15 hover:border-ambar-500/40 hover:text-areia-100"
                  }`}
                >
                  {termo}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. CARTÕES INTERATIVOS DAS 4 CORES (CLIQUE PARA FILTRAR) */}
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span className="text-[11px] font-bold text-areia-300 uppercase tracking-wider">
              Filtrar pela Regra das 4 Cores (Toque no cartão para filtrar):
            </span>
            {filtroRisco !== "TODOS" && (
              <button
                type="button"
                onClick={() => setFiltroRisco("TODOS")}
                className="text-xs font-semibold text-ambar-400 hover:underline inline-flex items-center gap-1"
              >
                <X className="h-3.5 w-3.5" />
                Mostrar todas as 20 classes
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {(
              [
                "NAO_PODE_PARTICIPAR",
                "CASO_CLINICO_NAO_RECOMENDADO",
                "INTERROMPER_DIAS_ANTES",
                "NAO_TOMAR_NO_DIA",
              ] as DiretrizOperacionalPdf[]
            ).map((dir) => {
              const info = BADGES_DIRETRIZ_PDF[dir];
              const selecionado = filtroRisco === dir;
              return (
                <button
                  key={dir}
                  type="button"
                  onClick={() =>
                    setFiltroRisco(selecionado ? "TODOS" : dir)
                  }
                  className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    info.cardBorderClass
                  } ${
                    selecionado
                      ? "ring-2 ring-ambar-400 shadow-lg scale-[1.01]"
                      : "opacity-90 hover:opacity-100"
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${info.badgeClass}`}
                      >
                        {info.label}
                      </span>
                      <span className="text-[11px] font-mono font-bold text-areia-200 bg-floresta-950/80 px-2 py-0.5 rounded-full border border-white/10 shrink-0">
                        {contagensPorCor[dir]} classes
                      </span>
                    </div>
                    <p className="text-[11px] text-areia-300 font-light leading-snug pt-1">
                      {info.descricaoCurta}
                    </p>
                  </div>
                  <div className="pt-2 mt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-ambar-300">
                    <span>
                      {selecionado ? "✓ Filtro ativo (toque p/ limpar)" : "Toque para filtrar"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. SELETOR DE MODO DE VISUALIZAÇÃO (SEM BARRA ESCONDIDA) */}
        <div className="pt-2 border-t border-ambar-500/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setModoVisao("CARDS_DETALHADOS")}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold inline-flex items-center justify-center gap-2 border transition-all ${
                modoVisao === "CARDS_DETALHADOS"
                  ? "bg-ambar-500 text-floresta-950 font-bold border-ambar-400 shadow"
                  : "bg-floresta-900/60 text-areia-300 border-ambar-500/15 hover:text-areia-100"
              }`}
            >
              <LayoutGrid className="h-4 w-4 shrink-0" />
              <span>Cartões Detalhados (20 Classes)</span>
            </button>

            <button
              type="button"
              onClick={() => setModoVisao("QUADRO_4_CORES")}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold inline-flex items-center justify-center gap-2 border transition-all ${
                modoVisao === "QUADRO_4_CORES"
                  ? "bg-ambar-500 text-floresta-950 font-bold border-ambar-400 shadow"
                  : "bg-floresta-900/60 text-areia-300 border-ambar-500/15 hover:text-areia-100"
              }`}
            >
              <Columns className="h-4 w-4 shrink-0" />
              <span>Quadro Visual (4 Cores PDF)</span>
            </button>

            <button
              type="button"
              onClick={() => setModoVisao("EMERGENCIA")}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold inline-flex items-center justify-center gap-2 border transition-all ${
                modoVisao === "EMERGENCIA"
                  ? "bg-red-600 text-white font-bold border-red-400 shadow"
                  : "bg-red-950/40 text-red-300 border-red-500/30 hover:bg-red-950/70"
              }`}
            >
              <Siren className="h-4 w-4 shrink-0" />
              <span>Emergência (Lítio &amp; Hunter)</span>
            </button>
          </div>

          <div className="text-xs font-mono text-areia-300 text-right">
            Exibindo{" "}
            <strong className="text-ambar-400">{farmacosFiltrados.length}</strong>{" "}
            de 20 classes farmacológicas
          </div>
        </div>
      </div>

      {/* BANNER COMPACTO DE EXCEÇÃO DE DESINTOXICAÇÃO & ALERTA DE LIMBITROL */}
      <div className="print-hidden grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="p-3.5 rounded-xl border border-ambar-500/30 bg-floresta-900/70 text-xs text-areia-200 flex items-start gap-3">
          <Info className="h-4 w-4 text-ambar-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <div className="font-mono font-bold text-ambar-300 uppercase text-[11px]">
              {EXCECAO_DESINTOXICACAO_PDF.titulo}
            </div>
            <p className="text-areia-300 font-light text-[11px] leading-relaxed">
              {EXCECAO_DESINTOXICACAO_PDF.descricao}
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-red-500/35 bg-red-950/25 text-xs text-areia-200 flex items-start gap-3">
          <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <div className="font-mono font-bold text-red-300 uppercase text-[11px]">
              Atenção Crítica na Triagem: Limbitrol &amp; Canetas GLP-1 (Ozempic / Mounjaro)
            </div>
            <p className="text-areia-300 font-light text-[11px] leading-relaxed">
              O <strong>Limbitrol</strong> contém <em>Amitriptilina</em> (Tricíclico) além do Clordiazepóxido — portanto exige <strong>veto/washout de 21 dias</strong>. Já <strong>Ozempic, Wegovy e Mounjaro</strong> retardam o esvaziamento gástrico (risco de broncoaspiração na purga).
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================================
          MODO 1: CARTÕES DETALHADOS RESPONSIVOS (SEM BARRA HORIZONTAL ESCONDIDA)
         ===================================================================== */}
      {modoVisao === "CARDS_DETALHADOS" && (
        <div className="space-y-4">
          {farmacosFiltrados.length === 0 ? (
            <div className="rounded-2xl bg-floresta-950/90 border border-ambar-500/20 p-10 text-center space-y-3">
              <Pill className="h-8 w-8 text-ambar-400 mx-auto opacity-80" />
              <p className="text-sm font-semibold text-areia-100">
                Nenhum medicamento encontrado para &ldquo;{busca}&rdquo;
              </p>
              <p className="text-xs text-areia-400 max-w-md mx-auto">
                Verifique a grafia ou limpe os filtros. Em caso de dúvida sobre um fármaco novo, consulte a diretriz de meia-vida (5 a 7 meias-vidas — t½) junto ao médico assistente.
              </p>
              <button
                type="button"
                onClick={() => {
                  setBusca("");
                  setFiltroRisco("TODOS");
                }}
                className="btn-secondary text-xs px-4 py-2"
              >
                Limpar Busca e Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {farmacosFiltrados.map((item) => {
                const isLetal = item.nivelRisco === "LETAL_ABSOLUTO";
                const isSevero = item.nivelRisco === "SEVERO_MODERADO";
                const isExpandido = expandidoId === item.id;
                const diretriz: DiretrizOperacionalPdf =
                  item.diretrizPdf || "INTERROMPER_DIAS_ANTES";
                const badgePdf = BADGES_DIRETRIZ_PDF[diretriz];
                const termoBusca = busca.trim().toLowerCase();

                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl border transition-all flex flex-col justify-between overflow-hidden ${
                      badgePdf.cardBorderClass
                    } ${
                      isExpandido
                        ? "ring-2 ring-ambar-400/50 shadow-xl"
                        : "shadow-md"
                    }`}
                  >
                    <div>
                      {/* Topo do Card: Número da Classe + Badge 4 Cores + Washout */}
                      <div
                        className={`px-4 py-3 flex flex-wrap items-center justify-between gap-2 ${badgePdf.headerBgClass}`}
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[11px] font-mono font-bold text-areia-200 bg-floresta-950/90 px-2.5 py-0.5 rounded-md border border-white/10">
                            Classe {item.classeNumero}
                          </span>
                          <span
                            className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md border ${badgePdf.badgeClass}`}
                          >
                            {badgePdf.label}
                          </span>
                        </div>

                        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-ambar-300 bg-floresta-950/90 px-2.5 py-1 rounded-md border border-ambar-500/30">
                          <Clock className="h-3.5 w-3.5 text-ambar-400 shrink-0" />
                          <span>{item.washoutMinimo}</span>
                        </span>
                      </div>

                      {/* Corpo do Card */}
                      <div className="p-4 sm:p-5 space-y-3.5">
                        <div className="space-y-1">
                          <div className="text-xs font-mono text-ambar-400 font-semibold">
                            {item.classeFarmacologica}
                          </div>
                          <h4 className="font-serif text-base sm:text-lg font-bold text-areia-100 leading-snug">
                            {item.principioAtivo}
                          </h4>
                        </div>

                        {/* Pílulas de Marcas Comerciais (Fácil leitura no celular e PC) */}
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-areia-400 block">
                            Principais Marcas Comerciais &amp; Nomes de Referência:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {item.nomesComerciais.map((marca) => {
                              const matchMarca =
                                termoBusca.length > 1 &&
                                marca.toLowerCase().includes(termoBusca);
                              return (
                                <span
                                  key={marca}
                                  className={`px-2 py-0.5 rounded-md text-xs font-medium border ${
                                    matchMarca
                                      ? "bg-ambar-500 text-floresta-950 font-bold border-ambar-300 ring-2 ring-ambar-400/40"
                                      : "bg-floresta-950/85 text-areia-100 border-white/10"
                                  }`}
                                >
                                  {marca}
                                </span>
                              );
                            })}
                          </div>
                        </div>

                        {/* Conduta Direta para o Dirigente */}
                        <div className="p-3 rounded-xl bg-floresta-950/80 border border-ambar-500/15 space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-ambar-400">
                              Conduta Obrigatória da Dirigência
                            </span>
                            {isLetal ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-red-400">
                                <XCircle className="h-3 w-3" /> Risco Grave / Letal
                              </span>
                            ) : isSevero ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-amber-400">
                                <AlertTriangle className="h-3 w-3" /> Exige Cautela Médica
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400">
                                <ShieldCheck className="h-3 w-3" /> Pausa no Dia / Monitorado
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-areia-200 font-light leading-relaxed">
                            {item.recomendacaoLiturgica}
                          </p>
                        </div>

                        {/* Gaveta Expansível: Farmacocinética, Meia-vida e CYP450 */}
                        {isExpandido && (
                          <div className="pt-2 space-y-2.5 animate-fade-in">
                            <div className="p-3.5 rounded-xl bg-floresta-950 border border-ambar-500/25 space-y-1.5">
                              <span className="text-[10px] font-mono font-bold text-ambar-400 uppercase tracking-wider block">
                                Mecanismo de Interação com IMAO-A (Jagube) e DMT (Chacrona)
                              </span>
                              <p className="text-xs text-areia-200 font-light leading-relaxed">
                                {item.mecanismo}
                              </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                              <div className="p-3 rounded-xl bg-floresta-950 border border-ambar-500/20">
                                <span className="text-[10px] font-mono font-bold text-ambar-400 uppercase block mb-0.5">
                                  Vias Enzimáticas &amp; CYP450
                                </span>
                                <span className="text-areia-300 font-light">
                                  {item.viasMetabolicas}
                                </span>
                              </div>
                              <div className="p-3 rounded-xl bg-floresta-950 border border-ambar-500/20">
                                <span className="text-[10px] font-mono font-bold text-ambar-400 uppercase block mb-0.5">
                                  Meia-Vida Biológica (t½)
                                </span>
                                <span className="text-areia-300 font-light">
                                  t½: <strong className="text-areia-100">{item.meiaVida}</strong> • Washout:{" "}
                                  <strong className="text-ambar-300">{item.washoutMinimo}</strong>
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Rodapé do Card: Botão para Expandir Detalhes */}
                    <button
                      type="button"
                      onClick={() => toggleExpandir(item.id)}
                      className="w-full px-4 py-2.5 bg-floresta-950/70 hover:bg-floresta-900/90 border-t border-white/10 text-xs font-mono text-ambar-300 flex items-center justify-between transition-colors"
                    >
                      <span>
                        {isExpandido
                          ? "Ocultar farmacocinética e enzimas CYP450"
                          : `Ver mecanismo clínico e meia-vida (t½: ${item.meiaVida})`}
                      </span>
                      {isExpandido ? (
                        <ChevronUp className="h-4 w-4 text-ambar-400 shrink-0" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-ambar-400 shrink-0" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          MODO 2: QUADRO VISUAL DAS 4 CORES (IGUAL AO PDF DE MEDICAMENTOS)
         ===================================================================== */}
      {modoVisao === "QUADRO_4_CORES" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {(
            [
              "NAO_PODE_PARTICIPAR",
              "CASO_CLINICO_NAO_RECOMENDADO",
              "INTERROMPER_DIAS_ANTES",
              "NAO_TOMAR_NO_DIA",
            ] as DiretrizOperacionalPdf[]
          ).map((dir) => {
            const info = BADGES_DIRETRIZ_PDF[dir];
            const listaDoBloco = farmacosFiltrados.filter(
              (f) => (f.diretrizPdf || "INTERROMPER_DIAS_ANTES") === dir
            );

            return (
              <div
                key={dir}
                className={`rounded-2xl border overflow-hidden ${info.cardBorderClass}`}
              >
                <div className={`p-4 ${info.headerBgClass}`}>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-xs font-mono font-bold px-2.5 py-1 rounded border ${info.badgeClass}`}
                    >
                      {info.label}
                    </span>
                    <span className="text-xs font-mono text-areia-200">
                      {listaDoBloco.length} grupos
                    </span>
                  </div>
                  <p className="text-xs text-areia-200 font-light mt-2 leading-relaxed">
                    {info.descricaoCurta}
                  </p>
                </div>

                <div className="p-4 divide-y divide-white/10 space-y-3">
                  {listaDoBloco.map((item) => (
                    <div key={item.id} className="pt-3 first:pt-0 space-y-1.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-serif font-bold text-sm text-areia-100">
                          Classe {item.classeNumero}: {item.classeFarmacologica}
                        </span>
                        <span className="text-[11px] font-mono text-ambar-300 bg-floresta-950/90 px-2 py-0.5 rounded border border-ambar-500/25">
                          {item.washoutMinimo}
                        </span>
                      </div>
                      <p className="text-xs text-areia-300">
                        <strong className="text-areia-100">Ativos:</strong>{" "}
                        {item.principioAtivo}
                      </p>
                      <p className="text-xs text-ambar-200/90 font-medium">
                        <strong className="text-ambar-400">Marcas:</strong>{" "}
                        {item.nomesComerciais.join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* =====================================================================
          MODO 3: PROTOCOLOS DE EMERGÊNCIA CLÍNICA (LÍTIO & CRITÉRIOS DE HUNTER)
         ===================================================================== */}
      {modoVisao === "EMERGENCIA" && (
        <div className="space-y-5 animate-fade-in">
          {/* Alerta Sanitário de Altíssimo Impacto: LÍTIO & STATUS EPILEPTICUS */}
          <div className="p-5 rounded-2xl border-l-4 border-l-red-500 bg-red-950/40 border border-red-500/30 text-xs text-areia-200 space-y-3 shadow-lg">
            <div className="flex items-center gap-2 text-red-400 font-bold uppercase tracking-wider font-mono text-xs sm:text-sm">
              <Zap className="h-4 w-4 text-red-400 animate-pulse shrink-0" />
              <span>
                ALERTA MÁXIMO DE SEGURANÇA: CARBONATO DE LÍTIO (STATUS EPILEPTICUS &amp; MORTE CEREBRAL)
              </span>
            </div>
            <p className="leading-relaxed font-light text-areia-200 text-xs sm:text-sm">
              {TOXICIDADE_LITIO.resumo}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 font-mono text-xs">
              <div className="bg-red-950/60 p-3.5 rounded-xl border border-red-500/20 space-y-1">
                <span className="text-red-300 font-bold block">
                  Fisiopatologia Neuroquímica
                </span>
                <span className="text-areia-300 text-[11px] font-sans font-light block leading-relaxed">
                  {TOXICIDADE_LITIO.mecanismo}
                </span>
              </div>
              <div className="bg-red-950/60 p-3.5 rounded-xl border border-red-500/20 space-y-1">
                <span className="text-red-300 font-bold block">
                  Incidência em Casos Clínicos
                </span>
                <span className="text-red-200 font-bold text-sm block">
                  {TOXICIDADE_LITIO.incidenciaConvulsao}
                </span>
                <span className="text-areia-400 text-[11px] font-sans block">
                  Disparos paroxísticos corticais generalizados refratários.
                </span>
              </div>
              <div className="bg-red-950/60 p-3.5 rounded-xl border border-red-500/20 space-y-1">
                <span className="text-red-300 font-bold block">
                  Diretriz Institucional
                </span>
                <span className="text-red-400 font-bold block leading-relaxed">
                  {TOXICIDADE_LITIO.diretriz}
                </span>
              </div>
            </div>
          </div>

          {/* Card de Diagnóstico Rápido: CRITÉRIOS DE HUNTER PARA SÍNDROME SEROTONINÉRGICA */}
          <div className="p-5 rounded-2xl bg-floresta-900/70 border border-amber-500/35 text-xs text-areia-200 space-y-3.5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider font-mono text-xs sm:text-sm">
                <Activity className="h-4 w-4 text-amber-400 shrink-0" />
                <span>
                  CRITÉRIOS DE HUNTER — DIAGNÓSTICO DE TOXICIDADE SEROTONINÉRGICA
                </span>
              </div>
              <span className="text-[11px] font-mono text-areia-300 bg-floresta-950/90 px-2.5 py-1 rounded border border-amber-500/25">
                Padrão Ouro Internacional (Sensibilidade 84% / Especificidade 97%)
              </span>
            </div>
            <p className="text-areia-300 font-light leading-relaxed text-xs sm:text-sm">
              Se o participante tiver ingerido qualquer substância serotoninérgica e apresentar{" "}
              <strong className="text-areia-100">PELO MENOS UM</strong> dos achados abaixo, diagnostica-se Síndrome Serotoninérgica aguda. Acione imediatamente o{" "}
              <strong className="text-amber-300">SAMU 192</strong> e posicione o participante em{" "}
              <strong className="text-amber-300">Posição Lateral de Segurança (PLS)</strong>:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 font-mono text-xs">
              {CRITERIOS_HUNTER.map((crit, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-floresta-950/90 border border-amber-500/20"
                >
                  <span className="text-amber-400 font-bold shrink-0">
                    {idx + 1}.
                  </span>
                  <span className="text-areia-200 leading-snug">{crit}</span>
                </div>
              ))}
            </div>
            <div className="pt-1 flex items-center gap-2 text-xs text-red-300 font-medium">
              <PhoneCall className="h-4 w-4 text-red-400 shrink-0" />
              <span>
                Ao ligar para o 192: informe com clareza a ingestão de Inibidores da MAO (Ayahuasca) e o medicamento suspeito. Jamais administre outros medicamentos durante a crise.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

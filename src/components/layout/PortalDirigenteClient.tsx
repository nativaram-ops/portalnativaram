"use client";

import React, { useState, useEffect } from "react";
import {
  LogOut,
  ShieldCheck,
  PackageCheck,
  Sparkles,
  FileText,
  Scale,
  FileCheck,
  Pill,
  BookOpen,
  HelpCircle,
  Calculator,
  Compass,
  Share2,
  Download,
  FileSpreadsheet,
  Printer,
} from "lucide-react";
import dynamic from "next/dynamic";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { AcompanhamentoPedidos } from "@/components/portal-dirigente/AcompanhamentoPedidos";
import { PortalLoginGate } from "@/components/portal-dirigente/PortalLoginGate";
import { ItemPedido } from "@/types/pedido";
import { templosIniciais, TemploMock } from "@/data/portal-mock";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

const TabLoadingSkeleton = () => (
  <div className="rounded-2xl border border-ambar-500/20 bg-floresta-950/70 p-8 text-center animate-pulse">
    <p className="text-xs font-mono text-ambar-400 uppercase tracking-widest">
      Carregando módulo litúrgico...
    </p>
  </div>
);

const FormSolicitacaoPedido = dynamic(
  () =>
    import("@/components/portal-dirigente/FormSolicitacaoPedido").then(
      (m) => m.FormSolicitacaoPedido
    ),
  { loading: () => <TabLoadingSkeleton /> }
);
const PortalAdminDashboard = dynamic(
  () =>
    import("@/components/portal-dirigente/PortalAdminDashboard").then(
      (m) => m.PortalAdminDashboard
    ),
  { loading: () => <TabLoadingSkeleton /> }
);
const PortalLaudosCustodia = dynamic(
  () =>
    import("@/components/portal-dirigente/PortalLaudosCustodia").then(
      (m) => m.PortalLaudosCustodia
    ),
  { loading: () => <TabLoadingSkeleton /> }
);
const PortalCooperativismo = dynamic(
  () =>
    import("@/components/portal-dirigente/PortalCooperativismo").then(
      (m) => m.PortalCooperativismo
    ),
  { loading: () => <TabLoadingSkeleton /> }
);
const PortalCentralDocumentos = dynamic(
  () =>
    import("@/components/portal-dirigente/PortalCentralDocumentos").then(
      (m) => m.PortalCentralDocumentos
    ),
  { loading: () => <TabLoadingSkeleton /> }
);
const PortalInteracoesMedicamentosas = dynamic(
  () =>
    import(
      "@/components/portal-dirigente/PortalInteracoesMedicamentosas"
    ).then((m) => m.PortalInteracoesMedicamentosas),
  { loading: () => <TabLoadingSkeleton /> }
);
const PortalCatalogoGraduacoes = dynamic(
  () =>
    import("@/components/portal-dirigente/PortalCatalogoGraduacoes").then(
      (m) => m.PortalCatalogoGraduacoes
    ),
  { loading: () => <TabLoadingSkeleton /> }
);
const PortalAssessoriaFAQ = dynamic(
  () =>
    import("@/components/portal-dirigente/PortalAssessoriaFAQ").then(
      (m) => m.PortalAssessoriaFAQ
    ),
  { loading: () => <TabLoadingSkeleton /> }
);
const PortalCalculadoraLiturgica = dynamic(
  () =>
    import("@/components/portal-dirigente/PortalCalculadoraLiturgica").then(
      (m) => m.PortalCalculadoraLiturgica
    ),
  { loading: () => <TabLoadingSkeleton /> }
);
const PortalRespaldoJuridico = dynamic(
  () =>
    import("@/components/portal-dirigente/PortalRespaldoJuridico").then(
      (m) => m.PortalRespaldoJuridico
    ),
  { loading: () => <TabLoadingSkeleton /> }
);
const PortalComunidadeGestao = dynamic(
  () =>
    import("@/components/portal-dirigente/PortalComunidadeGestao").then(
      (m) => m.PortalComunidadeGestao
    ),
  { loading: () => <TabLoadingSkeleton /> }
);

type DirigenteTab =
  | "SOLICITACOES"
  | "NOVA_SOLICITACAO"
  | "COMUNIDADE_GESTAO"
  | "CENTRAL_DOCUMENTOS"
  | "INTERACOES_FARMACIA"
  | "GRADUACOES_CATALOGO"
  | "ASSESSORIA_FAQ"
  | "CALCULADORA"
  | "RESPALDO_JURIDICO"
  | "LAUDOS"
  | "COOPERATIVISMO";

export const PortalDirigenteClient: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<"DIRIGENTE" | "ADMIN">("DIRIGENTE");
  const [authenticatedAsAdmin, setAuthenticatedAsAdmin] = useState(false);
  const [codigoAcesso, setCodigoAcesso] = useState("");

  // Abas do Portal do Dirigente
  const [dirigenteTab, setDirigenteTab] = useState<DirigenteTab>("SOLICITACOES");

  // Estado para repetição de pedido
  const [pedidoParaRepetir, setPedidoParaRepetir] = useState<{
    itens: ItemPedido[];
    mensagemIntencao: string;
  } | null>(null);

  // Estado interativo de congregações
  const [templos, setTemplos] = useState<TemploMock[]>(templosIniciais);

  // Sincronizar congregações homologadas pelo ADM (API + LocalStorage) para popular perfil do dirigente
  useEffect(() => {
    const sincronizarCongregacoesHomologadas = async () => {
      const converterParaTemplo = (s: any): TemploMock => ({
        id: s.loginGerado || s.id,
        nome: s.nomeEntidade || `Congregação (${s.id})`,
        dirigente: s.nomeResponsavel || "Dirigente Homologado",
        cidade: s.cidade && s.estado ? `${s.cidade}/${s.estado}` : s.cidade || "Brasil",
        cnpj:
          s.cnpj ||
          (s.tipo === "GRUPO_INFORMAL"
            ? `Protocolo ${s.id} (CONAD 01/2010)`
            : "Homologado pelo Conselho"),
        status: "HOMOLOGADO",
        graduacao: s.graduacao || "3.1 Mainumbi",
        volume: s.volumeEstimado || "5L / mês",
        dataAprovacao: s.dataHomologacao || s.dataEnvio || "2026",
        membros: 15,
        conadAprovado: true,
      });

      const mapa = new Map<string, TemploMock>();
      for (const t of templosIniciais) {
        mapa.set(t.id.toUpperCase(), t);
      }

      try {
        const rawLocal = localStorage.getItem("nativaram_solicitacoes_local");
        if (rawLocal) {
          const locais = JSON.parse(rawLocal);
          if (Array.isArray(locais)) {
            for (const s of locais) {
              if (s && s.status === "HOMOLOGADO") {
                const tm = converterParaTemplo(s);
                mapa.set(tm.id.toUpperCase(), tm);
                if (s.id) mapa.set(s.id.toUpperCase(), { ...tm, id: s.id });
              }
            }
          }
        }
      } catch {
        // Ignora erro localStorage
      }

      try {
        const res = await fetch("/api/solicitacoes", { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          const lista = json.solicitacoes || [];
          for (const s of lista) {
            if (s && s.status === "HOMOLOGADO") {
              const tm = converterParaTemplo(s);
              mapa.set(tm.id.toUpperCase(), tm);
              if (s.id) mapa.set(s.id.toUpperCase(), { ...tm, id: s.id });
            }
          }
        }
      } catch {
        // Continua com dados iniciais + cache local
      }

      setTemplos(Array.from(mapa.values()));
    };

    sincronizarCongregacoesHomologadas();
  }, [isAuthenticated, codigoAcesso]);

  // Verificar sessão persistente (SessionStorage + Supabase) no carregamento inicial
  useEffect(() => {
    try {
      const sessaoSalva = sessionStorage.getItem("nativaram_sessao_ativa");
      if (sessaoSalva) {
        const parsed = JSON.parse(sessaoSalva);
        if (parsed?.codigo && parsed?.role) {
          setUserRole(parsed.role);
          setAuthenticatedAsAdmin(parsed.role === "ADMIN");
          setCodigoAcesso(parsed.codigo);
          setIsAuthenticated(true);
        }
      }
    } catch {
      // Ignora erro de sessionStorage
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    supabase.auth
      .getSession()
      .then((res: any) => {
        const session = res?.data?.session;
        if (session?.user) {
          const isAdmin =
            session.user.email?.includes("adm") ||
            session.user.user_metadata?.papel === "ADMIN";

          setUserRole(isAdmin ? "ADMIN" : "DIRIGENTE");
          setAuthenticatedAsAdmin(isAdmin);
          setCodigoAcesso(
            session.user.user_metadata?.codigo_liturgico ||
              session.user.email ||
              "USUARIO-SUPABASE"
          );
          setIsAuthenticated(true);
        }
      })
      .catch(() => {
        // Ignora erro caso nuvem Supabase esteja em standby
      });

    const { data } = supabase.auth.onAuthStateChange(
      (event: any, session: any) => {
        if (event === "SIGNED_OUT" && !session) {
          setIsAuthenticated(false);
        }
      }
    );

    return () => {
      data?.subscription?.unsubscribe();
    };
  }, []);

  // Templo selecionado com fallback seguro
  const temploAtual =
    templos.find(
      (t) =>
        t.id.toUpperCase() === codigoAcesso.trim().toUpperCase() ||
        t.id.toLowerCase().includes(codigoAcesso.trim().toLowerCase())
    ) || templos[0];

  const handleAuthenticated = (role: "DIRIGENTE" | "ADMIN", codigo: string) => {
    setUserRole(role);
    setAuthenticatedAsAdmin(role === "ADMIN");
    setCodigoAcesso(codigo);
    setIsAuthenticated(true);
    try {
      sessionStorage.setItem(
        "nativaram_sessao_ativa",
        JSON.stringify({ role, codigo })
      );
    } catch {
      // Ignora erro de sessionStorage
    }
  };

  const handleLogout = async () => {
    try {
      sessionStorage.removeItem("nativaram_sessao_ativa");
    } catch {
      // Ignora erro de sessionStorage
    }
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      supabase.auth.signOut().catch(() => {});
    }
    setIsAuthenticated(false);
    setUserRole("DIRIGENTE");
    setAuthenticatedAsAdmin(false);
    setCodigoAcesso("");
  };

  const homologarTemplo = (id: string) => {
    setTemplos((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: "HOMOLOGADO",
              dataAprovacao: new Date().toLocaleDateString("pt-BR"),
              conadAprovado: true,
            }
          : t
      )
    );
  };

  // 1. TELA DE AUTENTICAÇÃO LITÚRGICA
  if (!isAuthenticated) {
    return <PortalLoginGate onAuthenticated={handleAuthenticated} />;
  }

  // 2. PAINEL ADMINISTRATIVO (CONSELHO GESTOR COOPERATIVA)
  if (userRole === "ADMIN") {
    return (
      <PortalAdminDashboard
        templos={templos}
        onHomologarTemplo={homologarTemplo}
        onSimularVisaoTemplo={() => setUserRole("DIRIGENTE")}
        onLogout={handleLogout}
      />
    );
  }


  // Grupos Estruturados de Módulos do Dirigente (Sem barra de rolagem escondida)
  const gruposModulos: {
    idGrupo: string;
    titulo: string;
    subtitulo: string;
    destaqueBorda?: string;
    itens: {
      id: DirigenteTab;
      label: string;
      subLabel: string;
      icon: React.ReactNode;
      badge?: string;
      corBadge?: string;
    }[];
  }[] = [
    {
      idGrupo: "SALVAGUARDA",
      titulo: "1. Salvaguarda Clínica, Medicamentos & Documentos",
      subtitulo: "Triagem farmacológica (PDF/Excel), fichas A4 e amparo CONAD",
      destaqueBorda: "border-emerald-500/35 bg-floresta-950/90",
      itens: [
        {
          id: "INTERACOES_FARMACIA",
          label: "Lista de Medicamentos & Washout",
          subLabel: "20 Classes • +185 Marcas • PDF & Excel",
          icon: <Pill className="h-4 w-4 text-emerald-400" />,
          badge: "PDF / EXCEL",
          corBadge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
        },
        {
          id: "CENTRAL_DOCUMENTOS",
          label: "Documentos & Modelos A4",
          subLabel: "Anamnese, TCLE, Menores, POP e Trânsito",
          icon: <FileCheck className="h-4 w-4 text-ambar-400" />,
          badge: "5 DOCS",
          corBadge: "bg-ambar-500/20 text-ambar-300 border-ambar-500/40",
        },
        {
          id: "RESPALDO_JURIDICO",
          label: "Marco Legal & Trânsito",
          subLabel: "Conduta CONAD 01/2010 e Fiscalização",
          icon: <Scale className="h-4 w-4 text-sky-400" />,
        },
      ],
    },
    {
      idGrupo: "GESTAO",
      titulo: "2. Gestão de Partilha & Comunidade do Templo",
      subtitulo: "Solicitações de sacramentos, calculadora e perfil público",
      destaqueBorda: "border-ambar-500/25 bg-floresta-950/80",
      itens: [
        {
          id: "SOLICITACOES",
          label: "Minhas Solicitações",
          subLabel: "Rastreio de lotes e histórico",
          icon: <PackageCheck className="h-4 w-4 text-ambar-400" />,
        },
        {
          id: "NOVA_SOLICITACAO",
          label: "Nova Solicitação",
          subLabel: "Solicitar partilha cooperativa",
          icon: <Sparkles className="h-4 w-4 text-ambar-400" />,
        },
        {
          id: "CALCULADORA",
          label: "Calculadora Litúrgica",
          subLabel: "Dimensionamento e diluição 10:1",
          icon: <Calculator className="h-4 w-4 text-ambar-300" />,
        },
        {
          id: "COMUNIDADE_GESTAO",
          label: "Meu Templo & Publicações",
          subLabel: "Agenda e mural na comunidade",
          icon: <Share2 className="h-4 w-4 text-ambar-400" />,
        },
      ],
    },
    {
      idGrupo: "ACERVO",
      titulo: "3. Acervo Técnico, Graduações & Transparência",
      subtitulo: "Fichas fitoquímicas, laudos do Acre, dúvidas e rateio",
      destaqueBorda: "border-ambar-500/20 bg-floresta-950/70",
      itens: [
        {
          id: "GRADUACOES_CATALOGO",
          label: "Catálogo de Graduações",
          subLabel: "3.1 Mainumbi a 10.1 Wirapuru",
          icon: <BookOpen className="h-4 w-4 text-ambar-300" />,
        },
        {
          id: "ASSESSORIA_FAQ",
          label: "FAQ do Dirigente",
          subLabel: "Conservação, fermentação e rito",
          icon: <HelpCircle className="h-4 w-4 text-ambar-300" />,
        },
        {
          id: "LAUDOS",
          label: "Laudos & Custódia (Acre)",
          subLabel: "Análises fitoquímicas de safra",
          icon: <FileText className="h-4 w-4 text-ambar-300" />,
        },
        {
          id: "COOPERATIVISMO",
          label: "Tabela Evolutiva & Cotas",
          subLabel: "Rateio operacional sem fins lucrativos",
          icon: <Compass className="h-4 w-4 text-ambar-300" />,
        },
      ],
    },
  ];

  // 3. PORTAL DO DIRIGENTE (TEMPLO HOMOLOGADO)
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Barra Superior do Templo (Oculta na Impressão) */}
      <AnimateOnScroll className="print-hidden">
        <div className="card-elevated rounded-2xl p-5 sm:p-7 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-ambar-500/30 bg-gradient-to-r from-floresta-950 via-floresta-900 to-floresta-950">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                Homologação Ativa &amp; Regularizada • CONAD 01/2010
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-areia-100">
              {temploAtual.nome}
            </h2>
            <p className="text-xs text-areia-300 font-light">
              Dirigente: {temploAtual.dirigente} • Código: #{temploAtual.id} •{" "}
              {temploAtual.cidade}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            {authenticatedAsAdmin && (
              <button
                onClick={() => setUserRole("ADMIN")}
                className="btn-secondary text-xs inline-flex items-center justify-center gap-1.5 px-3 py-2 border-amber-500/50 text-amber-300 flex-1 sm:flex-initial"
                title="Voltar ao Painel Geral da Cooperativa"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-ambar-400" />
                <span>Voltar ao Painel ADM</span>
              </button>
            )}
            <button
              onClick={handleLogout}
              className="rounded-xl border border-pedra-700/60 bg-pedra-900/60 hover:bg-pedra-800 text-areia-300 text-xs inline-flex items-center justify-center gap-1.5 px-3.5 py-2 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </AnimateOnScroll>

      {/* FAIXA DE ACESSO DIRETO: DOWNLOAD DA LISTA DE MEDICAMENTOS (PDF & EXCEL) */}
      <div className="print-hidden rounded-2xl border border-emerald-500/35 bg-gradient-to-r from-emerald-950/50 via-floresta-900/90 to-floresta-950 p-4 sm:p-5 shadow-lg">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shrink-0 mt-0.5">
              <Pill className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs sm:text-sm font-serif font-bold text-areia-100">
                  Tabela Oficial de Medicamentos Controlados &amp; Conflitos com Ayahuasca
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  4 Cores • 20 Classes • +185 Medicamentos
                </span>
              </div>
              <p className="text-xs text-areia-300 font-light leading-relaxed">
                Acesso imediato para triagem no computador ou celular: baixe a lista completa em{" "}
                <strong className="text-areia-100">PDF A4 pronto para impressão</strong> ou em{" "}
                <strong className="text-areia-100">Planilha Excel (.xls) colorida</strong>, ou consulte o buscador interativo.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setDirigenteTab("INTERACOES_FARMACIA")}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold inline-flex items-center justify-center gap-2 transition-all border ${
                dirigenteTab === "INTERACOES_FARMACIA"
                  ? "bg-emerald-500 text-floresta-950 font-bold border-emerald-400 shadow-md"
                  : "bg-floresta-950/90 text-emerald-300 border-emerald-500/40 hover:bg-emerald-950/60"
              }`}
            >
              <Pill className="h-4 w-4 shrink-0" />
              <span>Abrir Buscador de Fármacos</span>
            </button>

            <button
              type="button"
              onClick={async () => {
                const { exportarMedicamentosPDF } = await import(
                  "@/lib/export-medicamentos"
                );
                exportarMedicamentosPDF();
              }}
              className="px-3.5 py-2.5 rounded-xl text-xs font-bold inline-flex items-center justify-center gap-2 bg-ambar-500 hover:bg-ambar-400 text-floresta-950 shadow-md transition-all"
              title="Gerar e baixar PDF A4 da Tabela de Medicamentos Controlados"
            >
              <Printer className="h-4 w-4 shrink-0" />
              <span>Baixar Lista em PDF (A4)</span>
            </button>

            <button
              type="button"
              onClick={async () => {
                const { exportarMedicamentosExcel } = await import(
                  "@/lib/export-medicamentos"
                );
                exportarMedicamentosExcel();
              }}
              className="px-3.5 py-2.5 rounded-xl text-xs font-bold inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all"
              title="Baixar planilha Excel (.xls) com todas as marcas comerciais e tempos de washout"
            >
              <FileSpreadsheet className="h-4 w-4 shrink-0" />
              <span>Baixar Planilha Excel (.xls)</span>
            </button>
          </div>
        </div>
      </div>

      {/* CENTRAL DE NAVEGAÇÃO EM GRADE POR PILARES (SEM BARRA ESCONDIDA NO PC OU CELULAR) */}
      <div className="print-hidden space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 px-1">
          <span className="text-[11px] font-bold text-areia-300 uppercase tracking-wider">
            Painel de Navegação da Assessoria &amp; Gestão do Templo
          </span>
          <span className="text-[11px] text-ambar-400 font-medium">
            Todos os 11 módulos visíveis • Toque para alternar
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5">
          {gruposModulos.map((grupo) => (
            <div
              key={grupo.idGrupo}
              className={`rounded-2xl border p-3.5 sm:p-4 space-y-3 ${
                grupo.destaqueBorda || "border-ambar-500/20 bg-floresta-950/80"
              }`}
            >
              <div className="border-b border-ambar-500/15 pb-2">
                <h3 className="text-xs font-bold text-areia-100 uppercase tracking-wide">
                  {grupo.titulo}
                </h3>
                <p className="text-[11px] text-areia-400 font-light">
                  {grupo.subtitulo}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2">
                {grupo.itens.map((item) => {
                  const isAtiva = dirigenteTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setDirigenteTab(item.id)}
                      className={`p-2.5 sm:p-3 rounded-xl text-left transition-all flex items-start gap-2.5 border ${
                        isAtiva
                          ? "bg-ambar-500 text-floresta-950 font-bold border-ambar-400 shadow-md ring-2 ring-ambar-400/40"
                          : "bg-floresta-900/60 text-areia-200 hover:text-areia-100 hover:bg-floresta-800/80 border-ambar-500/15"
                      }`}
                    >
                      <div
                        className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                          isAtiva
                            ? "bg-floresta-950/20 text-floresta-950"
                            : "bg-floresta-950/80"
                        }`}
                      >
                        {item.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span
                            className={`text-xs font-semibold leading-tight truncate ${
                              isAtiva ? "text-floresta-950 font-bold" : "text-areia-100"
                            }`}
                          >
                            {item.label}
                          </span>
                          {item.badge && (
                            <span
                              className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold border shrink-0 ${
                                isAtiva
                                  ? "bg-floresta-950 text-ambar-300 border-floresta-900"
                                  : item.corBadge
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-[10px] leading-snug mt-0.5 truncate ${
                            isAtiva
                              ? "text-floresta-900 font-medium"
                              : "text-areia-400 font-light"
                          }`}
                        >
                          {item.subLabel}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RENDERIZAÇÃO DOS MÓDULOS */}

      {/* 1. ACOMPANHAMENTO DE SOLICITAÇÕES */}
      {dirigenteTab === "SOLICITACOES" && (
        <AcompanhamentoPedidos
          temploId={temploAtual.id}
          onNovaSolicitacao={() => setDirigenteTab("NOVA_SOLICITACAO")}
          onRepetirPedido={(pedido) => {
            setPedidoParaRepetir(pedido);
            setDirigenteTab("NOVA_SOLICITACAO");
          }}
        />
      )}

      {/* 2. FORMULÁRIO DE NOVA SOLICITAÇÃO */}
      {dirigenteTab === "NOVA_SOLICITACAO" && (
        <FormSolicitacaoPedido
          templo={temploAtual}
          pedidoParaRepetir={pedidoParaRepetir}
          onPedidoCriado={() => {
            setPedidoParaRepetir(null);
            setDirigenteTab("SOLICITACOES");
          }}
          onIrParaAcompanhamento={() => setDirigenteTab("SOLICITACOES")}
        />
      )}

      {/* 2.1. GESTÃO DE CONTEÚDO DA COMUNIDADE & PERFIL DO TEMPLO */}
      {dirigenteTab === "COMUNIDADE_GESTAO" && (
        <PortalComunidadeGestao
          temploCodigo={temploAtual.id}
          temploNome={temploAtual.nome}
          cidade={temploAtual.cidade}
        />
      )}

      {/* 3. CALCULADORA LITÚRGICA */}
      {dirigenteTab === "CALCULADORA" && (
        <PortalCalculadoraLiturgica
          onIrParaSolicitacao={() => setDirigenteTab("NOVA_SOLICITACAO")}
        />
      )}

      {/* 4. CENTRAL DE DOCUMENTOS & PDFS PRONTOS (A4) */}
      {dirigenteTab === "CENTRAL_DOCUMENTOS" && (
        <PortalCentralDocumentos templo={temploAtual} />
      )}

      {/* 5. FARMACOLOGIA & INTERAÇÕES MEDICAMENTOSAS */}
      {dirigenteTab === "INTERACOES_FARMACIA" && (
        <PortalInteracoesMedicamentosas />
      )}

      {/* 6. CATÁLOGO DESCRITIVO DE GRADUAÇÕES */}
      {dirigenteTab === "GRADUACOES_CATALOGO" && (
        <PortalCatalogoGraduacoes />
      )}

      {/* 7. FAQ COMPLETO DO DIRIGENTE */}
      {dirigenteTab === "ASSESSORIA_FAQ" && (
        <PortalAssessoriaFAQ />
      )}

      {/* 8. RESPALDO JURÍDICO & MARCO REGULATÓRIO */}
      {dirigenteTab === "RESPALDO_JURIDICO" && (
        <PortalRespaldoJuridico
          onIrParaDocumentos={() => setDirigenteTab("CENTRAL_DOCUMENTOS")}
        />
      )}

      {/* 9. LAUDOS & CADEIA DE CUSTÓDIA */}
      {dirigenteTab === "LAUDOS" && <PortalLaudosCustodia />}

      {/* 10. MATRIZ DE COOPERATIVISMO & COTAS */}
      {dirigenteTab === "COOPERATIVISMO" && <PortalCooperativismo />}
    </div>
  );
};

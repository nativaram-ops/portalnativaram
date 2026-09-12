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
} from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { FormSolicitacaoPedido } from "@/components/portal-dirigente/FormSolicitacaoPedido";
import { AcompanhamentoPedidos } from "@/components/portal-dirigente/AcompanhamentoPedidos";
import { PortalLoginGate } from "@/components/portal-dirigente/PortalLoginGate";
import { PortalAdminDashboard } from "@/components/portal-dirigente/PortalAdminDashboard";
import { PortalLaudosCustodia } from "@/components/portal-dirigente/PortalLaudosCustodia";
import { PortalCooperativismo } from "@/components/portal-dirigente/PortalCooperativismo";
import { PortalCentralDocumentos } from "@/components/portal-dirigente/PortalCentralDocumentos";
import { PortalInteracoesMedicamentosas } from "@/components/portal-dirigente/PortalInteracoesMedicamentosas";
import { PortalCatalogoGraduacoes } from "@/components/portal-dirigente/PortalCatalogoGraduacoes";
import { PortalAssessoriaFAQ } from "@/components/portal-dirigente/PortalAssessoriaFAQ";
import { PortalCalculadoraLiturgica } from "@/components/portal-dirigente/PortalCalculadoraLiturgica";
import { PortalRespaldoJuridico } from "@/components/portal-dirigente/PortalRespaldoJuridico";
import { ItemPedido } from "@/types/pedido";
import { templosIniciais, TemploMock } from "@/data/portal-mock";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type DirigenteTab =
  | "SOLICITACOES"
  | "NOVA_SOLICITACAO"
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

  // Verificar sessão persistente no Supabase no carregamento inicial
  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    supabase.auth.getSession().then((res: any) => {
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
    });

    const { data } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      if (!session) {
        setIsAuthenticated(false);
      }
    });

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
  };

  const handleLogout = async () => {
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      await supabase.auth.signOut();
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


  // Definição das Abas do Dirigente
  const abas = [
    {
      id: "SOLICITACOES" as const,
      label: "Minhas Solicitações",
      icon: <PackageCheck className="h-4 w-4" />,
      categoria: "PEDIDOS",
    },
    {
      id: "NOVA_SOLICITACAO" as const,
      label: "Nova Solicitação",
      icon: <Sparkles className="h-4 w-4" />,
      categoria: "PEDIDOS",
    },
    {
      id: "CALCULADORA" as const,
      label: "Calculadora Litúrgica",
      icon: <Calculator className="h-4 w-4" />,
      categoria: "ASSESSORIA",
    },
    {
      id: "CENTRAL_DOCUMENTOS" as const,
      label: "Documentos & PDFs A4",
      icon: <FileCheck className="h-4 w-4 text-ambar-400" />,
      categoria: "ASSESSORIA",
      destaque: true,
    },
    {
      id: "INTERACOES_FARMACIA" as const,
      label: "Fármacos & Washout",
      icon: <Pill className="h-4 w-4 text-emerald-400" />,
      categoria: "ASSESSORIA",
    },
    {
      id: "GRADUACOES_CATALOGO" as const,
      label: "Catálogo de Graduações",
      icon: <BookOpen className="h-4 w-4" />,
      categoria: "ASSESSORIA",
    },
    {
      id: "ASSESSORIA_FAQ" as const,
      label: "FAQ do Dirigente",
      icon: <HelpCircle className="h-4 w-4" />,
      categoria: "ASSESSORIA",
    },
    {
      id: "RESPALDO_JURIDICO" as const,
      label: "Marco Legal & Trânsito",
      icon: <Scale className="h-4 w-4" />,
      categoria: "JURIDICO",
    },
    {
      id: "LAUDOS" as const,
      label: "Laudos do Acre",
      icon: <FileText className="h-4 w-4" />,
      categoria: "TRANSPARENCIA",
    },
    {
      id: "COOPERATIVISMO" as const,
      label: "Tabela Evolutiva",
      icon: <Compass className="h-4 w-4" />,
      categoria: "TRANSPARENCIA",
    },
  ];

  // 3. PORTAL DO DIRIGENTE (TEMPLO HOMOLOGADO)
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Barra Superior do Templo (Oculta na Impressão) */}
      <AnimateOnScroll className="print-hidden">
        <div className="card-elevated rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-ambar-500/30 bg-gradient-to-r from-floresta-950 via-floresta-900 to-floresta-950">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                Homologação Ativa & Regularizada • CONAD 01/2010
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-areia-100">
              {temploAtual.nome}
            </h2>
            <p className="text-xs text-areia-300 font-light">
              Dirigente: {temploAtual.dirigente} • Código: #{temploAtual.id} • {temploAtual.cidade}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {authenticatedAsAdmin && (
              <button
                onClick={() => setUserRole("ADMIN")}
                className="btn-secondary text-xs inline-flex items-center gap-1.5 px-3 py-2 border-amber-500/50 text-amber-300"
                title="Voltar ao Painel Geral da Cooperativa"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-ambar-400" />
                <span>Voltar ao Painel ADM</span>
              </button>
            )}
            <button
              onClick={handleLogout}
              className="rounded-xl border border-pedra-700/60 bg-pedra-900/60 hover:bg-pedra-800 text-areia-300 text-xs inline-flex items-center gap-1.5 px-3 py-2 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </AnimateOnScroll>

      {/* Abas de Navegação do Dirigente (Ocultas na Impressão) */}
      <div className="print-hidden space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-areia-400 uppercase tracking-wider">
            Navegação da Assessoria & Gestão
          </span>
          <span className="text-[11px] text-ambar-400 font-medium hidden sm:inline">
            10 Módulos Integrados para o Templo
          </span>
        </div>

        <div className="flex overflow-x-auto pb-2.5 gap-2 border-b border-ambar-500/20 touch-scroll-x scroll-smooth">
          {abas.map((tab) => {
            const isAtiva = dirigenteTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setDirigenteTab(tab.id)}
                className={`px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 sm:gap-2 transition-all shrink-0 min-h-[40px] ${
                  isAtiva
                    ? "bg-ambar-500 text-floresta-950 font-bold shadow-md ring-2 ring-ambar-400/40"
                    : tab.destaque
                    ? "bg-floresta-900/90 text-ambar-300 hover:text-ambar-200 hover:bg-floresta-800 border border-ambar-500/40"
                    : "bg-floresta-900/50 text-areia-300 hover:text-areia-100 hover:bg-floresta-800/60 border border-ambar-500/10"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
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

"use client";

import React, { useState } from "react";
import {
  LogOut,
  ShieldCheck,
  PackageCheck,
  Sparkles,
  FileText,
  Scale,
} from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { FormSolicitacaoPedido } from "@/components/portal-dirigente/FormSolicitacaoPedido";
import { AcompanhamentoPedidos } from "@/components/portal-dirigente/AcompanhamentoPedidos";
import { PortalLoginGate } from "@/components/portal-dirigente/PortalLoginGate";
import { PortalAdminDashboard } from "@/components/portal-dirigente/PortalAdminDashboard";
import { PortalLaudosCustodia } from "@/components/portal-dirigente/PortalLaudosCustodia";
import { PortalCooperativismo } from "@/components/portal-dirigente/PortalCooperativismo";
import { ItemPedido } from "@/types/pedido";
import { templosIniciais, TemploMock } from "@/data/portal-mock";

type DirigenteTab = "SOLICITACOES" | "NOVA_SOLICITACAO" | "LAUDOS" | "COOPERATIVISMO";

export const PortalDirigenteClient: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<"DIRIGENTE" | "ADMIN">("DIRIGENTE");
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

  // Templo selecionado com fallback seguro
  const temploAtual =
    templos.find(
      (t) =>
        t.id.toUpperCase() === codigoAcesso.trim().toUpperCase() ||
        t.id.toLowerCase().includes(codigoAcesso.trim().toLowerCase())
    ) || templos[0];

  const handleAuthenticated = (role: "DIRIGENTE" | "ADMIN", codigo: string) => {
    setUserRole(role);
    setCodigoAcesso(codigo);
    setIsAuthenticated(true);
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
        onLogout={() => setIsAuthenticated(false)}
      />
    );
  }

  // 3. PORTAL DO DIRIGENTE (TEMPLO HOMOLOGADO)
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Barra Superior do Templo */}
      <AnimateOnScroll>
        <div className="card-elevated rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-ambar-500/30 bg-gradient-to-r from-floresta-950 via-floresta-900 to-floresta-950">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                Homologação Ativa & Regularizada
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
            <button
              onClick={() => setUserRole("ADMIN")}
              className="btn-secondary text-xs inline-flex items-center gap-1.5 px-3 py-2"
              title="Acessar Modo Administrador"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-ambar-400" />
              <span>Painel ADM</span>
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="rounded-xl border border-pedra-700/60 bg-pedra-900/60 hover:bg-pedra-800 text-areia-300 text-xs inline-flex items-center gap-1.5 px-3 py-2 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </AnimateOnScroll>

      {/* Abas de Navegação do Dirigente */}
      <div className="flex overflow-x-auto pb-2 gap-2 border-b border-ambar-500/20">
        {[
          {
            id: "SOLICITACOES" as const,
            label: "Minhas Solicitações & Rastreio",
            icon: <PackageCheck className="h-4 w-4" />,
          },
          {
            id: "NOVA_SOLICITACAO" as const,
            label: "Nova Solicitação de Partilha",
            icon: <Sparkles className="h-4 w-4" />,
          },
          {
            id: "LAUDOS" as const,
            label: "Laudo & Feitio no Acre",
            icon: <FileText className="h-4 w-4" />,
          },
          {
            id: "COOPERATIVISMO" as const,
            label: "Tabela Evolutiva & Cotas",
            icon: <Scale className="h-4 w-4" />,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setDirigenteTab(tab.id)}
            className={`px-4 py-3 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all ${
              dirigenteTab === tab.id
                ? "bg-ambar-500 text-floresta-950 font-bold shadow-md"
                : "bg-floresta-900/50 text-areia-300 hover:text-areia-100 hover:bg-floresta-800/60 border border-ambar-500/10"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ABA 1 DO DIRIGENTE: ACOMPANHAMENTO DE SOLICITAÇÕES */}
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

      {/* ABA 2 DO DIRIGENTE: FORMULÁRIO DE NOVA SOLICITAÇÃO */}
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

      {/* ABA 3 DO DIRIGENTE: LAUDO & CADEIA DE CUSTÓDIA */}
      {dirigenteTab === "LAUDOS" && <PortalLaudosCustodia />}

      {/* ABA 4 DO DIRIGENTE: MATRIZ DE COOPERATIVISMO & COTAS */}
      {dirigenteTab === "COOPERATIVISMO" && <PortalCooperativismo />}
    </div>
  );
};

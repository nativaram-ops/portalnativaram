"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { FileText, Pill, HelpCircle, Scale, ShieldCheck } from "lucide-react";
import { PortalLoginGate } from "@/components/portal-dirigente/PortalLoginGate";
import type { TemploMock } from "@/data/portal-mock";

const Carregando = () => (
  <div className="rounded-2xl border border-ambar-500/20 bg-floresta-950/70 p-8 text-center animate-pulse">
    <p className="text-xs font-mono text-ambar-400 uppercase tracking-widest">Carregando…</p>
  </div>
);

const PortalCentralDocumentos = dynamic(
  () => import("@/components/portal-dirigente/PortalCentralDocumentos").then((m) => m.PortalCentralDocumentos),
  { loading: () => <Carregando /> }
);
const PortalInteracoesMedicamentosas = dynamic(
  () =>
    import("@/components/portal-dirigente/PortalInteracoesMedicamentosas").then(
      (m) => m.PortalInteracoesMedicamentosas
    ),
  { loading: () => <Carregando /> }
);
const PortalAssessoriaFAQ = dynamic(
  () => import("@/components/portal-dirigente/PortalAssessoriaFAQ").then((m) => m.PortalAssessoriaFAQ),
  { loading: () => <Carregando /> }
);
const PortalRespaldoJuridico = dynamic(
  () => import("@/components/portal-dirigente/PortalRespaldoJuridico").then((m) => m.PortalRespaldoJuridico),
  { loading: () => <Carregando /> }
);
const PortalAdminDashboard = dynamic(
  () => import("@/components/portal-dirigente/PortalAdminDashboard").then((m) => m.PortalAdminDashboard),
  { loading: () => <Carregando /> }
);

/** Cabeçalho dos documentos no modo público: campos para a entidade preencher. */
const ENTIDADE_MODELO: TemploMock = {
  id: "MODELO",
  nome: "[Nome da entidade religiosa]",
  cidade: "[Cidade/UF]",
  dirigente: "[Responsável legal]",
  cnpj: "[CNPJ da entidade]",
};

type Aba = "DOCUMENTOS" | "INTERACOES" | "FAQ" | "MARCO_LEGAL";

const ABAS: { id: Aba; label: string; descricao: string; icon: React.ReactNode }[] = [
  {
    id: "DOCUMENTOS",
    label: "Documentos & Modelos A4",
    descricao: "Anamnese, termo, ata, emergência e privacidade",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    id: "INTERACOES",
    label: "Medicamentos & Washout",
    descricao: "Matriz de interações para triagem",
    icon: <Pill className="h-4 w-4" />,
  },
  {
    id: "FAQ",
    label: "Perguntas Frequentes",
    descricao: "Conservação, rito e segurança",
    icon: <HelpCircle className="h-4 w-4" />,
  },
  {
    id: "MARCO_LEGAL",
    label: "Marco Legal",
    descricao: "CONAD 1/2010 e direitos básicos",
    icon: <Scale className="h-4 w-4" />,
  },
];

const CHAVE_SESSAO = "nativaram_sessao_ativa";

/**
 * Central de Recursos: conteúdo de segurança e conformidade aberto ao público
 * (ADR-016). O login existe só para o Conselho do projeto.
 */
export const CentralRecursosClient: React.FC = () => {
  const [aba, setAba] = useState<Aba>("DOCUMENTOS");
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [conselhoAtivo, setConselhoAtivo] = useState(false);

  useEffect(() => {
    try {
      const salvo = JSON.parse(sessionStorage.getItem(CHAVE_SESSAO) || "null");
      if (salvo?.role === "ADMIN") setConselhoAtivo(true);
    } catch {
      // sessionStorage indisponível: segue no modo público
    }
  }, []);

  const entrar = (role: "DIRIGENTE" | "ADMIN", codigo: string) => {
    if (role !== "ADMIN") return;
    try {
      sessionStorage.setItem(CHAVE_SESSAO, JSON.stringify({ role, codigo }));
    } catch {
      // ignora
    }
    setConselhoAtivo(true);
    setMostrarLogin(false);
  };

  const sair = async () => {
    try {
      sessionStorage.removeItem(CHAVE_SESSAO);
    } catch {
      // ignora
    }
    await fetch("/api/auth/sair", { method: "POST" }).catch(() => {});
    setConselhoAtivo(false);
  };

  if (conselhoAtivo) {
    return <PortalAdminDashboard onLogout={sair} />;
  }

  if (mostrarLogin) {
    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => setMostrarLogin(false)}
          className="text-xs text-ambar-300 underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ambar-400"
        >
          ← Voltar aos recursos
        </button>
        <PortalLoginGate onAuthenticated={entrar} apenasConselho />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-ambar-500/25 bg-floresta-950/80 p-5 text-xs text-areia-300 leading-relaxed space-y-2">
        <p>
          <strong className="text-areia-100">Recursos abertos de segurança e conformidade.</strong>{" "}
          Modelos de documentos, matriz de interações medicamentosas, perguntas frequentes e marco legal,
          para entidades religiosas que fazem uso ritual da ayahuasca nos termos da Resolução CONAD nº 1/2010.
        </p>
        <p className="text-areia-400">
          Conteúdo informativo, sem promessa de benefício e sem oferta. Não substitui orientação médica nem
          jurídica. Revisão clínica e jurídica pendente onde indicado.
        </p>
      </div>

      <div role="tablist" aria-label="Recursos" className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {ABAS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`aba-${item.id}`}
            aria-controls="painel-recursos"
            aria-selected={aba === item.id}
            onClick={() => setAba(item.id)}
            className={`rounded-xl px-3 py-3 text-left text-xs transition-all border focus:outline-none focus-visible:ring-2 focus-visible:ring-ambar-400 ${
              aba === item.id
                ? "bg-ambar-500 text-floresta-950 border-ambar-500 font-bold"
                : "bg-floresta-900/50 text-areia-300 border-ambar-500/15 hover:text-areia-100"
            }`}
          >
            <span className="flex items-center gap-2 font-semibold">
              {item.icon}
              {item.label}
            </span>
            <span className={`block mt-1 text-[11px] ${aba === item.id ? "text-floresta-900" : "text-areia-400"}`}>
              {item.descricao}
            </span>
          </button>
        ))}
      </div>

      <div role="tabpanel" id="painel-recursos" aria-labelledby={`aba-${aba}`}>
        {aba === "DOCUMENTOS" && <PortalCentralDocumentos templo={ENTIDADE_MODELO} />}
        {aba === "INTERACOES" && <PortalInteracoesMedicamentosas />}
        {aba === "FAQ" && <PortalAssessoriaFAQ />}
        {aba === "MARCO_LEGAL" && <PortalRespaldoJuridico onIrParaDocumentos={() => setAba("DOCUMENTOS")} />}
      </div>

      <div className="border-t border-ambar-500/15 pt-4 text-right">
        <button
          type="button"
          onClick={() => setMostrarLogin(true)}
          className="inline-flex items-center gap-1.5 text-[11px] text-areia-400 hover:text-ambar-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ambar-400"
        >
          <ShieldCheck className="h-3.5 w-3.5" /> Acesso do Conselho
        </button>
      </div>
    </div>
  );
};

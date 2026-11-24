import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { LogOut, Building2, BookOpen } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const AdminGestaoHomologacoes = dynamic(() =>
  import("@/components/portal-dirigente/AdminGestaoHomologacoes").then(
    (m) => m.AdminGestaoHomologacoes
  )
);

interface PortalAdminDashboardProps {
  onLogout: () => void;
}

/**
 * Painel do Conselho (ADR-016). Não há pedidos, cotas, lotes nem envios no site:
 * o painel serve para atender direitos dos titulares sobre os cadastros feitos
 * antes de 24/11/2026 e para moderar os anexos do Observatório.
 */
export const PortalAdminDashboard: React.FC<PortalAdminDashboardProps> = ({ onLogout }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <AnimateOnScroll>
        <div className="card-elevated rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-ambar-500/30">
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-500/30">
              Conselho do projeto • Sessão ativa
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-areia-100">Painel do Conselho</h2>
            <p className="text-xs sm:text-sm text-areia-300 font-light max-w-2xl">
              Cadastros recebidos antes de 24/11/2026, mantidos só para atender pedidos de acesso, correção e
              exclusão dos titulares (LGPD, art. 18). O site não recebe mais cadastros, pedidos nem envios.
            </p>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="rounded-xl border border-pedra-700/60 bg-pedra-900/60 hover:bg-pedra-800 text-areia-300 text-xs inline-flex items-center gap-2 px-4 py-2.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ambar-400"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sair</span>
          </button>
        </div>
      </AnimateOnScroll>

      <section aria-labelledby="titulo-cadastros" className="space-y-3">
        <h3 id="titulo-cadastros" className="font-serif text-lg font-bold text-areia-100 flex items-center gap-2">
          <Building2 className="h-4 w-4 text-ambar-400" /> Cadastros existentes
        </h3>
        <AdminGestaoHomologacoes />
      </section>

      <section className="rounded-2xl border border-ambar-500/20 bg-floresta-950/70 p-5 text-xs text-areia-300 space-y-2">
        <h3 className="font-serif text-base font-bold text-areia-100 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-ambar-400" /> Observatório acadêmico
        </h3>
        <p>
          Com a sessão do Conselho ativa, o formulário de novos anexos aparece no Observatório. Cada anexo deve ser
          referência científica com DOI e link de origem, sem indicação de uso.
        </p>
        <Link href="/estudos#observatorio" className="text-ambar-300 underline">
          Abrir o Observatório
        </Link>
      </section>
    </div>
  );
};

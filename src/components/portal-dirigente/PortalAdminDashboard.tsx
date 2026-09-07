import React, { useState } from "react";
import {
  Building2,
  ShieldCheck,
  LogOut,
  PackageCheck,
  FlaskConical,
  Droplets,
  Truck,
  Scale,
  CheckCircle2,
  Layers,
  Clock,
  Check,
} from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { AdminGestaoPedidos } from "@/components/portal-dirigente/AdminGestaoPedidos";
import { PortalCooperativismo } from "@/components/portal-dirigente/PortalCooperativismo";
import { TemploMock, lotesFeitio, enviosLogistica } from "@/data/portal-mock";

interface PortalAdminDashboardProps {
  templos: TemploMock[];
  onHomologarTemplo: (id: string) => void;
  onSimularVisaoTemplo: () => void;
  onLogout: () => void;
}

type AdminTab =
  | "PEDIDOS"
  | "METRICAS"
  | "CREDENCIAMENTOS"
  | "LOTES"
  | "LOGISTICA"
  | "COOPERATIVISMO";

export const PortalAdminDashboard: React.FC<PortalAdminDashboardProps> = ({
  templos,
  onHomologarTemplo,
  onSimularVisaoTemplo,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>("PEDIDOS");
  const [filtroStatus, setFiltroStatus] = useState<
    "TODOS" | "HOMOLOGADO" | "EM_ANALISE" | "TRIAGEM_LITURGICA"
  >("TODOS");
  const [buscaTemplo, setBuscaTemplo] = useState("");

  const templosFiltrados = templos.filter((t) => {
    const matchStatus = filtroStatus === "TODOS" || t.status === filtroStatus;
    const matchBusca =
      t.nome.toLowerCase().includes(buscaTemplo.toLowerCase()) ||
      t.cidade.toLowerCase().includes(buscaTemplo.toLowerCase()) ||
      t.dirigente.toLowerCase().includes(buscaTemplo.toLowerCase()) ||
      t.id.toLowerCase().includes(buscaTemplo.toLowerCase());
    return matchStatus && matchBusca;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Barra Superior do Administrador */}
      <AnimateOnScroll>
        <div className="card-elevated rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-ambar-500/30 bg-gradient-to-r from-floresta-950 via-floresta-900 to-floresta-950">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                Conselho Gestor Cooperativo • Modo Administrador (ADM)
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-areia-100">
              Painel de Controle Litúrgico & Operacional
            </h2>
            <p className="text-xs sm:text-sm text-areia-300 font-light">
              Gestão central de solicitações, congregações homologadas, laudos fitoquímicos no Acre e rota refrigerada.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onSimularVisaoTemplo}
              className="btn-secondary text-xs inline-flex items-center gap-2 px-4 py-2.5"
              title="Ver como um dirigente de templo enxerga a plataforma"
            >
              <Building2 className="h-3.5 w-3.5 text-ambar-400" />
              <span>Simular Visão do Templo</span>
            </button>

            <button
              onClick={onLogout}
              className="rounded-xl border border-pedra-700/60 bg-pedra-900/60 hover:bg-pedra-800 text-areia-300 text-xs inline-flex items-center gap-2 px-4 py-2.5 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </AnimateOnScroll>

      {/* Abas de Navegação do ADM */}
      <div className="flex overflow-x-auto pb-2 gap-2 border-b border-ambar-500/20">
        {[
          {
            id: "PEDIDOS" as const,
            label: "Solicitações de Partilha",
            icon: <PackageCheck className="h-4 w-4" />,
          },
          {
            id: "METRICAS" as const,
            label: "Resumo Litúrgico",
            icon: <FlaskConical className="h-4 w-4" />,
          },
          {
            id: "CREDENCIAMENTOS" as const,
            label: "Homologações de Templos",
            icon: <Building2 className="h-4 w-4" />,
            count: templos.length,
          },
          {
            id: "LOTES" as const,
            label: "Feitio no Acre & Lotes",
            icon: <Droplets className="h-4 w-4" />,
          },
          {
            id: "LOGISTICA" as const,
            label: "Despachos & Rastreamento",
            icon: <Truck className="h-4 w-4" />,
          },
          {
            id: "COOPERATIVISMO" as const,
            label: "Tabela Evolutiva & Cotas",
            icon: <Scale className="h-4 w-4" />,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === tab.id
                ? "bg-ambar-500 text-floresta-950 font-bold shadow-md"
                : "bg-floresta-900/50 text-areia-300 hover:text-areia-100 hover:bg-floresta-800/60 border border-ambar-500/10"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className="ml-1 rounded-full bg-floresta-950/80 px-1.5 py-0.2 text-[10px] text-amber-300">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* CONTEÚDO DA ABA 0: GESTÃO CENTRAL DE SOLICITAÇÕES (PEDIDOS) */}
      {activeTab === "PEDIDOS" && <AdminGestaoPedidos />}

      {/* CONTEÚDO DA ABA 1: MÉTRICAS E VISÃO GERAL */}
      {activeTab === "METRICAS" && (
        <div className="space-y-8 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="card-elevated rounded-2xl p-6 space-y-3 border-ambar-500/20">
              <div className="flex items-center justify-between text-ambar-400">
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Templos Cadastrados
                </span>
                <Building2 className="h-5 w-5" />
              </div>
              <div className="text-3xl font-serif font-bold text-areia-100">
                {templos.length}
              </div>
              <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                <CheckCircle2 className="h-3 w-3" />
                <span>2 congregações ativas • 2 em análise</span>
              </p>
            </div>

            <div className="card-elevated rounded-2xl p-6 space-y-3 border-ambar-500/20">
              <div className="flex items-center justify-between text-ambar-400">
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Sacramento em Feitio
                </span>
                <Droplets className="h-5 w-5" />
              </div>
              <div className="text-3xl font-serif font-bold text-areia-100">200 L</div>
              <p className="text-[11px] text-areia-400 font-light">
                Lotes #08 e #10 em Cruzeiro do Sul/AC
              </p>
            </div>

            <div className="card-elevated rounded-2xl p-6 space-y-3 border-ambar-500/20">
              <div className="flex items-center justify-between text-ambar-400">
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Formatos Mel & Gel
                </span>
                <Layers className="h-5 w-5" />
              </div>
              <div className="text-3xl font-serif font-bold text-areia-100">65 kg</div>
              <p className="text-[11px] text-amber-300 font-medium">
                Alta redução logística interestadual
              </p>
            </div>

            <div className="card-elevated rounded-2xl p-6 space-y-3 border-ambar-500/20">
              <div className="flex items-center justify-between text-ambar-400">
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Despachos em Trânsito
                </span>
                <Truck className="h-5 w-5" />
              </div>
              <div className="text-3xl font-serif font-bold text-areia-100">3 Lotes</div>
              <p className="text-[11px] text-emerald-400 font-medium">
                Cadeia refrigerada 100% monitorada
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CONTEÚDO DA ABA 2: HOMOLOGAÇÃO DE TEMPLOS */}
      {activeTab === "CREDENCIAMENTOS" && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-areia-100">
                Congregações & Templos em Processo de Homologação
              </h3>
              <p className="text-xs text-areia-400 font-light">
                Análise de atas de fundação, conformidade CONAD 01/2010 e termo de responsabilidade litúrgica.
              </p>
            </div>
          </div>

          <div className="card-elevated rounded-2xl overflow-hidden border-ambar-500/20 bg-floresta-950/90">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-areia-300">
                <thead className="bg-floresta-900/90 text-[11px] uppercase tracking-wider text-areia-400 border-b border-ambar-500/15">
                  <tr>
                    <th className="py-3.5 px-4 font-semibold">Templo / Instituição</th>
                    <th className="py-3.5 px-4 font-semibold">Dirigente Litúrgico</th>
                    <th className="py-3.5 px-4 font-semibold">CNPJ</th>
                    <th className="py-3.5 px-4 font-semibold">Graduação Solicitada</th>
                    <th className="py-3.5 px-4 font-semibold">Status CONAD</th>
                    <th className="py-3.5 px-4 font-semibold text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ambar-500/10">
                  {templosFiltrados.map((templo) => (
                    <tr key={templo.id} className="hover:bg-floresta-900/40 transition-colors">
                      <td className="py-4 px-4">
                        <strong className="font-serif text-areia-100 block font-bold">
                          {templo.nome}
                        </strong>
                        <span className="text-[11px] text-areia-400 font-light">
                          {templo.cidade} • {templo.id}
                        </span>
                      </td>
                      <td className="py-4 px-4">{templo.dirigente}</td>
                      <td className="py-4 px-4 font-mono text-[11px]">{templo.cnpj}</td>
                      <td className="py-4 px-4">
                        <span className="text-amber-300 font-medium">{templo.graduacao}</span>
                        <span className="block text-[10px] text-areia-400 font-light">
                          Volume: {templo.volume}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        {templo.status === "HOMOLOGADO" ? (
                          <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold text-[11px]">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>Homologado</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-amber-400 font-semibold text-[11px]">
                            <Clock className="h-3.5 w-3.5" />
                            <span>Em Análise</span>
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-right">
                        {templo.status !== "HOMOLOGADO" ? (
                          <button
                            type="button"
                            onClick={() => onHomologarTemplo(templo.id)}
                            className="py-1 px-3 rounded-lg border border-emerald-500/30 bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                          >
                            <Check className="h-3 w-3" />
                            <span>Homologar</span>
                          </button>
                        ) : (
                          <span className="text-[11px] text-areia-400 font-light italic">
                            Aprovado em {templo.dataAprovacao}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* CONTEÚDO DA ABA 3: GESTÃO DE LOTES NO ACRE */}
      {activeTab === "LOTES" && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h3 className="font-serif text-xl font-bold text-areia-100">
              Feitio & Cadeia de Custódia em Cruzeiro do Sul/AC
            </h3>
            <p className="text-xs text-areia-400 font-light">
              Controle de bateladas, monitoramento de biomassa Tucunacá e laudos analíticos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lotesFeitio.map((lote) => (
              <div
                key={lote.lote}
                className="card-elevated rounded-2xl p-6 space-y-4 border-ambar-500/20 bg-floresta-950/90"
              >
                <div className="flex items-start justify-between border-b border-ambar-500/15 pb-3">
                  <div>
                    <span className="font-mono text-xs text-ambar-400 font-bold">
                      Lote #{lote.lote}
                    </span>
                    <h4 className="font-serif text-lg font-bold text-areia-100">{lote.tipo}</h4>
                  </div>
                  <span className="rounded-full bg-ambar-500/10 border border-ambar-500/30 px-2.5 py-1 text-[10px] font-semibold text-ambar-300">
                    Volume: {lote.volume}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-lg bg-floresta-900/60 p-3 space-y-1">
                    <span className="text-areia-400 block text-[10px] font-light">
                      Feitor Responsável
                    </span>
                    <span className="font-semibold text-areia-100">{lote.feitor}</span>
                  </div>
                  <div className="rounded-lg bg-floresta-900/60 p-3 space-y-1">
                    <span className="text-areia-400 block text-[10px] font-light">Origem</span>
                    <span className="font-semibold text-areia-100">{lote.origem}</span>
                  </div>
                  <div className="rounded-lg bg-floresta-900/60 p-3 space-y-1">
                    <span className="text-areia-400 block text-[10px] font-light">
                      Perfil de Alcaloides
                    </span>
                    <span className="font-mono text-amber-300">{lote.laudo}</span>
                  </div>
                  <div className="rounded-lg bg-floresta-900/60 p-3 space-y-1">
                    <span className="text-areia-400 block text-[10px] font-light">
                      Laudo Microbiológico
                    </span>
                    <span className="font-semibold text-emerald-400">
                      {lote.microbiologico}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONTEÚDO DA ABA 4: LOGÍSTICA & RASTREAMENTO */}
      {activeTab === "LOGISTICA" && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h3 className="font-serif text-xl font-bold text-areia-100">
              Cadeia de Transporte & Rastreamento Isotérmico
            </h3>
            <p className="text-xs text-areia-400 font-light">
              Monitoramento dos lotes enviados de Serra/ES até a sede dos templos homologados.
            </p>
          </div>

          <div className="space-y-4">
            {enviosLogistica.map((env) => (
              <div
                key={env.codigo}
                className="card-elevated rounded-2xl p-6 space-y-4 border-ambar-500/20 bg-floresta-950/90"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-ambar-500/15 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-floresta-900 border border-ambar-500/30 text-ambar-400">
                      <Truck className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-ambar-400">
                          {env.codigo}
                        </span>
                        <span className="text-[11px] text-areia-400 font-mono">
                          ({env.rastreio})
                        </span>
                      </div>
                      <h4 className="font-serif text-base font-bold text-areia-100">
                        {env.templo}
                      </h4>
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      env.status === "EM_TRANSITO_REFRIGERADO"
                        ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                        : env.status === "AGUARDANDO_DESPACHO"
                        ? "bg-amber-500/15 border-amber-500/30 text-amber-300"
                        : "bg-blue-500/15 border-blue-500/30 text-blue-300"
                    }`}
                  >
                    {env.status === "EM_TRANSITO_REFRIGERADO"
                      ? "Em Trânsito Refrigerado"
                      : env.status === "AGUARDANDO_DESPACHO"
                      ? "Aguardando Despacho"
                      : "Entregue e Consagrado"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-areia-300">
                  <div>
                    <span className="text-areia-400 block text-[10px] font-light">
                      Item & Sacramento
                    </span>
                    <strong className="text-areia-100">{env.item}</strong>
                  </div>
                  <div>
                    <span className="text-areia-400 block text-[10px] font-light">
                      Tipo de Acondicionamento
                    </span>
                    <span>{env.tipoEmbalagem}</span>
                  </div>
                  <div>
                    <span className="text-areia-400 block text-[10px] font-light">Previsão</span>
                    <span className="text-amber-300 font-medium">{env.previsao}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONTEÚDO DA ABA 5: TABELA EVOLUTIVA & COOPERATIVISMO */}
      {activeTab === "COOPERATIVISMO" && <PortalCooperativismo />}
    </div>
  );
};

"use client";

import React, { useState, useEffect } from "react";
import {
  Clock,
  CheckCircle2,
  Truck,
  AlertCircle,
  Copy,
  Check,
  RefreshCw,
  Send,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  PackageCheck,
  Repeat,
  FileText,
  Building2,
  Calendar,
  Sparkles,
  Award,
} from "lucide-react";
import { PedidoLiturgico, StatusPedido, ItemPedido } from "@/types/pedido";

interface AcompanhamentoPedidosProps {
  temploId: string;
  onRepetirPedido?: (pedido: { itens: ItemPedido[]; mensagemIntencao: string }) => void;
  onNovaSolicitacao?: () => void;
}

const ETAPAS_LITURGICAS: {
  status: StatusPedido[];
  label: string;
  descricao: string;
}[] = [
  {
    status: ["SOLICITADO"],
    label: "1. Solicitado",
    descricao: "Recebido no portal e aguardando verificação do Conselho",
  },
  {
    status: ["HOMOLOGADO_CONSELHO"],
    label: "2. Homologado",
    descricao: "Conformidade CONAD 01/2010 aprovada em ata",
  },
  {
    status: ["EM_FEITIO_ACRE"],
    label: "3. Feitio no Acre",
    descricao: "Batelada em preparo tradicional em Cruzeiro do Sul/AC",
  },
  {
    status: ["AGUARDANDO_DESPACHO", "EM_TRANSITO_REFRIGERADO"],
    label: "4. Despacho Refrigerado",
    descricao: "Transporte isotérmico selado com monitoramento",
  },
  {
    status: ["ENTREGUE_CONSAGRADO"],
    label: "5. Consagrado",
    descricao: "Recebido com sucesso pelo templo",
  },
];

function getEtapaAtualIndex(status: StatusPedido): number {
  if (status === "SOLICITADO") return 0;
  if (status === "HOMOLOGADO_CONSELHO") return 1;
  if (status === "EM_FEITIO_ACRE") return 2;
  if (status === "AGUARDANDO_DESPACHO" || status === "EM_TRANSITO_REFRIGERADO") return 3;
  if (status === "ENTREGUE_CONSAGRADO") return 4;
  return 0;
}

function getBadgeStatus(status: StatusPedido) {
  switch (status) {
    case "SOLICITADO":
      return {
        label: "Aguardando Análise Litúrgica",
        bg: "bg-amber-500/15 border-amber-500/30 text-amber-300",
        icon: Clock,
      };
    case "HOMOLOGADO_CONSELHO":
      return {
        label: "Homologado pelo Conselho",
        bg: "bg-blue-500/15 border-blue-500/30 text-blue-300",
        icon: CheckCircle2,
      };
    case "EM_FEITIO_ACRE":
      return {
        label: "Em Feitio no Acre (Cruzeiro do Sul)",
        bg: "bg-purple-500/15 border-purple-500/30 text-purple-300",
        icon: Sparkles,
      };
    case "AGUARDANDO_DESPACHO":
      return {
        label: "Em Preparo no Entreposto Serra/ES",
        bg: "bg-yellow-500/15 border-yellow-500/30 text-yellow-300",
        icon: PackageCheck,
      };
    case "EM_TRANSITO_REFRIGERADO":
      return {
        label: "Em Trânsito Refrigerado Ativo",
        bg: "bg-emerald-500/15 border-emerald-500/30 text-emerald-300",
        icon: Truck,
      };
    case "ENTREGUE_CONSAGRADO":
      return {
        label: "Entregue e Consagrado",
        bg: "bg-emerald-500/20 border-emerald-500/40 text-emerald-400",
        icon: Award,
      };
    case "CANCELADO_AJUSTE":
      return {
        label: "Ajuste Necessário",
        bg: "bg-red-500/15 border-red-500/30 text-red-300",
        icon: AlertCircle,
      };
    default:
      return {
        label: status,
        bg: "bg-areia-500/15 border-areia-500/30 text-areia-300",
        icon: Clock,
      };
  }
}

export const AcompanhamentoPedidos: React.FC<AcompanhamentoPedidosProps> = ({
  temploId,
  onRepetirPedido,
  onNovaSolicitacao,
}) => {
  const [pedidos, setPedidos] = useState<PedidoLiturgico[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<"TODOS" | "ATIVOS" | "CONCLUIDOS">("TODOS");
  const [expandidoId, setExpandidoId] = useState<string | null>(null);
  const [copiadoId, setCopiadoId] = useState<string | null>(null);

  const carregarPedidos = async () => {
    try {
      setCarregando(true);
      setErro("");
      const res = await fetch(`/api/pedidos?temploId=${encodeURIComponent(temploId)}`);
      const data = await res.json();

      if (!res.ok || !data.sucesso) {
        throw new Error(data.erro || "Falha ao carregar pedidos.");
      }

      setPedidos(data.pedidos || []);
      // Expande o primeiro pedido ativo automaticamente se houver
      if (data.pedidos && data.pedidos.length > 0 && !expandidoId) {
        setExpandidoId(data.pedidos[0].id);
      }
    } catch (err: unknown) {
      setErro(err instanceof Error ? err.message : "Erro de conexão ao carregar solicitações.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarPedidos();
  }, [temploId]);

  const handleCopiarProtocolo = (protocolo: string) => {
    navigator.clipboard.writeText(protocolo);
    setCopiadoId(protocolo);
    setTimeout(() => setCopiadoId(null), 2000);
  };

  const pedidosFiltrados = pedidos.filter((p) => {
    if (filtroStatus === "ATIVOS") {
      return p.status !== "ENTREGUE_CONSAGRADO" && p.status !== "CANCELADO_AJUSTE";
    }
    if (filtroStatus === "CONCLUIDOS") {
      return p.status === "ENTREGUE_CONSAGRADO";
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Cabeçalho da Lista e Ações */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-areia-100">
            Acompanhamento & Cadeia de Custódia Litúrgica
          </h3>
          <p className="text-xs text-areia-400 font-light mt-1">
            Linha do tempo e rastreabilidade em tempo real das cotas homologadas para o templo.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={carregarPedidos}
            disabled={carregando}
            className="p-2.5 rounded-xl border border-ambar-500/30 bg-floresta-900/60 hover:bg-floresta-800 text-areia-300 text-xs inline-flex items-center gap-1.5 transition-colors"
            title="Atualizar solicitações"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${carregando ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Atualizar</span>
          </button>

          {onNovaSolicitacao && (
            <button
              type="button"
              onClick={onNovaSolicitacao}
              className="btn-primary py-2.5 px-4 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 shadow-md"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Nova Solicitação</span>
            </button>
          )}
        </div>
      </div>

      {/* Filtros rápidos de visualização */}
      <div className="flex items-center gap-2 border-b border-ambar-500/15 pb-3">
        <button
          type="button"
          onClick={() => setFiltroStatus("TODOS")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
            filtroStatus === "TODOS"
              ? "bg-ambar-500 text-floresta-950 font-bold shadow-sm"
              : "text-areia-400 hover:text-areia-100 bg-floresta-950/40"
          }`}
        >
          Todas ({pedidos.length})
        </button>
        <button
          type="button"
          onClick={() => setFiltroStatus("ATIVOS")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
            filtroStatus === "ATIVOS"
              ? "bg-ambar-500 text-floresta-950 font-bold shadow-sm"
              : "text-areia-400 hover:text-areia-100 bg-floresta-950/40"
          }`}
        >
          Em Andamento (
          {
            pedidos.filter(
              (p) => p.status !== "ENTREGUE_CONSAGRADO" && p.status !== "CANCELADO_AJUSTE"
            ).length
          }
          )
        </button>
        <button
          type="button"
          onClick={() => setFiltroStatus("CONCLUIDOS")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
            filtroStatus === "CONCLUIDOS"
              ? "bg-ambar-500 text-floresta-950 font-bold shadow-sm"
              : "text-areia-400 hover:text-areia-100 bg-floresta-950/40"
          }`}
        >
          Consagradas ({pedidos.filter((p) => p.status === "ENTREGUE_CONSAGRADO").length})
        </button>
      </div>

      {erro && (
        <div className="rounded-xl border border-red-500/40 bg-red-950/40 p-4 text-xs text-red-300 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
          <span>{erro}</span>
        </div>
      )}

      {carregando && pedidos.length === 0 ? (
        <div className="card-elevated rounded-2xl p-12 text-center space-y-3 border-ambar-500/20">
          <div className="h-8 w-8 rounded-full border-2 border-ambar-400 border-t-transparent animate-spin mx-auto" />
          <p className="text-xs text-areia-400 font-light">
            Consultando cadeia de custódia e histórico litúrgico...
          </p>
        </div>
      ) : pedidosFiltrados.length === 0 ? (
        <div className="card-elevated rounded-2xl p-12 text-center space-y-4 border-dashed border-ambar-500/30">
          <PackageCheck className="h-10 w-10 text-ambar-400/60 mx-auto" />
          <div>
            <h4 className="font-serif text-base font-bold text-areia-100">
              Nenhuma solicitação encontrada
            </h4>
            <p className="text-xs text-areia-400 font-light mt-1 max-w-md mx-auto">
              Sua congregação ainda não possui solicitações registradas nesta categoria.
            </p>
          </div>
          {onNovaSolicitacao && (
            <button
              type="button"
              onClick={onNovaSolicitacao}
              className="btn-primary py-2.5 px-5 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              <span>Registrar Primeira Solicitação</span>
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {pedidosFiltrados.map((pedido) => {
            const badge = getBadgeStatus(pedido.status);
            const BadgeIcon = badge.icon;
            const etapaAtual = getEtapaAtualIndex(pedido.status);
            const isExpandido = expandidoId === pedido.id;

            return (
              <div
                key={pedido.id}
                className="card-elevated rounded-2xl border-ambar-500/25 bg-floresta-950/90 overflow-hidden transition-all duration-300"
              >
                {/* Cabeçalho do Card da Solicitação */}
                <div
                  onClick={() => setExpandidoId(isExpandido ? null : pedido.id)}
                  className="p-5 sm:p-6 cursor-pointer hover:bg-floresta-900/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 select-none"
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className="h-10 w-10 rounded-xl bg-floresta-900 border border-ambar-500/30 flex items-center justify-center text-ambar-400 flex-shrink-0">
                      <BadgeIcon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-amber-300">
                          {pedido.id}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold border ${badge.bg}`}
                        >
                          {badge.label}
                        </span>
                      </div>
                      <h4 className="font-serif text-base font-bold text-areia-100">
                        {pedido.itens.map((i) => `${i.quantidade} ${i.unidade} de ${i.nome}`).join(", ")}
                      </h4>
                      <p className="text-[11px] text-areia-400 font-light flex items-center gap-3">
                        <span>
                          Criado em {new Date(pedido.criadoEm).toLocaleDateString("pt-BR")}
                        </span>
                        <span>•</span>
                        <span>Cerimônia: {pedido.dataCerimoniaPretendida}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 border-ambar-500/10 pt-3 md:pt-0">
                    <div className="text-left md:text-right">
                      <span className="text-[10px] text-areia-400 block font-light">Rateio Estimado</span>
                      <strong className="font-mono text-sm text-areia-100">
                        R$ {pedido.rateioTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </strong>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopiarProtocolo(pedido.id);
                        }}
                        className="p-2 rounded-lg border border-ambar-500/20 bg-floresta-900/80 hover:bg-floresta-800 text-areia-300 hover:text-areia-100 transition-colors"
                        title="Copiar Protocolo"
                      >
                        {copiadoId === pedido.id ? (
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>

                      <div className="p-2 text-areia-400">
                        {isExpandido ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Linha do Tempo Visual das 5 Etapas (Stepper) */}
                <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-2 border-t border-ambar-500/10 bg-floresta-900/20">
                  <div className="flex overflow-x-auto sm:grid sm:grid-cols-5 gap-2 pt-2 touch-scroll-x pb-1 sm:pb-0">
                    {ETAPAS_LITURGICAS.map((etapa, idx) => {
                      const concluida = idx < etapaAtual;
                      const atual = idx === etapaAtual;
                      return (
                        <div
                          key={etapa.label}
                          className={`p-2.5 rounded-xl border text-left space-y-1 transition-all min-w-[135px] sm:min-w-0 shrink-0 sm:shrink ${
                            atual
                              ? "border-amber-500/60 bg-ambar-500/10 shadow-sm"
                              : concluida
                              ? "border-emerald-500/30 bg-emerald-950/20 text-emerald-300"
                              : "border-pedra-800/40 bg-floresta-950/40 opacity-40"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold">
                              {concluida ? "✓ Concluído" : atual ? "● Em Andamento" : "○ Previsto"}
                            </span>
                          </div>
                          <strong className="block text-[11px] font-serif font-bold text-areia-100">
                            {etapa.label}
                          </strong>
                          <p className="text-[9px] text-areia-400 font-light line-clamp-1">
                            {etapa.descricao}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Detalhes Expansíveis */}
                {isExpandido && (
                  <div className="p-5 sm:p-8 space-y-6 border-t border-ambar-500/15 bg-floresta-950/95 animate-fade-in">
                    {/* Linha de Dados de Lote & Rastreio */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-3.5 rounded-xl border border-ambar-500/20 bg-floresta-900/60 space-y-1">
                        <span className="text-areia-400 block text-[10px] font-light">
                          Lote Vinculado no Acre
                        </span>
                        <strong className="font-mono text-amber-300">
                          {pedido.loteVinculado ? `Lote #${pedido.loteVinculado}` : "Em alocação pelo Feitor"}
                        </strong>
                      </div>

                      <div className="p-3.5 rounded-xl border border-ambar-500/20 bg-floresta-900/60 space-y-1">
                        <span className="text-areia-400 block text-[10px] font-light">
                          Código de Rastreio Refrigerado
                        </span>
                        <strong className="font-mono text-emerald-400">
                          {pedido.codigoRastreio || "Aguardando expedição Serra/ES"}
                        </strong>
                      </div>

                      <div className="p-3.5 rounded-xl border border-ambar-500/20 bg-floresta-900/60 space-y-1">
                        <span className="text-areia-400 block text-[10px] font-light">
                          Previsão de Chegada
                        </span>
                        <strong className="text-areia-100">
                          {pedido.previsaoEntrega || "Calculada após despacho"}
                        </strong>
                      </div>
                    </div>

                    {/* Mensagem e Intenção Cadastrada */}
                    <div className="p-4 rounded-xl border border-ambar-500/20 bg-floresta-900/40 space-y-1.5">
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                        Mensagem & Intenção Espiritual Registrada:
                      </span>
                      <p className="text-xs text-areia-300 font-light italic leading-relaxed">
                        &ldquo;{pedido.mensagemIntencao}&rdquo;
                      </p>
                    </div>

                    {/* Histórico e Auditoria de Status */}
                    {pedido.historico && pedido.historico.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-[11px] font-semibold text-areia-300 uppercase tracking-wider block">
                          Histórico de Auditoria & Cadeia de Custódia:
                        </span>
                        <div className="space-y-2">
                          {pedido.historico.map((h, i) => (
                            <div
                              key={i}
                              className="p-3 rounded-lg bg-floresta-900/40 border border-ambar-500/10 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1"
                            >
                              <div className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                                <span className="text-areia-200 font-medium">{h.observacao}</span>
                              </div>
                              <div className="text-[11px] text-areia-400 flex items-center gap-2 self-start sm:self-auto">
                                <span>{h.responsavel}</span>
                                <span>•</span>
                                <span className="font-mono">{h.dataHora}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Ações do Pedido */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-ambar-500/15">
                      <div className="flex flex-wrap items-center gap-2">
                        {onRepetirPedido && (
                          <button
                            type="button"
                            onClick={() =>
                              onRepetirPedido({
                                itens: pedido.itens,
                                mensagemIntencao: pedido.mensagemIntencao,
                              })
                            }
                            className="py-2 px-3.5 rounded-xl border border-ambar-500/30 bg-floresta-900 hover:bg-floresta-800 text-xs text-amber-300 font-medium inline-flex items-center gap-1.5 transition-colors"
                            title="Preencher nova solicitação com os mesmos sacramentos"
                          >
                            <Repeat className="h-3.5 w-3.5" />
                            <span>Repetir Solicitação (Re-order)</span>
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`https://wa.me/5568999979104?text=${encodeURIComponent(
                            `Olá Conselho Nativaram, gostaria de consultar o andamento da solicitação ${pedido.id} do ${pedido.temploNome}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary py-2 px-4 text-xs font-semibold inline-flex items-center gap-1.5"
                        >
                          <Send className="h-3.5 w-3.5 text-emerald-400" />
                          <span>Falar no WhatsApp</span>
                          <ExternalLink className="h-3 w-3 opacity-70" />
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  Search,
  Filter,
  RefreshCw,
  Clock,
  CheckCircle2,
  Truck,
  Sparkles,
  Award,
  AlertCircle,
  PackageCheck,
  Send,
  ExternalLink,
  Edit,
  Save,
  X,
  Droplets,
  Building2,
  ChevronRight,
  Layers,
} from "lucide-react";
import { PedidoLiturgico, StatusPedido, MetricasPedidos } from "@/types/pedido";

const STATUS_OPCOES: { valor: StatusPedido; label: string }[] = [
  { valor: "SOLICITADO", label: "Aguardando Análise do Conselho" },
  { valor: "HOMOLOGADO_CONSELHO", label: "Homologado pelo Conselho" },
  { valor: "EM_FEITIO_ACRE", label: "Em Feitio no Acre (Cruzeiro do Sul)" },
  { valor: "AGUARDANDO_DESPACHO", label: "Acondicionamento Serra/ES" },
  { valor: "EM_TRANSITO_REFRIGERADO", label: "Em Trânsito Refrigerado" },
  { valor: "ENTREGUE_CONSAGRADO", label: "Entregue e Consagrado" },
  { valor: "CANCELADO_AJUSTE", label: "Ajuste Necessário" },
];

export const AdminGestaoPedidos: React.FC = () => {
  const [pedidos, setPedidos] = useState<PedidoLiturgico[]>([]);
  const [metricas, setMetricas] = useState<MetricasPedidos | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<StatusPedido | "TODOS">("TODOS");

  // Modal de edição de pedido
  const [pedidoEditando, setPedidoEditando] = useState<PedidoLiturgico | null>(null);
  const [novoStatus, setNovoStatus] = useState<StatusPedido>("SOLICITADO");
  const [loteVinculado, setLoteVinculado] = useState("");
  const [codigoRastreio, setCodigoRastreio] = useState("");
  const [previsaoEntrega, setPrevisaoEntrega] = useState("");
  const [observacaoConselho, setObservacaoConselho] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [notificacaoWhatsAppUrl, setNotificacaoWhatsAppUrl] = useState<string | null>(null);

  const carregarDados = async () => {
    try {
      setCarregando(true);
      setErro("");
      const res = await fetch("/api/pedidos?metricas=true");
      const data = await res.json();

      if (!res.ok || !data.sucesso) {
        throw new Error(data.erro || "Falha ao consultar banco de dados.");
      }

      setPedidos(data.pedidos || []);
      setMetricas(data.metricas || null);
    } catch (err: unknown) {
      setErro(err instanceof Error ? err.message : "Erro ao conectar com a API de pedidos.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const abrirModalEdicao = (pedido: PedidoLiturgico) => {
    setPedidoEditando(pedido);
    setNovoStatus(pedido.status);
    setLoteVinculado(pedido.loteVinculado || "");
    setCodigoRastreio(pedido.codigoRastreio || "");
    setPrevisaoEntrega(pedido.previsaoEntrega || "");
    setObservacaoConselho("");
    setNotificacaoWhatsAppUrl(null);
  };

  const fecharModalEdicao = () => {
    setPedidoEditando(null);
    setNotificacaoWhatsAppUrl(null);
  };

  const handleSalvarEdicao = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pedidoEditando) return;

    setSalvando(true);
    try {
      const payload = {
        status: novoStatus,
        loteVinculado: loteVinculado.trim() || undefined,
        codigoRastreio: codigoRastreio.trim() || undefined,
        previsaoEntrega: previsaoEntrega.trim() || undefined,
        observacoesInternas: observacaoConselho.trim() || undefined,
        observacaoHistorico:
          observacaoConselho.trim() ||
          `Atualização litúrgica do Conselho para o status: ${novoStatus}`,
        responsavel: "Conselho Gestor Litúrgico",
      };

      const res = await fetch(`/api/pedidos/${pedidoEditando.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.sucesso) {
        throw new Error(data.erro || "Falha ao atualizar pedido.");
      }

      // Atualiza estado local
      setPedidos((prev) =>
        prev.map((p) => (p.id === pedidoEditando.id ? data.pedido : p))
      );
      setPedidoEditando(data.pedido);

      if (data.whatsappNotificacaoUrl) {
        setNotificacaoWhatsAppUrl(data.whatsappNotificacaoUrl);
      }

      await carregarDados();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Erro ao salvar alterações.");
    } finally {
      setSalvando(false);
    }
  };

  const pedidosFiltrados = pedidos.filter((p) => {
    const matchStatus = filtroStatus === "TODOS" || p.status === filtroStatus;
    const matchBusca =
      p.id.toLowerCase().includes(busca.toLowerCase()) ||
      p.temploNome.toLowerCase().includes(busca.toLowerCase()) ||
      p.dirigenteNome.toLowerCase().includes(busca.toLowerCase()) ||
      p.cidade.toLowerCase().includes(busca.toLowerCase()) ||
      (p.codigoRastreio && p.codigoRastreio.toLowerCase().includes(busca.toLowerCase()));
    return matchStatus && matchBusca;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 1. CARDS DE MÉTRICAS EM TEMPO REAL */}
      {metricas && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card-elevated rounded-2xl p-5 border-ambar-500/20 bg-floresta-950/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-areia-400 uppercase tracking-wider">
                Volume Programado
              </span>
              <Droplets className="h-4 w-4 text-amber-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-areia-100">
                {metricas.litrosTotaisProgramados}
              </span>
              <span className="text-xs text-amber-300 font-medium">Litros / kg</span>
            </div>
            <p className="text-[11px] text-areia-400 font-light">
              Biomassa Tucunacá em fluxo cooperativo
            </p>
          </div>

          <div className="card-elevated rounded-2xl p-5 border-amber-500/20 bg-floresta-950/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                Pendentes de Análise
              </span>
              <Clock className="h-4 w-4 text-amber-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-amber-300">
                {metricas.solicitacoesPendentes}
              </span>
              <span className="text-xs text-areia-400 font-light">aguardando</span>
            </div>
            <p className="text-[11px] text-areia-400 font-light">
              Triagem de ata e credenciamento CONAD
            </p>
          </div>

          <div className="card-elevated rounded-2xl p-5 border-emerald-500/20 bg-floresta-950/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                Em Trânsito Ativo
              </span>
              <Truck className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-emerald-400">
                {metricas.emTransitoRefrigerado}
              </span>
              <span className="text-xs text-areia-400 font-light">lotes</span>
            </div>
            <p className="text-[11px] text-areia-400 font-light">
              Rota refrigerada de Serra/ES aos templos
            </p>
          </div>

          <div className="card-elevated rounded-2xl p-5 border-ambar-500/20 bg-floresta-950/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-areia-400 uppercase tracking-wider">
                Total de Solicitações
              </span>
              <Award className="h-4 w-4 text-ambar-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-areia-100">
                {metricas.totalSolicitacoes}
              </span>
              <span className="text-xs text-areia-400 font-light">histórico</span>
            </div>
            <p className="text-[11px] text-areia-400 font-light">
              {metricas.entreguesConsagrados} sacramentos já consagrados
            </p>
          </div>
        </div>
      )}

      {/* 2. BARRA DE CONTROLE: BUSCA E FILTROS */}
      <div className="card-elevated rounded-2xl p-6 space-y-4 border-ambar-500/20 bg-floresta-950/90">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-xl font-bold text-areia-100">
              Gestão Central de Solicitações de Partilha Litúrgica
            </h3>
            <p className="text-xs text-areia-400 font-light">
              Homologação, vinculação de lotes no Acre, códigos de rastreio e notificação para dirigentes.
            </p>
          </div>

          <button
            type="button"
            onClick={carregarDados}
            disabled={carregando}
            className="p-2.5 rounded-xl border border-ambar-500/30 bg-floresta-900/60 hover:bg-floresta-800 text-areia-300 text-xs inline-flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            title="Recarregar solicitações"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${carregando ? "animate-spin" : ""}`} />
            <span>Atualizar Tabela</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-areia-400" />
            <input
              type="text"
              placeholder="Buscar por protocolo, templo, dirigente, cidade ou rastreio..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full rounded-xl border border-ambar-500/20 bg-floresta-900/60 pl-10 pr-4 py-2.5 text-xs text-areia-100 placeholder-areia-400 focus:border-ambar-400 focus:outline-none"
            />
          </div>

          <div>
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value as StatusPedido | "TODOS")}
              className="w-full rounded-xl border border-ambar-500/20 bg-floresta-900/60 px-3.5 py-2.5 text-xs text-areia-100 focus:border-ambar-400 focus:outline-none"
            >
              <option value="TODOS">Todos os Status</option>
              {STATUS_OPCOES.map((opt) => (
                <option key={opt.valor} value={opt.valor}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {erro && (
        <div className="rounded-xl border border-red-500/40 bg-red-950/40 p-4 text-xs text-red-300 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
          <span>{erro}</span>
        </div>
      )}

      {/* 3. TABELA DE SOLICITAÇÕES */}
      <div className="card-elevated rounded-2xl overflow-hidden border-ambar-500/20 bg-floresta-950/90">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-areia-300">
            <thead className="bg-floresta-900/90 text-[11px] uppercase tracking-wider text-areia-400 border-b border-ambar-500/15">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Protocolo</th>
                <th className="py-3.5 px-4 font-semibold">Templo / Cidade</th>
                <th className="py-3.5 px-4 font-semibold">Dirigente / Contato</th>
                <th className="py-3.5 px-4 font-semibold">Sacramento(s)</th>
                <th className="py-3.5 px-4 font-semibold">Rateio Total</th>
                <th className="py-3.5 px-4 font-semibold">Status Atual</th>
                <th className="py-3.5 px-4 font-semibold text-right">Ações Litúrgicas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ambar-500/10">
              {carregando && pedidos.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-areia-400">
                    <div className="h-6 w-6 rounded-full border-2 border-ambar-400 border-t-transparent animate-spin mx-auto mb-2" />
                    Carregando base de dados cooperativa...
                  </td>
                </tr>
              ) : pedidosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-areia-400">
                    Nenhuma solicitação encontrada com os filtros atuais.
                  </td>
                </tr>
              ) : (
                pedidosFiltrados.map((pedido) => (
                  <tr key={pedido.id} className="hover:bg-floresta-900/40 transition-colors">
                    <td className="py-4 px-4 font-mono font-bold text-amber-300 whitespace-nowrap">
                      {pedido.id}
                      <span className="block text-[10px] text-areia-400 font-light font-sans">
                        {new Date(pedido.criadoEm).toLocaleDateString("pt-BR")}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <strong className="font-serif text-areia-100 block font-bold">
                        {pedido.temploNome}
                      </strong>
                      <span className="text-[10px] text-areia-400 font-light">
                        {pedido.cidade} / {pedido.estado} • {pedido.temploId}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <span className="text-areia-200 block font-medium">
                        {pedido.dirigenteNome}
                      </span>
                      <span className="text-[10px] text-areia-400 font-mono">
                        {pedido.dirigenteTelefone}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <div className="space-y-0.5">
                        {pedido.itens.map((it, idx) => (
                          <span key={idx} className="block text-areia-200">
                            • {it.quantidade} {it.unidade} de <strong>{it.nome}</strong>
                          </span>
                        ))}
                      </div>
                      {pedido.loteVinculado && (
                        <span className="inline-block mt-1 font-mono text-[10px] text-amber-400">
                          Lote #{pedido.loteVinculado}
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-4 font-mono font-bold text-areia-100 whitespace-nowrap">
                      R$ {pedido.rateioTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold border ${
                          pedido.status === "EM_TRANSITO_REFRIGERADO"
                            ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                            : pedido.status === "ENTREGUE_CONSAGRADO"
                            ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                            : pedido.status === "HOMOLOGADO_CONSELHO"
                            ? "bg-blue-500/15 border-blue-500/30 text-blue-300"
                            : pedido.status === "EM_FEITIO_ACRE"
                            ? "bg-purple-500/15 border-purple-500/30 text-purple-300"
                            : "bg-amber-500/15 border-amber-500/30 text-amber-300"
                        }`}
                      >
                        {STATUS_OPCOES.find((s) => s.valor === pedido.status)?.label || pedido.status}
                      </span>
                      {pedido.codigoRastreio && (
                        <span className="block font-mono text-[9px] text-areia-400 mt-0.5">
                          {pedido.codigoRastreio}
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => abrirModalEdicao(pedido)}
                          className="py-1.5 px-3 rounded-lg border border-ambar-500/30 bg-floresta-900 hover:bg-floresta-800 text-amber-300 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                        >
                          <Edit className="h-3 w-3" />
                          <span>Gerenciar</span>
                        </button>

                        <a
                          href={`https://wa.me/${pedido.dirigenteTelefone.replace(/\D/g, "")}?text=${encodeURIComponent(
                            `Olá ${pedido.dirigenteNome} (${pedido.temploNome}), Conselho Gestor Nativaram entrando em contato sobre a solicitação ${pedido.id}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg border border-emerald-500/30 bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 transition-colors"
                          title="Falar no WhatsApp do Dirigente"
                        >
                          <Send className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. MODAL DE EDIÇÃO & NOTIFICAÇÃO LITÚRGICA */}
      {pedidoEditando && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-floresta-950/80 backdrop-blur-sm animate-fade-in">
          <div className="card-elevated rounded-2xl w-full max-w-2xl p-6 sm:p-8 space-y-6 border-ambar-500/40 bg-floresta-950 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-ambar-500/15 pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-amber-400">
                  Gerenciar Solicitação #{pedidoEditando.id}
                </span>
                <h3 className="font-serif text-xl font-bold text-areia-100 mt-0.5">
                  {pedidoEditando.temploNome}
                </h3>
                <p className="text-xs text-areia-400 font-light">
                  Dirigente: {pedidoEditando.dirigenteNome} • {pedidoEditando.cidade}/{pedidoEditando.estado}
                </p>
              </div>

              <button
                type="button"
                onClick={fecharModalEdicao}
                className="p-1.5 rounded-lg text-areia-400 hover:text-areia-100 hover:bg-floresta-900 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Resumo dos Itens e Mensagem do Dirigente */}
            <div className="p-4 rounded-xl bg-floresta-900/60 border border-ambar-500/15 space-y-2 text-xs">
              <span className="text-[10px] font-bold text-areia-400 uppercase tracking-wider block">
                Itens da Cota Solicitada:
              </span>
              <div className="space-y-1">
                {pedidoEditando.itens.map((it, idx) => (
                  <div key={idx} className="flex items-center justify-between text-areia-200">
                    <span>
                      • {it.quantidade} {it.unidade} de {it.nome} ({it.codigoOuSubtitulo})
                    </span>
                    <span className="font-mono text-amber-300">
                      R$ {it.rateioTotalEstimado.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-ambar-500/10">
                <span className="text-[10px] text-areia-400 block font-light">Mensagem do Templo:</span>
                <p className="italic text-areia-300 mt-0.5 font-light">
                  &ldquo;{pedidoEditando.mensagemIntencao}&rdquo;
                </p>
              </div>
            </div>

            {/* Formulário de Atualização */}
            <form onSubmit={handleSalvarEdicao} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-areia-200 block">Novo Status Litúrgico *</label>
                  <select
                    value={novoStatus}
                    onChange={(e) => setNovoStatus(e.target.value as StatusPedido)}
                    className="w-full rounded-xl border border-ambar-500/30 bg-floresta-900/90 p-3 text-xs text-areia-100 focus:border-ambar-400 focus:outline-none"
                  >
                    {STATUS_OPCOES.map((opt) => (
                      <option key={opt.valor} value={opt.valor}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-areia-200 block">Lote Vinculado no Acre</label>
                  <input
                    type="text"
                    placeholder="Ex: AC-2026-08"
                    value={loteVinculado}
                    onChange={(e) => setLoteVinculado(e.target.value)}
                    className="w-full rounded-xl border border-ambar-500/30 bg-floresta-900/90 p-3 text-xs text-areia-100 focus:border-ambar-400 focus:outline-none font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-areia-200 block">Código de Rastreio Refrigerado</label>
                  <input
                    type="text"
                    placeholder="Ex: NTV-SP-842-BR"
                    value={codigoRastreio}
                    onChange={(e) => setCodigoRastreio(e.target.value)}
                    className="w-full rounded-xl border border-ambar-500/30 bg-floresta-900/90 p-3 text-xs text-areia-100 focus:border-ambar-400 focus:outline-none font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-areia-200 block">Previsão de Chegada</label>
                  <input
                    type="text"
                    placeholder="Ex: Chegada em 48h (Aéreo)"
                    value={previsaoEntrega}
                    onChange={(e) => setPrevisaoEntrega(e.target.value)}
                    className="w-full rounded-xl border border-ambar-500/30 bg-floresta-900/90 p-3 text-xs text-areia-100 focus:border-ambar-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-areia-200 block">
                  Observações do Conselho Gestor / Histórico
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: Lote homologado em ata. Acondicionado em caixa selada #08-A..."
                  value={observacaoConselho}
                  onChange={(e) => setObservacaoConselho(e.target.value)}
                  className="w-full rounded-xl border border-ambar-500/30 bg-floresta-900/90 p-3 text-xs text-areia-100 focus:border-ambar-400 focus:outline-none"
                />
              </div>

              {/* Botões do Modal */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-ambar-500/15">
                <button
                  type="submit"
                  disabled={salvando}
                  className="btn-primary w-full sm:w-auto px-6 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  {salvando ? (
                    <span>Salvando Atualização...</span>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Salvar Alterações</span>
                    </>
                  )}
                </button>

                {notificacaoWhatsAppUrl && (
                  <a
                    href={notificacaoWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-full sm:w-auto px-5 py-3 text-xs font-semibold inline-flex items-center justify-center gap-2 text-emerald-300 border-emerald-500/40 animate-pulse"
                  >
                    <Send className="h-4 w-4 text-emerald-400" />
                    <span>Disparar Atualização p/ Dirigente no WhatsApp</span>
                    <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                  </a>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

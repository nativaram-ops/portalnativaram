"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Send,
  CheckCircle2,
  Calendar,
  Building2,
  MessageSquare,
  AlertCircle,
  Plus,
  Minus,
  Trash2,
  Copy,
  Check,
  ArrowRight,
  ExternalLink,
  Droplets,
  Award,
  Layers,
} from "lucide-react";
import { GRADUACOES_SACRAMENTAIS } from "@/data/graduacoes";
import { RAPES_TRADICIONAIS } from "@/data/sacramentos";
import { ItemPedido } from "@/types/pedido";

interface TemploAutenticado {
  id: string;
  nome: string;
  cidade: string;
  dirigente: string;
  cnpj: string;
  graduacao?: string;
}

interface FormSolicitacaoPedidoProps {
  templo: TemploAutenticado;
  onPedidoCriado?: (pedidoId: string) => void;
  onIrParaAcompanhamento?: () => void;
  pedidoParaRepetir?: {
    itens: ItemPedido[];
    mensagemIntencao: string;
  } | null;
}

// Opções de sacramentos rápidos para catálogo interativo
const ITENS_CATALOGO = [
  ...GRADUACOES_SACRAMENTAIS.map((g) => ({
    id: g.id,
    tipo: "GRADUACAO_AYAHUASCA" as const,
    nome: `${g.codigo} ${g.nomeSagrado}`,
    codigoOuSubtitulo: g.arquetipo,
    unidade: "Litros" as const,
    rateioUnitario: g.codigo === "10.1" ? 260 : g.codigo === "7.1" ? 230 : 200,
    quantidadePadrao: 10,
    minimo: 5,
    passo: 5,
  })),
  {
    id: "MEDICINA_MEL",
    tipo: "GRADUACAO_AYAHUASCA" as const,
    nome: "Alquimia Sagrada Mel (Alta Redução)",
    codigoOuSubtitulo: "Densidade máxima sem aditivos",
    unidade: "kg" as const,
    rateioUnitario: 480,
    quantidadePadrao: 5,
    minimo: 2,
    passo: 1,
  },
  ...RAPES_TRADICIONAIS.slice(0, 4).map((r) => ({
    id: r.id,
    tipo: "RAPE_SAGRADO" as const,
    nome: r.nome,
    codigoOuSubtitulo: r.propositoTradicional.slice(0, 45) + "...",
    unidade: "Frascos (20g)" as const,
    rateioUnitario: 65,
    quantidadePadrao: 2,
    minimo: 1,
    passo: 1,
  })),
  {
    id: "KURIPE_TRADICIONAL",
    tipo: "ARTEFATO_SAGRADO" as const,
    nome: "Kuripe Artesanal de Bambu & Resina",
    codigoOuSubtitulo: "Aplicador individual sagrado",
    unidade: "Unidades" as const,
    rateioUnitario: 85,
    quantidadePadrao: 1,
    minimo: 1,
    passo: 1,
  },
];

export const FormSolicitacaoPedido: React.FC<FormSolicitacaoPedidoProps> = ({
  templo,
  onPedidoCriado,
  onIrParaAcompanhamento,
  pedidoParaRepetir,
}) => {
  // Itens selecionados no formulário
  const [itensSelecionados, setItensSelecionados] = useState<
    {
      id: string;
      tipo: "GRADUACAO_AYAHUASCA" | "RAPE_SAGRADO" | "ARTEFATO_SAGRADO";
      nome: string;
      codigoOuSubtitulo: string;
      quantidade: number;
      unidade: "Litros" | "Frascos (20g)" | "Unidades" | "kg";
      rateioUnitarioEstimado: number;
    }[]
  >(() => {
    if (pedidoParaRepetir?.itens && pedidoParaRepetir.itens.length > 0) {
      return pedidoParaRepetir.itens.map((it) => ({
        id: it.id,
        tipo: it.tipo,
        nome: it.nome,
        codigoOuSubtitulo: it.codigoOuSubtitulo,
        quantidade: it.quantidade,
        unidade: it.unidade,
        rateioUnitarioEstimado: it.rateioUnitarioEstimado,
      }));
    }
    // Item padrão inicial compatível com o templo
    return [
      {
        id: "10.1_WIRAPURU",
        tipo: "GRADUACAO_AYAHUASCA",
        nome: "10.1 Wirapuru",
        codigoOuSubtitulo: "Pureza Tucunacá & Chacrona Rainha",
        quantidade: 10,
        unidade: "Litros",
        rateioUnitarioEstimado: 260,
      },
    ];
  });

  // Campos de contato e intenção
  const [dirigenteNome, setDirigenteNome] = useState(templo.dirigente || "");
  const [dirigenteTelefone, setDirigenteTelefone] = useState("11987654321");
  const [dirigenteEmail, setDirigenteEmail] = useState("dirigente@templo.org.br");
  const [dataCerimonia, setDataCerimonia] = useState(() => {
    // Sugere data com 35 dias de antecedência (respeitando os 30 dias mínimos)
    const d = new Date();
    d.setDate(d.getDate() + 35);
    return d.toISOString().split("T")[0];
  });
  const [mensagemIntencao, setMensagemIntencao] = useState(
    pedidoParaRepetir?.mensagemIntencao ||
      "Trabalho litúrgico regular de alinhamento e renovação dos votos espirituais da congregação. Agradecemos a dedicação dos irmãos feitores no Acre."
  );

  // Estados de submissão
  const [enviando, setEnviando] = useState(false);
  const [erroMsg, setErroMsg] = useState("");
  const [sucessoData, setSucessoData] = useState<{
    protocolo: string;
    whatsappUrl: string;
  } | null>(null);
  const [copiado, setCopiado] = useState(false);

  // Cálculo do total de rateio
  const rateioTotal = itensSelecionados.reduce(
    (acc, item) => acc + item.quantidade * item.rateioUnitarioEstimado,
    0
  );

  // Adicionar ou incrementar item do catálogo
  const handleAdicionarItem = (itemCat: (typeof ITENS_CATALOGO)[0]) => {
    setItensSelecionados((prev) => {
      const index = prev.findIndex((i) => i.id === itemCat.id);
      if (index >= 0) {
        return prev.map((item, idx) =>
          idx === index
            ? { ...item, quantidade: item.quantidade + itemCat.passo }
            : item
        );
      }
      return [
        ...prev,
        {
          id: itemCat.id,
          tipo: itemCat.tipo,
          nome: itemCat.nome,
          codigoOuSubtitulo: itemCat.codigoOuSubtitulo,
          quantidade: itemCat.quantidadePadrao,
          unidade: itemCat.unidade,
          rateioUnitarioEstimado: itemCat.rateioUnitario,
        },
      ];
    });
  };

  const handleAlterarQuantidade = (id: string, delta: number) => {
    setItensSelecionados((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const novaQtd = item.quantidade + delta;
            return novaQtd > 0 ? { ...item, quantidade: novaQtd } : null;
          }
          return item;
        })
        .filter(Boolean) as typeof prev
    );
  };

  const handleRemoverItem = (id: string) => {
    setItensSelecionados((prev) => prev.filter((i) => i.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErroMsg("");

    if (itensSelecionados.length === 0) {
      setErroMsg("Adicione ao menos um sacramento para registrar a solicitação.");
      return;
    }

    if (!mensagemIntencao.trim() || mensagemIntencao.trim().length < 5) {
      setErroMsg("Por favor, preencha a área de mensagem com a intenção do trabalho litúrgico.");
      return;
    }

    setEnviando(true);

    try {
      const payload = {
        temploId: templo.id,
        temploNome: templo.nome,
        cidade: templo.cidade.split("/")[0]?.trim() || templo.cidade,
        estado: templo.cidade.split("/")[1]?.trim() || "SP",
        dirigenteNome,
        dirigenteTelefone,
        dirigenteEmail,
        cnpj: templo.cnpj,
        itens: itensSelecionados,
        dataCerimoniaPretendida: dataCerimonia,
        mensagemIntencao,
      };

      const res = await fetch("/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.sucesso) {
        throw new Error(data.erro || "Não foi possível registrar a solicitação.");
      }

      setSucessoData({
        protocolo: data.pedido.id,
        whatsappUrl: data.whatsappUrl,
      });

      if (onPedidoCriado) {
        onPedidoCriado(data.pedido.id);
      }

      // Abre automaticamente o WhatsApp com os dados pré-preenchidos
      window.open(data.whatsappUrl, "_blank", "noopener,noreferrer");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro desconhecido ao processar pedido.";
      setErroMsg(msg);
    } finally {
      setEnviando(false);
    }
  };

  const handleCopiarProtocolo = (protocolo: string) => {
    navigator.clipboard.writeText(protocolo);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  };

  // Se já concluiu a solicitação com sucesso
  if (sucessoData) {
    return (
      <div className="card-elevated rounded-2xl p-6 sm:p-10 border-emerald-500/40 bg-gradient-to-b from-floresta-950 via-floresta-900 to-floresta-950 space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mx-auto shadow-inner">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-emerald-400">
              Solicitação Gravada no Banco de Dados
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-areia-100 mt-1">
              Partilha Litúrgica Protocolada com Sucesso
            </h3>
            <p className="text-xs sm:text-sm text-areia-300 font-light max-w-xl mx-auto mt-2">
              Sua solicitação foi registrada no sistema seguro da cooperativa e a mensagem de apoio litúrgico foi gerada para envio direto ao WhatsApp do Conselho.
            </p>
          </div>
        </div>

        {/* Card do Protocolo */}
        <div className="mx-auto max-w-md rounded-xl border border-ambar-500/30 bg-floresta-950/80 p-5 space-y-3 text-center">
          <span className="text-[11px] text-areia-400 uppercase tracking-wider font-mono">
            Protocolo Litúrgico Oficial
          </span>
          <div className="flex items-center justify-center gap-3">
            <span className="font-mono text-2xl font-bold text-ambar-300">
              {sucessoData.protocolo}
            </span>
            <button
              type="button"
              onClick={() => handleCopiarProtocolo(sucessoData.protocolo)}
              className="p-2 rounded-lg border border-ambar-500/30 bg-floresta-900 hover:bg-floresta-800 text-ambar-400 transition-colors"
              title="Copiar Protocolo"
            >
              {copiado ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
          <p className="text-[11px] text-areia-400 font-light">
            Guarde este número para conferência na cadeia de custódia e laudos no Acre.
          </p>
        </div>

        {/* Botões de Ação Imediata */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <a
            href={sucessoData.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full sm:w-auto px-6 py-3.5 text-xs uppercase font-bold tracking-wider inline-flex items-center justify-center gap-2"
          >
            <Send className="h-4 w-4" />
            <span>Reabrir WhatsApp do Conselho</span>
            <ExternalLink className="h-3.5 w-3.5 opacity-70" />
          </a>

          {onIrParaAcompanhamento && (
            <button
              type="button"
              onClick={onIrParaAcompanhamento}
              className="btn-secondary w-full sm:w-auto px-6 py-3.5 text-xs uppercase font-semibold tracking-wider inline-flex items-center justify-center gap-2"
            >
              <span>Acompanhar Status da Solicitação</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}

          <button
            type="button"
            onClick={() => setSucessoData(null)}
            className="rounded-xl border border-pedra-700/60 bg-pedra-900/40 hover:bg-pedra-800 text-areia-300 text-xs px-5 py-3.5 transition-colors"
          >
            Nova Solicitação
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* 1. SELEÇÃO DE SACRAMENTOS & ALQUIMIAS */}
      <div className="card-elevated rounded-2xl p-6 sm:p-8 space-y-6 border-ambar-500/25">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-ambar-500/15 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-ambar-400" />
              <h3 className="font-serif text-lg sm:text-xl font-bold text-areia-100">
                1. Seleção de Sacramentos & Alquimias Sagradas
              </h3>
            </div>
            <p className="text-xs text-areia-400 font-light mt-1">
              Escolha as graduações de Ayahuasca (Tucunacá e Chacrona colhida com rezo), rapés sagrados e artefatos.
            </p>
          </div>
          <span className="text-[11px] font-mono text-ambar-400/90 font-medium self-start sm:self-auto bg-ambar-500/10 px-2.5 py-1 rounded-full border border-ambar-500/20">
            {itensSelecionados.length} item(ns) na cota
          </span>
        </div>

        {/* Itens já escolhidos na cota */}
        {itensSelecionados.length > 0 ? (
          <div className="space-y-3">
            {itensSelecionados.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-ambar-500/20 bg-floresta-950/80 hover:border-ambar-500/40 transition-colors"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-areia-100 font-serif">
                      {item.nome}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-ambar-500/15 text-amber-300 border border-ambar-500/20">
                      {item.unidade}
                    </span>
                  </div>
                  <p className="text-[11px] text-areia-400 font-light">
                    {item.codigoOuSubtitulo} • Rateio est.: R${" "}
                    {item.rateioUnitarioEstimado.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}{" "}
                    / {item.unidade}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  {/* Seletor de Quantidade */}
                  <div className="flex items-center gap-2 rounded-lg border border-ambar-500/30 bg-floresta-900/90 p-1">
                    <button
                      type="button"
                      onClick={() => handleAlterarQuantidade(item.id, -1)}
                      className="h-7 w-7 rounded flex items-center justify-center text-areia-300 hover:bg-floresta-800 hover:text-areia-100 transition-colors"
                      title="Diminuir"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-12 text-center font-mono text-sm font-bold text-ambar-300">
                      {item.quantidade}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleAlterarQuantidade(item.id, 1)}
                      className="h-7 w-7 rounded flex items-center justify-center text-areia-300 hover:bg-floresta-800 hover:text-areia-100 transition-colors"
                      title="Aumentar"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="text-right min-w-[110px]">
                    <span className="text-[10px] text-areia-400 block font-light">Subtotal Cota</span>
                    <strong className="font-mono text-sm text-areia-100">
                      R${" "}
                      {(item.quantidade * item.rateioUnitarioEstimado).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </strong>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoverItem(item.id)}
                    className="p-1.5 text-red-400/70 hover:text-red-300 hover:bg-red-950/40 rounded-lg transition-colors"
                    title="Remover item da cota"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-ambar-500/30 p-6 text-center text-xs text-areia-400">
            Nenhum sacramento selecionado. Clique abaixo para incluir itens na sua cota litúrgica.
          </div>
        )}

        {/* Catálogo Rápido de Inclusão */}
        <div className="space-y-3 pt-2">
          <span className="text-[11px] font-semibold text-areia-300 uppercase tracking-wider block">
            Adicionar Alquimias & Sacramentos da Floresta:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ITENS_CATALOGO.map((cat) => {
              const jaTem = itensSelecionados.some((i) => i.id === cat.id);
              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => handleAdicionarItem(cat)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 group ${
                    jaTem
                      ? "border-amber-500/40 bg-floresta-900/60"
                      : "border-ambar-500/15 bg-floresta-950/60 hover:bg-floresta-900/70 hover:border-ambar-500/30"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-xs font-bold text-areia-100 group-hover:text-ambar-300 transition-colors">
                        {cat.nome}
                      </span>
                      <span className="text-[10px] text-ambar-400 font-mono">
                        R$ {cat.rateioUnitario}/{cat.unidade.split(" ")[0]}
                      </span>
                    </div>
                    <p className="text-[10px] text-areia-400 font-light mt-0.5 line-clamp-1">
                      {cat.codigoOuSubtitulo}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-areia-400 pt-1 border-t border-ambar-500/10">
                    <span>{jaTem ? "✓ Na cota (clique p/ +)" : "+ Incluir cota"}</span>
                    <Plus className="h-3 w-3 text-amber-400" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. DATA CERIMONIAL & ANTECEDÊNCIA LITÚRGICA */}
      <div className="card-elevated rounded-2xl p-6 sm:p-8 space-y-5 border-ambar-500/25">
        <div className="flex items-center gap-2 border-b border-ambar-500/15 pb-4">
          <Calendar className="h-4 w-4 text-ambar-400" />
          <h3 className="font-serif text-lg sm:text-xl font-bold text-areia-100">
            2. Planejamento & Data Cerimonial Pretendida
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-areia-200 block">
              Data Prevista do Rito / Próxima Cerimônia *
            </label>
            <input
              type="date"
              required
              value={dataCerimonia}
              onChange={(e) => setDataCerimonia(e.target.value)}
              className="w-full rounded-xl border border-ambar-500/30 bg-floresta-950/80 px-4 py-3 text-xs text-areia-100 focus:border-ambar-400 focus:outline-none"
            />
            <p className="text-[11px] text-areia-400 font-light">
              Mínimo recomendado: 30 dias de antecedência para sincronia com as bateladas da lua no Acre.
            </p>
          </div>

          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
              <Award className="h-4 w-4" />
              <span>Cadeia de Custódia Refrigerada</span>
            </div>
            <p className="text-[11px] text-areia-300 font-light leading-relaxed">
              Os sacramentos concentrados viajam por rota aérea em caixas isotérmicas seladas com monitoramento térmico desde Serra/ES até o templo credenciado.
            </p>
          </div>
        </div>
      </div>

      {/* 3. ÁREA DE PREENCHIMENTO DE MENSAGEM & INTENÇÃO */}
      <div className="card-elevated rounded-2xl p-6 sm:p-8 space-y-5 border-ambar-500/25">
        <div className="flex items-center gap-2 border-b border-ambar-500/15 pb-4">
          <MessageSquare className="h-4 w-4 text-amber-400" />
          <h3 className="font-serif text-lg sm:text-xl font-bold text-areia-100">
            3. Mensagem Fraterna, Intenção Litúrgica & Ponto de Entrega
          </h3>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-areia-200 block">
            Área de Preenchimento de Mensagem & Recomendações ao Conselho *
          </label>
          <textarea
            required
            rows={4}
            value={mensagemIntencao}
            onChange={(e) => setMensagemIntencao(e.target.value)}
            placeholder="Descreva o propósito do trabalho, a quantidade estimada de comungantes, instruções específicas para o recebimento da caixa isotérmica ou rezo para o feitio..."
            className="w-full rounded-xl border border-ambar-500/30 bg-floresta-950/80 p-4 text-xs text-areia-100 placeholder-areia-500 focus:border-ambar-400 focus:outline-none leading-relaxed resize-y min-h-[110px]"
          />
          <span className="text-[11px] text-areia-400 font-light block">
            Esta mensagem será gravada no histórico da congregação e transmitida integralmente ao Conselho Guardião.
          </span>
        </div>
      </div>

      {/* 4. CONFIRMAÇÃO DE DADOS & WHATSAPP PARA NOTIFICAÇÕES */}
      <div className="card-elevated rounded-2xl p-6 sm:p-8 space-y-5 border-ambar-500/25">
        <div className="flex items-center gap-2 border-b border-ambar-500/15 pb-4">
          <Building2 className="h-4 w-4 text-ambar-400" />
          <h3 className="font-serif text-lg sm:text-xl font-bold text-areia-100">
            4. Dados da Congregação & WhatsApp Cadastrado
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="space-y-1">
            <label className="text-areia-400 block text-[11px] font-light">Templo Credenciado</label>
            <div className="p-3 rounded-lg bg-floresta-950/80 border border-ambar-500/15 font-semibold text-areia-100">
              {templo.nome} ({templo.id})
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-areia-400 block text-[11px] font-light">Dirigente Responsável</label>
            <input
              type="text"
              required
              value={dirigenteNome}
              onChange={(e) => setDirigenteNome(e.target.value)}
              className="w-full rounded-lg border border-ambar-500/30 bg-floresta-950/80 p-3 text-xs text-areia-100 focus:border-ambar-400 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-areia-400 block text-[11px] font-light">WhatsApp p/ Rastreio & Notificação *</label>
            <input
              type="text"
              required
              value={dirigenteTelefone}
              onChange={(e) => setDirigenteTelefone(e.target.value)}
              placeholder="Ex: 11987654321"
              className="w-full rounded-lg border border-ambar-500/30 bg-floresta-950/80 p-3 text-xs text-areia-100 focus:border-ambar-400 focus:outline-none font-mono"
            />
          </div>
        </div>
      </div>

      {/* RESUMO DO RATEIO & BOTÃO DE DISPARO */}
      <div className="rounded-2xl border border-ambar-500/30 bg-gradient-to-r from-floresta-950 via-floresta-900 to-floresta-950 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
        <div>
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
            Rateio Cooperativo Litúrgico Estimado
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-mono text-3xl font-bold text-areia-100">
              R$ {rateioTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
            <span className="text-xs text-areia-400 font-light">
              (Apoio logístico, insumos florestais e acondicionamento)
            </span>
          </div>
          <p className="text-[11px] text-areia-400 font-light mt-1">
            Sem cobrança de lucro ou margem mercantil (Art. 1º da Resolução CONAD nº 01/2010).
          </p>
        </div>

        <button
          type="submit"
          disabled={enviando || itensSelecionados.length === 0}
          className="btn-primary px-8 py-4 text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2.5 disabled:opacity-50 whitespace-nowrap shadow-lg shadow-amber-900/30"
        >
          {enviando ? (
            <>
              <span className="h-4 w-4 rounded-full border-2 border-floresta-950 border-t-transparent animate-spin" />
              <span>Gravando no Banco de Dados...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>Protocolar & Enviar p/ WhatsApp</span>
            </>
          )}
        </button>
      </div>

      {erroMsg && (
        <div className="rounded-xl border border-red-500/40 bg-red-950/40 p-4 text-xs text-red-300 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
          <span>{erroMsg}</span>
        </div>
      )}
    </form>
  );
};

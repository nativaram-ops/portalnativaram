"use client";

import React, { useState, useEffect } from "react";
import {
  Building2,
  Users,
  ShieldCheck,
  CheckCircle2,
  Clock,
  KeyRound,
  Copy,
  ExternalLink,
  MessageCircle,
  Search,
  RefreshCw,
  Sparkles,
  Phone,
  MapPin,
  Check,
  AlertCircle,
  PlusCircle,
  Edit3,
  X,
} from "lucide-react";
import { SolicitacaoAcesso } from "@/lib/db/homologacoes";

const LOCAL_STORAGE_KEY = "nativaram_solicitacoes_local";

const SOLICITACAO_REC_OLYY_FALLBACK: SolicitacaoAcesso = {
  id: "REC-2026-OLYY",
  tipo: "GRUPO_INFORMAL",
  nomeEntidade: "Grupo em Desenvolvimento (Protocolo REC-2026-OLYY)",
  nomeResponsavel: "Guardião / Dirigente Solicitante",
  telefone: "",
  email: "",
  cidade: "Em Homologação",
  estado: "BR",
  linhagem: "Tradição Ayahuasqueira / Estudo Livre",
  graduacao: "3.1 Mainumbi",
  volumeEstimado: "3 a 5 Litros",
  intencao:
    "Solicitação de Reconhecimento e Acolhimento de Grupo Informal recebida via protocolo REC-2026-OLYY sob amparo da Resolução CONAD 01/2010.",
  status: "PENDENTE_LIBERACAO",
  dataEnvio: "29/10/2026, 15:40",
};

function mesclarSolicitacoesCliente(
  remotas: SolicitacaoAcesso[],
  locais: SolicitacaoAcesso[]
): SolicitacaoAcesso[] {
  const mapa = new Map<string, SolicitacaoAcesso>();

  // Garante presença do protocolo REC-2026-OLYY caso servidor estivesse em cache antigo
  mapa.set(SOLICITACAO_REC_OLYY_FALLBACK.id, SOLICITACAO_REC_OLYY_FALLBACK);

  for (const item of [...remotas, ...locais]) {
    if (!item || !item.id) continue;
    const chave = item.id.trim().toUpperCase();
    const existente = mapa.get(chave);
    if (!existente) {
      mapa.set(chave, { ...item, id: chave });
    } else {
      const priorizarItem =
        item.status === "HOMOLOGADO" ||
        (existente.status !== "HOMOLOGADO" && Boolean(item.nomeEntidade));
      if (priorizarItem) {
        mapa.set(chave, {
          ...existente,
          ...item,
          id: chave,
          loginGerado: item.loginGerado || existente.loginGerado,
          senhaGerada: item.senhaGerada || existente.senhaGerada,
          dataHomologacao: item.dataHomologacao || existente.dataHomologacao,
        });
      }
    }
  }

  return Array.from(mapa.values()).sort((a, b) => {
    if (a.status === "PENDENTE_LIBERACAO" && b.status !== "PENDENTE_LIBERACAO") return -1;
    if (a.status !== "PENDENTE_LIBERACAO" && b.status === "PENDENTE_LIBERACAO") return 1;
    return 0;
  });
}

export const AdminGestaoHomologacoes: React.FC = () => {
  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoAcesso[]>([]);
  const [loading, setLoading] = useState(true);
  const [homologandoId, setHomologandoId] = useState<string | null>(null);
  const [filtroStatus, setFiltroStatus] = useState<
    "TODOS" | "PENDENTE_LIBERACAO" | "HOMOLOGADO"
  >("TODOS");
  const [filtroTipo, setFiltroTipo] = useState<
    "TODOS" | "INSTITUICAO_FORMAL" | "GRUPO_INFORMAL"
  >("TODOS");
  const [busca, setBusca] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [ultimoWhatsAppUrl, setUltimoWhatsAppUrl] = useState<{
    [id: string]: string;
  }>({});

  // Edição rápida de um protocolo existente (ex: preencher nome/WhatsApp do REC-2026-OLYY)
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [formEdicao, setFormEdicao] = useState<{
    nomeEntidade: string;
    nomeResponsavel: string;
    telefone: string;
    cidade: string;
    estado: string;
    linhagem: string;
    graduacao: string;
    volumeEstimado: string;
  }>({
    nomeEntidade: "",
    nomeResponsavel: "",
    telefone: "",
    cidade: "",
    estado: "",
    linhagem: "",
    graduacao: "",
    volumeEstimado: "",
  });

  // Modal/Painel para cadastrar protocolo recebido via WhatsApp
  const [mostrarFormManual, setMostrarFormManual] = useState(false);
  const [novoProtocolo, setNovoProtocolo] = useState({
    id: "",
    tipo: "GRUPO_INFORMAL" as "GRUPO_INFORMAL" | "INSTITUICAO_FORMAL",
    nomeEntidade: "",
    nomeResponsavel: "",
    telefone: "",
    email: "",
    cidade: "",
    estado: "SP",
    linhagem: "Tradição Ayahuasqueira / Estudo Livre",
    graduacao: "3.1 Mainumbi",
    volumeEstimado: "5 Litros",
    intencao: "Solicitação de acolhimento recebida via protocolo oficial no WhatsApp.",
  });

  const lerCacheLocal = (): SolicitacaoAcesso[] => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const salvarCacheLocal = (lista: SolicitacaoAcesso[]) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(lista));
    } catch {
      // Ignora erro de quota
    }
  };

  const carregarSolicitacoes = async () => {
    setLoading(true);
    const locais = lerCacheLocal();
    try {
      const res = await fetch("/api/solicitacoes", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        const mescladas = mesclarSolicitacoesCliente(
          json.solicitacoes || [],
          locais
        );
        setSolicitacoes(mescladas);
        salvarCacheLocal(mescladas);
      } else {
        setSolicitacoes(mesclarSolicitacoesCliente([], locais));
      }
    } catch (err) {
      console.warn("Aviso ao carregar solicitações:", err);
      setSolicitacoes(mesclarSolicitacoesCliente([], locais));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarSolicitacoes();
  }, []);

  const iniciarEdicao = (sol: SolicitacaoAcesso) => {
    setEditandoId(sol.id);
    setFormEdicao({
      nomeEntidade: sol.nomeEntidade,
      nomeResponsavel: sol.nomeResponsavel,
      telefone: sol.telefone || "",
      cidade: sol.cidade || "",
      estado: sol.estado || "BR",
      linhagem: sol.linhagem || "",
      graduacao: sol.graduacao || "3.1 Mainumbi",
      volumeEstimado: sol.volumeEstimado || "5 Litros",
    });
  };

  const salvarEdicaoCard = async (id: string) => {
    const alvo = solicitacoes.find((s) => s.id === id);
    if (!alvo) return;

    const atualizado: SolicitacaoAcesso = {
      ...alvo,
      ...formEdicao,
    };

    const novaLista = solicitacoes.map((s) => (s.id === id ? atualizado : s));
    setSolicitacoes(novaLista);
    salvarCacheLocal(novaLista);
    setEditandoId(null);

    try {
      await fetch("/api/solicitacoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(atualizado),
      });
    } catch {
      // Salvo localmente com sucesso
    }
  };

  const handleHomologar = async (
    id: string,
    dadosExtras?: Partial<SolicitacaoAcesso>
  ) => {
    setHomologandoId(id);
    const payloadComplementar =
      dadosExtras || (editandoId === id ? formEdicao : undefined);

    try {
      const res = await fetch(`/api/solicitacoes/${encodeURIComponent(id)}/homologar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadComplementar || {}),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.solicitacao) {
          setSolicitacoes((prev) => {
            const existe = prev.some((s) => s.id === json.solicitacao.id);
            const atualizadas = existe
              ? prev.map((s) => (s.id === id ? json.solicitacao : s))
              : [json.solicitacao, ...prev];
            salvarCacheLocal(atualizadas);
            return atualizadas;
          });
          if (json.whatsappUrl) {
            setUltimoWhatsAppUrl((prev) => ({
              ...prev,
              [json.solicitacao.id]: json.whatsappUrl,
            }));
          }
          setEditandoId(null);
          return;
        }
      }

      // Fallback local caso API serverless falhe
      const alvo = solicitacoes.find((s) => s.id === id);
      if (alvo) {
        const sufixo =
          id.split("-").pop() ||
          Math.random().toString(36).substring(2, 6).toUpperCase();
        const prefixo =
          alvo.tipo === "INSTITUICAO_FORMAL" ? "NAT-TEMPLO" : "NAT-GRP";
        const loginGerado = alvo.loginGerado || `${prefixo}-${sufixo}`;
        const senhaGerada =
          alvo.senhaGerada ||
          `Luz${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
        const atualizada: SolicitacaoAcesso = {
          ...alvo,
          ...(payloadComplementar || {}),
          status: "HOMOLOGADO",
          loginGerado,
          senhaGerada,
          dataHomologacao: new Date().toLocaleDateString("pt-BR"),
        };
        setSolicitacoes((prev) => {
          const nova = prev.map((s) => (s.id === id ? atualizada : s));
          salvarCacheLocal(nova);
          return nova;
        });
        setEditandoId(null);
      }
    } catch (err) {
      console.error("Erro ao homologar:", err);
    } finally {
      setHomologandoId(null);
    }
  };

  const handleRegistrarProtocoloManual = async (
    e: React.FormEvent,
    homologarDireto: boolean
  ) => {
    e.preventDefault();
    const codigoLimpo =
      novoProtocolo.id.trim().toUpperCase() ||
      `REC-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const novaSol: SolicitacaoAcesso = {
      id: codigoLimpo,
      tipo: novoProtocolo.tipo,
      nomeEntidade:
        novoProtocolo.nomeEntidade.trim() || `Grupo (${codigoLimpo})`,
      nomeResponsavel:
        novoProtocolo.nomeResponsavel.trim() || "Dirigente Responsável",
      telefone: novoProtocolo.telefone.trim(),
      email: novoProtocolo.email.trim(),
      cidade: novoProtocolo.cidade.trim() || "Brasil",
      estado: novoProtocolo.estado.trim().toUpperCase() || "BR",
      linhagem: novoProtocolo.linhagem,
      graduacao: novoProtocolo.graduacao,
      volumeEstimado: novoProtocolo.volumeEstimado,
      intencao: novoProtocolo.intencao,
      status: "PENDENTE_LIBERACAO",
      dataEnvio: new Date().toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    try {
      await fetch("/api/solicitacoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaSol),
      });
    } catch {
      // Continua com persistência híbrida
    }

    setSolicitacoes((prev) => {
      const semDuplicata = prev.filter((s) => s.id !== codigoLimpo);
      const atualizada = [novaSol, ...semDuplicata];
      salvarCacheLocal(atualizada);
      return atualizada;
    });

    setMostrarFormManual(false);
    setNovoProtocolo({
      id: "",
      tipo: "GRUPO_INFORMAL",
      nomeEntidade: "",
      nomeResponsavel: "",
      telefone: "",
      email: "",
      cidade: "",
      estado: "SP",
      linhagem: "Tradição Ayahuasqueira / Estudo Livre",
      graduacao: "3.1 Mainumbi",
      volumeEstimado: "5 Litros",
      intencao: "Solicitação de acolhimento recebida via protocolo oficial no WhatsApp.",
    });

    if (homologarDireto) {
      await handleHomologar(codigoLimpo, novaSol);
    }
  };

  const copyText = (texto: string, key: string) => {
    navigator.clipboard.writeText(texto);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const solicitacoesFiltradas = solicitacoes.filter((s) => {
    const matchStatus = filtroStatus === "TODOS" || s.status === filtroStatus;
    const matchTipo = filtroTipo === "TODOS" || s.tipo === filtroTipo;
    const termo = busca.toLowerCase();
    const matchBusca =
      !termo ||
      s.id.toLowerCase().includes(termo) ||
      s.nomeEntidade.toLowerCase().includes(termo) ||
      s.nomeResponsavel.toLowerCase().includes(termo) ||
      s.cidade.toLowerCase().includes(termo) ||
      (s.loginGerado && s.loginGerado.toLowerCase().includes(termo));
    return matchStatus && matchTipo && matchBusca;
  });

  const total = solicitacoes.length;
  const pendentes = solicitacoes.filter(
    (s) => s.status === "PENDENTE_LIBERACAO"
  ).length;
  const homologadas = solicitacoes.filter(
    (s) => s.status === "HOMOLOGADO"
  ).length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Cabeçalho da Seção */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-ambar-500/20 pb-4">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-areia-100 flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-ambar-400" />
            <span>Homologações &amp; Acolhimento de Congregações</span>
          </h3>
          <p className="text-xs text-areia-400 font-light mt-1">
            Apreciação de credenciamentos institucionais e grupos em desenvolvimento com geração imediata de credenciais de acesso.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setMostrarFormManual((prev) => !prev)}
            className="btn-primary text-xs px-3.5 py-2 inline-flex items-center gap-2 rounded-xl font-bold shadow-solar"
            title="Cadastrar protocolo recebido via WhatsApp"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span>Cadastrar Protocolo (WhatsApp)</span>
          </button>

          <button
            onClick={carregarSolicitacoes}
            className="btn-secondary text-xs px-3.5 py-2 inline-flex items-center gap-2 rounded-xl"
            title="Recarregar solicitações"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Atualizar</span>
          </button>
        </div>
      </div>

      {/* Formulário Rápido para Protocolo Recebido via WhatsApp */}
      {mostrarFormManual && (
        <div className="card-elevated rounded-2xl p-6 border-2 border-ambar-500/40 bg-floresta-950/95 space-y-4 animate-fade-in">
          <div className="flex items-center justify-between border-b border-ambar-500/20 pb-3">
            <div>
              <h4 className="font-serif text-base sm:text-lg font-bold text-ambar-300 flex items-center gap-2">
                <KeyRound className="h-4 w-4 text-ambar-400" />
                <span>Homologar / Registrar Protocolo Recebido via WhatsApp</span>
              </h4>
              <p className="text-xs text-areia-400 font-light">
                Insira o código de protocolo enviado pelo dirigente (ex: <code className="text-ambar-300">REC-2026-OLYY</code>) e os dados básicos para liberar o acesso imediatamente.
              </p>
            </div>
            <button
              onClick={() => setMostrarFormManual(false)}
              className="p-1.5 rounded-lg text-areia-400 hover:text-areia-100 bg-floresta-900"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form
            onSubmit={(e) => handleRegistrarProtocoloManual(e, true)}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs"
          >
            <div>
              <label className="block text-[10px] font-mono uppercase text-ambar-300 mb-1">
                Código do Protocolo *
              </label>
              <input
                type="text"
                required
                value={novoProtocolo.id}
                onChange={(e) =>
                  setNovoProtocolo({ ...novoProtocolo, id: e.target.value.toUpperCase() })
                }
                placeholder="Ex: REC-2026-OLYY"
                className="w-full rounded-xl border border-ambar-500/30 bg-floresta-900 px-3 py-2 text-areia-100 font-mono uppercase focus:border-ambar-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase text-areia-400 mb-1">
                Modalidade
              </label>
              <select
                value={novoProtocolo.tipo}
                onChange={(e) =>
                  setNovoProtocolo({
                    ...novoProtocolo,
                    tipo: e.target.value as "GRUPO_INFORMAL" | "INSTITUICAO_FORMAL",
                  })
                }
                className="w-full rounded-xl border border-ambar-500/30 bg-floresta-900 px-3 py-2 text-areia-100 focus:border-ambar-400 focus:outline-none"
              >
                <option value="GRUPO_INFORMAL">🌿 Grupo Informal / Rezador</option>
                <option value="INSTITUICAO_FORMAL">🏛️ Instituição Formal (CNPJ)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase text-areia-400 mb-1">
                Nome do Grupo ou Templo *
              </label>
              <input
                type="text"
                required
                value={novoProtocolo.nomeEntidade}
                onChange={(e) =>
                  setNovoProtocolo({ ...novoProtocolo, nomeEntidade: e.target.value })
                }
                placeholder="Ex: Círculo de Oração Luz da Floresta"
                className="w-full rounded-xl border border-ambar-500/30 bg-floresta-900 px-3 py-2 text-areia-100 focus:border-ambar-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase text-areia-400 mb-1">
                Guardião / Dirigente Responsável *
              </label>
              <input
                type="text"
                required
                value={novoProtocolo.nomeResponsavel}
                onChange={(e) =>
                  setNovoProtocolo({ ...novoProtocolo, nomeResponsavel: e.target.value })
                }
                placeholder="Nome completo do responsável"
                className="w-full rounded-xl border border-ambar-500/30 bg-floresta-900 px-3 py-2 text-areia-100 focus:border-ambar-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase text-areia-400 mb-1">
                WhatsApp com DDD
              </label>
              <input
                type="text"
                value={novoProtocolo.telefone}
                onChange={(e) =>
                  setNovoProtocolo({ ...novoProtocolo, telefone: e.target.value })
                }
                placeholder="Ex: 11999998888"
                className="w-full rounded-xl border border-ambar-500/30 bg-floresta-900 px-3 py-2 text-areia-100 focus:border-ambar-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase text-areia-400 mb-1">
                Cidade / UF
              </label>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={novoProtocolo.cidade}
                  onChange={(e) =>
                    setNovoProtocolo({ ...novoProtocolo, cidade: e.target.value })
                  }
                  placeholder="Cidade"
                  className="w-2/3 rounded-xl border border-ambar-500/30 bg-floresta-900 px-3 py-2 text-areia-100 focus:border-ambar-400 focus:outline-none"
                />
                <input
                  type="text"
                  maxLength={2}
                  value={novoProtocolo.estado}
                  onChange={(e) =>
                    setNovoProtocolo({
                      ...novoProtocolo,
                      estado: e.target.value.toUpperCase(),
                    })
                  }
                  placeholder="UF"
                  className="w-1/3 rounded-xl border border-ambar-500/30 bg-floresta-900 px-2 py-2 text-center uppercase text-areia-100 focus:border-ambar-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase text-areia-400 mb-1">
                Graduação Pretendida
              </label>
              <input
                type="text"
                value={novoProtocolo.graduacao}
                onChange={(e) =>
                  setNovoProtocolo({ ...novoProtocolo, graduacao: e.target.value })
                }
                placeholder="Ex: 5.1 Pituã"
                className="w-full rounded-xl border border-ambar-500/30 bg-floresta-900 px-3 py-2 text-areia-100 focus:border-ambar-400 focus:outline-none"
              />
            </div>

            <div className="flex items-end gap-2">
              <button
                type="submit"
                className="btn-primary w-full py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 shadow-solar"
              >
                <Check className="h-4 w-4" />
                <span>Aprovar &amp; Gerar Login/Senha</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Cards de Métricas Superiores */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card-elevated rounded-2xl p-5 border-ambar-500/20 bg-floresta-950/90 space-y-2">
          <div className="flex items-center justify-between text-ambar-400 text-xs font-semibold uppercase tracking-wider">
            <span>Total de Cadastros</span>
            <Building2 className="h-4 w-4" />
          </div>
          <div className="text-3xl font-serif font-bold text-areia-100">{total}</div>
          <p className="text-[11px] text-areia-400 font-light">
            Instituições e núcleos registrados no portal
          </p>
        </div>

        <div className="card-elevated rounded-2xl p-5 border-amber-500/30 bg-amber-500/[0.06] space-y-2">
          <div className="flex items-center justify-between text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <span>Pendentes de Liberação</span>
            <Clock className="h-4 w-4 animate-pulse" />
          </div>
          <div className="text-3xl font-serif font-bold text-amber-300">
            {pendentes}
          </div>
          <p className="text-[11px] text-amber-200/80 font-light">
            Aguardando apreciação e geração de login/senha
          </p>
        </div>

        <div className="card-elevated rounded-2xl p-5 border-emerald-500/25 bg-emerald-500/[0.05] space-y-2">
          <div className="flex items-center justify-between text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <span>Acessos Liberados</span>
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div className="text-3xl font-serif font-bold text-emerald-300">
            {homologadas}
          </div>
          <p className="text-[11px] text-emerald-300/80 font-light">
            Congregações ativas com chave litúrgica válida
          </p>
        </div>
      </div>

      {/* Barra de Filtros e Busca */}
      <div className="card-elevated rounded-2xl p-4 border-ambar-500/20 bg-floresta-950/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
        {/* Filtro por Status */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-mono uppercase text-areia-400 mr-1">
            Status:
          </span>
          {[
            { id: "TODOS", label: "Todas" },
            { id: "PENDENTE_LIBERACAO", label: `Pendentes (${pendentes})` },
            { id: "HOMOLOGADO", label: "Homologadas" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFiltroStatus(f.id as any)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                filtroStatus === f.id
                  ? "bg-ambar-500 text-floresta-950 shadow-sm"
                  : "bg-floresta-900 text-areia-300 hover:bg-floresta-850"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Filtro por Tipo */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-mono uppercase text-areia-400 mr-1">
            Tipo:
          </span>
          {[
            { id: "TODOS", label: "Todos" },
            { id: "INSTITUICAO_FORMAL", label: "Instituições (CNPJ)" },
            { id: "GRUPO_INFORMAL", label: "Grupos / Rezadores" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setFiltroTipo(t.id as any)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                filtroTipo === t.id
                  ? "bg-ambar-500 text-floresta-950 shadow-sm"
                  : "bg-floresta-900 text-areia-300 hover:bg-floresta-850"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Campo de Busca */}
        <div className="relative min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-areia-400" />
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar protocolo (ex: REC-2026-OLYY), nome..."
            className="w-full rounded-xl border border-ambar-500/20 bg-floresta-900/90 pl-9 pr-3 py-1.5 text-xs text-areia-100 placeholder-areia-400/50 focus:border-ambar-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Lista de Solicitações */}
      {solicitacoesFiltradas.length === 0 ? (
        <div className="card-elevated rounded-2xl p-12 text-center space-y-3 border-ambar-500/20 bg-floresta-950/60">
          <AlertCircle className="h-8 w-8 text-ambar-400/60 mx-auto" />
          <h4 className="font-serif text-lg font-bold text-areia-100">
            Nenhuma solicitação encontrada
          </h4>
          <p className="text-xs text-areia-400 font-light max-w-md mx-auto">
            {busca || filtroStatus !== "TODOS" || filtroTipo !== "TODOS"
              ? "Tente ajustar os filtros ou o termo de busca pesquisado."
              : "Assim que um dirigente submeter uma ficha no portal, ela aparecerá aqui para liberação imediata."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {solicitacoesFiltradas.map((sol) => {
            const isPendente = sol.status === "PENDENTE_LIBERACAO";
            const isHomologado = sol.status === "HOMOLOGADO";
            const isFormal = sol.tipo === "INSTITUICAO_FORMAL";
            const isEditando = editandoId === sol.id;

            const telDigits = (sol.telefone || "").replace(/\D/g, "");
            const ddiPrefix = telDigits.startsWith("55") ? "" : "55";
            const msgPadrao = `🏛️ *COOPERATIVA NATIVARAM — ACESSO LITÚRGICO LIBERADO!*\n\nOlá, *${sol.nomeResponsavel}*!\nA solicitação para *${sol.nomeEntidade}* (Protocolo \`${sol.id}\`) foi devidamente apreciada e *HOMOLOGADA* pelo Conselho Gestor da Cooperativa Nativaram.\n\nSuas credenciais exclusivas para entrada no Portal do Dirigente foram geradas:\n🔑 *Código de Acesso (Login):* \`${sol.loginGerado}\`\n🔐 *Chave de Segurança (Senha):* \`${sol.senhaGerada}\`\n\n🌐 *Acesse o Portal:*\nhttps://nativaramcoop.eco.br/portal-dirigente\n\n_Que a luz e a memória da floresta abençoem seus trabalhos e sua congregação._`;

            const whatsappUrl =
              ultimoWhatsAppUrl[sol.id] ||
              (sol.loginGerado && sol.senhaGerada
                ? telDigits.length >= 10
                  ? `https://wa.me/${ddiPrefix}${telDigits}?text=${encodeURIComponent(msgPadrao)}`
                  : `https://wa.me/?text=${encodeURIComponent(msgPadrao)}`
                : "");

            return (
              <div
                key={sol.id}
                className={`card-elevated rounded-2xl p-6 border transition-all ${
                  isPendente
                    ? "border-amber-500/40 bg-floresta-950 shadow-solar"
                    : "border-ambar-500/20 bg-floresta-950/80"
                }`}
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-ambar-500/15 pb-4">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full border font-bold ${
                          isFormal
                            ? "bg-floresta-900 border-ambar-500/40 text-ambar-300"
                            : "bg-floresta-900 border-emerald-500/40 text-emerald-300"
                        }`}
                      >
                        {isFormal
                          ? "🏛️ Instituição Formal (CNPJ)"
                          : "🌿 Grupo em Desenvolvimento"}
                      </span>

                      <span className="font-mono text-xs text-areia-400">
                        Protocolo:{" "}
                        <strong className="text-ambar-300 font-bold">
                          {sol.id}
                        </strong>
                      </span>

                      <span className="text-[11px] text-areia-400 font-light">
                        • Enviado em {sol.dataEnvio}
                      </span>
                    </div>

                    <h4 className="font-serif text-lg sm:text-xl font-bold text-areia-100">
                      {sol.nomeEntidade}
                    </h4>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-areia-300 font-light">
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5 text-ambar-400" />
                        Dirigente:{" "}
                        <strong className="font-medium text-areia-100">
                          {sol.nomeResponsavel}
                        </strong>
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-ambar-400" />
                        {sol.cidade}/{sol.estado}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5 text-emerald-400" />
                        {sol.telefone || "WhatsApp pendente (selecione no envio)"}
                      </span>
                      {sol.cnpj && (
                        <span className="font-mono text-[11px] text-areia-400">
                          CNPJ: {sol.cnpj}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Status Badge + Botão Editar Dados */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        isEditando ? setEditandoId(null) : iniciarEdicao(sol)
                      }
                      className="px-3 py-1 rounded-full border border-ambar-500/30 bg-floresta-900 hover:bg-floresta-800 text-areia-200 text-[11px] font-medium inline-flex items-center gap-1.5 transition-colors"
                      title="Editar nome do grupo, dirigente ou WhatsApp"
                    >
                      <Edit3 className="h-3 w-3 text-ambar-400" />
                      <span>{isEditando ? "Fechar Edição" : "Editar / Completar Dados"}</span>
                    </button>

                    {isPendente ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-300 animate-pulse">
                        <Clock className="h-3.5 w-3.5" />
                        <span>Aguardando Liberação do Conselho</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-300">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Homologado • Acesso Ativo</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Bloco de Edição Inline (Para completar dados recebidos via WhatsApp antes/depois de homologar) */}
                {isEditando && (
                  <div className="my-4 p-4 rounded-xl border border-ambar-500/30 bg-floresta-900/90 space-y-3 text-xs animate-fade-in">
                    <div className="text-[11px] font-mono uppercase text-ambar-300 font-bold">
                      Atualizar Dados da Congregação ({sol.id})
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[10px] text-areia-400 mb-1">
                          Nome do Grupo / Templo
                        </label>
                        <input
                          type="text"
                          value={formEdicao.nomeEntidade}
                          onChange={(e) =>
                            setFormEdicao({
                              ...formEdicao,
                              nomeEntidade: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border border-ambar-500/30 bg-floresta-950 px-2.5 py-1.5 text-areia-100"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-areia-400 mb-1">
                          Guardião / Dirigente
                        </label>
                        <input
                          type="text"
                          value={formEdicao.nomeResponsavel}
                          onChange={(e) =>
                            setFormEdicao({
                              ...formEdicao,
                              nomeResponsavel: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border border-ambar-500/30 bg-floresta-950 px-2.5 py-1.5 text-areia-100"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-areia-400 mb-1">
                          WhatsApp (com DDD)
                        </label>
                        <input
                          type="text"
                          value={formEdicao.telefone}
                          onChange={(e) =>
                            setFormEdicao({
                              ...formEdicao,
                              telefone: e.target.value,
                            })
                          }
                          placeholder="Ex: 11999998888"
                          className="w-full rounded-lg border border-ambar-500/30 bg-floresta-950 px-2.5 py-1.5 text-areia-100"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-areia-400 mb-1">
                          Cidade / UF
                        </label>
                        <div className="flex gap-1.5">
                          <input
                            type="text"
                            value={formEdicao.cidade}
                            onChange={(e) =>
                              setFormEdicao({
                                ...formEdicao,
                                cidade: e.target.value,
                              })
                            }
                            className="w-2/3 rounded-lg border border-ambar-500/30 bg-floresta-950 px-2.5 py-1.5 text-areia-100"
                          />
                          <input
                            type="text"
                            maxLength={2}
                            value={formEdicao.estado}
                            onChange={(e) =>
                              setFormEdicao({
                                ...formEdicao,
                                estado: e.target.value.toUpperCase(),
                              })
                            }
                            className="w-1/3 rounded-lg border border-ambar-500/30 bg-floresta-950 px-2 py-1.5 text-center uppercase text-areia-100"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => salvarEdicaoCard(sol.id)}
                        className="btn-secondary px-3 py-1.5 rounded-lg text-xs font-semibold"
                      >
                        Salvar Dados
                      </button>
                      {isPendente && (
                        <button
                          type="button"
                          onClick={() => handleHomologar(sol.id, formEdicao)}
                          className="btn-primary px-4 py-1.5 rounded-lg text-xs font-bold"
                        >
                          Salvar &amp; Gerar Login/Senha Agora
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Detalhes Litúrgicos */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-4 text-xs">
                  <div className="rounded-xl bg-floresta-900/60 p-3 space-y-1 border border-ambar-500/10">
                    <span className="text-[10px] uppercase font-mono text-areia-400 block font-semibold">
                      Linhagem Espiritual
                    </span>
                    <span className="text-areia-200 font-medium">
                      {sol.linhagem}
                    </span>
                  </div>

                  <div className="rounded-xl bg-floresta-900/60 p-3 space-y-1 border border-ambar-500/10">
                    <span className="text-[10px] uppercase font-mono text-areia-400 block font-semibold">
                      Graduação e Partilha Pretendida
                    </span>
                    <span className="text-ambar-300 font-medium">
                      {sol.graduacao} • {sol.volumeEstimado}
                    </span>
                  </div>

                  <div className="rounded-xl bg-floresta-900/60 p-3 space-y-1 border border-ambar-500/10">
                    <span className="text-[10px] uppercase font-mono text-areia-400 block font-semibold">
                      Intenção dos Trabalhos
                    </span>
                    <span className="text-areia-300 font-light line-clamp-2">
                      &ldquo;{sol.intencao}&rdquo;
                    </span>
                  </div>
                </div>

                {/* Área de Credenciais e Ação de Homologação */}
                <div className="pt-3 border-t border-ambar-500/15 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  {/* Bloco de Login e Senha se já homologado */}
                  {isHomologado && sol.loginGerado ? (
                    <div className="flex flex-wrap items-center gap-3 text-xs bg-floresta-900/80 p-3 rounded-xl border border-ambar-500/20">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono uppercase text-areia-400">
                          Login:
                        </span>
                        <code className="font-mono font-bold text-ambar-300 bg-floresta-950 px-2 py-0.5 rounded border border-ambar-500/30">
                          {sol.loginGerado}
                        </code>
                        <button
                          onClick={() =>
                            copyText(sol.loginGerado!, `login-${sol.id}`)
                          }
                          className="p-1 text-areia-400 hover:text-ambar-400 transition-colors"
                          title="Copiar Login"
                        >
                          {copiedKey === `login-${sol.id}` ? (
                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>

                      {sol.senhaGerada && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono uppercase text-areia-400">
                            Senha:
                          </span>
                          <code className="font-mono font-bold text-amber-300 bg-floresta-950 px-2 py-0.5 rounded border border-amber-500/30">
                            {sol.senhaGerada}
                          </code>
                          <button
                            onClick={() =>
                              copyText(sol.senhaGerada!, `senha-${sol.id}`)
                            }
                            className="p-1 text-areia-400 hover:text-ambar-400 transition-colors"
                            title="Copiar Senha"
                          >
                            {copiedKey === `senha-${sol.id}` ? (
                              <Check className="h-3.5 w-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-xs text-amber-300/80 font-light flex items-center gap-1.5">
                      <KeyRound className="h-4 w-4 text-amber-400 flex-shrink-0" />
                      <span>
                        Clique ao lado para gerar o login e a senha exclusivos deste dirigente.
                      </span>
                    </div>
                  )}

                  {/* Botões de Ação */}
                  <div className="flex flex-wrap items-center gap-2.5 justify-end">
                    {isPendente && (
                      <button
                        onClick={() => handleHomologar(sol.id)}
                        disabled={homologandoId === sol.id}
                        className="btn-primary text-xs px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-solar disabled:opacity-50"
                      >
                        {homologandoId === sol.id ? (
                          <>
                            <Sparkles className="h-4 w-4 animate-spin" />
                            <span>Gerando Acesso...</span>
                          </>
                        ) : (
                          <>
                            <Check className="h-4 w-4" />
                            <span>Aceitar e Gerar Login/Senha</span>
                          </>
                        )}
                      </button>
                    )}

                    {whatsappUrl && (
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-4 rounded-xl border border-emerald-500/40 bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 text-xs font-bold inline-flex items-center gap-2 transition-colors shadow-sm"
                      >
                        <MessageCircle className="h-4 w-4 text-emerald-400" />
                        <span>Enviar Credenciais via WhatsApp</span>
                        <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

"use client";

import React, { useState, useEffect } from "react";
import {
  Building2,
  Users,
  Feather,
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
  Mail,
  MapPin,
  Flame,
  Check,
  AlertCircle,
} from "lucide-react";
import { SolicitacaoAcesso } from "@/lib/db/homologacoes";

export const AdminGestaoHomologacoes: React.FC = () => {
  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoAcesso[]>([]);
  const [loading, setLoading] = useState(true);
  const [homologandoId, setHomologandoId] = useState<string | null>(null);
  const [filtroStatus, setFiltroStatus] = useState<"TODOS" | "PENDENTE_LIBERACAO" | "HOMOLOGADO">("TODOS");
  const [filtroTipo, setFiltroTipo] = useState<"TODOS" | "INSTITUICAO_FORMAL" | "GRUPO_INFORMAL">("TODOS");
  const [busca, setBusca] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [ultimoWhatsAppUrl, setUltimoWhatsAppUrl] = useState<{ [id: string]: string }>({});

  const carregarSolicitacoes = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/solicitacoes");
      if (res.ok) {
        const json = await res.json();
        setSolicitacoes(json.solicitacoes || []);
      }
    } catch (err) {
      console.warn("Aviso ao carregar solicitações:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarSolicitacoes();
  }, []);

  const handleHomologar = async (id: string) => {
    setHomologandoId(id);
    try {
      const res = await fetch(`/api/solicitacoes/${id}/homologar`, {
        method: "POST",
      });

      if (res.ok) {
        const json = await res.json();
        if (json.solicitacao) {
          setSolicitacoes((prev) =>
            prev.map((s) => (s.id === id ? json.solicitacao : s))
          );
          if (json.whatsappUrl) {
            setUltimoWhatsAppUrl((prev) => ({ ...prev, [id]: json.whatsappUrl }));
          }
        }
      }
    } catch (err) {
      console.error("Erro ao homologar:", err);
    } finally {
      setHomologandoId(null);
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
  const pendentes = solicitacoes.filter((s) => s.status === "PENDENTE_LIBERACAO").length;
  const homologadas = solicitacoes.filter((s) => s.status === "HOMOLOGADO").length;

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

        <button
          onClick={carregarSolicitacoes}
          className="btn-secondary text-xs px-3.5 py-2 inline-flex items-center gap-2 rounded-xl"
          title="Recarregar solicitações"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Atualizar</span>
        </button>
      </div>

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
          <div className="text-3xl font-serif font-bold text-amber-300">{pendentes}</div>
          <p className="text-[11px] text-amber-200/80 font-light">
            Aguardando apreciação e geração de login/senha
          </p>
        </div>

        <div className="card-elevated rounded-2xl p-5 border-emerald-500/25 bg-emerald-500/[0.05] space-y-2">
          <div className="flex items-center justify-between text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <span>Acessos Liberados</span>
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div className="text-3xl font-serif font-bold text-emerald-300">{homologadas}</div>
          <p className="text-[11px] text-emerald-300/80 font-light">
            Congregações ativas com chave litúrgica válida
          </p>
        </div>
      </div>

      {/* Barra de Filtros e Busca */}
      <div className="card-elevated rounded-2xl p-4 border-ambar-500/20 bg-floresta-950/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
        {/* Filtro por Status */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-mono uppercase text-areia-400 mr-1">Status:</span>
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
          <span className="text-[11px] font-mono uppercase text-areia-400 mr-1">Tipo:</span>
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
            placeholder="Buscar por nome, dirigente ou login..."
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
            const whatsappUrl =
              ultimoWhatsAppUrl[sol.id] ||
              (sol.loginGerado && sol.senhaGerada
                ? `https://wa.me/55${sol.telefone.replace(/\D/g, "")}?text=${encodeURIComponent(
                    `🏛️ *COOPERATIVA NATIVARAM — ACESSO LITÚRGICO LIBERADO!*\n\nOlá, *${sol.nomeResponsavel}*! Sua solicitação para *${sol.nomeEntidade}* foi homologada.\n\nSeguem seus dados de acesso ao Portal do Dirigente:\n🔑 *Login:* \`${sol.loginGerado}\`\n🔐 *Senha:* \`${sol.senhaGerada}\`\n🌐 *Acesse:* https://nativaramcoop.eco.br/portal-dirigente\n\nSeja bem-vindo(a) à nossa rede de salvaguarda litúrgica!`
                  )}`
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
                        {isFormal ? "🏛️ Instituição Formal (CNPJ)" : "🌿 Grupo em Desenvolvimento"}
                      </span>

                      <span className="font-mono text-xs text-areia-400">
                        Protocolo: <strong className="text-areia-200">{sol.id}</strong>
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
                        Dirigente: <strong className="font-medium text-areia-100">{sol.nomeResponsavel}</strong>
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-ambar-400" />
                        {sol.cidade}/{sol.estado}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5 text-emerald-400" />
                        {sol.telefone}
                      </span>
                      {sol.cnpj && (
                        <span className="font-mono text-[11px] text-areia-400">
                          CNPJ: {sol.cnpj}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div>
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

                {/* Detalhes Litúrgicos */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-4 text-xs">
                  <div className="rounded-xl bg-floresta-900/60 p-3 space-y-1 border border-ambar-500/10">
                    <span className="text-[10px] uppercase font-mono text-areia-400 block font-semibold">
                      Linhagem Espiritual
                    </span>
                    <span className="text-areia-200 font-medium">{sol.linhagem}</span>
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
                        <span className="text-[10px] font-mono uppercase text-areia-400">Login:</span>
                        <code className="font-mono font-bold text-ambar-300 bg-floresta-950 px-2 py-0.5 rounded border border-ambar-500/30">
                          {sol.loginGerado}
                        </code>
                        <button
                          onClick={() => copyText(sol.loginGerado!, `login-${sol.id}`)}
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
                          <span className="text-[10px] font-mono uppercase text-areia-400">Senha:</span>
                          <code className="font-mono font-bold text-amber-300 bg-floresta-950 px-2 py-0.5 rounded border border-amber-500/30">
                            {sol.senhaGerada}
                          </code>
                          <button
                            onClick={() => copyText(sol.senhaGerada!, `senha-${sol.id}`)}
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
                      <span>Clique ao lado para gerar o login e a senha exclusivos deste dirigente.</span>
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

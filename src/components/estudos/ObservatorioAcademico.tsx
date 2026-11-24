"use client";

import React, { useState, useEffect, useCallback, useDeferredValue } from "react";
import Link from "next/link";
import {
  Search,
  BookOpen,
  ExternalLink,
  Copy,
  Check,
  PlusCircle,
  Download,
  Trash2,
  ShieldCheck,
  AlertTriangle,
  Lock,
  Sparkles,
  X,
  FileText,
  Filter,
} from "lucide-react";
import {
  AnexoEstudoPublicado,
  ArtigoAcademicoExterno,
  EixoTematicoObservatorio,
} from "@/types/observatorio";
import { EIXOS_OBSERVATORIO, EIXO_LABELS } from "@/lib/validators/observatorio";
import { verificarConformidadeTexto } from "@/lib/validators/comunidade";
import {
  formatarBibTeX,
  formatarCadernoNotebookLM,
  formatarCitacaoABNT,
} from "@/lib/observatorio/academic-search";
import { useDialogoAcessivel } from "@/hooks/useDialogoAcessivel";

interface SessaoStatus {
  authenticated: boolean;
  role?: "ADMIN" | "DIRIGENTE";
  codigo?: string;
}

export const ObservatorioAcademico: React.FC = () => {
  const [consulta, setConsulta] = useState("");
  const [eixoAtivo, setEixoAtivo] = useState<EixoTematicoObservatorio>("ayahuasca");
  const [somenteOA, setSomenteOA] = useState(false);

  const [resultados, setResultados] = useState<ArtigoAcademicoExterno[]>([]);
  const [fontesBusca, setFontesBusca] = useState<string[]>([]);
  const [buscando, setBuscando] = useState(false);
  const [erroBusca, setErroBusca] = useState("");
  const [jaBuscou, setJaBuscou] = useState(false);
  const [resumosAbertos, setResumosAbertos] = useState<Record<string, boolean>>({});

  const [anexos, setAnexos] = useState<AnexoEstudoPublicado[]>([]);
  const [carregandoAnexos, setCarregandoAnexos] = useState(true);
  const [filtroEixoAcervo, setFiltroEixoAcervo] = useState<EixoTematicoObservatorio | "todos">(
    "todos"
  );
  const [filtroTextoAcervo, setFiltroTextoAcervo] = useState("");

  const [sessao, setSessao] = useState<SessaoStatus>({ authenticated: false });
  const [copiadoChave, setCopiadoChave] = useState<string | null>(null);
  const [pastaNotebookLM, setPastaNotebookLM] = useState<ArtigoAcademicoExterno[]>([]);

  // Modal de Anexação Autenticada
  const [artigoAnexando, setArtigoAnexando] = useState<ArtigoAcademicoExterno | null>(null);
  const [eixoAnexo, setEixoAnexo] = useState<EixoTematicoObservatorio>("ayahuasca");
  const [sinteseClara, setSinteseClara] = useState("");
  const [notaDirigente, setNotaDirigente] = useState("");
  const [enviandoAnexo, setEnviandoAnexo] = useState(false);
  const [erroAnexo, setErroAnexo] = useState("");
  const [sucessoAnexo, setSucessoAnexo] = useState("");

  // Só o Conselho anexa estudos ao site. A checagem ainda é a sessão ativa;
  // o servidor (/api/estudos/anexos) restringe o envio ao perfil do Conselho.
  const podeAnexar = sessao.authenticated;

  const textoCompliance = useDeferredValue(`${sinteseClara} ${notaDirigente}`);
  const alertasCompliance = verificarConformidadeTexto(textoCompliance);

  const dialogoAnexar = useDialogoAcessivel({
    aberto: Boolean(artigoAnexando),
    aoFechar: () => setArtigoAnexando(null),
  });

  const carregarEstadoInicial = useCallback(async () => {
    setCarregandoAnexos(true);
    try {
      const [resAnexos, resSessao] = await Promise.all([
        fetch("/api/estudos/anexos"),
        fetch("/api/auth/verificar-chave"),
      ]);
      const dataAnexos = await resAnexos.json();
      const dataSessao = await resSessao.json();
      if (dataAnexos.sucesso && Array.isArray(dataAnexos.anexos)) {
        setAnexos(dataAnexos.anexos);
      }
      if (typeof dataSessao.authenticated === "boolean") {
        setSessao(dataSessao);
      }
    } catch {
      // Falha silenciosa preservando UI navegável
    } finally {
      setCarregandoAnexos(false);
    }
  }, []);

  useEffect(() => {
    carregarEstadoInicial();
  }, [carregarEstadoInicial]);

  const executarBusca = async (
    termoOverride?: string,
    eixoOverride?: EixoTematicoObservatorio,
    oaOverride?: boolean
  ) => {
    const q = (termoOverride ?? consulta).trim();
    const eixo = eixoOverride ?? eixoAtivo;
    const oa = oaOverride ?? somenteOA;

    setBuscando(true);
    setErroBusca("");
    setJaBuscou(true);

    try {
      const qs = new URLSearchParams();
      if (q) qs.set("q", q);
      qs.set("eixo", eixo);
      if (oa) qs.set("somenteAcessoAberto", "true");

      const res = await fetch(`/api/pesquisas-academicas?${qs.toString()}`);
      const data = await res.json();
      if (!res.ok || !data.sucesso) {
        throw new Error(data.erro || "Não foi possível consultar as bases acadêmicas agora.");
      }
      setResultados(data.artigos || []);
      setFontesBusca(data.fontesConsultadas || []);
    } catch (err: unknown) {
      setErroBusca(
        err instanceof Error ? err.message : "Falha na consulta às bases científicas abertas."
      );
      setResultados([]);
    } finally {
      setBuscando(false);
    }
  };

  const copiarTexto = (chave: string, texto: string) => {
    navigator.clipboard.writeText(texto);
    setCopiadoChave(chave);
    setTimeout(() => setCopiadoChave(null), 2500);
  };

  const anexoParaArtigo = (a: AnexoEstudoPublicado): ArtigoAcademicoExterno => ({
    doi: a.doi,
    titulo: a.titulo,
    autores: a.autores,
    ano: a.ano,
    periodico: a.periodico,
    resumo: a.sinteseLinguagemClara,
    urlOrigem: a.urlOrigem,
    pdfAbertoUrl: a.pdfAbertoUrl,
    acessoAberto: Boolean(a.pdfAbertoUrl),
    fonteApi: "EUROPE_PMC",
  });

  const alternarNaPasta = (artigo: ArtigoAcademicoExterno) => {
    setPastaNotebookLM((prev) => {
      const existe = prev.some((p) => p.doi.toLowerCase() === artigo.doi.toLowerCase());
      return existe
        ? prev.filter((p) => p.doi.toLowerCase() !== artigo.doi.toLowerCase())
        : [...prev, artigo];
    });
  };

  const baixarMarkdownNotebookLM = () => {
    if (pastaNotebookLM.length === 0) return;
    const conteudo = formatarCadernoNotebookLM(pastaNotebookLM);
    const blob = new Blob([conteudo], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "observatorio-nativaram-notebooklm.md";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const abrirModalAnexar = (artigo: ArtigoAcademicoExterno) => {
    setArtigoAnexando(artigo);
    setEixoAnexo(eixoAtivo);
    setSinteseClara("");
    setNotaDirigente("");
    setErroAnexo("");
    setSucessoAnexo("");
  };

  const confirmarAnexoNoSite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!artigoAnexando) return;
    setErroAnexo("");
    setSucessoAnexo("");

    if (alertasCompliance.length > 0) {
      setErroAnexo("Ajuste os termos destacados pelo scanner antes de publicar no acervo.");
      return;
    }

    setEnviandoAnexo(true);
    try {
      const res = await fetch("/api/estudos/anexos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doi: artigoAnexando.doi,
          titulo: artigoAnexando.titulo,
          autores: artigoAnexando.autores,
          ano: artigoAnexando.ano,
          periodico: artigoAnexando.periodico,
          urlOrigem: artigoAnexando.urlOrigem,
          pdfAbertoUrl: artigoAnexando.pdfAbertoUrl || "",
          eixoTematico: eixoAnexo,
          sinteseLinguagemClara: sinteseClara,
          notaDirigente,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.sucesso) {
        throw new Error(data.erro || "Não foi possível anexar a pesquisa.");
      }

      setAnexos((prev) => [data.anexo, ...prev]);
      setSucessoAnexo("Pesquisa verificada e publicada no acervo do Observatório!");
      setArtigoAnexando(null);
    } catch (err: unknown) {
      setErroAnexo(err instanceof Error ? err.message : "Erro ao salvar anexo.");
    } finally {
      setEnviandoAnexo(false);
    }
  };

  const excluirAnexo = async (id: string) => {
    try {
      const res = await fetch(`/api/estudos/anexos/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setAnexos((prev) => prev.filter((a) => a.id !== id));
      }
    } catch {
      // Ignora erro pontual de rede
    }
  };

  const termoAcervo = filtroTextoAcervo.trim().toLowerCase();
  const anexosFiltrados = anexos.filter((a) => {
    if (filtroEixoAcervo !== "todos" && a.eixoTematico !== filtroEixoAcervo) {
      return false;
    }
    if (!termoAcervo) return true;
    const alvo = [
      a.titulo,
      a.autores,
      a.periodico,
      a.doi,
      a.paisOrigem || "",
      a.sinteseLinguagemClara,
    ]
      .join(" ")
      .toLowerCase();
    return alvo.includes(termoAcervo);
  });

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Aviso fixo de ciência (plano 013, decisão 8) */}
      <div
        role="note"
        className="rounded-2xl border-2 border-ambar-500/50 bg-ambar-500/10 p-4 sm:p-5 flex items-start gap-3"
      >
        <AlertTriangle className="h-5 w-5 text-ambar-400 shrink-0 mt-0.5" aria-hidden="true" />
        <p className="text-sm text-areia-100 leading-relaxed font-medium">
          Conteúdo científico de referência. Não é indicação de uso. O uso terapêutico da ayahuasca
          é vedado pela Resolução CONAD nº 1/2010 fora da pesquisa científica.
        </p>
      </div>

      {/* ═══════════════════════════════════════════
          1. BUSCADOR ACADÊMICO EM FONTES ABERTAS
          ═══════════════════════════════════════════ */}
      <section
        aria-labelledby="observatorio-buscador-titulo"
        className="rounded-3xl border border-ambar-500/30 bg-floresta-950/90 p-5 sm:p-8 space-y-6 shadow-elevated"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-ambar-500/15 pb-5">
          <div className="space-y-1.5 max-w-2xl">
            <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-ambar-400">
              Tecnologia Social &amp; Ciência Aberta • Europe PMC + Crossref
            </p>
            <h2
              id="observatorio-buscador-titulo"
              className="font-serif text-xl sm:text-2xl font-bold text-areia-100"
            >
              Buscador de Pesquisas Acadêmicas Verificadas
            </h2>
            <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
              Pesquise artigos revisados por pares ou cole um DOI exato (<code className="text-ambar-300">10.xxxx/...</code>). Exporte referências para o NotebookLM. Só o Conselho anexa estudos comentados em linguagem simples ao site.
            </p>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono">
            {podeAnexar ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Sessão do Conselho ({sessao.codigo}) • Pode anexar</span>
              </span>
            ) : (
              <Link
                href="/portal-dirigente"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-floresta-900 border border-ambar-500/30 text-ambar-300 hover:bg-floresta-800 transition-colors"
              >
                <Lock className="h-3.5 w-3.5" />
                <span>Conselho: entrar para anexar</span>
              </Link>
            )}
          </div>
        </div>

        {/* Eixos Pré-Curados */}
        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-areia-400 block">
            1. Escolha um eixo de pesquisa ou digite seu termo:
          </span>
          <div className="flex overflow-x-auto touch-scroll-x sm:flex-wrap gap-2 pb-1">
            {EIXOS_OBSERVATORIO.map((eixo) => {
              const ativo = eixoAtivo === eixo.id;
              return (
                <button
                  key={eixo.id}
                  type="button"
                  onClick={() => {
                    setEixoAtivo(eixo.id);
                    if (!consulta.trim()) {
                      executarBusca("", eixo.id, somenteOA);
                    }
                  }}
                  title={eixo.descricaoCurta}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                    ativo
                      ? "bg-ambar-500 text-floresta-950 border-ambar-400 shadow-solar"
                      : "bg-floresta-900/70 text-areia-300 border-ambar-500/20 hover:border-ambar-500/45 hover:text-areia-100"
                  }`}
                >
                  {eixo.rotulo}
                </button>
              );
            })}
          </div>
        </div>

        {/* Formulário de Busca */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            executarBusca();
          }}
          className="space-y-3"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <label htmlFor="observatorio-busca-input" className="sr-only">
                Termo científico, planta, autor ou DOI exato para pesquisa acadêmica
              </label>
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ambar-400" />
              <input
                id="observatorio-busca-input"
                name="buscaObservatorio"
                type="text"
                value={consulta}
                onChange={(e) => setConsulta(e.target.value)}
                placeholder="Ex: Banisteriopsis caapi, CONAD ou cole DOI exato (10.3390/ph13110334)..."
                className="w-full rounded-xl border border-ambar-500/30 bg-floresta-900 pl-10 pr-4 py-3 text-base sm:text-sm text-areia-100 placeholder-areia-400/50 focus:border-ambar-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-ambar-400"
              />
            </div>

            <button
              type="submit"
              disabled={buscando}
              className="btn-primary text-xs font-bold px-6 py-3 shrink-0 disabled:opacity-60"
            >
              {buscando ? "Consultando bases..." : "Buscar / Resolver DOI"}
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <label
              htmlFor="observatorio-somente-oa"
              className="inline-flex items-center gap-2 text-areia-300 cursor-pointer select-none"
            >
              <input
                id="observatorio-somente-oa"
                name="somenteAcessoAberto"
                type="checkbox"
                checked={somenteOA}
                onChange={(e) => setSomenteOA(e.target.checked)}
                className="rounded border-ambar-500/40 bg-floresta-900 text-ambar-500 focus:ring-ambar-400"
              />
              <span>Filtrar somente Acesso Aberto (PDF/texto gratuito sem paywall)</span>
            </label>

            {pastaNotebookLM.length > 0 && (
              <button
                type="button"
                onClick={baixarMarkdownNotebookLM}
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 px-3.5 py-1.5 text-emerald-200 font-semibold transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                <span>
                  Exportar Pasta p/ NotebookLM ({pastaNotebookLM.length})
                </span>
              </button>
            )}
          </div>
        </form>

        {erroBusca && (
          <div
            role="alert"
            className="rounded-xl border border-red-500/40 bg-red-950/30 p-4 text-xs text-red-200"
          >
            {erroBusca}
          </div>
        )}

        {/* Resultados da Busca ao Vivo */}
        {jaBuscou && !buscando && (
          <div className="space-y-4 pt-2 border-t border-ambar-500/15">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-areia-300">
              <span>
                <strong>{resultados.length}</strong> artigos com DOI verificável encontrados
                {fontesBusca.length > 0 ? ` (${fontesBusca.join(" + ")})` : ""}.
              </span>
              <span className="text-[11px] font-mono text-areia-400">
                Pré-filtro ativo: erratas e itens sem DOI descartados
              </span>
            </div>

            {resultados.length === 0 ? (
              <p className="text-xs text-areia-400 py-4">
                Nenhum artigo retornado para este filtro. Tente termos em inglês científico (ex: &ldquo;Banisteriopsis caapi&rdquo;) ou desmarque o filtro de Acesso Aberto.
              </p>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {resultados.map((artigo) => {
                  const naPasta = pastaNotebookLM.some(
                    (p) => p.doi.toLowerCase() === artigo.doi.toLowerCase()
                  );
                  const expandido = Boolean(resumosAbertos[artigo.doi]);
                  const jaAnexado = anexos.some(
                    (a) => a.doi.toLowerCase() === artigo.doi.toLowerCase()
                  );

                  return (
                    <article
                      key={artigo.doi}
                      className="rounded-2xl border border-ambar-500/20 bg-floresta-900/60 p-5 flex flex-col justify-between gap-4"
                    >
                      <div className="space-y-2.5">
                        <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono">
                          <span className="px-2 py-0.5 rounded bg-floresta-950 border border-ambar-500/25 text-ambar-300">
                            {artigo.ano} • {artigo.fonteApi === "EUROPE_PMC" ? "Europe PMC" : "Crossref"}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-floresta-950 border border-ambar-500/20 text-areia-300">
                            DOI: {artigo.doi}
                          </span>
                          {artigo.acessoAberto && (
                            <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/35 text-emerald-300 font-bold">
                              Acesso Aberto
                            </span>
                          )}
                        </div>

                        <h3 className="font-serif text-sm sm:text-base font-bold text-areia-100 leading-snug">
                          {artigo.titulo}
                        </h3>

                        <p className="text-[11px] text-areia-300 font-light">
                          {artigo.autores} — <em className="text-ambar-300/90">{artigo.periodico}</em>
                        </p>

                        {artigo.resumo && (
                          <div className="space-y-1">
                            <p
                              className={`text-xs text-areia-300/90 font-light leading-relaxed ${
                                expandido ? "" : "line-clamp-3"
                              }`}
                            >
                              {artigo.resumo}
                            </p>
                            <button
                              type="button"
                              onClick={() =>
                                setResumosAbertos((prev) => ({
                                  ...prev,
                                  [artigo.doi]: !prev[artigo.doi],
                                }))
                              }
                              className="text-[11px] text-ambar-400 hover:underline font-medium"
                            >
                              {expandido ? "Recolher resumo" : "Ler resumo completo"}
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="pt-3 border-t border-ambar-500/15 flex flex-wrap items-center gap-2 text-[11px]">
                        <a
                          href={artigo.pdfAbertoUrl || artigo.urlOrigem}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-floresta-950 border border-ambar-500/25 text-ambar-300 hover:text-ambar-200 font-semibold"
                        >
                          <ExternalLink className="h-3 w-3" />
                          <span>{artigo.pdfAbertoUrl ? "Abrir PDF/Fonte" : "Abrir DOI"}</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => copiarTexto(`abnt-${artigo.doi}`, formatarCitacaoABNT(artigo))}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-floresta-950 border border-ambar-500/20 text-areia-200 hover:text-areia-100"
                        >
                          {copiadoChave === `abnt-${artigo.doi}` ? (
                            <Check className="h-3 w-3 text-emerald-400" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                          <span>{copiadoChave === `abnt-${artigo.doi}` ? "ABNT Copiada" : "ABNT"}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => copiarTexto(`bib-${artigo.doi}`, formatarBibTeX(artigo))}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-floresta-950 border border-ambar-500/20 text-areia-200 hover:text-areia-100"
                        >
                          {copiadoChave === `bib-${artigo.doi}` ? (
                            <Check className="h-3 w-3 text-emerald-400" />
                          ) : (
                            <FileText className="h-3 w-3" />
                          )}
                          <span>{copiadoChave === `bib-${artigo.doi}` ? "BibTeX Copiado" : "BibTeX"}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => alternarNaPasta(artigo)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border font-semibold ${
                            naPasta
                              ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-200"
                              : "bg-floresta-950 border-ambar-500/20 text-areia-200 hover:border-ambar-400"
                          }`}
                        >
                          <Sparkles className="h-3 w-3" />
                          <span>{naPasta ? "Na Pasta NotebookLM" : "+ NotebookLM"}</span>
                        </button>

                        {podeAnexar && (
                          <button
                            type="button"
                            disabled={jaAnexado}
                            onClick={() => abrirModalAnexar(artigo)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-ambar-500 hover:bg-ambar-400 text-floresta-950 font-bold disabled:opacity-50"
                          >
                            <PlusCircle className="h-3 w-3" />
                            <span>{jaAnexado ? "Já Anexado" : "Anexar ao Site"}</span>
                          </button>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </section>

      {/* ═══════════════════════════════════════════
          2. ACERVO ACADÊMICO ANEXADO NO OBSERVATÓRIO
          ═══════════════════════════════════════════ */}
      <section aria-labelledby="acervo-observatorio-titulo" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-ambar-500/15 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-ambar-400" />
              <h2
                id="acervo-observatorio-titulo"
                className="font-serif text-lg sm:text-xl font-bold text-areia-100"
              >
                Acervo Acadêmico Anexado ao Observatório ({anexosFiltrados.length})
              </h2>
            </div>
            <p className="text-xs text-areia-400 font-light">
              Publicações externas revisadas por pares, anexadas com DOI verificável e síntese em linguagem acessível — caráter informativo, sem promessa clínica (+18).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="filtro-texto-acervo" className="sr-only">
              Filtrar acervo por país, autor, DOI ou palavra-chave
            </label>
            <input
              id="filtro-texto-acervo"
              type="search"
              value={filtroTextoAcervo}
              onChange={(e) => setFiltroTextoAcervo(e.target.value)}
              placeholder="País, autor, DOI ou termo..."
              className="w-full sm:w-52 rounded-xl border border-ambar-500/30 bg-floresta-900 px-3 py-2 text-xs text-areia-100 placeholder:text-areia-500 focus:border-ambar-400 focus:outline-none"
            />
            <Filter className="h-3.5 w-3.5 text-ambar-400 shrink-0" />
            <label htmlFor="filtro-eixo-acervo" className="sr-only">
              Filtrar acervo anexado por eixo
            </label>
            <select
              id="filtro-eixo-acervo"
              value={filtroEixoAcervo}
              onChange={(e) =>
                setFiltroEixoAcervo(e.target.value as EixoTematicoObservatorio | "todos")
              }
              className="rounded-xl border border-ambar-500/30 bg-floresta-900 px-3 py-2 text-xs text-areia-100 focus:border-ambar-400 focus:outline-none"
            >
              <option value="todos">Todos os eixos</option>
              {EIXOS_OBSERVATORIO.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.rotulo}
                </option>
              ))}
            </select>
          </div>
        </div>

        {pastaNotebookLM.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-500/35 bg-emerald-950/35 px-4 py-2.5 text-xs text-emerald-100">
            <span>
              <strong>{pastaNotebookLM.length}</strong> estudo(s) selecionado(s) na Pasta NotebookLM.
            </span>
            <button
              type="button"
              onClick={baixarMarkdownNotebookLM}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 px-3.5 py-1.5 text-emerald-200 font-semibold transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Exportar Pasta p/ NotebookLM ({pastaNotebookLM.length})</span>
            </button>
          </div>
        )}

        {sucessoAnexo && (
          <div
            role="status"
            className="rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-3.5 text-xs text-emerald-200"
          >
            {sucessoAnexo}
          </div>
        )}

        {carregandoAnexos ? (
          <p className="text-xs text-areia-400">Carregando estudos verificados...</p>
        ) : anexosFiltrados.length === 0 ? (
          <p className="text-xs text-areia-400">Nenhum anexo cadastrado neste eixo ainda.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {anexosFiltrados.map((anexo) => {
              const artigoEquivalente = anexoParaArtigo(anexo);
              const naPasta = pastaNotebookLM.some(
                (p) => p.doi.toLowerCase() === anexo.doi.toLowerCase()
              );
              const podeExcluir =
                sessao.authenticated &&
                (sessao.role === "ADMIN" ||
                  sessao.codigo?.toUpperCase() === anexo.adicionadoPorCodigo.toUpperCase());

              return (
                <article
                  key={anexo.id}
                  className="card-elevated rounded-2xl p-6 border border-ambar-500/20 bg-floresta-950/85 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono">
                      <span className="px-2.5 py-0.5 rounded-full bg-ambar-500/15 border border-ambar-500/30 text-ambar-300 uppercase">
                        {EIXO_LABELS[anexo.eixoTematico]}
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {anexo.paisOrigem && (
                          <span className="px-2 py-0.5 rounded-full bg-floresta-800 border border-ambar-500/25 text-areia-200">
                            {anexo.paisOrigem}
                          </span>
                        )}
                        <span className="text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                          Revisão Externa por Pares • {anexo.ano}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-serif text-base sm:text-lg font-bold text-areia-100 leading-snug">
                      {anexo.titulo}
                    </h3>

                    <p className="text-[11px] text-areia-400">
                      {anexo.autores} • <em className="text-ambar-300/90">{anexo.periodico}</em>
                    </p>

                    <div className="rounded-xl p-3.5 bg-floresta-900/70 border border-ambar-500/15 space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-ambar-400 block">
                        Síntese em Linguagem Clara
                      </span>
                      <p className="text-xs text-areia-200 leading-relaxed font-light">
                        {anexo.sinteseLinguagemClara}
                      </p>
                    </div>

                    {anexo.notaDirigente && (
                      <p className="text-[11px] text-areia-400 italic">
                        Nota institucional ({anexo.adicionadoPorNome}): {anexo.notaDirigente}
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-ambar-500/15 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href={`https://doi.org/${anexo.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-floresta-900 border border-ambar-500/25 text-ambar-300 hover:underline font-mono"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span>DOI: {anexo.doi}</span>
                      </a>
                      {anexo.pdfAbertoUrl && (
                        <a
                          href={anexo.pdfAbertoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/35 text-emerald-200 font-semibold"
                        >
                          <Download className="h-3 w-3" />
                          <span>PDF Aberto</span>
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => copiarTexto(`acc-${anexo.id}`, formatarCitacaoABNT(anexo))}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-floresta-900 border border-ambar-500/20 text-areia-200"
                      >
                        {copiadoChave === `acc-${anexo.id}` ? (
                          <Check className="h-3 w-3 text-emerald-400" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                        <span>{copiadoChave === `acc-${anexo.id}` ? "Copiada" : "ABNT"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          copiarTexto(`bib-acc-${anexo.id}`, formatarBibTeX(artigoEquivalente))
                        }
                        className="inline-flex items-center gap-1 text-areia-300 hover:text-areia-100 rounded-lg border border-areia-400/20 px-2.5 py-1 transition-colors"
                      >
                        <span>{copiadoChave === `bib-acc-${anexo.id}` ? "BibTeX ok" : "BibTeX"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => alternarNaPasta(artigoEquivalente)}
                        aria-pressed={naPasta}
                        className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 transition-colors ${
                          naPasta
                            ? "border-emerald-500/40 bg-emerald-500/20 text-emerald-200"
                            : "border-ambar-500/25 bg-floresta-900 text-ambar-300 hover:bg-floresta-800"
                        }`}
                      >
                        <span>{naPasta ? "Na Pasta ✓" : "+ NotebookLM"}</span>
                      </button>
                    </div>

                    {podeExcluir && (
                      <button
                        type="button"
                        onClick={() => excluirAnexo(anexo.id)}
                        className="inline-flex items-center gap-1 text-red-300 hover:text-red-200 px-2 py-1 rounded hover:bg-red-950/40"
                        title="Remover anexo publicado"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Remover</span>
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* ═══════════════════════════════════════════
          MODAL DE ANEXAÇÃO AUTENTICADA NO SITE
          ═══════════════════════════════════════════ */}
      {podeAnexar && artigoAnexando && (
        <div
          ref={dialogoAnexar.containerRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-anexar-titulo"
          tabIndex={-1}
          className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-floresta-950/90 backdrop-blur-md overflow-y-auto"
        >
          <div className="relative w-full max-w-xl rounded-2xl border border-ambar-500/40 bg-floresta-950 p-6 space-y-4 shadow-solar">
            <div className="flex items-start justify-between gap-3 border-b border-ambar-500/15 pb-3">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-ambar-400">
                  Anexar Pesquisa ao Observatório
                </p>
                <h3
                  id="modal-anexar-titulo"
                  className="font-serif text-lg font-bold text-areia-100 leading-snug"
                >
                  {artigoAnexando.titulo}
                </h3>
                <p className="text-[11px] font-mono text-areia-400 mt-1">
                  DOI verificado: {artigoAnexando.doi} • {artigoAnexando.ano}
                </p>
              </div>
              <button
                ref={dialogoAnexar.focoInicialRef}
                type="button"
                onClick={() => setArtigoAnexando(null)}
                aria-label="Fechar janela de anexação"
                className="p-1.5 rounded-lg text-areia-400 hover:text-areia-100 hover:bg-floresta-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={confirmarAnexoNoSite} className="space-y-4 text-xs">
              <div>
                <label
                  htmlFor="eixo-anexo-select"
                  className="block text-[11px] font-mono uppercase text-ambar-300 mb-1"
                >
                  Eixo Temático
                </label>
                <select
                  id="eixo-anexo-select"
                  value={eixoAnexo}
                  onChange={(e) => setEixoAnexo(e.target.value as EixoTematicoObservatorio)}
                  className="w-full rounded-xl border border-ambar-500/30 bg-floresta-900 px-3 py-2.5 text-sm text-areia-100 focus:border-ambar-400 focus:outline-none"
                >
                  {EIXOS_OBSERVATORIO.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.rotulo}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="sintese-clara-textarea"
                  className="block text-[11px] font-mono uppercase text-ambar-300 mb-1"
                >
                  Síntese em Linguagem Clara (ASD-STE100) *
                </label>
                <textarea
                  id="sintese-clara-textarea"
                  required
                  minLength={20}
                  maxLength={800}
                  rows={3}
                  value={sinteseClara}
                  onChange={(e) => setSinteseClara(e.target.value)}
                  placeholder="Explique em 2 ou 3 frases simples o que o estudo investigou e seus limites, sem promessas médicas."
                  className="w-full rounded-xl border border-ambar-500/30 bg-floresta-900 p-3 text-base sm:text-sm text-areia-100 focus:border-ambar-400 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="nota-dirigente-input"
                  className="block text-[11px] font-mono uppercase text-areia-300 mb-1"
                >
                  Nota do Conselho (Opcional)
                </label>
                <input
                  id="nota-dirigente-input"
                  type="text"
                  maxLength={500}
                  value={notaDirigente}
                  onChange={(e) => setNotaDirigente(e.target.value)}
                  placeholder="Ex: Referência complementar para o grupo de estudos litúrgicos."
                  className="w-full rounded-xl border border-ambar-500/30 bg-floresta-900 px-3 py-2.5 text-base sm:text-sm text-areia-100 focus:border-ambar-400 focus:outline-none"
                />
              </div>

              {alertasCompliance.length > 0 && (
                <div
                  role="alert"
                  className="rounded-xl border border-amber-500/50 bg-amber-950/40 p-3 space-y-1 text-amber-200"
                >
                  <p className="font-semibold flex items-center gap-1.5">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                    <span>Scanner CONAD/AGENTS.md detectou termos a substituir:</span>
                  </p>
                  {alertasCompliance.map((al) => (
                    <p key={al.termoDetectado} className="text-[11px]">
                      • &ldquo;{al.termoDetectado}&rdquo; → prefira <strong>{al.sugestaoAprovada}</strong>
                    </p>
                  ))}
                </div>
              )}

              {erroAnexo && (
                <p role="alert" className="text-xs text-red-300">
                  {erroAnexo}
                </p>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setArtigoAnexando(null)}
                  className="btn-secondary text-xs px-4 py-2"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={enviandoAnexo || alertasCompliance.length > 0}
                  className="btn-primary text-xs px-5 py-2.5 disabled:opacity-50"
                >
                  {enviandoAnexo ? "Publicando..." : "Publicar no Acervo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

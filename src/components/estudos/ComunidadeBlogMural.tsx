"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Share2,
  Calendar,
  Building,
  Search,
  BookOpen,
  Eye,
  CheckCircle2,
  ExternalLink,
  X,
  FileText,
  MapPin,
  Clock,
  Music,
  Globe,
  MessageCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { InstagramIcon, YouTubeIcon } from "@/components/ui/icons";
import {
  PublicacaoComunidade,
  PerfilTemploComunidade,
  ItemAgendaLiturgica,
} from "@/types/comunidade";

export const ComunidadeBlogMural: React.FC = () => {
  const [posts, setPosts] = useState<PublicacaoComunidade[]>([]);
  const [perfis, setPerfis] = useState<PerfilTemploComunidade[]>([]);
  const [agenda, setAgenda] = useState<ItemAgendaLiturgica[]>([]);
  const [loading, setLoading] = useState(true);

  // Filtros
  const [selectedCategoria, setSelectedCategoria] = useState<string>("todas");
  const [selectedTemplo, setSelectedTemplo] = useState<string>("todos");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Modal de Leitura Completa
  const [readingPost, setReadingPost] = useState<PublicacaoComunidade | null>(null);

  useEffect(() => {
    if (!readingPost) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setReadingPost(null);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [readingPost]);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    setLoading(true);
    try {
      const [resPosts, resPerfis, resAgenda] = await Promise.all([
        fetch("/api/comunidade/posts").then((r) => r.json()),
        fetch("/api/comunidade/perfis").then((r) => r.json()),
        fetch("/api/comunidade/agenda").then((r) => r.json()),
      ]);

      if (resPosts.success) setPosts(resPosts.posts);
      if (resPerfis.success) setPerfis(resPerfis.perfis);
      if (resAgenda.success) setAgenda(resAgenda.agenda);
    } catch (err) {
      console.warn("Aviso ao carregar mural da comunidade:", err);
    } finally {
      setLoading(false);
    }
  };

  const categorias = [
    { id: "todas", label: "Todas as Publicações" },
    { id: "REFLEXAO_DOUTRINARIA", label: "Reflexões Doutrinárias" },
    { id: "BOTANICA_TRADICIONAL", label: "Botânica da Floresta" },
    { id: "RELATO_VIVENCIA", label: "Relatos de Ritos" },
    { id: "ARTE_E_POESIA", label: "Arte & Poesia" },
    { id: "COMUNICADO_LITURGICO", label: "Comunicados" },
  ];

  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchCat = selectedCategoria === "todas" || p.categoria === selectedCategoria;
      const matchTemplo = selectedTemplo === "todos" || p.temploCodigo === selectedTemplo;
      const matchBusca =
        searchTerm === "" ||
        p.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.resumo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.temploNome.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchTemplo && matchBusca;
    });
  }, [posts, selectedCategoria, selectedTemplo, searchTerm]);

  return (
    <div className="space-y-16">
      {/* ═══════════════════════════════════════════
          HERO EDITORIAL DO MURAL DA COMUNIDADE
          ═══════════════════════════════════════════ */}
      <div className="rounded-3xl border-2 border-ambar-500/30 bg-gradient-to-br from-floresta-950 via-floresta-900 to-floresta-950 p-6 sm:p-12 space-y-6 shadow-solar relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-radial-ambar pointer-events-none opacity-40" />

        <div className="max-w-3xl space-y-3 relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-ambar-500/15 border border-ambar-500/30 px-3.5 py-1 text-[11px] font-semibold text-ambar-300 uppercase tracking-widest">
            <Share2 className="h-3.5 w-3.5 text-ambar-400" />
            <span>Mural Litúrgico Aberto • Partilha Entre Congregações</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-4xl font-bold text-areia-100 leading-tight">
            Vozes da Floresta, Relatos Doutrinários & Vida Comunitária
          </h3>

          <p className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
            Área aberta de comunicação onde igrejas daimistas, centros xamânicos e rezadores credenciados compartilham fotos de seus altares, reflexões sobre os sacramentos, comunicados e calendários de encontros espirituais sob o amparo da Resolução CONAD nº 01/2010.
          </p>
        </div>

        {/* Barra de Pesquisa e Filtros */}
        <div className="space-y-4 pt-2 relative">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-ambar-400/70" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por templo, tema doutrinário, rapé ou rito..."
              className="w-full rounded-2xl border border-ambar-500/25 bg-floresta-900/80 pl-12 pr-4 py-3.5 text-base sm:text-sm text-areia-100 placeholder-areia-400/50 focus:border-ambar-400 focus:outline-none shadow-elevated"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-areia-400 hover:text-areia-100 text-xs font-mono"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Fita de Categorias com Touch Inércia para Smartphones */}
          <div className="flex overflow-x-auto touch-scroll-x sm:flex-wrap items-center gap-2 pt-1 pb-1">
            {categorias.map(({ id, label }) => {
              const isSelected = selectedCategoria === id;
              return (
                <button
                  key={id}
                  onClick={() => setSelectedCategoria(id)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                    isSelected
                      ? "bg-ambar-500 text-floresta-950 shadow-solar font-bold scale-105"
                      : "bg-floresta-900/60 border border-ambar-500/20 text-areia-300 hover:border-ambar-500/40 hover:text-areia-100"
                  }`}
                >
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          FEED PRINCIPAL DE PUBLICAÇÕES DOS TEMPLOS
          ═══════════════════════════════════════════ */}
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-ambar-500/15 pb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-ambar-400" />
            <h4 className="font-serif text-lg sm:text-xl font-bold text-areia-100">
              Publicações da Comunidade ({filteredPosts.length})
            </h4>
          </div>
          <span className="text-xs text-areia-400 font-mono">
            Vozes dos Templos Credenciados
          </span>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="card-elevated rounded-2xl p-12 text-center space-y-3">
            <HelpCircle className="h-12 w-12 text-ambar-400/40 mx-auto" />
            <h5 className="font-serif text-lg font-semibold text-areia-200">
              Nenhuma publicação encontrada para o filtro selecionado
            </h5>
            <p className="text-xs text-areia-400 max-w-md mx-auto">
              Tente selecionar outra categoria ou limpar a busca de texto para ver todas as reflexões da comunidade.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="card-elevated rounded-3xl p-6 sm:p-8 space-y-6 border-ambar-500/25 bg-gradient-to-br from-floresta-900/90 via-floresta-950 to-floresta-900/70 hover:border-ambar-500/45 transition-all duration-300 shadow-elevated flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Cabeçalho do Card */}
                  <div className="flex items-center justify-between gap-2 border-b border-ambar-500/15 pb-3">
                    <Link
                      href={`/estudos/comunidade/${post.temploSlug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-ambar-400 hover:text-ambar-300 transition-colors group"
                      title="Ver perfil completo desta congregação"
                    >
                      <Building className="h-3.5 w-3.5" />
                      <span className="group-hover:underline">{post.temploNome}</span>
                      <ArrowRight className="h-3 w-3 opacity-70 group-hover:translate-x-0.5 transition-transform" />
                    </Link>

                    <span className="text-[10px] font-mono uppercase tracking-wider text-ambar-300 bg-ambar-500/15 border border-ambar-500/30 px-2 py-0.5 rounded-full">
                      {post.categoriaLabel}
                    </span>
                  </div>

                  {/* Foto de Capa (se houver) */}
                  {post.imagemCapa && (
                    <div className="h-48 w-full rounded-2xl overflow-hidden bg-floresta-950 border border-ambar-500/20 group">
                      <img
                        src={post.imagemCapa}
                        alt={post.titulo}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Título & Resumo */}
                  <div>
                    <h5 className="font-serif text-xl sm:text-2xl font-bold text-areia-100 leading-snug">
                      {post.titulo}
                    </h5>
                    <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed mt-2">
                      {post.resumo}
                    </p>
                  </div>

                  {/* Metadados & Anexos */}
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-areia-400 font-mono pt-1">
                    <span>Data: {post.criadoEm}</span>
                    <span>•</span>
                    <span>{post.visualizacoes} visualizações</span>
                    {post.anexos.length > 0 && (
                      <>
                        <span>•</span>
                        <span className="text-ambar-300">📎 {post.anexos.length} anexo(s)</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Ações */}
                <div className="pt-4 border-t border-ambar-500/15 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setReadingPost(post)}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-floresta-800 hover:bg-floresta-700 text-areia-100 px-4 py-2.5 text-xs font-semibold border border-ambar-500/30 transition-colors"
                  >
                    <BookOpen className="h-3.5 w-3.5 text-ambar-400" />
                    <span>Ler Publicação Completa</span>
                  </button>

                  <Link
                    href={`/estudos/comunidade/${post.temploSlug}`}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-ambar-500/15 hover:bg-ambar-500/25 text-ambar-300 px-3.5 py-2.5 text-xs font-semibold border border-ambar-500/30 transition-colors shrink-0"
                    title="Conhecer o espaço e a agenda deste templo"
                  >
                    <Building className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Perfil</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════
          VITRINE DE TEMPLOS HOMOLOGADOS & AGENDAS
          ═══════════════════════════════════════════ */}
      <section className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-ambar-500/15 pb-4">
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5 text-ambar-400" />
            <h4 className="font-serif text-lg sm:text-xl font-bold text-areia-100">
              Casas de Oração & Congregações Credenciadas ({perfis.length})
            </h4>
          </div>
          <span className="text-xs text-areia-400 font-mono">
            Homologação CONAD 01/2010
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {perfis.map((templo) => (
            <div
              key={templo.codigoLiturgico}
              className="card-elevated rounded-3xl p-6 sm:p-7 bg-floresta-950/85 border border-ambar-500/25 flex flex-col justify-between space-y-4 hover:border-ambar-500/40 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" />
                    <span>CONAD Homologado</span>
                  </span>
                  <span className="text-xs text-areia-400 font-mono flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-ambar-400" />
                    <span>{templo.cidade}/{templo.estado}</span>
                  </span>
                </div>

                <div>
                  <h5 className="font-serif text-xl font-bold text-areia-100">
                    {templo.nomeInstituicao}
                  </h5>
                  <p className="text-xs text-ambar-300/90 font-light mt-0.5">
                    Linhagem: {templo.linhagem} • Dirigente: {templo.dirigenteResponsavel}
                  </p>
                </div>

                <p className="text-xs text-areia-300 font-light leading-relaxed line-clamp-3">
                  {templo.bioApresentacao}
                </p>

                {/* Galeria de Fotos do Espaço */}
                {templo.fotosEspaco.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {templo.fotosEspaco.slice(0, 2).map((foto, idx) => (
                      <div key={idx} className="h-20 rounded-xl overflow-hidden bg-floresta-900 border border-ambar-500/20">
                        <img
                          src={foto}
                          alt="Espaço sagrado"
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-ambar-500/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {templo.redesSociais.instagram && (
                    <a
                      href={templo.redesSociais.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-areia-400 hover:text-pink-400 hover:bg-floresta-900 transition-colors"
                      title="Instagram"
                    >
                      <InstagramIcon className="h-4 w-4" />
                    </a>
                  )}
                  {templo.redesSociais.youtube && (
                    <a
                      href={templo.redesSociais.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-areia-400 hover:text-red-400 hover:bg-floresta-900 transition-colors"
                      title="YouTube"
                    >
                      <YouTubeIcon className="h-4 w-4" />
                    </a>
                  )}
                  {templo.whatsappContato && (
                    <a
                      href={`https://wa.me/${templo.whatsappContato.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-areia-400 hover:text-emerald-400 hover:bg-floresta-900 transition-colors"
                      title="Conversar no WhatsApp"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </a>
                  )}
                </div>

                <Link
                  href={`/estudos/comunidade/${templo.slug}`}
                  className="btn-secondary text-xs px-3.5 py-1.5 inline-flex items-center gap-1.5"
                >
                  <span>Conhecer Espaço & Agenda</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MODAL / LEITOR COMPLETO DA PUBLICAÇÃO
          ═══════════════════════════════════════════ */}
      {readingPost && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[130] flex items-center justify-center p-3 sm:p-6 bg-floresta-950/90 backdrop-blur-md animate-fade-in overflow-y-auto"
        >
          <div className="relative w-full max-w-3xl my-auto max-h-[92vh] flex flex-col rounded-3xl border-2 border-ambar-500/40 bg-floresta-950 text-areia-100 shadow-solar overflow-hidden">
            {/* Header do Modal */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-ambar-500/20 bg-floresta-900">
              <div className="flex items-center gap-2 truncate pr-4">
                <BookOpen className="h-4 w-4 text-ambar-400 shrink-0" />
                <span className="font-serif text-xs font-semibold text-areia-200 truncate">
                  {readingPost.temploNome} • {readingPost.categoriaLabel}
                </span>
              </div>
              <button
                onClick={() => setReadingPost(null)}
                className="p-1 rounded-lg text-areia-400 hover:text-areia-100 hover:bg-floresta-800 transition-colors"
                aria-label="Fechar leitor"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Conteúdo em Leitura */}
            <div className="p-6 sm:p-10 overflow-y-auto space-y-6 text-left">
              <div className="space-y-3 border-b border-ambar-500/15 pb-5">
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-ambar-300">
                  <span className="bg-ambar-500/15 border border-ambar-500/30 px-2.5 py-0.5 rounded-full">
                    {readingPost.categoriaLabel}
                  </span>
                  <span>•</span>
                  <span>{readingPost.criadoEm}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-areia-100 leading-tight">
                  {readingPost.titulo}
                </h3>

                <p className="text-xs sm:text-sm text-ambar-300/90 font-light italic">
                  Por: {readingPost.temploNome}
                </p>
              </div>

              {/* Imagem de Capa do Post */}
              {readingPost.imagemCapa && (
                <div className="rounded-2xl overflow-hidden border border-ambar-500/25 max-h-80 bg-floresta-900">
                  <img
                    src={readingPost.imagemCapa}
                    alt={readingPost.titulo}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Corpo em Markdown Formatado */}
              <div className="prose prose-invert prose-areia max-w-none text-xs sm:text-sm leading-relaxed text-areia-200 whitespace-pre-line space-y-4 font-light">
                {readingPost.conteudoMarkdown}
              </div>

              {/* Mídias / Embeds Incorporados */}
              {readingPost.embeds.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-ambar-500/15">
                  <h6 className="font-serif text-xs font-bold text-ambar-300 uppercase tracking-wider">
                    Mídias & Registros Externos
                  </h6>
                  <div className="space-y-2">
                    {readingPost.embeds.map((emb, i) => (
                      <a
                        key={i}
                        href={emb.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-xl bg-floresta-900 border border-ambar-500/20 text-xs text-ambar-300 hover:bg-floresta-850 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <ExternalLink className="h-4 w-4" />
                          <span>Abrir {emb.plataforma}: {emb.url}</span>
                        </span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Anexos para Download */}
              {readingPost.anexos.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-ambar-500/15">
                  <h6 className="font-serif text-xs font-bold text-ambar-300 uppercase tracking-wider">
                    Dossiês & Anexos do Estudo
                  </h6>
                  <div className="space-y-2">
                    {readingPost.anexos.map((anx, i) => (
                      <a
                        key={i}
                        href={anx.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-xl bg-floresta-900 border border-ambar-500/20 text-xs text-areia-100 hover:bg-floresta-850 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-ambar-400" />
                          <span>{anx.nome}</span>
                        </span>
                        <span className="text-[11px] font-mono text-ambar-400">Acessar</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Selo Obrigatório de Compliance CONAD */}
              <div className="p-4 rounded-xl bg-floresta-900/60 border border-ambar-500/20 text-[11px] text-areia-400 leading-relaxed font-light space-y-1">
                <span className="text-amber-400 font-semibold block flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Salvaguarda Litúrgica e Integrativa CONAD nº 01/2010:
                </span>
                <p>
                  As opiniões e experiências partilhadas nesta publicação expressam a vivência confessional da congregação emitente. Os sacramentos da floresta são destinados exclusivamente a ritos religiosos reconhecidos pela legislação brasileira.
                </p>
              </div>
            </div>

            {/* Rodapé do Modal */}
            <div className="px-6 py-4 bg-floresta-900 border-t border-ambar-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
              <Link
                href={`/estudos/comunidade/${readingPost.temploSlug}`}
                onClick={() => setReadingPost(null)}
                className="btn-secondary text-xs px-4 py-2 w-full sm:w-auto text-center"
              >
                Ver Mais Desta Congregação
              </Link>
              <button
                onClick={() => setReadingPost(null)}
                className="btn-primary text-xs font-semibold px-5 py-2 w-full sm:w-auto"
              >
                Concluir Leitura
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

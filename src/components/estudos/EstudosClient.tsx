"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  FileText,
  Download,
  Eye,
  BookOpen,
  Search,
  Sparkles,
  ExternalLink,
  X,
  Scale,
  FlaskConical,
  Leaf,
  CheckCircle2,
  Compass,
  ArrowRight,
  GraduationCap,
  Bot,
  Layers,
  HelpCircle,
  FileCheck,
} from "lucide-react";
import { estudosData, EstudoItem } from "@/data/estudos";

interface TodosDocumentosItem {
  nome: string;
  arquivo: string;
  tamanho: string;
  categoria: string;
}

const todosDocumentosPdf: TodosDocumentosItem[] = [
  // Artigos e Dossiês Científicos Gerados
  { nome: "Perfil Fitoquímico e Alcaloides do Cipó Tucunacá (HPLC)", arquivo: "fitoquimica-cipo-tucunaca-ayahuasca.pdf", tamanho: "4.3 KB", categoria: "Etnociência / Ayahuasca" },
  { nome: "Alquimia Biogeoquímica das Cinzas Sagradas no Rapé (pH & Termólise)", arquivo: "alquimia-biogeoquimica-cinzas-rape.pdf", tamanho: "4.7 KB", categoria: "Etnociência / Rapés" },
  { nome: "Etnobotânica e Fitoquímica da Sananga (Tabernaemontana)", arquivo: "estudo-cientifico-sananga-tabernaemontana.pdf", tamanho: "4.4 KB", categoria: "Etnociência / Sananga" },
  { nome: "Marco Regulatório da Ayahuasca: Resolução CONAD 01/2010 Comentada", arquivo: "resolucao-conad-01-2010-marco-ayahuasca.pdf", tamanho: "4.2 KB", categoria: "Governança / CONAD" },

  // Compêndios e Dossiês Institucionais
  { nome: "Curadoria & Feitio Consciente da Ayahuasca", arquivo: "curadoria-nativaram-ayahuasca.pdf", tamanho: "957 KB", categoria: "Ayahuasca" },
  { nome: "Compêndio Etnobotânico e Base de Conhecimento", arquivo: "nativaram-base-conhecimento-definiva.pdf", tamanho: "254 KB", categoria: "Rapés & Botânica" },
  { nome: "Catálogo das 15 Essências de Rapé Sagrado", arquivo: "nativaram-catalogo-rapes-completo.pdf", tamanho: "289 KB", categoria: "Rapés Sagrados" },
  { nome: "Manual Unificado de Governança & Compliance Jurídico", arquivo: "manual-compliance-nativaram.pdf", tamanho: "1.022 KB", categoria: "Governança" },
  { nome: "Documento Institucional Nativaram Brasil & Sananga", arquivo: "documento-institucional-nativaram.pdf", tamanho: "988 KB", categoria: "Institucional" },
  { nome: "Diretrizes de Comunicação & Compliance Digital", arquivo: "Diretrizes de Comunicação e Compliance Nativaram Brasil.pdf", tamanho: "169 KB", categoria: "Compliance" },
  { nome: "Diretrizes Institucionais e Base de Conhecimento (Rev)", arquivo: "Diretrizes Institucionais e Base de Conhecimento - Nativaram Brasil (1).pdf", tamanho: "368 KB", categoria: "Institucional" },
  { nome: "Diretrizes Institucionais e Base de Conhecimento Original", arquivo: "Diretrizes Institucionais e Base de Conhecimento - Nativaram Brasil.pdf", tamanho: "107 KB", categoria: "Institucional" },
  { nome: "Sobre Nós: História, Povos Originários & Etnociência", arquivo: "sobre nós nativaram.pdf", tamanho: "2.651 KB", categoria: "História & Doutrina" },
  { nome: "Manual de Compliance Definitivo", arquivo: "nativaram-manual-compliance-definitivo.pdf", tamanho: "153 KB", categoria: "Compliance" },
  { nome: "Manual de Comunicação e Conformidade", arquivo: "nativaram-manual-comunicacao-compliance.pdf", tamanho: "203 KB", categoria: "Comunicação" },
  { nome: "Catálogo Institucional & Mobile 2026", arquivo: "NATIVARAM - INSTITUCIONAL E CATALOGO MOBILE - 2026.pdf", tamanho: "10,3 MB", categoria: "Catálogo" },
  { nome: "Dossiê Comercial & Logístico Institucional", arquivo: "Nativaram-Brasil-COMERCIAL.pdf", tamanho: "8,6 MB", categoria: "Operacional" },
  { nome: "Catálogo de Essências Tradicionais (Edição V2)", arquivo: "nativaram-catalogo-v2 PDF.pdf", tamanho: "473 KB", categoria: "Catálogo" },
  { nome: "Catálogo de Essências Tradicionais (Edição V3)", arquivo: "nativaram-catalogo-v3.pdf", tamanho: "280 KB", categoria: "Catálogo" },
  { nome: "Catálogo de Essências Tradicionais (Edição V4)", arquivo: "nativaram-catalogo-v4.pdf", tamanho: "281 KB", categoria: "Catálogo" },
];

export function EstudosClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activePdfModal, setActivePdfModal] = useState<string | null>(null);
  const [readingStudy, setReadingStudy] = useState<EstudoItem | null>(null);
  const [customNotebookUrl, setCustomNotebookUrl] = useState<string>("");
  const [savedNotebooks, setSavedNotebooks] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("nativaram_notebooklm_links");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const categories = [
    { id: "todos", label: "Todos os Estudos", icon: Layers },
    { id: "ayahuasca", label: "Ayahuasca & Feitio", icon: FlaskConical },
    { id: "rapes", label: "Rapés Sagrados", icon: Leaf },
    { id: "sananga", label: "Sananga Tradicional", icon: Eye },
    { id: "compliance", label: "Governança & CONAD", icon: Scale },
    { id: "etnociencia", label: "Manifesto & Etnociência", icon: Compass },
  ];

  const filteredStudies = useMemo(() => {
    return estudosData.filter((item) => {
      const matchesCategory =
        selectedCategory === "todos" || item.categoria === selectedCategory;
      const matchesSearch =
        searchTerm === "" ||
        item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subtitulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.resumo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.principaisDescobertas.some((d) =>
          d.toLowerCase().includes(searchTerm.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const handleSaveNotebook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customNotebookUrl.trim()) return;
    const updated = [...savedNotebooks, customNotebookUrl.trim()];
    setSavedNotebooks(updated);
    localStorage.setItem("nativaram_notebooklm_links", JSON.stringify(updated));
    setCustomNotebookUrl("");
  };

  const handleRemoveNotebook = (index: number) => {
    const updated = savedNotebooks.filter((_, i) => i !== index);
    setSavedNotebooks(updated);
    localStorage.setItem("nativaram_notebooklm_links", JSON.stringify(updated));
  };

  return (
    <div className="space-y-16">
      {/* ═══════════════════════════════════════════
          BARRA DE PESQUISA & ABAS DE FILTRO
          ═══════════════════════════════════════════ */}
      <div className="space-y-6">
        {/* Campo de Busca */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-ambar-400/70" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por composto (Harmina, THH), planta (Tucunacá, Sananga), CONAD ou tema..."
            className="w-full rounded-2xl border border-ambar-500/25 bg-floresta-900/70 pl-12 pr-4 py-3.5 text-sm text-areia-100 placeholder-areia-400/50 focus:border-ambar-400 focus:outline-none focus:ring-1 focus:ring-ambar-400 shadow-elevated"
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

        {/* Abas de Categoria */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map(({ id, label, icon: Icon }) => {
            const isSelected = selectedCategory === id;
            return (
              <button
                key={id}
                onClick={() => setSelectedCategory(id)}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  isSelected
                    ? "bg-ambar-500 text-floresta-950 shadow-solar scale-105"
                    : "bg-floresta-900/60 border border-ambar-500/20 text-areia-300 hover:border-ambar-500/40 hover:text-areia-100"
                }`}
              >
                <Icon className={`h-4 w-4 ${isSelected ? "text-floresta-950" : "text-ambar-400"}`} />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          LISTAGEM PRINCIPAL DE DOSSIÊS CIENTÍFICOS
          ═══════════════════════════════════════════ */}
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-ambar-500/15 pb-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-ambar-400" />
            <h3 className="font-serif text-lg sm:text-xl font-bold text-areia-100">
              Dossiês e Compêndios de Estudo ({filteredStudies.length})
            </h3>
          </div>
          <span className="text-xs text-areia-400 font-mono">
            Documentação Técnica & Antropológica
          </span>
        </div>

        {filteredStudies.length === 0 ? (
          <div className="card-elevated rounded-2xl p-12 text-center space-y-4">
            <HelpCircle className="h-12 w-12 text-ambar-400/50 mx-auto" />
            <h4 className="font-serif text-lg font-semibold text-areia-200">
              Nenhum estudo encontrado para o termo &ldquo;{searchTerm}&rdquo;
            </h4>
            <p className="text-xs text-areia-400 max-w-md mx-auto">
              Tente buscar por termos fitoquímicos como &ldquo;Tucunacá&rdquo;, &ldquo;Nicotiana&rdquo;, &ldquo;CONAD&rdquo; ou selecione outra categoria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredStudies.map((estudo) => (
              <article
                key={estudo.id}
                className="card-elevated rounded-3xl p-7 sm:p-8 space-y-6 border-ambar-500/25 bg-gradient-to-br from-floresta-900/90 via-floresta-950 to-floresta-900/70 hover:border-ambar-500/45 transition-all duration-300 shadow-elevated flex flex-col justify-between"
              >
                {/* Cabeçalho do Estudo */}
                <div className="space-y-3.5">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ambar-500/15 pb-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-ambar-300 bg-ambar-500/15 border border-ambar-500/30 px-2.5 py-0.5 rounded-full">
                      {estudo.categoriaLabel}
                    </span>
                    <div className="flex items-center gap-3 text-[11px] text-areia-400 font-mono">
                      <span>Ano: {estudo.ano}</span>
                      <span>•</span>
                      <span>PDF: {estudo.pdfTamanho}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-serif text-xl sm:text-2xl font-bold text-areia-100 leading-snug">
                      {estudo.titulo}
                    </h4>
                    <p className="text-xs sm:text-sm text-ambar-300/90 font-light mt-1">
                      {estudo.subtitulo}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
                    {estudo.resumo}
                  </p>

                  {/* Principais Descobertas / Destaques Fitoquímicos */}
                  <div className="rounded-xl p-4 bg-floresta-950/80 border border-ambar-500/15 space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-ambar-400 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" />
                      Destaques Científicos & Farmacológicos:
                    </span>
                    <ul className="space-y-1.5 text-xs text-areia-300 font-light">
                      {estudo.principaisDescobertas.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-ambar-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Fontes e Referências Acadêmicas */}
                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] font-mono text-areia-400 uppercase tracking-wider block">
                      Fontes & Academias Citadas:
                    </span>
                    <p className="text-[11px] text-areia-400/90 font-light leading-relaxed italic">
                      {estudo.referenciasAcademicas.slice(0, 2).join(" • ")}
                    </p>
                  </div>
                </div>

                {/* Ações do Estudo */}
                <div className="pt-4 border-t border-ambar-500/15 flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => setReadingStudy(estudo)}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl bg-floresta-800 hover:bg-floresta-700 text-areia-100 px-4 py-2.5 text-xs font-semibold border border-ambar-500/30 transition-colors"
                  >
                    <BookOpen className="h-3.5 w-3.5 text-ambar-400" />
                    <span>Ler Estudo Online</span>
                  </button>

                  <button
                    onClick={() => setActivePdfModal(`/documentos/${estudo.pdfArquivo}`)}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl bg-ambar-500/15 hover:bg-ambar-500/25 text-ambar-300 px-4 py-2.5 text-xs font-semibold border border-ambar-500/30 transition-colors"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>Visualizar PDF</span>
                  </button>

                  <a
                    href={`/documentos/${estudo.pdfArquivo}`}
                    download
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl bg-floresta-950 hover:bg-floresta-900 text-areia-300 hover:text-areia-100 px-4 py-2.5 text-xs font-semibold border border-ambar-500/20 transition-colors"
                    title="Baixar arquivo PDF completo"
                  >
                    <Download className="h-3.5 w-3.5 text-ambar-400" />
                    <span>Baixar</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════
          ÁREA DO NOTEBOOKLM — PESQUISA & ANEXOS
          ═══════════════════════════════════════════ */}
      <section className="rounded-3xl border-2 border-ambar-500/30 bg-gradient-to-br from-floresta-900 via-floresta-950 to-floresta-900 p-8 sm:p-12 space-y-8 shadow-solar relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-radial-ambar pointer-events-none" />

        <div className="max-w-3xl space-y-3 relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-ambar-500/15 border border-ambar-500/30 px-3.5 py-1 text-[11px] font-semibold text-ambar-300 uppercase tracking-widest">
            <Bot className="h-4 w-4 text-ambar-400" />
            <span>Google NotebookLM • Síntese de Pesquisa com IA</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-areia-100">
            Cadernos de Pesquisa & Fontes no NotebookLM
          </h3>

          <p className="text-sm text-areia-300 leading-relaxed font-light">
            Conforme mencionado pelos guardiões, todos os nossos acervos fitoquímicos, legislações, notas etnobotânicas e laudos podem ser explorados através de cadernos interativos do <strong>Google NotebookLM</strong>. Essa tecnologia permite aos pesquisadores e dirigentes fazer perguntas diretas sobre dosagens, compatibilidades, cromatografias e normas jurídicas com citação exata das fontes.
          </p>
        </div>

        {/* Cadernos Padrão do NotebookLM */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative">
          {[
            {
              titulo: "NotebookLM: Ayahuasca & Fitoquímica",
              desc: "Síntese dos estudos com Cipó Tucunacá, alcaloides beta-carbolínicos e inibição da MAO-A.",
              tag: "Ayahuasca",
              url: "https://notebooklm.google.com/",
            },
            {
              titulo: "NotebookLM: Rapés & Alquimia do Sopro",
              desc: "Análise fitoquímica das 15 essências, tamponamento por cinzas de Tsunu e termodinâmica.",
              tag: "Rapés",
              url: "https://notebooklm.google.com/",
            },
            {
              titulo: "NotebookLM: Marco Legal & CONAD 01/2010",
              desc: "Blindagem jurídica, jurisprudência do Art. 5º da CF/88 e Deontologia das congregações.",
              tag: "Compliance",
              url: "https://notebooklm.google.com/",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl p-6 bg-floresta-950/80 border border-ambar-500/20 flex flex-col justify-between space-y-4 hover:border-ambar-500/40 transition-colors"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-ambar-400 uppercase tracking-wider bg-floresta-900 px-2 py-0.5 rounded border border-ambar-500/20">
                  {item.tag}
                </span>
                <h4 className="font-serif text-base font-bold text-areia-100">
                  {item.titulo}
                </h4>
                <p className="text-xs text-areia-300 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>

              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-ambar-400 hover:text-ambar-300 transition-colors pt-2 border-t border-ambar-500/10"
              >
                <span>Acessar no NotebookLM</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          ))}
        </div>

        {/* Adicionar Link Personalizado do NotebookLM */}
        <div className="rounded-2xl p-6 bg-floresta-950/90 border border-ambar-500/25 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-ambar-400" />
            <h4 className="font-serif text-sm sm:text-base font-bold text-areia-100">
              Anexar Caderno de Pesquisa do NotebookLM
            </h4>
          </div>
          <p className="text-xs text-areia-400 font-light">
            Cole aqui o link do seu caderno de estudos gerado no NotebookLM para deixá-lo acessível neste portal durante suas consultas litúrgicas.
          </p>

          <form onSubmit={handleSaveNotebook} className="flex flex-col sm:flex-row gap-3">
            <input
              type="url"
              value={customNotebookUrl}
              onChange={(e) => setCustomNotebookUrl(e.target.value)}
              placeholder="https://notebooklm.google.com/notebook/..."
              className="flex-1 rounded-xl border border-ambar-500/30 bg-floresta-900 px-4 py-2.5 text-xs sm:text-sm text-areia-100 placeholder-areia-400/40 focus:border-ambar-400 focus:outline-none"
            />
            <button
              type="submit"
              className="btn-primary text-xs font-semibold px-5 py-2.5 shrink-0"
            >
              Anexar Caderno
            </button>
          </form>

          {savedNotebooks.length > 0 && (
            <div className="pt-2 space-y-2">
              <span className="text-[11px] font-mono text-ambar-400 uppercase tracking-wider">
                Seus Cadernos Anexados:
              </span>
              <ul className="space-y-1.5">
                {savedNotebooks.map((link, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between gap-3 text-xs text-areia-200 bg-floresta-900/60 p-2.5 rounded-lg border border-ambar-500/15"
                  >
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate text-ambar-300 hover:underline flex items-center gap-1.5"
                    >
                      <ExternalLink className="h-3 w-3 shrink-0" />
                      <span className="truncate">{link}</span>
                    </a>
                    <button
                      onClick={() => handleRemoveNotebook(idx)}
                      className="text-red-400 hover:text-red-300 text-xs px-2 py-0.5 rounded hover:bg-red-950/40"
                    >
                      Remover
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TABELA GERAL DE TODOS OS 16 PDFs LOCAIS
          ═══════════════════════════════════════════ */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-ambar-500/15 pb-4">
          <div className="flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-ambar-400" />
            <h3 className="font-serif text-lg sm:text-xl font-bold text-areia-100">
              Acervo Completo de Documentos & PDFs Oficiais ({todosDocumentosPdf.length})
            </h3>
          </div>
          <span className="text-xs text-areia-400 font-mono">
            Repositório Oficial em /public/documentos
          </span>
        </div>

        <div className="rounded-2xl border border-ambar-500/20 bg-floresta-950/70 overflow-hidden shadow-elevated">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-ambar-500/20 bg-floresta-900/80 text-[11px] font-mono text-ambar-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">Documento Oficial</th>
                  <th className="py-3.5 px-4 hidden sm:table-cell">Categoria</th>
                  <th className="py-3.5 px-4">Tamanho</th>
                  <th className="py-3.5 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ambar-500/10 text-areia-300">
                {todosDocumentosPdf.map((doc, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-floresta-900/40 transition-colors"
                  >
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-ambar-400/80 shrink-0" />
                        <div>
                          <span className="font-semibold text-areia-100 block">
                            {doc.nome}
                          </span>
                          <span className="text-[10px] text-areia-400 font-mono">
                            {doc.arquivo}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 hidden sm:table-cell">
                      <span className="text-[10px] font-mono text-ambar-300 bg-floresta-900 px-2 py-0.5 rounded border border-ambar-500/15">
                        {doc.categoria}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-areia-400">
                      {doc.tamanho}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setActivePdfModal(`/documentos/${doc.arquivo}`)}
                          className="inline-flex items-center gap-1 text-[11px] text-ambar-400 hover:text-ambar-300 font-semibold px-2.5 py-1 rounded-lg border border-ambar-500/20 hover:bg-floresta-800 transition-colors"
                        >
                          <Eye className="h-3 w-3" />
                          <span>Ver</span>
                        </button>
                        <a
                          href={`/documentos/${doc.arquivo}`}
                          download
                          className="inline-flex items-center gap-1 text-[11px] text-areia-300 hover:text-areia-100 font-semibold px-2.5 py-1 rounded-lg border border-ambar-500/20 hover:bg-floresta-800 transition-colors"
                        >
                          <Download className="h-3 w-3" />
                          <span>Baixar</span>
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MODAL: VISUALIZADOR DE PDF INTERNO
          ═══════════════════════════════════════════ */}
      {activePdfModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[120] flex items-center justify-center p-2 sm:p-6 bg-floresta-950/90 backdrop-blur-md animate-fade-in"
        >
          <div className="relative w-full max-w-5xl h-[92vh] flex flex-col rounded-2xl border-2 border-ambar-500/40 bg-floresta-950 shadow-solar overflow-hidden">
            {/* Toolbar do Visualizador */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-floresta-900 border-b border-ambar-500/20">
              <div className="flex items-center gap-2 truncate pr-4">
                <FileText className="h-4 w-4 text-ambar-400 shrink-0" />
                <span className="font-serif text-xs sm:text-sm font-semibold text-areia-100 truncate">
                  Visualizador de Documento Oficial Nativaram Brasil
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={activePdfModal}
                  download
                  className="inline-flex items-center gap-1.5 rounded-lg bg-ambar-500/15 text-ambar-300 px-3 py-1 text-xs font-semibold hover:bg-ambar-500/30 transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Baixar PDF</span>
                </a>
                <a
                  href={activePdfModal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-floresta-800 text-areia-200 px-3 py-1 text-xs font-semibold hover:bg-floresta-700 transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Nova Aba</span>
                </a>
                <button
                  onClick={() => setActivePdfModal(null)}
                  className="p-1 rounded-lg text-areia-400 hover:text-areia-100 hover:bg-floresta-800 transition-colors"
                  aria-label="Fechar visualizador"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Container do Iframe / PDF */}
            <div className="flex-1 bg-pedra-900 relative">
              <iframe
                src={activePdfModal}
                className="w-full h-full border-none"
                title="Documento PDF"
              />
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          MODAL: LEITOR ETNOBOTÂNICO DIGITAL COMPLETO
          ═══════════════════════════════════════════ */}
      {readingStudy && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-floresta-950/90 backdrop-blur-md animate-fade-in overflow-y-auto"
        >
          <div className="relative w-full max-w-3xl my-auto max-h-[92vh] flex flex-col rounded-3xl border-2 border-ambar-500/40 bg-gradient-to-b from-[#FAF7F0] via-[#F4ECE1] to-[#E9DFCB] text-pedra-900 shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_40px_rgba(212,163,89,0.35)] overflow-hidden">
            {/* Header do Leitor */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-amber-600/20 bg-amber-500/10">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-amber-700" />
                <span className="font-serif text-xs font-bold uppercase tracking-wider text-amber-900">
                  Leitor Etnobotânico Digital
                </span>
              </div>
              <button
                onClick={() => setReadingStudy(null)}
                className="p-1 rounded-full text-pedra-700 hover:text-pedra-950 hover:bg-amber-600/10 transition-colors"
                aria-label="Fechar leitor"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Corpo do Artigo / Capítulos */}
            <div className="p-6 sm:p-10 overflow-y-auto space-y-6 text-left">
              <div className="space-y-2 border-b border-amber-600/20 pb-5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-800 bg-amber-600/15 px-2.5 py-0.5 rounded-full">
                  {readingStudy.categoriaLabel} • {readingStudy.ano}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-floresta-950">
                  {readingStudy.titulo}
                </h3>
                <p className="text-xs sm:text-sm text-amber-900 font-light italic">
                  {readingStudy.subtitulo}
                </p>
                <p className="text-[11px] text-pedra-600 font-mono pt-1">
                  Fonte: {readingStudy.autorOuFonte}
                </p>
              </div>

              {/* Resumo do Estudo */}
              <div className="p-4 rounded-xl bg-amber-600/[0.08] border border-amber-600/20 space-y-2">
                <h5 className="font-serif text-xs font-bold uppercase tracking-wider text-amber-950">
                  Resumo Executivo
                </h5>
                <p className="text-xs text-pedra-800 leading-relaxed font-light">
                  {readingStudy.resumo}
                </p>
              </div>

              {/* Capítulos Extensos */}
              <div className="space-y-6">
                {readingStudy.capitulos.map((cap, i) => (
                  <div key={i} className="space-y-2">
                    <h5 className="font-serif text-base font-bold text-floresta-950 border-l-2 border-amber-600 pl-3">
                      {cap.titulo}
                    </h5>
                    <p className="text-xs sm:text-sm text-pedra-800 leading-relaxed font-light pl-3">
                      {cap.conteudo}
                    </p>
                  </div>
                ))}
              </div>

              {/* Principais Descobertas */}
              <div className="p-5 rounded-xl bg-amber-600/[0.06] border border-amber-600/20 space-y-2.5">
                <h5 className="font-serif text-xs font-bold uppercase tracking-wider text-amber-950">
                  Síntese Fitoquímica & Descobertas
                </h5>
                <ul className="space-y-2 text-xs text-pedra-800 font-light">
                  {readingStudy.principaisDescobertas.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Referências Bibliográficas */}
              <div className="space-y-1.5 pt-2 border-t border-amber-600/20">
                <h5 className="font-serif text-[11px] font-bold uppercase tracking-wider text-amber-950">
                  Referências Acadêmicas & Fontes Primárias
                </h5>
                <ul className="space-y-1 text-[11px] text-pedra-700 font-light italic">
                  {readingStudy.referenciasAcademicas.map((ref, idx) => (
                    <li key={idx}>• {ref}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer do Leitor */}
            <div className="px-6 py-4 bg-amber-600/10 border-t border-amber-600/20 flex items-center justify-between">
              <span className="text-[11px] font-mono text-pedra-600">
                Documento Oficial da Cooperativa Nativaram Brasil
              </span>
              <a
                href={`/documentos/${readingStudy.pdfArquivo}`}
                download
                className="inline-flex items-center gap-2 rounded-xl bg-floresta-800 hover:bg-floresta-900 text-areia-100 px-4 py-2 text-xs font-semibold transition-colors"
              >
                <Download className="h-3.5 w-3.5 text-ambar-400" />
                <span>Baixar PDF Completo</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

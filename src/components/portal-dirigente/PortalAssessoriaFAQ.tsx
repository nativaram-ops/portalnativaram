"use client";

import React, { useState, useMemo } from "react";
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Search,
  Sparkles,
  ShieldCheck,
  Flame,
  Scale,
  TreePine,
  Clock,
} from "lucide-react";
import { FAQ_DIRIGENTE, FaqDirigenteItem } from "@/data/portal-assessoria";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const PortalAssessoriaFAQ: React.FC = () => {
  const [busca, setBusca] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>("TODAS");
  const [openIdx, setOpenIdx] = useState<string | null>("faq-1");

  const faqsFiltrados = useMemo(() => {
    return FAQ_DIRIGENTE.filter((item) => {
      const matchBusca =
        item.pergunta.toLowerCase().includes(busca.toLowerCase()) ||
        item.resposta.toLowerCase().includes(busca.toLowerCase()) ||
        (item.destaqueConselho && item.destaqueConselho.toLowerCase().includes(busca.toLowerCase()));

      const matchCategoria =
        categoriaAtiva === "TODAS" || item.categoria === categoriaAtiva;

      return matchBusca && matchCategoria;
    });
  }, [busca, categoriaAtiva]);

  const toggleFaq = (id: string) => {
    setOpenIdx(openIdx === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho da Assessoria FAQ */}
      <div className="p-5 rounded-2xl bg-floresta-950/80 border border-ambar-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-ambar-400" />
            <span className="font-serif text-base font-bold text-areia-100">
              Perguntas Frequentes &amp; Assessoria Institucional do Dirigente
            </span>
          </div>
          <p className="text-xs text-areia-300 font-light max-w-2xl leading-relaxed">
            Respostas práticas fundamentadas pelo Conselho Guardião sobre guarda de sacramentos, calibração de doses, conduta em rituais e amparo jurídico em fiscalizações.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-ambar-400/90 font-mono bg-floresta-900/80 px-3 py-1.5 rounded-xl border border-ambar-500/20 shrink-0">
          <ShieldCheck className="h-4 w-4 text-amber-400" />
          <span>Suporte Deontológico CONAD</span>
        </div>
      </div>

      {/* Barra de Busca e Filtros por Categoria */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Campo de Busca */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-areia-400" />
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Pesquisar dúvida (ex: armazenar, menor de idade, pressão alta, fiscalização policial)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-floresta-900/60 border border-ambar-500/20 text-xs text-areia-100 placeholder-areia-400/60 focus:outline-none focus:border-ambar-500/50"
          />
        </div>

        {/* Filtros por Categoria */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: "TODAS", label: "Todas as Dúvidas" },
            { id: "CONSERVACAO", label: "Conservação & Guarda" },
            { id: "DOSAGENS", label: "Dosagens & 2ª Dose" },
            { id: "CONDUCAO_RITUAL", label: "Condução & Purgas" },
            { id: "JURIDICO_CONAD", label: "Jurídico & Fiscalizações" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoriaAtiva(cat.id)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                categoriaAtiva === cat.id
                  ? "bg-ambar-500 text-floresta-950 font-bold shadow"
                  : "bg-floresta-900/40 text-areia-300 hover:bg-floresta-800/50 border border-ambar-500/10"
              }`}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Perguntas e Respostas (Acordeões) */}
      <div className="space-y-3">
        {faqsFiltrados.map((item) => {
          const isOpen = openIdx === item.id;

          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isOpen
                  ? "border-ambar-500/40 bg-floresta-950/95 shadow-elevated-sm"
                  : "border-ambar-500/15 bg-floresta-950/70 hover:border-ambar-500/30"
              }`}
            >
              <button
                onClick={() => toggleFaq(item.id)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-ambar-400/90 bg-floresta-900 px-2 py-0.5 rounded border border-ambar-500/20">
                      {item.categoria === "CONSERVACAO" && "Conservação"}
                      {item.categoria === "DOSAGENS" && "Dosagens"}
                      {item.categoria === "CONDUCAO_RITUAL" && "Condução"}
                      {item.categoria === "JURIDICO_CONAD" && "Marco Legal CONAD"}
                    </span>
                  </div>
                  <h3 className="font-serif text-sm sm:text-base font-bold text-areia-100">
                    {item.pergunta}
                  </h3>
                </div>

                <div className="p-1 rounded-lg bg-floresta-900/80 border border-ambar-500/20 text-ambar-400 shrink-0">
                  {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-areia-300 font-light leading-relaxed border-t border-ambar-500/10 space-y-3 animate-fade-in">
                  <p>{item.resposta}</p>

                  {item.destaqueConselho && (
                    <div className="p-3 rounded-xl bg-floresta-900/60 border border-ambar-500/20 text-[11px] text-amber-200/90 flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-ambar-400 shrink-0 mt-0.5" />
                      <span>{item.destaqueConselho}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {faqsFiltrados.length === 0 && (
          <div className="text-center py-10 text-areia-400 text-xs">
            Nenhuma pergunta localizada com o termo &quot;{busca}&quot;. Entre em contato com o Conselho Gestor para suporte personalizado.
          </div>
        )}
      </div>
    </div>
  );
};

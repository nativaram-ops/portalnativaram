import React from "react";
import type { Metadata } from "next";
import { GraduationCap } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { EstudosClient } from "@/components/estudos/EstudosClient";

export const metadata: Metadata = {
  title: "Estudos Etnobotânicos & Dossiês Científicos | Nativaram Brasil",
  description:
    "Biblioteca etnobotânica, laudos fitoquímicos e compêndios científicos da Cooperativa Nativaram Brasil: Ayahuasca, Rapés Sagrados, Sananga, Cadernos NotebookLM e Governança CONAD 01/2010.",
  openGraph: {
    title: "Estudos Etnobotânicos & Dossiês Científicos | Nativaram Brasil",
    description:
      "Acesso aos PDFs oficiais de pesquisa fitoquímica da Ayahuasca, farmacologia dos rapés tradicionais e compliance litúrgico.",
    url: "https://nativaramcoop.eco.br/estudos",
  },
};

export default function EstudosPage() {
  return (
    <div className="space-y-0">
      {/* ═══════════════════════════════════════════
          HERO — Estudos Etnobotânicos & Dossiês
          ═══════════════════════════════════════════ */}
      <PageHero
        badgeIcon={<GraduationCap className="h-3.5 w-3.5" />}
        badgeText="Etnociência & Base de Conhecimento Oficial"
        maxWidth="max-w-4xl"
        title={
          <>
            Estudos Científicos,{" "}
            <span className="text-gradient-solar">Fitoquímica</span>
            <br />
            & Dossiês da Floresta
          </>
        }
        description="Acervo aberto de pesquisas botânicas puristas, fitoquímica da Ayahuasca, biogeoquímica do rapé sagrado, farmacologia da Sananga e cadernos de inteligência etnobotânica com Google NotebookLM."
      />

      <SectionDivider variant="solar" />

      {/* ═══════════════════════════════════════════
          CONTEÚDO PRINCIPAL (FILTROS, DOSSIÊS, PDFs)
          ═══════════════════════════════════════════ */}
      <section className="py-section-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <EstudosClient />
        </div>
      </section>
    </div>
  );
}

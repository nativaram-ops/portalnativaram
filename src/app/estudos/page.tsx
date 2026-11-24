import React from "react";
import type { Metadata } from "next";
import { GraduationCap } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { EstudosClient } from "@/components/estudos/EstudosClient";

export const metadata: Metadata = {
  title: "Estudos Etnobotânicos & Observatório Acadêmico | Cooperativa Nativaram",
  description:
    "Biblioteca aberta de documentos culturais e históricos e observatório de estudos acadêmicos revisados por pares sobre etnobotânica e a Resolução CONAD nº 1/2010. Conteúdo de referência, não é indicação de uso.",
  openGraph: {
    title: "Estudos Etnobotânicos & Observatório Acadêmico | Cooperativa Nativaram",
    description:
      "Biblioteca de documentos, estudos acadêmicos com DOI e cadernos de pesquisa etnobotânica. Conteúdo de referência, não é indicação de uso.",
    url: "https://nativaramcoop.eco.br/estudos",
  },
};

export default function EstudosPage() {
  return (
    <div className="space-y-0">
      {/* ═══════════════════════════════════════════
          HERO — Estudos Etnobotânicos & Observatório
          ═══════════════════════════════════════════ */}
      <PageHero
        badgeIcon={<GraduationCap className="h-3.5 w-3.5" />}
        badgeText="Etnociência, Documentos & Pesquisa"
        maxWidth="max-w-4xl"
        title={
          <>
            Estudos{" "}
            <span className="text-gradient-solar">Etnobotânicos</span>
            <br />
            & Observatório Acadêmico
          </>
        }
        description="Biblioteca aberta de documentos culturais, históricos e regulatórios, observatório de estudos acadêmicos revisados por pares e cadernos de pesquisa no Google NotebookLM."
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

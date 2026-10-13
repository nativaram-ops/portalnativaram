import React from "react";
import type { Metadata } from "next";
import { GraduationCap } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { EstudosClient } from "@/components/estudos/EstudosClient";

export const metadata: Metadata = {
  title: "Estudos Etnobotânicos & Mural da Comunidade | Cooperativa Nativaram",
  description:
    "Mural colaborativo de congregações credenciadas, relatos doutrinários, fotos de altares sagrados, laudos fitoquímicos da Ayahuasca e compêndios científicos sob o marco CONAD 01/2010.",
  openGraph: {
    title: "Estudos Etnobotânicos & Mural da Comunidade | Cooperativa Nativaram",
    description:
      "Vozes das congregações homologadas, laudos HPLC de Ayahuasca Tucunacá, fitoquímica de rapés e cadernos de inteligência etnobotânica.",
    url: "https://nativaramcoop.eco.br/estudos",
  },
};

export default function EstudosPage() {
  return (
    <div className="space-y-0">
      {/* ═══════════════════════════════════════════
          HERO — Estudos Etnobotânicos & Comunidade
          ═══════════════════════════════════════════ */}
      <PageHero
        badgeIcon={<GraduationCap className="h-3.5 w-3.5" />}
        badgeText="Etnociência, Dossiês & Vozes dos Templos"
        maxWidth="max-w-4xl"
        title={
          <>
            Estudos Científicos,{" "}
            <span className="text-gradient-solar">Mural Litúrgico</span>
            <br />
            & Vozes da Floresta
          </>
        }
        description="Mural colaborativo de congregações homologadas, agenda de ritos, relatos de consagração e acervo aberto de fitoquímica purista, HPLC da Ayahuasca e inteligência com Google NotebookLM."
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

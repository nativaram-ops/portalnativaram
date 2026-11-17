import React from "react";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeAudienciaCaminhos } from "@/components/home/HomeAudienciaCaminhos";
import { HomePilaresBar } from "@/components/home/HomePilaresBar";
import { HomeJornadaFunil } from "@/components/home/HomeJornadaFunil";
import { HomeCompromissoSagrado } from "@/components/home/HomeCompromissoSagrado";
import { HomeDepoimentosCredenciamento } from "@/components/home/HomeDepoimentosCredenciamento";
import { HomeFaqSection } from "@/components/home/HomeFaqSection";

export default function HomePage() {
  return (
    <div className="space-y-0">
      {/* Hero — Identidade Cooperativa & Salvaguarda Litúrgica */}
      <HomeHero />

      {/* Triagem Direta dos 3 Públicos (Visitante, Instituição CNPJ, Grupo s/ CNPJ) */}
      <HomeAudienciaCaminhos />

      {/* Barra de Pilares Sagrados */}
      <HomePilaresBar />

      {/* O Caminho Didático da Salvaguarda — 5 Estações do Funil */}
      <HomeJornadaFunil />

      <SectionDivider variant="solar" />

      {/* Compromisso Litúrgico & Conformidade Unificada */}
      <HomeCompromissoSagrado />

      <SectionDivider variant="floresta" />

      {/* Depoimentos de Guardiões e Credenciamento */}
      <HomeDepoimentosCredenciamento />

      <SectionDivider variant="floresta" />

      {/* FAQ Interativo e Teaser do Portal do Dirigente */}
      <HomeFaqSection />
    </div>
  );
}

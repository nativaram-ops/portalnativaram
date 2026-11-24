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
      {/* Hero — Identidade do projeto (em constituição) */}
      <HomeHero />

      {/* Triagem dos 3 Públicos (Primeira visita, Entidade constituída, Grupo em formação) */}
      <HomeAudienciaCaminhos />

      {/* Barra de Pilares Sagrados */}
      <HomePilaresBar />

      {/* O Caminho Didático da Salvaguarda — 5 Estações do Funil */}
      <HomeJornadaFunil />

      <SectionDivider variant="solar" />

      {/* Compromisso Litúrgico & Conformidade Unificada */}
      <HomeCompromissoSagrado />

      <SectionDivider variant="floresta" />

      {/* Quem pode dialogar com o projeto (sem cadastro) */}
      <HomeDepoimentosCredenciamento />

      <SectionDivider variant="floresta" />

      {/* FAQ e chamada para a Central de Recursos */}
      <HomeFaqSection />
    </div>
  );
}

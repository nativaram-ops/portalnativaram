import React from "react";
import { SectionDivider } from "@/components/ui/SectionDivider";
import {
  HomeHero,
  HomePilaresBar,
  HomeJornadaFunil,
  HomeCompromissoSagrado,
  HomeDepoimentosCredenciamento,
  HomeFaqSection,
} from "@/components/home";

export default function HomePage() {
  return (
    <div className="space-y-0">
      {/* Hero — O Portal Sagrado & Apoio Litúrgico */}
      <HomeHero />

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

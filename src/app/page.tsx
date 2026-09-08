import React from "react";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { HomeHero } from "@/components/home/HomeHero";
import { HomePilaresBar } from "@/components/home/HomePilaresBar";
import { HomeNotaSemantica } from "@/components/home/HomeNotaSemantica";
import { HomeNotaSacralidade } from "@/components/home/HomeNotaSacralidade";
import { HomePrincipiosFeitio } from "@/components/home/HomePrincipiosFeitio";
import { HomePonteEtica } from "@/components/home/HomePonteEtica";
import { HomeGraduacoes } from "@/components/home/HomeGraduacoes";
import { HomeLogisticaGollog } from "@/components/home/HomeLogisticaGollog";
import { HomeDepoimentosCredenciamento } from "@/components/home/HomeDepoimentosCredenciamento";
import { HomeFaqSection } from "@/components/home/HomeFaqSection";

export default function HomePage() {
  return (
    <div className="space-y-0">
      {/* Hero — O Portal Sagrado & Apoio Litúrgico */}
      <HomeHero />

      {/* Barra de Pilares Sagrados */}
      <HomePilaresBar />

      {/* Nota de Semântica da Salvaguarda & Regras Vigentes */}
      <HomeNotaSemantica />

      {/* Nota de Responsabilidade e Sacralidade */}
      <HomeNotaSacralidade />

      <SectionDivider variant="solar" />

      {/* Princípios do Nosso Feitio & Origem do Estudo */}
      <HomePrincipiosFeitio />

      <SectionDivider variant="floresta" />

      {/* A Ponte Ética entre o Acre e o seu Templo */}
      <HomePonteEtica />

      <SectionDivider variant="solar" />

      {/* Compreensão Técnica e Concentração (Graduações) */}
      <HomeGraduacoes />

      <SectionDivider variant="minimal" />

      {/* Logística Aérea Gollog & Conformidade Regulatória */}
      <HomeLogisticaGollog />

      <SectionDivider variant="minimal" />

      {/* Depoimentos de Guardiões e Credenciamento */}
      <HomeDepoimentosCredenciamento />

      <SectionDivider variant="floresta" />

      {/* FAQ Interativo e Teaser do Portal do Dirigente */}
      <HomeFaqSection />
    </div>
  );
}

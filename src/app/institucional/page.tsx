import React from "react";
import type { Metadata } from "next";
import { ManifestoLanding } from "@/components/manifesto/ManifestoLanding";
import { JornadaNavTracker, JornadaNextStep } from "@/components/funil";

export const metadata: Metadata = {
  title: "O Manifesto, Quem Somos & Vocação Cooperativa | Cooperativa Nativaram",
  description:
    "A gênese dos Nascidos do Raio de Sol, a Alquimia entre Dois Mundos e a Etnociência da Floresta. Conheça a história, missão, visão e valores da Cooperativa Etnobotânica Nativaram.",
  openGraph: {
    title: "O Manifesto, Quem Somos & Doutrina | Cooperativa Nativaram",
    description:
      "Nascidos do Raio de Sol — A Alquimia entre Dois Mundos, Valores Institucionais e Salvaguarda Ancestral da Cooperativa Nativaram.",
    images: [
      {
        url: "/assets/manifesto/nascidos-raio-de-sol.jpg",
        width: 1200,
        height: 675,
        alt: "Nascidos do Raio de Sol — Altar Sagrado na Floresta Amazônica",
      },
    ],
  },
};

export default function InstitucionalPage() {
  return (
    <div className="space-y-0">
      {/* Indicador Superior do Caminho Didático */}
      <JornadaNavTracker etapaAtual={1} />

      {/* Conteúdo Institucional & Manifesto */}
      <ManifestoLanding />

      {/* Transição Fluida para a Próxima Etapa: Feitio Purista */}
      <JornadaNextStep
        etapaAtual={1}
        tituloEtapaAtual="Origem & Vocação Cooperativa"
        proximaEtapaNumero={2}
        proximaEtapaTitulo="A Sagrada Alquimia do Feitio Purista"
        proximaEtapaDescricao="Agora que você compreendeu nossa gênese e compromisso sagrado, conheça o rigor artesanal do preparo no Acre: biomassa 60/40, menores micras e recusa de anayahuascas."
        proximaEtapaHref="/feitio"
        textoBotao="Avançar para o Feitio Purista (Etapa 2/5)"
      />
    </div>
  );
}

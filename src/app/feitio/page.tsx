import React from "react";
import type { Metadata } from "next";
import { FeitioLanding } from "@/components/feitio/FeitioLanding";
import { JornadaNavTracker } from "@/components/funil/JornadaNavTracker";
import { JornadaNextStep } from "@/components/funil/JornadaNextStep";

export const metadata: Metadata = {
  title: "A Sagrada Alquimia do Feitio Tradicional & Cosmovisão da Ayahuasca | Cooperativa Nativaram",
  description:
    "Registro documental do feitio tradicional da Ayahuasca em Cruzeiro do Sul/AC. A cosmovisão das etnias, doutrinas tradicionais, alquimia fitoquímica e nota de transparência de manejo florestal. Conteúdo cultural da Cooperativa Nativaram.",
  openGraph: {
    title: "A Sagrada Alquimia do Feitio Tradicional & Cosmovisão | Cooperativa Nativaram",
    description:
      "O feitio tradicional da Ayahuasca: cipó e folha, água de nascente, quebração em madeira e vigília no fogo sagrado em Cruzeiro do Sul, Acre.",
    images: [
      {
        url: "/assets/feitio/curadas/feitio-noturno-caldeiroes.jpg",
        width: 1200,
        height: 675,
        alt: "Vigília noturna em uma casa de feitio em Cruzeiro do Sul, Acre",
      },
    ],
  },
};

export default function FeitioPage() {
  return (
    <div className="space-y-0">
      {/* Indicador Superior do Caminho Didático */}
      <JornadaNavTracker etapaAtual={2} />

      {/* Conteúdo Completo da Casa de Feitio */}
      <FeitioLanding />

      {/* Transição Fluida para a Próxima Etapa: Compêndio de Sacramentos */}
      <JornadaNextStep
        etapaAtual={2}
        tituloEtapaAtual="Feitio Tradicional & Alquimia Vegetal"
        proximaEtapaNumero={3}
        proximaEtapaTitulo="O Acervo Etnobotânico"
        proximaEtapaDescricao="Conheça o acervo cultural sobre a ayahuasca nas tradições ayahuasqueiras brasileiras e o rapé na tradição dos povos da floresta. Conteúdo cultural. Não é oferta."
        proximaEtapaHref="/sacramentos"
        textoBotao="Ver o Acervo Etnobotânico (Etapa 3/5)"
      />
    </div>
  );
}

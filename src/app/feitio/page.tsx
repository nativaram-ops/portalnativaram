import React from "react";
import type { Metadata } from "next";
import { FeitioLanding } from "@/components/feitio/FeitioLanding";
import { JornadaNavTracker, JornadaNextStep } from "@/components/funil";

export const metadata: Metadata = {
  title: "A Sagrada Alquimia do Feitio Purista & Cosmovisão da Ayahuasca | Cooperativa Nativaram",
  description:
    "Registro documental do feitio tradicional da Ayahuasca em Cruzeiro do Sul/AC. A cosmovisão das etnias, doutrinas tradicionais, alquimia fitoquímica, graduações sagradas e nota de transparência de manejo florestal da Cooperativa Nativaram.",
  openGraph: {
    title: "A Sagrada Alquimia do Feitio Purista & Cosmovisão | Cooperativa Nativaram",
    description:
      "A melhor alquimia para preparar a Ayahuasca: proporção de biomassa, água pura de nascente, quebração em madeira e vigília no fogo sagrado em Cruzeiro do Sul, Acre.",
    images: [
      {
        url: "/assets/feitio/curadas/feitio-noturno-caldeiroes.jpg",
        width: 1200,
        height: 675,
        alt: "Vigília noturna na Casa de Feitio da Cooperativa Nativaram em Cruzeiro do Sul, Acre",
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
        tituloEtapaAtual="Feitio Purista & Alquimia Vegetal"
        proximaEtapaNumero={3}
        proximaEtapaTitulo="O Compêndio de Sacramentos Sagrados"
        proximaEtapaDescricao="Agora que você testemunhou o feitio purista em Cruzeiro do Sul, explore as 4 graduações de Ayahuasca (1.8 a 10.1 Wirapuru), os 15 rapés sagrados tamponados e a Sananga refrigerada."
        proximaEtapaHref="/sacramentos"
        textoBotao="Conhecer os Sacramentos (Etapa 3/5)"
      />
    </div>
  );
}

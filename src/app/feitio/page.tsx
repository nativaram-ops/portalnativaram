import React from "react";
import type { Metadata } from "next";
import { FeitioLanding } from "@/components/feitio/FeitioLanding";

export const metadata: Metadata = {
  title: "A Sagrada Alquimia do Feitio Purista & Cosmovisão da Ayahuasca | Nativaram Brasil",
  description:
    "Registro documental do feitio tradicional da Ayahuasca em Cruzeiro do Sul/AC. A cosmovisão das etnias (Huni Kuin, Yawanawá, Ashaninka), doutrinas (Santo Daime, UDV, Barquinha), alquimia fitoquímica, graduações sagradas e nota de transparência de manejo florestal.",
  openGraph: {
    title: "A Sagrada Alquimia do Feitio Purista & Cosmovisão | Nativaram Brasil",
    description:
      "A melhor alquimia para preparar a Ayahuasca: proporção de biomassa, água pura de nascente, quebração em madeira e vigília no fogo sagrado em Cruzeiro do Sul, Acre.",
    images: [
      {
        url: "/assets/feitio/curadas/feitio-vigilia-noturna-feitor.jpg",
        width: 1200,
        height: 675,
        alt: "Vigília noturna do Feitor Caboclo na Casa de Feitio da Nativaram em Cruzeiro do Sul, Acre",
      },
    ],
  },
};

export default function FeitioPage() {
  return <FeitioLanding />;
}

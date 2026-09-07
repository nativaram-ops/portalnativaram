import React from "react";
import type { Metadata } from "next";
import { ManifestoLanding } from "@/components/manifesto/ManifestoLanding";

export const metadata: Metadata = {
  title: "O Manifesto, Quem Somos & Doutrina | Nativaram Brasil",
  description:
    "A gênese dos Nascidos do Raio de Sol, a Alquimia entre Dois Mundos e a Etnociência da Floresta. Conheça a história, missão, visão e valores da Cooperativa Etnobotânica Nativaram Brasil.",
  openGraph: {
    title: "O Manifesto, Quem Somos & Doutrina | Nativaram Brasil",
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

export default function ManifestoPage() {
  return <ManifestoLanding />;
}

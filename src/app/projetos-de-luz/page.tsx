import React from "react";
import type { Metadata } from "next";
import { ProjetoDeLuzLanding } from "@/components/projetos-de-luz/ProjetoDeLuzLanding";

export const metadata: Metadata = {
  title: "Projetos de Luz — Intenção Socioambiental no Acre | Cooperativa Nativaram",
  description:
    "A intenção socioambiental da Cooperativa Nativaram, projeto de cooperativa em constituição: agrofloresta, cuidado com a fauna e apoio às comunidades da floresta no Vale do Juruá (Acre).",
  openGraph: {
    title: "Projetos de Luz — Intenção Socioambiental | Cooperativa Nativaram",
    description:
      "Agrofloresta, fauna e comunidades da floresta no Vale do Juruá (Acre): intenções em planejamento de um projeto de cooperativa em constituição.",
    url: "https://nativaramcoop.eco.br/projetos-de-luz",
    images: [
      {
        url: "/og-cooperativa-nativaram.jpg",
        width: 1200,
        height: 630,
        alt: "Cooperativa Nativaram — projeto em constituição",
      },
    ],
  },
};

export default function ProjetosDeLuzPage() {
  return <ProjetoDeLuzLanding />;
}

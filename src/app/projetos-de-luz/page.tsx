import React from "react";
import type { Metadata } from "next";
import { ProjetoDeLuzLanding } from "@/components/projetos-de-luz/ProjetoDeLuzLanding";

export const metadata: Metadata = {
  title:
    "Projetos de Luz — Praxeologia Social, Agrofloresta & Refúgio de Fauna no Acre | Cooperativa Nativaram",
  description:
    "Conheça a dimensão socioambiental do cooperativismo da Nativaram: destinação do superávit de rateio para reflorestamento do Vale do Juruá, proteção das Ararajubas e fornecimento litúrgico gratuito para acolhimento de pessoas vulneráveis.",
  openGraph: {
    title:
      "Projetos de Luz — Regeneração da Floresta & Acolhimento Fraterno | Cooperativa Nativaram",
    description:
      "A economia sagrada sem fins lucrativos: como o rateio dos templos financia a preservação da Amazônia e a caridade litúrgica sob a Lei 5.764/71.",
    url: "https://nativaramcoop.eco.br/projetos-de-luz",
    images: [
      {
        url: "/assets/projetos-de-luz/garrafas-ayahuasca-nativaram.jpg",
        width: 1200,
        height: 675,
        alt: "Lote de garrafas de Ayahuasca produzidas artesanalmente pela Cooperativa Nativaram em Cruzeiro do Sul (Acre)",
      },
    ],
  },
};

export default function ProjetosDeLuzPage() {
  return <ProjetoDeLuzLanding />;
}

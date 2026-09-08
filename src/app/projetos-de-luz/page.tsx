import React from "react";
import type { Metadata } from "next";
import { ProjetoDeLuzLanding } from "@/components/projetos-de-luz/ProjetoDeLuzLanding";

export const metadata: Metadata = {
  title:
    "Projeto de Luz — Acessibilidade Logística, Pureza Fitoquímica & Salvaguarda dos Templos | Cooperativa Nativaram",
  description:
    "Conheça o Projeto de Luz da Cooperativa Nativaram: a rede de acessibilidade logística e operacional que garante sacramentos puros, equilíbrio de biomassa, garrafas virgens com assepsia estrita e pleno amparo legal sob a Resolução CONAD nº 01/2010 para casas e templos de todo o país.",
  openGraph: {
    title:
      "Projeto de Luz — Acessibilidade Operacional & Salvaguarda Litúrgica | Cooperativa Nativaram",
    description:
      "A ponte sagrada que rompe a informalidade: pureza botânica rastreada do Acre até o altar da sua congregação com segurança fitoquímica e amparo institucional.",
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

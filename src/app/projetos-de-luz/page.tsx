import React from "react";
import type { Metadata } from "next";
import { ProjetoDeLuzLanding } from "@/components/projetos-de-luz/ProjetoDeLuzLanding";

export const metadata: Metadata = {
  title:
    "Projeto de Luz — Acessibilidade Logística, Pureza Fitoquímica & Salvaguarda dos Templos | Nativaram Brasil",
  description:
    "Conheça o Projeto de Luz da Cooperativa Nativaram Brasil: a rede de acessibilidade logística e operacional que garante sacramentos puros, equilíbrio de biomassa, frascos em vidro âmbar farmacotécnico e pleno amparo legal sob a Resolução CONAD nº 01/2010 para casas e templos de todo o país.",
  openGraph: {
    title:
      "Projeto de Luz — Acessibilidade Operacional & Salvaguarda Litúrgica | Nativaram Brasil",
    description:
      "A ponte sagrada que rompe a informalidade: pureza botânica rastreada do Acre até o altar da sua congregação com segurança fitoquímica e amparo institucional.",
    url: "https://nativaramcoop.eco.br/projetos-de-luz",
    images: [
      {
        url: "/assets/projetos-de-luz/projeto-luz-altar.jpg",
        width: 1200,
        height: 675,
        alt: "Altar cerimonial botânico na Amazônia com frascos em vidro âmbar e artefatos sagrados — Nativaram Brasil",
      },
    ],
  },
};

export default function ProjetosDeLuzPage() {
  return <ProjetoDeLuzLanding />;
}

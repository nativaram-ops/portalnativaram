import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { CentralRecursosClient } from "@/components/layout/CentralRecursosClient";

export const metadata: Metadata = {
  title: "Central de Recursos | Cooperativa Nativaram",
  description:
    "Recursos abertos de segurança e conformidade para entidades religiosas: modelos de documentos, matriz de interações medicamentosas, perguntas frequentes e marco legal (Resolução CONAD nº 1/2010).",
  alternates: { canonical: "/portal-dirigente" },
  openGraph: {
    title: "Central de Recursos | Cooperativa Nativaram",
    description:
      "Modelos de documentos, triagem de segurança e marco legal, abertos ao público. Conteúdo informativo, sem oferta.",
    url: "https://nativaramcoop.eco.br/portal-dirigente",
  },
};

export default function CentralRecursosPage() {
  return (
    <div className="space-y-0">
      <PageHero maxWidth="max-w-4xl">
        <PageHero.Badge icon={<BookOpen className="h-3.5 w-3.5" />} text="Recursos abertos" />
        <PageHero.Title>
          Central de <span className="text-gradient-solar">Recursos</span>
        </PageHero.Title>
        <PageHero.Description>
          Segurança, triagem e conformidade para entidades religiosas que fazem uso ritual da ayahuasca. Conteúdo
          informativo de um projeto de cooperativa em constituição, sem oferta e sem cadastro.
        </PageHero.Description>
      </PageHero>

      <SectionDivider variant="solar" />

      <Section padding="lg" maxWidth="max-w-5xl">
        <CentralRecursosClient />
      </Section>
    </div>
  );
}

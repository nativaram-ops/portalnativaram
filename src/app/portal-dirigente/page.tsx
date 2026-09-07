import type { Metadata } from "next";
import { Lock } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { PortalDirigenteClient } from "@/components/layout/PortalDirigenteClient";

export const metadata: Metadata = {
  title: "Portal do Dirigente Homologado | Nativaram Brasil",
  description:
    "Área restrita para templos homologados. Acompanhe o status das cotas litúrgicas, laudos de conformidade e cadeia de custódia dos sacramentos da Cooperativa Nativaram Brasil.",
  openGraph: {
    title: "Portal do Dirigente | Nativaram Brasil",
    description:
      "Ambiente seguro de gestão litúrgica para dirigentes de templos credenciados.",
    url: "https://nativaramcoop.eco.br/portal-dirigente",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function PortalDirigentePage() {
  return (
    <div className="space-y-0">
      {/* ═══════════════════════════════════════════
          HERO COMPOSTO — VERCEL COMPOSITION PATTERNS
          ═══════════════════════════════════════════ */}
      <PageHero maxWidth="max-w-4xl">
        <PageHero.Badge
          icon={<Lock className="h-3.5 w-3.5" />}
          text="Ambiente Seguro de Gestão Litúrgica"
        />
        <PageHero.Title>
          Portal do Dirigente{" "}
          <span className="text-gradient-solar">Homologado</span>
        </PageHero.Title>
        <PageHero.Description>
          Área restrita aos templos, igrejas e centros ayahuasqueiros previamente cadastrados e aprovados pela Cooperativa Nativaram Brasil.
        </PageHero.Description>
      </PageHero>

      <SectionDivider variant="solar" />

      {/* ═══════════════════════════════════════════
          SESSÃO DE AUTENTICAÇÃO E GESTÃO LITÚRGICA
          ═══════════════════════════════════════════ */}
      <Section padding="lg" maxWidth="max-w-5xl">
        <PortalDirigenteClient />
      </Section>
    </div>
  );
}

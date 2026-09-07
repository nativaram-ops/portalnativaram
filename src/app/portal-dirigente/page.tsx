import type { Metadata } from "next";
import { Lock } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
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
          HERO — Portal do Dirigente
          ═══════════════════════════════════════════ */}
      <PageHero
        badgeIcon={<Lock className="h-3.5 w-3.5" />}
        badgeText="Ambiente Seguro de Gestão Litúrgica"
        maxWidth="max-w-4xl"
        title={
          <>
            Portal do Dirigente{" "}
            <span className="text-gradient-solar">Homologado</span>
          </>
        }
        description="Área restrita aos templos, igrejas e centros ayahuasqueiros previamente cadastrados e aprovados pela Cooperativa Nativaram Brasil."
      />

      <SectionDivider variant="solar" />

      {/* ═══════════════════════════════════════════
          LOGIN OU DASHBOARD
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
          <PortalDirigenteClient />
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { CredenciamentoForm } from "@/components/forms/CredenciamentoForm";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export const metadata: Metadata = {
  title: "Credenciamento Litúrgico Institucional | Nativaram Brasil",
  description:
    "Formulário de credenciamento para templos e entidades religiosas homologadas. Processo de triagem cadastral junto ao conselho de guardiões da Cooperativa Nativaram Brasil.",
  openGraph: {
    title: "Credenciamento Litúrgico | Nativaram Brasil",
    description:
      "Preencha a ficha cadastral para validação da personalidade jurídica do templo e homologação perante o conselho de guardiões.",
    url: "https://nativaramcoop.eco.br/credenciamento",
  },
};

export default function CredenciamentoPage() {
  return (
    <div className="space-y-0">
      {/* ═══════════════════════════════════════════
          HERO — Credenciamento Litúrgico
          ═══════════════════════════════════════════ */}
      <PageHero
        badgeIcon={<ShieldCheck className="h-3.5 w-3.5" />}
        badgeText="Exclusivo para Entidades Religiosas & Templos Constituídos"
        maxWidth="max-w-4xl"
        title={
          <>
            Credenciamento Litúrgico{" "}
            <span className="text-gradient-solar">Institucional</span>
          </>
        }
        description="Preencha a ficha cadastral para validação da personalidade jurídica do templo e homologação perante o conselho de guardiões da cooperativa."
      />

      <SectionDivider variant="solar" />

      {/* ═══════════════════════════════════════════
          FORMULÁRIO
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
          <AnimateOnScroll>
            <CredenciamentoForm />
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}

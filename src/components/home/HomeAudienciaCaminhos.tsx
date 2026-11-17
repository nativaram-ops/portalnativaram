import React from "react";
import Link from "next/link";
import {
  Compass,
  Building2,
  Users,
  ArrowRight,
  Lock,
  CheckCircle2,
} from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Card } from "@/components/ui/Card";

const caminhosAudiencia = [
  {
    codigo: "01",
    publico: "Primeiro Visitante",
    titulo: "Quero entender como a cooperativa funciona",
    subtitulo: "Origem, feitio, lei e estudos abertos",
    icone: Compass,
    pontos: [
      "Cooperativa sem fins lucrativos (Lei 5.764/71) — não somos loja online",
      "Transparência sobre o feitio no Acre (Cruzeiro do Sul) e dossiês abertos",
      "Sem entrega avulsa a pessoa física para fins recreativos (+18)",
    ],
    ctaLabel: "Entender em 5 Passos",
    ctaHref: "#jornada-didatica",
    linkSecundarioLabel: "Ler Quem Somos",
    linkSecundarioHref: "/institucional",
    destaque: false,
  },
  {
    codigo: "02",
    publico: "Presidente de Instituição",
    titulo: "Represento templo ou centro com CNPJ e Ata",
    subtitulo: "Credenciamento institucional & Portal do Dirigente",
    icone: Building2,
    pontos: [
      "Destinado a igrejas, centros e institutos com CNPJ ativo e Ata/Estatuto",
      "Solicitações a partir de 5 L com planejamento de 30 dias de antecedência",
      "Rateio transparente, laudos e documentos A4 liberados no Portal do Dirigente",
    ],
    ctaLabel: "Credenciar Instituição",
    ctaHref: "/credenciamento",
    linkSecundarioLabel: "Já homologado? Entrar no Portal",
    linkSecundarioHref: "/portal-dirigente",
    destaque: true,
  },
  {
    codigo: "03",
    publico: "Líder de Grupo / Rezador",
    titulo: "Conduzo grupo em formação sem CNPJ próprio",
    subtitulo: "Acolhimento fraterno & orientação gradual",
    icone: Users,
    pontos: [
      "Para núcleos de estudo, círculos e rezadores ainda sem CNPJ constituído",
      "Ficha de Reconhecimento direta — sem burocracia cartorial inicial",
      "Entrevista de linhagem e triagem acompanhada pelo Conselho Guardião",
    ],
    ctaLabel: "Solicitar Reconhecimento",
    ctaHref: "/reconhecimento",
    linkSecundarioLabel: "Ver garantias legais (CONAD)",
    linkSecundarioHref: "/compliance",
    destaque: false,
  },
];

export const HomeAudienciaCaminhos = () => {
  return (
    <section
      id="caminhos-portal"
      aria-labelledby="caminhos-portal-titulo"
      className="py-section-sm lg:py-section-md bg-floresta-950 border-b border-ambar-500/15"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <AnimateOnScroll>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-ambar-500/15 pb-6">
            <div className="space-y-2 max-w-2xl">
              <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-ambar-400">
                Orientação Inicial • 3 Caminhos
              </p>
              <h2
                id="caminhos-portal-titulo"
                className="font-serif text-2xl sm:text-display-sm font-bold text-areia-100 leading-tight"
              >
                Para Quem É Este Portal —{" "}
                <span className="text-gradient-solar">Escolha Seu Caminho</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-areia-300/90 max-w-md font-light leading-relaxed">
              A Cooperativa Nativaram não realiza comércio de varejo aberto. Identifique seu perfil abaixo para acessar as informações e formulários corretos sem rodeios.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {caminhosAudiencia.map((item, idx) => {
            const Icone = item.icone;
            return (
              <AnimateOnScroll key={item.codigo} delay={idx * 90} className="h-full">
                <Card
                  variant={item.destaque ? "solar" : "elevated"}
                  glow={item.destaque}
                  className={`h-full flex flex-col justify-between p-6 rounded-2xl border ${
                    item.destaque
                      ? "border-ambar-400/50 bg-floresta-900/80 ring-1 ring-ambar-500/20"
                      : "border-ambar-500/20 bg-floresta-900/40"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-ambar-400">
                        <span className="px-2 py-0.5 rounded bg-floresta-950 border border-ambar-500/25">
                          {item.codigo}
                        </span>
                        <span>{item.publico}</span>
                      </span>
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-floresta-950/90 border border-ambar-500/25 text-ambar-400 shrink-0">
                        <Icone className="h-4 w-4" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-serif text-lg font-bold text-areia-100 leading-snug">
                        {item.titulo}
                      </h3>
                      <p className="text-xs text-ambar-300/90 font-medium">
                        {item.subtitulo}
                      </p>
                    </div>

                    <ul className="space-y-2 pt-1 text-xs text-areia-300/90 font-light">
                      {item.pontos.map((ponto) => (
                        <li key={ponto} className="flex items-start gap-2 leading-relaxed">
                          <CheckCircle2 className="h-3.5 w-3.5 text-ambar-400 shrink-0 mt-0.5" />
                          <span>{ponto}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-5 mt-5 border-t border-ambar-500/15 space-y-2.5">
                    <Link
                      href={item.ctaHref}
                      className={`w-full inline-flex items-center justify-center gap-2 rounded-lg py-2.5 px-4 text-xs font-semibold transition-all ${
                        item.destaque
                          ? "btn-primary btn-press"
                          : "bg-floresta-800/80 hover:bg-floresta-700 text-areia-100 border border-ambar-500/30 hover:border-ambar-400/60"
                      }`}
                    >
                      <span>{item.ctaLabel}</span>
                      <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                    </Link>

                    <Link
                      href={item.linkSecundarioHref}
                      className="flex items-center justify-center gap-1.5 text-[11px] text-areia-300 hover:text-ambar-300 transition-colors pt-0.5"
                    >
                      {item.destaque && <Lock className="h-3 w-3 text-ambar-400 shrink-0" />}
                      <span className="underline underline-offset-4 decoration-ambar-500/30">
                        {item.linkSecundarioLabel}
                      </span>
                    </Link>
                  </div>
                </Card>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
};

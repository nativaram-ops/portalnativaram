import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Mail, MapPin, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { BotaoWhatsApp } from "@/components/ui/BotaoWhatsApp";
import { EMAIL_INSTITUCIONAL, linkEmailInstitucional } from "@/lib/contato";

export const metadata: Metadata = {
  title: "Contato Institucional | Cooperativa Nativaram",
  description:
    "Fale com a coordenação do projeto Cooperativa Nativaram, em constituição, pelo WhatsApp ou e-mail institucional. O site não coleta dados.",
  alternates: { canonical: "/contato" },
  openGraph: {
    title: "Contato Institucional | Cooperativa Nativaram",
    description:
      "Canal institucional da coordenação do projeto, em constituição. O site não coleta dados.",
    url: "https://nativaramcoop.eco.br/contato",
  },
};

export default function ContatoPage() {
  return (
    <div className="space-y-0">
      {/* HERO */}
      <section className="relative overflow-hidden py-section-md lg:py-section-lg border-b border-ambar-500/10">
        <div className="absolute top-0 right-1/3 w-80 h-80 bg-ambar-500/[0.04] rounded-full blur-[80px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-ambar-500/20 bg-floresta-900/60 backdrop-blur-md px-4 py-1.5 text-[11px] font-semibold tracking-[0.15em] text-ambar-400 uppercase">
              <Sparkles className="h-3 w-3" />
              <span>Contato Institucional</span>
            </div>

            <h1 className="font-serif text-display-sm sm:text-display-md font-bold text-areia-100 text-glow">
              Fale com a
              <br />
              <span className="text-gradient-solar">cooperativa</span>
            </h1>

            <p className="text-sm sm:text-base text-areia-300/80 leading-relaxed max-w-xl">
              Entidades religiosas constituídas podem falar com a coordenação do
              projeto pelo e-mail ou WhatsApp institucional. Não coletamos dados
              pelo site.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* CANAL CENTRAL */}
      <section className="py-section-md">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-6">
          <AnimateOnScroll>
            <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/50 via-floresta-900/80 to-floresta-950 p-6 sm:p-10 space-y-6 shadow-elevated-md text-center">
              <div className="space-y-2">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-areia-100">
                  Canal oficial de contato
                </h2>
                <p className="text-sm text-areia-300 leading-relaxed max-w-xl mx-auto">
                  Dúvidas institucionais, pesquisa acadêmica e orientação para entidades
                  religiosas que querem se formalizar. O WhatsApp serve só para conversar
                  com a coordenação do projeto.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
                <BotaoWhatsApp className="sm:min-w-[260px]" />
                <a
                  href={linkEmailInstitucional("Contato institucional - Cooperativa Nativaram")}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-ambar-500/40 bg-floresta-950/70 hover:bg-floresta-800 px-5 py-3 text-xs font-bold tracking-wider text-ambar-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ambar-400"
                >
                  <Mail className="h-4 w-4" />
                  <span>{EMAIL_INSTITUCIONAL}</span>
                </a>
              </div>

              <div className="rounded-lg border border-ambar-500/15 bg-floresta-950/60 p-4 flex items-start gap-2.5 text-left">
                <ShieldCheck className="h-4 w-4 text-ambar-400 shrink-0 mt-0.5" />
                <p className="text-xs text-areia-400 leading-relaxed">
                  Este site é institucional. Não vendemos, não recebemos pedidos e não
                  fazemos envios. Não há valores nem formulários de pedido. Ao escrever
                  por WhatsApp ou e-mail, os dados que você enviar ficam nesses serviços.
                  Saiba mais na{" "}
                  <Link
                    href="/privacidade"
                    className="text-ambar-400 underline underline-offset-2 hover:text-ambar-300"
                  >
                    Política de Privacidade
                  </Link>
                  .
                </p>
              </div>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AnimateOnScroll delay={100}>
              <div className="card-elevated rounded-xl p-5 h-full space-y-2 text-xs text-areia-400">
                <div className="flex items-center gap-2 text-[11px] font-semibold text-ambar-400 uppercase tracking-wider">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Origem do projeto</span>
                </div>
                <p>Cruzeiro do Sul, Acre — Amazônia.</p>
                <p>
                  Projeto de cooperativa em constituição, ainda sem registro e sem CNPJ.{" "}
                  <Link href="/transparencia" className="text-ambar-400 underline underline-offset-2 hover:text-ambar-300">
                    Transparência
                  </Link>
                  .
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={200}>
              <div className="card-liturgico rounded-xl p-5 h-full space-y-3">
                <div className="flex items-center gap-2 text-[11px] font-semibold text-ambar-400 uppercase tracking-wider">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Entidade religiosa?</span>
                </div>
                <p className="text-xs text-areia-400 leading-relaxed">
                  Veja quem pode dialogar com o projeto, os compromissos da
                  entidade e a orientação para grupos em formação.
                </p>
                <Link
                  href="/entidades-religiosas"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-ambar-400 hover:text-ambar-300 transition-colors"
                >
                  <span>Entidades Religiosas</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { InstagramIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Contato Institucional & Atendimento Litúrgico | Nativaram Brasil",
  description:
    "Entre em contato com os guardiões da Nativaram Brasil. Canal direto via WhatsApp para dirigentes, esclarecimento de dúvidas sobre feitios e agendamento de homologação litúrgica.",
  openGraph: {
    title: "Contato Institucional | Nativaram Brasil",
    description:
      "Canal oficial de atendimento para templos, pesquisadores e guardiões da floresta.",
    url: "https://nativaramcoop.eco.br/contato",
  },
};

export default function ContatoPage() {
  return (
    <div className="space-y-0">
      {/* ═══════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-section-md lg:py-section-lg border-b border-ambar-500/10">
        <div className="absolute top-0 right-1/3 w-80 h-80 bg-ambar-500/[0.04] rounded-full blur-[80px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-ambar-500/20 bg-floresta-900/60 backdrop-blur-md px-4 py-1.5 text-[11px] font-semibold tracking-[0.15em] text-ambar-400 uppercase">
              <Sparkles className="h-3 w-3" />
              <span>Atendimento Fraterno & Institucional</span>
            </div>

            <h1 className="font-serif text-display-sm sm:text-display-md font-bold text-areia-100 text-glow">
              Fale com os
              <br />
              <span className="text-gradient-solar">Guardiões</span>
            </h1>

            <p className="text-sm sm:text-base text-areia-300/80 leading-relaxed max-w-xl">
              Estamos à disposição de dirigentes espirituais, pesquisadores
              etnobotânicos e templos de todo o Brasil.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MAIN CONTENT GRID
          ═══════════════════════════════════════════ */}
      <section className="py-section-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              {/* WhatsApp Card — with glow */}
              <AnimateOnScroll>
                <div className="relative rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/50 via-floresta-900/80 to-floresta-950 p-6 sm:p-8 space-y-4 shadow-elevated-md overflow-hidden">
                  {/* Glow */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-[60px] pointer-events-none" />

                  <div className="relative flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 glow-emerald">
                      <MessageCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="font-serif text-lg font-bold text-areia-100">
                        Canal Direto WhatsApp
                      </h2>
                      <p className="text-[11px] text-emerald-300/80">
                        Atendimento ágil para dirigentes
                      </p>
                    </div>
                  </div>

                  <p className="relative text-xs text-areia-300 leading-relaxed">
                    Tire dúvidas sobre prazos de feitio, lotes sob encomenda,
                    triagem e envio litúrgico.
                  </p>

                  <a
                    href="https://wa.me/5568999979104?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20os%20sacramentos%20e%20o%20apoio%20lit%C3%BArgico%20da%20Nativaram%20Brasil."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all active:scale-[0.98]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>WhatsApp: (68) 99997-9104</span>
                  </a>

                  <p className="relative text-[10px] text-emerald-300/70 text-center font-medium">
                    Atendimento fraterno com presença • Seg a Sex, 09h – 18h
                  </p>
                </div>
              </AnimateOnScroll>

              {/* Institutional Info */}
              <AnimateOnScroll delay={200}>
                <div className="card-elevated rounded-xl p-6 space-y-4">
                  <h3 className="text-[11px] font-bold tracking-[0.15em] text-ambar-400/80 uppercase">
                    Endereços de Custódia & Apoio
                  </h3>

                  <div className="space-y-3.5 text-xs text-areia-400">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-ambar-500/70 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-areia-200 block">
                          Ponto de Partilha & Logística
                        </strong>
                        Serra, ES — Brasil
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-ambar-500/70 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-areia-200 block">
                          Feitio Nativo & Agrofloresta
                        </strong>
                        Cruzeiro do Sul, Acre — Amazônia
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="h-4 w-4 text-ambar-500/70 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-areia-200 block">
                          E-mail Oficial
                        </strong>
                        <span className="text-ambar-300/90 font-mono text-[11px]">
                          nativaram@gmail.com
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <InstagramIcon className="h-4 w-4 text-ambar-500/70 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-areia-200 block">
                          Canais Oficiais
                        </strong>
                        <div className="flex flex-col gap-1.5 pt-1">
                          <a
                            href="https://linktr.ee/nativarambrasil"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-ambar-300 hover:text-ambar-200 font-semibold transition-colors"
                          >
                            <span>linktr.ee/nativarambrasil</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                          <a
                            href="https://instagram.com/nativarambrasil"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-areia-400 hover:text-ambar-300 transition-colors"
                          >
                            @nativarambrasil
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-4 w-4 text-ambar-500/70 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-areia-200 block">
                          Feitio Sob Encomenda
                        </strong>
                        Ciclo sagrado de 30 dias de preparação
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>

              {/* Credenciamento shortcut */}
              <AnimateOnScroll delay={400}>
                <div className="card-liturgico rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-ambar-400 uppercase tracking-wider">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Primeiro Contato de Templo?</span>
                  </div>
                  <p className="text-xs text-areia-400 leading-relaxed">
                    Se a sua congregação deseja iniciar a homologação, adiantamos
                    a triagem pelo formulário específico.
                  </p>
                  <Link
                    href="/credenciamento"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-ambar-400 hover:text-ambar-300 transition-colors"
                  >
                    <span>Ficha de Credenciamento</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Right: Contact Form */}
            <AnimateOnScroll delay={100} className="lg:col-span-7">
              <ContactForm />
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Compliance Notice */}
      <section className="pb-section-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-ambar-500/10 bg-floresta-900/20 p-4 text-center">
            <p className="text-[11px] text-areia-400/60">
              A Nativaram Brasil não realiza atendimentos para fins comerciais ou
              recreativos. Acesso reservado ao contexto de práticas rituais
              amparadas pela Constituição Federal e Resolução CONAD nº 01/2010.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

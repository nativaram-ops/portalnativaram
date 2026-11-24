import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ShieldCheck,
  Scale,
  AlertTriangle,
  HeartPulse,
  ArrowRight,
  FileCheck,
  Ban,
  Lock,
} from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { JornadaNavTracker } from "@/components/funil/JornadaNavTracker";
import { JornadaNextStep } from "@/components/funil/JornadaNextStep";

export const metadata: Metadata = {
  title: "Marco Legal | Cooperativa Nativaram",
  description:
    "Art. 5º da CF/88, Lei 11.343/2006 (art. 2º, caput) e Resolução CONAD nº 1/2010. Política de conformidade do site institucional da Cooperativa Nativaram, projeto de cooperativa em constituição.",
  alternates: { canonical: "/compliance" },
  openGraph: {
    title: "Marco Legal | Cooperativa Nativaram",
    description:
      "Art. 5º da CF/88, Lei 11.343/2006 (art. 2º, caput) e Resolução CONAD nº 1/2010.",
  },
};

export default function CompliancePage() {
  return (
    <div className="space-y-0">
      {/* Indicador Superior do Caminho Didático */}
      <JornadaNavTracker etapaAtual={4} />

      {/* ═══════════════════════════════════════════
          HERO — Marco Legal & Deontologia
          ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-section-lg lg:py-section-xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-ambar-500/[0.06] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <AnimateOnScroll>
            <div className="inline-flex items-center gap-2 rounded-full border border-ambar-500/20 bg-floresta-900/70 backdrop-blur-md px-4 py-1.5 text-[11px] font-semibold tracking-[0.15em] text-ambar-400 uppercase">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Marco Legal • Deontologia • Conformidade</span>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={150}>
            <h1 className="font-serif text-display-md sm:text-display-lg lg:text-display-xl font-bold text-areia-100 text-glow leading-[1.08]">
              Marco Legal &{" "}
              <span className="text-gradient-solar">Segurança Litúrgica</span>
            </h1>
          </AnimateOnScroll>

          <AnimateOnScroll delay={300}>
            <p className="text-base sm:text-lg text-areia-300 max-w-2xl mx-auto leading-relaxed font-light">
              A Cooperativa Nativaram é um projeto de cooperativa em constituição, ainda sem registro e sem CNPJ. Aqui estão as normas que o projeto segue e a política de conformidade do site: nada de venda, anúncio ou derivado comercial na internet.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider variant="solar" />

      {/* ═══════════════════════════════════════════
          PILARES JURÍDICOS (CF/88 & CONAD)
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimateOnScroll delay={100}>
              <div className="card-elevated rounded-2xl p-8 space-y-5 h-full flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-floresta-900 border border-ambar-500/30 text-ambar-400">
                      <Scale className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold tracking-wider text-ambar-400 uppercase">Base constitucional</span>
                      <h3 className="font-serif text-xl font-bold text-areia-100">
                        Constituição & Lei de Drogas
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
                    O <strong>art. 5º, incisos VI e VIII, da Constituição de 1988</strong> protege a liberdade de consciência e de crença, o livre exercício dos cultos religiosos e a proteção aos locais de culto e suas liturgias.
                  </p>
                  <p className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
                    A{" "}
                    <a
                      href="http://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11343.htm"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-ambar-500/30 underline-offset-4 hover:text-ambar-300"
                    >
                      <strong>Lei nº 11.343/2006</strong>
                    </a>{" "}
                    traz, no <strong>art. 2º, caput</strong>, a ressalva do uso estritamente ritualístico-religioso de plantas. O parágrafo único trata de fins medicinais e científicos.
                  </p>
                </div>
                <div className="pt-4 border-t border-ambar-500/15 flex items-center gap-2 text-[11px] text-ambar-400/90 font-mono">
                  <FileCheck className="h-4 w-4" />
                  <span>Art. 5º, VI e VIII • CF/88</span>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={200}>
              <div className="card-elevated rounded-2xl p-8 space-y-5 h-full flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-floresta-900 border border-ambar-500/30 text-ambar-400">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold tracking-wider text-ambar-400 uppercase">Deontologia Religiosa</span>
                      <h3 className="font-serif text-xl font-bold text-areia-100">
                        <a
                          href="https://www.gov.br/mj/pt-br/assuntos/sua-protecao/politicas-sobre-drogas/subcapas-senad/conad/atos-do-conad-1/2010/11___resolucao_n__01_2010___conad.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-ambar-300 underline decoration-ambar-500/30 underline-offset-4"
                        >
                          Resolução CONAD nº 01/2010
                        </a>
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
                    O Conselho Nacional de Políticas sobre Drogas publicou os princípios deontológicos do uso religioso da ayahuasca, que afastam o comércio, o turismo espiritual e a propaganda com promessas de saúde ou resultados.
                  </p>
                  <p className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
                    A partilha do sacramento acontece apenas entre entidades religiosas legalmente constituídas, fora deste site, por termo entre as entidades, cobrindo somente o custeio de despesas comprovadas, sem margem, conforme os princípios da Resolução CONAD nº 1/2010.
                  </p>
                </div>
                <div className="pt-4 border-t border-ambar-500/15 flex items-center gap-2 text-[11px] text-ambar-400/90 font-mono">
                  <FileCheck className="h-4 w-4" />
                  <span>Resolução CONAD 01/2010</span>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <SectionDivider variant="botanical" />

      {/* ═══════════════════════════════════════════
          POLÍTICA DE CONFORMIDADE DIGITAL
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
          <AnimateOnScroll>
            <div className="card-elevated rounded-2xl p-8 sm:p-12 space-y-8 border-ambar-500/30">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-ambar-500/20 pb-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-areia-100">
                      Política de Conformidade Digital
                    </h2>
                    <p className="text-xs text-ambar-400 font-medium">
                      O que este site não faz
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-ambar-500/10 border border-ambar-500/30 px-3.5 py-1 text-xs font-semibold text-ambar-300">
                  Regra do Projeto
                </span>
              </div>

              <p className="text-sm sm:text-base text-areia-200 leading-relaxed font-light">
                O sacramento existe para o rito, não para o comércio. Este site é institucional. Não vendemos, não recebemos pedidos e não fazemos envios. Não há valores nem formulários de pedido.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="rounded-xl border border-ambar-500/20 bg-floresta-950/80 p-6 space-y-3">
                  <div className="flex items-center gap-2 text-ambar-400">
                    <Ban className="h-4 w-4" />
                    <h4 className="font-serif text-sm font-bold text-areia-100">
                      Proibição de Venda Online
                    </h4>
                  </div>
                  <p className="text-xs text-areia-300 leading-relaxed font-light">
                    Nenhum sacramento é oferecido neste site, em redes sociais ou a pessoas físicas.
                  </p>
                </div>

                <div className="rounded-xl border border-ambar-500/20 bg-floresta-950/80 p-6 space-y-3">
                  <div className="flex items-center gap-2 text-ambar-400">
                    <ShieldCheck className="h-4 w-4" />
                    <h4 className="font-serif text-sm font-bold text-areia-100">
                      Veto a Derivados Comerciais
                    </h4>
                  </div>
                  <p className="text-xs text-areia-300 leading-relaxed font-light">
                    Não fazemos derivados comerciais: méis aromatizados, cápsulas, extratos, aditivos, microdoses, florais ou suplementos.
                  </p>
                </div>

                <div className="rounded-xl border border-ambar-500/20 bg-floresta-950/80 p-6 space-y-3">
                  <div className="flex items-center gap-2 text-ambar-400">
                    <Lock className="h-4 w-4" />
                    <h4 className="font-serif text-sm font-bold text-areia-100">
                      Sem Valores nem Pedidos
                    </h4>
                  </div>
                  <p className="text-xs text-areia-300 leading-relaxed font-light">
                    O site não tem valores, formulários de pedido, carrinho ou meios de pagamento. O transporte entre entidades não tem regulamentação específica; este site não orienta transporte.
                  </p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider variant="minimal" />

      {/* ═══════════════════════════════════════════
          TRIAGEM & REDUÇÃO DE DANOS (resumo; detalhe em /seguranca)
          ═══════════════════════════════════════════ */}
      <section className="py-section-md">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="card-elevated rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-red-500/30">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-950/60 border border-red-500/30 text-red-400">
                  <HeartPulse className="h-6 w-6" />
                </div>
                <p className="text-sm text-areia-300 leading-relaxed font-light">
                  Antes de qualquer rito, a entidade faz a triagem de cada participante: interação com antidepressivos (síndrome serotoninérgica), transtornos psicóticos e cardiopatias graves.
                  <br />
                  Os alertas completos, incluindo menores de 18 anos e gestantes, estão em Segurança e Redução de Danos.
                </p>
              </div>
              <Link href="/seguranca" className="btn-secondary btn-press text-xs font-semibold px-5 py-2.5 shrink-0">
                <span>Ver os alertas</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PRÓXIMO PASSO: ENTIDADES RELIGIOSAS
          ═══════════════════════════════════════════ */}
      <JornadaNextStep
        etapaAtual={4}
        tituloEtapaAtual="Marco Legal"
        proximaEtapaNumero={5}
        proximaEtapaTitulo="Entidades Religiosas"
        proximaEtapaDescricao="Quem pode dialogar com o projeto, os compromissos da entidade e a orientação de formalização para grupos em formação. Sem cadastro e sem coleta de dados."
        proximaEtapaHref="/entidades-religiosas"
        textoBotao="Ver Entidades Religiosas"
        isClimax={true}
      />
    </div>
  );
}

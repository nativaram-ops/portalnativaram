import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ShieldCheck,
  Scale,
  AlertTriangle,
  HeartPulse,
  Sparkles,
  CheckCircle,
  ArrowRight,
  FileCheck,
  Ban,
  Lock,
} from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { JornadaNavTracker, JornadaNextStep } from "@/components/funil";

export const metadata: Metadata = {
  title: "Marco Legal & Compliance Jurídico CONAD | Cooperativa Nativaram",
  description:
    "Conformidade com Art. 5º da CF/88, Lei 11.343/06, Resolução CONAD nº 01/2010 e Marco Sanitário ANVISA 2025. Blindagem jurídica e proteção litúrgica da Cooperativa Nativaram.",
  openGraph: {
    title: "Marco Legal & Compliance Jurídico CONAD | Cooperativa Nativaram",
    description:
      "Conformidade com Art. 5º da CF/88, Lei 11.343/06, Resolução CONAD nº 01/2010 e Marco Regulatório ANVISA 2025.",
  },
};

export default function CompliancePage() {
  return (
    <div className="space-y-0">
      {/* Indicador Superior do Caminho Didático */}
      <JornadaNavTracker etapaAtual={4} />

      {/* ═══════════════════════════════════════════
          HERO — Blindagem Jurídica & Deontologia
          ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-section-lg lg:py-section-xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-ambar-500/[0.06] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <AnimateOnScroll>
            <div className="inline-flex items-center gap-2 rounded-full border border-ambar-500/20 bg-floresta-900/70 backdrop-blur-md px-4 py-1.5 text-[11px] font-semibold tracking-[0.15em] text-ambar-400 uppercase">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Blindagem Jurídica • Deontologia • Saúde Integrativa</span>
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
              Garantias constitucionais, deontologia sagrada do CONAD e rigorosa conformidade com o marco sanitário da ANVISA de 28 de janeiro de 2025.
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
                      <span className="text-[10px] font-semibold tracking-wider text-ambar-400 uppercase">Amparo Constitucional</span>
                      <h3 className="font-serif text-xl font-bold text-areia-100">
                        Constituição & Lei de Drogas
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
                    O amparo basilar repousa no <strong>Artigo 5º, incisos VI e VIII da Carta Magna de 1988</strong>, que tutela a inviolabilidade absoluta da liberdade de consciência, crença e a proteção aos locais de culto e suas liturgias tradicionais.
                  </p>
                  <p className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
                    Ademais, a <strong>Lei Federal nº 11.343/2006 (Art. 2º, parágrafo único)</strong> ressalva expressamente o plantio, cultivo e colheita de vegetais psicoativos exclusivamente para finalidades rituais e religiosas ancestrais.
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
                        Resolução CONAD nº 01/2010
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
                    O Conselho Nacional de Políticas sobre Drogas estabelece a <strong>Deontologia do Uso Religioso da Ayahuasca</strong>. Veda terminantemente o comércio, o turismo espiritual, a especulação corporativa e qualquer propaganda com promessas terapêuticas ou milagrosas.
                  </p>
                  <p className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
                    A sustentação financeira de todas as operações cooperativas ocorre unicamente por meio do <strong>rateio solidário de custos operacionais</strong> entre congregações registradas e homologadas.
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
          MARCO SANITÁRIO ANVISA 2025
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
                      Marco Regulatório ANVISA (28 de Janeiro de 2025)
                    </h2>
                    <p className="text-xs text-ambar-400 font-medium">
                      Diretrizes sanitárias de blindagem e conformidade digital absoluta
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-ambar-500/10 border border-ambar-500/30 px-3.5 py-1 text-xs font-semibold text-ambar-300">
                  Vigente 2025
                </span>
              </div>

              <p className="text-sm sm:text-base text-areia-200 leading-relaxed font-light">
                Em conformidade rigorosa com a resolução sanitária da ANVISA publicada em 2025, a Cooperativa Nativaram adota política inegociável de <strong>Conformidade Digital Absoluta</strong>:
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
                    Não comercializamos sacramentos em websites públicos, e-commerces, redes sociais ou para pessoas físicas desprovidas de contexto litúrgico formal.
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
                    Não desenvolvemos nem divulgamos méis aromatizados, microdoses recreativas, florais ou suplementos baseados em Ayahuasca.
                  </p>
                </div>

                <div className="rounded-xl border border-ambar-500/20 bg-floresta-950/80 p-6 space-y-3">
                  <div className="flex items-center gap-2 text-ambar-400">
                    <Lock className="h-4 w-4" />
                    <h4 className="font-serif text-sm font-bold text-areia-100">
                      Zero Checkouts Públicos
                    </h4>
                  </div>
                  <p className="text-xs text-areia-300 leading-relaxed font-light">
                    O portal Nativaram não dispõe de botões de compra, carrinho ou meios de pagamento de e-commerce. Todo rateio é institucional e cooperativo.
                  </p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider variant="minimal" />

      {/* ═══════════════════════════════════════════
          TRIAGEM & REDUÇÃO DE DANOS
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
          <AnimateOnScroll>
            <div className="card-elevated rounded-2xl p-8 sm:p-12 space-y-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-950/60 border border-red-500/30 text-red-400">
                  <HeartPulse className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-areia-100">
                    Protocolo Mandatório de Triagem e Redução de Danos
                  </h2>
                  <p className="text-xs text-red-400/90 font-medium">
                    Critérios clínicos obrigatórios antes de qualquer comunhão litúrgica
                  </p>
                </div>
              </div>

              <p className="text-sm text-areia-300 leading-relaxed font-light">
                A distribuição cooperativa exige a aplicação de anamnese e triagem individual de cada participante antes de qualquer comunhão litúrgica nos templos associados, observando rigorosamente as contraindicações médicas fundamentais:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div className="rounded-xl border border-red-500/30 bg-floresta-950 p-6 space-y-3">
                  <span className="text-red-400 font-serif font-bold text-base block">
                    Síndrome Serotoninérgica
                  </span>
                  <p className="text-xs text-areia-300 leading-relaxed font-light">
                    A interação de beta-carbolinas com antidepressivos ISRS (Fluoxetina, Sertralina, Escitalopram) pode ser fatal. Exige-se <strong>washout clínico estruturado de no mínimo 5 semanas</strong> sob supervisão médica.
                  </p>
                </div>

                <div className="rounded-xl border border-red-500/30 bg-floresta-950 p-6 space-y-3">
                  <span className="text-red-400 font-serif font-bold text-base block">
                    Transtornos Psicóticos
                  </span>
                  <p className="text-xs text-areia-300 leading-relaxed font-light">
                    Contraindicação absoluta para portadores de Esquizofrenia, Transtorno Esquizoafetivo ou Bipolaridade Tipo I com histórico de mania. A agonização 5-HT2A pode desencadear descompensações agudas.
                  </p>
                </div>

                <div className="rounded-xl border border-red-500/30 bg-floresta-950 p-6 space-y-3">
                  <span className="text-red-400 font-serif font-bold text-base block">
                    Cardiopatias Graves
                  </span>
                  <p className="text-xs text-areia-300 leading-relaxed font-light">
                    Efeitos simpatomiméticos transitórios podem elevar a pressão arterial. Contraindicado para hipertensos descompensados, portadores de aneurisma ou arritmias sem laudo cardiológico liberatório.
                  </p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          O CLÍMAX DO FUNIL: JORNADANEXTSTEP PARA O CREDENCIAMENTO
          ═══════════════════════════════════════════ */}
      <JornadaNextStep
        etapaAtual={4}
        tituloEtapaAtual="Marco Legal & Conformidade CONAD"
        proximaEtapaNumero={5}
        proximaEtapaTitulo="Homologação Formal: Credenciamento do Seu Templo"
        proximaEtapaDescricao="Sua congregação atua amparada na Constituição e na Resolução CONAD nº 01/2010? O processo de adesão é transparente, acolhedor e homologado pelo Conselho Guardião em até 48 horas úteis."
        proximaEtapaHref="/credenciamento"
        textoBotao="Iniciar Credenciamento da Instituição (Etapa Final)"
        isClimax={true}
      />
    </div>
  );
}

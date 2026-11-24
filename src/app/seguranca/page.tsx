import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  HeartPulse,
  AlertTriangle,
  Baby,
  Siren,
  ClipboardCheck,
  BookOpen,
  ShieldAlert,
} from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionDivider } from "@/components/ui/SectionDivider";

const URL_CONAD =
  "https://www.gov.br/mj/pt-br/assuntos/sua-protecao/politicas-sobre-drogas/subcapas-senad/conad/atos-do-conad-1/2010/11___resolucao_n__01_2010___conad.pdf";

export const metadata: Metadata = {
  title: "Segurança e Redução de Danos | Cooperativa Nativaram",
  description:
    "Alertas de segurança sobre a ayahuasca: interação com antidepressivos (síndrome serotoninérgica), transtornos psicóticos, cardiopatias, menores de 18 anos, gestantes e o que fazer em caso de mal-estar (SAMU 192).",
  alternates: { canonical: "/seguranca" },
  openGraph: {
    title: "Segurança e Redução de Danos | Cooperativa Nativaram",
    description:
      "Alertas de segurança, triagem dos participantes e o que fazer em caso de mal-estar.",
    url: "https://nativaramcoop.eco.br/seguranca",
  },
};

const alertas = [
  {
    titulo: "Síndrome serotoninérgica",
    texto: (
      <>
        A interação das beta-carbolinas com antidepressivos ISRS (fluoxetina, sertralina,
        escitalopram) pode ser fatal. É necessário <strong>washout mínimo de 5 semanas</strong>,
        sempre sob supervisão médica. Nunca suspenda um medicamento por conta própria.
      </>
    ),
  },
  {
    titulo: "Transtornos psicóticos",
    texto: (
      <>
        Contraindicação absoluta para pessoas com esquizofrenia, transtorno esquizoafetivo ou
        transtorno bipolar tipo I com histórico de mania. A ação no receptor 5-HT2A pode
        desencadear descompensações agudas.
      </>
    ),
  },
  {
    titulo: "Cardiopatias graves",
    texto: (
      <>
        Efeitos simpatomiméticos transitórios podem elevar a pressão arterial. Contraindicado
        para hipertensos descompensados e pessoas com aneurisma ou arritmias sem liberação
        cardiológica.
      </>
    ),
  },
];

const triagem = [
  "Aplicar ficha de anamnese individual a cada participante antes do rito.",
  "Perguntar sobre todos os medicamentos em uso e conferir na matriz de interações.",
  "Exigir washout mínimo de 5 semanas, sob supervisão médica, para quem usa antidepressivos (ISRS/ISRN).",
  "Não admitir pessoas com transtornos psicóticos ou cardiopatias graves sem liberação médica.",
  "Manter pessoa responsável atenta aos participantes durante todo o rito.",
];

export default function SegurancaPage() {
  return (
    <div className="space-y-0">
      {/* HERO */}
      <section className="relative overflow-hidden py-section-lg lg:py-section-xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-red-500/[0.05] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <AnimateOnScroll>
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/40 px-4 py-1.5 text-[11px] font-semibold tracking-[0.15em] text-red-300 uppercase">
              <ShieldAlert className="h-3.5 w-3.5" />
              <span>Alertas de Segurança • Redução de Danos</span>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={150}>
            <h1 className="font-serif text-display-md sm:text-display-lg lg:text-display-xl font-bold text-areia-100 text-glow leading-[1.08]">
              Segurança e <span className="text-gradient-solar">Redução de Danos</span>
            </h1>
          </AnimateOnScroll>

          <AnimateOnScroll delay={300}>
            <p className="text-base sm:text-lg text-areia-300 max-w-2xl mx-auto leading-relaxed font-light">
              A ayahuasca tem riscos reais. Esta página reúne os alertas que toda entidade religiosa
              deve conhecer antes de qualquer rito. Não é indicação de uso e não substitui avaliação
              médica.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider variant="solar" />

      <section className="py-section-lg">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Emergência */}
          <AnimateOnScroll>
            <div id="emergencia" className="rounded-2xl border border-red-500/40 bg-red-950/30 p-6 sm:p-8 flex items-start gap-4 scroll-mt-32">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-950/60 border border-red-500/40 text-red-300">
                <Siren className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h2 className="font-serif text-xl font-bold text-areia-100">Em caso de mal-estar</h2>
                <p className="text-sm text-areia-200 leading-relaxed">
                  Em caso de mal-estar, procure serviço de saúde. <strong>SAMU 192.</strong>
                </p>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Contraindicações */}
          <AnimateOnScroll>
            <div id="contraindicacoes" className="card-elevated rounded-2xl p-8 sm:p-10 space-y-6 scroll-mt-32">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-950/60 border border-red-500/30 text-red-400">
                  <HeartPulse className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-areia-100">
                    Contraindicações e interações
                  </h2>
                  <p className="text-xs text-red-400/90 font-medium">
                    Critérios obrigatórios de triagem antes de qualquer rito
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {alertas.map(({ titulo, texto }) => (
                  <div key={titulo} className="rounded-xl border border-red-500/30 bg-floresta-950 p-6 space-y-3">
                    <h3 className="text-red-400 font-serif font-bold text-base">{titulo}</h3>
                    <p className="text-xs text-areia-300 leading-relaxed font-light">{texto}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          {/* Menores e gestantes */}
          <AnimateOnScroll>
            <div id="menores-gestantes" className="card-elevated rounded-2xl p-8 sm:p-10 space-y-6 scroll-mt-32">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-floresta-900 border border-amber-500/30 text-amber-400">
                  <Baby className="h-5 w-5" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-areia-100">
                  Menores de 18 anos e gestantes
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-xl border border-amber-500/30 bg-floresta-950 p-6 space-y-3">
                  <h3 className="text-amber-400 font-serif font-bold text-base">Menores de 18 anos</h3>
                  <p className="text-xs text-areia-300 leading-relaxed font-light">
                    Pela{" "}
                    <a
                      href={URL_CONAD}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ambar-400 underline underline-offset-2 hover:text-ambar-300"
                    >
                      Resolução CONAD nº 1/2010
                    </a>{" "}
                    (§ 46), a participação de menores fica a cargo dos pais ou responsáveis. O
                    projeto <strong>recomenda não admitir menores</strong>.
                  </p>
                  <p className="text-xs text-areia-300 leading-relaxed font-light">
                    <strong>Rapé e tabaco nunca a menores de 18 anos</strong> (Estatuto da Criança e
                    do Adolescente, art. 243).
                  </p>
                </div>
                <div className="rounded-xl border border-amber-500/30 bg-floresta-950 p-6 space-y-3">
                  <h3 className="text-amber-400 font-serif font-bold text-base">Gestantes</h3>
                  <p className="text-xs text-areia-300 leading-relaxed font-light">
                    Pela Resolução CONAD nº 1/2010 (§ 46), a participação de gestantes deve ser
                    decisão informada. <strong>Recomenda-se não participar.</strong>
                  </p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Compromissos de triagem */}
          <AnimateOnScroll>
            <div id="triagem" className="card-elevated rounded-2xl p-8 sm:p-10 space-y-5 scroll-mt-32">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-floresta-900 border border-ambar-500/30 text-ambar-400">
                  <ClipboardCheck className="h-5 w-5" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-areia-100">
                  Compromissos de triagem da entidade
                </h2>
              </div>
              <ul className="space-y-3">
                {triagem.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-ambar-500/15 bg-floresta-950/70 p-4 text-xs text-areia-300 leading-relaxed"
                  >
                    <AlertTriangle className="h-4 w-4 text-ambar-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimateOnScroll>

          {/* Recursos */}
          <AnimateOnScroll>
            <div className="rounded-2xl border border-ambar-500/30 bg-floresta-900/70 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-floresta-800 border border-ambar-500/30 text-ambar-400">
                  <BookOpen className="h-6 w-6" />
                </div>
                <p className="text-xs text-areia-300 font-light max-w-lg">
                  A matriz de interações com medicamentos e a ficha de anamnese estão abertas na
                  Central de Recursos. A matriz não é exaustiva: a pessoa deve consultar o médico
                  assistente.
                </p>
              </div>
              <Link href="/portal-dirigente" className="btn-primary btn-press text-xs font-semibold px-5 py-2.5 shrink-0">
                Abrir a Central de Recursos
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="py-8 bg-floresta-950/60">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center space-y-2">
          <p className="text-[11px] text-areia-400 leading-relaxed font-light">
            Conteúdo informativo de segurança, para maiores de 18 anos. Não é indicação de uso e não
            substitui avaliação médica. Este site é institucional. Não vendemos, não recebemos
            pedidos e não fazemos envios.
          </p>
        </div>
      </section>
    </div>
  );
}

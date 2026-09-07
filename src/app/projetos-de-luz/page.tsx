import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  Sparkles,
  HeartHandshake,
  Users,
  Compass,
  ArrowRight,
  ShieldCheck,
  Sprout,
  Sun,
  Home,
  CheckCircle2,
} from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionDivider } from "@/components/ui/SectionDivider";

export const metadata: Metadata = {
  title: "Projetos de Luz — Ecovila, Agrofloresta & Acolhimento Social | Nativaram Brasil",
  description:
    "Conheça os Projetos de Luz da Nativaram Brasil: implantação de Ecovila agroflorestal no Acre, acolhimento regenerativo para vulnerabilidade social e salvaguarda da biodiversidade amazônica.",
  openGraph: {
    title: "Projetos de Luz — Ecovila & Ação Regenerativa | Nativaram Brasil",
    description:
      "A economia sagrada a serviço da regeneração ecológica e humana no Acre e em todo o Brasil.",
    url: "https://nativaramcoop.eco.br/projetos-de-luz",
  },
};

export default function ProjetosDeLuzPage() {
  return (
    <div className="space-y-0">
      {/* ═══════════════════════════════════════════
          HERO — Regeneração Humana & Ecológica
          ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-section-lg lg:py-section-xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-ambar-500/[0.06] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <AnimateOnScroll>
            <div className="inline-flex items-center gap-2 rounded-full border border-ambar-500/20 bg-floresta-900/70 backdrop-blur-md px-4 py-1.5 text-[11px] font-semibold tracking-[0.15em] text-ambar-400 uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Regeneração Humana & Ecológica</span>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={150}>
            <h1 className="font-serif text-display-md sm:text-display-lg lg:text-display-xl font-bold text-areia-100 text-glow leading-[1.08]">
              Projetos de Luz: A Força da Floresta a Serviço da{" "}
              <span className="text-gradient-solar">
                Vida & Regeneração
              </span>
            </h1>
          </AnimateOnScroll>

          <AnimateOnScroll delay={300}>
            <p className="text-base sm:text-lg text-areia-300 max-w-2xl mx-auto leading-relaxed font-light">
              Na Cooperativa Nativaram Brasil, todo o rateio e sustentação de nossas medicinas tem destinação ética e regenerativa. Rejeitamos o comércio predatório e canalizamos cada contribuição para reflorestar a terra, sustentar as famílias guardiãs e reabilitar vidas em vulnerabilidade.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider variant="solar" />

      {/* ═══════════════════════════════════════════
          OS TRÊS PILARES DA ECONOMIA SAGRADA
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <AnimateOnScroll>
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-ambar-400">
                <Compass className="h-3.5 w-3.5" />
                <span>Tríade de Sustentação</span>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={150}>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-areia-100">
                Os Três Pilares da Economia Sagrada
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll delay={300}>
              <p className="text-xs sm:text-sm text-areia-400 font-light">
                Como cada ato de consagração e partilha alimenta um ciclo virtuoso no coração da Amazônia.
              </p>
            </AnimateOnScroll>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pilar 1: Agrofloresta & Ecovila */}
            <AnimateOnScroll delay={100}>
              <div className="card-elevated rounded-2xl p-8 space-y-6 h-full flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ambar-500/10 text-ambar-400 border border-ambar-500/30">
                      <Sprout className="h-6 w-6" />
                    </div>
                    <span className="number-marker">01</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-areia-100">
                    Ecovila & Agrofloresta Sintrópica
                  </h3>
                  <p className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
                    Implantação de comunidade autossustentável no Acre com sistemas agroflorestais sintrópicos. Plantio regenerativo de Cipó Mariri (<em>Banisteriopsis caapi</em>), Folha Rainha (<em>Psychotria viridis</em>), árvores medicinais nativas (Tsunu, Cumaru, Mulateiro) e alimentos orgânicos.
                  </p>
                </div>
                <ul className="space-y-2.5 text-xs text-areia-400 pt-4 border-t border-ambar-500/15">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-ambar-400" />
                    <span>Manejo 100% orgânico e biodinâmico</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-ambar-400" />
                    <span>Bioconstruções de baixo impacto no Vale do Juruá</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-ambar-400" />
                    <span>Santuário de preservação da fauna nativa</span>
                  </li>
                </ul>
              </div>
            </AnimateOnScroll>

            {/* Pilar 2: Acolhimento Social */}
            <AnimateOnScroll delay={200}>
              <div className="card-elevated rounded-2xl p-8 space-y-6 h-full flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ambar-500/10 text-ambar-400 border border-ambar-500/30">
                      <HeartHandshake className="h-6 w-6" />
                    </div>
                    <span className="number-marker">02</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-areia-100">
                    Acolhimento & Resgate Social
                  </h3>
                  <p className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
                    Suporte humanitário para pessoas em momentos agudos de sofrimento psíquico, alcoolismo, dependência química e depressão. Através do reencontro com a terra, do trabalho comunitário consciente, de rezos tradicionais e do acolhimento fraterno sem julgamentos.
                  </p>
                </div>
                <ul className="space-y-2.5 text-xs text-areia-400 pt-4 border-t border-ambar-500/15">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-ambar-400" />
                    <span>Integração de práticas etnobotânicas e acolhimento</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-ambar-400" />
                    <span>Oficinas de artesanato caboclo e autonomia</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-ambar-400" />
                    <span>Rede de apoio integrada a templos homologados</span>
                  </li>
                </ul>
              </div>
            </AnimateOnScroll>

            {/* Pilar 3: Salvaguarda das Famílias Guardiãs */}
            <AnimateOnScroll delay={300}>
              <div className="card-elevated rounded-2xl p-8 space-y-6 h-full flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ambar-500/10 text-ambar-400 border border-ambar-500/30">
                      <Users className="h-6 w-6" />
                    </div>
                    <span className="number-marker">03</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-areia-100">
                    Dignidade às Famílias Guardiãs
                  </h3>
                  <p className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
                    Relação direta e justa com coletores, feitores caboclos e comunidades parceiras do Acre (etnias Yawanawá, Huni Kuin, Shawãdawa e famílias ribeirinhas). Remuneração digna, respeito aos tempos sagrados da floresta e fortalecimento da economia comunitária local.
                  </p>
                </div>
                <ul className="space-y-2.5 text-xs text-areia-400 pt-4 border-t border-ambar-500/15">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-ambar-400" />
                    <span>Eliminação completa de intermediários exploratórios</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-ambar-400" />
                    <span>Valorização da sabedoria dos mais velhos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-ambar-400" />
                    <span>Preservação de cantos, rezas e feitios milenares</span>
                  </li>
                </ul>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <SectionDivider variant="botanical" />

      {/* ═══════════════════════════════════════════
          FEATURED DEEP-DIVE: ECOVILA NO VALE DO JURUÁ
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
          <AnimateOnScroll>
            <div className="card-elevated rounded-2xl p-8 sm:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-ambar-400">
                    <Home className="h-4 w-4" />
                    <span>Comunidade Autossustentável em Formação</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-areia-100">
                    Um Santuário Vivo em Cruzeiro do Sul, Acre
                  </h2>
                  <p className="text-areia-300 text-sm sm:text-base leading-relaxed font-light">
                    A estruturação da nossa Ecovila visa consolidar um centro vivo de vivência etnobotânica, pesquisa científica e refúgio espiritual. Não se trata de uma atração turística, mas sim de uma morada de respeito à terra, onde a fitoquímica ancestral e a sabedoria cabocla convivem em perfeita simbiose com o ecossistema amazônico.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="rounded-xl bg-floresta-950/80 p-5 border border-ambar-500/20">
                      <div className="font-semibold text-ambar-400 text-sm mb-1.5 font-serif">
                        Agrofloresta Regenerativa
                      </div>
                      <p className="text-xs text-areia-400 leading-relaxed font-light">
                        Recuperação de áreas com plantio consorciado de espécies nativas de rapé e sacramento.
                      </p>
                    </div>
                    <div className="rounded-xl bg-floresta-950/80 p-5 border border-ambar-500/20">
                      <div className="font-semibold text-ambar-400 text-sm mb-1.5 font-serif">
                        Centro de Feitio Tradicional
                      </div>
                      <p className="text-xs text-areia-400 leading-relaxed font-light">
                        Estrutura com fornalhas de barro, pilões de madeira nobre e controle purista de temperatura.
                      </p>
                    </div>
                  </div>

                  {/* Registro Visual da Ecovila e Manejo */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="overflow-hidden rounded-xl border border-ambar-500/30 bg-floresta-950 group">
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src="/assets/feitio/curadas/feitio-cobertura-caldeiroes.jpg"
                          alt="Estrutura de madeira rústica e caldeirões da casa de feitio em Cruzeiro do Sul"
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, 30vw"
                        />
                      </div>
                      <p className="p-3 text-[11px] text-areia-400 text-center font-light">
                        Estrutura da casa de feitio e manejo agroflorestal no Acre.
                      </p>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-ambar-500/30 bg-floresta-950 group">
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src="/assets/feitio/curadas/feitio-cipo-colheita.jpg"
                          alt="Colheita sustentável de Cipó Mariri na comunidade do Acre"
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, 30vw"
                        />
                      </div>
                      <p className="p-3 text-[11px] text-areia-400 text-center font-light">
                        Colheita regenerativa e justa com o feitor e famílias guardiãs.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col justify-center space-y-5 rounded-2xl border border-ambar-500/30 bg-floresta-950/90 p-8 text-center shadow-elevated">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-ambar-500/10 text-ambar-400 border border-ambar-500/30">
                    <Sun className="h-8 w-8 text-ambar-400 animate-pulse-subtle" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-areia-100">
                    Como Apoiar ou Participar
                  </h3>
                  <p className="text-xs text-areia-300 leading-relaxed font-light">
                    Dirigentes de templos conveniados e irmãos comprometidos com a salvaguarda da floresta podem apoiar este projeto através de rateio cooperativo ou voluntariado técnico homologado.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/contato"
                      className="btn-primary w-full inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider"
                    >
                      <span>Fale com Nossos Guardiões</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider variant="minimal" />

      {/* ═══════════════════════════════════════════
          CTA BOX FINAL
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="card-elevated rounded-2xl p-8 sm:p-14 text-center space-y-6">
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-ambar-400">
                <ShieldCheck className="h-4 w-4" />
                <span>Cooperação Ética e Transparência</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-areia-100 max-w-2xl mx-auto">
                Faça Parte da Nossa Rede de Preservação e Amor à Floresta
              </h2>
              <p className="text-sm sm:text-base text-areia-300 max-w-xl mx-auto leading-relaxed font-light">
                Se a sua congregação busca um alinhamento autêntico, purista e em plena conformidade com a legislação brasileira, inicie o processo de credenciamento litúrgico.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link
                  href="/credenciamento"
                  className="btn-primary inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
                >
                  <span>Credenciamento de Templos</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/medicinas"
                  className="btn-secondary inline-flex items-center gap-2 text-xs font-medium"
                >
                  <span>Conhecer os 15 Rapés Sagrados</span>
                </Link>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}

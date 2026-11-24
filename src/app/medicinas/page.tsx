import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { BookOpen, Leaf, Wind, AlertTriangle, ExternalLink, ArrowRight } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { JornadaNavTracker } from "@/components/funil/JornadaNavTracker";

const CONAD_URL =
  "https://www.gov.br/mj/pt-br/assuntos/sua-protecao/politicas-sobre-drogas/subcapas-senad/conad/atos-do-conad-1/2010/11___resolucao_n__01_2010___conad.pdf";

export const metadata: Metadata = {
  title: "Acervo Etnobotânico | Cooperativa Nativaram",
  description:
    "Acervo cultural sobre a ayahuasca nas tradições ayahuasqueiras brasileiras e o rapé na tradição dos povos da floresta. Conteúdo cultural e etnobotânico. Não é oferta.",
  alternates: {
    canonical: "/sacramentos",
  },
  openGraph: {
    title: "Acervo Etnobotânico | Cooperativa Nativaram",
    description:
      "A ayahuasca nas tradições ayahuasqueiras brasileiras e o rapé na tradição dos povos da floresta. Conteúdo cultural. Não é oferta.",
    images: [
      {
        url: "/assets/feitio/curadas/feitio-lianas-tucunaca-barracao.jpg",
        width: 1280,
        height: 960,
        alt: "Feixes de cipó e ramos de folha reunidos em um barracão de feitio",
      },
    ],
  },
};

export default function AcervoEtnobotanicoPage() {
  return (
    <div className="space-y-0">
      <JornadaNavTracker etapaAtual={3} />

      {/* HERO */}
      <section className="relative overflow-hidden py-section-md lg:py-section-lg">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-ambar-500/[0.04] rounded-full blur-[100px] pointer-events-none" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <AnimateOnScroll>
            <div className="inline-flex items-center gap-2 rounded-full border border-ambar-500/30 bg-floresta-900/80 px-4 py-1.5 text-[11px] font-semibold tracking-[0.15em] text-ambar-300 uppercase">
              <BookOpen className="h-3.5 w-3.5 text-ambar-400" aria-hidden="true" />
              <span>Conteúdo cultural</span>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={150}>
            <h1 className="font-serif text-display-sm sm:text-display-md font-bold text-areia-100">
              Acervo <span className="text-gradient-solar">Etnobotânico</span>
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll delay={250}>
            <p className="text-sm sm:text-base text-areia-300 leading-relaxed font-light max-w-2xl mx-auto">
              Um registro cultural sobre duas tradições da floresta: a ayahuasca nas tradições
              ayahuasqueiras brasileiras e o rapé na tradição dos povos da floresta. Este acervo
              não apresenta itens, valores nem formas de obter qualquer preparado.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* (a) AYAHUASCA */}
      <section
        id="ayahuasca"
        aria-labelledby="titulo-ayahuasca"
        className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-section-sm"
      >
        <AnimateOnScroll>
          <div className="card-elevated rounded-2xl overflow-hidden border border-ambar-500/20 grid grid-cols-1 lg:grid-cols-2">
            <figure className="relative min-h-[260px] lg:min-h-full bg-floresta-900">
              <Image
                src="/assets/feitio/curadas/feitio-lianas-tucunaca-barracao.jpg"
                alt="Feixes de cipó e ramos de folha reunidos em um barracão de feitio, cercado pela mata"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </figure>
            <div className="p-6 sm:p-10 space-y-5 bg-floresta-950/80">
              <div className="flex items-center gap-2 text-ambar-400">
                <Leaf className="h-5 w-5" aria-hidden="true" />
                <span className="text-[11px] uppercase tracking-[0.15em] font-semibold">
                  Tradições ayahuasqueiras
                </span>
              </div>
              <h2 id="titulo-ayahuasca" className="font-serif text-2xl sm:text-3xl font-bold text-areia-100">
                A ayahuasca nas tradições ayahuasqueiras brasileiras
              </h2>
              <div className="space-y-4 text-sm text-areia-300 leading-relaxed font-light">
                <p>
                  <strong className="text-areia-100 font-semibold">Cipó e folha.</strong> A bebida
                  sacramental nasce do encontro de duas plantas da floresta: o cipó{" "}
                  <em>Banisteriopsis caapi</em>, conhecido como jagube ou mariri, e a folha da{" "}
                  <em>Psychotria viridis</em>, conhecida como chacrona ou rainha.
                </p>
                <p>
                  <strong className="text-areia-100 font-semibold">Feitio.</strong> O preparo é
                  um trabalho coletivo e ritual. O cipó é colhido, limpo e macerado; a folha é
                  colhida e selecionada; os dois são cozidos juntos por longas horas, com cantos,
                  silêncio e orientação de quem conduz o feitio.
                </p>
                <p>
                  <strong className="text-areia-100 font-semibold">Contexto ritual.</strong> No
                  Brasil, a ayahuasca é consagrada em cerimônias religiosas de tradições nascidas
                  na Amazônia, com hinos, orações e uma doutrina própria de cada casa. O sentido
                  do sacramento está na prática religiosa e comunitária.
                </p>
                <p>
                  <strong className="text-areia-100 font-semibold">Marco normativo.</strong> O uso
                  religioso da ayahuasca é tratado pela{" "}
                  <a
                    href={CONAD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ambar-300 underline underline-offset-4 hover:text-ambar-200 inline-flex items-center gap-1"
                  >
                    Resolução CONAD nº 1/2010
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                  , que reconhece a legitimidade do uso religioso e estabelece princípios
                  deontológicos para as entidades.
                </p>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      <SectionDivider variant="botanical" />

      {/* (b) RAPÉ */}
      <section
        id="rape"
        aria-labelledby="titulo-rape"
        className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-section-sm"
      >
        <AnimateOnScroll>
          <div className="card-elevated rounded-2xl overflow-hidden border border-ambar-500/20">
            <div className="p-6 sm:p-10 space-y-5 bg-floresta-950/80 max-w-3xl">
              <div className="flex items-center gap-2 text-ambar-400">
                <Wind className="h-5 w-5" aria-hidden="true" />
                <span className="text-[11px] uppercase tracking-[0.15em] font-semibold">
                  Povos da floresta
                </span>
              </div>
              <h2 id="titulo-rape" className="font-serif text-2xl sm:text-3xl font-bold text-areia-100">
                O rapé na tradição dos povos da floresta
              </h2>

              <p
                role="note"
                className="rounded-xl border-2 border-ambar-500/50 bg-ambar-500/10 p-4 text-sm text-areia-100 leading-relaxed font-medium"
              >
                Conteúdo cultural e etnobotânico. Não é oferta. O rapé contém tabaco e nicotina,
                que causam dependência. Proibido para menores de 18 anos.
              </p>

              <div className="space-y-4 text-sm text-areia-300 leading-relaxed font-light">
                <p>
                  Entre povos indígenas da Amazônia, o rapé é um pó de tabaco moído e misturado a
                  cinzas de cascas de árvores e a outras plantas. Seu uso é coletivo e ligado à
                  vida cerimonial, ao canto e à palavra, e cada povo guarda seus próprios saberes
                  sobre ele.
                </p>
                <p>
                  <strong className="text-areia-100 font-semibold">Artefatos.</strong> O sopro é
                  feito com instrumentos próprios. O <em>kuripe</em> é um pequeno tubo em forma de
                  &quot;V&quot;, usado pela própria pessoa. O <em>tepi</em> é um tubo mais longo,
                  usado quando uma pessoa sopra para outra. São feitos de madeira, osso ou bambu,
                  e muitas vezes trazem grafismos e adornos.
                </p>
                <p>
                  A tradição do rapé depende da floresta em pé: das árvores que dão as cinzas, das
                  roças de tabaco e da transmissão do conhecimento entre gerações.
                </p>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* (c) AVISO */}
      <section className="pb-section-sm mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div
          role="note"
          className="rounded-xl border border-ambar-500/30 bg-floresta-950/80 p-6 text-center space-y-3"
        >
          <div className="flex items-center justify-center gap-2 text-ambar-400">
            <AlertTriangle className="h-4 w-4" aria-hidden="true" />
            <p className="font-serif text-base font-bold text-areia-100">
              Conteúdo cultural. Não é oferta.
            </p>
          </div>
          <p className="text-xs text-areia-300 leading-relaxed font-light">
            Este site é institucional. Não vendemos, não recebemos pedidos e não fazemos envios.
            Não há valores nem formulários de pedido. Conteúdo destinado a maiores de 18 anos.
          </p>
          <Link
            href="/transparencia"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-ambar-300 underline underline-offset-4 hover:text-ambar-200"
          >
            Ver a página de transparência
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import {
  Compass,
  TreePine,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Route,
  ChevronRight,
} from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const passosDoFunil = [
  {
    passo: "01",
    titulo: "Origem & Vocação",
    subtitulo: "Manifesto & Aliança Sagrada",
    descricao:
      "A gênese dos Nascidos do Raio de Sol, salvaguarda dos saberes originários e economia solidária desmercantilizada.",
    href: "/institucional",
    icone: Compass,
    cta: "Conhecer Origem",
  },
  {
    passo: "02",
    titulo: "Feitio Purista",
    subtitulo: "Alquimia da Floresta",
    descricao:
      "Filtragem em menores micras, biomassa 60/40, recusa categórica a Anayahuascas e vigília sagrada no Acre.",
    href: "/feitio",
    icone: TreePine,
    cta: "Explorar Feitio",
  },
  {
    passo: "03",
    titulo: "Sacramentos",
    subtitulo: "Compêndio Etnobotânico",
    descricao:
      "As 4 graduações de Ayahuasca (1.8 a 10.1 Wirapuru), 15 rapés sagrados tamponados (pH 10) e Sananga ancestral.",
    href: "/medicinas",
    icone: Sparkles,
    cta: "Ver Sacramentos",
  },
  {
    passo: "04",
    titulo: "Marco Legal",
    subtitulo: "Segurança Jurídica & CONAD",
    descricao:
      "Pleno amparo constitucional (Art. 5º CF/88), Resolução CONAD nº 01/2010 e Marco Sanitário ANVISA 2025.",
    href: "/compliance",
    icone: ShieldCheck,
    cta: "Checar Garantias",
  },
  {
    passo: "05",
    titulo: "Credenciamento",
    subtitulo: "Homologação do Templo",
    descricao:
      "O clímax da aliança: submissão de cadastro institucional para dirigentes e acolhimento pelo Conselho Guardião.",
    href: "/credenciamento",
    icone: CheckCircle2,
    cta: "Credenciar Templo",
    destaque: true,
  },
];

export const HomeJornadaFunil = () => {
  return (
    <section
      className="py-section-md lg:py-section-lg relative overflow-hidden bg-gradient-to-b from-floresta-950 via-floresta-900/40 to-floresta-950 border-b border-ambar-500/10"
      id="jornada-didatica"
    >
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-radial-ambar opacity-60 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 lg:mb-16">
          <AnimateOnScroll>
            <Badge variant="solar" dot icon={<Route className="h-3.5 w-3.5" />}>
              O Caminho Didático da Salvaguarda
            </Badge>
          </AnimateOnScroll>

          <AnimateOnScroll delay={150}>
            <h2 className="font-serif text-display-xs sm:text-display-sm lg:text-display-md font-bold text-areia-100 text-glow">
              Como Navegar &amp; Ingressar na{" "}
              <span className="text-gradient-solar">Cooperativa Nativaram</span>
            </h2>
          </AnimateOnScroll>

          <AnimateOnScroll delay={300}>
            <p className="text-sm sm:text-base text-areia-300/90 font-light leading-relaxed">
              Estruturamos nossa plataforma para guiar dirigentes e guardiões passo a passo: desde a compreensão da nossa gênese até o credenciamento formal do seu templo.
            </p>
          </AnimateOnScroll>
        </div>

        {/* Grid Interativo das 5 Estações do Funil */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-3 relative">
          {passosDoFunil.map((passo, idx) => {
            const Icone = passo.icone;
            const isDestaque = passo.destaque;

            return (
              <AnimateOnScroll key={passo.passo} delay={idx * 100} className="h-full">
                <Card
                  variant={isDestaque ? "solar" : "liturgico"}
                  glow={isDestaque}
                  className={`h-full flex flex-col justify-between p-5 rounded-2xl transition-all duration-300 hover:translate-y-[-3px] ${
                    isDestaque
                      ? "border-ambar-500/50 bg-gradient-to-b from-floresta-900 to-floresta-950 shadow-[0_0_30px_rgba(212,163,89,0.15)] ring-1 ring-ambar-500/30"
                      : "border-ambar-500/15 bg-floresta-950/80 hover:border-ambar-500/35"
                  }`}
                >
                  <div className="space-y-3.5">
                    {/* Topo do Card com Número e Ícone */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-ambar-400/80 bg-floresta-900/90 px-2 py-0.5 rounded border border-ambar-500/20">
                        {passo.passo}
                      </span>
                      <div
                        className={`p-2 rounded-xl border ${
                          isDestaque
                            ? "bg-ambar-500/20 border-ambar-500/40 text-ambar-300"
                            : "bg-floresta-900/60 border-ambar-500/15 text-ambar-400"
                        }`}
                      >
                        <Icone className="h-4 w-4" />
                      </div>
                    </div>

                    {/* Títulos */}
                    <div>
                      <h3 className="font-serif text-base font-bold text-areia-100 group-hover:text-ambar-300 transition-colors">
                        {passo.titulo}
                      </h3>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-ambar-400/90 font-medium mt-0.5">
                        {passo.subtitulo}
                      </p>
                    </div>

                    {/* Descrição Didática */}
                    <p className="text-xs text-areia-300/80 leading-relaxed font-light">
                      {passo.descricao}
                    </p>
                  </div>

                  {/* CTA de Acesso à Estação */}
                  <div className="pt-4 mt-2 border-t border-ambar-500/10">
                    <Link
                      href={passo.href}
                      className={`w-full flex items-center justify-between py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-200 ${
                        isDestaque
                          ? "btn-primary justify-center text-[11px] py-2"
                          : "text-ambar-300 hover:text-areia-100 hover:bg-floresta-900/60 bg-floresta-900/30 border border-ambar-500/20"
                      }`}
                    >
                      <span>{passo.cta}</span>
                      <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                    </Link>
                  </div>
                </Card>
              </AnimateOnScroll>
            );
          })}
        </div>

        {/* Dica de Orientação para Primeira Visita */}
        <AnimateOnScroll delay={600}>
          <div className="mt-8 p-4 rounded-xl border border-ambar-500/20 bg-floresta-900/40 text-center flex flex-col sm:flex-row items-center justify-center gap-3">
            <span className="text-xs text-areia-300 font-light">
              <strong className="text-areia-100 font-medium">Primeira vez no portal?</strong> Sugerimos seguir o caminho passo a passo começando pelo Manifesto Institucional.
            </span>
            <Link
              href="/institucional"
              className="inline-flex items-center gap-1 text-xs font-semibold text-ambar-400 hover:text-ambar-300 underline underline-offset-4 decoration-ambar-500/40 shrink-0"
            >
              <span>Iniciar Jornada pelo Passo 01</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

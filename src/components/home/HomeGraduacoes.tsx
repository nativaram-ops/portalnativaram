import React from "react";
import Link from "next/link";
import { Compass, ArrowRight, Droplets, Lock } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Badge } from "@/components/ui/Badge";

const graduacoes = [
  {
    grad: "3.1",
    name: "Mainumbi",
    bird: "Beija-flor",
    dose: "90 a 120 ml",
    duracao: "3h a 4h",
    rateio: "Sob credenciamento",
    strength: 25,
    desc: "Voo manso e acolhedor. Ideal para ritos de acolhimento fraterno, introspecções suaves e iniciantes na sagrada comunhão vegetal.",
  },
  {
    grad: "5.1",
    name: "Pituã",
    bird: "Bem-te-vi",
    dose: "70 a 100 ml",
    duracao: "4h a 5h",
    rateio: "Sob credenciamento",
    strength: 50,
    desc: "Clareza mental cristalina, equilíbrio perene e firmeza serena. Proporciona harmonização completa do campo cerimonial e foco meditativo.",
  },
  {
    grad: "7.1",
    name: "Anhangatã",
    bird: "Rouxinol",
    dose: "50 a 90 ml",
    duracao: "5h a 6h",
    rateio: "Sob credenciamento",
    strength: 75,
    desc: "Miração límpida e canto da alma. Indicado para ritos solenes, celebrações doutrinárias profundas e trabalhos espirituais de alinhamento.",
  },
  {
    grad: "10.1",
    name: "Wirapuru",
    bird: "Semi-Mel",
    dose: "30 a 50 ml",
    duracao: "6h a 8h",
    rateio: "Sob credenciamento",
    strength: 100,
    desc: "Densidade máxima e visão de longo alcance. Concentração robusta de cipó Tucunacá para vigílias litúrgicas e sustentação de egrégoras elevadas.",
    featured: true,
  },
];

export const HomeGraduacoes = () => {
  return (
    <section className="py-section-md lg:py-section-lg" id="graduacoes">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Lado Esquerdo: Compreensão Técnica e os Dois Preceitos Sagrados */}
          <AnimateOnScroll className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="space-y-2">
              <Badge variant="solar" icon={<Compass className="h-3.5 w-3.5" />}>
                Estudo Tradicional Daimista
              </Badge>
              <h2 className="font-serif text-display-sm font-bold text-areia-100">
                Compreensão Técnica
                <br />
                <span className="text-gradient-solar">& Concentração</span>
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
              A numeração que define nossas graduações (ex: <strong>3.1, 5.1, 7.1, 10.1</strong>) parte da referência ao estudo tradicional daimista.
              Neste sistema, o sacramento é dividido rigorosamente pela concentração de matéria-prima utilizada. Essa métrica garante que o dirigente e o buscador compreendam a <strong>densidade energética de cada preparado</strong>, permitindo uma escolha alinhada ao rigor do trabalho espiritual.
            </p>

            {/* Os 2 Preceitos Fundamentais */}
            <div className="space-y-3.5 pt-2">
              <div className="p-4 rounded-xl bg-floresta-900/80 border border-ambar-500/30 space-y-1.5 shadow-sm">
                <span className="text-xs font-bold text-ambar-300 flex items-center gap-1.5">
                  <span>1️⃣</span> Porções Sugeridas: O Sacramento é Soberano
                </span>
                <p className="text-xs text-areia-300 leading-relaxed font-light">
                  Estas medidas são médias baseadas na experiência de nossos feitios. O sacramento é soberano; atente-se sempre à sensibilidade individual e ao propósito litúrgico do momento.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-floresta-900/80 border border-ambar-500/30 space-y-1.5 shadow-sm">
                <span className="text-xs font-bold text-ambar-300 flex items-center gap-1.5">
                  <span>2️⃣</span> Manipulação Sagrada: O Rito de Servir
                </span>
                <p className="text-xs text-areia-300 leading-relaxed font-light">
                  O processo de servir o sacramento é um rito sagrado. Mantenha o ambiente em oração e reverência, preservando a força depositada em cada gota.
                </p>
              </div>
            </div>

            {/* Aviso de Rateio Restrito */}
            <div className="p-4 rounded-xl bg-floresta-950/80 border border-ambar-500/25 space-y-1.5 text-left">
              <span className="text-[11px] font-mono text-ambar-400 uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                <Lock className="h-3.5 w-3.5" />
                Valores Exclusivos para Entidades Cadastradas
              </span>
              <p className="text-xs text-areia-300/85 leading-relaxed font-light">
                As cotas de rateio operacional não são expostas publicamente. Elas são encaminhadas diretamente aos dirigentes responsáveis após o devido credenciamento e homologação litúrgica da congregação.
              </p>
            </div>

            <div className="pt-1">
              <Link
                href="/credenciamento"
                className="inline-flex items-center gap-2 text-xs font-semibold text-ambar-400 hover:text-ambar-300 transition-colors"
              >
                <span>Solicitar credenciamento institucional para cotas de rateio</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </AnimateOnScroll>

          {/* Lado Direito: As 4 Graduações + Mel/Gel */}
          <div className="lg:col-span-7 space-y-4">
            {graduacoes.map(({ grad, name, bird, dose, duracao, rateio, strength, desc, featured }, i) => (
              <AnimateOnScroll key={grad} delay={i * 90} direction="right">
                <div
                  className={`rounded-xl p-5 sm:p-6 space-y-3 transition-all duration-300 ${
                    featured
                      ? "card-elevated ring-1 ring-ambar-500/40 bg-floresta-900/85 shadow-solar"
                      : "card-liturgico hover:border-ambar-500/40"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-baseline gap-2.5">
                      <span
                        className={`font-serif text-2xl font-bold ${
                          featured ? "text-ambar-300" : "text-ambar-400"
                        }`}
                      >
                        {grad}
                      </span>
                      <span className="font-serif text-lg font-semibold text-areia-100">
                        {name}
                      </span>
                      <span className="text-[11px] text-areia-400 italic">
                        ({bird})
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                      <span className="text-areia-300 bg-floresta-800/80 border border-ambar-500/20 px-2 py-0.5 rounded">
                        Porção: {dose}
                      </span>
                      <span className="text-ambar-300/90 bg-ambar-500/10 border border-ambar-500/20 px-2 py-0.5 rounded inline-flex items-center gap-1">
                        <Lock className="h-2.5 w-2.5 text-ambar-400" />
                        <span>Rateio sob credenciamento</span>
                      </span>
                    </div>
                  </div>

                  {/* Barra de Densidade */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 rounded-full bg-floresta-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-ambar-600 via-ambar-500 to-ambar-400 transition-all duration-1000"
                        style={{ width: `${strength}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-ambar-400/80 font-mono w-8 text-right">
                      {strength}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-areia-400/70 font-mono">
                    <span>Ciclo ritualístico: ~{duracao}</span>
                    <span>HPLC Tucunacá • Cruzeiro do Sul (AC)</span>
                  </div>

                  <p className="text-xs text-areia-300 leading-relaxed font-light">
                    {desc}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}

            {/* Formatos Especiais Mel & Gel */}
            <AnimateOnScroll delay={400} direction="right">
              <div className="rounded-xl border border-ambar-500/35 bg-gradient-to-br from-floresta-900 via-floresta-950 to-floresta-900 p-6 space-y-3.5 shadow-solar">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-ambar-500/15 pb-3">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-ambar-400" />
                    <h4 className="font-serif text-sm sm:text-base font-bold text-areia-100">
                      Formatos Especiais de Otimização: Mel & Gel
                    </h4>
                  </div>
                  <Badge variant="solar" size="sm">
                    Economia Logística
                  </Badge>
                </div>
                <p className="text-xs text-areia-200 leading-relaxed font-light">
                  Para congregações com grande número de associados ou situadas em estados mais distantes, disponibilizamos
                  o sacramento nas consistências <strong>Mel</strong> e <strong>Gel</strong>. Essas graduações superconcentradas
                  permitem <strong>reduzir drasticamente o peso e o volume do frete aéreo</strong>, mantendo estabilidade e conservação excelentes por meses.
                </p>
                <div className="flex items-center justify-between pt-1 text-[11px] text-ambar-300/90 font-mono">
                  <span>Sob encomenda prévia na ficha de credenciamento</span>
                  <Link
                    href="/credenciamento"
                    className="inline-flex items-center gap-1 font-semibold hover:text-ambar-300 transition-colors"
                  >
                    <span>Solicitar</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
};

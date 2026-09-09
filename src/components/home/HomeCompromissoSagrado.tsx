import React from "react";
import Link from "next/link";
import { Flame, ShieldCheck, Scale, HeartHandshake, Sparkles, ArrowRight } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const pilaresConformidade = [
  {
    titulo: "Herança Botânica & Alquimia",
    descricao:
      "Nossos preparados são frutos da sabedoria botânica tradicional da floresta amazônica. Não exercemos atos privativos da medicina alopática.",
    icone: Sparkles,
    badge: "Etnobotânica",
  },
  {
    titulo: "Florescimento & Serenidade",
    descricao:
      "Em consonância estrita com a ANVISA, não prometemos desfechos clínicos ou curas. Convidamos à pausa consciente e ao reequilíbrio vital dos sentidos.",
    icone: HeartHandshake,
    badge: "Marco ANVISA 2025",
  },
  {
    titulo: "Rateio de Custos Solidário",
    descricao:
      "A Resolução CONAD nº 01/2010 veda peremptoriamente o comércio da Ayahuasca. Operamos por rateio estrito de logística, biomassa e manejo sustentável.",
    icone: Scale,
    badge: "CONAD 01/2010",
  },
  {
    titulo: "Acolhimento aos Templos",
    descricao:
      "Sob o amparo do Art. 5º, VI da Carta Magna (liberdade de culto), a partilha litúrgica é restrita a dirigentes de congregações devidamente homologadas.",
    icone: ShieldCheck,
    badge: "Art. 5º, VI CF/88",
  },
];

export const HomeCompromissoSagrado = () => {
  return (
    <section
      className="py-section-md lg:py-section-lg relative overflow-hidden bg-gradient-to-b from-floresta-950 via-floresta-900/30 to-floresta-950 border-b border-ambar-500/10"
      id="compromisso-sagrado"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-radial-ambar opacity-60 pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
        <AnimateOnScroll>
          <Card
            variant="liturgico"
            glow
            className="rounded-3xl p-6 sm:p-12 border-ambar-500/30 bg-gradient-to-br from-floresta-950 via-floresta-900/80 to-floresta-950 text-center space-y-8"
          >
            {/* Badge de Responsabilidade */}
            <div className="flex justify-center">
              <Badge
                variant="solar"
                dot
                icon={<Flame className="h-3.5 w-3.5 text-ambar-400 animate-flicker" />}
              >
                Compromisso Litúrgico &amp; Salvaguarda
              </Badge>
            </div>

            {/* Declaração Central */}
            <div className="space-y-4 max-w-3xl mx-auto">
              <h2 className="font-serif text-display-xs sm:text-display-sm lg:text-display-md font-bold text-areia-100 leading-snug">
                &ldquo;A Cooperativa Nativaram compreende a Ayahuasca como um portal sagrado.&rdquo;
              </h2>
              <p className="text-sm sm:text-base text-areia-200/90 font-light leading-relaxed">
                Zelamos pela integridade de cada etapa, realizando a seleção e homologação prévia de todas as instituições a quem destinamos os sacramentos. Nosso compromisso é assegurar que a força vegetal chegue a mãos que honrem seu propósito espiritual.
              </p>
            </div>

            {/* Grid dos 4 Pilares de Conformidade e Proteção */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left pt-2">
              {pilaresConformidade.map((pilar) => {
                const Icone = pilar.icone;
                return (
                  <div
                    key={pilar.titulo}
                    className="p-4 rounded-xl bg-floresta-950/80 border border-ambar-500/15 flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Icone className="h-4 w-4 text-ambar-400" />
                        <span className="text-[9px] font-mono font-bold text-ambar-400/90 uppercase tracking-wider bg-floresta-900 px-1.5 py-0.5 rounded border border-ambar-500/20">
                          {pilar.badge}
                        </span>
                      </div>
                      <h4 className="font-serif text-xs font-bold text-areia-100">
                        {pilar.titulo}
                      </h4>
                      <p className="text-[11px] text-areia-300/80 leading-relaxed font-light">
                        {pilar.descricao}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Rodapé Interno com Direcionamento ao Marco Legal */}
            <div className="pt-4 border-t border-ambar-500/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-areia-300 font-light text-center sm:text-left">
                Salvaguarda Litúrgica sem fins lucrativos • Resolução CONAD nº 01/2010
              </span>
              <Link
                href="/compliance"
                className="inline-flex items-center gap-1.5 font-semibold text-ambar-300 hover:text-areia-100 transition-colors"
              >
                <span>Conhecer o Marco Legal &amp; Laudos em Detalhes</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Card>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

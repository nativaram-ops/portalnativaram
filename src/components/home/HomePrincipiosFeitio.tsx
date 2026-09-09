import React from "react";
import Image from "next/image";
import { Sparkles, Scale, Leaf, Flame } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const HomePrincipiosFeitio = () => {
  return (
    <section className="py-section-md lg:py-section-lg" id="principios-feitio">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="flex justify-center">
            <Badge variant="solar" icon={<Sparkles className="h-3.5 w-3.5 text-ambar-400" />}>
              Alquimia Consciente
            </Badge>
          </div>
          <h2 className="font-serif text-display-sm sm:text-display-md font-bold text-areia-100">
            Princípios do Nosso Feitio & Origem do Estudo
          </h2>
          <p className="text-sm text-areia-300 max-w-2xl mx-auto leading-relaxed font-light">
            Nosso sacramento é fruto de uma alquimia consciente, onde a ciência do espírito encontra a disciplina da prática. Nossos princípios norteadores nascem de um estudo profundo que une três vertentes fundamentais:
          </p>
        </AnimateOnScroll>

        {/* 3 Pilares Doutrinários — Composição Editorial Assimétrica Anti-Slop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-stretch">
          {/* 1. Rigor Doutrinário — Card Principal de Destaque (7 cols) */}
          <AnimateOnScroll delay={100} className="lg:col-span-7 flex">
            <Card
              variant="elevated"
              glow
              className="p-8 sm:p-10 space-y-6 h-full w-full border-ambar-500/30 bg-floresta-900/80 shadow-solar relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-ambar-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <Card.Header>
                <div className="flex items-center gap-2">
                  <Card.Badge>Pilar I • Tradição Canônica</Card.Badge>
                  <span className="text-[10px] text-ambar-400 font-mono tracking-wider uppercase bg-ambar-500/10 px-2 py-0.5 rounded border border-ambar-500/20">
                    Sustentação
                  </span>
                </div>
                <Card.Icon>
                  <Scale className="h-5 w-5 text-ambar-300" />
                </Card.Icon>
              </Card.Header>

              <div className="space-y-3">
                <Card.Title className="text-2xl sm:text-3xl font-serif text-areia-100">
                  Rigor Doutrinário das Grandes Escolas
                </Card.Title>
                <Card.Description className="text-sm sm:text-base text-areia-200/90 leading-relaxed font-light">
                  Herdamos o padrão inegociável de qualidade, ordem e pureza no preparo das grandes escolas ayahuasqueiras (<strong>Santo Daime e União do Vegetal</strong>). Cada etapa do feitio sagrado respeita o silêncio absoluto, a concentração, a oração contínua e a hierarquia espiritual consagrada.
                </Card.Description>
              </div>

              {/* Bloco de Citação Editorial Solene */}
              <div className="p-4 rounded-xl border-l-2 border-ambar-500/60 bg-floresta-950/70 space-y-1">
                <p className="font-serif italic text-xs sm:text-sm text-areia-200 leading-relaxed">
                  &ldquo;A ordem e a pureza no preparo não são meras regras formais, mas a própria sustentação da egrégora que acolhe os buscadores de luz.&rdquo;
                </p>
                <span className="text-[11px] text-ambar-400/80 font-mono block">
                  — Preceito da Casa de Feitio Nativaram
                </span>
              </div>

              <Card.Footer className="pt-2 border-t border-ambar-500/15">
                <span className="text-xs font-semibold text-ambar-300 flex items-center gap-1.5">
                  ✦ Padrão das grandes linhagens &bull; Santo Daime & UDV
                </span>
              </Card.Footer>
            </Card>
          </AnimateOnScroll>

          {/* Coluna Direita: Pilares II e III Articulados (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            {/* 2. Sabedoria Ancestral */}
            <AnimateOnScroll delay={200} className="flex-1">
              <Card
                variant="elevated"
                className="p-6 sm:p-7 space-y-4 h-full border-ambar-500/20 bg-floresta-900/60 shadow-sm hover:border-ambar-500/40"
              >
                <Card.Header>
                  <Card.Badge>Pilar II • Memória Viva</Card.Badge>
                  <Card.Icon>
                    <Leaf className="h-5 w-5 text-emerald-400" />
                  </Card.Icon>
                </Card.Header>
                <Card.Title className="text-lg sm:text-xl">Sabedoria dos Povos da Floresta</Card.Title>
                <Card.Description className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
                  Honramos o conhecimento milenar dos <strong>povos originários</strong> no trato, diálogo e colheita com as plantas mestras da Amazônia. Respeitamos o tempo das estações, o orvalho da manhã e os espíritos guardiões da mata.
                </Card.Description>
                <Card.Footer className="pt-1">
                  <span className="text-[11px] text-emerald-400/90 font-mono">✦ Diálogo com a floresta viva</span>
                </Card.Footer>
              </Card>
            </AnimateOnScroll>

            {/* 3. Mestre Feitor & Rede Credenciada */}
            <AnimateOnScroll delay={300} className="flex-1">
              <Card
                variant="elevated"
                className="p-6 sm:p-7 space-y-4 h-full border-ambar-500/20 bg-floresta-900/60 shadow-sm hover:border-ambar-500/40"
              >
                <Card.Header>
                  <Card.Badge>Pilar III • Prática Cabocla</Card.Badge>
                  <Card.Icon>
                    <Flame className="h-5 w-5 text-ambar-400" />
                  </Card.Icon>
                </Card.Header>
                <Card.Title className="text-lg sm:text-xl">Mestre Feitor & Rede Credenciada</Card.Title>
                <Card.Description className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
                  O equilíbrio de cada sacramento une décadas de prática do nosso <strong>mestre feitor caboclo</strong> à cooperação com centros tradicionais no Acre, garantindo uniformidade fitoquímica e alta vibração serena.
                </Card.Description>
                <Card.Footer className="pt-1">
                  <span className="text-[11px] text-ambar-400/90 font-mono">✦ Cruzeiro do Sul &bull; Vale do Juruá</span>
                </Card.Footer>
              </Card>
            </AnimateOnScroll>
          </div>
        </div>

        {/* O Equilíbrio Sagrado das Matérias-Primas (A Proporção das Plantas) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <AnimateOnScroll className="lg:col-span-6 space-y-5">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-ambar-400">
                Harmonia das Matérias-Primas
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-areia-100">
                O Equilíbrio Sagrado: Jagube & Rainha
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
              No feitio tradicional, o equilíbrio manifesta-se na proporção equilibrada entre o <strong>Cipó Jagube (60%)</strong> e a <strong>Folha Chacrona Rainha (40%)</strong>.
              Não é uma fórmula mecânica, mas a união harmoniosa entre a estrutura que ancora e a luz que eleva:
            </p>

            <div className="space-y-3">
              <div className="p-4 rounded-xl border border-ambar-500/25 bg-floresta-950/70 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-amber-300 font-serif">60% Cipó Tucunacá (Caule Liso) — Força & Firmeza</span>
                  <span className="text-[10px] text-amber-400/80 font-mono">Harmina & THH</span>
                </div>
                <p className="text-xs text-areia-300 font-light leading-relaxed">
                  Variedade de caule liso nobre que proporciona um alinhamento sereno e lúcido, com teor residual ínfimo de harmalina (0,65 mg/g), prevenindo os tremores somáticos e náuseas severas causadas pela variedade Caupuri.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-emerald-500/25 bg-floresta-950/70 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-emerald-300 font-serif">40% Folha Chacrona Rainha — Luz & Visão Cristalina</span>
                  <span className="text-[10px] text-emerald-400/80 font-mono">Colheita ao Amanhecer</span>
                </div>
                <p className="text-xs text-areia-300 font-light leading-relaxed">
                  Folhas frescas de <em>Psychotria viridis</em> colhidas exclusivamente no orvalho do alvorecer sob rezo, trazendo a clareza mental, as mirações serenas e a expansão harmoniosa da consciência.
                </p>
              </div>
            </div>

            <div className="rounded-xl p-4 bg-floresta-950 border border-ambar-500/20 space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-amber-400">60% Força Estrutural (Jagube)</span>
                <span className="text-emerald-400">40% Luz & Claridade (Rainha)</span>
              </div>
              <div className="h-2.5 rounded-full bg-floresta-800 overflow-hidden flex">
                <div className="h-full bg-gradient-to-r from-amber-600 to-amber-400 w-[60%]" />
                <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 w-[40%]" />
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll className="lg:col-span-6" direction="right">
            <div className="relative rounded-2xl overflow-hidden border border-ambar-500/30 shadow-elevated group">
              <div className="relative h-80 sm:h-96 lg:h-[460px]">
                <Image
                  src="/assets/feitio/curadas/feitio-panelas-chacrona-cipo.jpg"
                  alt="Feitio da Ayahuasca: camadas sagradas de Chacrona e Cipó em tachos de aço inox"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-floresta-950 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-floresta-950/85 backdrop-blur-md border border-ambar-500/20 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-ambar-400 tracking-wider">
                    Cozimento sob Vigília em Aço Inox
                  </span>
                  <p className="text-xs text-areia-200 font-light">
                    Fogo a lenha contínuo, água pura de fonte e preces durante as 12 horas de decocção sob a abóbada estrelada do Acre.
                  </p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
};

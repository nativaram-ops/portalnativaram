import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sun, Sprout, Bird, Users, ArrowRight, Info } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { CreditoFoto } from "@/components/manifesto/CreditoFoto";

/* Projetos de Luz: só a intenção socioambiental do projeto (plano 013).
   Sem valores, sem rateio, sem doação de sacramento e sem métricas não verificadas. */

interface IntencaoLuz {
  icone: React.ElementType;
  titulo: string;
  descricao: string;
}

const intencoes: IntencaoLuz[] = [
  {
    icone: Sprout,
    titulo: "Agrofloresta e reflorestamento",
    descricao:
      "Intenção de plantar, em sistemas agroflorestais, o cipó (Banisteriopsis caapi) e a folha (Psychotria viridis) junto a espécies nativas da bacia do Rio Juruá, para que a colheita não dependa da mata primária.",
  },
  {
    icone: Bird,
    titulo: "Fauna e habitats da Ararajuba",
    descricao:
      "Intenção de manter copas e árvores nativas em pé, cuidar de nascentes e de corredores para polinizadores, e respeitar as áreas de ninhos da Ararajuba (Guaruba guarouba).",
  },
  {
    icone: Users,
    titulo: "Comunidades da floresta",
    descricao:
      "Intenção de apoiar o intercâmbio intercultural e o resgate de saberes tradicionais, com respeito à autonomia das comunidades e sem vínculo produtivo com elas.",
  },
];

const FOTO_TERRITORIO = "/assets/manifesto/cruzeiro-do-sul-rio-moa-acre.jpg";

export function ProjetoDeLuzLanding() {
  return (
    <div className="space-y-0">
      {/* HERO */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 z-0">
          <Image
            src={FOTO_TERRITORIO}
            alt="Floresta e o Rio Moa no Parque Nacional da Serra do Divisor, Cruzeiro do Sul, Acre"
            fill
            priority
            className="object-cover object-center brightness-[0.4]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-floresta-950 via-floresta-950/70 to-floresta-950/40" />
        </div>
        <CreditoFoto arquivo={FOTO_TERRITORIO} className="absolute bottom-3 right-4 z-10" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <AnimateOnScroll>
            <div className="inline-flex items-center gap-2 rounded-full border border-ambar-500/30 bg-floresta-950/85 px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-ambar-400 uppercase">
              <Sun className="h-3.5 w-3.5 text-ambar-400" aria-hidden="true" />
              <span>Intenção socioambiental</span>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={150}>
            <h1 className="font-serif text-display-md sm:text-display-lg font-bold text-areia-100 leading-[1.1]">
              Projetos de <span className="text-gradient-solar">Luz</span>
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll delay={300}>
            <p className="text-sm sm:text-base text-areia-200 leading-relaxed font-light max-w-2xl mx-auto">
              Os Projetos de Luz reúnem a intenção socioambiental da Cooperativa Nativaram para o
              Vale do Juruá, em Cruzeiro do Sul (Acre): regenerar a floresta, cuidar da fauna e
              apoiar as comunidades da floresta.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider variant="solar" />

      {/* ESTADO DO PROJETO */}
      <section className="py-section-sm mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div
          role="note"
          className="rounded-2xl border border-ambar-500/30 bg-floresta-950/80 p-6 flex items-start gap-3"
        >
          <Info className="h-5 w-5 text-ambar-400 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-areia-300 leading-relaxed font-light">
            A Cooperativa Nativaram é um projeto de cooperativa em constituição, ainda sem registro
            e sem CNPJ. Os Projetos de Luz são intenções em planejamento: ainda não têm recursos
            próprios, metas aprovadas nem resultados a relatar.
          </p>
        </div>
      </section>

      {/* INTENÇÕES */}
      <section className="py-section-md bg-floresta-950/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-areia-100">
              O que pretendemos cultivar
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {intencoes.map((item, index) => {
              const Icon = item.icone;
              return (
                <AnimateOnScroll key={item.titulo} delay={index * 120}>
                  <div className="card-elevated rounded-2xl p-6 space-y-4 h-full bg-floresta-900/40">
                    <div className="h-12 w-12 rounded-xl bg-ambar-500/10 border border-ambar-500/30 flex items-center justify-center text-ambar-400">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-areia-100">{item.titulo}</h3>
                    <p className="text-sm text-areia-300/90 leading-relaxed font-light">
                      {item.descricao}
                    </p>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      <SectionDivider variant="floresta" />

      {/* LINKS */}
      <section className="py-section-md">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <p className="text-sm text-areia-300 font-light leading-relaxed max-w-2xl mx-auto">
            Este site é institucional. Não vendemos, não recebemos pedidos e não fazemos envios.
            Não há valores nem formulários de pedido.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/institucional" className="btn-secondary">
              <span>Conhecer o Manifesto</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/transparencia" className="btn-secondary">
              <span>Transparência</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

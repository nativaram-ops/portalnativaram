import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight, Landmark } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

/**
 * Seção da home sobre quem pode dialogar com o projeto.
 * Sem formulário e sem cadastro: o contato acontece fora do site.
 */
const etapas = [
  {
    step: "1",
    title: "Entidade religiosa legalmente constituída",
    desc: "O projeto dialoga apenas com entidades religiosas com estatuto, ata, registro, CNPJ e responsável identificado.",
  },
  {
    step: "2",
    title: "Compromissos da entidade",
    desc: "Uso exclusivamente ritual, triagem dos participantes antes de cada rito e nenhum comércio ou propaganda do sacramento.",
  },
  {
    step: "3",
    title: "Contato institucional, fora do site",
    desc: "Entidades religiosas constituídas podem falar com a coordenação do projeto pelo e-mail ou WhatsApp institucional. Não coletamos dados pelo site.",
  },
];

export const HomeDepoimentosCredenciamento = () => {
  return (
    <section className="py-section-md lg:py-section-lg bg-floresta-950/70" id="entidades-passos">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="flex justify-center">
            <Badge variant="solar" icon={<Landmark className="h-3.5 w-3.5" />}>
              Entidades Religiosas
            </Badge>
          </div>
          <h2 className="font-serif text-display-sm font-bold text-areia-100">
            Quem Pode Dialogar com o Projeto
          </h2>
          <p className="text-sm text-areia-300 max-w-xl mx-auto font-light leading-relaxed">
            Este site é institucional. Não vendemos, não recebemos pedidos e não fazemos envios.
            Não há cadastro pelo site. Grupos em formação encontram a{" "}
            <Link
              href="/entidades-religiosas#formalizacao"
              className="text-ambar-300 hover:text-ambar-200 underline underline-offset-4"
            >
              orientação para se formalizar
            </Link>
            .
          </p>
        </AnimateOnScroll>

        <div className="relative space-y-8 pl-12 sm:pl-16">
          <div className="timeline-line" />

          {etapas.map(({ step, title, desc }, i) => (
            <AnimateOnScroll key={step} delay={i * 150}>
              <div className="relative">
                <div className="absolute -left-12 sm:-left-16 top-0">
                  <span className="number-marker">{step}</span>
                </div>
                <Card variant="elevated" className="p-6 sm:p-7 space-y-2 border-ambar-500/20">
                  <Card.Title as="h3">{title}</Card.Title>
                  <Card.Description>{desc}</Card.Description>
                </Card>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll className="mt-14">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-floresta-900 via-floresta-800 to-floresta-900 p-8 sm:p-10 text-center border border-ambar-500/30 shadow-solar">
            <div className="absolute inset-0 bg-radial-ambar pointer-events-none" />
            <div className="relative space-y-4 max-w-2xl mx-auto">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-areia-100">
                Requisitos, compromissos e recursos abertos
              </h3>
              <p className="text-xs text-areia-200 leading-relaxed font-light max-w-xl mx-auto">
                Veja os requisitos para entidades religiosas e abra a Central de Recursos:
                documentos, matriz de interações, perguntas frequentes e marco legal.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/entidades-religiosas"
                  className="btn-primary btn-press inline-flex items-center justify-center gap-2 text-xs font-semibold px-6 py-3 w-full sm:w-auto"
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>Entidades Religiosas</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/portal-dirigente"
                  className="btn-secondary btn-press inline-flex items-center justify-center gap-2 text-xs font-semibold px-5 py-3 w-full sm:w-auto"
                >
                  <span>Central de Recursos</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

import React from "react";
import Link from "next/link";
import { HeartHandshake, ShieldCheck, ArrowRight, Award } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const depoimentos = [
  {
    nome: "Padrinho Marcelo F.",
    cargo: "Dirigente Espiritual",
    local: "São Paulo • SP",
    graduacao: "Graduação 10.1 Wirapuru",
    depoimento:
      "O apoio da Nativaram trouxe uma paz inestimável para a nossa casa. Ter a certeza da procedência pura com o Cipó Tucunacá e da reverência ao feitio tradicional acabou com os desconfortos somáticos pesados nos trabalhos. O despacho aéreo via Gollog sempre chega pontual e com a documentação impecável.",
  },
  {
    nome: "Madre Helena S.",
    cargo: "Guardiã Litúrgica",
    local: "Belo Horizonte • MG",
    graduacao: "Graduação 5.1 Pituã & Rapé Sagrado",
    depoimento:
      "A seriedade documental e o respeito ao sagrado são exemplares. Para nós, dirigentes, a blindagem com base no CONAD nos traz absoluta tranquilidade perante os associados e os órgãos fiscalizadores. É uma verdadeira corrente de luz com a floresta.",
  },
  {
    nome: "Dirigente Renato B.",
    cargo: "Presidente Institucional",
    local: "Curitiba • PR",
    graduacao: "Graduação 7.1 Anhangatã & Gel",
    depoimento:
      "A estabilidade de cada lote é notável. Não há variações desagradáveis de consistência ou acidez. Adotamos o formato Gel para otimizar o frete aéreo e a experiência foi perfeita. A Nativaram honra a tradição sagrada do Acre com altíssimo rigor técnico e doutrinário.",
  },
];

const etapas = [
  {
    step: "1",
    title: "Preenchimento dos Dados da Entidade",
    desc: "Comprovação da personalidade jurídica religiosa ou associativa — CNPJ ativo, Ata de Constituição, Estatuto Social e endereço da sede cerimonial.",
  },
  {
    step: "2",
    title: "Identificação do Dirigente Responsável",
    desc: "Documentação civil, histórico de condução espiritual de trabalhos e termo de responsabilidade litúrgica perante os associados.",
  },
  {
    step: "3",
    title: "Termo de Adesão à Deontologia (CONAD 01/2010)",
    desc: "Concordância formal com a ausência de fins lucrativos, adoção de protocolos de anamnese (washout de substâncias incompatíveis) e homologação do conselho.",
  },
];

export const HomeDepoimentosCredenciamento = () => {
  return (
    <>
      {/* Vozes dos Guardiões & Dirigentes */}
      <section className="py-section-md lg:py-section-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="flex justify-center">
              <Badge variant="solar" icon={<HeartHandshake className="h-3.5 w-3.5" />}>
                Confiança Litúrgica
              </Badge>
            </div>
            <h2 className="font-serif text-display-sm sm:text-display-md font-bold text-areia-100">
              Vozes dos Guardiões & Dirigentes
            </h2>
            <p className="text-sm text-areia-300 max-w-2xl mx-auto leading-relaxed font-light">
              Depoimentos fraternos de dirigentes de congregações parceiras que confiam na fiação da Nativaram.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {depoimentos.map(({ nome, cargo, local, graduacao, depoimento }, i) => (
              <AnimateOnScroll key={nome} delay={i * 120}>
                <Card variant="elevated" className="p-7 space-y-4 h-full border-ambar-500/20">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-ambar-500/15 pb-3">
                      <div>
                        <h4 className="font-serif text-sm font-bold text-areia-100">{nome}</h4>
                        <p className="text-[11px] text-ambar-400/90">{cargo} • {local}</p>
                      </div>
                      <Badge variant="floresta" size="sm">
                        Homologado
                      </Badge>
                    </div>
                    <p className="text-xs text-areia-300 leading-relaxed italic font-light">
                      &ldquo;{depoimento}&rdquo;
                    </p>
                  </div>
                  <Card.Footer>
                    <span>🌿 {graduacao}</span>
                  </Card.Footer>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Passo a Passo do Credenciamento */}
      <section className="py-section-md lg:py-section-lg bg-floresta-950/70" id="credenciamento-passos">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="flex justify-center">
              <Badge variant="solar">Processo de Homologação Litúrgica</Badge>
            </div>
            <h2 className="font-serif text-display-sm font-bold text-areia-100">
              Como Credenciar o Seu Templo
            </h2>
            <p className="text-sm text-areia-300 max-w-lg mx-auto font-light">
              O acesso ao sacramento e o apoio logístico exigem validação prévia em 3 etapas formais. Não enviamos a pessoas físicas avulsas.
            </p>
          </AnimateOnScroll>

          {/* Timeline */}
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

          {/* Banner de Ação de Credenciamento */}
          <AnimateOnScroll className="mt-14">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-floresta-900 via-floresta-800 to-floresta-900 p-8 sm:p-10 text-center border border-ambar-500/30 shadow-solar">
              <div className="absolute inset-0 bg-radial-ambar pointer-events-none" />
              <div className="relative space-y-4 max-w-xl mx-auto">
                <Badge variant="solar" icon={<Award className="h-3.5 w-3.5 text-ambar-400" />}>
                  Adesão Cooperativa para Instituições
                </Badge>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-areia-100">
                  Deseja iniciar o credenciamento do seu templo?
                </h4>
                <p className="text-xs text-areia-200 leading-relaxed font-light">
                  Preencha o formulário institucional seguro. Nosso conselho entrará em contato para validação dos dados e alinhamento do cronograma cerimonial.
                </p>
                <div className="pt-2">
                  <Link
                    href="/credenciamento"
                    className="btn-primary inline-flex items-center gap-2 text-xs font-semibold px-6 py-3"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    <span>Iniciar Formulário de Credenciamento</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
};

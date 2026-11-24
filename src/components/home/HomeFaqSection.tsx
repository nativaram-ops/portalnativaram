import React from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const faqItems = [
  {
    pergunta: "O que é a Cooperativa Nativaram?",
    resposta:
      "A Cooperativa Nativaram é um projeto de cooperativa em constituição, ainda sem registro e sem CNPJ. O projeto pretende se constituir sem fins lucrativos. Este site guarda a memória do feitio, o acervo etnobotânico, o marco legal e recursos abertos de segurança.",
    destaque: "Projeto em constituição: ainda sem registro e sem CNPJ.",
  },
  {
    pergunta: "O site vende ou recebe pedidos?",
    resposta:
      "Não. Este site é institucional. Não vendemos, não recebemos pedidos e não fazemos envios. Não há valores nem formulários de pedido.",
    destaque: "Sem oferta, sem pedidos e sem envios.",
  },
  {
    pergunta: "Como a Cooperativa Nativaram compreende a natureza sagrada da Ayahuasca?",
    resposta:
      "Entendemos a Ayahuasca como sacramento de uso religioso, ligado à memória da floresta e às tradições que a preservam. Por isso o uso fica restrito ao contexto ritual de entidades religiosas, com triagem dos participantes e sem qualquer comércio ou propaganda.",
    destaque: "Uso exclusivamente religioso, nos termos da Resolução CONAD nº 1/2010.",
  },
  {
    pergunta: "Quais são as origens e referências que norteiam o preparo do sacramento?",
    resposta:
      "A memória do feitio nasce da união entre o rigor doutrinário das grandes escolas ayahuasqueiras (Santo Daime e UDV), a sabedoria dos povos da terra no trato com as plantas e a prática constante de anos de vigília espiritual.",
    destaque: "Herança daimista e da UDV unida à tradição botânica brasileira.",
  },
  {
    pergunta: "Como funciona a partilha do sacramento?",
    resposta:
      "A partilha do sacramento acontece apenas entre entidades religiosas legalmente constituídas, fora deste site, por termo entre as entidades, cobrindo somente o custeio de despesas comprovadas, sem margem, conforme os princípios da Resolução CONAD nº 1/2010.",
    destaque: "Fora do site, só entre entidades religiosas constituídas.",
  },
  {
    pergunta: "O site orienta o transporte do sacramento?",
    resposta:
      "Não. O transporte do sacramento entre entidades não tem regulamentação específica (a Resolução CONAD nº 1/2010 recomendou que fosse regulamentado). Este site não orienta transporte. Procure um advogado.",
    destaque: "Transporte sem regulamentação específica: procure um advogado.",
  },
  {
    pergunta: "Nosso grupo ainda não é formalizado. O que fazer?",
    resposta:
      "O projeto dialoga apenas com entidades religiosas legalmente constituídas. Grupos em formação, rezadores e círculos encontram em Entidades Religiosas a orientação para se formalizar (estatuto, ata, registro em cartório e CNPJ). Não há atendimento até a formalização.",
    destaque: "Primeiro a formalização; depois o diálogo institucional.",
  },
];

export const HomeFaqSection = () => {
  return (
    <>
      {/* FAQ Interativo para Dirigentes */}
      <section className="py-section-md lg:py-section-lg">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <div className="flex justify-center">
              <Badge variant="solar">Esclarecimentos Institucionais</Badge>
            </div>
            <h2 className="font-serif text-display-sm font-bold text-areia-100">
              Perguntas Frequentes
            </h2>
            <p className="text-sm text-areia-300 font-light">
              Respostas claras sobre o projeto, a sacralidade, as linhagens doutrinárias e os limites deste site.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <FaqAccordion items={faqItems} />
          </AnimateOnScroll>
        </div>
      </section>

      {/* Central de Recursos & CTA Final */}
      <section className="pb-section-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <Card
              variant="liturgico"
              glow
              className="p-7 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border-ambar-500/30 bg-floresta-900/70 shadow-solar"
            >
              <div className="flex items-center gap-5 text-center md:text-left">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-floresta-800 border border-ambar-500/30 text-ambar-400 shrink-0 shadow-elevated">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-lg font-bold text-areia-100">
                    Central de Recursos aberta
                  </h4>
                  <p className="text-xs text-areia-300 font-light max-w-lg">
                    Documentos, matriz de interações, perguntas frequentes e marco legal, abertos ao público, sem login.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link href="/portal-dirigente" className="btn-secondary btn-press text-xs font-semibold px-5 py-2.5">
                  Abrir a Central de Recursos
                </Link>
                <Link href="/contato" className="btn-primary btn-press text-xs font-semibold px-5 py-2.5">
                  Contato Institucional
                </Link>
              </div>
            </Card>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
};

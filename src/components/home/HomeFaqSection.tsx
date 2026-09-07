import React from "react";
import Link from "next/link";
import { Lock } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const faqItems = [
  {
    pergunta: "Como a Cooperativa Nativaram compreende a natureza sagrada da Ayahuasca?",
    resposta:
      "Entendemos a Ayahuasca como um portal sagrado e sacramento milenar. Zelamos pela integridade de cada processo, realizando uma seleção prévia de todos aqueles a quem destinamos nosso preparado sagrado, garantindo que chegue a mãos que honrem seu propósito espiritual e mantenham viva a corrente de luz, respeito e fraternidade.",
    destaque: "A conexão com o sagrado vem através do equilíbrio, harmonia e leveza.",
  },
  {
    pergunta: "Quais são as origens e referências que norteiam o preparo do sacramento?",
    resposta:
      "Nossa alquimia consciente nasce da união entre o Rigor Doutrinário — herdando o padrão de qualidade, ordem e pureza das grandes escolas ayahuasqueiras (Santo Daime e UDV) —, a Sabedoria Ancestral dos povos originários no trato com as plantas mestras e a Prática Constante de anos de aprimoramento técnico e vigília espiritual.",
    destaque: "Herança daimista e da UDV combinada à ciência ancestral dos povos da floresta.",
  },
  {
    pergunta: "Como entender a numeração das graduações (ex: 3.1 a 10.1)?",
    resposta:
      "A numeração parte da referência ao estudo tradicional daimista, onde o sacramento é dividido rigorosamente pela concentração de matéria-prima (biomassa de cipó e folha por litro). Essa métrica garante que o dirigente e o buscador compreendam com exatidão a densidade energética de cada preparado, alinhando a escolha ao rigor e propósito do trabalho espiritual.",
    destaque: "Métrica tradicional de biomassa que confere previsibilidade energética e litúrgica.",
  },
  {
    pergunta: "Como funciona a logística aérea expressa via Gollog com documentação?",
    resposta:
      "O transporte por via aérea é a rota que preserva a pureza e a energia viva do sacramento sem necessidade de conservantes. Todo despacho voa via Gollog acompanhado de dossiê completo: declaração de uso ritualístico e destinação religiosa assinada pelos dirigentes, cópia da ata de constituição e CNPJs de ambas as entidades. O lote desembarca no aeroporto mais próximo ou é entregue na sede da instituição.",
    destaque: "Remessa aérea protegida que elimina semanas de calor e riscos de fermentação do transporte rodoviário.",
  },
  {
    pergunta: "Por que é necessário o planejamento com antecedência de 30 dias?",
    resposta:
      "O sacramento não provém de linhas de montagem industriais, mas de um ritual solene de respeito à natureza. É necessário respeitar o ciclo de colheita sustentável na mata, o tempo de repouso das plantas, os dias de vigília e feitio sob fogo a lenha, a análise do lote e a tramitação do despacho aéreo documental.",
    destaque: "Respeito ao ciclo natural da floresta e rigor no controle de qualidade de cada remessa.",
  },
  {
    pergunta: "Como funciona o rateio cooperativo de custos operacionais?",
    resposta:
      "Por expressa determinação legal e estatutária, a Nativaram não visa lucro. O valor cooperativo por litro representa exclusivamente o rateio solidário das despesas reais incorridas: sustentação dos feitores tradicionais na floresta, manejo ecológico sustentável, recipientes apropriados e frete aéreo de Cruzeiro do Sul. A prestação é transparente aos templos associados.",
    destaque: "Sem fins lucrativos: rateio solidário conforme a Resolução CONAD nº 01/2010.",
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
              <Badge variant="solar">Esclarecimentos Litúrgicos & Operacionais</Badge>
            </div>
            <h2 className="font-serif text-display-sm font-bold text-areia-100">
              Perguntas Frequentes dos Dirigentes
            </h2>
            <p className="text-sm text-areia-300 font-light">
              Respostas claras sobre a sacralidade, as linhagens doutrinárias, o transporte Gollog e o padrão do feitio.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <FaqAccordion items={faqItems} />
          </AnimateOnScroll>
        </div>
      </section>

      {/* Portal do Dirigente Teaser & CTA Final */}
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
                  <Lock className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-lg font-bold text-areia-100">
                    Já é uma instituição credenciada pela Nativaram?
                  </h4>
                  <p className="text-xs text-areia-300 font-light max-w-lg">
                    Acesse o ambiente restrito do dirigente para emissão de laudos de custódia, rastreamento de remessas aéreas Gollog e acompanhamento do rateio cooperativo.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link href="/portal-dirigente" className="btn-secondary text-xs font-semibold px-5 py-2.5">
                  Acessar Portal do Dirigente
                </Link>
                <Link href="/contato" className="btn-primary text-xs font-semibold px-5 py-2.5">
                  Falar com Guardiões
                </Link>
              </div>
            </Card>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
};

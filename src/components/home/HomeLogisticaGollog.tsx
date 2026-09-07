import React from "react";
import { Plane, Clock, FileText, Calendar, Scale } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const marcosLegais = [
  {
    badge: "CF / 1988",
    title: "Art. 5º, VI & VIII",
    desc: "Inviolabilidade da liberdade de consciência e de crença, sendo assegurado o livre exercício dos cultos religiosos e a proteção aos seus locais de liturgia.",
  },
  {
    badge: "Lei 11.343/2006",
    title: "Art. 2º, Parágrafo Único",
    desc: "Ressalva legal expressa na Lei de Drogas que autoriza o plantio, cultivo e colheita exclusivamente para fins rituais e religiosos.",
  },
  {
    badge: "CONAD 01/2010",
    title: "Resolução Deontológica",
    desc: "Regulamentação federal do uso religioso da Ayahuasca no Brasil. Veda o comércio, o turismo espiritual e o lucro, respaldando o rateio operacional de custos.",
  },
  {
    badge: "ANVISA 2025",
    title: "Marco Sanitário Digital",
    desc: "Proibição estrita de e-commerce e rateio comercial indiscriminado. Nosso portal é 100% institucional, educativo e voltado a pessoas jurídicas religiosas.",
  },
];

export const HomeLogisticaGollog = () => {
  return (
    <>
      {/* Logística Aérea Expressa via Gollog */}
      <section className="py-section-md lg:py-section-lg bg-floresta-950/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="flex justify-center">
              <Badge variant="solar" icon={<Plane className="h-3.5 w-3.5" />}>
                Agilidade & Rastreabilidade Nacional
              </Badge>
            </div>
            <h2 className="font-serif text-display-sm sm:text-display-md font-bold text-areia-100">
              Logística Aérea Expressa via Gollog
            </h2>
            <p className="text-sm text-areia-300 max-w-2xl mx-auto leading-relaxed font-light">
              Do aeroporto de Cruzeiro do Sul ou Rio Branco até a sua congregação. Cada remessa é tratada com veneração sagrada e estrita segurança operacional.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <AnimateOnScroll delay={100}>
              <Card variant="elevated" className="p-7 space-y-4 h-full border-ambar-500/20">
                <Card.Header>
                  <Card.Icon>
                    <Clock className="h-5 w-5" />
                  </Card.Icon>
                </Card.Header>
                <Card.Title>Zero Degradação Térmica</Card.Title>
                <Card.Description>
                  O transporte aéreo expresso via Gollog elimina os riscos de longas jornadas rodoviárias pela BR-364.
                  O sacramento viaja em ambiente pressurizado e chega fresco, preservando intactos todos os princípios botânicos sem acidificação acidental.
                </Card.Description>
                <Card.Footer>
                  <span>✈️ Voo com rastreamento aéreo</span>
                </Card.Footer>
              </Card>
            </AnimateOnScroll>

            <AnimateOnScroll delay={200}>
              <Card variant="elevated" glow className="p-7 space-y-4 h-full border-ambar-500/30 bg-floresta-900/60 shadow-solar">
                <Card.Header>
                  <Card.Icon>
                    <FileText className="h-5 w-5" />
                  </Card.Icon>
                </Card.Header>
                <Card.Title>Blindagem Documental Completa</Card.Title>
                <Card.Description>
                  Cada caixa é lacrada com fita de custódia e viaja acompanhada de pasta física e digital contendo:
                  Declaração de Uso Ritualístico (Res. CONAD 01/2010), Estatuto Social, Ata de Posse da Diretoria e Cartão CNPJ do templo destinatário e da cooperativa remetente.
                </Card.Description>
                <Card.Footer>
                  <span>📜 Conformidade com órgãos fiscalizadores</span>
                </Card.Footer>
              </Card>
            </AnimateOnScroll>

            <AnimateOnScroll delay={300}>
              <Card variant="elevated" className="p-7 space-y-4 h-full border-ambar-500/20">
                <Card.Header>
                  <Card.Icon>
                    <Calendar className="h-5 w-5" />
                  </Card.Icon>
                </Card.Header>
                <Card.Title>Planejamento de 30 Dias</Card.Title>
                <Card.Description>
                  Para garantir que o cronograma cerimonial do seu templo nunca seja interrompido, operamos com prazo mínimo de
                  <strong> 30 dias de antecedência</strong>. Esse intervalo honra a colheita no tempo da mata, o feitio consciente e a tramitação do despacho aéreo.
                </Card.Description>
                <Card.Footer>
                  <span>📅 Previsibilidade litúrgica para o dirigente</span>
                </Card.Footer>
              </Card>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Blindagem Jurídica & Deontologia CONAD */}
      <section className="py-section-md lg:py-section-lg bg-floresta-950/70" id="compliance">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="flex justify-center">
              <Badge variant="solar" icon={<Scale className="h-3.5 w-3.5" />}>
                Segurança Jurídico-Institucional
              </Badge>
            </div>
            <h2 className="font-serif text-display-sm sm:text-display-md font-bold text-areia-100">
              Marco Regulatório & Deontologia
            </h2>
            <p className="text-sm text-areia-300 max-w-2xl mx-auto leading-relaxed font-light">
              Toda a atuação da Cooperativa Nativaram Brasil é amparada pelos pilares do direito constitucional brasileiro e das normativas sanitárias vigentes.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marcosLegais.map(({ badge, title, desc }, i) => (
              <AnimateOnScroll key={title} delay={i * 100}>
                <Card variant="liturgico" className="p-6 space-y-3 h-full border-ambar-500/20">
                  <Card.Header>
                    <Card.Badge>{badge}</Card.Badge>
                  </Card.Header>
                  <Card.Title>{title}</Card.Title>
                  <Card.Description>{desc}</Card.Description>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

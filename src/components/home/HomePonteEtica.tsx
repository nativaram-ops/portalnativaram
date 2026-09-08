import React from "react";
import { Users, FlaskConical, FileText, Plane } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const etapas = [
  {
    num: "01",
    icon: Users,
    title: "Mestre Feitor & Centros Credenciados",
    subtitle: "Aliança Cooperativa no Acre",
    desc: "Centralizamos nosso foco no saber do nosso mestre feitor tradicional e atuamos em cooperativa com diversos centros credenciados no Acre, que mantêm seu fluxo comunitário regular e elaboram os sacramentos da Nativaram sob nosso estudo padronizado.",
  },
  {
    num: "02",
    icon: FlaskConical,
    title: "Padrão de Feitio & Pureza",
    subtitle: "Alquimia em Aço Inox",
    desc: "Preparo purista com Cipó Tucunacá e Rainha Chacrona colhida com oração ao amanhecer, em caldeirões de inox sob fogo a lenha. Sem aditivos ou misturas impróprias.",
  },
  {
    num: "03",
    icon: FileText,
    title: "Dossiê & Conformidade",
    subtitle: "Blindagem CONAD 01/2010",
    desc: "Elaboração de termos litúrgicos formais, atas de diretoria e comprovação de personalidade jurídica para respaldo pleno da remessa perante as autoridades.",
  },
  {
    num: "04",
    icon: Plane,
    title: "Despacho Aéreo Gollog",
    subtitle: "Pontualidade & Frescor",
    desc: "Embarque por carga aérea expressa direto ao aeroporto mais próximo ou à sede litúrgica do templo, preservando a pureza biológica do sacramento.",
  },
];

export const HomePonteEtica = () => {
  return (
    <section className="py-section-md lg:py-section-lg bg-floresta-950/60" id="como-funciona">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="flex justify-center">
            <Badge variant="solar">Apoio Operacional & Fraternidade</Badge>
          </div>
          <h2 className="font-serif text-display-sm sm:text-display-md font-bold text-areia-100">
            A Ponte Ética entre o Acre e o seu Templo
          </h2>
          <p className="text-sm text-areia-300 max-w-2xl mx-auto leading-relaxed font-light">
            Muitos dirigentes de instituições fora da Amazônia enfrentam a impossibilidade de manter estrutura fabril própria na floresta. A Nativaram constrói uma aliança ética e jurídica para que o sacramento chegue com integridade, pureza e segurança ao altar.
          </p>
        </AnimateOnScroll>

        {/* 4 Etapas da Ponte Ética */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {etapas.map(({ num, icon: Icon, title, subtitle, desc }, i) => (
            <AnimateOnScroll key={num} delay={i * 120}>
              <Card
                variant="elevated"
                className="p-6 sm:p-7 space-y-4 h-full border-ambar-500/20 hover:border-ambar-500/50 hover:shadow-solar"
              >
                <Card.Header>
                  <span className="font-serif text-3xl font-bold text-ambar-400/50">{num}</span>
                  <Card.Icon>
                    <Icon className="h-5 w-5" />
                  </Card.Icon>
                </Card.Header>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-ambar-400 block mb-1">
                    {subtitle}
                  </span>
                  <Card.Title>{title}</Card.Title>
                </div>
                <Card.Description>{desc}</Card.Description>
                <Card.Footer>
                  <span>Etapa {num} da Cadeia de Custódia</span>
                </Card.Footer>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Infográfico Esquemático */}
        <AnimateOnScroll className="mt-12">
          <div className="rounded-2xl border border-ambar-500/25 bg-gradient-to-r from-floresta-950 via-floresta-900 to-floresta-950 p-6 sm:p-8 shadow-elevated">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center">
              <div className="space-y-1.5 p-4 rounded-xl bg-floresta-950/70 border border-ambar-500/15">
                <span className="text-[10px] font-mono text-ambar-400 uppercase tracking-widest block">
                  Origem Sagrada
                </span>
                <h4 className="font-serif text-base font-bold text-areia-100">Cruzeiro do Sul, Acre</h4>
                <p className="text-xs text-areia-400">Feito em caldeirões de inox sob rezo tradicional</p>
              </div>

              <div className="flex flex-col items-center justify-center space-y-2">
                <Badge variant="solar" icon={<Plane className="h-3.5 w-3.5" />}>
                  Voo Direto Gollog Cargas
                </Badge>
                <div className="w-full max-w-[200px] h-[2px] bg-gradient-to-r from-ambar-500/20 via-ambar-400 to-ambar-500/20" />
                <span className="text-[10px] text-areia-400 font-mono">Com declaração litúrgica CONAD 01/2010</span>
              </div>

              <div className="space-y-1.5 p-4 rounded-xl bg-floresta-950/70 border border-ambar-500/15">
                <span className="text-[10px] font-mono text-ambar-400 uppercase tracking-widest block">
                  Destino Litúrgico
                </span>
                <h4 className="font-serif text-base font-bold text-areia-100">Seu Templo Credenciado</h4>
                <p className="text-xs text-areia-400">Entrega no aeroporto ou na sede da instituição</p>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

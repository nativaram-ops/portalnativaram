"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  Truck,
  HeartHandshake,
  Users,
  Compass,
  ArrowRight,
  Sprout,
  Sun,
  Home,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Droplets,
  Layers,
  Leaf,
  Scale,
  FlaskConical,
  PackageCheck,
  ChevronDown,
  Building2,
  FileText,
  BadgeCheck,
  HelpCircle,
  Clock,
  ExternalLink,
} from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionDivider } from "@/components/ui/SectionDivider";

interface PipelineStep {
  numero: string;
  titulo: string;
  subtitulo: string;
  descricao: string;
  destaques: string[];
  icone: React.ElementType;
}

const pipelineSteps: PipelineStep[] = [
  {
    numero: "01",
    titulo: "Manejo Florestal & Dignidade no Acre",
    subtitulo: "Origem ética no Vale do Juruá / Cruzeiro do Sul",
    descricao:
      "A jornada tem início no coração da floresta amazônica. O Cipó Mariri (Banisteriopsis caapi) e a Folha Rainha (Psychotria viridis) são colhidos em áreas de manejo sustentável e agroflorestas consorciadas. As famílias guardiãs e mestres feitores caboclos e indígenas recebem remuneração justa e antecipada, banindo qualquer exploração ou atravessadores predatórios.",
    destaques: [
      "Manejo 100% orgânico em harmonia com as marés dos rios e ciclos lunares",
      "Remuneração ética direta às famílias guardiãs do Vale do Juruá",
      "Seleção manual de cipós maduros e folhas rainhas de alta vitalidade",
    ],
    icone: Sprout,
  },
  {
    numero: "02",
    titulo: "Feitio Purista & Alquimia Calibrada",
    subtitulo: "Decocção purista estrita sem aditivos químicos",
    descricao:
      "Na Casa de Feitio tradicional em Cruzeiro do Sul, a cocção ocorre exclusivamente com água pura de nascente da floresta e o binômio sagrado de cipó e folha. Rejeitamos qualquer planta aditiva instável ou análogos botânicos. Cada tacho é vigiado por dias e noites sob oração contínua, com calibração exata de biomassa por litro (graduações 3.1, 5.1, 7.1 e 10.1).",
    destaques: [
      "Purismo botânico absoluto: sem aditivos, sem solventes, sem misturas instáveis",
      "Água pura de nascente amazônica em caldeirões dedicados de alta inércia térmica",
      "Padronização da proporção de biomassa para equilíbrio fitoquímico sereno",
    ],
    icone: Flame,
  },
  {
    numero: "03",
    titulo: "Custódia Higiênica, Garrafas Novas & Rastreabilidade",
    subtitulo: "Recipientes 100% virgens, assepsia rigorosa e lacres invioláveis",
    descricao:
      "Diferente do mercado informal que reaproveita garrafas usadas de refrigerante e bebidas (gerando contaminação e fermentação), a Cooperativa Nativaram utiliza exclusivamente garrafas PET novas e 100% virgens de padrão alimentício. Embora o vidro seja um cenário ideal em teoria, seu altíssimo custo, a fragilidade no transporte aéreo e a impossibilidade prática de logística reversa de volta ao interior do Acre inviabilizam seu envio interestadual. Por necessidade e responsabilidade, garantimos assepsia completa, recipientes novos de fábrica, selagem hermética com lacres de segurança e etiqueta de rastreabilidade com lote, data de feitura e safra botânica.",
    destaques: [
      "Uso exclusivo de garrafas PET novas e virgens de fábrica (zero reaproveitamento)",
      "Protocolo completo de higienização alimentar e selagem hermética inviolável",
      "Rastreabilidade de lote com certidão de origem florestal e biomassa mensurada",
    ],
    icone: PackageCheck,
  },
  {
    numero: "04",
    titulo: "Logística Segura & Monitoramento de Cadeia",
    subtitulo: "Do coração da Amazônia aos templos credenciados",
    descricao:
      "A logística é um dos pontos mais críticos da salvaguarda: o sacramento vivo não pode sofrer variações bruscas de temperatura ou fermentar em galpões desprotegidos. A Nativaram estruturou um fluxo aéreo e rodoviário monitorado, conectando Cruzeiro do Sul/AC aos nossos polos de redistribuição no Sudeste (Serra/ES e São Paulo), garantindo chegada célere e protegida.",
    destaques: [
      "Isolamento térmico e embalagens antichoque de tripla camada",
      "Preservação do frescor e estabilidade dos princípios fitoquímicos",
      "Monitoramento contínuo do envio até a entrega nas mãos do dirigente",
    ],
    icone: Truck,
  },
  {
    numero: "05",
    titulo: "Credenciamento Litúrgico & Blindagem Legal",
    subtitulo: "Amparo integral sob a Resolução CONAD nº 01/2010",
    descricao:
      "O acesso aos sacramentos da cooperativa não é comercializado abertamente: é reservado a entidades religiosas e casas de oração formalmente homologadas. O dirigente submete ata de fundação, CNPJ religioso ou declaração de fé, assinando o termo de conformidade ética. Isso confere a cada casa segurança jurídica total perante fiscalizações e órgãos públicos.",
    destaques: [
      "Processo documental formal em estrita observância à CF/88 Art. 5º, VI",
      "Emissão de certidões de origem cooperativa vinculadas ao templo credenciado",
      "Rateio de custos cooperativo sem fins lucrativos, transparente e solidário",
    ],
    icone: ShieldCheck,
  },
  {
    numero: "06",
    titulo: "Suporte ao Dirigente & Segurança Integrativa",
    subtitulo: "Tranquilidade cerimonial e proteção aos comungantes",
    descricao:
      "Apoiamos os dirigentes com fichas de segurança fitoquímica, diretrizes de anamnese prévia para comungantes (orientações sobre não interação com antidepressivos alopáticos ISRS) e proporções sugeridas de consagração. O resultado são cerimônias serenas, luminosas e protegidas de intercorrências físicas ou psíquicas.",
    destaques: [
      "Fichas técnicas com contraindicações farmacológicas e orientações de triagem",
      "Suporte litúrgico fraterno para dúvidas cerimoniais e de conservação",
      "Rede de intercâmbio de saberes e boas práticas entre casas irmãs",
    ],
    icone: HeartHandshake,
  },
];

interface FaqItem {
  pergunta: string;
  resposta: string;
}

const faqsProjetoLuz: FaqItem[] = [
  {
    pergunta: "Por que a acessibilidade logística da Nativaram resolve um problema de segurança pública e espiritual?",
    resposta:
      "Historicamente, centenas de casas e grupos de oração no Brasil sofrem com a falta de acesso a preparados fidedignos, recorrendo ao mercado clandestino informal. Nesse mercado, proliferam sacramentos adulterados com aditivos não regulados, biomassa desbalanceada (que provoca sobrecarga cardiovascular ou crises de pânico) e transporte em garrafas reaproveitadas contaminadas. Ao viabilizar uma cadeia de suprimentos cooperativa, rastreada, purista e em recipientes virgens com higienização estéril, a Cooperativa Nativaram devolve a serenidade, a segurança física e a nobreza litúrgica às congregações.",
  },
  {
    pergunta: "Quem pode ser atendido pelo projeto de acessibilidade e receber os sacramentos?",
    resposta:
      "Em rigoroso cumprimento à Resolução CONAD nº 01/2010 e ao Estatuto da Cooperativa, os sacramentos da Nativaram não são vendidos ao público geral nem distribuídos para fins recreativos. O provimento assistido é exclusivo para templos, centros xamânicos, igrejas e associações litúrgicas que concluam o Credenciamento Litúrgico com envio de documentação institucional e termo de responsabilidade do dirigente.",
  },
  {
    pergunta: "Como a padronização de biomassa (3.1 a 10.1) impede riscos na consagração?",
    resposta:
      "A instabilidade nos preparados caseiros é o maior gerador de intercorrências em cerimônias: uma proporção excessiva de folha sem o devido lastro do cipó pode desorientar o comungante, enquanto a falta de calibração dificulta o controle de porção pelo dirigente. Nossas quatro graduações sacramentais possuem concentrações calculadas de biomassa vegetal por litro, permitindo ao dirigente escolher exatamente a firmeza do trabalho espiritual com previsibilidade fitoquímica absoluta.",
  },
  {
    pergunta: "Como o sacramento é transportado sem fermentar ou degradar?",
    resposta:
      "O sacramento tradicional, quando livre de aditivos químicos, é uma substância viva. Nosso protocolo logístico envolve envase com controle rigoroso de temperatura, garrafas novas de fábrica com lacração hermética de segurança e embalagens com isolamento térmico e tripla camada protetora antichoque. Os envios são monitorados em janelas expressas de transporte aéreo e rodoviário rápido, prevenindo a fermentação e o estufamento.",
  },
  {
    pergunta: "Como funciona o rateio de custos cooperativo?",
    resposta:
      "A Cooperativa Nativaram não possui fins lucrativos. Cada contribuição solicitada aos templos credenciados é um rateio solidário de custos operacionais reais: honorários justos dos feitores caboclos no Acre, manejo agroflorestal sustentável, lenha autorizada, recipientes novos e esterilizados, frete aéreo interestadual e o fundo cooperativo que subsidia a Ecovila e o acolhimento social. Todo valor é transparente e auditável.",
  },
  {
    pergunta: "Qual é o respaldo jurídico do dirigente e da casa com a Nativaram?",
    resposta:
      "A prática litúrgica com a Ayahuasca é plenamente protegida no Brasil pela Constituição Federal de 1988 (Artigo 5º, inciso VI — inviolabilidade da liberdade de crença e culto) e regulamentada de forma definitiva pelo Conselho Nacional de Políticas sobre Drogas (Resolução CONAD nº 01/2010). Ao se credenciar, o templo recebe um dossiê probatório de cooperado com certidão de origem botânica, atestando que os sacramentos foram recebidos de fonte cooperativa litúrgica lícita.",
  },
];

export function ProjetoDeLuzLanding() {
  const [activeStep, setActiveStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const currentStep = pipelineSteps[activeStep];
  const StepIcon = currentStep.icone;

  return (
    <div className="space-y-0">
      {/* ═══════════════════════════════════════════
          HERO — A PONTE SAGRADA ENTRE A FLORESTA E OS TEMPLOS
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-24 sm:py-32">
        {/* Background fotográfico gerado por IA (estritamente artefatos botânicos e altar, sem pessoas) */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/projetos-de-luz/projeto-luz-altar.jpg"
            alt="Mesa cerimonial botânica no coração da floresta amazônica iluminada por raios de sol, com frascos de vidro âmbar, balança de latão, lianas de cipó mariri e folhas de chacrona"
            fill
            priority
            className="object-cover object-center brightness-[0.48] contrast-[1.05] scale-105 transition-transform duration-1000"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-floresta-950 via-floresta-950/70 to-floresta-950/40" />
          <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        </div>

        {/* Glow Dourado Solar */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[380px] bg-ambar-500/[0.14] rounded-full blur-[140px] pointer-events-none z-0" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <AnimateOnScroll>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-ambar-500/30 bg-floresta-950/85 backdrop-blur-md px-5 py-2 text-xs font-semibold tracking-[0.18em] text-ambar-400 uppercase shadow-solar">
              <Sun className="h-4 w-4 text-ambar-400 animate-pulse-subtle" />
              <span>Projeto de Luz • Rede Cooperativa de Acessibilidade Litúrgica</span>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={150}>
            <h1 className="font-serif text-display-md sm:text-display-lg lg:text-display-2xl font-bold text-areia-100 text-glow leading-[1.08]">
              A Ponte Sagrada Entre a Floresta e os{" "}
              <span className="text-gradient-solar">Templos de Oração</span>
            </h1>
          </AnimateOnScroll>

          <AnimateOnScroll delay={300}>
            <p className="text-base sm:text-lg lg:text-xl text-areia-200 leading-relaxed font-light max-w-3xl mx-auto">
              Como a Cooperativa Nativaram Brasil resolve a maior crise de segurança e vulnerabilidade do cenário litúrgico nacional: assegurando sacramentos puros, estabilidade de biomassa, custódia farmacotécnica e pleno amparo legal para congregações em todo o país.
            </p>
          </AnimateOnScroll>

          {/* Badges de Confiança e Salvaguarda */}
          <AnimateOnScroll delay={450}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto pt-2">
              <div className="rounded-xl border border-ambar-500/20 bg-floresta-900/80 px-4 py-3 text-center backdrop-blur-sm shadow-elevated-sm">
                <div className="font-serif text-lg sm:text-xl font-bold text-ambar-400">100%</div>
                <div className="text-[11px] text-areia-300 font-medium">Purismo Botânico</div>
                <div className="text-[9px] text-areia-400/80">Sem Aditivos Químicos</div>
              </div>
              <div className="rounded-xl border border-ambar-500/20 bg-floresta-900/80 px-4 py-3 text-center backdrop-blur-sm shadow-elevated-sm">
                <div className="font-serif text-lg sm:text-xl font-bold text-ambar-400">CONAD</div>
                <div className="text-[11px] text-areia-300 font-medium">Res. nº 01/2010</div>
                <div className="text-[9px] text-areia-400/80">Segurança Jurídica Plena</div>
              </div>
              <div className="rounded-xl border border-ambar-500/20 bg-floresta-900/80 px-4 py-3 text-center backdrop-blur-sm shadow-elevated-sm">
                <div className="font-serif text-lg sm:text-xl font-bold text-ambar-400">6 Etapas</div>
                <div className="text-[11px] text-areia-300 font-medium">Cadeia de Custódia</div>
                <div className="text-[9px] text-areia-400/80">Rastreabilidade Total</div>
              </div>
              <div className="rounded-xl border border-ambar-500/20 bg-floresta-900/80 px-4 py-3 text-center backdrop-blur-sm shadow-elevated-sm">
                <div className="font-serif text-lg sm:text-xl font-bold text-ambar-400">+28 Anos</div>
                <div className="text-[11px] text-areia-300 font-medium">Tradição de Feitio</div>
                <div className="text-[9px] text-areia-400/80">Cruzeiro do Sul, Acre</div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Botões de Ação */}
          <AnimateOnScroll delay={600}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a href="#pipeline" className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2">
                <Compass className="h-4 w-4" />
                <span>Explorar a Jornada de Acessibilidade</span>
              </a>
              <Link href="/credenciamento" className="btn-secondary w-full sm:w-auto inline-flex items-center justify-center gap-2">
                <Building2 className="h-4 w-4" />
                <span>Credenciamento de Templos</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider variant="solar" />

      {/* ═══════════════════════════════════════════
          O DIAGNÓSTICO: A CRISE DE SEGURANÇA QUE ESTAMOS SANANDO
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <AnimateOnScroll>
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ambar-400">
                <AlertTriangle className="h-4 w-4" />
                <span>Diagnóstico do Cenário Litúrgico</span>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={150}>
              <h2 className="font-serif text-display-xs sm:text-display-sm lg:text-display-md font-bold text-areia-100">
                A Grande Dor das Casas Espirituais:
                <br />
                <span className="text-gradient-solar">Da Insegurança Clandestina à Proteção Cooperativa</span>
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll delay={300}>
              <p className="text-sm sm:text-base text-areia-300 font-light leading-relaxed">
                Durante décadas, congregações religiosas e templos de oração fora da Amazônia foram empurrados para a informalidade, dependendo de atravessadores anônimos e preparados sem qualquer padrão de segurança. A Nativaram Brasil nasceu para romper essa precariedade.
              </p>
            </AnimateOnScroll>
          </div>

          {/* Comparativo de Alto Contraste: O Risco vs. A Salvaguarda */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Coluna 1: O Risco da Informalidade */}
            <AnimateOnScroll delay={150}>
              <div className="rounded-2xl border border-red-500/25 bg-floresta-950/90 p-6 sm:p-8 space-y-6 shadow-elevated relative overflow-hidden h-full flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-bl-full pointer-events-none" />
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400 border border-red-500/30">
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold tracking-wider text-red-400 uppercase">A Realidade Vulnerável</span>
                      <h3 className="font-serif text-lg font-bold text-areia-100">O Risco do Mercado Informal</h3>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
                    Centenas de pequenos centros compram preparados sem saber a procedência exata das ervas, a pureza da água utilizada ou as intenções do preparador, colocando seus comungantes em risco contínuo:
                  </p>
                  <ul className="space-y-3 text-xs sm:text-sm text-areia-300/90 pt-2">
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-400 font-bold mt-0.5 font-serif">✕</span>
                      <div>
                        <strong className="text-red-300 font-medium">Adulteração & Aditivos Ocultos:</strong> Incorporação irresponsável de análogos botânicos sintéticos ou espécies tóxicas para inflar a força do preparo.
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-400 font-bold mt-0.5 font-serif">✕</span>
                      <div>
                        <strong className="text-red-300 font-medium">Descompasso Fitoquímico:</strong> Excesso descontrolado de folhas em relação ao cipó, provocando crises de pânico, arritmias e desorientação sensorial severa.
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-400 font-bold mt-0.5 font-serif">✕</span>
                      <div>
                        <strong className="text-red-300 font-medium">Garrafas Reutilizadas & Contaminadas:</strong> Recipientes reaproveitados de refrigerante e bebidas recolhidos sem controle sanitário, soltando odores estranhos, açúcares residuais e fermentando no calor do transporte.
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-400 font-bold mt-0.5 font-serif">✕</span>
                      <div>
                        <strong className="text-red-300 font-medium">Insegurança Jurídica & Perseguição:</strong> Sem ata, sem laudos e sem amparo formal no CONAD, o dirigente fica exposto a apreensões e acusações indevidas.
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-400 font-bold mt-0.5 font-serif">✕</span>
                      <div>
                        <strong className="text-red-300 font-medium">Exploração dos Povos Indígenas:</strong> Atravessadores cobram preços abusivos sem repassar subsistência digna às famílias guardiãs da floresta.
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-red-500/20 text-[11px] text-red-300/80 italic font-serif">
                  Resultado: Insegurança litúrgica, medo constante de intercorrências e esvaziamento do propósito espiritual.
                </div>
              </div>
            </AnimateOnScroll>

            {/* Coluna 2: A Salvaguarda Cooperativa Nativaram */}
            <AnimateOnScroll delay={300}>
              <div className="rounded-2xl border border-ambar-500/40 bg-gradient-to-br from-floresta-900/90 to-floresta-950 p-6 sm:p-8 space-y-6 shadow-elevated relative overflow-hidden h-full flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-32 h-32 bg-ambar-500/10 rounded-bl-full pointer-events-none" />
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ambar-500/15 text-ambar-400 border border-ambar-500/30">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold tracking-wider text-ambar-400 uppercase">A Solução Cooperativa</span>
                      <h3 className="font-serif text-lg font-bold text-areia-100">O Padrão de Salvaguarda Nativaram</h3>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
                    Uma infraestrutura institucional sólida que trata o sacramento com a nobreza de uma arte sagrada e o rigor de uma ciência botânica de excelência:
                  </p>
                  <ul className="space-y-3 text-xs sm:text-sm text-areia-200 pt-2">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-ambar-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-ambar-300 font-medium">Purismo Botânico Estrito:</strong> Apenas Cipó Jagube/Mariri e Folha Rainha com água pura de nascente acreana. Zero aditivos, zero agrotóxicos.
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-ambar-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-ambar-300 font-medium">Calibração de Biomassa (3.1 a 10.1):</strong> Medição fitoquímica precisa para garantir previsibilidade na cerimônia e bem-estar fisiológico aos irmãos.
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-ambar-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-ambar-300 font-medium">Garrafas PET 100% Virgens & Higienização Completa:</strong> Recipientes novos de fábrica de padrão alimentício com lacre inviolável. Pela inviabilidade de logística reversa do vidro saindo do Acre, garantimos máxima segurança, pureza microbiológica e zero risco de quebra no frete.
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-ambar-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-ambar-300 font-medium">Blindagem Jurídica Completa:</strong> Amparo estrito na Resolução CONAD nº 01/2010 com certidão de origem e rateio cooperativo transparente.
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-ambar-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-ambar-300 font-medium">Ciclo Virtuoso de Apoio Social:</strong> O rateio cooperativo financia a Ecovila Agroflorestal no Acre e o Acolhimento Comunitário de pessoas vulneráveis.
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-ambar-500/25 text-[11px] text-ambar-300 font-serif">
                  Resultado: Paz de espírito para o dirigente, segurança plena aos comungantes e dignidade para os povos da floresta.
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <SectionDivider variant="botanical" />

      {/* ═══════════════════════════════════════════
          O CAMINHO COMPLETO: PIPELINE INTERATIVO DE ACESSIBILIDADE
          ═══════════════════════════════════════════ */}
      <section id="pipeline" className="py-section-lg relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <AnimateOnScroll>
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ambar-400">
                <Compass className="h-4 w-4" />
                <span>Cadeia de Custódia de Ponta a Ponta</span>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={150}>
              <h2 className="font-serif text-display-xs sm:text-display-sm lg:text-display-md font-bold text-areia-100">
                O Caminho da Acessibilidade Litúrgica
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll delay={300}>
              <p className="text-sm sm:text-base text-areia-300 font-light leading-relaxed">
                Entenda exatamente como cada etapa é gerida com reverência espiritual e excelência técnica, desde a colheita no coração do Acre até o altar da sua congregação.
              </p>
            </AnimateOnScroll>
          </div>

          {/* Navegação de Etapas — Abas Interativas */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {pipelineSteps.map((step, idx) => {
              const Icon = step.icone;
              const isSelected = activeStep === idx;
              return (
                <button
                  key={step.numero}
                  onClick={() => setActiveStep(idx)}
                  className={`relative p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? "border-ambar-400 bg-floresta-900/90 shadow-solar"
                      : "border-ambar-500/20 bg-floresta-950/60 hover:border-ambar-500/40 hover:bg-floresta-900/40"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className={`text-[11px] font-serif font-bold ${isSelected ? "text-ambar-400" : "text-areia-400"}`}>
                      {step.numero}
                    </span>
                    <Icon className={`h-4 w-4 ${isSelected ? "text-ambar-400" : "text-areia-400"}`} />
                  </div>
                  <div className={`text-xs font-semibold leading-snug line-clamp-2 ${isSelected ? "text-areia-100" : "text-areia-300"}`}>
                    {step.titulo}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Card Detalhado da Etapa Ativa */}
          <div className="card-elevated rounded-2xl p-6 sm:p-10 border-ambar-500/30">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ambar-500/15 text-ambar-400 border border-ambar-500/30">
                    <StepIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-ambar-400">
                      Etapa {currentStep.numero} de 06 • {currentStep.subtitulo}
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-areia-100">
                      {currentStep.titulo}
                    </h3>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-areia-200 leading-relaxed font-light">
                  {currentStep.descricao}
                </p>

                <div className="space-y-2.5 pt-2">
                  <div className="text-xs font-semibold uppercase tracking-wider text-ambar-400 font-sans">
                    Critérios de Salvaguarda Desta Etapa:
                  </div>
                  {currentStep.destaques.map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-areia-300">
                      <CheckCircle2 className="h-4 w-4 text-ambar-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Box de Ação / Próxima Etapa */}
              <div className="lg:col-span-4 rounded-xl border border-ambar-500/20 bg-floresta-950/80 p-6 space-y-4 text-center">
                <div className="text-[10px] font-bold uppercase tracking-wider text-areia-400">
                  Navegação do Pipeline
                </div>
                <div className="font-serif text-lg font-bold text-areia-100">
                  Avançar na Cadeia de Custódia
                </div>
                <div className="flex items-center justify-center gap-2 pt-2">
                  <button
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                    className="btn-secondary text-xs px-3 py-2 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Anterior
                  </button>
                  <button
                    disabled={activeStep === pipelineSteps.length - 1}
                    onClick={() => setActiveStep((prev) => Math.min(pipelineSteps.length - 1, prev + 1))}
                    className="btn-primary text-xs px-4 py-2 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Próxima Etapa
                  </button>
                </div>
                <div className="pt-3 border-t border-ambar-500/15">
                  <Link
                    href="/credenciamento"
                    className="text-xs font-semibold text-ambar-400 hover:text-ambar-300 flex items-center justify-center gap-1.5"
                  >
                    <span>Credenciar Sua Casa Agora</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="solar" />

      {/* ═══════════════════════════════════════════
          PAINEL VISUAL: A CUSTÓDIA LITÚRGICA EM DETALHES
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Fotografia real do lote de garrafas de Ayahuasca produzidas na floresta de Cruzeiro do Sul pela Cooperativa Nativaram */}
            <div className="lg:col-span-6 relative">
              <div className="relative h-[380px] sm:h-[460px] w-full rounded-2xl overflow-hidden border border-ambar-500/30 shadow-elevated group">
                <Image
                  src="/assets/projetos-de-luz/garrafas-ayahuasca-nativaram.jpg"
                  alt="Lote de garrafas de Ayahuasca produzidas artesanalmente pela Cooperativa Nativaram em Cruzeiro do Sul (Acre), envasadas em recipientes novos com lacres de segurança sobre altar rústico com folhas de Chacrona"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-floresta-950/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-floresta-950/85 backdrop-blur-md border border-ambar-500/20">
                  <div className="flex items-center gap-2 text-ambar-400 text-xs font-semibold">
                    <BadgeCheck className="h-4 w-4" />
                    <span>Custódia Litúrgica & Produção Autêntica no Acre</span>
                  </div>
                  <p className="text-[11px] text-areia-300 font-light mt-1">
                    Garrafas novas de padrão alimentício com lacre inviolável, inspecionadas na floresta antes do transporte refrigerado aos templos credenciados.
                  </p>
                </div>
              </div>
            </div>

            {/* Conteúdo Explicativo da Segurança Fitoquímica e Envase */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ambar-400">
                <FlaskConical className="h-4 w-4" />
                <span>Padrão Científico e Ancestral</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-areia-100">
                A Certeza de um Sacramento Nobre, Seguro e Estável
              </h2>
              <p className="text-sm sm:text-base text-areia-300 font-light leading-relaxed">
                Quando um dirigente serve o sacramento no altar da sua casa, ele carrega a responsabilidade pelo bem-estar de dezenas de irmãos. Nosso compromisso é assegurar que nunca haja dúvidas quanto à integridade fitoquímica, à higiene do envase e à rastreabilidade daquilo que está sendo consagrado.
              </p>

              <div className="space-y-4 pt-2">
                <div className="rounded-xl border border-ambar-500/20 bg-floresta-950/70 p-4 space-y-1.5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-ambar-400 font-serif">
                    <Droplets className="h-4 w-4" />
                    <span>Purismo da Água de Nascente</span>
                  </div>
                  <p className="text-xs text-areia-300 font-light leading-relaxed">
                    A decocção é realizada com água pura captada de nascentes preservadas no Acre, livre de cloro, flúor, metais pesados ou resíduos industriais que interfiram nas reações fitoquímicas.
                  </p>
                </div>

                <div className="rounded-xl border border-ambar-500/20 bg-floresta-950/70 p-4 space-y-1.5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-ambar-400 font-serif">
                    <Scale className="h-4 w-4" />
                    <span>Graduações com Densidade Mensurada</span>
                  </div>
                  <p className="text-xs text-areia-300 font-light leading-relaxed">
                    Disponibilizamos graduações com calibração precisa (3.1 Mainumbi para ritos suaves, 5.1 Pituã para alinhamento geral, 7.1 Anhangatã para aprofundamento e 10.1 Wirapuru para firmeza máxima), permitindo dosagens seguras.
                  </p>
                </div>

                <div className="rounded-xl border border-ambar-500/20 bg-floresta-950/70 p-4 space-y-1.5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-ambar-400 font-serif">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Envase Responsável: Garrafas 100% Novas & Higienização Estéril</span>
                  </div>
                  <p className="text-xs text-areia-300 font-light leading-relaxed">
                    Utilizamos exclusivamente garrafas PET 100% virgens de primeiro uso com higienização estéril completa e lacres invioláveis. Embora o vidro seja um nobre ideal, o alto custo e a impossibilidade prática de logística reversa a partir dos templos de volta ao interior do Acre inviabilizam o frete interestadual. As garrafas novas garantem vedação absoluta, zero contaminação e ausência de quebras no transporte aéreo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="minimal" />

      {/* ═══════════════════════════════════════════
          O TRIPLO IMPACTO: A TRANSFORMAÇÃO SOCIAL EM 3 DIMENSÕES
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <AnimateOnScroll>
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ambar-400">
                <HeartHandshake className="h-4 w-4" />
                <span>Economia Sagrada & Impacto Sistêmico</span>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={150}>
              <h2 className="font-serif text-display-xs sm:text-display-sm lg:text-display-md font-bold text-areia-100">
                A Transformação Social Gerada por Cada Frasco
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll delay={300}>
              <p className="text-sm sm:text-base text-areia-300 font-light leading-relaxed">
                A acessibilidade gerada pelo portal não se encerra na entrega do sacramento: ela fecha um ciclo virtuoso que reconecta a cidade, a floresta e os irmãos necessitados.
              </p>
            </AnimateOnScroll>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Dimensão 1: Na Floresta Amazônica */}
            <AnimateOnScroll delay={100}>
              <div className="card-elevated rounded-2xl p-8 space-y-6 h-full flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ambar-500/10 text-ambar-400 border border-ambar-500/30">
                      <Sprout className="h-6 w-6" />
                    </div>
                    <span className="number-marker">01</span>
                  </div>
                  <div className="text-[11px] font-bold text-ambar-400 uppercase tracking-wider">
                    Na Floresta Nativa (Acre)
                  </div>
                  <h3 className="font-serif text-xl font-bold text-areia-100">
                    Soberania dos Povos da Terra
                  </h3>
                  <p className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
                    Eliminação definitiva de intermediários exploratórios. Pagamento digno e antecipado a mestres feitores caboclos e apoio contínuo a iniciativas de salvaguarda cultural com povos originários (Huni Kuin, Yawanawá, Shawãdawa), além do fomento à agrofloresta sintrópica que planta mais cipó e chacrona do que colhe.
                  </p>
                </div>
                <ul className="space-y-2.5 text-xs text-areia-300 pt-4 border-t border-ambar-500/15">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-ambar-400 flex-shrink-0" />
                    <span>Renda estável para famílias ribeirinhas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-ambar-400 flex-shrink-0" />
                    <span>Reflorestamento de matrizes amazônicas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-ambar-400 flex-shrink-0" />
                    <span>Preservação de orações e rezas tradicionais</span>
                  </li>
                </ul>
              </div>
            </AnimateOnScroll>

            {/* Dimensão 2: Nos Templos e Casas de Oração */}
            <AnimateOnScroll delay={200}>
              <div className="card-elevated rounded-2xl p-8 space-y-6 h-full flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ambar-500/10 text-ambar-400 border border-ambar-500/30">
                      <Building2 className="h-6 w-6" />
                    </div>
                    <span className="number-marker">02</span>
                  </div>
                  <div className="text-[11px] font-bold text-ambar-400 uppercase tracking-wider">
                    Nos Templos & Comunidades
                  </div>
                  <h3 className="font-serif text-xl font-bold text-areia-100">
                    Tranquilidade e Blindagem Litúrgica
                  </h3>
                  <p className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
                    Democratização do acesso para casas de pequeno e médio porte em qualquer estado brasileiro. Cerimônias estáveis, sacramentos sem risco de estragar em trânsito e respaldo institucional diante das autoridades e da sociedade.
                  </p>
                </div>
                <ul className="space-y-2.5 text-xs text-areia-300 pt-4 border-t border-ambar-500/15">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-ambar-400 flex-shrink-0" />
                    <span>Previsibilidade total em cada ritual</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-ambar-400 flex-shrink-0" />
                    <span>Amparo na Resolução CONAD nº 01/2010</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-ambar-400 flex-shrink-0" />
                    <span>Fim dos preços extorsivos de atravessadores</span>
                  </li>
                </ul>
              </div>
            </AnimateOnScroll>

            {/* Dimensão 3: No Resgate Humano & Acolhimento Social */}
            <AnimateOnScroll delay={300}>
              <div className="card-elevated rounded-2xl p-8 space-y-6 h-full flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ambar-500/10 text-ambar-400 border border-ambar-500/30">
                      <HeartHandshake className="h-6 w-6" />
                    </div>
                    <span className="number-marker">03</span>
                  </div>
                  <div className="text-[11px] font-bold text-ambar-400 uppercase tracking-wider">
                    No Acolhimento Humano
                  </div>
                  <h3 className="font-serif text-xl font-bold text-areia-100">
                    Restauração de Vidas Vulneráveis
                  </h3>
                  <p className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
                    Parte do rateio é vertida ao programa de acolhimento solidário da cooperativa, que acolhe irmãos em descompasso com o cotidiano, depressão severa ou sofrimento existencial, promovendo reconstrução pela conexão com a terra, artesanato e serenidade.
                  </p>
                </div>
                <ul className="space-y-2.5 text-xs text-areia-300 pt-4 border-t border-ambar-500/15">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-ambar-400 flex-shrink-0" />
                    <span>Acolhimento fraterno sem estigmatização</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-ambar-400 flex-shrink-0" />
                    <span>Oficinas de autonomia e artesanato caboclo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-ambar-400 flex-shrink-0" />
                    <span>Reconexão com o trabalho digno na terra</span>
                  </li>
                </ul>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <SectionDivider variant="solar" />

      {/* ═══════════════════════════════════════════
          ECOVILA NO VALE DO JURUÁ & SANTUÁRIO FÍSICO
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
          <AnimateOnScroll>
            <div className="card-elevated rounded-2xl p-8 sm:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ambar-400">
                    <Home className="h-4 w-4" />
                    <span>Santuário Físico em Formação</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-areia-100">
                    A Ecovila Agroflorestal em Cruzeiro do Sul, Acre
                  </h2>
                  <p className="text-areia-300 text-sm sm:text-base leading-relaxed font-light">
                    O Projeto de Luz não é apenas uma rede de transporte: é a construção de um polo vivo de convivência comunitária, pesquisa etnobotânica e preservação no Acre. Uma comunidade autossustentável onde a sabedoria ancestral dos povos da floresta é salvaguardada para as próximas gerações.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="rounded-xl bg-floresta-950/80 p-5 border border-ambar-500/20">
                      <div className="font-semibold text-ambar-400 text-sm mb-1 font-serif">
                        Agrofloresta Sintrópica
                      </div>
                      <p className="text-xs text-areia-400 leading-relaxed font-light">
                        Manejo consorciado de Mariri, Chacrona e árvores medicinais nativas (Tsunu, Cumaru, Mulateiro) recuperando solos degradados.
                      </p>
                    </div>
                    <div className="rounded-xl bg-floresta-950/80 p-5 border border-ambar-500/20">
                      <div className="font-semibold text-ambar-400 text-sm mb-1 font-serif">
                        Casa de Feitio Tradicional
                      </div>
                      <p className="text-xs text-areia-400 leading-relaxed font-light">
                        Estrutura erguida em madeira rústica e fornalhas de barro, onde o fogo sagrado permanece aceso durante as vigílias cerimoniais.
                      </p>
                    </div>
                  </div>

                  {/* Registros Reais do Feitio */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="overflow-hidden rounded-xl border border-ambar-500/30 bg-floresta-950 group">
                      <div className="relative h-44 w-full overflow-hidden">
                        <Image
                          src="/assets/feitio/curadas/feitio-cobertura-caldeiroes.jpg"
                          alt="Estrutura de madeira rústica e caldeirões da casa de feitio em Cruzeiro do Sul"
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, 30vw"
                        />
                      </div>
                      <p className="p-3 text-[11px] text-areia-400 text-center font-light">
                        Estrutura da casa de feitio e caldeirões dedicados no Acre.
                      </p>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-ambar-500/30 bg-floresta-950 group">
                      <div className="relative h-44 w-full overflow-hidden">
                        <Image
                          src="/assets/feitio/curadas/feitio-cipo-colheita.jpg"
                          alt="Colheita sustentável de Cipó Mariri na comunidade do Acre"
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, 30vw"
                        />
                      </div>
                      <p className="p-3 text-[11px] text-areia-400 text-center font-light">
                        Manejo sustentável e colheita ética com as famílias guardiãs.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col justify-center space-y-6 rounded-2xl border border-ambar-500/30 bg-floresta-950/90 p-8 text-center shadow-elevated">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-ambar-500/10 text-ambar-400 border border-ambar-500/30">
                    <Sun className="h-8 w-8 text-ambar-400 animate-pulse-subtle" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-areia-100">
                    Como Sua Congregação Participa
                  </h3>
                  <p className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
                    Ao credenciar seu templo e partilhar dos sacramentos nobres da Nativaram, sua casa de oração automaticamente sustenta a preservação da floresta e financia a terra sagrada no Acre.
                  </p>
                  <div className="space-y-3 pt-2">
                    <Link
                      href="/credenciamento"
                      className="btn-primary w-full inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider"
                    >
                      <span>Iniciar Credenciamento</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <Link
                      href="/contato"
                      className="btn-secondary w-full inline-flex items-center justify-center gap-2 text-xs font-medium"
                    >
                      <span>Falar com Nossos Guardiões</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider variant="minimal" />

      {/* ═══════════════════════════════════════════
          PAINEL DE TRANSPARÊNCIA: DECOMPOSIÇÃO DO RATEIO SOLIDÁRIO
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <AnimateOnScroll>
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ambar-400">
                <Scale className="h-4 w-4" />
                <span>Transparência Cooperativa Total</span>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={150}>
              <h2 className="font-serif text-display-xs sm:text-display-sm lg:text-display-md font-bold text-areia-100">
                Onde Cada Centavo do Rateio é Aplicado
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll delay={300}>
              <p className="text-sm sm:text-base text-areia-300 font-light leading-relaxed">
                Na Cooperativa Nativaram não existe lucro comercial. Todo valor transferido pelos templos é estritamente uma partilha cooperativa de custos reais de sustentação.
              </p>
            </AnimateOnScroll>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimateOnScroll delay={100}>
              <div className="rounded-2xl border border-ambar-500/20 bg-floresta-950/80 p-6 space-y-3 h-full">
                <div className="font-serif text-3xl font-bold text-ambar-400">40%</div>
                <div className="font-serif text-base font-bold text-areia-100">Insumos, Alimentação & Lenha</div>
                <p className="text-xs text-areia-300 font-light leading-relaxed">
                  Lenha sustentável autorizada, alimentação integral das equipes durante as vigílias de feitio, manutenção dos tachos e suprimentos do barracão.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={200}>
              <div className="rounded-2xl border border-ambar-500/20 bg-floresta-950/80 p-6 space-y-3 h-full">
                <div className="font-serif text-3xl font-bold text-ambar-400">40%</div>
                <div className="font-serif text-base font-bold text-areia-100">Famílias Parceiras no Acre</div>
                <p className="text-xs text-areia-300 font-light leading-relaxed">
                  Remuneração justa e digna das famílias guardiãs, seringueiros, ribeirinhos e comunidades indígenas do Acre, garantindo independência de atravessadores.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={300}>
              <div className="rounded-2xl border border-ambar-500/20 bg-floresta-950/80 p-6 space-y-3 h-full">
                <div className="font-serif text-3xl font-bold text-ambar-400">10%</div>
                <div className="font-serif text-base font-bold text-areia-100">Logística & Embalagens</div>
                <p className="text-xs text-areia-300 font-light leading-relaxed">
                  Garrafas PET 100% novas virgens, protocolos de higienização estéril, lacres invioláveis e frete aéreo monitorado com isolamento térmico.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={400}>
              <div className="rounded-2xl border border-ambar-500/20 bg-floresta-950/80 p-6 space-y-3 h-full">
                <div className="font-serif text-3xl font-bold text-ambar-400">10%</div>
                <div className="font-serif text-base font-bold text-areia-100">Fundo Social & Consolidação da Ecovila</div>
                <p className="text-xs text-areia-300 font-light leading-relaxed">
                  Reserva para plantio agroflorestal perpétuo de mudas, estruturação da Ecovila e acolhimento comunitário de pessoas em vulnerabilidade.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <SectionDivider variant="solar" />

      {/* ═══════════════════════════════════════════
          PERGUNTAS FREQUENTES (FAQ)
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg relative">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <AnimateOnScroll>
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ambar-400">
                <HelpCircle className="h-4 w-4" />
                <span>Tire Suas Dúvidas</span>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={150}>
              <h2 className="font-serif text-display-xs sm:text-display-sm font-bold text-areia-100">
                Perguntas Frequentes de Casas e Dirigentes
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll delay={300}>
              <p className="text-xs sm:text-sm text-areia-300 font-light">
                Esclarecimentos pontuais sobre o credenciamento, a logística, a estabilidade e o amparo institucional.
              </p>
            </AnimateOnScroll>
          </div>

          <div className="space-y-4">
            {faqsProjetoLuz.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-ambar-500/20 bg-floresta-950/80 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-floresta-900/30 transition-colors"
                  >
                    <span className="font-serif text-base sm:text-lg font-bold text-areia-100 pr-4">
                      {faq.pergunta}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-ambar-400 flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-areia-300 leading-relaxed font-light border-t border-ambar-500/10">
                      {faq.resposta}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <SectionDivider variant="botanical" />

      {/* ═══════════════════════════════════════════
          CTA BOX FINAL: CONVITE AO CREDENCIAMENTO LITÚRGICO
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg relative">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="card-elevated rounded-3xl p-8 sm:p-14 text-center space-y-8 border-ambar-500/30 shadow-elevated relative overflow-hidden">
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-ambar-500/10 rounded-full blur-[100px] pointer-events-none" />

              <div className="inline-flex items-center gap-2 rounded-full border border-ambar-500/30 bg-floresta-900/80 px-4 py-1.5 text-xs font-semibold tracking-wider text-ambar-400 uppercase">
                <ShieldCheck className="h-4 w-4" />
                <span>Pacto de Salvaguarda e Segurança Litúrgica</span>
              </div>

              <div className="space-y-4 max-w-2xl mx-auto">
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-areia-100 leading-tight">
                  Proteja Sua Casa Espiritual com a Nobreza da Floresta
                </h2>
                <p className="text-sm sm:text-base text-areia-300 font-light leading-relaxed">
                  Dê o passo definitivo para banir a informalidade, assegurar o bem-estar absoluto dos seus comungantes e fortalecer uma rede que cuida de quem cuida da floresta.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Link
                  href="/credenciamento"
                  className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider px-8 py-3.5 shadow-solar"
                >
                  <Building2 className="h-4 w-4" />
                  <span>Credenciamento de Templos</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contato"
                  className="btn-secondary w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-medium px-8 py-3.5"
                >
                  <HeartHandshake className="h-4 w-4" />
                  <span>Falar com o Conselho Guardião</span>
                </Link>
              </div>

              {/* Disclaimer Regulatório Litúrgico Obrigatório (+18 e CONAD) */}
              <div className="pt-8 border-t border-ambar-500/20 max-w-3xl mx-auto text-[10px] text-areia-400/80 leading-relaxed font-light">
                <p>
                  <strong>Aviso de Conformidade Litúrgica e Legal:</strong> Os sacramentos botânicos tradicionais fornecidos pela Cooperativa Etnobotânica Nativaram Brasil destinam-se exclusivamente ao uso religioso e litúrgico por entidades devidamente constituídas, nos termos do Artigo 5º, inciso VI da Constituição Federal de 1988 e da Resolução CONAD nº 01/2010. O acesso é expressamente vedado a menores de 18 anos fora dos ritos tutelados pelos responsáveis legais. Não realizamos comércio eletrônico aberto nem promessas de tratamento clínico.
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}

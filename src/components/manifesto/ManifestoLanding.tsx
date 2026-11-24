import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Compass,
  Sparkles,
  HeartHandshake,
  ShieldCheck,
  TreePine,
  ArrowRight,
  Sun,
  Scale,
  FlaskConical,
  Leaf,
  Users,
  Award,
  CheckCircle2,
  XCircle,
  Eye,
  Music,
  GraduationCap,
  MapPin,
  Calendar,
  FileText,
  Info,
} from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { FaqAccordion, FaqItem } from "@/components/ui/FaqAccordion";
import { CreditoFoto } from "@/components/manifesto/CreditoFoto";

const CONAD_URL =
  "https://www.gov.br/mj/pt-br/assuntos/sua-protecao/politicas-sobre-drogas/subcapas-senad/conad/atos-do-conad-1/2010/11___resolucao_n__01_2010___conad.pdf";

const faqsInstitucionais: FaqItem[] = [
  {
    pergunta: "O que é a Cooperativa Nativaram?",
    resposta:
      "A Cooperativa Nativaram é um projeto de cooperativa em constituição, ainda sem registro e sem CNPJ. O projeto pretende se constituir sem fins lucrativos e se dedica ao estudo e à salvaguarda cultural das tradições botânicas da floresta. Nasceu sob o significado espiritual de 'Nascidos do Raio de Sol'.",
  },
  {
    pergunta: "A Nativaram oferece sacramentos por este site?",
    resposta:
      "Não. Este site é institucional. Não vendemos, não recebemos pedidos e não fazemos envios. Não há valores nem formulários de pedido. A partilha do sacramento acontece apenas entre entidades religiosas legalmente constituídas, fora deste site, por termo entre as entidades, cobrindo somente o custeio de despesas comprovadas, sem margem, conforme os princípios da Resolução CONAD nº 1/2010.",
  },
  {
    pergunta: "Qual é a relação do projeto com o feitio e com os povos da floresta?",
    resposta:
      "O projeto acompanha o feitio tradicional conduzido por um mestre feitor caboclo com mais de 28 anos de dietas de isolamento e vivência prática na floresta de Cruzeiro do Sul (Acre). A relação com os povos originários (Yawanawá, Huni Kuin, Katukina, Noke Koĩ, Shawãdawa e Apurinã) é de respeito e salvaguarda intelectual de seus saberes, sem vínculo produtivo ou comercial com as aldeias.",
  },
  {
    pergunta: "O que é a 'Alquimia entre Dois Mundos' (Etnociência)?",
    resposta:
      "É a sinergia horizontal entre a sabedoria imemorial dos pajés e anciãos e as investigações científicas de ponta. Não subordinamos o sagrado à academia ocidental nem diluímos as tradições em modismos. Cruzamos relatos orais com a literatura científica publicada (como o Journal of Ethnopharmacology) e mantemos diálogo com pesquisadores de universidades públicas.",
  },
  {
    pergunta: "Como funcionam os 'Projetos de Luz'?",
    resposta:
      "Os Projetos de Luz são a intenção socioambiental do projeto: uma ecovila e uma agrofloresta comunitária em Cruzeiro do Sul (Acre), a proteção dos habitats da Ararajuba e o apoio às comunidades da floresta. São intenções em planejamento, ainda sem recursos próprios nem resultados a relatar.",
  },
  {
    pergunta: "Como uma entidade religiosa pode falar com o projeto?",
    resposta:
      "Entidades religiosas constituídas podem falar com a coordenação do projeto pelo e-mail ou WhatsApp institucional. Não coletamos dados pelo site. A página Entidades Religiosas reúne as orientações.",
  },
];

export function ManifestoLanding() {
  return (
    <div className="space-y-0">
      {/* ═══════════════════════════════════════════
          HERO — DISPLAY IMERSIVO COM FOTOGRAFIA REAL DO ACRE
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-24 sm:py-32">
        {/* Background Image com Overlay Nobre */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/manifesto/cruzeiro-do-sul-rio-moa-acre.jpg"
            alt="Luz solar sobre a Floresta Amazônica e o Rio Moa no Parque Nacional da Serra do Divisor, Cruzeiro do Sul, Acre"
            fill
            priority
            className="object-cover object-center brightness-60 scale-105 transition-transform duration-1000"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-floresta-950 via-floresta-950/70 to-floresta-950/40" />
          <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        </div>
        <CreditoFoto
          arquivo="/assets/manifesto/cruzeiro-do-sul-rio-moa-acre.jpg"
          className="absolute bottom-3 right-4 z-10"
        />

        {/* Efeito Glow Dourado */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-ambar-500/[0.12] rounded-full blur-[120px] pointer-events-none z-0" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <AnimateOnScroll>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-ambar-500/30 bg-floresta-950/85 backdrop-blur-md px-5 py-2 text-xs font-semibold tracking-[0.18em] text-ambar-400 uppercase shadow-solar">
              <Sun className="h-3.5 w-3.5 text-ambar-400 animate-pulse" />
              <span>Projeto de Cooperativa • O Manifesto • Quem Somos</span>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={150}>
            <h1 className="font-serif text-display-md sm:text-display-lg lg:text-display-xl font-bold text-areia-100 text-glow leading-tight">
              Nascidos do
              <br />
              <span className="text-gradient-solar">Raio de Sol</span>
            </h1>
          </AnimateOnScroll>

          <AnimateOnScroll delay={300}>
            <p className="text-base sm:text-lg lg:text-xl text-areia-200/90 leading-relaxed italic max-w-3xl mx-auto font-serif">
              &ldquo;O Futuro é Ancestral: onde a inteligência da tecnologia se
              curva à sabedoria da floresta para traduzir o florescimento e
              despertar o espírito.&rdquo;
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll delay={450}>
            {/* Badges de Autoridade Geográfica & Legal */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <div className="inline-flex items-center gap-2 rounded-xl border border-ambar-500/20 bg-floresta-900/80 px-3.5 py-2 text-xs text-areia-200 backdrop-blur-sm">
                <MapPin className="h-3.5 w-3.5 text-ambar-400" />
                <span>Feitio: Cruzeiro do Sul, Acre</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-xl border border-ambar-500/20 bg-floresta-900/80 px-3.5 py-2 text-xs text-areia-200 backdrop-blur-sm">
                <Compass className="h-3.5 w-3.5 text-ambar-400" />
                <span>Coordenação: Serra, Espírito Santo</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-xl border border-ambar-500/20 bg-floresta-900/80 px-3.5 py-2 text-xs text-areia-200 backdrop-blur-sm">
                <Scale className="h-3.5 w-3.5 text-ambar-400" />
                <span>Resolução CONAD 01/2010 • Art. 5º CF/88</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-xl border border-ambar-500/20 bg-floresta-900/80 px-3.5 py-2 text-xs text-areia-200 backdrop-blur-sm">
                <ShieldCheck className="h-3.5 w-3.5 text-ambar-400" />
                <span>Cooperativa em constituição</span>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={600}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a href="#historia" className="btn-primary">
                <Sparkles className="h-4 w-4" />
                <span>Conhecer Nossa História & Valores</span>
              </a>
              <Link href="/entidades-religiosas" className="btn-secondary">
                <Scale className="h-4 w-4" />
                <span>Entidades Religiosas</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider variant="solar" />

      {/* ═══════════════════════════════════════════
          CAPÍTULO I: A GÊNESE & QUEM SOMOS ("SOBRE NÓS")
          ═══════════════════════════════════════════ */}
      <section id="historia" className="py-section-lg lg:py-section-xl bg-floresta-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Texto Principal */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-ambar-400 uppercase tracking-[0.25em] font-mono">
                    Capítulo I • Nossa Identidade
                  </span>
                  <h2 className="font-serif text-display-sm sm:text-display-md font-bold text-areia-100">
                    A Gênese Nativaram:
                    <br />
                    <span className="text-gradient-solar">
                      A Entrega de Alma como Caminho
                    </span>
                  </h2>
                </div>

                <div className="space-y-4 text-sm text-areia-300 leading-relaxed font-light">
                  <p>
                    A <strong className="text-areia-100 font-semibold">Cooperativa Nativaram</strong> nasce sob o significado sagrado de <strong className="text-ambar-300 font-semibold">&ldquo;Nascidos do Raio de Sol&rdquo;</strong>. Representa a jornada daqueles que escolheram a entrega de alma como única forma de caminhar pela vida.
                  </p>
                  <p>
                    A Cooperativa Nativaram é um projeto de cooperativa em constituição, ainda sem registro e sem CNPJ. Reúne guardiões, estudiosos da etnobotânica e mestres tradicionais da floresta em torno do estudo e da salvaguarda das tradições botânicas amazônicas, e pretende se constituir sem fins lucrativos.
                  </p>
                  <p>
                    Este site é institucional. <strong className="text-areia-200">Não vendemos, não recebemos pedidos e não fazemos envios.</strong> Não há valores nem formulários de pedido. Rejeitamos o turismo espiritual, a apropriação predatória e a banalização dos ritos da floresta.
                  </p>
                </div>

                {/* Destaque do Mestre Feitor Caboclo */}
                <div className="card-liturgico rounded-2xl p-6 space-y-4 border-l-4 border-l-ambar-500">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-ambar-400 uppercase tracking-wider">
                    <TreePine className="h-4 w-4" />
                    <span>O Mestre Feitor & Os Centros Tradicionais</span>
                  </div>
                  <p className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
                    O feitio que o projeto acompanha não vem de processos anônimos ou industriais. Nossa reverência central está na sabedoria do <strong className="text-areia-100 font-medium">mestre feitor caboclo</strong>, com mais de <strong className="text-areia-100 font-medium">28 anos de estudos profundos e dietas rigorosas de isolamento na selva</strong> de Cruzeiro do Sul/AC.
                  </p>
                  <div className="pt-2.5 border-t border-ambar-500/15 space-y-1.5">
                    <h4 className="font-serif text-xs font-semibold text-ambar-300 flex items-center gap-1.5">
                      <span>✦</span> Centros Tradicionais do Acre
                    </h4>
                    <p className="text-xs text-areia-300/90 leading-relaxed font-light">
                      O projeto dialoga com <strong>centros tradicionais do Acre</strong> que mantêm seu feitio de forma independente, para os seus próprios trabalhos religiosos. Respeitamos a autonomia de cada feitor e de cada casa.
                    </p>
                  </div>
                  <div className="pt-2.5 border-t border-ambar-500/15 space-y-1.5">
                    <h4 className="font-serif text-xs font-semibold text-ambar-300 flex items-center gap-1.5">
                      <span>✦</span> Povos Originários: Salvaguarda Intelectual e Procedimental
                    </h4>
                    <p className="text-xs text-areia-300/90 leading-relaxed font-light">
                      Nossa conexão e reverência aos povos originários (<strong className="text-ambar-300 font-medium">Yawanawá, Huni Kuin, Katukina, Noke Koĩ, Shawãdawa e Apurinã</strong>) dá-se <strong>estritamente dentro da salvaguarda intelectual e procedimental</strong>, em respeito à memória etnobotânica e à sabedoria imaterial da floresta. <strong>Não temos vínculo produtivo com comunidades ou aldeias indígenas</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Coluna Visual */}
              <div className="lg:col-span-5 space-y-4">
                <div className="image-reveal rounded-3xl overflow-hidden border border-ambar-500/20 shadow-elevated-lg relative">
                  <div className="relative h-[420px] sm:h-[500px] w-full">
                    <Image
                      src="/assets/feitio/curadas/feitio-cipo-colheita.jpg"
                      alt="Feixes de cipó reunidos sob o telhado de um barracão de feitio"
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-floresta-950/80 via-transparent to-transparent" />
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-6 space-y-1 bg-gradient-to-t from-floresta-950 via-floresta-950/90 to-transparent">
                    <span className="text-[10px] font-mono text-ambar-400 uppercase tracking-widest">
                      Barracão de feitio
                    </span>
                    <p className="text-xs text-areia-200 font-serif italic">
                      O cipó reunido antes do feitio.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="card-elevated rounded-xl p-4 space-y-1">
                    <span className="font-serif text-2xl font-bold text-ambar-400">28+</span>
                    <p className="text-[11px] text-areia-400">Anos de Dietas & Feitio Tradicional</p>
                  </div>
                  <div className="card-elevated rounded-xl p-4 space-y-1">
                    <span className="font-serif text-2xl font-bold text-ambar-400">6</span>
                    <p className="text-[11px] text-areia-400">Nações em Salvaguarda Intelectual</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider variant="floresta" />

      {/* ═══════════════════════════════════════════
          CAPÍTULO II: MISSÃO, VISÃO & OS 5 VALORES FUNDAMENTAIS
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg lg:py-section-xl bg-floresta-900/40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-16">
          <AnimateOnScroll className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[11px] font-bold text-ambar-400 uppercase tracking-[0.25em] font-mono">
              Capítulo II • Princípios Doutrinários
            </span>
            <h2 className="font-serif text-display-sm sm:text-display-md font-bold text-areia-100">
              Missão, Visão &
              <br />
              <span className="text-gradient-solar">Valores Institucionais</span>
            </h2>
            <p className="text-sm text-areia-300 font-light leading-relaxed">
              As diretrizes fundamentais que orientam cada consagração, cada relação humana e a sustentação ética da Cooperativa Nativaram.
            </p>
          </AnimateOnScroll>

          {/* Missão & Visão Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimateOnScroll delay={100}>
              <div className="card-elevated rounded-2xl p-8 h-full space-y-4 border-t-2 border-t-ambar-500">
                <div className="inline-flex p-3 rounded-xl bg-ambar-500/10 border border-ambar-500/20 text-ambar-400">
                  <Compass className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-areia-100">
                  Nossa Missão
                </h3>
                <p className="text-sm text-areia-300 leading-relaxed font-light">
                  Atuar como um <strong className="text-areia-100 font-medium">canal de síntese e integridade</strong>, levando a sabedoria das plantas de poder e os tesouros da cultura ancestral ao buscador contemporâneo, unindo a tradição milenar da floresta e o estudo técnico fitoquímico em benefício do florescimento e da expansão da consciência.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={250}>
              <div className="card-elevated rounded-2xl p-8 h-full space-y-4 border-t-2 border-t-ambar-500">
                <div className="inline-flex p-3 rounded-xl bg-ambar-500/10 border border-ambar-500/20 text-ambar-400">
                  <Eye className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-areia-100">
                  Nossa Visão
                </h3>
                <p className="text-sm text-areia-300 leading-relaxed font-light">
                  Ser a <strong className="text-areia-100 font-medium">principal referência brasileira na integração de saberes etnobotânicos</strong>, sendo reconhecida pela pureza absoluta dos seus sacramentos e pela profundidade da conexão estabelecida entre as raízes amazônicas e o público global, ancorada no rigor ético e regulamentar.
                </p>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Os 5 Valores Inegociáveis */}
          <div className="space-y-6">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-areia-100 text-center">
              Os Cinco Pilares e Valores Fundamentais
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Valor 1 */}
              <AnimateOnScroll delay={50}>
                <div className="card-liturgico rounded-2xl p-6 space-y-3 h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-ambar-500/15 border border-ambar-500/30 flex items-center justify-center text-ambar-400 font-serif font-bold text-sm">
                        I
                      </div>
                      <h4 className="font-serif text-base font-bold text-areia-100">
                        Reverência ao Sagrado
                      </h4>
                    </div>
                    <p className="text-xs text-areia-300 leading-relaxed font-light">
                      Tratamos cada elemento vegetal como manifestação do divino. Do manejo do cipó e da folha até o cozimento e a embalagem, cada etapa do processo é conduzida como uma oração ativa e ininterrupta.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-ambar-400/70 uppercase tracking-widest pt-2 border-t border-ambar-500/10">
                    Sacralidade Inegociável
                  </span>
                </div>
              </AnimateOnScroll>

              {/* Valor 2 */}
              <AnimateOnScroll delay={150}>
                <div className="card-liturgico rounded-2xl p-6 space-y-3 h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-ambar-500/15 border border-ambar-500/30 flex items-center justify-center text-ambar-400 font-serif font-bold text-sm">
                        II
                      </div>
                      <h4 className="font-serif text-base font-bold text-areia-100">
                        Alquimia & Sinergia de Saberes
                      </h4>
                    </div>
                    <p className="text-xs text-areia-300 leading-relaxed font-light">
                      Honramos a maestria milenar dos povos originários na manipulação das plantas de poder em diálogo com o estudo técnico-científico e com pesquisadores de universidades públicas.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-ambar-400/70 uppercase tracking-widest pt-2 border-t border-ambar-500/10">
                    Etnociência Pura
                  </span>
                </div>
              </AnimateOnScroll>

              {/* Valor 3 */}
              <AnimateOnScroll delay={250}>
                <div className="card-liturgico rounded-2xl p-6 space-y-3 h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-ambar-500/15 border border-ambar-500/30 flex items-center justify-center text-ambar-400 font-serif font-bold text-sm">
                        III
                      </div>
                      <h4 className="font-serif text-base font-bold text-areia-100">
                        Identidade de Síntese
                      </h4>
                    </div>
                    <p className="text-xs text-areia-300 leading-relaxed font-light">
                      Celebramos a pluralidade cultural brasileira — o caboclo, o indígena, o místico e o buscador contemporâneo — como o solo sagrado de acolhimento fraterno e autoridade da cooperativa.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-ambar-400/70 uppercase tracking-widest pt-2 border-t border-ambar-500/10">
                    Fraternidade & União
                  </span>
                </div>
              </AnimateOnScroll>

              {/* Valor 4 */}
              <AnimateOnScroll delay={350}>
                <div className="card-liturgico rounded-2xl p-6 space-y-3 h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-ambar-500/15 border border-ambar-500/30 flex items-center justify-center text-ambar-400 font-serif font-bold text-sm">
                        IV
                      </div>
                      <h4 className="font-serif text-base font-bold text-areia-100">
                        Valorização dos Guardiões
                      </h4>
                    </div>
                    <p className="text-xs text-areia-300 leading-relaxed font-light">
                      Defendemos a valorização dos saberes e do trabalho dos guardiões da floresta e dos artesãos tradicionais (Txais), com transparência.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-ambar-400/70 uppercase tracking-widest pt-2 border-t border-ambar-500/10">
                    Respeito ao Trabalho Tradicional
                  </span>
                </div>
              </AnimateOnScroll>

              {/* Valor 5 */}
              <AnimateOnScroll delay={450}>
                <div className="card-liturgico rounded-2xl p-6 space-y-3 h-full flex flex-col justify-between sm:col-span-2 lg:col-span-2">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-ambar-500/15 border border-ambar-500/30 flex items-center justify-center text-ambar-400 font-serif font-bold text-sm">
                        V
                      </div>
                      <h4 className="font-serif text-base font-bold text-areia-100">
                        Soberania da Natureza & Regeneração Ecológica
                      </h4>
                    </div>
                    <p className="text-xs text-areia-300 leading-relaxed font-light">
                      Respeitamos a floresta amazônica como fonte de vida e sabedoria. Defendemos a colheita manual e renovável, a mata nativa em pé e o cuidado com os habitats da fauna brasileira, em especial a <em className="text-areia-100">Ararajuba (Guaruba guarouba)</em>.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-ambar-400/70 uppercase tracking-widest pt-2 border-t border-ambar-500/10">
                    Manejo Regenerativo & Proteção à Fauna
                  </span>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="solar" />

      {/* ═══════════════════════════════════════════
          CAPÍTULO III: A ALQUIMIA ENTRE DOIS MUNDOS (ETNOCIÊNCIA)
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg lg:py-section-xl bg-floresta-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="text-[11px] font-bold text-ambar-400 uppercase tracking-[0.25em] font-mono">
                  Capítulo III • Sinergia de Saberes
                </span>
                <h2 className="font-serif text-display-sm sm:text-display-md font-bold text-areia-100">
                  A Alquimia Entre
                  <br />
                  <span className="text-gradient-solar">Dois Mundos</span>
                </h2>
                <p className="text-sm text-areia-300 font-light leading-relaxed">
                  Contrapondo-se à fragmentação colonial do conhecimento, a Nativaram adota uma postura transdisciplinar, onde a cosmologia dos povos da terra dialoga em igualdade simétrica com a ciência contemporânea.
                </p>
              </div>

              {/* Grid 4 Áreas de diálogo com pesquisadores (sem parceria formal declarada) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card-elevated rounded-xl p-6 space-y-3 border-t-2 border-t-ambar-500/40">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-ambar-400">Botânica</span>
                    <GraduationCap className="h-4 w-4 text-ambar-400/70" />
                  </div>
                  <h4 className="font-serif text-sm font-bold text-areia-100">
                    Taxonomia Amazônica
                  </h4>
                  <p className="text-xs text-areia-400 leading-relaxed font-light">
                    Identificação das espécies, mapeamento de etnotáxons e manejo do cipó Tucunacá na floresta.
                  </p>
                </div>

                <div className="card-elevated rounded-xl p-6 space-y-3 border-t-2 border-t-ambar-500/40">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-ambar-400">Etnobotânica</span>
                    <GraduationCap className="h-4 w-4 text-ambar-400/70" />
                  </div>
                  <h4 className="font-serif text-sm font-bold text-areia-100">
                    Memória da Floresta
                  </h4>
                  <p className="text-xs text-areia-400 leading-relaxed font-light">
                    Registro dos usos tradicionais e da relação entre os povos da terra e as plantas.
                  </p>
                </div>

                <div className="card-elevated rounded-xl p-6 space-y-3 border-t-2 border-t-ambar-500/40">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-ambar-400">Fitoquímica</span>
                    <GraduationCap className="h-4 w-4 text-ambar-400/70" />
                  </div>
                  <h4 className="font-serif text-sm font-bold text-areia-100">
                    Composição Botânica
                  </h4>
                  <p className="text-xs text-areia-400 leading-relaxed font-light">
                    Perfil de composição de cascas, folhas e sementes usadas no feitio tradicional.
                  </p>
                </div>

                <div className="card-elevated rounded-xl p-6 space-y-3 border-t-2 border-t-ambar-500/40">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-ambar-400">Segurança</span>
                    <GraduationCap className="h-4 w-4 text-ambar-400/70" />
                  </div>
                  <h4 className="font-serif text-sm font-bold text-areia-100">
                    Cuidado nas Cerimônias
                  </h4>
                  <p className="text-xs text-areia-400 leading-relaxed font-light">
                    Literatura sobre triagem e protocolos de segurança nas cerimônias religiosas.
                  </p>
                </div>
              </div>

              {/* Literatura científica de referência */}
              <div className="card-liturgico rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-ambar-500/25">
                <div className="space-y-2 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-ambar-400 font-bold uppercase tracking-wider">
                    <FlaskConical className="h-4 w-4" />
                    <span>Diálogo com a Pesquisa</span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-areia-100">
                    Literatura Científica de Referência
                  </h4>
                  <p className="text-xs sm:text-sm text-areia-300 font-light max-w-2xl leading-relaxed">
                    A Nativaram acompanha a literatura publicada em bases como o <em>Journal of Ethnopharmacology</em> e o <em>Dr. Duke&apos;s Database</em> e mantém diálogo com pesquisadores de universidades públicas. Esse diálogo não constitui parceria formal com nenhuma instituição.
                  </p>
                </div>
                <Link
                  href="/estudos"
                  className="btn-secondary shrink-0 text-xs py-3 px-5"
                >
                  <FileText className="h-4 w-4 text-ambar-400" />
                  <span>Acessar Acervo de Estudos</span>
                </Link>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider variant="floresta" />

      {/* ═══════════════════════════════════════════
          CAPÍTULO IV: O QUE SOMOS VS. O QUE NÃO SOMOS
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg lg:py-section-xl bg-floresta-900/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
          <AnimateOnScroll className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[11px] font-bold text-ambar-400 uppercase tracking-[0.25em] font-mono">
              Capítulo IV • Clareza de Princípios
            </span>
            <h2 className="font-serif text-display-sm sm:text-display-md font-bold text-areia-100">
              O Que Somos
              <br />
              <span className="text-gradient-solar">E O Que Não Somos</span>
            </h2>
            <p className="text-sm text-areia-400 font-light">
              Separamos com clareza a vida religiosa de qualquer exploração comercial.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll delay={150}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* O QUE É */}
              <div className="card-elevated rounded-2xl p-6 sm:p-8 space-y-5 border-l-4 border-l-emerald-500">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-areia-100">
                    O Que Somos & Praticamos
                  </h3>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-areia-300 font-light">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Projeto de cooperativa em constituição, ainda sem registro e sem CNPJ.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Registro cultural do feitio artesanal conduzido na floresta de Cruzeiro do Sul (Acre).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Acervo aberto de estudos, documentos e alertas de segurança.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Respeito à Resolução CONAD nº 1/2010 e às tradições religiosas da floresta.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Compreensão do sacramento como prática religiosa de recolhimento e reza.</span>
                  </li>
                </ul>
              </div>

              {/* O QUE NÃO É */}
              <div className="card-elevated rounded-2xl p-6 sm:p-8 space-y-5 border-l-4 border-l-red-500/80">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">
                    <XCircle className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-areia-100">
                    O Que Jamais Seremos
                  </h3>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-areia-300 font-light">
                  <li className="flex items-start gap-2.5">
                    <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                    <span>Não vendemos, não recebemos pedidos e não fazemos envios.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                    <span>Não fazemos promessas clínicas nem indicamos uso terapêutico.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                    <span>Não usamos jargões recreativos para falar do rapé sagrado.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                    <span>Repudiamos o turismo espiritual e o uso fora do contexto religioso.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                    <span>Zero tolerância a desmatamento, colheita predatória ou biopirataria.</span>
                  </li>
                </ul>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider variant="solar" />

      {/* ═══════════════════════════════════════════
          CAPÍTULO V: O ECOSSISTEMA DE SACRAMENTOS & ARTEFATOS
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg lg:py-section-xl bg-floresta-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
          <AnimateOnScroll className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[11px] font-bold text-ambar-400 uppercase tracking-[0.25em] font-mono">
              Capítulo V • Nossa Curadoria
            </span>
            <h2 className="font-serif text-display-sm sm:text-display-md font-bold text-areia-100">
              O Ecossistema Litúrgico
              <br />
              <span className="text-gradient-solar">Cooperativa Nativaram</span>
            </h2>
            <p className="text-sm text-areia-300 font-light leading-relaxed">
              As tradições que o projeto estuda e registra.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Ayahuasca Purista */}
            <AnimateOnScroll delay={100}>
              <div className="card-elevated rounded-2xl p-6 space-y-4 h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 text-ambar-400">
                    <FlaskConical className="h-5 w-5" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">Feitio de Ayahuasca</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-areia-100">
                    Ayahuasca Purista (Cipó Tucunacá & Rainha)
                  </h3>
                  <p className="text-xs text-areia-300 font-light leading-relaxed">
                    Decocção sagrada conduzida sob oração silenciosa em Cruzeiro do Sul (Acre). Utilizamos exclusivamente o Cipó Tucunacá (perfil de alcaloides em laudo em validação) e folhas de Chacrona Rainha colhidas ao amanhecer, rejeitando qualquer planta aditiva.
                  </p>
                </div>
                <Link href="/feitio" className="inline-flex items-center gap-1.5 text-xs text-ambar-400 hover:text-ambar-300 font-semibold pt-3 border-t border-ambar-500/15">
                  <span>Conhecer o Feitio Purista</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </AnimateOnScroll>

            {/* 2. Rapés Sagrados */}
            <AnimateOnScroll delay={200}>
              <div className="card-elevated rounded-2xl p-6 space-y-4 h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 text-ambar-400">
                    <Leaf className="h-5 w-5" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">Alquimia Botânica</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-areia-100">
                    O Rapé na Tradição da Floresta
                  </h3>
                  <p className="text-xs text-areia-300 font-light leading-relaxed">
                    Tabaco moído e unido a cinzas de cascas de árvores nativas, segundo os saberes de cada povo. Conteúdo cultural e etnobotânico. Não é oferta. O rapé contém tabaco e nicotina, que causam dependência. Proibido para menores de 18 anos.
                  </p>
                </div>
                <Link href="/sacramentos" className="inline-flex items-center gap-1.5 text-xs text-ambar-400 hover:text-ambar-300 font-semibold pt-3 border-t border-ambar-500/15">
                  <span>Ver o Acervo Etnobotânico</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </AnimateOnScroll>

            {/* 4. Artesanato dos Txais */}
            <AnimateOnScroll delay={400}>
              <div className="card-elevated rounded-2xl p-6 space-y-4 h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 text-ambar-400">
                    <Award className="h-5 w-5" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">Arte Sagrada</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-areia-100">
                    Instrumentos dos Povos da Terra
                  </h3>
                  <p className="text-xs text-areia-300 font-light leading-relaxed">
                    Kuripes, Tepís, Maracás e Flautas esculpidos à mão por artesãos e famílias indígenas tradicionais (os Txais). Artefatos que materializam a cosmologia da floresta na vida ritual.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-ambar-400/80 pt-3 border-t border-ambar-500/15">
                  Arte dos Povos da Terra
                </span>
              </div>
            </AnimateOnScroll>

            {/* 5. Arte Sonora 432Hz */}
            <AnimateOnScroll delay={500}>
              <div className="card-elevated rounded-2xl p-6 space-y-4 h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 text-ambar-400">
                    <Music className="h-5 w-5" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">Vibração & Geometria</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-areia-100">
                    Expressão Musical Acústica & Frequência 432Hz
                  </h3>
                  <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
                    A música e a arte sonora são extensões diretas do nosso trabalho de florescimento (Munay Sounds / Família Ancestral). Produções estritamente acústicas e orgânicas, sem auto-tune artificial, afinadas na frequência de 432Hz, associada pela tradição aos ritmos da natureza.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-ambar-400/80 pt-3 border-t border-ambar-500/15">
                  Munay Sounds • 432Hz
                </span>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <SectionDivider variant="floresta" />

      {/* ═══════════════════════════════════════════
          CAPÍTULO VI: PROJETOS DE LUZ & AGROFLORESTA NO ACRE
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg lg:py-section-xl bg-floresta-900/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
          <AnimateOnScroll>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Imagem */}
              <div className="lg:col-span-5 order-2 lg:order-1 space-y-4">
                <div className="image-reveal rounded-3xl overflow-hidden border border-ambar-500/20 shadow-elevated-lg relative">
                  <div className="relative h-[420px] sm:h-[480px] w-full">
                    <Image
                      src="/assets/manifesto/cruzeiro-do-sul-comunidade-acre.jpg"
                      alt="Moradia ribeirinha junto a uma samaúma em Cruzeiro do Sul, Acre"
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-floresta-950/85 via-transparent to-transparent" />
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-6 space-y-1 bg-gradient-to-t from-floresta-950 via-floresta-950/90 to-transparent">
                    <span className="text-[10px] font-mono text-ambar-400 uppercase tracking-widest">
                      Território
                    </span>
                    <p className="text-xs text-areia-200 font-serif italic">
                      Cruzeiro do Sul (AC). Imagem ilustrativa do território.
                    </p>
                    <CreditoFoto arquivo="/assets/manifesto/cruzeiro-do-sul-comunidade-acre.jpg" className="block" />
                  </div>
                </div>
              </div>

              {/* Conteúdo */}
              <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-ambar-400 uppercase tracking-[0.25em] font-mono">
                    Capítulo VI • Intenção Socioambiental
                  </span>
                  <h2 className="font-serif text-display-sm sm:text-display-md font-bold text-areia-100">
                    Projetos de Luz &
                    <br />
                    <span className="text-gradient-solar">Regeneração Ecológica</span>
                  </h2>
                </div>

                <div className="space-y-4 text-sm text-areia-300 leading-relaxed font-light">
                  <p>
                    Os <strong className="text-areia-100 font-semibold">&ldquo;Projetos de Luz&rdquo;</strong> são a intenção socioambiental do projeto: a regeneração de uma agrofloresta no Acre, o cuidado com a fauna nativa e o apoio às comunidades da floresta.
                  </p>
                  <p>
                    São intenções em planejamento. O projeto ainda está em constituição e não tem recursos próprios nem resultados a relatar.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="card-elevated rounded-xl p-5 space-y-2 border-t-2 border-t-ambar-500/40">
                    <h4 className="font-serif text-sm font-bold text-areia-100">
                      Ecovila Comunitária no Acre
                    </h4>
                    <p className="text-xs text-areia-400 font-light leading-relaxed">
                      Intenção de um espaço para intercâmbio intercultural, resgate de saberes tradicionais e agricultura regenerativa.
                    </p>
                  </div>

                  <div className="card-elevated rounded-xl p-5 space-y-2 border-t-2 border-t-ambar-500/40">
                    <h4 className="font-serif text-sm font-bold text-areia-100">
                      Preservação da Ararajuba
                    </h4>
                    <p className="text-xs text-areia-400 font-light leading-relaxed">
                      Intenção de um manejo que mantenha as copas e árvores nativas em pé, cuidando dos ninhos e habitats da <em>Guaruba guarouba</em>.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="/projetos-de-luz" className="btn-secondary">
                    <HeartHandshake className="h-4 w-4 text-ambar-400" />
                    <span>Conhecer Todos os Projetos de Luz</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider variant="solar" />

      {/* ═══════════════════════════════════════════
          CAPÍTULO VII: GOVERNANÇA E CONAD 01/2010
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg lg:py-section-xl bg-floresta-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
          <AnimateOnScroll className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[11px] font-bold text-ambar-400 uppercase tracking-[0.25em] font-mono">
              Capítulo VII • Rigor Jurídico & Governança
            </span>
            <h2 className="font-serif text-display-sm sm:text-display-md font-bold text-areia-100">
              Marco Legal &
              <br />
              <span className="text-gradient-solar">Compliance Institucional</span>
            </h2>
            <p className="text-sm text-areia-300 font-light leading-relaxed">
              As normas que orientam o uso religioso e o modo como o projeto se comunica.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bloco 1 */}
            <AnimateOnScroll delay={100}>
              <div className="card-liturgico rounded-2xl p-6 space-y-4 h-full flex flex-col justify-between border border-ambar-500/20">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-ambar-400 uppercase">
                    <Scale className="h-4 w-4" />
                    <span>Constituição Federal</span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-areia-100">
                    Art. 5º, VI e VIII da CF/88
                  </h3>
                  <p className="text-xs text-areia-300 font-light leading-relaxed">
                    Inviolabilidade da liberdade de consciência e de crença, com o livre exercício dos cultos religiosos e a proteção, na forma da lei, aos locais de culto e às suas liturgias.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-areia-400">Direito Fundamental</span>
              </div>
            </AnimateOnScroll>

            {/* Bloco 2 */}
            <AnimateOnScroll delay={200}>
              <div className="card-liturgico rounded-2xl p-6 space-y-4 h-full flex flex-col justify-between border border-ambar-500/20">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-ambar-400 uppercase">
                    <ShieldCheck className="h-4 w-4" />
                    <span>CONAD nº 01/2010</span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-areia-100">
                    Deontologia Religiosa Nacional
                  </h3>
                  <p className="text-xs text-areia-300 font-light leading-relaxed">
                    Resolução do Conselho Nacional de Políticas sobre Drogas que trata do uso religioso da ayahuasca e reúne princípios deontológicos, entre eles a vedação ao comércio e à propaganda.
                  </p>
                </div>
                <a
                  href={CONAD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-mono text-ambar-400 underline underline-offset-2 hover:text-ambar-300"
                >
                  Texto oficial da Resolução
                </a>
              </div>
            </AnimateOnScroll>

            {/* Bloco 3 */}
            <AnimateOnScroll delay={300}>
              <div className="card-liturgico rounded-2xl p-6 space-y-4 h-full flex flex-col justify-between border border-ambar-500/20">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-ambar-400 uppercase">
                    <FileText className="h-4 w-4" />
                    <span>Regra da Cooperativa</span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-areia-100">
                    Conformidade Digital Absoluta
                  </h3>
                  <p className="text-xs text-areia-300 font-light leading-relaxed">
                    Este site é institucional. Não vendemos, não recebemos pedidos e não fazemos envios. Não há valores nem formulários de pedido.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-areia-400">Estatuto e Manual de Compliance</span>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Banner de Triagem e Redução de Danos */}
          <div className="card-editorial bg-floresta-900/60 p-6 sm:p-8 rounded-2xl border border-ambar-500/20 space-y-4">
            <div className="flex items-center gap-3">
              <Info className="h-5 w-5 text-ambar-400" />
              <h4 className="font-serif text-base sm:text-lg font-bold text-areia-100">
                Triagem de Segurança nas Casas Religiosas
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
              Quem usa medicamentos de uso contínuo deve informar o dirigente e passar por triagem antes de qualquer cerimônia; cada casa religiosa tem protocolo de segurança próprio.
            </p>
            <div className="pt-2">
              <Link href="/compliance" className="inline-flex items-center gap-1.5 text-xs text-ambar-400 hover:underline font-mono">
                <span>Acessar o Manual de Compliance Completo</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="floresta" />

      {/* ═══════════════════════════════════════════
          CAPÍTULO VIII: LINHA DO TEMPO DA JORNADA NATIVARAM
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg lg:py-section-xl bg-floresta-900/40">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
          <AnimateOnScroll className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[11px] font-bold text-ambar-400 uppercase tracking-[0.25em] font-mono">
              Capítulo VIII • Cronologia Sagrada
            </span>
            <h2 className="font-serif text-display-sm sm:text-display-md font-bold text-areia-100">
              Mais de Duas Décadas
              <br />
              <span className="text-gradient-solar">De Vivência Prática</span>
            </h2>
            <p className="text-sm text-areia-400 font-light">
              Os marcos que moldaram a consolidação da Cooperativa Nativaram.
            </p>
          </AnimateOnScroll>

          {/* Timeline Vertical */}
          <div className="relative border-l border-ambar-500/25 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
            {/* Item 1 */}
            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 h-4 w-4 rounded-full bg-ambar-500 border-4 border-floresta-950 shadow-solar" />
              <div className="space-y-1.5">
                <span className="text-xs font-mono font-bold text-ambar-400">1998 — 2010</span>
                <h4 className="font-serif text-base font-bold text-areia-100">
                  Imersão na Floresta do Acre & Alianças Ancestrais
                </h4>
                <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
                  Início das dietas de isolamento e aprendizado prático do feitor caboclo com os mestres e pajés das nações Yawanawá, Huni Kuin e Katukina. Absorção dos rezos e da manipulação sutil das plantas de poder.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 h-4 w-4 rounded-full bg-ambar-500 border-4 border-floresta-950 shadow-solar" />
              <div className="space-y-1.5">
                <span className="text-xs font-mono font-bold text-ambar-400">2010</span>
                <h4 className="font-serif text-base font-bold text-areia-100">
                  Marco Regulatório do CONAD
                </h4>
                <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
                  Publicação da Resolução CONAD nº 01/2010. Adoção irrestrita da deontologia de vedação ao comércio profano e estruturação dos princípios éticos de conservação das espécies.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 h-4 w-4 rounded-full bg-ambar-500 border-4 border-floresta-950 shadow-solar" />
              <div className="space-y-1.5">
                <span className="text-xs font-mono font-bold text-ambar-400">2018 — 2022</span>
                <h4 className="font-serif text-base font-bold text-areia-100">
                  Ideia Cooperativa & Intenção Agroflorestal
                </h4>
                <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
                  Surgem a ideia da Cooperativa Nativaram e a intenção de uma ecovila e de um manejo regenerativo em Cruzeiro do Sul (Acre). O projeto segue em constituição, ainda sem registro e sem CNPJ.
                </p>
              </div>
            </div>

            {/* Item 4 */}
            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 h-4 w-4 rounded-full bg-ambar-500 border-4 border-floresta-950 shadow-solar" />
              <div className="space-y-1.5">
                <span className="text-xs font-mono font-bold text-ambar-400">2025</span>
                <h4 className="font-serif text-base font-bold text-areia-100">
                  Manual de Compliance
                </h4>
                <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
                  Redação do Manual de Compliance, com regras contra o comércio online irregular e protocolos de triagem e segurança para as cerimônias.
                </p>
              </div>
            </div>

            {/* Item 5 */}
            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 h-4 w-4 rounded-full bg-amber-400 border-4 border-floresta-950 shadow-solar animate-pulse" />
              <div className="space-y-1.5">
                <span className="text-xs font-mono font-bold text-ambar-300">2026</span>
                <h4 className="font-serif text-base font-bold text-areia-100">
                  Portal Institucional & Acervo Aberto
                </h4>
                <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
                  Lançamento do portal institucional, com acervo documental aberto (guias, alertas de segurança e comentários regulatórios).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="solar" />

      {/* ═══════════════════════════════════════════
          CAPÍTULO IX: PERGUNTAS FREQUENTES INSTITUCIONAIS
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg lg:py-section-xl bg-floresta-950">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
          <AnimateOnScroll className="text-center space-y-3">
            <span className="text-[11px] font-bold text-ambar-400 uppercase tracking-[0.25em] font-mono">
              Capítulo IX • Dúvidas Institucionais
            </span>
            <h2 className="font-serif text-display-sm sm:text-display-md font-bold text-areia-100">
              Perguntas Frequentes
              <br />
              <span className="text-gradient-solar">Sobre a Nativaram</span>
            </h2>
            <p className="text-sm text-areia-400 font-light">
              Respostas claras sobre a doutrina, a identidade e os limites do projeto.
            </p>
          </AnimateOnScroll>

          <FaqAccordion items={faqsInstitucionais} />
        </div>
      </section>

      <SectionDivider variant="floresta" />

      {/* ═══════════════════════════════════════════
          CAPÍTULO X: CTA FINAL & ENTIDADES RELIGIOSAS
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg lg:py-section-xl bg-floresta-900/80 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-ambar-500/[0.08] rounded-full blur-[130px] pointer-events-none" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <AnimateOnScroll>
            <div className="space-y-4">
              <span className="text-[11px] font-bold text-ambar-400 uppercase tracking-[0.25em] font-mono">
                Entidades Religiosas
              </span>
              <h2 className="font-serif text-display-sm sm:text-display-md lg:text-display-lg font-bold text-areia-100">
                Diálogo com
                <br />
                <span className="text-gradient-solar">Entidades Religiosas</span>
              </h2>
              <p className="text-sm sm:text-base text-areia-300 font-light max-w-2xl mx-auto leading-relaxed">
                Entidades religiosas constituídas podem falar com a coordenação do projeto pelo e-mail ou WhatsApp institucional. Não coletamos dados pelo site.
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={200}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/entidades-religiosas" className="btn-primary w-full sm:w-auto">
                <Sparkles className="h-4 w-4" />
                <span>Orientações para Entidades Religiosas</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/estudos" className="btn-secondary w-full sm:w-auto">
                <FileText className="h-4 w-4 text-ambar-400" />
                <span>Consultar Acervo Científico & PDFs</span>
              </Link>
            </div>
          </AnimateOnScroll>

          {/* Aviso Mandatório de Segurança Integrativa (+18) */}
          <div className="pt-8 border-t border-ambar-500/15 max-w-3xl mx-auto text-[11px] text-areia-400/70 leading-relaxed font-light">
            <strong className="text-areia-300 font-medium">Aviso de Segurança Integrativa (+18):</strong> O conteúdo desta página é institucional e cultural, destinado a maiores de 18 anos. O uso religioso da ayahuasca é tratado pela Resolução CONAD nº 1/2010. A Cooperativa Nativaram não realiza consultas médicas nem diagnósticos, não faz promessas clínicas e não vende, não recebe pedidos e não faz envios.
          </div>
        </div>
      </section>
    </div>
  );
}

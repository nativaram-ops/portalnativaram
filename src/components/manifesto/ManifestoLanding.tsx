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

const faqsInstitucionais: FaqItem[] = [
  {
    pergunta: "O que é a Cooperativa Nativaram?",
    resposta:
      "A Cooperativa Nativaram é uma associação e cooperativa etnobotânica sem fins lucrativos dedicada à salvaguarda, ao estudo fitoquímico e à partilha ética de sacramentos tradicionais amazônicos (Ayahuasca, Rapés Sagrados e Sananga). Nascida sob o significado espiritual de 'Nascidos do Raio de Sol', atua como uma ponte legítima entre os povos originários da floresta e as instituições litúrgicas do Brasil e do mundo.",
  },
  {
    pergunta: "Por que a Nativaram não funciona como um e-commerce convencional?",
    resposta:
      "A espiritualidade e os sacramentos da floresta não são mercadorias descartáveis. Em estrito cumprimento à Resolução CONAD nº 01/2010 e à Deontologia das práticas tradicionais, é terminantemente proibida a comercialização com fins lucrativos da Ayahuasca. Por isso, nosso portal não possui carrinho de compras ou precificação comercial; operamos através de rateio solidário de custos operacionais (frete, lenha, embalagens, manejo sustentável) exclusivo para templos e dirigentes credenciados.",
  },
  {
    pergunta: "Quem conduz o feitio dos sacramentos da cooperativa?",
    resposta:
      "Nossos preparados são liderados por um experiente mestre feitor caboclo com mais de 28 anos de dietas de isolamento e vivência prática na floresta de Cruzeiro do Sul (Acre), aliado a uma aliança de centros tradicionais credenciados de produção no estado. Nossa relação com os povos originários (Yawanawá, Huni Kuin, Katukina, Noke Koĩ, Shawãdawa e Apurinã) é estritamente no campo da salvaguarda intelectual e procedimental de seus saberes tradicionais, sem qualquer vínculo produtivo ou comercial direto com as aldeias indígenas.",
  },
  {
    pergunta: "O que é a 'Alquimia entre Dois Mundos' (Etnociência)?",
    resposta:
      "É a sinergia horizontal entre a sabedoria imemorial dos pajés e anciãos e as investigações científicas de ponta. Não subordinamos o sagrado à academia ocidental nem diluímos as tradições em modismos. Cruzamos relatos orais com a literatura científica publicada (como o Journal of Ethnopharmacology) e mantemos diálogo com pesquisadores de universidades públicas.",
  },
  {
    pergunta: "Como funcionam os 'Projetos de Luz'?",
    resposta:
      "As sobras do rateio, destinadas por deliberação de assembleia ao Fundo Social (FATES), nos termos da Lei 5.764/71, são revertidas em praxeologia social gratuita: custeio da Ecovila e Agrofloresta comunitária em Cruzeiro do Sul (Acre), proteção ativa aos ninhos da Ararajuba, apoio às comunidades da floresta e partilha solidária de sacramentos com templos credenciados de pequeno porte, sempre para uso exclusivo em seus ritos religiosos.",
  },
  {
    pergunta: "Como um templo religioso pode solicitar credenciamento litúrgico?",
    resposta:
      "Dirigentes e sacerdotes responsáveis por centros devidamente constituídos devem acessar a aba de Credenciamento no portal, preencher o formulário institucional com os dados da instituição e firmar o Termo de Compromisso Deontológico do CONAD. O Conselho de Ética analisa cada pedido individualmente antes de autorizar a partilha.",
  },
];

export function ManifestoLanding() {
  return (
    <div className="space-y-0">
      {/* ═══════════════════════════════════════════
          HERO — DISPLAY IMERSIVO COM IMAGEM GERADA
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-24 sm:py-32">
        {/* Background Image com Overlay Nobre */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/manifesto/nascidos-raio-de-sol.jpg"
            alt="Nascidos do Raio de Sol — O Altar Sagrado na Floresta Amazônica ao Amanhecer"
            fill
            priority
            className="object-cover object-center brightness-60 scale-105 transition-transform duration-1000"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-floresta-950 via-floresta-950/70 to-floresta-950/40" />
          <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        </div>

        {/* Efeito Glow Dourado */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-ambar-500/[0.12] rounded-full blur-[120px] pointer-events-none z-0" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <AnimateOnScroll>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-ambar-500/30 bg-floresta-950/85 backdrop-blur-md px-5 py-2 text-xs font-semibold tracking-[0.18em] text-ambar-400 uppercase shadow-solar">
              <Sun className="h-3.5 w-3.5 text-ambar-400 animate-pulse" />
              <span>Cooperativa Etnobotânica • O Manifesto • Quem Somos</span>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={150}>
            <h1 className="font-serif text-display-md sm:text-display-lg lg:text-display-2xl font-bold text-areia-100 text-glow leading-tight">
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
                <span>Sede de Partilha: Serra, Espírito Santo</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-xl border border-ambar-500/20 bg-floresta-900/80 px-3.5 py-2 text-xs text-areia-200 backdrop-blur-sm">
                <Scale className="h-3.5 w-3.5 text-ambar-400" />
                <span>Resolução CONAD 01/2010 • Art. 5º CF/88</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-xl border border-ambar-500/20 bg-floresta-900/80 px-3.5 py-2 text-xs text-areia-200 backdrop-blur-sm">
                <ShieldCheck className="h-3.5 w-3.5 text-ambar-400" />
                <span>Cooperativa • Sem Fins Lucrativos</span>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={600}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a href="#historia" className="btn-primary">
                <Sparkles className="h-4 w-4" />
                <span>Conhecer Nossa História & Valores</span>
              </a>
              <Link href="/credenciamento" className="btn-secondary">
                <Scale className="h-4 w-4" />
                <span>Credenciamento de Templos</span>
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
                    A instituição, impulsionada por uma aliança de guardiões, curadores etnobotânicos e mestres tradicionais da floresta, transcende categoricamente o conceito de um comércio eletrônico ou negócio convencional. Estruturada como uma cooperativa dedicada ao estudo profundo, à salvaguarda e à partilha ética de sacramentos botânicos amazônicos, a Nativaram atua para resgatar a sacralidade no cotidiano, proporcionando elevação espiritual, serenidade mental e harmonização interior.
                  </p>
                  <p>
                    Nosso modelo é de <strong className="text-areia-200">economia solidária e desmercantilizada</strong>. Rejeitamos com veemência o turismo psicodélico, a apropriação predatória e a banalização dos ritos da floresta. Para a Nativaram, o comércio não é a finalidade: o rateio de custos operacionais é apenas o veículo logístico indispensável para assegurar a remuneração digna das famílias extrativistas locais e a manutenção litúrgica dos templos parceiros, operando <strong className="text-areia-100">estritamente sem fins lucrativos</strong>.
                  </p>
                </div>

                {/* Destaque do Mestre Feitor Caboclo & Rede de Centros Credenciados */}
                <div className="card-liturgico rounded-2xl p-6 space-y-4 border-l-4 border-l-ambar-500">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-ambar-400 uppercase tracking-wider">
                    <TreePine className="h-4 w-4" />
                    <span>O Mestre Feitor & A Aliança de Centros Credenciados</span>
                  </div>
                  <p className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
                    Nossos sacramentos não provêm de processos anônimos ou industriais. Mantemos nosso foco e reverência central na sabedoria do nosso <strong className="text-areia-100 font-medium">mestre feitor caboclo</strong>, com mais de <strong className="text-areia-100 font-medium">28 anos de estudos profundos e dietas rigorosas de isolamento na selva</strong> de Cruzeiro do Sul/AC.
                  </p>
                  <div className="pt-2.5 border-t border-ambar-500/15 space-y-1.5">
                    <h4 className="font-serif text-xs font-semibold text-ambar-300 flex items-center gap-1.5">
                      <span>✦</span> Centros Parceiros & Padronização Litúrgica
                    </h4>
                    <p className="text-xs text-areia-300/90 leading-relaxed font-light">
                      Trabalhamos em aliança cooperativa com <strong>diversos centros tradicionais credenciados de produção no Acre</strong>. Cada um desses centros mantém suas atividades e seu feitio regular independente para abastecer seus próprios templos associados e estudos locais. Todavia, ao integrarem a Nativaram, esses centros recebem nossa curadoria, suporte e respaldo institucional, e elaboram os sacramentos da cooperativa <strong>seguindo estritamente o estudo metodológico e fitoquímico da Nativaram</strong> — mesmo que paralelamente desenvolvam preparados de estudos próprios. Assim, preservamos a autonomia de cada feitor e garantimos a máxima uniformidade e pureza aos templos de todo o Brasil.
                    </p>
                  </div>
                  <div className="pt-2.5 border-t border-ambar-500/15 space-y-1.5">
                    <h4 className="font-serif text-xs font-semibold text-ambar-300 flex items-center gap-1.5">
                      <span>✦</span> Povos Originários: Salvaguarda Intelectual e Procedimental
                    </h4>
                    <p className="text-xs text-areia-300/90 leading-relaxed font-light">
                      Nossa conexão e reverência aos povos originários (<strong className="text-ambar-300 font-medium">Yawanawá, Huni Kuin, Katukina, Noke Koĩ, Shawãdawa e Apurinã</strong>) dá-se <strong>estritamente dentro da salvaguarda intelectual e procedimental</strong>, em respeito à memória etnobotânica e à sabedoria imaterial da floresta. <strong>Não possuímos ligação direta com comunidades ou aldeias indígenas para a produção dos sacramentos</strong>: toda a feitura material é conduzida de forma autônoma pelo nosso mestre feitor caboclo e pela rede de centros credenciados cooperados no Acre.
                    </p>
                  </div>
                </div>
              </div>

              {/* Coluna Visual */}
              <div className="lg:col-span-5 space-y-4">
                <div className="image-reveal rounded-3xl overflow-hidden border border-ambar-500/20 shadow-elevated-lg relative">
                  <div className="relative h-[420px] sm:h-[500px] w-full">
                    <Image
                      src="/assets/manifesto/floresta-amazonica-acre.jpg"
                      alt="Floresta Amazônica — Parque Nacional da Serra do Divisor, Cruzeiro do Sul, Acre"
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-floresta-950/80 via-transparent to-transparent" />
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-6 space-y-1 bg-gradient-to-t from-floresta-950 via-floresta-950/90 to-transparent">
                    <span className="text-[10px] font-mono text-ambar-400 uppercase tracking-widest">
                      Floresta Amazônica • Acre
                    </span>
                    <p className="text-xs text-areia-200 font-serif italic">
                      Santuário ancestral e berço das tradições sagradas no Vale do Juruá.
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
                        Comércio Ético & Fair Share
                      </h4>
                    </div>
                    <p className="text-xs text-areia-300 leading-relaxed font-light">
                      Fomentamos uma cadeia de rateio justa e solidária que valoriza e remunera dignamente os guardiões da floresta e os artesãos tradicionais (Txais), atuando com transparência e sem lucro especulativo.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-ambar-400/70 uppercase tracking-widest pt-2 border-t border-ambar-500/10">
                    Economia Desmercantilizada
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
                      Protegemos e respeitamos a floresta amazônica como a fonte primordial de toda vida e sabedoria. Toda a colheita botânica é 100% renovável e manual, preservando a mata nativa em pé, combatendo o desmatamento e salvaguardando ativamente os ninhos e habitats da fauna brasileira, em especial a <em className="text-areia-100">Ararajuba (Guaruba guarouba)</em>.
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
                    Literatura sobre triagem e protocolos de segurança aplicados pelas casas credenciadas.
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
              O Que a Nossa Partilha É
              <br />
              <span className="text-gradient-solar">E O Que Ela Não É</span>
            </h2>
            <p className="text-sm text-areia-400 font-light">
              Diferenciamos com rigor absoluto a sacralidade litúrgica de qualquer exploração comercial descartável.
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
                    <span>Sacramento sagrado de recolhimento, meditação e autocuidado íntimo.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Feitio artesanal purista conduzido na floresta de Cruzeiro do Sul (Acre).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Rigor fitoquímico com estabilidade alcaloídica e ausência de adulterantes.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Apoio logístico exclusivo para templos e dirigentes com credenciamento litúrgico.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Economia solidária e rateio de custos sem margem de lucro mercantil.</span>
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
                    <span>Nunca utilizamos o termo &ldquo;snuff&rdquo; ou jargões recreativos/americanos.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                    <span>Não somos produto farmacêutico alopático nem fazemos promessas clínicas milagrosas.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                    <span>Não vendemos garrafas ou doses em e-commerce aberto ou carrinho virtual de compras.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                    <span>Repudiamos o turismo psicodélico e o consumo fútil em festivais lúdicos.</span>
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
              Conheça as cinco frentes de atuação que compõem a praxeologia sacramental da cooperativa.
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
                    Rapés Sagrados de Alta Precisão
                  </h3>
                  <p className="text-xs text-areia-300 font-light leading-relaxed">
                    Preparos à base de fumo de corda orgânico selvagem (<em>Nicotiana rustica</em>) homogeneizados com cinzas alcalinizantes de árvores nativas (Tsunu, Murici, Cumaru, Mulateiro) segundo o feitio tradicional. Contém nicotina natural do tabaco.
                  </p>
                </div>
                <Link href="/sacramentos" className="inline-flex items-center gap-1.5 text-xs text-ambar-400 hover:text-ambar-300 font-semibold pt-3 border-t border-ambar-500/15">
                  <span>Explorar as 15 Essências</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </AnimateOnScroll>

            {/* 3. Sananga Tradicional */}
            <AnimateOnScroll delay={300}>
              <div className="card-elevated rounded-2xl p-6 space-y-4 h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 text-ambar-400">
                    <Eye className="h-5 w-5" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">Acuidade Espiritual</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-areia-100">
                    Sananga Tradicional da Amazônia
                  </h3>
                  <p className="text-xs text-areia-300 font-light leading-relaxed">
                    Extração aquosa pura das raízes de <em>Tabernaemontana sananho</em> e <em>T. undulata</em> colhidas na floresta virgem. Preparado tradicional aplicado nos olhos dentro do rito, sob orientação do dirigente da casa credenciada.
                  </p>
                </div>
                <Link href="/estudos" className="inline-flex items-center gap-1.5 text-xs text-ambar-400 hover:text-ambar-300 font-semibold pt-3 border-t border-ambar-500/15">
                  <span>Ver Dossiê da Sananga</span>
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
                    Kuripes, Tepís, Maracás e Flautas esculpidos manualmente pelos artesãos e famílias indígenas tradicionais (os Txais). Partilha justa que apoia os territórios e materializa a cosmologia da floresta na liturgia.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-ambar-400/80 pt-3 border-t border-ambar-500/15">
                  Comércio Justo com Aldeias
                </span>
              </div>
            </AnimateOnScroll>

            {/* 5. Arte Sonora 432Hz */}
            <AnimateOnScroll delay={500}>
              <div className="card-elevated rounded-2xl p-6 space-y-4 h-full flex flex-col justify-between sm:col-span-2 lg:col-span-2">
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
                  Munay Sounds • Harmonização Celular
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
                      src="/assets/manifesto/agrofloresta-projetos-de-luz.jpg"
                      alt="Projetos de Luz — Ecovila e Agrofloresta Comunitária da Nativaram no Acre"
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-floresta-950/85 via-transparent to-transparent" />
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-6 space-y-1 bg-gradient-to-t from-floresta-950 via-floresta-950/90 to-transparent">
                    <span className="text-[10px] font-mono text-ambar-400 uppercase tracking-widest">
                      Cruzeiro do Sul • Acre
                    </span>
                    <p className="text-xs text-areia-200 font-serif italic">
                      Comunidade agroflorestal regenerativa, resgate de saberes e amparo social.
                    </p>
                  </div>
                </div>
              </div>

              {/* Conteúdo */}
              <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-ambar-400 uppercase tracking-[0.25em] font-mono">
                    Capítulo VI • Praxeologia Social
                  </span>
                  <h2 className="font-serif text-display-sm sm:text-display-md font-bold text-areia-100">
                    Projetos de Luz &
                    <br />
                    <span className="text-gradient-solar">Regeneração Ecológica</span>
                  </h2>
                </div>

                <div className="space-y-4 text-sm text-areia-300 leading-relaxed font-light">
                  <p>
                    A Cooperativa Nativaram destina as sobras do rateio, por deliberação de assembleia, ao Fundo Social (FATES), nos termos da Lei 5.764/71, e as converte em suporte humano direto através dos <strong className="text-areia-100 font-semibold">&ldquo;Projetos de Luz&rdquo;</strong>. Nossas ações incluem a regeneração da agrofloresta no Acre, o apoio às comunidades da floresta e a partilha solidária de sacramentos com casas pequenas e templos credenciados que não conseguiriam arcar sozinhos com o rateio logístico.
                  </p>
                  <p>
                    Toda partilha segue o mesmo credenciamento exigido dos demais templos: os sacramentos chegam apenas a instituições religiosas homologadas, para uso exclusivo em seus ritos, nunca fora do contexto litúrgico.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="card-elevated rounded-xl p-5 space-y-2 border-t-2 border-t-ambar-500/40">
                    <h4 className="font-serif text-sm font-bold text-areia-100">
                      Ecovila Comunitária no Acre
                    </h4>
                    <p className="text-xs text-areia-400 font-light leading-relaxed">
                      Centro físico em implantação para intercâmbio intercultural, resgate de saberes tradicionais e agricultura regenerativa.
                    </p>
                  </div>

                  <div className="card-elevated rounded-xl p-5 space-y-2 border-t-2 border-t-ambar-500/40">
                    <h4 className="font-serif text-sm font-bold text-areia-100">
                      Preservação da Ararajuba
                    </h4>
                    <p className="text-xs text-areia-400 font-light leading-relaxed">
                      Manejo que mantém as copas e árvores nativas em pé, protegendo ativamente os ninhos e habitats da <em>Guaruba guarouba</em>.
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
              A sustentação jurídica que protege a sacralidade, os dirigentes e os cooperados no âmbito da Constituição Federal e dos órgãos reguladores.
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
                    Inviolabilidade da liberdade de consciência e de crença, assegurando o livre exercício dos cultos religiosos e garantindo a proteção estatal aos locais de celebração e às suas liturgias sacramentais.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-areia-400">Garantia Fundamental Plena</span>
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
                    Código de ética do Conselho Nacional de Políticas sobre Drogas. Veda expressamente a comercialização com fins lucrativos, a propaganda midiática e o turismo espiritual, legitimando o uso exclusivamente litúrgico.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-areia-400">Resolução Histórica de 2010</span>
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
                    A Nativaram não anuncia nem partilha sacramentos pela internet e não oferece microdoses nem derivados comerciais. A partilha ocorre apenas por credenciamento institucional restrito.
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
                Triagem de Segurança nas Casas Credenciadas
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
              Quem usa medicamentos de uso contínuo deve informar o dirigente e passar por triagem antes de qualquer cerimônia; a casa credenciada tem protocolo de segurança próprio.
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
                  Formalização Cooperativa & Projetos Agroflorestais
                </h4>
                <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
                  Institucionalização da Cooperativa Nativaram e início da estruturação da Ecovila e manejo regenerativo em Cruzeiro do Sul (Acre).
                </p>
              </div>
            </div>

            {/* Item 4 */}
            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 h-4 w-4 rounded-full bg-ambar-500 border-4 border-floresta-950 shadow-solar" />
              <div className="space-y-1.5">
                <span className="text-xs font-mono font-bold text-ambar-400">2025</span>
                <h4 className="font-serif text-base font-bold text-areia-100">
                  Homologação do Manual de Compliance
                </h4>
                <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
                  Homologação unificada do Manual de Compliance, blindagem contra o comércio online irregular e formalização dos protocolos de triagem e segurança das casas credenciadas.
                </p>
              </div>
            </div>

            {/* Item 5 */}
            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 h-4 w-4 rounded-full bg-amber-400 border-4 border-floresta-950 shadow-solar animate-pulse" />
              <div className="space-y-1.5">
                <span className="text-xs font-mono font-bold text-ambar-300">2026</span>
                <h4 className="font-serif text-base font-bold text-areia-100">
                  Portal de Credenciamento & Acervo Etnocientífico Aberto
                </h4>
                <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
                  Lançamento do portal institucional integrado com 20 PDFs científicos abertos para estudo, triagem digital segura e suporte contínuo a centenas de templos pelo Brasil.
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
              Respostas claras e transparentes sobre nossa doutrina, governança e partilha.
            </p>
          </AnimateOnScroll>

          <FaqAccordion items={faqsInstitucionais} />
        </div>
      </section>

      <SectionDivider variant="floresta" />

      {/* ═══════════════════════════════════════════
          CAPÍTULO X: CTA FINAL & CREDENCIAMENTO LITÚRGICO
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg lg:py-section-xl bg-floresta-900/80 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-ambar-500/[0.08] rounded-full blur-[130px] pointer-events-none" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <AnimateOnScroll>
            <div className="space-y-4">
              <span className="text-[11px] font-bold text-ambar-400 uppercase tracking-[0.25em] font-mono">
                A Aliança Litúrgica
              </span>
              <h2 className="font-serif text-display-sm sm:text-display-md lg:text-display-lg font-bold text-areia-100">
                Integre Seu Templo à Nossa
                <br />
                <span className="text-gradient-solar">Corrente de Luz</span>
              </h2>
              <p className="text-sm sm:text-base text-areia-300 font-light max-w-2xl mx-auto leading-relaxed">
                Se você é dirigente de uma instituição espiritual constituída e busca sacramentos com pureza fitoquímica comprovada, rastreabilidade e segurança jurídica, solicite o credenciamento de seu templo junto à Cooperativa Nativaram.
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={200}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/credenciamento" className="btn-primary w-full sm:w-auto">
                <Sparkles className="h-4 w-4" />
                <span>Solicitar Credenciamento Litúrgico</span>
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
            <strong className="text-areia-300 font-medium">Aviso de Segurança Integrativa (+18):</strong> Nossos sacramentos e práticas etnobotânicas são de uso estritamente cerimonial, litúrgico e religioso tradicional, nos termos do Art. 5º da CF/88 e da Resolução CONAD nº 01/2010. A Cooperativa Nativaram não realiza consultas médicas, diagnósticos psiquiátricos ou promessas de cura clínica, nem comercializa substâncias em canais abertos da internet. O acesso é exclusivo a maiores de 18 anos devidamente associados e templos credenciados.
          </div>
        </div>
      </section>
    </div>
  );
}

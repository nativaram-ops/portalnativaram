"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sun,
  Sprout,
  HeartHandshake,
  ShieldCheck,
  TreePine,
  ArrowRight,
  Sparkles,
  Bird,
  HandHeart,
  Globe,
  Compass,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  PieChart,
  Leaf,
  Droplets,
  Package,
  Users,
  Camera,
  Film,
} from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionDivider } from "@/components/ui/SectionDivider";

/* ═══════════════════════════════════════════════════════════════════
   DADOS DOS PILARES DE IMPACTO SOCIAL
   ═══════════════════════════════════════════════════════════════════ */

interface PilarLuz {
  icone: React.ElementType;
  titulo: string;
  subtitulo: string;
  descricao: string;
  detalhes: string[];
  metrica: string;
  metricaRotulo: string;
}

const pilaresDeLuz: PilarLuz[] = [
  {
    icone: Sprout,
    titulo: "Agrofloresta & Reflorestamento Sagrado",
    subtitulo: "Regeneração do Vale do Juruá em Cruzeiro do Sul/AC",
    descricao:
      "Parte do rateio operacional é reinvestido no plantio consorciado de mudas de Cipó Mariri (Banisteriopsis caapi) e Folha Rainha (Psychotria viridis) em sistemas agroflorestais regenerativos, garantindo a salvaguarda e a abundância botânica para as próximas gerações sem devastação da mata primária.",
    detalhes: [
      "Cultivo em consórcio com espécies nativas da bacia do Rio Juruá",
      "Manejo sustentável com colheita cíclica e rotação de áreas",
      "Reflorestamento de áreas degradadas com espécies endêmicas",
      "Preservação de sementes de variedades tradicionais acreanas",
    ],
    metrica: "+12.000",
    metricaRotulo: "Mudas Nativas Cultivadas",
  },
  {
    icone: Bird,
    titulo: "Santuário de Fauna & Ninhos de Ararajuba",
    subtitulo: "Proteção de espécies ameaçadas na bacia do Juruá",
    descricao:
      "A Cooperativa mantém áreas de mata sob preservação perpétua no interior do Acre, atuando como refúgio ecológico e monitorando ativamente zonas de nidificação da Ararajuba (Guaruba guarouba) e de polinizadores essenciais para a floração das matas sagradas.",
    detalhes: [
      "Monitoramento ativo de ninhos de Ararajuba (Guaruba guarouba)",
      "Preservação de corredores ecológicos para polinizadores",
      "Proteção de áreas de mata primária com interdição de desmate",
      "Manutenção de nascentes e microbacias do Rio Juruá",
    ],
    metrica: "100%",
    metricaRotulo: "Mata Nativa Protegida",
  },
  {
    icone: HandHeart,
    titulo: "Acolhimento Litúrgico & Fraternidade",
    subtitulo: "Suporte solidário a instituições de acolhimento",
    descricao:
      "Destinação solidária e gratuita de sacramentos botânicos puros a comunidades de acolhimento e templos que desenvolvem trabalho humanitário a pessoas em vulnerabilidade social extrema, superação de dependência e descompassos do cotidiano, com supervisão séria.",
    detalhes: [
      "Sacramentos doados integralmente sem custo à instituição",
      "Acompanhamento por dirigentes com experiência comprovada",
      "Suporte fraterno e orientação litúrgica contínua",
      "Prioridade para casas em regiões de alta vulnerabilidade social",
    ],
    metrica: "Gratuito",
    metricaRotulo: "Fundo Fraterno de Partilha",
  },
  {
    icone: Globe,
    titulo: "Acessibilidade para Pequenas Casas",
    subtitulo: "Equalização logística para congregações interioranas",
    descricao:
      "Pequenos templos e centros familiares em regiões distantes de centros urbanos contam com subsídio mútuo da Cooperativa para o custeio de fretes aéreos Gollog e recipientes estéreis, impedindo que a distância geográfica afaste congregações sérias do sacramento sagrado.",
    detalhes: [
      "Subsídio parcial ou integral do frete aéreo refrigerado",
      "Recipientes PET virgens de padrão alimentício doados",
      "Atendimento prioritário para casas com até 15 participantes",
      "Assessoria de conservação e manuseio na chegada do sacramento",
    ],
    metrica: "Solidário",
    metricaRotulo: "Subsídio de Frete Interestadual",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   GALERIA — FOTOS REAIS DO ACERVO
   ═══════════════════════════════════════════════════════════════════ */

interface FotoGaleria {
  src: string;
  alt: string;
  legenda: string;
  destaque?: boolean;
}

const fotosDoAcervo: FotoGaleria[] = [
  {
    src: "/assets/feitio/curadas/feitio-noturno-caldeiroes.jpg",
    alt: "Vigília noturna com caldeirões fumegantes e lenha de lei no barracão sagrado em Cruzeiro do Sul, Acre",
    legenda: "Vigília noturna — Caldeirões sob luar no barracão do Acre",
    destaque: true,
  },
  {
    src: "/assets/feitio/curadas/feitio-panelas-chacrona-cipo.jpg",
    alt: "Folhas frescas de Chacrona (Psychotria viridis) sobre fibras maceradas de Cipó Mariri (Banisteriopsis caapi) no caldeirão",
    legenda: "Folha Rainha & Cipó Mariri — A alquimia viva",
  },
  {
    src: "/assets/feitio/curadas/feitio-lote-garrafas.jpg",
    alt: "Lote de garrafas PET virgens com sacramentos de Ayahuasca prontas para envio aos templos credenciados",
    legenda: "Lote de sacramentos — Envase com assepsia máxima",
  },
  {
    src: "/assets/feitio/curadas/feitio-caldeirao-fumegante-floresta.jpg",
    alt: "Caldeirões industriais de inox fumegando durante a decocção ao lado de caixas d'água Fortlev na floresta",
    legenda: "Decocção na mata — Caldeirões e caixas de maceração",
  },
  {
    src: "/assets/feitio/curadas/feitio-chacrona-fresca-caldeirao.jpg",
    alt: "Folhas verdes reluzentes de Chacrona depositadas sobre o leito de cipó macerado dentro do caldeirão fumegante",
    legenda: "Chacrona reluzente — Sobre o leito de fibras no calor",
  },
  {
    src: "/assets/feitio/curadas/feitio-cipo-colheita.jpg",
    alt: "Montes de cipó Banisteriopsis caapi empilhados no barracão de madeira da Casa de Feitio em Cruzeiro do Sul",
    legenda: "Colheita do Cipó Tucunacá — Barracão tradicional",
  },
  {
    src: "/assets/feitio/curadas/feitio-garrafa-tronco.jpg",
    alt: "Garrafa individual de sacramento sobre tronco cortado, cercada pela vegetação nativa do Acre",
    legenda: "Sacramento unitário — Sobre o tronco na mata viva",
  },
  {
    src: "/assets/feitio/curadas/feitio-garrafa-floresta.jpg",
    alt: "Garrafa de Ayahuasca selada sobre banco de madeira rústica entre lianas e folhagens",
    legenda: "A garrafa e a floresta — Selo de custódia artesanal",
  },
  {
    src: "/assets/feitio/curadas/feitio-lianas-tucunaca-barracao.jpg",
    alt: "Lianas de Cipó Tucunacá sendo selecionadas antes da maceração no barracão do Acre",
    legenda: "Seleção de lianas — Cipó Tucunacá de primeira",
  },
  {
    src: "/assets/feitio/curadas/feitio-caldeiroes-fileira.jpg",
    alt: "Fileira de caldeirões de inox durante a primeira cocção do dia com folha e cipó",
    legenda: "Fileira de caldeirões — Primeira cocção do amanhecer",
  },
  {
    src: "/assets/feitio/curadas/feitio-quatro-frascos-tronco.jpg",
    alt: "Quatro frascos de sacramento sobre tronco natural, ilustrando as graduações do feitio",
    legenda: "Quatro graduações — Da Lua Branca ao Wirapuru 10.1",
  },
  {
    src: "/assets/feitio/curadas/feitio-densidade-balanca.jpg",
    alt: "Aferição de densidade e °Brix na balança durante o controle de qualidade do feitio",
    legenda: "Controle de qualidade — Aferição de densidade e °Brix",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   VÍDEOS DO ACERVO
   ═══════════════════════════════════════════════════════════════════ */

interface VideoAcervo {
  src: string;
  poster: string;
  titulo: string;
  descricao: string;
}

const videosDoAcervo: VideoAcervo[] = [
  {
    src: "/assets/feitio/curadas/feitio-video-caldeirao-borbulhando.mp4",
    poster: "/assets/feitio/curadas/feitio-poster-caldeirao-borbulhando.jpg",
    titulo: "Caldeirão Borbulhando",
    descricao:
      "O sacramento ferve sobre o leito de chacrona e cipó — a alquimia em movimento.",
  },
  {
    src: "/assets/feitio/curadas/feitio-video-caldeiroes-inox.mp4",
    poster: "/assets/feitio/curadas/feitio-poster-caldeiroes-inox.jpg",
    titulo: "Bateria de Caldeirões",
    descricao:
      "A fileira de caldeirões de inox durante a vigília sagrada na Casa de Feitio.",
  },
  {
    src: "/assets/feitio/curadas/feitio-video-garrafa-sacramento.mp4",
    poster: "/assets/feitio/curadas/feitio-poster-garrafa-sacramento.jpg",
    titulo: "Sacramento Envasado",
    descricao:
      "A garrafa de sacramento pronta para a custódia e o despacho ao templo.",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   MATRIZ DE RATEIO 40/40/10/10
   ═══════════════════════════════════════════════════════════════════ */

interface FatiaRateio {
  icone: React.ElementType;
  porcentagem: number;
  titulo: string;
  descricao: string;
  cor: string;
}

const matrizRateio: FatiaRateio[] = [
  {
    icone: Leaf,
    porcentagem: 40,
    titulo: "Insumos, Alimentação & Lenha Autorizada",
    descricao:
      "Aquisição de cipó, chacrona, alimentação dos feitores durante a vigília e lenha de manejo sustentável autorizada.",
    cor: "text-emerald-400",
  },
  {
    icone: Users,
    porcentagem: 40,
    titulo: "Remuneração Justa das Famílias do Acre",
    descricao:
      "Pagamento digno e justo às famílias ribeirinhas parceiras que trabalham na colheita, maceração e vigília do feitio em Cruzeiro do Sul.",
    cor: "text-ambar-400",
  },
  {
    icone: Package,
    porcentagem: 10,
    titulo: "Logística & Embalagens Virgens",
    descricao:
      "Garrafas PET 100% virgens de padrão alimentício, lacres invioláveis, embalagem térmica e frete aéreo refrigerado Gollog Express.",
    cor: "text-sky-400",
  },
  {
    icone: Droplets,
    porcentagem: 10,
    titulo: "Fundo Social & Ecovila Agroflorestal",
    descricao:
      "Reserva cooperativa para reflorestamento, manutenção do santuário de fauna e consolidação do projeto de Ecovila agroflorestal no Acre.",
    cor: "text-rose-400",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   COMPONENTE LIGHTBOX PARA GALERIA
   ═══════════════════════════════════════════════════════════════════ */

function Lightbox({
  fotos,
  indiceInicial,
  onClose,
}: {
  fotos: FotoGaleria[];
  indiceInicial: number;
  onClose: () => void;
}) {
  const [indice, setIndice] = useState(indiceInicial);
  const foto = fotos[indice];

  const anterior = useCallback(() => {
    setIndice((i) => (i === 0 ? fotos.length - 1 : i - 1));
  }, [fotos.length]);

  const proximo = useCallback(() => {
    setIndice((i) => (i === fotos.length - 1 ? 0 : i + 1));
  }, [fotos.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") anterior();
      if (e.key === "ArrowRight") proximo();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, anterior, proximo]);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center"
      onClick={onClose}
    >
      {/* Controles */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        aria-label="Fechar galeria"
      >
        <X className="w-5 h-5" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          anterior();
        }}
        className="absolute left-2 sm:left-6 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        aria-label="Foto anterior"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          proximo();
        }}
        className="absolute right-2 sm:right-6 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        aria-label="Próxima foto"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Imagem */}
      <div
        className="relative w-full max-w-5xl max-h-[85vh] mx-4 sm:mx-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-[60vh] sm:h-[75vh]">
          <Image
            src={foto.src}
            alt={foto.alt}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>
        <div className="text-center mt-4 space-y-1">
          <p className="text-sm sm:text-base text-areia-200 font-light">
            {foto.legenda}
          </p>
          <p className="text-xs text-areia-400 font-mono">
            {indice + 1} / {fotos.length}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   COMPONENTE DE VÍDEO INDIVIDUAL
   ═══════════════════════════════════════════════════════════════════ */

function VideoCard({ video }: { video: VideoAcervo }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="card-elevated rounded-2xl overflow-hidden border-floresta-800/80 hover:border-ambar-500/40 transition-all duration-300 bg-floresta-900/40">
      <div className="relative aspect-video cursor-pointer group" onClick={togglePlay}>
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          muted
          playsInline
          loop
          preload="metadata"
          className="w-full h-full object-cover"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-colors">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-ambar-500/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 sm:w-7 sm:h-7 text-floresta-950 ml-1" />
            </div>
          </div>
        )}
      </div>
      <div className="p-4 sm:p-5 space-y-1.5">
        <h4 className="font-serif text-base font-bold text-areia-100">
          {video.titulo}
        </h4>
        <p className="text-xs sm:text-sm text-areia-300/90 font-light leading-relaxed">
          {video.descricao}
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL — PROJETOS DE LUZ LANDING
   ═══════════════════════════════════════════════════════════════════ */

export function ProjetoDeLuzLanding() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [pilarAberto, setPilarAberto] = useState<number | null>(null);

  return (
    <div className="space-y-0">
      {lightboxIndex !== null && (
        <Lightbox
          fotos={fotosDoAcervo}
          indiceInicial={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      {/* ═══════════════════════════════════════════
          HERO — A DIMENSÃO SOCIAL E ECOLÓGICA DA COOPERATIVA
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/feitio/curadas/feitio-noturno-caldeiroes.jpg"
            alt="Caldeirões fumegantes durante a vigília noturna sagrada na Casa de Feitio em Cruzeiro do Sul, Acre — a base do trabalho social da Cooperativa Nativaram"
            fill
            priority
            className="object-cover object-center brightness-[0.35] contrast-[1.08] scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-floresta-950 via-floresta-950/70 to-floresta-950/40" />
          <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        </div>

        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-ambar-500/[0.10] rounded-full blur-[130px] pointer-events-none z-0" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <AnimateOnScroll>
            <div className="inline-flex items-center gap-2 rounded-full border border-ambar-500/30 bg-floresta-950/85 backdrop-blur-md px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-ambar-400 uppercase shadow-solar">
              <Sun className="h-3.5 w-3.5 text-ambar-400 animate-pulse-subtle" />
              <span>Praxeologia Social • Salvaguarda da Floresta</span>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={150}>
            <h1 className="font-serif text-display-md sm:text-display-lg lg:text-display-xl font-bold text-areia-100 text-glow leading-[1.1]">
              Projetos de Luz: A Fraternidade que{" "}
              <span className="text-gradient-solar">Regenera a Vida</span>
            </h1>
          </AnimateOnScroll>

          <AnimateOnScroll delay={300}>
            <p className="text-sm sm:text-base lg:text-lg text-areia-200 leading-relaxed font-light max-w-2xl mx-auto">
              Sob a Lei nº 5.764/1971, a Cooperativa Nativaram não visa lucros.
              Cada contribuição de rateio operacional gera um excedente social
              destinado à regeneração da mata, ao refúgio da fauna acreana, à
              remuneração digna das famílias ribeirinhas e ao apoio solidário a
              casas que acolhem os que mais necessitam.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll delay={450}>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/credenciamento"
                className="btn-primary-sm inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold"
              >
                <Sparkles className="h-4 w-4" />
                <span>Credenciar Meu Templo na Rede</span>
              </Link>
              <a
                href="#galeria"
                className="btn-secondary text-xs inline-flex items-center gap-2 px-4 py-2.5"
              >
                <Camera className="h-4 w-4" />
                <span>Ver Acervo da Floresta</span>
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider variant="solar" />

      {/* ═══════════════════════════════════════════
          MANIFESTO — O QUE MOVE OS PROJETOS DE LUZ
          ═══════════════════════════════════════════ */}
      <section className="py-section-md lg:py-section-lg">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Texto Editorial */}
              <div className="space-y-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-ambar-400">
                  A Razão de Existir da Cooperativa
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-areia-100 leading-tight">
                  Não é sobre nós.{" "}
                  <span className="text-ambar-300">
                    É sobre a floresta, as famílias e os templos.
                  </span>
                </h2>
                <div className="space-y-4 text-xs sm:text-sm text-areia-300/90 font-light leading-relaxed">
                  <p>
                    A Cooperativa Nativaram nasceu da necessidade real de
                    garantir que o sacramento da Ayahuasca purista — feito
                    exclusivamente com Cipó Tucunacá (<em>Banisteriopsis caapi</em>) e
                    Folha Rainha (<em>Psychotria viridis</em>) — chegue aos
                    templos de todo o Brasil com procedência, pureza e preço
                    justo, sem intermediários e sem lucro privado.
                  </p>
                  <p>
                    Todo o rateio cooperativo é transparente. Não existe margem
                    de lucro. Existe rateio solidário: cada cooperado paga
                    exatamente o custo de produção e logística, repartido entre
                    todos. O que sobra não é &ldquo;lucro&rdquo; — é reinvestido
                    integralmente nas 4 frentes sociais que apresentamos abaixo.
                  </p>
                  <p>
                    As famílias ribeirinhas de Cruzeiro do Sul recebem
                    remuneração justa pelo trabalho árduo de colheita, maceração
                    e vigília durante dias e noites de feitio. A floresta é
                    replantada a cada ciclo de colheita. E os templos que não
                    podem arcar com o custo logístico recebem apoio fraterno da
                    rede.
                  </p>
                </div>
              </div>

              {/* Imagem Destacada */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-floresta-800/60 aspect-[4/5] sm:aspect-[3/4]">
                <Image
                  src="/assets/feitio/curadas/feitio-garrafa-tronco.jpg"
                  alt="Garrafa de sacramento sobre tronco cortado, cercada pela vegetação nativa do Acre — símbolo da conexão direta entre a floresta e o templo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-floresta-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs text-areia-200/80 font-light italic">
                    Cruzeiro do Sul, Acre — Da floresta ao altar, sem
                    intermediários.
                  </p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider variant="floresta" />

      {/* ═══════════════════════════════════════════
          OS 4 PILARES DE IMPACTO SOCIAL
          ═══════════════════════════════════════════ */}
      <section className="py-section-md lg:py-section-lg bg-floresta-950/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-ambar-400">
              Onde Floresce o Superávit Cooperativo
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-areia-100">
              Transformando Apoio Litúrgico em Consciência Viva
            </h2>
            <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
              Conheça as 4 frentes de regeneração custeadas integralmente
              através da economia fraterna de rateio dos templos parceiros.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pilaresDeLuz.map((pilar, index) => {
              const Icon = pilar.icone;
              const isAberto = pilarAberto === index;
              return (
                <AnimateOnScroll key={pilar.titulo} delay={index * 120}>
                  <div className="card-elevated rounded-2xl p-6 sm:p-8 space-y-5 h-full flex flex-col border-floresta-800/80 hover:border-ambar-500/40 transition-all duration-300 bg-floresta-900/40">
                    <div className="space-y-4 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div className="h-12 w-12 rounded-xl bg-ambar-500/10 border border-ambar-500/30 flex items-center justify-center text-ambar-400 shrink-0">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="text-right">
                          <span className="font-serif text-xl font-bold text-ambar-300 block">
                            {pilar.metrica}
                          </span>
                          <span className="text-[10px] text-areia-400 font-medium">
                            {pilar.metricaRotulo}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="font-serif text-lg font-bold text-areia-100">
                          {pilar.titulo}
                        </h3>
                        <p className="text-xs text-ambar-400/90 font-medium">
                          {pilar.subtitulo}
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-areia-300/90 leading-relaxed font-light">
                        {pilar.descricao}
                      </p>

                      {/* Detalhes expandíveis */}
                      <button
                        onClick={() =>
                          setPilarAberto(isAberto ? null : index)
                        }
                        className="text-xs text-ambar-400 hover:text-ambar-300 font-medium transition-colors inline-flex items-center gap-1"
                      >
                        <span>
                          {isAberto ? "Recolher detalhes" : "Ver detalhes"}
                        </span>
                        <ChevronRight
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            isAberto ? "rotate-90" : ""
                          }`}
                        />
                      </button>
                      {isAberto && (
                        <ul className="space-y-2 pt-1">
                          {pilar.detalhes.map((detalhe) => (
                            <li
                              key={detalhe}
                              className="flex items-start gap-2 text-xs text-areia-300/80 font-light"
                            >
                              <Sparkles className="w-3 h-3 text-ambar-500/60 shrink-0 mt-0.5" />
                              <span>{detalhe}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="pt-4 border-t border-floresta-800/60 flex items-center gap-2 text-[11px] text-emerald-400 font-mono">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>Transparência sob a Lei 5.764/71</span>
                    </div>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      <SectionDivider variant="solar" />

      {/* ═══════════════════════════════════════════
          MATRIZ DE RATEIO 40/40/10/10
          ═══════════════════════════════════════════ */}
      <section className="py-section-md lg:py-section-lg">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-ambar-400">
              Prestação de Contas
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-areia-100">
              Para Onde Vai Cada Centavo do Rateio
            </h2>
            <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
              Matriz oficial de distribuição solidária — 100% transparente, 0% de
              lucro privado.
            </p>
          </div>

          {/* Barra visual de rateio */}
          <AnimateOnScroll>
            <div className="w-full h-4 rounded-full overflow-hidden flex shadow-inner border border-floresta-800/60">
              <div
                className="h-full bg-emerald-500/80"
                style={{ width: "40%" }}
                title="40% — Insumos, Alimentação & Lenha"
              />
              <div
                className="h-full bg-ambar-500/80"
                style={{ width: "40%" }}
                title="40% — Remuneração das Famílias"
              />
              <div
                className="h-full bg-sky-500/80"
                style={{ width: "10%" }}
                title="10% — Logística & Embalagens"
              />
              <div
                className="h-full bg-rose-500/80"
                style={{ width: "10%" }}
                title="10% — Fundo Social & Ecovila"
              />
            </div>
          </AnimateOnScroll>

          {/* Cards do rateio */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {matrizRateio.map((fatia, i) => {
              const FatiaIcon = fatia.icone;
              return (
                <AnimateOnScroll key={fatia.titulo} delay={i * 100}>
                  <div className="card-elevated rounded-xl p-5 space-y-3 h-full border-floresta-800/80 bg-floresta-900/40 text-center">
                    <div className="mx-auto h-10 w-10 rounded-lg bg-floresta-800/60 flex items-center justify-center">
                      <FatiaIcon className={`h-5 w-5 ${fatia.cor}`} />
                    </div>
                    <div className={`font-serif text-2xl font-bold ${fatia.cor}`}>
                      {fatia.porcentagem}%
                    </div>
                    <h4 className="text-xs font-bold text-areia-100 leading-snug">
                      {fatia.titulo}
                    </h4>
                    <p className="text-[11px] text-areia-400 font-light leading-relaxed">
                      {fatia.descricao}
                    </p>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>

          <AnimateOnScroll>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-floresta-900/60 border border-emerald-500/30 text-[11px] text-emerald-400 font-mono">
                <PieChart className="w-3.5 h-3.5" />
                <span>
                  Cooperativismo sem fins lucrativos — Lei Federal nº
                  5.764/1971
                </span>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider variant="floresta" />

      {/* ═══════════════════════════════════════════
          GALERIA DE FOTOS DO ACERVO
          ═══════════════════════════════════════════ */}
      <section id="galeria" className="py-section-md lg:py-section-lg bg-floresta-950/60 scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 text-ambar-400">
              <Camera className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Acervo Fotográfico
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-areia-100">
              Registros Autênticos da Floresta & do Feitio
            </h2>
            <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
              Fotografias reais documentando a colheita, o feitio, a vigília e
              o envase dos sacramentos em Cruzeiro do Sul, Acre. Nenhuma imagem
              de IA — apenas a verdade nua da floresta.
            </p>
          </div>

          {/* Grid de fotos com layout editorial */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {fotosDoAcervo.map((foto, i) => (
              <AnimateOnScroll key={foto.src} delay={i * 60}>
                <button
                  onClick={() => setLightboxIndex(i)}
                  className={`group relative overflow-hidden rounded-xl border border-floresta-800/60 hover:border-ambar-500/40 transition-all duration-300 cursor-pointer ${
                    foto.destaque
                      ? "col-span-2 row-span-2 aspect-square"
                      : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={foto.src}
                    alt={foto.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes={
                      foto.destaque
                        ? "(max-width: 768px) 100vw, 50vw"
                        : "(max-width: 768px) 50vw, 25vw"
                    }
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-[10px] sm:text-xs text-areia-200 font-light line-clamp-2">
                      {foto.legenda}
                    </p>
                  </div>
                </button>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="solar" />

      {/* ═══════════════════════════════════════════
          VÍDEOS DO ACERVO
          ═══════════════════════════════════════════ */}
      <section className="py-section-md lg:py-section-lg">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 text-ambar-400">
              <Film className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Registros em Movimento
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-areia-100">
              A Alquimia em Vídeo — Direto do Caldeirão
            </h2>
            <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
              Registros autênticos da vigília sagrada, da fervura nos caldeirões
              e do envase dos sacramentos na Casa de Feitio em Cruzeiro do Sul.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {videosDoAcervo.map((video, i) => (
              <AnimateOnScroll key={video.src} delay={i * 120}>
                <VideoCard video={video} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="floresta" />

      {/* ═══════════════════════════════════════════
          NOTA DE TRANSPARÊNCIA SOBRE ENVASE
          ═══════════════════════════════════════════ */}
      <section className="py-section-sm bg-floresta-950/60">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="rounded-2xl border border-floresta-800/60 bg-floresta-900/30 p-6 sm:p-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-ambar-500/10 border border-ambar-500/30 flex items-center justify-center text-ambar-400 shrink-0 mt-0.5">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="space-y-3">
                  <h3 className="font-serif text-lg font-bold text-areia-100">
                    Nota de Transparência sobre o Envase
                  </h3>
                  <div className="space-y-2 text-xs sm:text-sm text-areia-300/90 font-light leading-relaxed">
                    <p>
                      O sacramento da Ayahuasca é envasado com máxima higiene e
                      assepsia exclusivamente em{" "}
                      <strong className="text-areia-100 font-medium">
                        garrafas PET 100% virgens e novas, de padrão alimentício,
                        com lacres invioláveis
                      </strong>
                      .
                    </p>
                    <p>
                      Garrafas de vidro são inviabilizadas pela realidade da
                      floresta amazônica: alto custo de aquisição no interior do
                      Acre, risco de quebra durante o transporte aéreo Gollog e
                      impossibilidade total de logística reversa para devolução
                      das garrafas de volta ao coração da Amazônia.
                    </p>
                    <p>
                      A escolha por PET alimentício virgem é uma decisão de{" "}
                      <strong className="text-areia-100 font-medium">
                        segurança sanitária, acessibilidade financeira e honestidade
                      </strong>{" "}
                      com a realidade operacional — não uma opção de conveniência.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider variant="solar" />

      {/* ═══════════════════════════════════════════
          CHAMADA DE CONVERSÃO & FECHAMENTO
          ═══════════════════════════════════════════ */}
      <section className="py-section-md">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-ambar-500/30 bg-gradient-to-br from-floresta-900 via-floresta-950 to-floresta-900 p-8 sm:p-10 text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-ambar-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-10 -top-10 w-36 h-36 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ambar-500/10 border border-ambar-500/30 text-ambar-300 text-xs font-semibold uppercase tracking-wider">
              <TreePine className="w-3.5 h-3.5 text-ambar-400" />
              Aliança de Fé, Etnociência e Natureza
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-areia-100 max-w-xl mx-auto">
              Seu Templo Fortalece Esta Corrente de Proteção
            </h2>

            <p className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light max-w-lg mx-auto">
              Ao aderir ao credenciamento litúrgico da Cooperativa Nativaram, a
              sua congregação recebe amparo total, pureza garantida e passa a
              ser copartícipe direta da preservação dos povos da floresta e da
              ecologia sagrada do Acre.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/credenciamento"
                className="btn-primary-sm w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold shadow-lg"
              >
                <span>Solicitar Credenciamento da Instituição</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/medicinas"
                className="btn-secondary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-medium"
              >
                <span>Ver Compêndio de Sacramentos</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

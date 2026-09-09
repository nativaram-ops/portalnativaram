"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Leaf,
  Shield,
  Flame,
  ArrowRight,
  Eye,
  Wind,
  CheckCircle2,
  Compass,
  MessageCircle,
  HeartHandshake,
  ShieldCheck,
  FlaskConical,
  Atom,
  Scale,
  Package,
  Feather,
  Layers,
  ChevronRight,
  Check,
} from "lucide-react";
import { medicinas, forcaLabels, Medicina } from "@/data/medicinas";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const forcaIcons: Record<string, React.ReactNode> = {
  suave: <Leaf className="h-3.5 w-3.5" />,
  intermediaria: <Sparkles className="h-3.5 w-3.5" />,
  forte: <Shield className="h-3.5 w-3.5" />,
  "extra-forte": <Flame className="h-3.5 w-3.5" />,
};

export function MedicinasCatalogClient() {
  const [activeCategory, setActiveCategory] = useState<"todos" | "rapes" | "15g" | "defumacao" | "sananga" | "artefatos" | "kits">("todos");
  const [selectedForca, setSelectedForca] = useState<string>("todas");
  const [activeBottleSize, setActiveBottleSize] = useState<"todos" | "25g" | "15g">("todos");

  const filteredMedicinas = medicinas.filter((med) => {
    if (selectedForca !== "todas" && med.forca !== selectedForca) return false;
    if (activeBottleSize === "15g" && !med.disponivel15g) return false;
    return true;
  });

  const defumacoes = [
    {
      nome: "Olíbano Sagrado do Egito",
      subtitulo: "Resina Milenar de Elevação Espiritual (50g)",
      foto: "/assets/sacramentos/defumacao/olibano-50g.jpg",
      origem: "Norte da África / Egito Tradicional",
      descricao: "Lágrimas douradas de resina pura de Boswellia carterii. Utilizado desde a antiguidade em templos para purificação do ar, elevação da prece e serenidade mental.",
      aroma: "Balsâmico, cítrico suave e amadeirado sagrado",
      tag: "Resina Rara • 50g",
    },
    {
      nome: "Breu Branco • Amescla • Almécega",
      subtitulo: "Trio de Resinas Nativas da Floresta Amazônica (50g)",
      foto: "/assets/sacramentos/defumacao/breu-branco-50g.jpg",
      origem: "Cruzeiro do Sul / Floresta Amazônica (Acre)",
      descricao: "Coleta sustentável da resina silvestre de Protium heptaphyllum. Limpeza profunda de ambientes, desobstrução energética e aroma terroso refrescante característico dos rituais da floresta.",
      aroma: "Resinoso, fresco, herbal e purificador",
      tag: "Soberania Amazônica • 50g",
    },
    {
      nome: "Palo Santo Peruano",
      subtitulo: "Madeira Sagrada de Manejo Ético e Sustentável (50g)",
      foto: "/assets/sacramentos/defumacao/palo-santo-50g.jpg",
      origem: "Florestas Secas do Peru (Bursera graveolens)",
      descricao: "Bastões de madeira naturalmente caída, rica em limoneno aromático. O aroma quente e adocicado cria um escudo de tranquilidade, dissipando o descompasso do cotidiano.",
      aroma: "Adocicado, amadeirado e reconfortante",
      tag: "Madeira Sagrada • 50g",
    },
  ];

  const kuripes = [
    { id: 1, nome: "Kuripe Tradicional em Madeira Nobre", foto: "/assets/nativaram-oficial/kuripes/kuripe-1.png", desc: "Acabamento sedoso e ângulo de sopro anatômico perfeito." },
    { id: 2, nome: "Kuripe com Amuleto de Jagube", foto: "/assets/nativaram-oficial/kuripes/kuripe-2.png", desc: "Aplicação em corte transversal de cipó Mariri sagrado." },
    { id: 3, nome: "Kuripe Guardião da Floresta", foto: "/assets/nativaram-oficial/kuripes/kuripe-3.png", desc: "Esculpido em nó de madeira nobre com rezo de firmeza." },
    { id: 4, nome: "Kuripe Sol Amazônico", foto: "/assets/nativaram-oficial/kuripes/kuripe-4.png", desc: "Geometria de sopro focado e conexão com o terceiro olho." },
    { id: 5, nome: "Kuripe Raiz & Terra", foto: "/assets/nativaram-oficial/kuripes/kuripe-5.png", desc: "Entalhado pelos nossos Txais com polimento em cera natural." },
    { id: 6, nome: "Kuripe Águia Branca", foto: "/assets/nativaram-oficial/kuripes/kuripe-6.png", desc: "Abertura sutil das vias respiratórias e precisão de condução." },
    { id: 7, nome: "Kuripe Jiboia Sagrada", foto: "/assets/nativaram-oficial/kuripes/kuripe-7.png", desc: "Inspirado na força de Yube e na regeneração da mata." },
    { id: 8, nome: "Kuripe Harmonia & Paz", foto: "/assets/nativaram-oficial/kuripes/kuripe-8.png", desc: "Madeira clara tratada com óleos essenciais da floresta." },
    { id: 9, nome: "Kuripe Cerimonial Coletivo", foto: "/assets/nativaram-oficial/kuripes/kuripe-9.png", desc: "Conexão íntima de oração diária e momentos de quietude." },
  ];

  const kits = [
    {
      nome: "Kit Sinergia Sagrada — Trio da Floresta",
      variedades: "7 Ervas • Tsunú • Pixuri (3 Frascos de 25g)",
      foto: "/assets/sacramentos/kits/kit-trio-floresta.jpg",
      descricao: "Combinação harmônica entre o vigor desobstrutivo de 7 Ervas, o aterramento clássico do Tsunú e o acolhimento noturno do Pixuri. Equilíbrio completo de todos os centros vitais.",
      indicacao: "Ancoramento, Limpeza de Vias & Proteção Noturna",
      tipo: "Kit de 3 Sacramentos 25g",
    },
    {
      nome: "Kit Guardiões da Mata — Trio dos Caboclos",
      variedades: "Paricá • Cumarú • Mulateiro (3 Frascos de 25g)",
      foto: "/assets/sacramentos/kits/kit-trio-caboclos.jpg",
      descricao: "A alquimia profunda da casca do Mulateiro com a semente perfumada de Cumaru e o fogo transformador do Paricá. Ideal para cerimônias de renovação e transição de ciclos.",
      indicacao: "Força Telúrica, Renovação & Desapego",
      tipo: "Kit de 3 Sacramentos 25g",
    },
    {
      nome: "Kit Alinhamento Completo — Kuripe & Tepi Cerimonial",
      variedades: "1 Kuripe Anatômico + 1 Tepi Cerimonial Longo",
      foto: "/assets/sacramentos/kits/kit-kuripe-tepi.jpg",
      descricao: "Conjunto mestre de instrumentos sagrados entalhados à mão por artesãos caboclos e indígenas do Acre. Madeira nobre com impermeabilização em resinas e cera de abelha silvestre.",
      indicacao: "Autoaplicação & Condução em Rituais Coletivos",
      tipo: "Artefatos Sagrados",
    },
    {
      nome: "Kit Jornada da Suavidade — Frascos de 15g",
      variedades: "Murici • Rainha • Jurema Preta • Nissural (15g cada)",
      foto: "/assets/nativaram-oficial/institucional/rapes-frascos-15g.png",
      descricao: "Seleção curada nos frascos compactos de 15g. Perfeito para congregações que desejam estudar novas alquimias botânicas ou para praticantes em dietas individuais.",
      indicacao: "Porta de Entrada, Dietas & Estudos Íntimos",
      tipo: "Linha de Entrada 15g",
    },
  ];

  return (
    <div className="space-y-16">
      {/* ═══════════════════════════════════════════
          NAV / FILTER TABS
          ═══════════════════════════════════════════ */}
      <div className="sticky top-20 z-30 bg-floresta-950/90 backdrop-blur-md py-3 border-y border-ambar-500/20 shadow-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono text-ambar-400 font-semibold uppercase tracking-wider hidden sm:inline">
              Navegar:
            </span>
            {[
              { id: "todos", label: "Visão Geral" },
              { id: "rapes", label: "15 Rapés Sagrados" },
              { id: "15g", label: "Linha 15g (Estudo & Dieta)" },
              { id: "defumacao", label: "Defumação & Resinas" },
              { id: "sananga", label: "Sananga Ancestral" },
              { id: "artefatos", label: "Kuripes & Tepis" },
              { id: "kits", label: "Kits de Sinergia" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === tab.id
                    ? "bg-ambar-500 text-floresta-950 shadow-md font-bold"
                    : "text-areia-300 hover:text-ambar-300 hover:bg-floresta-900/60"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs">
            <Link
              href="/credenciamento"
              className="text-[11px] font-bold text-ambar-300 hover:text-ambar-200 uppercase tracking-wider flex items-center gap-1 bg-ambar-500/10 border border-ambar-500/25 px-3 py-1 rounded-full transition-all"
            >
              <span>Credenciamento</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          DESTAQUE: APRESENTAÇÕES 25G E 15G
          ═══════════════════════════════════════════ */}
      {(activeCategory === "todos" || activeCategory === "15g" || activeCategory === "rapes") && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="rounded-3xl border border-ambar-500/30 bg-gradient-to-br from-floresta-900/90 via-floresta-950 to-floresta-900/80 p-6 sm:p-10 space-y-8">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-ambar-500/20 bg-floresta-800/60 px-3.5 py-1 text-[11px] font-semibold text-ambar-300 uppercase tracking-widest">
                  <Package className="h-3.5 w-3.5 text-ambar-400" />
                  <span>Padronização Litúrgica em Dois Formatos</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-areia-100">
                  Frascos de 25g & Frascos de 15g
                </h2>
                <p className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
                  A Cooperativa Nativaram disponibiliza seus sacramentos em duas apresentações canônicas, atendendo com rigor tanto aos ritos comunitários de grandes congregações quanto à intimidade das dietas de autoestudo.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                {/* Card 25g */}
                <div className="card-elevated rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 border border-ambar-500/25 bg-floresta-950/80">
                  <div className="space-y-4">
                    <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-ambar-500/20">
                      <Image
                        src="/assets/nativaram-oficial/institucional/rapes-linha-completa-25g.png"
                        alt="Linha Completa de Rapés Sagrados 25g Cooperativa Nativaram"
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute top-3 left-3 rounded-full bg-floresta-950/90 border border-amber-500/40 px-3 py-1 text-[10px] font-mono text-amber-300 font-bold uppercase">
                        Padrão Cerimonial • 25g
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-serif text-xl font-bold text-areia-100">
                        Frascos de 25g — Congregações & Ritos Litúrgicos
                      </h3>
                      <p className="text-xs text-areia-300 leading-relaxed font-light">
                        Apresentação tradicional de maior rendimento litúrgico. Destinada prioritariamente a templos credenciados, dirigentes espirituais, giras cerimoniais e sessões coletivas contínuas.
                      </p>
                    </div>

                    <ul className="space-y-2 text-xs text-areia-300/90">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
                        <span>Rendimento estendido para círculos de 30 a 50 consagrações cerimoniais</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
                        <span>Frascos âmbar de vedação hermética com lacre de inviolabilidade</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
                        <span>Disponível em todas as 15 variedades da floresta</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-ambar-500/15 flex items-center justify-between">
                    <span className="text-xs font-mono text-amber-400">Padrão Templo</span>
                    <button
                      type="button"
                      onClick={() => setActiveBottleSize(activeBottleSize === "25g" ? "todos" : "25g")}
                      className={`text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg border transition-all ${
                        activeBottleSize === "25g"
                          ? "bg-amber-500 text-floresta-950 border-amber-500"
                          : "border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
                      }`}
                    >
                      {activeBottleSize === "25g" ? "Mostrando 25g" : "Filtrar por 25g"}
                    </button>
                  </div>
                </div>

                {/* Card 15g */}
                <div className="card-elevated rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 border border-emerald-500/30 bg-floresta-950/80">
                  <div className="space-y-4">
                    <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-emerald-500/20">
                      <Image
                        src="/assets/nativaram-oficial/institucional/rapes-frascos-15g.png"
                        alt="Linha de Frascos 15g Cooperativa Nativaram"
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute top-3 left-3 rounded-full bg-floresta-950/90 border border-emerald-500/40 px-3 py-1 text-[10px] font-mono text-emerald-300 font-bold uppercase">
                        Porta de Entrada • 15g
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-serif text-xl font-bold text-areia-100">
                        Frascos de 15g — Dietas, Autoestudo & Primeiro Contato
                      </h3>
                      <p className="text-xs text-areia-300 leading-relaxed font-light">
                        Formato compacto desenvolvido especialmente para associados em dietas individuais, primeiros contatos meditativos ou para congregações que buscam testar a sinergia de novas alquimias botânicas.
                      </p>
                    </div>

                    <ul className="space-y-2 text-xs text-areia-300/90">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                        <span>Porta de entrada perfeita para conhecer a força de novas medicinas</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                        <span>Dimensões reduzidas de fácil transporte para retiros e estudos na mata</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                        <span>Mesma nobreza fitoquímica e moagem ultrafina micronizada</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-emerald-500/15 flex items-center justify-between">
                    <span className="text-xs font-mono text-emerald-400">Padrão Dieta / Indivíduo</span>
                    <button
                      type="button"
                      onClick={() => setActiveBottleSize(activeBottleSize === "15g" ? "todos" : "15g")}
                      className={`text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg border transition-all ${
                        activeBottleSize === "15g"
                          ? "bg-emerald-500 text-floresta-950 border-emerald-500"
                          : "border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10"
                      }`}
                    >
                      {activeBottleSize === "15g" ? "Mostrando 15g" : "Filtrar por 15g"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          CATÁLOGO DOS 15 RAPÉS SAGRADOS
          ═══════════════════════════════════════════ */}
      {(activeCategory === "todos" || activeCategory === "rapes" || activeCategory === "15g") && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8" id="catalogo-rapes">
          <AnimateOnScroll>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-ambar-500/15 pb-4">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-areia-100">
                  Catálogo dos 15 Rapés Sagrados
                </h2>
                <p className="text-xs text-areia-400 mt-1">
                  Fotografias autênticas do lote, composição em português, pH tamponado e intensidades.
                </p>
              </div>

              {/* Filtros de Intensidade */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono text-areia-400">Intensidade:</span>
                <button
                  type="button"
                  onClick={() => setSelectedForca("todas")}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                    selectedForca === "todas"
                      ? "bg-ambar-500 text-floresta-950 font-bold"
                      : "bg-floresta-900 border border-ambar-500/20 text-areia-300"
                  }`}
                >
                  Todas
                </button>
                {Object.entries(forcaLabels).map(([key, { label, color }]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedForca(key)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium border transition-all ${
                      selectedForca === key
                        ? "bg-floresta-800 border-ambar-400 text-areia-100 font-bold shadow"
                        : "bg-floresta-950/70 border-ambar-500/15 text-areia-400 hover:text-areia-200"
                    }`}
                  >
                    <span className={color}>{forcaIcons[key]}</span>
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          {/* Grid dos Rapés com Fotos Reais */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedicinas.map((med, i) => {
              const { label, color } = forcaLabels[med.forca];
              const photoUrl = med.foto || "/assets/sacramentos/25g/tsunu.jpg";

              return (
                <AnimateOnScroll key={med.slug} delay={Math.min(i * 60, 360)}>
                  <div className="group card-elevated rounded-2xl overflow-hidden border border-ambar-500/20 bg-floresta-950 flex flex-col justify-between h-full hover:border-ambar-500/40 hover:shadow-[0_8px_30px_rgba(212,163,89,0.12)] transition-all">
                    <div className="space-y-4">
                      {/* Foto Real do Sacramento */}
                      <div className="relative aspect-square w-full overflow-hidden bg-floresta-900">
                        <Image
                          src={photoUrl}
                          alt={`${med.nome} — Fotografia Real do Sacramento`}
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-floresta-950 via-transparent to-transparent opacity-70" />
                        
                        {/* Badges Flutuantes */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md bg-floresta-950/90 border border-current/30 shadow-sm ${color}`}>
                            {forcaIcons[med.forca]}
                            <span>{label}</span>
                          </span>
                        </div>

                        <div className="absolute top-3 right-3 flex items-center gap-1">
                          <span className="rounded-full bg-floresta-950/90 border border-amber-500/30 px-2 py-0.5 text-[10px] font-mono text-amber-300 font-semibold shadow-sm">
                            25g
                          </span>
                          {med.disponivel15g && (
                            <span className="rounded-full bg-emerald-950/90 border border-emerald-500/40 px-2 py-0.5 text-[10px] font-mono text-emerald-300 font-semibold shadow-sm">
                              15g
                            </span>
                          )}
                        </div>

                        {/* Alcalinidade */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-areia-300/90 bg-floresta-950/80 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-ambar-500/15">
                          <span>Base Livre (pH 9,75-10,2)</span>
                          <span>Calcinação &gt;250°C</span>
                        </div>
                      </div>

                      {/* Conteúdo da Ficha */}
                      <div className="p-5 space-y-3">
                        <div>
                          <h3 className="font-serif text-lg font-bold text-areia-100 group-hover:text-ambar-300 transition-colors">
                            {med.nome}
                          </h3>
                          <p className="text-xs text-ambar-400/80 italic line-clamp-1 mt-0.5">
                            &ldquo;{med.subtitulo}&rdquo;
                          </p>
                        </div>

                        <p className="text-[11px] text-areia-300/80 leading-relaxed line-clamp-2 font-light">
                          <strong className="text-areia-200 font-medium">Composição:</strong> {med.composicaoBotanica}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {med.chakras.map((chakra) => (
                            <span
                              key={chakra}
                              className="rounded-full bg-floresta-900 border border-ambar-500/15 px-2 py-0.5 text-[10px] text-areia-400"
                            >
                              {chakra}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* CTA de Consulta e Ficha */}
                    <div className="p-5 pt-0">
                      <Link
                        href={`/medicinas/${med.slug}`}
                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl border border-ambar-500/25 bg-floresta-900/60 hover:bg-ambar-500 hover:text-floresta-950 text-xs font-bold uppercase tracking-wider text-ambar-300 transition-all group/btn"
                      >
                        <span>Ficha Fitoquímica Completa</span>
                        <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          ARTE DA DEFUMAÇÃO & RESINAS SAGRADAS
          ═══════════════════════════════════════════ */}
      {(activeCategory === "todos" || activeCategory === "defumacao") && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8" id="defumacao-secao">
          <AnimateOnScroll>
            <div className="border-b border-ambar-500/15 pb-4 space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-ambar-400 uppercase tracking-widest">
                <Wind className="h-4 w-4" />
                <span>Arte da Defumação • Essências da Terra</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-areia-100">
                Resinas Sagradas & Palo Santo (50g)
              </h2>
              <p className="text-xs sm:text-sm text-areia-300 max-w-3xl font-light leading-relaxed">
                Resinas nobres de pureza mineral e madeiras ancestrais para harmonizar ambientes cerimoniais, templos e círculos de quietude. Cada essência carrega séculos de tradição e propriedades purificadoras comprovadas pela etnobotânica.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {defumacoes.map((item, idx) => (
              <AnimateOnScroll key={item.nome} delay={idx * 120}>
                <div className="card-elevated rounded-2xl overflow-hidden border border-ambar-500/20 bg-floresta-950 flex flex-col justify-between h-full group hover:border-ambar-500/40 transition-all">
                  <div className="space-y-4">
                    <div className="relative aspect-square w-full overflow-hidden bg-floresta-900">
                      <Image
                        src={item.foto}
                        alt={item.nome}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-floresta-950 via-transparent to-transparent opacity-60" />
                      <span className="absolute top-3 left-3 rounded-full bg-floresta-950/90 border border-ambar-500/30 px-3 py-1 text-[10px] font-mono text-ambar-300 font-bold uppercase">
                        {item.tag}
                      </span>
                    </div>

                    <div className="p-6 space-y-3">
                      <div>
                        <h3 className="font-serif text-lg font-bold text-areia-100 group-hover:text-ambar-300 transition-colors">
                          {item.nome}
                        </h3>
                        <p className="text-xs text-ambar-400/80 italic mt-0.5">
                          {item.subtitulo}
                        </p>
                      </div>

                      <p className="text-xs text-areia-300 leading-relaxed font-light">
                        {item.descricao}
                      </p>

                      <div className="pt-2 space-y-1.5 border-t border-ambar-500/10 text-[11px] text-areia-400">
                        <p>
                          <strong className="text-areia-300">Origem:</strong> {item.origem}
                        </p>
                        <p>
                          <strong className="text-areia-300">Perfil Olfativo:</strong> {item.aroma}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <a
                      href={`https://wa.me/5568999979104?text=${encodeURIComponent(
                        `Olá, gostaria de consultar a disponibilidade litúrgica de ${item.nome} (50g) para nosso templo.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl border border-ambar-500/25 bg-floresta-900/60 hover:bg-emerald-600 hover:text-white text-xs font-bold uppercase tracking-wider text-ambar-300 transition-all"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span>Consultar Disponibilidade</span>
                    </a>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          SANANGA ANCESTRAL
          ═══════════════════════════════════════════ */}
      {(activeCategory === "todos" || activeCategory === "sananga") && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="sananga-secao">
          <AnimateOnScroll>
            <div className="card-elevated rounded-3xl p-6 sm:p-10 border border-ambar-500/25 bg-floresta-950 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-ambar-400">
                    <Eye className="h-4 w-4" />
                    <span>Extrato Botânico Tradicional da Amazônia</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-areia-100">
                    Sananga Ancestral <em>(Tabernaemontana sananho)</em>
                  </h2>
                  <p className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
                    Extrato botânico aquoso milenar obtido das raízes de <em>Tabernaemontana sananho</em>. Consagrado pelas etnias Yawanawá, Katukina e Huni Kuin para despertar a acuidade sensorial, clareza da visão sutil e alinhamento do ritmo mental antes de preces e jornadas noturnas na mata.
                  </p>

                  <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-2">
                    <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-amber-400" />
                      Diretriz Crítica de Conservação Litúrgica:
                    </span>
                    <p className="text-xs text-areia-300 font-light leading-relaxed">
                      Conservação obrigatória em congelador ou sob refrigeração rigorosa contínua (4°C a 8°C). Produto 100% orgânico, vivo e isento de conservantes sintéticos.
                    </p>
                  </div>

                  <ul className="space-y-2 text-xs text-areia-300/90 font-light">
                    {[
                      "Apresentação individual de 10ml ou Kit Duplo com 2 frascos para partilha cerimonial",
                      "Intervalo mínimo de 24 horas antes e após a utilização de lentes de contato",
                      "Contraindicado em casos de cirurgia ocular recente (< 6 meses) ou afecções na córnea",
                      "Uso estritamente litúrgico e meditativo em contexto de recolhimento",
                    ].map((text) => (
                      <li key={text} className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2">
                    <a
                      href="https://wa.me/5568999979104?text=Ol%C3%A1%2C%20gostaria%20de%20consultar%20o%20rateio%20de%20Sananga%20Ancestral%20para%20nosso%20templo."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-5 py-3"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Consultar Sananga para Congregação</span>
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5 relative aspect-[4/5] rounded-2xl overflow-hidden border border-ambar-500/25 shadow-xl">
                  <Image
                    src="/assets/nativaram-oficial/institucional/sananga-ancestral-apresentacao.png"
                    alt="Sananga Ancestral Nativaram — Frascos e Gotas de Intenção"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          ARTEFATOS SAGRADOS & KURIPES
          ═══════════════════════════════════════════ */}
      {(activeCategory === "todos" || activeCategory === "artefatos") && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8" id="artefatos-secao">
          <AnimateOnScroll>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-ambar-500/15 pb-4">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-ambar-400">
                  <Compass className="h-4 w-4" />
                  <span>Instrumentos de Poder • Confecção Artesanal</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-areia-100 mt-1">
                  Kuripes & Tepis Cerimoniais
                </h2>
                <p className="text-xs text-areia-400">
                  Peças únicas esculpidas em madeira nobre pelos nossos artesãos parceiros e Txais no Acre.
                </p>
              </div>

              <a
                href="https://wa.me/5568999979104?text=Ol%C3%A1%2C%20gostaria%20de%20ver%20os%20modelos%20dispon%C3%ADveis%20de%20Kuripes%20e%20Tepis."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ambar-300 hover:text-ambar-200 border border-ambar-500/25 bg-floresta-900/60 px-4 py-2 rounded-xl transition-all"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>Escolher Modelo via WhatsApp</span>
              </a>
            </div>
          </AnimateOnScroll>

          {/* Banner Central de Artefatos */}
          <div className="relative aspect-[16/7] w-full rounded-2xl overflow-hidden border border-ambar-500/25 shadow-xl">
            <Image
              src="/assets/nativaram-oficial/institucional/artefatos-sagrados-apresentacao.png"
              alt="Artefatos Sagrados da Cooperativa Nativaram — Kuripes e Tepis Nobres"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>

          {/* Grid dos 9 Kuripes Tradicionais */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {kuripes.map((k) => (
              <div
                key={k.id}
                className="card-elevated rounded-2xl p-4 border border-ambar-500/15 bg-floresta-950/70 flex items-center gap-4 hover:border-ambar-500/30 transition-all"
              >
                <div className="relative h-20 w-20 rounded-xl overflow-hidden bg-floresta-900 flex-shrink-0 border border-ambar-500/20">
                  <Image
                    src={k.foto}
                    alt={k.nome}
                    fill
                    className="object-contain p-1"
                    sizes="80px"
                  />
                </div>
                <div className="space-y-1 flex-1">
                  <h4 className="font-serif text-sm font-bold text-areia-100">
                    {k.nome}
                  </h4>
                  <p className="text-[11px] text-areia-400 font-light leading-snug">
                    {k.desc}
                  </p>
                  <span className="text-[10px] font-mono text-amber-400/80">Madeira Maciça • Polimento Natural</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          KITS DE SINERGIA SAGRADA
          ═══════════════════════════════════════════ */}
      {(activeCategory === "todos" || activeCategory === "kits") && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8" id="kits-secao">
          <AnimateOnScroll>
            <div className="border-b border-ambar-500/15 pb-4 space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-ambar-400 uppercase tracking-widest">
                <Layers className="h-4 w-4" />
                <span>Sinergia Sagrada • Coleções Harmonizadas</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-areia-100">
                Kits Litúrgicos & Coleções Tradicionais
              </h2>
              <p className="text-xs sm:text-sm text-areia-300 max-w-3xl font-light leading-relaxed">
                Coleções elaboradas para atender às diferentes etapas do rito: abertura de caminhos, aterramento telúrico, harmonia cardíaca e fechamento de ciclos.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {kits.map((kit, idx) => (
              <AnimateOnScroll key={kit.nome} delay={idx * 150}>
                <div className="card-elevated rounded-2xl overflow-hidden border border-ambar-500/25 bg-floresta-950 flex flex-col justify-between h-full group hover:border-ambar-500/45 transition-all">
                  <div className="space-y-4">
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-floresta-900">
                      <Image
                        src={kit.foto}
                        alt={kit.nome}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-floresta-950 via-transparent to-transparent opacity-70" />
                      <span className="absolute top-3 left-3 rounded-full bg-floresta-950/90 border border-amber-500/30 px-3 py-1 text-[10px] font-mono text-amber-300 font-bold uppercase">
                        {kit.tipo}
                      </span>
                    </div>

                    <div className="p-6 space-y-3">
                      <div>
                        <h3 className="font-serif text-lg font-bold text-areia-100 group-hover:text-amber-300 transition-colors">
                          {kit.nome}
                        </h3>
                        <p className="text-xs text-amber-400 font-medium mt-0.5">
                          {kit.variedades}
                        </p>
                      </div>

                      <p className="text-xs text-areia-300 leading-relaxed font-light">
                        {kit.descricao}
                      </p>

                      <div className="pt-2 border-t border-ambar-500/10 text-[11px] font-mono text-emerald-400">
                        Indicação: {kit.indicacao}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <a
                      href={`https://wa.me/5568999979104?text=${encodeURIComponent(
                        `Olá, gostaria de consultar o rateio de custos do ${kit.nome} para nossa instituição.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl border border-ambar-500/25 bg-floresta-900/70 hover:bg-amber-500 hover:text-floresta-950 text-xs font-bold uppercase tracking-wider text-amber-300 transition-all"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span>Solicitar Credenciamento & Rateio</span>
                    </a>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

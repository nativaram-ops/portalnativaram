import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  HeartHandshake,
  Feather,
  Sparkles,
  ShieldCheck,
  Building2,
  Clock,
  Compass,
  CheckCircle2,
  Users,
  Flame,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { ReconhecimentoForm } from "@/components/forms/ReconhecimentoForm";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Acolhimento & Reconhecimento de Grupos Tradicionais | Cooperativa Nativaram",
  description:
    "Canal fraterno de acolhimento para núcleos em formação, círculos de oração e rezadores tradicionais. Apoio litúrgico e provimento cooperativo de sacramentos sob a égide do CONAD nº 01/2010.",
  openGraph: {
    title: "Acolhimento & Reconhecimento de Grupos Tradicionais | Cooperativa Nativaram",
    description:
      "Apoio ético e salvaguarda botânica para grupos em desenvolvimento e rezadores autônomos que buscam o amparo da Cooperativa Nativaram.",
    url: "https://nativaramcoop.eco.br/reconhecimento",
    images: [
      {
        url: "/assets/projetos-de-luz/projeto-luz-altar.jpg",
        width: 1200,
        height: 675,
        alt: "Acolhimento & Reconhecimento Litúrgico — Cooperativa Nativaram",
      },
    ],
  },
};

export default function ReconhecimentoPage() {
  return (
    <div className="space-y-0">
      {/* ═══════════════════════════════════════════
          HERO — ACOLHIMENTO FRATERNO DE GRUPOS TRADICIONAIS
          ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-section-lg lg:py-section-xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-ambar-500/[0.12] rounded-full blur-[140px] pointer-events-none" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <AnimateOnScroll>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="emerald" dot icon={<HeartHandshake className="h-3 w-3" />}>
                Acolhimento Fraterno • Núcleos em Desenvolvimento
              </Badge>
              <Badge variant="solar" icon={<Feather className="h-3 w-3 text-ambar-400" />}>
                Sem Exigência Burocrática de CNPJ
              </Badge>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={150}>
            <h1 className="font-serif text-display-md sm:text-display-lg lg:text-display-xl font-bold text-areia-100 text-glow leading-[1.08]">
              Acolhimento &amp; Reconhecimento de{" "}
              <span className="text-gradient-solar">Grupos Tradicionais</span>
            </h1>
          </AnimateOnScroll>

          <AnimateOnScroll delay={300}>
            <p className="text-base sm:text-lg text-areia-200 max-w-3xl mx-auto leading-relaxed font-light">
              Toda grande congregação nasceu de uma roda simples e sincera de oração. A <strong>Cooperativa Nativaram</strong> mantém esta via de diálogo direto para acolher <strong>grupos em formação, círculos de estudo e rezadores autônomos</strong> que buscam sacramentos puros e amparo responsável para suas vigílias espirituais.
            </p>
          </AnimateOnScroll>

          {/* Ponte para Instituições com CNPJ */}
          <AnimateOnScroll delay={350}>
            <div className="inline-flex items-center gap-2 p-1.5 pr-4 rounded-full bg-floresta-900/80 border border-ambar-500/20 text-xs text-areia-300">
              <span className="px-3 py-1 rounded-full bg-ambar-500/20 text-ambar-300 font-semibold font-mono text-[11px]">
                Já possui CNPJ e Ata?
              </span>
              <span>Sua congregação já é formalizada?</span>
              <Link
                href="/credenciamento"
                className="text-ambar-400 font-semibold hover:underline flex items-center gap-1"
              >
                <span>Acesse o Credenciamento Institucional</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </AnimateOnScroll>

          {/* Os 3 Pilares do Acolhimento em Desenvolvimento */}
          <AnimateOnScroll delay={450}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left max-w-4xl mx-auto">
              <div className="rounded-2xl border border-ambar-500/20 bg-floresta-950/80 p-5 space-y-2 shadow-sm">
                <div className="flex items-center gap-2 text-ambar-400 font-serif font-bold text-xs sm:text-sm">
                  <Users className="h-4 w-4" />
                  <span>1. Acolhimento Sem Burocracia</span>
                </div>
                <p className="text-[11px] text-areia-300 font-light leading-relaxed">
                  Entendemos que o caminho espiritual precede a formalização legal. Acolhemos o dirigente pela seriedade do propósito e pelo respeito à tradição.
                </p>
              </div>

              <div className="rounded-2xl border border-ambar-500/20 bg-floresta-950/80 p-5 space-y-2 shadow-sm">
                <div className="flex items-center gap-2 text-ambar-400 font-serif font-bold text-xs sm:text-sm">
                  <Flame className="h-4 w-4" />
                  <span>2. Pureza &amp; Segurança Botânica</span>
                </div>
                <p className="text-[11px] text-areia-300 font-light leading-relaxed">
                  Acesso aos mesmos sacramentos de feitio purista em Cruzeiro do Sul/AC (Cipó Tucunacá e Chacrona Rainha), sem misturas ou adulterações.
                </p>
              </div>

              <div className="rounded-2xl border border-ambar-500/20 bg-floresta-950/80 p-5 space-y-2 shadow-sm">
                <div className="flex items-center gap-2 text-emerald-400 font-serif font-bold text-xs sm:text-sm">
                  <Compass className="h-4 w-4" />
                  <span>3. Apoio até a Formalização</span>
                </div>
                <p className="text-[11px] text-areia-300 font-light leading-relaxed">
                  Acompanhamos a maturação do seu grupo. Quando chegar o momento de registrar estatuto e ata sob o CONAD 01/2010, forneceremos apoio documental completo.
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider variant="solar" />

      {/* ═══════════════════════════════════════════
          FORMULÁRIO MULTI-ETAPAS DE ACOLHIMENTO
          ═══════════════════════════════════════════ */}
      <section className="py-section-lg relative">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
          <AnimateOnScroll>
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-areia-100">
                Ficha de Reconhecimento Litúrgico
              </h2>
              <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
                Preencha as 3 etapas abaixo. Suas respostas serão analisadas pelo Conselho Gestor da Cooperativa e abriremos um canal de diálogo fraterno direto via WhatsApp.
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={150}>
            <ReconhecimentoForm />
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider variant="minimal" />

      {/* ═══════════════════════════════════════════
          FAQ DIDÁTICO PARA GRUPOS EM DESENVOLVIMENTO
          ═══════════════════════════════════════════ */}
      <section className="py-section-md bg-floresta-950/60">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-ambar-400 block font-bold">
              Orientações da Cooperativa
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-areia-100">
              Perguntas Frequentes de Grupos em Formação
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-floresta-900/60 border border-ambar-500/15 space-y-2">
              <span className="font-serif font-bold text-areia-100 text-sm flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-ambar-400" />
                Por que a cota inicial é de 5 litros?
              </span>
              <p className="text-areia-300 font-light leading-relaxed">
                Para manter a sustentabilidade econômica das famílias feitoras no interior do Acre e cobrir o frete aéreo expresso refrigerado com caixas térmicas e lacres invioláveis, o volume mínimo que viabiliza o rateio solidário é de 5 litros.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-floresta-900/60 border border-ambar-500/15 space-y-2">
              <span className="font-serif font-bold text-areia-100 text-sm flex items-center gap-2">
                <Clock className="h-4 w-4 text-ambar-400" />
                Por que planejar com 30 dias de antecedência?
              </span>
              <p className="text-areia-300 font-light leading-relaxed">
                A colheita da folha Chacrona ao amanhecer, a vigília do caldeirão e o repouso do preparado respeitam o tempo da floresta amazônica. A antecipação de 30 dias garante que cada sacramento seja preparado com calma e oração.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-floresta-900/60 border border-ambar-500/15 space-y-2">
              <span className="font-serif font-bold text-areia-100 text-sm flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-ambar-400" />
                Qual o respaldo legal para o nosso grupo?
              </span>
              <p className="text-areia-300 font-light leading-relaxed">
                O uso religioso da Ayahuasca no Brasil é plenamente protegido pela <strong>Constituição Federal (Art. 5º, VI)</strong> e pela <strong>Resolução CONAD nº 01/2010</strong>. Ao manter o uso restrito ao rezo espiritual, sem comércio, seu grupo atua em harmonia com a jurisprudência nacional.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-floresta-900/60 border border-ambar-500/15 space-y-2">
              <span className="font-serif font-bold text-areia-100 text-sm flex items-center gap-2">
                <Building2 className="h-4 w-4 text-emerald-400" />
                Como a Cooperativa ajuda na formalização futura?
              </span>
              <p className="text-areia-300 font-light leading-relaxed">
                Nossa assessoria disponibiliza modelos abertos de Estatuto Social de Igreja, Atas de Fundação, Termos de Consentimento e Fichas de Anamnese integrativa, orientando o passo a passo até a obtenção do CNPJ religioso.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          DISCLAIMER JURÍDICO OBRIGATÓRIO (CONAD 01/2010)
          ═══════════════════════════════════════════ */}
      <section className="py-8 bg-floresta-950/80 border-t border-ambar-500/15">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-ambar-400 uppercase tracking-wider">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Marco Legal &amp; Compromisso Deontológico</span>
          </div>
          <p className="text-[11px] text-areia-400 leading-relaxed font-light">
            A Cooperativa Etnobotânica Nativaram não pratica comércio nem disponibiliza preparados botânicos tradicionais fora de ritos e liturgias sagradas. As partilhas cooperativas destinam-se exclusivamente ao amparo litúrgico de congregações, núcleos e círculos de oração que professam o uso religioso amparado na Resolução CONAD nº 01/2010 e na Lei Federal nº 5.764/1971.
          </p>
        </div>
      </section>
    </div>
  );
}

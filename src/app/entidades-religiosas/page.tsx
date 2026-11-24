import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Landmark,
  Building2,
  ShieldCheck,
  HeartPulse,
  Ban,
  Megaphone,
  FileText,
  Scale,
  Route,
  MessageCircle,
  Mail,
  BookOpen,
  ArrowRight,
  Users,
  CheckCircle2,
} from "lucide-react";
import { BotaoWhatsApp } from "@/components/ui/BotaoWhatsApp";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { JornadaNavTracker } from "@/components/funil/JornadaNavTracker";
import {
  EMAIL_INSTITUCIONAL,
  linkEmailInstitucional,
} from "@/lib/contato";

const URL_CONAD =
  "https://www.gov.br/mj/pt-br/assuntos/sua-protecao/politicas-sobre-drogas/subcapas-senad/conad/atos-do-conad-1/2010/11___resolucao_n__01_2010___conad.pdf";

export const metadata: Metadata = {
  title: "Entidades Religiosas | Cooperativa Nativaram",
  description:
    "Quem pode dialogar com o projeto Cooperativa Nativaram: entidades religiosas legalmente constituídas. Compromissos, orientação de formalização para grupos em formação e contato institucional. Sem cadastro e sem coleta de dados.",
  alternates: { canonical: "/entidades-religiosas" },
  openGraph: {
    title: "Entidades Religiosas | Cooperativa Nativaram",
    description:
      "Requisitos, compromissos e orientação de formalização. O site não tem cadastro nem coleta dados.",
    url: "https://nativaramcoop.eco.br/entidades-religiosas",
  },
};

const requisitos = [
  "Estatuto social registrado",
  "Ata de fundação e de eleição da diretoria",
  "CNPJ ativo",
  "Responsável identificado pela condução dos ritos",
];

const compromissos = [
  {
    icone: ShieldCheck,
    titulo: "Uso exclusivamente ritual",
    texto:
      "O sacramento é usado só em ritos religiosos da entidade, em ambiente de oração e recolhimento, sem turismo espiritual.",
  },
  {
    icone: HeartPulse,
    titulo: "Triagem dos participantes",
    texto:
      "Antes de cada rito, a entidade aplica a triagem de segurança: interações com medicamentos, transtornos psicóticos e cardiopatias.",
  },
  {
    icone: Ban,
    titulo: "Sem comércio",
    texto:
      "Nenhuma venda, revenda ou cobrança com fim de lucro. Nenhum uso doméstico fora do rito.",
  },
  {
    icone: Megaphone,
    titulo: "Sem propaganda",
    texto:
      "Nenhuma propaganda do sacramento e nenhuma promessa de saúde ou de resultado.",
  },
];

export default function EntidadesReligiosasPage() {
  return (
    <div className="space-y-0">
      <JornadaNavTracker etapaAtual={5} />

      {/* HERO */}
      <section className="relative overflow-hidden py-section-lg lg:py-section-xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-ambar-500/[0.06] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <AnimateOnScroll>
            <div className="inline-flex items-center gap-2 rounded-full border border-ambar-500/20 bg-floresta-900/70 backdrop-blur-md px-4 py-1.5 text-[11px] font-semibold tracking-[0.15em] text-ambar-400 uppercase">
              <Landmark className="h-3.5 w-3.5" />
              <span>Sem cadastro • Sem coleta de dados</span>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={150}>
            <h1 className="font-serif text-display-md sm:text-display-lg lg:text-display-xl font-bold text-areia-100 text-glow leading-[1.08]">
              Entidades <span className="text-gradient-solar">Religiosas</span>
            </h1>
          </AnimateOnScroll>

          <AnimateOnScroll delay={300}>
            <p className="text-base sm:text-lg text-areia-300 max-w-2xl mx-auto leading-relaxed font-light">
              A Cooperativa Nativaram é um projeto de cooperativa em constituição, ainda sem
              registro e sem CNPJ. Esta página explica quem pode dialogar com o projeto, os
              compromissos da entidade e o caminho de formalização para grupos em formação.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider variant="solar" />

      <section className="py-section-lg">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* (a) Quem pode dialogar */}
          <AnimateOnScroll>
            <div id="quem-pode" className="card-elevated rounded-2xl p-8 sm:p-10 space-y-5 scroll-mt-32">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-floresta-900 border border-ambar-500/30 text-ambar-400">
                  <Building2 className="h-5 w-5" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-areia-100">
                  Quem pode dialogar com o projeto
                </h2>
              </div>
              <p className="text-sm text-areia-300 leading-relaxed font-light">
                Só <strong>entidades religiosas legalmente constituídas</strong>, critério que o
                projeto adota com base nos princípios deontológicos da{" "}
                <a
                  href={URL_CONAD}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ambar-400 underline underline-offset-4 decoration-ambar-500/30 hover:text-ambar-300"
                >
                  Resolução CONAD nº 1/2010
                </a>{" "}
                (princípio 7). A entidade precisa ter:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {requisitos.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 rounded-xl border border-ambar-500/20 bg-floresta-950/80 p-4 text-xs text-areia-300"
                  >
                    <CheckCircle2 className="h-4 w-4 text-ambar-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-areia-400 leading-relaxed font-light">
                Pessoas físicas sem vínculo com entidade religiosa constituída não são atendidas.
              </p>
            </div>
          </AnimateOnScroll>

          {/* (b) Compromissos */}
          <AnimateOnScroll>
            <div id="compromissos" className="card-elevated rounded-2xl p-8 sm:p-10 space-y-6 scroll-mt-32">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-floresta-900 border border-ambar-500/30 text-ambar-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-bold text-areia-100">
                    Compromissos da entidade
                  </h2>
                  <p className="text-xs text-ambar-400 font-medium">
                    Referência: princípios 1, 2, 5, 8 e 9 da deontologia da Resolução CONAD nº 1/2010
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {compromissos.map(({ icone: Icone, titulo, texto }) => (
                  <div
                    key={titulo}
                    className="rounded-xl border border-ambar-500/20 bg-floresta-950/80 p-6 space-y-2"
                  >
                    <div className="flex items-center gap-2 text-ambar-400">
                      <Icone className="h-4 w-4" />
                      <h3 className="font-serif text-sm font-bold text-areia-100">{titulo}</h3>
                    </div>
                    <p className="text-xs text-areia-300 leading-relaxed font-light">{texto}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-areia-400 leading-relaxed font-light">
                Os alertas de triagem estão em{" "}
                <Link href="/seguranca" className="text-ambar-400 underline underline-offset-4 hover:text-ambar-300">
                  Segurança e Redução de Danos
                </Link>
                .
              </p>
            </div>
          </AnimateOnScroll>

          {/* (c) Grupos em formação */}
          <AnimateOnScroll>
            <div id="formalizacao" className="card-elevated rounded-2xl p-8 sm:p-10 space-y-5 scroll-mt-32 border-ambar-500/30">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-floresta-900 border border-ambar-500/30 text-ambar-400">
                  <Users className="h-5 w-5" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-areia-100">
                  Grupos em formação, rezadores e círculos
                </h2>
              </div>
              <p className="text-sm text-areia-300 leading-relaxed font-light">
                Toda congregação nasce de uma roda simples de oração. Para dialogar com o
                projeto, o grupo precisa primeiro se formalizar como pessoa jurídica. O Código
                Civil prevê as <strong>organizações religiosas</strong> (art. 44, IV) e as{" "}
                <strong>associações</strong> (art. 44, I).
              </p>
              <ol className="space-y-3">
                {[
                  "Redigir e aprovar o estatuto social da entidade.",
                  "Lavrar a ata de fundação e de eleição da diretoria.",
                  "Registrar estatuto e ata no Cartório de Registro Civil de Pessoas Jurídicas.",
                  "Inscrever a entidade no CNPJ.",
                ].map((passo, i) => (
                  <li
                    key={passo}
                    className="flex items-start gap-3 rounded-xl border border-ambar-500/15 bg-floresta-950/70 p-4 text-xs text-areia-300"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-ambar-500/20 text-ambar-300 font-mono text-[11px] font-bold">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{passo}</span>
                  </li>
                ))}
              </ol>
              <p className="text-sm text-areia-200 leading-relaxed">
                <strong>Não há atendimento até a formalização.</strong> Documentos de segurança e o
                marco legal estão abertos na{" "}
                <Link href="/portal-dirigente" className="text-ambar-400 underline underline-offset-4 hover:text-ambar-300">
                  Central de Recursos
                </Link>
                . Para dúvidas sobre o registro, procure um advogado ou o cartório da sua cidade.
              </p>
            </div>
          </AnimateOnScroll>

          {/* (d) Partilha e (e) Transporte */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimateOnScroll>
              <div id="partilha" className="card-elevated rounded-2xl p-8 space-y-4 h-full scroll-mt-32">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-floresta-900 border border-ambar-500/30 text-ambar-400">
                    <Scale className="h-5 w-5" />
                  </div>
                  <h2 className="font-serif text-xl font-bold text-areia-100">
                    Como funciona a partilha
                  </h2>
                </div>
                <p className="text-sm text-areia-300 leading-relaxed font-light">
                  A partilha do sacramento acontece apenas entre entidades religiosas legalmente
                  constituídas, fora deste site, por termo entre as entidades, cobrindo somente o
                  custeio de despesas comprovadas, sem margem, conforme os princípios da Resolução
                  CONAD nº 1/2010.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={100}>
              <div id="transporte" className="card-elevated rounded-2xl p-8 space-y-4 h-full scroll-mt-32">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-floresta-900 border border-ambar-500/30 text-ambar-400">
                    <Route className="h-5 w-5" />
                  </div>
                  <h2 className="font-serif text-xl font-bold text-areia-100">Transporte</h2>
                </div>
                <p className="text-sm text-areia-300 leading-relaxed font-light">
                  O transporte do sacramento entre entidades não tem regulamentação específica (a
                  Resolução CONAD nº 1/2010 recomendou que fosse regulamentado). Este site não
                  orienta transporte. Procure um advogado.
                </p>
              </div>
            </AnimateOnScroll>
          </div>

          {/* (f) Contato institucional */}
          <AnimateOnScroll>
            <div id="contato" className="card-elevated rounded-2xl p-8 sm:p-10 space-y-5 scroll-mt-32">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-floresta-900 border border-ambar-500/30 text-ambar-400">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-areia-100">
                  Contato institucional
                </h2>
              </div>
              <p className="text-sm text-areia-300 leading-relaxed font-light">
                Entidades religiosas constituídas podem falar com a coordenação do projeto pelo
                e-mail ou WhatsApp institucional. Não coletamos dados pelo site.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <BotaoWhatsApp />
                <a
                  href={linkEmailInstitucional("Entidade religiosa - contato institucional")}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-ambar-500/40 bg-floresta-950/70 hover:bg-floresta-800 px-5 py-3 text-xs font-bold uppercase tracking-wider text-ambar-300 transition-all"
                >
                  <Mail className="h-4 w-4" />
                  <span>{EMAIL_INSTITUCIONAL}</span>
                </a>
                <Link href="/contato" className="btn-secondary justify-center text-xs">
                  <span>Página de Contato</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <p className="text-[11px] text-areia-400 leading-relaxed font-light">
                Os dados que você enviar por WhatsApp ou e-mail ficam nesses serviços. Veja a{" "}
                <Link href="/privacidade" className="text-ambar-400 underline underline-offset-2 hover:text-ambar-300">
                  Política de Privacidade
                </Link>
                .
              </p>
            </div>
          </AnimateOnScroll>

          {/* (g) Recursos abertos */}
          <AnimateOnScroll>
            <div id="recursos" className="rounded-2xl border border-ambar-500/30 bg-floresta-900/70 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 scroll-mt-32">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-floresta-800 border border-ambar-500/30 text-ambar-400">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h2 className="font-serif text-xl font-bold text-areia-100">Recursos abertos</h2>
                  <p className="text-xs text-areia-300 font-light max-w-lg">
                    Central de Recursos: documentos, matriz de interações, perguntas frequentes e
                    marco legal. Aberta ao público, sem login.
                  </p>
                </div>
              </div>
              <Link href="/portal-dirigente" className="btn-primary btn-press text-xs font-semibold px-5 py-2.5 shrink-0">
                <FileText className="h-4 w-4" />
                <span>Abrir a Central de Recursos</span>
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Aviso de rodapé */}
      <section className="py-8 bg-floresta-950/60">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center space-y-2">
          <p className="text-[11px] text-areia-400 leading-relaxed font-light">
            Este site é institucional. Não vendemos, não recebemos pedidos e não fazemos envios.
            Não há valores nem formulários de pedido. Conteúdo para maiores de 18 anos.
          </p>
        </div>
      </section>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Landmark,
  Ban,
  Scale,
  BookOpen,
  Lock,
  Image as ImageIcon,
  History,
  ExternalLink,
  Eye,
} from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { CREDITOS_IMAGENS } from "@/data/creditos-imagens";

export const metadata: Metadata = {
  title: "Transparência | Cooperativa Nativaram",
  description:
    "Quem somos juridicamente (projeto de cooperativa em constituição, sem registro e sem CNPJ), o que não fazemos, princípios de custeio, marco normativo com links oficiais, privacidade, créditos de imagens e histórico de mudanças do site.",
  alternates: { canonical: "/transparencia" },
  openGraph: {
    title: "Transparência | Cooperativa Nativaram",
    description:
      "Situação jurídica do projeto, limites do site, marco normativo e histórico de mudanças.",
    url: "https://nativaramcoop.eco.br/transparencia",
  },
};

const normas = [
  {
    nome: "Resolução CONAD nº 1/2010",
    url: "https://www.gov.br/mj/pt-br/assuntos/sua-protecao/politicas-sobre-drogas/subcapas-senad/conad/atos-do-conad-1/2010/11___resolucao_n__01_2010___conad.pdf",
    explicacao:
      "Trata do uso religioso da ayahuasca e traz os princípios deontológicos seguidos pelo projeto: uso exclusivamente religioso, sem comércio e sem propaganda.",
  },
  {
    nome: "Lei 11.343/2006, art. 2º, caput",
    url: "http://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11343.htm",
    explicacao:
      "A ressalva do uso estritamente ritualístico-religioso está no caput do art. 2º. O parágrafo único trata de fins medicinais e científicos.",
  },
  {
    nome: "Anvisa, Resolução RE nº 342/2025",
    url: "https://www.in.gov.br/web/dou/-/resolucao-re-n-342-de-27-de-janeiro-de-2025-609252593",
    explicacao:
      "Por causa dessa resolução, o site não oferece nenhum preparado: não há oferta, valores nem pedidos.",
  },
  {
    nome: "Lei 9.294/1996",
    url: "https://www.planalto.gov.br/ccivil_03/leis/l9294.htm",
    explicacao:
      "Dispõe sobre restrições ao uso e à propaganda de produtos fumígeros. Por isso o rapé aparece no site só como conteúdo cultural e etnobotânico, nunca como oferta.",
  },
];

function Cartao({
  id,
  icone: Icone,
  titulo,
  children,
}: {
  id: string;
  icone: React.ElementType;
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <AnimateOnScroll>
      <div id={id} className="card-elevated rounded-2xl p-8 sm:p-10 space-y-5 scroll-mt-32">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-floresta-900 border border-ambar-500/30 text-ambar-400">
            <Icone className="h-5 w-5" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-areia-100">{titulo}</h2>
        </div>
        <div className="space-y-3 text-sm text-areia-300 leading-relaxed font-light">{children}</div>
      </div>
    </AnimateOnScroll>
  );
}

const linkClasse = "text-ambar-400 underline underline-offset-4 decoration-ambar-500/30 hover:text-ambar-300";

export default function TransparenciaPage() {
  return (
    <div className="space-y-0">
      {/* HERO */}
      <section className="relative overflow-hidden py-section-lg lg:py-section-xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-ambar-500/[0.06] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <AnimateOnScroll>
            <div className="inline-flex items-center gap-2 rounded-full border border-ambar-500/20 bg-floresta-900/70 backdrop-blur-md px-4 py-1.5 text-[11px] font-semibold tracking-[0.15em] text-ambar-400 uppercase">
              <Eye className="h-3.5 w-3.5" />
              <span>Situação jurídica • Limites do site • Normas</span>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={150}>
            <h1 className="font-serif text-display-md sm:text-display-lg lg:text-display-xl font-bold text-areia-100 text-glow leading-[1.08]">
              <span className="text-gradient-solar">Transparência</span>
            </h1>
          </AnimateOnScroll>

          <AnimateOnScroll delay={300}>
            <p className="text-base sm:text-lg text-areia-300 max-w-2xl mx-auto leading-relaxed font-light">
              O que o projeto é, o que não faz, as normas que segue e o que mudou neste site.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider variant="solar" />

      <section className="py-section-lg">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
          <Cartao id="quem-somos" icone={Landmark} titulo="Quem somos juridicamente">
            <p>
              A Cooperativa Nativaram é um projeto de cooperativa em constituição, ainda sem
              registro e sem CNPJ. O projeto pretende se constituir sem fins lucrativos.
            </p>
            <p>Responsável e contato do encarregado de dados: A definir.</p>
          </Cartao>

          <Cartao id="o-que-nao-fazemos" icone={Ban} titulo="O que não fazemos">
            <p>
              Este site é institucional. Não vendemos, não recebemos pedidos e não fazemos envios.
              Não há valores nem formulários de pedido.
            </p>
          </Cartao>

          <Cartao id="custeio" icone={Scale} titulo="Princípios de custeio">
            <ul className="list-disc pl-5 space-y-1">
              <li>Só despesas comprovadas.</li>
              <li>Sem margem.</li>
              <li>Sem desconto por volume.</li>
              <li>Prestação de contas às entidades.</li>
            </ul>
            <p>A metodologia de custos será publicada quando o projeto estiver constituído.</p>
          </Cartao>

          <Cartao id="marco-normativo" icone={BookOpen} titulo="Marco normativo">
            <ul className="space-y-4">
              {normas.map((norma) => (
                <li key={norma.nome} className="rounded-xl border border-ambar-500/20 bg-floresta-950/80 p-5 space-y-2">
                  <a href={norma.url} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 font-semibold ${linkClasse}`}>
                    <span>{norma.nome}</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <p className="text-xs text-areia-300 leading-relaxed">{norma.explicacao}</p>
                </li>
              ))}
            </ul>
            <p className="text-xs text-areia-400">
              Mais detalhes no{" "}
              <Link href="/compliance" className={linkClasse}>
                Marco Legal
              </Link>
              .
            </p>
          </Cartao>

          <Cartao id="privacidade" icone={Lock} titulo="Privacidade">
            <p>
              O site não coleta cadastro nem pedidos. Controlador, cadastros anteriores e direitos
              do titular estão na{" "}
              <Link href="/privacidade" className={linkClasse}>
                Política de Privacidade
              </Link>
              .
            </p>
          </Cartao>

          <Cartao id="creditos" icone={ImageIcon} titulo="Créditos de imagens">
            {CREDITOS_IMAGENS.length === 0 ? (
              <p>Nenhum crédito de imagem de terceiros registrado.</p>
            ) : (
              <ul className="space-y-4">
                {CREDITOS_IMAGENS.map((credito) => (
                  <li key={credito.arquivo} className="rounded-xl border border-ambar-500/20 bg-floresta-950/80 p-5 space-y-1 text-xs">
                    <p className="font-semibold text-areia-100">{credito.titulo}</p>
                    <p>Autor: {credito.autor}</p>
                    <p>
                      Licença:{" "}
                      {credito.licencaUrl.startsWith("http") ? (
                        <a href={credito.licencaUrl} target="_blank" rel="noopener noreferrer" className={linkClasse}>
                          {credito.licenca}
                        </a>
                      ) : (
                        credito.licenca
                      )}
                    </p>
                    <p>
                      Origem:{" "}
                      {credito.origemUrl.startsWith("http") ? (
                        <a href={credito.origemUrl} target="_blank" rel="noopener noreferrer" className={linkClasse}>
                          {credito.origemUrl}
                        </a>
                      ) : (
                        credito.origemUrl
                      )}
                    </p>
                    <p>Modificação: {credito.modificacao}</p>
                    <p className="font-mono text-[10px] text-areia-400">{credito.arquivo}</p>
                  </li>
                ))}
              </ul>
            )}
          </Cartao>

          <Cartao id="historico" icone={History} titulo="Histórico">
            <ul className="space-y-2">
              <li>
                <strong>24/11/2026:</strong> o site deixou de ter cadastro, valores, pedidos e
                orientação de transporte; os recursos antes restritos passaram a ser abertos.
              </li>
            </ul>
          </Cartao>
        </div>
      </section>
    </div>
  );
}

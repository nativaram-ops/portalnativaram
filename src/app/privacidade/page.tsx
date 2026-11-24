import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Lock,
  UserCheck,
  Database,
  Target,
  Share2,
  Clock,
  Scale,
  Mail,
  AlertTriangle,
} from "lucide-react";
import { SectionDivider } from "@/components/ui/SectionDivider";

export const metadata: Metadata = {
  title: "Aviso de Privacidade | Cooperativa Nativaram",
  description:
    "O site da Cooperativa Nativaram, projeto em constituição, não coleta cadastro nem pedidos. Controlador, cadastros anteriores e direitos do titular pela LGPD (Lei 13.709/2018).",
  alternates: {
    canonical: "/privacidade",
  },
  openGraph: {
    title: "Aviso de Privacidade | Cooperativa Nativaram",
    description:
      "O site não coleta cadastro nem pedidos. Controlador, cadastros anteriores e direitos do titular.",
  },
};

type Secao = {
  icone: React.ElementType;
  titulo: string;
  conteudo: React.ReactNode;
};

const secoes: Secao[] = [
  {
    icone: UserCheck,
    titulo: "1. Quem é o controlador",
    conteudo: (
      <>
        <p>
          O controlador é o <strong>projeto Cooperativa Nativaram</strong>, em
          constituição, sem CNPJ. A Cooperativa Nativaram é um projeto de
          cooperativa em constituição, ainda sem registro e sem CNPJ.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Responsável: A definir.</li>
          <li>Endereço: A definir.</li>
        </ul>
      </>
    ),
  },
  {
    icone: Database,
    titulo: "2. O que o site coleta",
    conteudo: (
      <>
        <p>
          <strong>O site não coleta cadastro nem pedidos.</strong> Não há
          formulário de cadastro, de pedido ou de contato. Este site é
          institucional. Não vendemos, não recebemos pedidos e não fazemos
          envios.
        </p>
        <p>
          Usamos apenas cookies essenciais de sessão e segurança, sem
          rastreamento publicitário.
        </p>
        <p>
          <strong>O login existe só para o Conselho.</strong> Visitantes e
          entidades não têm conta no site. A Central de Recursos é aberta, sem
          login.
        </p>
        <p>
          Se você escrever para o WhatsApp ou o e-mail institucional, os dados
          que enviar ficam nesses serviços e são usados só para responder à
          sua mensagem.
        </p>
      </>
    ),
  },
  {
    icone: Target,
    titulo: "3. Dados de cadastros anteriores a 24/11/2026",
    conteudo: (
      <>
        <p>
          Até 24/11/2026 o site tinha formulários de cadastro de entidades e
          grupos. Esses formulários foram encerrados.
        </p>
        <p>
          Os dados de entidades cadastradas antes de 24/11/2026 são mantidos
          só para atender aos direitos do titular e serão eliminados a pedido.
          Eles não são usados para nenhuma outra finalidade.
        </p>
      </>
    ),
  },
  {
    icone: Share2,
    titulo: "4. Com quem compartilhamos",
    conteudo: (
      <>
        <p>
          O projeto <strong>não vende</strong> nem cede dados pessoais a
          terceiros.
        </p>
        <p>
          Os dados ficam em serviços de hospedagem do site e de banco de dados.
          Esses fornecedores atuam como operadores: tratam os dados apenas para
          manter o site funcionando.
        </p>
      </>
    ),
  },
  {
    icone: Clock,
    titulo: "5. Por quanto tempo guardamos",
    conteudo: (
      <p>
        Os dados de cadastros anteriores a 24/11/2026 são eliminados a pedido
        do titular. Prazo geral de retenção: A definir. Quando o prazo for
        aprovado, ele será publicado nesta página.
      </p>
    ),
  },
  {
    icone: Scale,
    titulo: "6. Seus direitos como titular",
    conteudo: (
      <>
        <p>Pela LGPD (art. 18), você pode pedir:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>confirmação de que tratamos seus dados e acesso a eles;</li>
          <li>correção de dados incompletos, inexatos ou desatualizados;</li>
          <li>
            anonimização, bloqueio ou eliminação de dados desnecessários,
            excessivos ou tratados em desconformidade com a lei;
          </li>
          <li>portabilidade dos dados a outro fornecedor;</li>
          <li>eliminação dos dados tratados com base no seu consentimento;</li>
          <li>
            informação sobre as entidades com as quais compartilhamos seus
            dados;
          </li>
          <li>
            informação sobre a possibilidade de não consentir e sobre as
            consequências da recusa;
          </li>
          <li>revogação do consentimento a qualquer momento.</li>
        </ul>
        <p>
          Você também pode apresentar reclamação à Autoridade Nacional de
          Proteção de Dados (ANPD).
        </p>
      </>
    ),
  },
  {
    icone: Mail,
    titulo: "7. Como falar com o encarregado",
    conteudo: (
      <>
        <p>Responsável e contato do encarregado de dados: A definir.</p>
        <p>
          Enquanto o canal não for publicado, pedidos sobre dados pessoais
          podem ser feitos pela página de{" "}
          <Link
            href="/contato"
            className="text-ambar-400 hover:text-ambar-300 underline underline-offset-4"
          >
            contato
          </Link>
          . Veja também a página de{" "}
          <Link
            href="/transparencia"
            className="text-ambar-400 hover:text-ambar-300 underline underline-offset-4"
          >
            transparência
          </Link>
          .
        </p>
      </>
    ),
  },
];

export default function PrivacidadePage() {
  return (
    <div className="space-y-0">
      <section className="relative overflow-hidden py-section-lg lg:py-section-xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-ambar-500/[0.06] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-[11px] font-semibold tracking-[0.15em] text-amber-300 uppercase">
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>Versão preliminar — revisão jurídica pendente</span>
          </div>

          <h1 className="font-serif text-display-md sm:text-display-lg font-bold text-areia-100 text-glow leading-[1.08]">
            Aviso de{" "}
            <span className="text-gradient-solar">Privacidade</span>
          </h1>

          <p className="text-base sm:text-lg text-areia-300 max-w-2xl mx-auto leading-relaxed font-light">
            O site não coleta cadastro nem pedidos. Este aviso explica quem é
            o controlador, o que acontece com os cadastros anteriores a
            24/11/2026 e os seus direitos, nos termos da Lei Geral de Proteção
            de Dados (Lei 13.709/2018).
          </p>
        </div>
      </section>

      <SectionDivider variant="solar" />

      <section className="py-section-lg">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
          {secoes.map(({ icone: Icone, titulo, conteudo }) => (
            <div
              key={titulo}
              className="card-elevated rounded-2xl p-6 sm:p-8 space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-floresta-900 border border-ambar-500/30 text-ambar-400">
                  <Icone className="h-5 w-5" />
                </div>
                <h2 className="font-serif text-xl font-bold text-areia-100">
                  {titulo}
                </h2>
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
                {conteudo}
              </div>
            </div>
          ))}

          <div className="rounded-xl border border-ambar-500/20 bg-floresta-950/70 p-5 flex items-start gap-3 text-[11px] text-areia-400 leading-relaxed font-light">
            <Lock className="h-4 w-4 text-ambar-400 shrink-0 mt-0.5" />
            <p>
              As preferências de cookies podem ser ajustadas a qualquer momento
              pelo link no rodapé do site. Este aviso será revisado após a
              análise jurídica e a aprovação do Conselho.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

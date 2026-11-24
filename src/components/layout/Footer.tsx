import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import {
  ShieldCheck,
  Compass,
  HeartHandshake,
  Mail,
  MapPin,
  ExternalLink,
  Scale,
} from "lucide-react";
import { BotaoWhatsApp } from "@/components/ui/BotaoWhatsApp";
import { CookiePreferencesButton } from "@/components/ui/CookiePreferencesButton";
import {
  EMAIL_INSTITUCIONAL,
  linkEmailInstitucional,
} from "@/lib/contato";

const footerLinks = [
  { href: "/", label: "Início" },
  { href: "/institucional", label: "Manifesto" },
  { href: "/feitio", label: "Feitio" },
  { href: "/sacramentos", label: "Acervo Etnobotânico" },
  { href: "/compliance", label: "Marco Legal" },
  { href: "/entidades-religiosas", label: "Entidades Religiosas" },
  { href: "/seguranca", label: "Segurança e Redução de Danos" },
  { href: "/portal-dirigente", label: "Central de Recursos" },
  { href: "/estudos", label: "Estudos" },
  { href: "/projetos-de-luz", label: "Projetos de Luz" },
  { href: "/transparencia", label: "Transparência" },
  { href: "/privacidade", label: "Privacidade" },
  { href: "/contato", label: "Contato" },
];

export const Footer = () => {
  return (
    <footer className="relative w-full border-t border-ambar-500/10 bg-floresta-950 text-areia-300 overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-ambar-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Section: Logo Centered */}
        <div className="flex flex-col items-center justify-center py-12 sm:py-16 space-y-4">
          <Logo variant="footer" size={80} />
          <div className="text-center space-y-1">
            <h4 className="font-serif text-base font-bold tracking-[0.2em] text-areia-100 uppercase">
              Cooperativa Nativaram
            </h4>
            <p className="text-[11px] text-ambar-400/70 tracking-wider italic">
              &ldquo;Salvaguarda Litúrgica &bull; O Futuro é Ancestral&rdquo;
            </p>
          </div>
        </div>

        {/* Ornamental Divider */}
        <div className="divider-solar" />

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-12 sm:py-14">
          {/* Col 1: Navigation */}
          <div className="space-y-4">
            <h5 className="text-[11px] font-bold tracking-[0.15em] text-ambar-400/80 uppercase">
              Navegação
            </h5>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-areia-400 hover:text-ambar-400 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Origens & Contato */}
          <div className="space-y-4">
            <h5 className="text-[11px] font-bold tracking-[0.15em] text-ambar-400/80 uppercase flex items-center gap-1.5">
              <Compass className="h-3 w-3" />
              Origem & Contato
            </h5>
            <div className="space-y-3 text-xs text-areia-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-3.5 w-3.5 text-ambar-500/70 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-areia-200 font-medium block">
                    Origem do projeto
                  </span>
                  Cruzeiro do Sul, Acre
                </div>
              </div>
              <div className="pt-1">
                <BotaoWhatsApp variante="link" />
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="h-3.5 w-3.5 text-ambar-500/70 flex-shrink-0 mt-0.5" />
                <a href={linkEmailInstitucional()} className="hover:text-ambar-300 transition-colors">
                  {EMAIL_INSTITUCIONAL}
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Ética & Acesso */}
          <div className="space-y-4">
            <h5 className="text-[11px] font-bold tracking-[0.15em] text-ambar-400/80 uppercase flex items-center gap-1.5">
              <Scale className="h-3 w-3" />
              Limites do Site
            </h5>
            <ul className="space-y-2 text-xs text-areia-400">
              <li className="flex items-start gap-2">
                <span className="text-ambar-500/60 mt-0.5">◆</span>
                <span>
                  Site institucional: não vendemos, não recebemos pedidos e não
                  fazemos envios.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ambar-500/60 mt-0.5">◆</span>
                <span>
                  Sem valores, sem cadastro e sem formulários de pedido.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ambar-500/60 mt-0.5">◆</span>
                <span>
                  Projeto de cooperativa em constituição, ainda sem registro e
                  sem CNPJ.
                </span>
              </li>
            </ul>
            <div className="pt-2">
              <Link
                href="/transparencia"
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-ambar-400/80 hover:text-ambar-300 transition-colors"
              >
                <span>Transparência</span>
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Legal Compliance Box */}
        <div className="divider-minimal mb-8" />
        <div className="rounded-lg border border-ambar-500/15 bg-floresta-900/30 p-5 mb-10">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="h-4 w-4 text-ambar-400/70 flex-shrink-0" />
            <span className="text-[10px] font-bold text-ambar-400/70 uppercase tracking-wider">
              Conformidade Legal & Salvaguarda
            </span>
          </div>
          <p className="text-[10px] text-areia-400/70 leading-relaxed text-justify">
            A <strong>Cooperativa Nativaram</strong> é um projeto de cooperativa
            em constituição, ainda sem registro e sem CNPJ. Este site é
            institucional. Não vendemos, não recebemos pedidos e não fazemos
            envios. Não há valores nem formulários de pedido. O uso religioso
            da ayahuasca segue o <strong>art. 2º, caput, da Lei 11.343/2006</strong>{" "}
            e a{" "}
            <a
              href="https://www.gov.br/mj/pt-br/assuntos/sua-protecao/politicas-sobre-drogas/subcapas-senad/conad/atos-do-conad-1/2010/11___resolucao_n__01_2010___conad.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-ambar-500/30 hover:text-ambar-400/80"
            >
              <strong>Resolução CONAD nº 01/2010</strong>
            </a>
            .
          </p>
          <p className="text-[10px] text-areia-400/70 leading-relaxed text-justify mt-2">
            <strong>Conteúdo destinado a maiores de 18 anos.</strong> Sem
            promessas de saúde. Veja os alertas de{" "}
            <Link href="/seguranca" className="underline decoration-ambar-500/30 hover:text-ambar-400/80">
              segurança e redução de danos
            </Link>
            .
          </p>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-floresta-800/60 py-6 text-[10px] text-areia-400/50">
          <span suppressHydrationWarning>
            © {new Date().getFullYear()} Cooperativa Nativaram — Nascidos do Raio de
            Sol
          </span>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/compliance"
              className="hover:text-ambar-400/70 transition-colors"
            >
              CONAD 01/2010
            </Link>
            <span className="text-floresta-700">·</span>
            <Link
              href="/privacidade"
              className="hover:text-ambar-400/70 transition-colors"
            >
              Privacidade
            </Link>
            <span className="text-floresta-700">·</span>
            <Link
              href="/transparencia"
              className="hover:text-ambar-400/70 transition-colors"
            >
              Transparência
            </Link>
            <span className="text-floresta-700">·</span>
            <CookiePreferencesButton />
          </div>
        </div>
      </div>
    </footer>
  );
};

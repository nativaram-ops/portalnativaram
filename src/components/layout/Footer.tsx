import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import {
  ShieldCheck,
  Compass,
  HeartHandshake,
  Mail,
  MapPin,
  Phone,
  ExternalLink,
  Scale,
} from "lucide-react";
import { InstagramIcon } from "@/components/ui/icons";

const footerLinks = [
  { href: "/", label: "Início" },
  { href: "/institucional", label: "O Manifesto" },
  { href: "/feitio", label: "Feitio Purista" },
  { href: "/medicinas", label: "Medicinas Sagradas" },
  { href: "/projetos-de-luz", label: "Projetos de Luz" },
  { href: "/compliance", label: "Marco Legal" },
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
              Nativaram Brasil
            </h4>
            <p className="text-[11px] text-ambar-400/70 tracking-wider italic">
              &ldquo;O Futuro é Ancestral&rdquo;
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
              Origem & Partilha
            </h5>
            <div className="space-y-3 text-xs text-areia-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-3.5 w-3.5 text-ambar-500/70 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-areia-200 font-medium block">
                    Feitio Nativo
                  </span>
                  Cruzeiro do Sul, Acre
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="h-3.5 w-3.5 text-ambar-500/70 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-areia-200 font-medium block">
                    Logística & Apoio
                  </span>
                  Nova Almeida, Serra/ES
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="h-3.5 w-3.5 text-emerald-400/70 flex-shrink-0 mt-0.5" />
                <a
                  href="https://wa.me/5568999979104?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20a%20Cooperativa%20Nativaram%20Brasil."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  (68) 99997-9104
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="h-3.5 w-3.5 text-ambar-500/70 flex-shrink-0 mt-0.5" />
                <span>nativaram@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://instagram.com/nativarambrasil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-ambar-400/80 hover:text-ambar-300 transition-colors"
                >
                  <InstagramIcon className="h-3.5 w-3.5" />
                  @nativarambrasil
                </a>
                <span className="text-floresta-700">•</span>
                <a
                  href="https://linktr.ee/nativarambrasil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-areia-400 hover:text-ambar-300 transition-colors"
                >
                  Linktree
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Ética & Acesso */}
          <div className="space-y-4">
            <h5 className="text-[11px] font-bold tracking-[0.15em] text-ambar-400/80 uppercase flex items-center gap-1.5">
              <Scale className="h-3 w-3" />
              Ética & Acesso
            </h5>
            <ul className="space-y-2 text-xs text-areia-400">
              <li className="flex items-start gap-2">
                <span className="text-ambar-500/60 mt-0.5">◆</span>
                <span>
                  Fornecimento exclusivo para templos com ata registrada.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ambar-500/60 mt-0.5">◆</span>
                <span>
                  Vedada comercialização com fins lucrativos ou apelo
                  recreativo.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ambar-500/60 mt-0.5">◆</span>
                <span>
                  Preparo sob encomenda: prazo mínimo de 30 dias.
                </span>
              </li>
            </ul>
            <div className="pt-2">
              <Link
                href="/portal-dirigente"
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-ambar-400/80 hover:text-ambar-300 transition-colors"
              >
                <span>Portal do Dirigente</span>
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
            A <strong>Nativaram Brasil</strong> é uma cooperativa etnobotânica
            de caráter espiritual, cultural e de apoio litúrgico, sob amparo do{" "}
            <strong>Art. 5º, incisos VI e VIII da CF</strong> e do{" "}
            <strong>Art. 2º da Lei 11.343/2006</strong>. Sacramento
            disponibilizado unicamente para rito litúrgico de instituições
            cadastradas e homologadas. Proibida qualquer comercialização, venda
            avulsa ou promessas de cura, em observância à{" "}
            <strong>Resolução CONAD nº 01/2010</strong> e ao{" "}
            <strong>Marco ANVISA de 28/01/2025</strong>.
          </p>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-floresta-800/60 py-6 text-[10px] text-areia-400/50">
          <span>
            © {new Date().getFullYear()} Nativaram Brasil — Nascidos do Raio de
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
              href="/compliance"
              className="hover:text-ambar-400/70 transition-colors"
            >
              ANVISA 2025
            </Link>
            <span className="text-floresta-700">·</span>
            <Link
              href="/credenciamento"
              className="hover:text-ambar-400/70 transition-colors"
            >
              Triagem
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

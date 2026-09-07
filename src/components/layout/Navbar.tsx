"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { usePathname } from "next/navigation";
import { Lock, Menu, X, ShieldCheck, Sparkles } from "lucide-react";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/institucional", label: "O Manifesto" },
  { href: "/estudos", label: "Estudos", badge: "PDFs" },
  { href: "/feitio", label: "Feitio Purista" },
  { href: "/medicinas", label: "Sacramentos" },
  { href: "/projetos-de-luz", label: "Projetos de Luz" },
  { href: "/compliance", label: "Marco Legal", icon: true },
  { href: "/contato", label: "Contato" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/institucional") return pathname === "/institucional" || pathname === "/manifesto";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        isScrolled
          ? "bg-floresta-950/95 backdrop-blur-lg border-b border-ambar-500/15 shadow-elevated-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Logo & Brand Identity */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-transform hover:scale-[1.02]"
        >
          <Logo variant="navbar" size={44} priority />
          <div>
            <div className="flex items-baseline gap-1.5 font-serif text-base font-bold tracking-[0.15em] text-areia-100 group-hover:text-ambar-400 transition-colors duration-300">
              NATIVARAM
              <span className="text-ambar-500 text-[10px] font-sans tracking-[0.2em] font-semibold uppercase">
                Brasil
              </span>
            </div>
            <p className="text-[10px] font-medium tracking-wider text-areia-400/70 font-sans hidden sm:block">
              Nascidos do Raio de Sol
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 text-[13px] font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-3 py-2 rounded-md transition-all duration-300 ${
                isActive(link.href)
                  ? "text-ambar-400"
                  : "text-areia-300/80 hover:text-areia-100 hover:bg-floresta-800/40"
              }`}
            >
              <span className="flex items-center gap-1.5">
                {link.icon && (
                  <ShieldCheck className="h-3.5 w-3.5 text-ambar-500" />
                )}
                {link.label}
                {link.badge && (
                  <span className="rounded-full bg-ambar-500/20 px-1.5 py-0.5 text-[9px] font-bold text-ambar-300">
                    {link.badge}
                  </span>
                )}
              </span>
              {/* Active indicator line */}
              {isActive(link.href) && (
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-ambar-500 to-ambar-400 rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/portal-dirigente"
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-ambar-300 bg-floresta-900/60 hover:bg-floresta-800 border border-ambar-500/30 hover:border-ambar-500/60 shadow-sm transition-all duration-300"
            title="Acesso exclusivo a dirigentes de templos homologados"
          >
            <Lock className="h-3.5 w-3.5 text-ambar-400" />
            <span>Portal do Dirigente</span>
          </Link>

          <Link
            href="/credenciamento"
            className="btn-primary-sm"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Credenciamento</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            href="/portal-dirigente"
            className="p-2 text-areia-300 hover:text-ambar-400 transition-colors"
            aria-label="Portal do Dirigente"
          >
            <Lock className="h-4 w-4" />
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-md p-2 text-areia-200 hover:bg-floresta-800/60 hover:text-ambar-400 focus:outline-none transition-colors"
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Full-Screen Overlay */}
      <div
        className={`lg:hidden fixed inset-0 top-[57px] z-40 transition-all duration-500 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-floresta-950/98 backdrop-blur-xl"
          onClick={() => setIsOpen(false)}
        />

        {/* Nav Content */}
        <div className="relative flex flex-col justify-between h-full px-6 py-8 overflow-y-auto">
          <nav className="space-y-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between py-3.5 px-4 rounded-lg text-base font-medium transition-all duration-300 ${
                  isActive(link.href)
                    ? "text-ambar-400 bg-floresta-900/60"
                    : "text-areia-200 hover:text-ambar-400 hover:bg-floresta-900/40"
                }`}
                style={{
                  transitionDelay: isOpen ? `${i * 50}ms` : "0ms",
                  transform: isOpen ? "translateX(0)" : "translateX(16px)",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <span className="flex items-center gap-2">
                  {link.icon && <ShieldCheck className="h-4 w-4 text-ambar-500" />}
                  {link.label}
                </span>
                {link.badge && (
                  <span className="rounded-full bg-ambar-500/20 px-2 py-0.5 text-[10px] font-bold text-ambar-300">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          <div className="pt-6 space-y-3 border-t border-ambar-500/15">
            <Link
              href="/credenciamento"
              onClick={() => setIsOpen(false)}
              className="btn-primary w-full justify-center"
            >
              <Sparkles className="h-4 w-4" />
              Credenciamento Litúrgico
            </Link>
            <Link
              href="/portal-dirigente"
              onClick={() => setIsOpen(false)}
              className="btn-secondary w-full justify-center"
            >
              <Lock className="h-4 w-4 text-ambar-400" />
              Portal do Dirigente
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

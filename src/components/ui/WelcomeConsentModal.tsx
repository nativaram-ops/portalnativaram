"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  Cookie,
  CheckCircle2,
  X,
  ExternalLink,
  Lock,
  Scale,
} from "lucide-react";
import { useDialogoAcessivel } from "@/hooks/useDialogoAcessivel";

export function WelcomeConsentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasConsented = localStorage.getItem("nativaram_welcome_consent");
    const timer = !hasConsented
      ? setTimeout(() => {
          setIsOpen(true);
        }, 350)
      : null;

    // Ouvinte sempre ativo para reabrir o modal a partir do rodapé ou menu
    const handleReopen = () => setIsOpen(true);
    window.addEventListener("nativaram:open-welcome-modal", handleReopen);
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("nativaram:open-welcome-modal", handleReopen);
    };
  }, []);

  const fecharComConsentimento = () => {
    localStorage.setItem("nativaram_welcome_consent", "true");
    setIsOpen(false);
  };

  // Escape equivale ao botão "Fechar" (que também registra a ciência do aviso).
  const { containerRef, focoInicialRef } = useDialogoAcessivel({
    aberto: mounted && isOpen,
    aoFechar: fecharComConsentimento,
  });

  if (!mounted || !isOpen) return null;

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-modal-title"
      tabIndex={-1}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fade-in"
    >
      {/* Backdrop escuro com desfoque */}
      <div
        className="fixed inset-0 bg-floresta-950/85 backdrop-blur-md transition-opacity"
        onClick={fecharComConsentimento}
      />

      {/* Cartão Modal em Areia Nobre */}
      <div className="relative w-full max-w-lg max-h-[92vh] my-auto rounded-3xl border border-ambar-500/60 bg-gradient-to-b from-[#FCFBF7] via-[#F8F4EB] to-[#EFE8D8] shadow-[0_25px_70px_rgba(0,0,0,0.7)] overflow-hidden text-pedra-900 flex flex-col animate-scale-in">
        {/* Botão Fechar no canto superior */}
        <button
          ref={focoInicialRef}
          onClick={fecharComConsentimento}
          className="absolute top-3.5 right-3.5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-pedra-900/10 hover:bg-pedra-900/20 text-pedra-800 hover:text-pedra-950 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-600"
          aria-label="Fechar janela de boas-vindas"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Conteúdo do Modal */}
        <div className="relative p-5 sm:p-7 space-y-4 overflow-y-auto custom-scrollbar">
          {/* Emblema + Identidade */}
          <div className="text-center space-y-2.5">
            <div className="relative mx-auto flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-amber-500/60 bg-white shadow-sm p-1.5">
              <Image
                src="/assets/emblema-solar-boas-vindas.png"
                alt="Emblema Sagrado Raio de Sol — Cooperativa Nativaram"
                width={80}
                height={80}
                priority
                className="w-full h-full object-contain"
              />
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 border border-amber-700/25 px-3 py-0.5 text-[10px] font-semibold tracking-wider text-amber-950 uppercase">
              <Sparkles className="h-3 w-3 text-amber-700" />
              <span>Cooperativa Sem Fins Lucrativos • CONAD 01/2010</span>
            </div>

            <h2
              id="welcome-modal-title"
              className="font-serif text-lg sm:text-xl font-bold text-floresta-950 tracking-tight"
            >
              Bem-vindo(a) à Cooperativa Nativaram
            </h2>

            <p className="text-xs text-pedra-800 max-w-md mx-auto leading-relaxed">
              <strong>Não somos loja online nem e-commerce.</strong> Realizamos salvaguarda litúrgica e rateio cooperativo exclusivo para uso religioso (+18). Escolha como deseja entrar:
            </p>
          </div>

          {/* Triagem Direta dos 3 Públicos */}
          <div className="space-y-2" aria-label="Triagem rápida por perfil">
            <Link
              href="/institucional"
              onClick={fecharComConsentimento}
              className="flex items-start gap-3 p-3 rounded-xl bg-white/85 hover:bg-white border border-amber-600/25 hover:border-amber-600/60 transition-all text-left group focus:outline-none focus:ring-2 focus:ring-amber-600"
            >
              <span className="shrink-0 mt-0.5 w-6 h-6 rounded-md bg-floresta-900 text-ambar-300 font-mono text-[11px] font-bold flex items-center justify-center">
                01
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-serif text-xs font-bold text-floresta-950 group-hover:text-amber-800 transition-colors">
                  Sou primeiro visitante ou pesquisador
                </p>
                <p className="text-[11px] text-pedra-700 leading-snug">
                  Conhecer o modelo cooperativo, o feitio no Acre e os estudos abertos.
                </p>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-amber-700 shrink-0 mt-1" />
            </Link>

            <Link
              href="/credenciamento"
              onClick={fecharComConsentimento}
              className="flex items-start gap-3 p-3 rounded-xl bg-floresta-900 text-areia-100 hover:bg-floresta-800 border border-amber-500/50 transition-all text-left group focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <span className="shrink-0 mt-0.5 w-6 h-6 rounded-md bg-amber-500 text-floresta-950 font-mono text-[11px] font-bold flex items-center justify-center">
                02
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-serif text-xs font-bold text-areia-100 group-hover:text-amber-300 transition-colors">
                  Presido instituição constituída (CNPJ &amp; Ata)
                </p>
                <p className="text-[11px] text-areia-300 leading-snug">
                  Solicitar credenciamento formal de templo ou acessar o Portal do Dirigente.
                </p>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-1" />
            </Link>

            <Link
              href="/reconhecimento"
              onClick={fecharComConsentimento}
              className="flex items-start gap-3 p-3 rounded-xl bg-white/85 hover:bg-white border border-amber-600/25 hover:border-amber-600/60 transition-all text-left group focus:outline-none focus:ring-2 focus:ring-amber-600"
            >
              <span className="shrink-0 mt-0.5 w-6 h-6 rounded-md bg-floresta-900 text-ambar-300 font-mono text-[11px] font-bold flex items-center justify-center">
                03
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-serif text-xs font-bold text-floresta-950 group-hover:text-amber-800 transition-colors">
                  Lidero grupo em formação / rezador sem CNPJ
                </p>
                <p className="text-[11px] text-pedra-700 leading-snug">
                  Preencher a Ficha de Reconhecimento e passar por acolhimento fraterno.
                </p>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-amber-700 shrink-0 mt-1" />
            </Link>
          </div>

          {/* Resumo Semântico & LGPD */}
          <div className="rounded-2xl p-3.5 bg-amber-600/[0.08] border border-amber-700/20 space-y-2 text-left">
            <div className="flex items-center justify-between gap-2 text-[11px] font-bold text-floresta-950 font-serif">
              <span className="flex items-center gap-1.5">
                <Scale className="h-3.5 w-3.5 text-amber-800 shrink-0" />
                <span>Linguagem de Salvaguarda &amp; Privacidade (LGPD)</span>
              </span>
              <span className="text-[10px] font-mono text-amber-900">+18 ANOS</span>
            </div>

            <p className="text-[11px] text-pedra-800 leading-relaxed">
              Respeitamos o marco legal (CONAD 01/2010 e Art. 5º CF/88): o portal <strong>não faz promessas médicas nem ofertas comerciais</strong> e adota vocabulário tradicional (<em>sacramentos</em>, <em>sabedoria botânica</em> e <em>partilha cooperativa</em>). Usamos apenas cookies essenciais de sessão e segurança, sem rastreamento publicitário.
            </p>

            <div className="pt-1.5 border-t border-amber-700/15 flex items-center justify-between gap-2 text-[10px] text-pedra-800">
              <span className="flex items-center gap-1 font-mono">
                <Cookie className="h-3 w-3 text-amber-800 shrink-0" />
                Sem rastreamento comercial
              </span>
              <Link
                href="/compliance"
                onClick={fecharComConsentimento}
                className="inline-flex items-center gap-1 font-semibold text-amber-900 hover:text-floresta-950 underline underline-offset-2"
              >
                <Lock className="h-2.5 w-2.5" />
                <span>Marco Legal &amp; CONAD</span>
              </Link>
            </div>
          </div>

          {/* Botão Principal */}
          <div className="space-y-1.5 text-center">
            <button
              onClick={fecharComConsentimento}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-floresta-900 hover:bg-floresta-800 text-areia-50 font-semibold text-xs sm:text-sm py-3 px-5 border border-ambar-500/60 shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-amber-600"
            >
              <CheckCircle2 className="h-4 w-4 text-ambar-400" />
              <span>Concordar e Explorar a Página Inicial</span>
            </button>

            <p className="text-[10px] text-pedra-700">
              Ao prosseguir, você confirma ser maior de 18 anos e respeitar o caráter estritamente religioso do portal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

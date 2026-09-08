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

export function WelcomeConsentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasConsented = localStorage.getItem("nativaram_welcome_consent");
    if (!hasConsented) {
      // Pequeno delay para a página carregar suavemente antes da aparição
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 350);
      return () => clearTimeout(timer);
    }

    // Ouvinte para reabrir o modal a partir do rodapé ou menu
    const handleReopen = () => setIsOpen(true);
    window.addEventListener("nativaram:open-welcome-modal", handleReopen);
    return () => window.removeEventListener("nativaram:open-welcome-modal", handleReopen);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("nativaram_welcome_consent", "true");
    setIsOpen(false);
  };

  const handleDismiss = () => {
    localStorage.setItem("nativaram_welcome_consent", "true");
    setIsOpen(false);
  };

  if (!mounted || !isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fade-in"
    >
      {/* Backdrop escuro com desfoque profundo */}
      <div
        className="fixed inset-0 bg-floresta-950/80 backdrop-blur-md transition-opacity"
        onClick={handleDismiss}
      />

      {/* Cartão Modal com Fundo Areia Nobre Brilhante de Leve */}
      <div className="relative w-full max-w-lg max-h-[92vh] my-auto rounded-3xl border-2 border-ambar-400/60 bg-gradient-to-b from-[#FCFBF7] via-[#F8F4EB] to-[#ECE3D0] shadow-[0_25px_70px_rgba(0,0,0,0.7),0_0_40px_rgba(212,163,89,0.35)] overflow-hidden text-pedra-900 transition-all transform animate-scale-in flex flex-col">
        
        {/* Halo de luz âmbar solar radiante ao fundo */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-b from-ambar-400/30 via-amber-300/20 to-transparent rounded-full blur-2xl pointer-events-none" />

        {/* Partículas sutis de brilho solar */}
        <div className="absolute top-4 left-6 text-amber-500/40 text-xs select-none pointer-events-none animate-pulse">✦</div>
        <div className="absolute top-12 right-10 text-amber-500/40 text-sm select-none pointer-events-none animate-pulse" style={{ animationDelay: "700ms" }}>✦</div>
        <div className="absolute bottom-6 left-8 text-amber-500/30 text-xs select-none pointer-events-none animate-pulse" style={{ animationDelay: "1200ms" }}>✦</div>

        {/* Botão Fechar no canto superior */}
        <button
          onClick={handleDismiss}
          className="absolute top-3.5 right-3.5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-pedra-900/5 hover:bg-pedra-900/15 text-pedra-700 hover:text-pedra-950 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
          aria-label="Fechar janela de boas-vindas"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Conteúdo do Modal */}
        <div className="relative p-5 sm:p-7 space-y-4 text-center overflow-y-auto custom-scrollbar">
          
          {/* Emblema Solar com Animação e Fundo Areia Iluminado */}
          <div className="relative mx-auto flex items-center justify-center pt-1">
            
            {/* Anéis concêntricos de irradiação solar suave */}
            <div className="absolute w-36 h-36 rounded-full border border-amber-400/30 animate-[spin_60s_linear_infinite] pointer-events-none" />
            <div className="absolute w-28 h-28 rounded-full bg-gradient-to-tr from-amber-400/25 via-yellow-300/15 to-transparent blur-md pointer-events-none animate-pulse" />

            {/* Medalhão central */}
            <div className="relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-amber-500/70 bg-gradient-to-b from-[#FFFDF9] via-[#FAF6ED] to-[#EFE7D5] shadow-[0_8px_24px_rgba(0,0,0,0.18),0_0_20px_rgba(212,163,89,0.3),inset_0_2px_4px_rgba(255,255,255,0.9)] p-2 transition-transform duration-700 hover:scale-105">
              <Image
                src="/assets/emblema-solar-boas-vindas.png"
                alt="Emblema Sagrado Raio de Sol — Cooperativa Etnobotânica Nativaram Brasil"
                width={112}
                height={112}
                priority
                className="w-full h-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.12)]"
              />
            </div>
          </div>

          {/* Cabeçalho Textual Nobre */}
          <div className="space-y-1 pt-0.5">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 border border-amber-600/25 px-3 py-0.5 text-[10px] sm:text-[11px] font-semibold tracking-widest text-amber-900 uppercase">
              <Sparkles className="h-3 w-3 text-amber-600" />
              <span>Nascidos do Raio de Sol</span>
            </div>

            <h2
              id="welcome-modal-title"
              className="font-serif text-lg sm:text-xl font-bold text-floresta-950 tracking-tight"
            >
              Seja Bem-vindo(a) ao Portal Nativaram
            </h2>

            <p className="text-xs text-pedra-700 max-w-md mx-auto leading-relaxed font-light">
              Somos uma cooperativa etnobotânica dedicada à salvaguarda do sacramento da Ayahuasca,
              à sabedoria tradicional dos povos da floresta e ao apoio litúrgico a instituições constituídas.
            </p>
          </div>

          {/* Caixa de Semântica da Salvaguarda & Regras Vigentes */}
          <div className="rounded-2xl p-3.5 sm:p-4 bg-gradient-to-r from-amber-500/[0.12] via-amber-400/[0.06] to-amber-500/[0.12] border border-amber-600/30 text-left space-y-2.5 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-bold text-floresta-950 font-serif">
                <Scale className="h-4 w-4 text-amber-700 shrink-0" />
                <span>Nossa Semântica & Regras Vigentes</span>
              </div>
              <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-600/15 text-amber-900 border border-amber-600/25 uppercase tracking-wider">
                CONAD & ANVISA
              </span>
            </div>

            <p className="text-[11px] sm:text-xs text-pedra-800 leading-relaxed font-light">
              Para assegurar a conformidade irrestrita com as normas da <strong>ANVISA</strong> e da <strong>Resolução CONAD nº 01/2010</strong>,
              nossa comunicação <strong>não utiliza vocabulário clínico ou mercantil</strong>. Adotamos intencionalmente a semântica da salvaguarda:
            </p>

            {/* Pílulas de contraste semântico sutis e chamativas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-0.5 text-[10px] text-pedra-700 font-medium">
              <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-white/70 border border-amber-500/20">
                <span className="text-amber-700 font-bold">✦</span>
                <span><strong>Sabedoria Botânica</strong> (e não fármacos)</span>
              </div>
              <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-white/70 border border-amber-500/20">
                <span className="text-amber-700 font-bold">✦</span>
                <span><strong>Florescimento Vital</strong> (e não promessas de cura)</span>
              </div>
              <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-white/70 border border-amber-500/20">
                <span className="text-amber-700 font-bold">✦</span>
                <span><strong>Partilha Cooperativa</strong> (e não comércio de lucro)</span>
              </div>
              <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-white/70 border border-amber-500/20">
                <span className="text-amber-700 font-bold">✦</span>
                <span><strong>Sacramento Sagrado</strong> (e não itens de consumo)</span>
              </div>
            </div>

            <p className="text-[10px] text-pedra-600 italic font-light pt-0.5">
              Preservamos a sacralidade litúrgica, o amparo ao Art. 5º da CF/88 e a total transparência com os órgãos reguladores.
            </p>
          </div>

          {/* Caixa de Conformidade, Salvaguarda e Política de Cookies */}
          <div className="rounded-2xl p-4 sm:p-4.5 bg-amber-600/[0.07] border border-amber-600/20 text-left space-y-2.5 shadow-inner">
            <div className="flex items-center gap-2 text-xs font-bold text-floresta-900 font-serif">
              <Cookie className="h-4 w-4 text-amber-600 shrink-0" />
              <span>Privacidade, Cookies & Salvaguarda Litúrgica</span>
            </div>

            <p className="text-[11px] sm:text-xs text-pedra-700 leading-relaxed font-light">
              Utilizamos cookies estritamente essenciais de navegação institucional para garantir a segurança,
              a integridade das sessões e o cumprimento dos termos regulatórios (LGPD).
              <strong> Não realizamos rastreamento comercial invasivo, venda de dados nem anúncios de saúde.</strong>
            </p>

            <div className="pt-1.5 border-t border-amber-600/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] text-amber-950/80 font-mono">
              <span className="flex items-center gap-1.5">
                <Lock className="h-3 w-3 text-amber-600 shrink-0" />
                Ambiente institucional exclusivo para maiores de 18 anos
              </span>
              <Link
                href="/compliance"
                onClick={handleAccept}
                className="inline-flex items-center gap-1 font-semibold text-amber-800 hover:text-amber-950 underline underline-offset-2"
              >
                <span>Marco Legal & CONAD</span>
                <ExternalLink className="h-2.5 w-2.5" />
              </Link>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="pt-1 space-y-2.5">
            <button
              onClick={handleAccept}
              className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-floresta-800 hover:bg-floresta-900 text-areia-50 font-semibold text-xs sm:text-sm py-3.5 px-6 border border-ambar-400/60 shadow-[0_4px_16px_rgba(22,40,30,0.35)] transition-all hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <CheckCircle2 className="h-4 w-4 text-ambar-400" />
              <span>Concordar e Acessar o Portal</span>
            </button>

            <p className="text-[10px] text-pedra-500 text-center font-light">
              Ao prosseguir, você declara estar em conformidade com a Resolução CONAD nº 01/2010.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

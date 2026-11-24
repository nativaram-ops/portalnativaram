"use client";

import React, { useState, useEffect } from "react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { LINK_WHATSAPP } from "@/lib/contato";

/**
 * Botão flutuante de WhatsApp: o canal central para falar com a cooperativa.
 * Usa o mesmo link e a mesma mensagem de todos os botões do site (src/lib/contato.ts).
 * Aparece após o primeiro scroll, no canto inferior direito. No desktop mostra o texto.
 */
export const WhatsAppFAB = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={LINK_WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a cooperativa no WhatsApp (abre em nova aba)"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-6 right-4 sm:right-6 z-50 flex h-14 items-center justify-center gap-2 rounded-full bg-emerald-700 px-4 text-white shadow-[0_4px_20px_rgba(4,120,87,0.4)] transition-all duration-300 motion-reduce:transition-none hover:bg-emerald-800 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-floresta-950 ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0 pointer-events-none invisible"
      }`}
    >
      <WhatsAppIcon className="h-6 w-6 shrink-0" />
      <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider pr-1">
        Falar com a cooperativa
      </span>
    </a>
  );
};

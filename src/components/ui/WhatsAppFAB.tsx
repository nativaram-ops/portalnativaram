"use client";

import React, { useState, useEffect } from "react";
import { WhatsAppIcon } from "@/components/ui/icons";

const WHATSAPP_URL =
  "https://wa.me/5568999979104?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20a%20Cooperativa%20Nativaram%20Brasil.";

/**
 * Botão flutuante de WhatsApp.
 * Aparece após o primeiro scroll e permanece fixo no canto inferior direito.
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
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar pelo WhatsApp com a Nativaram Brasil"
      className={`fixed bottom-6 right-4 sm:right-6 z-50 flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-[0_4px_20px_rgba(16,185,129,0.35)] transition-all duration-500 hover:bg-emerald-500 hover:scale-105 hover:shadow-[0_6px_28px_rgba(16,185,129,0.5)] active:scale-95 ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <WhatsAppIcon className="h-6 w-6" />
      {/* Halo sutil de atenção */}
      <span className="absolute inset-0 rounded-full animate-pulse-subtle bg-emerald-400/20 pointer-events-none" />
    </a>
  );
};

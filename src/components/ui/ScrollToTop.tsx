"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Botão de volta ao topo.
 * Aparece após 400px de scroll e rola suavemente até o início.
 */
export const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Voltar ao topo da página"
      className={`fixed bottom-22 right-4 sm:bottom-6 sm:right-24 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-ambar-500/30 bg-floresta-950/90 backdrop-blur-md text-ambar-400 shadow-[0_4px_16px_rgba(0,0,0,0.4),0_0_8px_rgba(248,246,240,0.12)] transition-all duration-500 hover:bg-floresta-900 hover:border-ambar-400 hover:text-ambar-300 hover:shadow-[0_4px_20px_rgba(212,163,89,0.3)] active:scale-90 ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
};

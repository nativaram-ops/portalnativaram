"use client";

import React, { useState, useEffect } from "react";
import { ShieldAlert, X } from "lucide-react";

export const ComplianceBanner = () => {
  const [dismissed, setDismissed] = useState(true); // start hidden, check storage

  useEffect(() => {
    const stored = localStorage.getItem("nativaram-compliance-dismissed");
    if (!stored) setDismissed(false);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem("nativaram-compliance-dismissed", "true");
  };

  if (dismissed) return null;

  return (
    <aside
      aria-label="Aviso Institucional de Salvaguarda Litúrgica"
      className="w-full bg-floresta-950 border-b border-ambar-500/15 py-2 px-4 animate-slide-down"
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[11px] text-ambar-400/90 font-medium tracking-wide">
          <ShieldAlert className="h-3.5 w-3.5 text-ambar-400 flex-shrink-0" />
          <span className="hidden sm:inline">
            Portal Institucional &amp; Salvaguarda Litúrgica — Atuação sob Art.
            5º da CF/88, Res. CONAD 01/2010 e ANVISA 2025. Comércio e revenda
            vedados.
          </span>
          <span className="sm:hidden">
            Portal sob amparo CF/88, CONAD 01/2010 e ANVISA.
          </span>
        </div>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 p-1 rounded text-areia-400 hover:text-ambar-400 hover:bg-floresta-800/60 transition-colors"
          aria-label="Fechar aviso"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </aside>
  );
};

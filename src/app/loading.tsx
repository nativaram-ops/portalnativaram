import React from "react";
import { Logo } from "@/components/ui/Logo";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-6">
        {/* Emblema solar com luz no tom âmbar solar acolhedor */}
        <div className="relative mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-ambar-400/15 blur-xl animate-pulse pointer-events-none" />
          <div
            className="absolute -inset-3 rounded-full border border-ambar-400/30 border-t-transparent animate-spin pointer-events-none"
            style={{ animationDuration: "6s" }}
          />
          <Logo variant="standalone" size={92} />
        </div>

        <div className="space-y-1.5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ambar-400/90 font-serif">
            Nativaram Brasil
          </p>
          <p className="text-[11px] text-areia-300/60 italic font-sans">
            Preparando o caminho sagrado...
          </p>
        </div>
      </div>
    </div>
  );
}

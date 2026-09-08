import React from "react";
import Image from "next/image";

interface LogoProps {
  /** Variante de aplicação: navbar, footer, standalone ou badge */
  variant?: "navbar" | "footer" | "standalone" | "badge";
  /** Tamanho em pixels (opcional se variante for especificada) */
  size?: number;
  /** Classe adicional para o container externo */
  className?: string;
  /** Prioridade no carregamento do Next Image */
  priority?: boolean;
}

/**
 * Componente oficial do Emblema / Logo da Nativaram Brasil.
 *
 * Garante fidelidade visual e conformidade com a identidade de marca:
 * - Aplica SEMPRE uma aura de luz radiante no tom areia (#F8F6F0) atrás do emblema transparente,
 *   garantindo alto contraste, nitidez dos traços solares e beleza transcendental sobre fundos escuros de floresta.
 */
export const Logo = ({
  variant = "navbar",
  size,
  className = "",
  priority = false,
}: LogoProps) => {
  switch (variant) {
    case "navbar": {
      const dim = size || 58;
      return (
        <div
          className={`group relative flex items-center justify-center transition-all duration-500 shrink-0 ${className}`}
        >
          {/* Aura suave de luz âmbar solar da floresta (idêntica ao footer) */}
          <div className="absolute -inset-2 rounded-full bg-gradient-to-b from-ambar-400/25 via-ambar-500/15 to-transparent blur-md pointer-events-none transition-opacity duration-500 group-hover:from-ambar-400/40" />

          {/* Disco medalhão no tom areia nobre (idêntico ao footer) */}
          <div
            className="relative flex items-center justify-center rounded-full border-[1.5px] border-ambar-400/70 bg-gradient-to-b from-[#FAF7F0] via-[#F3ECE0] to-[#E7DEC8] shadow-[0_4px_16px_rgba(0,0,0,0.35),0_0_12px_rgba(212,163,89,0.2),inset_0_1px_2px_rgba(255,255,255,0.7)] transition-transform duration-500 group-hover:scale-105 shrink-0"
            style={{ width: dim, height: dim }}
          >
            <Image
              src="/assets/logo.png"
              alt="Emblema Solar Cooperativa Nativaram"
              width={dim}
              height={dim}
              className="h-[92%] w-[92%] object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
              priority={priority}
            />
          </div>
        </div>
      );
    }

    case "footer": {
      const dim = size || 80;
      return (
        <div
          className={`group relative flex flex-col items-center justify-center transition-all duration-500 ${className}`}
        >
          {/* Aura suave de luz âmbar solar da floresta (suave, envolvente e sem ofuscar) */}
          <div className="absolute -inset-4 rounded-full bg-gradient-to-b from-ambar-400/20 via-ambar-500/10 to-transparent blur-xl pointer-events-none transition-opacity duration-500 group-hover:from-ambar-400/30" />

          {/* Disco medalhão no tom areia nobre, com a logo preenchendo até a margem máxima */}
          <div
            className="relative flex items-center justify-center rounded-full border-[1.5px] border-ambar-400/70 bg-gradient-to-b from-[#FAF7F0] via-[#F3ECE0] to-[#E7DEC8] shadow-[0_4px_16px_rgba(0,0,0,0.35),0_0_12px_rgba(212,163,89,0.2),inset_0_1px_2px_rgba(255,255,255,0.7)] transition-transform duration-500 group-hover:scale-105"
            style={{ width: dim, height: dim }}
          >
            <Image
              src="/assets/logo.png"
              alt="Emblema Solar Cooperativa Nativaram"
              width={dim}
              height={dim}
              className="h-[92%] w-[92%] object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
              priority={priority}
            />
          </div>
        </div>
      );
    }

    case "standalone": {
      const dim = size || 96;
      return (
        <div className={`group relative inline-flex items-center justify-center ${className}`}>
          {/* Halo acolhedor em tom âmbar sem excesso de brilho */}
          <div className="absolute -inset-5 rounded-full bg-gradient-to-b from-ambar-400/18 via-ambar-500/10 to-transparent blur-xl pointer-events-none" />

          <div
            className="relative flex items-center justify-center rounded-full border-[1.5px] border-ambar-400/70 bg-gradient-to-b from-[#FAF7F0] via-[#F4ECE1] to-[#E8DEC9] shadow-[0_4px_20px_rgba(0,0,0,0.35),0_0_14px_rgba(212,163,89,0.2),inset_0_1px_2px_rgba(255,255,255,0.7)] transition-transform duration-500 group-hover:scale-105"
            style={{ width: dim, height: dim }}
          >
            <Image
              src="/assets/logo.png"
              alt="Emblema Solar Cooperativa Nativaram"
              width={dim}
              height={dim}
              className="h-[92%] w-[92%] object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
              priority={priority}
            />
          </div>
        </div>
      );
    }

    case "badge":
    default: {
      const dim = size || 48;
      return (
        <div
          className={`relative inline-flex items-center justify-center rounded-full border border-ambar-400/70 bg-gradient-to-b from-[#FAF7F0] via-[#F4ECE1] to-[#E8DEC9] shadow-[0_2px_8px_rgba(0,0,0,0.25),0_0_8px_rgba(212,163,89,0.15)] ${className}`}
          style={{ width: dim, height: dim }}
        >
          <div className="absolute inset-0 rounded-full bg-ambar-400/10 blur-xs pointer-events-none" />
          <Image
            src="/assets/logo.png"
            alt="Emblema Solar Cooperativa Nativaram"
            width={dim}
            height={dim}
            className="relative h-[92%] w-[92%] object-contain drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)]"
            priority={priority}
          />
        </div>
      );
    }
  }
};

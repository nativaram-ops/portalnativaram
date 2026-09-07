import React, { type ReactNode } from "react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

interface PageHeroProps {
  /** Ícone Lucide para o badge superior */
  badgeIcon: ReactNode;
  /** Texto do badge superior */
  badgeText: string;
  /** Título principal (pode conter JSX com spans para gradient) */
  title: ReactNode;
  /** Subtítulo descritivo */
  description?: string;
  /** Largura máxima do container (default: max-w-5xl) */
  maxWidth?: string;
  /** Conteúdo adicional abaixo do subtítulo */
  children?: ReactNode;
}

/**
 * Hero reutilizável para subpáginas.
 * Encapsula o padrão visual: glow radial + badge + título display + descrição.
 */
export const PageHero = ({
  badgeIcon,
  badgeText,
  title,
  description,
  maxWidth = "max-w-5xl",
  children,
}: PageHeroProps) => {
  return (
    <section className="relative overflow-hidden py-section-lg lg:py-section-xl">
      {/* Glow radial */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-ambar-500/[0.06] rounded-full blur-[120px] pointer-events-none" />

      <div className={`relative mx-auto ${maxWidth} px-4 sm:px-6 lg:px-8 text-center space-y-6`}>
        <AnimateOnScroll>
          <div className="inline-flex items-center gap-2 rounded-full border border-ambar-500/20 bg-floresta-900/70 backdrop-blur-md px-4 py-1.5 text-[11px] font-semibold tracking-[0.15em] text-ambar-400 uppercase">
            {badgeIcon}
            <span>{badgeText}</span>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={150}>
          <h1 className="font-serif text-display-md sm:text-display-lg lg:text-display-xl font-bold text-areia-100 text-glow leading-[1.08]">
            {title}
          </h1>
        </AnimateOnScroll>

        {description && (
          <AnimateOnScroll delay={300}>
            <p className="text-base sm:text-lg text-areia-300 max-w-xl mx-auto leading-relaxed font-light">
              {description}
            </p>
          </AnimateOnScroll>
        )}

        {children && (
          <AnimateOnScroll delay={450}>
            {children}
          </AnimateOnScroll>
        )}
      </div>
    </section>
  );
};

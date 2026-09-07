import React, { type ReactNode, type HTMLAttributes } from "react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { cn } from "@/lib/utils";

export interface PageHeroProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Ícone Lucide para o badge superior (legado) */
  badgeIcon?: ReactNode;
  /** Texto do badge superior (legado) */
  badgeText?: string;
  /** Título principal (legado) */
  title?: ReactNode;
  /** Subtítulo descritivo (legado) */
  description?: string;
  /** Largura máxima do container (default: max-w-5xl) */
  maxWidth?: string;
  /** Conteúdo adicional ou filhos do padrão composto */
  children?: ReactNode;
}

/**
 * Hero reutilizável para subpáginas da Nativaram Brasil.
 * Suporta tanto props tradicionais quanto o padrão Composto (Compound Components)
 * de acordo com as diretrizes da Vercel.
 */
export const PageHero = ({
  badgeIcon,
  badgeText,
  title,
  description,
  maxWidth = "max-w-5xl",
  className,
  children,
  ...props
}: PageHeroProps) => {
  // Se for utilizado no padrão legado (com title fornecido via prop)
  const isLegacy = Boolean(title);

  return (
    <section
      className={cn("relative overflow-hidden py-section-lg lg:py-section-xl", className)}
      {...props}
    >
      {/* Glow radial dourado solar */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-ambar-500/[0.07] rounded-full blur-[130px] pointer-events-none" />

      <div className={cn("relative mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6", maxWidth)}>
        {isLegacy ? (
          <>
            {badgeText && (
              <AnimateOnScroll>
                <div className="inline-flex items-center gap-2 rounded-full border border-ambar-500/25 bg-floresta-900/80 backdrop-blur-md px-4 py-1.5 text-[11px] font-semibold tracking-[0.15em] text-ambar-400 uppercase shadow-sm">
                  {badgeIcon}
                  <span>{badgeText}</span>
                </div>
              </AnimateOnScroll>
            )}

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
          </>
        ) : (
          children
        )}
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════
   COMPOUND SUBCOMPONENTS (VERCEL COMPOSITION)
   ═══════════════════════════════════════════════ */

interface PageHeroBadgeProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  text?: string;
  children?: ReactNode;
}
const PageHeroBadge = ({ icon, text, className, children, ...props }: PageHeroBadgeProps) => (
  <AnimateOnScroll>
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-ambar-500/30 bg-floresta-900/80 backdrop-blur-md px-4 py-1.5 text-[11px] font-semibold tracking-[0.15em] text-ambar-400 uppercase shadow-solar",
        className
      )}
      {...props}
    >
      {icon}
      {text && <span>{text}</span>}
      {children}
    </div>
  </AnimateOnScroll>
);

interface PageHeroTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}
const PageHeroTitle = ({ className, children, ...props }: PageHeroTitleProps) => (
  <AnimateOnScroll delay={150}>
    <h1
      className={cn(
        "font-serif text-display-md sm:text-display-lg lg:text-display-xl font-bold text-areia-100 text-glow leading-[1.08]",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  </AnimateOnScroll>
);

interface PageHeroDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}
const PageHeroDescription = ({ className, children, ...props }: PageHeroDescriptionProps) => (
  <AnimateOnScroll delay={300}>
    <p
      className={cn(
        "text-base sm:text-lg text-areia-300 max-w-2xl mx-auto leading-relaxed font-light",
        className
      )}
      {...props}
    >
      {children}
    </p>
  </AnimateOnScroll>
);

interface PageHeroActionsProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
const PageHeroActions = ({ className, children, ...props }: PageHeroActionsProps) => (
  <AnimateOnScroll delay={450}>
    <div
      className={cn(
        "flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  </AnimateOnScroll>
);

interface PageHeroFootnoteProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}
const PageHeroFootnote = ({ className, children, ...props }: PageHeroFootnoteProps) => (
  <AnimateOnScroll delay={600}>
    <p
      className={cn(
        "text-[11px] text-areia-400 font-mono flex items-center justify-center gap-2 pt-2",
        className
      )}
      {...props}
    >
      {children}
    </p>
  </AnimateOnScroll>
);

PageHero.Badge = PageHeroBadge;
PageHero.Title = PageHeroTitle;
PageHero.Description = PageHeroDescription;
PageHero.Actions = PageHeroActions;
PageHero.Footnote = PageHeroFootnote;

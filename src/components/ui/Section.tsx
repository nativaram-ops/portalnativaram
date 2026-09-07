import React, { type ReactNode, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

/* ═══════════════════════════════════════════════
   SECTION ROOT
   ═══════════════════════════════════════════════ */
export interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: "default" | "dark" | "gradient" | "glass";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  glow?: boolean;
  maxWidth?: string;
  children: ReactNode;
}

const variantStyles: Record<NonNullable<SectionProps["variant"]>, string> = {
  default: "bg-transparent",
  dark: "bg-floresta-950",
  gradient: "bg-gradient-to-b from-floresta-950 via-floresta-900/40 to-floresta-950",
  glass: "bg-floresta-950/80 backdrop-blur-md",
};

const paddingStyles: Record<NonNullable<SectionProps["padding"]>, string> = {
  none: "py-0",
  sm: "py-section-sm",
  md: "py-section-md",
  lg: "py-section-lg",
  xl: "py-section-xl",
};

export const Section = ({
  variant = "default",
  padding = "md",
  glow = false,
  maxWidth = "max-w-7xl",
  className,
  children,
  id,
  ...props
}: SectionProps) => {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden",
        variantStyles[variant],
        paddingStyles[padding],
        className
      )}
      {...props}
    >
      {/* Glow radial opcional */}
      {glow && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-ambar-500/[0.06] rounded-full blur-[130px] pointer-events-none" />
      )}

      <div className={cn("relative mx-auto px-4 sm:px-6 lg:px-8", maxWidth)}>
        {children}
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════
   SECTION SUBCOMPONENTS
   ═══════════════════════════════════════════════ */

interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  align?: "center" | "left";
  maxWidth?: string;
  children: ReactNode;
}
const SectionHeader = ({
  align = "center",
  maxWidth = "max-w-3xl",
  className,
  children,
  ...props
}: SectionHeaderProps) => (
  <AnimateOnScroll>
    <div
      className={cn(
        "space-y-3 mb-12 sm:mb-16",
        align === "center" ? "mx-auto text-center" : "text-left",
        maxWidth,
        className
      )}
      {...props}
    >
      {children}
    </div>
  </AnimateOnScroll>
);

interface SectionBadgeProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
const SectionBadge = ({ className, children, ...props }: SectionBadgeProps) => (
  <div
    className={cn(
      "text-[11px] font-bold uppercase tracking-[0.2em] text-ambar-400 flex items-center gap-2 justify-center",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

interface SectionTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3";
  children: ReactNode;
}
const SectionTitle = ({
  as: Component = "h2",
  className,
  children,
  ...props
}: SectionTitleProps) => (
  <Component
    className={cn(
      "font-serif text-display-sm sm:text-display-md font-bold text-areia-100 leading-tight",
      className
    )}
    {...props}
  >
    {children}
  </Component>
);

interface SectionDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}
const SectionDescription = ({
  className,
  children,
  ...props
}: SectionDescriptionProps) => (
  <p
    className={cn(
      "text-xs sm:text-sm text-areia-300 max-w-2xl mx-auto leading-relaxed font-light",
      className
    )}
    {...props}
  >
    {children}
  </p>
);

interface SectionContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
const SectionContent = ({ className, children, ...props }: SectionContentProps) => (
  <div className={cn("relative", className)} {...props}>
    {children}
  </div>
);

Section.Header = SectionHeader;
Section.Badge = SectionBadge;
Section.Title = SectionTitle;
Section.Description = SectionDescription;
Section.Content = SectionContent;

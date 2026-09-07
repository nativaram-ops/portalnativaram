import React, { type ReactNode, type ElementType } from "react";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════
   CARD ROOT
   ═══════════════════════════════════════════════ */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "liturgico" | "elevated" | "editorial" | "solar" | "flat";
  glow?: boolean;
  hover?: boolean;
  as?: ElementType;
  children: ReactNode;
}

const variantStyles: Record<NonNullable<CardProps["variant"]>, string> = {
  liturgico: "card-liturgico rounded-2xl p-6 sm:p-8",
  elevated: "card-elevated rounded-2xl p-6 sm:p-8",
  editorial: "card-editorial py-2",
  solar: "glass-solar rounded-2xl p-6 sm:p-8 border-glow-amber",
  flat: "bg-floresta-950/80 border border-ambar-500/15 rounded-2xl p-6",
};

export const Card = ({
  variant = "liturgico",
  glow = false,
  hover = true,
  as: Component = "div",
  className,
  children,
  ...props
}: CardProps) => {
  return (
    <Component
      className={cn(
        variantStyles[variant],
        glow && "glow-solar",
        !hover && "transform-none hover:transform-none hover:border-current hover:shadow-none",
        "flex flex-col justify-between transition-all duration-500",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

/* ═══════════════════════════════════════════════
   CARD SUBCOMPONENTS (COMPOUND PATTERN)
   ═══════════════════════════════════════════════ */

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
const CardHeader = ({ className, children, ...props }: CardHeaderProps) => (
  <div className={cn("flex items-center justify-between gap-4 mb-4", className)} {...props}>
    {children}
  </div>
);

interface CardIconProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
const CardIcon = ({ className, children, ...props }: CardIconProps) => (
  <div
    className={cn(
      "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ambar-500/15 border border-ambar-500/30 text-ambar-300 shadow-sm transition-transform duration-300 group-hover:scale-105",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

interface CardBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}
const CardBadge = ({ className, children, ...props }: CardBadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center gap-1.5 rounded-full border border-ambar-500/25 bg-floresta-950/80 px-2.5 py-1 text-[10px] font-mono font-bold tracking-wider text-ambar-400 uppercase",
      className
    )}
    {...props}
  >
    {children}
  </span>
);

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h2" | "h3" | "h4" | "h5" | "h6";
  children: ReactNode;
}
const CardTitle = ({ as: Component = "h3", className, children, ...props }: CardTitleProps) => (
  <Component
    className={cn(
      "font-serif text-lg sm:text-xl font-bold text-areia-100 tracking-tight leading-snug",
      className
    )}
    {...props}
  >
    {children}
  </Component>
);

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}
const CardDescription = ({ className, children, ...props }: CardDescriptionProps) => (
  <p
    className={cn(
      "text-xs sm:text-sm text-areia-300 leading-relaxed font-light mt-2",
      className
    )}
    {...props}
  >
    {children}
  </p>
);

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
const CardContent = ({ className, children, ...props }: CardContentProps) => (
  <div className={cn("space-y-3 my-auto", className)} {...props}>
    {children}
  </div>
);

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
const CardFooter = ({ className, children, ...props }: CardFooterProps) => (
  <div
    className={cn(
      "pt-4 mt-4 border-t border-ambar-500/15 flex items-center justify-between text-xs text-areia-400 font-mono",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

// Compound Component Assignment
Card.Header = CardHeader;
Card.Icon = CardIcon;
Card.Badge = CardBadge;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

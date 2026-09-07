import React, { type ReactNode, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "solar" | "emerald" | "floresta" | "outline";
  size?: "sm" | "md";
  dot?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

const variantStyles: Record<NonNullable<BadgeProps["variant"]>, string> = {
  solar: "border-ambar-500/30 bg-ambar-500/10 text-ambar-300 shadow-sm",
  emerald: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 shadow-sm",
  floresta: "border-ambar-500/20 bg-floresta-950/80 text-ambar-400",
  outline: "border-areia-400/20 bg-transparent text-areia-300",
};

const dotStyles: Record<NonNullable<BadgeProps["variant"]>, string> = {
  solar: "bg-ambar-400 animate-pulse",
  emerald: "bg-emerald-400 animate-pulse",
  floresta: "bg-ambar-400",
  outline: "bg-areia-400",
};

export const Badge = ({
  variant = "solar",
  size = "md",
  dot = false,
  icon,
  className,
  children,
  ...props
}: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-mono font-semibold tracking-wider uppercase backdrop-blur-md transition-colors",
        size === "sm" ? "px-2.5 py-0.5 text-[10px]" : "px-3.5 py-1 text-[11px]",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full shrink-0",
            dotStyles[variant]
          )}
        />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

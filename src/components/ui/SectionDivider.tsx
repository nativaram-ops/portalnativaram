import React from "react";

interface SectionDividerProps {
  variant?: "solar" | "minimal" | "floresta" | "botanical";
  className?: string;
}

export const SectionDivider = ({
  variant = "solar",
  className = "",
}: SectionDividerProps) => {
  if (variant === "minimal") {
    return <div className={`divider-minimal my-8 ${className}`} />;
  }

  if (variant === "floresta" || variant === "botanical") {
    return (
      <div className={`flex items-center justify-center gap-4 my-12 ${className}`}>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-floresta-600/40" />
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="text-sage-500 opacity-50"
          aria-hidden="true"
        >
          <path
            d="M12 2L14 8L20 8L15 12L17 18L12 14L7 18L9 12L4 8L10 8Z"
            fill="currentColor"
          />
        </svg>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-floresta-600/40" />
      </div>
    );
  }

  // Default: solar
  return <div className={`divider-solar my-12 ${className}`} />;
};

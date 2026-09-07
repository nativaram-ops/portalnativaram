import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Compõe classes Tailwind com resolução de conflitos.
 * Combina clsx (condicionais) + tailwind-merge (dedup inteligente).
 *
 * @example
 * cn("px-4 py-2", isActive && "bg-ambar-500", className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

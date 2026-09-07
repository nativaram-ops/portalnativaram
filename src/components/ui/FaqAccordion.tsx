"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export interface FaqItem {
  pergunta: string;
  resposta: string;
  destaque?: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`rounded-xl border transition-all duration-300 overflow-hidden ${
              isOpen
                ? "border-ambar-500/40 bg-floresta-900/80 shadow-solar"
                : "border-ambar-500/15 bg-floresta-950/60 hover:border-ambar-500/30"
            }`}
          >
            <button
              onClick={() => toggle(index)}
              className="w-full text-left px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-1 focus-visible:ring-ambar-400"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                    isOpen
                      ? "border-ambar-500/40 bg-ambar-500/20 text-ambar-300"
                      : "border-ambar-500/20 bg-floresta-800/40 text-ambar-400/80"
                  }`}
                >
                  <HelpCircle className="h-4 w-4" />
                </div>
                <span className="font-serif text-sm sm:text-base font-semibold text-areia-100">
                  {item.pergunta}
                </span>
              </div>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-ambar-400/80 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-ambar-300" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 text-xs sm:text-sm text-areia-300 leading-relaxed border-t border-ambar-500/10 space-y-2">
                <p>{item.resposta}</p>
                {item.destaque && (
                  <p className="text-[11px] sm:text-xs font-mono text-ambar-300/90 bg-floresta-950/80 rounded-lg p-2.5 border border-ambar-500/20">
                    💡 {item.destaque}
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

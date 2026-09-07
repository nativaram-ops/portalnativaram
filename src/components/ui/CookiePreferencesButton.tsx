"use client";

import React from "react";

export const CookiePreferencesButton: React.FC = () => {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("nativaram:open-welcome-modal"));
        }
      }}
      className="hover:text-ambar-400/70 transition-colors cursor-pointer"
    >
      Preferências de Cookies
    </button>
  );
};

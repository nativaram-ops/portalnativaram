"use client";

import { useEffect } from "react";

/** Registra o Service Worker offline do Portal do Dirigente (apenas em produção). */
export const ServiceWorkerRegister = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => undefined);
  }, []);
  return null;
};


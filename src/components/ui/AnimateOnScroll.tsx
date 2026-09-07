"use client";

import React, { useEffect, useRef, useState, type ReactNode } from "react";

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "scale";
  delay?: number;
  threshold?: number;
}

export const AnimateOnScroll = ({
  children,
  className = "",
  direction = "up",
  delay = 0,
  threshold = 0.15,
}: AnimateOnScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Se reduced motion, mostrar imediatamente
    if (prefersReducedMotion) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add("is-visible");
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold, prefersReducedMotion]);

  const directionAttr = direction !== "up" ? direction : undefined;

  return (
    <div
      ref={ref}
      className={`animate-on-scroll ${className}`}
      data-direction={directionAttr}
      style={{ transitionDelay: prefersReducedMotion ? "0ms" : `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* Stagger wrapper — animates children sequentially */
interface StaggerProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
}

export const StaggerChildren = ({
  children,
  className = "",
  threshold = 0.1,
}: StaggerProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respeitar prefers-reduced-motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -20px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={`stagger-children ${className}`}>
      {children}
    </div>
  );
};

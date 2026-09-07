"use client";

import React, { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════
   ESTILOS BASE COMPARTILHADOS
   ═══════════════════════════════════════════ */
const baseInputStyles =
  "w-full rounded-xl border border-ambar-500/20 bg-floresta-950/90 px-4 py-3 text-xs text-areia-100 placeholder-areia-400/40 focus:border-ambar-400 focus:ring-1 focus:ring-ambar-400/50 focus:outline-none transition-all";

/* ═══════════════════════════════════════════
   LABEL + ERROR WRAPPER
   ═══════════════════════════════════════════ */
interface FieldWrapperProps {
  label?: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

export const FieldWrapper = ({
  label,
  required,
  error,
  className,
  children,
}: FieldWrapperProps) => (
  <div className={cn("space-y-2", className)}>
    {label && (
      <label className="text-xs font-semibold text-areia-200">
        {label}
        {required && <span className="text-ambar-400 ml-0.5">*</span>}
      </label>
    )}
    {children}
    {error && <p className="text-[11px] text-red-400">{error}</p>}
  </div>
);

/* ═══════════════════════════════════════════
   INPUT
   ═══════════════════════════════════════════ */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  wrapperClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, required, wrapperClassName, className, ...props }, ref) => (
    <FieldWrapper label={label} required={required} error={error} className={wrapperClassName}>
      <input
        ref={ref}
        className={cn(baseInputStyles, className)}
        aria-invalid={!!error}
        {...props}
      />
    </FieldWrapper>
  )
);
Input.displayName = "Input";

/* ═══════════════════════════════════════════
   TEXTAREA
   ═══════════════════════════════════════════ */
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  wrapperClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, required, wrapperClassName, className, ...props }, ref) => (
    <FieldWrapper label={label} required={required} error={error} className={wrapperClassName}>
      <textarea
        ref={ref}
        className={cn(baseInputStyles, className)}
        aria-invalid={!!error}
        {...props}
      />
    </FieldWrapper>
  )
);
Textarea.displayName = "Textarea";

/* ═══════════════════════════════════════════
   SELECT
   ═══════════════════════════════════════════ */
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  wrapperClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, required, wrapperClassName, className, children, ...props }, ref) => (
    <FieldWrapper label={label} required={required} error={error} className={wrapperClassName}>
      <select
        ref={ref}
        className={cn(baseInputStyles, className)}
        {...props}
      >
        {children}
      </select>
    </FieldWrapper>
  )
);
Select.displayName = "Select";

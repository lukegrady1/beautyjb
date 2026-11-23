"use client";

import { CheckCircle2 } from "lucide-react";

export function Field({
  id,
  label,
  error,
  hint,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
        {optional && <span className="ml-1.5 font-normal text-ink-soft">(optional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-[14px] text-ink-soft">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[14px] font-medium text-accent">
          {error}
        </p>
      )}
    </div>
  );
}

/** Hidden from people, tempting to bots. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Leave this empty
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function FormSuccess({ children }: { children: React.ReactNode }) {
  return (
    <div role="status" className="card flex flex-col items-start gap-4 p-8">
      <CheckCircle2 aria-hidden size={32} strokeWidth={1.5} className="text-accent" />
      <p className="font-display text-[26px] leading-tight text-ink">{children}</p>
    </div>
  );
}

export function fieldProps(name: string, errors: Record<string, string>, hint?: boolean) {
  const describedBy = [errors[name] ? `${name}-error` : "", hint && !errors[name] ? `${name}-hint` : ""]
    .filter(Boolean)
    .join(" ");
  return {
    id: name,
    name,
    "aria-invalid": errors[name] ? (true as const) : undefined,
    "aria-describedby": describedBy || undefined,
  };
}

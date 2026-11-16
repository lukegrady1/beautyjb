"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/content/services";

/* Accordion. Draft items are filtered out by the caller (see published()). */
export function FAQ({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  if (items.length === 0) return null;

  return (
    <div className="border-t border-gold/60">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btn = `${base}-q${i}`;
        const panel = `${base}-a${i}`;
        return (
          <div key={item.q} className="border-b border-gold/60">
            <h3>
              <button
                id={btn}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left font-display text-[19px] font-semibold text-ink transition-colors hover:text-accent lg:text-[22px]"
              >
                {item.q}
                <Plus
                  aria-hidden
                  size={22}
                  strokeWidth={1.5}
                  className={`shrink-0 text-accent transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                />
              </button>
            </h3>
            <div id={panel} role="region" aria-labelledby={btn} hidden={!isOpen} className="max-w-[680px] pb-6">
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

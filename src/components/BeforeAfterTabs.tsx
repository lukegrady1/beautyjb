"use client";

import { useRef, useState } from "react";
import type { Photo } from "@/content/services";
import { BeforeAfterSlider } from "./BeforeAfterSlider";

/* Before/after slider tabbed by service (ARIA tabs pattern, arrow-key navigation). */
export type BeforeAfterTab = { slug: string; name: string; before: Photo; after: Photo; alt: string };

export function BeforeAfterTabs({ tabs: list }: { tabs: BeforeAfterTab[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  if (list.length === 0) return null;

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = list.length;
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % n;
    else if (e.key === "ArrowLeft") next = (i - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  const s = list[active];

  return (
    <div>
      <div role="tablist" aria-label="Before and after by service" className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 sm:mx-0 sm:flex-wrap sm:px-0">
        {list.map((svc, i) => (
          <button
            key={svc.slug}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            id={`ba-tab-${svc.slug}`}
            aria-selected={i === active}
            aria-controls={`ba-panel-${svc.slug}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
            className={`shrink-0 rounded-pill border px-5 py-2.5 text-[14px] font-semibold transition-colors ${
              i === active ? "border-accent bg-accent text-on-accent" : "border-line text-ink hover:border-gold"
            }`}
          >
            {svc.name}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`ba-panel-${s.slug}`} aria-labelledby={`ba-tab-${s.slug}`} className="mt-8">
        <BeforeAfterSlider key={s.slug} before={s.before} after={s.after} label={s.alt} className="aspect-[4/5] sm:aspect-[3/2]" />
      </div>
    </div>
  );
}

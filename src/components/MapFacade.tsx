"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

/*
  Map behind a click: no Google iframe (or its ~500KB of JS) loads until the
  visitor asks for it. Renders nothing until the address is known.
*/
export function MapFacade({ query, title = "Map to the studio" }: { query: string | null; title?: string }) {
  const [loaded, setLoaded] = useState(false);
  if (!query) return null;

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-line bg-bg-alt">
      {loaded ? (
        <iframe
          title={title}
          src={`https://www.google.com/maps?q=${query}&output=embed`}
          className="absolute inset-0 h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="group absolute inset-0 flex flex-col items-center justify-center gap-3 text-ink"
        >
          <span aria-hidden className="absolute inset-0 opacity-60" style={{
            backgroundImage:
              "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }} />
          <MapPin aria-hidden size={36} strokeWidth={1.5} className="relative text-accent" />
          <span className="relative rounded-pill border border-ink bg-bg px-5 py-2.5 text-[14px] font-semibold transition-colors group-hover:bg-ink group-hover:text-bg">
            Show map
          </span>
        </button>
      )}
    </div>
  );
}

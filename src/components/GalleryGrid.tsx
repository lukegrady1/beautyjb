"use client";

import { useState } from "react";
import type { Photo as PhotoT } from "@/content/services";
import { Lightbox } from "./Lightbox";
import { Photo } from "./Photo";

type Item = PhotoT & { category?: string };
type Filter = { id: string; label: string };

/*
  Masonry grid (CSS columns) with optional filter chips and a lightbox.
  Used on /gallery/ (filtered) and the Weddings updo & curl gallery.
*/
export function GalleryGrid({ items, filters }: { items: Item[]; filters?: Filter[] }) {
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState<number | null>(null);
  const shown = filter === "all" ? items : items.filter((i) => i.category === filter);

  return (
    <div>
      {filters && (
        <div role="group" aria-label="Filter gallery" className="no-scrollbar -mx-6 mb-10 flex gap-2 overflow-x-auto px-6 sm:mx-0 sm:flex-wrap sm:px-0">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`shrink-0 rounded-pill border px-5 py-2.5 text-[14px] font-semibold transition-colors ${
                filter === f.id ? "border-accent bg-accent text-on-accent" : "border-line text-ink hover:border-gold"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} images
      </p>
      <ul className="columns-2 gap-3 sm:gap-4 lg:columns-3">
        {shown.map((item, i) => (
          <li key={`${item.label}-${i}`} className="mb-3 break-inside-avoid sm:mb-4">
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group block w-full overflow-hidden rounded-sm"
            >
              <Photo
                photo={item}
                sizes="(min-width: 1024px) 380px, 50vw"
                className="w-full transition-transform duration-500 group-hover:scale-[1.02]"
                style={{ aspectRatio: `${item.width ?? 4} / ${item.height ?? 5}` }}
              />
              <span className="sr-only">Open image</span>
            </button>
          </li>
        ))}
      </ul>
      {open !== null && <Lightbox items={shown} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </div>
  );
}

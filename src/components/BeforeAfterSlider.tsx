"use client";

import { useId, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Photo as PhotoT } from "@/content/services";
import { Photo } from "./Photo";

/*
  Draggable before/after comparison. A native range input covers the whole
  image, so pointer drag, touch and keyboard (arrows, Home/End, PageUp/Down)
  all work and screen readers announce the position. The gold handle is
  decorative.
*/
export function BeforeAfterSlider({
  before,
  after,
  label,
  className = "aspect-[4/5]",
}: {
  before: PhotoT;
  after: PhotoT;
  label: string;
  className?: string;
}) {
  const [pos, setPos] = useState(50);
  const id = useId();

  return (
    <div className={`relative select-none overflow-hidden rounded-sm ${className}`}>
      <Photo photo={after} className="absolute inset-0" sizes="(min-width: 1024px) 560px, 100vw" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Photo photo={before} className="absolute inset-0" sizes="(min-width: 1024px) 560px, 100vw" />
      </div>

      <span className="pointer-events-none absolute top-4 left-4 rounded-pill bg-ink/80 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-on-ink">
        Before
      </span>
      <span className="pointer-events-none absolute top-4 right-4 rounded-pill bg-ink/80 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-on-ink">
        After
      </span>

      <div aria-hidden className="pointer-events-none absolute inset-y-0 w-0.5 bg-bg" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-bg-alt shadow-lift text-accent">
          <ChevronLeft size={16} strokeWidth={1.5} />
          <ChevronRight size={16} strokeWidth={1.5} />
        </div>
      </div>

      <label htmlFor={id} className="sr-only">
        {label}: drag to compare before and after
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        step={1}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-valuetext={`${pos}% before`}
        className="peer absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-sm peer-focus-visible:outline-2 peer-focus-visible:outline-offset-[-4px] peer-focus-visible:outline-gold" />
    </div>
  );
}

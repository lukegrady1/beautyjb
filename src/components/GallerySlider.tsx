"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/*
  Home page gallery: a scroll-snap strip of every gallery photo with arrow
  buttons and a slow auto-advance. Native scrolling means swipe works on touch
  and the strip is usable before hydration; the script only adds the arrows'
  behavior and the timer. Auto-advance pauses while the strip is hovered,
  focused, being dragged, or off screen, and never runs for people who prefer
  reduced motion. At the end it wraps back to the first photo.
*/
const INTERVAL_MS = 3800;

export function GallerySlider({
  items,
}: {
  items: { src: string; alt: string }[];
}) {
  const track = useRef<HTMLUListElement>(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);

  const step = useCallback((dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const first = el.querySelector("li");
    if (!first) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const slide = first.getBoundingClientRect().width + gap;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - slide / 2;
    const atStart = el.scrollLeft <= slide / 2;
    if (dir === 1 && atEnd) el.scrollTo({ left: 0, behavior: "smooth" });
    else if (dir === -1 && atStart)
      el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
    else el.scrollBy({ left: dir * slide, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.4,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => step(1), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, visible, step]);

  const pause = () => setPaused(true);
  const resume = () => setPaused(false);

  return (
    <div
      className="relative mt-10"
      aria-roledescription="carousel"
      aria-label="Recent work"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
      onTouchStart={pause}
      onTouchEnd={resume}
    >
      <ul
        ref={track}
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth sm:gap-4"
      >
        {items.map((g) => (
          <li
            key={g.src}
            className="relative aspect-[4/5] w-[68%] shrink-0 snap-start overflow-hidden rounded-2xl border border-line bg-bg-deep sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-3rem)/4)]"
          >
            <Image
              src={g.src}
              alt={g.alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 68vw"
              className="object-cover"
            />
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => step(-1)}
        aria-label="Previous photos"
        className="slider-arrow left-3 sm:left-4"
      >
        <ChevronLeft size={20} strokeWidth={2.25} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => step(1)}
        aria-label="Next photos"
        className="slider-arrow right-3 sm:right-4"
      >
        <ChevronRight size={20} strokeWidth={2.25} aria-hidden="true" />
      </button>
    </div>
  );
}

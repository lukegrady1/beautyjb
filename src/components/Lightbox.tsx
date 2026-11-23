"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Photo as PhotoT } from "@/content/services";
import { Photo } from "./Photo";

/*
  Accessible lightbox: focus trapped inside, Esc closes, arrow keys and
  horizontal swipe move between images, focus returns to the opener.
*/
export function Lightbox({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: PhotoT[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const n = items.length;
  const prev = () => onIndex((index - 1 + n) % n);
  const next = () => onIndex((index + 1) % n);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.querySelector<HTMLElement>("[data-close]")?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      opener?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onIndex((index - 1 + n) % n);
      else if (e.key === "ArrowRight") onIndex((index + 1) % n);
      else if (e.key === "Tab" && ref.current) {
        const f = ref.current.querySelectorAll<HTMLElement>("button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, n, onClose, onIndex]);

  const item = items[index];
  const btn = "inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/40 text-on-ink transition-colors hover:bg-white hover:text-ink";

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${index + 1} of ${n}: ${item.alt}`}
      className="fixed inset-0 z-[70] flex flex-col bg-ink/95"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
        touchX.current = null;
      }}
    >
      <div className="flex items-center justify-between px-4 py-4 text-on-ink sm:px-8">
        <p className="text-[14px] font-medium" aria-live="polite">
          {index + 1} / {n}
        </p>
        <button type="button" data-close onClick={onClose} className={btn} aria-label="Close">
          <X aria-hidden size={22} strokeWidth={1.5} />
        </button>
      </div>
      <div className="flex min-h-0 flex-1 items-center justify-center gap-4 px-4 pb-6 sm:px-8" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <button type="button" onClick={prev} className={`${btn} hidden shrink-0 sm:inline-flex`} aria-label="Previous image">
          <ChevronLeft aria-hidden size={22} strokeWidth={1.5} />
        </button>
        <Photo
          photo={item}
          sizes="90vw"
          className="aspect-[4/5] max-h-full w-full max-w-[min(90vw,calc((100dvh-140px)*0.8))] rounded-sm"
        />
        <button type="button" onClick={next} className={`${btn} hidden shrink-0 sm:inline-flex`} aria-label="Next image">
          <ChevronRight aria-hidden size={22} strokeWidth={1.5} />
        </button>
      </div>
      <div className="flex justify-center gap-4 pb-[max(20px,env(safe-area-inset-bottom))] sm:hidden">
        <button type="button" onClick={prev} className={btn} aria-label="Previous image">
          <ChevronLeft aria-hidden size={22} strokeWidth={1.5} />
        </button>
        <button type="button" onClick={next} className={btn} aria-label="Next image">
          <ChevronRight aria-hidden size={22} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

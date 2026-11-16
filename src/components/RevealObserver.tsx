"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/*
  One observer for the whole site: any element with `data-reveal` fades up
  12px the first time it scrolls into view. Stagger with
  style={{ "--reveal-delay": "60ms" }}. CSS turns it all off under
  prefers-reduced-motion, and nothing is hidden until the `js` class is set.
*/
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}


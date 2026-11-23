"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, Phone, X } from "lucide-react";
import { nav, phone, telHref } from "@/lib/site";
import { BookButton } from "./Button";
import { Logo } from "./Logo";

/*
  Full-screen menu, Book pinned at the bottom. Portalled to <body>: the header's
  backdrop-blur makes it the containing block for fixed children, which would
  otherwise trap this "fixed inset-0" panel inside the 80px header bar.
*/
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    const toggle = toggleRef.current;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>("a, button");
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
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-ink lg:hidden"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <Menu aria-hidden size={26} strokeWidth={1.5} />
      </button>

      {open &&
        createPortal(
          <div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            tabIndex={-1}
            className="outline-none fixed inset-0 z-[60] flex flex-col bg-bg lg:hidden"
          >
            <div className="container-x flex h-20 items-center justify-between border-b border-line/70">
              <Link href="/" onClick={() => setOpen(false)} aria-label="Beauty JB home">
                <Logo />
              </Link>
              <button
                type="button"
                className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-ink"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X aria-hidden size={26} strokeWidth={1.5} />
              </button>
            </div>
            <nav aria-label="Mobile" className="container-x flex-1 overflow-y-auto pt-4">
              <ul>
                <li className="border-b border-line">
                  <Link href="/" className="block py-4 text-[26px] font-semibold tracking-[-0.015em] text-ink">
                    Home
                  </Link>
                </li>
                {nav.map((item) => {
                  const active = pathname.startsWith(item.href);
                  return (
                    <li key={item.href} className="border-b border-line">
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={`block py-4 text-[26px] font-semibold tracking-[-0.015em] ${active ? "text-accent" : "text-ink"}`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="container-x flex flex-col gap-3 pb-[max(24px,env(safe-area-inset-bottom))] pt-4">
              {phone && (
                <a href={telHref(phone)} className="btn btn-secondary w-full">
                  <Phone aria-hidden size={18} strokeWidth={1.5} /> Call {phone}
                </a>
              )}
              <BookButton className="w-full" />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

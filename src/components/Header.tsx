"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { nav, phone, telHref } from "@/lib/site";
import { BookButton } from "./Button";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { TrimBar } from "./TrimBar";

export function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="sticky top-0 z-50">
      <TrimBar />
      <header
        className={`border-b bg-bg/92 backdrop-blur-md transition-colors duration-300 ${
          scrolled ? "border-line" : "border-transparent"
        }`}
      >
        <div className="container-x flex h-[68px] items-center justify-between gap-6 lg:h-[80px]">
          <Link href="/" aria-label="Beauty JB home" className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-7 xl:gap-9">
              {nav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative py-2 text-[15px] font-medium transition-colors hover:text-accent ${
                        active ? "text-ink" : "text-ink-soft"
                      }`}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left bg-accent transition-transform duration-300 ${
                          active ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {phone && (
              <a
                href={telHref(phone)}
                className="hidden items-center gap-2 rounded-pill border border-line px-4 py-2.5 text-[14px] font-semibold text-ink transition-colors hover:border-gold xl:inline-flex"
              >
                <Phone aria-hidden size={16} strokeWidth={1.5} className="text-accent" />
                {phone}
              </a>
            )}
            <BookButton className="hidden !min-h-11 !px-6 !py-3 sm:inline-flex" arrow={false} />
            <MobileMenu />
          </div>
        </div>
      </header>
    </div>
  );
}

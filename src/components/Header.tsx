"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { nav, phone, telHref } from "@/lib/site";
import { BookButton } from "./Button";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

export function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href);
}

/*
  Sticky header, Stevie Cain pattern: beige glass bar, logo left, links
  centre, phone + Book pills right. On a phone: logo, Book, menu.
*/
export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-bg/85 backdrop-blur-md">
      <div className="container-x flex h-20 items-center justify-between gap-4 md:h-24">
        <Link href="/" aria-label="Beauty JB home" className="shrink-0 rounded-lg">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-full px-3.5 py-2 text-[15px] font-semibold transition-colors ${
                      active ? "bg-accent-tint text-accent" : "text-ink hover:text-accent"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {phone && (
            <a href={telHref(phone)} className="btn btn-secondary btn-sm !hidden !px-3 sm:!inline-flex md:!px-4" aria-label={`Call ${phone}`}>
              <Phone aria-hidden size={18} strokeWidth={2} />
              <span className="hidden xl:inline">{phone}</span>
            </a>
          )}
          <BookButton label="Book Now" className="btn-sm" arrow={false} />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

"use client";

import { useEffect, useState } from "react";
import { CalendarHeart, Phone } from "lucide-react";
import { bookHref, bookingIsExternal, phone, telHref } from "@/lib/site";

/*
  Phones only (≤768px): two equal buttons, Call and Book, pinned to the
  bottom once the visitor scrolls past the hero. Her clients are on phones.
*/
export function MobileActionBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div aria-hidden className="h-[76px] md:hidden" />
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-300 md:hidden ${
          show ? "translate-y-0" : "translate-y-full"
        }`}
        aria-hidden={!show}
        inert={!show}
      >
        <div className="flex gap-3">
          {phone && (
            <a href={telHref(phone)} className="btn btn-secondary flex-1 !px-4">
              <Phone aria-hidden size={18} strokeWidth={1.5} /> Call
            </a>
          )}
          <a
            href={bookHref}
            className="btn btn-primary flex-1 !px-4"
            {...(bookingIsExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            <CalendarHeart aria-hidden size={18} strokeWidth={1.5} /> Book
          </a>
        </div>
      </div>
    </>
  );
}

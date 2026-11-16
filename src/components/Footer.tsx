import Link from "next/link";
import { Mail, MapPin, Phone, Star } from "lucide-react";
import { site } from "@/content/site.config";
import {
  addressLines,
  directionsUrl,
  email,
  formatTime,
  legalNav,
  nav,
  phone,
  socialLinks,
  telHref,
} from "@/lib/site";
import { isSet } from "@/lib/site";
import { Logo } from "./Logo";
import { TrimBar } from "./TrimBar";

export function Footer() {
  const hasVisit = addressLines.length > 0 || site.hours.length > 0;
  const linkCls = "transition-colors hover:text-gold-soft";

  return (
    <footer className="on-ink">
      <TrimBar />
      <div className="container-x pt-16 pb-10 lg:pt-20">
        <div className={`grid gap-12 sm:grid-cols-2 ${hasVisit ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
          <div>
            <Link href="/" aria-label="Beauty JB home">
              <Logo onInk />
            </Link>
            <p className="mt-5 max-w-[280px] text-[15px] leading-relaxed">
              Hair design by {site.owner}. {site.yearsExperience} years of artistry in color, cuts and bridal hair.
            </p>
          </div>

          {hasVisit && (
            <div>
              <h2 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-gold-soft">Visit</h2>
              {addressLines.length > 0 && (
                <address className="mt-5 text-[15px] not-italic leading-relaxed">
                  {addressLines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                  {directionsUrl && (
                    <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className={`mt-2 inline-flex items-center gap-2 text-on-ink ${linkCls}`}>
                      <MapPin aria-hidden size={16} strokeWidth={1.5} className="text-gold" /> Map &amp; directions
                    </a>
                  )}
                </address>
              )}
              {site.hours.length > 0 && (
                <dl className="mt-5 space-y-1 text-[15px]">
                  {site.hours.map((h) => (
                    <div key={h.day} className="flex justify-between gap-4">
                      <dt>{h.day}</dt>
                      <dd className="text-on-ink">
                        {formatTime(h.open)} – {formatTime(h.close)}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          )}

          <div>
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-gold-soft">Explore</h2>
            <ul className="mt-5 space-y-2.5 text-[15px]">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className={linkCls}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-gold-soft">Connect</h2>
            <address className="mt-5 space-y-2.5 text-[15px] not-italic">
              {phone && (
                <a href={telHref(phone)} className={`flex items-center gap-2.5 ${linkCls}`}>
                  <Phone aria-hidden size={16} strokeWidth={1.5} className="text-gold" /> {phone}
                </a>
              )}
              {email && (
                <a href={`mailto:${email}`} className={`flex items-center gap-2.5 ${linkCls}`}>
                  <Mail aria-hidden size={16} strokeWidth={1.5} className="text-gold" /> {email}
                </a>
              )}
              {socialLinks.map(([name, url]) => (
                <a key={name} href={url} target="_blank" rel="noopener noreferrer" className={`block ${linkCls}`}>
                  {name}
                </a>
              ))}
              {isSet(site.social.googleReview) && (
                <a href={site.social.googleReview} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2.5 ${linkCls}`}>
                  <Star aria-hidden size={16} strokeWidth={1.5} className="text-gold" /> Leave a Google review
                </a>
              )}
              <Link href="/contact/" className={`block ${linkCls}`}>
                Book a consultation
              </Link>
            </address>
          </div>
        </div>

        <div className="mt-14 h-px bg-gold/50" aria-hidden />
        <div className="mt-6 flex flex-col gap-3 text-[13px] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalNav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className={linkCls}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

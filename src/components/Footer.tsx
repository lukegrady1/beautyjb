import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone, Star, type LucideIcon } from "lucide-react";
import { site } from "@/content/site.config";
import { addressLines, directionsUrl, email, formatTime, legalNav, nav, phone, socialLinks, telHref } from "@/lib/site";
import { isSet } from "@/lib/site";
import { BookButton } from "./Button";
import { Logo } from "./Logo";

const socialIcons: Record<string, LucideIcon | undefined> = { Instagram, Facebook };

/* Deep wine footer (Stevie's sage-deep footer): brand + visit, links, CTAs. */
export function Footer() {
  const linkCls = "text-on-ink transition-colors hover:text-gold-soft";
  const outlineLight = "btn text-white shadow-[inset_0_0_0_1.5px_rgb(255_255_255/0.55)] hover:bg-white/10";

  return (
    <footer className="bg-accent-deep py-12 text-on-ink sm:py-16">
      <div className="container-x grid gap-10 md:grid-cols-[1.2fr_0.8fr_auto]">
        <div>
          <Link href="/" aria-label="Beauty JB home" className="inline-flex rounded-3xl bg-bg p-4">
            <Logo />
          </Link>
          <p className="mt-4 max-w-sm text-on-ink-soft">
            Hair design by {site.owner}. {site.yearsExperience} years of artistry in color, cuts and bridal hair.
          </p>
          <address className="mt-5 space-y-1.5 text-sm not-italic">
            {addressLines.map((l) => (
              <p key={l}>{l}</p>
            ))}
            {directionsUrl && (
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 ${linkCls}`}>
                <MapPin aria-hidden size={16} /> Map &amp; directions
              </a>
            )}
            {phone && (
              <p>
                <a href={telHref(phone)} className={`inline-flex items-center gap-2 font-semibold ${linkCls}`}>
                  <Phone aria-hidden size={16} /> {phone}
                </a>
              </p>
            )}
            {email && (
              <p>
                <a href={`mailto:${email}`} className={`inline-flex items-center gap-2 ${linkCls}`}>
                  <Mail aria-hidden size={16} /> {email}
                </a>
              </p>
            )}
          </address>
          {site.hours.length > 0 && (
            <dl className="mt-5 max-w-xs space-y-1 text-sm">
              {site.hours.map((h) => (
                <div key={h.day} className="flex justify-between gap-4">
                  <dt>{h.day}</dt>
                  <dd>
                    {formatTime(h.open)} – {formatTime(h.close)}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className={linkCls}>
                  {n.label}
                </Link>
              </li>
            ))}
            {isSet(site.social.googleReview) && (
              <li>
                <a href={site.social.googleReview} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 ${linkCls}`}>
                  <Star aria-hidden size={14} /> Leave a review
                </a>
              </li>
            )}
          </ul>
          {socialLinks.length > 0 && (
            <ul className="mt-6 flex gap-2" aria-label="Social media">
              {socialLinks.map(([name, url]) => {
                const Icon = socialIcons[name];
                return (
                  <li key={name}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${site.name} on ${name}`}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white shadow-[inset_0_0_0_1.5px_rgb(255_255_255/0.45)] transition-colors hover:bg-white/10"
                    >
                      {Icon ? <Icon aria-hidden size={18} strokeWidth={1.75} /> : <span className="text-xs font-semibold">{name[0]}</span>}
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </nav>

        <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
          <BookButton label="Book Now" arrow={false} className="!bg-bg !text-accent-deep hover:!bg-white" />
          {phone ? (
            <a href={telHref(phone)} className={outlineLight}>
              Call {phone}
            </a>
          ) : (
            <Link href="/weddings/" className={outlineLight}>
              Wedding Hair
            </Link>
          )}
        </div>
      </div>

      <div className="container-x mt-10">
        <div className="flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-on-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {legalNav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="transition-colors hover:text-gold-soft">
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

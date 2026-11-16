import { site } from "@/content/site.config";
import type { FaqItem } from "@/content/services";
import { published } from "@/content/faq";
import {
  city,
  email,
  hasAddress,
  isSet,
  phone,
  region,
  serviceArea,
  siteUrl,
  socialLinks,
} from "./site";

/*
  JSON-LD builders. Everything is derived from site.config.ts, and any field
  that is still TODO/empty is omitted entirely: placeholder values must never
  reach the structured data.
*/

export const salonId = `${siteUrl}/#salon`;
export const personId = `${siteUrl}/#jennifer`;

/** Drop undefined / empty arrays / empty objects so the output stays clean. */
function clean<T>(obj: T): T {
  if (Array.isArray(obj)) return obj.map(clean).filter((v) => v !== undefined) as T;
  if (obj && typeof obj === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj)) {
      const c = clean(v);
      if (c === undefined || c === null || c === "") continue;
      if (Array.isArray(c) && c.length === 0) continue;
      out[k] = c;
    }
    return out as T;
  }
  return obj;
}

const areaServed = () => {
  const places = [...new Set([...(city ? [city] : []), ...serviceArea])];
  return places.map((name) => ({ "@type": "City", name }));
};

export function salonSchema() {
  const a = site.address;
  return clean({
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "@id": salonId,
    name: site.name,
    slogan: site.tagline,
    url: siteUrl,
    logo: isSet(site.logo) ? `${siteUrl}${site.logo}` : undefined,
    image: `${siteUrl}/opengraph-image`,
    telephone: phone ?? undefined,
    email: email ?? undefined,
    address: hasAddress
      ? {
          "@type": "PostalAddress",
          streetAddress: a.street,
          addressLocality: city,
          addressRegion: region ?? undefined,
          postalCode: isSet(a.postal) ? a.postal : undefined,
          addressCountry: a.country,
        }
      : undefined,
    geo:
      site.geo.lat != null && site.geo.lng != null
        ? { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng }
        : undefined,
    openingHoursSpecification: site.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.day,
      opens: h.open,
      closes: h.close,
    })),
    areaServed: areaServed(),
    sameAs: socialLinks.map(([, url]) => url),
    founder: { "@type": "Person", "@id": personId, name: site.owner, jobTitle: site.title },
    ...reviewSchema(),
  });
}

/** AggregateRating/Review only when real reviews exist. */
function reviewSchema() {
  const rated = site.reviews.filter((r) => typeof r.rating === "number");
  if (rated.length === 0) return {};
  const avg = rated.reduce((s, r) => s + (r.rating ?? 0), 0) / rated.length;
  return {
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avg.toFixed(1),
      reviewCount: rated.length,
    },
    review: rated.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewBody: r.text,
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
    })),
  };
}

export function personSchema() {
  return clean({
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: site.owner,
    jobTitle: site.title,
    worksFor: { "@id": salonId },
    url: `${siteUrl}/about/`,
    knowsAbout: ["Hair color", "Highlights", "Lowlights", "Razor cutting", "Dry cutting", "Bridal hair"],
  });
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: site.name,
    url: siteUrl,
    publisher: { "@id": salonId },
  };
}

export function serviceSchema(opts: { name: string; serviceType: string; description: string; path: string }) {
  return clean({
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: `${siteUrl}${opts.path}`,
    provider: { "@id": salonId },
    areaServed: areaServed(),
  });
}

export function faqSchema(items: FaqItem[]) {
  const list = published(items);
  if (list.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: list.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${siteUrl}${c.path}`,
    })),
  };
}

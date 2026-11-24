import { site } from "@/content/site.config";
import type { FaqItem, Photo } from "@/content/services";
import { services } from "@/content/services";
import { published } from "@/content/faq";
import { photos } from "@/content/photos";
import {
  city,
  email,
  hasAddress,
  isSet,
  mapQuery,
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

  Entities are linked by @id so Google reads one connected graph:
  HairSalon (#salon) ← founder/worksFor → Person (#jennifer)
  HairSalon → hasOfferCatalog → Service (/services/<slug>/#service)
  WebSite / WebPage → publisher / about → HairSalon
*/

export const salonId = `${siteUrl}/#salon`;
export const personId = `${siteUrl}/#jennifer`;
export const websiteId = `${siteUrl}/#website`;
export const serviceId = (path: string) => `${siteUrl}${path}#service`;

const abs = (src: string) => (src.startsWith("http") ? src : `${siteUrl}${src}`);

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

function imageObject(p: Photo) {
  if (!p.src) return undefined;
  return clean({
    "@type": "ImageObject",
    contentUrl: abs(p.src),
    url: abs(p.src),
    caption: p.alt,
    width: p.width,
    height: p.height,
  });
}

export function salonSchema() {
  const a = site.address;
  return clean({
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "@id": salonId,
    name: site.name,
    slogan: site.tagline,
    description: `Hair salon${city ? ` in ${city}` : ""} where hair designer ${site.owner} offers custom color, highlights and lowlights, dry razor and texture cuts, Brazilian straightening and bridal hair.`,
    url: siteUrl,
    logo: isSet(site.logo) ? abs(site.logo) : undefined,
    image: [photos.portrait.src, photos.hero.src, ...services.map((s) => s.image.src)].filter(Boolean).map(abs),
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
    hasMap: mapQuery ? `https://www.google.com/maps/search/?api=1&query=${mapQuery}` : undefined,
    openingHoursSpecification: site.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.day,
      opens: h.open,
      closes: h.close,
    })),
    areaServed: areaServed(),
    sameAs: socialLinks.map(([, url]) => url),
    founder: { "@type": "Person", "@id": personId, name: site.owner, jobTitle: site.title },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Hair services",
      itemListElement: [
        ...services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", "@id": serviceId(`/services/${s.slug}/`), name: s.name },
        })),
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", "@id": serviceId("/weddings/"), name: "Bridal & Wedding Hair" },
        },
      ],
    },
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
    description: `${site.title} with ${site.yearsExperience} years of experience in hair color, dry cutting and bridal hair.`,
    image: photos.portrait.src ? abs(photos.portrait.src) : undefined,
    worksFor: { "@id": salonId },
    url: `${siteUrl}/about/`,
    sameAs: socialLinks.map(([, url]) => url),
    knowsAbout: ["Hair color", "Highlights", "Lowlights", "Balayage", "Razor cutting", "Dry cutting", "Brazilian straightening", "Bridal hair"],
  });
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: site.name,
    url: siteUrl,
    inLanguage: "en-US",
    publisher: { "@id": salonId },
  };
}

export function serviceSchema(opts: { name: string; serviceType: string; description: string; path: string; image?: Photo }) {
  return clean({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": serviceId(opts.path),
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: `${siteUrl}${opts.path}`,
    image: opts.image ? imageObject(opts.image) : undefined,
    provider: { "@id": salonId },
    areaServed: areaServed(),
  });
}

/** WebPage subtypes (AboutPage, ContactPage, CollectionPage…) tied back to the site and salon. */
export function webPageSchema(opts: {
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  name: string;
  description: string;
  path: string;
  about?: string; // @id of the main entity
}) {
  return clean({
    "@context": "https://schema.org",
    "@type": opts.type ?? "WebPage",
    "@id": `${siteUrl}${opts.path}#webpage`,
    name: opts.name,
    description: opts.description,
    url: `${siteUrl}${opts.path}`,
    inLanguage: "en-US",
    isPartOf: { "@id": websiteId },
    about: { "@id": opts.about ?? salonId },
  });
}

/** Gallery page: an ImageGallery of every real photo, credited to the salon. */
export function imageGallerySchema(opts: { name: string; description: string; path: string; images: Photo[] }) {
  return clean({
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${siteUrl}${opts.path}#gallery`,
    name: opts.name,
    description: opts.description,
    url: `${siteUrl}${opts.path}`,
    isPartOf: { "@id": websiteId },
    about: { "@id": salonId },
    associatedMedia: opts.images.map((p) => ({ ...imageObject(p), creator: { "@id": personId } })),
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

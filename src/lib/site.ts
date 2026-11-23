import { site } from "@/content/site.config";

/** True when a config value has real content (not "TODO", not empty). */
export function isSet(v: unknown): v is string {
  return typeof v === "string" && v.trim() !== "" && !/^TODO\b/i.test(v.trim());
}

export const siteUrl = site.domain.replace(/\/$/, "");

const a = site.address;
export const city = isSet(a.city) ? a.city : null;
export const region = isSet(a.region) ? a.region : null;
export const hasAddress = isSet(a.street) && !!city;
export const phone = isSet(site.phone) ? site.phone : null;
export const email = isSet(site.email) ? site.email : null;
export const serviceArea = site.serviceArea.filter(isSet);

/** " in Springfield" or "" while the city is unknown. */
export const inCity = city ? ` in ${city}` : "";
/** " in Springfield, IL" or "". */
export const inCityState = city ? ` in ${city}${region ? `, ${region}` : ""}` : "";

export function telHref(p: string) {
  const digits = p.replace(/[^\d+]/g, "");
  return `tel:${digits.startsWith("+") ? digits : `+1${digits}`}`;
}

export const addressLines = hasAddress
  ? [a.street, `${city}${region ? `, ${region}` : ""}${isSet(a.postal) ? ` ${a.postal}` : ""}`]
  : [];

// Address only: Google doesn't know "Beauty JB" as a place yet, and the name can throw the pin off.
export const mapQuery = hasAddress ? encodeURIComponent(addressLines.join(", ")) : null;
export const directionsUrl = mapQuery ? `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}` : null;

/** Primary booking target used by every "Book" button on the site. */
export const bookingIsExternal = site.booking.type === "external" && isSet(site.booking.url);
export const bookHref = bookingIsExternal ? site.booking.url : "/contact/#book";

export const socialLinks = (
  [
    ["Instagram", site.social.instagram],
    ["Facebook", site.social.facebook],
    ["Google", site.social.googleBusiness],
    ["The Knot", site.social.theKnot],
  ] as const
).filter(([, url]) => isSet(url)) as unknown as [string, string][];

export const nav = [
  { href: "/services/", label: "Services" },
  { href: "/weddings/", label: "Weddings" },
  { href: "/about/", label: "About" },
  { href: "/gallery/", label: "Gallery" },
  { href: "/contact/", label: "Contact" },
];

export const legalNav = [
  { href: "/privacy/", label: "Privacy" },
  { href: "/terms/", label: "Terms" },
];

/** "09:00" → "9:00 am" */
export function formatTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hr = h % 12 || 12;
  return `${hr}${m ? `:${String(m).padStart(2, "0")}` : ""} ${suffix}`;
}

export { site };

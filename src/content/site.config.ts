/*
  Beauty JB: single source of truth for every client-specific fact.

  Rules:
  - Never invent anything. Unknown values stay "TODO" (strings) or empty
    (arrays / ""), and the site hides whatever depends on them.
  - `grep -rn TODO src/content` should list exactly the open items.
  - Schema (JSON-LD) is built from this file and skips any TODO/empty field.
*/

export type Hours = { day: string; open: string; close: string };
export type Review = { name: string; text: string; rating?: number; source?: string };
export type Press = { name: string; url?: string; label?: string };

export const site = {
  name: "Beauty JB", // TODO: confirm "Beauty JB" vs "Beauty by JB"
  legalName: "Beauty JB",
  owner: "Jennifer Bauduin",
  title: "Hair Designer",
  yearsExperience: 35,
  domain: "https://beautyjb.com",
  tagline: "Hair is my artistry and my passion.",
  email: "TODO", // public booking email (don't use her personal Gmail without approval)
  phone: "TODO", // display format, e.g. "(555) 123-4567"; tel: link is derived
  address: { street: "TODO", city: "TODO", region: "TODO", postal: "TODO", country: "US" },
  serviceArea: ["TODO city", "TODO nearby town"], // local SEO copy + schema areaServed
  geo: { lat: null as number | null, lng: null as number | null },
  hours: [] as Hours[], // TODO: studio hours. [{ day: "Tuesday", open: "09:00", close: "17:00" }]; hidden if empty
  booking: { type: "form" as "form" | "external", url: "" }, // TODO: booking method (form vs Vagaro/Square/etc.)
  social: { instagram: "", facebook: "", googleBusiness: "", googleReview: "", theKnot: "" },
  partner: { name: "David", note: "Flies in every two weeks to work in the studio" },
  reviews: [] as Review[], // real reviews only; section hidden when empty
  press: [] as Press[], // e.g. The Knot feature, added if/when it happens
  showPrices: false, // TODO: confirm prices with Keegan before showing any
  logo: "", // TODO: final logo (SVG in /public); <Logo /> renders a wordmark until then
};

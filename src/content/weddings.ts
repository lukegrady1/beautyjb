/*
  Weddings content. Never call the packages a "collection" (client request).
  Empty price = "Inquire" (or hidden for single services). Package lines
  that still say TODO are skipped on the page.
*/
import { ig, igWork } from "./instagram";
import { work } from "./photos";
import type { Photo } from "./services";

export type WeddingPackage = {
  name: string;
  includes: string[];
  partySize: string;
  location: string;
  price: string;
  refreshments: boolean;
};

export const weddings = {
  // true = show a "coming soon" panel instead of the package cards (details + pricing not confirmed yet).
  packagesComingSoon: true,
  packagesLabel: "Wedding Day Packages", // never "collection"; TODO: confirm final package label
  pricingNote: "Priced per service.",
  services: [
    { name: "Updo", title: "Updos", blurb: "Classic, romantic or modern, pinned to last through the last dance.", price: "" },
    { name: "Blowout", title: "Blowouts", blurb: "Smooth, full, camera-ready hair for the bride, the party and the moms.", price: "" },
    { name: "Makeup", title: "Makeup", blurb: "Polished makeup that looks like you on your best day, in person and in photos.", price: "" },
  ],
  packages: [
    { name: "The Bride", includes: ["TODO"], partySize: "1", location: "Studio or on-site", price: "", refreshments: false },
    { name: "The Bridal Party", includes: ["TODO"], partySize: "Bride + up to 6", location: "Studio or on-site", price: "", refreshments: true },
    { name: "The Full Day", includes: ["TODO"], partySize: "TODO", location: "On-site", price: "", refreshments: true },
  ] as WeddingPackage[], // TODO: wedding package details + pricing
  travelNote: "Travel fee applies for venue visits.", // TODO confirm
  heroImage: ig.halfUpBlondeWaves,
  gallery: [
    work.pearlPins,
    work.braidedCrown,
    work.ceremony,
    work.chignon,
    work.braidSide,
    work.brideFamily,
    ...igWork.filter((p) => p.category === "weddings"),
  ] as Photo[],
};

export const weddingServiceOptions = ["Updo", "Blowout", "Makeup", "Trial"];

/*
  Weddings content. Never call the packages a "collection" (client request).
  Empty price = "Inquire" (or hidden for single services). Package lines
  that still say TODO are skipped on the page.
*/
import type { Photo } from "./services";

export type WeddingPackage = {
  name: string;
  includes: string[];
  partySize: string;
  location: string;
  price: string;
  refreshments: boolean;
};

const ph = (label: string, alt: string): Photo => ({ src: "", label, alt, width: 800, height: 1000 });

export const weddings = {
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
  heroImage: ph("PHOTO: Bridal updo (hero)", "Bridal updo with soft curls by Beauty JB"),
  gallery: [
    ph("PHOTO: Bridal updo 01", "Bridal updo with soft curls by Beauty JB"),
    ph("PHOTO: Bridesmaid curls 01", "Bridesmaid hair with loose curls by Beauty JB"),
    ph("PHOTO: Low chignon", "Low chignon wedding updo by Beauty JB"),
    ph("PHOTO: Bridal updo 02", "Textured bridal updo by Beauty JB"),
    ph("PHOTO: Bridal party", "Bridal party hair styled by Beauty JB"),
    ph("PHOTO: Curls detail", "Detail of soft wedding curls by Beauty JB"),
  ] as Photo[],
};

export const weddingServiceOptions = ["Updo", "Blowout", "Makeup", "Trial"];

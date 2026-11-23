/*
  Named page photos. Empty `src` = labelled grey placeholder.
  When Jennifer's photos arrive, save them under /public/images/... with
  descriptive file names (e.g. /images/about/jennifer-bauduin-hair-designer.webp)
  and fill in src + real width/height.
*/
import { ig } from "./instagram";
import type { Photo } from "./services";

const ph = (label: string, alt: string, width = 800, height = 1000): Photo => ({ src: "", label, alt, width, height });

const real = (src: string, alt: string, width: number, height: number): Photo => ({ src, label: alt, alt, width, height });

const jennifer = real(
  "/images/about/jennifer-bauduin-hair-designer.webp",
  "Jennifer Bauduin, hair designer and owner of Beauty JB, with long dark curls",
  1350,
  1800,
);

/** Jennifer's real work (from the client's Drive, Nov 2026). */
export const work = {
  pearlPins: real("/images/weddings/updo-pearl-pins.webp", "Low curled updo with pearl pins and a fine braid, by Beauty JB", 1056, 1600),
  pearlPinsMirror: real("/images/weddings/updo-pearl-pins-mirror.webp", "Curled updo with pearl pins, seen from behind in the studio", 1209, 1600),
  chignon: real("/images/weddings/updo-curled-chignon.webp", "Curled chignon with a braided accent, by Beauty JB", 1209, 1600),
  braidedCrown: real("/images/weddings/updo-braided-crown.webp", "Braided crown flowing into a soft curled updo, by Beauty JB", 1209, 1600),
  braidSide: real("/images/weddings/updo-braid-side.webp", "Double braid sweeping into a curled updo, styled in the Beauty JB studio", 1209, 1600),
  brideFamily: real("/images/weddings/bride-with-family.webp", "Bride in a lace gown with her mother and family on the wedding day", 1097, 1600),
  ceremony: real("/images/weddings/bride-outdoor-ceremony.webp", "Bride with a textured updo at an outdoor autumn ceremony", 812, 1600),
};

export const photos = {
  // Home hero: a hair result rather than the About portrait, so the two pages don't repeat.
  hero: { ...ig.brunetteSpiralCurls, alt: "Long brunette hair with soft dimensional color, styled in spiral curls by Beauty JB" },
  portrait: jennifer,
  david: ph("PHOTO: David", "David, hair designer at the Beauty JB studio", 800, 800),
  studio: [
    ph("PHOTO: Studio wide shot", "Inside the Beauty JB hair studio", 1200, 900),
    ph("PHOTO: Studio chair detail", "Styling chair in the Beauty JB studio"),
    ph("PHOTO: Studio color bar", "Color station at the Beauty JB studio", 1000, 800),
  ],
  // Generic stock shots, one per step (free Unsplash licence). Swap for studio photos when we have them.
  experience: [
    real("/images/experience/consultation-at-the-chair.webp", "Hair designer talking through a new look with a client in the chair", 1200, 900),
    real("/images/experience/color-foil-application.webp", "Hair color being painted onto foils during a highlight service", 1200, 900),
    real("/images/experience/precision-dry-cut.webp", "Shears cutting a precise line in dry, straight hair", 1200, 900),
    real("/images/experience/blow-dry-finish.webp", "Stylist finishing a client's bob with a round brush and blow-dryer", 1200, 900),
  ],
  weddingFeature: work.pearlPins,
  inStudio: ig.braidedUpdo,
  atVenue: work.ceremony,
};

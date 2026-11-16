/*
  Named page photos. Empty `src` = labelled grey placeholder.
  When Jennifer's photos arrive, save them under /public/images/... with
  descriptive file names (e.g. /images/about/jennifer-bauduin-hair-designer.jpg)
  and fill in src + real width/height.
*/
import type { Photo } from "./services";

const ph = (label: string, alt: string, width = 800, height = 1000): Photo => ({ src: "", label, alt, width, height });

export const photos = {
  hero: ph("PHOTO: Jennifer in the studio", "Hair designer Jennifer Bauduin in the Beauty JB studio"),
  portrait: ph("PHOTO: Jennifer portrait", "Portrait of Jennifer Bauduin, hair designer and owner of Beauty JB"),
  david: ph("PHOTO: David", "David, hair designer at the Beauty JB studio", 800, 800),
  studio: [
    ph("PHOTO: Studio wide shot", "Inside the Beauty JB hair studio", 1200, 900),
    ph("PHOTO: Studio chair detail", "Styling chair in the Beauty JB studio"),
    ph("PHOTO: Studio color bar", "Color station at the Beauty JB studio", 1000, 800),
  ],
  experience: [
    ph("PHOTO: Consultation", "Jennifer Bauduin consulting with a client"),
    ph("PHOTO: Planning the look", "Planning a client's hair color with reference photos"),
    ph("PHOTO: Dry cutting", "Jennifer Bauduin dry cutting a client's hair"),
    ph("PHOTO: Blow-dry finish", "Blow-dry finish at the Beauty JB studio"),
  ],
  weddingFeature: ph("PHOTO: Bridal updo", "Bridal updo with soft curls by Beauty JB"),
  inStudio: ph("PHOTO: Bride getting ready in studio", "Bride getting ready in the Beauty JB studio", 1000, 800),
  atVenue: ph("PHOTO: On-site at a venue", "On-site wedding hair at a venue by Beauty JB", 1000, 800),
};

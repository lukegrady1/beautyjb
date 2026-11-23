/*
  Gallery images. Leave `src` empty for a labelled placeholder; once photos
  arrive, put them in /public/images/... (descriptive file names help SEO)
  and fill in src, width and height.
*/
import { ig, igWork } from "./instagram";
import { work } from "./photos";
import type { Photo } from "./services";

export type GalleryCategory = "color" | "cuts" | "before-after" | "weddings";
export type GalleryItem = {
  src: string;
  label: string;
  alt: string;
  category: GalleryCategory;
  width: number;
  height: number;
};

export const galleryCategories: { id: GalleryCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "color", label: "Color" },
  { id: "cuts", label: "Cuts" },
  { id: "before-after", label: "Before & After" },
  { id: "weddings", label: "Weddings" },
];

const fromPhoto = (category: GalleryCategory, p: Photo): GalleryItem => ({
  src: p.src,
  label: p.label,
  alt: p.alt,
  category,
  width: p.width ?? 4,
  height: p.height ?? 5,
});

/* Real photos only: the Drive wedding set plus client work from Instagram.
   Filter chips for empty categories hide themselves. */
const driveWeddings: GalleryItem[] = [
  fromPhoto("weddings", work.pearlPins),
  fromPhoto("weddings", work.ceremony),
  fromPhoto("weddings", work.braidedCrown),
  fromPhoto("weddings", work.brideFamily),
  fromPhoto("weddings", work.chignon),
  fromPhoto("weddings", work.braidSide),
  fromPhoto("weddings", work.pearlPinsMirror),
];

/* Round-robin the categories so the "All" view reads as a mix, not in blocks. */
function interleave(...lists: GalleryItem[][]): GalleryItem[] {
  const out: GalleryItem[] = [];
  for (let i = 0; i < Math.max(...lists.map((l) => l.length)); i++) {
    for (const l of lists) if (l[i]) out.push(l[i]);
  }
  return out;
}

const igBy = (c: GalleryCategory) => igWork.filter((p) => p.category === c).map((p) => fromPhoto(c, p));

export const gallery: GalleryItem[] = interleave(
  igBy("color"),
  [...driveWeddings, ...igBy("weddings")],
  igBy("cuts"),
);

/** A mixed, hand-picked set for the homepage slider. */
export const featuredGallery: GalleryItem[] = [
  fromPhoto("color", ig.brunetteToBlondeBalayage),
  fromPhoto("weddings", work.braidedCrown),
  fromPhoto("cuts", ig.angledBob),
  fromPhoto("color", ig.copperRedColor),
  fromPhoto("weddings", ig.updoJeweledPins),
  fromPhoto("color", ig.icyBlondeHighlights),
  fromPhoto("cuts", ig.layeredBobAshBlonde),
  fromPhoto("weddings", ig.braidedUpdo),
  fromPhoto("color", ig.ashHighlightsOnBob),
  fromPhoto("cuts", ig.bluntBob),
  fromPhoto("weddings", work.pearlPins),
  fromPhoto("color", ig.goldenBlondeColor),
];

/*
  Gallery images. Leave `src` empty for a labelled placeholder; once photos
  arrive, put them in /public/images/... (descriptive file names help SEO)
  and fill in src, width and height.
*/
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

const item = (category: GalleryCategory, label: string, alt: string, tall = false): GalleryItem => ({
  src: "",
  label,
  alt,
  category,
  width: 800,
  height: tall ? 1100 : 900,
});

export const gallery: GalleryItem[] = [
  item("color", "PHOTO: Color 01", "Warm custom hair color by Beauty JB", true),
  item("cuts", "PHOTO: Razor cut 01", "Textured razor cut by Beauty JB"),
  item("before-after", "PHOTO: Before & after 01", "Hair color before and after by Beauty JB"),
  item("weddings", "PHOTO: Bridal updo 01", "Bridal updo with soft curls by Beauty JB", true),
  item("color", "PHOTO: Highlights 01", "Soft highlights and lowlights by Beauty JB"),
  item("cuts", "PHOTO: Texture cut 01", "Texture haircut cut dry by Beauty JB", true),
  item("before-after", "PHOTO: Before & after 02", "Highlights before and after by Beauty JB", true),
  item("weddings", "PHOTO: Bridesmaid curls", "Bridesmaid curls by Beauty JB"),
  item("color", "PHOTO: Color 02", "Rich brunette hair color by Beauty JB"),
  item("cuts", "PHOTO: Razor cut 02", "Razor-cut layers by Beauty JB"),
  item("weddings", "PHOTO: Low chignon", "Low chignon wedding updo by Beauty JB", true),
  item("before-after", "PHOTO: Before & after 03", "Brazilian straightening before and after by Beauty JB"),
];

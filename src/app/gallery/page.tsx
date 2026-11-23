import type { Metadata } from "next";
import { CTABand } from "@/components/CTABand";
import { GalleryGrid } from "@/components/GalleryGrid";
import { PageHero } from "@/components/PageHero";
import { gallery } from "@/content/gallery";
import { pageMetadata } from "@/lib/seo";
import { inCity } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: `Gallery: Color, Cuts & Bridal Hair${inCity}`,
  description: `Hair color, razor and texture cuts, before-and-afters and bridal updos by Jennifer Bauduin of Beauty JB${inCity}.`,
  path: "/gallery/",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Gallery", path: "/gallery/" }]}
        eyebrow="Recent work"
        title={<>Gallery</>}
        lead="Color, cuts, transformations and wedding days, straight from the chair."
      />
      <section aria-label="Gallery images" className="pb-20 lg:pb-28">
        <div className="container-x">
          <GalleryGrid items={gallery} />
        </div>
      </section>
      <CTABand />
    </>
  );
}

import type { Metadata } from "next";
import { CTABand } from "@/components/CTABand";
import { GalleryGrid } from "@/components/GalleryGrid";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { gallery } from "@/content/gallery";
import { site } from "@/content/site.config";
import { imageGallerySchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { inCity } from "@/lib/site";

const metaDescription = `Hair color, highlights, razor and texture cuts, and bridal updos by Jennifer Bauduin of Beauty JB${inCity}.`;

export const metadata: Metadata = pageMetadata({
  title: `Gallery: Color, Cuts & Bridal Hair${inCity}`,
  description: metaDescription,
  path: "/gallery/",
});

export default function GalleryPage() {
  return (
    <>
      <JsonLd
        data={imageGallerySchema({ name: `${site.name} hair gallery`, description: metaDescription, path: "/gallery/", images: gallery })}
      />
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

import type { Metadata } from "next";
import { site } from "@/content/site.config";
import { siteUrl } from "./site";

/*
  Per-page metadata: unique title + description, canonical, Open Graph and
  Twitter. Titles pass through the layout template "%s | Beauty JB" unless
  `absolute` is set. Per-route opengraph-image.tsx files supply the images.
*/
export function pageMetadata({
  title,
  description,
  path,
  absolute = false,
}: {
  title: string;
  description: string;
  path: string;
  absolute?: boolean;
}): Metadata {
  const fullTitle = absolute ? title : `${title} | ${site.name}`;
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: site.name,
      url: `${siteUrl}${path}`,
      title: fullTitle,
      description,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}

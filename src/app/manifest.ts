import type { MetadataRoute } from "next";
import { site } from "@/content/site.config";
import { theme } from "@/content/theme";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} | ${site.owner}, ${site.title}`,
    short_name: site.name,
    start_url: "/",
    display: "standalone",
    background_color: theme.bg,
    theme_color: theme.accent,
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
  };
}

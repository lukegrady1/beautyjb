import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { legalNav, nav, siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", ...nav.map((n) => n.href), ...services.map((s) => `/services/${s.slug}/`), ...legalNav.map((n) => n.href)];
  return routes.map((path) => {
    const legal = path.startsWith("/privacy") || path.startsWith("/terms");
    return {
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: legal ? "yearly" : "monthly",
      priority: path === "/" ? 1 : legal ? 0.3 : path.startsWith("/services/") && path !== "/services/" ? 0.8 : 0.7,
    };
  });
}

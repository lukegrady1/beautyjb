import { getService, services } from "@/content/services";
import { ogImage } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Beauty JB hair service";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const s = getService((await params).slug);
  return ogImage(s?.h1 ?? "Hair services", "Services · Beauty JB");
}

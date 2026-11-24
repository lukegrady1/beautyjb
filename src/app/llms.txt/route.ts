import { experienceFaq, published, servicesFaq, weddingFaq } from "@/content/faq";
import { services } from "@/content/services";
import { weddings } from "@/content/weddings";
import { addressLines, email, inCityState, phone, site, siteUrl, socialLinks } from "@/lib/site";

// /llms.txt (llmstxt.org): a plain-markdown summary of the salon for AI
// assistants and AI search. Built from site.config.ts and the content files,
// like the pages and the schema; TODO/empty values are skipped the same way.
export const dynamic = "force-static";

const url = (path: string) => `${siteUrl}${path}`;

export function GET() {
  const faqs = published([...experienceFaq, ...servicesFaq, ...weddingFaq]);
  const lines = [
    `# ${site.name}`,
    "",
    `> Hair salon${inCityState} where hair designer ${site.owner}, with ${site.yearsExperience} years of experience, offers custom color, highlights and lowlights, dry cuts, Brazilian straightening and bridal hair. "${site.tagline}"`,
    "",
    "## Business details",
    "",
    `- Name: ${site.name}`,
    `- Hair designer: ${site.owner}`,
    ...(addressLines.length ? [`- Address: ${addressLines.join(", ")}`] : []),
    ...(phone ? [`- Phone: ${phone}`] : []),
    ...(email ? [`- Email: ${email}`] : []),
    ...site.hours.map((h) => `- ${h.day}: ${h.open}–${h.close}`),
    ...socialLinks.map(([name, href]) => `- ${name}: ${href}`),
    "",
    "## Services",
    "",
    ...services.map((s) => `- [${s.name}](${url(`/services/${s.slug}/`)}): ${s.short}`),
    "",
    "## Weddings",
    "",
    `- [Wedding hair and makeup](${url("/weddings/")}): ${weddings.services.map((w) => `${w.title}: ${w.blurb}`).join(" ")}`,
    "",
    ...(faqs.length
      ? ["## Frequently asked questions", "", ...faqs.flatMap((f) => [`### ${f.q}`, "", f.a, ""])]
      : []),
    "## Pages",
    "",
    `- [Home](${url("/")})`,
    `- [Services](${url("/services/")})`,
    `- [Weddings](${url("/weddings/")})`,
    `- [About](${url("/about/")})`,
    `- [Gallery](${url("/gallery/")})`,
    `- [Contact and booking](${url("/contact/")})`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

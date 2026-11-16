import type { Crumb } from "@/lib/schema";
import { Breadcrumbs } from "./Breadcrumbs";

/** Inner-page hero: breadcrumbs → eyebrow → H1 → lead, with optional media on the right. */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  lead,
  media,
  children,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  media?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="pt-8 pb-16 lg:pt-12 lg:pb-24">
      <div className="container-x">
        <Breadcrumbs items={crumbs} />
        <div className={`mt-10 grid items-center gap-12 lg:mt-14 ${media ? "lg:grid-cols-12 lg:gap-16" : ""}`}>
          <div className={media ? "lg:col-span-7" : "max-w-[820px]"}>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1 className={`h1 ${eyebrow ? "mt-5" : ""}`}>{title}</h1>
            {lead && <div className="lead mt-6 max-w-[600px]">{lead}</div>}
            {children}
          </div>
          {media && <div className="order-first mx-auto w-full max-w-[420px] lg:order-none lg:col-span-5">{media}</div>}
        </div>
      </div>
    </section>
  );
}

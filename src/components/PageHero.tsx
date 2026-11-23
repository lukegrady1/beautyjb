import type { Crumb } from "@/lib/schema";
import { Breadcrumbs } from "./Breadcrumbs";

/** Inner-page header (Stevie's PageHeader), with optional rounded media on the right. */
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
    <section>
      <div className="container-x pt-8 pb-10 sm:pt-10 sm:pb-14">
        <Breadcrumbs items={crumbs} />
        <div className={`mt-8 grid gap-10 sm:mt-10 ${media ? "lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14" : ""}`}>
          <div className={media ? "" : "max-w-3xl"}>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1 className={`h1 ${eyebrow ? "mt-3" : ""}`}>{title}</h1>
            {lead && <div className="lead mt-5 max-w-xl">{lead}</div>}
            {children}
          </div>
          {media && <div className="mx-auto w-full max-w-md lg:max-w-none">{media}</div>}
        </div>
      </div>
    </section>
  );
}

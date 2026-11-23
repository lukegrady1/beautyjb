import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { breadcrumbSchema, type Crumb } from "@/lib/schema";
import { JsonLd } from "./JsonLd";

/** Visual breadcrumbs + BreadcrumbList schema. The last crumb is the current page. */
export function Breadcrumbs({ items, onInk = false }: { items: Crumb[]; onInk?: boolean }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <JsonLd data={breadcrumbSchema(items)} />
      <nav aria-label="Breadcrumb" className="text-[14px] font-medium">
        <ol className={`flex flex-wrap items-center gap-1.5 ${onInk ? "text-on-ink-soft" : "text-ink-soft"}`}>
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className={onInk ? "text-on-ink" : "text-ink"}>
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.path} className={`transition-colors ${onInk ? "hover:text-gold-soft" : "hover:text-accent"}`}>
                      {c.name}
                    </Link>
                    <ChevronRight aria-hidden size={14} strokeWidth={1.5} className="text-accent" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

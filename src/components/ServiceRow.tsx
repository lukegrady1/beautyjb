import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/content/site.config";
import type { Service } from "@/content/services";
import { isSet } from "@/lib/site";

/** Editorial service row for /services/ (not a price table). */
export function ServiceRow({ service, index }: { service: Service; index: number }) {
  const price = site.showPrices && isSet(service.price) ? service.price : null;
  const duration = site.showPrices && isSet(service.duration) ? service.duration : null;
  return (
    <li className="grid gap-4 border-b border-gold/60 py-10 md:grid-cols-[80px_1fr_auto] md:gap-8" data-reveal>
      <span aria-hidden className="font-display text-[28px] italic leading-none text-accent">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="h3 !text-[26px] lg:!text-[30px]">
            <Link href={`/services/${service.slug}/`} className="transition-colors hover:text-accent">
              {service.name}
            </Link>
          </h3>
          {service.highlight && <span className="chip">{service.highlight}</span>}
        </div>
        <p className="mt-3 max-w-[560px]">{service.short}</p>
        <Link href={`/services/${service.slug}/`} className="text-link mt-4" aria-label={`Learn more about ${service.name}`}>
          Learn more <ArrowRight aria-hidden size={16} strokeWidth={1.5} />
        </Link>
      </div>
      <div className="text-[14px] font-medium md:text-right">
        {duration && <p className="text-ink">{duration}</p>}
        <p className={price ? "font-display text-[22px] text-ink" : "text-ink-soft"}>{price ?? "Pricing at consultation"}</p>
      </div>
    </li>
  );
}

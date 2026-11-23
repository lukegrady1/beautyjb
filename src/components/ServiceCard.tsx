import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/content/services";
import { Photo } from "./Photo";

export function ServiceCard({
  service,
  style,
  withPhoto = true,
}: {
  service: Service;
  style?: React.CSSProperties;
  /** false = text-only card (homepage). */
  withPhoto?: boolean;
}) {
  return (
    <Link
      href={`/services/${service.slug}/`}
      className="card card-hover group flex flex-col overflow-hidden"
      data-reveal
      style={style}
    >
      {withPhoto && (
        <div className="relative">
          <Photo
            photo={service.image}
            className="placeholder-tile aspect-[4/3] rounded-none"
            sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="h3">{service.name}</h3>
        <p className="mt-2 flex-1 text-[15px] leading-relaxed">{service.short}</p>
        <span className="mt-5 inline-flex items-center gap-2 font-semibold text-ink transition-colors group-hover:text-accent">
          Learn more
          <ArrowRight
            aria-hidden
            size={16}
            strokeWidth={1.5}
            className="transition-transform group-hover:translate-x-[3px]"
          />
        </span>
      </div>
    </Link>
  );
}

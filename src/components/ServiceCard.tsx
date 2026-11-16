import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/content/services";
import { Photo } from "./Photo";

export function ServiceCard({ service, style }: { service: Service; style?: React.CSSProperties }) {
  return (
    <Link href={`/services/${service.slug}/`} className="card card-hover group flex flex-col overflow-hidden" data-reveal style={style}>
      <div className="relative">
        <Photo photo={service.image} className="aspect-[4/3] rounded-none" sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw" />
        {service.highlight && <span className="chip absolute top-3 left-3">{service.highlight}</span>}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="h3">{service.name}</h3>
        <p className="mt-2 flex-1 text-[15px] leading-relaxed">{service.short}</p>
        <span className="mt-5 inline-flex items-center gap-2 font-semibold text-ink transition-colors group-hover:text-accent">
          Learn more
          <ArrowRight aria-hidden size={16} strokeWidth={1.5} className="transition-transform group-hover:translate-x-[3px]" />
        </span>
      </div>
    </Link>
  );
}

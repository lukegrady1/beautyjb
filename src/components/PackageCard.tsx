import { Check, Coffee, MapPin, Users } from "lucide-react";
import { site } from "@/content/site.config";
import type { WeddingPackage } from "@/content/weddings";
import { isSet } from "@/lib/site";

export function PackageCard({ pkg, featured, style }: { pkg: WeddingPackage; featured?: boolean; style?: React.CSSProperties }) {
  const includes = pkg.includes.filter(isSet);
  const price = site.showPrices && isSet(pkg.price) ? pkg.price : null;
  return (
    <div className={`card flex flex-col p-7 lg:p-8 ${featured ? "border-gold" : ""}`} data-reveal style={style}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="h3 !text-[26px]">{pkg.name}</h3>
        {pkg.refreshments && (
          <span className="chip shrink-0">
            <Coffee aria-hidden size={13} strokeWidth={1.5} /> Refreshments
          </span>
        )}
      </div>
      <dl className="mt-6 space-y-3 border-t border-line pt-6 text-[15px]">
        {isSet(pkg.partySize) && (
          <div className="flex items-center gap-3">
            <dt>
              <Users aria-hidden size={18} strokeWidth={1.5} className="text-gold" />
              <span className="sr-only">Party size</span>
            </dt>
            <dd className="text-ink">{pkg.partySize === "1" ? "The bride" : pkg.partySize}</dd>
          </div>
        )}
        <div className="flex items-center gap-3">
          <dt>
            <MapPin aria-hidden size={18} strokeWidth={1.5} className="text-gold" />
            <span className="sr-only">Location</span>
          </dt>
          <dd className="text-ink">{pkg.location}</dd>
        </div>
      </dl>
      {includes.length > 0 ? (
        <ul className="mt-6 space-y-2.5 text-[15px]">
          {includes.map((i) => (
            <li key={i} className="flex gap-3">
              <Check aria-hidden size={18} strokeWidth={1.5} className="mt-1 shrink-0 text-accent" />
              {i}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 text-[15px]">Tailored to your day. Ask for details when you inquire.</p>
      )}
      <div className="mt-auto pt-8">
        <p className="font-display text-[24px] text-ink">{price ?? "Inquire"}</p>
        <a href="#inquire" className="btn btn-secondary mt-4 w-full">
          Ask about {pkg.name}
        </a>
      </div>
    </div>
  );
}

import { site } from "@/content/site.config";

/** The oversized outlined "35" with its caption. */
export function OutlineNumeral({ className = "", caption = true }: { className?: string; caption?: boolean }) {
  return (
    <div className={className} aria-hidden={!caption}>
      <span className="outline-numeral block text-[120px] sm:text-[200px] lg:text-[220px]" aria-hidden>
        {site.yearsExperience}
      </span>
      {caption && (
        <p className="mt-3 font-display text-[20px] italic text-ink">
          <span className="sr-only">{site.yearsExperience} </span>years behind the chair
        </p>
      )}
    </div>
  );
}

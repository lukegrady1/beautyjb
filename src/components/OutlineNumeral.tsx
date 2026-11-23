import { site } from "@/content/site.config";

/** The "35 years" stat, as a rounded badge card. */
export function OutlineNumeral({ className = "", caption = true }: { className?: string; caption?: boolean }) {
  return (
    <div className={className} aria-hidden={!caption}>
      <div className="inline-flex items-center gap-4 rounded-2xl border border-line bg-bg-alt px-5 py-4 shadow-lift">
        <span className="text-[3.5rem] font-bold leading-none tracking-[-0.04em] text-accent">{site.yearsExperience}</span>
        {caption && (
          <span className="max-w-[9rem] text-sm font-semibold leading-snug text-ink">
            <span className="sr-only">{site.yearsExperience} </span>years behind the chair
          </span>
        )}
      </div>
    </div>
  );
}

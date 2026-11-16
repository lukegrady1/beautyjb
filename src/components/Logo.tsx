import { site } from "@/content/site.config";

/*
  Placeholder wordmark until the real logo arrives (site.logo).
  Swap the markup here for the final SVG; nothing else needs to change.
*/
export function Logo({ onInk = false, className = "" }: { onInk?: boolean; className?: string }) {
  return (
    <span
      className={`font-display text-[26px] font-semibold leading-none tracking-[-0.01em] ${
        onInk ? "text-on-ink" : "text-ink"
      } ${className}`}
    >
      Beauty <span className={onInk ? "text-gold-soft" : "text-accent"}>JB</span>
      <span className="sr-only"> ({site.owner}, {site.title})</span>
    </span>
  );
}

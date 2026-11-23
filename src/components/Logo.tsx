import { site } from "@/content/site.config";

/*
  Placeholder wordmark until the real logo arrives (site.logo): a wine "JB"
  monogram disc beside the name, echoing Stevie's "SC" monogram logo.
  Swap the markup here for the final SVG; nothing else needs to change.
*/
export function Logo({ onInk = false, className = "" }: { onInk?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span
        aria-hidden
        className={`inline-flex h-11 w-11 items-center justify-center rounded-full text-[15px] font-bold tracking-[-0.02em] md:h-12 md:w-12 ${
          onInk ? "bg-bg text-accent-deep" : "bg-accent text-on-accent"
        }`}
      >
        JB
      </span>
      <span className="leading-none">
        <span className={`block text-[20px] font-bold tracking-[-0.02em] md:text-[22px] ${onInk ? "text-on-ink" : "text-ink"}`}>
          Beauty JB
        </span>
        <span className={`mt-1 block text-[10px] font-semibold uppercase tracking-[0.18em] ${onInk ? "text-on-ink-soft" : "text-ink-soft"}`}>
          Hair Design
        </span>
      </span>
      <span className="sr-only"> ({site.owner}, {site.title})</span>
    </span>
  );
}

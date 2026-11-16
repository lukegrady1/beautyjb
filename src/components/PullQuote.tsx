/** Large italic Bodoni quote with oversized gold quotation marks. */
export function PullQuote({ children, cite, className = "" }: { children: React.ReactNode; cite?: string; className?: string }) {
  return (
    <figure className={`relative mx-auto max-w-[860px] text-center ${className}`} data-reveal>
      <span aria-hidden className="block font-display text-[96px] leading-[0.6] text-gold lg:text-[120px]">
        &ldquo;
      </span>
      <blockquote className="mt-2 font-display text-[30px] italic leading-[1.2] text-ink text-balance lg:text-[44px]">
        {children}
      </blockquote>
      {cite && <figcaption className="mt-6 text-[14px] font-semibold uppercase tracking-[0.2em] text-ink-soft">{cite}</figcaption>}
    </figure>
  );
}

/** The "~1 hr 45 min" moment: Bodoni stat with a gold rule above. */
export function StatBand({ stat, children, sub, onInk = false }: { stat: string; children: React.ReactNode; sub?: string; onInk?: boolean }) {
  return (
    <div className="max-w-[720px]" data-reveal>
      <span aria-hidden className="block h-px w-20 bg-gold" />
      <p className={`mt-6 font-display text-[30px] leading-[1.2] lg:text-[40px] ${onInk ? "text-on-ink" : "text-ink"}`}>
        <span className={`font-semibold ${onInk ? "text-gold-soft" : "text-accent"}`}>{stat}</span> {children}
      </p>
      {sub && <p className="mt-4">{sub}</p>}
    </div>
  );
}

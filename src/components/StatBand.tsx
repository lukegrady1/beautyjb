/** "~1 hr 45 min" stat in a rounded pill card. */
export function StatBand({ stat, children, sub, onInk = false }: { stat: string; children: React.ReactNode; sub?: string; onInk?: boolean }) {
  return (
    <div
      className={`inline-flex max-w-[720px] flex-col gap-1 rounded-2xl border px-5 py-4 sm:flex-row sm:items-center sm:gap-4 ${
        onInk ? "border-white/15 bg-white/5" : "border-line bg-bg-alt"
      }`}
      data-reveal
    >
      <span className={`text-[2rem] font-bold leading-none tracking-[-0.02em] ${onInk ? "text-on-ink" : "text-accent"}`}>{stat}</span>
      <span className={onInk ? "text-on-ink-soft" : "text-ink-soft"}>
        {children}
        {sub && <span className="mt-1 block text-sm">{sub}</span>}
      </span>
    </div>
  );
}

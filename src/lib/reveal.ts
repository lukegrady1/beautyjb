/** Inline style helper for staggered scroll reveals (see RevealObserver). */
export const delay = (i: number, step = 60) => ({ "--reveal-delay": `${i * step}ms` }) as React.CSSProperties;

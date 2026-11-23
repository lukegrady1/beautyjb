import type { LucideIcon } from "lucide-react";

/* Value card (Stevie's About values): round accent icon, title, one line. */
export function FeatureCard({
  icon: Icon,
  title,
  children,
  style,
  surface = "bg-bg",
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  /** Card fill: bg-bg on a bg-alt band (default), bg-bg-alt on the plain page background. */
  surface?: "bg-bg" | "bg-bg-alt";
}) {
  return (
    <div className={`rounded-2xl border border-line ${surface} p-5`} data-reveal style={style}>
      <span className="icon-dot">
        <Icon aria-hidden size={20} strokeWidth={1.75} />
      </span>
      <h3 className="mt-4 font-semibold text-ink">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed">{children}</p>
    </div>
  );
}

import type { LucideIcon } from "lucide-react";

export function FeatureCard({
  icon: Icon,
  title,
  children,
  style,
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div className="card card-hover p-6 lg:p-7" data-reveal style={style}>
      <Icon aria-hidden size={28} strokeWidth={1.5} className="text-gold" />
      <h3 className="h3 mt-5">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed">{children}</p>
    </div>
  );
}

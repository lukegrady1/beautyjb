import { Quote } from "lucide-react";

/** Centered quote on a surface card. */
export function PullQuote({ children, cite, className = "" }: { children: React.ReactNode; cite?: string; className?: string }) {
  return (
    <figure className={`card mx-auto max-w-[860px] px-6 py-10 text-center sm:px-12 sm:py-14 ${className}`} data-reveal>
      <Quote aria-hidden size={32} className="mx-auto fill-accent text-accent" />
      <blockquote className="h2 mt-5 !text-[1.75rem] sm:!text-[2.25rem]">{children}</blockquote>
      {cite && <figcaption className="eyebrow mt-6 justify-center">{cite}</figcaption>}
    </figure>
  );
}

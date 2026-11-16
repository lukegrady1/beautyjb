type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  id?: string;
  intro?: React.ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  trim?: boolean; // red trim under the heading (dark sections)
  className?: string;
};

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

/** eyebrow → big headline → short paragraph: the shared section rhythm. */
export function SectionHeading({ eyebrow, title, id, intro, align = "left", as = "h2", trim, className = "" }: Props) {
  const H = as;
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-[760px] ${className}`} data-reveal>
      {eyebrow && <Eyebrow className={center ? "justify-center" : ""}>{eyebrow}</Eyebrow>}
      <H id={id} className={`${as === "h1" ? "h1" : "h2"} ${eyebrow ? "mt-4" : ""}`}>
        {title}
      </H>
      {trim && <span className={`trim-short mt-6 ${center ? "mx-auto" : ""}`} aria-hidden />}
      {intro && <div className={`lead mt-5 ${center ? "mx-auto" : ""} max-w-[620px]`}>{intro}</div>}
    </div>
  );
}

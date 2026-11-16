import { site } from "@/content/site.config";

/** "As featured in" row. Renders nothing until site.press has entries. */
export function PressRow() {
  if (site.press.length === 0) return null;
  return (
    <section aria-labelledby="press-heading" className="border-y border-line py-12">
      <div className="container-x text-center">
        <h2 id="press-heading" className="eyebrow justify-center">
          As featured in
        </h2>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {site.press.map((p) => (
            <li key={p.name} className="font-display text-[26px] italic text-ink">
              {p.url ? (
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
                  {p.label ?? p.name}
                </a>
              ) : (
                (p.label ?? p.name)
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

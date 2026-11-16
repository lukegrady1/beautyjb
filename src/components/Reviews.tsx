import { Star } from "lucide-react";
import { site } from "@/content/site.config";
import { isSet } from "@/lib/site";

/** Real reviews only. Renders nothing while site.reviews is empty. */
export function Reviews() {
  if (site.reviews.length === 0) return null;
  const [first, ...rest] = site.reviews;
  return (
    <section aria-labelledby="reviews-heading" className="section bg-bg-alt">
      <div className="container-x">
        <p className="eyebrow justify-center">Kind words</p>
        <h2 id="reviews-heading" className="sr-only">
          Client reviews
        </h2>
        {[first, ...rest.slice(0, 2)].map((r, i) => (
          <figure key={i} className={`mx-auto max-w-[860px] text-center ${i ? "mt-16" : "mt-8"}`} data-reveal>
            <span aria-hidden className="block font-display text-[96px] leading-[0.6] text-gold">
              &ldquo;
            </span>
            <blockquote className={`mt-2 font-display italic leading-[1.3] text-ink ${i ? "text-[22px]" : "text-[26px] lg:text-[34px]"}`}>
              {r.text}
            </blockquote>
            <figcaption className="mt-6 flex flex-col items-center gap-2">
              {r.rating && (
                <span className="flex gap-1 text-gold" aria-label={`${r.rating} out of 5 stars`}>
                  {Array.from({ length: r.rating }).map((_, k) => (
                    <Star key={k} aria-hidden size={16} strokeWidth={1.5} fill="currentColor" />
                  ))}
                </span>
              )}
              <span className="text-[14px] font-semibold uppercase tracking-[0.2em] text-ink">{r.name}</span>
            </figcaption>
          </figure>
        ))}
        {isSet(site.social.googleReview) && (
          <p className="mt-12 text-center">
            <a href={site.social.googleReview} target="_blank" rel="noopener noreferrer" className="text-link">
              Leave a Google review
            </a>
          </p>
        )}
      </div>
    </section>
  );
}

import { Quote, Star } from "lucide-react";
import { site } from "@/content/site.config";
import { isSet } from "@/lib/site";

/** Real reviews only (Stevie's review cards). Renders nothing while site.reviews is empty. */
export function Reviews() {
  if (site.reviews.length === 0) return null;
  return (
    <section aria-labelledby="reviews-heading" className="section bg-accent-tint text-ink">
      <div className="container-x">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between" data-reveal>
          <div className="max-w-xl">
            <p className="eyebrow">Reviews</p>
            <h2 id="reviews-heading" className="h2 mt-3">
              Clients leave the chair happy.
            </h2>
          </div>
          {isSet(site.social.googleReview) && (
            <a href={site.social.googleReview} target="_blank" rel="noopener noreferrer" className="text-link">
              Leave a Google review
            </a>
          )}
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {site.reviews.slice(0, 8).map((r, i) => (
            <li key={i} className="flex h-full flex-col rounded-2xl border border-line bg-bg-alt p-5" data-reveal>
              <Quote aria-hidden size={26} className="fill-accent text-accent" />
              <blockquote className="mt-3 flex-1 text-[1.02rem] leading-relaxed text-ink">&ldquo;{r.text}&rdquo;</blockquote>
              <footer className="mt-4 flex items-center justify-between text-sm">
                <cite className="font-semibold not-italic">{r.name}</cite>
                {r.rating && (
                  <span role="img" className="flex gap-0.5 text-accent" aria-label={`${r.rating} out of 5 stars`}>
                    {Array.from({ length: r.rating }).map((_, k) => (
                      <Star key={k} aria-hidden size={13} fill="currentColor" />
                    ))}
                  </span>
                )}
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

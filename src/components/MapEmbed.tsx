import { ExternalLink } from "lucide-react";

/*
  Embedded Google Map of the studio. The iframe is lazy-loaded, so Google's
  map only downloads when the section scrolls near the viewport. Renders
  nothing until the address is known.
*/
export function MapEmbed({ query, title = "Map to the studio" }: { query: string | null; title?: string }) {
  if (!query) return null;

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-line bg-bg-alt sm:aspect-[16/9]">
      <iframe
        title={title}
        src={`https://www.google.com/maps?q=${query}&output=embed`}
        className="absolute inset-0 h-full w-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${query}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-sm absolute right-3 bottom-3 bg-bg text-ink shadow-lift hover:bg-white"
      >
        Open in Google Maps
        <ExternalLink aria-hidden size={15} strokeWidth={2} />
      </a>
    </div>
  );
}

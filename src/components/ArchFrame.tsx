import type { Photo as PhotoT } from "@/content/services";
import { Photo } from "./Photo";

/*
  Beauty JB's signature shape: an arched photo with a 1px gold border offset
  12px behind it (double-frame effect). Optional chip on the lower-left.
*/
export function ArchFrame({
  photo,
  chip,
  priority,
  sizes = "(min-width: 1024px) 420px, 90vw",
  className = "",
  aspect = "aspect-[4/5]",
}: {
  photo: PhotoT;
  chip?: React.ReactNode;
  priority?: boolean;
  sizes?: string;
  className?: string;
  aspect?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div aria-hidden className="arch absolute inset-0 translate-x-3 translate-y-3 border border-gold" />
      <Photo photo={photo} priority={priority} sizes={sizes} className={`arch relative ${aspect}`} />
      {chip && (
        <div className="absolute bottom-6 left-0 -translate-x-2 border border-line bg-bg px-4 py-3 text-[14px] font-medium text-ink sm:-translate-x-6">
          {chip}
        </div>
      )}
    </div>
  );
}

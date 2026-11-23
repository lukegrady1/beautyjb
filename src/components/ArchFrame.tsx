import type { Photo as PhotoT } from "@/content/services";
import { Photo } from "./Photo";

/*
  Rounded photo frame (Stevie Cain pattern): 2rem corners, hairline border,
  soft lift. Optional pill badge overlapping the lower-left corner.
  (Name kept from the earlier arched design so pages don't change.)
*/
export function ArchFrame({
  photo,
  chip,
  priority,
  sizes = "(min-width: 1024px) 40vw, 28rem",
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
      <Photo
        photo={photo}
        priority={priority}
        sizes={sizes}
        className={`placeholder-tile ${aspect} rounded-[2rem] border border-line shadow-lift`}
      />
      {chip && <div className="chip absolute bottom-5 left-4 shadow-lift sm:-left-5">{chip}</div>}
    </div>
  );
}

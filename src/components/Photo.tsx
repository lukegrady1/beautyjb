import Image from "next/image";
import type { Photo as PhotoT } from "@/content/services";

/*
  Every image goes through here. With a `src` it renders next/image (fill,
  object-cover) inside the sized wrapper; without one it renders a labelled
  grey block so layouts can be reviewed before the real photos arrive.
  The wrapper (className) owns aspect ratio and radius.
*/
export function Photo({
  photo,
  className = "",
  sizes = "100vw",
  priority = false,
  style,
}: {
  photo: PhotoT;
  className?: string;
  sizes?: string;
  priority?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`${/\b(absolute|fixed)\b/.test(className) ? "" : "relative "}overflow-hidden ${className}`} style={style}>
      {photo.src ? (
        <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <PhotoPlaceholder label={photo.label} alt={photo.alt} />
      )}
    </div>
  );
}

export function PhotoPlaceholder({ label, alt }: { label: string; alt?: string }) {
  return (
    <div
      role="img"
      aria-label={alt ? `${label}. ${alt}` : label}
      className="absolute inset-0 flex items-center justify-center p-6 text-center"
      style={{ background: "color-mix(in srgb, var(--line) 70%, var(--silver))" }}
    >
      <span className="max-w-[18ch] text-[12px] font-semibold uppercase tracking-[0.16em] text-ink/70">{label}</span>
    </div>
  );
}

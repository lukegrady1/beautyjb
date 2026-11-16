import { ImageResponse } from "next/og";
import { theme } from "@/content/theme";

/*
  Shared Open Graph card: white background, red trim bar, Bodoni page title,
  gold hairline, "beautyjb.com". Fonts are fetched from Google Fonts at build
  time; if that fails the card falls back to a system serif so a font outage
  can never break a deploy.
*/
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

async function loadFont(family: string, weight: number, italic = false): Promise<ArrayBuffer | null> {
  try {
    const axis = italic ? `ital,wght@1,${weight}` : `wght@${weight}`;
    const css = await fetch(`https://fonts.googleapis.com/css2?family=${family}:${axis}&display=swap`, {
      headers: { "User-Agent": "Mozilla/5.0" },
    }).then((r) => r.text());
    const url = css.match(/src: url\((https:[^)]+\.(?:ttf|otf|woff))\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export async function ogImage(title: string, eyebrow = "Hair Designer · Jennifer Bauduin") {
  const [bodoni, manrope] = await Promise.all([loadFont("Bodoni+Moda", 600), loadFont("Manrope", 600)]);
  const fonts = [
    ...(bodoni ? [{ name: "Bodoni", data: bodoni, weight: 600 as const, style: "normal" as const }] : []),
    ...(manrope ? [{ name: "Manrope", data: manrope, weight: 600 as const, style: "normal" as const }] : []),
  ];

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: theme.bg }}>
        <div style={{ height: 14, width: "100%", background: theme.accent }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 80px 56px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, fontFamily: "Manrope", fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: theme.accent }}>
            <div style={{ width: 48, height: 2, background: theme.gold }} />
            {eyebrow}
          </div>
          <div style={{ display: "flex", fontFamily: "Bodoni, serif", fontSize: title.length > 40 ? 76 : 92, lineHeight: 1.05, letterSpacing: -2, color: theme.ink, maxWidth: 1000 }}>
            {title}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ width: 120, height: 2, background: theme.gold }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div style={{ display: "flex", fontFamily: "Bodoni, serif", fontSize: 40, color: theme.ink }}>
                Beauty&nbsp;<span style={{ color: theme.accent }}>JB</span>
              </div>
              <div style={{ display: "flex", fontFamily: "Manrope", fontSize: 24, color: theme.inkSoft }}>beautyjb.com</div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts },
  );
}

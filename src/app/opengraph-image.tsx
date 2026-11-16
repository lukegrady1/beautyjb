import { ogImage } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Hair color, cuts & bridal hair | Beauty JB";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage("Hair color, cuts & bridal hair");
}

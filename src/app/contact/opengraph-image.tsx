import { ogImage } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Your chair is waiting | Beauty JB";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage("Your chair is waiting");
}

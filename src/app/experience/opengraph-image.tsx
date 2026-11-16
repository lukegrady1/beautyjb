import { ogImage } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "The Beauty JB experience | Beauty JB";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage("The Beauty JB experience");
}

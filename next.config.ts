import type { NextConfig } from "next";

/*
  Fully static export, same as the other Grady Digital client sites. Vercel
  (or any static host) serves `out/`. Forms are GoHighLevel iframes
  (src/components/GhlForm.tsx), so there is no server runtime to maintain.

  www → apex: set beautyjb.com as the primary domain in Vercel > Domains and
  add www.beautyjb.com as a redirect to it.

  Images: static export cannot use the on-demand optimizer, so drop AVIF/WebP
  files (sized ~2x their display width) straight into public/images.
*/
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;

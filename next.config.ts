// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Generate a static site (works on Fasthosts Web Hosting)
  output: "export",
  // Allows next/image without the Node image optimizer
  images: { unoptimized: true },
};

export default nextConfig;

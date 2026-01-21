import type { NextConfig } from "next";

// Resolve loader safely
const loaderPath = require.resolve("orchids-visual-edits/loader.js");

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Image config (allows all external images)
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },

  // Prevent build from failing on TS / ESLint (your choice)
  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  // Turbopack loader
  turbopack: {
    rules: {
      "*.{js,jsx,ts,tsx}": {
        loaders: [loaderPath],
      },
    },
  },

  // Ensure SSR works (do NOT use output: "export")
  output: "standalone",
};

export default nextConfig;

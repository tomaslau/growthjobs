import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  env: {
    AIRTABLE_ACCESS_TOKEN: process.env.AIRTABLE_ACCESS_TOKEN,
    AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID,
  },
};

export default nextConfig;

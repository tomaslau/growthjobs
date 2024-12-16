/**
 * Job Board Configuration
 * ---------------------
 * Customize your job board by editing this file.
 */

export const config = {
  // Marketing & SEO
  badge: "Open Source Next.js Job Board Starter Kit",
  title: "Discover and Apply to Your Dream Jobs Today",
  description:
    "Browse curated opportunities from leading companies. Updated daily with the latest positions.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://jobboardstarter.vercel.app"),

  // Navigation
  nav: {
    title: "Job Board Starter", // The text shown in the navigation bar
    icon: "BriefcaseBusiness", // Lucide icon name (see https://lucide.dev/icons)
    github: {
      show: true, // Whether to show the GitHub button
      url: "https://github.com/tomaslau/jobboardstarter", // Your GitHub repository URL
    },
  },
} as const;

export type Config = typeof config;
export default config;

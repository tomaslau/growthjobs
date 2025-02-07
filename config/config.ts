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
      : "https://demo.bordful.com"),

  // Navigation
  nav: {
    title: "Bordful", // The text shown in the navigation bar
    icon: "BriefcaseBusiness", // Lucide icon name (see https://lucide.dev/icons)
    github: {
      show: true, // Whether to show the GitHub button
      url: "https://github.com/craftled/bordful", // Your GitHub repository URL
    },
    linkedin: {
      show: true,
      url: "https://www.linkedin.com/company/bordful/",
    },
    twitter: {
      show: true,
      url: "https://x.com/bordful",
    },
    bluesky: {
      show: true,
      url: "https://bsky.app/profile/bordful.com",
    },
    postJob: {
      show: true, // Whether to show the Post Job button
      label: "Post a Job", // Button text
      link: "/post", // Button link
    },
    topMenu: [
      { label: "Home", link: "/" },
      { label: "Jobs", link: "/jobs" },
      { label: "About", link: "/about" },
      { label: "Changelog", link: "/changelog" },
    ],
  },

  // Footer
  footer: {
    // Brand section (reuses nav social links)
    brand: {
      show: true,
      description:
        "Browse curated opportunities from leading companies. Updated daily with the latest positions.",
    },

    // Resources section
    resources: {
      show: true,
      title: "Resources",
      links: [
        { label: "Home", link: "/" },
        { label: "Jobs", link: "/jobs" },
        { label: "About", link: "/about" },
        { label: "Changelog", link: "/changelog" },
      ],
    },

    // Legal section
    legal: {
      show: true,
      title: "Legal",
      links: [
        {
          label: "Privacy & Cookies",
          link: "/privacy",
          external: false,
        },
        {
          label: "Terms of Service",
          link: "/terms",
          external: false,
        },
        {
          label: "License",
          link: "https://github.com/craftled/bordful/blob/main/LICENSE",
          external: true,
        },
      ],
    },

    // Post Job section
    postJob: {
      show: true,
      title: "Post a Job",
      description:
        "Reach our community of talented professionals. Get quality applications fast.",
      button: {
        label: "Post a Job",
        link: "/post",
      },
    },

    // Copyright section
    copyright: {
      show: true,
      startYear: 2024,
      text: "Bordful - An open-source Next.js job board template. Standing on the shoulders of giants.",
    },

    // Built By section
    builtBy: {
      show: true,
      text: "Built by",
      name: "Craftled",
      link: "https://craftled.com/",
      showLogo: true,
    },
  },
} as const;

export type Config = typeof config;
export default config;

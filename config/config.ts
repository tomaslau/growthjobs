/**
 * Job Board Configuration
 * ---------------------
 * Customize your job board by editing this file.
 */

export const config = {
  // Marketing & SEO
  badge: "Job Board for Growth Professionals",
  title: "Discover Growth Marketing Jobs at Fast-Growing Companies",
  description:
    "Curated growth jobs in marketing, business development, and startup roles. Join fast-growing companies and drive your career forward.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://growthjobs.org"),

  // Navigation
  nav: {
    github: {
      show: false, // Whether to show the GitHub button
      url: "https://github.com/craftled/bordful", // Your GitHub repository URL
    },
    linkedin: {
      show: true,
      url: "https://www.linkedin.com/company/growthjobs/",
    },
    twitter: {
      show: true,
      url: "https://x.com/craftled_",
    },
    bluesky: {
      show: true,
      url: "https://bsky.app/profile/growthjobs.org",
    },
    postJob: {
      show: true, // Whether to show the Post Job button
      label: "Post a Job", // Button text
      link: "https://buy.stripe.com/fZeg1n8eg07m0lGfZn", // Button link
      external: true, // Indicates the link is external (opens in a new tab)
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
        "Growth Jobs is a niche job board connecting growth-driven professionals with scaling companies. Updated daily.",
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
        "Reach our community of growth professionals. Get quality applications fast.",
      button: {
        label: "Post a Job",
        link: "https://buy.stripe.com/fZeg1n8eg07m0lGfZn",
        external: true, // Indicates the footer link should open externally
      },
    },

    // Copyright section
    copyright: {
      show: true,
      startYear: 2025,
      text: "Growth Jobs - A niche job board for growth professionals. Empowering businesses to scale and professionals to thrive.",
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

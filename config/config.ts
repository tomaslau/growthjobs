/**
 * Job Board Configuration Example
 * ----------------------------
 * This is a template for your job board configuration.
 * 
 * Quick Start:
 * 1. Copy this file: cp config/config.example.ts config/config.ts
 * 2. Make sure it's called config.ts
 * 3. Customize config.ts with your settings
 * 4. Commit config.ts to your repository
 * 
 * When updating from upstream (original bordful repo):
 * - Pull the latest changes
 * - Your config.ts will remain unchanged
 * - Check this file for new options
 * - Add desired new options to your config.ts
 */

import type { ScriptProps } from "next/script";

interface CustomScript {
  src: string;
  strategy: ScriptProps["strategy"];
  attributes?: Record<string, string>;
}

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

  // Scripts Configuration (analytics, tracking, etc.)
  scripts: {
    head: [
      // Example: Umami Analytics (loads early but non-blocking)
      {
        src: "https://umami.craftled.com/script.js",
        strategy: "afterInteractive",
        attributes: {
          "data-website-id": "aeabdbe7-e5a6-4403-8af5-9a036d36eaf4",
          defer: "",
        },
      },
    ] as CustomScript[],
    body: [] as CustomScript[], // Scripts to load at the end of body
  },

  // Navigation
  nav: {
    title: "Growth Jobs", // The text shown in the navigation bar
    icon: "BriefcaseBusiness", // Lucide icon name (see https://lucide.dev/icons)
    logo: {
      enabled: true, // Set to true to use a custom logo instead of icon + text
      src: "/growthjobs.svg", // Path to your logo image (place it in the public directory)
      width: 133, // Width of the logo in pixels
      height: 16, // Height of the logo in pixels
      alt: "Growth Jobs", // Alt text for the logo
    },
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
    reddit: {
      show: true,
      url: "https://reddit.com/r/growthjobs",
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
    ],
  },

  // Footer
  footer: {
    // Brand section (reuses nav social links)
    brand: {
      show: true,
      description:
        "Growth Jobs is a specialized job board connecting growth-driven professionals with scaling companies. Updated daily.",
    },

    // Resources section
    resources: {
      show: true,
      title: "Resources",
      links: [
        { label: "Home", link: "/" },
        { label: "Jobs", link: "/jobs" },
        { label: "About", link: "/about" },
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
      text: "Growth Jobs - A specialized job board for growth professionals. Empowering businesses to scale and professionals to thrive.",
    },

    // Built with section
    builtWith: {
      show: true,
      text: "Built with",
      name: "Bordful",
      link: "https://bordful.com/",
      showLogo: true,
    },
  },
} as const;

export type Config = typeof config;
export default config;

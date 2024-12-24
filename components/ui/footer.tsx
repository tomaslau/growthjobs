"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import config from "@/config/config";

export function Footer() {
  const [copyrightYears, setCopyrightYears] = useState("2024");

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setCopyrightYears(currentYear === 2024 ? "2024" : `2024-${currentYear}`);
  }, []);

  return (
    <footer className="border-t mt-24">
      <div className="container py-8">
        <div className="flex flex-col gap-8">
          {/* Additional Sections */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 pb-8 border-b">
            {/* Brand */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-zinc-900">
                {config.nav.title}
              </h3>
              <p className="text-sm text-zinc-600 max-w-[280px]">
                {config.description}
              </p>
            </div>

            {/* Resources */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-zinc-900">Resources</h3>
              <ul className="space-y-2">
                {[
                  { href: "/jobs", label: "Browse Jobs" },
                  { href: "/alerts", label: "Job Alerts" },
                  { href: "/about", label: "About Us" },
                  { href: "/changelog", label: "Changelog" },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-zinc-900">Legal</h3>
              <ul className="space-y-2">
                {[
                  { href: "/privacy", label: "Privacy Policy" },
                  { href: "/terms", label: "Terms of Service" },
                  { href: "/cookies", label: "Cookie Policy" },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Post a Job */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-zinc-900">
                Post a Job
              </h3>
              <p className="text-sm text-zinc-600 max-w-[280px]">
                Reach our community of talented professionals. Get quality
                applications fast.
              </p>
              <Button
                asChild
                size="xs"
                className="bg-zinc-900 text-white hover:bg-zinc-800 gap-1.5 text-xs"
              >
                <Link href="/post">
                  <PlusCircle className="h-3.5 w-3.5" aria-hidden="true" />
                  Post a Job
                </Link>
              </Button>
            </div>
          </div>

          {/* Original Footer Content */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-4">
                <Link
                  href="/"
                  className="text-sm text-gray-500 hover:text-gray-900"
                >
                  Home
                </Link>
                <Link
                  href="https://github.com/tomaslau/jobboardstarter"
                  className="text-sm text-gray-500 hover:text-gray-900"
                >
                  GitHub
                </Link>
                <Link
                  href="/changelog"
                  className="text-sm text-gray-500 hover:text-gray-900"
                >
                  Changelog
                </Link>
                <Link
                  href="https://github.com/tomaslau/jobboardstarter/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-gray-900"
                >
                  License
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Built by</span>
                <div className="flex items-center gap-1">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 154 154"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0"
                  >
                    <rect width="154" height="154" rx="77" fill="#0A0A0A" />
                    <path
                      d="M77.8 106.2C71.9667 106.2 66.85 105.033 62.45 102.7C58.05 100.333 54.6333 97.05 52.2 92.85C49.8 88.65 48.6 83.8 48.6 78.3C48.6 72.7333 49.8 67.9167 52.2 63.85C54.6333 59.75 58.05 56.5667 62.45 54.3C66.85 52.0333 71.9667 50.9 77.8 50.9C82.1667 50.9 86.0333 51.55 89.4 52.85C92.7667 54.1167 95.5833 55.8 97.85 57.9C100.117 60 101.833 62.3 103 64.8C104.167 67.3 104.75 69.7833 104.75 72.25C104.75 72.2833 104.75 72.35 104.75 72.45C104.75 72.5167 104.75 72.5833 104.75 72.65H89.4C89.4 72.45 89.3833 72.2667 89.35 72.1C89.35 71.9 89.3167 71.7 89.25 71.5C88.9833 70.1 88.4 68.7833 87.5 67.55C86.6 66.3167 85.3333 65.3167 83.7 64.55C82.1 63.75 80.1 63.35 77.7 63.35C75.1333 63.35 72.8333 63.9167 70.8 65.05C68.8 66.1833 67.2167 67.8667 66.05 70.1C64.8833 72.3 64.3 75.0333 64.3 78.3C64.3 81.5 64.8833 84.2667 66.05 86.6C67.2167 88.9 68.8 90.6667 70.8 91.9C72.8333 93.1333 75.1333 93.75 77.7 93.75C80.3333 93.75 82.4833 93.35 84.15 92.55C85.8167 91.7167 87.0667 90.6167 87.9 89.25C88.7333 87.85 89.2333 86.3167 89.4 84.65H104.75C104.75 87.1167 104.167 89.6333 103 92.2C101.867 94.7333 100.167 97.05 97.9 99.15C95.6667 101.25 92.8667 102.95 89.5 104.25C86.1333 105.55 82.2333 106.2 77.8 106.2Z"
                      fill="white"
                    />
                  </svg>
                  <Link
                    href="https://craftled.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-gray-900 hover:text-gray-700"
                  >
                    Craftled
                  </Link>
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500 text-center md:text-left">
              {copyrightYears} © Job Board Starter - An open-source Next.js
              template under MIT license.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

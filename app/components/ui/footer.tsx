"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t mt-24">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
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
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Built by</span>
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
    </footer>
  );
}

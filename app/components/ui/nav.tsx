"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GitHubIcon, BriefcaseIcon } from "./icons";

export function Nav() {
  return (
    <nav className="border-b">
      <div className="container flex justify-between items-center py-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium hover:text-gray-700"
        >
          <BriefcaseIcon className="h-5 w-5" />
          Job Board Starter
        </Link>
        <Button asChild variant="outline" size="sm" className="gap-2">
          <Link
            href="https://github.com/tomaslau/jobboardstarter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon className="h-4 w-4" />
            View on GitHub
          </Link>
        </Button>
      </div>
    </nav>
  );
}

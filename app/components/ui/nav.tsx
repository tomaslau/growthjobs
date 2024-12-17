import Link from "next/link";
import config from "@/config/config";
import dynamic from "next/dynamic";
import { Briefcase, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// Default to Briefcase if the icon fails to load
const DynamicIcon = dynamic(
  () =>
    import("lucide-react").then((mod) => mod[config.nav.icon] || mod.Briefcase),
  {
    loading: () => <Briefcase className="h-4 w-4" />,
    ssr: true,
  }
);

export function Nav() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="container mx-auto px-4">
        <nav
          className="flex h-14 items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center space-x-1.5 text-zinc-900 hover:text-zinc-800 transition-colors"
            aria-label="Home"
          >
            <DynamicIcon className="h-4 w-4" aria-hidden="true" />
            <span className="text-sm font-medium">{config.nav.title}</span>
          </Link>

          <div className="flex items-center">
            {/* Primary Navigation */}
            <nav
              className="flex items-center space-x-6 mr-6"
              aria-label="Primary"
            >
              {[
                { href: "/jobs", label: "Jobs" },
                { href: "/alerts", label: "Job Alerts" },
                { href: "/about", label: "About" },
                { href: "/changelog", label: "Changelog" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-2" aria-label="Actions">
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
        </nav>
      </div>
    </header>
  );
}

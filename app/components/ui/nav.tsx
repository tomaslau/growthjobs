import Link from "next/link";
import config from "@/config/config";
import dynamic from "next/dynamic";
import { Briefcase, Github } from "lucide-react";
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
    <header className="border-b">
      <div className="container mx-auto px-4">
        <nav className="flex h-14 items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-1.5 text-zinc-900 hover:text-zinc-800"
          >
            <DynamicIcon className="h-4 w-4" />
            <span className="text-sm font-medium">{config.nav.title}</span>
          </Link>

          <div className="flex items-center">
            {config.nav.github.show && (
              <Button
                asChild
                variant="outline"
                size="xs"
                className="gap-1.5 text-xs"
              >
                <Link
                  href={config.nav.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-3.5 w-3.5" />
                  View on GitHub
                </Link>
              </Button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

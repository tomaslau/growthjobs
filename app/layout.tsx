import "./globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Job Board Starter",
  description: "Open source job board starter built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={`${GeistSans.className} flex min-h-screen flex-col`}>
        <nav className="border-b">
          <div className="container flex justify-between items-center py-3">
            <Link href="/" className="text-base font-medium">
              Job Board Starter
            </Link>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="gap-2 font-normal"
            >
              <Link
                href="https://github.com/tomaslau/jobboardstarter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon className="h-4 w-4" />
                Clone & Start
              </Link>
            </Button>
          </div>
        </nav>
        <main className="flex-1">{children}</main>
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
      </body>
    </html>
  );
}

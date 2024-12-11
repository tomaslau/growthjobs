import "./globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Link from "next/link";
import { Github } from "lucide-react";

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
      <body className={GeistSans.className}>
        <nav className="border-b">
          <div className="container flex justify-between items-center py-3">
            <Link href="/" className="text-base font-medium">
              Job Board Starter
            </Link>
            <Link
              href="https://github.com/tomaslau/jobboardstarter"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github size={20} />
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}

import "./globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Link from "next/link";

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
          <div className="container mx-auto px-4 py-3">
            <Link href="/" className="text-base font-medium">
              Job Board Starter
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}

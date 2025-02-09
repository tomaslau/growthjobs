import "./globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Nav } from "@/components/ui/nav";
import { Footer } from "@/components/ui/footer";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";
import config from "@/config/config";

export const metadata: Metadata = {
  title: `${config.title} | ${config.nav.title}`,
  description: config.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        {config.scripts.head.map((script, index) => (
          <Script key={index} {...script} />
        ))}
      </head>
      <body className={`${GeistSans.className} flex min-h-screen flex-col`}>
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
        {config.scripts.body.map((script, index) => (
          <Script key={index} {...script} />
        ))}
      </body>
    </html>
  );
}

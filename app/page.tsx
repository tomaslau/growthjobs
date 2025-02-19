import { getJobs } from "@/lib/db/airtable";
import { HomePage } from "@/components/home/HomePage";
import { Metadata } from "next";
import config from "@/config/config";

// Add metadata for SEO
export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  openGraph: {
    title: config.title,
    description: config.description,
    type: "website",
    url: config.url,
  },
  twitter: {
    card: "summary_large_image",
    title: config.title,
    description: config.description,
  },
  alternates: {
    canonical: config.url,
  },
};

export const revalidate = 300;

export default async function Page() {
  const jobs = await getJobs();
  console.log("Server-side jobs fetched:", jobs.length);
  return <HomePage initialJobs={jobs} />;
}

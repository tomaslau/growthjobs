import { getJobs } from "@/lib/db/airtable";
import { HomePage } from "@/components/home/HomePage";
import { unstable_cache } from "next/cache";
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

// Cache the getJobs function with a 5-minute revalidation period
const getCachedJobs = unstable_cache(
  async () => getJobs(),
  ["jobs"],
  { revalidate: 300 } // 5 minutes
);

export const revalidate = 300; // Revalidate page every 5 minutes

export default async function Page() {
  const jobs = await getCachedJobs();
  console.log("Server-side jobs fetched:", jobs.length);

  // If no jobs, try fetching directly
  if (!jobs.length) {
    console.log("No cached jobs found, fetching directly");
    const directJobs = await getJobs();
    console.log("Direct fetch results:", directJobs.length);
    return <HomePage initialJobs={directJobs} />;
  }

  return <HomePage initialJobs={jobs} />;
}

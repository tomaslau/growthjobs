import { getJobs } from "@/lib/db/airtable";
import { HomePage } from "./components/HomePage";
import { unstable_cache } from "next/cache";

// Cache the getJobs function with a 5-minute revalidation period
const getCachedJobs = unstable_cache(
  async () => getJobs(),
  ["jobs"],
  { revalidate: 300 } // 5 minutes
);

export const revalidate = 300; // Revalidate page every 5 minutes

export default async function Page() {
  const jobs = await getCachedJobs();
  return <HomePage initialJobs={jobs} />;
}

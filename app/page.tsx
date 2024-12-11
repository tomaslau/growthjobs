import { getJobs } from "@/lib/db/airtable";
import { HomePage } from "./components/HomePage";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Page() {
  const jobs = await getJobs();

  return <HomePage initialJobs={jobs} />;
}

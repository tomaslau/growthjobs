import { getJobs } from "@/lib/db/airtable";
import { HomePage } from "./components/HomePage";

export default async function Page() {
  const jobs = await getJobs();

  return <HomePage initialJobs={jobs} />;
}

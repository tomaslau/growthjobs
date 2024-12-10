import Airtable from "airtable";

// Initialize Airtable with Personal Access Token
const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_ACCESS_TOKEN,
}).base(process.env.AIRTABLE_BASE_ID!);

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
  salary_range: string;
  description: string;
  apply_url: string;
  posted_date: string;
  status: "active" | "inactive";
}

export async function getJobs(): Promise<Job[]> {
  try {
    const records = await airtable("Jobs")
      .select({
        filterByFormula: "{status} = 'active'",
        sort: [{ field: "posted_date", direction: "desc" }],
      })
      .all();

    return records.map((record) => ({
      id: record.id,
      title: record.get("title") as string,
      company: record.get("company") as string,
      location: record.get("location") as string,
      type: record.get("type") as Job["type"],
      salary_range: record.get("salary_range") as string,
      description: record.get("description") as string,
      apply_url: record.get("apply_url") as string,
      posted_date: record.get("posted_date") as string,
      status: record.get("status") as Job["status"],
    }));
  } catch (error) {
    console.error("Error fetching jobs:", {
      message: (error as Error).message,
      stack: (error as Error).stack,
      error,
    });
    return [];
  }
}

export async function getJob(id: string): Promise<Job | null> {
  try {
    const record = await airtable("Jobs").find(id);

    return {
      id: record.id,
      title: record.get("title") as string,
      company: record.get("company") as string,
      location: record.get("location") as string,
      type: record.get("type") as Job["type"],
      salary_range: record.get("salary_range") as string,
      description: record.get("description") as string,
      apply_url: record.get("apply_url") as string,
      posted_date: record.get("posted_date") as string,
      status: record.get("status") as Job["status"],
    };
  } catch (error) {
    console.error("Error fetching job:", error);
    return null;
  }
}

export async function testConnection() {
  try {
    // Try to list records from the Jobs table
    const records = await airtable("Jobs")
      .select({
        maxRecords: 1, // Just get one record to test
      })
      .all();

    console.log(
      "Connected to Airtable successfully.",
      `Found ${records.length} records in Jobs table.`
    );
    return true;
  } catch (error) {
    console.error("Airtable connection test failed:", {
      message: (error as Error).message,
      stack: (error as Error).stack,
      error,
    });
    return false;
  }
}

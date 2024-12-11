import Airtable from "airtable";

// Initialize Airtable with Personal Access Token
const base = new Airtable({
  apiKey: process.env.AIRTABLE_ACCESS_TOKEN,
  endpointUrl: "https://api.airtable.com",
}).base(process.env.AIRTABLE_BASE_ID || "");

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
    if (!process.env.AIRTABLE_ACCESS_TOKEN || !process.env.AIRTABLE_BASE_ID) {
      console.error("Missing env vars:", {
        hasToken: !!process.env.AIRTABLE_ACCESS_TOKEN,
        hasBaseId: !!process.env.AIRTABLE_BASE_ID,
      });
      throw new Error("Airtable credentials are not configured");
    }

    console.log(
      "Attempting to fetch jobs with token:",
      process.env.AIRTABLE_ACCESS_TOKEN?.slice(0, 10) + "..."
    );

    const records = await base("Jobs")
      .select({
        filterByFormula: "{status} = 'active'",
        sort: [{ field: "posted_date", direction: "desc" }],
      })
      .all();

    console.log("Successfully fetched records:", records.length);

    return records.map((record) => ({
      id: record.id,
      title: record.fields.title as string,
      company: record.fields.company as string,
      location: record.fields.location as string,
      type: record.fields.type as Job["type"],
      salary_range: record.fields.salary_range as string,
      description: record.fields.description as string,
      apply_url: record.fields.apply_url as string,
      posted_date: record.fields.posted_date as string,
      status: record.fields.status as Job["status"],
    }));
  } catch (error) {
    console.error("Error fetching jobs:", {
      message: (error as Error).message,
      name: (error as Error).name,
      stack: (error as Error).stack,
    });
    return [];
  }
}

export async function getJob(id: string): Promise<Job | null> {
  try {
    const record = await base("Jobs").find(id);

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
    const records = await base("Jobs")
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

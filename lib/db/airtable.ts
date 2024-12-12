import Airtable from "airtable";

// Initialize Airtable with Personal Access Token
const base = new Airtable({
  apiKey: process.env.AIRTABLE_ACCESS_TOKEN,
  endpointUrl: "https://api.airtable.com",
}).base(process.env.AIRTABLE_BASE_ID || "");

export type CareerLevel =
  | "Internship"
  | "EntryLevel"
  | "Associate"
  | "Junior"
  | "MidLevel"
  | "Senior"
  | "Staff"
  | "Principal"
  | "Lead"
  | "Manager"
  | "SeniorManager"
  | "Director"
  | "SeniorDirector"
  | "VP"
  | "SVP"
  | "EVP"
  | "CLevel"
  | "Founder"
  | "NotSpecified";

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
  remote_friendly: boolean;
  career_level: CareerLevel[];
  visa_sponsorship: "Yes" | "No" | "Not specified";
  job_timezone: string;
}

// Ensure career level is always returned as an array
function normalizeCareerLevel(value: unknown): CareerLevel[] {
  console.log("Raw career level value:", value);

  if (!value) {
    console.log("No value provided, returning NotSpecified");
    return ["NotSpecified"];
  }

  if (Array.isArray(value)) {
    console.log("Value is array:", value);
    // Convert Airtable's display values to our enum values
    return value.map((level) => {
      // Handle Airtable's display format (e.g., "Entry Level" -> "EntryLevel")
      const normalized = level.replace(/\s+/g, "");
      console.log(`Normalized "${level}" to "${normalized}"`);
      return normalized as CareerLevel;
    });
  }

  // Handle single value
  console.log("Single value:", value);
  const normalized = (value as string).replace(/\s+/g, "");
  console.log(`Normalized single value "${value}" to "${normalized}"`);
  return [normalized as CareerLevel];
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

    const records = await base("Jobs")
      .select({
        filterByFormula: "{status} = 'active'",
        sort: [{ field: "posted_date", direction: "desc" }],
      })
      .all();

    return records.map((record) => {
      console.log(`Processing job ${record.id}:`, record.fields.title);
      console.log("Career level from Airtable:", record.fields.career_level);

      const job = {
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
        remote_friendly: (record.fields.remote_friendly as boolean) || false,
        career_level: normalizeCareerLevel(record.fields.career_level),
        visa_sponsorship:
          (record.fields.visa_sponsorship as Job["visa_sponsorship"]) ||
          "Not specified",
        job_timezone: (record.fields.job_timezone as string) || "Not specified",
      };

      console.log("Normalized career levels:", job.career_level);
      return job;
    });
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
    if (!process.env.AIRTABLE_ACCESS_TOKEN || !process.env.AIRTABLE_BASE_ID) {
      throw new Error("Airtable credentials are not configured");
    }

    const record = await base("Jobs").find(id);

    if (!record || !record.fields) {
      return null;
    }

    // Validate required fields
    const requiredFields = [
      "title",
      "company",
      "location",
      "type",
      "salary_range",
      "description",
      "apply_url",
      "posted_date",
      "status",
    ];

    const missingFields = requiredFields.filter(
      (field) => !record.fields[field]
    );

    if (missingFields.length > 0) {
      console.error(`Missing required fields: ${missingFields.join(", ")}`);
      return null;
    }

    console.log(`Fetching single job ${id}:`, record.fields.title);
    console.log("Career level from Airtable:", record.fields.career_level);

    const job = {
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
      remote_friendly: (record.fields.remote_friendly as boolean) || false,
      career_level: normalizeCareerLevel(record.fields.career_level),
      visa_sponsorship:
        (record.fields.visa_sponsorship as Job["visa_sponsorship"]) ||
        "Not specified",
      job_timezone: (record.fields.job_timezone as string) || "Not specified",
    };

    console.log("Normalized career levels:", job.career_level);
    return job;
  } catch (error) {
    console.error("Error fetching job:", {
      message: (error as Error).message,
      name: (error as Error).name,
      stack: (error as Error).stack,
    });
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

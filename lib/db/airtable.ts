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

export type SalaryUnit = "hour" | "day" | "week" | "month" | "year" | "project";
export type SalaryCurrency = "USD" | "EUR" | "GBP";

export interface Salary {
  min: number | null;
  max: number | null;
  currency: SalaryCurrency;
  unit: SalaryUnit;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
  salary: Salary | null;
  description: string;
  apply_url: string;
  posted_date: string;
  status: "active" | "inactive";
  remote_friendly: "Yes" | "No" | "Not specified";
  career_level: CareerLevel[];
  visa_sponsorship: "Yes" | "No" | "Not specified";
  job_timezone: string;
  featured: boolean;
}

// Format salary for display
export function formatSalary(salary: Salary | null): string {
  if (!salary || (!salary.min && !salary.max)) return "Not specified";

  const currencySymbols: Record<SalaryCurrency, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
  };

  const formatNumber = (num: number | null): string => {
    if (!num) return "";
    // Only use k format for numbers >= 10000
    if (num >= 10000) {
      return `${(num / 1000).toFixed(0)}k`;
    }
    // For smaller numbers, show the full value with thousands separator
    return num.toLocaleString();
  };

  const symbol = currencySymbols[salary.currency];

  // Handle single value cases (only min or only max)
  let range;
  if (salary.min && salary.max) {
    range =
      salary.min === salary.max
        ? formatNumber(salary.min)
        : `${formatNumber(salary.min)}-${formatNumber(salary.max)}`;
  } else {
    range = formatNumber(salary.min || salary.max);
  }

  // Use full words with slash
  const unitDisplay = {
    hour: "/hour",
    day: "/day",
    week: "/week",
    month: "/month",
    year: "/year",
    project: "/project",
  }[salary.unit];

  return `${symbol}${range}${unitDisplay}`;
}

// Normalize salary for comparison (convert to annual USD)
export function normalizeAnnualSalary(salary: Salary | null): number {
  if (!salary || (!salary.min && !salary.max)) return -1;

  // Currency conversion rates (simplified - in production, use real-time rates)
  const currencyRates: Record<SalaryCurrency, number> = {
    USD: 1,
    EUR: 1.1,
    GBP: 1.27,
  };

  // Annualization multipliers
  const annualMultiplier: Record<SalaryUnit, number> = {
    hour: 2080, // 40 hours/week * 52 weeks
    day: 260, // 52 weeks * 5 days
    week: 52,
    month: 12,
    year: 1,
    project: 1, // Projects treated as one-time annual equivalent
  };

  // Use the maximum value for comparison, or minimum if no maximum
  const value = salary.max || salary.min || 0;

  // Convert to USD and annualize
  return value * currencyRates[salary.currency] * annualMultiplier[salary.unit];
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

// Convert remote friendly value to Yes/No/Not specified
function normalizeRemoteFriendly(value: unknown): Job["remote_friendly"] {
  console.log("Raw remote_friendly value:", value);

  // Handle string values from Airtable single select
  if (typeof value === "string") {
    if (value === "Yes" || value === "No") return value;
    return "Not specified";
  }

  // Handle legacy boolean values
  if (value === true) return "Yes";
  if (value === false) return "No";

  return "Not specified";
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
      // Parse salary data
      const hasSalaryData =
        record.fields.salary_min || record.fields.salary_max;
      const salary = hasSalaryData
        ? {
            min: (record.fields.salary_min as number) || null,
            max: (record.fields.salary_max as number) || null,
            currency:
              (record.fields.salary_currency as SalaryCurrency) || "USD",
            unit: (record.fields.salary_unit as SalaryUnit) || "year",
          }
        : null;

      return {
        id: record.id,
        title: record.fields.title as string,
        company: record.fields.company as string,
        location: record.fields.location as string,
        type: record.fields.type as Job["type"],
        salary,
        description: record.fields.description as string,
        apply_url: record.fields.apply_url as string,
        posted_date: record.fields.posted_date as string,
        status: record.fields.status as Job["status"],
        remote_friendly: normalizeRemoteFriendly(record.fields.remote_friendly),
        career_level: normalizeCareerLevel(record.fields.career_level),
        visa_sponsorship:
          (record.fields.visa_sponsorship as Job["visa_sponsorship"]) ||
          "Not specified",
        job_timezone: (record.fields.job_timezone as string) || "Not specified",
        featured: record.fields.featured === true,
      };
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
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
    console.log(
      "Remote friendly from Airtable:",
      record.fields.remote_friendly
    );

    const job = {
      id: record.id,
      title: record.fields.title as string,
      company: record.fields.company as string,
      location: record.fields.location as string,
      type: record.fields.type as Job["type"],
      salary: {
        min: (record.fields.salary_min as number) || null,
        max: (record.fields.salary_max as number) || null,
        currency: (record.fields.salary_currency as SalaryCurrency) || "USD",
        unit: (record.fields.salary_unit as SalaryUnit) || "year",
      },
      description: record.fields.description as string,
      apply_url: record.fields.apply_url as string,
      posted_date: record.fields.posted_date as string,
      status: record.fields.status as Job["status"],
      remote_friendly: normalizeRemoteFriendly(record.fields.remote_friendly),
      career_level: normalizeCareerLevel(record.fields.career_level),
      visa_sponsorship:
        (record.fields.visa_sponsorship as Job["visa_sponsorship"]) ||
        "Not specified",
      job_timezone: (record.fields.job_timezone as string) || "Not specified",
      featured: record.fields.featured === true,
    };

    console.log("Normalized remote friendly:", job.remote_friendly);
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

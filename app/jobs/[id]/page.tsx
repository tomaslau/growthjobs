import { getJob, getJobs, CareerLevel } from "@/lib/db/airtable";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils/formatDate";
import ReactMarkdown from "react-markdown";
import { draftMode } from "next/headers";
import { unstable_cache } from "next/cache";
import { PostJobBanner } from "@/components/ui/post-job-banner";

// Cache the getJob function
const getCachedJob = unstable_cache(
  async (id: string) => getJob(id),
  ["job", "id"],
  { revalidate: 300, tags: ["job"] } // 5 minutes
);

// Format career level for display
function formatCareerLevel(level: CareerLevel): string {
  const formatMap: Record<CareerLevel, string> = {
    Internship: "Internship",
    EntryLevel: "Entry Level",
    Associate: "Associate",
    Junior: "Junior",
    MidLevel: "Mid Level",
    Senior: "Senior",
    Staff: "Staff",
    Principal: "Principal",
    Lead: "Lead",
    Manager: "Manager",
    SeniorManager: "Senior Manager",
    Director: "Director",
    SeniorDirector: "Senior Director",
    VP: "VP",
    SVP: "SVP",
    EVP: "EVP",
    CLevel: "C-Level",
    Founder: "Founder",
    NotSpecified: "Not Specified",
  };

  return formatMap[level] || level;
}

// Generate static params for all active jobs
export async function generateStaticParams() {
  const jobs = await getJobs();
  return jobs.map((job) => ({
    id: job.id,
  }));
}

// Force static generation unless in draft mode
export const dynamic = "force-static";
export const revalidate = 300;

export default async function JobPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { isEnabled: isDraft } = await draftMode();

  // If in draft mode, fetch fresh data, otherwise use cached data
  const job = isDraft ? await getJob(id) : await getCachedJob(id);

  if (!job) {
    notFound();
  }

  const { fullDate, relativeTime } = formatDate(job.posted_date);

  // Ensure career_level is always an array and filter out duplicates
  const careerLevels = Array.from(
    new Set(
      Array.isArray(job.career_level) ? job.career_level : [job.career_level]
    )
  );
  console.log("Career levels to display:", careerLevels);

  return (
    <main className="container py-6">
      <div className="flex justify-between gap-16">
        {/* Main content */}
        <article className="flex-1 max-w-[640px]">
          <div className="mb-8">
            <h1 className="text-2xl font-medium mb-2">{job.title}</h1>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span>{job.company}</span>
              <span>•</span>
              <span>{job.location}</span>
              <span>•</span>
              <span>{job.type}</span>
              <span>•</span>
              <time dateTime={job.posted_date} className="text-gray-500">
                Posted {fullDate} ({relativeTime})
              </time>
            </div>
          </div>

          <div className="prose prose-sm prose-gray max-w-none">
            <h2 className="text-lg font-medium mb-4">Description</h2>
            <div className="markdown-content">
              <ReactMarkdown>{job.description}</ReactMarkdown>
            </div>
          </div>

          <div className="mt-8">
            <a
              href={job.apply_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply for this position
            </a>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="w-[300px] shrink-0">
          <div className="sticky top-6 space-y-6">
            <div className="p-6 border rounded-lg space-y-6">
              <div>
                <h2 className="text-sm font-medium mb-2">Date Posted</h2>
                <p className="text-sm text-gray-600">
                  {fullDate} ({relativeTime})
                </p>
              </div>

              <div>
                <h2 className="text-sm font-medium mb-2">Job Location</h2>
                <p className="text-sm text-gray-600">{job.location}</p>
              </div>

              <div>
                <h2 className="text-sm font-medium mb-2">Remote-Friendly</h2>
                <span
                  className={`inline-block px-2 py-1 text-xs rounded-full ${
                    job.remote_friendly === "Yes"
                      ? "bg-green-100 text-green-700"
                      : job.remote_friendly === "No"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {job.remote_friendly}
                </span>
              </div>

              <div>
                <h2 className="text-sm font-medium mb-2">Salary</h2>
                <p className="text-sm text-gray-600">{job.salary_range}</p>
              </div>

              <div>
                <h2 className="text-sm font-medium mb-2">Career Level</h2>
                <div className="flex flex-wrap gap-2">
                  {careerLevels.map((level, index) => (
                    <span
                      key={`${level}-${index}`}
                      className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                    >
                      {formatCareerLevel(level)}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-sm font-medium mb-2">Job Source</h2>
                <a
                  href={job.apply_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Apply on company website
                </a>
              </div>

              <div>
                <h2 className="text-sm font-medium mb-2">Visa Sponsorship</h2>
                <p className="text-sm text-gray-600">{job.visa_sponsorship}</p>
              </div>

              <div>
                <h2 className="text-sm font-medium mb-2">Job Timezones</h2>
                <p className="text-sm text-gray-600">{job.job_timezone}</p>
              </div>
            </div>

            <PostJobBanner />
          </div>
        </aside>
      </div>
    </main>
  );
}

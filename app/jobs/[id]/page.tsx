import { getJob, getJobs } from "@/lib/db/airtable";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils/formatDate";
import ReactMarkdown from "react-markdown";
import { draftMode } from "next/headers";
import { unstable_cache } from "next/cache";

// Cache the getJob function
const getCachedJob = unstable_cache(
  async (id: string) => getJob(id),
  ["job", "id"],
  { revalidate: 300, tags: ["job"] } // 5 minutes
);

// Generate static params for all active jobs
export async function generateStaticParams() {
  const jobs = await getJobs();
  return jobs.map((job) => ({
    id: job.id,
  }));
}

// Force static generation unless in draft mode
export const dynamic = "force-static";
export const revalidate = 300; // Revalidate every 5 minutes

export default async function JobPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { isEnabled: isDraft } = await draftMode();

  // If in draft mode, fetch fresh data, otherwise use cached data
  const job = isDraft ? await getJob(id) : await getCachedJob(id);

  if (!job) {
    notFound();
  }

  const { fullDate, relativeTime } = formatDate(job.posted_date);

  return (
    <main className="container py-6">
      <article className="max-w-[700px]">
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

        <div className="mb-8">
          <h2 className="text-base font-medium mb-2">Salary Range</h2>
          <p className="text-gray-700 text-sm">{job.salary_range}</p>
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
    </main>
  );
}

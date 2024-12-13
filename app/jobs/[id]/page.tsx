import { getJob, getJobs } from "@/lib/db/airtable";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils/formatDate";
import ReactMarkdown from "react-markdown";
import { draftMode } from "next/headers";
import { unstable_cache } from "next/cache";
import { PostJobBanner } from "@/components/ui/post-job-banner";
import { JobDetailsSidebar } from "@/components/ui/job-details-sidebar";
import { Button } from "@/components/ui/button";

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
            <Button
              asChild
              className="bg-zinc-900 text-white hover:bg-zinc-800"
            >
              <a href={job.apply_url} target="_blank" rel="noopener noreferrer">
                Apply for this position
              </a>
            </Button>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="w-[300px] shrink-0">
          <div className="sticky top-6 space-y-6">
            <JobDetailsSidebar
              fullDate={fullDate}
              relativeTime={relativeTime}
              location={job.location}
              remote_friendly={job.remote_friendly}
              salary_range={job.salary_range}
              career_level={job.career_level}
              apply_url={job.apply_url}
              visa_sponsorship={job.visa_sponsorship}
              job_timezone={job.job_timezone}
            />
            <PostJobBanner />
          </div>
        </aside>
      </div>
    </main>
  );
}

import { getJob, getJobs, formatSalary } from "@/lib/db/airtable";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils/formatDate";
import ReactMarkdown from "react-markdown";
import { draftMode } from "next/headers";
import { unstable_cache } from "next/cache";
import { PostJobBanner } from "@/components/ui/post-job-banner";
import { JobDetailsSidebar } from "@/components/ui/job-details-sidebar";
import { SimilarJobs } from "@/components/ui/similar-jobs";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArrowUpRight } from "lucide-react";

// Cache the getJob function
const getCachedJob = unstable_cache(
  async (id: string) => getJob(id),
  ["job", "id"],
  { revalidate: 300, tags: ["job"] } // 5 minutes
);

// Cache the getJobs function
const getCachedJobs = unstable_cache(
  async () => getJobs(),
  ["jobs"],
  { revalidate: 300, tags: ["jobs"] } // 5 minutes
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
  const allJobs = isDraft ? await getJobs() : await getCachedJobs();

  if (!job) {
    notFound();
  }

  const { fullDate, relativeTime } = formatDate(job.posted_date);
  const showSalary =
    job.salary && (job.salary.min !== null || job.salary.max !== null);

  return (
    <main className="container py-6">
      <div className="flex justify-between gap-16">
        {/* Main content */}
        <article className="flex-1 max-w-[640px]">
          <div className="mb-4">
            <Breadcrumb>
              <BreadcrumbList className="gap-1 text-xs">
                <BreadcrumbItem>
                  <BreadcrumbLink
                    className="text-gray-500 hover:text-gray-900 transition-colors"
                    href="/"
                  >
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-gray-300 mx-[-0.25rem]" />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    className="text-gray-500 hover:text-gray-900 transition-colors"
                    href="/"
                  >
                    Jobs
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-gray-300 mx-[-0.25rem]" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-gray-900">
                    {job.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="mb-8">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold">{job.title}</h1>
              <div className="text-base text-gray-600">{job.company}</div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span>{job.type}</span>
                  {showSalary && (
                    <>
                      <span>•</span>
                      <span>{formatSalary(job.salary)}</span>
                    </>
                  )}
                  {(showSalary || job.type) && <span>•</span>}
                  <span>{job.location}</span>
                  <span>•</span>
                  <time dateTime={job.posted_date}>
                    {fullDate} ({relativeTime})
                  </time>
                </div>
                <Button
                  asChild
                  size="xs"
                  className="bg-zinc-900 text-white hover:bg-zinc-800 gap-1.5 text-xs"
                >
                  <a
                    href={job.apply_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apply Now
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div className="prose prose-sm prose-gray max-w-none">
            <div className="h-px bg-gray-200 my-8" aria-hidden="true" />
            <div className="markdown-content [&_a]:text-zinc-900 [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-zinc-800 [&_a]:transition-colors">
              <ReactMarkdown>{job.description}</ReactMarkdown>
            </div>
          </div>

          <div className="mt-8">
            <Button
              asChild
              size="xs"
              className="bg-zinc-900 text-white hover:bg-zinc-800 gap-1.5 text-xs"
            >
              <a href={job.apply_url} target="_blank" rel="noopener noreferrer">
                Apply Now
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="w-[300px] shrink-0">
          <div className="space-y-6">
            <JobDetailsSidebar
              fullDate={fullDate}
              relativeTime={relativeTime}
              location={job.location}
              remote_friendly={job.remote_friendly}
              salary={job.salary}
              career_level={job.career_level}
              apply_url={job.apply_url}
              visa_sponsorship={job.visa_sponsorship}
              job_timezone={job.job_timezone}
            />
            <PostJobBanner />
            <SimilarJobs currentJob={job} allJobs={allJobs} />
          </div>
        </aside>
      </div>
    </main>
  );
}

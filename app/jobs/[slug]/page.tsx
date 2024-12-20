import { getJobs, formatSalary } from "@/lib/db/airtable";
import { formatDate } from "@/lib/utils/formatDate";
import { generateJobSlug } from "@/lib/utils/slugify";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { PostJobBanner } from "@/components/ui/post-job-banner";
import { JobDetailsSidebar } from "@/components/ui/job-details-sidebar";
import { SimilarJobs } from "@/components/ui/similar-jobs";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Metadata } from "next";

// Generate static params for all active jobs
export async function generateStaticParams() {
  const jobs = await getJobs();
  return jobs.map((job) => ({
    slug: generateJobSlug(job.title, job.company),
  }));
}

// Generate metadata for the job page
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  console.log("Generating metadata for slug:", slug);

  const allJobs = await getJobs();
  const job = allJobs.find((j) => generateJobSlug(j.title, j.company) === slug);

  if (!job) {
    return {
      title: "Job Not Found",
      description:
        "The job posting you're looking for doesn't exist or has been removed.",
    };
  }

  return {
    title: `${job.title} at ${job.company}`,
    description: `${job.type} position at ${job.company}. Location: ${
      job.location
    }${job.salary ? `. Salary: ${formatSalary(job.salary)}` : ""}.`,
    openGraph: {
      title: `${job.title} at ${job.company}`,
      description: `${job.type} position at ${job.company}. Location: ${
        job.location
      }${job.salary ? `. Salary: ${formatSalary(job.salary)}` : ""}.`,
    },
  };
}

// Make the page dynamic to fetch fresh data
export const dynamic = "force-dynamic";

export default async function JobPage({
  params,
}: {
  params: { slug: string };
}) {
  console.log("Starting job page render for slug:", params.slug);

  try {
    // Get all jobs to find the one matching the slug
    console.log("Fetching jobs from Airtable...");
    const allJobs = await getJobs();
    console.log("Fetched jobs count:", allJobs.length);

    // Find the job with matching slug
    const job = allJobs.find((j) => {
      const jobSlug = generateJobSlug(j.title, j.company);
      console.log(
        `Comparing slugs - Generated: ${jobSlug}, Requested: ${params.slug}`
      );
      return jobSlug === params.slug;
    });

    if (!job) {
      console.log("No job found for slug:", params.slug);
      console.log(
        "Available slugs:",
        allJobs.map((j) => generateJobSlug(j.title, j.company))
      );
      return null; // This will trigger the not-found page
    }

    console.log("Found job:", {
      id: job.id,
      title: job.title,
      description: {
        length: job.description?.length || 0,
        type: typeof job.description,
        content: job.description,
        firstLine: job.description?.split("\n")[0] || "",
        hasHtmlTags: job.description?.includes("<") || false,
      },
    });

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
                      <ArrowUpRight
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="prose prose-sm prose-gray max-w-none">
              <div className="h-px bg-gray-200 my-8" aria-hidden="true" />
              <div className="markdown-content [&_a]:text-zinc-900 [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-zinc-800 [&_a]:transition-colors">
                {!job.description && (
                  <p className="text-red-500">No description available</p>
                )}
                <div className="hidden">
                  Raw description: {JSON.stringify(job.description)}
                </div>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkBreaks]}
                  components={{
                    // Customize heading styles
                    h1: ({ node, ...props }) => (
                      <h1 className="text-2xl font-bold my-4" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2 className="text-xl font-bold my-3" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3 className="text-lg font-bold my-2" {...props} />
                    ),
                    // Style links
                    a: ({ node, ...props }) => (
                      <a
                        className="text-blue-600 hover:text-blue-800"
                        {...props}
                      />
                    ),
                    // Style lists
                    ul: ({ node, ...props }) => (
                      <ul className="list-disc ml-4 my-2" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol className="list-decimal ml-4 my-2" {...props} />
                    ),
                    // Style paragraphs
                    p: ({ node, ...props }) => (
                      <p className="my-2" {...props} />
                    ),
                  }}
                >
                  {job.description || ""}
                </ReactMarkdown>
              </div>
            </div>

            <div className="mt-8">
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
  } catch (error) {
    console.error("Error in JobPage:", error);
    return null; // This will trigger the not-found page
  }
}

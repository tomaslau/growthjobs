import { getJob } from "@/lib/db/airtable";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils/formatDate";

export default async function JobPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const job = await getJob(id);

  if (!job) {
    notFound();
  }

  const { fullDate, relativeTime } = formatDate(job.posted_date);

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
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

        <div className="prose max-w-none text-sm">
          <div className="mb-6">
            <h2 className="text-base font-medium mb-2">Salary Range</h2>
            <p>{job.salary_range}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-base font-medium mb-2">Description</h2>
            <div className="whitespace-pre-wrap">{job.description}</div>
          </div>

          <a
            href={job.apply_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Apply for this position
          </a>
        </div>
      </div>
    </main>
  );
}

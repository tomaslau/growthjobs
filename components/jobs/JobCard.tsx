import Link from "next/link";
import { Job } from "@/lib/db/airtable";
import { formatDate } from "@/lib/utils/formatDate";

export function JobCard({ job }: { job: Job }) {
  const { fullDate, relativeTime } = formatDate(job.posted_date);
  const showSalary = job.salary_range && job.salary_range !== "Not specified";

  return (
    <Link
      href={`/jobs/${job.id}`}
      className="block p-5 border rounded-lg hover:border-gray-400 transition-colors"
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-base font-medium">{job.title}</h2>
          <p className="text-sm text-gray-600">{job.company}</p>
        </div>
        <span className="inline-block px-2 py-1 text-xs bg-gray-100 rounded-full">
          {job.type}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
        <span>{job.location}</span>
        {showSalary && <span>{job.salary_range}</span>}
        <time dateTime={job.posted_date}>
          {fullDate} ({relativeTime})
        </time>
      </div>
    </Link>
  );
}

import Link from "next/link";
import { Job, formatSalary } from "@/lib/db/airtable";
import { formatDate } from "@/lib/utils/formatDate";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function JobCard({ job }: { job: Job }) {
  const { fullDate, relativeTime } = formatDate(job.posted_date);
  const showSalary =
    job.salary && (job.salary.min !== null || job.salary.max !== null);

  return (
    <div className="group relative">
      <Link
        href={`/jobs/${job.id}`}
        className={`block p-5 border rounded-lg transition-all ${
          job.featured
            ? "bg-zinc-100 hover:bg-zinc-50"
            : "hover:border-gray-400"
        }`}
      >
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-medium">{job.title}</h2>
            {job.featured && (
              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-zinc-50 bg-zinc-900 rounded-full">
                <Sparkles className="w-3 h-3" />
                Featured
              </span>
            )}
          </div>
          <div className="text-sm text-gray-600">{job.company}</div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
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
        </div>
      </Link>
      {job.apply_url && (
        <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            asChild
            size="xs"
            className="bg-zinc-900 text-white hover:bg-zinc-800 gap-1.5 text-xs"
          >
            <a
              href={job.apply_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              Apply Now
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </Button>
        </div>
      )}
    </div>
  );
}

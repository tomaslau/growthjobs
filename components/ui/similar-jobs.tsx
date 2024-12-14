import Link from "next/link";
import type { Job } from "@/lib/db/airtable";

interface SimilarJobsProps {
  currentJob: Job;
  allJobs: Job[];
}

export function SimilarJobs({ currentJob, allJobs }: SimilarJobsProps) {
  // Filter similar jobs based on title, location, or company
  const similarJobs = allJobs
    .filter((job) => {
      // Exclude current job
      if (job.id === currentJob.id) return false;

      // Check if job title contains similar keywords or is in same location
      const titleWords = currentJob.title.toLowerCase().split(" ");
      const jobTitleLower = job.title.toLowerCase();
      const isSimilarTitle = titleWords.some(
        (word) => word.length > 3 && jobTitleLower.includes(word)
      );
      const isSameLocation = job.location === currentJob.location;

      return isSimilarTitle || isSameLocation;
    })
    .slice(0, 5); // Show max 5 similar jobs

  if (similarJobs.length === 0) return null;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Similar Jobs</h2>
      <div className="space-y-3">
        {similarJobs.map((job) => (
          <Link
            key={job.id}
            href={`/jobs/${job.id}`}
            className="block hover:text-gray-900"
          >
            <div className="text-sm">{job.title}</div>
            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
              <span>{job.company}</span>
              <span>•</span>
              <span>{job.type}</span>
              <span>•</span>
              <span>{job.location}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

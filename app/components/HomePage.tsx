"use client";

import { useState } from "react";
import { JobCard } from "@/components/jobs/JobCard";
import { JobSearch } from "@/components/jobs/JobSearch";
import type { Job } from "@/lib/db/airtable";
import { TestFeatures } from "@/components/TestFeatures";

export function HomePage({ initialJobs }: { initialJobs: Job[] }) {
  const [filteredJobs, setFilteredJobs] = useState(initialJobs);

  return (
    <main className="container py-8">
      <TestFeatures />
      <h1 className="text-4xl font-bold mb-8">Latest Jobs</h1>

      <JobSearch jobs={initialJobs} onSearch={setFilteredJobs} />

      {filteredJobs.length === 0 ? (
        <p className="text-gray-600">
          No jobs found. Try adjusting your search.
        </p>
      ) : (
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </main>
  );
}

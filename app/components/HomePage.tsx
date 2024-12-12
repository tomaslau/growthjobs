"use client";

import { useState, useMemo, useCallback } from "react";
import { JobCard } from "@/components/jobs/JobCard";
import type { Job } from "@/lib/db/airtable";
import { TestFeatures } from "@/components/TestFeatures";

export function HomePage({ initialJobs }: { initialJobs: Job[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Memoize the search handler to prevent unnecessary re-renders
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  // Use memo to prevent unnecessary recalculations
  const filteredJobs = useMemo(() => {
    if (!searchTerm) return initialJobs;

    const searchLower = searchTerm.toLowerCase();
    return initialJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.location.toLowerCase().includes(searchLower)
    );
  }, [initialJobs, searchTerm]);

  return (
    <main className="container py-8">
      <TestFeatures />
      <h1 className="text-4xl font-bold mb-8">Latest Jobs</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search jobs..."
          className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <p className="text-gray-600">
            No jobs found. Try adjusting your search.
          </p>
        ) : (
          filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
        )}
      </div>
    </main>
  );
}

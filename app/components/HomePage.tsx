"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { JobCard } from "@/components/jobs/JobCard";
import type { Job } from "@/lib/db/airtable";
import { TestFeatures } from "@/components/TestFeatures";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { formatDistanceToNow, isToday } from "date-fns";

export function HomePage({ initialJobs }: { initialJobs: Job[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Debug log for initial jobs
  useEffect(() => {
    console.log("Initial jobs:", initialJobs);
  }, [initialJobs]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const filteredJobs = useMemo(() => {
    console.log("Filtering jobs with search term:", searchTerm);
    if (!searchTerm) return initialJobs;

    const searchLower = searchTerm.toLowerCase();
    const filtered = initialJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.location.toLowerCase().includes(searchLower)
    );
    console.log("Filtered jobs:", filtered);
    return filtered;
  }, [initialJobs, searchTerm]);

  // Get the most recent job's posted date
  const lastUpdated = useMemo(() => {
    if (initialJobs.length === 0) return "No jobs yet";

    const mostRecentDate = Math.max(
      ...initialJobs.map((job) => new Date(job.posted_date).getTime())
    );

    return formatDistanceToNow(mostRecentDate, { addSuffix: true });
  }, [initialJobs]);

  // Calculate jobs added today
  const jobsAddedToday = useMemo(() => {
    return initialJobs.filter((job) => isToday(new Date(job.posted_date)))
      .length;
  }, [initialJobs]);

  return (
    <main className="min-h-screen bg-background">
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(0.95);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
          100% {
            transform: scale(0.95);
            opacity: 0.5;
          }
        }
        .pulse-dot {
          animation: pulse 2s infinite;
        }
      `}</style>

      {/* Hero Section */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-[640px] space-y-6">
            <div className="space-y-4">
              <Badge variant="outline" className="mb-2">
                The #1 Open Source Tech Job Board
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Find Your Next Tech Role
              </h1>
              <p className="text-sm text-muted-foreground md:text-base max-w-[540px]">
                Browse curated tech opportunities from leading companies.
                Updated daily with the latest positions.
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-[480px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by role, company, or location..."
                  className="pl-9 h-10"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 text-xs text-muted-foreground max-w-[480px]">
              <div>
                <div className="font-medium text-foreground">Open Jobs</div>
                <div className="flex items-center">
                  {jobsAddedToday > 0 && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 pulse-dot"></span>
                  )}
                  {initialJobs.length}
                  {jobsAddedToday > 0 && (
                    <span className="ml-1">({jobsAddedToday} added today)</span>
                  )}
                </div>
              </div>
              <div>
                <div className="font-medium text-foreground">Last Updated</div>
                <div>{lastUpdated}</div>
              </div>
              <div>
                <div className="font-medium text-foreground">Trending</div>
                <div>
                  {Array.from(new Set(initialJobs.map((job) => job.company)))
                    .slice(0, 3)
                    .join(", ")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Section */}
      <div className="container mx-auto px-4 py-8">
        <TestFeatures />

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold tracking-tight">
            Latest Opportunities
          </h2>
          <span className="text-sm text-muted-foreground">
            {filteredJobs.length} positions
          </span>
        </div>

        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">
                No positions found matching your search criteria. Try adjusting
                your search terms.
              </p>
            </div>
          ) : (
            filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
          )}
        </div>
      </div>
    </main>
  );
}

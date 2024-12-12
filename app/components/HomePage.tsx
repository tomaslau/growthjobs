"use client";

import { useState, useMemo, useCallback } from "react";
import { JobCard } from "@/components/jobs/JobCard";
import type { Job } from "@/lib/db/airtable";
import { TestFeatures } from "@/components/TestFeatures";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

export function HomePage({ initialJobs }: { initialJobs: Job[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

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
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-[640px] space-y-4">
            <div className="space-y-2">
              <Badge variant="secondary">Job Board Starter</Badge>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Find Your Next Tech Role
              </h1>
              <p className="text-sm text-muted-foreground md:text-base">
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
            <div className="pt-4 grid grid-cols-3 gap-4 text-sm text-muted-foreground max-w-[480px]">
              <div>
                <div className="font-medium text-foreground">
                  {initialJobs.length}
                </div>
                <div>Open Positions</div>
              </div>
              <div>
                <div className="font-medium text-foreground">Real-time</div>
                <div>Updates</div>
              </div>
              <div>
                <div className="font-medium text-foreground">Free</div>
                <div>Job Board</div>
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

"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { JobCard } from "../../components/jobs/JobCard";
import type { Job } from "@/lib/db/airtable";
import { normalizeAnnualSalary } from "@/lib/db/airtable";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Search } from "lucide-react";
import { formatDistanceToNow, isToday } from "date-fns";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortOption = "newest" | "oldest" | "salary";

export function HomePage({ initialJobs }: { initialJobs: Job[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  // Get current page and jobs per page from URL or defaults
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const jobsPerPage = parseInt(searchParams.get("per_page") || "10", 10);

  // Update URL with new parameters
  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams);

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      router.push(`/?${params.toString()}`);
    },
    [router, searchParams]
  );

  // Handle jobs per page change
  const handleJobsPerPageChange = useCallback(
    (value: string) => {
      updateParams({
        per_page: value === "10" ? null : value,
        page: "1", // Reset to first page when changing items per page
      });
    },
    [updateParams]
  );

  // Handle sort change
  const handleSortChange = useCallback(
    (value: string) => {
      updateParams({
        sort: value === "newest" ? null : value,
        page: "1", // Reset to first page when changing sort
      });
      setSortBy(value as SortOption);
    },
    [updateParams]
  );

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      updateParams({ page: null }); // Reset to first page when searching
    },
    [updateParams]
  );

  // Sort and filter jobs
  const filteredJobs = useMemo(() => {
    let filtered = [...initialJobs];

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchLower) ||
          job.company.toLowerCase().includes(searchLower) ||
          job.location.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.posted_date).getTime() -
            new Date(b.posted_date).getTime()
        );
        break;
      case "salary":
        filtered.sort((a, b) => {
          const salaryA = a.salary ? normalizeAnnualSalary(a.salary) : -1;
          const salaryB = b.salary ? normalizeAnnualSalary(b.salary) : -1;

          // Sort by normalized annual salary (highest first)
          if (salaryA === -1 && salaryB === -1) return 0;
          if (salaryA === -1) return 1;
          if (salaryB === -1) return -1;
          return salaryB - salaryA;
        });
        break;
      default: // "newest"
        filtered.sort(
          (a, b) =>
            new Date(b.posted_date).getTime() -
            new Date(a.posted_date).getTime()
        );
    }

    return filtered;
  }, [initialJobs, searchTerm, sortBy]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const paginatedJobs = filteredJobs.slice(
    startIndex,
    startIndex + jobsPerPage
  );

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

  // Ensure current page is valid
  useEffect(() => {
    if (currentPage < 1) {
      updateParams({ page: null });
    } else if (totalPages > 0 && currentPage > totalPages) {
      updateParams({ page: totalPages.toString() });
    }
  }, [currentPage, totalPages, updateParams]);

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
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
                Latest Opportunities
                {currentPage > 1 && (
                  <span className="text-gray-500 font-normal">
                    Page {currentPage}
                  </span>
                )}
              </h2>
              <p className="text-sm text-muted-foreground">
                Showing {paginatedJobs.length} of {filteredJobs.length}{" "}
                positions
              </p>
            </div>
            <div className="flex items-center gap-3 pb-[1px]">
              <Select
                value={jobsPerPage.toString()}
                onValueChange={handleJobsPerPageChange}
              >
                <SelectTrigger className="w-[130px] h-8 text-sm">
                  <SelectValue placeholder="Show" />
                </SelectTrigger>
                <SelectContent
                  className="bg-white min-w-[130px]"
                  position="popper"
                >
                  <SelectItem value="10" className="text-sm">
                    10 per page
                  </SelectItem>
                  <SelectItem value="25" className="text-sm">
                    25 per page
                  </SelectItem>
                  <SelectItem value="50" className="text-sm">
                    50 per page
                  </SelectItem>
                  <SelectItem value="100" className="text-sm">
                    100 per page
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[140px] h-8 text-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-white" position="popper">
                  <SelectItem value="newest" className="text-sm">
                    Newest first
                  </SelectItem>
                  <SelectItem value="oldest" className="text-sm">
                    Oldest first
                  </SelectItem>
                  <SelectItem value="salary" className="text-sm">
                    Highest salary
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-4 mt-6">
          {paginatedJobs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">
                No positions found matching your search criteria. Try adjusting
                your search terms.
              </p>
            </div>
          ) : (
            paginatedJobs.map((job) => <JobCard key={job.id} job={job} />)
          )}
        </div>

        {/* Pagination */}
        {filteredJobs.length > jobsPerPage && (
          <div className="mt-8 flex justify-start">
            <Pagination>
              <PaginationContent className="flex gap-2">
                <PaginationItem>
                  <PaginationPrevious
                    href={currentPage > 1 ? `/?page=${currentPage - 1}` : "#"}
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1)
                        updateParams({ page: (currentPage - 1).toString() });
                    }}
                    className={`hover:bg-gray-100 transition-colors ${
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }`}
                  />
                </PaginationItem>

                {/* First page */}
                <PaginationItem>
                  <PaginationLink
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      updateParams({ page: null });
                    }}
                    isActive={currentPage === 1}
                    className="hover:bg-gray-100 transition-colors"
                  >
                    1
                  </PaginationLink>
                </PaginationItem>

                {/* Show ellipsis if there are many pages */}
                {currentPage > 3 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                {/* Current page and surrounding pages */}
                {Array.from({ length: 3 }, (_, i) => {
                  const pageNum = currentPage + i - 1;
                  if (pageNum > 1 && pageNum < totalPages) {
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          href={`/?page=${pageNum}`}
                          onClick={(e) => {
                            e.preventDefault();
                            updateParams({ page: pageNum.toString() });
                          }}
                          isActive={currentPage === pageNum}
                          className="hover:bg-gray-100 transition-colors"
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                  return null;
                })}

                {/* Show ellipsis if there are many pages */}
                {currentPage < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                {/* Last page */}
                {totalPages > 1 && (
                  <PaginationItem>
                    <PaginationLink
                      href={`/?page=${totalPages}`}
                      onClick={(e) => {
                        e.preventDefault();
                        updateParams({ page: totalPages.toString() });
                      }}
                      isActive={currentPage === totalPages}
                      className="hover:bg-gray-100 transition-colors"
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationNext
                    href={
                      currentPage < totalPages
                        ? `/?page=${currentPage + 1}`
                        : "#"
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages)
                        updateParams({ page: (currentPage + 1).toString() });
                    }}
                    className={`hover:bg-gray-100 transition-colors ${
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </main>
  );
}

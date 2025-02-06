import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { useState, useMemo, useCallback, useEffect } from "react";
import { CareerLevel, Job, normalizeAnnualSalary } from "@/lib/db/airtable";
import { CAREER_LEVEL_DISPLAY_NAMES } from "@/lib/constants/career-levels";

type FilterType = "type" | "role" | "remote" | "salary" | "visa" | "clear";
type FilterValue = string[] | boolean | CareerLevel[] | true;

interface JobFiltersProps {
  onFilterChange: (filterType: FilterType, value: FilterValue) => void;
  initialFilters: {
    types: string[];
    roles: CareerLevel[];
    remote: boolean;
    salaryRanges: string[];
    visa: boolean;
  };
  jobs: Job[];
}

export function JobFilters({
  onFilterChange,
  initialFilters,
  jobs,
}: JobFiltersProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    initialFilters.types
  );
  const [selectedLevels, setSelectedLevels] = useState<CareerLevel[]>(
    initialFilters.roles
  );
  const [isRemoteOnly, setIsRemoteOnly] = useState(initialFilters.remote);
  const [isVisaSponsorship, setIsVisaSponsorship] = useState(
    initialFilters.visa
  );
  const [selectedSalaryRanges, setSelectedSalaryRanges] = useState<string[]>(
    initialFilters.salaryRanges
  );
  const [showAllLevels, setShowAllLevels] = useState(false);

  const initialLevels: CareerLevel[] = [
    "Internship",
    "EntryLevel",
    "Associate",
    "Junior",
    "MidLevel",
    "Senior",
    "Staff",
    "Principal",
  ];

  const additionalLevels: CareerLevel[] = [
    "Lead",
    "Manager",
    "SeniorManager",
    "Director",
    "SeniorDirector",
    "VP",
    "SVP",
    "EVP",
    "CLevel",
    "Founder",
  ];

  const visibleLevels = showAllLevels
    ? [...initialLevels, ...additionalLevels]
    : initialLevels;

  useEffect(() => {
    const currentFilters = {
      types: selectedTypes,
      roles: selectedLevels,
      remote: isRemoteOnly,
      salaryRanges: selectedSalaryRanges,
      visa: isVisaSponsorship,
    };

    const hasChanges = Object.entries(currentFilters).some(([key, value]) => {
      const initialValue = initialFilters[key as keyof typeof initialFilters];
      if (Array.isArray(value) && Array.isArray(initialValue)) {
        return JSON.stringify(value) !== JSON.stringify(initialValue);
      }
      return value !== initialValue;
    });

    if (hasChanges) {
      if (selectedTypes !== initialFilters.types) {
        onFilterChange("type", selectedTypes);
      }
      if (selectedLevels !== initialFilters.roles) {
        onFilterChange("role", selectedLevels);
      }
      if (isRemoteOnly !== initialFilters.remote) {
        onFilterChange("remote", isRemoteOnly);
      }
      if (selectedSalaryRanges !== initialFilters.salaryRanges) {
        onFilterChange("salary", selectedSalaryRanges);
      }
      if (isVisaSponsorship !== initialFilters.visa) {
        onFilterChange("visa", isVisaSponsorship);
      }
    }
  }, [
    selectedTypes,
    selectedLevels,
    isRemoteOnly,
    selectedSalaryRanges,
    isVisaSponsorship,
    onFilterChange,
    initialFilters,
  ]);

  const handleTypeChange = useCallback((checked: boolean, value: string) => {
    setSelectedTypes((prev) => {
      const newTypes = new Set(prev);
      if (checked) {
        newTypes.add(value);
      } else {
        newTypes.delete(value);
      }
      return Array.from(newTypes);
    });
  }, []);

  const handleLevelChange = useCallback(
    (checked: boolean, value: CareerLevel) => {
      setSelectedLevels((prev) => {
        const newLevels = new Set(prev);
        if (checked) {
          newLevels.add(value);
        } else {
          newLevels.delete(value);
        }
        return Array.from(newLevels);
      });
    },
    []
  );

  const handleRemoteChange = useCallback((checked: boolean) => {
    setIsRemoteOnly(checked);
  }, []);

  const handleSalaryChange = useCallback((checked: boolean, value: string) => {
    setSelectedSalaryRanges((prev) => {
      const newRanges = new Set(prev);
      if (checked) {
        newRanges.add(value);
      } else {
        newRanges.delete(value);
      }
      return Array.from(newRanges);
    });
  }, []);

  const handleVisaChange = useCallback((checked: boolean) => {
    setIsVisaSponsorship(checked);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSelectedTypes([]);
    setSelectedLevels([]);
    setIsRemoteOnly(false);
    setIsVisaSponsorship(false);
    setSelectedSalaryRanges([]);
    onFilterChange("clear", true);
  }, [onFilterChange]);

  const handleShowMoreLevels = () => {
    setShowAllLevels(!showAllLevels);
  };

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {
      "Full-time": 0,
      "Part-time": 0,
      Contract: 0,
    };
    jobs.forEach((job) => {
      if (job.type in counts) {
        counts[job.type]++;
      }
    });
    return counts;
  }, [jobs]);

  const roleCounts = useMemo(() => {
    const counts: Record<CareerLevel, number> = {} as Record<
      CareerLevel,
      number
    >;
    jobs.forEach((job) => {
      job.career_level.forEach((level: CareerLevel) => {
        counts[level] = (counts[level] || 0) + 1;
      });
    });
    return counts;
  }, [jobs]);

  const remoteCount = useMemo(() => {
    return jobs.filter((job) => job.workplace_type === "Remote").length;
  }, [jobs]);

  const visaCount = useMemo(() => {
    return jobs.filter((job) => job.visa_sponsorship === "Yes").length;
  }, [jobs]);

  const salaryRangeCounts = useMemo(() => {
    const counts: Record<string, number> = {
      "< $50K": 0,
      "$50K - $100K": 0,
      "$100K - $200K": 0,
      "> $200K": 0,
    };
    jobs.forEach((job) => {
      if (!job.salary) return;
      const annualSalary = normalizeAnnualSalary(job.salary);
      if (annualSalary < 50000) counts["< $50K"]++;
      else if (annualSalary <= 100000) counts["$50K - $100K"]++;
      else if (annualSalary <= 200000) counts["$100K - $200K"]++;
      else counts["> $200K"]++;
    });
    return counts;
  }, [jobs]);

  return (
    <div className="p-5 border rounded-lg space-y-6 bg-gray-50 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-md font-semibold">Filters</h2>
        <button
          onClick={handleClearFilters}
          className="text-sm underline underline-offset-4 text-zinc-900 hover:text-zinc-700 transition-colors"
        >
          Clear all
        </button>
      </div>

      {/* Job Type */}
      <div className="space-y-4">
        <h2 className="text-md font-semibold">Job Type</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="full-time"
                checked={selectedTypes.includes("Full-time")}
                onCheckedChange={(checked: boolean) =>
                  handleTypeChange(checked, "Full-time")
                }
              />
              <Label htmlFor="full-time" className="text-sm font-normal">
                Full-time
              </Label>
            </div>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                selectedTypes.includes("Full-time")
                  ? "bg-zinc-900 text-zinc-50"
                  : "bg-zinc-100 text-zinc-500"
              }`}
            >
              {typeCounts["Full-time"]}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="part-time"
                checked={selectedTypes.includes("Part-time")}
                onCheckedChange={(checked: boolean) =>
                  handleTypeChange(checked, "Part-time")
                }
              />
              <Label htmlFor="part-time" className="text-sm font-normal">
                Part-time
              </Label>
            </div>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                selectedTypes.includes("Part-time")
                  ? "bg-zinc-900 text-zinc-50"
                  : "bg-zinc-100 text-zinc-500"
              }`}
            >
              {typeCounts["Part-time"]}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="contract"
                checked={selectedTypes.includes("Contract")}
                onCheckedChange={(checked: boolean) =>
                  handleTypeChange(checked, "Contract")
                }
              />
              <Label htmlFor="contract" className="text-sm font-normal">
                Contract
              </Label>
            </div>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                selectedTypes.includes("Contract")
                  ? "bg-zinc-900 text-zinc-50"
                  : "bg-zinc-100 text-zinc-500"
              }`}
            >
              {typeCounts["Contract"]}
            </span>
          </div>
        </div>
      </div>

      {/* Career Level */}
      <div className="space-y-4">
        <h2 className="text-md font-semibold">Career Level</h2>
        <div className="space-y-3">
          {visibleLevels.map((level) => (
            <div key={level} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={level.toLowerCase().replace(" ", "-")}
                  checked={selectedLevels.includes(level)}
                  onCheckedChange={(checked: boolean) =>
                    handleLevelChange(checked, level)
                  }
                />
                <Label
                  htmlFor={level.toLowerCase().replace(" ", "-")}
                  className="text-sm font-normal"
                >
                  {CAREER_LEVEL_DISPLAY_NAMES[level]}
                </Label>
              </div>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  selectedLevels.includes(level)
                    ? "bg-zinc-900 text-zinc-50"
                    : "bg-zinc-100 text-zinc-500"
                }`}
              >
                {roleCounts[level] || 0}
              </span>
            </div>
          ))}
        </div>
        <button
          onClick={handleShowMoreLevels}
          className="text-sm underline underline-offset-4 text-zinc-900 hover:text-zinc-700 transition-colors"
        >
          {showAllLevels ? "Show fewer levels" : "Show more levels"}
        </button>
      </div>

      {/* Remote Only */}
      <div className="space-y-4">
        <h2 className="text-md font-semibold">Remote Only</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch
              id="remote-only"
              checked={isRemoteOnly}
              onCheckedChange={handleRemoteChange}
            />
            <Label
              htmlFor="remote-only"
              className="text-sm font-normal text-gray-500"
            >
              {isRemoteOnly ? "Yes" : "No"}
            </Label>
          </div>
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              isRemoteOnly
                ? "bg-zinc-900 text-zinc-50"
                : "bg-zinc-100 text-zinc-500"
            }`}
          >
            {remoteCount} of {jobs.length}
          </span>
        </div>
      </div>

      {/* Salary Range */}
      <div className="space-y-4">
        <h2 className="text-md font-semibold">Salary Range</h2>
        <div className="space-y-3">
          {Object.entries(salaryRangeCounts).map(([range, count]) => (
            <div key={range} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`salary-${range.toLowerCase().replace(/[\s\$>]/g, "-")}`}
                  checked={selectedSalaryRanges.includes(range)}
                  onCheckedChange={(checked: boolean) =>
                    handleSalaryChange(checked, range)
                  }
                />
                <Label
                  htmlFor={`salary-${range
                    .toLowerCase()
                    .replace(/[\s\$>]/g, "-")}`}
                  className="text-sm font-normal"
                >
                  {range}/year
                </Label>
              </div>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  selectedSalaryRanges.includes(range)
                    ? "bg-zinc-900 text-zinc-50"
                    : "bg-zinc-100 text-zinc-500"
                }`}
              >
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Visa Sponsorship */}
      <div className="space-y-4">
        <h2 className="text-md font-semibold">Visa Sponsorship</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch
              id="visa-sponsorship"
              checked={isVisaSponsorship}
              onCheckedChange={handleVisaChange}
            />
            <Label
              htmlFor="visa-sponsorship"
              className="text-sm font-normal text-gray-500"
            >
              {isVisaSponsorship ? "Yes" : "No"}
            </Label>
          </div>
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              isVisaSponsorship
                ? "bg-zinc-900 text-zinc-50"
                : "bg-zinc-100 text-zinc-500"
            }`}
          >
            {visaCount}
          </span>
        </div>
      </div>
    </div>
  );
}

// Test

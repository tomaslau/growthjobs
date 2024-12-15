import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { CareerLevel } from "@/lib/db/airtable";

type FilterType = "type" | "role" | "remote" | "salary" | "visa" | "clear";
type FilterValue = string | boolean | CareerLevel;

interface JobFiltersProps {
  onFilterChange: (filterType: FilterType, value: FilterValue) => void;
  initialFilters: {
    types: string[];
    roles: CareerLevel[];
    remote: boolean;
    salaryRanges: string[];
    visa: boolean;
  };
}

export function JobFilters({
  onFilterChange,
  initialFilters,
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

  const levelDisplayNames: Record<CareerLevel, string> = {
    Internship: "Internship",
    EntryLevel: "Entry Level",
    Associate: "Associate",
    Junior: "Junior",
    MidLevel: "Mid Level",
    Senior: "Senior",
    Staff: "Staff",
    Principal: "Principal",
    Lead: "Lead",
    Manager: "Manager",
    SeniorManager: "Senior Manager",
    Director: "Director",
    SeniorDirector: "Senior Director",
    VP: "VP",
    SVP: "SVP",
    EVP: "EVP",
    CLevel: "C-Level",
    Founder: "Founder",
    NotSpecified: "Not Specified",
  };

  const visibleLevels = showAllLevels
    ? [...initialLevels, ...additionalLevels]
    : initialLevels;

  const handleTypeChange = (checked: boolean, value: string) => {
    const newTypes = checked
      ? [...selectedTypes, value]
      : selectedTypes.filter((type) => type !== value);
    setSelectedTypes(newTypes);
    onFilterChange("type", value);
  };

  const handleLevelChange = (checked: boolean, value: CareerLevel) => {
    const newLevels = checked
      ? [...selectedLevels, value]
      : selectedLevels.filter((level) => level !== value);
    setSelectedLevels(newLevels);
    onFilterChange("role", value);
  };

  const handleRemoteChange = (checked: boolean) => {
    setIsRemoteOnly(checked);
    onFilterChange("remote", checked);
  };

  const handleSalaryChange = (checked: boolean, value: string) => {
    const newSalaryRanges = checked
      ? [...selectedSalaryRanges, value]
      : selectedSalaryRanges.filter((range) => range !== value);
    setSelectedSalaryRanges(newSalaryRanges);
    onFilterChange("salary", value);
  };

  const handleVisaChange = (checked: boolean) => {
    setIsVisaSponsorship(checked);
    onFilterChange("visa", checked);
  };

  const handleClearFilters = () => {
    setSelectedTypes([]);
    setSelectedLevels([]);
    setIsRemoteOnly(false);
    setIsVisaSponsorship(false);
    setSelectedSalaryRanges([]);
    onFilterChange("clear", true);
  };

  const handleShowMoreLevels = () => {
    setShowAllLevels(!showAllLevels);
  };

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
        </div>
      </div>

      {/* Career Level */}
      <div className="space-y-4">
        <h2 className="text-md font-semibold">Career Level</h2>
        <div className="space-y-3">
          {visibleLevels.map((level) => (
            <div key={level} className="flex items-center space-x-2">
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
                {levelDisplayNames[level]}
              </Label>
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
      </div>

      {/* Salary Range */}
      <div className="space-y-4">
        <h2 className="text-md font-semibold">Salary Range</h2>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="salary-50k"
              checked={selectedSalaryRanges.includes("< $50K")}
              onCheckedChange={(checked: boolean) =>
                handleSalaryChange(checked, "< $50K")
              }
            />
            <Label htmlFor="salary-50k" className="text-sm font-normal">
              {"< $50K/year"}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="salary-50k-100k"
              checked={selectedSalaryRanges.includes("$50K - $100K")}
              onCheckedChange={(checked: boolean) =>
                handleSalaryChange(checked, "$50K - $100K")
              }
            />
            <Label htmlFor="salary-50k-100k" className="text-sm font-normal">
              $50K - $100K/year
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="salary-100k-200k"
              checked={selectedSalaryRanges.includes("$100K - $200K")}
              onCheckedChange={(checked: boolean) =>
                handleSalaryChange(checked, "$100K - $200K")
              }
            />
            <Label htmlFor="salary-100k-200k" className="text-sm font-normal">
              $100K - $200K/year
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="salary-200k"
              checked={selectedSalaryRanges.includes("> $200K")}
              onCheckedChange={(checked: boolean) =>
                handleSalaryChange(checked, "> $200K")
              }
            />
            <Label htmlFor="salary-200k" className="text-sm font-normal">
              {"> $200K/year"}
            </Label>
          </div>
        </div>
      </div>

      {/* Visa Sponsorship */}
      <div className="space-y-4">
        <h2 className="text-md font-semibold">Visa Sponsorship</h2>
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
      </div>
    </div>
  );
}

import { CareerLevel } from "@/lib/db/airtable";
import {
  Calendar,
  MapPin,
  Laptop,
  DollarSign,
  Briefcase,
  Link,
  Globe,
  Clock,
  Flag,
} from "lucide-react";

interface JobDetailsSidebarProps {
  fullDate: string;
  relativeTime: string;
  location: string;
  remote_friendly: string;
  salary_range: string;
  career_level: CareerLevel | CareerLevel[];
  apply_url: string;
  visa_sponsorship: string;
  job_timezone: string;
}

function formatCareerLevel(level: CareerLevel): string {
  const formatMap: Record<CareerLevel, string> = {
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

  return formatMap[level] || level;
}

export function JobDetailsSidebar({
  fullDate,
  relativeTime,
  location,
  remote_friendly,
  salary_range,
  career_level,
  apply_url,
  visa_sponsorship,
  job_timezone,
}: JobDetailsSidebarProps) {
  const careerLevels = Array.from(
    new Set(Array.isArray(career_level) ? career_level : [career_level])
  );

  return (
    <div className="p-5 border rounded-lg space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Job Details</h2>
        <button className="text-red-600/70 hover:text-red-600 text-xs font-medium flex items-center gap-1">
          <Flag className="h-3 w-3" />
          Report
        </button>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-1">
          <Calendar className="h-4 w-4 text-gray-500 shrink-0" />
          <h2 className="text-sm font-medium">Date Posted</h2>
        </div>
        <p className="text-sm text-gray-600 ml-6">
          {fullDate} ({relativeTime})
        </p>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-1">
          <MapPin className="h-4 w-4 text-gray-500 shrink-0" />
          <h2 className="text-sm font-medium">Job Location</h2>
        </div>
        <p className="text-sm text-gray-600 ml-6">{location}</p>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-1">
          <Laptop className="h-4 w-4 text-gray-500 shrink-0" />
          <h2 className="text-sm font-medium">Remote-Friendly</h2>
        </div>
        <span
          className={`inline-block px-2 py-0.5 text-xs rounded-full ml-6 ${
            remote_friendly === "Yes"
              ? "bg-green-100 text-green-700"
              : remote_friendly === "No"
              ? "bg-red-100 text-red-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {remote_friendly}
        </span>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-1">
          <DollarSign className="h-4 w-4 text-gray-500 shrink-0" />
          <h2 className="text-sm font-medium">Salary</h2>
        </div>
        <p className="text-sm text-gray-600 ml-6">{salary_range}</p>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-1">
          <Briefcase className="h-4 w-4 text-gray-500 shrink-0" />
          <h2 className="text-sm font-medium">Career Level</h2>
        </div>
        <div className="flex flex-wrap gap-1.5 ml-6">
          {careerLevels.map((level, index) => (
            <span
              key={`${level}-${index}`}
              className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-full"
            >
              {formatCareerLevel(level)}
            </span>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-1">
          <Link className="h-4 w-4 text-gray-500 shrink-0" />
          <h2 className="text-sm font-medium">Job Source</h2>
        </div>
        <a
          href={apply_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline ml-6"
        >
          Apply on company website
        </a>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-1">
          <Globe className="h-4 w-4 text-gray-500 shrink-0" />
          <h2 className="text-sm font-medium">Visa Sponsorship</h2>
        </div>
        <span
          className={`inline-block px-2 py-0.5 text-xs rounded-full ml-6 ${
            visa_sponsorship === "Yes"
              ? "bg-green-100 text-green-700"
              : visa_sponsorship === "No"
              ? "bg-red-100 text-red-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {visa_sponsorship}
        </span>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-1">
          <Clock className="h-4 w-4 text-gray-500 shrink-0" />
          <h2 className="text-sm font-medium">Job Timezones</h2>
        </div>
        <p className="text-sm text-gray-600 ml-6">{job_timezone}</p>
      </div>
    </div>
  );
}

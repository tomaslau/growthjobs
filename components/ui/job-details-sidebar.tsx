import { CareerLevel } from "@/lib/db/airtable";

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
  // Ensure career_level is always an array and filter out duplicates
  const careerLevels = Array.from(
    new Set(Array.isArray(career_level) ? career_level : [career_level])
  );

  return (
    <div className="p-6 border rounded-lg space-y-6">
      <div>
        <h2 className="text-sm font-medium mb-2">Date Posted</h2>
        <p className="text-sm text-gray-600">
          {fullDate} ({relativeTime})
        </p>
      </div>

      <div>
        <h2 className="text-sm font-medium mb-2">Job Location</h2>
        <p className="text-sm text-gray-600">{location}</p>
      </div>

      <div>
        <h2 className="text-sm font-medium mb-2">Remote-Friendly</h2>
        <span
          className={`inline-block px-2 py-1 text-xs rounded-full ${
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
        <h2 className="text-sm font-medium mb-2">Salary</h2>
        <p className="text-sm text-gray-600">{salary_range}</p>
      </div>

      <div>
        <h2 className="text-sm font-medium mb-2">Career Level</h2>
        <div className="flex flex-wrap gap-2">
          {careerLevels.map((level, index) => (
            <span
              key={`${level}-${index}`}
              className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
            >
              {formatCareerLevel(level)}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-sm font-medium mb-2">Job Source</h2>
        <a
          href={apply_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline"
        >
          Apply on company website
        </a>
      </div>

      <div>
        <h2 className="text-sm font-medium mb-2">Visa Sponsorship</h2>
        <p className="text-sm text-gray-600">{visa_sponsorship}</p>
      </div>

      <div>
        <h2 className="text-sm font-medium mb-2">Job Timezones</h2>
        <p className="text-sm text-gray-600">{job_timezone}</p>
      </div>
    </div>
  );
}

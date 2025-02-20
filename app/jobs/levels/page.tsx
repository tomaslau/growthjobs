import { getJobs, CareerLevel } from "@/lib/db/airtable";
import { GraduationCap } from "lucide-react";
import type { Metadata } from "next";
import config from "@/config";
import { HeroSection } from "@/components/ui/hero-section";
import Link from "next/link";
import { CAREER_LEVEL_DISPLAY_NAMES } from "@/lib/constants/career-levels";

// Generate metadata for SEO
export const metadata: Metadata = {
  title: "Browse Jobs by Career Level | " + config.title,
  description:
    "Explore tech jobs by experience level. Find positions that match your career stage, from internships to executive roles.",
};

// Revalidate page every 5 minutes
export const revalidate = 300;

interface LevelCardProps {
  href: string;
  title: string;
  count: number;
}

function LevelCard({ href, title, count }: LevelCardProps) {
  return (
    <Link
      href={href}
      className="block p-4 sm:p-5 border rounded-lg transition-all hover:border-gray-400"
      aria-label={`Browse ${count} ${title} ${
        count === 1 ? "position" : "positions"
      }`}
    >
      <div className="space-y-1.5 sm:space-y-2">
        <h2 className="text-sm sm:text-base font-medium">{title}</h2>
        <div className="text-xs sm:text-sm text-gray-500">
          {count} {count === 1 ? "position" : "positions"} available
        </div>
      </div>
    </Link>
  );
}

export default async function CareerLevelsPage() {
  const jobs = await getJobs();

  // Aggregate job counts by career level
  const levelCounts = jobs.reduce<Partial<Record<CareerLevel, number>>>(
    (acc, job) => {
      job.career_level.forEach((level) => {
        if (level !== "NotSpecified") {
          acc[level] = (acc[level] || 0) + 1;
        }
      });
      return acc;
    },
    {}
  );

  // Sort levels by job count
  const sortedLevels = Object.entries(levelCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([level, count]) => ({
      level: level as CareerLevel,
      title: CAREER_LEVEL_DISPLAY_NAMES[level as CareerLevel],
      count,
    }));

  // Group levels by category
  const entryLevels = sortedLevels.filter((item) =>
    ["Internship", "EntryLevel", "Associate", "Junior"].includes(item.level)
  );
  const midLevels = sortedLevels.filter((item) =>
    ["MidLevel", "Senior", "Staff", "Principal"].includes(item.level)
  );
  const leadershipLevels = sortedLevels.filter((item) =>
    [
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
    ].includes(item.level)
  );

  return (
    <>
      <HeroSection
        badge="Career Levels"
        title="Browse Jobs by Career Level"
        description={`Explore ${jobs.length} open positions across different experience levels. Find the perfect role that matches your career stage.`}
      />

      <main className="container py-6 sm:py-8">
        <div className="max-w-5xl space-y-8 sm:space-y-12">
          {/* Entry Level Section */}
          {entryLevels.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap
                  className="w-4 sm:w-5 h-4 sm:h-5 text-muted-foreground"
                  aria-hidden="true"
                />
                <h2 className="text-lg sm:text-xl font-semibold">
                  Entry Level Positions
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {entryLevels.map(({ level, title, count }) => (
                  <LevelCard
                    key={level}
                    href={`/jobs/level/${level.toLowerCase()}`}
                    title={title}
                    count={count}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Mid Level Section */}
          {midLevels.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap
                  className="w-4 sm:w-5 h-4 sm:h-5 text-muted-foreground"
                  aria-hidden="true"
                />
                <h2 className="text-lg sm:text-xl font-semibold">
                  Mid & Senior Level Positions
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {midLevels.map(({ level, title, count }) => (
                  <LevelCard
                    key={level}
                    href={`/jobs/level/${level.toLowerCase()}`}
                    title={title}
                    count={count}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Leadership Section */}
          {leadershipLevels.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap
                  className="w-4 sm:w-5 h-4 sm:h-5 text-muted-foreground"
                  aria-hidden="true"
                />
                <h2 className="text-lg sm:text-xl font-semibold">
                  Leadership Positions
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {leadershipLevels.map(({ level, title, count }) => (
                  <LevelCard
                    key={level}
                    href={`/jobs/level/${level.toLowerCase()}`}
                    title={title}
                    count={count}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}

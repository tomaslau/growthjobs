import { getJobs, CareerLevel } from "@/lib/db/airtable";
import { HeroSection } from "@/components/ui/hero-section";
import config from "@/config";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JobsLayout } from "@/components/jobs/JobsLayout";
import { CAREER_LEVEL_DISPLAY_NAMES } from "@/lib/constants/career-levels";

// Revalidate page every 5 minutes
export const revalidate = 300;

interface Props {
  params: {
    level: string;
  };
}

/**
 * Convert URL slug to career level
 */
function getCareerLevelFromSlug(slug: string): CareerLevel | null {
  const normalized = slug.toLowerCase();
  const match = Object.entries(CAREER_LEVEL_DISPLAY_NAMES).find(
    ([key]) => key.toLowerCase() === normalized
  );
  return match ? (match[0] as CareerLevel) : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const levelSlug = decodeURIComponent(params.level).toLowerCase();
  const careerLevel = getCareerLevelFromSlug(levelSlug);

  if (!careerLevel || careerLevel === "NotSpecified") {
    return notFound();
  }

  const displayName = CAREER_LEVEL_DISPLAY_NAMES[careerLevel];

  return {
    title: `${displayName} Jobs | ${config.title}`,
    description: `Browse ${displayName.toLowerCase()} positions. Find the perfect role that matches your experience level.`,
    alternates: {
      canonical: `/jobs/level/${levelSlug}`,
    },
  };
}

export default async function CareerLevelPage({ params }: Props) {
  const jobs = await getJobs();
  const levelSlug = decodeURIComponent(params.level).toLowerCase();
  const careerLevel = getCareerLevelFromSlug(levelSlug);

  if (!careerLevel || careerLevel === "NotSpecified") {
    return notFound();
  }

  const displayName = CAREER_LEVEL_DISPLAY_NAMES[careerLevel];

  const filteredJobs = jobs.filter((job) =>
    job.career_level.includes(careerLevel)
  );

  if (filteredJobs.length === 0) return notFound();

  return (
    <>
      <HeroSection
        badge={displayName}
        title={`${displayName} Jobs`}
        description={`Browse ${filteredJobs.length} ${
          filteredJobs.length === 1 ? "position" : "positions"
        } for ${displayName.toLowerCase()} roles. Find the perfect opportunity that matches your experience level.`}
      />
      <JobsLayout allJobs={jobs} filteredJobs={filteredJobs} />
    </>
  );
}

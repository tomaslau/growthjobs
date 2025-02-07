import { getJobs } from "@/lib/db/airtable";
import { HeroSection } from "@/components/ui/hero-section";
import { config } from "@/config/config";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JobsLayout } from "@/components/jobs/JobsLayout";

// Revalidate page every 5 minutes
export const revalidate = 300;

interface Props {
  params: {
    type: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const type = decodeURIComponent(params.type);
  const formattedType = type.charAt(0).toUpperCase() + type.slice(1);

  return {
    title: `${formattedType} Jobs | ${config.title}`,
    description: `Browse ${formattedType.toLowerCase()} positions. Find the perfect ${formattedType.toLowerCase()} role that matches your skills and preferences.`,
    alternates: {
      canonical: `/jobs/type/${type}`,
    },
  };
}

export default async function JobTypePage({ params }: Props) {
  const jobs = await getJobs();
  const type = decodeURIComponent(params.type);
  const formattedType = type.charAt(0).toUpperCase() + type.slice(1);

  // Filter jobs by type, handling undefined cases
  const filteredJobs = jobs.filter((job) => {
    if (!job.type) return false;
    return job.type.toLowerCase() === type.toLowerCase();
  });

  // If no jobs found or invalid type, return 404
  if (filteredJobs.length === 0) {
    notFound();
  }

  return (
    <>
      <HeroSection
        badge={formattedType}
        title={`${formattedType} Jobs`}
        description={`Browse ${
          filteredJobs.length
        } ${formattedType.toLowerCase()} positions. Find the perfect role that matches your skills and preferences.`}
      />

      <JobsLayout allJobs={jobs} filteredJobs={filteredJobs} />
    </>
  );
}

import { getJobs } from "@/lib/db/airtable";
import { Globe2 } from "lucide-react";
import type { Metadata } from "next";
import config from "@/config";
import { HeroSection } from "@/components/ui/hero-section";
import Link from "next/link";
import type { LocationCounts } from "@/lib/constants/locations";
import {
  formatLocationTitle,
  createLocationSlug,
} from "@/lib/constants/locations";

// Generate metadata for SEO
export const metadata: Metadata = {
  title: "Browse Jobs by Location | " + config.title,
  description:
    "Explore tech jobs by location. Find remote opportunities or positions in your preferred country.",
};

// Revalidate page every 5 minutes
export const revalidate = 300;

interface LocationCardProps {
  href: string;
  title: string;
  count: number;
}

function LocationCard({ href, title, count }: LocationCardProps) {
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

export default async function LocationsPage() {
  const jobs = await getJobs();

  // Aggregate job counts by location
  const locationCounts = jobs.reduce<LocationCounts>(
    (acc, job) => {
      if (job.workplace_type === "Remote") {
        acc.remote += 1;
      }
      if (job.workplace_country) {
        acc.countries[job.workplace_country] =
          (acc.countries[job.workplace_country] || 0) + 1;
      }
      if (job.workplace_city) {
        acc.cities[job.workplace_city] =
          (acc.cities[job.workplace_city] || 0) + 1;
      }
      return acc;
    },
    {
      countries: {},
      cities: {},
      remote: 0,
    }
  );

  // Sort countries by job count
  const sortedCountries = Object.entries(locationCounts.countries)
    .sort((a, b) => b[1] - a[1])
    .map(([country, count]) => ({
      title: formatLocationTitle(country),
      slug: createLocationSlug(country),
      count,
    }));

  return (
    <>
      <HeroSection
        badge="Locations"
        title="Browse Jobs by Location"
        description={`Explore ${jobs.length} open positions across different locations. Find remote opportunities or positions in your preferred country.`}
      />

      <main className="container py-6 sm:py-8">
        <div className="max-w-5xl">
          {/* Remote Section */}
          {locationCounts.remote > 0 && (
            <section className="mb-8 sm:mb-12">
              <div className="flex items-center gap-2 mb-4">
                <Globe2
                  className="w-4 sm:w-5 h-4 sm:h-5 text-muted-foreground"
                  aria-hidden="true"
                />
                <h2 className="text-lg sm:text-xl font-semibold">
                  Remote Opportunities
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <LocationCard
                  href="/jobs/location/remote"
                  title="Remote"
                  count={locationCounts.remote}
                />
              </div>
            </section>
          )}

          {/* Countries Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Globe2
                className="w-4 sm:w-5 h-4 sm:h-5 text-muted-foreground"
                aria-hidden="true"
              />
              <h2 className="text-lg sm:text-xl font-semibold">
                Jobs by Country
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {sortedCountries.map(({ title, slug, count }) => (
                <LocationCard
                  key={slug}
                  href={`/jobs/location/${slug}`}
                  title={title}
                  count={count}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

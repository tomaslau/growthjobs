import { RemoteRegion, WorkplaceType } from "./workplace";

export interface LocationCounts {
  countries: Record<string, number>;
  cities: Record<string, number>;
  remote: number;
}

export function formatLocation({
  workplace_type,
  remote_region,
  workplace_city,
  workplace_country,
}: {
  workplace_type: WorkplaceType;
  remote_region: RemoteRegion;
  workplace_city: string | null;
  workplace_country: string | null;
}): string {
  const location = [workplace_city, workplace_country]
    .filter(Boolean)
    .join(", ");

  if (workplace_type === "Remote") {
    return `Remote (${remote_region || "Worldwide"})`;
  }

  if (workplace_type === "Hybrid") {
    return [location, `Hybrid (${remote_region})`].filter(Boolean).join(", ");
  }

  return location || "Not specified";
}

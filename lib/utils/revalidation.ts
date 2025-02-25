import config from "@/config";

/**
 * Get the revalidation interval from config
 * Ensures the value is within acceptable bounds
 */
export function getRevalidationInterval(): number {
  const interval = config.revalidation.interval;

  // Enforce minimum and maximum values
  const MIN_INTERVAL = 60; // 1 minute
  const MAX_INTERVAL = 86400; // 24 hours

  return Math.min(Math.max(interval, MIN_INTERVAL), MAX_INTERVAL);
}

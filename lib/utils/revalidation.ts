import config from "@/config";

// Enforce minimum and maximum values
const MIN_INTERVAL = 60; // 1 minute
const MAX_INTERVAL = 86400; // 24 hours

/**
 * Get the revalidation interval from config
 * Ensures the value is within acceptable bounds
 */
export const REVALIDATE_INTERVAL = Math.min(
  Math.max(config.revalidation.interval, MIN_INTERVAL),
  MAX_INTERVAL
);

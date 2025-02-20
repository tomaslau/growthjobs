/**
 * Configuration Loader
 * ------------------
 * Loads configuration from config.ts if it exists,
 * otherwise falls back to config.example.ts
 */

import type { Config as BaseConfig } from "./config.example";

let config: BaseConfig;

try {
  // Try to load user's config.ts
  config = require('./config').config;
  console.info('Using custom configuration from config.ts');
} catch (error) {
  // Fallback to example config if config.ts doesn't exist
  config = require('./config.example').config;
  console.info('No config.ts found, using config.example.ts as fallback');
}

export type Config = BaseConfig;
export default config; 
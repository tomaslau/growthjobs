/**
 * Configuration Loader
 * ------------------
 * This module exports the configuration for the job board.
 * By default, it uses the example configuration from config.example.ts.
 * Users can create their own config.ts to override the defaults.
 */

import { config as exampleConfig } from "./config.example";

// Try to load custom config if it exists
let customConfig;
try {
  customConfig = require('./config').config;
  console.info('Using custom configuration from config.ts');
} catch (error) {
  console.info('Using default configuration from config.example.ts');
}

// Use custom config if available, otherwise use example config
const config = customConfig || exampleConfig;

export type Config = typeof exampleConfig;
export default config; 
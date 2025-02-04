# Changelog

All notable changes to this project will be documented in this file.

## [0.0.39] - 2025-02-04

### Changed
- Enhanced homepage and job post page responsive layouts:
  - Optimized layout breakpoints for better space utilization
  - Adjusted sidebar to start at medium screens (768px) instead of large screens
  - Refined sidebar widths (240px to 260px) for better content balance
  - Improved main content and sidebar proportions
  - Enhanced layout flexibility on medium-sized screens
  - Unified layout structure between homepage and job post pages
  - Standardized content width and spacing across both pages
  - Improved mobile UX by prioritizing job content and reordering sidebar sections
  - Optimized content flow on mobile with job details followed by similar jobs

## [0.0.38] - 2025-02-03

### Changed
- Improved navigation responsiveness and styling:
  - Adjusted mobile menu breakpoint for better usability
  - Enhanced active link styling with subtle background
  - Updated X (Twitter) icon to match footer design
  - Optimized spacing between navigation items
  - Consistent hover effects across desktop and mobile
  - Reduced icon sizes in collapsed menu

## [0.0.37] - 2025-02-03

### Changed
- Updated Privacy & Terms pages layout and styling:
  - Centered content layout for better readability
  - Consistent styling with job post pages
  - Improved typography and spacing
  - Enhanced markdown content formatting
  - Combined Cookie Policy into Privacy Policy page
  - Updated footer links to reflect merged pages

## [0.0.36] - 2025-02-03

### Changed
- Enhanced footer configuration with centralized controls
- Added configuration options for all footer sections (brand, resources, legal, post job)
- Added customizable copyright section with dynamic year range
- Added configurable "Built By" section with optional logo
- Improved code maintainability with configuration-driven footer
- Added show/hide toggles for all footer sections
- Added external link support for legal links

## [0.0.35] - 2025-02-03

### Changed
- Enhanced navigation configuration with centralized social media controls
- Added configuration options for LinkedIn, Twitter, and Bluesky social links
- Added customizable "Post Job" button with show/hide, label, and link options
- Moved all navigation menu items to config file for single source of truth
- Updated navigation component to use dynamic configuration values
- Improved code maintainability with configuration-driven navigation

## [0.0.34] - 2025-01-26

### Changed
- Migrated Next.js configuration from JavaScript to TypeScript for better type safety and consistency
- Removed `next.config.js` in favor of `next.config.ts`
- Consolidated PostCSS configuration into `postcss.config.mjs` with proper TypeScript types
- Removed redundant `postcss.config.js`
- Optimized font loading by removing unused font files from app/fonts directory
- Removed unused TestFeatures component
- Improved performance by removing unnecessary loading states and Suspense boundaries
- Optimized navigation icon loading for better UX

## [0.0.33] - 2025-01-21

### Changed
- Updated GitHub repo URL

## [0.0.32] - 2024-12-27

### Changed
- Reorganized footer structure for better content organization

## [0.0.31] - 2024-12-27

### Added
- Added social media icons (GitHub, LinkedIn, X, Bluesky) to navbar and footer
- Enhanced navigation with consistent icon spacing and hover states
- Improved accessibility with proper ARIA labels for social links

## [0.0.30] - 2024-12-27

### Changed
- Enhanced workplace type handling with improved default values
- Updated job location display to handle missing information gracefully
- Improved job post header layout by removing date for better readability
- Standardized "Not specified" badge styling across components
- Updated search functionality to use new workplace location fields
- Improved remote filter count display to show total remote jobs out of all jobs
- Enhanced clarity of job filtering by showing "X of Y" format for remote jobs

## [0.0.29] - 2024-12-26

### Changed
- Replaced location field with separate city and country fields
- Added ISO 3166 country list as a constant
- Updated job search to handle city and country fields
- Updated documentation to reflect new location structure

## [0.0.28] - 2024-12-24

### Changed
- Enhanced footer with expanded sections for resources and legal information
- Added brand description and post job CTA in footer
- Improved footer layout with responsive grid design
- Reorganized component structure by moving all components to root directory
- Consolidated UI components from app/components to components/ui
- Moved HomePage component to components/home
- Updated import paths to use @ alias consistently

## [0.0.27] - 2024-12-22

### Added
- Added SEO metadata optimization across key pages
- Added canonical URLs to prevent duplicate content
- Added OpenGraph and Twitter card metadata
- Added dynamic meta descriptions and titles

### Changed
- Enhanced home page metadata with config-based values
- Improved about page SEO with targeted keywords
- Updated changelog page with comprehensive meta tags
- Standardized metadata structure across pages

## [0.0.26] - 2024-12-21

### Added
- Added About page with responsive design and consistent styling
- Implemented card-based feature highlights with subtle iconography
- Created content sections for mission statement and key features

### Changed
- Enhanced typography with standardized zinc color palette
- Refined card components with minimal shadow and border styling
- Optimized spacing and layout for better readability

## [0.0.25] - 2024-12-20

### Fixed
- Fixed Markdown formatting issues in job descriptions
- Fixed bold text headers rendering in list items
- Fixed indentation issues with multi-line bold text
- Fixed spacing around final paragraphs and sections

## [0.0.24] - 2024-12-18

### Fixed
- Fixed job pages not loading by switching to dynamic data fetching
- Added user-friendly root-level 404 page with improved design
- Added detailed logging for job route debugging
- Improved error handling for job not found cases

### Changed
- Completed migration to SEO-friendly URLs using title-company slug format
- Removed legacy ID-based routing completely

## [0.0.23] - 2024-12-17

### Changed
- Enhanced job cards with hover-activated Apply Now button
- Standardized Apply button styling across all pages
- Updated Apply buttons with consistent size and icon
- Improved button positioning to avoid conflicts with featured badge

## [0.0.22] - 2024-12-17

### Changed
- Enhanced SEO with descriptive job post URLs
- Updated URL structure to include job title and company name
- Improved URL readability with proper slug formatting
- Maintained backward compatibility with ID-based routing

## [0.0.21] - 2024-12-17

### Changed
- Enhanced job cards with hover-activated Apply Now button
- Standardized Apply button styling across all pages
- Updated Apply buttons with consistent size and icon
- Improved button positioning to avoid conflicts with featured badge

## [0.0.20] - 2024-12-16

### Added
- Added centralized configuration system in `config.ts`
- Added environment-aware site URL configuration
- Added configurable navigation with customizable logo and GitHub button

### Changed
- Simplified site customization with single configuration file
- Updated navigation to use dynamic Lucide icons
- Made navigation more compact with smaller logo and GitHub button
- Reduced pagination component size for better aesthetics

## [0.0.19] - 2024-12-15

### Added
- Added loading states for filter changes with smooth transitions
- Implemented keyboard navigation for search (Escape to clear)
- Added clear button for search input
- Added ARIA labels for better accessibility

### Changed
- Optimized pagination with smarter range algorithm
- Improved filter state management to prevent unnecessary updates
- Enhanced URL handling to prevent page jumps when filtering
- Refined loading indicators with better visual feedback

## [0.0.18] - 2024-12-14

### Added
- Implemented URL-based filter persistence for sharing and bookmarking
- Added support for multiple filter parameters in URL
- Enhanced filter state management with URL synchronization

### Changed
- Improved career level filtering with consistent ordering
- Fixed React state updates to prevent render cycle issues
- Enhanced TypeScript type safety for filter values
- Updated filter initialization to support URL parameters

## [0.0.17] - 2024-12-14

### Changed
- Updated job card metadata styling with consistent text sizes
- Improved featured job styling with zinc color scheme
- Enhanced metadata display order across job cards and similar jobs
- Refined spacing in job cards for better aesthetics
- Standardized job metadata presentation across all views

## [0.0.16] - 2024-12-13

### Added
- Implemented comprehensive salary structure with currency and time unit support
- Added salary normalization for accurate sorting
- Added URL-based pagination with configurable items per page
- Added sorting options (newest, oldest, highest salary)
- Replaced dollar icon with wallet icon in job details
- Added loading state for job details page

### Changed
- Updated salary display format to use slashes (e.g., "/year" instead of "per year")
- Improved salary sorting logic with normalization to annual USD
- Enhanced job details sidebar with better icon choices
- Updated README with new salary and pagination features
- Improved type safety in pagination implementation

## [0.0.15] - 2024-12-13

### Added
- Added breadcrumb navigation to job post page using shadcn components
- Implemented compact breadcrumb design with hover interactions

### Changed
- Simplified "Apply for this position" button text to just "Apply"
- Enhanced breadcrumb styling with consistent gray color scheme and smaller text
- Optimized spacing between breadcrumbs and job title
- Replaced "Description" heading with subtle separator line for cleaner layout
- Improved job header layout with compact apply button aligned with metadata
- Maintained two apply buttons for better UX (top and bottom of description)
- Enhanced job description links with consistent color scheme and offset underlines
- Updated job source link in sidebar to match main content link styling

## [0.0.14] - 2024-12-13

### Added
- Added Similar Jobs component to job post page
- Implemented job similarity matching based on title keywords and location
- Limited to 5 similar job suggestions per post

## [0.0.13] - 2024-12-13

### Changed
- Added jobs added today counter with pulsating dot indicator
- Simplified job card date format by removing "Posted" prefix
- Enhanced homepage stats display with dynamic job counters

## [0.0.12] - 2024-12-13

### Changed
- Enhanced job details sidebar with icons and improved layout
- Added colored status badges for visa sponsorship
- Made sidebar layout more compact and readable
- Refined report button styling and alignment

### Fixed
- Added fallback for missing salary range values
- Made salary range field optional in job details
- Improved job card to hide salary when not specified
- Fixed report button color contrast for better accessibility

## [0.0.11] - 2024-12-13

### Added
- Created reusable PostJobBanner component for job posting promotion
- Created JobDetailsSidebar component for better code organization
- Implemented company avatars with fallback support
- Added dark button variant using shadcn components

### Changed
- Refined sidebar labels with smaller font sizes
- Improved component organization for better maintainability
- Enhanced banner styling with New York theme
- Moved job details sidebar logic into separate component

## [0.0.10] - 2024-12-12

### Changed
- Updated navigation with improved GitHub icon
- Enhanced hero section badge to highlight open-source nature
- Refined navigation layout and button styling

## [0.0.9] - 2024-12-12

### Added
- Detailed job sidebar with comprehensive job details
- Multi-select career levels with standardized options
- Improved job metadata display with tags
- Career level validation and formatting

### Technical
- Added type-safe career level handling
- Implemented deduplication for multiple selections
- Added fallback handling for empty fields
- Fixed React key warnings in career level tags

## [0.0.8] - 2024-12-12

### Changed
- Enhanced hero section with improved UX and aesthetics
- Added dynamic "Last Updated" timestamp based on job posts
- Refined stats section with trending companies
- Implemented left-aligned minimal design
- Integrated shadcn/ui components for consistent styling

## [0.0.7] - 2024-12-12

### Changed
- Updated Next.js to version 15.1.0
- Updated ESLint configuration
- Updated @types/node to latest version
- Improved job post page caching with static generation

### Technical
- Upgraded core dependencies for better stability
- Maintained React 19 experimental features
- Fixed peer dependency warnings
- Implemented generateStaticParams for job posts
- Added draft mode support for previews

## [0.0.6] - 2024-12-12

### Changed
- Optimized data fetching with server-side caching
- Improved loading states with content-specific skeletons
- Enhanced job post page performance with 5-minute cache
- Reduced unnecessary re-renders in job listings

### Technical
- Implemented Next.js unstable_cache for Airtable data
- Added custom loading skeleton for job posts
- Extended revalidation period to 300 seconds
- Optimized client-side search with useMemo

## [0.0.5] - 2024-12-11

### Added
- Dedicated changelog page with markdown rendering
- Implemented static page generation reading directly from `CHANGELOG.md`
- Minimal footer with quick navigation links

### Technical
- Added static page generation for changelog using `fs.readFileSync`
- Integrated `ReactMarkdown` for rendering markdown content
- Maintained consistent max-width (700px) with job posts

## [0.0.4] - 2024-12-11

### Changed
- Improved layout consistency with global container configuration
- Optimized content width for better readability
- Standardized max-width (1100px) across all pages
- Refined job post layout with 700px content width
- Enhanced maintainability with centralized container settings

## [0.0.3] - 2024-12-11

### Added
- Rich text support for job descriptions
- Tailwind Typography plugin integration
- Responsive typography styling
- Enhanced code block and blockquote formatting

### Changed
- Improved job description readability
- Updated markdown content styling
- Refined list spacing and indentation

## [0.0.2] - 2024-12-11

### Added
- Incremental Static Regeneration (ISR) support
- Automatic page revalidation every 60 seconds
- Real-time job updates without manual rebuilds

### Changed
- Updated home page and job detail pages to use ISR
- Improved data fetching strategy for better performance

## [0.0.1] - 2024-12-10

### Added
- Initial release
- Next.js 15 app router setup
- Airtable integration
- Job listing and detail pages
- Client-side search
- Responsive design with Tailwind CSS
- Geist font integration

### Changed
- N/A (initial release)

### Deprecated
- N/A (initial release)

### Removed
- N/A (initial release)

### Fixed
- N/A (initial release)

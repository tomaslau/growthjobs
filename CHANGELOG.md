# Changelog

All notable changes to this project will be documented in this file.

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
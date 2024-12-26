# Bordful: Job Board Starter

Bordful is a modern, minimal job board built with Next.js 15, Tailwind CSS, and Airtable. Features static generation, client-side search, and a clean UI with Geist font.

![Job Board Starter Screenshot](public/screenshot.png)

## Features

- Built with Next.js 15
- Styled with Tailwind CSS
- Airtable as the backend
- Client-side search with memoization
- Server-side caching with 5-minute revalidation
- Content-specific loading states
- Fully responsive
- Fast and SEO friendly
- Modern UI with Geist font, Tailwind CSS, and Shadcn UI
- Incremental Static Regeneration (ISR) for real-time updates
- Rich text support for job descriptions
- Comprehensive job metadata with multi-select career levels
- Advanced salary structure with currency and time unit support
- Smart pagination with URL-based navigation
- Sorting options (newest, oldest, highest salary)
- Dynamic jobs per page selection
- Featured job posts with distinct styling
- Similar jobs suggestions based on title and location
- URL-based filter persistence for sharing and bookmarking
- Comprehensive filtering system with multiple parameters
  - Job type (Full-time, Part-time, Contract)
  - Career level (18 standardized levels)
  - Remote work preference
  - Salary ranges
  - Visa sponsorship status
- Enhanced user experience
  - Keyboard navigation for search (Escape to clear)
  - Loading states with smooth transitions
  - Smart pagination with dynamic range
  - No page jumps during filtering
  - Accessible UI with ARIA labels

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/tomaslau/jobboardstarter
cd jobboardstarter
npm install
```

2. Set up Airtable:
- Create a new base in Airtable
- Create a table named "Jobs" with these fields:
  ```
  title: Single line text
  company: Single line text
  city: Single line text
  country: Single select (from ISO 3166 country list)
  type: Single select (Full-time, Part-time, Contract)
  salary_min: Number
  salary_max: Number
  salary_currency: Single select (USD, EUR, GBP)
  salary_unit: Single select (hour, day, week, month, year, project)
  description: Long text (with rich text enabled)
  apply_url: URL
  posted_date: Date
  status: Single select (active, inactive)
  remote_friendly: Single select (Yes, No, Not specified)
  career_level: Multiple select (Internship, Entry Level, Associate, Junior, Mid Level, Senior, Staff, Principal, Lead, Manager, Senior Manager, Director, Senior Director, VP, SVP, EVP, C-Level, Founder, Not Specified)
  visa_sponsorship: Single select (Yes, No, Not specified)
  job_timezone: Single line text
  featured: Checkbox
  ```
- Create a Personal Access Token at https://airtable.com/create/tokens
- Add these scopes to your token:
  - data.records:read
  - schema.bases:read
- Add your base to the token's access list

3. Environment Setup:
Create a `.env` file:
```env
AIRTABLE_ACCESS_TOKEN=your_token_here
AIRTABLE_BASE_ID=your_base_id_here
```

4. Development:
```bash
npm run dev
```

Visit `http://localhost:3000` to see your job board.

## Configuration

The job board can be easily customized through a single configuration file at `config/config.ts`:

```typescript
export const config = {
  // Marketing & SEO
  badge: "The #1 Open Source Tech Job Board",
  title: "Find Your Next Tech Role",
  description: "Browse curated tech opportunities...",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  
  // Navigation
  nav: {
    title: "JobBoard",  // Navigation bar text
    icon: "Briefcase",  // Lucide icon name
    github: {
      show: true,  // Show/hide GitHub button
      url: "https://github.com/yourusername/yourrepo",
    },
  },
}
```

### Environment-Aware URLs

The site URL automatically adjusts based on the environment:
1. Uses `NEXT_PUBLIC_SITE_URL` if provided
2. Falls back to `localhost:3000` in development
3. Uses production URL in production

### Navigation Customization

- **Icon**: Uses [Lucide icons](https://lucide.dev/icons) - choose any icon by name
- **Title**: Customize the text shown in the navigation bar
- **GitHub**: Toggle GitHub button visibility and set repository URL

## Environment Variables

⚠️ IMPORTANT: Never commit your API keys or sensitive credentials to the repository!

Required environment variables:
- AIRTABLE_ACCESS_TOKEN=your_token_here
- AIRTABLE_BASE_ID=your_base_id_here

Create a `.env` file in your project root and add these variables there.

## Data Revalidation

The job board uses Next.js Incremental Static Regeneration (ISR) and server-side caching to keep data fresh:
- Pages automatically revalidate every 5 minutes
- Server-side caching with unstable_cache
- Content-specific loading states
- New jobs appear without manual rebuilds
- Maintains fast static page delivery
- Zero downtime updates

You can adjust the revalidation interval in:
- `app/page.tsx` (job listing page)
- `app/jobs/[id]/page.tsx` (individual job pages)

## Project Structure

```
app/
  layout.tsx          # Root layout with Geist font
  page.tsx           # Home page with job listings
  jobs/
    [id]/
      page.tsx       # Individual job page
      loading.tsx    # Loading state for job page
lib/
  db/
    airtable.ts     # Airtable integration and salary formatting
  utils/
    formatDate.ts   # Date formatting utilities
components/
  ui/
    job-details-sidebar.tsx  # Job details sidebar
    post-job-banner.tsx     # Post job promotion banner
    similar-jobs.tsx        # Similar jobs suggestions
  jobs/
    JobCard.tsx     # Job listing card
```

## Salary Structure

The job board supports a comprehensive salary structure:
- Minimum and maximum salary ranges
- Multiple currencies (USD, EUR, GBP)
- Various time units (hour, day, week, month, year, project)
- Smart formatting (e.g., "$80k/year" or "$80k - $100k/year")
- Salary-based sorting with normalization to annual USD

## Pagination and Sorting

- URL-based pagination for better UX and SEO
- Configurable items per page (10, 25, 50, 100)
- Sort by newest, oldest, or highest salary
- Maintains state in URL parameters
- Elegant pagination UI with ellipsis for large page counts

## URL Parameters

The job board supports comprehensive URL parameters for sharing and bookmarking:

- `page` - Current page number
- `per_page` - Items per page (10, 25, 50, 100)
- `sort` - Sort order (newest, oldest, salary)
- `types` - Comma-separated job types (Full-time, Part-time, Contract)
- `roles` - Comma-separated career levels
- `remote` - Remote work filter (true)
- `salary` - Comma-separated salary ranges
- `visa` - Visa sponsorship filter (true)

Example URLs:
```
/?types=Full-time,Contract&roles=Senior,Lead&remote=true
/?salary=50K-100K,100K-200K&visa=true&page=2
/?sort=salary&per_page=25
```

## Customization

### Styling
The project uses Tailwind CSS for styling. Main configuration files:
- `tailwind.config.ts`: Theme configuration
- `app/globals.css`: Global styles
- `components/*`: Individual component styles

### Data Source
Current implementation uses Airtable. To use a different data source:
1. Modify `lib/db/airtable.ts`
2. Implement the same interface for job data

## Deployment

1. Push to GitHub
2. Deploy on Vercel:
   - Connect your GitHub repository
   - Add environment variables
   - Deploy

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this for your own job board!

## Support

If you find this helpful, please ⭐️ this repository!

## Credits

Built by [Tomas Laurinavicius](https://github.com/tomaslau)

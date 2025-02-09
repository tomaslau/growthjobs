# Job Board Starter Kit

A modern, open-source job board built with Next.js, Tailwind CSS, and Airtable. Features static generation for maximum performance and easy deployment.

## Features

- Built with Next.js
- Styled with Tailwind CSS and shadcn/ui
- Airtable as the initial data source
- Static generation for optimal performance
- Client-side search and filtering
- Fully responsive design
- SEO friendly

## Prerequisites

- Node.js 22+ and npm
- Airtable account
- GitHub account
- Vercel account

## Quick Start

1. Create a new project:
```bash
npx create-next-app@latest jobboard --typescript --tailwind --app --use-npm
cd jobboard
```

2. Install dependencies:
```bash
npm install airtable geist @types/airtable
npm install --save-dev @types/react @types/react-dom @types/node
```

3. Set up Airtable:
- Create a new base in Airtable
- Create a table named "Jobs" with these fields:
  ```
  id: string
  title: string
  company: string
  city: string | null
  country: string | null
  type: single select (Full-time, Part-time, Contract, Freelance)
  salary_range: string
  description: long text (markdown)
  apply_url: string
  posted_date: date
  status: single select (active, inactive)
  ```
- Get your API key from Account > API
- Copy your base ID from the API documentation

4. Environment Setup:
Create a `.env.local` file:
```env
AIRTABLE_API_KEY=your_api_key
AIRTABLE_BASE_ID=your_base_id
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

5. Project Structure:
```
app/
  layout.tsx          # Root layout with Geist font
  page.tsx           # Home page with job listings
  jobs/
    [id]/
      page.tsx       # Individual job page
lib/
  db/
    airtable.ts     # Airtable integration
    types.ts        # TypeScript interfaces
components/
  jobs/
    JobCard.tsx     # Job listing card
    JobList.tsx     # Job list component
    JobSearch.tsx   # Search component
    JobFilters.tsx  # Filter component
config/
  site.ts          # Site configuration
```

6. Development:
```bash
npm run dev
```

## Customization

### Styling
- Update `tailwind.config.js` for theme customization
- Modify components in `components/` directory
- Edit layout in `app/layout.tsx`

### Data Source
- Current implementation uses Airtable
- Modify `lib/db/airtable.ts` to change data source
- Implement the interface in `lib/db/types.ts`

## Deployment

1. Push to GitHub
2. Deploy on Vercel:
   - Connect your GitHub repository
   - Add environment variables
   - Deploy

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - feel free to use this for your own job board!

## Support

If you find this project helpful, please give it a ⭐️ on GitHub!

## Future Enhancements

- [ ] Job posting form
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Authentication
- [ ] Payment integration
- [ ] Custom company profiles
- [ ] Job alerts
- [ ] Analytics integration

## Troubleshooting

### Common Issues

1. **Airtable API Issues**
   - Verify API key and base ID
   - Check table name and field names

2. **Build Errors**
   - Ensure all dependencies are installed
   - Check TypeScript types
   - Verify environment variables

3. **Development Server**
   - Clear `.next` cache
   - Restart development server

## Need Help?

- Open an issue on GitHub
- Check existing issues
- Review pull requests
```
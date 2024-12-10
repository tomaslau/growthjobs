# Contributing to Job Board Starter Kit

Thank you for your interest in contributing! Here's how you can help:

## Development Process

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Run tests and linting: `npm run lint`
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to the branch: `git push origin feature/your-feature-name`
7. Submit a pull request

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. Set up Airtable:
- Create a base with a "Jobs" table
- Get your Personal Access Token
- Add required scopes (data.records:read, schema.bases:read)

3. Create a `.env.local` file:
```env
AIRTABLE_ACCESS_TOKEN=your_token_here
AIRTABLE_BASE_ID=your_base_id_here
```

4. Run the development server:
```bash
npm run dev
```

## Project Structure

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
  utils/
    formatDate.ts   # Date formatting utilities
components/
  jobs/
    JobCard.tsx     # Job listing card
    JobSearch.tsx   # Search component
```

## Code Style

- Use TypeScript
- Follow ESLint rules
- Use double quotes for strings
- Use semicolons
- Write meaningful commit messages

Thank you for contributing! 
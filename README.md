# TechFusion Hackathon Website

A modern, futuristic website for a hackathon event, featuring information about the hackathon, events schedule, and a dynamic project submission system.

## Features

- **Modern Dark Theme** with neon accents and futuristic design
- **Responsive Design** that works on mobile, tablet, and desktop
- **Dynamic Project Submissions** using Supabase as the backend
- **Multiple Pages** including:
  - Homepage with event overview
  - About page with information about judges, sponsors, and partners
  - Events page with detailed schedule
  - Projects showcase page
  - Individual project detail pages
  - Project submission form

## Tech Stack

- **Frontend**: Next.js 14+ with React 19
- **Styling**: Tailwind CSS
- **Backend**: Supabase for database and storage
- **Deployment**: Ready for Vercel deployment

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/hackathon-website.git
cd hackathon-website
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file at the root of the project with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

## Supabase Setup

To fully utilize the project submission functionality, you need to set up a Supabase project:

1. Create a Supabase account and a new project
2. Create a `projects` table with the following columns:
   - `id` (int, primary key, auto-increment)
   - `username` (text)
   - `social_link` (text)
   - `title` (text)
   - `project_link` (text)
   - `description` (text)
   - `image_url` (text)
   - `created_at` (timestamp with time zone)
3. Update the `.env.local` file with your Supabase project URL and anon key

## Customization

- Colors and theme settings can be modified in `tailwind.config.js`
- Global styles are in `app/globals.css`
- Page-specific content can be updated in the respective page files

## Deployment

This project is ready to be deployed on Vercel:

1. Push your code to a GitHub repository
2. Import the repository into Vercel
3. Add your environment variables
4. Deploy!

## License

MIT

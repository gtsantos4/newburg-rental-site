# Rental Property Website + Admin Dashboard

A brochure website and application management system for your furnished rental property, built to work with Furnished Finder listings.

## Quick Start

### 1. Install dependencies
```bash
cd rental-site
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:
```
POSTGRES_URL=<your Vercel Postgres connection string>
ADMIN_PASSWORD=<choose a strong password>
SESSION_SECRET=<random 32+ character string>
NEXT_PUBLIC_MAP_LAT=<your property latitude>
NEXT_PUBLIC_MAP_LNG=<your property longitude>
```

### 3. Run locally
```bash
npm run dev
```
Visit http://localhost:3000

### 4. Deploy to Vercel

1. Push this code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and import the repository
3. In the Vercel dashboard, go to **Storage** → **Create Database** → **Postgres** (free tier)
4. Vercel will automatically set `POSTGRES_URL` in your environment
5. Add `ADMIN_PASSWORD` and `SESSION_SECRET` in **Settings** → **Environment Variables**
6. Add `NEXT_PUBLIC_MAP_LAT` and `NEXT_PUBLIC_MAP_LNG` as well

### 5. Initialize the database

After your first deploy, visit:
```
https://your-site.vercel.app/api/init?secret=YOUR_SESSION_SECRET
```

This creates the database tables. You only need to do this once.

---

## Customizing Your Content

All property-specific content is in one file: **`lib/config.js`**

Look for `[REPLACE: ...]` markers and swap in your real information:
- Property name, address, contact info
- Unit names, prices, features, availability
- FAQ answers
- Nearby places and distances
- Map coordinates (also set in `.env.local`)

### Adding Photos
1. Put your images in the `/public/images/` folder
2. Update the image paths in `lib/config.js` under each unit's `images` array
3. For the hero image, edit `components/Hero.js` — replace the gradient div with an `<img>` or `next/image`
4. For the floor plan, edit `components/PropertySection.js` — replace the placeholder with your floor plan image

---

## Project Structure

```
app/
  page.js              — Brochure home page
  apply/page.js        — Application form
  admin/page.js        — Admin dashboard
  admin/login/page.js  — Admin login
  api/                 — API routes
components/            — React components
lib/
  config.js            — All property data (edit this!)
  db.js                — Database queries
  auth.js              — Authentication
  validation.js        — Form validation
  rate-limit.js        — Rate limiting
middleware.js          — Route protection
```

## Admin Dashboard

Access at `/admin` — password protected.

Features:
- View all applications in a table
- Filter by status (New / Reviewing / Approved / Rejected)
- Expand any row to see full application details
- Change status with a dropdown
- Delete applications

---

## Tech Stack

- Next.js 14 (App Router)
- Tailwind CSS
- Vercel Postgres
- Leaflet + OpenStreetMap
- Lucide React icons
- Jose (JWT sessions)

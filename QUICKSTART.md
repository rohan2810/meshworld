# Quick Start Guide

Get MeshWorld running in 5 minutes.

## Step 1: Install Dependencies

```bash
pnpm install
# or npm install
```

## Step 2: Set Up Environment Variables

```bash
cp .env.local.example .env.local
```

For now, you can run the site without Supabase – the form will show an error message gracefully.

**To enable the waitlist:**

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **Settings → API** and copy:
   - Project URL
   - Anon/Public key
4. Go to **SQL Editor** and run:

```sql
CREATE TABLE waitlist (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

5. Update `.env.local` with your credentials

## Step 3: Run Dev Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## Step 4: Customize

### Replace placeholder content:

1. **Video:** Add `/public/video/hero-loop.mp4` (or the form will show a gradient fallback)
2. **Images:** Replace `/public/img/logo.svg` and create `/public/img/og.jpg`
3. **Copy:** Edit text in `app/(site)/_sections/*.tsx`
4. **Colors:** Change in `tailwind.config.ts`

### Quick Copy Locations:

- **Hero headline:** `app/(site)/_sections/Hero.tsx`
- **Problem text:** `app/(site)/_sections/Problem.tsx`
- **Features:** `app/(site)/_sections/Solution.tsx`
- **Tech stack:** `app/(site)/_sections/Tech.tsx`

## Step 5: Deploy

### Vercel (Recommended)

1. Push to GitHub
2. Import at [vercel.com](https://vercel.com)
3. Add environment variables (if using Supabase)
4. Deploy!

### Other Platforms

Works on any Next.js 14-compatible host:
- Netlify
- Railway
- Fly.io

---

Need help? Check the full [README.md](./README.md)


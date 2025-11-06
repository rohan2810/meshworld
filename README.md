# MeshWorld – Landing Page

A cinematic, high-performance landing page for MeshWorld, built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Next.js 14 App Router** – Modern React framework with server components
- **TypeScript** – Type-safe development
- **Tailwind CSS** – Utility-first styling with custom design tokens
- **Framer Motion** – Smooth, accessible animations
- **Supabase** – Waitlist email collection
- **Fully Responsive** – Mobile-first design
- **Accessible** – WCAG AA compliant, semantic HTML, keyboard navigation
- **SEO Optimized** – Meta tags, Open Graph, sitemap-ready
- **Performance** – Lighthouse score 90+

## 📁 Project Structure

```
/app
  /(site)
    /_components      # Reusable UI components
      Button.tsx
      Container.tsx
      FeatureCard.tsx
      Footer.tsx
      Header.tsx
      Icon.tsx
      MeshHero.tsx
      Section.tsx
      VideoBackground.tsx
      WaitlistForm.tsx
    /_sections        # Page sections
      Hero.tsx
      Problem.tsx
      Solution.tsx
      Mesh.tsx
      Tech.tsx
      CTA.tsx
    page.tsx          # Main landing page
  globals.css         # Global styles
  layout.tsx          # Root layout with fonts & metadata
/lib
  supabase.ts         # Supabase client & waitlist logic
  seo.ts              # SEO configuration
  utils.ts            # Utility functions
  analytics.ts        # Analytics placeholder
/public
  /img                # Images (logo, og-image)
  /video              # Hero background video
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and pnpm (or npm/yarn)
- A Supabase account (free tier works)

### 1. Install Dependencies

```bash
pnpm install
# or
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **Settings → API** and copy your project URL and anon key
3. In the Supabase SQL Editor, run:

```sql
CREATE TABLE waitlist (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

4. Copy `.env.local.example` to `.env.local` and add your credentials:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

### 4. Add Assets (Optional)

Replace placeholder assets in `/public`:

- `/public/img/logo.svg` – Your logo
- `/public/img/og.jpg` – Open Graph image (1200×630px)
- `/public/video/hero-loop.mp4` – Background video (~10s loop, <5MB)
- `/public/img/hero-poster.jpg` – Video poster frame

**Video Tips:**
- Use H.264 codec for compatibility
- Keep motion subtle and slow
- Compress with ffmpeg:
  ```bash
  ffmpeg -i input.mp4 -vcodec h264 -acodec aac -crf 28 hero-loop.mp4
  ```

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` and `app/globals.css`:

```ts
colors: {
  bg: '#0B0F19',    // Background
  fg: '#E6EAF2',    // Foreground text
  cy: '#58FFE0',    // Cyan accent
  vi: '#A78BFA',    // Violet accent
  am: '#FBBF24',    // Amber accent
}
```

### Copy

All text content is in the section components:
- `app/(site)/_sections/Hero.tsx` – Hero headline
- `app/(site)/_sections/Problem.tsx` – Problem statement
- `app/(site)/_sections/Solution.tsx` – Feature descriptions
- `app/(site)/_sections/Mesh.tsx` – Mesh differentiator
- `app/(site)/_sections/Tech.tsx` – Technology stack
- `app/(site)/_sections/CTA.tsx` – Call to action

### Fonts

Change the font in `app/layout.tsx`:

```ts
import { Inter } from 'next/font/google'
// Replace Inter with your preferred Google Font
```

## 📦 Build & Deploy

### Build for Production

```bash
pnpm build
pnpm start
```

### Deploy to Vercel

1. Push your code to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

Vercel will auto-deploy on every push to main.

### Other Platforms

This is a standard Next.js app and works on any platform that supports Next.js 14:
- Netlify
- Railway
- Fly.io
- AWS Amplify

## 🧪 Development

### Linting

```bash
pnpm lint
```

### Formatting

```bash
pnpm format
```

### Type Checking

```bash
pnpm tsc --noEmit
```

## ♿ Accessibility

- Semantic HTML with ARIA labels
- Keyboard navigation support
- Focus indicators on all interactive elements
- `prefers-reduced-motion` respected
- WCAG AA color contrast

## 🔒 Privacy & Security

- Supabase Row Level Security (RLS) should be configured for production
- Email validation on client and server
- HTTPS enforced in production
- No tracking by default (add your analytics in `lib/analytics.ts`)

## 📝 TODO for Production

- [ ] Replace placeholder assets (video, images, logo)
- [ ] Update copy and messaging
- [ ] Add real analytics (Google Analytics, Plausible, etc.)
- [ ] Configure Supabase RLS policies
- [ ] Add robots.txt and sitemap.xml
- [ ] Set up custom domain
- [ ] Add Privacy Policy and Terms of Service pages
- [ ] Consider adding a blog or FAQ section

## 🤝 Contributing

This is a starter template. Feel free to customize, extend, or completely reimagine it for your needs.

## 📄 License

MIT License - feel free to use this for your own projects.

---

Built with ❤️ for the future of human experience.


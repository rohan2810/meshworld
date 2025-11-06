# Deployment Guide

## ✅ Pre-Deployment Checklist

Before deploying, make sure:

- [ ] All placeholder assets are replaced (video, logo, OG image)
- [ ] `.env.local` variables are set (if using Supabase)
- [ ] Site builds locally without errors: `pnpm build`
- [ ] Copy/content has been reviewed and updated
- [ ] Supabase table is created and accessible
- [ ] You've tested the waitlist form

## 🚀 Deploy to Vercel (Recommended)

### Why Vercel?
- Built by the creators of Next.js
- Zero-config deployment
- Automatic HTTPS & CDN
- Edge functions support
- Free tier is generous

### Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-username/meshworld.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Add Environment Variables**
   - In project settings, go to "Environment Variables"
   - Add:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Available for: Production, Preview, Development

4. **Deploy**
   - Click "Deploy"
   - Done! Your site will be live at `your-project.vercel.app`

5. **Custom Domain** (optional)
   - Go to project Settings → Domains
   - Add your domain
   - Update DNS records as instructed

### Auto-Deploy

Every push to `main` will trigger a new deployment automatically.

Preview deployments are created for pull requests.

---

## 🌊 Deploy to Netlify

1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Set environment variables in Site Settings

3. **Deploy**

Note: Netlify requires the `@netlify/plugin-nextjs` plugin for full Next.js support.

---

## 🚂 Deploy to Railway

1. **Create Project**
   - Go to [railway.app](https://railway.app)
   - Click "New Project" → "Deploy from GitHub repo"

2. **Configure**
   - Railway auto-detects Next.js
   - Add environment variables in Variables tab

3. **Deploy**

Railway provides a free tier with a generated domain.

---

## ☁️ Deploy to AWS Amplify

1. **Connect Repository**
   - Open [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
   - Click "New app" → "Host web app"
   - Connect to GitHub

2. **Build Settings**
   - Amplify auto-detects Next.js
   - Add environment variables in "Environment variables"

3. **Deploy**

---

## 🔒 Environment Variables for Production

Set these in your deployment platform:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**Important:** Never commit `.env.local` to git. It's in `.gitignore` by default.

---

## 🗃️ Supabase for Production

### Security: Enable Row Level Security (RLS)

By default, your waitlist table is publicly accessible. Lock it down:

1. Go to Supabase Dashboard → Authentication → Policies
2. Enable RLS on the `waitlist` table
3. Add a policy for inserts:

```sql
-- Allow anyone to insert their email
CREATE POLICY "Allow public inserts" ON waitlist
  FOR INSERT
  WITH CHECK (true);

-- Prevent public reads (only you can view via dashboard)
CREATE POLICY "Restrict reads" ON waitlist
  FOR SELECT
  USING (false);
```

This allows form submissions but prevents email scraping.

---

## 📊 Analytics

Add analytics in `lib/analytics.ts`:

### Google Analytics

```bash
pnpm add @next/third-parties
```

In `app/layout.tsx`:

```tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  )
}
```

### Plausible (Privacy-focused)

```tsx
<script defer data-domain="meshworld.com" src="https://plausible.io/js/script.js"></script>
```

Add to `app/layout.tsx` head section.

---

## 🧪 Test Production Build Locally

Before deploying:

```bash
pnpm build
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) and test:
- All pages load
- Forms work
- No console errors
- Images/video display correctly

---

## 🐛 Common Deployment Issues

### 1. Build Fails

**Error:** `Module not found` or `Cannot find module`

**Fix:** Make sure all imports use correct paths. Check for:
- Typos in import paths
- Missing files
- Case sensitivity (macOS ignores, Linux doesn't)

### 2. Environment Variables Not Working

**Error:** `undefined` when accessing `process.env.NEXT_PUBLIC_*`

**Fix:**
- Variables must start with `NEXT_PUBLIC_` for client-side access
- Restart dev server after changing `.env.local`
- Re-deploy after updating env vars in hosting platform

### 3. Waitlist Form Returns Error

**Error:** "Supabase configuration is missing"

**Fix:**
- Verify env vars are set in deployment platform
- Check Supabase project is not paused (free tier pauses after inactivity)
- Confirm table `waitlist` exists

### 4. Video Not Playing

**Error:** Video doesn't load on mobile

**Fix:**
- Add `playsInline` attribute (already included)
- Ensure video is H.264 encoded
- Check file size (< 5MB recommended)
- Use a CDN for large videos

---

## 🎯 Post-Deployment

After going live:

1. **Test on Real Devices**
   - Check mobile, tablet, desktop
   - Test in Chrome, Safari, Firefox

2. **Monitor Performance**
   - Run Lighthouse audit
   - Check [PageSpeed Insights](https://pagespeed.web.dev/)
   - Aim for 90+ score

3. **Set Up Monitoring**
   - Vercel Analytics (built-in)
   - Sentry for error tracking
   - Uptime monitoring (UptimeRobot, etc.)

4. **Submit to Search Engines**
   - [Google Search Console](https://search.google.com/search-console)
   - [Bing Webmaster Tools](https://www.bing.com/webmasters)

---

Need help? Check [README.md](./README.md) or file an issue.


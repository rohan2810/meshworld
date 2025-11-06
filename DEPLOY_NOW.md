# 🚀 Quick Deployment Guide

## ✅ Pre-Deployment Checklist
- ✅ Build tested successfully (`npm run build`)
- ✅ Git repository initialized
- ✅ All linting errors fixed

## Step 1: Push to GitHub

1. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Name it `meshworld` (or your preferred name)
   - Don't initialize with README (we already have one)
   - Click "Create repository"

2. **Push your code:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/meshworld.git
   git branch -M main
   git push -u origin main
   ```
   Replace `YOUR_USERNAME` with your GitHub username.

## Step 2: Deploy to Vercel

### Option A: Via Vercel Dashboard (Recommended)

1. **Go to Vercel:**
   - Visit https://vercel.com
   - Sign up/Login with GitHub

2. **Import Project:**
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Configure Environment Variables (if using Supabase):**
   - In project settings, go to "Environment Variables"
   - Add:
     - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
   - Select "Production", "Preview", and "Development"

4. **Deploy:**
   - Click "Deploy"
   - Wait ~2 minutes
   - Your site will be live at `your-project.vercel.app`

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name? meshworld
# - Directory? ./
# - Override settings? No
```

## Step 3: Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your domain (e.g., `meshworld.com`)
3. Follow DNS configuration instructions
4. Wait for DNS propagation (~5-30 minutes)

## 🎉 You're Live!

Your website is now deployed and accessible worldwide!

## 📝 Post-Deployment

- Test the waitlist form
- Check mobile responsiveness
- Run Lighthouse audit
- Set up analytics (optional)

## 🔧 Troubleshooting

**Build fails?**
- Check environment variables are set correctly
- Verify all dependencies are in `package.json`

**Waitlist form not working?**
- Verify Supabase env vars are set
- Check Supabase project is active (not paused)

**Need help?**
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs


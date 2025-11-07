# 🚀 Deploy SetuAI to setuai.app

## Option 1: Deploy to Vercel + Custom Domain (Recommended - Easiest)

Vercel is the best platform for Next.js apps. You can deploy there and connect your `setuai.app` domain.

### Step 1: Deploy to Vercel

1. **Push your code to GitHub** (if not already):
   ```bash
   git add .
   git commit -m "Update domain to setai.app"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Go to https://vercel.com
   - Sign up/Login with GitHub
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"
   - Your site will be live at `your-project.vercel.app`

### Step 2: Connect Your Domain (setai.app)

1. **In Vercel Dashboard:**
   - Go to your project → Settings → Domains
   - Click "Add Domain"
   - Enter `setuai.app` and `www.setuai.app`

2. **Configure DNS at your domain registrar:**
   
   Vercel will show you DNS records to add. Typically:
   
   **For setuai.app (apex domain):**
   - Type: `A`
   - Name: `@` (or leave blank)
   - Value: `76.76.21.21` (Vercel's IP - check Vercel dashboard for current IP)
   
   **OR use CNAME (if your registrar supports it):**
   - Type: `CNAME`
   - Name: `@`
   - Value: `cname.vercel-dns.com`
   
   **For www.setuai.app:**
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`

3. **Wait for DNS propagation** (5-30 minutes)

4. **SSL Certificate:**
   - Vercel automatically provisions SSL certificates via Let's Encrypt
   - Your site will be available at `https://setuai.app` automatically

---

## Option 2: Deploy to Netlify

### Step 1: Deploy to Netlify

1. **Push code to GitHub**

2. **Deploy:**
   - Go to https://netlify.com
   - Sign up/Login with GitHub
   - Click "Add new site" → "Import an existing project"
   - Select your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Click "Deploy"

### Step 2: Connect Domain

1. **In Netlify Dashboard:**
   - Go to Site settings → Domain management
   - Click "Add custom domain"
   - Enter `setuai.app`

2. **Configure DNS:**
   - Netlify will show DNS records
   - Add A record pointing to Netlify's IP
   - Or use CNAME for www subdomain

---

## Option 3: Deploy to Railway

### Step 1: Deploy to Railway

1. **Install Railway CLI:**
   ```bash
   npm i -g @railway/cli
   ```

2. **Deploy:**
   ```bash
   railway login
   railway init
   railway up
   ```

3. **Configure:**
   - Railway auto-detects Next.js
   - Add environment variables in dashboard if needed

### Step 2: Connect Domain

1. **In Railway Dashboard:**
   - Go to your project → Settings → Domains
   - Add custom domain `setuai.app`
   - Follow DNS instructions

---

## Option 4: Self-Host on VPS (Advanced)

### Requirements:
- VPS (DigitalOcean, Linode, AWS EC2, etc.)
- Domain DNS access
- Basic server knowledge

### Step 1: Set up Server

1. **SSH into your VPS**

2. **Install Node.js:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Install PM2 (process manager):**
   ```bash
   sudo npm install -g pm2
   ```

4. **Clone your repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
   cd YOUR_REPO
   npm install
   ```

5. **Build the app:**
   ```bash
   npm run build
   ```

6. **Start with PM2:**
   ```bash
   pm2 start npm --name "setuai" -- start
   pm2 save
   pm2 startup
   ```

### Step 2: Set up Nginx Reverse Proxy

1. **Install Nginx:**
   ```bash
   sudo apt update
   sudo apt install nginx
   ```

2. **Create Nginx config:**
   ```bash
   sudo nano /etc/nginx/sites-available/setai.app
   ```

3. **Add configuration:**
   ```nginx
   server {
       listen 80;
       server_name setuai.app www.setuai.app;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. **Enable site:**
   ```bash
   sudo ln -s /etc/nginx/sites-available/setai.app /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

### Step 3: Set up SSL with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d setuai.app -d www.setuai.app
```

### Step 4: Configure DNS

At your domain registrar, add:
- **A record:** `@` → Your VPS IP address
- **A record:** `www` → Your VPS IP address

---

## 🔧 Environment Variables

If you're using Supabase, make sure to set these environment variables in your deployment platform:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## ✅ Recommended: Option 1 (Vercel)

**Why Vercel?**
- ✅ Zero-config Next.js deployment
- ✅ Automatic SSL certificates
- ✅ Global CDN
- ✅ Automatic deployments on git push
- ✅ Preview deployments for PRs
- ✅ Free tier is generous
- ✅ Easy custom domain setup

**Steps Summary:**
1. Deploy to Vercel (connects to GitHub)
2. Add `setuai.app` domain in Vercel dashboard
3. Configure DNS at your registrar
4. Wait for propagation
5. Done! 🎉

---

## 📝 DNS Configuration Quick Reference

**For setuai.app at most registrars:**

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 76.76.21.21 | 3600 |
| CNAME | www | cname.vercel-dns.com | 3600 |

*Note: Check Vercel dashboard for current IP addresses*

---

## 🆘 Troubleshooting

**Domain not working?**
- Wait 24-48 hours for full DNS propagation
- Use `dig setuai.app` or `nslookup setuai.app` to check DNS
- Verify DNS records match what Vercel/your platform shows

**SSL certificate issues?**
- Vercel/Netlify handle this automatically
- For self-hosted, ensure port 80 is open for Let's Encrypt verification

**Build fails?**
- Check environment variables are set
- Verify all dependencies in `package.json`
- Check build logs for specific errors


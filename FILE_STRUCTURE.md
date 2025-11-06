# File Structure Guide

Complete directory tree with descriptions.

```
v1/
├── 📄 Configuration Files
│   ├── package.json              # Dependencies and npm scripts
│   ├── tsconfig.json             # TypeScript configuration
│   ├── next.config.js            # Next.js settings
│   ├── tailwind.config.ts        # Tailwind + design tokens
│   ├── postcss.config.js         # CSS processing config
│   ├── .eslintrc.json            # Linting rules
│   ├── .prettierrc               # Code formatting rules
│   ├── .prettierignore           # Files to skip formatting
│   ├── .gitignore                # Git ignore patterns
│   ├── vercel.json               # Vercel deployment config
│   └── .env.local.example        # Environment variable template
│
├── 📚 Documentation
│   ├── README.md                 # Main setup guide
│   ├── QUICKSTART.md             # 5-minute quick start
│   ├── CUSTOMIZATION.md          # Design & content guide
│   ├── DEPLOYMENT.md             # Deployment guide (multi-platform)
│   ├── CHANGELOG.md              # Version history
│   ├── PROJECT_SUMMARY.md        # This file - complete overview
│   ├── FILE_STRUCTURE.md         # File tree (you are here)
│   └── LICENSE                   # MIT License
│
├── 📁 app/                       # Next.js App Router
│   ├── layout.tsx                # Root layout (fonts, metadata)
│   ├── page.tsx                  # Root redirect to (site)
│   ├── globals.css               # Global styles (Tailwind + custom)
│   │
│   └── (site)/                   # Site route group
│       ├── layout.tsx            # Site-specific layout
│       ├── page.tsx              # Main landing page (assembles sections)
│       │
│       ├── _components/          # Reusable UI components
│       │   ├── Button.tsx        # Button with variants (CVA)
│       │   ├── Container.tsx     # Max-width content wrapper
│       │   ├── Section.tsx       # Section wrapper with spacing
│       │   ├── Header.tsx        # Sticky navigation header
│       │   ├── Footer.tsx        # Minimal footer
│       │   ├── Icon.tsx          # Icon wrapper + SVG icons
│       │   ├── FeatureCard.tsx   # Animated feature card
│       │   ├── VideoBackground.tsx # Video with overlay & fallback
│       │   ├── MeshHero.tsx      # Animated particle mesh (canvas)
│       │   └── WaitlistForm.tsx  # Email form (Supabase)
│       │
│       └── _sections/            # Page sections
│           ├── Hero.tsx          # Full-screen hero with video
│           ├── Problem.tsx       # Problem statement + mesh animation
│           ├── Solution.tsx      # Feature cards (3-column)
│           ├── Mesh.tsx          # Constellation SVG animation
│           ├── Tech.tsx          # Technology stack (3-column)
│           └── CTA.tsx           # Waitlist call-to-action
│
├── 📁 lib/                       # Utility libraries
│   ├── utils.ts                  # cn() helper (clsx + tailwind-merge)
│   ├── supabase.ts               # Supabase client + waitlist logic
│   ├── seo.ts                    # SEO configuration object
│   └── analytics.ts              # Analytics placeholder
│
├── 📁 public/                    # Static assets (served as-is)
│   ├── robots.txt                # Search engine crawling rules
│   │
│   ├── img/                      # Images
│   │   ├── logo.svg              # MeshWorld logo (placeholder)
│   │   ├── og.jpg                # Open Graph image (needs creation)
│   │   ├── og.jpg.txt            # Instructions for OG image
│   │   └── .gitkeep              # Keeps directory in git
│   │
│   └── video/                    # Video assets
│       └── .gitkeep              # Placeholder for hero-loop.mp4
│
└── 📁 .vscode/                   # VSCode settings
    └── settings.json             # Format on save, ESLint auto-fix
```

## 📊 File Count Summary

- **Total Files:** 41
- **Components:** 10 UI components + 6 section components
- **Configuration:** 11 config files
- **Documentation:** 8 markdown files
- **Utilities:** 4 library files

## 🎯 Key Directories

### `/app`
Next.js 14 App Router structure. The `(site)` folder is a route group (doesn't affect URLs).

**Pattern:** 
- `_components/` = reusable UI (private, not a route)
- `_sections/` = page-specific sections (private)
- `page.tsx` = actual route/page

### `/lib`
Shared utilities used across components. Think of this as your "business logic" layer.

### `/public`
Static files served directly. Files in here are available at the root URL.

Example: `/public/img/logo.svg` → `https://yoursite.com/img/logo.svg`

## 🔍 Component Hierarchy

```
page.tsx
├── Header.tsx (sticky nav)
├── Hero.tsx
│   ├── VideoBackground.tsx
│   ├── Container.tsx
│   ├── Button.tsx (x2)
│   └── ChevronDown (Icon.tsx)
├── Problem.tsx
│   ├── Section.tsx
│   ├── Container.tsx
│   └── MeshHero.tsx (canvas animation)
├── Solution.tsx
│   ├── Section.tsx
│   ├── Container.tsx
│   └── FeatureCard.tsx (x3)
│       └── Icon.tsx
├── Mesh.tsx
│   ├── Section.tsx
│   ├── Container.tsx
│   └── <svg> (constellation animation)
├── Tech.tsx
│   ├── Section.tsx
│   ├── Container.tsx
│   └── FeatureCard.tsx (x3)
│       └── Icon.tsx
├── CTA.tsx
│   ├── Section.tsx
│   ├── Container.tsx
│   └── WaitlistForm.tsx
│       └── Button.tsx
└── Footer.tsx
```

## 📝 File Naming Conventions

- **Components:** `PascalCase.tsx` (e.g., `Button.tsx`)
- **Utilities:** `camelCase.ts` (e.g., `utils.ts`)
- **Configuration:** `kebab-case.js/json` (e.g., `next.config.js`)
- **Documentation:** `SCREAMING-SNAKE-CASE.md` (e.g., `README.md`)
- **Directories:** `lowercase` or `(groups)` for route groups

## 🎨 Where to Find Things

### Need to change...

| What | File |
|------|------|
| **Hero headline** | `app/(site)/_sections/Hero.tsx` |
| **Colors** | `tailwind.config.ts` + `app/globals.css` |
| **Navigation links** | `app/(site)/_components/Header.tsx` |
| **Feature descriptions** | `app/(site)/_sections/Solution.tsx` |
| **Footer content** | `app/(site)/_components/Footer.tsx` |
| **Button styles** | `app/(site)/_components/Button.tsx` |
| **SEO metadata** | `app/layout.tsx` + `lib/seo.ts` |
| **Supabase logic** | `lib/supabase.ts` |
| **Fonts** | `app/layout.tsx` (Inter import) |
| **Global styles** | `app/globals.css` |

## 🔗 Import Paths

All imports use the `@/` alias which maps to the project root:

```typescript
// Instead of: import { cn } from '../../lib/utils'
import { cn } from '@/lib/utils'

// Instead of: import { Button } from './components/Button'
import { Button } from '@/app/(site)/_components/Button'
```

Configured in `tsconfig.json`:
```json
"paths": {
  "@/*": ["./*"]
}
```

## 🛠️ Development Workflow

1. **Make changes** → Edit component/section files
2. **See live** → Next.js hot-reloads automatically
3. **Format** → VSCode auto-formats on save (or `pnpm format`)
4. **Lint** → Run `pnpm lint` before committing
5. **Build** → Test production build with `pnpm build`

## 📦 Adding New Sections

1. Create `app/(site)/_sections/NewSection.tsx`
2. Import in `app/(site)/page.tsx`
3. Add between existing sections
4. Use `<Section>` wrapper for consistency

Example:
```tsx
// NewSection.tsx
import { Section } from '../_components/Section'

export function NewSection() {
  return (
    <Section id="new" aria-labelledby="new-heading">
      <h2 id="new-heading">New Section</h2>
      {/* Your content */}
    </Section>
  )
}
```

## 🚀 Deployment Files

When deploying, these files are used:

- **Vercel:** Reads `vercel.json` + `package.json`
- **Netlify:** Uses `package.json` build scripts
- **Railway/AWS:** Auto-detects Next.js from `next.config.js`

All platforms need environment variables from `.env.local.example`.

---

**Tip:** Bookmark this file for quick reference while developing!


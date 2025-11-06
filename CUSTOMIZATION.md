# Customization Guide

## 🎨 Design Tokens

### Colors

All colors are defined in two places:

**1. Tailwind Config** (`tailwind.config.ts`):

```ts
colors: {
  bg: '#0B0F19',    // Background
  fg: '#E6EAF2',    // Foreground/text
  cy: '#58FFE0',    // Cyan accent
  vi: '#A78BFA',    // Violet accent  
  am: '#FBBF24',    // Amber accent
}
```

**2. CSS Variables** (`app/globals.css`):

```css
:root {
  --bg: #0B0F19;
  --fg: #E6EAF2;
  --cy: #58FFE0;
  --vi: #A78BFA;
  --am: #FBBF24;
}
```

Change both for consistency.

### Typography

**Font:** Change in `app/layout.tsx`:

```ts
import { Inter } from 'next/font/google'
// Try: Poppins, Montserrat, Work Sans, etc.
```

**Font Sizes:** Edit Tailwind classes in components:
- Headlines: `text-4xl md:text-5xl`
- Body: `text-base` or `text-lg`

## 📝 Content

### Section Text

All copy lives in `app/(site)/_sections/`:

| Section | File | What to Change |
|---------|------|----------------|
| Hero | `Hero.tsx` | Headline, subtitle, button text |
| Problem | `Problem.tsx` | Problem statement paragraphs |
| Solution | `Solution.tsx` | Feature titles & descriptions |
| Mesh | `Mesh.tsx` | Differentiator copy |
| Tech | `Tech.tsx` | Technology descriptions |
| CTA | `CTA.tsx` | Final call-to-action |

### Navigation Links

Edit `app/(site)/_components/Header.tsx`:

```tsx
<a href="#solution">Features</a>
<a href="#tech">Technology</a>
```

Add/remove links as needed.

### Footer

Edit `app/(site)/_components/Footer.tsx` to add social links, legal pages, etc.

## 🖼️ Assets

### Logo

Replace `/public/img/logo.svg` with your logo. It's used in the header.

Update reference in `Header.tsx` if you use a different format (PNG, etc.).

### Hero Video

1. Create a ~10 second looping video (1920×1080 recommended)
2. Compress it to < 5MB:
   ```bash
   ffmpeg -i input.mp4 -vcodec h264 -crf 28 hero-loop.mp4
   ```
3. Save as `/public/video/hero-loop.mp4`
4. Create poster frame: `/public/img/hero-poster.jpg`

**No video?** No problem – a gradient fallback displays automatically.

### Open Graph Image

Create `/public/img/og.jpg` (1200×630px) for social media previews.

## 🎬 Animations

### Speed

Adjust durations in Framer Motion components:

```tsx
transition={{ duration: 0.6 }}  // Slower = higher number
```

### Disable for Sections

Remove `motion` wrapper and use plain `<div>`:

```tsx
// Before
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

// After
<div>
```

### Respect Reduced Motion

Already implemented! Users with `prefers-reduced-motion` see minimal animations.

## 🧩 Components

### Add New Section

1. Create `app/(site)/_sections/NewSection.tsx`
2. Import and add to `app/(site)/page.tsx`:

```tsx
import { NewSection } from './_sections/NewSection'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        {/* ... */}
        <NewSection />  {/* Add here */}
        <CTA />
      </main>
      <Footer />
    </>
  )
}
```

### Reusable Components

Found in `app/(site)/_components/`:
- `Button` – Primary, secondary, ghost variants
- `FeatureCard` – Card with icon, title, description
- `Section` – Wrapper with padding and container
- `Container` – Max-width content wrapper

## 🔧 Advanced

### Add Animation Variants

In `tailwind.config.ts`:

```ts
animation: {
  'my-animation': 'myKeyframes 2s ease-in-out',
},
keyframes: {
  myKeyframes: {
    '0%': { /* start */ },
    '100%': { /* end */ },
  },
}
```

### Custom Gradients

```tsx
<div className="bg-gradient-to-r from-cy via-vi to-am">
  Gradient text
</div>
```

Or add to Tailwind config for reuse.

## 🌐 Internationalization

For multi-language support:
1. Use Next.js i18n (not included)
2. Or a library like `next-intl`

## 📱 Mobile Tweaks

Use Tailwind responsive prefixes:
- `sm:` – 640px+
- `md:` – 768px+
- `lg:` – 1024px+
- `xl:` – 1280px+

Example:
```tsx
<h1 className="text-3xl md:text-5xl lg:text-6xl">
```

---

Questions? Check the main [README.md](./README.md) or open an issue.


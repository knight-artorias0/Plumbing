# Grove & Sons Plumbing

Professional single-page website for Grove & Sons Plumbing, optimized for [Vercel](https://vercel.com) hosting.

## Structure

- `index.html` — Main page with all sections
- `css/styles.css` — Styles and responsive layout
- `js/main.js` — Mobile nav, FAQ accordion, form validation
- `assets/` — Logo, hero image, and team photo (self-hosted for CDN caching)
- `vercel.json` — Vercel deployment config (security headers, asset caching)
- `robots.txt` / `sitemap.xml` — SEO files for production

## Deploy to Vercel

### Option 1: Vercel Dashboard

1. Import this repository at [vercel.com/new](https://vercel.com/new)
2. Vercel auto-detects the static site — no build command needed
3. Click **Deploy**

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel
```

Follow the prompts to link the project. Subsequent deploys:

```bash
vercel --prod
```

### Custom domain

After deploying, add your domain in the Vercel project settings under **Domains**. Update `canonical`, `og:url`, and `sitemap.xml` if your production domain differs from `groveandsonsplumbing.com`.

## Local Development

```bash
npm run dev
```

Or with Python:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000

## Placeholder Content

Phone, email, address, service area cities, and license number use placeholder values. Replace with real business details before going live.

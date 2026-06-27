# Grove & Sons Plumbing

Dark-themed plumbing website, optimized for [Vercel](https://vercel.com) hosting.

## Deploy to Vercel

### Dashboard

1. Import this repo at [vercel.com/new](https://vercel.com/new)
2. No build command or output directory needed — static site
3. Click **Deploy**

### CLI

```bash
npm i -g vercel
vercel --prod
```

### Custom domain

Add your domain in Vercel project settings under **Domains**. Update `canonical`, `og:url`, and `sitemap.xml` if your production URL differs from `groveandsonsplumbing.com`.

## Local dev

```bash
npm run dev
```

Or:

```bash
python3 -m http.server 8000
```

## Structure

- `index.html` — main page
- `css/styles.css` — dark theme styles
- `js/main.js` — mobile nav, zip finder
- `assets/logo.svg` — circle wrench logo
- `vercel.json` — headers, caching, clean URLs
- `robots.txt` / `sitemap.xml` — SEO

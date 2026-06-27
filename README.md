# Grove & Sons Plumbing

Dark-themed plumbing website, optimized for [Vercel](https://vercel.com) hosting.

## Deploy to Vercel

1. Import this repo at [vercel.com/new](https://vercel.com/new)
2. Framework Preset: **Other**
3. Build Command: leave empty
4. Output Directory: **public**
5. Click **Deploy**

## Local dev

```bash
cd public && python3 -m http.server 8000
```

Then visit http://localhost:8000

## Structure

```
public/
  index.html          — main page
  css/styles.css      — dark theme styles
  js/main.js          — mobile nav, zip finder
  assets/logo.svg     — circle wrench logo
  robots.txt
  sitemap.xml
vercel.json           — Vercel config (outputDirectory: public)
```

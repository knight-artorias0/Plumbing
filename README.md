# Grove & Sons Plumbing — Portfolio Concept

A fictional plumbing website built as a **portfolio demonstration**. Grove & Sons is not a real business — no contact details, services, or reviews represent actual offerings.

Dark-themed, single-page site optimized for [Vercel](https://vercel.com) hosting.

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
  index.html          — main page (CSS & JS inlined for browser compatibility)
  css/styles.css      — source styles
  js/main.js          — mobile nav
  assets/logo.svg     — circle wrench logo
  robots.txt          — disallows indexing (portfolio demo)
  sitemap.xml
vercel.json           — Vercel config (outputDirectory: public)
```

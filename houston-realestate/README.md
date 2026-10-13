# Damian Yanez Real Estate: Website

A real estate agent website built with Next.js, TypeScript, and Tailwind CSS. It deploys to Vercel for free.

---

## 1. Run it on your computer

You need [Node.js](https://nodejs.org) version 20 or newer.

```bash
cd houston-realestate
npm install
cp .env.example .env.local     # optional for now
npm run dev
```

Open http://localhost:3000. Pages reload automatically when you save a file.

Other commands:

| Command | What it does |
| --- | --- |
| `npm run build` | Production build. Run this before you deploy to catch errors. |
| `npm start` | Serves the production build locally |
| `npm run lint` | Checks the code for problems |

While no email service is connected, form submissions in dev are printed in the terminal.

---

## 2. Edit your info (one file)

Open **`src/config/site.ts`**. It holds everything:

- Brand name, your name, phone, email
- **TX license number, brokerage name, broker license, address, and phone** (TREC requires these)
- IABS form link (replace it with the filled-out IABS your broker gives you: put the PDF at `public/docs/iabs.pdf` and set `iabsUrl: "/docs/iabs.pdf"`)
- HAR.com profile and social links (leave a social link `""` to hide its icon)
- Headshot, hero photo, and logo
- **Colors**: change these hex values and the whole site rebrands
- Trust bar items (add real stats here later, e.g. `{ value: "25+", label: "Homes sold" }`)
- Feature switches: `spanishToggle` and `idxEnabled`

Other editable files:

| File | What's in it |
| --- | --- |
| `src/data/listings.ts` | Featured listings (address, price, beds, baths, sqft, photo, status, link) |
| `src/data/testimonials.ts` | Client reviews. While it's empty, the site shows a "coming soon" placeholder. |
| `src/lib/i18n.tsx` | English/Spanish translations for the header, hero, and buttons |
| `public/images/` | Photos. Replace the placeholder `.svg` files with real `.jpg` / `.webp` images and update the paths. |
| `public/docs/houston-neighborhood-guide.pdf` | The free 14-page Houston Neighborhood Guide (built from `content/neighborhoods/`; ask Claude to regenerate it after you edit areas) |
| `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` | Legal pages. Have your broker review them. |

**Photos tip:** use landscape JPGs about 2000px wide for heroes and about 1200px for cards. Next.js resizes and compresses them automatically. Once every image is a real photo, you can remove `dangerouslyAllowSVG` from `next.config.ts`.

---

## 3. Add a blog post

Create a new file in `content/blog/`, for example `content/blog/houston-market-update-november.md`:

```md
---
title: "Houston Market Update: November"
description: "One or two sentences for Google and social previews."
date: "2026-11-01"
category: "Market Update"
image: "/images/blog/november.jpg"
---

Your post here. Use **Markdown**: ## headings, - bullet lists, [links](/sell), etc.
```

The filename becomes the URL (`/blog/houston-market-update-november`). Add `draft: true` to hide a post. The post is added to the blog page, the home page, and the sitemap automatically.

## 4. Add (or remove) a neighborhood

Create `content/neighborhoods/<slug>.md`. Copy an existing one like `katy.md` as a template:

```md
---
name: "Bellaire"
order: 11
description: "One-line summary shown on cards and in Google."
image: "/images/neighborhoods/bellaire.jpg"
priceRange: "$500k–$1.5M"
commute: "610 Loop & US-59; about 15 minutes to the Galleria"
highlights:
  - "Something great about it"
  - "Another highlight"
---

## Overview
...
```

To remove an area, delete its file. `order` controls the sort order (the home page shows the first 8).

> **Fair Housing tip:** describe places, amenities, and commutes, not people. Avoid phrases like "great for families," "safe neighborhood," or "best schools."

---

## 5. Connect the forms to your email

All forms (contact, home valuation, investor, landlord, tenant, and guide) post to `/api/lead`, which emails you. Spam protection comes built in: a hidden honeypot field plus a minimum time-to-submit check.

**Option A: Resend (recommended, free tier)**
1. Sign up at https://resend.com and create an API key.
2. Add your domain in Resend → Domains and add the DNS records it shows (do this after you buy your domain).
3. Set these environment variables (in `.env.local` and in Vercel):
   ```
   RESEND_API_KEY=re_xxxxxxxx
   RESEND_FROM=Website Leads <leads@yourdomain.com>
   LEAD_TO_EMAIL=you@yourdomain.com
   ```
   Before your domain is verified, keep `RESEND_FROM=Website Leads <onboarding@resend.dev>`. Resend will then only deliver to the email you signed up with.

**Option B: Formspree**
1. Create a form at https://formspree.io and copy its endpoint (e.g. `https://formspree.io/f/abcdwxyz`).
2. Set `FORMSPREE_ENDPOINT=https://formspree.io/f/abcdwxyz`.

> On the live site, if neither option is set, forms show an error asking visitors to call or text, so leads are never silently lost. **Test a form after every deploy.**

## 6. Analytics (optional)

Add these environment variables and redeploy. They stay off while blank.

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX          # Google Analytics 4
NEXT_PUBLIC_META_PIXEL_ID=1234567890    # Meta (Facebook/Instagram) Pixel
```

Successful form submissions fire a `generate_lead` (GA4) and `Lead` (Meta) event.

## 7. IDX / MLS home search

Real MLS search needs an IDX provider approved through your broker / HAR (e.g. IDX Broker, iHomefinder, Showcase IDX). Until then, the "Search homes" section links to HAR.com. When you have your embed code:

1. Set `features.idxEnabled: true` in `src/config/site.ts`.
2. Paste the embed where marked in `src/components/IdxSearch.tsx`.

---

## 8. Deploy to Vercel (free)

1. Push this repository to GitHub (it's already there if you're reading this on GitHub).
2. Go to https://vercel.com and sign up with GitHub.
3. Click **Add New… → Project**, then pick this repository and click **Import**.
4. **Important:** under **Root Directory**, click **Edit** and choose `houston-realestate`.
5. Framework preset: **Next.js** (auto-detected). Leave the build settings as they are.
6. Open **Environment Variables** and add:
   - `NEXT_PUBLIC_SITE_URL` = `https://www.yourdomain.com` (or your `*.vercel.app` URL for now)
   - Your form keys from step 5, plus analytics IDs if you have them
7. Click **Deploy**. In about a minute you'll get a live `https://….vercel.app` URL.

Every push to the main branch redeploys automatically.

### Connect a custom domain

1. Buy a domain (Namecheap, Cloudflare, GoDaddy, Squarespace Domains, etc.), e.g. `damianyanezhomes.com`.
2. In Vercel: **Project → Settings → Domains** → add `damianyanezhomes.com` and `www.damianyanezhomes.com`.
3. Vercel shows DNS records. In your registrar's DNS settings, add them. They're usually:
   - `A` record: name `@`, value `76.76.21.21`
   - `CNAME` record: name `www`, value `cname.vercel-dns.com`
   (Use the exact values Vercel shows you.)
4. Wait for DNS to update (minutes to a few hours). Vercel adds HTTPS automatically.
5. Update `NEXT_PUBLIC_SITE_URL` to your domain and redeploy.
6. Submit `https://yourdomain.com/sitemap.xml` in [Google Search Console](https://search.google.com/search-console) and set up your Google Business Profile.

---

## What's included

- **Pages:** Home, Buy, Sell, What's My Home Worth, Invest (with a cash-flow calculator), Lease, Neighborhoods (index + 10 area pages), About, Blog (index + 3 posts), Contact, Free Guide, Privacy, Terms, and a 404 page
- **Texas compliance:** TREC IABS + Consumer Protection Notice links in every footer, the brokerage name in the header and footer, the Equal Housing Opportunity logo, consent language on every form (not required to buy, msg & data rates, STOP to opt out) with a privacy policy link, and the "deemed reliable but not guaranteed" disclaimer on listings
- **SEO:** unique titles and descriptions on every page, canonical URLs, Open Graph/Twitter images, `sitemap.xml`, `robots.txt`, and `RealEstateAgent`, `BlogPosting`, and `BreadcrumbList` JSON-LD
- **Mobile:** sticky Call/Text bar, a mobile menu, and layouts checked at 375px
- **Lighthouse (local, mobile):** 96–99 performance and 98–100 accessibility, best practices, and SEO

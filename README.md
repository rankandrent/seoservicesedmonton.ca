# BrandName: Edmonton SEO Services Website

Next.js website for an Edmonton SEO agency, exported as fully static HTML and hosted on a Cloudflare Worker. 36 pages, full SEO baseline.

## How it works

- `content/` All page content as TypeScript data: one object per page (meta + ordered sections). Inline marks: `[[placeholder]]`, `**bold**`, `{{link text|slug}}`. Site-wide settings are in `content/site.ts`.
- `components/sections.tsx` One React component per section type (`hero_home`, `split`, `cards`, `faq`, ...). `components/chrome.tsx` is the header, marquee and footer.
- `lib/schema.ts` The JSON-LD graph for every page. `lib/render.tsx` links, inline marks, icons, illustrations, photos.
- `app/` Next.js routes: one catch-all page renders every slug; plus `sitemap.xml`, `robots.txt`, `llms.txt` and the 404 page.
- `public/assets/` Fonts, images and `js/main.js` (menu, reveal animations, form errors, image fallbacks). Styles are in `app/globals.css`.
- `scripts/postbuild.ts` Runs after `next build`. Every component is a server component, so it strips the React runtime and RSC payloads from `out/`: pages ship as plain HTML + one CSS file + `main.js`. It also writes `out/_headers`. The build fails if a `'use client'` component is added, since that would need the runtime.

Commands (Node 22: `nvm use`): `npm run dev` (local dev server), `npm run build` (static site in `out/`), `npm start` (build, then run the Worker locally), `npm run deploy`.

## Hosting (Cloudflare Workers)

The site runs as one Cloudflare Worker (`seoservicesedmonton`): `worker/index.js` serves `out/` as static assets, redirects `www.` to the bare domain, and handles the contact form at `POST /api/contact`.

- Deploy: `npm run deploy` (builds, then `wrangler deploy`). Needs `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` in your shell (kept in the gitignored `.env`).
- Contact form: each lead is saved to the Supabase table `leads` (create it once with `supabase/leads.sql`) and emailed via Resend to `LEAD_TO`. One working channel is enough; if both fail the visitor sees an error and can retry.
- Worker secrets: `RESEND_API_KEY`, `SUPABASE_ANON_KEY`, `LEAD_TO` (`npx wrangler secret put NAME`). Plain settings are in `wrangler.jsonc`.
- Pre-launch: `indexable: false` in `content/site.ts` makes every page `noindex, nofollow` (meta tag and `X-Robots-Tag` header). Set it to `true` at launch, then deploy.

## Pages

- Home (targets "seo services edmonton")
- Services hub + 9 service pages: Local SEO, Technical SEO, On-Page SEO, Content SEO, Link Building, Google Business Profile, Ecommerce SEO, SEO Audit, AI Search Optimization
- Locations hub + 6 neighbourhood pages: Downtown, Oliver, Strathcona, Windermere, Summerside, Terwillegar Towne
- Case studies hub + 3 case study templates
- Blog hub + 3 articles
- About, Team, Careers, FAQ, SEO Packages, Contact, Thank You (form redirect, noindex), Privacy Policy, Terms, 404

## SEO baseline (on every page)

Meta title, meta description, canonical, robots, Open Graph and Twitter tags, hreflang en-CA, JSON-LD (ProfessionalService, WebSite, WebPage, BreadcrumbList, Service, FAQPage, BlogPosting where relevant). Site files: `sitemap.xml`, `robots.txt`, `llms.txt`.

## Before launch

1. Find and replace `BrandName` in `content/` and the SVG logos in `public/assets/img/`.
2. Fill every `[placeholder]`. They show in square brackets with a dotted green underline so they are easy to spot. Key ones: address, phone, email, hours, team names, stats bands, careers perks and roles, contract terms.
3. Case studies are drafts: set to noindex, left out of the sitemap and not linked from any live page (menu, footer, service pages, About, 404, blog) until real client data replaces the placeholders. Remove `noindex` and `draft` from a case study in `content/cases.ts` once it is filled; the Case Studies hub and every link to it come back automatically.
4. Photos: the hero, about, why us, blog and contact band use free Unsplash photos (Unsplash License: free for commercial use, no attribution required, https://unsplash.com/license). Replace them with real photos of your team, office and clients for the most authentic result. Optional hero video: add `public/assets/video/hero.mp4` and it replaces the hero photo automatically.
5. Fonts (DM Sans and Fraunces, SIL Open Font License) are self-hosted in `public/assets/fonts/`, so no Google Fonts request is needed.
6. Add your real social profile URLs to `socials` in `content/site.ts`. The list starts empty, so no footer icons or schema `sameAs` links appear until you do.
7. Have the Privacy Policy and Terms reviewed before publishing.
8. Verify the site in Google Search Console and submit `sitemap.xml`.

## Sources used for factual claims

- Google Business Profile Help: How to improve your local ranking https://support.google.com/business/answer/7091?hl=en
- Google Maps contribution policy https://support.google.com/contributionpolicy/answer/7400114?hl=en
- Google Search Central: SEO Starter Guide https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google Search Central: Spam policies https://developers.google.com/search/docs/essentials/spam-policies
- Google Search Central: AI features and your website https://developers.google.com/search/docs/appearance/ai-features
- Google Search Central: Do you need an SEO? https://developers.google.com/search/docs/fundamentals/do-i-need-seo
- Google Search Central: Structured data for ecommerce https://developers.google.com/search/docs/specialty/ecommerce/include-structured-data-relevant-to-ecommerce
- City of Edmonton 2026 study areas (neighbourhood names) https://www.edmonton.ca/sites/default/files/public-files/2026_StudyAreas_Neighbourhood.pdf

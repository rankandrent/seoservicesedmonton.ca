# BrandName: Edmonton SEO Services Website

Static HTML website for an Edmonton SEO agency. 35 pages, one Markdown content file per page, full SEO baseline.

## Folders

- `dist/` The live site. Upload this folder to your host (Netlify, Cloudflare Pages, Vercel or any static host). Uses clean URLs like `/services/local-seo/`. Each build wipes everything in `dist/` except `assets/` (and `content-md/` entirely), so add any other hand-made files (for example `_redirects`) to `KEEP` in `src/build.py`.
- `preview/` Same site with links that work when you open `preview/index.html` straight from your computer.
- `content-md/` One Markdown file per page with meta title, meta description, primary keyword, schema types and every section in order.
- `src/` The generator. Edit content in `content_*.py`, then run `python3 src/build.py` (live) and `python3 src/build.py --preview` (local preview).

## Pages

- Home (targets "seo services edmonton")
- Services hub + 9 service pages: Local SEO, Technical SEO, On-Page SEO, Content SEO, Link Building, Google Business Profile, Ecommerce SEO, SEO Audit, AI Search Optimization
- Locations hub + 6 neighbourhood pages: Downtown, Oliver, Strathcona, Windermere, Summerside, Terwillegar Towne
- Case studies hub + 3 case study templates
- Blog hub + 3 articles
- About, Team, Careers, FAQ, SEO Packages, Contact, Privacy Policy, Terms, 404

## SEO baseline (on every page)

Meta title, meta description, canonical, robots, Open Graph and Twitter tags, hreflang en-CA, JSON-LD (ProfessionalService, WebSite, WebPage, BreadcrumbList, Service, FAQPage, BlogPosting where relevant). Site files: `sitemap.xml`, `robots.txt`, `llms.txt`.

## Before launch

1. Find and replace `BrandName` and `https://www.yourdomain.ca` in `src/site_config.py` and the SVG logos in `dist/assets/img/`, then rebuild.
2. Fill every `[placeholder]`. They show in square brackets with a dotted green underline so they are easy to spot. Key ones: address, phone, email, hours, team names, stats bands, careers perks and roles, contract terms.
3. Case studies are drafts: set to noindex, left out of the sitemap and not linked from any live page (menu, footer, service pages, About, 404, blog) until real client data replaces the placeholders. Remove `'noindex': True` from a case study in `src/content_cases.py` once it is filled; the Case Studies hub and every link to it come back automatically.
4. Photos: the hero, about, why us, blog and contact band use free Unsplash photos (Unsplash License: free for commercial use, no attribution required, https://unsplash.com/license). Replace them with real photos of your team, office and clients for the most authentic result. Optional hero video: add `dist/assets/video/hero.mp4` and it replaces the hero photo automatically.
5. Fonts (DM Sans and Fraunces, SIL Open Font License) are self-hosted in `dist/assets/fonts/`, so no Google Fonts request is needed.
6. Point the contact form at a real endpoint: `form_action` in `src/site_config.py`.
7. Add your real social profile URLs to `socials` in `src/site_config.py`. The list starts empty, so no footer icons or schema `sameAs` links appear until you do.
8. Have the Privacy Policy and Terms reviewed before publishing.
9. Verify the site in Google Search Console and submit `sitemap.xml`.

## Sources used for factual claims

- Google Business Profile Help: How to improve your local ranking https://support.google.com/business/answer/7091?hl=en
- Google Maps contribution policy https://support.google.com/contributionpolicy/answer/7400114?hl=en
- Google Search Central: SEO Starter Guide https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google Search Central: Spam policies https://developers.google.com/search/docs/essentials/spam-policies
- Google Search Central: AI features and your website https://developers.google.com/search/docs/appearance/ai-features
- Google Search Central: Do you need an SEO? https://developers.google.com/search/docs/fundamentals/do-i-need-seo
- Google Search Central: Structured data for ecommerce https://developers.google.com/search/docs/specialty/ecommerce/include-structured-data-relevant-to-ecommerce
- City of Edmonton 2026 study areas (neighbourhood names) https://www.edmonton.ca/sites/default/files/public-files/2026_StudyAreas_Neighbourhood.pdf

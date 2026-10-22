// Services hub + service pages, written from the briefs in plan/content-plan.json (outline, entities, n-grams).
// No pricing on service pages. Real-world facts the business must supply stay as [[placeholders]].
// Later-phase services that already had copy (AI search, ecommerce, content writing) live in services-more.json.
// Inline marks: [[placeholder]]  **bold**  {{link text|slug}}
import type { Page, Section } from './types';
import KEPT from './services-more.json';

const UPDATED = '2026-10-23';
const CASES = ['case-studies/local-service-business', 'case-studies/ecommerce-store', 'case-studies/professional-firm'];

type Svc = {
  slug: string; nav: string; icon: string; illus: string; title: string; description: string; card: string;
  hero: [string, string, string]; sections: Section[]; faqHeading: string; faq: [string, string][];
  industries: string[]; related: string[];
};

function svc(o: Svc): Page {
  return {
    slug: 'services/' + o.slug, nav_label: o.nav, icon: o.icon, illus: o.illus, title: o.title, description: o.description,
    card: o.card, long_card: o.description, crumbs: [['Services', 'services']], service: o.nav + ' in Edmonton', area: 'Edmonton, AB',
    updated: UPDATED,
    sections: [
      { type: 'page_hero', eyebrow: o.hero[0], h1: o.hero[1], lead: o.hero[2], cta: ['Get a free SEO audit', 'free-seo-audit'] },
      ...o.sections,
      { type: 'posts', eyebrow: 'Proof', heading: 'Related case studies', items: CASES },
      { type: 'faq', eyebrow: 'FAQ', heading: o.faqHeading, items: o.faq },
      { type: 'links', eyebrow: 'Who we do this for', heading: 'Industries we help with ' + o.nav, items: o.industries, bg: 'soft' },
      { type: 'links', eyebrow: 'Related services', heading: 'Services that work well alongside ' + o.nav, items: o.related },
      { type: 'cta', heading: `Talk to us about ${o.nav} in Edmonton`, text: 'Start with a free SEO audit. We will show you the biggest opportunities for your business, in plain language.', button: ['Get a free SEO audit', 'free-seo-audit'] },
    ],
  };
}

const G_LOCAL = ['Google Business Profile Help: How to improve your local ranking', 'https://support.google.com/business/answer/7091?hl=en'];
const G_STARTER = ['Google Search Central: SEO Starter Guide', 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide'];
const G_MAPS = ['Google Maps contribution policy', 'https://support.google.com/contributionpolicy/answer/7400114?hl=en'];

export const PAGES: Page[] = [
// ------------------------------------------------------------------ HUB
{
 slug: 'services', nav_label: 'SEO Services', icon: 'layers', page_type: 'CollectionPage', updated: UPDATED,
 title: 'Our SEO Services | Local, Technical and On-Page SEO',
 description: 'Explore our local SEO, Google Business Profile, technical SEO, link building, content and AI search services for Edmonton-area businesses.',
 card: 'Every SEO service we offer in one place.',
 sections: [
  { type: 'page_hero', eyebrow: 'Our services', h1: 'SEO Services for Local Businesses', lead: 'Each service covers one part of how customers find you on Google. Start with the one that matches your goal, or combine them into a single plan run by {{our Edmonton SEO team|}}.', cta: ['Get a free SEO audit', 'free-seo-audit'] },
  { type: 'cards', eyebrow: 'Find what you need', heading: 'Choose a service', cols: 3, items: [
     { icon: 'pin', title: 'Local SEO', text: 'Rank in the Google Map Pack and local results across Edmonton and nearby towns.', link: 'services/local-seo' },
     { icon: 'store', title: 'Google Business Profile', text: 'Categories, services, photos, posts and review replies, kept accurate and active.', link: 'services/google-business-profile-optimization' },
     { icon: 'gear', title: 'Technical SEO', text: 'Crawling, indexing, Core Web Vitals, structured data and redirects.', link: 'services/technical-seo' },
     { icon: 'doc', title: 'On-Page SEO', text: 'Titles, headings, copy and internal links matched to search intent.', link: 'services/on-page-seo' },
     { icon: 'link', title: 'Link Building', text: 'Relevant local and Canadian links, earned without breaking Google\'s spam policies.', link: 'services/link-building' },
     { icon: 'pen', title: 'SEO Content Writing', text: 'Service pages, location pages and guides written for Edmonton customers.', link: 'services/content-writing' },
     { icon: 'audit', title: 'SEO Audit', text: 'A full technical, on-page and local review with a prioritized fix list.', link: 'services/seo-audit' },
     { icon: 'cart', title: 'Ecommerce SEO', text: 'Category, product and structured data work for online stores.', link: 'services/ecommerce-seo' },
     { icon: 'spark', title: 'AI Search Optimization', text: 'Readiness for AI Overviews, AI Mode and AI assistants.', link: 'services/ai-search-optimization' }]},
  { type: 'table', eyebrow: 'Match your goal', heading: 'Which service fits your goal?', bg: 'soft', cols: ['Your goal', 'Start with', 'Add later'],
   rows: [['More calls from Google Maps', 'Local SEO, Google Business Profile', 'Link Building'],
          ['Pages not showing in Google', 'Technical SEO', 'SEO Audit'],
          ['Rank for more of your services', 'On-Page SEO, SEO Content Writing', 'Link Building'],
          ['More online sales', 'Ecommerce SEO', 'SEO Content Writing'],
          ['Be cited in AI answers', 'AI Search Optimization', 'SEO Content Writing'],
          ['Know what is wrong first', 'Free SEO audit, then a full SEO Audit', 'Any of the above']]},
  { type: 'steps', eyebrow: 'Every engagement', heading: 'How every engagement runs',
   items: [['Audit', 'Your site, Business Profile, competitors and current rankings.'], ['Plan', 'A written roadmap with priorities and expected outcomes.'],
           ['Build', 'Fixes, content and outreach, with every change logged.'], ['Report', 'Calls, forms, rankings and traffic in plain language every month.']]},
  { type: 'faq', eyebrow: 'FAQ', heading: 'Services FAQ', items: [
     ['Which SEO service do I need first?', 'Usually an audit. Most businesses do not need every service at once, and a {{free SEO audit|free-seo-audit}} shows which problems cost you the most, so the first months of work go where they make a difference.'],
     ['Can I combine services?', 'Yes. Most clients combine two or three, such as local SEO with Google Business Profile management and link building. Our {{SEO pricing|pricing}} page shows the common combinations.']]},
  { type: 'cta', heading: 'Not sure which service you need?', text: 'Get a free SEO audit and we will recommend where to start.', button: ['Get a free SEO audit', 'free-seo-audit'] },
 ]},

// ------------------------------------------------------------------ LOCAL SEO
svc({
 slug: 'local-seo', nav: 'Local SEO', icon: 'pin', illus: 'map',
 title: 'Local SEO Edmonton | Rank in Google Maps and Local Search',
 description: 'Get found in the Google Map Pack. Edmonton local SEO covering your Business Profile, citations, reviews and local pages that turn searches into calls.',
 card: 'Rank in Google Maps and local results across Edmonton.',
 hero: ['Local SEO', 'Local SEO Services in Edmonton', 'Show up in the Google Map Pack and local search results when people near you search for what you sell, then turn those searches into calls, direction requests and bookings.'],
 sections: [
  { type: 'split', eyebrow: 'What it is', heading: 'Local SEO puts you where Edmonton customers look first', visual: 'map', vdata: { title: 'Your business', sub: 'Top 3 in the Map Pack' },
   body: ['Local SEO is the work that gets your business into the **Map Pack**, the block of three businesses Google shows above the regular results for searches like "plumber near me" or "dentist Edmonton". It also covers the local organic results underneath.',
          'It brings your Google Business Profile, your website, your Google reviews and your listings on other local sites into one consistent picture, so Google trusts that you are a real, relevant business in Edmonton.'],
   bullets: ['Built for storefronts and service area businesses', 'Measured in calls, direction requests and bookings', 'Rankings tracked neighbourhood by neighbourhood, not just city wide']},
  { type: 'cards', eyebrow: 'What is included', heading: 'What local SEO includes', bg: 'soft', cols: 3, items: [
     { icon: 'store', title: 'Business Profile optimization', text: 'Primary and secondary categories, services, hours, attributes, photos and posts, kept accurate. See {{Google Business Profile optimization|services/google-business-profile-optimization}}.' },
     { icon: 'star', title: 'Reviews', text: 'A simple, steady process for asking every customer for an honest review, plus a reply to each one.' },
     { icon: 'map', title: 'Citations', text: 'Your name, address and phone (NAP) identical across Yelp.ca, YellowPages.ca, Canpages, Clutch and local chambers.' },
     { icon: 'doc', title: 'Local landing pages', text: 'Useful pages for the services and areas you actually serve, never thin copies with the town name swapped.' },
     { icon: 'link', title: 'Local links', text: 'Mentions from Edmonton organizations, suppliers, events and media. See {{link building|services/link-building}}.' },
     { icon: 'chart', title: 'Rank tracking by neighbourhood', text: 'Map Pack positions checked on a grid across the city, because results in Windermere differ from results in St. Albert.' }]},
  { type: 'split', eyebrow: 'From the source', heading: 'How Google ranks local businesses', reverse: true, visual: 'cards',
   vdata: { items: [['target', 'Relevance', 'How well you match the search'], ['pin', 'Distance', 'How far you are from the searcher'], ['star', 'Prominence', 'How well known you are']] },
   body: ['Google Business Profile Help says local results are based mainly on **relevance**, **distance** and **prominence**. Relevance is how well your profile matches the search. Distance is how far you are from the person searching. Prominence is how well known your business is, including links to your site and your review count and rating.',
          'Distance is why the same search returns different businesses in Windermere and in St. Albert. We cannot move your address, so we work on the two factors you can influence: relevance and prominence. Google also says there is no way to pay for a better local ranking.'],
   bullets: ['Relevance: complete, accurate profile and service pages', 'Distance: honest service area settings', 'Prominence: genuine reviews, citations and local links']},
  { type: 'table', eyebrow: 'Your setup', heading: 'Storefront or service area business?', cols: ['', 'Storefront', 'Service area business'],
   intro: 'Google treats the two differently, and getting the setting wrong is a common cause of weak rankings or suspensions.',
   rows: [['Customers come to you', 'Yes', 'No, you go to them'], ['Address shown on Google', 'Yes', 'Hidden; you list the areas you serve'],
          ['Typical examples', 'Dental clinic, law office, retail', 'Plumber, roofer, cleaning company'], ['Main local SEO focus', 'Proximity to the office and reviews', 'Service area settings, service pages and reviews']]},
  { type: 'steps', eyebrow: 'Process', heading: 'Our local SEO process', bg: 'soft', items: [
     ['Local audit', 'Business Profile, citations, reviews and Map Pack rankings across the city.'], ['Fix the basics', 'Accurate NAP everywhere you are listed, the right categories and settings.'],
     ['Build prominence', 'Reviews, local links and content that earn trust.'], ['Report', 'Calls, direction requests, website clicks and rankings every month.']]},
  { type: 'prose', blocks: [['callout', '[[Add a real, dated before-and-after Map Pack screenshot or Business Profile performance chart from an Edmonton client, used with written permission.]]'], ['src', [G_LOCAL, G_MAPS]]] },
 ],
 faqHeading: 'Local SEO FAQ',
 faq: [
  ['How long does local SEO take?', 'It depends on your competition, your current profile and how many reviews and links you already have. Fixing inaccurate details can help quickly; building prominence takes months. We give you expected timelines in writing after the audit, and we do not promise dates we cannot back up.'],
  ['Do reviews help local rankings?', 'Yes. Google says more reviews and positive ratings can improve your local ranking, and it recommends replying to reviews. Google\'s Maps contribution policy does not allow paying or rewarding people for reviews, so we build a steady, genuine process instead.'],
  ['Can I rank in areas where I have no office?', 'Distance limits how far your Map Pack rankings reach. A service area business can list the areas it serves, and useful service and area pages help you rank in the regular results in nearby towns. We never create fake offices, which Google can suspend.'],
  ['What is the difference between local SEO and regular SEO?', 'Regular SEO helps your website rank in the organic results anywhere. Local SEO adds the Map Pack and local results, which depend on your Business Profile, reviews, citations and distance as well as your website.']],
 industries: ['industries/hvac', 'industries/plumbers', 'industries/roofers', 'industries/dentists', 'industries/law-firms'],
 related: ['services/google-business-profile-optimization', 'services/link-building', 'services/content-writing'],
}),

// ------------------------------------------------------------------ GOOGLE BUSINESS PROFILE
svc({
 slug: 'google-business-profile-optimization', nav: 'Google Business Profile Optimization', icon: 'store', illus: 'store',
 title: 'Google Business Profile Optimization in Edmonton',
 description: 'We optimize and manage your Google Business Profile so your Edmonton business shows up in Maps, earns more reviews and gets more calls each month.',
 card: 'Your Business Profile set up right and kept active.',
 hero: ['Google Business Profile', 'Google Business Profile Optimization', 'Your Business Profile is often the first thing Edmonton customers see. We set it up properly, keep it accurate and keep it active so it turns Google Maps views into calls.'],
 sections: [
  { type: 'split', eyebrow: 'What it is', heading: 'Your most visible listing on Google', visual: 'map', vdata: { title: 'Your Business Profile', sub: 'Call · Directions · Website' },
   body: ['Google Business Profile (formerly Google My Business) is the free listing that appears in Google Maps and the Map Pack. It shows your hours, reviews, photos and contact options, and it is where most local calls start.',
          'An accurate, complete and active profile is the base of {{local SEO|services/local-seo}}. We handle verification, every field, photos, posts and review replies, and we report on calls, direction requests and website clicks.'],
   bullets: ['Verified and fully completed', 'Accurate hours, including holidays', 'Active with photos, posts and review replies']},
  { type: 'cards', eyebrow: 'What we optimize', heading: 'What we optimize on your profile', bg: 'soft', cols: 3, items: [
     { icon: 'tag', title: 'Categories', text: 'The primary category is one of the strongest relevance signals on your profile. We choose it, and any secondary categories, to match what you actually sell.' },
     { icon: 'layers', title: 'Services and attributes', text: 'Services listed to mirror your website\'s service pages, plus attributes customers filter by, such as wheelchair access or online appointments.' },
     { icon: 'image', title: 'Photos and posts', text: 'Real photos of your team, work and premises, and regular posts with offers, news and events.' },
     { icon: 'star', title: 'Reviews and replies', text: 'A steady request process and a calm, helpful reply to every review, positive or negative.' },
     { icon: 'map', title: 'Service areas', text: 'Correct service area settings for businesses that visit customers, and a hidden address where Google requires it.' },
     { icon: 'clock', title: 'Hours and special hours', text: 'Regular and holiday hours kept accurate, so nobody drives to a closed door and leaves a bad review.' }]},
  { type: 'table', eyebrow: 'Two ways to work', heading: 'Setup vs ongoing management', cols: ['', 'One-time setup', 'Monthly management'],
   rows: [['Verification or ownership recovery', 'Yes', 'Yes'], ['Categories, services and attributes', 'Set up once', 'Reviewed as you add services'],
          ['Photos', 'Initial upload', 'New photos every month'], ['Posts', 'No', 'Regular posts'], ['Review replies', 'No', 'Every review answered'],
          ['Reporting', 'Before and after snapshot', 'Monthly calls, directions and clicks']]},
  { type: 'split', eyebrow: 'Protect your listing', heading: 'Avoiding suspensions', reverse: true, visual: 'cards',
   vdata: { items: [['shield', 'Real address', 'No virtual offices'], ['doc', 'Real name', 'No keywords added'], ['check-circle', 'Right setup', 'Storefront or service area']] },
   body: ['Google suspends profiles that break its guidelines for representing your business. Common causes are virtual offices or mailboxes used as addresses, keywords stuffed into the business name, and duplicate profiles for the same location.',
          'We keep your profile inside the rules from day one. If your profile has already been suspended, we review the likely cause, fix it and help you submit a reinstatement request. [[Confirm whether you offer suspension recovery.]]']},
  { type: 'prose', blocks: [['callout', '[[Add a real, anonymised before-and-after Business Profile performance report (calls, direction requests, website clicks) from an Edmonton client, used with written permission.]]'], ['src', [G_LOCAL, G_MAPS]]] },
 ],
 faqHeading: 'Google Business Profile FAQ',
 faq: [
  ['Is Google My Business the same as Google Business Profile?', 'Yes. Google renamed Google My Business to Google Business Profile. It is the same listing in Google Search and Google Maps, managed from your Google account.'],
  ['Why was my profile suspended?', 'Usually because something breaks Google\'s guidelines: a virtual office or mailbox as the address, extra keywords in the business name, a duplicate listing, or the wrong storefront or service area setting. Fix the cause first, then request reinstatement.'],
  ['How often should I post on my profile?', 'Regular activity keeps your profile current and gives customers a reason to choose you. We agree a posting rhythm that fits your business, such as weekly or every two weeks, and tie posts to real offers and work.'],
  ['Can I add more than one location?', 'Yes, if each location is a real place where you serve customers with staff during stated hours. Each one gets its own profile. Profiles for addresses you do not really operate from risk suspension.']],
 industries: ['industries/plumbers', 'industries/dentists', 'industries/hvac', 'industries/electricians'],
 related: ['services/local-seo', 'services/link-building', 'services/seo-audit'],
}),

// ------------------------------------------------------------------ TECHNICAL SEO
svc({
 slug: 'technical-seo', nav: 'Technical SEO', icon: 'gear', illus: 'code',
 title: 'Technical SEO Edmonton | Speed, Indexing and Site Health',
 description: 'Fix crawl errors, slow pages and indexing issues. Technical SEO for Edmonton businesses that need a fast, Google-friendly website that converts.',
 card: 'Crawling, indexing, Core Web Vitals and site health.',
 hero: ['Technical SEO', 'Technical SEO Services in Edmonton', 'Great content cannot rank if Google cannot crawl it, render it or pick the right version of it. We find the technical problems holding your site back and fix them, directly or with your developer.'],
 sections: [
  { type: 'split', eyebrow: 'What it is', heading: 'The foundation everything else sits on', visual: 'code',
   body: ['Technical SEO makes sure Googlebot can crawl your pages, render them, index the right version of each one and understand them through structured data. It also covers page speed and mobile usability, since Google uses mobile-first indexing.',
          'We use Google Search Console, PageSpeed Insights and a full site crawl, explain every issue in plain language, and fix what matters most first.'],
   bullets: ['Crawling and indexing issues found and fixed', 'Duplicate URLs consolidated with redirects or canonical tags', 'Structured data that matches visible content']},
  { type: 'cards', eyebrow: 'What is included', heading: 'What technical SEO covers', bg: 'soft', cols: 3, items: [
     { icon: 'search', title: 'Crawling and indexing', text: 'Search Console page indexing reports, robots.txt, XML sitemap and blocked CSS or JavaScript reviewed and fixed.' },
     { icon: 'speed', title: 'Site speed and Core Web Vitals', text: 'Loading (LCP), responsiveness (INP) and visual stability (CLS) measured from real-user field data and improved.' },
     { icon: 'code', title: 'Structured data', text: 'Valid schema.org markup such as LocalBusiness, Service, FAQPage and BreadcrumbList, tested for rich results.' },
     { icon: 'link', title: 'Redirects and canonicals', text: 'One preferred URL per page, with 301 redirects and rel="canonical" where duplicates exist.' },
     { icon: 'phone', title: 'Mobile usability', text: 'Pages that work well on phones, since Google indexes the mobile version of your site.' },
     { icon: 'shield', title: 'HTTPS and site architecture', text: 'Secure pages, logical directories and internal links that help Google find every important page.' }]},
  { type: 'table', eyebrow: 'Core Web Vitals', heading: 'The thresholds Google calls "good"', cols: ['Metric', 'Measures', 'Good'],
   intro: 'Google measures these from real visitors (field data), at the 75th percentile of page loads.',
   rows: [['Largest Contentful Paint (LCP)', 'Loading: when the main content appears', '2.5 seconds or less'], ['Interaction to Next Paint (INP)', 'Responsiveness to taps and clicks', '200 milliseconds or less'],
          ['Cumulative Layout Shift (CLS)', 'Visual stability while the page loads', '0.1 or less']]},
  { type: 'split', eyebrow: 'Working together', heading: 'How we work with your developer', reverse: true, visual: 'cards',
   vdata: { items: [['doc', 'Clear tickets', 'One issue, one fix'], ['layers', 'Any platform', 'WordPress, Shopify, Wix'], ['check-circle', 'Verified', 'Rechecked in Search Console']] },
   body: ['If we have access, we make the changes ourselves and log each one. If you prefer your own developer, we write clear, prioritized tickets with the affected URLs, the fix and how to check it.',
          'We work on WordPress, Shopify, Wix, Squarespace and custom builds. [[Confirm the platforms you support.]] After each fix we recheck it in Search Console so you know it worked.']},
  { type: 'prose', blocks: [['callout', '[[Add a real example from client work: a dated Search Console page indexing or Core Web Vitals report before and after a fix, anonymised and used with permission.]]'],
     ['src', [G_STARTER, ['Google Search Central: Understanding Core Web Vitals and Google search results', 'https://developers.google.com/search/docs/appearance/core-web-vitals']]]] },
 ],
 faqHeading: 'Technical SEO FAQ',
 faq: [
  ['What is technical SEO?', 'It is the work that helps search engines crawl, render, index and understand your website: robots.txt, XML sitemaps, canonical tags, redirects, structured data, page speed and mobile usability. It does not change what your pages say; it makes sure Google can see and trust them.'],
  ['Do Core Web Vitals affect rankings?', 'Google says Core Web Vitals are used by its ranking systems, and it recommends a good page experience. It also says relevance comes first, so a fast page with weak content will not outrank a helpful one. We treat speed as one important part of the whole.'],
  ['Can you work on WordPress and Shopify?', 'Yes. We work on WordPress, Shopify and most other common platforms, and on custom builds with your developer.'],
  ['Will you need access to my website?', 'Ideally, yes, plus Google Search Console. If you prefer not to give access, we write prioritized tickets for your developer instead.']],
 industries: ['industries/law-firms', 'industries/dentists', 'industries/contractors'],
 related: ['services/seo-audit', 'services/on-page-seo', 'services/ecommerce-seo'],
}),

// ------------------------------------------------------------------ ON-PAGE SEO
svc({
 slug: 'on-page-seo', nav: 'On-Page SEO', icon: 'doc', illus: 'list',
 title: 'On-Page SEO Edmonton | Pages Built to Rank and Convert',
 description: 'We optimize titles, content, headings, schema and internal links so every page on your site targets the right local searches and turns visits into leads.',
 card: 'Titles, headings, copy and internal links matched to intent.',
 hero: ['On-Page SEO', 'On-Page SEO Services in Edmonton', 'On-page SEO makes every page clear to people and to Google: what it is about, who it is for and what to do next. We optimize the pages you have so they rank for the right searches and turn visits into calls.'],
 sections: [
  { type: 'split', eyebrow: 'What it is', heading: 'One page, one clear search intent', visual: 'serp', vdata: { query: 'emergency plumber edmonton', rows: ['Emergency Plumber in Edmonton | 24/7', 'Plumbing Services | Home', 'Directory page'] },
   body: ['On-page SEO is everything on the page itself: the title link people see in Google, the meta description, the headings, the copy, images and the internal links between your pages.',
          'We match each page to one clear search intent, so it is obvious to Google and to customers what that page is about, and no two pages compete for the same search (keyword cannibalization).'],
   bullets: ['One primary topic per page', 'Titles and snippets that earn the click', 'Internal links that guide people and crawlers']},
  { type: 'cards', eyebrow: 'What we optimize', heading: 'What we optimize on each page', bg: 'soft', cols: 4, items: [
     { icon: 'tag', title: 'Titles and meta descriptions', text: 'Unique, clear and accurate for every page, written to earn the click.' },
     { icon: 'pen', title: 'Headings and copy', text: 'A logical H1 to H3 structure and wording that answers what the searcher needs.' },
     { icon: 'link', title: 'Internal links', text: 'Descriptive anchor text between related pages, so authority flows to your key service pages.' },
     { icon: 'code', title: 'Schema', text: 'Page-level structured data that matches what is on the page.' }]},
  { type: 'split', eyebrow: 'Keyword mapping', heading: 'Keyword mapping: the right search for the right page', reverse: true, visual: 'cards',
   vdata: { items: [['search', 'Research', 'How customers phrase searches'], ['layers', 'Map', 'One search intent per page'], ['chart', 'Measure', 'Clicks and rankings per page']] },
   body: ['Before we change a word, we build a keyword map: every search worth winning, assigned to the one page that should rank for it. That is how we find content gaps (searches with no page) and overlaps (two pages fighting for the same search).',
          'We start with pages already close to page one for valuable searches, where small changes to titles, headings and internal links move results fastest.']},
  { type: 'table', eyebrow: 'Example', heading: 'A title rewrite, before and after', cols: ['', 'Title tag'],
   intro: '[[Replace with a real before-and-after title from client work and the click change measured in Search Console.]]',
   rows: [['Before', 'Home | [[Client business name]]'], ['After', 'Emergency Plumber in Edmonton | 24/7 Burst Pipe Repair'],
          ['Why', 'Names the service, the city and the reason to call, in under 60 characters']]},
  { type: 'prose', blocks: [['src', [G_STARTER]]] },
 ],
 faqHeading: 'On-Page SEO FAQ',
 faq: [
  ['What is the difference between on-page and technical SEO?', 'On-page SEO is about what each page says and how it is structured: titles, headings, copy and links. {{Technical SEO|services/technical-seo}} is about whether Google can crawl, render and index the site at all. Most sites need both.'],
  ['Will you rewrite my content?', 'Only where it helps. Most gains come from fixing titles, headings and internal links on existing pages. Where a page is thin or misses what searchers want, we rewrite it in your voice, and you approve every change.'],
  ['How do you choose keywords for each page?', 'We research how your customers phrase their searches, group searches with the same intent, and assign each group to one page. Search volume, competition and how close you already rank decide the order of work.']],
 industries: ['industries/electricians', 'industries/contractors', 'industries/law-firms'],
 related: ['services/technical-seo', 'services/content-writing', 'services/local-seo'],
}),

// ------------------------------------------------------------------ LINK BUILDING
svc({
 slug: 'link-building', nav: 'Link Building', icon: 'link', illus: 'link',
 title: 'Link Building Edmonton | Local, Safe and Relevant Links',
 description: 'Earn relevant Canadian and Alberta backlinks and citations that build authority and help your Edmonton business outrank local competitors safely.',
 card: 'Relevant local links and mentions, earned the right way.',
 hero: ['Link Building', 'Local Link Building in Edmonton', 'Links from other websites help Google judge how well known and trusted your business is. We earn relevant Edmonton, Alberta and Canadian backlinks through real relationships, never through paid schemes.'],
 sections: [
  { type: 'split', eyebrow: 'Why links matter', heading: 'Build a reputation Google can see', visual: 'cards',
   vdata: { items: [['users', 'Local organizations', 'Chambers and associations'], ['message', 'Edmonton media', 'Stories worth covering'], ['handshake', 'Suppliers and partners', 'People who know you']] },
   body: ['Backlinks are links from other websites to yours. For local search, Google lists links to your business as part of **prominence**, one of its three local ranking factors. Local citations, your listings on directories, support the consistency of your name, address and phone.',
          'We focus on links a real Edmonton business would naturally earn, and we report every link and mention to you.'],
   bullets: ['Relevant Edmonton, Alberta and industry sites', 'No bought links, link farms or private blog networks', 'Every link earned listed in your report']},
  { type: 'cards', eyebrow: 'Sources', heading: 'Where our links come from', bg: 'soft', cols: 4, items: [
     { icon: 'users', title: 'Local organizations and chambers', text: 'The Edmonton Chamber of Commerce and town chambers such as St. Albert, Spruce Grove and Leduc-Nisku, plus community leagues and charities you already support.' },
     { icon: 'message', title: 'Edmonton media', text: 'Useful stories, data and expert comment pitched to local news and community publications.' },
     { icon: 'book', title: 'Industry associations', text: 'Trade and professional bodies in your field that list or feature members.' },
     { icon: 'handshake', title: 'Suppliers and partners', text: 'Manufacturers, distributors and partners who feature the businesses they work with.' }]},
  { type: 'split', eyebrow: 'Our rules', heading: 'What we never do', reverse: true, visual: 'cards',
   vdata: { items: [['shield', 'No paid links', 'For ranking purposes'], ['bolt', 'No automation', 'No link programs'], ['link', 'No swaps', 'No excessive exchanges']] },
   body: ['Google\'s spam policies list buying or selling links for ranking, excessive link exchanges, automated link programs and low-quality directory links as link spam. Sites caught doing this can lose rankings.',
          'Paid placements such as sponsorships are fine when the link is marked rel="sponsored" or rel="nofollow". We follow these rules on every campaign, and we use natural, descriptive anchor text rather than exact-match keywords.']},
  { type: 'table', eyebrow: 'Citations vs links', heading: 'Citations and editorial links do different jobs', cols: ['', 'Local citations', 'Editorial links'],
   rows: [['What they are', 'Directory listings (Yelp.ca, YellowPages.ca, Canpages, Clutch)', 'A site choosing to link to you in its content'],
          ['Main benefit', 'Consistent NAP, discovery', 'Prominence and authority'], ['How many you need', 'The relevant few, done accurately', 'Quality over quantity']]},
  { type: 'prose', blocks: [['callout', '[[Add a real example of a local link earned for a client (for example a chamber feature or a news mention), anonymised and used with permission.]]'],
     ['src', [['Google Search Central: Spam policies', 'https://developers.google.com/search/docs/essentials/spam-policies'], G_STARTER, G_LOCAL]]] },
 ],
 faqHeading: 'Link building FAQ',
 faq: [
  ['Do you buy links?', 'No. Google\'s spam policies treat buying links for ranking as a violation. If you sponsor something and get a link, it should be marked rel="sponsored", and we make sure it is.'],
  ['How many links do I need?', 'There is no fixed number. A handful of relevant links from respected Edmonton and industry sites usually does more than hundreds of weak ones. We compare your link profile with the businesses outranking you to set realistic targets.'],
  ['Are directory citations still useful?', 'Accurate listings on relevant local and industry directories help keep your name, address and phone consistent. Low-quality directories are listed by Google as link spam, so we avoid them.']],
 industries: ['industries/contractors', 'industries/law-firms', 'industries/roofers'],
 related: ['services/local-seo', 'services/content-writing', 'services/seo-audit'],
}),

// ------------------------------------------------------------------ SEO AUDIT
svc({
 slug: 'seo-audit', nav: 'SEO Audit', icon: 'audit', illus: 'audit',
 title: 'SEO Audit Edmonton | Find What Is Holding You Back',
 description: 'A complete technical, on-page and local SEO audit with a clear, prioritized action plan for your Edmonton business. No jargon, just priorities.',
 card: 'A full site review with a prioritized fix list.',
 hero: ['SEO Audit', 'Professional SEO Audit in Edmonton', 'A full review of your website and local presence that tells you what is working, what is broken and what to fix first. Written in plain language, ranked by impact, and usable by your team or ours.'],
 sections: [
  { type: 'cards', eyebrow: 'Scope', heading: 'What the audit covers', cols: 3, items: [
     { icon: 'gear', title: 'Technical', text: 'Crawling, indexing, canonicals, redirects, XML sitemap, structured data and Core Web Vitals from Google Search Console.' },
     { icon: 'doc', title: 'On-page', text: 'Titles, meta descriptions, headings, internal links and keyword cannibalization.' },
     { icon: 'pin', title: 'Local', text: 'Google Business Profile, citations, NAP consistency and reviews.' },
     { icon: 'link', title: 'Links', text: 'Backlink profile strengths, risks and gaps against competitors.' },
     { icon: 'pen', title: 'Content', text: 'Gaps, overlaps and outdated pages, compared with what is ranking.' },
     { icon: 'target', title: 'Competitors', text: 'Where the businesses outranking you are stronger, and where you can win.' }]},
  { type: 'checklist', eyebrow: 'Deliverables', heading: 'What you receive', items: [
     ['Audit report', 'Plain language findings'], ['Prioritized fix list', 'Ranked by impact and effort'], ['Technical issue log', 'With affected URLs'],
     ['Competitor gap analysis', 'Where they beat you and why'], ['Backlink profile review', 'Strengths and risks'], ['Walkthrough call', 'Questions answered, next steps agreed']]},
  { type: 'table', eyebrow: 'Two different things', heading: 'Free audit vs full audit', cols: ['', 'Free SEO audit', 'Full SEO audit'],
   intro: 'Start with the {{free SEO audit|free-seo-audit}} if you want a quick view. Choose the full audit when you are ready to fix things properly.',
   rows: [['Purpose', 'A quick local snapshot', 'A complete diagnosis and action plan'], ['Covers', 'Business Profile, top on-page issues, Map Pack competitors', 'Technical, on-page, local, links and content'],
          ['Format', '[[Short video or PDF]]', 'Full report, fix list and walkthrough call'], ['Turnaround', '[[0]] business days', '[[0]] business days'], ['Cost', 'Free, no obligation', '[[Price or price range]]']]},
  { type: 'split', eyebrow: 'Before you hire', heading: 'The questions Google suggests asking any SEO', reverse: true, visual: 'cards',
   vdata: { items: [['book', 'Past work', 'Examples and results'], ['shield', 'Search Essentials', 'Do they follow them'], ['eye', 'Shared changes', 'Will they show every change']] },
   body: ['Google suggests asking an SEO for examples of previous work, whether they follow Google Search Essentials, and whether they will share every change they make.',
          'The audit answers those questions up front, so you can judge our work before committing to anything more.']},
  { type: 'prose', blocks: [['callout', '[[Add a real, anonymised sample page from an audit report (for example the prioritized fix list), used with permission.]]'],
     ['src', [G_STARTER, ['Google Search Central: Do you need an SEO?', 'https://developers.google.com/search/docs/fundamentals/do-i-need-seo']]]] },
 ],
 faqHeading: 'SEO audit FAQ',
 faq: [
  ['What does an SEO audit include?', 'A technical review (crawling, indexing, speed, structured data), an on-page review (titles, headings, internal links), a local review (Business Profile, citations, reviews), a backlink review, a content gap check and a competitor comparison, with every finding ranked by impact.'],
  ['How long does an audit take?', '[[Set your typical turnaround.]] It depends on the size of your site and how much data is available in Search Console and Google Analytics.'],
  ['Can my developer implement the fixes?', 'Yes. Findings are written so any competent developer can act on them, with the affected URLs and how to check each fix. We can also implement them for you.']],
 industries: ['industries/law-firms', 'industries/dentists', 'industries/contractors'],
 related: ['services/technical-seo', 'services/on-page-seo', 'services/local-seo'],
}),

// ------------------------------------------------------------------ LATER-PHASE SERVICES (existing copy, new URLs)
...(KEPT as unknown as Page[]),
];

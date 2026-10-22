// Services hub + service pages, written from the briefs in plan/content-plan.json (outline, entities, n-grams).
// No prices on service pages (owner decision, plan open question 4): price questions link to /pricing/.
// Real-world facts the business must supply stay as [[placeholders]].
// Later-phase services that already had copy (AI search, ecommerce, content writing) live in services-more.json.
// Inline marks: [[placeholder]]  **bold**  {{link text|slug}}  ({{text|}} links to the homepage)
import type { Page, Section } from './types';
import KEPT from './services-more.json';

const UPDATED = '2026-10-23';
const CASES = ['case-studies/local-service-business', 'case-studies/ecommerce-store', 'case-studies/professional-firm'];

// One wording for the free audit's open facts (F25). content/core.ts (free-seo-audit page) uses the same strings.
const FREE_AUDIT_FORMAT = '[[Short video or PDF]]';
const FREE_AUDIT_TURNAROUND = '[[0]] business days';
// The paid SEO audit's own open facts, used in the table and the FAQ so both always match.
const AUDIT_TURNAROUND = '[[Full audit turnaround in business days]]';
const AUDIT_PRICE = '[[Full audit price or price range in CAD]]';

type Svc = {
  slug: string; nav: string; keyword: string; icon: string; illus: string; title: string; description: string; card: string;
  hero: [string, string, string]; sections: Section[]; faqHeading: string; faqIntro: string; faq: [string, string][];
  industries: string[]; related: string[]; ctaText?: string;
  industriesHeading: string; relatedHeading: string;
};

function svc(o: Svc): Page {
  const name = o.nav.toLowerCase().replace(/\bseo\b/g, 'SEO').replace('google business profile', 'Google Business Profile');
  return {
    slug: 'services/' + o.slug, nav_label: o.nav, keyword: o.keyword, icon: o.icon, illus: o.illus, title: o.title, description: o.description,
    card: o.card, long_card: o.description, crumbs: [['Services', 'services']], service: o.nav + ' in Edmonton', area: 'Edmonton, AB',
    updated: UPDATED,
    sections: [
      { type: 'page_hero', eyebrow: o.hero[0], h1: o.hero[1], lead: o.hero[2], cta: ['Get a free SEO audit', 'free-seo-audit'] },
      ...o.sections,
      { type: 'posts', eyebrow: 'Proof', heading: 'Related case studies', items: CASES },
      { type: 'faq', eyebrow: 'FAQ', heading: o.faqHeading, intro: o.faqIntro, items: o.faq },
      { type: 'links', eyebrow: 'Who we do this for', heading: o.industriesHeading, bg: 'soft', items: o.industries,
        intro: `**${o.nav} works the same way in every trade, but the searches, seasons and rules differ.** Each industry page below shows what changes for that kind of business.` },
      { type: 'links', eyebrow: 'Related services', heading: o.relatedHeading, items: o.related,
        intro: `**${o.nav} works best next to the services below**, because each one fixes a part of search that ${name} alone does not reach.` },
      { type: 'cta', heading: `Talk to us about ${o.nav} in Edmonton`, text: o.ctaText ?? 'Start with a free SEO audit. A person checks your site and profile and shows you the biggest opportunities, in plain language.', button: ['Get a free SEO audit', 'free-seo-audit'] },
    ],
  };
}

const G_LOCAL = ['Google Business Profile Help: How to improve your local ranking', 'https://support.google.com/business/answer/7091?hl=en'];
const G_STARTER = ['Google Search Central: SEO Starter Guide', 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide'];
const G_MAPS = ['Google Maps contribution policy', 'https://support.google.com/contributionpolicy/answer/7400114?hl=en'];
const G_GUIDELINES = ['Google Business Profile Help: Guidelines for representing your business', 'https://support.google.com/business/answer/3038177?hl=en'];
const G_SPAM = ['Google Search Central: Spam policies', 'https://developers.google.com/search/docs/essentials/spam-policies'];
const G_AI = ['Google Search Central: AI features and your website', 'https://developers.google.com/search/docs/appearance/ai-features'];

// Shared answers (one answer site-wide; the homepage and blog use the same facts).
const FAQ_FIND = (angle: string) => ['Where can I find SEO services in Edmonton?', `Search Google Maps for "SEO Edmonton", then compare agencies on their Google reviews, their own Business Profile and their profiles on agency directories such as Clutch. ${angle} Our guide on {{how to choose an SEO agency|blog/choosing-an-seo-agency-in-edmonton}} lists the questions Google suggests asking before you hire anyone.`] as [string, string];
const FAQ_8020 = (angle: string) => ['What is the 80/20 rule in SEO?', `The 80/20 rule in SEO is a rule of thumb, not a measured law: a small share of pages and tasks usually drives most of the results. ${angle}`] as [string, string];

export const PAGES: Page[] = [
// ------------------------------------------------------------------ HUB
{
 slug: 'services', nav_label: 'SEO Services', keyword: 'seo services', icon: 'layers', page_type: 'CollectionPage', updated: UPDATED,
 title: 'SEO Services | Local, Technical and On-Page SEO',
 description: 'SEO services for Edmonton-area businesses, from local SEO and Google Business Profile work to technical SEO, content and AI search. Get a free SEO audit.',
 card: 'Every SEO service we offer in one place.',
 sections: [
  { type: 'page_hero', eyebrow: 'Our services', h1: 'SEO Services for Local Businesses', lead: 'Our SEO services each cover one part of how customers in Edmonton, Alberta find a business on Google, because search engine optimization (SEO) has several moving parts. Start with the service that matches your goal, or combine several into one plan, the same way our {{Edmonton SEO services|}} are run for every client.', cta: ['Get a free SEO audit', 'free-seo-audit'] },
  { type: 'cards', eyebrow: 'Find what you need', heading: 'Choose the SEO service you need', cols: 3,
   intro: '**Each SEO service below fixes one part of search, and the card says who it suits.** Open a service to see what is included, how it runs and the questions owners ask about it.',
   items: [
     { icon: 'pin', title: 'Local SEO', text: 'Ranking in the Google Map Pack and local results. For storefronts and service area businesses that want more calls.', link: 'services/local-seo' },
     { icon: 'store', title: 'Google Business Profile', text: 'Categories, services, photos, posts and review replies kept accurate. For any business that shows on Google Maps.', link: 'services/google-business-profile-optimization' },
     { icon: 'gear', title: 'Technical SEO', text: 'Crawling, indexing, Core Web Vitals, structured data and redirects. For sites with pages missing from Google or slow pages.', link: 'services/technical-seo' },
     { icon: 'doc', title: 'On-Page SEO', text: 'Titles, headings, copy and internal links matched to search intent. For sites that rank on page two or for the wrong searches.', link: 'services/on-page-seo' },
     { icon: 'link', title: 'Link Building', text: 'Relevant local and Canadian links earned inside Google\'s spam policies. For businesses that lose to better-known competitors.', link: 'services/link-building' },
     { icon: 'pen', title: 'SEO Content Writing', text: 'Service pages, location pages and blog posts planned around real searches. For sites with too few pages for what they sell.', link: 'services/content-writing' },
     { icon: 'audit', title: 'SEO Audit', text: 'A full technical, on-page, local and link review with a prioritized fix list. For owners who want a plan before any work starts.', link: 'services/seo-audit' },
     { icon: 'cart', title: 'Ecommerce SEO', text: 'Category, product and structured data work. For Shopify, WooCommerce and custom online stores.', link: 'services/ecommerce-seo' },
     { icon: 'spark', title: 'AI Search Optimization', text: 'Readiness for Google AI Overviews, AI Mode and AI assistants. For businesses that want to be cited in AI answers.', link: 'services/ai-search-optimization' }]},
  { type: 'table', eyebrow: 'Match your goal', heading: 'Which SEO service fits your goal?', bg: 'soft', cols: ['Your goal', 'Start with', 'Add later'],
   intro: '**Your goal decides which SEO service to start with.** This table matches six common goals to the first service and the one that usually follows it.',
   rows: [['More calls from Google Maps', '{{Local SEO|services/local-seo}} and {{GBP optimization|services/google-business-profile-optimization}}', 'Link Building'],
          ['Pages not showing in Google', '{{Technical SEO|services/technical-seo}}', 'SEO Audit'],
          ['Rank for more of your services', '{{On-page SEO|services/on-page-seo}} and {{SEO content writing|services/content-writing}}', '{{Link building|services/link-building}}'],
          ['More online sales', '{{Ecommerce SEO|services/ecommerce-seo}}', 'SEO Content Writing'],
          ['Be cited in AI answers', '{{AI search optimization|services/ai-search-optimization}}', 'SEO Content Writing'],
          ['Know what is wrong first', 'A {{free SEO audit|free-seo-audit}}, then a full {{SEO audit|services/seo-audit}}', 'Any of the above']]},
  { type: 'steps', eyebrow: 'Every engagement', heading: 'How our SEO services run',
   intro: '**Every one of our SEO services runs in the same four steps: audit, plan, build and report.** You see what we found, what we will do and what changed each month.',
   items: [['Audit', 'Your site, Business Profile, competitors and current rankings.'], ['Plan', 'A written roadmap with priorities and expected outcomes.'],
           ['Build', 'Fixes, content and outreach, with every change logged.'], ['Report', 'Calls, forms, rankings and traffic in plain language every month.']]},
  { type: 'faq', eyebrow: 'FAQ', heading: 'SEO services FAQ', intro: 'Where to start and how the services combine.', items: [
     ['Which SEO service do I need first?', 'Usually an audit, because it shows which problems cost you the most. Most businesses do not need every service at once, and a {{free SEO audit|free-seo-audit}} is the place to start, so the first months of work go where they make a difference.'],
     ['Can I combine services?', 'Yes. Most businesses combine two or three, such as local SEO with Google Business Profile management and link building. Our {{SEO pricing|pricing}} page shows the common combinations as packages.']]},
  { type: 'cta', heading: 'Not sure which SEO service you need?', text: 'Get a free SEO audit and we will recommend where to start.', button: ['Get a free SEO audit', 'free-seo-audit'] },
 ]},

// ------------------------------------------------------------------ LOCAL SEO
svc({
 slug: 'local-seo', industriesHeading: 'Local SEO by industry', relatedHeading: 'Services that strengthen local SEO', nav: 'Local SEO', keyword: 'local seo edmonton', icon: 'pin', illus: 'map',
 title: 'Local SEO Edmonton | Rank in Google Maps and Local Search',
 description: 'Local SEO Edmonton businesses can measure in calls, built on your Business Profile, citations, reviews and local pages. Start with a free SEO audit.',
 card: 'Rank in Google Maps and local results across Edmonton.',
 hero: ['Local SEO', 'Local SEO Edmonton, Rank in the Google Map Pack', 'Local SEO Edmonton businesses can measure starts in the Google Map Pack. We help businesses in Edmonton, Alberta show up there and in local search results when people nearby search for what they sell, then turn those searches into calls, directions and bookings. It is the core of our {{Edmonton SEO services|}}.'],
 sections: [
  { type: 'split', eyebrow: 'What it is', heading: 'What local SEO is, and who it suits', visual: 'map', vdata: { title: 'Your business', sub: 'Top 3 in the Map Pack' },
   body: ['**Local search engine optimization (SEO) is the work that gets your business into the Map Pack, the three businesses Google shows on a map above the regular results.** That is our working definition, and it also covers the local organic results underneath, for searches like "plumber near me" or "dentist Edmonton".',
          'It suits storefronts that customers visit and service area businesses that drive to customers. It brings your Google Business Profile, website, Google reviews and listings on other sites into one consistent picture, so Google trusts that you are a real, relevant business. Your next step is to check that picture with a {{free SEO audit|free-seo-audit}}.'],
   bullets: ['Built for storefronts and service area businesses', 'Measured in calls, direction requests and bookings', 'Rankings tracked neighbourhood by neighbourhood, not just city wide']},
  { type: 'cards', eyebrow: 'What is included', heading: 'What local SEO includes', bg: 'soft', cols: 3,
   intro: '**Local SEO includes six pieces of work, from your Business Profile to neighbourhood rank tracking.** Each one improves how relevant or how prominent Google judges your business to be.',
   items: [
     { icon: 'store', title: 'Business Profile optimization', text: 'Primary and secondary categories, services, hours, attributes, photos and posts, kept accurate. See {{Google Business Profile optimization|services/google-business-profile-optimization}}.' },
     { icon: 'star', title: 'Google reviews', text: 'A steady, genuine flow: ask every customer for an honest review with a direct link, and post an owner reply to each one. No incentives and no review gating.' },
     { icon: 'map', title: 'Local citations', text: 'Your name, address and phone number (NAP) kept consistent across Yelp.ca, YellowPages.ca, Canpages, Clutch and local chambers.' },
     { icon: 'doc', title: 'Local landing pages', text: 'Useful pages for the services and areas you actually serve, never thin copies with the town name swapped.' },
     { icon: 'link', title: 'Local links', text: 'Mentions from Edmonton organizations, suppliers, events and media. See {{link building|services/link-building}}.' },
     { icon: 'chart', title: 'Rank tracking by neighbourhood', text: 'Map Pack positions checked on a grid across the city, because rankings in Windermere differ from rankings in St. Albert.' }]},
  { type: 'split', eyebrow: 'From the source', heading: 'Local SEO and Google\'s three ranking factors', reverse: true, visual: 'cards',
   vdata: { items: [['target', 'Relevance', 'How well you match the search'], ['pin', 'Distance', 'How far you are from the searcher'], ['star', 'Prominence', 'How well known you are']] },
   body: ['**Local SEO works on relevance and prominence, two of the three factors {{Google Business Profile Help|https://support.google.com/business/answer/7091?hl=en}} names for local results.** Relevance is how well your profile matches the search. Distance is how far you are from the searcher. Prominence is how well known you are, including reviews and links.',
          'Results vary by searcher location across Edmonton, so the same search returns different businesses in Windermere and in St. Albert. Nobody can move your address or pay for a better local ranking. Read {{how Google ranks local businesses|blog/how-google-ranks-local-businesses}} for the full explanation.'],
   bullets: ['Relevance: complete, accurate profile and service pages', 'Distance: honest service area settings', 'Prominence: genuine reviews, citations and local links']},
  { type: 'table', eyebrow: 'Your setup', heading: 'Service area business vs storefront for local SEO', cols: ['', 'Storefront', 'Service area business'],
   intro: '**Local SEO works differently for a storefront and a service area business, and Google treats the two differently.** This table compares them, because the wrong setting is a common cause of weak rankings or suspensions.',
   rows: [['Customers come to you', 'Yes', 'No, you go to them'], ['Address shown on Google', 'Yes', 'Hidden; you list the areas you serve'],
          ['Typical examples', 'Dental clinic, law office, retail', 'Plumber, roofing company (see {{roofing SEO|industries/roofers}}), cleaning company'], ['Main local SEO focus', 'Proximity to the office and reviews', 'Service area settings, service pages and reviews']]},
  { type: 'steps', eyebrow: 'Process', heading: 'Our local SEO process', bg: 'soft',
   intro: '**Our local SEO process follows the same four steps as every engagement: audit, plan, build and report.** Each step below shows what it means for your Map Pack position.',
   items: [
     ['Audit', 'Business Profile, local citations, reviews and Map Pack rankings across the city.'], ['Plan', 'Fixes ranked by impact: accurate NAP, the right categories and settings first.'],
     ['Build', 'Reviews, local links and local pages that earn prominence.'], ['Report', 'Calls, direction requests, website clicks and rankings every month.']]},
  { type: 'prose', blocks: [['callout', '[[Add a real, dated before-and-after Map Pack screenshot or Business Profile performance chart from an Edmonton client, used with written permission.]]'], ['src', [G_LOCAL, G_MAPS]]] },
 ],
 faqHeading: 'Local SEO FAQ',
 faqIntro: 'Timelines, reviews, cost, AI and how local SEO differs from regular SEO.',
 faq: [
  ['How long does local SEO take?', 'Fixing wrong or missing profile details can help within weeks, while building prominence through reviews and links takes months. Timeline expectations depend on your competition, your current profile and the reviews and links you already have, so we put them in writing after the audit and never promise dates we cannot back up.'],
  ['How much does local SEO cost?', 'Local SEO is priced as a monthly package, and the cost depends on how competitive your searches are and how many locations you have. The Local package on our {{SEO pricing|pricing}} page lists what is included and the monthly price in CAD.'],
  ['Do reviews help local rankings?', 'Yes. Google says more reviews and positive ratings can help your local ranking, and replying shows customers you value their feedback. Google\'s Maps contribution policy does not allow incentives for reviews or asking only happy customers, so ask every customer instead.'],
  ['Can I rank in areas where I have no office?', 'Yes, in the regular results, but distance limits how far your Map Pack rankings reach. A service area business can list the areas it serves, and useful service and area pages help you rank in nearby towns. We never create fake offices, which Google can suspend.'],
  ['What is the difference between local SEO and regular SEO?', 'Regular SEO helps your website rank in the organic results anywhere. Local SEO adds the Map Pack and local results, which depend on your Business Profile, reviews, citations and distance as well as your website.'],
  ['Is SEO dead now with AI?', 'No. Google says a page must be indexed and eligible to show in Search with a snippet to appear as a link in AI Overviews or AI Mode, so the same SEO work feeds both. Our {{AI search optimization|services/ai-search-optimization}} page explains what changes and what does not.'],
  FAQ_FIND('For local SEO, ask each agency to show its own Map Pack work and how it handles reviews.'),
  FAQ_8020('In local SEO that small share is usually your Business Profile, your top service pages and your reviews, which is why every engagement starts with an audit that finds them.')],
 industries: ['industries/hvac', 'industries/plumbers', 'industries/roofers', 'industries/dentists', 'industries/law-firms'],
 related: ['services/google-business-profile-optimization', 'services/link-building', 'services/content-writing'],
}),

// ------------------------------------------------------------------ GOOGLE BUSINESS PROFILE
svc({
 slug: 'google-business-profile-optimization', industriesHeading: 'Business Profile work for your industry', relatedHeading: 'Pair your Business Profile with these services', nav: 'Google Business Profile Optimization', keyword: 'google business profile optimization edmonton', icon: 'store', illus: 'store',
 title: 'Google Business Profile Optimization Edmonton | More Calls',
 description: 'Google Business Profile optimization Edmonton businesses can measure. We set up, fix and manage your profile for more calls, directions and reviews.',
 card: 'Your Business Profile set up right and kept active.',
 hero: ['Google Business Profile', 'Google Business Profile Optimization Edmonton, Set Up and Managed', 'Google Business Profile optimization Edmonton businesses can measure starts with an accurate, verified listing. Your profile is often the first thing customers in Edmonton, Alberta see. We set it up properly, keep it accurate and active, and turn Google Maps views into calls. It is one part of the search engine optimization (SEO) work in our {{Edmonton SEO services|}}.'],
 sections: [
  { type: 'split', eyebrow: 'What it is', heading: 'What a Google Business Profile is', visual: 'map', vdata: { title: 'Your Business Profile', sub: 'Call · Directions · Website' },
   body: ['**A Google Business Profile (GBP), formerly Google My Business, is the free listing that shows your business in Google Maps and the Map Pack, the three businesses Google shows on a map above the regular results.** It shows your hours, Google reviews, photos and contact options.',
          'Google ranks local results on relevance, distance and prominence, and a complete, accurate profile improves relevance, which is why it is the base of {{local SEO|services/local-seo}}. Your name, address and phone number (NAP) must match your website exactly. We report on calls, direction requests and website clicks.'],
   bullets: ['Verified and fully completed', 'Accurate hours, including holidays', 'Active with photos, posts and review replies']},
  { type: 'cards', eyebrow: 'What we optimize', heading: 'What we optimize on your Business Profile', bg: 'soft', cols: 3,
   intro: '**Business Profile optimization covers six areas, and each one is a field Google reads or a customer acts on.** Here is what we set and keep current.',
   items: [
     { icon: 'tag', title: 'Categories', text: 'The primary category is one of the strongest relevance signals on your profile. We choose it, and any secondary categories, to match what you actually sell.' },
     { icon: 'layers', title: 'Services, products and attributes', text: 'Services that mirror your website\'s service pages, products for businesses that sell goods, and attributes customers filter by, such as wheelchair access or online appointments.' },
     { icon: 'image', title: 'GBP posts and photos', text: 'Real photos of your team, work and premises, and regular posts with offers and news, give customers more reasons for engagement with your profile.' },
     { icon: 'star', title: 'Reviews and replies', text: 'Ask every customer for a review, then post a calm, helpful reply to each one, positive or negative. No incentives and no asking only happy customers.' },
     { icon: 'map', title: 'Service areas', text: 'Correct service area settings for businesses that visit customers, with the address hidden as Google\'s guidelines require.' },
     { icon: 'clock', title: 'NAP and hours', text: 'Name, address and phone identical to your website, and regular and holiday hours kept accurate, so nobody drives to a closed door.' }]},
  { type: 'table', eyebrow: 'Two ways to work', heading: 'Business Profile setup vs ongoing management', cols: ['', 'One-time setup', 'Monthly management'],
   intro: '**Business Profile optimization comes as a one-time setup or as monthly management.** This table compares what each option covers, row by row.',
   rows: [['Verification or ownership recovery', 'Yes', 'Yes'], ['Categories, services and attributes', 'Set up once', 'Reviewed as you add services'],
          ['Photos', 'Initial upload', 'New photos every month'], ['Posts', 'No', 'Regular posts'], ['Review replies', 'No', 'Every review answered'],
          ['Reporting', 'Before and after snapshot', 'Monthly calls, directions and clicks']]},
  { type: 'split', eyebrow: 'Protect your listing', heading: 'Avoiding Business Profile suspensions', reverse: true, visual: 'cards',
   vdata: { items: [['shield', 'Real address', 'No virtual offices'], ['doc', 'Real name', 'No keywords added'], ['check-circle', 'Right setup', 'Storefront or service area']] },
   body: ['**A Business Profile suspension usually follows a break of Google\'s {{guidelines for representing your business|https://support.google.com/business/answer/3038177?hl=en}}.** Common causes are a virtual office or mailbox as the address, extra keywords in the business name, and more than one profile for the same location.',
          'We keep your profile inside the rules from day one. If your profile has already been suspended, we review the likely cause, fix it and help you submit a reinstatement request. [[Confirm whether you offer suspension recovery.]] Check your own profile against these causes before you change anything else.']},
  { type: 'prose', blocks: [['callout', '[[Add a real, anonymized before-and-after Business Profile performance report (calls, direction requests, website clicks) from an Edmonton client, used with written permission.]]'], ['src', [G_LOCAL, G_GUIDELINES, G_MAPS]]] },
 ],
 faqHeading: 'Google Business Profile FAQ',
 faqIntro: 'The name change, suspensions, posting and extra locations.',
 faq: [
  ['Is Google My Business the same as Google Business Profile?', 'Yes. Google renamed Google My Business to Google Business Profile. It is the same listing in Google Search and Google Maps, managed from your Google account.'],
  ['Why was my profile suspended?', 'Usually because something breaks Google\'s guidelines: a virtual office or mailbox as the address, extra keywords in the business name, a duplicate listing, or the wrong storefront or service area setting. Fix the cause first, then request reinstatement.'],
  ['How often should I post on my profile?', 'Post at a steady rhythm you can keep, such as weekly or every two weeks. Regular posts keep your profile current and give customers a reason to choose you, so tie each one to a real offer or recent job.'],
  ['Can I add more than one location?', 'Yes, if each location is a real place where you serve customers with staff during stated hours. Each one gets its own profile, and Google does not allow more than one profile per location, so profiles for addresses you do not really operate from risk suspension.']],
 industries: ['industries/plumbers', 'industries/locksmiths', 'industries/dentists', 'industries/med-spas', 'industries/hvac', 'industries/electricians'],
 related: ['services/local-seo', 'services/link-building', 'services/seo-audit'],
}),

// ------------------------------------------------------------------ TECHNICAL SEO
svc({
 slug: 'technical-seo', industriesHeading: 'Industries where technical SEO matters most', relatedHeading: 'What to add after technical SEO', nav: 'Technical SEO', keyword: 'technical seo edmonton', icon: 'gear', illus: 'code',
 title: 'Technical SEO Edmonton | Speed, Indexing and Site Health',
 description: 'Technical SEO Edmonton businesses can verify in Search Console. We fix crawl errors, slow pages, indexing and Core Web Vitals. Get a free SEO audit.',
 card: 'Crawling, indexing, Core Web Vitals and site health.',
 hero: ['Technical SEO', 'Technical SEO Edmonton, Speed, Indexing and Site Health', 'Technical SEO Edmonton sites need starts with crawling and indexing: great content cannot rank if Google cannot crawl it, render it or pick the right version of it. We find the technical problems holding back websites in Edmonton, Alberta and fix them, directly or with your developer, as part of our {{Edmonton SEO services|}}.'],
 sections: [
  { type: 'split', eyebrow: 'What it is', heading: 'What technical SEO is', visual: 'code',
   body: ['**Technical search engine optimization (SEO) makes sure Googlebot can crawl your pages, render them, index the right version of each one and understand them through structured data.** It also covers page speed and mobile usability, since Google uses mobile-first indexing.',
          'The tools we use are Google Search Console, PageSpeed Insights and a full site crawl. We explain every issue in plain language and fix what matters most first. Start by opening the page indexing report in your own Search Console.'],
   bullets: ['Crawling and indexing issues found and fixed', 'Duplicate URLs consolidated with redirects or canonical tags', 'Structured data that matches visible content']},
  { type: 'cards', eyebrow: 'What is included', heading: 'What technical SEO covers', bg: 'soft', cols: 3,
   intro: '**Technical SEO covers six areas, and each card is something we check, fix and recheck.** Together they decide whether Google can find, load and trust your pages.',
   items: [
     { icon: 'search', title: 'Crawling and indexing', text: 'Search Console page indexing reports, robots.txt, XML sitemap and blocked CSS or JavaScript reviewed, so crawl errors get fixed before Google can index the page.' },
     { icon: 'speed', title: 'Site speed and Core Web Vitals', text: 'Loading (LCP), responsiveness (INP) and visual stability (CLS) measured from real-user field data and improved.' },
     { icon: 'code', title: 'Structured data', text: 'Valid schema.org markup such as LocalBusiness, Service, FAQPage and BreadcrumbList, tested for rich results.' },
     { icon: 'link', title: 'Redirects and canonicals', text: 'One preferred URL per page, with 301 redirects and a rel="canonical" tag where duplicates exist.' },
     { icon: 'phone', title: 'Mobile usability', text: 'Pages that work well on phones, since speed on mobile matters and Google indexes the mobile version of your site.' },
     { icon: 'shield', title: 'HTTPS and site architecture', text: 'Secure pages, logical directories and internal links that help Google find every important page.' }]},
  { type: 'table', eyebrow: 'Core Web Vitals', heading: 'Core Web Vitals thresholds Google calls good', cols: ['Metric', 'Measures', 'Good'],
   intro: '**Technical SEO work aims at the three Core Web Vitals thresholds below.** Google measures them from real visitors (field data), at the 75th percentile of page loads.',
   rows: [['Largest Contentful Paint (LCP)', 'Loading: when the main content appears', '2.5 seconds or less'], ['Interaction to Next Paint (INP)', 'Responsiveness to taps and clicks', '200 milliseconds or less'],
          ['Cumulative Layout Shift (CLS)', 'Visual stability while the page loads', '0.1 or less']]},
  { type: 'split', eyebrow: 'Working together', heading: 'Technical SEO handoff to your developer', reverse: true, visual: 'cards',
   vdata: { items: [['doc', 'Clear tickets', 'One issue, one fix'], ['layers', 'Any platform', 'WordPress, Shopify, Wix'], ['check-circle', 'Verified', 'Rechecked in Search Console']] },
   body: ['**Technical SEO fixes reach your site either through us or through a developer handoff.** If we have access, we make the changes and log each one. If you prefer your own developer, the deliverables are prioritized tickets with the affected URLs, the fix and how to check it.',
          'We work on WordPress, Shopify, Wix, Squarespace and custom builds, and online stores get the same care on our {{ecommerce SEO|services/ecommerce-seo}} page. [[Confirm the platforms you support.]] After each fix we recheck it in Search Console. Decide now who will make the changes on your site.']},
  { type: 'prose', blocks: [['callout', '[[Add a real example from client work: a dated Search Console page indexing or Core Web Vitals report before and after a fix, anonymized and used with permission.]]'],
     ['src', [G_STARTER, ['Google Search Central: Understanding Core Web Vitals and Google search results', 'https://developers.google.com/search/docs/appearance/core-web-vitals']]]] },
 ],
 faqHeading: 'Technical SEO FAQ',
 faqIntro: 'What technical SEO is, speed, platforms and access.',
 faq: [
  ['What is technical SEO?', 'Technical SEO is the work that helps search engines crawl, render, index and understand your website: robots.txt, XML sitemaps, canonical tags, redirects, structured data, page speed and mobile usability. It does not change what your pages say; it makes sure Google can see and trust them.'],
  ['Do Core Web Vitals affect rankings?', 'Yes, as one signal among many. Google says Core Web Vitals are used by its ranking systems, and it also says relevance comes first, so a fast page with weak content will not outrank a helpful one.'],
  ['Can you work on WordPress and Shopify?', 'Yes. We work on WordPress, Shopify and most other common platforms, and on custom builds with your developer.'],
  ['Will you need access to my website?', 'Yes, ideally, plus Google Search Console. If you prefer not to give access, we write prioritized tickets for your developer instead, and a {{free SEO audit|free-seo-audit}} needs no access at all.']],
 industries: ['industries/law-firms', 'industries/dentists', 'industries/contractors'],
 related: ['services/seo-audit', 'services/on-page-seo', 'services/ecommerce-seo'],
}),

// ------------------------------------------------------------------ ON-PAGE SEO
svc({
 slug: 'on-page-seo', industriesHeading: 'On-page SEO for your type of business', relatedHeading: 'On-page SEO pairs with these services', nav: 'On-Page SEO', keyword: 'on page seo edmonton', icon: 'doc', illus: 'list',
 title: 'On-Page SEO Edmonton | Pages Built to Rank and Convert',
 description: 'On-page SEO Edmonton service for titles, headings, copy, schema and internal links, matched to one search intent per page. Get a free SEO audit.',
 card: 'Titles, headings, copy and internal links matched to intent.',
 hero: ['On-Page SEO', 'On-Page SEO Edmonton, Pages Built to Rank and Convert', 'On-page SEO Edmonton customers respond to makes every page clear to people and to Google: what it is about, who it is for and what to do next. We optimize the pages of businesses in Edmonton, Alberta so they rank for the right searches and turn visits into calls, as part of our {{Edmonton SEO services|}}.'],
 sections: [
  { type: 'split', eyebrow: 'What it is', heading: 'On-page SEO means one page, one search intent', visual: 'serp', vdata: { query: 'emergency plumber edmonton', rows: ['Emergency Plumber in Edmonton | 24/7', 'Plumbing Services | Home', 'Directory page'] },
   body: ['**On-page search engine optimization (SEO) is everything on the page itself: the title link in Google, the meta description, the headings, the copy, images and the internal links between your pages.** It also covers conversion elements such as calls to action and a tap-to-call phone number.',
          'We match each page to one clear search intent, so the content shows Google and customers what that page is about, and no two pages compete for the same search (keyword cannibalization). Pick the one page that should win your most valuable search.'],
   bullets: ['One primary topic per page', 'Title tags and snippets that earn the click', 'Internal links that guide people and crawlers']},
  { type: 'cards', eyebrow: 'What we optimize', heading: 'What on-page SEO changes on each page', bg: 'soft', cols: 4,
   intro: '**On-page SEO changes four things on every page.** Each card says what we change and why it matters to the searcher.',
   items: [
     { icon: 'tag', title: 'Titles and meta descriptions', text: 'Title tag optimization: unique, clear and accurate title tags and metas for every page, written so the title earns the click.' },
     { icon: 'pen', title: 'Headings and copy', text: 'A logical H1 to H3 heading structure and wording that answers what the searcher needs, filling content gaps.' },
     { icon: 'link', title: 'Internal links', text: 'An internal linking strategy with descriptive anchor text, so internal links pass authority to your key service pages.' },
     { icon: 'code', title: 'Schema', text: 'Page-level structured data that matches what is on the page.' }]},
  { type: 'split', eyebrow: 'Keyword mapping', heading: 'Keyword mapping, the right search for the right page', reverse: true, visual: 'cards',
   vdata: { items: [['search', 'Research', 'How customers phrase searches'], ['layers', 'Map', 'One search intent per page'], ['chart', 'Measure', 'Clicks and rankings per page']] },
   body: ['**Keyword mapping assigns every search worth winning to the one page that should rank for it, page by page.** It shows content gaps (searches with no page) and overlaps (two pages fighting for the same search) before we change a word.',
          'We start with pages already close to page one for valuable searches, where small changes to titles, headings and internal links move results fastest. List the searches that bring you jobs today as your first map.']},
  { type: 'table', eyebrow: 'Example', heading: 'An on-page SEO title rewrite, before and after', cols: ['', 'Title tag'],
   intro: '**On-page SEO often starts with the title tag.** This table compares a vague homepage title with one that names the service, the city and the reason to call.',
   rows: [['Before', 'Home | [[Client business name]]'], ['After', 'Emergency Plumber in Edmonton | 24/7 Burst Pipe Repair'],
          ['Why', 'Names the service, the city and the reason to call, in under 60 characters']]},
  { type: 'prose', blocks: [['callout', '[[Replace the example above with a real before-and-after title from client work and the click change measured in Search Console.]]'], ['src', [G_STARTER]]] },
 ],
 faqHeading: 'On-Page SEO FAQ',
 faqIntro: 'How on-page work differs from technical SEO, rewrites and keyword choice.',
 faq: [
  ['What is the difference between on-page and technical SEO?', 'On-page SEO is about what each page says and how it is structured: titles, headings, copy and links. {{Technical SEO|services/technical-seo}} is about whether Google can crawl, render and index the site at all. Most sites need both.'],
  ['Will you rewrite my content?', 'Yes, where it helps. Most gains come from fixing titles, headings and internal links on existing pages. Where a page is thin or misses what searchers want, we rewrite it in your voice, and you approve every change.'],
  ['How do you choose keywords for each page?', 'We research how your customers phrase their searches, group searches with the same intent, and assign each group to one page. Search volume, competition and how close you already rank decide the order of work, and a {{free SEO audit|free-seo-audit}} shows where you stand today.']],
 industries: ['industries/electricians', 'industries/accountants', 'industries/realtors', 'industries/contractors', 'industries/law-firms'],
 related: ['services/technical-seo', 'services/content-writing', 'services/local-seo'],
}),

// ------------------------------------------------------------------ LINK BUILDING
svc({
 slug: 'link-building', industriesHeading: 'Link building ideas by industry', relatedHeading: 'Link building works best with these services', nav: 'Link Building', keyword: 'link building edmonton', icon: 'link', illus: 'link',
 title: 'Link Building Edmonton | Local, Safe and Relevant Links',
 description: 'Link building Edmonton businesses can trust. We earn relevant local, Alberta and Canadian backlinks, never paid links. Start with a free SEO audit.',
 card: 'Relevant local links and mentions, earned the right way.',
 hero: ['Link Building', 'Link Building Edmonton, Local Links Earned the Safe Way', 'Link building Edmonton businesses can trust means links Google sees as earned. Links from other websites help Google judge how well known your business is, so we earn relevant backlinks from Edmonton, Alberta and Canadian sites through real relationships, as part of our {{Edmonton SEO services|}}.'],
 sections: [
  { type: 'split', eyebrow: 'Why links matter', heading: 'Why link building builds a reputation Google can see', visual: 'cards',
   vdata: { items: [['users', 'Local organizations', 'Chambers and associations'], ['message', 'Edmonton media', 'Stories worth covering'], ['handshake', 'Suppliers and partners', 'People who know you']] },
   body: ['**Link building earns backlinks, links from other websites to yours, and Google counts links as part of prominence in local search.** It is the off-page half of search engine optimization (SEO). Local citations, your listings on directories, keep your name, address and phone consistent.',
          'Our link building services focus on local links a real Edmonton business would naturally earn from relevant sites, and we report every link and mention to you. List the organizations you already belong to; that is where the first links come from.'],
   bullets: ['Relevant Edmonton, Alberta and industry sites', 'No bought links, link farms or private blog networks', 'Every link earned listed in your report']},
  { type: 'cards', eyebrow: 'Sources', heading: 'Where our link building finds links', bg: 'soft', cols: 4,
   intro: '**Link building for a local business draws on four kinds of sources.** Each card names where the link comes from and why that site would link to you.',
   items: [
     { icon: 'users', title: 'Local organizations and chambers', text: 'The Edmonton Chamber of Commerce and town chambers such as St. Albert, Spruce Grove and the Leduc, Nisku & Wetaskiwin Regional Chamber, plus community leagues and charities you already support.' },
     { icon: 'message', title: 'Edmonton media', text: 'Useful stories, data and expert comment pitched to local news and community publications.' },
     { icon: 'book', title: 'Industry associations', text: 'Trade and professional bodies in your field that list or feature members.' },
     { icon: 'handshake', title: 'Suppliers and partners', text: 'Manufacturers, distributors and partners who feature the businesses they work with.' }]},
  { type: 'split', eyebrow: 'Our rules', heading: 'What our link building never does', reverse: true, visual: 'cards',
   vdata: { items: [['shield', 'No paid links', 'For ranking purposes'], ['bolt', 'No automation', 'No link programs'], ['link', 'No swaps', 'No excessive exchanges']] },
   body: ['**Our link building never buys links, swaps them in bulk or uses automated programs, because Google\'s spam policies list all three as link spam.** Sites that break the spam policies may rank lower or not appear at all, which is what most people mean by a Google penalty.',
          'A sponsorship is fine when its link is marked rel="sponsored" or rel="nofollow". We use natural, descriptive anchor text rather than exact-match keywords. Ask any agency you consider to show you every link it built.']},
  { type: 'table', eyebrow: 'Citations vs links', heading: 'Citations and editorial links do different link building jobs', cols: ['', 'Local citations', 'Editorial links'],
   intro: '**Citations and editorial links are both part of link building, but they do different jobs.** This table compares what each one is, what it does and how many you need.',
   rows: [['What they are', 'Directory listings (Yelp.ca, YellowPages.ca, Canpages, Clutch)', 'A site choosing to link to you in its content'],
          ['Main benefit', 'Consistent name, address and phone (NAP), discovery', 'Prominence and authority'], ['How many you need', 'The relevant few, done accurately', 'Quality over quantity']]},
  { type: 'prose', blocks: [['callout', '[[Add a real example of a local link earned for a client (for example a chamber feature or a news mention), anonymized and used with permission.]]'],
     ['src', [G_SPAM, G_STARTER, G_LOCAL]]] },
 ],
 faqHeading: 'Link building FAQ',
 faqIntro: 'Paid links, how many you need and directory citations.',
 faq: [
  ['Do you buy links?', 'No. Google\'s spam policies treat buying links for ranking as link spam. If you sponsor something and get a link, it should be marked rel="sponsored", and we make sure it is.'],
  ['How many links do I need?', 'There is no fixed number. A handful of relevant links from respected Edmonton and industry sites usually does more than hundreds of weak ones, so we compare your links with the businesses outranking you, and a {{free SEO audit|free-seo-audit}} shows that gap.'],
  ['Are directory citations still useful?', 'Yes, on relevant local and industry directories, because accurate listings keep your name, address and phone consistent. Google lists low-quality directory links as link spam, so we avoid those directories.']],
 industries: ['industries/contractors', 'industries/law-firms', 'industries/roofers'],
 related: ['services/local-seo', 'services/content-writing', 'services/seo-audit'],
}),

// ------------------------------------------------------------------ SEO AUDIT
svc({
 slug: 'seo-audit', industriesHeading: 'SEO audits for your industry', relatedHeading: 'Services that act on SEO audit findings', nav: 'SEO Audit', keyword: 'seo audit edmonton', icon: 'audit', illus: 'audit',
 title: 'SEO Audit Edmonton | Find What Is Holding You Back',
 description: 'SEO audit Edmonton businesses can act on, covering technical, on-page, local and link issues, with a prioritized fix list and a walkthrough call.',
 card: 'A full site review with a prioritized fix list.',
 hero: ['SEO Audit', 'SEO Audit Edmonton, a Prioritized Fix List for Your Site', 'This SEO audit Edmonton businesses use is a full review of your website and local presence that shows what is working, what is broken and what to fix first. It is written in plain language for businesses in Edmonton, Alberta, ranked by impact, and usable by your team or ours as part of our {{Edmonton SEO services|}}.'],
 sections: [
  { type: 'prose', blocks: [
     ['h2', 'What is an SEO audit?'],
     ['p', '**An SEO audit is a review of how search engines see your website and business listings, ending in a list of issues ranked by impact.** It is a search engine optimization (SEO) check, not a financial audit, and it covers technical, on-page, local, link and content issues.'],
     ['p', 'A site audit tool alone finds hundreds of warnings; a useful audit decides which few matter. The result is a prioritized action plan: the issues with the most impact and least effort come first, so your audit priorities match your budget. Gather your Search Console access before you book one.']] },
  { type: 'cards', eyebrow: 'Scope', heading: 'What the SEO audit covers', cols: 3,
   intro: '**The SEO audit covers six areas, from a technical SEO audit to a competitor comparison.** Each card lists what we check in that area.',
   items: [
     { icon: 'gear', title: 'Technical', text: 'Crawling, indexing, canonicals, redirects, XML sitemap, structured data and Core Web Vitals from Google Search Console.' },
     { icon: 'doc', title: 'On-page', text: 'Titles, meta descriptions, headings, internal links and keyword cannibalization.' },
     { icon: 'pin', title: 'Local', text: 'Google Business Profile, citations, consistency of your name, address and phone (NAP), and reviews.' },
     { icon: 'link', title: 'Links', text: 'Backlink profile strengths, risks and gaps against competitors.' },
     { icon: 'pen', title: 'Content', text: 'Gaps, overlaps and outdated pages, compared with what is ranking.' },
     { icon: 'target', title: 'Competitors', text: 'Where the businesses outranking you are stronger, and the gaps where you can win.' }]},
  { type: 'checklist', eyebrow: 'Deliverables', heading: 'What you receive from the SEO audit',
   intro: '**The SEO audit ends in six deliverables you keep, whoever does the work.** Each one is written so your team or a developer can act on it.',
   items: [
     ['Audit report', 'Plain language findings'], ['Prioritized fix list', 'Issues ranked by impact and effort'], ['Technical issue log', 'With affected URLs'],
     ['Competitor gap analysis', 'Where they beat you and why'], ['Backlink profile review', 'Strengths and risks'], ['Walkthrough call', 'Questions answered, next steps agreed']]},
  { type: 'table', eyebrow: 'Two different things', heading: 'Free audit vs full SEO audit', cols: ['', 'Free SEO audit', 'Full SEO audit'],
   intro: '**The free SEO audit is a quick local snapshot, while the full SEO audit is a complete diagnosis.** This table compares them; start with the {{free SEO audit|free-seo-audit}} if you want a quick view.',
   rows: [['Purpose', 'A quick local snapshot', 'A complete diagnosis and action plan'], ['Covers', 'Business Profile, top on-page issues, Map Pack competitors (the three businesses Google shows on a map)', 'Technical, on-page, local, links and content'],
          ['Format', FREE_AUDIT_FORMAT, 'Full report, fix list and walkthrough call'], ['Turnaround', FREE_AUDIT_TURNAROUND, AUDIT_TURNAROUND], ['Cost', 'Free, no obligation', AUDIT_PRICE]]},
  { type: 'split', eyebrow: 'Before you hire', heading: 'The questions Google suggests asking before an SEO audit', reverse: true, visual: 'cards',
   vdata: { items: [['book', 'Past work', 'Examples and results'], ['shield', 'Search Essentials', 'Do they follow them'], ['eye', 'Shared changes', 'Will they show every change']] },
   body: ['**Before any SEO audit, Google suggests asking for examples of previous work, whether the SEO follows Google Search Essentials, and whether they will share every change they make.**',
          'The audit answers those questions up front, so you can judge our work before committing to anything more. Our guide on {{how to choose an SEO agency|blog/choosing-an-seo-agency-in-edmonton}} lists the rest of the questions to ask.']},
  { type: 'prose', blocks: [['callout', '[[Add a real, anonymized sample page from an audit report (for example the prioritized fix list), used with permission.]]'],
     ['src', [G_STARTER, ['Google Search Central: Do you need an SEO?', 'https://developers.google.com/search/docs/fundamentals/do-i-need-seo']]]] },
 ],
 faqHeading: 'SEO audit FAQ',
 faqIntro: 'Scope, cost, timing, AI tools and who fixes the issues.',
 faq: [
  ['What does an SEO audit include?', 'An SEO audit includes a technical review (crawling, indexing, speed, structured data), an on-page review (titles, headings, internal links), a local review (Business Profile, citations, reviews), a backlink review, a content gap check and a competitor comparison. Every finding is ranked by impact.'],
  ['How much does an SEO audit cost?', `A full SEO audit costs ${AUDIT_PRICE}. The free SEO audit costs nothing and is the quick version, so you can see the approach before you pay for the full one.`],
  ['How long does an audit take?', `A full SEO audit takes ${AUDIT_TURNAROUND}. The exact time depends on the size of your site and how much data is available in Search Console and Google Analytics.`],
  ['Can ChatGPT do an SEO audit?', 'No, not on its own. A chatbot can explain issues and summarize data you paste in, but it does not see your Search Console, crawl data or Business Profile insights unless you export them, and its answers need checking, so a person verifies every finding in our audit.'],
  ['Can my developer implement the fixes?', 'Yes. Findings are written so any competent developer can act on them, with the affected URLs and how to check each fix. We can also implement them for you.'],
  FAQ_FIND('Ask each agency for a sample audit, so you can see whether it ranks issues by impact or only lists tool warnings.'),
  FAQ_8020('An SEO audit applies it by ranking issues by impact, so the few fixes that matter most come first instead of hundreds of minor warnings.')],
 industries: ['industries/law-firms', 'industries/dentists', 'industries/contractors'],
 related: ['services/technical-seo', 'services/on-page-seo', 'services/local-seo'],
}),

// ------------------------------------------------------------------ LATER-PHASE SERVICES (existing copy, new URLs)
...(KEPT as unknown as Page[]),
];

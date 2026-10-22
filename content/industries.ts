// Industries hub + industry pages, written from the briefs in plan/content-plan.json.
// Every industry page follows the plan's outline, but each section is written for that industry
// (its searches, seasons, regulators and trust signals), so pages never read as copies with a name swapped.
// Area links appear automatically once the /areas/ pages are built (Phase 2).
// Inline marks: [[placeholder]]  **bold**  {{link text|slug}}
import type { Page } from './types';

const UPDATED = '2026-10-23';
const G_LOCAL = ['Google Business Profile Help: How to improve your local ranking', 'https://support.google.com/business/answer/7091?hl=en'];
const TOWNS = '{{St. Albert|areas/st-albert}}, {{Sherwood Park|areas/sherwood-park}}, {{Spruce Grove|areas/spruce-grove}}, {{Leduc|areas/leduc}} and {{Fort Saskatchewan|areas/fort-saskatchewan}}';

type Group = 'trades' | 'legal' | 'health';
const TRUST_HEADING: Record<Group, string> = { trades: 'Trust signals for trades', legal: 'Trust signals for legal', health: 'Trust signals for professional and health' };

type Industry = {
  slug: string; nav: string; crumb: string; plural: string; group: Group; icon: string; illus: string;
  title: string; description: string; h1: string; lead: string; card: string; audience: string;
  why: string[]; whyBullets: string[];
  serp: { query: string; rows: string[] }; searches: [string, string][]; searchIntro: string;
  mapPack: { profile: string; pages: string; reviews: string; citations: string };
  seasonal: string[]; trust: [string, string][]; results: [string, string][];
  nearby: string; faq: [string, string][]; services: string[]; proof: string; sources?: string[][];
};

function industry(o: Industry): Page {
  return {
    slug: 'industries/' + o.slug, nav_label: o.nav, icon: o.icon, illus: o.illus, title: o.title, description: o.description,
    card: o.card, crumbs: [['Industries', 'industries']], service: `SEO for ${o.plural} in Edmonton`, audience: o.crumb, area: 'Edmonton, AB',
    updated: UPDATED,
    sections: [
      { type: 'page_hero', eyebrow: 'Industries · ' + o.crumb, h1: o.h1, lead: o.lead, cta: ['Get a free SEO audit', 'free-seo-audit'] },
      { type: 'split', eyebrow: 'Why it matters', heading: `Why Edmonton ${o.plural} need local SEO`, visual: 'map', vdata: { title: 'Your business', sub: 'Top 3 for your main service' }, body: o.why, bullets: o.whyBullets },
      { type: 'split', eyebrow: 'Search demand', heading: 'What your customers search for', reverse: true, bg: 'soft', visual: 'serp', vdata: o.serp, body: [o.searchIntro], bullets: o.searches.map(([q, note]) => `**${q}**: ${note}`) },
      { type: 'cards', eyebrow: 'Our approach', heading: `How we get ${o.plural} into the Map Pack`, cols: 4, items: [
         { icon: 'store', title: 'Business Profile', text: o.mapPack.profile },
         { icon: 'doc', title: 'Service pages', text: o.mapPack.pages },
         { icon: 'star', title: 'Reviews', text: o.mapPack.reviews },
         { icon: 'link', title: 'Citations and local links', text: o.mapPack.citations }]},
      { type: 'prose', blocks: [['h2', 'Seasonal demand'], ...o.seasonal.map((t) => ['p', t])] },
      { type: 'checklist', eyebrow: 'Trust', heading: TRUST_HEADING[o.group], items: o.trust },
      { type: 'table', eyebrow: 'Measurement', heading: 'Results you can measure', cols: ['What we measure', 'Where it comes from'], rows: o.results,
        intro: `We report on the numbers that pay your bills, not vanity rankings. ${o.proof}` },
      { type: 'prose', blocks: [['h2', 'Serving Edmonton and nearby towns'],
        ['p', `We work with ${o.plural} across Edmonton and the surrounding region, including ${TOWNS}. ${o.nearby}`],
        ['p', 'Distance limits how far Map Pack rankings reach, so for nearby towns we combine accurate service area settings with useful service pages and reviews from customers in those towns. Learn how this fits into our {{Edmonton SEO services|}}.'],
        ['src', [G_LOCAL, ...(o.sources ?? [])]]] },
      { type: 'faq', eyebrow: 'FAQ', heading: `SEO for ${o.plural}: FAQ`, items: o.faq },
      { type: 'links', eyebrow: 'Services', heading: `Services we use for ${o.plural}`, items: o.services, bg: 'soft' },
      { type: 'cta', heading: `Get more ${o.group === 'trades' ? 'calls' : 'enquiries'} from Google`, text: `Start with a free SEO audit. We will check your Business Profile, your website and the ${o.plural} outranking you in Edmonton.`, button: ['Get a free SEO audit', 'free-seo-audit'] },
    ],
  };
}

// Shared answers that every industry page adapts.
const reviewsAnswer = (who: string) => `Ask every happy customer, at the moment they are happiest, with a direct link to your Google review form. Reply to every review. Google's Maps contribution policy does not allow paying or rewarding people for reviews, so we build a steady, genuine process for ${who} instead of a one-off push.`;

export const PAGES: Page[] = [
// ------------------------------------------------------------------ HUB
{
 slug: 'industries', nav_label: 'Industries', icon: 'users', page_type: 'CollectionPage', updated: UPDATED,
 title: 'SEO for Local Service Businesses in Edmonton | Industries',
 description: 'Industry-specific SEO for Edmonton trades, home services, law firms and clinics. See how we help businesses like yours win more calls from Google.',
 card: 'Industry-specific SEO for trades, law firms and clinics.',
 sections: [
  { type: 'page_hero', eyebrow: 'Industries', h1: 'SEO for Local Service Businesses', lead: 'People search differently for an emergency plumber, a family lawyer and a new dentist. We shape your Google Business Profile, website and reviews around how your customers actually search in Edmonton.', cta: ['Get a free SEO audit', 'free-seo-audit'] },
  { type: 'links', eyebrow: 'Trades', heading: 'Trades and home services', intro: 'Urgent, mobile searches where the Map Pack decides who gets the call.', cols: 3,
   items: ['industries/plumbers', 'industries/electricians', 'industries/hvac', 'industries/contractors', 'industries/roofers', 'industries/carpenters', 'industries/painters', 'industries/landscapers', 'industries/concrete-contractors', 'industries/garage-door-companies', 'industries/locksmiths', 'industries/pest-control', 'industries/cleaning-companies', 'industries/movers', 'industries/appliance-repair'] },
  { type: 'links', eyebrow: 'Legal', heading: 'Law firms', intro: 'High-trust searches where content must follow the Law Society of Alberta\'s marketing rules.', bg: 'soft', cols: 3,
   items: ['industries/law-firms', 'industries/personal-injury-lawyers', 'industries/family-lawyers', 'industries/immigration-lawyers', 'industries/real-estate-lawyers'] },
  { type: 'links', eyebrow: 'Professional and health', heading: 'Professional and health clinics', intro: 'Searches for a trusted provider, where reviews and regulator-compliant content matter most.', cols: 3,
   items: ['industries/dentists', 'industries/accountants', 'industries/realtors', 'industries/chiropractors', 'industries/physiotherapists', 'industries/med-spas'] },
  { type: 'faq', eyebrow: 'FAQ', heading: 'Industries FAQ', items: [
     ['Do you only work with these industries?', 'No. These are the industries where we plan dedicated pages, because their customers search in distinctive ways. The same {{local SEO|services/local-seo}} principles work for most businesses that serve customers in Edmonton. [[List only industries where you have real client experience once the site launches.]]']] },
  { type: 'cta', heading: 'Do not see your industry?', text: 'Get a free SEO audit and we will show you how customers search for businesses like yours.', button: ['Get a free SEO audit', 'free-seo-audit'] },
 ]},

// ------------------------------------------------------------------ PLUMBERS
industry({
 slug: 'plumbers', nav: 'Plumbers', crumb: 'Plumbers', plural: 'plumbers', group: 'trades', icon: 'bolt', illus: 'map',
 title: 'SEO for Plumbers in Edmonton | More Calls from Google Maps',
 description: 'Rank for \'plumber near me\' and emergency plumbing searches in Edmonton. Local SEO for plumbing companies that want more booked jobs.',
 h1: 'SEO for Plumbers in Edmonton',
 lead: 'When a pipe bursts at 2 a.m. in January, nobody scrolls past the Map Pack. Plumbing SEO puts your company in front of Edmonton homeowners at the moment they need a plumber, and turns that search into a booked job.',
 card: 'Win emergency and "plumber near me" calls in Edmonton.',
 audience: 'Plumbing companies',
 why: ['Most plumbing searches are urgent and made on a phone: emergency plumber, frozen pipes, sewer backup. The searcher calls one of the first businesses they see, usually in the Google Map Pack, and rarely compares more than two or three.',
       'That makes plumbing SEO in Edmonton a speed-and-trust contest: a complete Google Business Profile, a page for each emergency service, a strong review count and accurate hours decide who gets the call.'],
 whyBullets: ['Emergency searches answered by the Map Pack', 'One page for each plumbing service', 'Reviews that mention the job and the neighbourhood'],
 serp: { query: 'emergency plumber edmonton', rows: ['Your plumbing company · Open 24 hours', 'Competitor plumbing', 'Directory listing'] },
 searchIntro: 'Your customers search by problem and by urgency, so your site and profile need to match both:',
 searches: [['plumber near me', 'the biggest search, decided mostly by the Map Pack'], ['emergency plumber edmonton', 'urgent, mobile, ready to call now'],
            ['frozen pipes / burst pipe repair', 'spikes during cold snaps'], ['hot water tank replacement', 'a planned, high-value job'],
            ['drain cleaning / sewer backup', 'urgent, often an insurance claim'], ['sump pump repair', 'spring runoff and heavy rain']],
 mapPack: {
  profile: 'Primary category "Plumber", 24/7 hours only if you truly answer, every service listed, and job photos from real Edmonton work.',
  pages: 'Separate pages for emergency plumbing, frozen pipes, hot water tanks, drain cleaning and sump pumps, each answering cost, timing and what to do while waiting.',
  reviews: 'Reviews that mention the job ("hot water tank", "burst pipe") and the area help relevance. We set up a simple request after every completed call.',
  citations: 'Consistent NAP on directories, plus links from suppliers, home builders and local associations you already work with.' },
 seasonal: ['Edmonton plumbing demand follows the weather. Frozen and burst pipe searches spike during deep cold snaps, and spring runoff and heavy summer rain bring sump pump and sewer backup calls.',
            'Your Business Profile, emergency page and reviews need to be strong before the first cold snap, not during it. We plan content and profile updates a season ahead. [[Add your own call volume by month, or a search trend chart for frozen pipe searches in Edmonton.]]'],
 trust: [['Licensed tradespeople', 'Alberta journeyperson plumber and gasfitter certificates named on the site'], ['Permits handled', 'Say when you pull City of Edmonton plumbing permits'],
         ['Insurance and WCB', 'Proof of liability insurance and WCB coverage'], ['Upfront pricing', 'Call-out fees and how quotes work, stated plainly'],
         ['Real photos', 'Your vans, team and finished jobs, not stock images'], ['Honest hours', '24/7 only if someone really answers']],
 results: [['Calls from your Business Profile', 'Google Business Profile performance'], ['Website calls and form leads', 'Call tracking and Google Analytics'],
           ['Map Pack position for key searches', 'Grid rank tracking across Edmonton'], ['Organic clicks to service pages', 'Google Search Console']],
 proof: '[[Add a dated Map Pack screenshot for "emergency plumber edmonton" and a real, anonymised client result used with permission.]]',
 nearby: 'Emergency calls come from wherever your trucks can reach in time, so we set your service area to match your real response radius.',
 faq: [
  ['How long does SEO take for plumbers in Edmonton?', 'Fixing your Business Profile and adding missing service pages can help within weeks; building the reviews and links to hold a top-three Map Pack spot in a competitive area usually takes months. We give you a written estimate after the audit, based on the plumbers you are up against.'],
  ['Should plumbers run Google Ads or SEO?', 'Often both at first. Ads and Local Services Ads bring calls immediately while SEO builds; SEO keeps working without paying per click once you rank. For emergency plumbing, many companies keep a small ad budget for peak cold snaps.'],
  ['How do we get more reviews?', reviewsAnswer('your technicians')],
  ['Can we rank in St. Albert and Sherwood Park too?', 'Yes, within reason. Your Map Pack reach depends on distance from your address, so we combine accurate service area settings, useful pages for the plumbing problems common in those towns, and reviews from customers there.']],
 services: ['services/local-seo', 'services/google-business-profile-optimization', 'services/google-ads-management', 'blog/how-edmonton-plumbers-get-more-google-maps-calls'],
}),

// ------------------------------------------------------------------ ELECTRICIANS
industry({
 slug: 'electricians', nav: 'Electricians', crumb: 'Electricians', plural: 'electricians', group: 'trades', icon: 'bolt', illus: 'map',
 title: 'SEO for Electricians in Edmonton | Get More Service Calls',
 description: 'Local SEO for Edmonton electricians and electrical contractors. Rank in Google Maps for residential and commercial electrical searches.',
 h1: 'SEO for Electricians in Edmonton',
 lead: 'Homeowners searching for an EV charger install and property managers searching for a commercial electrician want very different things. Electrician SEO gives each of them a page that answers their search, and puts your company in the Map Pack for both.',
 card: 'Residential and commercial electrical searches, both covered.',
 audience: 'Electricians and electrical contractors',
 why: ['Electrical work splits into two kinds of searcher: homeowners (panel upgrades, EV chargers, renovations, emergencies) and businesses (tenant improvements, maintenance, commercial service). Each looks for different proof and uses different words.',
       'Most electrician websites have one generic services page, so they rank for neither. Separate residential and commercial pages, a complete Business Profile and reviews that name the job are what move you into the Edmonton Map Pack.'],
 whyBullets: ['Residential and commercial intent split onto separate pages', 'Master Electrician and permit details up front', 'EV charger and panel upgrade pages for growing demand'],
 serp: { query: 'ev charger installation edmonton', rows: ['Your electrical company · Licensed', 'Competitor electric', 'Directory listing'] },
 searchIntro: 'Electrical searches are a mix of urgent repairs and planned projects:',
 searches: [['electrician near me', 'the main Map Pack search'], ['ev charger installation edmonton', 'growing demand, planned project'],
            ['panel upgrade', 'often needed for EV chargers, heat pumps and renovations'], ['electrical contractor / commercial electrician', 'business and property-manager intent'],
            ['emergency electrician', 'urgent, mobile, call now']],
 mapPack: {
  profile: 'Primary category "Electrician", with services split into residential and commercial and photos of real panels, chargers and job sites.',
  pages: 'A page each for EV charger installation, panel upgrades, renovations wiring and commercial electrical, plus an emergency page if you offer it.',
  reviews: 'Reviews that mention "EV charger" or "panel upgrade" help Google match you to those searches. We make asking for them part of job close-out.',
  citations: 'Consistent listings, plus links from builders, renovators, EV charger brands and associations you work with.' },
 seasonal: ['Electrical demand is steadier than most trades, but planned work such as EV charger installs and renovation wiring tends to peak in spring and summer, while winter brings more emergency and heating-related calls.',
            'We time new service pages and Business Profile posts ahead of those peaks. [[Add your own job mix by month to sharpen this section.]]'],
 trust: [['Master Electrician certificate', 'Alberta requires one to run an electrical contracting business'], ['Permits pulled', 'State that you obtain City of Edmonton electrical permits'],
         ['Safety Codes compliance', 'Work done to code under Alberta\'s Safety Codes Act'], ['Insurance and WCB', 'Coverage details on the site'],
         ['Warranty', 'What your workmanship warranty covers'], ['Real job photos', 'Panels, chargers and finished work']],
 results: [['Calls and quote requests', 'Google Business Profile and call tracking'], ['Residential vs commercial leads', 'Form fields and Google Analytics'],
           ['Map Pack position for key searches', 'Grid rank tracking across Edmonton'], ['Organic clicks per service page', 'Google Search Console']],
 proof: '[[Add a dated Map Pack screenshot for "electrician edmonton" and a real, anonymised client result used with permission.]]',
 nearby: 'Commercial work often spans the whole region, so commercial pages can target a wider area than residential service calls.',
 faq: [
  ['How long does SEO take for electricians in Edmonton?', 'Profile and on-page fixes can show results within weeks; competitive searches like "electrician near me" usually take several months of reviews, links and content. We set expectations in writing after the audit.'],
  ['Should electricians run Google Ads or SEO?', 'Ads bring calls while SEO builds, and suit urgent work. SEO pays off over time for planned, high-value jobs like EV charger installs and panel upgrades, where people research before they call.'],
  ['How do we get more reviews?', reviewsAnswer('your crews')],
  ['Can we rank in St. Albert and Sherwood Park too?', 'Yes. We set your service area to the towns you really cover and build service pages and reviews that support them. Map Pack reach still depends on distance from your address.']],
 services: ['services/local-seo', 'services/on-page-seo', 'services/google-business-profile-optimization'],
}),

// ------------------------------------------------------------------ HVAC
industry({
 slug: 'hvac', nav: 'HVAC and Furnace Companies', crumb: 'HVAC and Furnace Companies', plural: 'HVAC and furnace companies', group: 'trades', icon: 'speed', illus: 'growth',
 title: 'HVAC & Furnace Company SEO in Edmonton | Win Peak Season',
 description: 'Furnace repair, furnace cleaning and duct cleaning SEO for Edmonton. Be the company homeowners find first when the cold hits.',
 h1: 'SEO for HVAC & Furnace Companies in Edmonton',
 lead: 'In Edmonton, a furnace that stops in January is an emergency. HVAC SEO makes sure your company is the one homeowners find first when they search "furnace repair" in the cold, and the one they remember for cleaning, heat pumps and AC.',
 card: 'Be found first for furnace repair when the cold hits.',
 audience: 'HVAC and furnace companies',
 why: ['Furnace repair is one of the most urgent searches a homeowner makes in an Edmonton winter. The Map Pack and the first few results take nearly all of those calls, and the order is largely set before the season starts.',
       'HVAC SEO prepares your Business Profile, service pages and reviews before the first cold snap, then keeps them active through the season so you capture both no-heat emergencies and planned work like furnace cleaning and heat pump installation.'],
 whyBullets: ['Ready before the first cold snap', 'Emergency, maintenance and installation pages', 'Reviews that mention furnace repair and the neighbourhood'],
 serp: { query: 'furnace repair edmonton', rows: ['Your HVAC company · Open 24 hours', 'Competitor heating', 'Directory listing'] },
 searchIntro: 'HVAC searches change with the seasons, and each needs its own page:',
 searches: [['furnace repair edmonton', 'the core winter emergency search'], ['no heat emergency', 'urgent, mobile, call now'],
            ['furnace cleaning / duct cleaning', 'planned maintenance, often in fall'], ['heat pump installation', 'rising interest, research-heavy'],
            ['ac repair', 'summer heat waves']],
 mapPack: {
  profile: 'Primary category "HVAC contractor", heating and cooling services listed, accurate emergency hours and photos of real installs.',
  pages: 'Separate pages for furnace repair, furnace replacement, furnace and duct cleaning, heat pumps and AC, each explaining cost factors and timing.',
  reviews: 'Winter is when you do the most jobs, so it is when you should ask for the most reviews. We help you capture them while the season is busy.',
  citations: 'Consistent NAP plus links from equipment manufacturers, dealers and local home-improvement partners.' },
 seasonal: ['Furnace season, roughly from fall into spring, dominates HVAC demand in Edmonton: the first cold snap brings a surge of no-heat and repair searches, and fall brings furnace cleaning and tune-ups. Summer heat waves bring short, sharp AC repair spikes.',
            'We plan content and Business Profile updates a season ahead, so your pages are indexed and your profile is active before demand arrives. [[Add a seasonal search curve for furnace repair searches from your own data or Google Trends.]]'],
 trust: [['Certified technicians', 'Gas fitter certification and manufacturer training named'], ['Gas safety', 'Note that ATCO handles natural gas distribution and what to do if you smell gas'],
         ['24/7 no-heat service', 'Only if you really offer it'], ['Financing and warranties', 'Equipment and labour warranties stated clearly'],
         ['Insurance and WCB', 'Coverage details on the site'], ['Real install photos', 'Your furnaces, heat pumps and team']],
 results: [['No-heat and repair calls', 'Google Business Profile and call tracking'], ['Maintenance bookings', 'Online booking or form leads'],
           ['Map Pack position for furnace searches', 'Grid rank tracking across Edmonton'], ['Organic clicks by season', 'Google Search Console']],
 proof: '[[Add a dated Map Pack screenshot for "furnace repair edmonton" and a real, anonymised client result used with permission.]]',
 nearby: 'Winter emergencies are limited by how fast a technician can arrive, so service areas should reflect real response times.',
 faq: [
  ['How long does SEO take for HVAC and furnace companies in Edmonton?', 'Start before the season. Profile and on-page work can help within weeks, but competitive furnace searches need months of reviews, links and content, which is why spring and summer are the best time to begin.'],
  ['Should HVAC and furnace companies run Google Ads or SEO?', 'Many HVAC companies run ads during peak cold snaps for immediate calls and rely on SEO for steady, lower-cost leads the rest of the year. SEO also captures planned work like heat pump research that ads handle poorly.'],
  ['How do we get more reviews?', reviewsAnswer('your technicians during the busy season')],
  ['Can we rank in St. Albert and Sherwood Park too?', 'Yes, where you really serve. Accurate service areas, pages for heating problems common in those towns and reviews from customers there help you reach beyond the city.']],
 services: ['services/local-seo', 'services/google-business-profile-optimization', 'services/google-ads-management'],
}),

// ------------------------------------------------------------------ CONTRACTORS
industry({
 slug: 'contractors', nav: 'Renovation and General Contractors', crumb: 'Renovation and General Contractors', plural: 'renovation and general contractors', group: 'trades', icon: 'gear', illus: 'growth',
 title: 'SEO for Contractors in Edmonton | Renovation & General',
 description: 'Local SEO for Edmonton renovation and general contractors. Rank for kitchen, basement and home renovation searches that lead to big jobs.',
 h1: 'SEO for Renovation & General Contractors in Edmonton',
 lead: 'Renovation customers research for weeks before they call. Contractor SEO puts your portfolio, reviews and project pages in front of Edmonton homeowners planning a basement development, kitchen renovation or addition, so you are on the shortlist before they ask for quotes.',
 card: 'Basement, kitchen and home renovation searches that lead to big jobs.',
 audience: 'Renovation and general contractors',
 why: ['Renovation jobs are high-value and high-risk for the homeowner, so they compare portfolios, reviews and licences before calling anyone. Basement development is especially common in Edmonton, alongside kitchen and bathroom renovations and additions.',
       'Contractor SEO wins by showing proof: a project page for each type of work, before-and-after photos, reviews that mention project size and quality, and clear licensing and permit information.'],
 whyBullets: ['Project pages for each type of renovation', 'Portfolio and before-and-after photos', 'Licence, permit and warranty information up front'],
 serp: { query: 'basement development edmonton', rows: ['Your renovation company · Portfolio', 'Competitor builders', 'Directory listing'] },
 searchIntro: 'Renovation searches are planned and research-heavy, so each project type deserves its own page:',
 searches: [['basement development edmonton', 'very common in Edmonton, high value'], ['kitchen renovation', 'design-led, compares portfolios'],
            ['bathroom renovation', 'frequent, mid-size jobs'], ['home renovation contractor / general contractor near me', 'broad, Map Pack driven'],
            ['home additions', 'large projects with permits and long timelines']],
 mapPack: {
  profile: 'Primary category "General contractor" (check the exact category list), services matching your project pages and a steady stream of project photos.',
  pages: 'A page per project type with real photos, typical timelines, permit steps and what affects the price, instead of one long services list.',
  reviews: 'Reviews that describe the project ("basement development", "kitchen") and the result help both rankings and the homeowner\'s decision.',
  citations: 'Consistent listings plus links from suppliers, designers, industry associations such as CHBA Edmonton Region, and local media features.' },
 seasonal: ['Renovation planning picks up in late winter and spring, with exterior work and additions concentrated in the warmer months. Basement developments run year-round, which makes them a steady source of leads in winter.',
            'We publish project pages and portfolio updates ahead of the spring planning season. [[Add your own lead volume by month to sharpen this section.]]'],
 trust: [['Prepaid contractor licence', 'Alberta requires one when you take deposits before work is finished'], ['Permits', 'Explain how you handle City of Edmonton building permits'],
         ['WCB and insurance', 'Coverage details on the site'], ['Warranty', 'What your workmanship warranty covers'],
         ['Portfolio', 'Real before-and-after photos for each project type'], ['Association membership', 'For example CHBA Edmonton Region, only if real']],
 results: [['Quote requests by project type', 'Form fields and Google Analytics'], ['Calls from your Business Profile', 'Google Business Profile performance'],
           ['Rankings for project searches', 'Rank tracking across Edmonton'], ['Organic clicks to project pages', 'Google Search Console']],
 proof: '[[Add a dated Map Pack screenshot for "basement development edmonton" and a real, anonymised client result used with permission.]]',
 nearby: 'Large projects draw customers from across the region, so project pages can reasonably target homeowners in surrounding towns.',
 faq: [
  ['How long does SEO take for renovation and general contractors in Edmonton?', 'Project pages and profile fixes can start bringing enquiries within a few months; competitive searches such as "basement development edmonton" take longer, because they reward portfolios, reviews and links built over time.'],
  ['Should renovation and general contractors run Google Ads or SEO?', 'Ads can fill gaps quickly, but renovation clicks are expensive and homeowners research for weeks. SEO puts your portfolio in front of them throughout that research, which usually makes it the better long-term channel.'],
  ['How do we get more reviews?', reviewsAnswer('your project managers at handover')],
  ['Can we rank in St. Albert and Sherwood Park too?', 'Yes. Renovation customers travel further than emergency customers, so project pages and reviews from those towns can win searches there, alongside an accurate service area.']],
 services: ['services/local-seo', 'services/link-building', 'services/content-writing'],
}),

// ------------------------------------------------------------------ ROOFERS
industry({
 slug: 'roofers', nav: 'Roofing Companies', crumb: 'Roofing Companies', plural: 'roofing companies', group: 'trades', icon: 'shield', illus: 'map',
 title: 'SEO for Roofers in Edmonton | More Roofing Leads',
 description: 'Rank for roof repair and replacement searches in Edmonton. Local SEO for roofing companies, including hail and storm season demand.',
 h1: 'SEO for Roofing Companies in Edmonton',
 lead: 'After a hailstorm, hundreds of Edmonton homeowners search for a roofer within days. Roofing SEO makes sure your company is visible when that happens, and trusted enough to get the inspection.',
 card: 'Roof repair, replacement and storm-season searches.',
 audience: 'Roofing companies',
 why: ['Roofing demand arrives in waves: a summer hailstorm or windstorm can create weeks of work in a few days, and homeowners pick from the companies they see first in the Map Pack.',
       'Roofing SEO prepares for those waves with storm-damage and insurance-claim pages, a profile you can update quickly after an event, and reviews that show you finish the job properly.'],
 whyBullets: ['Storm and hail damage pages ready before the season', 'Insurance claim help explained clearly', 'Fast Business Profile updates after storms'],
 serp: { query: 'roof repair edmonton', rows: ['Your roofing company · Free inspection', 'Competitor roofing', 'Directory listing'] },
 searchIntro: 'Roofing searches mix urgent repairs with large, planned replacements:',
 searches: [['roof repair edmonton', 'urgent, often after a storm'], ['hail damage roof', 'storm-season spikes, insurance involved'],
            ['roof replacement cost', 'research before a big decision'], ['roofers near me', 'Map Pack driven'],
            ['roof inspection', 'spring and fall, and after storms']],
 mapPack: {
  profile: 'Primary category "Roofing contractor", services for repair, replacement and inspections, and photos of real roofs, crews and materials.',
  pages: 'Pages for roof repair, replacement, hail and storm damage, insurance claims and materials such as asphalt shingles and metal roofing.',
  reviews: 'Reviews after each completed roof, mentioning the work and the area, are the strongest signal a homeowner has that you finish well.',
  citations: 'Consistent listings plus links from material manufacturers, suppliers and local associations.' },
 seasonal: ['Summer brings hail and windstorms across Alberta, and with them sudden spikes in roof repair and hail damage searches. Spring and fall are inspection seasons, and winter brings ice dam problems.',
            'Content and profile updates go live before storm season, and after a named storm we update your profile and storm page quickly. [[Add the search spike after a named Edmonton hail event (with date) and how a client responded.]]'],
 trust: [['Safety certification', 'COR (Certificate of Recognition) if you hold it'], ['Insurance claim help', 'Explain how you work with insurers, without promising outcomes'],
         ['Warranties', 'Manufacturer and workmanship warranties stated clearly'], ['WCB and liability insurance', 'Coverage details on the site'],
         ['Local address', 'A real Edmonton presence, unlike out-of-town storm chasers'], ['Real roof photos', 'Before-and-after from your own jobs']],
 results: [['Inspection requests', 'Form leads and call tracking'], ['Calls from your Business Profile', 'Google Business Profile performance'],
           ['Rankings for storm searches', 'Rank tracking across Edmonton'], ['Organic clicks by month', 'Google Search Console']],
 proof: '[[Add a dated Map Pack screenshot for "roof repair edmonton" and a real, anonymised client result used with permission.]]',
 nearby: 'Storms do not stop at city limits, so we prepare pages and service areas for the towns your crews really cover.',
 faq: [
  ['How long does SEO take for roofing companies in Edmonton?', 'Start well before storm season. Profile and page fixes can help within weeks, while the reviews and links needed to rank for competitive roofing searches take months.'],
  ['Should roofing companies run Google Ads or SEO?', 'Ads help capture storm spikes quickly, but clicks get expensive when every roofer bids at once. SEO gives you steady visibility that does not depend on bidding against storm chasers.'],
  ['How do we get more reviews?', reviewsAnswer('your crews when each roof is finished')],
  ['Can we rank in St. Albert and Sherwood Park too?', 'Yes, where your crews really work. Service area settings, storm pages that cover those towns and reviews from customers there extend your reach.']],
 services: ['services/local-seo', 'services/link-building', 'services/website-design'],
}),

// ------------------------------------------------------------------ LAW FIRMS
industry({
 slug: 'law-firms', nav: 'Law Firms', crumb: 'Law Firms', plural: 'law firms', group: 'legal', icon: 'book', illus: 'doc',
 title: 'Law Firm SEO in Edmonton | More Qualified Client Inquiries',
 description: 'Ethical, compliant SEO for Edmonton law firms. Rank in Google Maps and organic results for the practice areas that matter most.',
 h1: 'SEO for Law Firms in Edmonton',
 lead: 'People looking for a lawyer are often facing one of the hardest moments of their lives. Law firm SEO helps them find your firm, understand how you can help and trust you enough to book a consultation, within the Law Society of Alberta\'s marketing rules.',
 card: 'Compliant SEO for the practice areas that matter most.',
 audience: 'Law firms',
 why: ['Legal searches are high-value and high-trust. Google treats legal topics as "Your Money or Your Life" content, where its quality raters look closely at experience, expertise, authoritativeness and trust.',
       'For a law firm, that means practice-area pages written or reviewed by the lawyers who do the work, lawyer bios with real credentials, a complete Business Profile and marketing that follows the Law Society of Alberta\'s Code of Conduct.'],
 whyBullets: ['Practice-area pages as the main ranking assets', 'Lawyer bios with real credentials and admissions', 'Compliance-first marketing'],
 serp: { query: 'lawyer near me', rows: ['Your law firm · Free consultation', 'Competitor law office', 'Lawyer directory'] },
 searchIntro: 'Legal searches combine practice area, location and the need for reassurance:',
 searches: [['lawyer near me / edmonton law firm', 'broad, Map Pack driven'], ['[practice area] lawyer edmonton', 'the searches practice-area pages win'],
            ['free consultation lawyer', 'ready to talk, comparing firms'], ['best lawyers edmonton', 'comparing reputation and reviews']],
 mapPack: {
  profile: 'Primary category "Law firm" or the closest practice-area category, each office as its own verified profile, and lawyer photos.',
  pages: 'One page per practice area, explaining the process in Alberta courts such as the Court of King\'s Bench and the Alberta Court of Justice, written or reviewed by your lawyers.',
  reviews: 'Client reviews matter in legal, but requests must respect confidentiality and the Law Society\'s rules. We set up a careful, compliant process.',
  citations: 'Consistent listings on legal and local directories, plus links from bar associations, community work and legal commentary in Edmonton media.' },
 seasonal: ['Legal demand is fairly steady through the year, with differences by practice area. Because there are few seasonal spikes, consistent content and steady reviews matter more than timing.',
            '[[Add any seasonal patterns you see in your own enquiries by practice area.]]'],
 trust: [['Law Society compliance', 'Marketing that follows Chapter 4 of the Code of Conduct and is never misleading'], ['Lawyer bios', 'Real names, years of call, practice areas and education'],
         ['Reviewed content', 'Practice-area pages reviewed by a practising lawyer'], ['Case results', 'Only with client consent and appropriate context'],
         ['Clear consultation terms', 'Whether consultations are free and what they include'], ['Office details', 'Real addresses that match your Business Profiles']],
 results: [['Consultation requests by practice area', 'Form fields and Google Analytics'], ['Calls from each office profile', 'Google Business Profile performance'],
           ['Rankings for practice-area searches', 'Rank tracking across Edmonton'], ['Organic clicks to practice pages', 'Google Search Console']],
 proof: '[[Add a dated Map Pack screenshot for a key legal search in Edmonton and a real, anonymised client result used with permission.]]',
 nearby: 'Clients often travel for the right lawyer, so practice-area pages can win searches across the region even where Map Pack reach is limited.',
 faq: [
  ['How long does SEO take for law firms in Edmonton?', 'Legal searches are competitive. Profile and practice-page improvements can help within a few months; ranking for broad terms such as "lawyer edmonton" usually takes longer and depends on content quality and links.'],
  ['Should law firms run Google Ads or SEO?', 'Legal clicks are among the most expensive in Google Ads. Many firms use ads for specific practice areas while SEO builds; strong practice-area pages then bring enquiries without paying per click.'],
  ['How do we get more reviews?', 'Ask clients at the end of a matter, in a way that respects confidentiality and the Law Society\'s rules, with a direct link to your Google review form. Reply professionally without confirming client details. Google does not allow paying or rewarding people for reviews.'],
  ['Can we rank in St. Albert and Sherwood Park too?', 'Yes. Each real office can have its own Business Profile, and practice-area pages can reach clients across the region. We never create profiles for offices you do not staff.']],
 services: ['services/local-seo', 'services/content-writing', 'services/ai-search-optimization'],
 sources: [['Law Society of Alberta: Code of Conduct (Chapter 4, Marketing)', 'https://documents.lawsociety.ab.ca/wp-content/uploads/2017/01/14211909/Code.pdf']],
}),

// ------------------------------------------------------------------ DENTISTS
industry({
 slug: 'dentists', nav: 'Dentists', crumb: 'Dentists', plural: 'dentists', group: 'health', icon: 'star', illus: 'star',
 title: 'Dental SEO in Edmonton | More New Patient Bookings',
 description: 'Local SEO for Edmonton dental clinics. Rank for \'dentist near me\', emergency dental and cosmetic searches and grow new patients.',
 h1: 'SEO for Dentists in Edmonton',
 lead: 'Most new patients choose a dentist from the Map Pack, after checking reviews, location and whether you are accepting new patients. Dental SEO makes sure your clinic wins that comparison, within the College of Dental Surgeons of Alberta\'s advertising standards.',
 card: 'More new patients from "dentist near me" searches.',
 audience: 'Dental clinics',
 why: ['Patients pick a dentist close to home or work, so the Map Pack decides most new-patient searches. They compare reviews, photos, hours and whether the clinic is accepting new patients.',
       'Dental SEO focuses on a complete Business Profile, service pages for emergency, cosmetic and family dentistry, steady reviews and clear information about insurance and the Canadian Dental Care Plan, all within CDSA advertising rules.'],
 whyBullets: ['"Accepting new patients" made obvious', 'Emergency, cosmetic and family dentistry pages', 'Advertising that follows CDSA standards'],
 serp: { query: 'dentist near me', rows: ['Your dental clinic · Accepting new patients', 'Competitor dental', 'Directory listing'] },
 searchIntro: 'Dental searches range from urgent pain to planned cosmetic work:',
 searches: [['dentist near me', 'the main Map Pack search'], ['emergency dentist edmonton', 'urgent, often same day'],
            ['dentist accepting new patients', 'ready to book'], ['dental implants / Invisalign', 'high-value, research first'],
            ['teeth whitening', 'cosmetic, price-sensitive']],
 mapPack: {
  profile: 'Primary category "Dentist", services listed, accurate hours including evenings and weekends, and real photos of the clinic and team.',
  pages: 'Pages for emergency dentistry, family dentistry, implants, Invisalign and whitening, plus an "accepting new patients" page that answers insurance and CDCP questions.',
  reviews: 'Patients read reviews closely before booking. We help you ask consistently and reply in a way that protects patient privacy.',
  citations: 'Consistent listings on health and local directories, plus links from community involvement and local partners.' },
 seasonal: ['Dental demand is steady, with bookings often rising toward the end of the year as patients use remaining insurance benefits before they reset.',
            'We plan "use your benefits" content and Business Profile posts ahead of that window. [[Add your own new-patient bookings by month to confirm this pattern.]]'],
 trust: [['CDSA standards', 'Advertising that follows the College of Dental Surgeons of Alberta\'s rules'], ['Dentist bios', 'Real names, education and registration'],
         ['Reviewed content', 'Clinical statements reviewed by a dentist'], ['Insurance and CDCP', 'State clearly whether you accept CDCP patients'],
         ['Accepting new patients', 'Kept up to date on the site and profile'], ['Real clinic photos', 'Your team, rooms and equipment']],
 results: [['New patient bookings', 'Booking system and form leads'], ['Calls from your Business Profile', 'Google Business Profile performance'],
           ['Map Pack position for "dentist" searches', 'Grid rank tracking across Edmonton'], ['Organic clicks by service', 'Google Search Console']],
 proof: '[[Add a real, anonymised result from an "accepting new patients" page and a dated Map Pack screenshot, used with permission.]]',
 nearby: 'Patients rarely travel far for routine care, so each clinic location should have its own accurate Business Profile.',
 faq: [
  ['How long does SEO take for dentists in Edmonton?', 'Profile improvements and an "accepting new patients" page can help within weeks; ranking in competitive neighbourhoods takes months of reviews and content.'],
  ['Should dentists run Google Ads or SEO?', 'Ads can bring new patients quickly, especially for high-value treatments like implants. SEO builds a steady flow of new patients from the Map Pack without paying per click.'],
  ['How do we get more reviews?', 'Ask patients after their appointment, by text or email, with a direct link to your Google review form, and reply without sharing any treatment details. Google does not allow paying or rewarding people for reviews.'],
  ['Can we rank in St. Albert and Sherwood Park too?', 'Map Pack reach is limited by distance, so each real clinic location needs its own profile. Treatment pages can still reach patients across the region in the regular results.']],
 services: ['services/local-seo', 'services/google-business-profile-optimization', 'services/ai-search-optimization'],
 sources: [['College of Dental Surgeons of Alberta: Advertising information', 'https://cdsab.ca/public-protection/advertising-information/']],
}),
];

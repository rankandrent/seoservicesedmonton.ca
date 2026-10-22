// Core pages: home, about, team, how we work, contact, free SEO audit, pricing, thank you, legal, 404.
// Written from the briefs in plan/content-plan.json. Real-world facts stay as [[placeholders]] until supplied.
// Inline marks: [[placeholder]]  **bold**  {{link text|slug}}  ({{text|}} links to the homepage)
import type { Page } from './types';

const UPDATED = '2026-10-23';
const G_HIRE = ['Google Search Central: Do you need an SEO?', 'https://developers.google.com/search/docs/fundamentals/do-i-need-seo'];
const TOWNS = '{{St. Albert|areas/st-albert}}, {{Sherwood Park|areas/sherwood-park}}, {{Spruce Grove|areas/spruce-grove}}, {{Leduc|areas/leduc}} and {{Fort Saskatchewan|areas/fort-saskatchewan}}';
const POSTS = ['blog/how-google-ranks-local-businesses', 'blog/ai-overviews-and-your-website', 'blog/choosing-an-seo-agency-in-edmonton'];

// One value per fact, reused everywhere it appears (audit F24, F25). Replace the placeholders once, here.
export const PRICE = {
  local: '[[Local package price range in CAD]]',
  growth: '[[Growth package price range in CAD]]',
  ecommerce: '[[Ecommerce package price range in CAD]]',
  term: '[[Contract term, for example month to month]]',
};
export const FREE_AUDIT = {
  turnaround: '[[0]] business days',
  format: '[[short video or PDF]]',
};

const PACKAGES = [
  { name: 'Local', price: `${PRICE.local} / month`, for: 'For single-location businesses that want more calls from Google Maps.',
    features: ['Google Business Profile management', 'Local citations and name, address and phone (NAP) clean-up', 'Review request process', 'Map Pack rank tracking', 'Monthly report and call'] },
  { name: 'Growth', badge: 'Most chosen', featured: true, price: `${PRICE.growth} / month`, for: 'For businesses ready to rank across all their services.',
    features: ['Everything in Local', 'Technical SEO fixes', 'On-page optimization', 'New content every month', 'Link building outreach'] },
  { name: 'Ecommerce', price: `${PRICE.ecommerce} / month`, for: 'For Shopify and WooCommerce stores selling online.',
    features: ['Category and product page SEO', 'Product structured data', 'Merchant Center alignment', 'Technical and speed work', 'Revenue-focused reporting', 'Business Profile management (optional)'] },
];

const OWN = 'Everything. Content, technical fixes, reports and account access stay with you. We work inside your own Google Search Console, Google Analytics and Google Business Profile, so nothing is lost if we stop working together.';

// The same four process steps on every page that describes them (audit F22).
const STEP_AUDIT = 'Audit';
const STEP_PLAN = 'Plan';
const STEP_BUILD = 'Build';
const STEP_REPORT = 'Report';

export const PAGES: Page[] = [
// ------------------------------------------------------------------ HOME
{
 slug: '', nav_label: 'Home', icon: 'spark', updated: UPDATED, keyword: 'edmonton seo services',
 title: 'Edmonton SEO Services | Local SEO That Drives Calls',
 description: 'Edmonton SEO services for local businesses. We help trades, law firms and clinics rank in Google Maps and turn searches into calls. Get a free SEO audit.',
 sections: [
  { type: 'hero_home', eyebrow: 'SEO agency in Edmonton, Alberta',
   h1: 'Edmonton SEO Services That Bring Real Calls and Leads',
   lead: 'Our Edmonton SEO services help local businesses in Edmonton, Alberta show up in Google Maps and search results when nearby customers are ready to buy. We use search engine optimization (SEO) to turn those searches into calls, bookings and sales.',
   cta: ['Get a Free SEO Audit', 'free-seo-audit'], cta2: ['See Our Services', 'services'],
   proof: ['Free SEO audit, no obligation', 'Reply within one business day', 'Every change shared with you'],
   photo: 'https://images.unsplash.com/photo-1743865319740-32121cae5959?auto=format&fit=crop&w=1000&q=80', photo_alt: 'Business owner working on her website on a laptop at home' },
  { type: 'tools', label: 'We work inside the tools Google gives site owners', items: ['Search Console', 'Google Analytics', 'Business Profile', 'PageSpeed Insights', 'Merchant Center'] },
  { type: 'feature_cards', heading: 'Edmonton SEO services built around calls, not just rankings',
   intro: '**As an SEO company in Edmonton, we tie every piece of work to the calls, forms and bookings it produces, because rankings only matter when they bring customers.**',
   items: [{ illus: 'search', title: 'Be found first', text: 'Rank for the services you sell when nearby customers search, in both the Map Pack and the regular results.' },
           { illus: 'target', title: 'Reach ready buyers', text: 'Search traffic comes from people already looking for what you offer, so visits turn into enquiries.' },
           { illus: 'growth', title: 'Growth that compounds', text: 'Organic results do not charge per click. Good pages and a strong Business Profile keep working month after month.' }]},
  { type: 'service_list', eyebrow: 'What we do', heading: 'Edmonton SEO services we offer',
   intro: '**Our Edmonton SEO services cover local search, your website and your content, and you can pick one service or combine them into a single plan.** Most businesses start with an audit, then fix {{technical SEO|services/technical-seo}} problems before growth work. See {{our SEO services|services}} side by side.',
   items: ['services/local-seo', 'services/google-business-profile-optimization', 'services/technical-seo', 'services/on-page-seo', 'services/link-building', 'services/content-writing', 'services/seo-audit', 'services/ecommerce-seo', 'services/ai-search-optimization'] },
  { type: 'cards', eyebrow: 'Who we help', heading: 'Industries we help in Edmonton', cols: 3,
   intro: '**Our Edmonton SEO services are built for trades, law firms and clinics, because customers search differently in each industry.** See {{industries we serve|industries}} for every page.',
   items: [{ icon: 'gear', title: 'Trades and home services', text: '{{Plumbing SEO|industries/plumbers}}, heating, ventilation and air conditioning ({{HVAC SEO|industries/hvac}}), {{electrician SEO|industries/electricians}}, {{roofing SEO|industries/roofers}} and {{contractor SEO|industries/contractors}}, where urgent mobile searches decide who gets the call.' },
           { icon: 'book', title: 'Law firms', text: '{{Law firm SEO|industries/law-firms}} that follows the Law Society of Alberta\'s marketing rules and wins practice-area searches.' },
           { icon: 'star', title: 'Professional and health clinics', text: '{{Dental SEO|industries/dentists}} and other clinics, where reviews and "accepting new patients" pages drive bookings.' }]},
  { type: 'steps', eyebrow: 'How we work', heading: 'How our Edmonton SEO services run', bg: 'soft',
   intro: '**Our Edmonton SEO services run in four steps, audit, plan, build and report, so you always know what happens next and why.**',
   items: [[STEP_AUDIT, 'We review your site, Business Profile, competitors and current rankings.'], [STEP_PLAN, 'You get a written plan with priorities, expected outcomes and timelines.'],
           [STEP_BUILD, 'We fix, write and optimize, logging every change we make.'], [STEP_REPORT, 'Monthly reports show calls, leads, rankings and traffic in plain language.']]},
  { type: 'split', eyebrow: 'Local search', heading: 'How Google ranks local businesses', reverse: true,
   body: ['**Google uses three main factors to rank local businesses in the Map Pack, the three businesses Google shows on a map above the regular results.** They are **relevance** (how well your profile matches the search), **distance** (how far you are from the searcher) and **prominence** (how well known your business is, including links and reviews).',
          'We cannot move your address, so we work on the two factors you can influence with {{local SEO|services/local-seo}} and {{Google Business Profile optimization|services/google-business-profile-optimization}}. Read {{how Google ranks local businesses|blog/how-google-ranks-local-businesses}} for the full guide.'],
   bullets: ['Complete, accurate Business Profile details, so relevance matches what people search', 'A steady flow of genuine customer reviews, which feed prominence in the Map Pack', 'Links and mentions from trusted Edmonton sites, which Google counts toward prominence'],
   visual: 'map', vdata: { title: 'Your Business Profile', sub: 'Open now · Edmonton, AB' }},
  { type: 'split', eyebrow: 'Where we work', heading: 'Edmonton SEO services across the region', bg: 'soft', visual: 'cards',
   vdata: { items: [['pin', 'Edmonton', 'Core service area'], ['map', 'Nearby towns', 'St. Albert, Sherwood Park, Spruce Grove'], ['compass', 'And beyond', 'Leduc, Fort Saskatchewan, Stony Plain, Beaumont']] },
   body: [`**Our Edmonton SEO services cover businesses across the Edmonton region, including ${TOWNS}, plus Stony Plain and Beaumont.**`,
          'Search results change from one part of the region to another, so a business in a nearby town gets the same SEO services Edmonton companies do, with rankings tracked from each area it serves, not from one point in the city.']},
  { type: 'packages', eyebrow: 'Pricing', heading: 'Edmonton SEO services pricing', bg: '', items: PACKAGES,
   intro: '**Our Edmonton SEO services are sold as monthly packages, and each package lists exactly what is included.** See full {{SEO pricing|pricing}}, or {{get a free SEO audit|free-seo-audit}} first.' },
  { type: 'faq', eyebrow: 'FAQ', heading: 'Edmonton SEO FAQ',
   intro: 'Answers on timelines, cost, guarantees, finding an agency, AI tools, service area and ownership.',
   items: [
     ['How long does SEO take to work in Edmonton?', 'It depends on your site, your competition and how much work is needed. Google suggests asking any SEO what results they expect and in what timeframe, so we answer that in writing after your audit. We do not promise dates we cannot back up.'],
     ['How much do SEO services cost in Edmonton?', `Our Local package is ${PRICE.local} per month, Growth is ${PRICE.growth} and Ecommerce is ${PRICE.ecommerce}, depending on how many services, pages and locations you need. See {{SEO pricing|pricing}} for what each package includes.`],
     ['Can you guarantee a #1 ranking on Google?', 'No. Google says no one can guarantee a #1 ranking, and we agree. What we commit to is a clear plan, the work we said we would do and honest monthly reporting on calls, leads and rankings.'],
     ['What does an Edmonton SEO agency do?', 'An Edmonton SEO agency improves how your business shows up in Google Search and Google Maps through local SEO, technical fixes, content and links. Some businesses hire a single SEO consultant or SEO expert instead; ask either one the same questions about results, timeframes and Google Search Essentials before you hire.'],
     ['Where can I find SEO services in Edmonton?', 'You can find SEO services in Edmonton by comparing agencies\' Google Maps listings and reviews, agency directories and referrals from other owners, then interviewing two or three. Our guide on {{how to choose an SEO agency|blog/choosing-an-seo-agency-in-edmonton}} lists the questions Google suggests asking and the red flags to avoid.'],
     ['What is the 80/20 rule in SEO?', 'The 80/20 rule in SEO is a rule of thumb, not a measured law: a small share of pages and tasks usually drives most of the results. For a local business that is often the Google Business Profile, the top service pages and reviews, which is why every engagement starts with an audit that finds those few priorities.'],
     ['Can ChatGPT do SEO?', 'No, not on its own. ChatGPT can help with drafts and keyword ideas, but it cannot see your Search Console data, check your Business Profile or take responsibility for the result, so a person still checks every fact and change. Our {{AI search optimization|services/ai-search-optimization}} service covers how AI tools find and cite businesses.'],
     ['Do you work with businesses outside Edmonton?', `Yes, across the Edmonton region, including ${TOWNS}. Our focus on this region is what lets us learn its search results closely.`],
     ['What do I own if we stop working together?', OWN]]},
  { type: 'posts', eyebrow: 'Blog', heading: 'SEO advice from our blog',
   intro: '**Our blog explains local SEO from Google\'s own documentation, with every source linked.** Browse all our {{local SEO guides|blog}}.', items: POSTS },
  { type: 'cta', heading: 'Ready to grow your Edmonton business on Google?', text: 'Get a free SEO audit. We will look at your site and Business Profile and tell you what to fix first.', button: ['Get a Free SEO Audit', 'free-seo-audit'] },
 ]},

// ------------------------------------------------------------------ ABOUT
{
 slug: 'about', nav_label: 'About', icon: 'users', page_type: 'AboutPage', updated: UPDATED,
 title: 'About Our Edmonton SEO Team | Who We Are',
 description: 'About our Edmonton SEO team, who we are, how we work and the rules we follow to help businesses in Edmonton, Alberta grow through Google search.',
 card: 'Who we are and what we believe.',
 sections: [
  { type: 'page_hero', eyebrow: 'About us', h1: 'About Our Edmonton SEO Team', lead: 'We are a search engine optimization (SEO) team serving businesses in Edmonton, Alberta, and we follow one rule: every piece of work should be visible, measurable and tied to a business result. Our {{Edmonton SEO services|}} are built around that rule.' },
  { type: 'split', eyebrow: 'Our story', heading: 'Our story', visual: 'cards',
   vdata: { items: [['pin', 'Edmonton focus', 'Local market focus'], ['chart', 'Reports you can read', 'Calls, leads, rankings'], ['shield', 'Search Essentials first', 'No shortcuts'], ['handshake', 'You own everything', 'Content and accounts']] },
   body: ['[[Add your founding story in the founder\'s own words: who started the agency, when, and why.]]',
          'Our services are built for trades, law firms and clinics across Edmonton and nearby towns. [[Add years in business, team size, the industries you have real client experience in, and the real street address that matches your Google Business Profile.]]']},
  { type: 'cards', eyebrow: 'Values', heading: 'What we believe', bg: 'soft', cols: 3,
   intro: '**Our Edmonton SEO team works by three values, transparency, Google Search Essentials and business outcomes, and each one shapes how we report to you.**',
   items: [
     { icon: 'eye', title: 'Transparency', text: 'We log every change and share it with you. No black box, and no work you cannot see.' },
     { icon: 'shield', title: 'Search Essentials first', text: 'We follow Google Search Essentials and its spam policies, and avoid tactics that put your site at risk.' },
     { icon: 'target', title: 'Business outcomes', text: 'We report on calls, bookings and sales, not only rankings.' }]},
  { type: 'team', eyebrow: 'Our team', heading: 'Meet the team',
   intro: '**These are the roles that would work on your account, and each bio will be written and approved by the person it describes.** Full bios are on {{meet the team|team}}.',
   items: [['[[Name]]', '[[Founder and Lead SEO Strategist]]'], ['[[Name]]', '[[Technical SEO Lead]]'], ['[[Name]]', '[[Content Lead]]'], ['[[Name]]', '[[Local SEO Specialist]]']] },
  { type: 'steps', eyebrow: 'Working with us', heading: 'Working with us', bg: 'soft',
   intro: '**Working with our Edmonton SEO team follows the same four steps every time, audit, plan, build and report.** See {{how we work|how-we-work}} for the detail behind each step.',
   items: [[STEP_AUDIT, 'A short call and a look at your site and Business Profile, starting with a free SEO audit.'], [STEP_PLAN, 'A written plan with priorities and expected outcomes.'],
           [STEP_BUILD, 'Fixes, content and outreach, each one logged.'], [STEP_REPORT, 'A monthly report and call to go through results and next steps.']]},
  { type: 'faq', eyebrow: 'FAQ', heading: 'About us FAQ', intro: 'Who works on your account, where we are based, guarantees and what you keep.', items: [
     ['Who will work on my account?', 'A named strategist owns your plan and your monthly review, supported by our technical, content and outreach specialists. You will know who they are before you sign.'],
     ['Are you based in Edmonton?', 'Yes. Our office is at [[Street address]], Edmonton, AB [[Postal code]], and we work with businesses across the Edmonton region.'],
     ['Do you guarantee rankings?', 'No. Google says no one can guarantee a #1 ranking on Google, so we do not promise one. We commit to a written plan, the work in it and an honest monthly report on calls, leads and rankings.'],
     ['What do I keep if we stop working together?', OWN]]},
  { type: 'links', eyebrow: 'Get to know us', heading: 'More about us', intro: 'Meet the team, read our process and editorial policy, or get in touch.', items: ['team', 'how-we-work', 'case-studies', 'contact'] },
  { type: 'cta', heading: 'Let\'s talk about your search goals', text: 'Contact our team or start with a free SEO audit.', button: ['Get a free SEO audit', 'free-seo-audit'] },
 ]},

// ------------------------------------------------------------------ TEAM
{
 slug: 'team', nav_label: 'Our Team', icon: 'users', page_type: 'CollectionPage', updated: UPDATED, keyword: 'edmonton seo team',
 title: 'Edmonton SEO Team | The People Behind Our Work',
 description: 'Meet the Edmonton SEO team behind our work, with real names, roles and experience, and the local search topics each strategist and specialist knows best.',
 card: 'The people behind the work.',
 sections: [
  { type: 'page_hero', eyebrow: 'Our team', h1: 'Meet Our Edmonton SEO Team', lead: 'Our Edmonton SEO team is made of real people with real experience in local search engine optimization (SEO) for businesses in Edmonton, Alberta. Every bio on this page is written and approved by the person it describes, and each person works on our {{Edmonton SEO services|}}.' },
  { type: 'team', eyebrow: 'Leadership', heading: 'Leadership',
   intro: '**The leadership of our Edmonton SEO team owns strategy and client results, and each leader is named here once their bio is approved.**',
   items: [['[[Name]]', '[[Founder and Lead SEO Strategist]]'], ['[[Name]]', '[[Head of Client Strategy]]']] },
  { type: 'team', eyebrow: 'Specialists', heading: 'Strategy, technical and content', bg: 'soft',
   intro: '**Our Edmonton SEO team\'s specialists cover technical SEO, content, local SEO and outreach, so each part of your plan has an owner.**',
   items: [['[[Name]]', '[[Technical SEO Lead]]'], ['[[Name]]', '[[Content Lead]]'], ['[[Name]]', '[[Local SEO Specialist]]'], ['[[Name]]', '[[Outreach Specialist]]']] },
  { type: 'steps', eyebrow: 'Your account', heading: 'How we work together on your account',
   intro: '**On every account, one strategist leads, specialists do the work and you approve every change.** Read {{how we work|how-we-work}} for our process and editorial policy, or learn more {{about us|about}}.',
   items: [['Your strategist', 'Owns your plan, priorities and monthly review.'], ['Technical', 'Handles site structure, speed, indexing and structured data.'],
           ['Content and outreach', 'Writes pages and earns links.'], ['You', 'Approve changes and see every one logged.']]},
  { type: 'links', eyebrow: 'Next steps', heading: 'More about how we work', intro: 'Read about us, our process, or get in touch.', items: ['about', 'how-we-work', 'contact'] },
  { type: 'cta', heading: 'Want this team working on your site?', text: 'Get a free SEO audit and meet the people who would run your account.', button: ['Get a free SEO audit', 'free-seo-audit'] },
 ]},

// ------------------------------------------------------------------ HOW WE WORK
{
 slug: 'how-we-work', nav_label: 'How We Work', icon: 'compass', updated: UPDATED,
 title: 'How We Work | Our SEO Process and Editorial Policy',
 description: 'How we work on every SEO project, from audit to monthly report, plus our editorial policy on who writes, how facts are checked and how errors are fixed.',
 card: 'Our process and editorial standards.',
 sections: [
  { type: 'page_hero', eyebrow: 'How we work', h1: 'How We Work', lead: 'How we work comes down to what we do, how we check it and what we will never do. This page is the standard behind our {{Edmonton SEO services|}} for every client in Edmonton, Alberta and every page we publish.' },
  { type: 'steps', eyebrow: 'Process', heading: 'Our process', bg: 'soft',
   intro: '**Our search engine optimization (SEO) process has four steps, audit, plan, build and report, and nothing starts until you approve the plan.**',
   items: [
     [STEP_AUDIT, 'We review your website, Google Business Profile, competitors and current rankings, using your own Search Console and Analytics data.'],
     [STEP_PLAN, 'You get a written plan with priorities, expected outcomes and timelines. Nothing starts until you approve it.'],
     [STEP_BUILD, 'We fix, write and optimize. Every change is logged with the date, the page and the reason.'],
     [STEP_REPORT, 'A monthly report and call covering calls, leads, rankings and traffic, and what comes next.']]},
  { type: 'prose', blocks: [
     ['h2', 'Editorial policy'],
     ['p', '**Our editorial policy holds every page and guide we publish, for clients and on this site, to the same standard of named authors, checked facts and visible dates.** It follows Google\'s guidance on helpful, reliable content, which describes experience, expertise, authoritativeness and trustworthiness (E-E-A-T) and says trust matters most.'],
     ['h3', 'Who writes and reviews'],
     ['p', 'Every page is written by a named member of {{our team|team}} and reviewed by a second person before publishing. Pages on legal or health topics are to be reviewed by a practising professional in that field; until a reviewer is named on a page, that page does not claim a professional review. [[Name the legal and health reviewers once they have agreed and their bios are live.]]'],
     ['h3', 'Fact-checking and sources'],
     ['p', 'We check claims against primary sources such as Google Search Central, Google Business Profile Help and the relevant regulator, and we link to them. We follow Google Search Essentials, and we do not publish statistics we cannot source.'],
     ['h3', 'Use of AI tools'],
     ['p', '[[State whether and how your team uses AI tools. For example: AI may help with research and first drafts, but a named person checks every fact, rewrites the page in our own words and takes responsibility for it.]]'],
     ['h3', 'Updates and corrections'],
     ['p', 'Our guides show when they were published or last updated, and we change that date only when the content really changes. We review our guides when Google changes its documentation. If you spot an error, {{contact us|contact}} and we will correct it and note the change.']] },
  { type: 'checklist', eyebrow: 'Our rules', heading: 'What we never do',
   intro: '**We never guarantee rankings, buy links, fake reviews or hide our work, because each of these breaks Google\'s rules or your trust.**',
   items: [
     ['Guarantee rankings', 'Google says no one can guarantee a #1 ranking'], ['Buy links', 'Google\'s spam policies treat buying links for ranking purposes as link spam'],
     ['Fake or incentivized reviews', 'Against Google\'s Maps contribution policy'], ['Create fake locations', 'Google says a virtual office is not eligible for a Business Profile'],
     ['Hide what we change', 'Every change is logged and shared'], ['Hold your accounts hostage', 'You own your accounts, content and data']]},
  { type: 'prose', blocks: [['src', [G_HIRE, ['Google Search Central: Spam policies', 'https://developers.google.com/search/docs/essentials/spam-policies'], ['Google Search Central: Creating helpful, reliable, people-first content', 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content'], ['Google Business Profile Help: Guidelines for representing your business', 'https://support.google.com/business/answer/3038177?hl=en'], ['Google Maps contribution policy', 'https://support.google.com/contributionpolicy/answer/7400114?hl=en']]]] },
  { type: 'links', eyebrow: 'More about us', heading: 'Get to know us', intro: 'Read about us, meet our team or start with a free SEO audit.', items: ['about', 'team', 'free-seo-audit'] },
  { type: 'cta', heading: 'See how this would work for your business', text: 'Start with a free SEO audit.', button: ['Get a free SEO audit', 'free-seo-audit'] },
 ]},

// ------------------------------------------------------------------ CONTACT
{
 slug: 'contact', nav_label: 'Contact', icon: 'mail', page_type: 'ContactPage', updated: UPDATED,
 title: 'Contact Our Edmonton SEO Team | Free Consultation',
 description: 'Contact our Edmonton SEO team for a free consultation. Call, email or send a message and we reply within one business day with clear next steps.',
 card: 'Call, email or send us a message.',
 sections: [
  { type: 'page_hero', eyebrow: 'Contact', h1: 'Contact Our Edmonton SEO Team', lead: 'Contact us for a free SEO consultation about your business in Edmonton, Alberta. A free consultation carries no obligation. Tell us what you need from our {{Edmonton SEO services|}} and we reply within one business day with clear next steps.' },
  { type: 'contact', eyebrow: 'Get in touch', heading: 'Get in touch',
   intro: '**Call, email or send a message to contact our team; our name, address and phone are the same as on our Google Business Profile.**',
   info: [['pin', 'Office', '[[Street address]], Edmonton, AB [[Postal code]]'], ['phone', 'Phone', '[[Phone number]]'], ['mail', 'Email', '[[Email address]]'], ['clock', 'Hours', '[[Business hours]]']],
   form_title: 'Send us a message', services: ['Free SEO audit', 'Local SEO', 'Google Business Profile', 'Technical SEO', 'On-Page SEO', 'Link Building', 'SEO Content Writing', 'SEO Audit', 'Ecommerce SEO', 'AI Search Optimization', 'Not sure yet'],
   note: 'We reply within one business day. Your details are used only to respond to your enquiry. See our {{privacy policy|privacy-policy}} and {{terms of service|terms}}.' },
  { type: 'steps', eyebrow: 'What happens next', heading: 'What happens after you contact us', bg: 'soft',
   intro: '**After you contact us, we reply within one business day, book a short call and, if it makes sense, prepare a free search engine optimization (SEO) audit.**',
   items: [['We reply', 'Within one business day.'], ['Quick call', 'A 30 minute chat about your goals.'], ['Free SEO audit', 'We look at your site and Business Profile and share what we find.']]},
  { type: 'faq', eyebrow: 'FAQ', heading: 'Contact FAQ', intro: 'What happens after you send a message, and how fast we reply.', items: [
     ['What happens after I contact you?', 'We reply within one business day to book a short call. If it makes sense, we then prepare a {{free SEO audit|free-seo-audit}} of your site and Business Profile, with no obligation.'],
     ['How fast do you reply?', 'Within one business day, during our office hours of [[Business hours]].']]},
 ]},

// ------------------------------------------------------------------ FREE SEO AUDIT
{
 slug: 'free-seo-audit', nav_label: 'Free SEO Audit', icon: 'audit', updated: UPDATED, keyword: 'free seo audit edmonton',
 title: 'Free SEO Audit Edmonton | Checked by a Person',
 description: 'Free SEO audit Edmonton businesses can act on. A person checks your website, Google Business Profile and Map Pack competitors and sends clear next steps.',
 card: 'A free local SEO snapshot with clear next steps.',
 service: 'Free local SEO audit', offer_price: '0',
 sections: [
  { type: 'page_hero', eyebrow: 'Free SEO audit', h1: 'Free SEO Audit Edmonton, Checked by a Person',
   lead: 'This free SEO audit Edmonton businesses can request shows why competitors outrank you in Google Maps and search, and what to fix first. A person from {{our team|team}}, not a tool, compares your website and Google Business Profile with the businesses that win your searches in Edmonton, Alberta. It is free, carries no obligation and is written for business owners, not search engine optimization (SEO) specialists.' },
  { type: 'checklist', eyebrow: 'What we check', heading: 'What your free audit covers', bg: '',
   intro: '**Your free SEO audit is a local SEO audit of six areas, including a Google Business Profile audit and a competitor comparison with the businesses that outrank you.**',
   items: [
     ['Google Business Profile', 'Categories, services, hours, photos and reviews'], ['Map Pack competitors', 'The three businesses Google shows on a map above the regular results for your main search, and why they win'],
     ['Site speed and mobile', 'How fast and usable your key pages are'], ['On-page basics', 'Titles, headings and service pages'],
     ['Reviews', 'Count, rating, recency and replies compared with competitors'], ['Citations', 'Whether your name, address and phone (NAP) match across the web']]},
  { type: 'steps', eyebrow: 'Process', heading: 'How it works', bg: 'soft',
   intro: `**The free SEO audit takes three steps, and the audit report reaches you within ${FREE_AUDIT.turnaround}.**`,
   items: [
     ['Request', 'Send your website and main service below.'], ['We review', 'A person checks your site, profile and competitors.'], ['You receive', `Your free audit report as a ${FREE_AUDIT.format} within ${FREE_AUDIT.turnaround}, with clear next steps.`]]},
  { type: 'contact', eyebrow: 'Request your audit', heading: 'Request your audit',
   intro: '**To request your free SEO audit, we need only your website and the main service you want to rank for.** There is no obligation and no automated report.',
   info: [['clock', 'Turnaround', FREE_AUDIT.turnaround], ['doc', 'Format', FREE_AUDIT.format], ['shield', 'Cost', 'Free, no obligation']],
   form_title: 'Request your free audit', services: ['Free SEO audit', 'Local SEO', 'Google Business Profile', 'Not sure yet'],
   note: 'Your details are used only to prepare your audit and reply to you. See our {{privacy policy|privacy-policy}}.' },
  { type: 'faq', eyebrow: 'FAQ', heading: 'Free audit FAQ', intro: 'Cost, timing, what you need to send and how the free audit differs from a full SEO audit.', items: [
     ['Is the audit really free?', 'Yes. There is no cost and no obligation. If we can help, we will tell you how; if we cannot, we will say so.'],
     ['How long does it take?', `Usually ${FREE_AUDIT.turnaround} from your request. You receive it as a ${FREE_AUDIT.format}.`],
     ['What do you need from me?', 'Your website address and the main service you want to rank for. With those, we can check your Business Profile, your key pages and the competitors who outrank you.'],
     ['What happens after the audit?', 'You decide. The audit report lists what to fix first, and you can act on it yourself, ask us for a quote or do nothing at all. If you want to see what working together looks like, read {{how we work|how-we-work}}.'],
     ['What is the difference between the free audit and the paid SEO audit?', 'The free audit is a quick local snapshot: your Business Profile, top on-page issues and your Map Pack competitors. The {{full SEO audit|services/seo-audit}} is a complete technical, on-page, local, link and content review with a prioritized fix list and walkthrough call.'],
     ['How should I judge the audit?', 'Judge it the way Google suggests judging any SEO provider: by whether the findings are specific, explained and free of ranking guarantees. Our guide on {{how to choose an SEO agency|blog/choosing-an-seo-agency-in-edmonton}} lists the questions to ask, and our {{Edmonton SEO services|}} page shows what we do after the audit.']]},
 ]},

// ------------------------------------------------------------------ PRICING
{
 slug: 'pricing', nav_label: 'Pricing', icon: 'layers', updated: UPDATED, keyword: 'seo pricing edmonton',
 title: 'SEO Pricing Edmonton | Monthly Packages in CAD',
 description: 'SEO pricing Edmonton businesses can compare. See monthly packages in CAD, what each plan includes, contract terms and what affects the cost before you commit.',
 card: 'Packages, price ranges and what is included.',
 sections: [
  { type: 'page_hero', eyebrow: 'Pricing', h1: 'SEO Pricing Edmonton, Packages and What Is Included',
   lead: 'This SEO pricing Edmonton businesses can compare lists each monthly search engine optimization (SEO) package with its price range in Canadian dollars (CAD) and exactly what is included. It applies to businesses in Edmonton, Alberta and nearby towns, so you know what you are paying for before you commit to our {{Edmonton SEO services|}}.' },
  { type: 'packages', eyebrow: 'Packages', heading: 'Packages', items: PACKAGES,
   intro: '**We offer three SEO packages, Local, Growth and Ecommerce, each with a monthly price range and a list of what is included.** The Ecommerce package covers {{ecommerce SEO|services/ecommerce-seo}} for online stores.' },
  { type: 'table', eyebrow: 'Compare', heading: 'Compare what is included', bg: 'soft',
   intro: '**This table compares what each SEO package includes, row by row, including what is not included and the contract term.**',
   cols: ['Feature', 'Local', 'Growth', 'Ecommerce'],
   rows: [['Monthly price range', PRICE.local, PRICE.growth, PRICE.ecommerce], ['Business Profile management', 'Yes', 'Yes', 'Optional'], ['Technical SEO', 'Basic', 'Full', 'Full'], ['Content creation', 'No', 'Monthly', 'Monthly'],
          ['Link building', 'Local citations', 'Outreach', 'Outreach'], ['Structured data', 'LocalBusiness', 'Full site', 'Product and Offer'], ['Reporting', 'Monthly', 'Monthly', 'Monthly'],
          ['Not included', '[[What the Local package does not include]]', '[[What the Growth package does not include]]', '[[What the Ecommerce package does not include]]'],
          ['Contract term', PRICE.term, PRICE.term, PRICE.term]]},
  { type: 'cards', eyebrow: 'Cost factors', heading: 'What affects SEO cost', cols: 4,
   intro: '**Four things set the price of SEO for an Edmonton business, competition, the number of services, locations and the condition of your site.** Each one changes how much work your plan needs.',
   items: [
     { icon: 'target', title: 'Competition', text: 'Ranking for "plumber Edmonton" takes more work than a niche service in a smaller town.' },
     { icon: 'layers', title: 'Number of services', text: 'Each service you want to rank for needs its own page and support.' },
     { icon: 'pin', title: 'Locations', text: 'More locations and service areas mean more profiles, pages and tracking.' },
     { icon: 'gear', title: 'Site condition', text: 'A site with technical problems needs fixing before growth work pays off.' }]},
  { type: 'faq', eyebrow: 'FAQ', heading: 'Pricing FAQ', intro: 'Monthly cost, contracts, one-time audits and why SEO prices vary.', items: [
     ['How much does SEO cost per month in Edmonton?', `Our Local package is ${PRICE.local} per month, Growth is ${PRICE.growth} and Ecommerce is ${PRICE.ecommerce}, depending on the package and your competition. You get a custom quote in writing after a {{free SEO audit|free-seo-audit}}. For the wider market, see {{how much SEO costs in Canada|blog/how-much-does-seo-cost-in-canada}}.`],
     ['What is the minimum contract term?', `The term for every package is ${PRICE.term}. [[Add the notice period and any minimum term.]] The {{terms of service|terms}} apply to every package.`],
     ['Can I start with just an audit?', 'Yes. Our {{one-time SEO audit|services/seo-audit}} is a stand-alone project with a prioritized fix list your own team can use.'],
     ['Why do SEO prices vary so much?', 'Because the work varies: how competitive your searches are, how many services and locations you need, and how much your site needs fixing. Very cheap SEO often means automated reports or risky links. Ask any provider exactly what is included, as we show above.']]},
  { type: 'cta', heading: 'Get a quote for your business', text: 'Start with a free SEO audit and we will recommend the right package.', button: ['Get a free SEO audit', 'free-seo-audit'] },
 ]},

// ------------------------------------------------------------------ THANK YOU (contact form redirect target)
{
 slug: 'thank-you', nav_label: 'Thank You', noindex: true, icon: 'check-circle', crumbs: [['Contact', 'contact']],
 title: 'Thanks for Getting in Touch', description: 'Your message has been sent. We will reply within one business day.', card: '',
 sections: [
  { type: 'page_hero', eyebrow: 'Message sent', h1: 'Thanks, We Have Your Message', lead: 'We reply within one business day. Here is what happens next.' },
  { type: 'steps', eyebrow: 'What happens next', heading: 'After you get in touch', bg: 'soft',
   intro: 'We reply within one business day, book a short call and, if it makes sense, prepare a free SEO audit.',
   items: [['We reply', 'Within one business day.'], ['Quick call', 'A 30 minute chat about your goals.'], ['Free SEO audit', 'We look at your site and Business Profile and share what we find.']]},
  { type: 'links', eyebrow: 'While you wait', heading: 'Explore more', items: ['services', 'industries', 'how-we-work'] },
 ]},

// ------------------------------------------------------------------ LEGAL
{
 slug: 'privacy-policy', nav_label: 'Privacy Policy', icon: 'shield', updated: UPDATED,
 title: 'Privacy Policy | How We Handle Your Information',
 description: 'How we collect, use, store and protect the personal information you send through our contact and audit forms, and how to access or delete it under Alberta PIPA.',
 card: 'How we handle your data.',
 sections: [
  { type: 'page_hero', h1: 'Privacy Policy', lead: 'Last updated: [[Date]]' },
  { type: 'prose', blocks: [
    ['callout', 'Template only. Have this policy reviewed by a lawyer so it reflects your actual practices and Alberta\'s Personal Information Protection Act (PIPA) before publishing.'],
    ['h2', '1. Information we collect'], ['p', 'When you submit our contact or audit form we collect your name, email address, phone number, website and message. Our website may also collect basic usage data through analytics tools.'],
    ['h2', '2. How we use information'], ['p', 'We use your information to respond to your enquiry, prepare any audit you request, provide our services and improve our website. We do not sell your personal information.'],
    ['h2', '3. Cookies and analytics'], ['p', '[[Describe the analytics and cookie tools used on this site.]]'],
    ['h2', '4. Third-party services'], ['p', 'Form submissions are stored with our database provider and sent to us by email through our email delivery provider. [[Name your hosting, database, email and analytics providers and where they store data.]]'],
    ['h2', '5. Data retention and security'], ['p', '[[Describe how long you keep enquiries and how you protect them.]]'],
    ['h2', '6. Your choices'], ['p', 'You can ask us to access, correct or delete your personal information by {{contacting us|contact}}.'],
    ['h2', '7. Contact'], ['p', 'Questions about this policy: [[Email address]]. The terms for using this website are in our {{terms of service|terms}}.']]},
 ]},
{
 slug: 'terms', nav_label: 'Terms of Service', icon: 'doc', updated: UPDATED,
 title: 'Terms of Service | Website and Service Terms',
 description: 'The terms that apply when you use this website and our services, including intellectual property, links to other sites, no ranking guarantees and governing law.',
 card: 'Website terms of use.',
 sections: [
  { type: 'page_hero', h1: 'Terms of Service', lead: 'Last updated: [[Date]]' },
  { type: 'prose', blocks: [
    ['callout', 'Template only. Have these terms reviewed by a lawyer before publishing.'],
    ['h2', '1. Use of this website'], ['p', 'By using this website you agree to these terms. Content is provided for general information and may change without notice.'],
    ['h2', '2. Intellectual property'], ['p', 'Website content, branding and design belong to [[Legal business name]] unless stated otherwise.'],
    ['h2', '3. No guarantee of results'], ['p', 'Information on this site does not guarantee any specific search ranking or business result. Google states that no one can guarantee a #1 ranking. See {{how we work|how-we-work}}.'],
    ['h2', '4. Links to other sites'], ['p', 'We link to third-party websites for reference. We are not responsible for their content.'],
    ['h2', '5. Governing law'], ['p', '[[Confirm governing law and jurisdiction with your lawyer.]]'],
    ['h2', '6. Contact'], ['p', 'Questions about these terms: {{contact us|contact}}. How we handle your data is set out in our {{privacy policy|privacy-policy}}.']]},
 ]},

// ------------------------------------------------------------------ 404
{
 slug: '404', nav_label: 'Page not found', noindex: true, icon: 'compass',
 title: 'Page Not Found', description: 'The page you are looking for could not be found.', card: '',
 sections: [
  { type: 'notfound', h1: 'This page could not be found', lead: 'The link may be old or the page may have moved. Try our homepage or browse our SEO services.' },
  { type: 'links', eyebrow: 'Popular pages', heading: 'Where to go next', items: ['services', 'industries', 'free-seo-audit'], bg: 'soft' },
 ]},
];

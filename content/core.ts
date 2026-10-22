// Core pages: home, about, team, how we work, contact, free SEO audit, pricing, thank you, legal, 404.
// Written from the briefs in plan/content-plan.json. Real-world facts stay as [[placeholders]] until supplied.
// Inline marks: [[placeholder]]  **bold**  {{link text|slug}}
import type { Page } from './types';

const UPDATED = '2026-10-23';
const G_LOCAL = ['Google Business Profile Help: How to improve your local ranking', 'https://support.google.com/business/answer/7091?hl=en'];
const G_HIRE = ['Google Search Central: Do you need an SEO?', 'https://developers.google.com/search/docs/fundamentals/do-i-need-seo'];
const TOWNS = '{{St. Albert|areas/st-albert}}, {{Sherwood Park|areas/sherwood-park}}, {{Spruce Grove|areas/spruce-grove}}, {{Leduc|areas/leduc}} and {{Fort Saskatchewan|areas/fort-saskatchewan}}';
const POSTS = ['blog/how-google-ranks-local-businesses', 'blog/ai-overviews-and-your-website', 'blog/choosing-an-seo-agency-in-edmonton'];

const PACKAGES = [
  { name: 'Local', price: '[[$000 to $000]] / month', for: 'For single-location businesses that want more calls from Google Maps.',
    features: ['Google Business Profile management', 'Local citations and NAP clean-up', 'Review request process', 'Map Pack rank tracking', 'Monthly report and call'] },
  { name: 'Growth', badge: 'Most chosen', featured: true, price: '[[$000 to $000]] / month', for: 'For businesses ready to rank across all their services.',
    features: ['Everything in Local', 'Technical SEO fixes', 'On-page optimization', 'New content every month', 'Link building outreach'] },
  { name: 'Ecommerce', price: '[[$000 to $000]] / month', for: 'For Shopify and WooCommerce stores selling online.',
    features: ['Category and product page SEO', 'Product structured data', 'Merchant Center alignment', 'Technical and speed work', 'Revenue-focused reporting'] },
];

const OWN = 'Everything. Content, technical fixes, reports and account access stay with you. We work inside your own Google Search Console, Google Analytics and Google Business Profile, so nothing is lost if we stop working together.';

export const PAGES: Page[] = [
// ------------------------------------------------------------------ HOME
{
 slug: '', nav_label: 'Home', icon: 'spark', updated: UPDATED,
 title: 'Edmonton SEO Services | Local SEO That Drives Calls',
 description: 'Edmonton SEO services for local businesses. We help trades, law firms and clinics rank in Google Maps and turn searches into calls. Free audit.',
 sections: [
  { type: 'hero_home', eyebrow: 'SEO agency in Edmonton, Alberta',
   h1: 'Edmonton SEO Services That Bring Real Calls and Leads',
   lead: 'Our Edmonton SEO services help local businesses show up in Google Maps and search results when nearby customers are ready to buy, then turn those searches into calls, bookings and sales.',
   cta: ['Get a Free SEO Audit', 'free-seo-audit'], cta2: ['See Our Services', 'services'],
   proof: ['Free audit, no obligation', 'Reply within one business day', 'Every change shared with you'],
   photo: 'https://images.unsplash.com/photo-1743865319740-32121cae5959?auto=format&fit=crop&w=1000&q=80', photo_alt: 'Business owner working on her website on a laptop at home' },
  { type: 'tools', label: 'We work inside the tools Google gives site owners', items: ['Search Console', 'Google Analytics', 'Business Profile', 'PageSpeed Insights', 'Merchant Center'] },
  { type: 'feature_cards', heading: 'Edmonton SEO services built around calls, not just rankings',
   intro: 'Rankings only matter if they bring customers. Every piece of work we do is tied to the calls, forms and bookings it produces.',
   items: [{ illus: 'search', title: 'Be found first', text: 'Rank for the services you sell when nearby customers search, in both the Map Pack and the regular results.' },
           { illus: 'target', title: 'Reach ready buyers', text: 'Search traffic comes from people already looking for what you offer, so visits turn into enquiries.' },
           { illus: 'growth', title: 'Growth that compounds', text: 'Organic results do not charge per click. Good pages and a strong Business Profile keep working month after month.' }]},
  { type: 'service_list', eyebrow: 'What we do', heading: 'Our SEO services', intro: 'Pick one service or combine them into a single plan. Every engagement starts with an audit. See {{all our SEO services|services}}.',
   items: ['services/local-seo', 'services/google-business-profile-optimization', 'services/technical-seo', 'services/on-page-seo', 'services/link-building', 'services/content-writing'] },
  { type: 'cards', eyebrow: 'Who we help', heading: 'Industries we help in Edmonton', cols: 3, intro: 'Customers search differently in every industry. See {{industries we serve|industries}}.',
   items: [{ icon: 'gear', title: 'Trades and home services', text: '{{Plumbing SEO|industries/plumbers}}, {{HVAC SEO|industries/hvac}}, electricians, roofers and renovation contractors, where urgent mobile searches decide who gets the call.' },
           { icon: 'book', title: 'Law firms', text: '{{Law firm SEO|industries/law-firms}} that follows the Law Society of Alberta\'s marketing rules and wins practice-area searches.' },
           { icon: 'star', title: 'Professional and health clinics', text: '{{Dental SEO|industries/dentists}} and other clinics, where reviews and "accepting new patients" pages drive bookings.' }]},
  { type: 'steps', eyebrow: 'How we work', heading: 'How a project runs', bg: 'soft',
   items: [['Audit', 'We review your site, Business Profile, competitors and current rankings.'], ['Plan', 'You get a written plan with priorities, expected outcomes and timelines.'],
           ['Build', 'We fix, write and optimize, logging every change we make.'], ['Report', 'Monthly reports show calls, leads, rankings and traffic in plain language.']]},
  { type: 'split', eyebrow: 'Local search', heading: 'How Google ranks local businesses', reverse: true,
   body: ['Google says local results are based mainly on three things: **relevance** (how well your profile matches the search), **distance** (how far you are from the searcher) and **prominence** (how well known your business is, including links and reviews).',
          'We cannot move your address, so we work on the two factors you can influence. That is what {{local SEO|services/local-seo}} and {{Google Business Profile optimization|services/google-business-profile-optimization}} are for.'],
   bullets: ['Complete, accurate Business Profile details', 'A steady flow of genuine customer reviews', 'Links and mentions from trusted Edmonton sites'],
   visual: 'map', vdata: { title: 'Your Business Profile', sub: 'Open now · Edmonton, AB' }},
  { type: 'split', eyebrow: 'Where we work', heading: 'Serving Edmonton and surrounding areas', bg: 'soft', visual: 'cards',
   vdata: { items: [['pin', 'Edmonton', 'Our home base'], ['map', 'Nearby towns', 'St. Albert, Sherwood Park, Spruce Grove'], ['compass', 'And beyond', 'Leduc, Fort Saskatchewan, Stony Plain, Beaumont']] },
   body: [`We are based in Edmonton and work with businesses across the region, including ${TOWNS}, plus Stony Plain and Beaumont.`,
          'Search results change from one part of the region to another, so we track rankings across the areas you serve, not just from one point in the city.']},
  { type: 'packages', eyebrow: 'Pricing', heading: 'Pricing and packages', intro: 'Clear monthly packages with what is included. See full {{SEO pricing|pricing}}, or {{get a free SEO audit|free-seo-audit}} first.', bg: '', items: PACKAGES },
  { type: 'faq', eyebrow: 'FAQ', heading: 'Edmonton SEO FAQ', items: [
     ['How long does SEO take to work in Edmonton?', 'It depends on your site, your competition and how much work is needed. Google suggests asking any SEO what results they expect and in what timeframe, so we answer that in writing after your audit. We do not promise dates we cannot back up.'],
     ['How much do SEO services cost in Edmonton?', 'Our monthly packages start at [[$000]] and depend on how many services, pages and locations you need. See {{SEO pricing|pricing}} for what each package includes.'],
     ['Can you guarantee a #1 ranking on Google?', 'No. Google says no one can guarantee a #1 ranking, and we agree. What we commit to is a clear plan, the work we said we would do and honest monthly reporting on calls, leads and rankings.'],
     ['Do you work with businesses outside Edmonton?', `Yes, across the Edmonton region, including ${TOWNS}. Our focus on this region is what lets us learn its search results closely.`],
     ['What do I own if we stop working together?', OWN]]},
  { type: 'posts', eyebrow: 'Blog', heading: 'SEO advice from our blog', intro: 'Practical SEO advice, checked against Google\'s own documentation.', items: POSTS },
  { type: 'cta', heading: 'Ready to grow your Edmonton business on Google?', text: 'Get a free SEO audit. We will look at your site and Business Profile and tell you what to fix first.', button: ['Get a Free SEO Audit', 'free-seo-audit'] },
 ]},

// ------------------------------------------------------------------ ABOUT
{
 slug: 'about', nav_label: 'About', icon: 'users', page_type: 'AboutPage', updated: UPDATED,
 title: 'About Us | Edmonton SEO Team With Real Local Experience',
 description: 'Meet the Edmonton SEO team behind our work: who we are, how we work, what we believe and the local businesses we help grow through search.',
 card: 'Who we are and what we believe.',
 sections: [
  { type: 'page_hero', eyebrow: 'About us', h1: 'About Our Edmonton SEO Team', lead: 'We help local businesses grow through search with one rule: every piece of work should be visible, measurable and tied to a business result.' },
  { type: 'split', eyebrow: 'Our story', heading: 'Our story', visual: 'cards',
   vdata: { items: [['pin', 'Based in Edmonton', 'Local market focus'], ['chart', 'Reports you can read', 'Calls, leads, rankings'], ['shield', 'Search Essentials first', 'No shortcuts'], ['handshake', 'You own everything', 'Content and accounts']] },
   body: ['[[Add your founding story in the founder\'s own words: who started the agency, when, and why.]]',
          'Today we work with trades, law firms and clinics across Edmonton and nearby towns. [[Add years in business, team size and the real street address that matches your Google Business Profile.]]']},
  { type: 'cards', eyebrow: 'Values', heading: 'What we believe', bg: 'soft', cols: 3, items: [
     { icon: 'eye', title: 'Transparency', text: 'We log every change and share it with you. No black box, and no work you cannot see.' },
     { icon: 'shield', title: 'Search Essentials first', text: 'We follow Google Search Essentials and its spam policies, and avoid tactics that put your site at risk.' },
     { icon: 'target', title: 'Business outcomes', text: 'We report on calls, bookings and sales, not only rankings.' }]},
  { type: 'team', eyebrow: 'Our team', heading: 'Meet the team', intro: 'The people who would work on your account. Full bios are on {{meet the team|team}}.',
   items: [['[[Name]]', '[[Founder and Lead SEO Strategist]]'], ['[[Name]]', '[[Technical SEO Lead]]'], ['[[Name]]', '[[Content Lead]]'], ['[[Name]]', '[[Local SEO Specialist]]']] },
  { type: 'steps', eyebrow: 'Working with us', heading: 'Working with us', bg: 'soft',
   items: [['Free audit', 'A short call and a look at your site and Business Profile.'], ['Plan', 'A written plan with priorities and expected outcomes.'],
           ['Monthly work', 'Fixes, content and outreach, each one logged.'], ['Review together', 'A monthly call to go through results and next steps.']]},
  { type: 'faq', eyebrow: 'FAQ', heading: 'About us FAQ', items: [
     ['Who will work on my account?', 'A named strategist owns your plan and your monthly review, supported by our technical, content and outreach specialists. You will know who they are before you sign. See {{how we work|how-we-work}}.'],
     ['Are you based in Edmonton?', 'Yes. Our office is at [[Street address]], Edmonton, AB [[Postal code]], and we work with businesses across the Edmonton region.']]},
  { type: 'links', eyebrow: 'Get to know us', heading: 'More about us', items: ['team', 'how-we-work', 'case-studies', 'contact'] },
  { type: 'cta', heading: 'Let\'s talk about your search goals', text: 'Contact our team or start with a free SEO audit.', button: ['Get a free SEO audit', 'free-seo-audit'] },
 ]},

// ------------------------------------------------------------------ TEAM
{
 slug: 'team', nav_label: 'Our Team', icon: 'users', page_type: 'CollectionPage', updated: UPDATED,
 title: 'Our Team | The People Behind Our Edmonton SEO Work',
 description: 'Meet the strategists, writers and technical specialists behind our Edmonton SEO work: real names, real experience and the areas each person knows best.',
 card: 'The people behind the work.',
 sections: [
  { type: 'page_hero', eyebrow: 'Our team', h1: 'Meet Our Edmonton SEO Team', lead: 'Real people with real experience in local search. Every bio on this page is written and approved by the person it describes.' },
  { type: 'team', eyebrow: 'Leadership', heading: 'Leadership',
   items: [['[[Name]]', '[[Founder and Lead SEO Strategist]]'], ['[[Name]]', '[[Head of Client Strategy]]']] },
  { type: 'team', eyebrow: 'Specialists', heading: 'Strategy, technical and content', bg: 'soft',
   items: [['[[Name]]', '[[Technical SEO Lead]]'], ['[[Name]]', '[[Content Lead]]'], ['[[Name]]', '[[Local SEO Specialist]]'], ['[[Name]]', '[[Outreach Specialist]]']] },
  { type: 'steps', eyebrow: 'Your account', heading: 'How we work together on your account',
   items: [['Your strategist', 'Owns your plan, priorities and monthly review.'], ['Technical', 'Handles site structure, speed, indexing and structured data.'],
           ['Content and outreach', 'Writes pages and earns links.'], ['You', 'Approve changes and see every one logged.']]},
  { type: 'links', eyebrow: 'Next steps', heading: 'More about how we work', items: ['about', 'how-we-work', 'contact'] },
  { type: 'cta', heading: 'Want this team working on your site?', text: 'Get a free SEO audit and meet the people who would run your account.', button: ['Get a free SEO audit', 'free-seo-audit'] },
 ]},

// ------------------------------------------------------------------ HOW WE WORK
{
 slug: 'how-we-work', nav_label: 'How We Work', icon: 'compass', updated: UPDATED,
 title: 'How We Work | Our SEO Process and Editorial Policy',
 description: 'Our SEO process, reporting standards and editorial policy: how we research, write, fact-check and update every page and guide we publish for clients.',
 card: 'Our process and editorial standards.',
 sections: [
  { type: 'page_hero', eyebrow: 'How we work', h1: 'How We Work', lead: 'What we do, how we check it and what we will never do. This page is our standard for every client and every page we publish.' },
  { type: 'steps', eyebrow: 'Process', heading: 'Our process', bg: 'soft', items: [
     ['Audit', 'We review your website, Google Business Profile, competitors and current rankings, using your own Search Console and Analytics data.'],
     ['Plan', 'You get a written plan with priorities, expected outcomes and timelines. Nothing starts until you approve it.'],
     ['Build', 'We fix, write and optimize. Every change is logged with the date, the page and the reason.'],
     ['Report', 'A monthly report and call covering calls, leads, rankings and traffic, and what comes next.']]},
  { type: 'prose', blocks: [
     ['h2', 'Editorial policy'],
     ['p', 'The pages and guides we publish, for clients and on this site, follow the same standard.'],
     ['h3', 'Who writes and reviews'],
     ['p', 'Every page is written by a named member of our team and reviewed by a second person before publishing. Pages on legal or health topics are reviewed by a qualified professional in that field. [[Confirm reviewers by name once team bios are live.]]'],
     ['h3', 'Fact-checking and sources'],
     ['p', 'We check claims against primary sources such as Google Search Central, Google Business Profile Help and the relevant regulator, and we link to them. We do not publish statistics we cannot source.'],
     ['h3', 'Use of AI tools'],
     ['p', '[[State whether and how your team uses AI tools. For example: AI may help with research and first drafts, but a named person checks every fact, rewrites the page in our own words and takes responsibility for it.]]'],
     ['h3', 'Updates and corrections'],
     ['p', 'Each page shows when it was last updated. We review our guides regularly and when Google changes its documentation. If you spot an error, {{contact us|contact}} and we will correct it and note the change.']] },
  { type: 'checklist', eyebrow: 'Our rules', heading: 'What we never do', items: [
     ['Guarantee rankings', 'Google says no one can guarantee a #1 ranking'], ['Buy links', 'Google\'s spam policies treat paid links for ranking as spam'],
     ['Fake or incentivized reviews', 'Against Google\'s Maps contribution policy'], ['Create fake locations', 'Virtual offices get Business Profiles suspended'],
     ['Hide what we change', 'Every change is logged and shared'], ['Hold your accounts hostage', 'You own your accounts, content and data']]},
  { type: 'prose', blocks: [['src', [G_HIRE, ['Google Search Central: Spam policies', 'https://developers.google.com/search/docs/essentials/spam-policies'], ['Google Maps contribution policy', 'https://support.google.com/contributionpolicy/answer/7400114?hl=en']]]] },
  { type: 'links', eyebrow: 'More about us', heading: 'Get to know us', items: ['about', 'team', 'free-seo-audit'] },
  { type: 'cta', heading: 'See how this would work for your business', text: 'Start with a free SEO audit.', button: ['Get a free SEO audit', 'free-seo-audit'] },
 ]},

// ------------------------------------------------------------------ CONTACT
{
 slug: 'contact', nav_label: 'Contact', icon: 'mail', page_type: 'ContactPage', updated: UPDATED,
 title: 'Contact Us | Free SEO Consultation in Edmonton',
 description: 'Book a free SEO consultation with our Edmonton team. Call, email or visit our office. We reply within one business day with clear next steps.',
 card: 'Call, email or send us a message.',
 sections: [
  { type: 'page_hero', eyebrow: 'Contact', h1: 'Contact Our Edmonton SEO Team', lead: 'Tell us about your business. We reply within one business day with clear next steps.' },
  { type: 'contact', eyebrow: 'Get in touch', heading: 'Get in touch', intro: 'Prefer to call, email or visit? Our details match our Google Business Profile.',
   info: [['pin', 'Office', '[[Street address]], Edmonton, AB [[Postal code]]'], ['phone', 'Phone', '[[Phone number]]'], ['mail', 'Email', '[[Email address]]'], ['clock', 'Hours', '[[Business hours]]']],
   form_title: 'Send us a message', services: ['Free SEO audit', 'Local SEO', 'Google Business Profile', 'Technical SEO', 'On-Page SEO', 'Link Building', 'SEO Content Writing', 'SEO Audit', 'Ecommerce SEO', 'AI Search Optimization', 'Not sure yet'],
   note: 'We reply within one business day. Your details are used only to respond to your enquiry. See our {{privacy policy|privacy-policy}}.' },
  { type: 'steps', eyebrow: 'What happens next', heading: 'What happens next', bg: 'soft',
   items: [['We reply', 'Within one business day.'], ['Quick call', 'A 30 minute chat about your goals.'], ['Free audit', 'We look at your site and Business Profile and share what we find.']]},
  { type: 'faq', eyebrow: 'FAQ', heading: 'Contact FAQ', items: [
     ['What happens after I contact you?', 'We reply within one business day to book a short call. If it makes sense, we then prepare a {{free SEO audit|free-seo-audit}} of your site and Business Profile, with no obligation.'],
     ['How fast do you reply?', 'Within one business day, during our office hours of [[Business hours]].']]},
 ]},

// ------------------------------------------------------------------ FREE SEO AUDIT
{
 slug: 'free-seo-audit', nav_label: 'Free SEO Audit', icon: 'audit', updated: UPDATED,
 title: 'Free SEO Audit for Edmonton Businesses | Get Your Report',
 description: 'Find out why competitors outrank you. Get a free local SEO and Google Business Profile audit for your Edmonton business, with clear next steps.',
 card: 'A free local SEO snapshot with clear next steps.',
 service: 'Free local SEO audit', offer_price: '0',
 sections: [
  { type: 'page_hero', eyebrow: 'Free SEO audit', h1: 'Get a Free SEO Audit for Your Business', lead: 'Find out why competitors outrank you in Google Maps and search, and what to fix first. Free, no obligation, and written for business owners, not SEO specialists.' },
  { type: 'checklist', eyebrow: 'What we check', heading: 'What your free audit covers', bg: '', items: [
     ['Google Business Profile', 'Categories, services, hours, photos and reviews'], ['Map Pack competitors', 'The top three businesses for your main search and why they win'],
     ['Site speed and mobile', 'How fast and usable your key pages are'], ['On-page basics', 'Titles, headings and service pages'],
     ['Reviews', 'Count, rating, recency and replies compared with competitors'], ['Citations', 'Whether your name, address and phone match across the web']]},
  { type: 'steps', eyebrow: 'Process', heading: 'How it works', bg: 'soft', items: [
     ['Request', 'Send your website and main service below.'], ['We review', 'A person checks your site, profile and competitors.'], ['You receive', 'Your audit as [[a short video or PDF]] within [[0]] business days, with clear next steps.']]},
  { type: 'contact', eyebrow: 'Request your audit', heading: 'Request your audit', intro: 'No obligation and no automated reports. We need your website and the main service you want to rank for.',
   info: [['clock', 'Turnaround', '[[0]] business days'], ['doc', 'Format', '[[Short video or PDF]]'], ['shield', 'Cost', 'Free, no obligation']],
   form_title: 'Request your free audit', services: ['Free SEO audit', 'Local SEO', 'Google Business Profile', 'Not sure yet'],
   note: 'Your details are used only to prepare your audit and reply to you. See our {{privacy policy|privacy-policy}}.' },
  { type: 'faq', eyebrow: 'FAQ', heading: 'Free audit FAQ', items: [
     ['Is the audit really free?', 'Yes. There is no cost and no obligation. If we can help, we will tell you how; if we cannot, we will say so.'],
     ['How long does it take?', 'Usually [[0]] business days from your request.'],
     ['What is the difference between the free audit and the paid SEO audit?', 'The free audit is a quick local snapshot: your Business Profile, top on-page issues and your Map Pack competitors. The {{full SEO audit|services/seo-audit}} is a complete technical, on-page, local, link and content review with a prioritized fix list and walkthrough call.']]},
 ]},

// ------------------------------------------------------------------ PRICING
{
 slug: 'pricing', nav_label: 'Pricing', icon: 'layers', updated: UPDATED,
 title: 'SEO Pricing and Packages in Edmonton | Transparent Plans',
 description: 'Clear monthly SEO packages for Edmonton businesses. See what each plan includes, price ranges and what results to expect before you commit.',
 card: 'Packages, price ranges and what is included.',
 sections: [
  { type: 'page_hero', eyebrow: 'Pricing', h1: 'SEO Pricing and Packages', lead: 'Clear monthly packages with price ranges and exactly what is included, so you know what you are paying for before you commit.' },
  { type: 'packages', eyebrow: 'Packages', heading: 'Packages', items: PACKAGES },
  { type: 'table', eyebrow: 'Compare', heading: 'Compare what is included', bg: 'soft', cols: ['Feature', 'Local', 'Growth', 'Ecommerce'],
   rows: [['Business Profile management', 'Yes', 'Yes', 'Optional'], ['Technical SEO', 'Basic', 'Full', 'Full'], ['Content creation', 'No', 'Monthly', 'Monthly'],
          ['Link building', 'Local citations', 'Outreach', 'Outreach'], ['Structured data', 'LocalBusiness', 'Full site', 'Product and Offer'], ['Reporting', 'Monthly', 'Monthly', 'Monthly'],
          ['Contract term', '[[Month to month or minimum term]]', '[[Term]]', '[[Term]]']]},
  { type: 'cards', eyebrow: 'Cost factors', heading: 'What affects SEO cost', cols: 4, items: [
     { icon: 'target', title: 'Competition', text: 'Ranking for "plumber Edmonton" takes more work than a niche service in a smaller town.' },
     { icon: 'layers', title: 'Number of services', text: 'Each service you want to rank for needs its own page and support.' },
     { icon: 'pin', title: 'Locations', text: 'More locations and service areas mean more profiles, pages and tracking.' },
     { icon: 'gear', title: 'Site condition', text: 'A site with technical problems needs fixing before growth work pays off.' }]},
  { type: 'faq', eyebrow: 'FAQ', heading: 'Pricing FAQ', items: [
     ['How much does SEO cost per month in Edmonton?', 'Our packages range from [[$000]] to [[$000]] per month, depending on the package and your competition. You get a fixed written quote after a {{free SEO audit|free-seo-audit}}.'],
     ['Is there a minimum contract?', '[[Add your real contract terms: month to month, or the minimum term and notice period.]]'],
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
   items: [['We reply', 'Within one business day.'], ['Quick call', 'A 30 minute chat about your goals.'], ['Free audit', 'We look at your site and Business Profile and share what we find.']]},
  { type: 'links', eyebrow: 'While you wait', heading: 'Explore more', items: ['services', 'industries', 'how-we-work'] },
 ]},

// ------------------------------------------------------------------ LEGAL
{
 slug: 'privacy-policy', nav_label: 'Privacy Policy', icon: 'shield', updated: UPDATED,
 title: 'Privacy Policy', description: 'How we collect, use and protect information submitted through this website.', card: 'How we handle your data.',
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
    ['h2', '7. Contact'], ['p', 'Questions about this policy: [[Email address]].']]},
 ]},
{
 slug: 'terms', nav_label: 'Terms of Service', icon: 'doc', updated: UPDATED,
 title: 'Terms of Service', description: 'The terms that apply when you use this website and our services.', card: 'Website terms of use.',
 sections: [
  { type: 'page_hero', h1: 'Terms of Service', lead: 'Last updated: [[Date]]' },
  { type: 'prose', blocks: [
    ['callout', 'Template only. Have these terms reviewed by a lawyer before publishing.'],
    ['h2', '1. Use of this website'], ['p', 'By using this website you agree to these terms. Content is provided for general information and may change without notice.'],
    ['h2', '2. Intellectual property'], ['p', 'Website content, branding and design belong to [[Legal business name]] unless stated otherwise.'],
    ['h2', '3. No guarantee of results'], ['p', 'Information on this site does not guarantee any specific search ranking or business result. Google states that no one can guarantee a #1 ranking.'],
    ['h2', '4. Links to other sites'], ['p', 'We link to third-party websites for reference. We are not responsible for their content.'],
    ['h2', '5. Governing law'], ['p', '[[Confirm governing law and jurisdiction with your lawyer.]]'],
    ['h2', '6. Contact'], ['p', 'Questions about these terms: {{contact us|contact}}.']]},
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

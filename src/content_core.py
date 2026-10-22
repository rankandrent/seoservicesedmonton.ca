# Core pages: home, about, team, career, FAQ, packages, contact, legal, 404.
# Inline marks: [[placeholder]]  **bold**  {{link text|slug}}

G_LOCAL = ('Google Business Profile Help: How to improve your local ranking', 'https://support.google.com/business/answer/7091?hl=en')
G_HIRE = ('Google Search Central: Do you need an SEO?', 'https://developers.google.com/search/docs/fundamentals/do-i-need-seo')

SERVICE_SLUGS = ['services/local-seo', 'services/technical-seo', 'services/on-page-seo', 'services/content-seo', 'services/link-building',
                 'services/google-business-profile', 'services/ecommerce-seo', 'services/seo-audit', 'services/ai-search-optimization']
LOCATION_SLUGS = ['locations/downtown-edmonton', 'locations/oliver', 'locations/strathcona', 'locations/windermere', 'locations/summerside', 'locations/terwillegar-towne']
CASE_SLUGS = ['case-studies/local-service-business', 'case-studies/ecommerce-store', 'case-studies/professional-firm']
POST_SLUGS = ['blog/how-google-ranks-local-businesses', 'blog/ai-overviews-and-your-website', 'blog/choosing-an-seo-agency-in-edmonton']

GENERAL_FAQ = [
    ('How long does SEO take to show results?',
     'It depends on your site, your competition and how much work is needed. Google suggests asking any SEO provider what results they expect and in what timeframe, so we answer that in writing after your audit, based on what we find. We do not promise dates we cannot back up.'),
    ('Can you guarantee a #1 ranking on Google?',
     'No. Google states that no one can guarantee a #1 ranking, and we agree. What we commit to is a clear plan, the work we said we would do and honest monthly reporting on rankings, traffic and leads.'),
    ('Do you only work with Edmonton businesses?',
     'Our focus is Edmonton and the businesses that serve customers here. That focus is what lets us learn local search results closely, neighbourhood by neighbourhood.'),
    ('Will we own everything you create?',
     'Yes. Content, technical fixes, reports and account access stay with you. We work inside your own Google Search Console, Google Analytics and Google Business Profile accounts.'),
    ('Will you tell us every change you make to our site?',
     'Yes. Every change is logged and shared with you. Google lists this as one of the questions to ask an SEO, and we think it should be standard.'),
]

PAGES = [
# ------------------------------------------------------------------ HOME
{
 'slug': '', 'nav_label': 'Home', 'icon': 'spark',
 'title': 'SEO Services Edmonton | Local SEO Agency | BrandName',
 'description': 'SEO services in Edmonton for businesses that want more calls, bookings and sales from Google. Local SEO, technical SEO, content and link building.',
 'keyword': 'seo services edmonton',
 'sections': [
  {'type': 'hero_home', 'eyebrow': 'SEO agency in Edmonton, Alberta',
   'h1': 'SEO Services in Edmonton That Bring in Customers',
   'lead': 'We help Edmonton businesses show up when local customers search on Google, then turn those visits into calls, bookings and sales.',
   'cta': ('Get a Free SEO Review', 'contact'), 'cta2': ('See Our Services', 'services'),
   'proof': ['Free review, no obligation', 'Reply within one business day', 'Every change shared with you'],
   'photo': 'https://images.unsplash.com/photo-1743865319740-32121cae5959?auto=format&fit=crop&w=1000&q=80', 'photo_alt': 'Business owner working on her website on a laptop at home'},
  {'type': 'tools', 'label': 'We work inside the tools Google gives site owners',
   'items': ['Search Console', 'Google Analytics', 'Business Profile', 'PageSpeed Insights', 'Merchant Center']},
  {'type': 'feature_cards', 'heading': 'Why Edmonton Businesses Invest in SEO', 'intro': 'When people in Edmonton need a service, most of them start with a search. SEO decides whether they find you or a competitor.',
   'items': [{'illus': 'search', 'title': 'Be Found First', 'text': 'Rank for the services you sell when nearby customers search, in both the map and the regular results.'},
             {'illus': 'target', 'title': 'Reach Ready Buyers', 'text': 'Search traffic comes from people already looking for what you offer, so visits turn into enquiries.'},
             {'illus': 'growth', 'title': 'Growth That Compounds', 'text': 'Organic results do not charge per click. Good pages keep working month after month.'}]},
  {'type': 'about', 'eyebrow': 'About us', 'heading': 'An Edmonton SEO agency that shows its work',
   'body': ['We help local businesses grow through search with one rule: every piece of work should be visible, measurable and tied to a business result.'],
   'features': [('eye', 'Full Transparency', 'Every change we make is logged and shared with you.'), ('shield', 'Search Essentials First', 'We follow Google\'s published guidelines and skip risky shortcuts.')],
   'photo': 'https://images.unsplash.com/photo-1582005450386-52b25f82d9bb?auto=format&fit=crop&w=900&q=80', 'photo_alt': 'Three colleagues working together on laptops at a shared table', 'chips': [('Local', 'Edmonton focus'), ('Monthly', 'Plain reports')],
   'cta': ('More About Us', 'about')},
  {'type': 'service_list', 'eyebrow': 'Our services', 'heading': 'SEO Services for Every Part of Search', 'intro': 'Pick one service or combine them into a single plan. Every engagement starts with an audit.',
   'items': ['services/local-seo', 'services/technical-seo', 'services/on-page-seo', 'services/content-seo', 'services/link-building',
             'services/google-business-profile', 'services/ecommerce-seo', 'services/seo-audit', 'services/ai-search-optimization']},
  {'type': 'why', 'eyebrow': 'Why choose us', 'heading': 'Honest SEO with results you can check', 'cta': ('Get Started', 'contact'),
   'stats': [('Every', 'Change Logged', 'You see what we changed, when and why.'), ('Monthly', 'Review Call', 'We walk through rankings, traffic and leads together.')],
   'photo': 'https://images.unsplash.com/photo-1676277755556-ef352e35d5b0?auto=format&fit=crop&w=1400&q=80', 'photo_alt': 'Team meeting around a table with laptops and a screen'},
  {'type': 'steps', 'eyebrow': 'How we work', 'heading': 'How a project runs, start to finish', 'bg': 'soft',
   'items': [('Audit', 'We review your site, Business Profile, competitors and current rankings.'),
             ('Plan', 'You get a written plan with priorities, expected outcomes and timelines.'),
             ('Build', 'We fix, write and optimize, logging every change we make.'),
             ('Report', 'Monthly reports show rankings, traffic and leads in plain language.')]},
  {'type': 'split', 'eyebrow': 'Local search', 'heading': 'Built around how Google ranks local businesses', 'reverse': True,
   'body': ['Google says local results are based mainly on three things: **relevance** (how well your profile matches the search), **distance** (how far you are from the searcher) and **prominence** (how well known your business is, including links and reviews).',
            'We cannot move your address, so we work hard on the two factors you can influence: relevance and prominence.'],
   'bullets': ['Complete, accurate Business Profile details', 'A steady flow of genuine customer reviews', 'Links and mentions from trusted Edmonton sites'],
   'cta': ('Explore Local SEO', 'services/local-seo'),
   'visual': 'map', 'vdata': {'title': 'Your Business Profile', 'sub': 'Open now · Edmonton, AB'}},
  {'type': 'packages', 'eyebrow': 'Packages', 'heading': 'Pick Your Starting Point', 'bg': '', 'items': [
     {'name': 'Local', 'for': 'For single location businesses that want more calls from Google Maps.',
      'features': ['Google Business Profile management', 'Local citations and listings', 'Review request process', 'Monthly report and call']},
     {'name': 'Growth', 'badge': 'Most chosen', 'featured': True, 'for': 'For businesses ready to rank across all their services.',
      'features': ['Everything in Local', 'Technical and on-page SEO', 'New content every month', 'Link building outreach']},
     {'name': 'Ecommerce', 'for': 'For Shopify and WooCommerce stores selling online.',
      'features': ['Category and product SEO', 'Product structured data', 'Merchant Center alignment', 'Revenue focused reporting']}]},
  {'type': 'links', 'eyebrow': 'Where we work', 'heading': 'SEO for neighbourhoods across Edmonton', 'bg': 'soft',
   'intro': 'Each neighbourhood page covers a different part of local search, so you can learn something useful wherever you start.', 'items': LOCATION_SLUGS},
  {'type': 'faq', 'eyebrow': 'FAQ', 'heading': 'Questions Edmonton Owners Ask', 'items': GENERAL_FAQ},
  {'type': 'posts', 'eyebrow': 'Blog', 'heading': 'SEO Advice From Our Blog', 'intro': 'Practical SEO advice, checked against Google\'s own documentation.', 'items': POST_SLUGS},
  {'type': 'cta', 'heading': 'Ready to grow your Edmonton business on Google?', 'text': 'Book a free SEO review. We will look at your site and Business Profile and tell you what to fix first.', 'button': ['Contact Us', 'contact']},
 ]},
# ------------------------------------------------------------------ ABOUT
{
 'slug': 'about', 'nav_label': 'About', 'icon': 'users', 'page_type': 'AboutPage',
 'title': 'About BrandName | Edmonton SEO Agency',
 'description': 'Meet BrandName, an Edmonton SEO agency focused on local search, honest reporting and work you can see. Learn how we work and what we believe.',
 'keyword': 'edmonton seo agency', 'card': 'Who we are and how we work.',
 'sections': [
  {'type': 'page_hero', 'eyebrow': 'About us', 'h1': 'An Edmonton SEO Agency That Shows Its Work', 'lead': 'We started BrandName to give local businesses SEO they can understand, check and trust.'},
  {'type': 'split', 'eyebrow': 'Our story', 'heading': 'Built for Edmonton businesses', 'visual': 'cards',
   'vdata': {'items': [('pin', 'Based in Edmonton', 'Local market focus'), ('chart', 'Reports you can read', 'Rankings, traffic, leads'), ('shield', 'Search Essentials first', 'No shortcuts'), ('handshake', 'You own everything', 'Content and accounts')]},
   'body': ['[[Add your founding story here: who started the agency, when and why.]]',
            'Today we help Edmonton businesses grow through search with one simple rule: every piece of work should be visible, measurable and tied to a business result.']},
  {'type': 'cards', 'eyebrow': 'What we believe', 'heading': 'The principles behind our work', 'bg': 'soft', 'cols': 3,
   'items': [{'icon': 'eye', 'title': 'Transparency', 'text': 'We log every change and share it with you. No black box.'},
             {'icon': 'shield', 'title': 'Google Search Essentials', 'text': 'We follow Google\'s published guidelines and avoid tactics that put your site at risk.'},
             {'icon': 'target', 'title': 'Business outcomes', 'text': 'We report on calls, bookings and sales, not only rankings.'}]},
  {'type': 'stats', 'eyebrow': 'At a glance', 'heading': 'BrandName in numbers',
   'items': [('[[00]]', 'Years of experience'), ('[[00]]+', 'Active clients'), ('[[00]]', 'Team members'), ('[[00]]%', 'Client retention')]},
  {'type': 'split', 'eyebrow': 'Our mission', 'heading': 'Make local search work for local businesses', 'reverse': True, 'visual': 'serp',
   'vdata': {'query': 'best [service] near me', 'rows': ['A local Edmonton business', 'National chain', 'Directory page']},
   'body': ['Big brands and directories take up a lot of space in search results. Our mission is to help independent Edmonton businesses earn their place there.',
            'That means clear websites, complete Business Profiles and content that answers real questions better than anyone else in town.']},
  {'type': 'steps', 'eyebrow': 'Working together', 'heading': 'What it is like to work with us', 'bg': 'soft',
   'items': [('Free review', 'A short call and a look at your site and profile.'), ('Audit and plan', 'A written plan with priorities and expected outcomes.'),
             ('Monthly work', 'Fixes, content and outreach, each one logged.'), ('Review together', 'A monthly call to go through results and next steps.')]},
  {'type': 'links', 'eyebrow': 'Get to know us', 'heading': 'More about BrandName', 'items': ['team', 'case-studies', 'career']},
  {'type': 'cta', 'heading': 'Let\'s talk about your search goals', 'text': 'Tell us about your business and we will show you where the opportunities are.'},
 ]},
# ------------------------------------------------------------------ TEAM
{
 'slug': 'team', 'nav_label': 'Our Team', 'icon': 'users',
 'title': 'Our Team | BrandName Edmonton SEO Agency',
 'description': 'Meet the BrandName team: the strategists, writers and technical specialists behind our SEO work for Edmonton businesses.',
 'keyword': 'edmonton seo team', 'card': 'The people behind the work.',
 'sections': [
  {'type': 'page_hero', 'eyebrow': 'Our team', 'h1': 'The People Behind Your Rankings', 'lead': 'A small team of strategists, writers and technical specialists who know Edmonton search.'},
  {'type': 'team', 'eyebrow': 'Leadership', 'heading': 'Meet the team',
   'items': [('[[Name]]', '[[Founder and SEO Strategist]]'), ('[[Name]]', '[[Technical SEO Lead]]'), ('[[Name]]', '[[Content Lead]]'), ('[[Name]]', '[[Local SEO Specialist]]'),
             ('[[Name]]', '[[Outreach Specialist]]'), ('[[Name]]', '[[Web Developer]]'), ('[[Name]]', '[[Account Manager]]'), ('[[Name]]', '[[Data Analyst]]')]},
  {'type': 'cards', 'eyebrow': 'How we are organized', 'heading': 'Every client gets the full team', 'bg': 'soft', 'cols': 3,
   'items': [{'icon': 'compass', 'title': 'Strategy', 'text': 'Your strategist owns the plan, the priorities and the monthly review.'},
             {'icon': 'code', 'title': 'Technical', 'text': 'Specialists handle site structure, speed, indexing and structured data.'},
             {'icon': 'pen', 'title': 'Content and outreach', 'text': 'Writers and outreach specialists create pages and earn links.'}]},
  {'type': 'links', 'eyebrow': 'Join or work with us', 'heading': 'Next steps', 'items': ['career', 'about', 'contact'], 'cols': 3},
  {'type': 'cta', 'heading': 'Want this team working on your site?', 'text': 'Book a free SEO review and meet the people who would run your account.'},
 ]},
# ------------------------------------------------------------------ CAREER
{
 'slug': 'career', 'nav_label': 'Careers', 'icon': 'handshake',
 'title': 'Careers | SEO Jobs in Edmonton | BrandName',
 'description': 'Explore SEO careers at BrandName in Edmonton. See open roles, what we look for and how our hiring process works.',
 'keyword': 'seo jobs edmonton', 'card': 'Open roles and how we hire.',
 'sections': [
  {'type': 'page_hero', 'eyebrow': 'Careers', 'h1': 'Build a Career in SEO in Edmonton', 'lead': 'Join a team that values clear thinking, honest reporting and doing the work properly.'},
  {'type': 'cards', 'eyebrow': 'Why join', 'heading': 'What working here looks like', 'cols': 3,
   'items': [{'icon': 'book', 'title': '[[Perk 1]]', 'text': '[[Describe the benefit, for example a learning budget.]]'},
             {'icon': 'clock', 'title': '[[Perk 2]]', 'text': '[[Describe the benefit, for example flexible hours.]]'},
             {'icon': 'users', 'title': '[[Perk 3]]', 'text': '[[Describe the benefit, for example a hybrid office in Edmonton.]]'}]},
  {'type': 'jobs', 'eyebrow': 'Open roles', 'heading': 'Current openings', 'bg': 'soft',
   'items': [('[[Role title]]', '[[Full time · Edmonton · Hybrid]]'), ('[[Role title]]', '[[Full time · Edmonton · On site]]'), ('[[Role title]]', '[[Contract · Remote in Alberta]]')]},
  {'type': 'steps', 'eyebrow': 'Hiring process', 'heading': 'How we hire', 'items': [('Apply', 'Send your CV and a short note.'), ('Intro call', 'A 30 minute conversation.'), ('Task', 'A short paid practical task.'), ('Offer', 'Final chat and offer.')]},
  {'type': 'cta', 'heading': 'Do not see your role?', 'text': 'Send us your CV anyway. We are always happy to hear from good people.', 'button': ['Get in touch', 'contact']},
 ]},
# ------------------------------------------------------------------ FAQ
{
 'slug': 'faq', 'nav_label': 'FAQ', 'icon': 'message', 'page_type': 'FAQPage',
 'title': 'SEO FAQ | Edmonton SEO Questions Answered | BrandName',
 'description': 'Answers to common questions about SEO services in Edmonton: timelines, guarantees, reporting, local SEO and how we work with your team.',
 'keyword': 'seo faq edmonton', 'card': 'Straight answers to common questions.',
 'sections': [
  {'type': 'page_hero', 'eyebrow': 'FAQ', 'h1': 'SEO Questions, Answered', 'lead': 'The questions Edmonton business owners ask us most, with straight answers.'},
  {'type': 'faq', 'eyebrow': 'Getting started', 'heading': 'General questions', 'bg': '', 'items': GENERAL_FAQ},
  {'type': 'faq', 'eyebrow': 'Local search', 'heading': 'Local SEO and Google Business Profile', 'items': [
     ('What affects my ranking in Google Maps?', 'Google says local ranking is based mainly on relevance, distance and prominence. Prominence includes things like links to your business and your review count. See our {{Local SEO|services/local-seo}} page for how we work on each.'),
     ('Can I pay Google for a better local ranking?', 'No. Google states there is no way to request or pay for a better local ranking. Ads are a separate product.'),
     ('Do reviews help local rankings?', 'Google says more reviews and positive ratings can help your local ranking, and recommends responding to reviews. We help you build a steady, genuine review process.'),
     ('Do I need a page for every Edmonton neighbourhood?', 'Only where you have something useful and unique to say. Google treats pages built only to rank for similar city or region searches as doorway abuse, so we build location pages with real substance or not at all.')]},
  {'type': 'faq', 'eyebrow': 'Working together', 'heading': 'Process and reporting', 'bg': '', 'items': [
     ('What do monthly reports include?', 'Rankings for your target keywords, organic traffic, Business Profile activity and leads, with a short summary of what we did and what comes next.'),
     ('Do you need access to our website?', 'Usually yes, so we can make fixes directly. If you prefer, we can hand changes to your developer instead.'),
     ('How do we get started?', 'Book a {{free SEO review|contact}}. We will look at your site, then propose a plan.')]},
  {'type': 'cta', 'heading': 'Still have a question?', 'text': 'Ask us directly. We usually reply within one business day.', 'button': ['Contact us', 'contact']},
 ]},
# ------------------------------------------------------------------ PRICING / PACKAGES
{
 'slug': 'pricing', 'nav_label': 'SEO Packages', 'icon': 'layers',
 'title': 'SEO Packages for Edmonton Businesses | BrandName',
 'description': 'Compare BrandName SEO packages for Edmonton businesses: Local, Growth and Ecommerce. See what each includes and request a custom quote.',
 'keyword': 'seo packages edmonton', 'card': 'Compare our SEO packages.',
 'sections': [
  {'type': 'page_hero', 'eyebrow': 'Packages', 'h1': 'SEO Packages Built Around Your Goals', 'lead': 'Every business is different, so every quote is custom. These packages show where most clients start.'},
  {'type': 'packages', 'eyebrow': 'Choose a starting point', 'heading': 'Three ways to work with us', 'items': [
     {'name': 'Local', 'for': 'For single location businesses that want more calls from Google Maps.',
      'features': ['Google Business Profile management', 'Local citations and listings', 'Review generation process', 'Monthly local rank tracking', 'Monthly report and call']},
     {'name': 'Growth', 'badge': 'Most chosen', 'featured': True, 'for': 'For businesses ready to rank across all their services.',
      'features': ['Everything in Local', 'Technical SEO fixes', 'On-page optimization', 'New content every month', 'Link building outreach']},
     {'name': 'Ecommerce', 'for': 'For Shopify and WooCommerce stores selling online.',
      'features': ['Category and product page SEO', 'Product structured data', 'Merchant Center alignment', 'Technical and speed work', 'Revenue focused reporting']}]},
  {'type': 'table', 'eyebrow': 'Compare', 'heading': 'What is included', 'bg': 'soft', 'cols': ['Feature', 'Local', 'Growth', 'Ecommerce'],
   'rows': [['Business Profile management', 'Yes', 'Yes', 'Optional'], ['Technical SEO', 'Basic', 'Full', 'Full'], ['Content creation', 'No', 'Monthly', 'Monthly'],
            ['Link building', 'Local citations', 'Outreach', 'Outreach'], ['Structured data', 'LocalBusiness', 'Full site', 'Product and Offer'], ['Reporting', 'Monthly', 'Monthly', 'Monthly']]},
  {'type': 'faq', 'items': [('Why no fixed prices?', 'Scope depends on your site, competition and goals. We give you a written quote after a free review so you only pay for what you need.'),
                            ('Is there a minimum contract?', '[[Add your contract terms here.]]'), ('Can we start with just an audit?', 'Yes. Our {{SEO Audit|services/seo-audit}} is a stand-alone project.')]},
  {'type': 'cta', 'heading': 'Get a quote for your business', 'text': 'Tell us your goals and we will recommend the right package.'},
 ]},
# ------------------------------------------------------------------ CONTACT
{
 'slug': 'contact', 'nav_label': 'Contact', 'icon': 'mail', 'page_type': 'ContactPage',
 'title': 'Contact BrandName | Free SEO Review in Edmonton',
 'description': 'Contact BrandName for a free SEO review. Tell us about your Edmonton business and we will show you what to fix first on Google.',
 'keyword': 'edmonton seo company contact', 'card': 'Book a free SEO review.',
 'sections': [
  {'type': 'page_hero', 'eyebrow': 'Contact', 'h1': 'Book Your Free SEO Review', 'lead': 'Tell us about your business. We will review your site and Business Profile and come back with clear next steps.'},
  {'type': 'contact', 'eyebrow': 'Get in touch', 'heading': 'Talk to an Edmonton SEO specialist', 'intro': 'Prefer to call or email? Use the details below.',
   'info': [('pin', 'Office', '[[Street address]], Edmonton, AB [[Postal code]]'), ('phone', 'Phone', '[[Phone number]]'), ('mail', 'Email', '[[Email address]]'), ('clock', 'Hours', '[[Business hours]]')],
   'form_title': 'Send us a message', 'services': ['Local SEO', 'Technical SEO', 'On-Page SEO', 'Content SEO', 'Link Building', 'Google Business Profile', 'Ecommerce SEO', 'SEO Audit', 'AI Search Optimization', 'Not sure yet'],
   'note': 'We reply within one business day. Your details are used only to respond to your enquiry. See our {{Privacy Policy|privacy-policy}}.'},
  {'type': 'steps', 'eyebrow': 'What happens next', 'heading': 'After you get in touch', 'bg': 'soft',
   'items': [('We reply', 'Within one business day.'), ('Quick call', 'A 30 minute chat about your goals.'), ('Free review', 'We look at your site and profile and share what we find.')]},
  {'type': 'faq', 'items': GENERAL_FAQ[:3]},
 ]},
# ------------------------------------------------------------------ LEGAL
{
 'slug': 'privacy-policy', 'nav_label': 'Privacy Policy', 'icon': 'shield',
 'title': 'Privacy Policy | BrandName', 'description': 'How BrandName collects, uses and protects personal information submitted through this website.',
 'keyword': '', 'card': 'How we handle your data.',
 'sections': [
  {'type': 'page_hero', 'h1': 'Privacy Policy', 'lead': 'Last updated: [[Date]]'},
  {'type': 'prose', 'blocks': [
    ('callout', 'Template only. Have this policy reviewed by a qualified professional so it reflects your actual practices and applicable Canadian and Alberta privacy law before publishing.'),
    ('h2', '1. Information we collect'), ('p', 'When you submit our contact form we collect your name, email address, phone number, website and message. Our website may also collect basic usage data through analytics tools.'),
    ('h2', '2. How we use information'), ('p', 'We use your information to respond to your enquiry, provide our services and improve our website. We do not sell your personal information.'),
    ('h2', '3. Cookies and analytics'), ('p', '[[Describe the analytics and cookie tools used on this site.]]'),
    ('h2', '4. Third party services'), ('p', '[[List form, hosting and analytics providers that process data on your behalf.]]'),
    ('h2', '5. Data retention and security'), ('p', '[[Describe how long you keep enquiries and how you protect them.]]'),
    ('h2', '6. Your choices'), ('p', 'You can ask us to access, correct or delete your personal information by contacting us.'),
    ('h2', '7. Contact'), ('p', 'Questions about this policy: [[Email address]].')]},
 ]},
{
 'slug': 'terms', 'nav_label': 'Terms and Conditions', 'icon': 'doc',
 'title': 'Terms and Conditions | BrandName', 'description': 'The terms that apply to using the BrandName website.',
 'keyword': '', 'card': 'Website terms of use.',
 'sections': [
  {'type': 'page_hero', 'h1': 'Terms and Conditions', 'lead': 'Last updated: [[Date]]'},
  {'type': 'prose', 'blocks': [
    ('callout', 'Template only. Have these terms reviewed by a qualified professional before publishing.'),
    ('h2', '1. Use of this website'), ('p', 'By using this website you agree to these terms. Content is provided for general information and may change without notice.'),
    ('h2', '2. Intellectual property'), ('p', 'Website content, branding and design belong to [[Legal business name]] unless stated otherwise.'),
    ('h2', '3. No guarantee of results'), ('p', 'Information on this site does not guarantee any specific search ranking or business result.'),
    ('h2', '4. Links to other sites'), ('p', 'We link to third party websites for reference. We are not responsible for their content.'),
    ('h2', '5. Governing law'), ('p', '[[Confirm governing law and jurisdiction with your advisor.]]'),
    ('h2', '6. Contact'), ('p', 'Questions about these terms: [[Email address]].')]},
 ]},
# ------------------------------------------------------------------ 404
{
 'slug': '404', 'nav_label': 'Page not found', 'noindex': True, 'icon': 'compass',
 'title': 'Page Not Found | BrandName', 'description': 'The page you are looking for could not be found.', 'keyword': '', 'card': '',
 'sections': [
  {'type': 'notfound', 'h1': 'This page could not be found', 'lead': 'The link may be old or the page may have moved. Try our homepage or browse our SEO services.'},
  {'type': 'links', 'eyebrow': 'Popular pages', 'heading': 'Where to go next', 'items': ['services', 'case-studies', 'contact'], 'bg': 'soft'},
 ]},
]

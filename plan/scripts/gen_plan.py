"""Builds plan/content-plan.json: site structure + semantic SEO brief per page.

Keyword volumes: Ahrefs, Canada, pulled 2026-10-23 (plan/ahrefs-ca-2026-10-23.tsv).
Run: python3 gen_plan.py /path/to/repo/plan
"""
import json, os, sys, csv

OUT = sys.argv[1]
VOL = {}
with open(os.path.join(OUT, 'ahrefs-ca-2026-10-23.tsv')) as f:
    for row in csv.DictReader(f, delimiter='\t'):
        VOL[row['keyword']] = (int(row['volume']) if row['volume'] else 0, int(row['kd']) if row['kd'] else None)

def kw(k):
    v = VOL.get(k)
    return {'kw': k, 'volume': v[0] if v else None, 'kd': v[1] if v else None}

PAGES = []
def page(**p):
    p.setdefault('status', 'planned')
    p.setdefault('schema', [])
    p.setdefault('notes', '')
    PAGES.append(p)

# ------------------------------------------------------------------ shared entity sets
E_LOCAL = [
    ('Google Business Profile', 'product', 'the listing that appears in Maps and the local pack'),
    ('Google Maps / local pack (Map Pack)', 'search feature', 'the 3-business block above organic results'),
    ('relevance, distance, prominence', 'ranking factors', "Google's three published local ranking factors"),
    ('Google reviews', 'trust signal', 'count, rating, recency and owner replies'),
    ('NAP (name, address, phone)', 'data', 'must match on site, GBP and citations'),
    ('local citations', 'concept', 'listings on Yelp.ca, YellowPages.ca, Canpages, Clutch, chambers'),
]
E_TECH = [
    ('Google Search Console', 'tool', 'indexing, queries, Core Web Vitals reports'),
    ('Core Web Vitals (LCP, INP, CLS)', 'metric', 'loading, responsiveness, visual stability'),
    ('crawling and indexing', 'process', 'how Googlebot finds and stores pages'),
    ('XML sitemap / robots.txt / canonical tag', 'technical files', 'control what gets crawled and which URL counts'),
    ('structured data (schema.org)', 'markup', 'LocalBusiness, Service, FAQPage, BreadcrumbList'),
]
EDMONTON = ('Edmonton, Alberta', 'place', 'city served; capital of Alberta')
AREAS = ['areas/st-albert', 'areas/sherwood-park', 'areas/spruce-grove', 'areas/leduc', 'areas/fort-saskatchewan']

def ents(*groups):
    out = []
    for g in groups:
        for e in g:
            out.append({'name': e[0], 'type': e[1], 'note': e[2]})
    return out

def links(*pairs):
    return [{'to': '/' + t + ('/' if t else ''), 'anchor': a} for t, a in pairs]

# ================================================================== CORE
page(url='/', type='Homepage', group='Core', phase=1,
     primary=kw('edmonton seo services'),
     secondary=[kw(k) for k in ['seo services edmonton', 'seo edmonton', 'edmonton seo', 'seo consultant edmonton', 'seo company edmonton',
                                'edmonton seo company', 'seo expert edmonton', 'edmonton seo agency', 'seo agency edmonton']],
     title='Edmonton SEO Services | Local SEO That Drives Calls',
     h1='Edmonton SEO Services That Bring Real Calls and Leads',
     meta='Edmonton SEO services for local businesses. We help trades, law firms and clinics rank in Google Maps and turn searches into calls. Free audit.',
     breadcrumb=['Home'],
     central_entity='SEO services in Edmonton (the agency as a ProfessionalService)',
     entities=ents([EDMONTON], E_LOCAL[:3], [('search engine optimization (SEO)', 'service', 'the core offer'),
           ('local SEO / technical SEO / on-page SEO / link building', 'service types', 'sub-services, each with its own page'),
           ('St. Albert, Sherwood Park, Spruce Grove, Leduc, Fort Saskatchewan', 'places', 'nearby service area'),
           ('trades, legal, professional and health industries', 'audience', 'who the agency serves')]),
     attributes=[
        {'entity': 'The agency', 'attributes': ['Edmonton street address (same as GBP)', 'services offered', 'industries served', 'service area towns', 'how reporting works', 'what clients own (accounts, content)', 'no ranking guarantees (Google says nobody can guarantee #1)']},
        {'entity': 'SEO services in Edmonton', 'attributes': ['what is included', 'typical timeline to results (stated honestly)', 'how success is measured: calls, forms, bookings']},
        {'entity': 'Google Map Pack', 'attributes': ['why it matters for local searches', 'the 3 ranking factors']}],
     ngrams={'bigrams': ['seo services', 'edmonton seo', 'local seo', 'google maps', 'business profile', 'more calls', 'free audit', 'seo company'],
             'trigrams': ['edmonton seo services', 'seo services edmonton', 'google business profile', 'local seo services', 'seo consultant edmonton', 'map pack rankings']},
     skipgrams=[['edmonton', 'seo services'], ['google maps', 'calls'], ['reviews', 'map pack'], ['audit', 'plan'], ['report', 'leads'], ['local businesses', 'rank']],
     faqs=['How long does SEO take to work in Edmonton?', 'How much do SEO services cost in Edmonton?', 'Can you guarantee a #1 ranking on Google?', 'Do you work with businesses outside Edmonton?', 'What do I own if we stop working together?'],
     outline=[{'h2': 'Edmonton SEO services built around calls, not just rankings', 'h3': []},
              {'h2': 'Our SEO services', 'h3': ['Local SEO', 'Google Business Profile optimization', 'Technical SEO', 'On-page SEO', 'Link building', 'SEO content writing']},
              {'h2': 'Industries we help in Edmonton', 'h3': ['Trades and home services', 'Law firms', 'Professional and health clinics']},
              {'h2': 'How a project runs', 'h3': ['Audit', 'Plan', 'Build', 'Report']},
              {'h2': 'How Google ranks local businesses', 'h3': []},
              {'h2': 'Serving Edmonton and surrounding areas', 'h3': []},
              {'h2': 'Pricing and packages', 'h3': []},
              {'h2': 'Edmonton SEO FAQ', 'h3': []}],
     uniqueness='Only page allowed to use "Edmonton SEO services" / "SEO services Edmonton" in title or H1. GBP website link points here. Use real proof (results, reviews) as soon as it exists.',
     internal_links=links(('services', 'our SEO services'), ('services/local-seo', 'local SEO'), ('services/google-business-profile-optimization', 'Google Business Profile optimization'),
                          ('services/technical-seo', 'technical SEO'), ('industries', 'industries we serve'), ('industries/hvac', 'HVAC SEO'), ('industries/plumbers', 'plumbing SEO'),
                          ('industries/law-firms', 'law firm SEO'), ('industries/dentists', 'dental SEO'), ('areas/st-albert', 'St. Albert'), ('areas/sherwood-park', 'Sherwood Park'),
                          ('areas/spruce-grove', 'Spruce Grove'), ('areas/leduc', 'Leduc'), ('areas/fort-saskatchewan', 'Fort Saskatchewan'), ('free-seo-audit', 'get a free SEO audit'), ('pricing', 'SEO pricing')),
     schema=['ProfessionalService (areaServed: Edmonton + 5 towns)', 'WebSite', 'WebPage', 'FAQPage'],
     notes='Homepage owns the whole head-term cluster (about 7,500 searches/month combined). The agency/company terms share a SERP with the head terms, so they stay here instead of on About.')

page(url='/about/', type='Core', group='Core', phase=1,
     primary={'kw': '[brand name] / about our Edmonton SEO team', 'volume': None, 'kd': None},
     secondary=[],
     title='About Us | Edmonton SEO Team With Real Local Experience',
     h1='About Our Edmonton SEO Team',
     meta='Meet the Edmonton SEO team behind our work: who we are, how we work, what we believe and the local businesses we help grow through search.',
     breadcrumb=['Home', 'About'],
     central_entity='The agency (Organization) and its people',
     entities=ents([EDMONTON, ('founder and team members', 'people', 'names, roles, photos, experience'), ('Google Search Essentials', 'guideline', 'the rules the agency follows'),
                    ('Edmonton Chamber of Commerce', 'organization', 'membership if real')]),
     attributes=[{'entity': 'The agency', 'attributes': ['founding year and story', 'real office address', 'team size', 'values: transparency, logged changes, client ownership', 'memberships and certifications (only real ones)']},
                 {'entity': 'Each team member', 'attributes': ['name', 'role', 'years in SEO', 'specialty', 'photo', 'LinkedIn']}],
     ngrams={'bigrams': ['seo team', 'local businesses', 'our story', 'how we work'], 'trigrams': ['edmonton seo team', 'google search essentials', 'every change logged']},
     skipgrams=[['team', 'edmonton'], ['transparency', 'reporting'], ['experience', 'local search']],
     faqs=['Who will work on my account?', 'Are you based in Edmonton?'],
     outline=[{'h2': 'Our story', 'h3': []}, {'h2': 'What we believe', 'h3': ['Transparency', 'Search Essentials first', 'Business outcomes']}, {'h2': 'Meet the team', 'h3': []}, {'h2': 'Working with us', 'h3': []}],
     uniqueness='E-E-A-T page: real people, real address, real history. No keyword targeting beyond the brand.',
     internal_links=links(('', 'Edmonton SEO services'), ('case-studies', 'our results'), ('contact', 'contact our team'), ('free-seo-audit', 'free SEO audit')),
     schema=['AboutPage', 'Organization', 'Person (team)'],
     notes='Spreadsheet gave About "edmonton seo agency"; moved to the homepage to avoid two pages competing for the same SERP.')

page(url='/contact/', type='Core', group='Core', phase=1,
     primary={'kw': 'contact edmonton seo company', 'volume': None, 'kd': None}, secondary=[],
     title='Contact Us | Free SEO Consultation in Edmonton',
     h1='Contact Our Edmonton SEO Team',
     meta='Book a free SEO consultation with our Edmonton team. Call, email or visit our office. We reply within one business day with clear next steps.',
     breadcrumb=['Home', 'Contact'],
     central_entity='Contact point for the agency (NAP)',
     entities=ents([EDMONTON, E_LOCAL[4], ('embedded Google Map', 'feature', 'office location'), ('business hours', 'data', 'same as GBP')]),
     attributes=[{'entity': 'Office', 'attributes': ['street address exactly as on GBP', 'phone', 'email', 'hours', 'parking / directions', 'map embed']}],
     ngrams={'bigrams': ['contact us', 'free consultation', 'business day'], 'trigrams': ['free seo consultation', 'contact our team']},
     skipgrams=[['call', 'email'], ['address', 'edmonton']],
     faqs=['What happens after I contact you?', 'How fast do you reply?'],
     outline=[{'h2': 'Get in touch', 'h3': ['Office', 'Phone', 'Email', 'Hours']}, {'h2': 'Send us a message', 'h3': []}, {'h2': 'What happens next', 'h3': []}],
     uniqueness='NAP must match GBP character for character.',
     internal_links=links(('', 'Edmonton SEO services'), ('free-seo-audit', 'free SEO audit'), ('privacy-policy', 'privacy policy')),
     schema=['ContactPage', 'ProfessionalService'])

page(url='/pricing/', type='Core', group='Core', phase=1,
     primary=kw('seo pricing edmonton'), secondary=[kw('seo packages edmonton'), kw('seo cost canada')],
     title='SEO Pricing and Packages in Edmonton | Transparent Plans',
     h1='SEO Pricing and Packages',
     meta='Clear monthly SEO packages for Edmonton businesses. See what each plan includes, price ranges and what results to expect before you commit.',
     breadcrumb=['Home', 'Pricing'],
     central_entity='SEO packages (Offer) and their price ranges',
     entities=ents([('SEO package', 'offer', 'Local, Growth, Ecommerce'), ('monthly retainer', 'pricing model', ''), ('one-time SEO audit', 'offer', ''), ('contract term', 'attribute', 'minimum term or month to month')]),
     attributes=[{'entity': 'Each package', 'attributes': ['price range in CAD per month', 'who it is for', 'what is included', 'what is not included', 'reporting frequency', 'contract terms']}],
     ngrams={'bigrams': ['seo pricing', 'seo packages', 'monthly seo', 'price range', 'custom quote'], 'trigrams': ['seo pricing edmonton', 'local seo package', 'what is included']},
     skipgrams=[['price', 'included'], ['package', 'results'], ['contract', 'month']],
     faqs=['How much does SEO cost per month in Edmonton?', 'Is there a minimum contract?', 'Can I start with just an audit?', 'Why do SEO prices vary so much?'],
     outline=[{'h2': 'Packages', 'h3': ['Local', 'Growth', 'Ecommerce']}, {'h2': 'Compare what is included', 'h3': []}, {'h2': 'What affects SEO cost', 'h3': []}, {'h2': 'Pricing FAQ', 'h3': []}],
     uniqueness='Spreadsheet says show price ranges. Real CAD ranges make this page linkable and trustworthy; "custom quote only" pages rarely rank.',
     internal_links=links(('', 'Edmonton SEO services'), ('free-seo-audit', 'free SEO audit'), ('services/seo-audit', 'one-time SEO audit'), ('blog/how-much-does-seo-cost-in-canada', 'how much SEO costs in Canada')),
     schema=['WebPage', 'Offer (per package)', 'FAQPage'],
     notes='No Edmonton volume measured; national "how much does seo cost" (70) belongs to the blog post that links here.')

page(url='/free-seo-audit/', type='Lead magnet', group='Core', phase=1,
     primary=kw('free seo audit edmonton'), secondary=[kw('free seo audit')],
     title='Free SEO Audit for Edmonton Businesses | Get Your Report',
     h1='Get a Free SEO Audit for Your Business',
     meta='Find out why competitors outrank you. Get a free local SEO and Google Business Profile audit for your Edmonton business, with clear next steps.',
     breadcrumb=['Home', 'Free SEO Audit'],
     central_entity='Free local SEO audit (lead offer)',
     entities=ents(E_LOCAL[:2], [('audit report', 'deliverable', 'what the prospect receives'), ('competitor comparison', 'deliverable', 'top 3 map pack rivals')]),
     attributes=[{'entity': 'Free audit', 'attributes': ['what we check (GBP, site speed, on-page, reviews, citations)', 'delivery time', 'format (video or PDF)', 'no obligation', 'what we need from you']}],
     ngrams={'bigrams': ['free audit', 'seo audit', 'audit report'], 'trigrams': ['free seo audit', 'google business profile audit', 'local seo audit']},
     skipgrams=[['free', 'report'], ['competitors', 'outrank'], ['audit', 'next steps']],
     faqs=['Is the audit really free?', 'How long does it take?', 'What is the difference between the free audit and the paid SEO audit?'],
     outline=[{'h2': 'What your free audit covers', 'h3': []}, {'h2': 'How it works', 'h3': []}, {'h2': 'Request your audit', 'h3': []}],
     uniqueness='Short conversion page. Must clearly differ from /services/seo-audit/ (free = quick local snapshot; paid = full technical audit) so the two do not compete.',
     internal_links=links(('', 'Edmonton SEO services'), ('services/seo-audit', 'full SEO audit')),
     schema=['WebPage', 'Offer (price 0)'])

# ================================================================== SERVICES
def service(slug, name, primary, secondary, title, h1, meta, central, entities, attributes, bigrams, trigrams, skipgrams, faqs, outline, uniqueness, industries, phase, notes=''):
    page(url='/services/%s/' % slug, type='Service', group='Services', phase=phase, primary=primary, secondary=secondary,
         title=title, h1=h1, meta=meta, breadcrumb=['Home', 'Services', name], central_entity=central, entities=entities, attributes=attributes,
         ngrams={'bigrams': bigrams, 'trigrams': trigrams}, skipgrams=skipgrams, faqs=faqs, outline=outline, uniqueness=uniqueness,
         internal_links=links(('', 'our Edmonton SEO team'), *[('industries/' + i, l) for i, l in industries], ('free-seo-audit', 'free SEO audit')),
         schema=['Service (provider: agency, areaServed: Edmonton)', 'BreadcrumbList', 'FAQPage'], notes=notes)

page(url='/services/', type='Hub', group='Services', phase=1,
     primary={'kw': 'seo services (hub)', 'volume': None, 'kd': None}, secondary=[kw('local seo')],
     title='Our SEO Services | Local, Technical and On-Page SEO',
     h1='SEO Services for Local Businesses',
     meta='Explore our local SEO, Google Business Profile, technical SEO, link building, content and AI search services for Edmonton-area businesses.',
     breadcrumb=['Home', 'Services'],
     central_entity='The set of SEO services offered',
     entities=ents([('local SEO', 'service', ''), ('technical SEO', 'service', ''), ('on-page SEO', 'service', ''), ('link building', 'service', ''), ('content writing', 'service', ''),
                    ('SEO audit', 'service', ''), ('ecommerce SEO', 'service', ''), ('AI search optimization', 'service', '')]),
     attributes=[{'entity': 'Each service', 'attributes': ['one-line definition', 'who needs it', 'link to its page']}],
     ngrams={'bigrams': ['seo services', 'local seo', 'technical seo', 'link building'], 'trigrams': ['google business profile', 'seo content writing', 'ai search optimization']},
     skipgrams=[['goal', 'service'], ['audit', 'start']],
     faqs=['Which SEO service do I need first?', 'Can I combine services?'],
     outline=[{'h2': 'Choose a service', 'h3': []}, {'h2': 'Which service fits your goal?', 'h3': []}, {'h2': 'How every engagement runs', 'h3': []}],
     uniqueness='Navigation hub. Must not use "Edmonton SEO services" in title/H1 (homepage owns it).',
     internal_links=links(('', 'Edmonton SEO services'), ('services/local-seo', 'local SEO'), ('services/google-business-profile-optimization', 'GBP optimization'), ('services/technical-seo', 'technical SEO'),
                          ('services/on-page-seo', 'on-page SEO'), ('services/link-building', 'link building'), ('services/content-writing', 'SEO content writing'), ('services/seo-audit', 'SEO audit'),
                          ('services/ecommerce-seo', 'ecommerce SEO'), ('services/ai-search-optimization', 'AI search optimization'), ('free-seo-audit', 'free SEO audit')),
     schema=['CollectionPage', 'BreadcrumbList'])

service('local-seo', 'Local SEO', kw('local seo edmonton'), [kw('local seo services edmonton'), kw('local seo')],
        'Local SEO Edmonton | Rank in Google Maps and Local Search', 'Local SEO Services in Edmonton',
        'Get found in the Google Map Pack. Edmonton local SEO covering your Business Profile, citations, reviews and local pages that turn searches into calls.',
        'Local SEO (Service) for Edmonton businesses',
        ents([EDMONTON], E_LOCAL, [('service area business vs storefront', 'concept', 'how GBP shows the address'), ('local landing pages', 'asset', ''), ('local rank tracking (grid)', 'method', 'rankings vary by neighbourhood')]),
        [{'entity': 'Local SEO', 'attributes': ['definition', 'what is included', 'who it suits (storefront and service area)', 'timeline expectations', 'KPIs: calls, direction requests, bookings']},
         {'entity': 'Map Pack', 'attributes': ['3 results', 'relevance/distance/prominence', 'varies by searcher location across Edmonton']},
         {'entity': 'Google reviews', 'attributes': ['steady genuine flow', 'owner replies', 'no incentives or gating (Maps contribution policy)']}],
        ['local seo', 'google maps', 'map pack', 'business profile', 'local citations', 'service area', 'near me'],
        ['local seo edmonton', 'local seo services', 'google business profile', 'local search results', 'name address phone'],
        [['distance', 'prominence'], ['reviews', 'ranking'], ['citations', 'consistent'], ['neighbourhood', 'rankings'], ['calls', 'directions']],
        ['How long does local SEO take?', 'Do reviews help local rankings?', 'Can I rank in areas where I have no office?', 'What is the difference between local SEO and regular SEO?'],
        [{'h2': 'What local SEO includes', 'h3': ['Business Profile optimization', 'Reviews', 'Citations', 'Local landing pages', 'Local links', 'Rank tracking by neighbourhood']},
         {'h2': 'How Google ranks local businesses', 'h3': ['Relevance', 'Distance', 'Prominence']},
         {'h2': 'Storefront or service area business?', 'h3': []}, {'h2': 'Our local SEO process', 'h3': []}, {'h2': 'Local SEO FAQ', 'h3': []}],
        'Explain local ranking with Edmonton examples (results differ between Windermere and St. Albert). Owns "local seo edmonton"; homepage must not use it in title/H1.',
        [('hvac', 'HVAC SEO'), ('plumbers', 'plumbing SEO'), ('roofers', 'roofing SEO'), ('dentists', 'dental SEO'), ('law-firms', 'law firm SEO')], 1)

service('google-business-profile-optimization', 'Google Business Profile', kw('google business profile optimization edmonton'), [kw('google business profile optimization'), kw('google my business edmonton')],
        'Google Business Profile Optimization in Edmonton', 'Google Business Profile Optimization',
        'We optimize and manage your Google Business Profile so your Edmonton business shows up in Maps, earns more reviews and gets more calls each month.',
        'Google Business Profile (product) optimization and management',
        ents([EDMONTON], E_LOCAL[:5], [('primary and secondary categories', 'GBP field', ''), ('GBP services, products, attributes', 'GBP fields', ''), ('GBP posts and photos', 'content', ''),
                                       ('Google Maps contribution policy', 'policy', 'review and content rules'), ('suspension and reinstatement', 'risk', '')]),
        [{'entity': 'Google Business Profile', 'attributes': ['primary category choice', 'services list', 'hours and special hours', 'photos', 'posts', 'Q&A', 'review replies', 'verification', 'service area settings']},
         {'entity': 'Optimization service', 'attributes': ['one-time setup vs monthly management', 'what we change', 'how we report (calls, direction requests, website clicks)']}],
        ['business profile', 'google maps', 'primary category', 'review replies', 'profile photos'],
        ['google business profile', 'business profile optimization', 'google my business', 'service area settings'],
        [['category', 'relevance'], ['photos', 'engagement'], ['reviews', 'replies'], ['hours', 'accurate'], ['suspension', 'guidelines']],
        ['Is Google My Business the same as Google Business Profile?', 'Why was my profile suspended?', 'How often should I post on my profile?', 'Can I add more than one location?'],
        [{'h2': 'What we optimize on your profile', 'h3': ['Categories', 'Services and attributes', 'Photos and posts', 'Reviews and replies', 'Service areas']},
         {'h2': 'Setup vs ongoing management', 'h3': []}, {'h2': 'Avoiding suspensions', 'h3': []}, {'h2': 'GBP FAQ', 'h3': []}],
        'Mention the old name (Google My Business) once to catch that wording. Slug changed from /services/google-business-profile/ to match the doc.',
        [('plumbers', 'plumbing SEO'), ('locksmiths', 'locksmith SEO'), ('dentists', 'dental SEO'), ('med-spas', 'med spa SEO')], 1,
        'National "google business profile optimization" = 450/mo, KD 2. Edmonton version = 10/mo.')

service('technical-seo', 'Technical SEO', kw('technical seo edmonton'), [{'kw': 'technical seo audit', 'volume': None, 'kd': None}, {'kw': 'core web vitals', 'volume': 400, 'kd': None}],
        'Technical SEO Edmonton | Speed, Indexing and Site Health', 'Technical SEO Services in Edmonton',
        'Fix crawl errors, slow pages and indexing issues. Technical SEO for Edmonton businesses that need a fast, Google-friendly website that converts.',
        'Technical SEO (Service)',
        ents(E_TECH, [('page speed', 'metric', ''), ('mobile-first indexing', 'concept', ''), ('HTTPS', 'protocol', ''), ('site architecture / internal links', 'concept', '')]),
        [{'entity': 'Technical SEO', 'attributes': ['what we fix', 'tools used (Search Console, PageSpeed Insights)', 'CMS covered (WordPress, Shopify, Wix, Squarespace)', 'deliverables', 'developer handoff']},
         {'entity': 'Core Web Vitals', 'attributes': ['LCP, INP, CLS thresholds', 'how measured (field data)']}],
        ['technical seo', 'site speed', 'core web', 'web vitals', 'crawl errors', 'structured data', 'search console'],
        ['technical seo audit', 'core web vitals', 'xml sitemap', 'page speed optimization'],
        [['crawl', 'index'], ['speed', 'mobile'], ['schema', 'rich results'], ['redirects', 'canonical'], ['search console', 'errors']],
        ['What is technical SEO?', 'Do Core Web Vitals affect rankings?', 'Can you work on WordPress and Shopify?', 'Will you need access to my website?'],
        [{'h2': 'What technical SEO covers', 'h3': ['Crawling and indexing', 'Site speed and Core Web Vitals', 'Structured data', 'Redirects and canonicals', 'Mobile usability']},
         {'h2': 'How we work with your developer', 'h3': []}, {'h2': 'Technical SEO FAQ', 'h3': []}],
        'Zero measured Edmonton volume: this page earns its place as a support page for audits and as proof of depth.',
        [('ecommerce-seo-placeholder', ''), ('law-firms', 'law firm SEO'), ('dentists', 'dental SEO'), ('contractors', 'contractor SEO')], 1)

service('on-page-seo', 'On-Page SEO', kw('on page seo edmonton'), [{'kw': 'on page optimization', 'volume': None, 'kd': None}, {'kw': 'title tags', 'volume': None, 'kd': None}],
        'On-Page SEO Edmonton | Pages Built to Rank and Convert', 'On-Page SEO Services in Edmonton',
        'We optimize titles, content, headings, schema and internal links so every page on your site targets the right local searches and turns visits into leads.',
        'On-page SEO (Service)',
        ents([('title tag and meta description', 'HTML element', ''), ('headings (H1-H3)', 'HTML element', ''), ('search intent', 'concept', ''), ('internal links and anchor text', 'concept', ''),
              ('keyword cannibalization', 'problem', ''), ('structured data', 'markup', '')]),
        [{'entity': 'On-page SEO', 'attributes': ['page-by-page keyword mapping', 'titles and metas', 'content gaps', 'internal linking', 'conversion elements (calls to action, phone)']}],
        ['on page', 'title tags', 'meta descriptions', 'search intent', 'internal links'],
        ['on page seo', 'title tag optimization', 'keyword mapping', 'internal linking strategy'],
        [['title', 'click'], ['intent', 'content'], ['headings', 'structure'], ['internal links', 'authority']],
        ['What is the difference between on-page and technical SEO?', 'Will you rewrite my content?', 'How do you choose keywords for each page?'],
        [{'h2': 'What we optimize on each page', 'h3': ['Titles and meta descriptions', 'Headings and copy', 'Internal links', 'Schema']}, {'h2': 'Keyword mapping', 'h3': []}, {'h2': 'On-page SEO FAQ', 'h3': []}],
        'Show a real before/after title rewrite example.',
        [('electricians', 'electrician SEO'), ('accountants', 'accountant SEO'), ('realtors', 'realtor SEO')], 1)

service('link-building', 'Link Building', kw('link building edmonton'), [kw('link building services'), {'kw': 'local link building', 'volume': None, 'kd': None}],
        'Link Building Edmonton | Local, Safe and Relevant Links', 'Local Link Building in Edmonton',
        'Earn relevant Canadian and Alberta backlinks and citations that build authority and help your Edmonton business outrank local competitors safely.',
        'Link building (Service), local and Canadian',
        ents(E_LOCAL[5:], [('backlinks', 'concept', ''), ('Google spam policies (link spam)', 'policy', 'what not to do'), ('Edmonton Chamber of Commerce and town chambers', 'organization', 'local link sources'),
                           ('sponsorships, local news, suppliers, associations', 'link sources', ''), ('anchor text', 'concept', '')]),
        [{'entity': 'Link building', 'attributes': ['sources used (local orgs, news, associations, suppliers)', 'what we never do (buying links, PBNs)', 'reporting of every link earned', 'citations vs editorial links']}],
        ['link building', 'local links', 'backlinks', 'link spam', 'anchor text'],
        ['link building services', 'local link building', 'chamber of commerce', 'google spam policies'],
        [['links', 'relevant'], ['sponsorship', 'link'], ['citations', 'directories'], ['spam', 'penalty']],
        ['Do you buy links?', 'How many links do I need?', 'Are directory citations still useful?'],
        [{'h2': 'Where our links come from', 'h3': ['Local organizations and chambers', 'Edmonton media', 'Industry associations', 'Suppliers and partners']},
         {'h2': 'What we never do', 'h3': []}, {'h2': 'Link building FAQ', 'h3': []}],
        'Name real Edmonton-area link sources (chambers listed in the area pages).',
        [('contractors', 'contractor SEO'), ('law-firms', 'law firm SEO'), ('roofers', 'roofing SEO')], 1,
        'National "link building services" = 700/mo, KD 4. Edmonton = 20/mo.')

service('content-writing', 'SEO Content Writing', kw('content writing edmonton'), [{'kw': 'seo content writing edmonton', 'volume': None, 'kd': None}, kw('seo copywriter edmonton')],
        'SEO Content Writing Edmonton | Pages and Blogs That Rank', 'SEO Content Writing Services',
        'Service pages, location pages and blogs written by people who know local SEO. Content that ranks in Edmonton and turns readers into enquiries.',
        'SEO content writing (Service)',
        ents([('service pages', 'asset', ''), ('location pages', 'asset', ''), ('blog posts', 'asset', ''), ('helpful content (people-first)', 'Google concept', ''),
              ('E-E-A-T', 'Google concept', 'experience, expertise, authoritativeness, trust'), ('doorway pages', 'spam policy', 'what location pages must avoid')]),
        [{'entity': 'Content service', 'attributes': ['page types written', 'research process (interviews, SERP review)', 'who writes (humans, local knowledge)', 'editing and fact-check', 'turnaround and volume']}],
        ['content writing', 'seo content', 'service pages', 'blog posts', 'location pages'],
        ['seo content writing', 'people first content', 'location pages that rank'],
        [['content', 'expertise'], ['location pages', 'unique'], ['blog', 'leads']],
        ['Do you use AI to write content?', 'How many pages per month?', 'Can you write location pages without them being doorway pages?'],
        [{'h2': 'What we write', 'h3': ['Service pages', 'Location pages', 'Blog posts']}, {'h2': 'How we research', 'h3': []}, {'h2': 'Content FAQ', 'h3': []}],
        'Answer the AI question honestly.',
        [('law-firms', 'law firm SEO'), ('immigration-lawyers', 'immigration lawyer SEO'), ('med-spas', 'med spa SEO')], 2)

service('seo-audit', 'SEO Audit', kw('seo audit edmonton'), [{'kw': 'website seo audit', 'volume': None, 'kd': None}],
        'SEO Audit Edmonton | Find What Is Holding You Back', 'Professional SEO Audit in Edmonton',
        'A complete technical, on-page and local SEO audit with a clear, prioritized action plan for your Edmonton business. No jargon, just priorities.',
        'SEO audit (paid Service)',
        ents(E_TECH[:3], E_LOCAL[:1], [('prioritized fix list', 'deliverable', ''), ('competitor gap analysis', 'deliverable', ''), ('backlink profile review', 'analysis', '')]),
        [{'entity': 'SEO audit', 'attributes': ['scope (technical, on-page, local, links, content)', 'deliverable format', 'turnaround time', 'price or price range', 'walkthrough call', 'how it differs from the free audit']}],
        ['seo audit', 'site audit', 'fix list', 'action plan'],
        ['seo audit edmonton', 'technical seo audit', 'prioritized action plan'],
        [['audit', 'priorities'], ['issues', 'impact'], ['competitors', 'gaps']],
        ['What does an SEO audit include?', 'How long does an audit take?', 'Can my developer implement the fixes?'],
        [{'h2': 'What the audit covers', 'h3': ['Technical', 'On-page', 'Local', 'Links', 'Content']}, {'h2': 'What you receive', 'h3': []}, {'h2': 'Free audit vs full audit', 'h3': []}, {'h2': 'SEO audit FAQ', 'h3': []}],
        'Must state clearly how it differs from /free-seo-audit/.',
        [('law-firms', 'law firm SEO'), ('dentists', 'dental SEO'), ('contractors', 'contractor SEO')], 1)

service('ecommerce-seo', 'Ecommerce SEO', kw('ecommerce seo edmonton'), [kw('shopify seo canada'), kw('ecommerce seo canada')],
        'Ecommerce SEO Edmonton | Shopify and WooCommerce SEO', 'Ecommerce SEO for Edmonton Online Stores',
        'Category and product SEO for Edmonton Shopify and WooCommerce stores. Product structured data, Merchant Center alignment and revenue reporting.',
        'Ecommerce SEO (Service)',
        ents([('Shopify', 'platform', ''), ('WooCommerce', 'platform', ''), ('Google Merchant Center', 'tool', 'free product listings'), ('Product and Offer structured data', 'markup', ''),
              ('category pages', 'asset', ''), ('faceted navigation', 'technical issue', ''), ('GA4 ecommerce tracking', 'tool', '')]),
        [{'entity': 'Ecommerce SEO', 'attributes': ['platforms supported', 'category vs product page strategy', 'structured data', 'Merchant Center', 'duplicate content from variants', 'revenue-based reporting']}],
        ['ecommerce seo', 'shopify seo', 'product pages', 'category pages', 'merchant center'],
        ['shopify seo canada', 'product structured data', 'google merchant center'],
        [['product', 'schema'], ['category', 'rank'], ['variants', 'duplicate'], ['revenue', 'organic']],
        ['Does Shopify handle SEO for me?', 'Should I optimize category or product pages first?', 'What is Google Merchant Center?'],
        [{'h2': 'What ecommerce SEO includes', 'h3': ['Category pages', 'Product pages', 'Structured data', 'Merchant Center', 'Technical fixes']}, {'h2': 'Shopify vs WooCommerce', 'h3': []}, {'h2': 'Ecommerce SEO FAQ', 'h3': []}],
        'Angle on Shopify (200/mo in Canada). Edmonton-specific volume is zero; this page is about depth, not local demand.',
        [('appliance-repair', 'appliance repair SEO')], 2)

service('ai-search-optimization', 'AI Search Optimization', kw('ai search optimization'), [kw('ai seo services'), kw('generative engine optimization')],
        'AI Search Optimization Edmonton | AI Overviews and GEO', 'AI Search Optimization for Edmonton Businesses',
        'Prepare your Edmonton business for Google AI Overviews, AI Mode and AI assistants with clear content, structured data and strong local signals.',
        'AI search optimization / generative engine optimization (Service)',
        ents([('Google AI Overviews', 'search feature', ''), ('AI Mode', 'search feature', ''), ('ChatGPT, Gemini, Perplexity', 'AI assistants', ''), ('generative engine optimization (GEO)', 'concept', ''),
              ('llms.txt', 'file', 'emerging convention, not a Google requirement'), ('Google Search Central: AI features and your website', 'documentation', 'Google says normal SEO best practices apply')]),
        [{'entity': 'AI search optimization', 'attributes': ["what Google says (no special markup needed)", 'how we check citations in AI answers', 'content structure (clear answers, entities)', 'local signals that AI uses (GBP, reviews)', 'how we measure']}],
        ['ai search', 'ai overviews', 'ai mode', 'generative engine', 'ai assistants'],
        ['ai search optimization', 'generative engine optimization', 'google ai overviews', 'ai seo services'],
        [['ai overviews', 'cited'], ['entities', 'answers'], ['structured data', 'ai'], ['reviews', 'ai assistants']],
        ['Do I need special optimization for AI Overviews?', 'Is GEO different from SEO?', 'Can you get my business mentioned in ChatGPT?'],
        [{'h2': 'How AI search finds local businesses', 'h3': []}, {'h2': 'What Google says about AI features', 'h3': []}, {'h2': 'What we do', 'h3': ['Content clarity', 'Entity and schema work', 'Local signals', 'Citation tracking']}, {'h2': 'AI search FAQ', 'h3': []}],
        'Be honest: Google says standard SEO applies. That honesty is the differentiator. KD 37 for primary; "ai seo services" (800, KD 7) is easier.',
        [('law-firms', 'law firm SEO'), ('dentists', 'dental SEO'), ('med-spas', 'med spa SEO')], 2,
        'Consider making "ai seo services" (800/mo, KD 7) the primary instead; decide after checking the SERP.')

service('website-design', 'Website Design', kw('website design edmonton'), [kw('web design edmonton')],
        'SEO-Friendly Website Design in Edmonton', 'Website Design Built for SEO',
        'Fast, mobile-friendly websites for Edmonton trades and service businesses, built from day one to rank on Google and turn visitors into calls.',
        'Website design (Service), SEO-first',
        ents(E_TECH[1:2], [('mobile-friendly design', 'attribute', ''), ('conversion rate', 'metric', ''), ('CMS (WordPress, Next.js)', 'technology', '')]),
        [{'entity': 'Website design', 'attributes': ['process', 'timeline', 'price range', 'SEO built in', 'who owns the site']}],
        ['website design', 'web design', 'mobile friendly'], ['website design edmonton', 'web design edmonton', 'seo friendly website'],
        [['design', 'speed'], ['website', 'calls']], ['How long does a new website take?', 'Will a redesign hurt my rankings?'],
        [{'h2': 'Websites built to rank', 'h3': []}, {'h2': 'Our process', 'h3': []}, {'h2': 'Redesign without losing rankings', 'h3': []}],
        'Optional. Competitive (KD 52-62); only build if the agency actually sells design.',
        [('contractors', 'contractor SEO'), ('roofers', 'roofing SEO')], 3, 'Optional page (Phase 3).')

service('google-ads-management', 'Google Ads Management', kw('google ads management edmonton'), [kw('ppc edmonton')],
        'Google Ads Management Edmonton | PPC for Local Business', 'Google Ads Management in Edmonton',
        'Get calls now while SEO grows. Google Ads and Local Services Ads management for Edmonton service businesses, tracked to real leads.',
        'Google Ads / PPC management (Service)',
        ents([('Google Ads', 'product', ''), ('Local Services Ads (Google Screened / Guaranteed)', 'product', ''), ('cost per lead', 'metric', ''), ('call tracking', 'method', '')]),
        [{'entity': 'Ads management', 'attributes': ['management fee model', 'minimum ad spend', 'tracking', 'reporting', 'how ads and SEO work together']}],
        ['google ads', 'ppc management', 'local services', 'cost per lead'], ['google ads management', 'local services ads'],
        [['ads', 'seo'], ['budget', 'leads']], ['Should I run ads and SEO at the same time?', 'What is a Local Services Ad?'],
        [{'h2': 'Ads that pay for themselves', 'h3': []}, {'h2': 'Local Services Ads', 'h3': []}, {'h2': 'Ads + SEO', 'h3': []}],
        'Optional. 300/mo Edmonton.', [('plumbers', 'plumbing SEO'), ('hvac', 'HVAC SEO')], 3, 'Optional page (Phase 3).')

# ================================================================== INDUSTRIES
IND = [
 # slug, name, kw, secondary, group, phase, gbp_category, industry entities, customer queries, season, trust, angle, services
 ('plumbers', 'Plumbers', 'plumbing seo', ['plumber seo', 'seo for plumbers'], 'Trades', 1, 'Plumber',
  [('emergency plumber', 'service', '24/7 calls'), ('frozen and burst pipes', 'problem', 'Edmonton winters'), ('hot water tanks', 'service', ''), ('drain cleaning / sewer backup', 'service', ''), ('sump pumps', 'service', 'spring runoff'),
   ('EPCOR', 'organization', "Edmonton's water utility"), ('City of Edmonton plumbing permits', 'regulation', ''), ('Alberta journeyperson plumber / gasfitter', 'credential', '')],
  ['plumber near me', 'emergency plumber edmonton', 'frozen pipes', 'hot water tank replacement', 'drain cleaning', 'sewer backup', 'sump pump repair'],
  'Winter frozen-pipe spikes; spring sump pump and backup calls', 'Journeyperson tickets, permits, insurance, 24/7 availability', 'Emergency searches are mobile and urgent: speed of answer and review count decide the call.',
  ['local-seo', 'google-business-profile-optimization', 'google-ads-management'], 'how-edmonton-plumbers-get-more-google-maps-calls'),
 ('electricians', 'Electricians', 'electrician seo', ['seo for electricians'], 'Trades', 1, 'Electrician',
  [('residential vs commercial electrical', 'segment', ''), ('panel upgrades', 'service', ''), ('EV charger installation', 'service', 'growing demand'), ('Alberta Master Electrician certificate', 'credential', 'required to run an electrical contracting business'),
   ('electrical permits (City of Edmonton)', 'regulation', ''), ('Safety Codes Act', 'regulation', '')],
  ['electrician near me', 'ev charger installation edmonton', 'panel upgrade', 'electrical contractor', 'commercial electrician'],
  'Steady year-round; EV charger and renovation peaks in spring and summer', 'Master Electrician, permits, insurance', 'Split residential and commercial intent with separate service pages.',
  ['local-seo', 'on-page-seo', 'google-business-profile-optimization'], None),
 ('hvac', 'HVAC and Furnace Companies', 'hvac seo', ['seo for hvac'], 'Trades', 1, 'HVAC contractor',
  [('furnace repair', 'service', 'about 10,000 searches/mo in Canada'), ('furnace cleaning / duct cleaning', 'service', ''), ('heat pump', 'product', 'rising interest'), ('air conditioning / AC repair', 'service', 'summer'),
   ('ATCO', 'organization', 'natural gas distribution in the Edmonton region'), ('gas fitter certification', 'credential', ''), ('electric furnace', 'product', '')],
  ['furnace repair edmonton', 'furnace cleaning', 'duct cleaning', 'heat pump installation', 'ac repair', 'no heat emergency'],
  'Furnace season (roughly October to April) dominates; AC in summer heat waves', 'Gas fitter tickets, manufacturer certifications, financing, 24/7 no-heat service', 'Win peak season: content and GBP must be ready before the first cold snap.',
  ['local-seo', 'google-business-profile-optimization', 'google-ads-management'], None),
 ('contractors', 'Renovation and General Contractors', 'contractor seo', ['seo for contractors'], 'Trades', 1, 'General contractor',
  [('basement development', 'service', 'very common in Edmonton'), ('kitchen and bathroom renovation', 'service', ''), ('home additions', 'service', ''), ('building permits (City of Edmonton)', 'regulation', ''),
   ('prepaid contractor licence (Service Alberta)', 'regulation', 'required when taking deposits'), ('CHBA Edmonton Region', 'organization', 'industry association'), ('project portfolio / before-and-after photos', 'asset', '')],
  ['basement development edmonton', 'kitchen renovation', 'home renovation contractor', 'general contractor near me', 'bathroom renovation'],
  'Spring and summer project planning; basements year-round', 'Prepaid contractor licence, WCB, insurance, warranties, portfolio', 'High-ticket jobs: portfolio pages per project type and reviews mentioning project size.',
  ['local-seo', 'link-building', 'content-writing'], None),
 ('carpenters', 'Carpenters', 'carpenter seo', [], 'Trades', 3, 'Carpenter',
  [('finish carpentry', 'service', ''), ('custom cabinets and built-ins', 'service', ''), ('decks and stairs', 'service', '')],
  ['finish carpenter edmonton', 'custom cabinets', 'deck builder'], 'Deck season in spring and summer', 'Portfolio, insurance', 'Portfolio-led. Zero measured volume: consider merging into Contractors.',
  ['local-seo', 'on-page-seo'], None),
 ('roofers', 'Roofing Companies', 'roofing seo', ['seo for roofers'], 'Trades', 1, 'Roofing contractor',
  [('roof repair / roof replacement', 'service', ''), ('hail damage', 'problem', 'summer storms in Alberta'), ('insurance claims', 'process', ''), ('asphalt shingles, metal roofing', 'product', ''), ('ice dams', 'problem', 'winter'),
   ('COR certification (Alberta Construction Safety Association)', 'credential', 'safety')],
  ['roof repair edmonton', 'hail damage roof', 'roof replacement cost', 'roofers near me', 'roof inspection'],
  'Storm and hail season spikes in summer; inspections in spring and fall', 'COR safety, warranties, insurance-claim help', 'Storm-response content and fast GBP updates after hail events.',
  ['local-seo', 'link-building', 'website-design'], None),
 ('painters', 'Painting Companies', 'painting company seo', [], 'Trades', 3, 'Painter',
  [('interior painting', 'service', ''), ('exterior painting', 'service', 'short Edmonton season'), ('commercial painting', 'service', '')],
  ['house painters edmonton', 'exterior painting', 'commercial painting'], 'Exterior season May to September', 'Insurance, warranty, WCB', 'Exterior window is short: book-ahead content in late winter.',
  ['local-seo', 'google-business-profile-optimization'], None),
 ('landscapers', 'Landscaping and Snow Removal', 'landscaping seo', ['seo for landscapers', 'snow removal seo'], 'Trades', 2, 'Landscaper',
  [('lawn care', 'service', 'summer'), ('snow removal / snow clearing', 'service', 'winter'), ('City of Edmonton Bylaw 14600', 'regulation', 'sidewalk snow and ice; City messaging says clear within 48 hours'), ('hardscaping, sod, yard cleanup', 'service', ''), ('seasonal contracts', 'offer', '')],
  ['landscaping edmonton', 'snow removal edmonton', 'lawn care', 'yard cleanup', 'commercial snow clearing'],
  'Two seasons: lawn and landscaping in summer, snow in winter', 'Insurance, equipment, reliability guarantees', 'Seasonal GBP and homepage switch twice a year.',
  ['local-seo', 'google-business-profile-optimization'], None),
 ('concrete-contractors', 'Concrete Contractors', 'concrete contractor seo', [], 'Trades', 3, 'Concrete contractor',
  [('driveways', 'service', ''), ('foundations', 'service', ''), ('patios', 'service', ''), ('freeze-thaw damage', 'problem', 'Edmonton climate')],
  ['concrete driveway edmonton', 'concrete repair', 'foundation contractor'], 'Pour season spring to fall', 'Warranty, insurance', 'Freeze-thaw angle.',
  ['local-seo', 'on-page-seo'], None),
 ('garage-door-companies', 'Garage Door Companies', 'garage door seo', [], 'Trades', 3, 'Garage door supplier',
  [('garage door repair', 'service', ''), ('garage door installation', 'service', ''), ('springs and openers', 'parts', ''), ('lead-generation spam listings', 'competitor type', 'common in this niche')],
  ['garage door repair edmonton', 'garage door spring replacement', 'garage door opener'], 'Cold snaps break springs', 'Real address, licensed technicians', 'Compete with spam listings by being verifiably real.',
  ['local-seo', 'google-business-profile-optimization'], None),
 ('locksmiths', 'Locksmiths', 'locksmith seo', [], 'Trades', 3, 'Locksmith',
  [('Security Services and Investigators Act (Alberta)', 'regulation', 'locksmiths need a licence'), ('Google Ads advanced verification', 'policy', 'required for locksmith advertisers in Canada'), ('emergency lockout', 'service', ''), ('rekeying', 'service', ''), ('fake locksmith listings', 'problem', '')],
  ['locksmith near me', 'emergency locksmith edmonton', 'car lockout', 'rekey locks'], 'Year-round emergency demand', 'Alberta licence, verification, real address', 'Legitimacy is the whole pitch.',
  ['google-business-profile-optimization', 'local-seo'], None),
 ('pest-control', 'Pest Control Companies', 'pest control seo', [], 'Trades', 2, 'Pest control service',
  [('mice and rodents', 'pest', 'fall and winter'), ('wasps', 'pest', 'late summer'), ('bed bugs', 'pest', ''), ('pesticide applicator certificate (Alberta EPEA)', 'credential', 'Lakeland College runs certification'), ('commercial pest control', 'segment', '')],
  ['pest control edmonton', 'mice removal', 'wasp nest removal', 'bed bug treatment', 'exterminator near me'], 'Wasps in late summer, rodents in fall', 'Applicator certificate, registration, safe treatments', 'Pest-by-season content calendar.',
  ['local-seo', 'content-writing'], None),
 ('cleaning-companies', 'Cleaning Companies', 'seo for cleaning companies', ['cleaning company seo'], 'Trades', 2, 'House cleaning service',
  [('house cleaning', 'service', 'recurring'), ('commercial / office cleaning', 'service', ''), ('carpet cleaning', 'service', ''), ('move-out cleaning', 'service', ''), ('bonded and insured', 'trust signal', ''), ('WCB Alberta', 'organization', '')],
  ['house cleaning edmonton', 'office cleaning', 'carpet cleaning', 'move out cleaning'], 'Spring cleaning; move-out peaks at month end', 'Bonded, insured, background-checked staff', 'Recurring revenue: optimize for repeat bookings and reviews.',
  ['local-seo', 'google-business-profile-optimization'], None),
 ('movers', 'Moving Companies', 'moving company seo', ['seo for movers'], 'Trades', 2, 'Moving company',
  [('local moves', 'service', ''), ('long-distance moves (Edmonton to Calgary)', 'service', ''), ('Canadian Association of Movers', 'organization', ''), ('moving quotes', 'conversion', '')],
  ['movers edmonton', 'moving company near me', 'edmonton to calgary movers', 'moving quote'], 'Summer peak; month-end spikes', 'Insurance, association membership, transparent quotes', 'Route pages are content, not doorway pages, when they include real pricing and logistics.',
  ['local-seo', 'content-writing'], None),
 ('appliance-repair', 'Appliance Repair Companies', 'appliance repair seo', [], 'Trades', 3, 'Appliance repair service',
  [('washer and dryer repair', 'service', ''), ('fridge repair', 'service', ''), ('dishwasher repair', 'service', ''), ('brands: Whirlpool, Samsung, LG, Bosch', 'entities', 'brand pages')],
  ['appliance repair edmonton', 'washer repair', 'fridge repair', 'samsung appliance repair'], 'Steady', 'Brand training, warranty work', 'Brand x appliance pages capture long-tail searches.',
  ['local-seo', 'ecommerce-seo'], None),
 ('law-firms', 'Law Firms', 'law firm seo', ['lawyer seo', 'seo for lawyers'], 'Legal', 1, 'Law firm',
  [('Law Society of Alberta', 'regulator', ''), ('Code of Conduct Rule 4.2-1', 'rule', 'marketing must not be misleading'), ('practice areas', 'concept', ''), ('Court of King\'s Bench of Alberta (Edmonton)', 'court', ''),
   ('Alberta Court of Justice', 'court', ''), ('YMYL content', 'Google concept', 'high trust bar')],
  ['lawyer near me', 'edmonton law firm', 'free consultation lawyer', 'best lawyers edmonton'], 'Steady', 'Law Society compliance, lawyer bios, case results with consent', 'Compliance-first SEO; practice-area pages are the main ranking assets.',
  ['local-seo', 'content-writing', 'ai-search-optimization'], None),
 ('personal-injury-lawyers', 'Personal Injury Lawyers', 'personal injury lawyer seo', ['personal injury seo'], 'Legal', 2, 'Personal injury attorney',
  [('Care-First auto insurance (Alberta)', 'regulation', 'replaces most car-crash injury lawsuits for collisions on or after January 1, 2027'), ('Minor Injury Regulation', 'regulation', 'applies to earlier claims'), ('slip and fall', 'case type', ''),
   ('long-term disability claims', 'case type', ''), ('medical malpractice', 'case type', ''), ('contingency fees', 'pricing', '')],
  ['personal injury lawyer edmonton', 'slip and fall lawyer', 'disability claim lawyer', 'car accident lawyer'], 'Steady', 'Law Society compliance, case results with consent', 'Strategy shift: car-accident claims shrink after 2027, so build pages for other injury types and pre-2027 claims.',
  ['content-writing', 'local-seo', 'link-building'], None),
 ('family-lawyers', 'Family Lawyers', 'family law seo', [], 'Legal', 3, 'Family law attorney',
  [('Divorce Act (Canada)', 'law', ''), ('Family Law Act (Alberta)', 'law', ''), ('child support guidelines', 'regulation', ''), ('custody and parenting time', 'topic', ''), ('mediation', 'service', '')],
  ['divorce lawyer edmonton', 'family lawyer near me', 'child custody lawyer', 'separation agreement'], 'January spike after the holidays', 'Compassionate tone, clear fees', 'Sensitive searches: calm, helpful tone; privacy-first forms.',
  ['content-writing', 'local-seo'], None),
 ('immigration-lawyers', 'Immigration Lawyers', 'immigration lawyer seo', [], 'Legal', 2, 'Immigration attorney',
  [('IRCC', 'organization', 'federal immigration department'), ('Express Entry', 'program', ''), ('Alberta Advantage Immigration Program (AAIP)', 'program', ''), ('work permits, PR, sponsorship, refugee claims', 'case types', ''),
   ('College of Immigration and Citizenship Consultants (CICC)', 'regulator', 'regulates consultants; lawyers are regulated by the Law Society'), ('multilingual search', 'opportunity', 'e.g. Punjabi, Tagalog, Arabic, Hindi')],
  ['immigration lawyer edmonton', 'express entry help', 'aaip', 'spousal sponsorship lawyer', 'work permit lawyer'], 'Follows IRCC and AAIP program changes', 'Lawyer vs consultant distinction, languages spoken', 'Multilingual pages are the biggest gap in this market.',
  ['content-writing', 'ai-search-optimization', 'local-seo'], None),
 ('real-estate-lawyers', 'Real Estate Lawyers', 'real estate lawyer seo', [], 'Legal', 3, 'Real estate attorney',
  [('Alberta Land Titles', 'organization', ''), ('conveyancing / closings', 'service', ''), ('title insurance', 'product', ''), ('mortgage refinancing', 'service', '')],
  ['real estate lawyer edmonton', 'closing lawyer', 'conveyancing fees'], 'Spring housing market', 'Flat-fee transparency', 'Zero measured volume: consider folding into Law Firms as a section.',
  ['local-seo', 'on-page-seo'], None),
 ('accountants', 'Accountants', 'seo for accountants', ['accountant seo'], 'Professional & health', 2, 'Accountant',
  [('CPA Alberta', 'regulator', ''), ('CRA', 'organization', ''), ('personal tax deadline April 30', 'date', ''), ('self-employed filing deadline June 15', 'date', ''), ('bookkeeping', 'service', ''), ('corporate tax / small business accounting', 'service', '')],
  ['accountant edmonton', 'tax preparation near me', 'bookkeeping services', 'small business accountant', 'cpa edmonton'], 'Tax season January to April; corporate year-ends', 'CPA designation', 'Tax-season content calendar and service pages per client type.',
  ['on-page-seo', 'local-seo'], None),
 ('realtors', 'Realtors', 'real estate seo', ['seo for realtors', 'realtor seo'], 'Professional & health', 2, 'Real estate agent',
  [('Real Estate Council of Alberta (RECA)', 'regulator', 'brokerage name must be clearly shown on every page of an agent website'), ('REALTORS Association of Edmonton', 'organization', ''), ('MLS and REALTOR trademarks (CREA)', 'trademark', ''),
   ('neighbourhood pages', 'asset', 'Edmonton neighbourhoods'), ('home valuation', 'conversion', '')],
  ['realtor edmonton', 'homes for sale edmonton', 'what is my home worth', 'best realtor near me'], 'Spring market', 'RECA licence, brokerage disclosure', 'Neighbourhood guides are useful content here (unlike for trades) because buyers research areas.',
  ['on-page-seo', 'content-writing', 'local-seo'], None),
 ('dentists', 'Dentists', 'dental seo', ['seo for dentists', 'dentist seo'], 'Professional & health', 1, 'Dentist',
  [('College of Dental Surgeons of Alberta (CDSA)', 'regulator', 'advertising standards'), ('Alberta Dental Association', 'association', ''), ('Canadian Dental Care Plan (CDCP)', 'program', 'federal'), ('emergency dentist', 'service', ''),
   ('cosmetic dentistry, implants, Invisalign', 'service', ''), ('new patient booking', 'conversion', '')],
  ['dentist near me', 'emergency dentist edmonton', 'dental implants', 'teeth whitening', 'dentist accepting new patients'], 'Steady; insurance year-end in December', 'CDSA standards, accepted insurance, CDCP participation', 'Mention CDCP acceptance; "accepting new patients" pages convert well.',
  ['local-seo', 'google-business-profile-optimization', 'ai-search-optimization'], None),
 ('chiropractors', 'Chiropractors', 'chiropractor seo', ['chiropractic seo'], 'Professional & health', 3, 'Chiropractor',
  [('College of Chiropractors of Alberta', 'regulator', ''), ('back pain / sports injury', 'condition', ''), ('Diagnostic and Treatment Protocols Regulation', 'regulation', 'motor vehicle injury treatment')],
  ['chiropractor near me', 'chiropractor edmonton', 'back pain treatment'], 'Steady', 'College registration, direct billing', 'Condition pages written to health-content standards.',
  ['local-seo', 'google-business-profile-optimization'], None),
 ('physiotherapists', 'Physiotherapy Clinics', 'physiotherapy seo', ['physio seo'], 'Professional & health', 3, 'Physical therapy clinic',
  [('Physiotherapy Alberta College + Association', 'regulator', ''), ('motor vehicle accident (MVA) rehab', 'service', 'rules change with Care-First in 2027'), ('WCB Alberta', 'organization', 'work injury rehab'), ('direct billing', 'feature', '')],
  ['physio near me', 'physiotherapy edmonton', 'sports injury physio', 'mva physiotherapy'], 'Steady', 'Registration, direct billing', 'Update MVA content for Care-First.',
  ['local-seo', 'content-writing'], None),
 ('med-spas', 'Med Spas', 'medical spa seo', ['med spa seo'], 'Professional & health', 2, 'Medical spa',
  [('Botox (prescription drug, Health Canada)', 'product', 'advertising limits'), ('College of Physicians and Surgeons of Alberta (CPSA)', 'regulator', ''), ('College of Registered Nurses of Alberta', 'regulator', ''), ('laser treatments, fillers, skin care', 'service', '')],
  ['med spa edmonton', 'botox near me', 'laser hair removal edmonton', 'lip filler'], 'Pre-holiday and spring peaks', 'Medical director, injector credentials', 'Compliance matters: avoid prescription-drug advertising pitfalls.',
  ['local-seo', 'content-writing', 'ai-search-optimization'], None),
]

# Team-approved titles/H1/metas from the keyword map (spreadsheet slug -> our slug)
SHEET = {}
SHEET_SLUG = {'hvac-furnace': 'hvac', 'landscaping-snow-removal': 'landscapers', 'garage-door': 'garage-door-companies', 'law-firms/personal-injury': 'personal-injury-lawyers',
              'law-firms/family-law': 'family-lawyers', 'law-firms/immigration': 'immigration-lawyers', 'law-firms/real-estate': 'real-estate-lawyers', 'real-estate-agents': 'realtors'}
with open('' + os.path.join(OUT, 'keyword-map.tsv') + '') as f:
    for line in f:
        c = line.rstrip('\n').split('\t')
        if len(c) > 11 and c[1].startswith('/industries/') and c[1] != '/industries/':
            sl = c[1][len('/industries/'):].strip('/')
            SHEET[SHEET_SLUG.get(sl, sl)] = {'title': c[7], 'h1': c[9], 'meta': c[10]}

SKIP = {
 'plumbers': [['emergency plumber', 'edmonton'], ['frozen pipes', 'same day'], ['hot water tank', 'replacement'], ['sewer backup', 'insurance'], ['reviews', 'emergency calls']],
 'electricians': [['master electrician', 'permit'], ['ev charger', 'installation'], ['panel upgrade', 'home'], ['commercial', 'electrical contractor'], ['reviews', 'service calls']],
 'hvac': [['furnace repair', 'no heat'], ['furnace', 'cold snap'], ['heat pump', 'installation'], ['duct cleaning', 'furnace cleaning'], ['gas fitter', 'certified']],
 'contractors': [['basement development', 'permit'], ['kitchen renovation', 'quote'], ['prepaid contractor', 'licence'], ['before and after', 'photos'], ['reviews', 'project']],
 'carpenters': [['finish carpentry', 'portfolio'], ['custom cabinets', 'built-ins'], ['deck', 'summer']],
 'roofers': [['hail damage', 'insurance claim'], ['roof repair', 'storm'], ['roof replacement', 'cost'], ['ice dams', 'winter'], ['cor', 'safety']],
 'painters': [['exterior painting', 'season'], ['interior', 'quote'], ['commercial painting', 'insurance']],
 'landscapers': [['snow removal', 'bylaw'], ['lawn care', 'spring'], ['seasonal', 'contract'], ['commercial', 'snow clearing']],
 'concrete-contractors': [['concrete driveway', 'freeze-thaw'], ['foundation', 'repair'], ['patio', 'quote']],
 'garage-door-companies': [['garage door', 'spring replacement'], ['opener', 'repair'], ['real address', 'reviews']],
 'locksmiths': [['locksmith', 'licence'], ['emergency lockout', '24/7'], ['fake listings', 'google maps'], ['rekey', 'locks']],
 'pest-control': [['mice', 'fall'], ['wasp nest', 'removal'], ['bed bugs', 'treatment'], ['applicator', 'certified']],
 'cleaning-companies': [['house cleaning', 'recurring'], ['bonded', 'insured'], ['move out', 'cleaning'], ['office cleaning', 'commercial']],
 'movers': [['edmonton', 'calgary move'], ['moving quote', 'price'], ['insured', 'movers'], ['month end', 'booking']],
 'appliance-repair': [['washer', 'repair'], ['samsung', 'repair'], ['warranty', 'service'], ['same day', 'appliance']],
 'law-firms': [['law society', 'marketing'], ['practice area', 'page'], ['lawyer', 'consultation'], ['reviews', 'law firm'], ['bios', 'experience']],
 'personal-injury-lawyers': [['care-first', '2027'], ['slip and fall', 'lawyer'], ['disability claim', 'denied'], ['contingency', 'fee']],
 'family-lawyers': [['divorce', 'separation'], ['child support', 'guidelines'], ['custody', 'parenting time'], ['mediation', 'court']],
 'immigration-lawyers': [['express entry', 'profile'], ['aaip', 'nomination'], ['spousal sponsorship', 'application'], ['lawyer', 'consultant'], ['punjabi', 'immigration lawyer']],
 'real-estate-lawyers': [['closing', 'fees'], ['land titles', 'transfer'], ['title insurance', 'mortgage']],
 'accountants': [['tax', 'april 30'], ['self-employed', 'june 15'], ['bookkeeping', 'small business'], ['cpa', 'designation']],
 'realtors': [['brokerage', 'every page'], ['neighbourhood', 'homes for sale'], ['home value', 'estimate'], ['reca', 'advertising']],
 'dentists': [['emergency dentist', 'same day'], ['new patients', 'accepting'], ['cdcp', 'dental care plan'], ['implants', 'consultation'], ['cdsa', 'advertising']],
 'chiropractors': [['back pain', 'chiropractor'], ['direct billing', 'insurance'], ['sports injury', 'treatment']],
 'physiotherapists': [['mva', 'physiotherapy'], ['wcb', 'rehab'], ['direct billing', 'physio'], ['sports injury', 'physio']],
 'med-spas': [['botox', 'medical director'], ['laser hair removal', 'sessions'], ['injector', 'credentials'], ['consultation', 'before and after']],
}

GROUP_LABEL = {'Trades': 'trades', 'Legal': 'legal', 'Professional & health': 'professional and health'}

def short_title(name, kwd):
    t = '%s SEO in Edmonton | More Calls from Google' % name
    return t

for (slug, name, k, sec, group, phase, gbp_cat, ient, queries, season, trust, angle, svcs, blog) in IND:
    singular = name.rstrip('s') if not name.endswith('es') else name
    primary = kw(k)
    sh = SHEET.get(slug, {})
    title = sh.get('title') or 'SEO for %s in Edmonton' % name
    h1 = sh.get('h1') or 'SEO for %s in Edmonton' % name
    meta = sh.get('meta') or 'Local SEO for Edmonton %s. Rank in Google Maps for the searches your customers make and turn them into booked work.' % name.lower()
    il = [('', 'Edmonton SEO services')] + [('services/' + s, s.replace('-', ' ')) for s in svcs] + [(a, a.split('/')[1].replace('-', ' ').title()) for a in AREAS] + [('free-seo-audit', 'free SEO audit')]
    if blog: il.append(('blog/' + blog, 'related guide'))
    page(url='/industries/%s/' % slug, type='Industry', group='Industries · ' + group, phase=phase,
         primary=primary, secondary=[kw(s) for s in sec],
         title=title, h1=h1, meta=meta, breadcrumb=['Home', 'Industries', name],
         central_entity='SEO for %s (Service for an audience) in Edmonton' % name.lower(),
         entities=ents([EDMONTON], E_LOCAL[:4], ient, [('GBP primary category: "%s"' % gbp_cat, 'GBP field', 'check exact category name in GBP')]),
         attributes=[
            {'entity': '%s business (the client)' % singular, 'attributes': ['services offered (one page each)', 'service area', 'hours / emergency availability', trust, 'review themes customers mention']},
            {'entity': 'Their customers', 'attributes': ['what they search: ' + '; '.join(queries), 'urgency level', 'device (mostly mobile for emergencies)']},
            {'entity': 'Seasonality', 'attributes': [season]},
            {'entity': 'Google Business Profile for this industry', 'attributes': ['primary category: ' + gbp_cat, 'services list mirrors website service pages', 'job photos', 'review replies mention the service and area']}],
         ngrams={'bigrams': list(dict.fromkeys([k.split()[0] + ' seo', 'google maps', 'map pack', 'more calls'] + [q.split()[0] + ' ' + q.split()[1] for q in queries if len(q.split()) > 1][:4])),
                 'trigrams': list(dict.fromkeys([k] + sec + [q for q in queries if len(q.split()) == 3][:3]))},
         skipgrams=SKIP[slug] + [['google maps', 'calls']],
         faqs=['How long does SEO take for %s in Edmonton?' % name.lower(), 'Should %s run Google Ads or SEO?' % name.lower(), 'How do we get more reviews?', 'Can we rank in St. Albert and Sherwood Park too?'],
         outline=[{'h2': 'Why Edmonton %s need local SEO' % name.lower(), 'h3': []},
                  {'h2': 'What your customers search for', 'h3': []},
                  {'h2': 'How we get %s into the Map Pack' % name.lower(), 'h3': ['Business Profile', 'Service pages', 'Reviews', 'Citations and local links']},
                  {'h2': 'Seasonal demand', 'h3': []},
                  {'h2': 'Trust signals for %s' % GROUP_LABEL[group], 'h3': []},
                  {'h2': 'Results you can measure', 'h3': []},
                  {'h2': 'Serving Edmonton and nearby towns', 'h3': []},
                  {'h2': 'FAQ', 'h3': []}],
         uniqueness=angle,
         internal_links=links(*il),
         schema=['Service (audience: %s)' % name, 'BreadcrumbList', 'FAQPage'],
         notes=('Zero measured volume for the industry keyword in Canada.' if not primary['volume'] else '') + ' Title, H1 and first paragraph carry "Edmonton"; the measured keyword is the national wording.')

page(url='/industries/', type='Hub', group='Industries', phase=1,
     primary={'kw': 'seo for local businesses edmonton', 'volume': None, 'kd': None}, secondary=[kw('seo for local business'), kw('small business seo')],
     title='SEO for Local Service Businesses in Edmonton | Industries',
     h1='SEO for Local Service Businesses',
     meta='Industry-specific SEO for Edmonton trades, home services, law firms and clinics. See how we help businesses like yours win more calls from Google.',
     breadcrumb=['Home', 'Industries'],
     central_entity='Industries served (audience segments)',
     entities=ents([EDMONTON, ('trades and home services', 'segment', ''), ('legal', 'segment', ''), ('professional and health', 'segment', ''), ('small business SEO', 'concept', '')]),
     attributes=[{'entity': 'Each industry', 'attributes': ['card with one-line pain point', 'link to page']}],
     ngrams={'bigrams': ['local business', 'small business', 'service businesses'], 'trigrams': ['seo for local business', 'small business seo', 'local service businesses']},
     skipgrams=[['industry', 'searches'], ['trades', 'calls']],
     faqs=['Do you only work with these industries?'],
     outline=[{'h2': 'Trades and home services', 'h3': []}, {'h2': 'Law firms', 'h3': []}, {'h2': 'Professional and health clinics', 'h3': []}],
     uniqueness='Grouped grid; links to every industry page.',
     internal_links=links(('', 'Edmonton SEO services'), *[('industries/' + i[0], i[1]) for i in IND], ('free-seo-audit', 'free SEO audit')),
     schema=['CollectionPage', 'BreadcrumbList'])

# ================================================================== AREAS
TOWNS = [
 ('st-albert', 'St. Albert', 'st albert seo', ['seo st albert'], 2,
  [('City of St. Albert', 'place', 'separate city north-west of Edmonton'), ('St. Albert Trail', 'corridor', 'main commercial strip'), ('Campbell Business Park', 'place', ''), ('Downtown St. Albert / Perron District', 'place', ''),
   ('Sturgeon River', 'landmark', ''), ('St. Albert & District Chamber of Commerce', 'organization', 'verify exact name'), ('Morinville, Sturgeon County', 'nearby', '')],
  'Many residents search for Edmonton businesses too; St. Albert map packs are smaller, so a real local address wins fast.',
  ['plumbers', 'hvac', 'dentists', 'realtors', 'contractors']),
 ('sherwood-park', 'Sherwood Park', 'sherwood park seo', ['seo sherwood park'], 2,
  [('Sherwood Park (hamlet in Strathcona County)', 'place', 'not a city; urban service area'), ('Strathcona County', 'municipality', ''), ('Baseline Road and Wye Road', 'corridor', 'commercial strips'), ("Alberta's Industrial Heartland", 'region', 'petrochemical employers'),
   ('Sherwood Park & District Chamber of Commerce', 'organization', 'verify exact name'), ('Ardrossan', 'nearby', '')],
  'Searchers type "Sherwood Park", not "Strathcona County"; GBP service areas should list both.',
  ['hvac', 'contractors', 'law-firms', 'dentists', 'cleaning-companies']),
 ('spruce-grove', 'Spruce Grove', 'spruce grove seo', [], 2,
  [('City of Spruce Grove', 'place', 'west of Edmonton on Highway 16A'), ('Stony Plain', 'nearby town', ''), ('Parkland County', 'municipality', ''), ('Acheson Industrial Area', 'place', 'Parkland County'),
   ('Greater Parkland Regional Chamber of Commerce', 'organization', 'formed 2020 from Spruce Grove, Stony Plain and Wabamun chambers')],
  'Spruce Grove and Stony Plain act as one market; content should treat them together.',
  ['contractors', 'plumbers', 'landscapers', 'accountants', 'roofers']),
 ('leduc', 'Leduc', 'leduc seo', [], 3,
  [('City of Leduc', 'place', 'south of Edmonton'), ('Nisku Business Park', 'place', '800+ businesses in Leduc County (energy, transport, manufacturing)'), ('Edmonton International Airport', 'landmark', 'in Leduc County'),
   ('Leduc, Nisku & Wetaskiwin Regional Chamber of Commerce', 'organization', ''), ('Beaumont, Devon', 'nearby', ''), ('Leduc No. 1 (1947 oil discovery)', 'history', '')],
  'Strong B2B and industrial base (Nisku), unlike the residential towns: commercial service searches matter more.',
  ['electricians', 'contractors', 'movers', 'accountants', 'hvac']),
 ('fort-saskatchewan', 'Fort Saskatchewan', 'fort saskatchewan seo', [], 3,
  [('City of Fort Saskatchewan', 'place', 'north-east of Edmonton on the North Saskatchewan River'), ("Alberta's Industrial Heartland", 'region', 'petrochemical and fertilizer plants'), ('Fort Saskatchewan Chamber of Commerce', 'organization', 'verify'),
   ('Gibbons, Bon Accord, Lamont', 'nearby', '')],
  'Industrial shift workers search at odd hours; 24/7 trades and evening hours matter.',
  ['hvac', 'electricians', 'plumbers', 'cleaning-companies', 'dentists']),
]
for slug, town, k, sec, phase, tent, angle, inds in TOWNS:
    page(url='/areas/%s/' % slug, type='Area', group='Areas', phase=phase,
         primary=kw(k), secondary=[kw(s) for s in sec],
         title='%s SEO Services | Local SEO That Gets Calls' % town, h1='SEO Services in %s' % town,
         meta='Local SEO for %s trades, law firms and service businesses. Rank in Google Maps, win more calls and grow with an Edmonton-based team.' % town,
         breadcrumb=['Home', 'Areas', town],
         central_entity='SEO services in %s (place-specific Service)' % town,
         entities=ents(tent, E_LOCAL[:3], [EDMONTON]),
         attributes=[{'entity': town, 'attributes': ['main commercial areas', 'strongest local industries', 'who ranks in its map pack for key trades (own research)', 'how its map pack differs from Edmonton (competition level)', 'nearby smaller communities covered']},
                     {'entity': 'Our service there', 'attributes': ['served from the Edmonton office (no fake address)', 'client results from %s once available' % town, 'GBP service-area setting includes %s' % town]}],
         ngrams={'bigrams': [k.split(' seo')[0] + ' seo', 'local seo', 'google maps', 'map pack', 'local businesses'], 'trigrams': ['%s seo services' % town.lower(), 'local seo %s' % town.lower(), 'google business profile']},
         skipgrams=[[town.lower(), 'map pack'], [town.lower(), 'edmonton'], ['service area', town.lower()], ['local businesses', 'calls']],
         faqs=['Can a %s business rank in Edmonton searches too?' % town, 'Do I need an office in %s to rank there?' % town, 'Which %s industries do you work with?' % town],
         outline=[{'h2': "%s's business landscape" % town, 'h3': []}, {'h2': 'Who ranks in the %s map pack' % town, 'h3': []}, {'h2': 'How %s search results differ from Edmonton' % town, 'h3': []},
                  {'h2': 'Industries we help in %s' % town, 'h3': [i.replace('-', ' ').title() for i in inds]}, {'h2': 'Results from %s' % town, 'h3': []}, {'h2': 'Nearby communities we cover', 'h3': []}, {'h2': '%s SEO FAQ' % town, 'h3': []}],
         uniqueness='Swap test: if you replace "%s" with another town and the page still reads fine, rewrite it. Angle: %s Needs your own map-pack research (60-70%% unique).' % (town, angle),
         internal_links=links(('', 'Edmonton SEO services'), *[('industries/' + i, i.replace('-', ' ')) for i in inds], ('services/local-seo', 'local SEO'), ('services/google-business-profile-optimization', 'Business Profile optimization'), ('free-seo-audit', 'free SEO audit')),
         schema=['Service (areaServed: %s)' % town, 'BreadcrumbList', 'FAQPage'],
         notes='Facts marked "verify" must be checked before publishing.')

page(url='/areas/', type='Hub', group='Areas', phase=2,
     primary={'kw': 'seo services edmonton area (hub)', 'volume': None, 'kd': None}, secondary=[kw('seo alberta')],
     title='SEO Across the Edmonton Region | Areas We Serve', h1='SEO Services Across the Edmonton Region',
     meta='Edmonton-based local SEO for businesses in St. Albert, Sherwood Park, Spruce Grove, Leduc, Fort Saskatchewan and the communities around them.',
     breadcrumb=['Home', 'Areas'], central_entity='Edmonton metropolitan region (service area)',
     entities=ents([EDMONTON, ('Edmonton Metropolitan Region', 'region', ''), ('St. Albert, Sherwood Park, Spruce Grove, Leduc, Fort Saskatchewan', 'places', ''), ('Stony Plain, Beaumont, Morinville, Devon, Gibbons', 'smaller communities', 'mentioned, no page')]),
     attributes=[{'entity': 'Service area', 'attributes': ['towns with pages', 'smaller communities covered', 'why one Edmonton GBP, no virtual offices']}],
     ngrams={'bigrams': ['edmonton region', 'service area', 'nearby towns'], 'trigrams': ['seo services alberta', 'edmonton metro area']},
     skipgrams=[['distance', 'ranking'], ['towns', 'map pack']], faqs=['Do you serve towns not listed here?'],
     outline=[{'h2': 'Towns we serve', 'h3': []}, {'h2': 'Smaller communities', 'h3': []}, {'h2': 'Why distance matters in local search', 'h3': []}],
     uniqueness='Edmonton-region hub only (user decision: no Calgary/Red Deer).',
     internal_links=links(('', 'Edmonton SEO services'), *[(a, a.split('/')[1].replace('-', ' ').title()) for a in AREAS]),
     schema=['CollectionPage', 'BreadcrumbList'])

# ================================================================== CASE STUDIES, BLOG, LEGAL
page(url='/case-studies/', type='Hub', group='Case studies', phase=2, status='draft until real client data',
     primary=kw('seo case studies'), secondary=[],
     title='SEO Case Studies | Results for Edmonton Businesses', h1='SEO Case Studies and Results',
     meta='See real ranking, traffic and lead results from Edmonton-area service businesses we have helped grow with local SEO and Business Profile work.',
     breadcrumb=['Home', 'Case Studies'], central_entity='Client results (proof)',
     entities=ents([('client', 'organization', 'named with permission'), ('Google Search Console / GA4 / GBP insights', 'data sources', 'where every number comes from')]),
     attributes=[{'entity': 'Each case study', 'attributes': ['client, industry, town', 'starting point with date', 'what we did', 'measured results with source and date range', 'client quote']}],
     ngrams={'bigrams': ['case studies', 'seo results'], 'trigrams': ['seo case studies', 'local seo results']}, skipgrams=[['results', 'months'], ['before', 'after']],
     faqs=[], outline=[{'h2': 'Featured results', 'h3': []}, {'h2': 'How we measure', 'h3': []}],
     uniqueness='URL pattern for each study: /case-studies/[town]-[industry]-[result]/ e.g. /case-studies/st-albert-plumber-local-seo/. Stays noindex and unlinked (draft) until real.',
     internal_links=links(('', 'Edmonton SEO services'), ('free-seo-audit', 'free SEO audit')), schema=['CollectionPage'])

BLOG = [
 ('how-google-ranks-local-businesses', 'How Google Ranks Local Businesses in Edmonton', 'how google ranks local businesses', 'services/local-seo', 2, 'existing post'),
 ('ai-overviews-and-your-website', 'AI Overviews and Your Website: What Google Says', 'google ai overviews seo', 'services/ai-search-optimization', 2, 'existing post'),
 ('choosing-an-seo-agency-in-edmonton', 'How to Choose an SEO Agency in Edmonton', 'how to choose an seo agency', '', 2, 'existing post'),
 ('storefront-vs-service-area-business-profile', 'Storefront vs Service Area: Setting Up Your Business Profile', 'service area business google', 'services/google-business-profile-optimization', 2, 'from old Downtown page'),
 ('how-to-get-more-google-reviews', 'How to Get More Google Reviews (Without Breaking the Rules)', 'how to get more google reviews', 'services/google-business-profile-optimization', 2, 'from old Oliver page'),
 ('keep-your-business-profile-current', 'Keep Your Google Business Profile Current: Photos, Hours, Posts', 'google business profile tips', 'services/google-business-profile-optimization', 2, 'from old Strathcona page'),
 ('get-a-new-business-on-google', 'How to Get a New Business on Google: A Launch Checklist', 'how to get my business on google', 'services/local-seo', 2, 'from old Windermere page'),
 ('location-pages-without-doorway-pages', 'Location Pages That Help Customers (Not Doorway Pages)', 'location pages seo', 'services/content-writing', 2, 'from old Summerside page'),
 ('nap-consistency-and-citations', 'NAP Consistency and Citations: Why Your Details Must Match', 'nap consistency', 'services/local-seo', 2, 'from old Terwillegar Towne page'),
 ('how-edmonton-plumbers-get-more-google-maps-calls', 'How Edmonton Plumbers Get More Calls from Google Maps', 'google maps for plumbers', 'industries/plumbers', 2, 'from keyword map'),
 ('how-much-does-seo-cost-in-canada', 'How Much Does SEO Cost in Canada?', 'how much does seo cost', 'pricing', 2, 'new: supports pricing'),
]
for slug, t, k, money, phase, src in BLOG:
    title = t if len(t) <= 60 else t.split(':')[0]
    page(url='/blog/%s/' % slug, type='Blog post', group='Blog', phase=phase, primary=kw(k), secondary=[],
         title=title, h1=t, meta=('%s A practical guide for Edmonton business owners, checked against Google\'s own documentation.' % t.rstrip('?.'))[:160],
         breadcrumb=['Home', 'Blog', t], central_entity=t.split(':')[0],
         entities=ents(E_LOCAL[:3] if 'ai' not in slug else [('Google AI Overviews', 'search feature', '')], [EDMONTON]),
         attributes=[{'entity': 'Topic', 'attributes': ['what Google officially says (cite source)', 'step-by-step actions', 'Edmonton example', 'common mistakes']}],
         ngrams={'bigrams': k.split()[:2] and [' '.join(k.split()[i:i + 2]) for i in range(len(k.split()) - 1)], 'trigrams': [k]},
         skipgrams=[[k.split()[-1], 'google'], ['edmonton', 'business']], faqs=[],
         outline=[{'h2': 'What Google says', 'h3': []}, {'h2': 'Step by step', 'h3': []}, {'h2': 'Common mistakes', 'h3': []}, {'h2': 'Sources', 'h3': []}],
         uniqueness='Informational intent only; links up to one money page. Source: ' + src + '.',
         internal_links=links(*([(money, 'related service')] if money else [('', 'our Edmonton SEO team')]), ('blog', 'more guides')),
         schema=['BlogPosting', 'BreadcrumbList'], notes='Volume not checked in Ahrefs (budget); informational keyword chosen from topic.')

page(url='/blog/', type='Hub', group='Blog', phase=2, primary={'kw': 'local seo blog', 'volume': None, 'kd': None}, secondary=[],
     title='Local SEO Blog | Tips for Edmonton Businesses', h1='Local SEO Tips and Guides',
     meta='Practical local SEO guides for Edmonton trades, law firms and service businesses who want more calls from Google, checked against Google documentation.',
     breadcrumb=['Home', 'Blog'], central_entity='Local SEO knowledge base', entities=ents(E_LOCAL[:2]),
     attributes=[{'entity': 'Blog', 'attributes': ['categories mirror industries (/blog/plumbers/) once each has 3+ posts; noindex categories until then']}],
     ngrams={'bigrams': ['local seo', 'seo tips'], 'trigrams': ['local seo tips']}, skipgrams=[], faqs=[],
     outline=[{'h2': 'Latest guides', 'h3': []}], uniqueness='Hub.', internal_links=links(*[('blog/' + b[0], b[1]) for b in BLOG]), schema=['CollectionPage'])

for slug, t in [('privacy-policy', 'Privacy Policy'), ('terms', 'Terms of Service')]:
    page(url='/%s/' % slug, type='Legal', group='Legal', phase=1, primary={'kw': '-', 'volume': None, 'kd': None}, secondary=[], title=t, h1=t,
         meta='How we collect, use and protect information submitted through this website.' if slug == 'privacy-policy' else 'The terms that apply when you use this website and our services.',
         breadcrumb=['Home', t], central_entity=t, entities=[], attributes=[], ngrams={'bigrams': [], 'trigrams': []}, skipgrams=[], faqs=[], outline=[],
         uniqueness='Legal review before launch (PIPA Alberta).', internal_links=links(('contact', 'contact us')), schema=['WebPage'])

# ------------------------------------------------------------------ finish: ids, slugs, checks
fixes = {'ecommerce-seo-placeholder': None}
for p in PAGES:
    p['slug'] = p['url'].strip('/') or 'home'
    p['internal_links'] = [l for l in p['internal_links'] if 'placeholder' not in l['to']]
    p['title_len'] = len(p['title']); p['meta_len'] = len(p['meta'])
urls = [p['url'] for p in PAGES]
assert len(urls) == len(set(urls)), 'duplicate url'
problems = []
known = set(urls)
for p in PAGES:
    if p['title_len'] > 60: problems.append(('title>60', p['url'], p['title_len']))
    if p['type'] not in ('Legal',) and not (110 <= p['meta_len'] <= 160): problems.append(('meta len', p['url'], p['meta_len']))
    for l in p['internal_links']:
        if l['to'] not in known: problems.append(('bad link', p['url'], l['to']))
order = {'Homepage': 0, 'Core': 1, 'Lead magnet': 1, 'Hub': 2, 'Service': 3, 'Industry': 4, 'Area': 5, 'Blog post': 6, 'Legal': 7}
PAGES.sort(key=lambda p: (p['group'].split(' ·')[0] != 'Core', ['Core', 'Services', 'Industries', 'Areas', 'Case studies', 'Blog', 'Legal'].index(p['group'].split(' ·')[0]), order.get(p['type'], 9) if p['type'] == 'Hub' else 5, p['phase'], p['url']))
data = {'site': 'seoservicesedmonton.ca', 'generated': '2026-10-23', 'keyword_source': 'Ahrefs Keywords Explorer, country CA, 2026-10-23',
        'decisions': {'geography': 'Edmonton + St. Albert, Sherwood Park, Spruce Grove, Leduc, Fort Saskatchewan', 'industry_urls': '/industries/[slug]/ (max 2 levels)',
                      'extra_services': 'ecommerce-seo and ai-search-optimization kept (Phase 2)'},
        'pages': PAGES}
json.dump(data, open(os.path.join(OUT, 'content-plan.json'), 'w'), indent=1, ensure_ascii=False)
from collections import Counter
print(len(PAGES), 'pages', Counter(p['phase'] for p in PAGES), Counter(p['group'].split(' ·')[0] for p in PAGES))
for x in problems: print('PROBLEM', x)

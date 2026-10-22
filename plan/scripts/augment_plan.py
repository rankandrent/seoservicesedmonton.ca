"""Second stage: adds JSON-LD entity fields and E-E-A-T briefs to plan/content-plan.json.

Adds per page: about[], mentions[], area_served[], service_type, eeat{}.
Adds the E-E-A-T pages /team/, /team/[name]/ and /how-we-work/.
Entity sameAs URLs come from plan/entities.json (Wikidata API lookups, Wikipedia URLs checked for HTTP 200 on 2026-10-23).

Run after gen_plan.py:  python3 plan/scripts/gen_plan.py plan && python3 plan/scripts/augment_plan.py plan
"""
import json, os, sys

OUT = sys.argv[1]
ENT = json.load(open(os.path.join(OUT, 'entities.json')))
plan = json.load(open(os.path.join(OUT, 'content-plan.json')))
pages = plan['pages']

def e(key):
    x = ENT[key]
    d = {'name': x['name'], 'type': x['type']}
    if x['sameAs']: d['sameAs'] = x['sameAs']
    return d

def custom(name, type_='Thing'):
    return {'name': name, 'type': type_}

REGION = ['edmonton', 'st-albert', 'sherwood-park', 'spruce-grove', 'leduc', 'fort-saskatchewan']
HOME_AREA = REGION + ['stony-plain', 'beaumont']

# ------------------------------------------------------------------ sources (all URLs seen or cited earlier in this project)
G = {
 'local': ('Google Business Profile Help: How to improve your local ranking', 'https://support.google.com/business/answer/7091?hl=en'),
 'starter': ('Google Search Central: SEO Starter Guide', 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide'),
 'spam': ('Google Search Central: Spam policies', 'https://developers.google.com/search/docs/essentials/spam-policies'),
 'ai': ('Google Search Central: AI features and your website', 'https://developers.google.com/search/docs/appearance/ai-features'),
 'hire': ('Google Search Central: Do you need an SEO?', 'https://developers.google.com/search/docs/fundamentals/do-i-need-seo'),
 'ecom': ('Google Search Central: Structured data for ecommerce', 'https://developers.google.com/search/docs/specialty/ecommerce/include-structured-data-relevant-to-ecommerce'),
 'contrib': ('Google Maps contribution policy', 'https://support.google.com/contributionpolicy/answer/7400114?hl=en'),
 'lsa_code': ('Law Society of Alberta Code of Conduct (Chapter 4, Marketing)', 'https://documents.lawsociety.ab.ca/wp-content/uploads/2017/01/14211909/Code.pdf'),
 'cdsa': ('College of Dental Surgeons of Alberta: Advertising information', 'https://cdsab.ca/public-protection/advertising-information/'),
 'reca': ('RECA: Advertising guidelines for licensees', 'https://www.reca.ca/advertising/'),
 'ssia': ('Alberta Security Services and Investigators Act policy manual (locksmith licensing)', 'https://open.alberta.ca/dataset/e85337d1-c497-413a-aa67-f4a309b8a1cf/resource/388370a7-05ac-47d1-9159-d18b5c61f017/download/ssia-policy-manual-4-0-amended-2015-2.pdf'),
 'adv_ver': ('Google Ads: Advanced Verification policies', 'https://support.google.com/adspolicy/answer/7167922?hl=en'),
 'snow': ('City of Edmonton: Residential sidewalk snow and ice', 'https://www.edmonton.ca/transportation/on_your_streets/sidewalk-snow-removal'),
 'pest': ('Lakeland College: Alberta pesticide applicator certification', 'https://lakelandcollege.ca/programs-and-courses/pesticide-certification/index.html'),
 'dtpr': ('Alberta Superintendent of Insurance: DTPR interpretative guideline', 'https://open.alberta.ca/publications/superintendent-of-insurance-guideline-03-2024'),
 'carefirst': ('Field Law: Alberta Care-First auto insurance (secondary source; find the alberta.ca page before publishing)', 'https://www.fieldlaw.com/insights/publication/alberta-care-first-auto-insurance-2027'),
 'gprc': ('Greater Parkland Regional Chamber: About', 'https://www.gprchamber.ca/about-us/'),
 'lnw': ('Leduc, Nisku & Wetaskiwin Regional Chamber of Commerce', 'https://www.yourchamber.ca/'),
 'nisku': ('Leduc County: Key economic drivers (Nisku Business Park)', 'https://www.leduccountybusiness.com/sectors-and-strategies/key-economic-drivers/'),
}
def src(*keys):
    return [{'title': G[k][0], 'url': G[k][1]} for k in keys]

BASE_TRUST = ['Google documentation cited by name and linked', 'States plainly that nobody can guarantee a #1 ranking', 'Every change logged and shared with the client',
              'Client owns all accounts and content', 'Visible "Last updated" date (dateModified)']
STRATEGIST = '[[Founder / lead SEO strategist, real name]]'

# ------------------------------------------------------------------ industry entity map
IND = {
 'plumbers': (['plumber'], ['epcor'], 'SEO for plumbing companies'),
 'electricians': (['electrician'], [], 'SEO for electrical contractors'),
 'hvac': (['hvac', 'furnace', 'heat-pump'], ['atco'], 'SEO for HVAC and furnace companies'),
 'contractors': (['general-contractor', 'renovation'], [], 'SEO for renovation and general contractors'),
 'carpenters': (['carpenter'], [], 'SEO for carpenters'),
 'roofers': (['roofer'], [], 'SEO for roofing companies'),
 'painters': (['painter-decorator'], [], 'SEO for painting companies'),
 'landscapers': (['landscaping', 'snow-removal'], [], 'SEO for landscaping and snow removal companies'),
 'concrete-contractors': (['concrete'], [], 'SEO for concrete contractors'),
 'garage-door-companies': (['garage-door'], [], 'SEO for garage door companies'),
 'locksmiths': (['locksmith'], [], 'SEO for locksmiths'),
 'pest-control': (['pest-control'], [], 'SEO for pest control companies'),
 'cleaning-companies': (['janitor'], [], 'SEO for cleaning companies'),
 'movers': (['mover'], [], 'SEO for moving companies'),
 'appliance-repair': (['home-appliance'], [], 'SEO for appliance repair companies'),
 'law-firms': (['law-firm', 'lawyer'], ['law-society-ab', 'kings-bench-ab', 'court-of-justice-ab'], 'SEO for law firms'),
 'personal-injury-lawyers': (['pi-lawyer', 'personal-injury'], ['law-society-ab'], 'SEO for personal injury lawyers'),
 'family-lawyers': (['family-law'], ['divorce-act', 'law-society-ab', 'kings-bench-ab'], 'SEO for family lawyers'),
 'immigration-lawyers': (['immigration-law'], ['ircc', 'express-entry', 'law-society-ab'], 'SEO for immigration lawyers'),
 'real-estate-lawyers': (['conveyancing'], ['law-society-ab'], 'SEO for real estate lawyers'),
 'accountants': (['accountant', 'cpa-canada'], ['cra', 'cpa-alberta'], 'SEO for accountants'),
 'realtors': (['real-estate-agent'], ['reca', 'crea', 'mls'], 'SEO for real estate agents'),
 'dentists': (['dentist', 'dentistry'], ['cdsa', 'cdcp'], 'SEO for dental clinics'),
 'chiropractors': (['chiropractic'], [], 'SEO for chiropractic clinics'),
 'physiotherapists': (['physiotherapy'], ['wcb-ab'], 'SEO for physiotherapy clinics'),
 'med-spas': (['medical-spa', 'botox'], ['health-canada', 'cpsa'], 'SEO for medical spas'),
}
IND_SRC = {'law-firms': ['lsa_code'], 'personal-injury-lawyers': ['lsa_code', 'carefirst'], 'family-lawyers': ['lsa_code'], 'immigration-lawyers': ['lsa_code'],
           'real-estate-lawyers': ['lsa_code'], 'dentists': ['cdsa'], 'realtors': ['reca'], 'locksmiths': ['ssia', 'adv_ver'], 'landscapers': ['snow'],
           'pest-control': ['pest'], 'physiotherapists': ['dtpr', 'carefirst'], 'chiropractors': ['dtpr']}
YMYL_REVIEW = {
 'Legal': 'Optional but recommended: a practising Alberta lawyer (or the client firm) reviews regulatory statements before publishing',
 'Professional & health': 'Recommended for health pages: a regulated professional in that field reviews health and regulatory statements',
}
IND_EXP = {
 'plumbers': 'map-pack screenshot for "emergency plumber edmonton" with date; how frozen-pipe searches spike in cold snaps (own data)',
 'hvac': 'map-pack screenshot for "furnace repair edmonton" with date; seasonal search curve for furnace terms (Ahrefs/Google Trends)',
 'roofers': 'search spike after a named Edmonton hail event (date) and how a client responded',
 'law-firms': 'how a law firm GBP was set up within Law Society marketing rules (anonymised)',
 'personal-injury-lawyers': 'how injury-lawyer search demand is shifting before Care-First (own observations, dated)',
 'immigration-lawyers': 'example of a multilingual page plan and which languages Edmonton searchers use',
 'dentists': 'example "accepting new patients" page result (anonymised, with permission)',
 'realtors': 'neighbourhood guide example with RECA brokerage disclosure on the page',
 'locksmiths': 'example of spam locksmith listings in the Edmonton map pack (screenshot, dated) and how a licensed locksmith stands out',
}

AREA_MAP = {
 'st-albert': (['morinville', 'sturgeon-county'], []),
 'sherwood-park': (['strathcona-county', 'ardrossan'], ['industrial-heartland']),
 'spruce-grove': (['stony-plain', 'parkland-county'], []),
 'leduc': (['nisku', 'leduc-county', 'beaumont', 'devon'], ['edmonton-airport', 'leduc-no1']),
 'fort-saskatchewan': (['gibbons', 'bon-accord'], ['industrial-heartland', 'north-sask-river']),
}
AREA_SRC = {'spruce-grove': ['gprc'], 'leduc': ['lnw', 'nisku']}

SERVICE_MAP = {
 'local-seo': (['local-seo'], ['gbp', 'google-maps', 'online-review', 'serp'], 'Local SEO', ['local', 'contrib']),
 'google-business-profile-optimization': (['gbp'], ['google-maps', 'online-review', 'local-seo', 'google-search'], 'Google Business Profile optimization', ['local', 'contrib']),
 'technical-seo': ([None, 'seo'], ['search-console', 'core-web-vitals', 'robots-txt', 'sitemaps', 'canonical', 'schema-org', 'https'], 'Technical SEO', ['starter']),
 'on-page-seo': ([None, 'seo'], ['serp', 'schema-org', 'google-search'], 'On-page SEO', ['starter']),
 'link-building': (['link-building', 'backlink'], ['google-search'], 'Link building', ['spam', 'starter']),
 'content-writing': (['copywriting', 'content-marketing'], ['eeat', 'google-search'], 'SEO content writing', ['starter', 'spam']),
 'seo-audit': ([None, 'seo'], ['search-console', 'google-analytics', 'core-web-vitals', 'gbp'], 'SEO audit', ['starter', 'hire']),
 'ecommerce-seo': (['ecommerce', 'seo'], ['shopify', 'woocommerce', 'merchant-center', 'schema-org'], 'Ecommerce SEO', ['ecom', 'starter']),
 'ai-search-optimization': (['geo'], ['ai-overviews', 'chatgpt', 'gemini', 'perplexity', 'google-search', 'schema-org'], 'AI search optimization', ['ai']),
 'website-design': (['web-design'], ['core-web-vitals', 'https'], 'SEO-friendly website design', ['starter']),
 'google-ads-management': (['google-ads', 'ppc'], ['google-search'], 'Google Ads management', []),
}
CUSTOM_ABOUT = {'technical-seo': 'Technical SEO', 'on-page-seo': 'On-page SEO', 'seo-audit': 'SEO audit'}

BLOG_MAP = {
 'how-google-ranks-local-businesses': (['local-seo'], ['google-maps', 'gbp', 'online-review'], ['local']),
 'ai-overviews-and-your-website': (['ai-overviews'], ['google-search', 'geo', 'chatgpt'], ['ai']),
 'choosing-an-seo-agency-in-edmonton': (['seo'], ['google-search'], ['hire', 'spam']),
 'storefront-vs-service-area-business-profile': (['gbp'], ['google-maps', 'local-seo'], ['local']),
 'how-to-get-more-google-reviews': (['online-review', 'gbp'], ['google-maps'], ['contrib', 'local']),
 'keep-your-business-profile-current': (['gbp'], ['google-maps'], ['local']),
 'get-a-new-business-on-google': (['gbp', 'local-seo'], ['google-maps', 'search-console'], ['local', 'starter']),
 'location-pages-without-doorway-pages': (['local-seo'], ['google-search'], ['spam']),
 'nap-consistency-and-citations': (['local-seo'], ['gbp', 'google-maps'], ['local']),
 'how-edmonton-plumbers-get-more-google-maps-calls': (['plumber', 'google-maps'], ['gbp', 'online-review'], ['local']),
 'how-much-does-seo-cost-in-canada': (['seo'], ['ppc'], ['hire']),
}

# ------------------------------------------------------------------ new E-E-A-T pages
def newpage(**p):
    base = {'status': 'planned', 'secondary': [], 'schema': [], 'notes': '', 'ngrams': {'bigrams': [], 'trigrams': []}, 'skipgrams': [], 'faqs': [], 'attributes': [], 'entities': []}
    base.update(p); base['slug'] = base['url'].strip('/'); base['title_len'] = len(base['title']); base['meta_len'] = len(base['meta'])
    return base

def link(t, a): return {'to': '/' + t + ('/' if t else ''), 'anchor': a}

NEW = [
 newpage(url='/team/', type='Core', group='Core', phase=1, primary={'kw': 'edmonton seo team', 'volume': None, 'kd': None},
   title='Our Team | The People Behind Our Edmonton SEO Work', h1='Meet Our Edmonton SEO Team',
   meta='Meet the strategists, writers and technical specialists behind our Edmonton SEO work: real names, real experience and the areas each person knows best.',
   breadcrumb=['Home', 'Team'], central_entity='The agency team (Person entities)',
   entities=[{'name': 'Each team member', 'type': 'Person', 'note': 'real name, role, photo, LinkedIn'}],
   attributes=[{'entity': 'Each person', 'attributes': ['full real name', 'role', 'years in SEO', 'certifications (only real ones, with verify links)', 'knowsAbout topics', 'headshot', 'LinkedIn URL']}],
   outline=[{'h2': 'Leadership', 'h3': []}, {'h2': 'Strategy, technical and content', 'h3': []}, {'h2': 'How we work together on your account', 'h3': []}],
   uniqueness='Only real people. Keep [[placeholders]] until each person supplies their details and approves their bio.',
   internal_links=[link('', 'Edmonton SEO services'), link('about', 'about us'), link('how-we-work', 'how we work'), link('team/[name]', 'author pages')],
   schema=['CollectionPage', 'Person (each, with sameAs LinkedIn)', 'BreadcrumbList']),
 newpage(url='/team/[name]/', type='Author', group='Core', phase=1, status='template: one page per real person',
   primary={'kw': '[person name]', 'volume': None, 'kd': None},
   title='[[Full name]] | [[Role]] at [[Brand]]', h1='[[Full name]], [[Role]]',
   meta='[[Full name]] is a [[role]] at our Edmonton SEO agency, working on [[specialties]]. Read their background, credentials and the guides they have written.',
   breadcrumb=['Home', 'Team', '[[Full name]]'], central_entity='One team member (Person)',
   entities=[{'name': 'The person', 'type': 'Person', 'note': 'author of blog posts and reviewer of service pages'}],
   attributes=[{'entity': 'Person', 'attributes': ['name', 'jobTitle', 'worksFor (the agency)', 'knowsAbout (e.g. Local SEO, Google Business Profile, Technical SEO)', 'sameAs (LinkedIn, Google certification profile)', 'hasCredential (real certifications only)', 'image', 'articles written']}],
   outline=[{'h2': 'Background', 'h3': []}, {'h2': 'Areas of expertise', 'h3': []}, {'h2': 'Credentials', 'h3': []}, {'h2': 'Articles by [[name]]', 'h3': []}],
   uniqueness='Author pages are what blog bylines link to. No stock photos, no invented credentials.',
   internal_links=[link('team', 'our team'), link('blog', 'their articles'), link('', 'Edmonton SEO services')],
   schema=['ProfilePage', 'Person (worksFor, knowsAbout, sameAs, hasCredential)', 'BreadcrumbList']),
 newpage(url='/how-we-work/', type='Core', group='Core', phase=1, primary={'kw': 'how we work / editorial policy', 'volume': None, 'kd': None},
   title='How We Work | Our SEO Process and Editorial Policy', h1='How We Work',
   meta='Our SEO process, reporting standards and editorial policy: how we research, write, fact-check and update every page and guide we publish for clients.',
   breadcrumb=['Home', 'How We Work'], central_entity='The agency process and editorial standards',
   entities=[{'name': 'Google Search Essentials', 'type': 'guideline', 'note': ''}, {'name': 'E-E-A-T', 'type': 'concept', 'note': ''}],
   attributes=[{'entity': 'Process', 'attributes': ['audit, plan, build, report steps', 'what is logged and shared', 'what clients own', 'what we never do (buy links, fake reviews, guarantee rankings)']},
               {'entity': 'Editorial policy', 'attributes': ['who writes and who reviews', 'how facts are checked (primary sources)', 'how AI tools are used, if at all', 'update schedule and dateModified', 'corrections policy']}],
   outline=[{'h2': 'Our process', 'h3': ['Audit', 'Plan', 'Build', 'Report']}, {'h2': 'Editorial policy', 'h3': ['Who writes and reviews', 'Fact-checking and sources', 'Use of AI tools', 'Updates and corrections']}, {'h2': 'What we never do', 'h3': []}],
   uniqueness='Trust page linked from the footer and every blog post.',
   internal_links=[link('', 'Edmonton SEO services'), link('about', 'about us'), link('team', 'our team'), link('free-seo-audit', 'free SEO audit')],
   schema=['WebPage', 'BreadcrumbList']),
]

def mk_eeat(author, reviewer, exp, trust, sources):
    d = {'author': author, 'experience_signals': exp, 'trust_signals': trust, 'sources': sources}
    if reviewer: d['reviewer'] = reviewer
    return d

for p in pages + NEW:
    url, t = p['url'], p['type']
    parts = url.strip('/').split('/')
    about, mentions, area, stype = [], [], [], None
    if url == '/':
        about = [e('seo'), e('local-seo')]; mentions = [e(k) for k in ['gbp', 'google-maps', 'google-search', 'online-review']]; area = [e(k) for k in HOME_AREA]
        stype = 'Search engine optimization'
        eeat = mk_eeat(STRATEGIST, None, ['real client results with written permission', 'dated map-pack screenshots', 'years working with Edmonton businesses', 'Google reviews embedded from the agency GBP'],
                       BASE_TRUST + ['NAP matches Google Business Profile exactly'], src('local', 'hire'))
    elif url in ('/about/', '/team/', '/team/[name]/', '/how-we-work/', '/contact/'):
        about = [custom('[[Brand name]]', 'Organization')] if url != '/team/[name]/' else [custom('[[Full name]]', 'Person')]
        mentions = [e('edmonton')] + ([e('eeat')] if url == '/how-we-work/' else [])
        area = [e('edmonton')] if url in ('/about/', '/contact/') else []
        if url == '/team/[name]/':
            eeat = mk_eeat('[[The team member themself (approves final bio)]]', STRATEGIST,
                           ['real headshot', 'specific client work they led (anonymised)', 'years in SEO and in Edmonton'],
                           ['credentials link to the issuer\'s verify page', 'LinkedIn in sameAs', 'no invented titles or awards'], [])
        else:
            eeat = mk_eeat(STRATEGIST, None, ['founding story in the founder\'s own words', 'team headshots', 'office photos'] if url != '/contact/' else ['office photo and directions'],
                           BASE_TRUST[:4] + (['real street address matching GBP'] if url in ('/about/', '/contact/') else []), src('hire'))
    elif url in ('/pricing/', '/free-seo-audit/'):
        about = [custom('SEO pricing' if url == '/pricing/' else 'SEO audit'), e('seo')]; mentions = [e('gbp'), e('local-seo')]; area = [e(k) for k in REGION]
        stype = 'Search engine optimization' if url == '/pricing/' else 'SEO audit'
        eeat = mk_eeat(STRATEGIST, None, ['real price ranges with what is included', 'sample audit report (anonymised)'], BASE_TRUST[:4] + ['clear contract terms, no hidden fees'], src('hire'))
    elif parts[0] == 'services':
        if len(parts) == 1:
            about = [e('seo')]; mentions = [e(k) for k in ['local-seo', 'link-building', 'content-marketing', 'ecommerce', 'geo']]; area = [e(k) for k in REGION]; stype = 'Search engine optimization'
            eeat = mk_eeat(STRATEGIST, None, ['one real example result per service'], BASE_TRUST, src('starter'))
        else:
            a, m, stype, sk = SERVICE_MAP[parts[1]]
            about = [custom(CUSTOM_ABOUT[parts[1]]) if k is None else e(k) for k in a]; mentions = [e(k) for k in m] + [e('edmonton')]; area = [e(k) for k in REGION]
            tech = parts[1] in ('technical-seo', 'seo-audit', 'ecommerce-seo', 'website-design')
            eeat = mk_eeat(STRATEGIST, '[[Technical SEO lead, real name]]' if tech else None,
                           ['before/after screenshot from Search Console or GBP Insights (anonymised, with permission)', 'a real example deliverable (audit page, report, fix list)', 'Edmonton-specific observation from client work'],
                           BASE_TRUST, src(*sk) if sk else [])
    elif parts[0] == 'industries':
        if len(parts) == 1:
            about = [e('small-business'), e('local-seo')]; mentions = [e('gbp'), e('google-maps')]; area = [e(k) for k in REGION]; stype = 'Local SEO for service businesses'
            eeat = mk_eeat(STRATEGIST, None, ['industries the agency has real clients in (only those)'], BASE_TRUST[:2], src('local'))
        else:
            slug = parts[1]; a, m, stype = IND[slug]
            about = [e(k) for k in a] + [e('local-seo')]; mentions = [e(k) for k in m] + [e('gbp'), e('google-maps'), e('edmonton')]; area = [e(k) for k in REGION]
            group = p['group'].split(' · ')[1]
            exp = ['dated map-pack screenshot for the main industry search in Edmonton', 'a real (anonymised) Business Profile audit for a client in this industry', 'seasonal demand chart for the industry terms']
            if slug in IND_EXP: exp.insert(0, IND_EXP[slug])
            trust = BASE_TRUST[:3] + (['follows the industry regulator\'s advertising rules and says so'] if slug in IND_SRC else [])
            eeat = mk_eeat('[[SEO strategist who has worked with %s]]' % {'hvac': 'HVAC companies', 'pest-control': 'pest control companies', 'appliance-repair': 'appliance repair companies'}.get(slug, slug.replace('-', ' ')), YMYL_REVIEW.get(group), exp, trust, src('local', *IND_SRC.get(slug, [])))
    elif parts[0] == 'areas':
        if len(parts) == 1:
            about = [e('edmonton-metro')]; mentions = [e(k) for k in REGION]; area = [e(k) for k in HOME_AREA + ['morinville', 'devon', 'gibbons', 'leduc-county', 'strathcona-county', 'parkland-county', 'sturgeon-county']]
            stype = 'Local SEO'
            eeat = mk_eeat(STRATEGIST, None, ['map of the service area'], BASE_TRUST[:2] + ['one Edmonton GBP, no virtual offices'], src('local'))
        else:
            slug = parts[1]; near, land = AREA_MAP[slug]
            about = [e(slug)]; mentions = [e(k) for k in land] + [e('edmonton'), e('gbp'), e('google-maps')]; area = [e(slug)] + [e(k) for k in near]; stype = 'Local SEO'
            eeat = mk_eeat('[[Local SEO specialist who did the %s map-pack research]]' % ENT[slug]['name'], STRATEGIST,
                           ['own map-pack grid for 3 trades in %s, dated' % ENT[slug]['name'], 'photo or mention of a real local event, chamber or client', 'a client result from %s once available' % ENT[slug]['name']],
                           BASE_TRUST[:2] + ['served from the Edmonton office; no fake local address'], src('local', *AREA_SRC.get(slug, [])))
    elif parts[0] == 'case-studies':
        about = [e('seo')]; mentions = [e('search-console'), e('google-analytics'), e('gbp')]
        eeat = mk_eeat(STRATEGIST, None, ['real client name or written permission to anonymise', 'before/after numbers with source and date range'], ['numbers from client-owned tools only', 'client approval on file'], [])
    elif parts[0] == 'blog':
        if len(parts) == 1:
            about = [e('local-seo')]; eeat = mk_eeat(STRATEGIST, None, [], BASE_TRUST[4:], [])
        else:
            a, m, sk = BLOG_MAP[parts[1]]
            about = [e(k) for k in a]; mentions = [e(k) for k in m] + [e('edmonton')]
            eeat = mk_eeat('[[Named team member with an author page at /team/[name]/]]', STRATEGIST,
                           ['screenshots from a real Business Profile or Search Console (anonymised)', 'an Edmonton example from client work', '"Checked against Google documentation on [date]" line'],
                           ['byline links to author page', 'sources section with primary links', 'visible published and updated dates'], src(*sk))
    elif t == 'Legal':
        eeat = mk_eeat('[[Business owner]]', 'Reviewed by a lawyer before publishing (Alberta PIPA for privacy)', [], ['last updated date'], [])
    else:
        eeat = mk_eeat(STRATEGIST, None, [], BASE_TRUST[:2], [])
    p['about'] = about; p['mentions'] = mentions; p['area_served'] = area
    if stype: p['service_type'] = stype
    elif 'service_type' in p: del p['service_type']
    p['eeat'] = eeat

# insert new pages after /about/ (idempotent)
existing = {p['url'] for p in pages}
at = next(i for i, p in enumerate(pages) if p['url'] == '/about/') + 1
for n in reversed(NEW):
    if n['url'] not in existing: pages.insert(at, n)
    else: pages[[p['url'] for p in pages].index(n['url'])] = n
# link the new trust pages from About and the homepage
for p in pages:
    if p['url'] == '/about/':
        for l in [link('team', 'meet the team'), link('how-we-work', 'how we work')]:
            if l not in p['internal_links']: p['internal_links'].append(l)
plan['eeat_rule'] = 'No invented people, reviews, credentials, results or stats. Keep [[placeholders]] until the business supplies real, approved details.'
plan['entity_source'] = 'plan/entities.json (Wikidata API, Wikipedia URLs verified HTTP 200 on 2026-10-23)'
json.dump(plan, open(os.path.join(OUT, 'content-plan.json'), 'w'), indent=1, ensure_ascii=False)
missing = [p['url'] for p in pages if 'eeat' not in p]
print(len(pages), 'pages; missing eeat:', missing)
print('pages with about:', sum(1 for p in pages if p['about']), ' with service_type:', sum(1 for p in pages if p.get('service_type')))

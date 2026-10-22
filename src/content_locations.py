# Locations hub + Edmonton neighbourhood pages.
# Each neighbourhood page teaches a different local search topic so no two pages repeat each other
# (Google treats near-identical city or region pages as doorway abuse).
# Neighbourhood names verified against City of Edmonton study area list and the neighbourhood table.

def loc(slug, name, keyword, desc, card, angle, sections, faq):
    s = [{'type': 'page_hero', 'eyebrow': 'SEO in %s' % name, 'h1': 'SEO Services in %s, Edmonton' % name,
          'lead': 'Local SEO for businesses that serve customers in %s. %s' % (name, angle), 'cta': ('Get a free SEO review', 'contact')}]
    s += sections
    s.append({'type': 'meta', 'items': [('Neighbourhood', name), ('City', 'Edmonton, AB'), ('Local clients', '[[Number or names of clients here]]'), ('Focus this page', card)]})
    s.append({'type': 'quote', 'text': '[[Add a real testimonial from a client in %s.]]' % name, 'cite': '[[Client name, business, %s]]' % name})
    s.append({'type': 'faq', 'heading': 'SEO in %s: common questions' % name, 'items': faq})
    s.append({'type': 'links', 'eyebrow': 'Nearby', 'heading': 'Other Edmonton neighbourhoods we cover', 'items': [x for x in ALL if x != 'locations/' + slug][:3]})
    s.append({'type': 'cta', 'heading': 'Grow your %s business on Google' % name, 'text': 'Book a free review. We will check how you appear to customers searching in %s.' % name})
    return {'slug': 'locations/' + slug, 'nav_label': name, 'icon': 'pin', 'keyword': keyword,
            'title': 'SEO Services %s Edmonton | Local SEO | BrandName' % name, 'description': desc, 'card': card,
            'crumbs': [('Locations', 'locations')], 'service': 'Local SEO in %s, Edmonton' % name, 'area': '%s, Edmonton, AB' % name, 'sections': s}

ALL = ['locations/downtown-edmonton', 'locations/oliver', 'locations/strathcona', 'locations/windermere', 'locations/summerside', 'locations/terwillegar-towne']

PAGES = [
{
 'slug': 'locations', 'nav_label': 'All Locations', 'icon': 'map', 'page_type': 'CollectionPage',
 'title': 'Edmonton SEO Locations | Neighbourhoods We Serve | BrandName',
 'description': 'SEO services across Edmonton neighbourhoods including Downtown, Oliver, Strathcona, Windermere, Summerside and Terwillegar Towne.',
 'keyword': 'seo edmonton neighbourhoods', 'card': 'Every Edmonton neighbourhood we cover.',
 'sections': [
  {'type': 'page_hero', 'eyebrow': 'Locations', 'h1': 'SEO Across Edmonton Neighbourhoods', 'lead': 'Search results change from one part of the city to another. We track and work on them neighbourhood by neighbourhood.', 'cta': ('Get a free SEO review', 'contact')},
  {'type': 'split', 'eyebrow': 'Why it matters', 'heading': 'Distance is one of Google\'s local ranking factors', 'visual': 'map', 'vdata': {'title': 'Results vary by location', 'sub': 'Same search, different neighbourhood'},
   'body': ['Google says local results depend partly on distance: how far each business is from the person searching. Someone searching in Windermere can see different results from someone in Oliver.',
            'That is why we measure rankings across neighbourhoods, not just for Edmonton as a whole.']},
  {'type': 'links', 'eyebrow': 'Neighbourhoods', 'heading': 'Choose your neighbourhood', 'intro': 'Each page covers a different local SEO topic, so they are worth reading even if you are elsewhere in the city.', 'bg': 'soft', 'items': ALL},
  {'type': 'table', 'eyebrow': 'What each page covers', 'heading': 'One topic per neighbourhood', 'cols': ['Neighbourhood', 'Topic covered'],
   'rows': [['Downtown', 'Storefront vs service area profiles'], ['Oliver', 'Building a steady review process'], ['Strathcona', 'Photos, hours and keeping your profile current'],
            ['Windermere', 'Launching a new business on Google'], ['Summerside', 'Location pages done right'], ['Terwillegar Towne', 'Citations and consistent business details']]},
  {'type': 'cta', 'heading': 'Do not see your neighbourhood?', 'text': 'We work across Edmonton. Tell us where your customers are and we will plan around it.'},
 ]},

loc('downtown-edmonton', 'Downtown', 'seo services downtown edmonton',
    'SEO services for Downtown Edmonton businesses. Learn how storefront and service area profiles work and how we help you rank in local results.',
    'Storefront vs service area profiles', 'This page explains how to set up your profile correctly as a storefront or service area business.',
    [
     {'type': 'split', 'eyebrow': 'Local topic', 'heading': 'Storefront or service area: set it up right', 'visual': 'map', 'vdata': {'title': 'Downtown storefront', 'sub': 'Address shown · Directions'},
      'body': ['Businesses that welcome customers at an address and businesses that travel to customers need different Business Profile setups.',
               'Getting this right is the first step for any Downtown business, because it decides whether Google shows your address, your service area or both.'],
      'bullets': ['Storefront: address and hours shown', 'Service area: areas you serve listed', 'Hybrid: both, set up carefully']},
     {'type': 'cards', 'eyebrow': 'How we help', 'heading': 'Local SEO for Downtown businesses', 'bg': 'soft', 'cols': 3, 'items': [
        {'icon': 'store', 'title': 'Profile setup', 'text': 'The right business type, address and service area settings.'},
        {'icon': 'clock', 'title': 'Accurate hours', 'text': 'Regular and special hours so customers are not turned away.'},
        {'icon': 'doc', 'title': 'Matching website pages', 'text': 'Contact and location details on your site that match your profile.'}]},
     {'type': 'steps', 'eyebrow': 'Process', 'heading': 'Our first 90 days in Downtown', 'items': [
        ('Review setup', 'Check business type and settings.'), ('Correct details', 'Fix address, hours and categories.'), ('Track locally', 'Measure rankings from Downtown searches.')]},
    ],
    [('Should I hide my address?', 'Only if customers do not visit you. Service area businesses list the areas they serve instead of showing an address.'),
     ('Can I have a profile without an office?', 'Service area businesses can have a profile. We help you set it up correctly.'),
     ('Do you work with Downtown businesses only?', 'No. We work across Edmonton. This page focuses on one topic many Downtown businesses ask about.')]),

loc('oliver', 'Oliver', 'seo services oliver edmonton',
    'SEO services for businesses in Oliver, Edmonton. How a steady, genuine review process supports local rankings and how we help you build one.',
    'Building a steady review process', 'This page explains how to build a steady, genuine review process.',
    [
     {'type': 'split', 'eyebrow': 'Local topic', 'heading': 'Reviews: steady beats sudden', 'visual': 'cards',
      'vdata': {'items': [('star', 'Ask at the right moment', 'Right after a good experience'), ('message', 'Reply to every review', 'Good and bad'), ('chart', 'Track over time', 'Count and rating')]},
      'body': ['Google says more reviews and positive ratings can help your local ranking, and recommends responding to reviews.',
               'The businesses that do best build reviews into their routine, asking every customer for honest feedback rather than running a one-off push.'],
      'bullets': ['A simple request process for your team', 'Reply templates in your voice', 'Monthly review tracking']},
     {'type': 'cards', 'eyebrow': 'How we help', 'heading': 'Review support for Oliver businesses', 'bg': 'soft', 'cols': 3, 'items': [
        {'icon': 'mail', 'title': 'Request templates', 'text': 'Email and SMS messages sent to every customer, not just the happy ones.'},
        {'icon': 'message', 'title': 'Response guidelines', 'text': 'How to reply calmly and helpfully, even to criticism.'},
        {'icon': 'chart', 'title': 'Review reporting', 'text': 'New reviews, average rating and replies tracked monthly.'}]},
     {'type': 'steps', 'eyebrow': 'Process', 'heading': 'Our first 90 days in Oliver', 'items': [
        ('Baseline', 'Current review count and rating.'), ('Routine', 'Request process built into your workflow.'), ('Respond', 'Every review answered.')]},
    ],
    [('Can we offer discounts for reviews?', 'No. Google\'s contribution policy does not allow rewards such as cash, discounts or free services in exchange for reviews. It also does not allow asking only happy customers. We help you ask every customer, honestly.'),
     ('What if we get a bad review?', 'Reply calmly, acknowledge the issue and offer to resolve it offline. Future customers read your replies.'),
     ('How many reviews do we need?', 'There is no fixed number. Steady, recent reviews matter more than a one-time spike.')]),

loc('strathcona', 'Strathcona', 'seo services strathcona edmonton',
    'SEO services for businesses in Strathcona, Edmonton. How photos, hours and regular updates keep your Business Profile current and useful.',
    'Photos, hours and keeping your profile current', 'This page explains how photos, hours and regular updates keep your profile current.',
    [
     {'type': 'split', 'eyebrow': 'Local topic', 'heading': 'A profile that looks open for business', 'visual': 'map', 'vdata': {'title': 'Your Strathcona profile', 'sub': 'Updated photos · Holiday hours set'},
      'body': ['Google recommends keeping business information current, including special hours, and adding photos and videos to show what you offer.',
               'A profile with fresh photos and accurate hours gives customers confidence before they visit.'],
      'bullets': ['Photo plan for your space, team and work', 'Special hours set before every holiday', 'Attributes customers care about']},
     {'type': 'cards', 'eyebrow': 'How we help', 'heading': 'Profile upkeep for Strathcona businesses', 'bg': 'soft', 'cols': 3, 'items': [
        {'icon': 'image', 'title': 'Photo schedule', 'text': 'What to photograph and when to upload it.'},
        {'icon': 'calendar', 'title': 'Holiday hours', 'text': 'Special hours added ahead of time.'},
        {'icon': 'message', 'title': 'Posts', 'text': 'Events, offers and news shared on your profile.'}]},
     {'type': 'steps', 'eyebrow': 'Process', 'heading': 'Our first 90 days in Strathcona', 'items': [
        ('Profile audit', 'Photos, hours and attributes.'), ('Refresh', 'New photos and corrected details.'), ('Maintain', 'Monthly updates and posts.')]},
    ],
    [('Do photos help ranking?', 'Google recommends adding photos and videos to show customers what you offer. Their main job is helping customers choose you.'),
     ('What are special hours?', 'Hours for holidays or one-off changes, set so Google shows the right times.'),
     ('Can you take photos for us?', '[[Confirm whether you offer photography or partner with a photographer.]]')]),

loc('windermere', 'Windermere', 'seo services windermere edmonton',
    'SEO services for businesses in Windermere, Edmonton. A launch checklist for new businesses: verification, website basics and first local signals.',
    'Launching a new business on Google', 'This page is a launch checklist for new businesses getting started on Google.',
    [
     {'type': 'split', 'eyebrow': 'Local topic', 'heading': 'Launching a new business on Google', 'visual': 'cards',
      'vdata': {'items': [('shield', 'Verify', 'Confirm your profile'), ('doc', 'Publish your site', 'Clear service pages'), ('search', 'Search Console', 'Verify your website'), ('star', 'First reviews', 'From real customers')]},
      'body': ['Google says verified businesses are more likely to appear in local results. For a new business, verification and accurate details come first.',
               'Next comes a website with clear service pages, verified in Search Console so you can see how Google finds it.'],
      'bullets': ['Business Profile created and verified', 'Website verified in Search Console', 'Sitemap submitted and indexing checked']},
     {'type': 'cards', 'eyebrow': 'How we help', 'heading': 'Launch support for Windermere businesses', 'bg': 'soft', 'cols': 3, 'items': [
        {'icon': 'shield', 'title': 'Verification', 'text': 'Profile created and verified correctly.'},
        {'icon': 'code', 'title': 'Website setup', 'text': 'Titles, structure and structured data from day one.'},
        {'icon': 'search', 'title': 'Search Console', 'text': 'Site verified and sitemap submitted.'}]},
     {'type': 'steps', 'eyebrow': 'Process', 'heading': 'Our first 90 days in Windermere', 'items': [
        ('Set up', 'Profile, site and Search Console.'), ('Get indexed', 'Pages found and indexed.'), ('First signals', 'Reviews and local mentions.')]},
    ],
    [('How soon should a new business start SEO?', 'Before launch if possible. Setting up structure and verification early avoids fixes later.'),
     ('Is a sitemap required?', 'Google says a sitemap is optional and most pages are found through links, but it is a quick step we recommend.'),
     ('Can you build our website too?', '[[Confirm whether you offer web design.]]')]),

loc('summerside', 'Summerside', 'seo services summerside edmonton',
    'SEO services for businesses in Summerside, Edmonton. How to build location and service area pages that help customers instead of looking like doorway pages.',
    'Location pages done right', 'This page explains how to build location pages that help customers.',
    [
     {'type': 'split', 'eyebrow': 'Local topic', 'heading': 'Location pages that help, not doorways', 'visual': 'cards',
      'vdata': {'items': [('pin', 'Real local detail', 'Projects, staff, photos'), ('doc', 'Unique content', 'Not a copy with the name swapped'), ('shield', 'Within guidelines', 'No doorway pages')]},
      'body': ['Google lists pages targeted at specific regions or cities that funnel users to one page as doorway abuse.',
               'A good location page earns its place with real local substance: projects completed in the area, local staff, photos and answers specific to customers there.'],
      'bullets': ['Only build pages you can fill with real detail', 'Unique content on each page', 'Clear links to the services offered']},
     {'type': 'cards', 'eyebrow': 'How we help', 'heading': 'Location page support for Summerside', 'bg': 'soft', 'cols': 3, 'items': [
        {'icon': 'compass', 'title': 'Page planning', 'text': 'Which areas deserve a page and which do not.'},
        {'icon': 'pen', 'title': 'Unique content', 'text': 'Written around your real work in each area.'},
        {'icon': 'link', 'title': 'Internal links', 'text': 'Location pages connected to the right services.'}]},
     {'type': 'steps', 'eyebrow': 'Process', 'heading': 'Our first 90 days in Summerside', 'items': [
        ('Audit pages', 'Find thin or duplicate location pages.'), ('Consolidate', 'Merge or improve weak pages.'), ('Enrich', 'Add real local detail.')]},
    ],
    [('Should I make a page for every suburb?', 'Only where you have genuinely useful, unique content to offer customers there.'),
     ('Can I reuse one template for all areas?', 'A shared layout is fine. Swapping only the place name is not. Each page needs real, unique substance.'),
     ('What counts as local detail?', 'Projects, staff, photos, testimonials and answers specific to that area.')]),

loc('terwillegar-towne', 'Terwillegar Towne', 'seo services terwillegar towne edmonton',
    'SEO services for businesses in Terwillegar Towne, Edmonton. How consistent business details across listings and your website support local search.',
    'Citations and consistent business details', 'This page explains why consistent business details across the web matter.',
    [
     {'type': 'split', 'eyebrow': 'Local topic', 'heading': 'One name, one address, one phone number', 'visual': 'cards',
      'vdata': {'items': [('store', 'Business Profile', 'Source of truth'), ('doc', 'Your website', 'Matches exactly'), ('map', 'Directories', 'Relevant listings only'), ('code', 'Structured data', 'LocalBusiness markup')]},
      'body': ['Google recommends keeping your business information current. When your name, address and phone number differ across your profile, website and listings, customers and search engines get mixed signals.',
               'We find every listing, fix the differences and keep them in sync.'],
      'bullets': ['Full listing audit', 'Duplicates and old details corrected', 'Website and structured data aligned']},
     {'type': 'cards', 'eyebrow': 'How we help', 'heading': 'Citation cleanup for Terwillegar Towne', 'bg': 'soft', 'cols': 3, 'items': [
        {'icon': 'search', 'title': 'Listing audit', 'text': 'Every place your business appears online.'},
        {'icon': 'shield', 'title': 'Corrections', 'text': 'Old addresses, phone numbers and duplicates fixed.'},
        {'icon': 'code', 'title': 'Schema alignment', 'text': 'LocalBusiness markup matching your profile.'}]},
     {'type': 'steps', 'eyebrow': 'Process', 'heading': 'Our first 90 days in Terwillegar Towne', 'items': [
        ('Find', 'Every listing and mention.'), ('Fix', 'Consistent details everywhere.'), ('Monitor', 'Catch new errors early.')]},
    ],
    [('What is a citation?', 'Any online mention of your business name, address and phone number, such as a directory listing.'),
     ('Do directories still matter?', 'Accurate listings on relevant sites help consistency. Google lists low quality directory links as link spam, so we stick to relevant ones.'),
     ('We moved. What should we update first?', 'Your Business Profile, then your website, then major listings.')]),
]

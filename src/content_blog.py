# Blog hub + 3 posts. Each post is written in our own words from Google's primary documentation and links to it.
from content_core import POST_SLUGS

L7091 = ('Google Business Profile Help: How to improve your local ranking', 'https://support.google.com/business/answer/7091?hl=en')
CONTRIB = ('Google Maps contribution policy: Prohibited and restricted content', 'https://support.google.com/contributionpolicy/answer/7400114?hl=en')
AIF = ('Google Search Central: AI features and your website', 'https://developers.google.com/search/docs/appearance/ai-features')
HIRE = ('Google Search Central: Do you need an SEO?', 'https://developers.google.com/search/docs/fundamentals/do-i-need-seo')
SPAM = ('Google Search Central: Spam policies', 'https://developers.google.com/search/docs/essentials/spam-policies')

PHOTOS = {'how-google-ranks-local-businesses': 'https://images.unsplash.com/photo-1531058240690-006c446962d8?auto=format&fit=crop&w=800&q=80', 'ai-overviews-and-your-website': 'https://images.unsplash.com/photo-1571826945830-5423b80a986c?auto=format&fit=crop&w=800&q=80', 'choosing-an-seo-agency-in-edmonton': 'https://images.unsplash.com/photo-1620325867502-221cfb5faa5f?auto=format&fit=crop&w=800&q=80'}

def post(slug, label, tag, icon, desc, card, date, blocks, keyword):
    return {'photo': PHOTOS[slug], 'illus': {'pin': 'map', 'spark': 'spark', 'users': 'star'}[icon], 'slug': 'blog/' + slug, 'nav_label': label, 'tag': tag, 'icon': icon, 'card': card, 'article': date, 'page_type': 'WebPage',
            'title': '%s | BrandName Blog' % label, 'description': desc, 'keyword': keyword, 'crumbs': [('Blog', 'blog')],
            'sections': [
              {'type': 'page_hero', 'eyebrow': '%s · [[Publish date]]' % tag, 'h1': label, 'lead': card},
              {'type': 'prose', 'blocks': blocks},
              {'type': 'posts', 'eyebrow': 'Keep reading', 'heading': 'More from the blog', 'bg': 'soft', 'items': [x for x in POST_SLUGS if x != 'blog/' + slug]},
              {'type': 'cta', 'heading': 'Want this done for your business?', 'text': 'Book a free SEO review and we will apply it to your site and profile.'},
            ]}

PAGES = [
{
 'slug': 'blog', 'nav_label': 'Blog', 'icon': 'book', 'page_type': 'CollectionPage',
 'title': 'SEO Blog | Edmonton SEO Tips | BrandName',
 'description': 'Practical SEO advice for Edmonton businesses, checked against Google\'s own documentation. Local SEO, AI search and choosing an agency.',
 'keyword': 'edmonton seo blog', 'card': 'SEO advice, checked against the source.',
 'sections': [
  {'type': 'page_hero', 'eyebrow': 'Blog', 'h1': 'SEO Advice for Edmonton Businesses', 'lead': 'Practical guides, checked against Google\'s own documentation, with sources linked in every article.'},
  {'type': 'posts', 'eyebrow': 'Latest', 'heading': 'Recent articles', 'items': POST_SLUGS},
  {'type': 'cta', 'heading': 'Prefer to have it done for you?', 'text': 'Book a free review and we will tell you what to fix first.'},
 ]},
post('how-google-ranks-local-businesses', 'How Google Ranks Local Businesses in Edmonton', 'Local SEO', 'pin',
     'What Google says decides local rankings, the tips it recommends and what that means for Edmonton businesses competing in the map pack.',
     'The three factors Google uses for local results and what you can do about each one.', '2026-10-23', [
      ('p', 'If you run a business in Edmonton, the map results are often where customers find you first. Google publishes a short help article that explains how those results are ranked. Here is what it says, in plain language, and how to act on it.'),
      ('h2', 'The three factors'),
      ('p', 'Google says local results are based mainly on three things:'),
      ('ul', ['**Relevance:** how well your Business Profile matches what someone searched for. Complete, detailed information helps.',
              '**Distance:** how far your business is from the searcher, or from the location in their search.',
              '**Prominence:** how well known your business is. Google mentions links to your business and your review count as inputs.']),
      ('p', 'Google also states plainly that you cannot request or pay for a better local ranking.'),
      ('h2', 'What Google recommends'),
      ('ul', ['Verify your business.', 'Keep your address, hours, special hours, category and attributes current.', 'Respond to reviews.', 'Add photos and videos.',
              'If you are an eligible retailer, add in-store products.']),
      ('h2', 'What this means in Edmonton'),
      ('p', 'Distance is the one factor you cannot change, and it is why results look different in Windermere than they do Downtown. Focus your effort on relevance and prominence: a complete profile, a website that supports it, steady genuine reviews and mentions from local organizations.'),
      ('callout', 'A note on reviews: Google\'s contribution policy does not allow rewards in exchange for reviews, and it does not allow asking only happy customers. Ask every customer, and keep it honest.'),
      ('h2', 'Where to start'),
      ('p', 'Open your Business Profile and check every field against your real details. Then read our {{Local SEO|services/local-seo}} page to see how we handle the rest.'),
      ('src', [L7091, CONTRIB])], 'how google ranks local businesses'),
post('ai-overviews-and-your-website', 'AI Overviews and Your Website: What Google Says', 'AI search', 'spark',
     'Do you need special optimization for Google AI Overviews or AI Mode? What Google\'s own guidance says and the best practices it recommends.',
     'Google\'s own answer on what it takes to appear in AI Overviews and AI Mode.', '2026-10-23', [
      ('p', 'A lot of advice now promises special tricks for AI search. Google has published its own guidance for site owners on AI Overviews and AI Mode, and it is simpler than the hype suggests.'),
      ('h2', 'No extra requirements'),
      ('p', 'Google says there are no additional requirements and no special optimizations needed to appear in AI Overviews or AI Mode. A page needs to be indexed and eligible to show in Search with a snippet. Meeting that bar does not guarantee a page will be shown.'),
      ('h2', 'The best practices Google lists'),
      ('ul', ['Allow crawling in robots.txt and in any CDN or hosting settings.', 'Make content easy to find through internal links.', 'Provide a good page experience.',
              'Keep important content in text form.', 'Support text with relevant, high quality images and video.', 'Make sure structured data matches the visible text.',
              'Keep Merchant Center and Business Profile information current.', 'Verify your site in Search Console.']),
      ('h2', 'What you do not need'),
      ('p', 'According to the same page, you do not need new machine readable files, AI specific text files or special markup for Google\'s AI features. There is no special schema.org type for them.'),
      ('callout', 'Other AI tools publish their own guidance and may treat things differently. For Google, strong SEO fundamentals are the plan.'),
      ('h2', 'Next step'),
      ('p', 'Our {{AI Search Optimization|services/ai-search-optimization}} service checks your site against each of these practices.'),
      ('src', [AIF])], 'ai overviews seo'),
post('choosing-an-seo-agency-in-edmonton', 'How to Choose an SEO Agency in Edmonton', 'Hiring', 'users',
     'Questions to ask before hiring an SEO agency in Edmonton, based on Google\'s own advice, plus the red flags that should make you walk away.',
     'The questions Google suggests asking and the red flags to watch for.', '2026-10-23', [
      ('p', 'Hiring an SEO agency is a big decision. Google has a help page written for exactly this moment. Here are its main points, and how we would apply them when choosing a partner in Edmonton.'),
      ('h2', 'Questions to ask'),
      ('ul', ['Can you show examples of previous work and success stories?', 'Do you follow Google Search Essentials?', 'What experience do you have in my industry?',
              'How long have you been in business?', 'Will you share every change you make to my site?', 'What results do you expect, and in what timeframe?']),
      ('h2', 'Red flags'),
      ('ul', ['A guaranteed #1 ranking. Google says no one can guarantee that.', 'Being asked to link back to the agency. Google says you should never have to.',
              'Link buying or link schemes. Google\'s spam policies treat buying links for ranking as a violation.']),
      ('callout', 'Google also reminds business owners that they are responsible for the actions of any company they hire. Ask questions until the answers are clear.'),
      ('h2', 'How we answer these questions'),
      ('p', 'We share {{case studies|case-studies}}, follow Google Search Essentials, log every change and give expected results in writing after an audit. If you want to test us, start with an {{SEO Audit|services/seo-audit}}.'),
      ('src', [HIRE, SPAM])], 'choose seo agency edmonton'),
]

"""Static site generator for the Edmonton SEO services website.

Usage:
  python3 src/build.py            -> dist/     (production, clean URLs like /services/local-seo/)
  python3 src/build.py --preview  -> preview/  (relative links to index.html, opens from disk)

Page content lives in content_*.py. Each page is a dict of meta + a list of sections.
The same section data renders both the HTML page and the page's Markdown content file.
"""
import html, json, os, re, shutil, sys, datetime

sys.path.insert(0, os.path.dirname(__file__))
from site_config import SITE
from icons import ICONS
from illus import illus
import content_core, content_services, content_locations, content_cases, content_blog

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PREVIEW = '--preview' in sys.argv
OUT = os.path.join(ROOT, 'preview' if PREVIEW else 'dist')
TODAY = datetime.date.today().isoformat()

PAGES = (content_core.PAGES + content_services.PAGES + content_locations.PAGES
         + content_cases.PAGES + content_blog.PAGES)
BY_SLUG = {p['slug']: p for p in PAGES}

# ---------------------------------------------------------------- helpers
def esc(s):
    return html.escape(str(s), quote=True)

def rich(s):
    """Escape text, then allow two inline marks: [[placeholder]] and **bold**."""
    s = esc(s)
    s = re.sub(r'\[\[(.+?)\]\]', r'<span class="ph">[\1]</span>', s)
    s = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', s)
    s = re.sub(r'\{\{(.+?)\|(.+?)\}\}', lambda m: '<a href="%s">%s</a>' % (link(CUR['slug'], m.group(2)), m.group(1)), s)
    return s

def md(s):
    s = str(s)
    s = re.sub(r'\[\[(.+?)\]\]', r'[\1]', s)
    s = re.sub(r'\{\{(.+?)\|(.+?)\}\}', lambda m: '[%s](%s)' % (m.group(1), url_of(m.group(2))), s)
    return s

def strip(s):
    s = re.sub(r'\[\[(.+?)\]\]', r'[\1]', str(s))
    s = re.sub(r'\{\{(.+?)\|(.+?)\}\}', r'\1', s)
    return s.replace('**', '')

def url_of(slug):
    if slug.startswith('http') or slug.startswith('#') or slug.startswith('mailto:') or slug.startswith('tel:'):
        return slug
    return SITE['domain'] + ('/' + slug + '/' if slug else '/')

def link(frm, to):
    if to.startswith(('http', '#', 'mailto:', 'tel:')):
        return to
    anchor = ''
    if '#' in to:
        to, anchor = to.split('#', 1); anchor = '#' + anchor
    if not PREVIEW:
        return ('/' + to + '/' if to else '/') + anchor
    depth = len(frm.split('/')) if frm else 0
    up = '../' * depth
    return up + (to + '/' if to else '') + 'index.html' + anchor

def asset(frm, path):
    if not PREVIEW:
        return '/' + path
    depth = len(frm.split('/')) if frm else 0
    return '../' * depth + path

def icon(name, color='#283220'):
    return '<svg viewBox="0 0 24 24" fill="none" stroke="%s" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">%s</svg>' % (color, ICONS[name])

ARROW = icon('arrow', 'currentColor')
PASTELS = ['p-lilac', 'p-mint', 'p-cream', 'p-sky']

def photo(p, file, alt, cls=''):
    """Photo slot. External URL = licensed stock photo. Local name = placeholder until the owner adds assets/img/<file>."""
    if file.startswith('http'):
        return '<div class="photo %s"><img src="%s" alt="%s" loading="lazy" decoding="async" onerror="this.style.display=\'none\'"></div>' % (cls, esc(file), esc(alt))
    return ('<div class="photo %s"><div class="photo-ph">%s<span>Add photo: assets/img/%s</span></div>'
            '<img src="%s" alt="%s" loading="lazy" onerror="this.remove()"></div>') % (cls, icon('image', '#4d5748'), esc(file), asset(p['slug'], 'assets/img/' + file), esc(alt))
CHIPS = ['chip-mint', 'chip-cream', 'chip-lilac', 'chip-sky']
CUR = {}

def head_block(eyebrow=None, heading=None, intro=None, center=False):
    out = '<div class="section-head%s reveal">' % (' center' if center else '')
    if eyebrow: out += '<span class="eyebrow">%s</span>' % rich(eyebrow)
    if heading: out += '<h2>%s</h2>' % rich(heading)
    if intro: out += '<p class="intro">%s</p>' % rich(intro)
    return out + '</div>'

def md_head(s):
    out = []
    if s.get('eyebrow'): out.append('*Eyebrow:* %s' % md(s['eyebrow']).replace('*', ''))
    if s.get('heading'): out.append('## %s' % md(s['heading']))
    if s.get('intro'): out.append(md(s['intro']))
    return out

def sec_open(s, default_bg=''):
    bg = s.get('bg', default_bg)
    cls = 'section' + (' ' + {'soft': 'bg-soft', 'cream': 'bg-cream', 'mint': 'bg-mint', 'dark': 'bg-dark'}.get(bg, '') if bg else '')
    if s.get('tight'): cls += ' tight'
    sid = ' id="%s"' % s['id'] if s.get('id') else ''
    return '<section class="%s"%s><div class="container">' % (cls, sid)

SEC_CLOSE = '</div></section>'

# ---------------------------------------------------------------- visuals
def visual(kind, data=None):
    data = data or {}
    if kind == 'illus':
        return '<div class="split-illus">%s</div>' % illus(data.get('name', 'search'))
    if kind == 'serp':
        q = data.get('query', 'seo services edmonton')
        rows = ''.join('<div class="row%s"><b>%s</b><span></span><span class="s"></span></div>' % (' win' if i == 0 else '', esc(t))
                       for i, t in enumerate(data.get('rows', ['Your business, ranking', 'Competitor listing', 'Directory page'])))
        return '<div class="serp"><div class="bar">%s<span>%s</span></div>%s</div>' % (icon('search'), esc(q), rows)
    if kind == 'map':
        pins = ''.join('<span class="pin" style="left:%s;top:%s"></span>' % p for p in [('14%', '20%'), ('70%', '16%'), ('78%', '62%'), ('24%', '66%')])
        return ('<div class="map-viz">%s<span class="pin main" style="left:44%%;top:34%%"></span>'
                '<div class="map-tag"><b>%s</b>%s</div></div>') % (pins, esc(data.get('title', 'Your Business Profile')), esc(data.get('sub', 'Edmonton, AB')))
    if kind == 'code':
        lines = data.get('lines') or [
            '<span class="c">// robots.txt</span>',
            '<span class="k">User-agent:</span> *',
            '<span class="k">Allow:</span> /',
            '<span class="k">Sitemap:</span> <span class="s">https://seoservicesedmonton.ca/sitemap.xml</span>',
            '',
            '<span class="c">&lt;!-- head --&gt;</span>',
            '&lt;<span class="k">link</span> rel=<span class="s">"canonical"</span> href=<span class="s">"/services/"</span>&gt;',
        ]
        return '<div class="code-viz"><div class="dots"><span></span><span></span><span></span></div>%s</div>' % '<br>'.join(lines)
    # default: stacked cards
    items = data.get('items', [])
    cards = ''.join('<div class="viz-card"><span class="icon-chip %s">%s</span><span>%s<small>%s</small></span></div>'
                    % (CHIPS[i % 4], icon(it[0]), esc(it[1]), esc(it[2])) for i, it in enumerate(items))
    return '<div class="viz">%s</div>' % cards

# ---------------------------------------------------------------- section renderers (HTML, MD)
def r_hero_home(s, p):
    btns = '<a class="btn btn-mint" href="%s">%s</a><a class="btn btn-ghost" href="%s">%s</a>' % (link(p['slug'], s['cta'][1]), esc(s['cta'][0]), link(p['slug'], s['cta2'][1]), esc(s['cta2'][0]))
    note = '<ul class="hero-note">%s</ul>' % ''.join('<li>%s%s</li>' % (icon('check-circle'), rich(t)) for t in s['proof'])
    bars = ''.join('<span class="%s" style="height:%d%%"></span>' % ('on' if i in (3, 5, 6) else '', h) for i, h in enumerate([34, 46, 40, 74, 56, 90, 100]))
    days = ''.join('<small>%s</small>' % d for d in 'MTWTFSS')
    media = ('<div class="hero-media reveal reveal-d2"><div class="media-frame"><img class="hero-img" src="%s" alt="%s" fetchpriority="high" onerror="this.style.display=\'none\'">'
             '<video autoplay muted loop playsinline preload="none" aria-hidden="true" style="display:none" data-src="%s"></video></div>'
             '<div class="float-card a"><span class="fc-label">Organic clicks</span><strong>Last 7 days</strong><div class="bars">%s</div><div class="days">%s</div></div>'
             '</div>') % (esc(s['photo']), esc(s['photo_alt']), asset(p['slug'], 'assets/video/hero.mp4'), bars, days)
    h = ('<section class="hero"><div class="container hero-grid"><div class="reveal">'
         '<span class="eyebrow">%s</span><h1>%s</h1><p class="lead">%s</p><div class="btn-row">%s</div>%s</div>%s</div></section>') % (
        rich(s['eyebrow']), rich(s['h1']), rich(s['lead']), btns, note, media)
    m = ['*Eyebrow:* %s' % md(s['eyebrow']), '# %s' % md(s['h1']), md(s['lead']), 'Buttons: [%s] [%s]' % (s['cta'][0], s['cta2'][0])] + \
        ['- %s' % md(t) for t in s['proof']] + ['Media: photo (%s). Optional hero video at assets/video/hero.mp4. Floating card: "Organic clicks, last 7 days" bar chart.' % s['photo_alt']]
    return h, m

def r_page_hero(s, p):
    crumbs = '<li><a href="%s">Home</a></li>' % link(p['slug'], '')
    for label, slug in p.get('crumbs', []):
        crumbs += '<li><a href="%s">%s</a></li>' % (link(p['slug'], slug), esc(label))
    crumbs += '<li aria-current="page">%s</li>' % esc(p['nav_label'])
    btn = ''
    if s.get('cta'):
        btn = '<div class="btn-row" style="justify-content:center"><a class="btn btn-mint" href="%s">%s %s</a></div>' % (link(p['slug'], s['cta'][1]), esc(s['cta'][0]), ARROW)
    h = ('<section class="page-hero"><div class="container reveal"><nav aria-label="Breadcrumb"><ol class="crumbs" style="list-style:none;padding:0;margin:0 0 26px">%s</ol></nav>'
         '%s<h1>%s</h1><p class="lead">%s</p>%s</div></section>') % (
        crumbs, ('<span class="eyebrow">%s</span><br>' % rich(s['eyebrow'])) if s.get('eyebrow') else '', rich(s['h1']), rich(s['lead']), btn)
    m = ['Breadcrumb: Home > ' + ' > '.join([c[0] for c in p.get('crumbs', [])] + [p['nav_label']])]
    if s.get('eyebrow'): m.append('*Eyebrow:* %s' % md(s['eyebrow']))
    m += ['# %s' % md(s['h1']), md(s['lead'])]
    if s.get('cta'): m.append('Button: [%s]' % s['cta'][0])
    return h, m

def r_tools(s, p):
    h = '<section class="tools"><div class="container reveal"><p>%s</p><ul>%s</ul></div></section>' % (
        rich(s['label']), ''.join('<li>%s</li>' % esc(t) for t in s['items']))
    return h, ['**%s**' % s['label'], ', '.join(s['items'])]

def r_split(s, p):
    body = ''.join('<p>%s</p>' % rich(x) for x in s.get('body', []))
    ticks = ''
    if s.get('bullets'):
        ticks = '<ul class="ticks">%s</ul>' % ''.join('<li>%s<span>%s</span></li>' % (icon('check-circle'), rich(b)) for b in s['bullets'])
    btn = ''
    if s.get('cta'):
        btn = '<div class="btn-row"><a class="btn btn-dark" href="%s">%s %s</a></div>' % (link(p['slug'], s['cta'][1]), esc(s['cta'][0]), ARROW)
    text = '<div class="reveal">%s%s%s%s%s</div>' % (
        '<span class="eyebrow">%s</span>' % rich(s['eyebrow']) if s.get('eyebrow') else '',
        '<h2>%s</h2>' % rich(s['heading']), body, ticks, btn)
    kind, vd = s.get('visual', 'cards'), s.get('vdata')
    if p.get('illus') and kind == 'cards' and s is next((x for x in p['sections'] if x['type'] == 'split'), None):
        kind, vd = 'illus', {'name': p['illus']}
    vis = '<div class="split-visual%s reveal reveal-d2">%s</div>' % (' plain' if kind == 'illus' else '', visual(kind, vd))
    h = sec_open(s) + '<div class="split%s">%s%s</div>' % (' reverse' if s.get('reverse') else '', vis, text) + SEC_CLOSE
    m = md_head(s) + [md(x) for x in s.get('body', [])] + ['- %s' % md(b) for b in s.get('bullets', [])]
    if s.get('cta'): m.append('Button: [%s]' % s['cta'][0])
    m.append('Visual: %s' % describe_visual(s))
    return h, m

def describe_visual(s):
    k = s.get('visual', 'cards'); d = s.get('vdata') or {}
    if k == 'serp': return 'search result mock for "%s"' % d.get('query', 'seo services edmonton')
    if k == 'map': return 'map card with pin, label "%s"' % d.get('title', 'Your Business Profile')
    if k == 'code': return 'code panel (robots.txt and canonical tag)'
    if k == 'illus': return 'spot illustration'
    return 'stacked icon cards: ' + '; '.join('%s (%s)' % (i[1], i[2]) for i in d.get('items', []))

def r_cards(s, p):
    cols = s.get('cols', 3)
    items = ''
    for i, it in enumerate(s['items']):
        lk = ''
        if it.get('link'):
            lk = '<a class="link-arrow" href="%s">%s %s</a>' % (link(p['slug'], it['link']), esc(it.get('link_label', 'Learn more')), icon('arrow', 'currentColor'))
        items += '<article class="card %s%s reveal reveal-d%d"><span class="icon-chip">%s</span><h3>%s</h3><p>%s</p>%s</article>' % (
            PASTELS[i % 4], ' linked' if it.get('link') else '', i % 3 + 1, icon(it.get('icon', 'spark')), rich(it['title']), rich(it['text']), lk)
    h = sec_open(s) + head_block(s.get('eyebrow'), s.get('heading'), s.get('intro'), s.get('center', True)) + \
        '<div class="grid cols-%d">%s</div>' % (cols, items) + SEC_CLOSE
    m = md_head(s)
    for it in s['items']:
        m.append('### %s' % md(it['title']))
        m.append(md(it['text']) + (' [%s](%s)' % (it.get('link_label', 'Learn more'), url_of(it['link'])) if it.get('link') else ''))
    return h, m

def r_stats(s, p):
    items = ''.join('<div class="stat reveal reveal-d%d"><b>%s</b><span>%s</span></div>' % (i % 3 + 1, rich(it[0]), rich(it[1])) for i, it in enumerate(s['items']))
    h = sec_open(s, 'dark') + head_block(s.get('eyebrow'), s.get('heading'), s.get('intro'), True) + '<div class="stats">%s</div>' % items + SEC_CLOSE
    return h, md_head(s) + ['- %s: %s' % (md(a), md(b)) for a, b in s['items']]

def r_steps(s, p):
    n = len(s['items'])
    cls = {3: ' three', 5: ' five'}.get(n, '')
    items = ''.join('<div class="step reveal reveal-d%d"><div class="dot">%02d</div><h3>%s</h3><p>%s</p></div>' % (i % 3 + 1, i + 1, rich(t), rich(d)) for i, (t, d) in enumerate(s['items']))
    h = sec_open(s) + head_block(s.get('eyebrow'), s.get('heading'), s.get('intro'), True) + '<div class="steps%s">%s</div>' % (cls, items) + SEC_CLOSE
    return h, md_head(s) + ['%d. **%s** %s' % (i + 1, md(t), md(d)) for i, (t, d) in enumerate(s['items'])]

def r_checklist(s, p):
    items = ''
    for it in s['items']:
        t, d = (it if isinstance(it, (list, tuple)) else (it, ''))
        items += '<li class="reveal">%s<span>%s%s</span></li>' % (icon('check-circle'), rich(t), '<small>%s</small>' % rich(d) if d else '')
    bg = s.get('bg', 'soft')
    s2 = dict(s); s2['bg'] = bg
    wrap = sec_open(s2)
    if not bg: wrap = wrap.replace('class="section"', 'class="section bg-white"')
    h = wrap + head_block(s.get('eyebrow'), s.get('heading'), s.get('intro'), s.get('center', False)) + '<ul class="checklist">%s</ul>' % items + SEC_CLOSE
    m = md_head(s)
    for it in s['items']:
        t, d = (it if isinstance(it, (list, tuple)) else (it, ''))
        m.append('- **%s**%s' % (md(t), (' ' + md(d)) if d else ''))
    return h, m

def r_statement(s, p):
    txt = rich(s['text']).replace('[em]', '<span class="hl">').replace('[/em]', '</span>')
    h = '<section class="section tight bg-dark"><div class="container reveal"><p class="statement">%s</p></div></section>' % txt
    return h, ['> %s' % md(s['text']).replace('[em]', '').replace('[/em]', '')]

def r_table(s, p):
    th = ''.join('<th scope="col">%s</th>' % esc(c) for c in s['cols'])
    rows = ''.join('<tr>%s</tr>' % ''.join('<td>%s</td>' % rich(c) for c in r) for r in s['rows'])
    h = sec_open(s) + head_block(s.get('eyebrow'), s.get('heading'), s.get('intro'), True) + \
        '<div class="table-wrap reveal"><table><thead><tr>%s</tr></thead><tbody>%s</tbody></table></div>' % (th, rows) + SEC_CLOSE
    m = md_head(s) + ['| ' + ' | '.join(s['cols']) + ' |', '|' + '---|' * len(s['cols'])] + ['| ' + ' | '.join(md(c) for c in r) + ' |' for r in s['rows']]
    return h, m

def r_faq(s, p):
    items = s['items']
    half = (len(items) + 1) // 2
    col = lambda arr: '<div class="faq-col">%s</div>' % ''.join('<details><summary>%s</summary><div class="answer"><p>%s</p></div></details>' % (rich(q), rich(a)) for q, a in arr)
    body = '<div class="faq2 reveal">%s%s</div>' % (col(items[:half]), col(items[half:]) if items[half:] else '')
    h = sec_open(s) + head_block(s.get('eyebrow', 'FAQ'), s.get('heading', 'Common Questions'), s.get('intro', 'Straight answers to the questions Edmonton business owners ask us most.'), True) + body + SEC_CLOSE
    m = md_head({'eyebrow': s.get('eyebrow', 'FAQ'), 'heading': s.get('heading', 'Common Questions'), 'intro': s.get('intro', 'Straight answers to the questions Edmonton business owners ask us most.')})
    for q, a in items:
        m += ['### %s' % md(q), md(a)]
    return h, m

def r_cta(s, p):
    btn = s.get('button', ['Book a free SEO review', 'contact'])
    h = ('<section class="cta-wide"><div class="container cta-grid"><div class="reveal"><h2>%s</h2><p>%s</p>'
         '<a class="btn btn-mint" href="%s">%s</a></div><div class="cta-art reveal reveal-d2">%s</div></div></section>') % (
        rich(s['heading']), rich(s['text']), link(p['slug'], btn[1]), esc(btn[0]), ('<div class="cta-photo"><img src="%s" alt="%s" loading="lazy" onerror="this.style.display=\'none\'"></div>' % (esc(SITE['cta_photo']), esc(SITE['cta_photo_alt']))) if s.get('photo', True) else illus(s.get('art', 'mail')))
    return h, ['## %s' % md(s['heading']), md(s['text']), 'Button: [%s](%s)' % (btn[0], url_of(btn[1]))]

def r_links(s, p):
    items = ''.join('<a class="card linked reveal" href="%s"><span class="icon-chip %s">%s</span><h3>%s</h3><p>%s</p><span class="link-arrow">View %s</span></a>' % (
        link(p['slug'], slug), CHIPS[i % 4], icon(BY_SLUG[slug].get('icon', 'spark')), esc(BY_SLUG[slug]['nav_label']), rich(BY_SLUG[slug]['card']), icon('arrow', 'currentColor'))
        for i, slug in enumerate(s['items']))
    h = sec_open(s) + head_block(s.get('eyebrow'), s.get('heading'), s.get('intro'), True) + '<div class="grid cols-%d">%s</div>' % (s.get('cols', 3), items) + SEC_CLOSE
    m = md_head(s) + ['- [%s](%s): %s' % (BY_SLUG[x]['nav_label'], url_of(x), md(BY_SLUG[x]['card'])) for x in s['items']]
    return h, m

def r_team(s, p):
    items = ''.join('<article class="person reveal reveal-d%d"><div class="avatar %s">%s</div><div class="meta"><h3>%s</h3><p>%s</p></div></article>' % (
        i % 3 + 1, CHIPS[i % 4], icon('user'), rich(n), rich(r)) for i, (n, r) in enumerate(s['items']))
    h = sec_open(s) + head_block(s.get('eyebrow'), s.get('heading'), s.get('intro'), True) + '<div class="grid cols-4">%s</div>' % items + SEC_CLOSE
    return h, md_head(s) + ['- %s, %s' % (md(n), md(r)) for n, r in s['items']]

def r_packages(s, p):
    out = ''
    tints = ['t-lilac', 't-mint', 't-cream']
    for i, pk in enumerate(s['items']):
        feat = pk.get('featured')
        lis = ''.join('<li>%s<span>%s</span></li>' % (icon('check-circle'), rich(f)) for f in pk['features'])
        out += ('<article class="pkg %s%s reveal reveal-d%d">%s<h3>%s</h3><p class="pkg-price">Custom quote</p><p class="pkg-for">%s</p>'
                '<a class="btn pkg-btn" href="%s">Get a quote</a><p class="pkg-sub">What is included</p><ul>%s</ul></article>') % (
            tints[i % 3], ' featured' if feat else '', i + 1, '<span class="pkg-tab">%s %s</span>' % (icon('star', '#ffffff'), esc(pk['badge'])) if pk.get('badge') else '',
            esc(pk['name']), rich(pk['for']), link(p['slug'], 'contact'), lis)
    h = sec_open(s) + head_block(s.get('eyebrow'), s.get('heading'), s.get('intro'), True) + '<div class="grid cols-3 pkgs">%s</div>' % out + SEC_CLOSE
    m = md_head(s)
    for pk in s['items']:
        m += ['### %s%s' % (pk['name'], ' (%s)' % pk['badge'] if pk.get('badge') else ''), 'Price: Custom quote', md(pk['for'])] + ['- %s' % md(f) for f in pk['features']] + ['Button: [Get a quote]']
    return h, m

def r_posts(s, p):
    out = ''
    for i, slug in enumerate(s['items']):
        q = BY_SLUG[slug]
        kp = '<div class="kpis">%s</div>' % ''.join('<span>%s</span>' % rich(k) for k in q['kpis']) if q.get('kpis') else ''
        date = '<p class="date">%s</p>' % (rich(q.get('tag', '')) + (' · [[Publish date]]' if q.get('article') else '')).replace('[[Publish date]]', '<span class="ph">[Publish date]</span>')
        out += ('<article class="post reveal reveal-d%d"><a class="post-thumb %s" href="%s" tabindex="-1" aria-hidden="true">%s%s</a>'
                '<h3><a href="%s">%s</a></h3>%s%s<p>%s</p><a class="btn-read" href="%s">%s %s</a></article>') % (
            i % 3 + 1, PASTELS[i % 4], link(p['slug'], slug), illus(q.get('illus', 'search')) if not q.get('photo') else '', photo(p, q.get('photo') or (slug.replace('/', '-') + '.jpg'), strip(q['nav_label'])),
            link(p['slug'], slug), rich(q['nav_label']), date, kp, rich(q['card']), link(p['slug'], slug), 'Read case study' if q.get('kpis') else 'Continue reading', ARROW)
    h = sec_open(s) + head_block(s.get('eyebrow'), s.get('heading'), s.get('intro'), True) + '<div class="grid cols-3 posts">%s</div>' % out + SEC_CLOSE
    return h, md_head(s) + ['- [%s](%s): %s' % (strip(BY_SLUG[x]['nav_label']), url_of(x), md(BY_SLUG[x]['card'])) for x in s['items']]

def r_meta(s, p):
    items = ''.join('<div class="reveal"><b>%s</b>%s</div>' % (esc(k), rich(v)) for k, v in s['items'])
    h = sec_open(s, 'soft').replace('class="section', 'class="section tight', 1) + '<div class="meta-grid">%s</div>' % items + SEC_CLOSE
    return h, ['| Field | Value |', '|---|---|'] + ['| %s | %s |' % (k, md(v)) for k, v in s['items']]

def r_quote(s, p):
    h = sec_open(s, 'mint') + '<figure class="quote reveal"><blockquote>%s</blockquote><cite>%s</cite></figure>' % (rich(s['text']), rich(s['cite'])) + SEC_CLOSE
    return h, ['> %s' % md(s['text']), '> %s' % md(s['cite'])]

def r_prose(s, p):
    out = ''
    m = []
    for blk in s['blocks']:
        kind, val = blk[0], blk[1]
        if kind == 'h2': out += '<h2>%s</h2>' % rich(val); m.append('## %s' % md(val))
        elif kind == 'h3': out += '<h3>%s</h3>' % rich(val); m.append('### %s' % md(val))
        elif kind == 'p': out += '<p>%s</p>' % rich(val); m.append(md(val))
        elif kind == 'ul': out += '<ul class="dots">%s</ul>' % ''.join('<li>%s</li>' % rich(x) for x in val); m += ['- %s' % md(x) for x in val]
        elif kind == 'callout': out += '<div class="callout">%s</div>' % rich(val); m.append('> %s' % md(val))
        elif kind == 'src':
            out += '<p class="callout">Sources: %s</p>' % ', '.join('<a href="%s" rel="noopener" target="_blank">%s</a>' % (esc(u), esc(t)) for t, u in val)
            m.append('Sources: ' + ', '.join('[%s](%s)' % (t, u) for t, u in val))
    h = sec_open(s) + '<div class="prose reveal">%s</div>' % out + SEC_CLOSE
    return h, m

def r_jobs(s, p):
    items = ''.join('<div class="job reveal"><div><h3>%s</h3><p style="margin:0">%s</p></div><a class="btn btn-ghost" href="%s">Apply %s</a></div>' % (
        rich(t), rich(d), link(p['slug'], 'contact'), ARROW) for t, d in s['items'])
    h = sec_open(s) + head_block(s.get('eyebrow'), s.get('heading'), s.get('intro'), True) + '<div class="grid" style="max-width:900px;margin:0 auto">%s</div>' % items + SEC_CLOSE
    return h, md_head(s) + ['- **%s** %s' % (md(t), md(d)) for t, d in s['items']]

def r_contact(s, p):
    info = ''.join('<div class="info-item"><span class="icon-chip %s">%s</span><div><h4>%s</h4><p>%s</p></div></div>' % (CHIPS[i % 4], icon(ic), esc(t), rich(v)) for i, (ic, t, v) in enumerate(s['info']))
    opts = ''.join('<option>%s</option>' % esc(o) for o in s['services'])
    form = ('<form class="form reveal reveal-d2" action="%s" method="post"><h3>%s</h3><div class="row2"><div><label for="f-name">Full name</label><input id="f-name" name="name" autocomplete="name" required></div>'
            '<div><label for="f-email">Work email</label><input id="f-email" name="email" type="email" autocomplete="email" required></div></div>'
            '<div class="row2"><div><label for="f-site">Website</label><input id="f-site" name="website" type="url" placeholder="https://"></div>'
            '<div><label for="f-phone">Phone</label><input id="f-phone" name="phone" type="tel" autocomplete="tel"></div></div>'
            '<label for="f-service">What do you need help with?</label><select id="f-service" name="service">%s</select>'
            '<label for="f-msg">Tell us about your business and goals</label><textarea id="f-msg" name="message"></textarea>'
            '<button class="btn btn-dark" type="submit">Send message %s</button><p class="note">%s</p></form>') % (
        esc(SITE['form_action']), esc(s['form_title']), opts, ARROW, rich(s['note']))
    h = sec_open(s) + '<div class="contact-grid"><div class="reveal">%s<div class="info-list">%s</div></div>%s</div>' % (
        head_block(s.get('eyebrow'), s.get('heading'), s.get('intro')), info, form) + SEC_CLOSE
    m = md_head(s) + ['- **%s:** %s' % (t, md(v)) for _, t, v in s['info']] + [
        '### %s' % s['form_title'], 'Form fields: Full name, Work email, Website, Phone, Service (%s), Message. Button: [Send message]' % ', '.join(s['services']), md(s['note'])]
    return h, m

def r_notfound(s, p):
    h = '<section class="nf"><div class="container reveal"><div class="big">404</div><h1 style="font-size:clamp(32px,4vw,44px)">%s</h1><p class="lead" style="margin:0 auto">%s</p><div class="btn-row" style="justify-content:center"><a class="btn btn-mint" href="%s">Back to home %s</a><a class="btn btn-ghost" href="%s">View services</a></div></div></section>' % (
        rich(s['h1']), rich(s['lead']), link(p['slug'], ''), ARROW, link(p['slug'], 'services'))
    return h, ['# %s' % md(s['h1']), md(s['lead']), 'Buttons: [Back to home] [View services]']

def r_feature_cards(s, p):
    items = ''.join('<article class="fcard %s reveal reveal-d%d"><div class="fcard-art">%s</div><div class="fbox"><h3>%s</h3><p>%s</p></div></article>' % (
        PASTELS[i % 3], i + 1, illus(it['illus']), rich(it['title']), rich(it['text'])) for i, it in enumerate(s['items']))
    h = sec_open(s) + head_block(s.get('eyebrow'), s.get('heading'), s.get('intro'), True) + '<div class="grid cols-3">%s</div>' % items + SEC_CLOSE
    m = md_head(s)
    for it in s['items']:
        m += ['### %s' % md(it['title']), md(it['text']), 'Illustration: %s' % it['illus']]
    return h, m

def r_about(s, p):
    chips = ''.join('<div class="chip-dark"><i class="dot"></i><b>%s</b><small>%s</small></div>' % (rich(v), rich(l)) for v, l in s['chips'])
    feats = ''.join('<div class="afeat"><span class="mint-circle">%s</span><h4>%s</h4><p>%s</p></div>' % (icon(ic), rich(t), rich(d)) for ic, t, d in s['features'])
    body = ''.join('<p>%s</p>' % rich(x) for x in s['body'])
    h = sec_open(s) + ('<div class="about-grid"><div class="about-media reveal">%s<div class="chips">%s</div></div>'
                       '<div class="reveal reveal-d2"><span class="eyebrow">%s</span><h2>%s</h2>%s<div class="feat-box">%s</div>'
                       '<a class="btn btn-dark" href="%s">%s</a></div></div>') % (
        photo(p, s['photo'], s['photo_alt'], 'tall'), chips, rich(s['eyebrow']), rich(s['heading']), body, feats, link(p['slug'], s['cta'][1]), esc(s['cta'][0])) + SEC_CLOSE
    m = md_head(s) + [md(x) for x in s['body']] + ['- **%s:** %s' % (md(t), md(d)) for _, t, d in s['features']] + \
        ['Photo: assets/img/%s with stat chips: %s' % (s['photo'], '; '.join('%s %s' % (md(v), md(l)) for v, l in s['chips'])), 'Button: [%s]' % s['cta'][0]]
    return h, m

def r_service_list(s, p):
    items = ''
    for i, it in enumerate(s['items']):
        q = BY_SLUG[it]
        items += '<article class="srow reveal reveal-d%d"><div class="srow-art">%s</div><div><h3>%s</h3><p>%s</p><a class="link-arrow" href="%s">Learn more %s</a></div></article>' % (
            i % 2 + 1, illus(q.get('illus', 'search')), esc(q['nav_label']), rich(q['card']), link(p['slug'], it), icon('arrow', 'currentColor'))
    h = sec_open(s, 'cream') + head_block(s.get('eyebrow'), s.get('heading'), s.get('intro'), True) + '<div class="srows">%s</div>' % items + SEC_CLOSE
    m = md_head(s) + ['### %s\n\n%s [Learn more](%s)' % (BY_SLUG[x]['nav_label'], md(BY_SLUG[x]['card']), url_of(x)) for x in s['items']]
    return h, m

def r_why(s, p):
    stats = ''.join('<div class="dstat"><b>%s</b><h3>%s</h3><p>%s</p></div>' % (rich(v), rich(t), rich(d)) for v, t, d in s['stats'])
    h = sec_open(s) + ('<div class="why-head reveal"><div><span class="eyebrow">%s</span><h2>%s</h2></div><a class="btn btn-mint" href="%s">%s</a></div>'
                       '<div class="why-grid"><div class="dstats reveal">%s</div><div class="reveal reveal-d2">%s</div></div>') % (
        rich(s['eyebrow']), rich(s['heading']), link(p['slug'], s['cta'][1]), esc(s['cta'][0]), stats, photo(p, s['photo'], s['photo_alt'], 'wide')) + SEC_CLOSE
    m = md_head(s) + ['- **%s %s:** %s' % (md(v), md(t), md(d)) for v, t, d in s['stats']] + ['Photo: assets/img/%s' % s['photo'], 'Button: [%s]' % s['cta'][0]]
    return h, m

def r_testimonial(s, p):
    h = sec_open(s) + ('<figure class="tcard reveal"><div class="tcard-text"><blockquote>%s</blockquote><figcaption><strong>%s</strong><small>%s</small></figcaption></div>%s</figure>') % (
        rich(s['text']), rich(s['name']), rich(s['role']), photo(p, s['photo'], 'Client portrait', 'portrait')) + SEC_CLOSE
    return h, ['> %s' % md(s['text']), '> %s, %s' % (md(s['name']), md(s['role'])), 'Photo: assets/img/%s' % s['photo']]

RENDER = {k[2:]: v for k, v in globals().items() if k.startswith('r_')}

# ---------------------------------------------------------------- chrome
def nav_html(p):
    sl = p['slug']
    svc = ''.join('<a href="%s">%s</a>' % (link(sl, x['slug']), esc(x['nav_label'])) for x in content_services.PAGES if x['slug'] != 'services')
    loc = ''.join('<a href="%s">%s</a>' % (link(sl, x['slug']), esc(x['nav_label'])) for x in content_locations.PAGES)
    company = ''.join('<a href="%s">%s</a>' % (link(sl, s), esc(BY_SLUG[s]['nav_label'])) for s in ['about', 'team', 'career', 'faq', 'pricing'])
    cur = lambda s: ' aria-current="page"' if sl == s else ''
    chev = '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>'
    return ('<header class="site-header"><div class="container nav"><a class="logo" href="%s" aria-label="%s home"><img src="%s" alt="%s logo" width="168" height="36"></a>'
            '<nav aria-label="Main"><ul class="menu" id="menu">'
            '<li class="has-drop"><button aria-expanded="false" aria-haspopup="true">Services%s</button><div class="drop wide"><a href="%s"><strong>All SEO services</strong></a>%s</div></li>'
            '<li class="has-drop"><button aria-expanded="false" aria-haspopup="true">Locations%s</button><div class="drop">%s</div></li>'
            '<li><a href="%s"%s>Case Studies</a></li>'
            '<li class="has-drop"><button aria-expanded="false" aria-haspopup="true">Company%s</button><div class="drop">%s</div></li>'
            '<li><a href="%s"%s>Blog</a></li><li><a href="%s"%s>Contact</a></li></ul></nav>'
            '<div class="nav-cta"><a class="btn btn-dark btn-sm" href="%s">Free SEO Review</a><button class="burger" aria-label="Open menu" aria-controls="menu" aria-expanded="false"><span></span></button></div></div></header>') % (
        link(sl, ''), esc(SITE['brand']), asset(sl, 'assets/img/logo.svg'), esc(SITE['brand']),
        chev, link(sl, 'services'), svc, chev, loc, link(sl, 'case-studies'), cur('case-studies'), chev, company,
        link(sl, 'blog'), cur('blog'), link(sl, 'contact'), cur('contact'), link(sl, 'contact'))

def footer_html(p):
    sl = p['slug']
    col = lambda title, slugs: '<div><h4>%s</h4><ul>%s</ul></div>' % (title, ''.join('<li><a href="%s">%s</a></li>' % (link(sl, s), esc(BY_SLUG[s]['nav_label'])) for s in slugs))
    svcs = [x['slug'] for x in content_services.PAGES if x['slug'] != 'services'][:6]
    soc = ''.join('<a href="%s" aria-label="%s" rel="noopener">%s</a>' % (esc(u), n, icon(i, 'currentColor')) for n, i, u in SITE['socials'])
    return ('<footer class="site-footer"><div class="container"><div class="footer-top"><div><a class="logo" href="%s"><img src="%s" alt="%s logo" width="168" height="36"></a>'
            '<p>%s</p><p>%s<br>%s<br>%s</p><div class="socials">%s</div></div>%s%s%s%s</div>'
            '<div class="footer-bottom"><span>&copy; <span id="year">%s</span> %s. All rights reserved.</span><span><a href="%s">Privacy Policy</a> &nbsp;&middot;&nbsp; <a href="%s">Terms</a> &nbsp;&middot;&nbsp; <a href="%s">Sitemap</a></span></div></div></footer>') % (
        link(sl, ''), asset(sl, 'assets/img/logo.svg'), esc(SITE['brand']), rich(SITE['footer_blurb']),
        rich(SITE['address_html']), rich(SITE['phone']), rich(SITE['email']), soc,
        col('Services', svcs), col('More services', [x['slug'] for x in content_services.PAGES if x['slug'] != 'services'][6:] + ['services']),
        col('Locations', [x['slug'] for x in content_locations.PAGES]),
        col('Company', ['about', 'case-studies', 'team', 'career', 'blog', 'contact']),
        datetime.date.today().year, esc(SITE['brand']), link(sl, 'privacy-policy'), link(sl, 'terms'), asset(sl, 'sitemap.xml'))

def marquee_html():
    items = ''.join('<span>%s</span>' % esc(t) for t in SITE['marquee'] * 2)
    return '<div class="marquee" role="region" aria-label="Announcement"><div class="marquee-track">%s</div></div>' % items

# ---------------------------------------------------------------- schema
def org_schema():
    return {
        '@type': 'ProfessionalService', '@id': SITE['domain'] + '/#business', 'name': SITE['brand'], 'url': SITE['domain'] + '/',
        'logo': SITE['domain'] + '/assets/img/logo.svg', 'image': SITE['domain'] + '/assets/img/og-default.png',
        'description': SITE['org_description'], 'telephone': SITE['schema_phone'], 'email': SITE['schema_email'],
        'address': {'@type': 'PostalAddress', 'streetAddress': SITE['street'], 'addressLocality': 'Edmonton', 'addressRegion': 'AB', 'postalCode': SITE['postal'], 'addressCountry': 'CA'},
        'areaServed': {'@type': 'City', 'name': 'Edmonton', 'sameAs': 'https://en.wikipedia.org/wiki/Edmonton'},
        'sameAs': [u for _, _, u in SITE['socials']],
    }

def schema_for(p):
    graph = [org_schema(), {'@type': 'WebSite', '@id': SITE['domain'] + '/#website', 'url': SITE['domain'] + '/', 'name': SITE['brand'], 'publisher': {'@id': SITE['domain'] + '/#business'}}]
    url = url_of(p['slug'])
    graph.append({'@type': p.get('page_type', 'WebPage'), '@id': url + '#webpage', 'url': url, 'name': p['title'], 'description': p['description'],
                  'isPartOf': {'@id': SITE['domain'] + '/#website'}, 'inLanguage': 'en-CA'})
    crumbs = [('Home', '')] + list(p.get('crumbs', [])) + ([(p['nav_label'], p['slug'])] if p['slug'] else [])
    if p['slug']:
        graph.append({'@type': 'BreadcrumbList', 'itemListElement': [{'@type': 'ListItem', 'position': i + 1, 'name': strip(n), 'item': url_of(s)} for i, (n, s) in enumerate(crumbs)]})
    if p.get('service'):
        graph.append({'@type': 'Service', 'name': p['service'], 'serviceType': p['service'], 'provider': {'@id': SITE['domain'] + '/#business'},
                      'areaServed': {'@type': 'Place', 'name': p.get('area', 'Edmonton, AB')}, 'url': url, 'description': p['description']})
    if p.get('article'):
        graph.append({'@type': 'BlogPosting', 'headline': strip(p['nav_label']), 'description': p['description'], 'url': url, 'mainEntityOfPage': url,
                      'datePublished': p['article'], 'dateModified': p['article'], 'author': {'@type': 'Organization', 'name': SITE['brand']},
                      'publisher': {'@id': SITE['domain'] + '/#business'}, 'image': SITE['domain'] + '/assets/img/og-default.png'})
    faqs = [s for s in p['sections'] if s['type'] == 'faq']
    if faqs:
        graph.append({'@type': 'FAQPage', 'mainEntity': [{'@type': 'Question', 'name': strip(q), 'acceptedAnswer': {'@type': 'Answer', 'text': strip(a)}} for f in faqs for q, a in f['items']]})
    return json.dumps({'@context': 'https://schema.org', '@graph': graph}, indent=1, ensure_ascii=False)

# ---------------------------------------------------------------- page
def build_page(p):
    CUR.clear(); CUR.update(p)
    body, mdl = [], []
    for s in p['sections']:
        h, m = RENDER[s['type']](s, p)
        body.append(h); mdl.append('\n\n'.join(x for x in m if x))
    url = url_of(p['slug'])
    robots = 'noindex, follow' if p.get('noindex') else 'index, follow, max-image-preview:large'
    head = '''<!doctype html>
<html lang="en-CA">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="robots" content="{robots}">
<link rel="canonical" href="{url}">
<link rel="alternate" hreflang="en-ca" href="{url}">
<meta name="geo.region" content="CA-AB">
<meta name="geo.placename" content="Edmonton">
<meta property="og:type" content="{ogtype}">
<meta property="og:site_name" content="{brand}">
<meta property="og:locale" content="en_CA">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{domain}/assets/img/og-default.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="{brand} SEO services in Edmonton">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{title}">
<meta name="twitter:description" content="{desc}">
<meta name="twitter:image" content="{domain}/assets/img/og-default.png">
<meta name="theme-color" content="#283220">
<link rel="icon" href="{fav}" type="image/svg+xml">
<link rel="preload" href="{f1}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="{f2}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="{css}">
<script type="application/ld+json">
{schema}
</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
'''.format(title=esc(p['title']), desc=esc(p['description']), robots=robots, url=url, ogtype='article' if p.get('article') else 'website',
           brand=esc(SITE['brand']), domain=SITE['domain'], fav=asset(p['slug'], 'assets/img/favicon.svg'), css=asset(p['slug'], 'assets/css/style.css'), schema=schema_for(p), f1=asset(p['slug'], 'assets/fonts/dm-sans-latin-400-normal.woff2'), f2=asset(p['slug'], 'assets/fonts/fraunces-latin-600-normal.woff2'))
    doc = head + nav_html(p) + marquee_html() + '<main id="main">' + ''.join(body) + '</main>' + footer_html(p) + \
        '<script src="%s" defer></script>\n</body>\n</html>\n' % asset(p['slug'], 'assets/js/main.js')
    path = os.path.join(OUT, p['slug'], 'index.html') if p['slug'] != '404' else os.path.join(OUT, '404.html')
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w') as f: f.write(doc)

    # Markdown content file
    front = ['---', 'page: %s' % strip(p['nav_label']), 'url: %s' % url, 'meta_title: "%s"' % p['title'], 'meta_description: "%s"' % p['description'],
             'primary_keyword: "%s"' % p.get('keyword', ''), 'schema: [%s]' % ', '.join(t for t in ['ProfessionalService', 'WebSite', p.get('page_type', 'WebPage'),
             'BreadcrumbList' if p['slug'] else None, 'Service' if p.get('service') else None, 'BlogPosting' if p.get('article') else None,
             'FAQPage' if any(s['type'] == 'faq' for s in p['sections']) else None] if t), 'robots: %s' % robots, '---', '']
    mdname = (p['slug'] or 'home').replace('/', '__') + '.md'
    md_dir = os.path.join(ROOT, 'content-md')
    os.makedirs(md_dir, exist_ok=True)
    blocks = []
    for i, (s, m) in enumerate(zip(p['sections'], mdl)):
        blocks.append('<!-- Section %d: %s -->\n\n%s' % (i + 1, s['type'], m))
    with open(os.path.join(md_dir, mdname), 'w') as f:
        f.write('\n'.join(front) + '\n\n---\n\n'.join(blocks) + '\n')

def seo_files():
    if PREVIEW: return
    urls = [p for p in PAGES if not p.get('noindex') and p['slug'] != '404']
    sm = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for p in urls:
        sm.append('  <url><loc>%s</loc><lastmod>%s</lastmod></url>' % (url_of(p['slug']), TODAY))
    sm.append('</urlset>')
    open(os.path.join(OUT, 'sitemap.xml'), 'w').write('\n'.join(sm) + '\n')
    open(os.path.join(OUT, 'robots.txt'), 'w').write('User-agent: *\nAllow: /\nDisallow: /404.html\n\nSitemap: %s/sitemap.xml\n' % SITE['domain'])
    groups = [('Main pages', content_core.PAGES), ('SEO services', content_services.PAGES), ('Edmonton locations', content_locations.PAGES),
              ('Case studies', content_cases.PAGES), ('Blog', content_blog.PAGES)]
    lt = ['# %s' % SITE['brand'], '', '> %s' % SITE['org_description'], '',
          'Service area: Edmonton, Alberta, Canada. Contact: %s' % url_of('contact'), '']
    for name, ps in groups:
        lt.append('## %s' % name); lt.append('')
        for p in ps:
            if p.get('noindex') or p['slug'] == '404': continue
            lt.append('- [%s](%s): %s' % (strip(p['nav_label']), url_of(p['slug']), p['description']))
        lt.append('')
    open(os.path.join(OUT, 'llms.txt'), 'w').write('\n'.join(lt))
    # Netlify / Cloudflare Pages friendly 404 + headers
    open(os.path.join(OUT, '_headers'), 'w').write('/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n')

def main():
    if os.path.exists(OUT) and PREVIEW: shutil.rmtree(OUT)
    if PREVIEW:
        shutil.copytree(os.path.join(ROOT, 'dist', 'assets'), os.path.join(OUT, 'assets'))
    seen = set()
    for p in PAGES:
        assert p['slug'] not in seen, 'duplicate slug ' + p['slug']; seen.add(p['slug'])
        build_page(p)
    seo_files()
    print('built %d pages -> %s' % (len(PAGES), OUT))

if __name__ == '__main__':
    main()

// Section components. Each page section's `type` maps to one component in SECTIONS below.
import { Fragment, type ReactNode } from 'react';
import type { Page, Section } from '@/content/types';
import { BY_SLUG } from '@/content';
import { SITE } from '@/content/site';
import { Arrow, CHIPS, href, Icon, Illus, linkable, PASTELS, Photo, rich, strip } from '@/lib/render';

type Props = { s: Section; p: Page };

const BG: Record<string, string> = { soft: 'bg-soft', cream: 'bg-cream', mint: 'bg-mint', dark: 'bg-dark' };

/** Standard section wrapper. A section's own `bg` (even '') wins over the component's default. */
function Sec({ s, def = '', extra = '', children }: { s: Section; def?: string; extra?: string; children: ReactNode }) {
  const bg: string = 'bg' in s ? s.bg : def;
  const cls = ['section', extra, bg ? BG[bg] ?? '' : '', s.tight ? 'tight' : ''].filter(Boolean).join(' ');
  return <section className={cls} id={s.id}><div className="container">{children}</div></section>;
}

function Head({ s, p, center = false }: { s: Section; p: Page; center?: boolean }) {
  return (
    <div className={'section-head' + (center ? ' center' : '') + ' reveal'}>
      {s.eyebrow && <span className="eyebrow">{rich(s.eyebrow, p.slug)}</span>}
      {s.heading && <h2>{rich(s.heading, p.slug)}</h2>}
      {s.intro && <p className="intro">{rich(s.intro, p.slug)}</p>}
    </div>
  );
}

// ---------------------------------------------------------------- visuals
function Visual({ kind, data = {} }: { kind: string; data?: any }) {
  if (kind === 'illus') return <div className="split-illus"><Illus name={data.name ?? 'search'} /></div>;
  if (kind === 'serp') {
    const rows: string[] = data.rows ?? ['Your business, ranking', 'Competitor listing', 'Directory page'];
    return (
      <div className="serp">
        <div className="bar"><Icon name="search" /><span>{data.query ?? 'seo services edmonton'}</span></div>
        {rows.map((t, i) => <div key={i} className={'row' + (i === 0 ? ' win' : '')}><b>{t}</b><span></span><span className="s"></span></div>)}
      </div>
    );
  }
  if (kind === 'map') {
    const pins = [['14%', '20%'], ['70%', '16%'], ['78%', '62%'], ['24%', '66%']];
    return (
      <div className="map-viz">
        {pins.map(([left, top], i) => <span key={i} className="pin" style={{ left, top }}></span>)}
        <span className="pin main" style={{ left: '44%', top: '34%' }}></span>
        <div className="map-tag"><b>{data.title ?? 'Your Business Profile'}</b>{data.sub ?? 'Edmonton, AB'}</div>
      </div>
    );
  }
  if (kind === 'code') {
    return (
      <div className="code-viz">
        <div className="dots"><span></span><span></span><span></span></div>
        <span className="c">// robots.txt</span><br />
        <span className="k">User-agent:</span> *<br />
        <span className="k">Allow:</span> /<br />
        <span className="k">Sitemap:</span> <span className="s">{SITE.domain}/sitemap.xml</span><br />
        <br />
        <span className="c">&lt;!-- head --&gt;</span><br />
        &lt;<span className="k">link</span> rel=<span className="s">&quot;canonical&quot;</span> href=<span className="s">&quot;/services/&quot;</span>&gt;
      </div>
    );
  }
  const items: [string, string, string][] = data.items ?? [];
  return (
    <div className="viz">
      {items.map(([ic, t, d], i) => (
        <div key={i} className="viz-card"><span className={'icon-chip ' + CHIPS[i % 4]}><Icon name={ic} /></span><span>{t}<small>{d}</small></span></div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------- sections
function HeroHome({ s, p }: Props) {
  const bars = [34, 46, 40, 74, 56, 90, 100];
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="reveal">
          <span className="eyebrow">{rich(s.eyebrow, p.slug)}</span>
          <h1>{rich(s.h1, p.slug)}</h1>
          <p className="lead">{rich(s.lead, p.slug)}</p>
          <div className="btn-row">
            <a className="btn btn-mint" href={href(s.cta[1])}>{s.cta[0]}</a>
            <a className="btn btn-ghost" href={href(s.cta2[1])}>{s.cta2[0]}</a>
          </div>
          <ul className="hero-note">{s.proof.map((t: string, i: number) => <li key={i}><Icon name="check-circle" />{rich(t, p.slug)}</li>)}</ul>
        </div>
        <div className="hero-media reveal reveal-d2">
          <div className="media-frame">
            <img className="hero-img" src={s.photo} alt={s.photo_alt} fetchPriority="high" data-fallback="hide" />
            <video autoPlay muted loop playsInline preload="none" aria-hidden="true" style={{ display: 'none' }} data-src="/assets/video/hero.mp4"></video>
          </div>
          <div className="float-card a">
            <span className="fc-label">Organic clicks</span><strong>Last 7 days</strong>
            <div className="bars">{bars.map((h, i) => <span key={i} className={[3, 5, 6].includes(i) ? 'on' : ''} style={{ height: h + '%' }}></span>)}</div>
            <div className="days">{'MTWTFSS'.split('').map((d, i) => <small key={i}>{d}</small>)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PageHero({ s, p }: Props) {
  return (
    <section className="page-hero">
      <div className="container reveal">
        <nav aria-label="Breadcrumb">
          <ol className="crumbs" style={{ listStyle: 'none', padding: 0, margin: '0 0 26px' }}>
            <li><a href="/">Home</a></li>
            {(p.crumbs ?? []).map(([label, slug]) => <li key={slug}><a href={href(slug)}>{label}</a></li>)}
            <li aria-current="page">{p.nav_label}</li>
          </ol>
        </nav>
        {s.eyebrow && <><span className="eyebrow">{rich(s.eyebrow, p.slug)}</span><br /></>}
        <h1>{rich(s.h1, p.slug)}</h1>
        <p className="lead">{rich(s.lead, p.slug)}</p>
        {s.cta && (
          <div className="btn-row" style={{ justifyContent: 'center' }}>
            <a className="btn btn-mint" href={href(s.cta[1])}>{s.cta[0]} <Arrow /></a>
          </div>
        )}
      </div>
    </section>
  );
}

function Tools({ s, p }: Props) {
  return (
    <section className="tools">
      <div className="container reveal"><p>{rich(s.label, p.slug)}</p><ul>{s.items.map((t: string) => <li key={t}>{t}</li>)}</ul></div>
    </section>
  );
}

function Split({ s, p }: Props) {
  let kind: string = s.visual ?? 'cards';
  let data = s.vdata;
  // A page's spot illustration replaces the stacked cards on its first split section.
  if (p.illus && kind === 'cards' && p.sections.find((x) => x.type === 'split') === s) {
    kind = 'illus';
    data = { name: p.illus };
  }
  return (
    <Sec s={s}>
      <div className={'split' + (s.reverse ? ' reverse' : '')}>
        <div className={'split-visual' + (kind === 'illus' ? ' plain' : '') + ' reveal reveal-d2'}><Visual kind={kind} data={data} /></div>
        <div className="reveal">
          {s.eyebrow && <span className="eyebrow">{rich(s.eyebrow, p.slug)}</span>}
          <h2>{rich(s.heading, p.slug)}</h2>
          {(s.body ?? []).map((x: string, i: number) => <p key={i}>{rich(x, p.slug)}</p>)}
          {s.bullets && (
            <ul className="ticks">{s.bullets.map((b: string, i: number) => <li key={i}><Icon name="check-circle" /><span>{rich(b, p.slug)}</span></li>)}</ul>
          )}
          {s.cta && <div className="btn-row"><a className="btn btn-dark" href={href(s.cta[1])}>{s.cta[0]} <Arrow /></a></div>}
        </div>
      </div>
    </Sec>
  );
}

function Cards({ s, p }: Props) {
  return (
    <Sec s={s}>
      <Head s={s} p={p} center={s.center ?? true} />
      <div className={'grid cols-' + (s.cols ?? 3)}>
        {s.items.map((it: any, i: number) => (
          <article key={i} className={`card ${PASTELS[i % 4]}${it.link ? ' linked' : ''} reveal reveal-d${(i % 3) + 1}`}>
            <span className="icon-chip"><Icon name={it.icon ?? 'spark'} /></span>
            <h3>{rich(it.title, p.slug)}</h3>
            <p>{rich(it.text, p.slug)}</p>
            {it.link && <a className="link-arrow" href={href(it.link)}>{it.link_label ?? 'Learn more'} <Arrow /></a>}
          </article>
        ))}
      </div>
    </Sec>
  );
}

function Stats({ s, p }: Props) {
  return (
    <Sec s={s} def="dark">
      <Head s={s} p={p} center />
      <div className="stats">
        {s.items.map(([v, l]: string[], i: number) => <div key={i} className={`stat reveal reveal-d${(i % 3) + 1}`}><b>{rich(v, p.slug)}</b><span>{rich(l, p.slug)}</span></div>)}
      </div>
    </Sec>
  );
}

function Steps({ s, p }: Props) {
  const n = s.items.length;
  const cls = n === 3 ? ' three' : n === 5 ? ' five' : '';
  return (
    <Sec s={s}>
      <Head s={s} p={p} center />
      <div className={'steps' + cls}>
        {s.items.map(([t, d]: string[], i: number) => (
          <div key={i} className={`step reveal reveal-d${(i % 3) + 1}`}>
            <div className="dot">{String(i + 1).padStart(2, '0')}</div><h3>{rich(t, p.slug)}</h3><p>{rich(d, p.slug)}</p>
          </div>
        ))}
      </div>
    </Sec>
  );
}

function Checklist({ s, p }: Props) {
  const bg: string = 'bg' in s ? s.bg : 'soft';
  return (
    <Sec s={{ ...s, bg }} extra={bg ? '' : 'bg-white'}>
      <Head s={s} p={p} center={s.center ?? false} />
      <ul className="checklist">
        {s.items.map((it: string | string[], i: number) => {
          const [t, d] = Array.isArray(it) ? it : [it, ''];
          return <li key={i} className="reveal"><Icon name="check-circle" /><span>{rich(t, p.slug)}{d && <small>{rich(d, p.slug)}</small>}</span></li>;
        })}
      </ul>
    </Sec>
  );
}

function Statement({ s, p }: Props) {
  // [em]...[/em] highlights part of the statement.
  const parts = String(s.text).split(/\[em\]|\[\/em\]/);
  return (
    <section className="section tight bg-dark">
      <div className="container reveal">
        <p className="statement">{parts.map((t, i) => (i % 2 ? <span key={i} className="hl">{rich(t, p.slug)}</span> : <Fragment key={i}>{rich(t, p.slug)}</Fragment>))}</p>
      </div>
    </section>
  );
}

function Table({ s, p }: Props) {
  return (
    <Sec s={s}>
      <Head s={s} p={p} center />
      <div className="table-wrap reveal">
        <table>
          <thead><tr>{s.cols.map((c: string) => <th key={c} scope="col">{c}</th>)}</tr></thead>
          <tbody>{s.rows.map((r: string[], i: number) => <tr key={i}>{r.map((c, j) => <td key={j}>{rich(c, p.slug)}</td>)}</tr>)}</tbody>
        </table>
      </div>
    </Sec>
  );
}

export const FAQ_DEFAULTS = { eyebrow: 'FAQ', heading: 'Common Questions', intro: 'Straight answers to the questions Edmonton business owners ask us most.' };

function Faq({ s, p }: Props) {
  const items: [string, string][] = s.items;
  const half = Math.ceil(items.length / 2);
  const col = (arr: [string, string][]) => (
    <div className="faq-col">
      {arr.map(([q, a], i) => <details key={i}><summary>{rich(q, p.slug)}</summary><div className="answer"><p>{rich(a, p.slug)}</p></div></details>)}
    </div>
  );
  return (
    <Sec s={s}>
      <Head s={{ ...FAQ_DEFAULTS, ...s }} p={p} center />
      <div className="faq2 reveal">{col(items.slice(0, half))}{items.length > half && col(items.slice(half))}</div>
    </Sec>
  );
}

function Cta({ s, p }: Props) {
  const [label, to] = s.button ?? ['Book a free SEO review', 'contact'];
  return (
    <section className="cta-wide">
      <div className="container cta-grid">
        <div className="reveal"><h2>{rich(s.heading, p.slug)}</h2><p>{rich(s.text, p.slug)}</p><a className="btn btn-mint" href={href(to)}>{label}</a></div>
        <div className="cta-art reveal reveal-d2">
          {(s.photo ?? true)
            ? <div className="cta-photo"><img src={SITE.cta_photo} alt={SITE.cta_photo_alt} loading="lazy" data-fallback="hide" /></div>
            : <Illus name={s.art ?? 'mail'} />}
        </div>
      </div>
    </section>
  );
}

function Links({ s, p }: Props) {
  const slugs: string[] = s.items.filter((x: string) => linkable(x, p.slug));
  if (!slugs.length) return null;
  return (
    <Sec s={s}>
      <Head s={s} p={p} center />
      <div className={'grid cols-' + (s.cols ?? 3)}>
        {slugs.map((slug, i) => {
          const q = BY_SLUG[slug];
          return (
            <a key={slug} className="card linked reveal" href={href(slug)}>
              <span className={'icon-chip ' + CHIPS[i % 4]}><Icon name={q.icon ?? 'spark'} /></span>
              <h3>{q.nav_label}</h3><p>{rich(q.card ?? '', p.slug)}</p><span className="link-arrow">View <Arrow /></span>
            </a>
          );
        })}
      </div>
    </Sec>
  );
}

function Team({ s, p }: Props) {
  return (
    <Sec s={s}>
      <Head s={s} p={p} center />
      <div className="grid cols-4">
        {s.items.map(([n, r]: string[], i: number) => (
          <article key={i} className={`person reveal reveal-d${(i % 3) + 1}`}>
            <div className={'avatar ' + CHIPS[i % 4]}><Icon name="user" /></div>
            <div className="meta"><h3>{rich(n, p.slug)}</h3><p>{rich(r, p.slug)}</p></div>
          </article>
        ))}
      </div>
    </Sec>
  );
}

function Packages({ s, p }: Props) {
  const tints = ['t-lilac', 't-mint', 't-cream'];
  return (
    <Sec s={s}>
      <Head s={s} p={p} center />
      <div className="grid cols-3 pkgs">
        {s.items.map((pk: any, i: number) => (
          <article key={pk.name} className={`pkg ${tints[i % 3]}${pk.featured ? ' featured' : ''} reveal reveal-d${i + 1}`}>
            {pk.badge && <span className="pkg-tab"><Icon name="star" color="#ffffff" /> {pk.badge}</span>}
            <h3>{pk.name}</h3><p className="pkg-price">{pk.price ? rich(pk.price, p.slug) : 'Custom quote'}</p><p className="pkg-for">{rich(pk.for, p.slug)}</p>
            <a className="btn pkg-btn" href={href('contact')}>Get a quote</a><p className="pkg-sub">What is included</p>
            <ul>{pk.features.map((f: string, j: number) => <li key={j}><Icon name="check-circle" /><span>{rich(f, p.slug)}</span></li>)}</ul>
          </article>
        ))}
      </div>
    </Sec>
  );
}

function Posts({ s, p }: Props) {
  const slugs: string[] = s.items.filter((x: string) => linkable(x, p.slug));
  if (!slugs.length) return null;
  return (
    <Sec s={s}>
      <Head s={s} p={p} center />
      <div className="grid cols-3 posts">
        {slugs.map((slug, i) => {
          const q = BY_SLUG[slug];
          return (
            <article key={slug} className={`post reveal reveal-d${(i % 3) + 1}`}>
              <a className={'post-thumb ' + PASTELS[i % 4]} href={href(slug)} tabIndex={-1} aria-hidden="true">
                {!q.photo && <Illus name={q.illus} />}
                <Photo file={q.photo || slug.replace('/', '-') + '.jpg'} alt={strip(q.nav_label)} />
              </a>
              <h3><a href={href(slug)}>{rich(q.nav_label, p.slug)}</a></h3>
              <p className="date">{rich((q.tag ?? '') + (q.article ? ' · [[Publish date]]' : ''), p.slug)}</p>
              {q.kpis && <div className="kpis">{q.kpis.map((k, j) => <span key={j}>{rich(k, p.slug)}</span>)}</div>}
              <p>{rich(q.card ?? '', p.slug)}</p>
              <a className="btn-read" href={href(slug)}>{q.kpis ? 'Read case study' : 'Continue reading'} <Arrow /></a>
            </article>
          );
        })}
      </div>
    </Sec>
  );
}

function Meta({ s, p }: Props) {
  return (
    <Sec s={s} def="soft" extra="tight">
      <div className="meta-grid">{s.items.map(([k, v]: string[]) => <div key={k} className="reveal"><b>{k}</b>{rich(v, p.slug)}</div>)}</div>
    </Sec>
  );
}

function Quote({ s, p }: Props) {
  return (
    <Sec s={s} def="mint">
      <figure className="quote reveal"><blockquote>{rich(s.text, p.slug)}</blockquote><cite>{rich(s.cite, p.slug)}</cite></figure>
    </Sec>
  );
}

function Prose({ s, p }: Props) {
  return (
    <Sec s={s}>
      <div className="prose reveal">
        {s.blocks.map(([kind, val]: [string, any], i: number) => {
          if (kind === 'h2') return <h2 key={i}>{rich(val, p.slug)}</h2>;
          if (kind === 'h3') return <h3 key={i}>{rich(val, p.slug)}</h3>;
          if (kind === 'p') return <p key={i}>{rich(val, p.slug)}</p>;
          if (kind === 'ul') return <ul key={i} className="dots">{val.map((x: string, j: number) => <li key={j}>{rich(x, p.slug)}</li>)}</ul>;
          if (kind === 'callout') return <div key={i} className="callout">{rich(val, p.slug)}</div>;
          if (kind === 'src') {
            return (
              <p key={i} className="callout">Sources:{' '}
                {val.map(([t, u]: string[], j: number) => <Fragment key={u}>{j > 0 && ', '}<a href={u} rel="noopener" target="_blank">{t}</a></Fragment>)}
              </p>
            );
          }
          return null;
        })}
      </div>
    </Sec>
  );
}

function Jobs({ s, p }: Props) {
  return (
    <Sec s={s}>
      <Head s={s} p={p} center />
      <div className="grid" style={{ maxWidth: 900, margin: '0 auto' }}>
        {s.items.map(([t, d]: string[], i: number) => (
          <div key={i} className="job reveal">
            <div><h3>{rich(t, p.slug)}</h3><p style={{ margin: 0 }}>{rich(d, p.slug)}</p></div>
            <a className="btn btn-ghost" href={href('contact')}>Apply <Arrow /></a>
          </div>
        ))}
      </div>
    </Sec>
  );
}

function Contact({ s, p }: Props) {
  return (
    <Sec s={s}>
      <div className="contact-grid">
        <div className="reveal">
          <Head s={s} p={p} />
          <div className="info-list">
            {s.info.map(([ic, t, v]: string[], i: number) => (
              <div key={t} className="info-item"><span className={'icon-chip ' + CHIPS[i % 4]}><Icon name={ic} /></span><div><h4>{t}</h4><p>{rich(v, p.slug)}</p></div></div>
            ))}
          </div>
        </div>
        <form className="form reveal reveal-d2" id="form" action={SITE.form_action} method="post">
          <h3>{s.form_title}</h3>
          <p className="form-error" role="alert" hidden></p>
          {/* Honeypot: hidden from people, so only bots fill it in. */}
          <div className="hp" aria-hidden="true"><label htmlFor="f-company">Company</label><input id="f-company" name="company" tabIndex={-1} autoComplete="off" /></div>
          <div className="row2">
            <div><label htmlFor="f-name">Full name</label><input id="f-name" name="name" autoComplete="name" required /></div>
            <div><label htmlFor="f-email">Work email</label><input id="f-email" name="email" type="email" autoComplete="email" required /></div>
          </div>
          <div className="row2">
            <div><label htmlFor="f-site">Website</label><input id="f-site" name="website" type="url" placeholder="https://" /></div>
            <div><label htmlFor="f-phone">Phone</label><input id="f-phone" name="phone" type="tel" autoComplete="tel" /></div>
          </div>
          <label htmlFor="f-service">What do you need help with?</label>
          <select id="f-service" name="service">{s.services.map((o: string) => <option key={o}>{o}</option>)}</select>
          <label htmlFor="f-msg">Tell us about your business and goals</label>
          <textarea id="f-msg" name="message"></textarea>
          <button className="btn btn-dark" type="submit">Send message <Arrow /></button>
          <p className="note">{rich(s.note, p.slug)}</p>
        </form>
      </div>
    </Sec>
  );
}

function NotFound({ s, p }: Props) {
  return (
    <section className="nf">
      <div className="container reveal">
        <div className="big">404</div>
        <h1 style={{ fontSize: 'clamp(32px,4vw,44px)' }}>{rich(s.h1, p.slug)}</h1>
        <p className="lead" style={{ margin: '0 auto' }}>{rich(s.lead, p.slug)}</p>
        <div className="btn-row" style={{ justifyContent: 'center' }}>
          <a className="btn btn-mint" href="/">Back to home <Arrow /></a><a className="btn btn-ghost" href={href('services')}>View services</a>
        </div>
      </div>
    </section>
  );
}

function FeatureCards({ s, p }: Props) {
  return (
    <Sec s={s}>
      <Head s={s} p={p} center />
      <div className="grid cols-3">
        {s.items.map((it: any, i: number) => (
          <article key={i} className={`fcard ${PASTELS[i % 3]} reveal reveal-d${i + 1}`}>
            <div className="fcard-art"><Illus name={it.illus} /></div>
            <div className="fbox"><h3>{rich(it.title, p.slug)}</h3><p>{rich(it.text, p.slug)}</p></div>
          </article>
        ))}
      </div>
    </Sec>
  );
}

function About({ s, p }: Props) {
  return (
    <Sec s={s}>
      <div className="about-grid">
        <div className="about-media reveal">
          <Photo file={s.photo} alt={s.photo_alt} cls="tall" />
          <div className="chips">{s.chips.map(([v, l]: string[], i: number) => <div key={i} className="chip-dark"><i className="dot"></i><b>{rich(v, p.slug)}</b><small>{rich(l, p.slug)}</small></div>)}</div>
        </div>
        <div className="reveal reveal-d2">
          <span className="eyebrow">{rich(s.eyebrow, p.slug)}</span>
          <h2>{rich(s.heading, p.slug)}</h2>
          {s.body.map((x: string, i: number) => <p key={i}>{rich(x, p.slug)}</p>)}
          <div className="feat-box">
            {s.features.map(([ic, t, d]: string[], i: number) => <div key={i} className="afeat"><span className="mint-circle"><Icon name={ic} /></span><h4>{rich(t, p.slug)}</h4><p>{rich(d, p.slug)}</p></div>)}
          </div>
          <a className="btn btn-dark" href={href(s.cta[1])}>{s.cta[0]}</a>
        </div>
      </div>
    </Sec>
  );
}

function ServiceList({ s, p }: Props) {
  const slugs: string[] = s.items.filter((x: string) => linkable(x, p.slug));
  if (!slugs.length) return null;
  return (
    <Sec s={s} def="cream">
      <Head s={s} p={p} center />
      <div className="srows">
        {slugs.map((slug, i) => {
          const q = BY_SLUG[slug];
          return (
            <article key={slug} className={`srow reveal reveal-d${(i % 2) + 1}`}>
              <div className="srow-art"><Illus name={q.illus} /></div>
              <div><h3>{q.nav_label}</h3><p>{rich(q.card ?? '', p.slug)}</p><a className="link-arrow" href={href(slug)}>Learn more <Arrow /></a></div>
            </article>
          );
        })}
      </div>
    </Sec>
  );
}

function Why({ s, p }: Props) {
  return (
    <Sec s={s}>
      <div className="why-head reveal">
        <div><span className="eyebrow">{rich(s.eyebrow, p.slug)}</span><h2>{rich(s.heading, p.slug)}</h2></div>
        <a className="btn btn-mint" href={href(s.cta[1])}>{s.cta[0]}</a>
      </div>
      <div className="why-grid">
        <div className="dstats reveal">
          {s.stats.map(([v, t, d]: string[], i: number) => <div key={i} className="dstat"><b>{rich(v, p.slug)}</b><h3>{rich(t, p.slug)}</h3><p>{rich(d, p.slug)}</p></div>)}
        </div>
        <div className="reveal reveal-d2"><Photo file={s.photo} alt={s.photo_alt} cls="wide" /></div>
      </div>
    </Sec>
  );
}

function Testimonial({ s, p }: Props) {
  return (
    <Sec s={s}>
      <figure className="tcard reveal">
        <div className="tcard-text"><blockquote>{rich(s.text, p.slug)}</blockquote><figcaption><strong>{rich(s.name, p.slug)}</strong><small>{rich(s.role, p.slug)}</small></figcaption></div>
        <Photo file={s.photo} alt="Client portrait" cls="portrait" />
      </figure>
    </Sec>
  );
}

const SECTIONS: Record<string, (props: Props) => ReactNode> = {
  hero_home: HeroHome, page_hero: PageHero, tools: Tools, split: Split, cards: Cards, stats: Stats, steps: Steps,
  checklist: Checklist, statement: Statement, table: Table, faq: Faq, cta: Cta, links: Links, team: Team,
  packages: Packages, posts: Posts, meta: Meta, quote: Quote, prose: Prose, jobs: Jobs, contact: Contact,
  notfound: NotFound, feature_cards: FeatureCards, about: About, service_list: ServiceList, why: Why, testimonial: Testimonial,
};

/** Renders a page's sections. `byline` goes just before the closing call to action, or last if there is none. */
export function PageSections({ page, byline }: { page: Page; byline?: ReactNode }) {
  const sections = page.sections.map((s, i) => {
    const Component = SECTIONS[s.type];
    if (!Component) throw new Error(`Unknown section type "${s.type}" on /${page.slug}`);
    return <Component key={i} s={s} p={page} />;
  });
  const at = page.sections.at(-1)?.type === 'cta' ? sections.length - 1 : sections.length;
  return <>{sections.slice(0, at)}{byline}{sections.slice(at)}</>;
}

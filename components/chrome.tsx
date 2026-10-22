// Site header, announcement marquee and footer, shared by every page.
// Menus list only pages that exist and are not drafts, so later-phase pages (areas, more industries,
// case studies) appear in navigation on their own once they are built.
import type { ReactNode } from 'react';
import type { Page } from '@/content/types';
import { AREA_PAGES, BY_SLUG, INDUSTRY_GROUPS, INDUSTRY_PAGES, SERVICE_PAGES } from '@/content';
import { SITE } from '@/content/site';
import { href, Icon, linkable, rich } from '@/lib/render';

const Chev = () => (
  <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
);

const Logo = () => <img src="/assets/img/logo.svg" alt={SITE.brand + ' logo'} width={168} height={36} />;

export function Header({ page }: { page: Page }) {
  const live = (slugs: string[]) => slugs.filter((s) => linkable(s, page.slug));
  const cur = (slug: string) => (page.slug === slug ? ('page' as const) : undefined);
  const links = (slugs: string[]) => live(slugs).map((s) => <a key={s} href={href(s)} aria-current={cur(s)}>{BY_SLUG[s].nav_label}</a>);
  const drop = (label: string, wide: boolean, children: ReactNode) => (
    <li className="has-drop">
      <button aria-expanded="false" aria-haspopup="true">{label}<Chev /></button>
      <div className={wide ? 'drop wide' : 'drop'}>{children}</div>
    </li>
  );
  const industryGroups = INDUSTRY_GROUPS.map(([label, slugs]) => [label, live(slugs)] as const).filter(([, slugs]) => slugs.length);
  const areas = live(AREA_PAGES.map((p) => p.slug));
  return (
    <header className="site-header">
      <div className="container nav">
        <a className="logo" href="/" aria-label={SITE.brand + ' home'}><Logo /></a>
        <nav aria-label="Main">
          <ul className="menu" id="menu">
            {drop('Services', true, <><a href={href('services')}><strong>All SEO services</strong></a>{links(SERVICE_PAGES.map((p) => p.slug))}</>)}
            {drop('Industries', true, <>
              <a href={href('industries')}><strong>All industries</strong></a>
              {industryGroups.map(([label, slugs]) => <div key={label} className="drop-group"><span className="drop-label">{label}</span>{links([...slugs])}</div>)}
            </>)}
            {areas.length > 0 && drop('Areas', false, links(areas))}
            {linkable('case-studies', page.slug) && <li><a href={href('case-studies')} aria-current={cur('case-studies')}>Case Studies</a></li>}
            <li><a href={href('pricing')} aria-current={cur('pricing')}>Pricing</a></li>
            {drop('Company', false, links(['about', 'team', 'how-we-work', 'blog', 'contact']))}
          </ul>
        </nav>
        <div className="nav-cta">
          <a className="btn btn-dark btn-sm" href={href('free-seo-audit')}>Free SEO Audit</a>
          <button className="burger" aria-label="Open menu" aria-controls="menu" aria-expanded="false"><span></span></button>
        </div>
      </div>
    </header>
  );
}

export function Marquee() {
  const items = [...SITE.marquee, ...SITE.marquee];
  return (
    <div className="marquee" role="region" aria-label="Announcement">
      <div className="marquee-track">{items.map((t, i) => <span key={i}>{t}</span>)}</div>
    </div>
  );
}

export function Footer({ page }: { page: Page }) {
  const col = (title: string, slugs: string[]) => (
    <div>
      <h4>{title}</h4>
      <ul>{slugs.filter((s) => linkable(s, page.slug)).map((s) => <li key={s}><a href={href(s)}>{BY_SLUG[s].nav_label}</a></li>)}</ul>
    </div>
  );
  const socials = SITE.socials as unknown as [string, string, string][];
  const areas = AREA_PAGES.map((p) => p.slug);
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <a className="logo" href="/"><Logo /></a>
            <p>{rich(SITE.footer_blurb, page.slug)}</p>
            <p>{rich(SITE.address_html, page.slug)}<br />{rich(SITE.phone, page.slug)}<br />{rich(SITE.email, page.slug)}</p>
            {socials.length > 0 && (
              <div className="socials">{socials.map(([name, icon, url]) => <a key={url} href={url} aria-label={name} rel="noopener"><Icon name={icon} color="currentColor" /></a>)}</div>
            )}
          </div>
          {col('Services', ['services', ...SERVICE_PAGES.slice(0, 6).map((p) => p.slug)])}
          {col('Industries', ['industries', ...INDUSTRY_PAGES.slice(0, 8).map((p) => p.slug)])}
          {col('Company', ['about', 'team', 'how-we-work', 'case-studies', 'blog', 'contact'])}
          {areas.length ? col('Areas', areas) : col('Resources', ['free-seo-audit', 'pricing', 'blog'])}
        </div>
        <div className="footer-bottom">
          <span>&copy; <span id="year">{new Date().getFullYear()}</span> {SITE.brand}. All rights reserved.</span>
          <span><a href={href('privacy-policy')}>Privacy Policy</a> &nbsp;&middot;&nbsp; <a href={href('terms')}>Terms of Service</a> &nbsp;&middot;&nbsp; <a href="/sitemap.xml">Sitemap</a></span>
        </div>
      </div>
    </footer>
  );
}

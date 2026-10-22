// Site header, announcement marquee and footer, shared by every page.
import type { Page } from '@/content/types';
import { BY_SLUG, LOCATION_PAGES, SERVICE_PAGES } from '@/content';
import { SITE } from '@/content/site';
import { href, Icon, linkable, rich } from '@/lib/render';

const Chev = () => (
  <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
);

const Logo = () => <img src="/assets/img/logo.svg" alt={SITE.brand + ' logo'} width={168} height={36} />;

export function Header({ page }: { page: Page }) {
  const cur = (slug: string) => (page.slug === slug ? ('page' as const) : undefined);
  const drop = (slugs: string[]) => slugs.filter((s) => linkable(s, page.slug)).map((s) => <a key={s} href={href(s)}>{BY_SLUG[s].nav_label}</a>);
  return (
    <header className="site-header">
      <div className="container nav">
        <a className="logo" href="/" aria-label={SITE.brand + ' home'}><Logo /></a>
        <nav aria-label="Main">
          <ul className="menu" id="menu">
            <li className="has-drop">
              <button aria-expanded="false" aria-haspopup="true">Services<Chev /></button>
              <div className="drop wide"><a href={href('services')}><strong>All SEO services</strong></a>{drop(SERVICE_PAGES.map((p) => p.slug))}</div>
            </li>
            <li className="has-drop">
              <button aria-expanded="false" aria-haspopup="true">Locations<Chev /></button>
              <div className="drop">{drop(LOCATION_PAGES.map((p) => p.slug))}</div>
            </li>
            {linkable('case-studies', page.slug) && <li><a href={href('case-studies')} aria-current={cur('case-studies')}>Case Studies</a></li>}
            <li className="has-drop">
              <button aria-expanded="false" aria-haspopup="true">Company<Chev /></button>
              <div className="drop">{drop(['about', 'team', 'career', 'faq', 'pricing'])}</div>
            </li>
            <li><a href={href('blog')} aria-current={cur('blog')}>Blog</a></li>
            <li><a href={href('contact')} aria-current={cur('contact')}>Contact</a></li>
          </ul>
        </nav>
        <div className="nav-cta">
          <a className="btn btn-dark btn-sm" href={href('contact')}>Free SEO Review</a>
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
  const services = SERVICE_PAGES.map((p) => p.slug);
  const socials = SITE.socials as unknown as [string, string, string][];
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
          {col('Services', services.slice(0, 6))}
          {col('More services', [...services.slice(6), 'services'])}
          {col('Locations', LOCATION_PAGES.map((p) => p.slug))}
          {col('Company', ['about', 'case-studies', 'team', 'career', 'blog', 'contact'])}
        </div>
        <div className="footer-bottom">
          <span>&copy; <span id="year">{new Date().getFullYear()}</span> {SITE.brand}. All rights reserved.</span>
          <span><a href={href('privacy-policy')}>Privacy Policy</a> &nbsp;&middot;&nbsp; <a href={href('terms')}>Terms</a> &nbsp;&middot;&nbsp; <a href="/sitemap.xml">Sitemap</a></span>
        </div>
      </div>
    </footer>
  );
}

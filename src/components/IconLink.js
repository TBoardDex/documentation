import React from 'react';
import Link from '@docusaurus/Link';
import { Glyph, NAV_ICONS, useTBoard } from './siteData';

/**
 * Navbar hyperlink with a stroked icon badge.
 * Registered as navbar item type "custom-iconlink" in
 * src/theme/NavbarItem/ComponentTypes.js.
 */
export default function IconLink({ label, labelZh, icon, href, to, mobile }) {
  const { locale, prefix } = useTBoard();
  const text = locale === 'zh' && labelZh ? labelZh : label;
  const cls = 'tb-navlink' + (mobile ? ' tb-navlink--mobile' : '');

  const inner = (
    <>
      <span className="tb-navlink__badge">
        <Glyph d={NAV_ICONS[icon] || NAV_ICONS.link} className="tb-navlink__glyph" />
      </span>
      <span className="tb-navlink__text">{text}</span>
    </>
  );

  if (href) {
    return (
      <a className={cls + ' tb-navlink--external'} href={href}
        target="_blank" rel="noreferrer" title={text} aria-label={text}>
        {inner}
        <span className="tb-navlink__ext" aria-hidden="true">↗</span>
      </a>
    );
  }

  const target = to && to.startsWith('/') ? prefix + to : (to || prefix + '/');
  return (
    <Link className={cls} to={target} title={text} aria-label={text}>
      {inner}
    </Link>
  );
}

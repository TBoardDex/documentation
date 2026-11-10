import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import { useTBoard, Glyph } from './siteData';

export default function QuickNav({ mobile }) {
  const { t, prefix, quickGroups } = useTBoard();
  const [open, setOpen] = useState(false);

  if (mobile) {
    return (
      <details className="tb-quicknav-mobile">
        <summary>{t.quickTrigger}</summary>
        {quickGroups.map((group) => (
          <div className="tb-quicknav-mobile__group" key={group.label}>
            <strong>{group.label}</strong>
            {group.items.map((item) => (
              <Link to={prefix + item.to} key={item.label}>{item.label}</Link>
            ))}
          </div>
        ))}
      </details>
    );
  }

  return (
    <div className="tb-quicknav" onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        className="tb-quicknav__trigger"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
      >
        <Glyph d="M4 5h16M4 12h10M4 19h7M17 15l3 3-3 3" className="tb-quicknav__glyph" />
        {t.quickTrigger}
        <span className="tb-quicknav__chev" aria-hidden="true">⌄</span>
      </button>

      {open && (
        <div className="tb-quicknav__panel" role="menu">
          <div className="tb-quicknav__head">
            <div>
              <span className="tb-eyebrow tb-eyebrow--dark">TBOARD DOCS</span>
              <strong>{t.quickHeading}</strong>
            </div>
            <Link className="tb-quicknav__all" to={prefix + '/quick-start'}>
              {t.quickAll} <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="tb-quicknav__grid">
            {quickGroups.map((group) => (
              <div className="tb-quicknav__col" key={group.label}>
                <div className="tb-quicknav__colhead">
                  <Glyph d={group.icon} className="tb-quicknav__colglyph" />
                  <span>{group.label}</span>
                </div>
                {group.items.map((item) => (
                  <Link className="tb-quicknav__item" to={prefix + item.to} key={item.label} role="menuitem">
                    <span className="tb-quicknav__itemlabel">{item.label}<span aria-hidden="true"> →</span></span>
                    <span className="tb-quicknav__itemdesc">{item.desc}</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <div className="tb-quicknav__foot">
            {t.communityLinks.map(([label, href]) => (
              <a href={href} key={label} target="_blank" rel="noreferrer">
                {label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

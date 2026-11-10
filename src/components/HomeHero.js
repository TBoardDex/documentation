import React from 'react';
import Link from '@docusaurus/Link';
import { useTBoard } from './siteData';

export default function HomeHero() {
  const { t, prefix } = useTBoard();
  return (
    <section className="tb-hero">
      <div className="tb-hero__inner">
        <div className="tb-hero__copy">
          <span className="tb-eyebrow">{t.eyebrow}</span>
          <h1>{t.heroTitle}</h1>
          <p className="tb-hero__sub">{t.heroSub}</p>
          <div className="tb-hero__actions">
            <Link className="tb-btn tb-btn--primary" to={prefix + '/quick-start'}>
              {t.ctaPrimary}<span aria-hidden="true"> →</span>
            </Link>
            <Link className="tb-btn tb-btn--ghost" to={prefix + '/tboard-r5a'}>
              {t.ctaSecondary}
            </Link>
          </div>
          <div className="tb-metrics">
            {t.metrics.map(([value, caption]) => (
              <div className="tb-metric" key={value}>
                <strong>{value}</strong>
                <span>{caption}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="tb-hero__visual">
          <div className="tb-hero__frame">
            <img src="/img/placeholder-1200x675.png" alt={t.heroImageAlt} />
            <span className="tb-hero__badge">{t.heroBadge}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import Link from '@docusaurus/Link';
import { useTBoard, Glyph } from './siteData';

export default function PathCards() {
  const { t, prefix, paths } = useTBoard();
  return (
    <section className="tb-section tb-section--paths">
      <div className="tb-section__head">
        <span className="tb-eyebrow tb-eyebrow--dark">{t.cardsEyebrow}</span>
        <h2>{t.cardsTitle}</h2>
        <p>{t.cardsSub}</p>
      </div>
      <div className="tb-cards">
        {paths.map((p, i) => (
          <Link className="tb-card" to={prefix + p.to} key={p.to}>
            <div className="tb-card__top">
              <span className="tb-card__icon"><Glyph d={p.icon} /></span>
              <span className="tb-card__index">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <h3>{p.label}</h3>
            <p className="tb-card__desc">{p.desc}</p>
            <div className="tb-card__foot">
              <span className="tb-card__count">{p.count}</span>
              <span className="tb-card__action">{t.cardAction} <span aria-hidden="true">→</span></span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

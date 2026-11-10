import React from 'react';
import Link from '@docusaurus/Link';
import { useTBoard } from './siteData';

export default function HomeShowcase() {
  const { t, prefix } = useTBoard();
  return (
    <>
      <section className="tb-section tb-showcase">
        <div className="tb-showcase__copy">
          <span className="tb-eyebrow tb-eyebrow--dark">{t.showcaseEyebrow}</span>
          <h2>{t.showcaseTitle}</h2>
          <p>{t.showcaseBody}</p>
          <ul className="tb-checklist">
            {t.showcasePoints.map((point) => (
              <li key={point}><span aria-hidden="true">✓</span>{point}</li>
            ))}
          </ul>
          <Link className="tb-btn tb-btn--solid" to={prefix + '/downloads'}>
            {t.cardAction}<span aria-hidden="true"> →</span>
          </Link>
        </div>
        <div className="tb-showcase__media">
          <figure className="tb-figure">
            <img src="/img/placeholder-960x540.png" alt={t.showcaseImageAlt} />
            <figcaption>960 × 540 px · {t.showcaseImageAlt}</figcaption>
          </figure>
        </div>
      </section>

      <section className="tb-section tb-community">
        <div className="tb-community__media">
          <figure className="tb-figure">
            <img src="/img/placeholder-640x360.png" alt={t.communityImageAlt} />
            <figcaption>640 × 360 px · {t.communityImageAlt}</figcaption>
          </figure>
        </div>
        <div className="tb-community__copy">
          <span className="tb-eyebrow tb-eyebrow--dark">{t.communityEyebrow}</span>
          <h2>{t.communityTitle}</h2>
          <p>{t.communityBody}</p>
          <div className="tb-community__links">
            {t.communityLinks.map(([label, href]) => (
              <a className="tb-chip" href={href} key={label} target="_blank" rel="noreferrer">
                {label}<span aria-hidden="true"> ↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="tb-note">
        <div className="tb-note__mark" aria-hidden="true">i</div>
        <div>
          <h3>{t.noteTitle}</h3>
          <p>{t.noteBody}</p>
        </div>
      </section>
    </>
  );
}

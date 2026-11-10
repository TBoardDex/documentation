import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Glyph, NAV_ICONS, useTBoard } from '@site/src/components/siteData';

/**
 * Local documentation search, mounted in Docusaurus' native top-right search
 * slot (theme-classic renders <NavbarSearch><SearchBar /></NavbarSearch>).
 * The index comes from plugins/tboard-search.js via site globalData.
 */

// Every space-separated term must match somewhere in the page (AND search).
// Title hits are ranked above heading / section / body hits.
function score(doc, terms) {
  const title = doc.title.toLowerCase();
  const section = (doc.section || '').toLowerCase();
  const headings = (doc.headings || []).join(' ').toLowerCase();
  const text = (doc.text || '').toLowerCase();
  let total = 0;
  for (const q of terms) {
    let points = 0;
    if (title.indexOf(q) >= 0) points += title.indexOf(q) === 0 ? 14 : 10;
    if (headings.indexOf(q) >= 0) points += 6;
    if (section.indexOf(q) >= 0) points += 4;
    if (text.indexOf(q) >= 0) points += 2;
    if (points === 0) return 0;
    total += points;
  }
  return total;
}

function Highlight({ text, q }) {
  if (!text) return null;
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q);
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark className="tb-search__mark">{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

export default function SearchBar() {
  const { globalData } = useDocusaurusContext();
  const { locale, prefix, t, quickGroups } = useTBoard();
  const allDocs =
    (globalData &&
      globalData['tboard-search'] &&
      globalData['tboard-search'].default &&
      globalData['tboard-search'].default.docs) ||
    [];

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  const pool = useMemo(() => allDocs.filter((d) => d.locale === locale), [allDocs, locale]);
  const q = query.trim().toLowerCase();
  const terms = useMemo(() => q.split(/\s+/).filter(Boolean), [q]);
  const firstTerm = terms[0] || q;
  const results = useMemo(() => {
    if (!terms.length) return [];
    return pool
      .map((d) => ({ d, points: score(d, terms) }))
      .filter((x) => x.points > 0)
      .sort((a, b) => b.points - a.points)
      .slice(0, 12)
      .map((x) => x.d);
  }, [pool, terms]);

  const suggestions = useMemo(() => {
    const seen = {};
    const out = [];
    quickGroups.forEach((group) => {
      group.items.forEach((item) => {
        if (!seen[item.to] && out.length < 8) {
          seen[item.to] = true;
          out.push({ ...item, section: group.label });
        }
      });
    });
    return out;
  }, [quickGroups]);

  const close = () => {
    setOpen(false);
    setQuery('');
    setActive(0);
  };

  useEffect(() => {
    const onKey = (e) => {
      const tag = (e.target && e.target.tagName || '').toLowerCase();
      const typing = tag === 'input' || tag === 'textarea' || (e.target && e.target.isContentEditable);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === '/' && !typing && !open) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === 'Escape' && open) {
        close();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const timer = setTimeout(() => inputRef.current && inputRef.current.focus(), 20);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = previous;
    };
  }, [open]);

  const go = (url) => {
    close();
    window.location.assign(prefix + url);
  };

  const onInputKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((v) => (v + 1) % Math.max(1, results.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((v) => (v - 1 + Math.max(1, results.length)) % Math.max(1, results.length));
    } else if (e.key === 'Enter' && results.length) {
      e.preventDefault();
      go(results[active % results.length].url);
    }
  };

  return (
    <>
      <button type="button" className="tb-search__trigger" onClick={() => setOpen(true)}
        aria-label={t.searchOpen} title={t.searchOpen}>
        <Glyph d={NAV_ICONS.search} className="tb-search__glyph" />
        <span className="tb-search__label">{t.searchLabel}</span>
        <kbd className="tb-search__kbd">⌘K</kbd>
      </button>

      {open && (
        <div className="tb-search__overlay" onMouseDown={(e) => e.target === e.currentTarget && close()}>
          <div className="tb-search__dialog" role="dialog" aria-modal="true" aria-label={t.searchLabel}>
            <div className="tb-search__field">
              <Glyph d={NAV_ICONS.search} className="tb-search__fieldglyph" />
              <input ref={inputRef} type="search" value={query}
                onChange={(e) => { setQuery(e.target.value); setActive(0); }}
                onKeyDown={onInputKeyDown} placeholder={t.searchPlaceholder}
                aria-label={t.searchPlaceholder} autoComplete="off" spellCheck="false" />
              <button type="button" className="tb-search__esc" onClick={close}>Esc</button>
            </div>

            <div className="tb-search__body">
              {!q && (
                <>
                  <div className="tb-search__caption">
                    <span>{t.searchQuick}</span>
                    <span>{t.searchHint}</span>
                  </div>
                  {suggestions.map((item, i) => (
                    <Link key={item.to + i} className="tb-search__result"
                      to={prefix + item.to} onClick={close}>
                      <span className="tb-search__resulticon">
                        <Glyph d={NAV_ICONS.link} />
                      </span>
                      <span className="tb-search__resultmain">
                        <strong>{item.label}</strong>
                        <small>{item.desc}</small>
                      </span>
                      <span className="tb-search__resulttag">{item.section}</span>
                    </Link>
                  ))}
                </>
              )}

              {q && results.length === 0 && (
                <div className="tb-search__empty">{t.searchEmpty}</div>
              )}

              {q && results.length > 0 && (
                <>
                  <div className="tb-search__caption">
                    <span>{results.length} {t.searchCount}</span>
                    <span>{pool.length} {t.searchIndex}</span>
                  </div>
                  {results.map((doc, i) => (
                    <Link key={doc.url + i}
                      className={'tb-search__result' + (i === active ? ' tb-search__result--active' : '')}
                      to={prefix + doc.url} onClick={close} onMouseEnter={() => setActive(i)}>
                      <span className="tb-search__resulticon">
                        <Glyph d={NAV_ICONS.docs} />
                      </span>
                      <span className="tb-search__resultmain">
                        <strong><Highlight text={doc.title} q={firstTerm} /></strong>
                        <small><Highlight text={doc.excerpt} q={firstTerm} /></small>
                      </span>
                      <span className="tb-search__resulttag">{doc.section}</span>
                    </Link>
                  ))}
                </>
              )}
            </div>

            <div className="tb-search__footer">
              <span><kbd>↑</kbd><kbd>↓</kbd> {t.searchNav}</span>
              <span><kbd>↵</kbd> {t.searchSelect}</span>
              <span><kbd>Esc</kbd> {t.searchLabel}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

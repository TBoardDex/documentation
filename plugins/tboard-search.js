/**
 * TBoard local documentation search index.
 *
 * Zero-dependency, build-time plugin: it scans the EN and ZH markdown sources,
 * derives the public route of every page, and exposes a compact index through
 * Docusaurus globalData. The SearchBar component reads it in the browser.
 *
 * No npm dependency is added (package.json / package-lock.json stay untouched),
 * so the deploy workflow contract is unchanged.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SOURCES = {
  en: path.join(ROOT, 'docs', 'main'),
  zh: path.join(ROOT, 'i18n', 'zh', 'docusaurus-plugin-content-docs', 'current', 'main'),
};

function walk(root) {
  const out = [];
  const rec = (dir, rel) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith('.')) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) rec(full, rel + entry.name + '/');
      else if (entry.isFile() && entry.name.endsWith('.md')) out.push(rel + entry.name);
    }
  };
  rec(root, '');
  return out.sort();
}

function splitFrontMatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { fm: {}, body: raw };
  const fm = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '');
  }
  return { fm, body: match[2] };
}

// Docusaurus strips "12_foo.md" / "3.bar.md" numeric prefixes from doc ids.
function stripNumberPrefix(name) {
  return name.replace(/^\d+[-_. ]/, '');
}

function routeFor(rel, fm) {
  if (fm.slug) {
    const slug = fm.slug.trim();
    if (slug === '/') return '/';
    if (slug.startsWith('/')) return slug.replace(/\/+$/, '');
    const parent = rel.split('/').slice(0, -1);
    return '/' + parent.concat(slug).map(stripNumberPrefix).join('/');
  }
  // "docs/main/<rel>" is served under /main/<rel> because routeBasePath is '/'.
  const parts = rel.replace(/\.md$/, '').split('/').map(stripNumberPrefix);
  return '/main/' + parts.join('/');
}

function plainText(body) {
  return body
    .replace(/^import\s+.*$/gm, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^\s{0,3}#{1,6}\s+/gm, '')
    .replace(/^\s*[-*+>|:]+\s*/gm, '')
    .replace(/[`*_~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function headingsOf(body) {
  return Array.from(body.matchAll(/^##\s+(.+)$/gm))
    .map((m) => m[1].replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/[`*_]/g, '').trim())
    .filter(Boolean)
    .slice(0, 6);
}

// Draft pages start with image-placeholder and DRAFT blockquotes. Keep those
// out of the visible result snippet, but keep them in the searchable text.
function excerptOf(body, title) {
  let clean = plainText(body.replace(/^>\s?.*$/gm, ' '));
  if (clean.startsWith(title + ' ')) clean = clean.slice(title.length + 1);
  return clean.slice(0, 150);
}

// Category labels are read recursively: a page inside
// quick-start/r5a-rk3588s/ should be reported as "R5A (RK3588S)", not just
// "Quick Start", so multi-platform boards stay easy to find in search too.
function sectionLabels(root) {
  const labels = {};
  const rec = (dir, rel) => {
    const file = path.join(dir, '_category_.json');
    if (fs.existsSync(file)) {
      try {
        labels[rel] = JSON.parse(fs.readFileSync(file, 'utf8')).label;
      } catch (_) {
        /* keep fallback below */
      }
    }
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        rec(path.join(dir, entry.name), rel ? rel + '/' + entry.name : entry.name);
      }
    }
  };
  rec(root, '');
  return labels;
}

function buildIndex(locale) {
  const root = SOURCES[locale];
  if (!fs.existsSync(root)) return [];
  const labels = sectionLabels(root);
  const overview = locale === 'zh' ? '总览' : 'Overview';

  return walk(root).map((rel) => {
    const raw = fs.readFileSync(path.join(root, rel), 'utf8');
    const { fm, body } = splitFrontMatter(raw);
    const parts = rel.split('/');
    const dirs = parts.slice(0, -1);
    let section = overview;
    for (let depth = dirs.length; depth > 0; depth -= 1) {
      const key = dirs.slice(0, depth).join('/');
      if (labels[key]) { section = labels[key]; break; }
    }
    const text = plainText(body);
    const title = fm.title || stripNumberPrefix(parts[parts.length - 1].replace(/\.md$/, ''));

    return {
      locale,
      title,
      section,
      url: routeFor(rel, fm),
      excerpt: excerptOf(body, title),
      text: text.slice(0, 1200),
      headings: headingsOf(body),
    };
  });
}

module.exports = function tboardSearchPlugin() {
  return {
    name: 'tboard-search',
    async loadContent() {
      return {
        docs: [...buildIndex('en'), ...buildIndex('zh')],
      };
    },
    contentLoaded({ content, actions }) {
      actions.setGlobalData(content);
    },
  };
};

// Platform badges for sidebar board entries.
// Each TBoard model is listed with a colour-coded SoC chip so customers can
// associate a model with its Rockchip platform at a glance. Add a new entry
// here (plus a matching .tb-plat--<key> rule in src/css/custom.css) when a new
// board on a different SoC is published.
const PLATFORMS = [
  { key: 'rk3588s', label: 'RK3588S', test: /RK3588S/i },
  { key: 'rk3588', label: 'RK3588', test: /RK3588(?!S)/i },
  { key: 'rk3576', label: 'RK3576', test: /RK3576/i },
  { key: 'rk3568', label: 'RK3568', test: /RK3568/i },
  { key: 'rk3566', label: 'RK3566', test: /RK3566/i },
  { key: 'rk3399', label: 'RK3399', test: /RK3399/i },
];

export function platformFor(...parts) {
  const hay = parts.filter(Boolean).join(' ');
  return PLATFORMS.find((p) => p.test.test(hay)) || null;
}

// "R5A (RK3588S)" -> { label: "R5A", platform: RK3588S }
// The SoC token moves into the badge; the visible label keeps only the model.
export function splitPlatformLabel(label = '', href = '') {
  const platform = platformFor(label, href);
  if (!platform) {
    return { label, platform: null };
  }
  const cleaned = label
    .replace(/[（(]\s*RK\d{4}[A-Z]*\s*[）)]/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
  return { label: cleaned || label, platform };
}

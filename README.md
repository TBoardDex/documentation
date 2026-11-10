# TBoard Documentation

Official documentation site for TBoard open-source hardware and software,
built with Docusaurus 2.4.3 and maintained in English and Chinese (strict 1:1
mirror).

## Domains

| Site | URL |
| --- | --- |
| Documentation (overseas, EN) | https://docs.tboard.org |
| Documentation (China, ZH) | https://docs.tboard.cn |
| Website / Forum | https://www.tboard.org · https://forum.tboard.org |

## Local development

```bash
npm ci
npm run start                  # English, http://localhost:3000
npm run start -- --locale zh   # Chinese, http://localhost:3000/zh/
npm run build                  # produces build/ and build/zh/
npm run serve                  # preview the production build
```

## Documentation structure

```
docs/main/
  main-page.md              landing page (slug: /)
  quick-start/              Quick Start / 快速上手      (position 1, per-board onboarding)
    r5a-rk3588s/            R5A (RK3588S)               (6 pages)
  boards/                   Boards / 开发板             (position 2, per-board)
    r5a/                    R5A (RK3588S)               (overview.md + pinout.md)
  projects/                 Projects / 项目案例         (position 3, end-to-end case studies)
  downloads/                Downloads / 资料下载        (position 4)
  common/                   Common / 通用               (position 5, platform-common only)
  system-sdk/               Accessories / 外围配件      (position 6, overview only)
  linux/ android/           system sections             (positions 7–8)
  others/                   Others / 其他               (position 9, overview only)
  licenses/                 Licenses / 许可协议         (position 10, always last)
i18n/zh/docusaurus-plugin-content-docs/current/main/   Chinese mirror, strict 1:1
```

Conventions:

- Every `.md` page needs its Chinese mirror at the same relative path.
- **Boards**: one subdirectory per board, `overview.md` (specs, connectors) +
  `pinout.md` (40-pin table). Board-specific facts live here, nowhere else.
- **Common**: platform-level knowledge only (GPIO rules, debug console, buses,
  USB/display/camera/audio capabilities) — never a board-specific pinout.
- **Projects**: one subdirectory per case study (`overview.md`, `build.md`,
  `run.md`) documenting a reproducible end-to-end build.
- Category labels live in each `_category_.json` (one EN + one ZH). Docusaurus
  2.4.3 reads only the English one, so Chinese labels come from
  `src/sidebarLabels.json`, applied by `sidebarItemsGenerator` in
  `docusaurus.config.js`.
- Board names follow `<model> (<SoC>)`, e.g. `R5A (RK3588S)`; the sidebar
  renders the SoC as a colour-coded platform chip (see
  `src/components/platformBadges.js`).

## Writing rules

- Use only TBoard-owned domains and download endpoints.
- MDX treats `<Something>` as a JSX tag — wrap such placeholders in backticks.
- Content pages carry a size-labelled placeholder image; replace it with a real
  image of the same size (assets in `static/img/`).
- Rich visual blocks belong in `src/components/*.js`; keep `.md` mostly
  Markdown so the MDX audit stays quiet.
- Before merging: `node ../verify-rebuilt-docs.mjs` and `npm run build` must
  pass.

## Deployment

`.github/workflows/deploy-docs.yml` is the deployment contract, edited by the
repository owner on GitHub. A push to `main` builds and rsyncs:

```
build/     --> docs.tboard.org
build/zh/  --> docs.tboard.cn
```

Because the workflow uses `rsync --delete`, only push `main` when the content
is verified. Day-to-day writing happens on the `develop` branch.

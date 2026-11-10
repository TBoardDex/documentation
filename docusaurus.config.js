// @ts-check
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// TBoard-owned domains. Edit these constants when the sites move.
// NOTE: "url" is only used for canonical tags / sitemap / absolute links.
// The actual deployment target is decided by the GitHub Actions workflow
// and its Secrets (EN server and CN server), not by this file.
const EN_SITE_URL = 'https://docs.tboard.org';
const CN_SITE_URL = 'https://docs.tboard.cn';
const WWW_OVERSEAS = 'https://www.tboard.org';
const WWW_CHINA = 'https://www.tboard.cn';
const FORUM_URL = 'https://forum.tboard.org';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'TBoard Documentation',
  tagline: 'RK3588 / RK3588S open-source hardware and software documentation',
  favicon: 'img/favicon.svg',

  url: EN_SITE_URL,
  baseUrl: '/',
  organizationName: 'TBoardDex',
  projectName: 'documentation',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  customFields: {
    cnSiteUrl: CN_SITE_URL,
    wwwOverseas: WWW_OVERSEAS,
    wwwChina: WWW_CHINA,
    forumUrl: FORUM_URL,
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    localeConfigs: {
      en: { label: 'English', htmlLang: 'en' },
      zh: { label: '简体中文', htmlLang: 'zh-CN' },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          // Keep routeBasePath '/' so the EN build is served at the site root
          // and the ZH build is served from build/zh/ by the deploy workflow.
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/TBoardDex/documentation/tree/main/',
        },
        blog: false,
        theme: { customCss: require.resolve('./src/css/custom.css') },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/placeholder.svg',
      metadata: [
        { name: 'keywords', content: 'TBoard, RK3588, RK3588S, Rockchip, SBC, open source hardware, SDK' },
      ],
      navbar: {
        title: 'TBoard Docs',
        logo: { alt: 'TBoard', src: 'img/favicon.svg' },
        items: [
          { type: 'doc', docId: 'main/main-page', position: 'left', label: 'Documentation' },
          { href: FORUM_URL, label: 'Forum', position: 'right' },
          { href: WWW_OVERSEAS, label: 'Website', position: 'right' },
          { href: WWW_CHINA, label: '中国站', position: 'right' },
          { href: 'https://github.com/TBoardDex', label: 'GitHub', position: 'right' },
          { type: 'localeDropdown', position: 'right' },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              { label: 'Home', to: '/' },
              { label: 'TBoard R5A', to: '/tboard-r5a' },
            ],
          },
          {
            title: 'TBoard',
            items: [
              { label: 'Website', href: WWW_OVERSEAS },
              { label: '中国站', href: WWW_CHINA },
              { label: 'Forum', href: FORUM_URL },
              { label: 'GitHub', href: 'https://github.com/TBoardDex' },
            ],
          },
        ],
        copyright: 'Copyright © ' + new Date().getFullYear() + ' Fuzhou Tianshu Technology. TBoard is a registered trademark.',
      },
      prism: { theme: lightCodeTheme, darkTheme: darkCodeTheme },
    }),
};

module.exports = config;

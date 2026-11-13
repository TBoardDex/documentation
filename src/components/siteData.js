import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// All copy and navigation data for the enhanced TBoard documentation UI.
// Nothing here references any third-party brand or service.

const PATHS = [
  {
    to: '/quick-start', icon: 'M4 5h7v14H4zM13 8h7M13 12h7M13 16h5',
    en: ['Quick Start', 'Short per-board onboarding, grouped by board and SoC.', '6 pages'],
    zh: ['快速上手', '按板卡与主控分组的简短上手流程。', '6 篇'],
  },
  {
    to: '/tboard-r5a', icon: 'M6 6h12v12H6zM9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4',
    en: ['Boards', 'Board specifications, connectors, pinout and mechanical data.', '2 pages'],
    zh: ['开发板', '规格参数、板卡布局、连接器与引脚定义。', '2 篇'],
  },
  {
    to: '/projects', icon: 'M4 20h16M6 20V9l6-4 6 4v11M10 20v-6h4v6',
    en: ['Projects', 'End-to-end case studies built on TBoard boards.', '1 page'],
    zh: ['项目案例', '基于 TBoard 板卡搭建的完整案例方案。', '1 篇'],
  },
  {
    to: '/downloads', icon: 'M12 3v12M7 10l5 5 5-5M4 20h16',
    en: ['Downloads', 'Hardware files, firmware images, SDK sources and tools for every board.', '5 pages'],
    zh: ['资料下载', '各板卡的硬件资料、固件镜像、SDK 源码与工具。', '5 篇'],
  },
  {
    to: '/common', icon: 'M4 4h16v16H4zM8 9h8M8 13h8M8 17h5',
    en: ['Common', 'Conventions, shared resources and common troubleshooting.', '1 page'],
    zh: ['通用', '文档约定、共用资料与常见故障排查。', '1 篇'],
  },
  {
    to: '/accessories', icon: 'M8 3v6M16 3v6M5 9h14v12H5zM9 14h6',
    en: ['Accessories', 'Displays, camera modules, cooling kits, expansion boards and power adapters.', '1 page'],
    zh: ['外围配件', '显示屏、摄像头模组、散热件、扩展板与电源适配器等外围模块。', '1 篇'],
  },
  {
    to: '/linux', icon: 'M12 3c3 0 5 3 5 6 0 4-2 6-2 9H9c0-3-2-5-2-9 0-3 2-6 5-6zM9 6h1M15 6h1M10 16h4',
    en: ['Linux', 'Linux images, system configuration and platform services.', '1 page'],
    zh: ['Linux', 'Linux 镜像、系统配置与平台服务。', '1 篇'],
  },
  {
    to: '/android', icon: 'M6 9h12v8a2 2 0 01-2 2H8a2 2 0 01-2-2V9zM4 9a2 2 0 012-2h12a2 2 0 012 2M9 4l1 3M15 4l-1 3M9 19v2M15 19v2',
    en: ['Android', 'Android images, flashing and platform customisation.', '1 page'],
    zh: ['Android', 'Android 镜像、烧录与平台定制。', '1 篇'],
  },
  {
    to: '/others', icon: 'M5 7h14M5 12h14M5 17h8M17 15l2 2 2-2',
    en: ['Others', 'Notes that do not fit the other sections yet.', '1 page'],
    zh: ['其他', '暂不属于其他分区的补充说明。', '1 篇'],
  },
  {
    to: '/licenses/software', icon: 'M12 3l8 4v6c0 5-4 7-8 8-4-1-8-3-8-8V7zM9 12l2 2 4-4',
    en: ['Licenses', 'Software and hardware licensing terms for TBoard.', '2 pages'],
    zh: ['许可协议', 'TBoard 软件与硬件的开源许可条款。', '2 篇'],
  },
];

const QUICK_GROUPS = [
  {
    en: 'Start here', zh: '从这里开始', icon: 'M4 5h7v14H4zM13 8h7M13 12h7',
    items: [
      { to: '/quick-start', en: ['R5A (RK3588S)', 'Board quick start'], zh: ['R5A（RK3588S）', '板卡快速上手'] },
      { to: '/projects', en: ['Projects', 'Complete board-based solutions'], zh: ['项目案例', '基于板卡的完整方案'] },
      { to: '/downloads', en: ['Downloads', 'Images, SDK, design files'], zh: ['资料下载', '镜像、SDK、设计文件'] },
      { to: '/accessories', en: ['Accessories', 'Displays, cameras, cooling'], zh: ['外围配件', '屏幕、摄像头、散热'] },
    ],
  },
  {
    en: 'Board & pins', zh: '板卡与引脚', icon: 'M6 6h12v12H6zM9 2v4M15 2v4M2 9h4M18 9h4',
    items: [
      { to: '/tboard-r5a', en: ['R5A Board Specs', 'Connectors and interfaces'], zh: ['R5A 板卡规格', '连接器与接口'] },
      { to: '/r5a-pinout', en: ['40-PIN Pinout', 'Full pin definition table'], zh: ['40-PIN 引脚定义', '完整引脚定义表'] },
      { to: '/assembly', en: ['Assembly', 'Mounting and wiring'], zh: ['组装与连接', '安装与连线'] },
      { to: '/hardware-files', en: ['Hardware Files', 'Schematics and mechanical data'], zh: ['硬件资料', '原理图与结构图'] },
    ],
  },
  {
    en: 'Build & flash', zh: '构建与烧录', icon: 'M8 3v6M16 3v6M5 9h14v12H5z',
    items: [
      { to: '/flashing', en: ['Flash the Image', 'Maskrom / Loader workflow'], zh: ['镜像烧录', 'Maskrom / Loader 流程'] },
      { to: '/first-boot', en: ['First Boot', 'Power, serial, boot log'], zh: ['首次上电', '供电、串口、启动日志'] },
      { to: '/sdk-sources', en: ['SDK Sources', 'Repo and manifest'], zh: ['SDK 源码', '仓库与 manifest'] },
      { to: '/basic-compile', en: ['Basic Compile', 'Build from source'], zh: ['基础编译', '从源码构建'] },
      { to: '/tools', en: ['Tools', 'Host-side utilities'], zh: ['工具', '主机端工具'] },
      { to: '/firmware-images', en: ['Firmware Images', 'Factory and OS images'], zh: ['固件镜像', '工厂与系统镜像'] },
    ],
  },
  {
    en: 'System & resources', zh: '系统与资源', icon: 'M4 4h16v16H4zM8 9h8M8 13h8M8 17h5',
    items: [
      { to: '/common', en: ['Common', 'Platform interface usage'], zh: ['通用接口', '平台接口用法'] },
      { to: '/gpio', en: ['GPIO', 'Numbering and control'], zh: ['GPIO', '编号规则与读写'] },
      { to: '/linux', en: ['Linux', 'Images and system setup'], zh: ['Linux', '镜像与系统配置'] },
      { to: '/android', en: ['Android', 'Flashing and customisation'], zh: ['Android', '烧录与平台定制'] },
      { to: '/others', en: ['Others', 'Shared system-setup notes'], zh: ['其他', '通用系统配置说明'] },
      { to: '/licenses/software', en: ['Licenses', 'Software and hardware terms'], zh: ['许可协议', '软件与硬件许可条款'] },
    ],
  },
];

const COPY = {
  en: {
    eyebrow: 'OPEN HARDWARE  /  RK3588S  /  EMBEDDED AI',
    heroTitle: 'Build on TBoard R5A.',
    heroSub: 'One board, one documentation set. From unboxing and flashing to peripheral bring-up, SDK builds and factory firmware packaging — verified on the RK3588S platform.',
    ctaPrimary: 'Start building',
    ctaSecondary: 'Board specifications',
    heroImageAlt: 'TBoard R5A board photo placeholder, 1200 x 675 px',
    heroBadge: 'R5A  /  1200 x 675 px',
    metrics: [
      ['RK3588S', '8-core SoC'], ['6 TOPS', 'NPU'], ['8K', 'Multimedia'], ['Open', 'HW + SW'],
    ],
    cardsEyebrow: 'CHOOSE YOUR PATH',
    cardsTitle: 'Documentation, organised around what you are doing.',
    cardsSub: 'Focused sections instead of one long list. Each one starts with the task and ends with a verified procedure.',
    cardAction: 'Open section',
    showcaseEyebrow: 'FROM SOURCE TO FACTORY IMAGE',
    showcaseTitle: 'The full firmware chain, documented end to end.',
    showcaseBody: 'The build flow produces MiniLoaderAll.bin, uboot.img and rootfs.img, then packages them into update.img for factory flashing. Every stage has its own page, including backup, restore and application deployment.',
    showcasePoints: ['Reproducible SDK build steps', 'Verified flashing and first-boot checks', 'Packaging and deployment in one place'],
    showcaseImageAlt: 'Firmware build flow placeholder, 960 x 540 px',
    communityEyebrow: 'OPEN BY DESIGN',
    communityTitle: 'Hardware and software, openly licensed.',
    communityBody: 'Design files, source repositories and release announcements are published by TBoard. The software and hardware licences are part of this documentation, not an afterthought.',
    communityLinks: [
      ['Forum', 'https://forum.tboard.org'],
      ['GitHub', 'https://github.com/TBoardDex'],
      ['Website', 'https://www.tboard.org'],
    ],
    communityImageAlt: 'Open source licensing placeholder, 640 x 360 px',
    noteTitle: 'Work in progress',
    noteBody: 'Most pages are structured drafts with a size-labelled image placeholder. Replace the images with verified photos and fill in the procedures progressively.',
    quickTrigger: 'Quick jump',
    quickHeading: 'Jump straight to a document',
    quickAll: 'Browse all docs',
    searchLabel: 'Search',
    searchOpen: 'Search documentation (Ctrl+K)',
    searchPlaceholder: 'Search titles, headings and page text…',
    searchHint: 'Start typing to find a page',
    searchQuick: 'Suggested pages',
    searchEmpty: 'No matching pages. Try a shorter keyword.',
    searchCount: 'results',
    searchIndex: 'pages indexed',
    searchNav: 'to navigate',
    searchSelect: 'to open',
  },
  zh: {
    eyebrow: '开源硬件  /  RK3588S  /  嵌入式 AI',
    heroTitle: '从 TBoard R5A 开始构建。',
    heroSub: '一块板，一套文档。从开箱、烧录，到外设调试、SDK 构建与工厂固件打包，全部基于 RK3588S 平台验证。',
    ctaPrimary: '开始上手',
    ctaSecondary: '查看板卡规格',
    heroImageAlt: 'TBoard R5A 产品实拍占位图，1200 x 675 px',
    heroBadge: 'R5A  /  1200 x 675 px',
    metrics: [
      ['RK3588S', '8 核 SoC'], ['6 TOPS', 'NPU 算力'], ['8K', '多媒体'], ['开源', '硬件 + 软件'],
    ],
    cardsEyebrow: '按任务进入',
    cardsTitle: '围绕你正在做的事来组织文档。',
    cardsSub: '按主题分区，而不是一张长长的清单。每个分区都从任务出发，落到经过验证的操作流程。',
    cardAction: '进入分区',
    showcaseEyebrow: '从源码到工厂镜像',
    showcaseTitle: '完整固件链路，端到端记录。',
    showcaseBody: '构建流程产出 MiniLoaderAll.bin、uboot.img 与 rootfs.img，再打包成供工厂烧录的 update.img。每个阶段都有独立页面，覆盖备份、恢复与应用部署。',
    showcasePoints: ['可复现的 SDK 构建步骤', '经过验证的烧录与首次启动检查', '打包与部署集中在一处'],
    showcaseImageAlt: '固件构建流程占位图，960 x 540 px',
    communityEyebrow: '生而开放',
    communityTitle: '硬件与软件，均有明确许可。',
    communityBody: '设计文件、源码仓库与发布公告由 TBoard 自行发布。软件与硬件开源协议是本站文档的一部分，而不是补充材料。',
    communityLinks: [
      ['论坛', 'https://forum.tboard.org'],
      ['GitHub', 'https://github.com/TBoardDex'],
      ['官网', 'https://www.tboard.org'],
    ],
    communityImageAlt: '开源许可占位图，640 x 360 px',
    noteTitle: '内容持续完善中',
    noteBody: '多数页面是带尺寸标注图片占位的结构草稿。后续请逐步替换为实测图片并补齐操作流程。',
    quickTrigger: '快捷跳转',
    quickHeading: '直接跳到指定文档',
    quickAll: '浏览全部文档',
    searchLabel: '搜索',
    searchOpen: '搜索文档（Ctrl+K）',
    searchPlaceholder: '搜索标题、章节与正文…',
    searchHint: '输入关键词开始查找',
    searchQuick: '推荐入口',
    searchEmpty: '没有匹配的页面，试试更短的关键词。',
    searchCount: '条结果',
    searchIndex: '篇文档已索引',
    searchNav: '切换',
    searchSelect: '打开',
  },
};

// Stroke icons used by the navbar hyperlinks and the search button.
export const NAV_ICONS = {
  docs: 'M4 4h7v16H4zM13 5h7M13 9h7M13 13h7M7 8h1M7 12h1',
  forum: 'M4 5h16v10H9l-5 4V5zM8 9h8M8 12h5',
  globe: 'M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18',
  cn: 'M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M8 7h8M8 12h8M10 17h4',
  github: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22',
  link: 'M10 13a5 5 0 007 0l2-2a5 5 0 00-7-7l-1 1M14 11a5 5 0 00-7 0l-2 2a5 5 0 007 7l1-1',
  search: 'M11 4a7 7 0 100 14 7 7 0 000-14zM20 20l-4.2-4.2',
};

export function useTBoard() {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale === 'zh' ? 'zh' : 'en';
  return {
    locale,
    prefix: locale === 'zh' ? '/zh' : '',
    t: COPY[locale],
    paths: PATHS.map((p) => ({ ...p, label: p[locale][0], desc: p[locale][1], count: p[locale][2] })),
    quickGroups: QUICK_GROUPS.map((g) => ({
      label: g[locale], icon: g.icon,
      items: g.items.map((i) => ({ ...i, label: i[locale][0], desc: i[locale][1] })),
    })),
  };
}

export function Glyph({ d, className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

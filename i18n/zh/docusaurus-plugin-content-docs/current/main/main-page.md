---
title: ""
sidebar_label: "首页"
sidebar_position: 0
slug: /
hide_title: true
---

import HomeHero from '@site/src/components/HomeHero';
import PathCards from '@site/src/components/PathCards';
import HomeShowcase from '@site/src/components/HomeShowcase';

<HomeHero />

<PathCards />

<HomeShowcase />

## 从这里开始

第一次接触这块板？按顺序看下面几步：

1. [R5A（RK3588S）快速上手](/zh/quick-start) —— 板卡介绍与引导式上手路径。
2. [资料下载](/zh/downloads) —— 按板卡硬件版本选择镜像、SDK 与设计文件。
3. [镜像烧录](/zh/flashing) 与 [首次上电](/zh/first-boot) —— Maskrom / Loader 烧录，再看串口与启动日志。

[R5A（RK3588S）](/zh/tboard-r5a) 板卡页集中收录全部硬件规格、连接器与引脚定义。

## 文档一览

| 分区 | 内容 |
| --- | --- |
| [快速上手](/zh/quick-start) | 按板卡组织的简短流程：介绍、装配、固件下载、烧录、首次上电与基础编译 |
| [开发板](/zh/tboard-r5a) | 规格参数、连接器、引脚定义与机械尺寸 |
| [资料下载](/zh/downloads) | 各板卡的硬件设计文件、固件与系统镜像、SDK 源码、工具 |
| [通用](/zh/common) | 文档约定、共用资料与常见故障排查 |
| [外围配件](/zh/accessories) | 显示屏、摄像头模组、散热件、扩展板与电源适配器 |
| [Linux](/zh/linux) | Linux 镜像、系统配置与平台服务 |
| [Android](/zh/android) | Android 镜像、烧录与平台定制 |
| [其他](/zh/others) | 网络、远程桌面、软件源、文件互传与板卡信息查询 |
| [许可协议](/zh/licenses/software) | 软件与硬件开源许可条款 |

通用、外围配件、Linux、Android 与其他分区正在逐步补充，完整页面请见左侧导航栏。

## 板卡命名规范

快速上手按**板卡**分组，分组名中带主控型号，例如 `R5A（RK3588S）`。
后续新增芯片平台时，在 `quick-start/` 下建同级目录 `<型号>-<主控>`，并把
`_category_.json` 的 `label` 写成如 `R5B（RK3576）` 的形式，这样即使有多个
芯片平台，也能在侧栏一键定位到指定板卡。资料下载分区同步维护按板卡的索引表。

## 社区与支持

发布公告与设计文件在[论坛](https://forum.tboard.org)发布，源码仓库见
[GitHub 上的 TBoardDex](https://github.com/TBoardDex)，产品信息见
[海外官网](https://www.tboard.org)与[国内官网](https://www.tboard.cn)。

---
title: "资料下载"
sidebar_label: "概览"
sidebar_position: 1
slug: "/downloads"
---

# 资料下载

![TBoard 资料总览占位图 960 x 540 px](/img/placeholder-960x540.png)

> 图片占位：**960 × 540 px**（建议用途：构建 / 下载流程图）。后期请替换为
> 相同尺寸的真实图片。

R5A 的系统镜像、SDK 源码、烧录工具和硬件设计资料统一发布在两个位置：

| 位置 | 内容 |
|---|---|
| [TBoard 网盘](https://drive.google.com/drive/folders/1x2KOX1F4-DVyyV_9qfdH28PWIORcWH56) | 系统镜像、工具、硬件设计文件、芯片手册、质检报告 |
| [GitHub 上的 TBoardDex](https://github.com/TBoardDex) | SDK manifest、内核与 U-Boot 源码 |
| [论坛](https://forum.tboard.org) | 版本发布公告与校验值 |

## 从哪里开始

1. **只想让板子跑起来**：从[固件与镜像](/firmware-images)下载 Debian 或 Ubuntu
   镜像，用[工具与驱动](/tools)中的工具写入，然后按[烧录镜像](/flashing)操作。
2. **要自己编镜像**：从 [SDK 与源码](/sdk-sources)开始。
3. **要做底板或外壳**：在[硬件资料](/hardware-files)中取原理图、DXF 和 STEP。

## 板卡索引

| 板卡 | SoC | 硬件资料 | 固件镜像 | SDK 与源码 | 工具 |
| --- | --- | --- | --- | --- | --- |
| TBoard R5A | RK3588S | [设计文件](/hardware-files) | [镜像](/firmware-images) | [SDK](/sdk-sources) | [工具](/tools) |

新增平台时按行追加即可。所有下载链接只指向 TBoard 自有存储，版本说明统一
指向论坛。

## 网盘结构

| 目录 | 内容 |
|---|---|
| 使用前必读 | 已知问题、注意事项、镜像专属说明 |
| 开发工具 | USB 驱动、烧录工具、SD 卡工具、串口终端 |
| 硬件资料 | 原理图、PCB、2D/3D 图纸、BOM、连接器手册 |
| Linux 镜像 | 各板卡、各硬件版本的 Debian / Ubuntu 镜像 |
| Android 镜像 | 支持 Android 的板卡对应的镜像 |
| 瑞芯微官方文档 | 文档中引用的 SoC 外设手册 |
| SDK 源码 | 与 GitHub 仓库对应的源码包 |
| 质检报告 | 各生产批次的出厂测试报告 |

目录名称与内容会原地更新——请始终取目录中的最新文件，不要使用邮件转发的
旧副本。

## 命名、版本与硬件版本

- 镜像文件名包含**板卡**、**发行版**、**桌面版本**和**构建日期**。只有日期不同
  的两个文件也是两次不同的构建，替换可用镜像前先看版本说明。
- `update.img` 是 **eMMC / 量产**镜像（整盘，用 RKDevTool 或 `upgrade_tool`
  烧录）；`.img` / `.img.xz` 是 **microSD** 镜像。
- 请对照丝印上的**硬件版本**（V1.0、V1.1 …）选择镜像，V1.1 的改动列在
  [硬件资料](/hardware-files)页。
- 所有官方镜像的默认账号为 `tboard` / `tboard`（管理员 `root` / `root`），
  首次启动后请立即修改，见[首次启动](/first-boot)。

## 校验下载文件

把下载文件的 MD5 与 `-md5.txt` 中公布的值比对。

**Windows**（在 cmd 中输入命令）：

```bat
certutil -hashfile TBoard-R5A-ubuntu22.04-GNOME-V1.0.0.img MD5
```

<img src="/img/r5a-md5-windows.png" alt="Windows 端使用 certutil 校验 MD5" width="700" />

**Linux**（`md5sum`）：

```bash
md5sum TBoard-R5A-debian11-Xfce-V1.0.0.img
```

<img src="/img/r5a-md5-linux.png" alt="Linux 端使用 md5sum 校验 MD5" width="700" />

校验不通过的文件通常会在烧录中途失败，写入前先校验能省一次返工。

## 编写约定

- 只使用 TBoard 自有域名与下载地址。
- 板卡专属参数放在 [TBoard R5A](/tboard-r5a) 页面。
- 图片放在 `static/img/`，引用路径写作 `/img/...`。
- MDX 中避免直接出现尖括号，占位符如 `<SoC>` 请用反引号包裹。

## 相关页面

- [固件与镜像](/firmware-images) — R5A 的 Debian / Ubuntu 镜像。
- [工具与驱动](/tools) — RKDevTool、SDDiskTool、upgrade_tool。
- [SDK 与源码](/sdk-sources) — manifest、内核、U-Boot。
- [硬件资料](/hardware-files) — 原理图、DXF、3D、BOM。

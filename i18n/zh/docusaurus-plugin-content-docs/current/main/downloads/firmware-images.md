---
title: "固件与系统镜像"
sidebar_label: "固件镜像"
sidebar_position: 3
slug: "/firmware-images"
---

# 固件与系统镜像

![固件镜像选择流程占位图 960 x 540 px](/img/placeholder-960x540.png)

> 图片占位：**960 × 540 px**（建议用途：构建 / 下载流程图）。后期请替换为
> 相同尺寸的真实图片。

R5A 的所有镜像都发布在 [TBoard 网盘](https://drive.google.com/drive/folders/1x2KOX1F4-DVyyV_9qfdH28PWIORcWH56)
的 **Linux 镜像** 目录中。先进入对应板卡的目录，再按硬件版本选择文件。

## 可用镜像

| 系统 | 版本 | 内核 | 说明 |
|---|---|---|---|
| Debian 11 | 桌面版、服务器版 | 6.1.x（瑞芯微 BSP） | 无显示器的服务器、网关场景推荐 |
| Ubuntu 22.04 LTS | 桌面版、服务器版 | 6.1.x（瑞芯微 BSP） | 需要较新用户态软件时推荐 |
| TBoard SDK 构建 | 视 SDK 支持的桌面 / 服务器配置 | 由 defconfig 决定 | 自行编译，见 [SDK 与源码](/sdk-sources) |
| Armbian 构建 | 桌面版、服务器版 | 6.1.x vendor 内核 | 使用 `armbianEnv.txt` 配置生态的镜像 |

每个目录的文件名或随附的 `*.txt` 说明中都会标注内核版本、桌面环境和构建日期，
下载前先看清楚：2 GB 内存的板卡跑桌面版可以，但体验会明显偏慢。

## 默认账号

| 账号 | 密码 | 用途 |
|---|---|---|
| `tboard` | `tboard` | 日常使用账号，属于 `sudo` 组 |
| `root` | `root` | 管理员 |

首次启动后请立即修改两个密码：

```bash
passwd            # 当前用户
sudo passwd root  # 以 tboard 身份修改管理员密码
```

## 选择镜像格式

| 文件 | 介质 | 烧录工具 |
|---|---|---|
| `*.img`、`*.img.xz` | microSD 卡 | balenaEtcher、Win32DiskImager、`dd` |
| `update.img` | eMMC（整盘） | RKDevTool（Windows）、`upgrade_tool`（Linux） |
| `boot.img`、`rootfs.img`、`MiniLoaderAll.bin` | eMMC 分区 | RKDevTool 的 *Advanced* 页，用于调试 |

microSD 镜像与 `update.img` 出自同一套源码，差别只在打包方式，功能一致。
固件烧入步骤见[烧录镜像](/flashing)。

## 介质要求

- **microSD**：**≥ 32 GB**，SDHC / SDXC。
  虚标容量的卡会在首次启动扩容分区时失败——新卡先用 `f3` 或 `h2testw` 测一遍。
- **eMMC**：镜像必须能装下；16 GB 模组放不下为 32 GB 模组构建的桌面镜像。
- 启动顺序是 **eMMC 优先，其次 microSD**。验证刚烧好的 eMMC 前，请先拔掉旧卡。

## 烧录前检查

1. 对照丝印确认硬件版本，选择对应目录中的镜像。
2. 校验文件的 MD5（见[资料下载](/downloads)）。
3. 解压 `.xz` / `.zip`——烧录工具需要的是原始镜像，不是压缩包。
4. 准备好线材与接口：固件烧入需要 **USB 3.0** 口、USB A-to-A 线，以及接入
   Type-C 电源。

## 版本说明

内核、U-Boot 与根文件系统的变更会发布在[论坛](https://forum.tboard.org)。
请把版本说明与本地保存的镜像放在一起——它是两次构建之间改了什么的最好记录。

## 相关页面

- [资料下载](/downloads) — 资料索引与校验要求。
- [工具与驱动](/tools) — RKDevTool、SDDiskTool、`upgrade_tool`。
- [烧录镜像](/flashing) — 写入与升级的完整步骤。
- [首次启动](/first-boot) — 登录、串口与网络检查。

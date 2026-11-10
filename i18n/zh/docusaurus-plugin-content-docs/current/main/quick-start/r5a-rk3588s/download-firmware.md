---
title: "下载固件"
sidebar_label: "Download Firmware"
sidebar_position: 3
slug: "/download-firmware"
---

# 下载固件

![下载页截图占位图 800 x 450 px](/img/placeholder-800x450.png)

> 图片占位：**800 × 450 px**（建议用途：操作照片 / 截图）。后期请替换为
> 相同尺寸的真实图片。

## 选择正确的镜像

所有 R5A 镜像都发布在[资料下载](/downloads)页面。按顺序确认：

1. **板卡**：TBoard R5A。
2. **系统**：Debian 或 Ubuntu 镜像。
3. **目标**：microSD/SD 卡镜像，或 eMMC 用的 `update.img`。
4. **硬件版本**：如列出多个版本，请与手上的板卡版本对应。

## 烧录前校验

写入前先核对下载文件的 SHA-256 校验值：

```bash
sha256sum tboard-r5a-debian.img.xz
# 与下载链接旁发布的校验值比对
```

## 镜像类型速查

| 类型 | 写入工具 | 写入目标 |
|---|---|---|
| SD 卡镜像 | balenaEtcher / Rufus / `dd` | microSD 卡 |
| `update.img` | RKDevTool（Windows）或 upgrade_tool（Linux） | eMMC |

## 相关页面

- [资料下载](/downloads)
- [烧录镜像](/flashing) — 下一步。

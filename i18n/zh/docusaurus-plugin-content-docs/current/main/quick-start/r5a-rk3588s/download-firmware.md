---
title: "下载固件"
sidebar_label: "下载固件"
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
3. **存储**：使用eMMC或者microSD卡。
4. **硬件版本**：如列出多个版本，请与手上的板卡版本对应。

## 烧录前校验

写入前先核对下载文件的 MD5 校验值。下载页同时提供 `.img` 镜像与对应的
`-md5.txt` 校验值文件。

**Windows**（在 cmd 中输入命令）：

```bat
certutil -hashfile TBoard-R5A-ubuntu22.04-GNOME-V1.0.0.img MD5
:: 输出值与 -md5.txt 中公布的校验值比对
```

<img src="/img/r5a-md5-windows.png" alt="Windows 端使用 certutil 校验 MD5" width="700" />

**Linux**（`md5sum`）：

```bash
md5sum TBoard-R5A-debian11-Xfce-V1.0.0.img
# 输出值与 -md5.txt 中公布的校验值比对
```

<img src="/img/r5a-md5-linux.png" alt="Linux 端使用 md5sum 校验 MD5" width="700" />

## 相关页面

- [资料下载](/downloads)
- [烧录镜像](/flashing) — 下一步。

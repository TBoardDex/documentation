---
title: "烧录镜像"
sidebar_label: "Flashing"
sidebar_position: 4
slug: "/flashing"
---

# 烧录镜像

![烧录流程截图占位图 800 x 450 px](/img/placeholder-800x450.png)

> 图片占位：**800 × 450 px**（建议用途：操作照片 / 截图）。后期请替换为
> 相同尺寸的真实图片。

有两条烧录路径，都从[资料下载](/downloads)页面获取校验过的镜像开始。

## 方式一 — microSD 卡

1. 用 balenaEtcher、Rufus 或 `dd` 写入 SD 卡镜像：

```bash
xzcat tboard-r5a-debian.img.xz | sudo dd of=/dev/sdX bs=4M status=progress && sync
```

2. 弹出卡后插入 R5A 卡槽并上电——板卡优先从 microSD 启动。

## 方式二 — eMMC

**进入烧录模式**（板卡断电，用 USB 双公头 A 对 A 线连接 PC 与板上 USB 3.0 口）：

- **Loader 模式**：上电时把 Recovery 引脚与 GND 短接。
- **Maskrom 模式**：上电时把 Maskrom 引脚与 GND 短接（eMMC 中已有损坏引导
  程序时使用）。

**Windows**：安装 Rockchip USB 驱动，打开 RKDevTool，切到 *升级固件* 页，按
提示先擦除 Flash，加载 `update.img`，点击 *升级*。

**Linux**：使用 `upgrade_tool`（或 `rkdeveloptool`）写入同一个 `update.img`。

看到 *升级成功* 后再断开连接。

## 相关页面

- [首次开机](/first-boot) — 下一步。
- [USB](/usb) — 烧录应使用哪个接口。

---
title: "烧录镜像"
sidebar_label: "烧录镜像"
sidebar_position: 4
slug: "/flashing"
---

# 烧录镜像

![烧录流程截图占位图 800 x 450 px](/img/placeholder-800x450.png)

> 图片占位：**800 × 450 px**（建议用途：操作照片 / 截图）。后期请替换为
> 相同尺寸的真实图片。

从[资料下载](/downloads)页面获取校验过的 `update.img` 镜像开始。

## 接线与上电

用 USB 双公头 A 对 A 线把电脑连接到板载 **USB 3.0 烧写口**，同时用 USB
Type-C 线接到 **PWR IN** 口给开发板供电。板上至少要接入 eMMC 模块或
microSD 卡其中一个，安装方法见[组装与连接 · 接入存储](/assembly#2-接入存储)。

<img src="/img/r5a-flash-wiring.png" alt="固件烧入接线：USB 3.0 烧写口、Type-C 供电、Maskrom/Loader 短接点" width="700" />

## 安装驱动（Windows）

先安装 Rockchip 官方的 **DriverAssitant**（瑞芯微驱动助手）：

1. 解压后双击运行 `DriverInstall.exe`；
2. 在「瑞芯微驱动助手」窗口点击 **驱动安装**，等待进度条完成；
3. 弹出「安装驱动成功」提示后点击 **确定**。

<img src="/img/r5a-driver-install.png" alt="DriverAssitant 驱动安装步骤" width="700" />

## 固件烧入

打开瑞芯微开发工具（RKDevTool），底部显示 **「没有发现设备」**是正常的：

<img src="/img/r5a-rkdevtool-nodevice.png" alt="烧写工具未发现设备" width="700" />

此时用镊子或杜邦线把 **Maskrom 与 GND 短接**（或把 **Loader 与 GND 短接**）
再上电，分别进入 Maskrom 模式或 Loader 模式——两者都是烧录模式。工具底部
显示 **「发现一个 MASKROM 设备」**（或 LOADER 设备）后：

<img src="/img/r5a-rkdevtool-flash.png" alt="烧写工具发现 MASKROM 设备" width="700" />

1. 点击 **固件** 按钮选择需要烧录的 `update.img`；
2. 点击 **升级**，等待右侧日志下载固件完成，最终显示 **「下载固件成功」**。

烧录完成后断开 USB 线，重新上电即可启动。

## 相关页面

- [首次开机](/first-boot) — 下一步。
- [USB](/usb) — 烧录应使用哪个接口。

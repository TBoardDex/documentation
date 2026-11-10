---
title: "R5A（RK3588S）快速上手"
sidebar_label: "概览"
sidebar_position: 1
slug: "/quick-start"
---

# R5A（RK3588S）快速上手

![TBoard R5A 套件照片占位图 1200 x 675 px](/img/placeholder-1200x675.png)

> 图片占位：**1200 × 675 px**（建议用途：套装内容照片）。后期请替换为
> 相同尺寸的真实图片。

四个步骤，把 TBoard R5A 从开箱带到首次开机。板卡基于 Rockchip RK3588S
（8 核 CPU、Mali-G610 MP4 GPU、6 TOPS NPU）——完整规格见
[TBoard R5A](/tboard-r5a) 产品页。

## 开箱清单

- TBoard R5A 板卡
- 散热片 / 风扇套件（选配；长时间运行建议安装）

还需要自备：**5 V / 3 A USB Type-C** 电源适配器（板卡支持 5–23 V 宽输入）、
microSD 卡（Class 10 及以上，≥ 8 GB）或 eMMC 模块、Micro HDMI 线，以及可选的
3.3 V USB 转 TTL 串口线（调试串口）。

## 四步上手

1. [组装与连接](/assembly) — 安装散热、连接显示器、网络与电源。
2. [下载固件](/download-firmware) — 选择与 R5A 硬件版本匹配的镜像。
3. [烧录镜像](/flashing) — 写入 microSD 卡或 eMMC。
4. [首次开机](/first-boot) — 通过串口或显示器登录系统。

## 下一步

- [R5A 40-PIN 引脚定义](/r5a-pinout) 与其他 [Common](/common) 模块页 — 使用板卡接口。
- [基础编译](/basic-compile) — 交叉编译第一个程序。
- [TBoard R5A](/tboard-r5a) — 完整规格。

## 命名约定

本分区按板卡分组，分组标签同时标注主控型号：`R5A（RK3588S）`。新增板卡时，
在 `quick-start/` 下建立同名小写文件夹（`<board>-<soc>`），复制本目录的页面
集合，并在 `_category_.json` 中设置标签（如 `R5B（RK3576）`），让多平台板卡
在侧栏中一步可达。

## 相关页面

- [资料下载](/downloads)
- [论坛](https://forum.tboard.org)

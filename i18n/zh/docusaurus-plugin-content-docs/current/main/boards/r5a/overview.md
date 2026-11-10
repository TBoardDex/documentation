---
title: "TBoard R5A（RK3588S）"
sidebar_label: "概览"
sidebar_position: 1
slug: "/tboard-r5a"
---

# TBoard R5A

![TBoard R5A 板卡实拍占位图 1200 x 675 px](/img/placeholder-1200x675.png)

> 图片占位：**1200 × 675 px**（建议用途：板卡俯拍 / 主图）。后期请替换为
> 相同尺寸的真实图片。

## 产品概述

TBoard R5A 是基于 **Rockchip RK3588S**（8 nm 工艺）的单板计算机：8 核 CPU
（4× Cortex-A76 @ 2.4 GHz + 4× Cortex-A55 @ 1.8 GHz）、Mali-G610 MP4 GPU、
6 TOPS NPU，支持 8K 视频编解码，并在 **92 × 62 × 14.6 mm** 的紧凑板卡上提供
HDMI、DP、USB 3.0、MIPI CSI/DSI、40-pin 排针等完整接口。

典型应用场景：边缘 AI 与视觉、多媒体播放与数字标牌、工业网关、机器人主控，
以及通用 Linux 开发。

## 关键规格

| 项目 | 规格 |
|---|---|
| SoC | Rockchip RK3588S，8 nm |
| CPU | 4× Cortex-A76 @ 2.4 GHz + 4× Cortex-A55 @ 1.8 GHz（8 核 64 位） |
| GPU | ARM Mali-G610 MP4 |
| NPU | 6 TOPS（INT8），支持 INT4/INT8/INT16 混合运算，3 核 |
| 视频解码 | 8K@60 H.265/VP9/AVS2，8K@30 H.264，4K@60 AV1，1080P@60 MPEG-2/VC-1/VP8 |
| 视频编码 | 8K@30 H.265 / H.264 |
| 内存 | 2 / 4 / 8 / 16 / 32 GB，64 位 LPDDR4 / LPDDR4x |
| 存储 | 16 / 32 / 64 / 128 GB eMMC 模块；板载 16 MB SPI Flash |
| 无线 | Wi-Fi 6（802.11a/b/g/n/ac/ax），板载天线；蓝牙 5.2 |
| 以太网 | 1× RJ45 网口 |
| 视频输出 | 1× Micro HDMI（8Kp60），1× Mini DP（4Kp60） |
| 摄像头 | 1× MIPI CSI（兼容 IMX219，最大 3280×2464） |
| 显示 | 1× MIPI DSI（15-pin FFC，兼容树莓派规格 7 寸 800×480 屏幕） |
| USB | 2× USB 3.0，2× USB 2.0，1× USB Type-C（仅供电） |
| 音频 | ES8316 编解码器，3.5 mm 耳机接口（带麦克风） |
| 40-pin 排针 | GPIO / UART / I2C / SPI / PWM / CAN（见 [40-PIN Pinout](/r5a-pinout)） |
| RTC | 板载 HYM8563 实时时钟（`rtc0`） |
| 供电 | USB Type-C，推荐 5 V / 3 A，宽输入 5–23 V（±5 %） |
| 尺寸 | 92 × 62 × 14.6 mm，46.6 g，12 层 PCB |
| 温度 | 工作温度 0 °C ~ 80 °C |
| 系统镜像 | TBoard Debian / Ubuntu 镜像，见 [资料下载](/downloads) |

## 板卡布局

![TBoard R5A 板卡布局标注占位图 1200 x 675 px](/img/placeholder-1200x675.png)

> 图片占位：**1200 × 675 px**（建议用途：带标注的板卡布局图）。后期请替换为
> 相同尺寸的真实图片。

## 接口一览

| 接口 | 数量 | 说明 |
|---|---|---|
| Micro HDMI 输出 | 1 | 最高 8Kp60，使用 Micro HDMI 转 HDMI 线缆。 |
| Mini DP 输出 | 1 | 最高 4Kp60；Mini DP 转 HDMI 必须使用**有源**转换线。 |
| USB 3.0 | 2 | Host 接口；配合 USB 双公头线可用于 eMMC 烧录。 |
| USB 2.0 | 2 | Host 接口。 |
| USB Type-C（PWR IN） | 1 | 仅作电源输入，不是数据接口。 |
| MIPI CSI | 1 | 兼容 IMX219 摄像头模组。 |
| MIPI DSI | 1 | 15-pin FFC 屏幕接口，5 V / GND 由 40-pin 排针提供。 |
| 40-pin 排针 | 1 | GPIO / UART / I2C / SPI / PWM / CAN，见 [40-PIN Pinout](/r5a-pinout)。 |
| RJ45 | 1 | 以太网，默认 DHCP 自动获取 IP。 |
| 3.5 mm 耳机口 | 1 | 经 ES8316 输出耳机音频并输入麦克风。 |
| microSD 卡槽 | 1 | 启动盘或扩展存储（支持 SDR104）。 |
| eMMC 模块槽 | 1 | 16–128 GB 模块。 |
| SPI Flash | — | 板载 16 MB（存放引导程序）。 |

## 内存与存储选配

| 内存（LPDDR4/4x） | eMMC 可选容量 |
|---|---|
| 2 GB | 16 GB / 32 GB |
| 4 GB | 16 GB / 32 GB / 64 GB |
| 8 GB | 32 GB / 64 GB / 128 GB |
| 16 GB / 32 GB | 64 GB / 128 GB |

## 供电

- 供电接口：丝印 **PWR IN** 的 USB Type-C 口。
- 推荐电源：**5 V / 3 A**。宽输入范围：**5 V – 23 V（±5 %）**。
- 无有效散热时，主芯片表面温度可能超过 60 °C——长时间运行前请先装好
  散热片 / 风扇。

## 启动顺序

R5A **优先从 microSD 启动**，其次才是 eMMC。卡槽里残留旧镜像的卡时请留意
这一点。

## 相关页面

- [快速上手](/quick-start) — 组装、下载、烧录、首次开机。
- [40-PIN Pinout](/r5a-pinout) — 完整引脚表。
- [资料下载](/downloads) — 固件镜像与 SDK 源码。
- [论坛](https://forum.tboard.org)

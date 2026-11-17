---
title: "TBoard R5A（RK3588S）"
sidebar_label: "概览"
sidebar_position: 1
slug: "/tboard-r5a"
---

# TBoard R5A

<img src="/img/r5a-hero.png" alt="TBoard R5A 主图：Rockchip RK3588S 单板计算机"/>

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
| 存储 | 16 / 32 / 64 / 128 GB eMMC 模块 |
| 无线 | Wi-Fi 6（802.11a/b/g/n/ac/ax），板载天线；蓝牙 5.2 |
| 以太网 | 1× RJ45 网口 —— Realtek RTL8111/8168（PCIe），系统内接口名为 `enP4p65s0` |
| 视频输出 | 1× Micro HDMI（8Kp60），1× Mini DP（4Kp60） |
| 摄像头 | 1× MIPI CSI（兼容 IMX219 模组）；默认设备树未启用任何摄像头 sensor |
| 显示 | 1× MIPI DSI（15-pin FFC）；默认设备树无 panel 节点且背光已禁用 |
| USB | 2× USB 3.0，2× USB 2.0，1× USB Type-C（仅供电） |
| 音频 | ES8316 编解码器，3.5 mm 耳机接口（带麦克风） |
| 40-pin 排针 | GPIO / UART / I2C / SPI / PWM / CAN（见 [40-PIN Pinout](/r5a-pinout)） |
| RTC | 板载 HYM8563 实时时钟（`rtc0`） |
| 供电 | USB Type-C，推荐 5 V / 3 A，宽输入 5–23 V（±5 %） |
| 尺寸 | 92 × 62 × 14.6 mm，46.6 g，12 层 PCB |
| 温度 | 工作温度 0 °C ~ 80 °C |
| 系统镜像 | TBoard Debian / Ubuntu 镜像，见 [资料下载](/downloads) |

## 板卡布局

![TBoard R5A 板卡正面布局](/img/r5a-layout-front.jpg)

![TBoard R5A 板卡背面布局](/img/r5a-layout-back.jpg)

## 接口一览

| 接口 | 数量 | 说明 |
|---|---|---|
| Micro HDMI 输出 | 1 | 最高 8Kp60，使用 Micro HDMI 转 HDMI 线缆。 |
| Mini DP 输出 | 1 | 最高 4Kp60；Mini DP 转 HDMI 必须使用**有源**转换线。 |
| USB 3.0 | 2 | Host 接口；配合 USB 双公头线可用于固件烧入。 |
| USB 2.0 | 2 | Host 接口。 |
| USB Type-C（PWR IN） | 1 | 仅作电源输入，不是数据接口。 |
| MIPI CSI | 1 | 兼容 IMX219 摄像头模组。 |
| MIPI DSI | 1 | 15-pin FFC 屏幕接口，5 V / GND 由 40-pin 排针提供。 |
| 40-pin 排针 | 1 | GPIO / UART / I2C / SPI / PWM / CAN，见 [40-PIN Pinout](/r5a-pinout)。 |
| RJ45 | 1 | 以太网，默认 DHCP 自动获取 IP。 |
| 3.5 mm 耳机口 | 1 | 经 ES8316 输出耳机音频并输入麦克风。 |
| microSD 卡槽 | 1 | 启动盘或扩展存储（支持 SDR104）。 |
| eMMC 模块槽 | 1 | 16–128 GB 模块。 |

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

## 按键与指示灯

| 项目 | 数量 | 行为 |
|---|---|---|
| PWRON 按键 | 1 | 开关机与休眠唤醒 |
| Maskrom 按键 | 1 | 上电时按住即可进入 Maskrom 烧录模式 |
| 电源指示灯（红） | 1 | 供电正常时常亮 |
| 用户指示灯（绿） | 1 | 默认熄灭，可由用户态控制 |

排针上的 **Maskrom / Loader 引脚**可以实现与按键相同的效果：上电时把
`Maskrom`（或 `Loader`）引脚短接到 GND。用按键更稳妥，不会误碰到相邻引脚。

指示灯在系统中的类名为 `led1-r`（红灯，GPIO0_D0）与 `led2-g`（绿灯，GPIO0_C4），均来自板级 dts 的 `leds` 节点——请使用这两个准确名称：

```bash
ls /sys/class/leds/
echo 1 | sudo tee /sys/class/leds/led2-g/brightness          # 点亮
echo 0 | sudo tee /sys/class/leds/led2-g/brightness          # 熄灭
echo heartbeat | sudo tee /sys/class/leds/led2-g/trigger     # 心跳闪烁
```

红灯亮而绿灯不亮，说明内核在运行、只是 LED trigger 为 `none`，不是硬件故障。

## 硬件版本

| 版本 | 改动 |
|---|---|
| V1.0 | 首个量产版本 |
| V1.1 | U27 / U7 / U6301 电源引脚调整；USB 走线调整（U15 改到 TypeC0，CN31 改为 USB 2.0）；40-pin 增加 UART 保护并改用 0.8 mm 连接器；CSI1 改到 I2C4 并去掉 R6352；Wi-Fi 模组更换为 AIC8800（SDIO 4-bit） |

对照原理图测量前，先确认丝印上的版本号。完整改动列表见[硬件资料](/hardware-files)。

## 启动顺序

R5A **优先从 eMMC 启动**，其次才是 microSD。卡槽里残留旧镜像的卡时请留意
这一点。

## 硬件实测说明

以下数值来自一台 TBoard R5A（Debian 11 镜像）与板级设备树的实际
读数，用于更正本页早前的描述：

| 项目 | 硬件实际值 |
|---|---|
| SDK / U-Boot | SDK `rk3588_linux_release_v1.6.0`；U-Boot 2017.09 |
| 以太网 | Realtek RTL8111/8168 走 PCIe（`r8168`，PCI ID `10ec:8168`），接口名 **`enP4p65s0`**，不是 `eth0` |
| 无线 | **AIC8800**，4-bit SDIO @ 50 MHz（`wifi_chip_type = "aic8800"`，SDIO ID `5449:0145`）；蓝牙 5.2 走 `uart9m2` |
| eMMC | `mmcblk0` 约 58.2 GiB 可用（64 GB 模组），HS400 |
| 显示 | HDMI-A-1 `connected`、DP-1 `disconnected`；未添加 panel 节点前没有 DSI connector |
| SPI | `&spi2` 上挂着 RK806 PMIC（`spi2.0`）；没有 `/dev/spidev*`；SPI0/3/4 均关闭 |
| 摄像头 | 没有 CSI sensor 节点，也没有 `/dev/media*`，只有 VPU 节点 `/dev/video-dec0` 与 `/dev/video-enc0` |
| 指示灯 | `led1-r`（红）与 `led2-g`（绿） |
| RTC | `rtc0` = `rtc-hym8563 6-0051`；没有备份电池时时钟会回到 2021-01-01 |
| 看门狗 | 默认设备树中不存在，见[其他](/others)页的看门狗小节 |
| 根文件系统 | `rootfs` 是固定的 14 GiB 分区，首启只扩展 `userdata` |
## 相关页面

- [快速上手](/quick-start) — 组装、下载、烧录、首次开机。
- [40-PIN Pinout](/r5a-pinout) — 完整引脚表。
- [资料下载](/downloads) — 固件镜像与 SDK 源码。
- [论坛](https://forum.tboard.org)

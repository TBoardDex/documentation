---
title: "通用"
sidebar_label: "概览"
sidebar_position: 1
slug: "/common"
---

# 通用

![Common 分区总览占位图 1200 x 675 px](/img/placeholder-1200x675.png)

> 图片占位：**1200 × 675 px**（建议用途：接法照片 / 接线示意图）。后期请替换为
> 相同尺寸的真实图片。

本分区记录所有基于 Rockchip SoC 的 TBoard 板卡共有的平台级知识：GPIO 编号与
控制、调试串口、低速总线，以及 SoC 的 USB / 显示 / 摄像头 / 音频能力。
板卡专属细节——40-pin 引脚定义、接口数量、板载编解码器、支持的摄像头模组
——位于 Boards 下对应板卡的页面，例如 [TBoard R5A](/tboard-r5a)。

## 接口模块

| 页面 | 内容 |
|---|---|
| [GPIO](/gpio) | GPIO 编号规则、查找控制器、读写方法 |
| [UART 与串口](/uart-serial) | 调试串口（1500000 波特率）与通用串口 |
| [I2C](/i2c) | 总线扫描、挂载设备 |
| [SPI](/spi) | spidev 验证、设备树启用 |
| [PWM](/pwm) | PWM 用法、舵机与风扇控制 |
| [USB](/usb) | Host 接口、供电预算、USB 烧录 |
| [显示](/display) | HDMI / DP / MIPI DSI 输出与屏幕配置 |
| [摄像头](/camera) | MIPI CSI 采集与摄像头模组 |
| [音频](/audio) | ALSA 通路、HDMI/DP 音频、耳机口 |

某块板子的具体引脚分配，请阅读 Boards 下该板的引脚定义页——例如
[R5A 40-PIN 引脚定义](/r5a-pinout)。

## 相关页面

- [开发板](/tboard-r5a) — 板卡规格与引脚定义。
- [快速上手](/quick-start) — 引导式上手流程。
- [资料下载](/downloads) — 镜像、SDK 与设计文件。

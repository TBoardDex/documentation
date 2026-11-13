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
控制、调试串口、低速总线，以及 SoC 的 USB / 显示 / 摄像头 / 音频能力。这里的
内容不针对任何具体型号：同一套命令在所有板卡上都适用，差别只在引脚分配与默认
启用的功能。

板卡专属细节——40-pin 引脚定义、各 UART / I2C / SPI / PWM 通道的引脚位置、
默认启用哪些功能、支持的摄像头模组与接口规格——请查看左侧导航 Boards 分类下
对应板卡的页面。

## 本分区的约定

- 除特别说明外，电平均为 **3.3 V**。5 V 引脚在各板卡引脚定义中标出，SoC 引脚
  不耐 5 V。
- 可选接口**默认关闭**，通过设备树 overlay 启用。配置文件取决于是哪一类镜像，
  见 [Linux](/linux#设备树与-overlay)。
- 一个引脚同一时刻**只有一个功能**：启用 I2C、SPI、UART、PWM 或 CAN 后，该引脚
  就不再是普通 GPIO。
- 命令示例默认使用 Debian / Ubuntu 镜像上的默认用户账号配合 `sudo`；Armbian
  镜像的部分路径略有差异。

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

## 相关页面

- Boards — 各板卡的规格、引脚定义与接口使用页，见左侧导航 Boards 分类。
- [快速上手](/quick-start) — 引导式上手流程。
- [资料下载](/downloads) — 镜像、SDK 与设计文件。

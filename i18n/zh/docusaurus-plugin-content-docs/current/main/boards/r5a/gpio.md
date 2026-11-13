---
title: "GPIO 使用（R5A）"
sidebar_label: "GPIO"
sidebar_position: 3
slug: "/r5a-gpio"
---

# GPIO 使用（R5A）

GPIO 的架构与编号计算、sysfs / libgpiod 控制命令、复用查看与排障方法见
[GPIO](/gpio)，本页只列 R5A 板级内容。

## 40-pin 扩展接口

R5A 的 40-pin 排针与常见树莓派式传感器、扩展板兼容，所有逻辑电平均为
**3.3 V**。完整引脚表（GPIO 编号、可选复用功能与颜色图例）见
[R5A 40-PIN 引脚定义](/r5a-pinout#引脚表)。

在外设功能未启用时，所有引脚都可作普通 GPIO 使用。Pin 11、12、13、15、22、37、40
在参考设计中无默认外设功能，是按键、LED 与继电器的稳妥选择；Pin 7（SPDIF1_TX）
与 Pin 32（PWM2，板载风扇）在出厂设备树中已被占用，使用前请先确认。启用其余
复用功能需修改设备树，配置方法见各接口文档（如 [I2C（R5A）](/r5a-i2c)）。

## 稳妥 GPIO 速查

| 排针 | 信号 | sysfs 全局编号 | libgpiod（chip，偏移） |
|---|---|---|---|
| Pin 11 | GPIO4_A0 | 128 | 4，0 |
| Pin 12 | GPIO1_A7 | 39 | 1，7 |
| Pin 13 | GPIO4_A1 | 129 | 4，1 |
| Pin 15 | GPIO4_A2 | 130 | 4，2 |
| Pin 22 | GPIO1_B0 | 40 | 1，8 |
| Pin 37 | GPIO4_A7 | 135 | 4，7 |
| Pin 40 | GPIO3_C3 | 115 | 3，19 |

控制命令与注意事项见 [GPIO](/gpio)。

## 相关页面

- [GPIO](/gpio) — 通用架构、编号计算、控制命令与排障表。
- [R5A 40-PIN 引脚定义](/r5a-pinout) — 完整排针表（含复用功能标注）。

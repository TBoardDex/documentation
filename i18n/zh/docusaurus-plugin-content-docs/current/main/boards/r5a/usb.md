---
title: "USB（R5A）"
sidebar_label: "USB"
sidebar_position: 8
slug: "/r5a-usb"
---

# USB（R5A）

[USB](/usb) 页中的通用规则对 R5A 完全适用，本页给出接口列表以及兼作烧录口
的端口。

## R5A 上的 USB 接口

| 接口 | 类型 | 作用 |
|---|---|---|
| USB 3.0 × 2 | Type-A，主机 | 固态硬盘、摄像头、HUB |
| USB 2.0 × 2 | Type-A，主机 | 键鼠、USB 转串口 |
| USB-C | 供电输入 | **PWR IN**，5 V – 23 V |

其中一个 USB 3.0 Type-A 口兼作**烧录 / OTG** 口：板卡处于 Maskrom 或 Loader
模式时，用 A-to-A 线把它接到 PC 即可烧录。

## 供电

**5 V / 3 A** 的 Type-C 电源可以覆盖板卡加一块总线供电的 2.5 英寸硬盘。板卡
不做 PD 协商，请使用固定电压输出的电源。机械硬盘与多个大电流设备需要带电源的
HUB；供电预算与传输速率规则见 [USB](/usb)。

## 相关页面

- [USB](/usb) — 供电预算、UAS 速率、烧录流程。
- [工具与驱动](/tools) — 驱动与烧录工具。
- [概览](/tboard-r5a) — 接口布局与接口汇总。

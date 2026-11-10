---
title: "USB"
sidebar_label: "USB"
sidebar_position: 7
slug: "/usb"
---

# USB

![USB 接口实拍占位图 800 x 450 px](/img/placeholder-800x450.png)

> 图片占位：**800 × 450 px**（建议用途：接法照片 / 接线示意图）。后期请替换为
> 相同尺寸的真实图片。

每块 TBoard 板卡都提供 USB Host 接口（USB 3.0 / USB 2.0）和一个 USB Type-C
电源输入。具体的接口数量、接口类型以及哪个接口兼作 OTG/烧录口由板卡决定
——请查看对应板卡页面，例如 [TBoard R5A](/tboard-r5a)。

## 确认设备

```bash
lsusb
dmesg | tail    # 插入设备后观察枚举过程
```

## 供电预算

请使用板卡规格推荐的电源适配器（R5A：5 V / 3 A）。总线供电的机械硬盘或多个
大功率设备建议使用带独立供电的 USB Hub，否则峰值负载时电压可能被拉低。

## 通过 USB 烧录

大多数 TBoard 板卡通过 USB OTG 接口配合 USB 双公头（A-to-A）线烧录 eMMC
——参见[烧录镜像](/flashing)。

## 相关页面

- [烧录镜像](/flashing)
- [TBoard R5A](/tboard-r5a)

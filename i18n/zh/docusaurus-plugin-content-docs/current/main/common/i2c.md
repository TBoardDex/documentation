---
title: "I2C"
sidebar_label: "I2C"
sidebar_position: 4
slug: "/i2c"
---

# I2C

![I2C 总线连接占位图 800 x 450 px](/img/placeholder-800x450.png)

> 图片占位：**800 × 450 px**（建议用途：接法照片 / 接线示意图）。后期请替换为
> 相同尺寸的真实图片。

TBoard 板卡在 40-pin 排针上引出 I2C 总线，用于连接传感器、RTC 等低速外设。
所有总线均为 **3.3 V** 电平、板载上拉。引出的总线数量、总线编号与引脚位置
由板卡决定——请查看对应板卡的引脚定义，例如
[R5A 40-PIN 引脚定义](/r5a-pinout)（I2C1 在 Pin 3/5，I2C6 在 Pin 27/28）。

## 扫描总线

总线编号由内核分配，不同镜像可能不同。先找到总线，再扫描：

```bash
ls /dev/i2c-*
i2cdetect -y 1        # 扫描总线 1
i2cdetect -y 6        # 扫描总线 6
```

地址显示 `UU` 表示该地址已被驱动占用；显示数字表示有设备在该地址响应。

## 挂载设备

接入新设备最干净的方式是使用 TBoard 镜像自带的设备树 overlay（在
`/boot/extlinux/extlinux.conf` 或镜像的 overlay 管理器中启用）。快速测试可用
`i2cget`/`i2cset` 读写，正式使用则加载对应的驱动模块。

## 相关页面

- [R5A 40-PIN 引脚定义](/r5a-pinout) — R5A 的 I2C 引脚。
- [SPI](/spi) — 另一种常用低速总线。

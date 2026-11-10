---
title: "SPI"
sidebar_label: "SPI"
sidebar_position: 5
slug: "/spi"
---

# SPI

![SPI 总线接线占位图 800 x 450 px](/img/placeholder-800x450.png)

> 图片占位：**800 × 450 px**（建议用途：接法照片 / 接线示意图）。后期请替换为
> 相同尺寸的真实图片。

RK3588(S) 提供硬件 SPI 控制器，TBoard 板卡将其引到 40-pin 排针。具体引出哪个
控制器、占用哪些引脚由板卡决定——请查看对应板卡的引脚定义，例如
[R5A 40-PIN 引脚定义](/r5a-pinout)（SPI0，带两个片选）。逻辑电平为
**3.3 V**。

## 验证总线

启用 `spidev` 接口后会出现一个或多个 `/dev/spidev*` 节点。最快的验证方法是
MOSI 与 MISO 回环测试：

```bash
ls /dev/spidev*
# 短接 MOSI 与 MISO，发送字节并确认原样返回
```

用你顺手的 spidev 测试工具，或几行 Python（`spidev` 包）发送字节并确认
原样返回即可。

## 挂载设备

显示屏、ADC、CAN 控制器等设备通过设备树 overlay 接入。overlay 负责选择片选
线与最大时钟频率——使用杜邦线时超过 50 MHz 前请先核对器件手册。

## 相关页面

- [R5A 40-PIN 引脚定义](/r5a-pinout) — R5A 的 SPI 引脚。
- [I2C](/i2c) — 低速传感器总线。

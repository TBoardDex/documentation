---
title: "GPIO 编号与控制"
sidebar_label: "GPIO"
sidebar_position: 2
slug: "/gpio"
---

# GPIO 编号与控制

![GPIO 接线占位图 800 x 450 px](/img/placeholder-800x450.png)

> 图片占位：**800 × 450 px**（建议用途：接法照片 / 接线示意图）。后期请替换为
> 相同尺寸的真实图片。

Rockchip SoC 的 GPIO 按组（GPIO0 – GPIO4）编号，每组再分为 A–D 四组、每组
8 个引脚。Linux 全局 GPIO 编号由引脚名推导：

```
全局编号 = bank × 32 + group × 8 + index
```

例如 GPIO4_A3 = 4 × 32 + 0 + 3 = **131**。每个 GPIO 具体引到排针的哪个引脚
由板卡决定——请查看 Boards 下对应板卡的引脚定义页，例如
[R5A 40-PIN 引脚定义](/r5a-pinout)。

## 找到对应的 GPIO 控制器

`/dev/gpiochip*` 的 chip 编号在不同镜像下可能不同，先列出确认：

```bash
gpioinfo
```

全局编号 131（GPIO4_A3）对应第四个控制器的第 3 号线。

## GPIO 读写

```bash
gpioset gpiochip4 3=1   # 输出高电平
gpioset gpiochip4 3=0   # 输出低电平
gpioget gpiochip4 3     # 读取输入
```

## 一引脚一功能

同一引脚同一时刻只能有一种功能。通过设备树启用复用功能
（I2C / SPI / UART / PWM / CAN）后，该引脚即从普通 GPIO 切换为复用功能，
反之亦然。

## 相关页面

- [R5A 40-PIN 引脚定义](/r5a-pinout) — R5A 每个引脚的定义。
- [PWM](/pwm) — PWM 通道用法。

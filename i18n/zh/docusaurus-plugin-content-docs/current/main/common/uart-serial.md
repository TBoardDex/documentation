---
title: "UART 与串口"
sidebar_label: "UART 与串口"
sidebar_position: 3
slug: "/uart-serial"
---

# UART 与串口

![USB 串口线接法占位图 800 x 450 px](/img/placeholder-800x450.png)

> 图片占位：**800 × 450 px**（建议用途：接法照片 / 接线示意图）。后期请替换为
> 相同尺寸的真实图片。

TBoard 板卡遵循 Rockchip 的串口惯例：一路 **1500000 波特率的调试串口**，加上
若干引到 40-pin 排针的通用串口。每个串口占用哪些引脚由板卡决定——请查看
对应板卡的引脚定义，例如 [R5A 40-PIN 引脚定义](/r5a-pinout)。

## 调试串口

串口参数：**1500000 波特率，8 数据位，1 停止位，无校验，无流控**。请使用
**3.3 V TTL** 电平的 USB 转 TTL 串口线，不要直接接 RS-232 电平转换器。
R5A 的调试串口位于 Pin 8（TX）/ Pin 10（RX），GND 接 Pin 6。

```bash
# Linux
sudo picocom -b 1500000 /dev/ttyUSB0
# 或
sudo minicom -D /dev/ttyUSB0 -b 1500000
```

Windows 下用 PuTTY / MobaXterm，参数相同。通过调试串口无需显示器即可看到
U-Boot 输出和 Linux 登录提示。

## 通用串口

设备节点由内核分配，取决于设备树启用的复用配置：

```bash
ls -l /dev/ttyS*
dmesg | grep ttyS
```

回环测试（短接 TX 与 RX）是确认节点最快的方法：

```bash
stty -F /dev/ttyS1 115200 raw -echo
cat /dev/ttyS1 & printf 'hello\n' > /dev/ttyS1
```

## 相关页面

- [R5A 40-PIN 引脚定义](/r5a-pinout) — 各串口在排针上的位置。
- [首次开机](/first-boot) — 首次启动时如何使用串口。

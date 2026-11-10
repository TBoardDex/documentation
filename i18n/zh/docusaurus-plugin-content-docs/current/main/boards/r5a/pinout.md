---
title: "R5A 40-PIN 引脚定义"
sidebar_label: "引脚定义"
sidebar_position: 2
slug: "/r5a-pinout"
---

# R5A 40-PIN 引脚定义

![40-pin 排针实拍占位图 800 x 450 px](/img/placeholder-800x450.png)

> 图片占位：**800 × 450 px**（建议用途：接法照片 / 接线示意图）。后期请替换为
> 相同尺寸的真实图片。

R5A 提供 40-pin 排针，兼容大多数树莓派规格的传感器与扩展板。所有逻辑电平为
**3.3 V**——请勿把 5 V 逻辑电平直接接到 GPIO 引脚上。多数引脚默认是 GPIO；
下表列出的 I2C / SPI / UART / PWM / CAN 功能是设备树启用的复用功能。

## 引脚定义

`系统编号` 为 Linux 全局 GPIO 编号：`bank × 32 + group × 8 + index`，例如
GPIO4_A3 = 4 × 32 + 0 + 3 = **131**。

| 信号功能 | 系统编号 | 引脚 | 引脚 | 系统编号 | 信号功能 |
|---|---|---|---|---|---|
| 3V3 | — | 1 | 2 | — | 5V0 |
| I2C1_SDA \| GPIO0_D5 | `/dev/i2c1` sda | 3 | 4 | — | 5V0 |
| I2C1_SCL \| GPIO0_D4 | `/dev/i2c1` scl | 5 | 6 | — | GND |
| GPIO1_B7 \| PWM3_M3 | gpio 47 | 7 | 8 | — | TXD（UART2 调试） |
| GND | — | 9 | 10 | — | RXD（UART2 调试） |
| GPIO4_A0 | gpio 128 | 11 | 12 | gpio 39 | GPIO1_A7 |
| GPIO4_A1 | gpio 129 | 13 | 14 | — | GND |
| GPIO4_A2 | gpio 130 | 15 | 16 | `/dev/ttyS2` uart txd | UART6_TX_M1 \| GPIO1_A1 |
| 3V3 | — | 17 | 18 | `/dev/ttyS2` uart rxd | UART6_RX_M1 \| GPIO1_A0 |
| SPI0_MOSI_M2 | spi mosi | 19 | 20 | — | GND |
| SPI0_MISO_M2 | spi miso | 21 | 22 | gpio 40 | GPIO1_B0 |
| SPI0_CLK_M2 | spi clk | 23 | 24 | spi cs 0 | SPI0_CS0_M2 |
| GND | — | 25 | 26 | spi cs 1 | SPI0_CS1_M2 |
| I2C6_SDA_M3 | `/dev/i2c6` sda | 27 | 28 | `/dev/i2c6` scl | I2C6_SCL_M3 |
| GPIO4_A3 \| UART0_TXD_M2 | gpio 131 | 29 | 30 | — | GND |
| GPIO4_A4 \| UART0_RXD_M2 | gpio 132 | 31 | 32 | gpio 105 | PWM2 |
| GPIO4_A5 \| UART3_TXD_M2 | gpio 133 | 33 | 34 | — | GND |
| GPIO4_A6 \| UART3_RXD_M2 | gpio 134 | 35 | 36 | gpio 138 | GPIO4_B2 \| CAN1_RXD_M1 |
| GPIO4_A7 | gpio 135 | 37 | 38 | gpio 139 | GPIO4_B3 \| CAN1_TXD_M1 |
| GND | — | 39 | 40 | gpio 115 | GPIO3_C3 |

## 功能分组

| 功能 | 引脚 | 说明 |
|---|---|---|
| 3.3 V | 1、17 | 与板载逻辑共用，注意总电流。 |
| 5 V | 2、4 | 直接来自 Type-C 输入电源。 |
| GND | 6、9、14、20、25、30、34、39 | |
| I2C1 | 3（SDA）/ 5（SCL） | `/dev/i2c1` |
| I2C6 | 27（SDA）/ 28（SCL） | `/dev/i2c6` |
| UART2 | 8（TX）/ 10（RX） | 调试串口，1500000 波特率 8N1 |
| UART6 | 16（TX）/ 18（RX） | `/dev/ttyS2`，M1 复用 |
| UART0 | 29（TX）/ 31（RX） | M2 复用 |
| UART3 | 33（TX）/ 35（RX） | M2 复用 |
| SPI0 | 19（MOSI）/ 21（MISO）/ 23（CLK）/ 24（CS0）/ 26（CS1） | M2 复用 |
| PWM2 | 32 | gpio 105 |
| PWM3 | 7 | M3 复用，与 GPIO1_B7（gpio 47）共用 |
| CAN1 | 36（RX）/ 38（TX） | M1 复用 |
| 普通 GPIO | 11、12、13、15、22、37、40 | gpio 128、39、129、130、40、135、115 |

同一引脚同一时刻只能有一种功能：启用 29/31 上的 UART0 就会占用这两个 GPIO，
UART3、SPI0、I2C、CAN1 同理。

## GPIO 读写

先列出 GPIO 控制器与引脚（不同镜像下 chip 编号可能不同）：

```bash
gpioinfo
```

全局编号 131（GPIO4_A3）对应第四个控制器的第 3 号线：

```bash
gpioset gpiochip4 3=1   # 输出高电平
gpioset gpiochip4 3=0   # 输出低电平
gpioget gpiochip4 3     # 读取输入
```

## 相关页面

- [UART 与串口](/uart-serial) — 调试串口与排针上的其他串口。
- [I2C](/i2c) · [SPI](/spi) · [PWM](/pwm) — 各总线详情。
- [R5A 快速上手](/quick-start) — 从开箱到首次开机。

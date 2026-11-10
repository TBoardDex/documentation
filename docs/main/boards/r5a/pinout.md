---
title: "R5A 40-PIN Pinout"
sidebar_label: "Pinout"
sidebar_position: 2
slug: "/r5a-pinout"
---

# R5A 40-PIN Pinout

![40-pin header photo placeholder 800 x 450 px](/img/placeholder-800x450.png)

> Image placeholder: **800 × 450 px** (suggested use: connection photo /
> wiring diagram). Replace it later with a verified image of the same dimensions.

The R5A provides a 40-pin header compatible with most Raspberry-Pi-style
sensors and HATs. All logic levels are **3.3 V** — do not feed 5 V logic into
GPIO pins. Most pins are GPIO by default; the I2C / SPI / UART / PWM / CAN
functions listed below are alternate (muxed) functions enabled by the device
tree.

## Pinout

`System no.` is the Linux global GPIO number: `bank × 32 + group × 8 + index`,
for example GPIO4_A3 = 4 × 32 + 0 + 3 = **131**.

| Signal | System no. | Pin | Pin | System no. | Signal |
|---|---|---|---|---|---|
| 3V3 | — | 1 | 2 | — | 5V0 |
| I2C1_SDA \| GPIO0_D5 | `/dev/i2c1` sda | 3 | 4 | — | 5V0 |
| I2C1_SCL \| GPIO0_D4 | `/dev/i2c1` scl | 5 | 6 | — | GND |
| GPIO1_B7 \| PWM3_M3 | gpio 47 | 7 | 8 | — | TXD (UART2 debug) |
| GND | — | 9 | 10 | — | RXD (UART2 debug) |
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

## Signal groups

| Function | Pins | Notes |
|---|---|---|
| 3.3 V | 1, 17 | Shared with onboard logic, keep total draw in mind. |
| 5 V | 2, 4 | Direct from the Type-C input rail. |
| GND | 6, 9, 14, 20, 25, 30, 34, 39 | |
| I2C1 | 3 (SDA) / 5 (SCL) | `/dev/i2c1` |
| I2C6 | 27 (SDA) / 28 (SCL) | `/dev/i2c6` |
| UART2 | 8 (TX) / 10 (RX) | Debug console, 1500000 baud 8N1 |
| UART6 | 16 (TX) / 18 (RX) | `/dev/ttyS2`, M1 mux |
| UART0 | 29 (TX) / 31 (RX) | M2 mux |
| UART3 | 33 (TX) / 35 (RX) | M2 mux |
| SPI0 | 19 (MOSI) / 21 (MISO) / 23 (CLK) / 24 (CS0) / 26 (CS1) | M2 mux |
| PWM2 | 32 | gpio 105 |
| PWM3 | 7 | M3 mux, shared with GPIO1_B7 (gpio 47) |
| CAN1 | 36 (RX) / 38 (TX) | M1 mux |
| Plain GPIO | 11, 12, 13, 15, 22, 37, 40 | gpio 128, 39, 129, 130, 40, 135, 115 |

A pin carries only one function at a time: enabling UART0 on pins 29/31 takes
those GPIOs away, and the same applies to UART3, SPI0, I2C and CAN1.

## Reading and writing GPIO

List the GPIO chips and lines (chip numbering can differ between images):

```bash
gpioinfo
```

Global number 131 (GPIO4_A3) maps to line 3 of the fourth chip:

```bash
gpioset gpiochip4 3=1   # output high
gpioset gpiochip4 3=0   # output low
gpioget gpiochip4 3     # read input
```

## Related

- [UART & Serial](/uart-serial) — console and the other UARTs on this header.
- [I2C](/i2c) · [SPI](/spi) · [PWM](/pwm) — bus details.
- [R5A Quick Start](/quick-start) — from box to first boot.

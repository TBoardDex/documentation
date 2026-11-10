---
title: "GPIO Numbering & Control"
sidebar_label: "GPIO"
sidebar_position: 2
slug: "/gpio"
---

# GPIO Numbering & Control

![GPIO wiring placeholder 800 x 450 px](/img/placeholder-800x450.png)

> Image placeholder: **800 × 450 px** (suggested use: connection photo /
> wiring diagram). Replace it later with a verified image of the same dimensions.

Rockchip SoCs organise GPIO as numbered banks (GPIO0 – GPIO4), each bank split
into groups A–D of 8 pins. The Linux global GPIO number is derived from the pin
name:

```
global no. = bank × 32 + group × 8 + index
```

For example GPIO4_A3 = 4 × 32 + 0 + 3 = **131**. Which physical header pin each
GPIO is routed to is board-specific — see your board's pinout page under
Boards, for example the [R5A 40-PIN Pinout](/r5a-pinout).

## Find the right chip

Chip numbering under `/dev/gpiochip*` can differ between images, so list them
first:

```bash
gpioinfo
```

Global number 131 (GPIO4_A3) maps to line 3 of the fourth chip.

## Read and write

```bash
gpioset gpiochip4 3=1   # output high
gpioset gpiochip4 3=0   # output low
gpioget gpiochip4 3     # read input
```

## One function per pin

A pin carries only one function at a time. Enabling an alternate function
(I2C / SPI / UART / PWM / CAN) through the device tree takes the pin away from
plain GPIO, and the reverse.

## Related

- [R5A 40-PIN Pinout](/r5a-pinout) — which pin is which on the R5A.
- [PWM](/pwm) — PWM channel usage.

---
title: "Common"
sidebar_label: "Overview"
sidebar_position: 1
slug: "/common"
---

# Common

![Common section overview placeholder 1200 x 675 px](/img/placeholder-1200x675.png)

> Image placeholder: **1200 × 675 px** (suggested use: connection photo /
> wiring diagram). Replace it later with a verified image of the same dimensions.

This section documents the platform-level knowledge shared by every TBoard
board built on a Rockchip SoC: GPIO numbering and control, the debug serial
console, low-speed buses, and the USB / display / camera / audio capabilities
of the SoC. Everything here is board-agnostic: the same commands work on every
board, only the pin assignment and the enabled-by-default functions differ.

Board-specific details — the 40-pin pinout, which UART/I2C/SPI/PWM channels are
routed where, which functions are enabled by default, supported camera modules
and connectors — are documented on the page of your board under
**Boards**, next to its 40-pin table.

## Conventions used here

- Logic level is **3.3 V** unless a page says otherwise. Pins that carry 5 V are
  marked in the board pinout, and the SoC pins are not 5 V tolerant.
- Optional interfaces are **off by default**; they are enabled by a device-tree
  overlay. The configuration file depends on the image family — see
  [Linux](/linux#device-tree-and-overlays).
- A pin carries **one function at a time**: enabling I2C, SPI, UART, PWM or CAN
  on a pin takes it away from plain GPIO.
- Command examples assume the default `tboard` account with `sudo` on a Debian or
  Ubuntu image; paths differ slightly on Armbian-based images.

## Interface modules

| Page | Contents |
|---|---|
| [GPIO](/gpio) | GPIO numbering rules, finding chips, reading and writing |
| [UART & Serial](/uart-serial) | Debug console (1500000 baud) and general-purpose UARTs |
| [I2C](/i2c) | Scanning buses, attaching devices |
| [SPI](/spi) | spidev verification, device-tree enablement |
| [PWM](/pwm) | PWM usage, servo and fan control |
| [USB](/usb) | Host ports, power budget, USB flashing |
| [Display](/display) | HDMI / DP / MIPI DSI output and panel setup |
| [Camera](/camera) | MIPI CSI capture and camera modules |
| [Audio](/audio) | ALSA paths, HDMI/DP audio, headset jacks |

## Related pages

- Boards — each board's specifications, pinout and interface usage page, in the Boards section of the sidebar.
- [Quick Start](/quick-start) — the guided first-setup path.
- [Downloads](/downloads) — images, SDK and design files.

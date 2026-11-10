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
of the SoC. Board-specific details — the 40-pin pinout, connector counts,
onboard codecs, supported camera modules — live on each board's page under
[Boards](/tboard-r5a).

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

For the concrete pin assignment of a given board, read its pinout page under
Boards — for example the [R5A 40-PIN Pinout](/r5a-pinout).

## Related pages

- [Boards](/tboard-r5a) — board specifications and pinouts.
- [Quick Start](/quick-start) — the guided first-setup path.
- [Downloads](/downloads) — images, SDK and design files.

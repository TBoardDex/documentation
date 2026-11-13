---
title: "TBoard R5A (RK3588S)"
sidebar_label: "Overview"
sidebar_position: 1
slug: "/tboard-r5a"
---

# TBoard R5A

![TBoard R5A board photo placeholder 1200 x 675 px](/img/placeholder-1200x675.png)

> Image placeholder: **1200 × 675 px** (suggested use: board top view / hero photo).
> Replace it later with a verified image of the same dimensions.

## Overview

TBoard R5A is a single-board computer built on the **Rockchip RK3588S** (8 nm).
It pairs an octa-core CPU (4× Cortex-A76 @ 2.4 GHz + 4× Cortex-A55 @ 1.8 GHz)
with a Mali-G610 MP4 GPU and a 6 TOPS NPU, supports 8K video decode/encode, and
exposes a full set of maker-friendly interfaces (HDMI, DP, USB 3.0, MIPI CSI/DSI,
40-pin header) on a compact **92 × 62 × 14.6 mm** board.

Typical use cases: edge AI and vision, multimedia players and signage, industrial
gateways, robotics controllers, and general Linux development.

## Key specifications

| Item | Specification |
|---|---|
| SoC | Rockchip RK3588S, 8 nm |
| CPU | 4× Cortex-A76 @ 2.4 GHz + 4× Cortex-A55 @ 1.8 GHz (8-core 64-bit) |
| GPU | ARM Mali-G610 MP4 |
| NPU | 6 TOPS (INT8), supports INT4/INT8/INT16 mixed operation, 3 cores |
| Video decode | 8K@60 H.265/VP9/AVS2, 8K@30 H.264, 4K@60 AV1, 1080P@60 MPEG-2/VC-1/VP8 |
| Video encode | 8K@30 H.265 / H.264 |
| RAM | 2 / 4 / 8 / 16 / 32 GB, 64-bit LPDDR4 / LPDDR4x |
| Storage | 16 / 32 / 64 / 128 GB eMMC module; onboard 16 MB SPI Flash |
| Wireless | Wi-Fi 6 (802.11a/b/g/n/ac/ax) with onboard antenna; Bluetooth 5.2 |
| Ethernet | 1× RJ45 Ethernet port |
| Video out | 1× Micro HDMI (8Kp60), 1× Mini DP (4Kp60) |
| Camera | 1× MIPI CSI (IMX219-compatible, max 3280×2464) |
| Display | 1× MIPI DSI (15-pin FFC, Raspberry-Pi-style 7″ 800×480 panel supported) |
| USB | 2× USB 3.0, 2× USB 2.0, 1× USB Type-C (power only) |
| Audio | ES8316 codec, 3.5 mm headset jack (with mic) |
| 40-pin header | GPIO / UART / I2C / SPI / PWM / CAN (see [40-PIN Pinout](/r5a-pinout)) |
| RTC | Onboard HYM8563 RTC (`rtc0`) |
| Power | USB Type-C, 5 V / 3 A recommended, wide input 5–23 V (±5 %) |
| Dimensions | 92 × 62 × 14.6 mm, 46.6 g, 12-layer PCB |
| Temperature | 0 °C ~ 80 °C operating |
| OS images | TBoard Debian / Ubuntu images, see [Downloads](/downloads) |

## Board layout

![TBoard R5A board layout — front](/img/r5a-layout-front.jpg)

![TBoard R5A board layout — back](/img/r5a-layout-back.jpg)

## Interface summary

| Connector | Qty | Notes |
|---|---|---|
| Micro HDMI out | 1 | Up to 8Kp60. Use a Micro-HDMI → HDMI cable. |
| Mini DP out | 1 | Up to 4Kp60. Mini DP → HDMI requires an **active** converter cable. |
| USB 3.0 | 2 | Host ports; also used for firmware flashing with a USB dual-male cable. |
| USB 2.0 | 2 | Host ports. |
| USB Type-C (PWR IN) | 1 | Power input only, not a data port. |
| MIPI CSI | 1 | IMX219-compatible camera module. |
| MIPI DSI | 1 | 15-pin FFC display connector, 5 V / GND supplied from the 40-pin header. |
| 40-pin header | 1 | GPIO / UART / I2C / SPI / PWM / CAN, see [40-PIN Pinout](/r5a-pinout). |
| RJ45 | 1 | Ethernet, DHCP by default. |
| 3.5 mm jack | 1 | Headphone out + microphone in via ES8316. |
| microSD slot | 1 | Boot device or extra storage (SDR104 capable). |
| eMMC module slot | 1 | 16–128 GB modules. |
| SPI Flash | — | 16 MB onboard (bootloader). |

## Memory and storage options

| RAM (LPDDR4/4x) | eMMC options |
|---|---|
| 2 GB | 16 GB / 32 GB |
| 4 GB | 16 GB / 32 GB / 64 GB |
| 8 GB | 32 GB / 64 GB / 128 GB |
| 16 GB / 32 GB | 64 GB / 128 GB |

## Power supply

- Power input: the USB Type-C connector marked **PWR IN**.
- Recommended adapter: **5 V / 3 A**. Wide input range: **5 V – 23 V (±5 %)**.
- Without active cooling the main SoC can exceed 60 °C under load — attach the
  heatsink/fan kit before long-running workloads.

## Buttons and LEDs

| Item | Qty | Behaviour |
|---|---|---|
| PWRON button | 1 | Power on / off and sleep-wake |
| Maskrom button | 1 | Hold while applying power to enter Maskrom flashing mode |
| Power LED (red) | 1 | Always on while the board is powered correctly |
| User LED (green) | 1 | Off by default, controlled from user space |

The Maskrom and Loader **pins** on the header achieve the same thing as the
button: short the pin named `Maskrom` (or `Loader`) to GND while powering up. The
button is the safer option because it cannot slip onto a neighbouring pin.

The user LED is a normal LED-class device:

```bash
ls /sys/class/leds/
echo 1 | sudo tee /sys/class/leds/led2-green-usr/brightness          # on
echo 0 | sudo tee /sys/class/leds/led2-green-usr/brightness          # off
echo heartbeat | sudo tee /sys/class/leds/led2-green-usr/trigger     # blink
```

The green LED staying dark while the red one is lit means the kernel is running
but the LED trigger is set to `none` — it is not a hardware fault.

## Board revisions

| Revision | Changes |
|---|---|
| V1.0 | Initial release |
| V1.1 | Power-rail pin changes on U27 / U7 / U6301; USB re-routing (U15 to TypeC0, CN31 to USB 2.0); 40-pin header gained UART protection and 0.8 mm connectors; CSI1 moved to I2C4, R6352 removed; Wi-Fi module changed to AP6275P |

Check the silkscreen marking before comparing a measurement with the schematic.
The full change list is in [Hardware Files](/hardware-files).

## Boot order

The R5A boots from **eMMC first**, then microSD. Keep this in mind when a card
with an old image is left inserted.

## Related

- [Quick Start](/quick-start) — assemble, download, flash, first boot.
- [40-PIN Pinout](/r5a-pinout) — full pinout table.
- [Downloads](/downloads) — firmware images and SDK sources.
- [Forum](https://forum.tboard.org)

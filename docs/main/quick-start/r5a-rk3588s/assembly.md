---
title: "Assembly & Connections"
sidebar_label: "Assembly"
sidebar_position: 2
slug: "/assembly"
---

# Assembly & Connections

![assembly steps photo placeholder 800 x 450 px](/img/placeholder-800x450.png)

> Image placeholder: **800 × 450 px** (suggested use: procedure photo /
> screenshot). Replace it later with a verified image of the same dimensions.

## 1. Install cooling

Attach the heatsink to the SoC. For sustained loads also mount the fan — the
RK3588S can exceed 60 °C without airflow. Keep the fins clear of the 40-pin
header and camera/display ribbon connectors.

## 2. Connect storage

Insert the eMMC module into its slot, or a microSD card (Class 10, ≥ 8 GB) into
the card slot. Note the boot order: **microSD first**, then eMMC.

## 3. Connect display

- **HDMI**: Micro-HDMI → HDMI cable to the Micro HDMI port (up to 8Kp60).
- **DP**: Mini DP to a DP monitor directly (4Kp60), or to HDMI with an
  **active** converter only.
- **MIPI DSI panel**: 15-pin FFC ribbon to the DSI connector, plus 5 V / GND
  from 40-pin Pin 2 / Pin 6 — see [Display](/display).

## 4. Network and peripherals

- Ethernet: plug in an RJ45 cable (DHCP by default), or use the onboard
  Wi-Fi 6 / Bluetooth 5.2.
- Keyboard and mouse: any of the four USB-A ports (2× USB 3.0, 2× USB 2.0).
- Debug console (optional): 3.3 V USB-to-serial adapter to Pin 8 (TX) /
  Pin 10 (RX), GND on Pin 6 — see [UART & Serial](/uart-serial).

## 5. Pre-power-on checklist

- [ ] Cooling mounted, no loose parts on the board
- [ ] Boot media inserted (card or eMMC)
- [ ] Display connected (if you want local output)
- [ ] 5 V / 3 A Type-C adapter at hand — the **PWR IN** port only, not the
      USB 3.0 ports

## Related

- [Download Firmware](/download-firmware) — next step.
- [TBoard R5A](/tboard-r5a) — connector map.

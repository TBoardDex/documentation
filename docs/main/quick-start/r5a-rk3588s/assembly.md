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

![cooling installation photo placeholder 800 x 450 px](/img/placeholder-800x450.png)

> Image placeholder: **800 × 450 px** (suggested use: heatsink / fan installation
> photo). Replace it later with a verified image of the same dimensions.

## 2. Connect storage

Insert the eMMC module into its slot, or a microSD card (≥ 32 GB) into
the card slot. Note the boot order: **eMMC first**, then microSD.

![eMMC module and microSD slot locations (board back)](/img/r5a-storage-install.png)

## 3. Connect display

- **HDMI**: pick either wiring option:
  - A **Micro-HDMI-to-HDMI-female adapter** plus a standard HDMI cable: plug the
    adapter into the board's Micro HDMI port, then connect the display with the
    standard HDMI cable;

  ![Micro HDMI to HDMI female adapter](/img/r5a-hdmi-female-adapter.png)

  - A single **Micro-HDMI-to-HDMI-male cable** (Micro HDMI male → HDMI male):
    connects straight to an HDMI monitor.

  ![Micro HDMI to HDMI male cable](/img/r5a-hdmi-direct-cable.png)

- **DP**: pick either wiring option:
  - A **Mini-DP-to-HDMI cable** (active): for an HDMI monitor — DP to HDMI only
    works with an **active** solution;

  ![Mini DP to HDMI cable](/img/r5a-minidp-hdmi.png)

  - A **Mini-DP-to-DP cable**: connects straight to a DP monitor.

  ![Mini DP to DP cable](/img/r5a-minidp-dp.png)
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

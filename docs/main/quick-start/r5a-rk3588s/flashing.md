---
title: "Flashing the Image"
sidebar_label: "Flashing"
sidebar_position: 4
slug: "/flashing"
---

# Flashing the Image

![flashing procedure screenshot placeholder 800 x 450 px](/img/placeholder-800x450.png)

> Image placeholder: **800 × 450 px** (suggested use: procedure photo /
> screenshot). Replace it later with a verified image of the same dimensions.

Start from a verified `update.img` from the [Downloads](/downloads) page.

## Wiring and power-up

Connect the PC to the onboard **USB 3.0 flashing port** with a dual-male USB
A-to-A cable, and power the board through the **PWR IN** Type-C port at the
same time. At least one of the eMMC module or the microSD card must be
installed — see [Assembly · Connect storage](/assembly#2-connect-storage).

<img src="/img/r5a-flash-wiring.png" alt="Firmware flashing wiring: USB 3.0 port, Type-C power, Maskrom/Loader pads" width="700" />

## Install the driver (Windows)

Install Rockchip's official **DriverAssistant** first:

1. Extract the package and run `DriverInstall.exe`;
2. In the DriverAssistant window click **驱动安装** (Install Driver) and wait
   for the progress bar to finish;
3. Click **确定** (OK) when the "安装驱动成功" (driver installed) dialog appears.

<img src="/img/r5a-driver-install.png" alt="DriverAssistant driver installation steps" width="700" />

## Flashing the firmware

Open the Rockchip development tool (RKDevTool). **No devices found** at the
bottom is normal at this point:

<img src="/img/r5a-rkdevtool-nodevice.png" alt="RKDevTool with no device found" width="700" />

Short the **Maskrom pad to GND** (or the **Loader pad to GND**) with tweezers
or a jumper wire while applying power to enter Maskrom or Loader mode — both
are flashing modes. Once the tool reports **a MASKROM (or LOADER) device
found**:

<img src="/img/r5a-rkdevtool-flash.png" alt="RKDevTool with a MASKROM device found" width="700" />

1. Click the **固件** (Firmware) button and pick the `update.img` to flash;
2. Click **升级** (Upgrade) and wait until the log on the right finishes,
   ending with **下载固件成功** (firmware download succeeded).

Disconnect the USB cable when done and power cycle the board to boot.

## Related

- [First Boot](/first-boot) — next step.
- [USB](/usb) — which port to use for flashing.

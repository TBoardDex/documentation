---
title: "USB"
sidebar_label: "USB"
sidebar_position: 7
slug: "/usb"
---

# USB

![USB ports photo placeholder 800 x 450 px](/img/placeholder-800x450.png)

> Image placeholder: **800 × 450 px** (suggested use: connection photo /
> wiring diagram). Replace it later with a verified image of the same dimensions.

Every TBoard board provides USB host ports (USB 3.0 / USB 2.0) and a USB
Type-C power input. The exact port count, connector types and which port also
works as an OTG/flashing port are board-specific — see your board's page, for
example [TBoard R5A](/tboard-r5a).

## Verify devices

```bash
lsusb
dmesg | tail    # plug a device in and watch enumeration
```

## Power budget

Use the power adapter recommended in your board's specification (for the R5A:
5 V / 3 A). Bus-powered spinning disks or multiple high-draw devices should use
a powered hub, otherwise the supply may sag during peak load.

## Flashing over USB

Most TBoard boards flash eMMC over a USB OTG port using a USB dual-male
(A-to-A) cable — see [Flashing the Image](/flashing).

## Related

- [Flashing the Image](/flashing)
- [TBoard R5A](/tboard-r5a)

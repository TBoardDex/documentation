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

Two flashing paths are available. Both start from a verified image from the
[Downloads](/downloads) page.

## Option A — microSD card

1. Write the SD-card image with balenaEtcher, Rufus, or `dd`:

```bash
xzcat tboard-r5a-debian.img.xz | sudo dd of=/dev/sdX bs=4M status=progress && sync
```

2. Eject the card, insert it into the R5A slot, and power on — the board boots
   from microSD first.

## Option B — eMMC

**Enter flash mode** (board powered off, USB dual-male A-to-A cable from PC to
a USB 3.0 port):

- **Loader mode**: hold the Recovery pin shorted to GND while applying power.
- **Maskrom mode**: hold the Maskrom pin shorted to GND while applying power
  (used when eMMC already contains a broken bootloader).

**On Windows**: install the Rockchip USB driver, open RKDevTool, switch to
*Upgrade Firmware*, erase the flash if asked, load `update.img`, and click
*Upgrade*.

**On Linux**: use `upgrade_tool` (or `rkdeveloptool`) with the same `update.img`.

Wait for *Upgrade success* before disconnecting.

## Related

- [First Boot](/first-boot) — next step.
- [USB](/usb) — which port to use for flashing.

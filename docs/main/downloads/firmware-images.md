---
title: "Firmware & OS Images"
sidebar_label: "Firmware Images"
sidebar_position: 3
slug: "/firmware-images"
---

# Firmware & OS Images

![Firmware image selection flow placeholder 960 x 540 px](/img/placeholder-960x540.png)

> Image placeholder: **960 × 540 px** (suggested use: build or download flow diagram). Replace it later
> with a verified image of the same dimensions.

All images for the R5A are published in the **Linux image** section of the
[TBoard Drive](https://drive.google.com/drive/folders/1x2KOX1F4-DVyyV_9qfdH28PWIORcWH56).
Pick the folder for your board, then the file that matches your board revision.

## Available images

| System | Variants | Kernel | Notes |
|---|---|---|---|
| Debian 11 | Xfce desktop | 6.1.x (Rockchip BSP) | The SDK produces `debian11-Xfce-<date>`; good for headless servers and gateways |
| Ubuntu 22.04 LTS | GNOME desktop, server | 6.1.x (Rockchip BSP) | The SDK produces `ubuntu22.04-GNOME-<date>` and `ubuntu22.04-Server-<date>` |
| TBoard SDK build | Any desktop / server the SDK supports | Selected by the defconfig | Build it yourself, see [SDK & Sources](/sdk-sources) |

Only these three rootfs flavours are produced by the TBoard SDK — there is no
Armbian variant in the release set. Each folder lists the kernel version,
desktop environment and build date in the
file name or the accompanying `*.txt` note. Read it before downloading: a
desktop image on a 2 GB board is possible but slow.

## Default accounts

| Account | Password | Use |
|---|---|---|
| `tboard` | `tboard` | Everyday user, member of `sudo` |
| `root` | `root` | Administrator |

Change both passwords after the first boot:

```bash
passwd            # current user
sudo passwd root  # administrator, as tboard
```

## Choose the image format

| File | Media | Flashing tool |
|---|---|---|
| `*.img`, `*.img.xz` | microSD card | balenaEtcher, Win32DiskImager, `dd` |
| `update.img` | eMMC (whole disk) | RKDevTool (Windows), `upgrade_tool` (Linux) |
| `boot.img`, `rootfs.img`, `MiniLoaderAll.bin` | eMMC partitions | RKDevTool *Advanced* tab, for debugging |

The microSD image and the `update.img` are built from the same source tree; they
differ in packaging, not in features. Flashing steps are described in
[Flashing the Image](/flashing).

## Media requirements

- **microSD**: **16 GB minimum**, SDHC/SDXC. `parameter-tboard.txt` reserves about
  14.2 GiB before the growing `userdata` partition (rootfs alone is 14 GiB, boot 64 MiB,
  oem 128 MiB, backup 32 MiB, misc and uboot 8 MiB each), so a 16 GB card boots
  but leaves only a few hundred MiB for userdata — use 32 GB when you can. Cards that
  report fake capacity fail during first-boot `userdata` expansion; test new cards with
  `f3` or `h2testw`.
- **eMMC**: a **16 GB** module is the minimum for the same reason; 32 GB or larger
  gives the grown `userdata` partition useful room.
- The board boots **eMMC first, then microSD**. Remove any old card before
  testing a freshly flashed eMMC.

## Before you flash

1. Confirm the board revision on the silkscreen and pick the matching folder.
2. Check the MD5 of the file (see [Downloads](/downloads)).
3. Decompress `.xz`/`.zip` archives — flashing tools load the raw image, not the
   archive.
4. Have the right cable and port ready: firmware flashing uses the **USB 3.0**
   port and a USB A-to-A cable plus a Type-C power supply.

## Release notes

Kernel, U-Boot and rootfs changes are announced on the
[forum](https://forum.tboard.org). Keep the release note next to the image you
keep locally — it is the only record of what changed between two builds with
different dates.

## Related

- [Downloads](/downloads) — resource index and checksum policy.
- [Tools & Drivers](/tools) — RKDevTool, `upgrade_tool`.
- [Flashing the Image](/flashing) — step-by-step write and upgrade.
- [First Boot](/first-boot) — login, console and network checks.

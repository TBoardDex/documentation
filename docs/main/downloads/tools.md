---
title: "Tools & Drivers"
sidebar_label: "Tools"
sidebar_position: 5
slug: "/tools"
---

# Tools & Drivers

![Flashing toolchain overview placeholder 960 x 540 px](/img/placeholder-960x540.png)

> Image placeholder: **960 × 540 px** (suggested use: build or download flow diagram). Replace it later
> with a verified image of the same dimensions.

Every tool below is published in the **Development tools** section of the
[TBoard Drive](https://drive.google.com/drive/folders/1x2KOX1F4-DVyyV_9qfdH28PWIORcWH56).
Most are portable archives — unzip and run, no installer.

## Windows

| Tool | Executable | Purpose |
|---|---|---|
| RK Driver Assistant | `DriverInstall.exe` | USB driver for Maskrom / Loader mode. Uninstall the old driver first |
| RKDevTool | `RKDevTool.exe` | Flash `update.img` to eMMC, flash single partitions, erase SPI NOR |
| SDDiskTool | `SD_Firmware_Tool.exe` | Write a Rockchip image to a microSD card in *SD Boot* mode |
| SDCardFormatter | `SDCardFormatterv5_WinEN.exe` | Restore a card that flashing tools no longer detect |
| FactoryTool | `FactoryTool.exe` | Batch flashing for production |
| SN / MAC writer | vendor tool | Write serial number and MAC address in the vendor partition |
| CH340 driver | `CH341SER.EXE` | USB-to-serial adapter used for the debug console |
| MobaXterm | portable | Serial console and SSH client in one window |

Run every flashing tool **as administrator**. If RKDevTool reports
`Download Boot Fail`, the cause is almost always the cable, a USB hub, or a
front-panel port — use a rear port and the shortest cable you have.

## Linux and macOS

| Tool | Purpose |
|---|---|
| `upgrade_tool` (Rockchip) | Flash `update.img` from a Linux host over USB |
| `rkdeveloptool` | Open-source alternative for the same job |
| `dd` / `xzcat` | Write a microSD image |
| balenaEtcher | Cross-platform microSD writer with verification |

`upgrade_tool` lives in the SDK at `tools/linux/Linux_Upgrade_Tool/`:

```bash
sudo ./upgrade_tool ld                     # list connected devices and the mode
sudo ./upgrade_tool uf update.img          # write and reboot
sudo ./upgrade_tool uf update.img -noreset # write, keep the device in Loader mode
```

`ld` prints `Mode=Maskrom` or `Mode=Loader`. If nothing is listed, the board is
not in flashing mode or the USB cable carries no data.

## Entering flashing mode

| Mode | How to enter | When to use |
|---|---|---|
| Maskrom | Short the **Maskrom** pin to GND while applying power | eMMC empty or bootloader broken |
| Loader | Short the **Loader**/Recovery pin to GND while applying power | Normal upgrade, or after `reboot loader` |
| ADB | Booted system with USB debugging | `RKDevTool` can switch an ADB device to Rockusb |

Flashing requires **two** connections: the USB A-to-A cable from the PC to a
USB 3.0 port for data, and the Type-C supply into **PWR IN** for power.

## Erase SPI NOR (last resort)

Leftover boot data in SPI flash can stop a new image from starting:

1. In RKDevTool open **Advanced**, load `MiniLoaderAll.bin`, click **Download**.
2. Select storage **SPINOR**, click **Switch Storage**, then **Erase All**.
3. Power-cycle into Maskrom and flash `update.img` again.

## Which tool for which image

| Image | Tool |
|---|---|
| `*.img` / `*.img.xz` for microSD | balenaEtcher, Win32DiskImager, `dd` |
| `update.img` for eMMC | RKDevTool (Windows) or `upgrade_tool` (Linux) |
| Single partition for debugging | RKDevTool **Advanced** tab, `upgrade_tool di -p` |

## Related

- [Firmware Images](/firmware-images) — which image to download.
- [Flashing the Image](/flashing) — the full procedure.
- [USB](/usb) — ports, cables and power budget.
- [UART & Serial](/uart-serial) — serial adapter wiring for the console.

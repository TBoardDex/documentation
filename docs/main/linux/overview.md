---
title: "Linux"
sidebar_label: "Overview"
sidebar_position: 1
slug: "/linux"
---

# Linux

![TBoard Linux system overview placeholder 960 x 540 px](/img/placeholder-960x540.png)

> Image placeholder: **960 × 540 px** (suggested use: system / boot flow diagram). Replace it later
> with a verified image of the same dimensions.

TBoard Linux images are Rockchip BSP builds: a vendor 6.1 kernel, a Debian or
Ubuntu root filesystem and U-Boot with the R5A board support added. This page
covers what to do **after** the image boots — accounts, network, packages,
kernel and overlays. Flashing is on [Flashing the Image](/flashing).

## System baseline

| Item | Value |
|---|---|
| Distributions | Debian 11, Ubuntu 22.04 LTS (desktop and server variants) |
| Kernel | 6.1.x vendor kernel, `arch/arm64` |
| Bootloader | U-Boot 2017.09 with TPL/SPL |
| Hostname | `tboard-r5a` |
| Default accounts | `tboard` / `tboard`, `root` / `root` |
| Serial console | `ttyFIQ0`, **1500000** baud, 8N1 |

```bash
uname -a                 # kernel and build date
cat /etc/os-release      # distribution version
cat /proc/device-tree/model   # board model string
neofetch                 # one-screen summary
```

## Serial console

The debug UART is enabled on every image and is the only output available when
the system fails before the display comes up:

```text
ttyFIQ0: 1500000 8N1, no flow control
```

Wiring and terminal settings are on [UART & Serial](/uart-serial). Keep the
console at 1500000 baud — the Rockchip FIQ debugger does not follow a changed
kernel `console=` baud rate.

## Network

Ethernet comes up with DHCP on first boot; Wi-Fi needs credentials.

```bash
ip a                              # all interfaces and addresses
nmcli dev wifi list               # visible SSIDs
sudo nmcli dev wifi connect <SSID> password '<password>' ifname wlan0
sudo nmtui                        # menu-driven alternative
```

Static address on the wired interface:

```bash
sudo nmcli c modify 'Wired connection 1' ipv4.address 192.168.10.13/24
sudo nmcli c modify 'Wired connection 1' ipv4.method manual
sudo nmcli c modify 'Wired connection 1' ipv4.gateway 192.168.10.1
sudo nmcli c modify 'Wired connection 1' ipv4.dns 8.8.8.8
sudo nmcli c up 'Wired connection 1'
```

`ipv4.address` must be set **before** `ipv4.method manual`, otherwise the
connection falls back to DHCP. Replace `<SSID>` and the addresses with your own
values. Changing the hostname:

```bash
sudo hostnamectl set-hostname my-gateway
```

## Packages and mirrors

```bash
sudo apt update
sudo apt upgrade
```

Official images point at the vendor mirror. If a mirror is unreachable from your
network, replace it in `/etc/apt/sources.list` (Debian) or
`/etc/apt/sources.list.d/*.list` (Ubuntu) with a local mirror of the same
release, then run `sudo apt update` again.

Rockchip user-space libraries (MPP, RGA, NPU runtime) are already installed. Do
not remove `libmpp*`, `librga*` or `librknnrt` — the multimedia and AI samples
depend on them.

## Device tree and overlays

The board device tree is loaded from `/boot/dtb/rockchip/`; the active one is
symlinked as `/boot/dtb/rk-kernel.dtb`. Optional hardware — 40-pin functions,
camera, display, fan — is enabled by overlays, and **the configuration file
depends on which image family you booted**:

| Image family | Configuration file | Overlay directory | Syntax |
|---|---|---|---|
| TBoard SDK image | `/boot/uEnv/uEnv.txt` | `/boot/dtb/overlay/` | `dtoverlay=/dtb/overlay/<name>.dtbo`, one line each |
| Armbian-based image | `/boot/armbianEnv.txt` | `/boot/dtb/rockchip/overlay/` | `overlays=<name> <name>` on one line |
| Ubuntu-rockchip image | `/boot/firmware/ubuntEnv.txt` | `/boot/firmware/dtbs/rockchip/overlay/` | `overlays=<name> <name>` on one line |

Enable an overlay by removing the leading `#` (SDK image) or by adding its name
to the `overlays=` list, then `sync` and reboot:

```bash
sudo vi /boot/uEnv/uEnv.txt
sync
sudo reboot
```

Always `sync` before cutting power — an unsynchronised `uEnv.txt` can leave the
board unbootable. The overlay names for each interface are listed on the
interface pages (governed by the same rule: only one pin-mux variant per
controller, e.g. `uart3-m1` **or** `uart3-m2`).

## Kernel updates

Two routes:

```bash
# 1. from the Debian packages built by the SDK
sudo dpkg -i linux-image-*.deb linux-headers-*.deb
sudo reboot

# 2. directly from the source tree, replacing the files on the boot partition
./build.sh kernel      # on the build host, then copy extboot.img / dtb to the board
```

Keep the previous kernel and `rk-kernel.dtb` on a backup partition or SD card
before upgrading — the serial console is the only recovery path if the new
kernel does not reach userspace.

## Storage

```bash
lsblk                # devices and partitions
df -h                # free space per filesystem
```

The root filesystem is expanded to the full media size on first boot. `/var/log`
is a zram device in the default image, so logs do not wear the eMMC but are lost
on reboot; mount a real partition there for long-running deployments.

## Accelerators

| Block | Software | Verify |
|---|---|---|
| NPU (6 TOPS) | `librknnrt`, RKNN-Toolkit2 on the host | `cat /sys/kernel/debug/rknpu/version` |
| GPU (Mali-G610) | Panfrost / vendor driver, OpenGL ES, Vulkan | `glxinfo -B`, `vulkaninfo` |
| VPU | MPP, GStreamer `mpp*` plugins, FFmpeg with `rkmpp` | `gst-inspect-1.0 mppvideodec` |

Only RKNN models converted with the matching RKNN-Toolkit2 version and target
platform `rk3588` load on the board. A version mismatch is reported as
`rknn_init failed` with an `invalid model` message.

## Monitoring

```bash
htop                     # CPU load per core
cat /proc/cpuinfo        # core list and features
cat /sys/class/thermal/thermal_zone0/temp   # SoC temperature, millidegrees
sudo cat /sys/kernel/debug/clk/clk_summary  # clock tree, when debugging frequency
```

## Related

- [Firmware Images](/firmware-images) — which image to install.
- [First Boot](/first-boot) — login and first checks.
- [SDK & Sources](/sdk-sources) — building a custom image.
- [UART & Serial](/uart-serial) — the recovery console.
- [Others](/others) — board information, file transfer, RTC and watchdog.

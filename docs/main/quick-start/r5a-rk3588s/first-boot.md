---
title: "First Boot"
sidebar_label: "First Boot"
sidebar_position: 5
slug: "/first-boot"
---

# First Boot

![first boot serial console screenshot placeholder 800 x 450 px](/img/placeholder-800x450.png)

> Image placeholder: **800 × 450 px** (suggested use: procedure photo /
> screenshot). Replace it later with a verified image of the same dimensions.

## Power on

Connect the 5 V / 3 A adapter to the **PWR IN** Type-C port. The red power LED
stays lit while power is present; the green user LED is off by default and can
be controlled from software after boot.

The board boots from microSD first, then eMMC. First boot may take a minute
while the image expands its root filesystem.

## Log in

**With a display**: the desktop session starts automatically.

**With the serial console** (recommended for headless setups): 3.3 V
USB-to-serial adapter on Pin 8 / Pin 10, **1500000 baud, 8N1, no flow control**:

```bash
sudo picocom -b 1500000 /dev/ttyUSB0
```

Log in with the default account published with your image release notes
(credentials differ per image; change the password immediately after first
login).

## First-boot checks

```bash
uname -a                      # kernel version
ls /dev/video* /dev/i2c-*     # interfaces visible
ip a                          # Ethernet got a DHCP address
ping -c3 docs.tboard.org      # outbound network
```

## If it does not boot

- Re-check the boot order — an old microSD card wins over eMMC.
- Watch the serial console for U-Boot output; no output usually means power or
  cabling issues.
- Re-flash and try again — see [Flashing the Image](/flashing).

## Related

- [UART & Serial](/uart-serial)
- [Basic Compilation](/basic-compile) — build your first program.

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

The board boots from eMMC first, then microSD. First boot may take a minute
while the image expands its root filesystem.

## Log in

**With the debug serial console** : the debug
UART is on 40-pin **Pin 8 (TX) / Pin 10 (RX)**, with GND on Pin 6. Use a 3.3 V
USB-to-serial adapter and cross the data lines: the board's TX (Pin 8) goes to
the adapter's **RX**, the board's RX (Pin 10) goes to the adapter's **TX**, and
GND to GND:

<img src="/img/r5a-serial-wiring.png" alt="Debug serial wiring: GND RX TX" width="700" />

Serial settings: **1500000 baud, 8 data bits, no parity, 1 stop bit**.

Default accounts (change the passwords immediately after first login):

| Account | Password | Note |
|---|---|---|
| `tboard` | `tboard` | everyday user |
| `root` | `root` | administrator |

After login you reach the TBoard welcome screen:

<img src="/img/r5a-serial-login.png" alt="TBoard welcome screen after serial login" width="700" />

**With a display**: the desktop session starts automatically; log in directly.

## First-boot checks

```bash
uname -a                      # kernel version
ifconfig                      # Ethernet got a DHCP address
ping -c3 docs.tboard.org      # outbound network
```

## If it does not boot

- Re-check the boot media — the card in the microSD slot is used only when the
  eMMC has no bootable system.
- Watch the serial console for U-Boot output; no output usually means power or
  cabling issues.
- Re-flash and try again — see [Flashing the Image](/flashing).

## Related

- [UART & Serial](/uart-serial)
- [Basic Compilation](/basic-compile) — build your first program.

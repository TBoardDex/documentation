---
title: "UART & Serial Console"
sidebar_label: "UART & Serial"
sidebar_position: 3
slug: "/uart-serial"
---

# UART & Serial Console

Rockchip-based boards follow the same serial convention: one **debug console**
running at 1500000 baud plus a number of general-purpose UARTs that can be
routed to the 40-pin header. Which UART occupies which pins — and which of them
are enabled in the default image — is board-specific; see your board's pinout
and interface page under Boards.

## Debug console

Serial parameters: **1500000 baud, 8 data bits, 1 stop bit, no parity, no flow
control**. Use a **3.3 V TTL** USB-to-serial adapter — never connect an RS-232
level adapter directly. The console TX/RX pins and the GND pin are listed in
your board's pinout.

```bash
# Linux
sudo picocom -b 1500000 /dev/ttyUSB0
# or
sudo minicom -D /dev/ttyUSB0 -b 1500000
```

On Windows use PuTTY / MobaXterm with the same parameters. The console shows
U-Boot output and the Linux login prompt without a display.

The console is `ttyFIQ0`, driven by Rockchip's FIQ debugger, not by a normal
8250 port. Two consequences: the baud rate is fixed by the device tree (only
115200 and 1500000 are supported) and changing `console=` on the kernel command
line does not move the console to another UART.

Wire **TX to RX, RX to TX** and GND to GND. A console that prints nothing but
shows a solid cursor is usually a baud-rate mismatch; garbage characters mean
the ground wire is missing.

## General-purpose UARTs

General-purpose UARTs are **off by default** on most boards; they are enabled
by a device-tree overlay. List the overlays that exist on your image rather
than trusting a file name from a blog post — the name encodes the SoC, board
and mux:

```bash
ls /boot/dtb/overlay/ | grep uart          # TBoard SDK image
ls /boot/dtb/rockchip/overlay/ | grep uart # Armbian-based image
```

Enable the overlay in the configuration file of your image family (see
[Linux](/linux#device-tree-and-overlays)), then `sync` and reboot.

Device node numbers come from `aliases` in the board device tree, so confirm
them instead of guessing:

```bash
ls -l /dev/ttyS*
dmesg | grep -i "ttyS\|uart"
```

## Loopback test

Short TX to RX with a jumper and check that the data comes back:

```bash
stty -F /dev/ttyS1 115200 raw -echo
cat /dev/ttyS1 &
printf 'hello\n' > /dev/ttyS1
```

If `hello` appears, the controller, pin mux and level shifting are all working.
Then move on to the real device: set the baud rate and framing your peripheral
expects (`stty -F /dev/ttyS1 9600 cs8 -cstopb -parenb`), and remember that
Rockchip UARTs support up to 4 Mbaud but long jumper wires rarely do.

## Writing from an application

`/dev/ttyS*` is a normal character device: `open()`, `termios` for the line
settings, `read()` / `write()` for data. Prefer a library (Python `pyserial`,
C++ `asio::serial_port`) so timeouts and partial reads are handled. If a port
disappears after a reboot, the overlay is not applied — not a driver bug.

## Related

- [First Boot](/first-boot) — using the console during first startup.
- [Linux](/linux#device-tree-and-overlays) — enabling overlays.
- [GPIO](/gpio) — using the same pins as plain GPIO instead.

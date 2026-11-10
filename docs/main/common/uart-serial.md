---
title: "UART & Serial Console"
sidebar_label: "UART & Serial"
sidebar_position: 3
slug: "/uart-serial"
---

# UART & Serial Console

![USB serial adapter wiring placeholder 800 x 450 px](/img/placeholder-800x450.png)

> Image placeholder: **800 × 450 px** (suggested use: connection photo /
> wiring diagram). Replace it later with a verified image of the same dimensions.

TBoard boards follow the Rockchip serial convention: a **debug console**
running at 1500000 baud plus a number of general-purpose UARTs routed to the
40-pin header. The pins each UART occupies are board-specific — see your
board's pinout, for example the [R5A 40-PIN Pinout](/r5a-pinout).

## Debug console

Serial parameters: **1500000 baud, 8 data bits, 1 stop bit, no parity, no flow
control**. Use a **3.3 V TTL** USB-to-serial adapter — never connect an RS-232
level adapter directly. On the R5A the console is on pins 8 (TX) / 10 (RX),
GND on pin 6.

```bash
# Linux
sudo picocom -b 1500000 /dev/ttyUSB0
# or
sudo minicom -D /dev/ttyUSB0 -b 1500000
```

On Windows use PuTTY / MobaXterm with the same parameters. The console shows
U-Boot output and the Linux login prompt without a display.

## General-purpose UARTs

Device nodes are assigned by the kernel and depend on the mux configuration
that the device tree enables:

```bash
ls -l /dev/ttyS*
dmesg | grep ttyS
```

A loopback test (short TX to RX) is the quickest way to confirm a node:

```bash
stty -F /dev/ttyS1 115200 raw -echo
cat /dev/ttyS1 & printf 'hello\n' > /dev/ttyS1
```

## Related

- [R5A 40-PIN Pinout](/r5a-pinout) — which UARTs sit on which header pins.
- [First Boot](/first-boot) — using the console during first startup.

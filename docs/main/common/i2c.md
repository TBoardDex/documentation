---
title: "I2C"
sidebar_label: "I2C"
sidebar_position: 4
slug: "/i2c"
---

# I2C

![I2C bus connection placeholder 800 x 450 px](/img/placeholder-800x450.png)

> Image placeholder: **800 × 450 px** (suggested use: connection photo /
> wiring diagram). Replace it later with a verified image of the same dimensions.

TBoard boards expose I2C buses on the 40-pin header for sensors, RTCs and other
low-speed peripherals. All buses run at **3.3 V** with onboard pull-ups. How
many buses are exposed, their numbers and their pin positions are
board-specific — see your board's pinout, for example the
[R5A 40-PIN Pinout](/r5a-pinout) (I2C1 on pins 3/5, I2C6 on pins 27/28).

## Scan the bus

Bus numbers are assigned by the kernel and may differ between images. Find
them, then scan:

```bash
ls /dev/i2c-*
i2cdetect -y 1        # probe bus 1
i2cdetect -y 6        # probe bus 6
```

Address `UU` means the address is claimed by a driver; a number means a device
responded at that address.

## Enabling a device

The cleanest way to attach a new device is a device-tree overlay shipped with
the TBoard image (enable it in `/boot/extlinux/extlinux.conf` or the image's
overlay manager). Read the device with `i2cget`/`i2cset` for quick tests, or a
driver module for production use.

## Related

- [R5A 40-PIN Pinout](/r5a-pinout) — I2C pins on the R5A.
- [SPI](/spi) — the other common low-speed bus.

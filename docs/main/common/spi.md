---
title: "SPI"
sidebar_label: "SPI"
sidebar_position: 5
slug: "/spi"
---

# SPI

![SPI bus wiring placeholder 800 x 450 px](/img/placeholder-800x450.png)

> Image placeholder: **800 × 450 px** (suggested use: connection photo /
> wiring diagram). Replace it later with a verified image of the same dimensions.

RK3588(S) provides hardware SPI controllers, and TBoard boards route them to
the 40-pin header. Which controller is routed where is board-specific — see
your board's pinout, for example the [R5A 40-PIN Pinout](/r5a-pinout)
(SPI0 with two chip selects). Logic level is **3.3 V**.

## Verify the bus

When the `spidev` interface is enabled, one or more `/dev/spidev*` nodes
appear. A quick loopback test links MOSI to MISO:

```bash
ls /dev/spidev*
# jumper MOSI to MISO, then send bytes and check they come back
```

Use your preferred spidev test tool or a few lines of Python (`spidev` package)
to send bytes and confirm they come back unchanged.

## Enabling devices

Attach displays, ADCs and CAN controllers through a device-tree overlay. The
overlay selects the chip-select line and the maximum clock speed — check the
device datasheet before exceeding 50 MHz on jumper wires.

## Related

- [R5A 40-PIN Pinout](/r5a-pinout) — SPI pins on the R5A.
- [I2C](/i2c) — low-speed sensor bus.

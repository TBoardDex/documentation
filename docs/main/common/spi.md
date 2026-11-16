---
title: "SPI"
sidebar_label: "SPI"
sidebar_position: 5
slug: "/spi"
---

# SPI

RK3588(S) provides hardware SPI controllers, and TBoard boards route them to
the 40-pin header. Which controller is routed where, with how many chip
selects, is board-specific — see your board's pinout and interface page under
Boards. Logic level is **3.3 V**.

## Verify the bus

The controller must be enabled in the device tree (DTS) with a `spidev` child
node; otherwise the pins stay GPIO and no `/dev/spidev*` node appears. Edit the
board DTS in the SDK: enable the spi node, select the pin muxing via
`pinctrl-0` and add a `spidev` child, rebuild with `make dtbs`, replace the dtb
under `/boot/dtb/rockchip/`, reboot, then check:

```bash
ls /dev/spidev*
# for example: /dev/spidev0.0  /dev/spidev0.1
```

`spidev0.0` is chip select 0, `spidev0.1` is chip select 1. If only one node
exists, the DTS declares a single chip select — add the second `spidev` child
or device.

## Loopback test

Jumper **MOSI to MISO** and send bytes to confirm they come back.
With the kernel `spidev_test` tool:

```bash
spidev_test -D /dev/spidev0.0 -s 1000000 -v
```

Without the tool, a few lines of Python are enough:

```python
import spidev
spi = spidev.SpiDev()
spi.open(0, 0)              # bus 0, chip select 0
spi.max_speed_hz = 1_000_000
spi.mode = 0                # CPOL=0, CPHA=0
print(spi.xfer2([0x01, 0x02, 0x03]))
spi.close()
```

The output must repeat the transmitted bytes. If it returns all `0x00` or all
`0xFF`, check the jumper, the chip-select pin and the pin mux.

## Device settings

| Setting | Notes |
|---|---|
| Mode | `0`–`3`, set by CPOL/CPHA from the device datasheet |
| Speed | 1–10 MHz is safe on jumper wires; 50 MHz needs a short, impedance-controlled connection |
| Word size | 8 bits by default, many ADCs use 16 or 32 bits |
| Chip select | Polarity is active-low; some devices need CS held across transfers (`spi-cs-high` / `cs_change`) |

The DTS also defines the chip-select count and the maximum clock. Raising the
clock in user space above the DTS value is ignored by some drivers — change it
in the DTS instead.

## Related

- [I2C](/i2c) — low-speed sensor bus.
- [Linux](/linux#device-tree) — device tree configuration.

---
title: "GPIO Usage (R5A)"
sidebar_label: "GPIO"
sidebar_position: 3
slug: "/r5a-gpio"
---

# GPIO Usage (R5A)

The GPIO architecture and numbering schemes, the sysfs / libgpiod commands, the
pin-mux inspection and the troubleshooting tables are on the [GPIO](/gpio)
page; this page lists the R5A-specific content only.

## 40-pin header

The R5A 40-pin header is compatible with common Raspberry-Pi-style sensors and
HATs; all logic levels are **3.3 V**. The complete pin table (GPIO numbers,
alternate functions and the colour legend) is on the
[R5A 40-PIN Pinout](/r5a-pinout#pinout) page.

Every pin can be used as plain GPIO while its alternate function is not
enabled. Pins 11, 12, 13, 15, 22, 37 and 40 have no default peripheral
function in the reference design — the safe choice for buttons, LEDs and
relays. Pin 7 (SPDIF1_TX) and pin 32 (PWM2, the onboard fan) are already
claimed in the stock device tree; check before using them. Enabling any other
alternate function needs a device-tree change — see the interface pages
(e.g. [I2C (R5A)](/r5a-i2c)).

## Safe GPIO quick table

| Header pin | Signal | sysfs global no. | libgpiod (chip, offset) |
|---|---|---|---|
| Pin 11 | GPIO4_A0 | 128 | 4, 0 |
| Pin 12 | GPIO1_A7 | 39 | 1, 7 |
| Pin 13 | GPIO4_A1 | 129 | 4, 1 |
| Pin 15 | GPIO4_A2 | 130 | 4, 2 |
| Pin 22 | GPIO1_B0 | 40 | 1, 8 |
| Pin 37 | GPIO4_A7 | 135 | 4, 7 |
| Pin 40 | GPIO3_C3 | 115 | 3, 19 |

For the control commands and caveats see [GPIO](/gpio).

## Related

- [GPIO](/gpio) — generic architecture, numbering, control commands and troubleshooting.
- [R5A 40-PIN Pinout](/r5a-pinout) — complete header table with mux details.

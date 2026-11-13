---
title: "I2C (R5A)"
sidebar_label: "I2C"
sidebar_position: 5
slug: "/r5a-i2c"
---

# I2C (R5A)

The commands and rules on [I2C](/i2c) apply unchanged to the R5A. This page
lists the buses the header exposes and which onboard devices already sit on
them.

## Buses on the R5A

| Bus | Pins | State | Used by |
|---|---|---|---|
| `i2c1` | 3 (SDA) / 5 (SCL) | Enabled | User sensors and displays |
| `i2c6` | 27 (SDA) / 28 (SCL) | Enabled | Onboard RTC at address `0x51` |

More buses can be routed to the header by editing the device tree: I2C2
(SCL 16 / SDA 18, M4), I2C3 (SCL 31 / SDA 33, M2), I2C5 (SCL 35 / SDA 37, M2),
I2C7 (SCL 36 / SDA 38, M3) and I2C8 (SDA 40, M4) — see the
[R5A 40-PIN Pinout](/r5a-pinout). Do not reconfigure a bus that already carries
an onboard chip — its devices stop working. In the stock device tree I2C2
carries the NPU power chip (`rk8602@42`), I2C7 the ES8316 codec (`0x10`) and
I2C6 the RTC (`0x51`).

## Device tree configuration (DTS)

Enabling an alternate function means editing the board dts configuration by
hand, then rebuilding and flashing the kernel image. Enabling I2C3
(SCL 31 / SDA 33, mux M2) for example:

```dts
/* rk3588s-TBoard-R5A.dts — enable I2C3 (mux M2) */
&i2c3 {
    status = "okay";
    pinctrl-names = "default";
    pinctrl-0 = <&i2c3m2_xfer>;
};
```

The other buses follow the same pattern — only the node and the mux index
change: `i2c2m4_xfer` for I2C2, `i2c5m2_xfer` for I2C5 (`i2c5m3_xfer` when
pin 7 is used as SDA), `i2c7m3_xfer` for I2C7 and `i2c8m4_xfer` for I2C8.
Pinctrl node names come from your kernel's `rk3588s-pinctrl.dtsi`. After
rebuilding and flashing the image `/dev/i2c-N` appears; verify with
`i2cdetect -y N`.

## Scanning

```bash
i2cdetect -y 1        # user bus
i2cdetect -y 6        # shows UU at 0x51 — the onboard RTC, expected
```

`UU` at `0x51` on bus 6 is the HYM8563 RTC claimed by its driver — that is
normal, not an address conflict.

## Related

- [I2C](/i2c) — scanning, register access, wiring rules, troubleshooting.
- [40-PIN Pinout](/r5a-pinout) — complete header pin table.
- [Others](/others) — RTC time keeping on `i2c6`.

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

| Bus | Header pins | State in the stock image | Onboard device |
|---|---|---|---|
| `i2c0` | not on the header | Enabled | CPU big-core rails: `rk8602@0x42` (`vdd_cpu_big0_s0`) and `rk8603@0x43` (`vdd_cpu_big1_s0`) |
| `i2c1` | 3 (SDA) / 5 (SCL) | Enabled | free — user sensors and displays |
| `i2c2` | not exposed by default (M4 is 16/18, but the bus is occupied) | Enabled | NPU rail `rk8602@0x42` (`vdd_npu_s0`) |
| `i2c6` | 27 (SDA) / 28 (SCL) | Enabled | HYM8563 RTC at `0x51` |
| `i2c7` | not on the header | Enabled | ES8316 codec at `0x10` |
| `i2c3`, `i2c5` | 31/33 (M2), 35/37 (M2) | Disabled | free for the header |

`/dev/i2c-0/1/2/6/7` are the pin-muxed rk3x controllers. Two further adapters
exist but are **not** general-purpose I2C: `/dev/i2c-9` (`fde50000.dp`,
DisplayPort AUX) and `/dev/i2c-10` (`ddc`, HDMI DDC). Address map measured on a
stock R5A: `i2c-0` → `0x42` + `0x43`, `i2c-2` → `0x42`, `i2c-6` → `0x51`,
`i2c-7` → `0x10`, `i2c-1` empty.

Do not disable or repin `i2c0`, `i2c2` or `i2c7`: `i2c0` carries the two
Cortex-A76 cluster regulators (losing it hangs or resets the board), `i2c2` feeds
the NPU and `i2c7` carries the audio codec.

More buses can be routed to the header by editing the device tree: I2C3
(SCL 31 / SDA 33, M2), I2C5 (SCL 35 / SDA 37, M2), I2C7 (SCL 36 / SDA 38, M3)
and I2C8 (SDA 40, M4) — see the [R5A 40-PIN Pinout](/r5a-pinout). I2C2 can be
muxed to M4 (16/18) but that bus already powers the NPU, so it cannot be handed
to the header as-is.
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
change: `i2c2m4_xfer` for I2C2 (that mux gives up the NPU rail — normally not what you want), `i2c5m2_xfer` for I2C5 (`i2c5m3_xfer` when
pin 7 is used as SDA), `i2c7m3_xfer` for I2C7 and `i2c8m4_xfer` for I2C8.
Pinctrl node names come from your kernel's `rk3588s-pinctrl.dtsi`. After
rebuilding and flashing the image `/dev/i2c-N` appears; verify with
`i2cdetect -y N`.

## Scanning

```bash
i2cdetect -y 0        # 0x42 and 0x43 are UU — the CPU cluster rails
i2cdetect -y 6        # shows UU at 0x51 — the onboard RTC, expected
```

`UU` at `0x51` on bus 6 is the HYM8563 RTC claimed by its driver — that is
normal, not an address conflict.

## Related

- [I2C](/i2c) — scanning, register access, wiring rules, troubleshooting.
- [40-PIN Pinout](/r5a-pinout) — complete header pin table.
- [Others](/others) — RTC time keeping on `i2c6`.

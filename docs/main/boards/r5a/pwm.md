---
title: "PWM (R5A)"
sidebar_label: "PWM"
sidebar_position: 7
slug: "/r5a-pwm"
---

# PWM (R5A)

The sysfs sequence and the servo/backlight values on [PWM](/pwm) apply
unchanged to the R5A. This page lists the channels the header exposes.

## Channels on the R5A

| Channel | Pin | Signal (GPIO no.) | Typical use |
|---|---|---|---|
| PWM2 (M1) | 32 | GPIO3_B1 (105) | Servo, backlight, LED dimming |
| PWM3_IR (M0) | 5 | GPIO0_D4 (28) | IR receiver / transmitter; **shares the pin with the default I2C1_SCL** |
| PWM13 (M2) | 7 | GPIO1_B7 (47) | Fan, buzzer, LED dimming |
| PWM13_IR (M3) | 12 | GPIO1_A7 (39) | IR receiver / transmitter |
| PWM14 (M1) | 36 | GPIO4_B2 (138) | Fan, buzzer |
| PWM15_IR (M1) | 38 | GPIO4_B3 (139) | IR receiver / transmitter; shares the pin with CAN1_TX |
| PWM15_IR (M0) | 40 | GPIO3_C3 (115) | IR receiver / transmitter |

Stock device tree notes: PWM2 already drives the onboard fan (`fan0`,
`pwm-fan`, 1 kHz) — remove the fan node before repurposing pin 32; PWM13 (M2)
is reserved for the DSI panel backlight (`&backlight`, 40 kHz, disabled);
PWM15 (M0) is set up as an IR remote receiver (`rockchip,remotectl-pwm`, with
a key table, disabled).

## Device tree configuration (DTS)

Every channel except PWM2 (the onboard fan) is off in the default image.
Enabling a channel means editing the board dts by hand to configure the
controller node, then rebuilding and flashing the kernel image. Enabling PWM2
(pin 32, mux M1) for example (remove the fan node first):

```dts
/* rk3588s-TBoard-R5A.dts — enable PWM2 (mux M1) */
&pwm2 {
    status = "okay";
    pinctrl-names = "active";
    pinctrl-0 = <&pwm2m1_pins>;
};
```

The other channels follow the same pattern — only the node and the mux index
change: `pwm3m0_pins` for PWM3_IR (M0), `pwm13m2_pins` for PWM13 (M2),
`pwm14m1_pins` for PWM14 (M1), `pwm15m1_pins` for PWM15_IR (M1) and
`pwm15m0_pins` for PWM15_IR (M0). Pinctrl node names come from your kernel's
`rk3588s-pinctrl.dtsi`. Chip and channel numbers vary — confirm with
`ls /sys/class/pwm/` instead of assuming `pwmchip0`. See [PWM](/pwm) for the
full sysfs procedure and the value tables.

## Related

- [PWM](/pwm) — sysfs procedure, servo and backlight values, troubleshooting.
- [40-PIN Pinout](/r5a-pinout) — complete header pin table.
- [Others](/others) — fan curves driven by the thermal subsystem.

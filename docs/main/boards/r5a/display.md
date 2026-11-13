---
title: "Display (R5A)"
sidebar_label: "Display"
sidebar_position: 9
slug: "/r5a-display"
---

# Display (R5A)

The checking commands and the DSI wiring rules on [Display](/display) apply
unchanged to the R5A. This page lists the outputs the board carries.

## Outputs on the R5A

| Output | Connector | Notes |
|---|---|---|
| HDMI | Micro HDMI | Up to 8Kp60; hot-pluggable, audio included |
| DP | Mini DP | Up to 4Kp60; Mini-DP → HDMI needs an **active** converter |
| MIPI DSI | FPC connector | Panel only — never hot-plug |

All three can be active at once; the SoC drives them from separate display
controllers. In the device tree HDMI0 is driven by VP0 (VP0 and VP1 are
spliced for 8K output) with `hdmim0_tx0_*` DDC / HPD / CEC pins and enable
GPIO4_B6; DP0 is driven by VP2 and routed through the Type-C `usbdp_phy0`
with two lanes (`dp-lane-mux = <0 1>`).

## Enabling a DSI panel

1. Power off the board — the DSI connector is not hot-pluggable.
2. Insert the FFC with the contacts facing the direction shown on the
   silkscreen, then close the latch.
3. Panel logic power and backlight come from the 40-pin header (3.3 V on pin 1
   or 17, 5 V on pin 2 or 4) and from the panel's own boost circuit — check the
   panel datasheet before wiring.
4. Edit the board dts by hand to add a panel node matching the panel (panel
   timing, DSI host and friends), then rebuild and flash the kernel image.
   The stock `rk3588s-TBoard-R5A.dts` carries no DSI panel node, but panel
   power (`vcc3v3_lcd_n`, GPIO3_C2) and backlight (PWM13, 40 kHz,
   `&backlight`, disabled) templates are already in place.

Panel timing is resolution-specific (for example 1200x1920); use the
parameters that match the panel datasheet exactly. See [Display](/display) for
status checks and the multi-display layout.

## Related

- [Display](/display) — status checks, DSI rules, multi-display layout.
- [Overview](/tboard-r5a) — connector types and maximum resolutions.
- [40-PIN Pinout](/r5a-pinout) — power pins for the DSI panel.
- [Audio](/audio) — HDMI/DP audio routing.

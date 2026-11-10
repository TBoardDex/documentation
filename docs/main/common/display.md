---
title: "Display Output"
sidebar_label: "Display"
sidebar_position: 8
slug: "/display"
---

# Display Output

![display connections placeholder 800 x 450 px](/img/placeholder-800x450.png)

> Image placeholder: **800 × 450 px** (suggested use: connection photo /
> wiring diagram). Replace it later with a verified image of the same dimensions.

RK3588(S) can drive multiple display outputs: HDMI (up to 8K), DP and MIPI DSI
panels. Which outputs a board exposes, the connector types and the supported
resolutions are board-specific — see your board's page, for example
[TBoard R5A](/tboard-r5a).

## Checking outputs

```bash
cat /sys/class/drm/*/status
# on a desktop session
xrandr --query
```

## MIPI DSI panels

1. Connect the FFC ribbon to the DSI connector (contacts orientation per the
   silkscreen).
2. Supply panel power and GND from the pins documented in your board's pinout
   (for the R5A: 40-pin Pin 2 / Pin 6).
3. Enable the panel overlay shipped with the TBoard image (the exact overlay
   file name matches your image release), then reboot.

## Related

- [TBoard R5A](/tboard-r5a)
- [R5A 40-PIN Pinout](/r5a-pinout) — power pins for the DSI panel.

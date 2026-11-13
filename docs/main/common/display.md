---
title: "Display Output"
sidebar_label: "Display"
sidebar_position: 8
slug: "/display"
---

# Display Output

RK3588(S) can drive multiple display outputs: HDMI (up to 8K), DP and MIPI DSI
panels. Which outputs a board exposes, the connector types and the supported
resolutions are board-specific — see your board's page under Boards. All
outputs of a board can be active at the same time; they are driven from
separate display controllers.

## Checking outputs

```bash
cat /sys/class/drm/*/status         # connected / disconnected per output
cat /sys/class/drm/card0-HDMI-A-1/modes   # modes advertised by the monitor
modetest -M rockchip                # connectors, encoders, CRTCs (libdrm-tests)
```

On a desktop image:

```bash
xrandr --query                      # X11: outputs, modes, current layout
```

A server image has no display manager: the panel shows the kernel console
(`console=tty1`) only, and `xrandr` is not installed. That is not a fault — use
a desktop image, or start a compositor yourself.

## HDMI and DP

These are enabled by default on boards that carry them and need no overlay. If
a monitor stays black:

1. `cat /sys/class/drm/*/status` — is it `connected`?
2. Try another cable: 4K needs a High Speed / Premium certified cable.
3. HDMI-to-VGA adapters work, but the adapter must be powered if it has a
   separate input.
4. Laptop HDMI ports are usually **output only** — you cannot use a laptop as a
   monitor for the board.
5. DP-to-HDMI needs an **active** converter; passive Mini-DP → HDMI cables only
   work if the board outputs HDMI signalling on the DP connector, which it
   usually does not.

## MIPI DSI panels

1. Power off the board — the DSI connector is not hot-pluggable. Connecting or
   disconnecting a panel while powered can short the rails and damage the panel
   or the SoC.
2. Insert the FFC with the contacts facing the direction shown on the
   silkscreen, then close the latch.
3. Panel logic power and backlight may come from the 40-pin header (3.3 V and
   5 V are available there) or from the panel's own boost circuit. Check your
   panel's datasheet and your board's pinout before wiring.
4. Enable the panel overlay that matches the panel resolution:
   ```bash
   ls /boot/dtb/overlay/ | grep -iE "dsi|panel|display"
   ```
   Add it to `/boot/uEnv/uEnv.txt` or `/boot/armbianEnv.txt`, `sync`, reboot.

A panel with the wrong overlay shows a lit but black screen or a rolling image —
both mean the timing or the initialization sequence does not match. Overlay
names usually encode the resolution (for example `…-1200x1920-…`), so pick the
file that matches your panel exactly.

## Multi-display layout

```bash
xrandr --output HDMI-1 --primary --mode 1920x1080
xrandr --output DSI-1 --right-of HDMI-1 --mode 1200x1920
```

Screen rotation for a portrait panel is also an `xrandr --rotate` setting; it
does not change the panel timing. The connector names (`HDMI-1`, `DSI-1` …)
differ between boards — list them with `xrandr --query` or
`cat /sys/class/drm/card*/card*-*/status`.

## Troubleshooting

| Symptom | Check |
|---|---|
| No output on any connector | `cat /sys/class/drm/*/status`, then the serial console for DRM errors |
| Output detected, no image | Desktop image? Is the session running on that output? |
| Panel lit but black | Device tree (DTS) config missing or wrong resolution |
| Image shifted / wrapped | Wrong panel timing in the device tree (DTS) config |
| Flicker at 4K | Cable quality, or lower the mode with `xrandr` |

## Related

- [Audio](/audio) — HDMI/DP audio routing.
- [Linux](/linux#device-tree-and-overlays) — enabling panel overlays.

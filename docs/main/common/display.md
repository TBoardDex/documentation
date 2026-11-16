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

These are enabled by default on boards that carry them. If a monitor stays
black:

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
4. The panel output requires its timing and initialization sequence to be
   configured in the device tree (DTS) first — see the next section.

## Configure the panel in the DTS

The board DTS lives in `kernel/arch/arm64/boot/dts/rockchip/` in the SDK (the
exact file is board-specific):

1. Add a panel node: the driver `compatible`, `width-mm` / `height-mm`, and the
   display timing (`clock-frequency`, `hactive` / `vactive`, porches and sync
   widths);
2. Reference the panel from the DSI controller node and declare the lane count
   and pixel format;
3. If the panel logic power or backlight is supplied by the board, check the
   matching regulator and backlight nodes;
4. Rebuild the dtb (`make dtbs` in the SDK), replace the file under
   `/boot/dtb/rockchip/`, and reboot.

Mismatched timing or initialization shows up as a lit but black screen or a
rolling image — compare the DTS timing values against the panel datasheet.

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
- [SDK Sources](/sdk-sources) — kernel and board DTS repositories.
- [Linux](/linux#device-tree) — dtb location and replacement.

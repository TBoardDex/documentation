---
title: "PWM"
sidebar_label: "PWM"
sidebar_position: 6
slug: "/pwm"
---

# PWM

RK3588(S) provides multiple hardware PWM channels. Which channels are routed
to the 40-pin header, and on which pins, is board-specific — see your board's
pinout and interface page under Boards. Typical uses: servo motors, backlight
dimming, buzzer and fan speed control. Enabling PWM consumes the GPIO on the
same pin.

## Enabling a channel

PWM channels are **off by default**. Enable the matching overlay:

```bash
ls /boot/dtb/overlay/ | grep pwm             # TBoard SDK image
ls /boot/dtb/rockchip/overlay/ | grep pwm    # Armbian-based image
```

Then add it to `/boot/uEnv/uEnv.txt` (SDK image) or to the `overlays=` line of
`/boot/armbianEnv.txt`, `sync` and reboot. Channels already used by an onboard
function (fan curve, panel backlight) must not be re-claimed; the board page
lists which channels are free.

## Using PWM

When a channel is enabled by the device tree it appears under
`/sys/class/pwm/`. Values are in **nanoseconds**:

```bash
ls /sys/class/pwm/                     # pwmchipN entries
cat /sys/class/pwm/pwmchip2/npwm       # how many channels this chip has
echo 0 > /sys/class/pwm/pwmchip2/export
ls /sys/class/pwm/pwmchip2/pwm0/
```

Configure and start the output:

```bash
echo 20000 > /sys/class/pwm/pwmchip2/pwm0/period      # 20 ms frame (50 Hz)
echo 1500  > /sys/class/pwm/pwmchip2/pwm0/duty_cycle  # 1.5 ms pulse
echo normal > /sys/class/pwm/pwmchip2/pwm0/polarity
echo 1     > /sys/class/pwm/pwmchip2/pwm0/enable
```

Rules that trip people up:

- `duty_cycle` must be **smaller than** `period`, otherwise the write fails with
  `EINVAL`. Write `period` first.
- A channel cannot be disabled while `duty_cycle` equals `period`; lower it
  first, then write `0` to `enable`.
- Chip and channel numbers depend on the overlay. Confirm with
  `ls -l /sys/class/pwm/` and `cat .../npwm` instead of assuming `pwmchip0`.

## Servo and backlight examples

| Target | Period | Duty cycle |
|---|---|---|
| Hobby servo (SG90) | 20 ms | 0.5 ms (0°) … 2.5 ms (180°) |
| LED dimming | 1 ms | 0 % … 100 % of period |
| PC fan (4-wire) | 25 kHz | 20 % … 100 % (below 20 % many fans stall) |
| Passive buzzer | 1 / frequency | 50 % for the loudest tone |

For a buzzer, the period sets the tone: 1 kHz → `period = 1000000` ns.

## Related

- [GPIO](/gpio) — numbering rules and control on the same pins.
- [Others](/others) — fan curves driven by the thermal subsystem.
- [Linux](/linux#device-tree-and-overlays) — overlay configuration.

---
title: "PWM"
sidebar_label: "PWM"
sidebar_position: 6
slug: "/pwm"
---

# PWM

![PWM servo wiring placeholder 800 x 450 px](/img/placeholder-800x450.png)

> Image placeholder: **800 × 450 px** (suggested use: connection photo /
> wiring diagram). Replace it later with a verified image of the same dimensions.

RK3588(S) provides multiple hardware PWM channels. Which channels are routed
to the 40-pin header, and on which pins, is board-specific — see your board's
pinout, for example the [R5A 40-PIN Pinout](/r5a-pinout). Typical uses: servo
motors, backlight dimming, buzzer and fan speed control. Enabling PWM consumes
the GPIO on the same pin.

## Using PWM

When a channel is enabled by the device tree it appears under
`/sys/class/pwm/`:

```bash
ls /sys/class/pwm/
echo 0 > /sys/class/pwm/pwmchip*/export   # if needed
echo 20000 > /sys/class/pwm/pwmchip*/pwm0/period    # 20 kHz frame
echo 1500  > /sys/class/pwm/pwmchip*/pwm0/duty_cycle
echo 1     > /sys/class/pwm/pwmchip*/pwm0/enable
```

Check the channel numbering with `ls` first — it depends on which channel the
overlay enables. For servos, a 20 ms period with a 0.5–2.5 ms duty cycle is a
common starting point.

## Related

- [R5A 40-PIN Pinout](/r5a-pinout) — PWM pins on the R5A.
- [GPIO](/gpio) — numbering rules and control.

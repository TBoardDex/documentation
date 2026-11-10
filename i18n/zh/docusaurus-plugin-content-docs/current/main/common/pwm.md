---
title: "PWM"
sidebar_label: "PWM"
sidebar_position: 6
slug: "/pwm"
---

# PWM

![PWM 舵机接线占位图 800 x 450 px](/img/placeholder-800x450.png)

> 图片占位：**800 × 450 px**（建议用途：接法照片 / 接线示意图）。后期请替换为
> 相同尺寸的真实图片。

RK3588(S) 提供多路硬件 PWM 通道。哪些通道引到 40-pin 排针、占用哪些引脚由
板卡决定——请查看对应板卡的引脚定义，例如
[R5A 40-PIN 引脚定义](/r5a-pinout)。典型用途：舵机控制、背光调光、蜂鸣器与
风扇调速。启用 PWM 会占用同一引脚上的 GPIO 功能。

## 使用 PWM

设备树启用后，PWM 通道出现在 `/sys/class/pwm/`：

```bash
ls /sys/class/pwm/
echo 0 > /sys/class/pwm/pwmchip*/export   # 如需要
echo 20000 > /sys/class/pwm/pwmchip*/pwm0/period    # 20 kHz 周期
echo 1500  > /sys/class/pwm/pwmchip*/pwm0/duty_cycle
echo 1     > /sys/class/pwm/pwmchip*/pwm0/enable
```

通道编号取决于 overlay 启用的通道，先用 `ls` 确认。控制舵机时常用 20 ms 周期、
0.5–2.5 ms 占空比作为起点。

## 相关页面

- [R5A 40-PIN 引脚定义](/r5a-pinout) — R5A 的 PWM 引脚。
- [GPIO](/gpio) — 编号规则与控制方法。

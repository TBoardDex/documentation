---
title: "PWM"
sidebar_label: "PWM"
sidebar_position: 6
slug: "/pwm"
---

# PWM

RK3588(S) 有多路硬件 PWM。哪些通道引到 40-pin 排针、分别在哪几个引脚，由板卡
决定——请查看 Boards 下对应板卡的引脚定义页与接口使用页。典型用途：舵机、背光
调光、蜂鸣器和风扇调速。启用 PWM 会占用同一引脚的 GPIO 功能。

## 启用通道

PWM 通道**默认关闭**。启用对应的 overlay：

```bash
ls /boot/dtb/overlay/ | grep pwm             # TBoard SDK 镜像
ls /boot/dtb/rockchip/overlay/ | grep pwm    # Armbian 镜像
```

然后加入 `/boot/uEnv/uEnv.txt`（SDK 镜像）或 `/boot/armbianEnv.txt` 的
`overlays=` 行，`sync` 后重启。已被板载功能占用的通道（风扇曲线、屏幕背光）
不要重复申请；各板卡页面会标出哪些通道是空闲的。

## 使用 PWM

设备树启用通道后，会在 `/sys/class/pwm/` 下出现对应目录，数值单位是**纳秒**：

```bash
ls /sys/class/pwm/                     # pwmchipN
cat /sys/class/pwm/pwmchip2/npwm       # 该芯片的通道数
echo 0 > /sys/class/pwm/pwmchip2/export
ls /sys/class/pwm/pwmchip2/pwm0/
```

配置并启动输出：

```bash
echo 20000 > /sys/class/pwm/pwmchip2/pwm0/period      # 20 ms 周期（50 Hz）
echo 1500  > /sys/class/pwm/pwmchip2/pwm0/duty_cycle  # 1.5 ms 脉宽
echo normal > /sys/class/pwm/pwmchip2/pwm0/polarity
echo 1     > /sys/class/pwm/pwmchip2/pwm0/enable
```

几个容易踩的规则：

- `duty_cycle` 必须**小于** `period`，否则写入返回 `EINVAL`。先写 `period`。
- `duty_cycle` 等于 `period` 时无法关闭通道；先把占空比调小，再往 `enable`
  写 `0`。
- 芯片号与通道号取决于 overlay。请用 `ls -l /sys/class/pwm/` 与
  `cat .../npwm` 确认，不要假定就是 `pwmchip0`。

## 舵机与背光示例

| 目标 | 周期 | 占空比 |
|---|---|---|
| 航模舵机（SG90） | 20 ms | 0.5 ms（0°）… 2.5 ms（180°） |
| LED 调光 | 1 ms | 周期的 0 % … 100 % |
| 4 线 PC 风扇 | 25 kHz | 20 % … 100 %（低于 20 % 多数风扇会停转） |
| 无源蜂鸣器 | 1 / 频率 | 50 % 时最响 |

蜂鸣器靠周期决定音调：1 kHz 对应 `period = 1000000` ns。

## 相关页面

- [GPIO](/gpio) — 同一引脚上的编号规则与控制方式。
- [其他](/others) — 由热管理子系统驱动的风扇曲线。
- [Linux](/linux#设备树与-overlay) — overlay 配置方法。

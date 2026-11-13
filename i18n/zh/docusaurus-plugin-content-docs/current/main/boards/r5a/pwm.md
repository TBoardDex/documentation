---
title: "PWM（R5A）"
sidebar_label: "PWM"
sidebar_position: 7
slug: "/r5a-pwm"
---

# PWM（R5A）

[PWM](/pwm) 页中的 sysfs 操作序列与舵机/背光参数对 R5A 完全适用，本页给出
排针引出的通道。

## R5A 上的通道

| 通道 | 引脚 | 信号（GPIO 编号） | 典型用途 |
|---|---|---|---|
| PWM2（M1） | 32 | GPIO3_B1（105） | 舵机、背光、LED 调光 |
| PWM3_IR（M0） | 5 | GPIO0_D4（28） | 红外收发；**与默认启用的 I2C1_SCL 共用引脚** |
| PWM13（M2） | 7 | GPIO1_B7（47） | 风扇、蜂鸣器、LED 调光 |
| PWM13_IR（M3） | 12 | GPIO1_A7（39） | 红外收发 |
| PWM14（M1） | 36 | GPIO4_B2（138） | 风扇、蜂鸣器 |
| PWM15_IR（M1） | 38 | GPIO4_B3（139） | 红外收发；与 CAN1_TX 共用引脚 |
| PWM15_IR（M0） | 40 | GPIO3_C3（115） | 红外收发 |

出厂设备树参考：PWM2 已分配给板载风扇（`fan0`，`pwm-fan`，1 kHz），把 Pin 32
用作其他 PWM 用途前需先移除风扇节点；PWM13（M2）预留给 DSI 屏背光（`&backlight`，
40 kHz，默认关闭）；PWM15（M0）配置为红外遥控接收（`rockchip,remotectl-pwm`，
带键值表，默认关闭）。

## 设备树配置（DTS）

除 PWM2（板载风扇）外，其余通道在默认镜像中均关闭。需手动修改板级 dts 配置，
启用对应通道并指定引脚复用，然后重新编译、烧写内核镜像。以启用 PWM2
（Pin 32，复用 M1）为例（需先移除占用它的风扇节点）：

```dts
/* rk3588s-TBoard-R5A.dts —— 启用 PWM2（复用 M1） */
&pwm2 {
    status = "okay";
    pinctrl-names = "active";
    pinctrl-0 = <&pwm2m1_pins>;
};
```

其余通道写法相同，更换节点与复用编号即可：PWM3_IR（M0）用 `pwm3m0_pins`、
PWM13（M2）用 `pwm13m2_pins`、PWM14（M1）用 `pwm14m1_pins`、PWM15_IR（M1）
用 `pwm15m1_pins`、PWM15_IR（M0）用 `pwm15m0_pins`。引脚复用节点名以所用
内核的 `rk3588s-pinctrl.dtsi` 为准。芯片号与通道号请用 `ls /sys/class/pwm/`
确认，不要假定就是 `pwmchip0`。完整 sysfs 流程与参数表见 [PWM](/pwm)。

## 相关页面

- [PWM](/pwm) — sysfs 流程、舵机与背光参数、排障。
- [R5A 40-PIN 引脚定义](/r5a-pinout) — 完整排针引脚表。
- [其他](/others) — 由热管理子系统驱动的风扇曲线。

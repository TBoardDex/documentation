---
title: "I2C（R5A）"
sidebar_label: "I2C"
sidebar_position: 5
slug: "/r5a-i2c"
---

# I2C（R5A）

[I2C](/i2c) 页中的命令与规则对 R5A 完全适用，本页给出排针引出的总线以及
板载器件的占用情况。

## R5A 上的总线

| 总线 | 引脚 | 默认状态 | 板载占用 |
|---|---|---|---|
| `i2c1` | 3（SDA）/ 5（SCL） | 已启用 | 用户传感器与显示屏 |
| `i2c6` | 27（SDA）/ 28（SCL） | 已启用 | RTC，地址 `0x51` |

更多总线可通过修改设备树引到排针：I2C2（SCL 16 / SDA 18，M4）、I2C3（SCL 31 /
SDA 33，M2）、I2C5（SCL 35 / SDA 37，M2）、I2C7（SCL 36 / SDA 38，M3）与
I2C8（SDA 40，M4）——见 [R5A 40-PIN 引脚定义](/r5a-pinout)。已经挂着板载芯片的
总线不要重新配置——该总线上的器件会因此失效：出厂设备树中 I2C2 挂有 NPU 电源
芯片（`rk8602@42`）、I2C7 挂有 ES8316 codec（`0x10`），I2C6 上是 RTC（`0x51`）。

## 设备树配置（DTS）

启用复用功能需手动修改板级 dts 配置，并重新编译、烧写内核镜像后生效。
以启用 I2C3（SCL 31 / SDA 33，复用 M2）为例：

```dts
/* rk3588s-TBoard-R5A.dts —— 启用 I2C3（复用 M2） */
&i2c3 {
    status = "okay";
    pinctrl-names = "default";
    pinctrl-0 = <&i2c3m2_xfer>;
};
```

其余总线写法相同，只需更换节点与复用编号：I2C2 用 `i2c2m4_xfer`、I2C5 用
`i2c5m2_xfer`（Pin 7 作 SDA 时用 `i2c5m3_xfer`）、I2C7 用 `i2c7m3_xfer`、
I2C8 用 `i2c8m4_xfer`。引脚复用节点名以所用内核的 `rk3588s-pinctrl.dtsi`
为准。重新编译并烧写镜像后，`/dev/i2c-N` 即会出现，用 `i2cdetect -y N` 验证。

## 扫描

```bash
i2cdetect -y 1        # 用户总线
i2cdetect -y 6        # 0x51 显示 UU —— 板载 RTC，属正常现象
```

总线 6 上 `0x51` 的 `UU` 是 HYM8563 RTC 被其驱动占用——正常，不是地址冲突。

## 相关页面

- [I2C](/i2c) — 扫描、寄存器读写、布线规则、排障。
- [R5A 40-PIN 引脚定义](/r5a-pinout) — 完整排针引脚表。
- [其他](/others) — `i2c6` 上的 RTC 校时。

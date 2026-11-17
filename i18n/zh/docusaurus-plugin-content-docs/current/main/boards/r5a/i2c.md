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

| 总线 | 排针引脚 | 默认状态 | 板载占用 |
|---|---|---|---|
| `i2c0` | 未引出到排针 | 已启用 | CPU 大核供电：`rk8602@0x42`（`vdd_cpu_big0_s0`）与 `rk8603@0x43`（`vdd_cpu_big1_s0`） |
| `i2c1` | 3（SDA）/ 5（SCL） | 已启用 | 空闲——用户传感器与显示屏 |
| `i2c2` | 默认未引出（M4 为 16/18，但该总线已被占用） | 已启用 | NPU 供电 `rk8602@0x42`（`vdd_npu_s0`） |
| `i2c6` | 27（SDA）/ 28（SCL） | 已启用 | HYM8563 RTC，地址 `0x51` |
| `i2c7` | 未引出到排针 | 已启用 | ES8316 codec，地址 `0x10` |
| `i2c3`、`i2c5` | 31/33（M2）、35/37（M2） | 关闭 | 可供排针使用 |

`/dev/i2c-0/1/2/6/7` 是做了引脚复用的 rk3x 控制器。另外两个适配器**不是**通用 I2C：`/dev/i2c-9`（`fde50000.dp`，DisplayPort AUX）与 `/dev/i2c-10`（`ddc`，HDMI DDC）。在出厂 R5A 上实测的地址分布：`i2c-0` → `0x42` + `0x43`、`i2c-2` → `0x42`、`i2c-6` → `0x51`、`i2c-7` → `0x10`，`i2c-1` 为空。

不要关闭或重配 `i2c0`、`i2c2`、`i2c7`：`i2c0` 承载两颗 Cortex-A76 集群的供电调节器（丢失后板卡会挂死或复位），`i2c2` 给 NPU 供电，`i2c7` 上挂着音频 codec。

更多总线可通过修改设备树引到排针：I2C3（SCL 31 / SDA 33，M2）、I2C5（SCL 35 / SDA 37，M2）、I2C7（SCL 36 / SDA 38，M3）与 I2C8（SDA 40，M4）——见 [R5A 40-PIN 引脚定义](/r5a-pinout)。I2C2 虽然能复用到 M4（16/18），但该总线已用于 NPU 供电，不能直接交给排针。
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

其余总线写法相同，只需更换节点与复用编号：I2C2 用 `i2c2m4_xfer`（会牺牲 NPU 供电，一般不建议）、I2C5 用
`i2c5m2_xfer`（Pin 7 作 SDA 时用 `i2c5m3_xfer`）、I2C7 用 `i2c7m3_xfer`、
I2C8 用 `i2c8m4_xfer`。引脚复用节点名以所用内核的 `rk3588s-pinctrl.dtsi`
为准。重新编译并烧写镜像后，`/dev/i2c-N` 即会出现，用 `i2cdetect -y N` 验证。

## 扫描

```bash
i2cdetect -y 0        # 0x42 / 0x43 为 UU —— CPU 集群供电
i2cdetect -y 6        # 0x51 显示 UU —— 板载 RTC，属正常现象
```

总线 6 上 `0x51` 的 `UU` 是 HYM8563 RTC 被其驱动占用——正常，不是地址冲突。

## 相关页面

- [I2C](/i2c) — 扫描、寄存器读写、布线规则、排障。
- [R5A 40-PIN 引脚定义](/r5a-pinout) — 完整排针引脚表。
- [其他](/others) — `i2c6` 上的 RTC 校时。

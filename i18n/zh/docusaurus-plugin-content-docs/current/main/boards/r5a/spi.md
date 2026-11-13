---
title: "SPI（R5A）"
sidebar_label: "SPI"
sidebar_position: 6
slug: "/r5a-spi"
---

# SPI（R5A）

[SPI](/spi) 页中的命令与规则对 R5A 完全适用，本页给出引脚分配与设备树
启用方法。

## R5A 上的 SPI0

SPI0 引到排针，带两路片选：

| 信号 | 引脚 | 方向 |
|---|---|---|
| `SPI0_MOSI_M2` | 19 | 主 → 从 |
| `SPI0_MISO_M2` | 21 | 从 → 主 |
| `SPI0_CLK_M2` | 23 | 时钟 |
| `SPI0_CS0_M2` | 24 | 片选 0 |
| `SPI0_CS1_M2` | 26 | 片选 1 |

SPI0 也可改用 M1 复用（MOSI 13 / MISO 11 / CLK 15 / CS0 36 / CS1 28），排针上
还有 SPI2（M1：MOSI 33 / MISO 31 / CLK 35 / CS0 37 / CS1 27）、SPI3（片选
5 / 3）与 SPI4（MOSI 16 / MISO 18）——见 [R5A 40-PIN 引脚定义](/r5a-pinout)。

## 设备树配置（DTS）

控制器默认关闭。需手动修改板级 dts 配置，启用 SPI0 并挂载 `spidev` 子设备，
然后重新编译、烧写内核镜像。以 SPI0（复用 M2）为例：

```dts
/* rk3588s-TBoard-R5A.dts —— 启用 SPI0（复用 M2），挂载两路 spidev */
&spi0 {
    status = "okay";
    #address-cells = <1>;
    #size-cells = <0>;
    pinctrl-names = "default";
    pinctrl-0 = <&spi0m2_cs0 &spi0m2_cs1 &spi0m2_pins>;
    num-cs = <2>;

    spi_dev@0 {
        compatible = "rockchip,spidev";
        reg = <0>;
        spi-max-frequency = <24000000>;
    };

    spi_dev@1 {
        compatible = "rockchip,spidev";
        reg = <1>;
        spi-max-frequency = <24000000>;
    };
};
```

改用 M1 复用时把节点换成 `spi0m1_cs0`、`spi0m1_cs1` 与 `spi0m1_pins`；SPI2
对应 `spi2m1_*`（M0 片选为 `spi2m0_cs0/cs1`），SPI4 对应 `spi4m2_pins`（M2
无 CS1）。引脚复用节点名以所用内核的 `rk3588s-pinctrl.dtsi` 为准。重新编译
并烧写镜像后验证：

```bash
ls /dev/spidev*         # 完成后出现 spidev0.0（CS0）与 spidev0.1（CS1）
```

## 相关页面

- [SPI](/spi) — 回环测试、器件参数、排障。
- [R5A 40-PIN 引脚定义](/r5a-pinout) — 完整排针引脚表。
- [Linux](/linux#设备树与-overlay) — 设备树基础。

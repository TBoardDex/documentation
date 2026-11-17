---
title: "SPI（R5A）"
sidebar_label: "SPI"
sidebar_position: 6
slug: "/r5a-spi"
---

# SPI（R5A）

[SPI](/spi) 页中的命令与规则对 R5A 完全适用，本页给出引脚分配与设备树
启用方法。


## 默认镜像的实际状态

**出厂镜像没有 `/dev/spidev*`。** `CONFIG_SPI_ROCKCHIP` 与 `CONFIG_SPI_SPIDEV`
都在 `rk3588s_tboard.config` 中开启，但板级设备树里没有任何 `spidev` 子节点——
控制器没有挂子设备就不会生成设备节点。

只有一个控制器已经启用：`&spi2`，复用 `spi2m2_cs0` + `spi2m2_pins`，
`num-cs = <1>`。M2 复用把 SPI2_CLK / MISO / MOSI 放在 **GPIO0_A5 / GPIO0_B3 /
GPIO0_A6**（复用功能 1）——是 SoC 侧引脚，不在排针上。SPI0、SPI3、SPI4 均为关闭。## R5A 上的 SPI0

SPI0 引到排针，带两路片选：

| 信号 | 引脚 | 方向 |
|---|---|---|
| `SPI0_MOSI_M2` | 19 | 主 → 从 |
| `SPI0_MISO_M2` | 21 | 从 → 主 |
| `SPI0_CLK_M2` | 23 | 时钟 |
| `SPI0_CS0_M2` | 24 | 片选 0 |
| `SPI0_CS1_M2` | 26 | 片选 1 |
引脚 19/21/23/24/26 是共用的：`spi0m2` 与 UART4_M2（GPIO1_B2 / B3 → 引脚
19 / 23）、UART7_M2（GPIO1_B4 / B5 → 引脚 24 / 26）使用同一组引脚。三者只能启用
其中一个。

SPI0 也可改用 M1 复用（MOSI 13 / MISO 11 / CLK 15 / CS0 36 / CS1 28），排针上
还有 SPI2（M1：MOSI 33 / MISO 31 / CLK 35 / CS0 37 / CS1 27）、SPI3（片选
5 / 3）与 SPI4（MOSI 16 / MISO 18）——见 [R5A 40-PIN 引脚定义](/r5a-pinout)。

## 设备树配置（DTS）

SPI0 控制器默认关闭。需手动修改板级 dts 配置，启用 SPI0 并挂载 `spidev` 子设备，
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

## SPI2 不是空闲控制器：它挂着 PMIC

`&spi2` 是启用的，但**不能拿给排针用**。CS0 接在板载 **RK806** 电源管理芯片上：
板级 dts 通过 `#include "rk3588-rk806-single.dtsi"` 把 `rk806@0` 子节点挂在
`&spi2` 下，板级文件只覆盖了 pinctrl 与 `num-cs = <1>`：

```dts
&spi2 {
    pinctrl-names = "default";
    pinctrl-0 = <&spi2m2_cs0 &spi2m2_pins>;
    num-cs = <1>;
    status = "okay";
};
```

这也解释了为什么控制器在、却看不到 `/dev/spidev*`：总线上唯一的设备是 PMIC，
它走 regmap、不创建字符设备：

```bash
ls /sys/class/spi_master/     # spi2   —— 控制器已 probe
ls /sys/bus/spi/devices/      # spi2.0 —— RK806 已绑定
dmesg | grep -i rk806         # rk806 spi2.0: chip id: RK806,ver:0x2, 0x1
```

**不要把 `&spi2` 改到别的复用、也不要释放它的 CS0。** 丢掉 PMIC 就丢掉所有核心
供电轨，板卡无法正常启动。排针上的 SPI 设备请用 SPI0 / SPI3 / SPI4，`&spi2` 保持
原样。
## 相关页面

- [SPI](/spi) — 回环测试、器件参数、排障。
- [R5A 40-PIN 引脚定义](/r5a-pinout) — 完整排针引脚表。
- [Linux](/linux#设备树) — 设备树基础。

---
title: "UART 与串口（R5A）"
sidebar_label: "UART 与串口"
sidebar_position: 4
slug: "/r5a-uart"
---

# UART 与串口（R5A）

[UART 与串口](/uart-serial) 页中的命令与规则对 R5A 完全适用，本页给出排针上
各 UART 的引脚与默认启用状态。

## R5A 上的 UART

| UART | 排针引脚 | 设备节点 | 默认镜像状态 | 启用方式 |
|---|---|---|---|---|
| UART2 | 8（TX）/ 10（RX） | `ttyFIQ0` | 调试串口，常开 | — |
| UART6（M1） | 16（TX）/ 18（RX） | `/dev/ttyS2` | 已启用 | — |
| UART0（M2） | 29（TX）/ 31（RX） | 用 `dmesg` 确认 | 关闭 | 需改设备树（见下文） |
| UART3（M2） | 33（TX）/ 35（RX） | 用 `dmesg` 确认 | 关闭 | 需改设备树（见下文） |

串口参数：**1500000 波特率、8N1、无流控**，3.3 V TTL 电平。

更多 UART 可通过修改设备树引到排针：UART4（TX 23 / RX 19，M2）、UART7（TX 26 /
RX 24，M2，CTS 在 40）与 UART8（TX 27 / RX 28，M0，RTS/CTS 在 36/38）；
UART9 控制器已分配给板载蓝牙（设备树中启用 `uart9m2` 并引出 RTS），排针上的
UART9（RTS 11 / CTS 13，M1）无法直接使用。引脚分配与复用编号见
[R5A 40-PIN 引脚定义](/r5a-pinout)。

## 启用 UART0 / UART3

需手动修改板级 dts 配置，启用对应控制器并指定引脚复用，然后重新编译、
烧写内核镜像。以启用 UART0（TX 29 / RX 31，复用 M2）为例：

```dts
/* rk3588s-TBoard-R5A.dts —— 启用 UART0（复用 M2） */
&uart0 {
    status = "okay";
    pinctrl-names = "default";
    pinctrl-0 = <&uart0m2_xfer>;
};
```

UART3 同理：换成 `&uart3` 与 `uart3m2_xfer`。其余 UART 的复用节点分别为
`uart4m2_xfer`、`uart7m2_xfer`、`uart8m0_xfer` 与 `uart9m1_xfer`，引脚复用
节点名以所用内核的 `rk3588s-pinctrl.dtsi` 为准。重新编译并烧写镜像后确认
实际分配的设备节点：

```bash
ls -l /dev/ttyS*
dmesg | grep -i "ttyS\|uart"
```

同一控制器同一时刻只能启用一种引脚复用；调试串口（UART2 / `ttyFIQ0`）保留。
回环测试与应用程序用法见 [UART 与串口](/uart-serial)。

## 相关页面

- [UART 与串口](/uart-serial) — 控制台细节、回环测试、应用程序用法。
- [R5A 40-PIN 引脚定义](/r5a-pinout) — 完整排针引脚表。
- [Linux](/linux#设备树与-overlay) — 设备树基础。

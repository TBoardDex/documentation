---
title: "UART & Serial (R5A)"
sidebar_label: "UART & Serial"
sidebar_position: 4
slug: "/r5a-uart"
---

# UART & Serial (R5A)

The commands and rules on [UART & Serial](/uart-serial) apply unchanged to the
R5A. This page lists which UARTs the header exposes, their pins and their state
in the default image.

## UARTs on the R5A

| UART | Header pins | Device | State in the default image | Enable with |
|---|---|---|---|---|
| UART2 | 8 (TX) / 10 (RX) | `ttyFIQ0` | Debug console, always on | — |
| UART6 (M1) | 16 (TX) / 18 (RX) | `/dev/ttyS2` | Enabled | — |
| UART0 (M2) | 29 (TX) / 31 (RX) | assigned by `dmesg` | Disabled | device tree change (below) |
| UART3 (M2) | 33 (TX) / 35 (RX) | assigned by `dmesg` | Disabled | device tree change (below) |

Console parameters: **1500000 baud, 8N1, no flow control**, 3.3 V TTL levels.

More UARTs can be routed to the header by editing the device tree: UART4
(TX 23 / RX 19, M2), UART7 (TX 26 / RX 24, M2, CTS on 40) and UART8
(TX 27 / RX 28, M0, RTS/CTS on 36/38). The UART9 controller is assigned to the
onboard Bluetooth (`uart9m2` with RTS in the device tree), so the header UART9
(RTS 11 / CTS 13, M1) cannot be used directly. Pin assignments and mux indexes
are in the [R5A 40-PIN Pinout](/r5a-pinout).

## Enabling UART0 / UART3

Enabling a UART means editing the board dts by hand to enable the controller
and select the pin mux, then rebuilding and flashing the kernel image.
Enabling UART0 (TX 29 / RX 31, mux M2) for example:

```dts
/* rk3588s-TBoard-R5A.dts — enable UART0 (mux M2) */
&uart0 {
    status = "okay";
    pinctrl-names = "default";
    pinctrl-0 = <&uart0m2_xfer>;
};
```

UART3 follows the same pattern — use `&uart3` and `uart3m2_xfer`. The other
UARTs use `uart4m2_xfer`, `uart7m2_xfer`, `uart8m0_xfer` and `uart9m1_xfer`.
Pinctrl node names come from your kernel's `rk3588s-pinctrl.dtsi`. After
rebuilding and flashing the image, confirm the assigned device node:

```bash
ls -l /dev/ttyS*
dmesg | grep -i "ttyS\|uart"
```

Only one mux variant per controller can be active at a time, and the debug
console (UART2 / `ttyFIQ0`) is reserved — see [UART & Serial](/uart-serial)
for the loopback test and the application interface.

## Related

- [UART & Serial](/uart-serial) — console details, loopback test, applications.
- [40-PIN Pinout](/r5a-pinout) — complete header pin table.
- [Linux](/linux#device-tree-and-overlays) — device tree basics.

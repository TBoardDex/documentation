---
title: "SPI (R5A)"
sidebar_label: "SPI"
sidebar_position: 6
slug: "/r5a-spi"
---

# SPI (R5A)

The commands and rules on [SPI](/spi) apply unchanged to the R5A. This page
lists the pins and the device-tree configuration that enables the controller.
## What the stock image exposes

**There is no `/dev/spidev*` on the stock image.** `CONFIG_SPI_ROCKCHIP` and
`CONFIG_SPI_SPIDEV` are both enabled in `rk3588s_tboard.config`, but no `spidev`
child node exists in the board dts — a controller without a child device creates
no device node.

Exactly one controller is already enabled: `&spi2` with `spi2m2_cs0` +
`spi2m2_pins` and `num-cs = <1>`. The M2 mux puts SPI2_CLK / MISO / MOSI on
**GPIO0_A5 / GPIO0_B3 / GPIO0_A6** (mux function 1) — SoC balls, not header pins.
SPI0, SPI3 and SPI4 are disabled.

## SPI0 on the R5A

SPI0 is routed to the header with both chip selects:

| Signal | Pin | Direction |
|---|---|---|
| `SPI0_MOSI_M2` | 19 | Master → slave |
| `SPI0_MISO_M2` | 21 | Slave → master |
| `SPI0_CLK_M2` | 23 | Clock |
| `SPI0_CS0_M2` | 24 | Chip select 0 |
| `SPI0_CS1_M2` | 26 | Chip select 1 |
Pins 19/21/23/24/26 are shared: `spi0m2` uses the same balls as UART4_M2
(GPIO1_B2 / B3 → pins 19 / 23) and UART7_M2 (GPIO1_B4 / B5 → pins 24 / 26).
Enable one of those three, never two.

SPI0 can also be routed in the M1 mux (MOSI 13 / MISO 11 / CLK 15 / CS0 36 /
CS1 28), and the header additionally offers SPI2 (M1: MOSI 33 / MISO 31 / CLK
35 / CS0 37 / CS1 27), SPI3 (chip selects 5 / 3) and SPI4 (MOSI 16 / MISO 18) —
see the [R5A 40-PIN Pinout](/r5a-pinout).

## Device tree configuration (DTS)

SPI0 is off by default. Edit the board dts by hand to enable SPI0
together with `spidev` child devices, then rebuild and flash the kernel image.
SPI0 (mux M2) for example:

```dts
/* rk3588s-TBoard-R5A.dts — enable SPI0 (mux M2) with two spidev devices */
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

For the M1 mux swap the nodes to `spi0m1_cs0`, `spi0m1_cs1` and `spi0m1_pins`;
SPI2 uses `spi2m1_*` (`spi2m0_cs0/cs1` for the M0 chip selects) and SPI4 uses
`spi4m2_pins` (M2 has no CS1). Pinctrl node names come from your kernel's
`rk3588s-pinctrl.dtsi`. After rebuilding and flashing the image, verify:

```bash
ls /dev/spidev*         # spidev0.0 (CS0) and spidev0.1 (CS1) when done
```

## SPI2 is not free: it carries the PMIC

`&spi2` is enabled, but **not available for the header**. CS0 is wired to the
on-board **RK806** PMIC: the board dts includes `rk3588-rk806-single.dtsi`, which
places an `rk806@0` child under `&spi2`, and the board file only overrides the
pinctrl and `num-cs = <1>`:

```dts
&spi2 {
    pinctrl-names = "default";
    pinctrl-0 = <&spi2m2_cs0 &spi2m2_pins>;
    num-cs = <1>;
    status = "okay";
};
```

That is why the controller is visible but no `/dev/spidev*` node exists — the
single device on the bus is the PMIC, which binds through regmap and creates no
character device:

```bash
ls /sys/class/spi_master/     # spi2   — controller probed
ls /sys/bus/spi/devices/      # spi2.0 — RK806 bound
dmesg | grep -i rk806         # rk806 spi2.0: chip id: RK806,ver:0x2, 0x1
```

**Never repin `&spi2` or release its CS0.** Losing the PMIC means losing every
core rail and the board will not boot. Use SPI0, SPI3 or SPI4 for header devices,
and keep `&spi2` exactly as it is.
## Related

- [SPI](/spi) — loopback test, device settings, troubleshooting.
- [40-PIN Pinout](/r5a-pinout) — complete header pin table.
- [Linux](/linux#device-tree) — device tree basics.

---
title: "SPI (R5A)"
sidebar_label: "SPI"
sidebar_position: 6
slug: "/r5a-spi"
---

# SPI (R5A)

The commands and rules on [SPI](/spi) apply unchanged to the R5A. This page
lists the pins and the device-tree configuration that enables the controller.

## SPI0 on the R5A

SPI0 is routed to the header with both chip selects:

| Signal | Pin | Direction |
|---|---|---|
| `SPI0_MOSI_M2` | 19 | Master → slave |
| `SPI0_MISO_M2` | 21 | Slave → master |
| `SPI0_CLK_M2` | 23 | Clock |
| `SPI0_CS0_M2` | 24 | Chip select 0 |
| `SPI0_CS1_M2` | 26 | Chip select 1 |

SPI0 can also be routed in the M1 mux (MOSI 13 / MISO 11 / CLK 15 / CS0 36 /
CS1 28), and the header additionally offers SPI2 (M1: MOSI 33 / MISO 31 / CLK
35 / CS0 37 / CS1 27), SPI3 (chip selects 5 / 3) and SPI4 (MOSI 16 / MISO 18) —
see the [R5A 40-PIN Pinout](/r5a-pinout).

## Device tree configuration (DTS)

The controller is off by default. Edit the board dts by hand to enable SPI0
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

## Related

- [SPI](/spi) — loopback test, device settings, troubleshooting.
- [40-PIN Pinout](/r5a-pinout) — complete header pin table.
- [Linux](/linux#device-tree-and-overlays) — device tree basics.

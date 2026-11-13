---
title: "Hardware Files"
sidebar_label: "Hardware Files"
sidebar_position: 2
slug: "/hardware-files"
---

# Hardware Files

![Hardware documentation package placeholder 960 x 540 px](/img/placeholder-960x540.png)

> Image placeholder: **960 × 540 px** (suggested use: document / drawing package overview). Replace it later
> with a verified image of the same dimensions.

The R5A design package is published in the **Hardware information** section of
the [TBoard Drive](https://drive.google.com/drive/folders/1x2KOX1F4-DVyyV_9qfdH28PWIORcWH56),
under the R5A product folder. It is the reference for carrier boards, enclosures
and repair work.

## What the package contains

| File | Format | Use |
|---|---|---|
| Schematic | PDF | Net-level reference for every connector and rail |
| PCB layout | PDF / source | Layer stack-up, impedance, keep-out zones |
| 2D drawing | DXF | Enclosure cut-outs and mounting holes |
| 3D model | STEP | Mechanical integration |
| BOM | XLSX / PDF | Component list, alternates per revision |
| Connector datasheets | PDF | Mating part numbers for FPC, fan, RTC and 40-pin headers |
| Quality inspection report | PDF | Factory test results for the production batch |

Pin-level information is on the [R5A 40-PIN Pinout](/r5a-pinout) page; this page
only covers the downloadable documents.

## Board revisions

| Revision | Changes |
|---|---|
| V1.0 | Initial release |
| V1.1 | Voltage-regulator pins of U27 / U7 / U6301 changed; USB U15 moved from TypeC1 to TypeC0 and CN31 changed from USB 3.0 to USB 2.0; 40-pin header gained UART protection and J2 / CN2 / CN32 moved to a 0.8 mm pitch connector; CSI1 moved from I2C3 to I2C4 and R6352 was removed; Wi-Fi module changed from AP6275S to AP6275P |

Check the revision printed on the silkscreen (and the Wi-Fi module marking)
before comparing a measurement with a schematic. Documents for an older
revision stay in the same folder with the revision in the file name.

## Using the files

- **Mounting**: use the STEP model for the enclosure and keep the antenna area
  clear — the onboard Wi-Fi antenna must not sit under a metal plate.
- **Thermals**: the SoC and the LPDDR4 stacks are the hot spots; a heatsink
  contact area drawing is included in the 2D package.
- **Power**: the Type-C input accepts **5 V – 23 V**. When designing a carrier
  board, keep the input protection and do not back-feed 5 V into the 40-pin
  header.
- **Connector mating parts**: the FPC connectors are 0.5 mm pitch for CSI/DSI,
  0.8 mm pitch for the fan and RTC battery connectors. Wrong pitch is the most
  common cause of a "dead" camera or display.

## Rebuild or verify a board

1. Compare the revision marking with the schematic revision.
2. Check the rails listed in the schematic before replacing a component —
   measure 3.3 V, 5 V and the DRAM rail.
3. When a rail is missing, the PMIC (RK806) is usually the first suspect; the
   schematic shows the test points.
4. After a repair, run the checks on [First Boot](/first-boot) and the interface
   scans on [GPIO](/gpio) and [I2C](/i2c).

## Related

- [TBoard R5A](/tboard-r5a) — specifications and connectors.
- [R5A 40-PIN Pinout](/r5a-pinout) — header pin assignment.
- [Downloads](/downloads) — where every package lives.
- [Tools & Drivers](/tools) — software needed to bring a repaired board up.

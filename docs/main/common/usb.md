---
title: "USB"
sidebar_label: "USB"
sidebar_position: 7
slug: "/usb"
---

# USB

TBoard boards provide USB host ports (USB 3.0 / USB 2.0) and a USB Type-C
power input. The exact port count, connector types and which port also works as
an OTG/flashing port are board-specific — see your board's page under Boards.

## Verify devices

```bash
lsusb                          # device tree of the USB bus
lsusb -t                       # speed and driver per device
dmesg -w                       # plug a device in and watch enumeration
```

A device that appears in `lsusb` but has no driver shows up in `dmesg -w` as
`new high-speed USB device … Product: …` followed by no interface binding —
install the matching kernel module.

## Power budget

Use the adapter recommended in your board's specification. Rules that hold on
every board:

- USB 2.0 port: 500 mA, USB 3.0 port: 900 mA.
- Spinning disks, LTE modems and multiple high-draw devices need a **powered
  hub**, otherwise the supply sags and the board reboots under load.
- If the board accepts a wide input range (typically 5 V – 23 V), a fixed-voltage
  12 V or 20 V USB-C supply is fine and reduces input current — the board does
  not negotiate USB PD, so use a fixed-voltage adapter.
- Do not back-feed 5 V into the 40-pin header while the Type-C supply is
  connected.

## Throughput

USB 3.0 ports are connected to the SoC's USB 3.0 controller and reach
400–450 MB/s with a UAS-capable SSD. If a device falls back to ~35 MB/s, check
`lsusb -t`: `uas` vs `usb-storage` shows whether UAS was enabled. Some bridges
misbehave with UAS; disable it per device with a `usb-storage.quirks` entry in
the kernel command line.

## Flashing over USB

Rockchip boards flash eMMC over a USB OTG port:

1. Power off, connect the board's flashing port to the PC (see your board's
   page for which port and which cable).
2. Enter Maskrom or Loader mode (see [Tools](/tools)).
3. Flash with RKDevTool or `upgrade_tool`.
4. Remove the cable, power-cycle.

Avoid USB hubs and front-panel ports during flashing; `Download Boot Fail` is
almost always a cable or hub problem.

## Related

- [Flashing the Image](/flashing) — full procedure.
- [Tools & Drivers](/tools) — USB driver and flashing tools.

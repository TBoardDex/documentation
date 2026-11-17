---
title: "USB (R5A)"
sidebar_label: "USB"
sidebar_position: 8
slug: "/r5a-usb"
---

# USB (R5A)

The general rules on [USB](/usb) apply unchanged to the R5A. This page lists
the ports and which one doubles as the flashing port.

## Ports on the R5A

| Port | Type | Role |
|---|---|---|
| USB 3.0 × 2 | Type-A, host | SSDs, cameras, hubs |
| USB 2.0 × 2 | Type-A, host | Keyboard, mouse, serial adapters |
| USB-C | Power input | **PWR IN**, 5 V – 23 V |

One USB 3.0 Type-A port is wired to the SoC OTG controller (`usbdrd_dwc3_0`)
and is the **flashing port**: connect it to the PC with an A-to-A cable while
the board is in Maskrom or Loader mode.

In the running system that controller is set to **host** (`dr_mode = "host"` in
`rk3588s-TBoard-R5A.dts`; the `peripheral` line is commented out), so the port
behaves like an ordinary Type-A host port and no device/gadget node appears. To
use it as a USB device (gadget, RNDIS network, ADB), change the node and reflash:

```dts
&usbdrd_dwc3_0 {
    dr_mode = "peripheral";     /* stock value is "host" */
    status = "okay";
};
```

Flashing itself does not depend on this setting: Maskrom is handled by the SoC
ROM and Loader by U-Boot, both before Linux starts.

## Power

A **5 V / 3 A** Type-C supply covers the board plus one bus-powered 2.5" drive.
The board does not negotiate USB PD — use a fixed-voltage supply. Bus-powered
spinning disks and multiple high-draw devices need a powered hub; see
[USB](/usb) for the power-budget and throughput rules.

## Related

- [USB](/usb) — power budget, UAS throughput, flashing procedure.
- [Tools & Drivers](/tools) — drivers and flashing tools.
- [Overview](/tboard-r5a) — port layout and interface summary.

---
title: "Camera (R5A)"
sidebar_label: "Camera"
sidebar_position: 10
slug: "/r5a-camera"
---

# Camera (R5A)

The pipeline explanation and the capture commands on [Camera](/camera) apply
unchanged to the R5A. This page lists the connector and the supported module.

## CSI on the R5A

One MIPI CSI connector, compatible with **IMX219-based** camera modules. The
sensor is off by default, and the stock `rk3588s-TBoard-R5A.dts` carries no
CSI / sensor node at all — add the IMX219 node (sensor, I2C address, DPHY
routing) to the board dts by hand, then rebuild and flash the kernel image.

## Verifying

```bash
dmesg | grep -i imx219         # probe: sensor name + I2C address
v4l2-ctl --list-devices        # capture and ISP nodes
media-ctl -p -d /dev/media0    # sensor -> dphy -> rkcif -> rkisp pipeline
```

A healthy probe reports the sensor and its I2C address, for example
`imx219 4-0010: Detected IMX219 sensor`. Use the ISP node (not the raw `rkcif`
node) for captured frames — see [Camera](/camera) for the v4l2 and GStreamer
commands and the troubleshooting table.

## Related

- [Camera](/camera) — probe, capture, GStreamer preview, troubleshooting.
- [Overview](/tboard-r5a) — supported camera modules.
- [Display](/display) — previewing the stream.

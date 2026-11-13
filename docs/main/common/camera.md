---
title: "MIPI CSI Camera"
sidebar_label: "Camera"
sidebar_position: 9
slug: "/camera"
---

# MIPI CSI Camera

RK3588(S) integrates an ISP with MIPI CSI input. TBoard boards expose CSI
connectors for camera modules; the number of connectors and the supported
camera module family are board-specific — see your board's page under Boards.

## Connecting a camera

1. Power off the board.
2. Lift the FFC latch on the CSI connector, insert the ribbon with contacts in
   the orientation shown on the silkscreen, and press the latch back.
3. Boot and enable the camera overlay shipped with the TBoard image (the exact
   overlay file name matches your image release and sensor), then reboot.

```bash
ls /boot/dtb/overlay/ | grep -i camera         # TBoard SDK image
ls /boot/dtb/rockchip/overlay/ | grep -i camera   # Armbian-based image
```

The overlay declares the sensor node, its I2C address, the clock and the CSI
data lanes. Lanes are the usual reason a module is detected but delivers no
image: a 2-lane module in a 4-lane overlay (or the reverse) fails at stream-on.

## Verify the camera

Take the sensor name from the overlay file you enabled, then check the probe:

```bash
dmesg | grep -i <sensor-name>   # driver version, detected chip ID
v4l2-ctl --list-devices         # capture and ISP nodes
media-ctl -p -d /dev/media0     # pipeline: sensor -> csi2 dphy -> rkcif -> rkisp
```

A healthy probe log names the sensor and reports its I2C address, for example
`imx219 4-0010: Detected IMX219 sensor`. If the address is missing, run
`i2cdetect -y <bus>` on the bus the overlay assigns to the sensor — no response
means power, ribbon orientation or the wrong overlay.

## Capture

The ISP produces several video nodes per camera: a self path, a main path and
metadata. Use the ISP node rather than the raw `rkcif` node unless you want
unprocessed Bayer data. The board page names the usual node on your image.

```bash
# list supported formats and sizes
v4l2-ctl -d /dev/video0 --list-formats-ext

# one 1920x1080 NV12 frame
v4l2-ctl -d /dev/video0 \
  --set-fmt-video=width=1920,height=1080,pixelformat=NV12 \
  --stream-mmap --stream-count=1 --stream-to=frame.nv12
```

Preview with GStreamer (installed on desktop images):

```bash
gst-launch-1.0 v4l2src device=/dev/video0 ! \
  video/x-raw,width=1920,height=1080,format=NV12 ! \
  videoconvert ! autovideosink
```

NV12 frames can be converted to PNG for inspection:

```bash
ffmpeg -f rawvideo -pixel_format nv12 -video_size 1920x1080 -i frame.nv12 frame.png
```

## Multiple cameras

The RK3588 ISP supports multiplexing: a single ISP instance can serve up to four
sensors, at reduced resolution (2 paths → 3840×2160, 3–4 paths → 2560×1536).
Each camera needs its own overlay (one per CSI connector) and a distinct sensor
I2C address — most modules offer an address strap for exactly this reason.

## Troubleshooting

| Symptom | Check |
|---|---|
| No `/dev/video*` node | Overlay not enabled, or probe failed — look at `dmesg` |
| Probe fails with `-ENODEV` / no address | Ribbon orientation, module power, wrong overlay |
| Node exists, stream-on times out | Lane count mismatch or unsupported link frequency |
| Green/purple image | Wrong Bayer order in the media pipeline |
| Frames drop at high resolution | Increase buffers, or lower the resolution; check `dmesg` for `csi` errors |

## Related

- [Display Output](/display) — previewing the stream.
- [Linux](/linux#device-tree-and-overlays) — overlay configuration.

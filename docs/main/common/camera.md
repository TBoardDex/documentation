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
3. Power up. The sensor has to be enabled in the device tree (DTS) first — see
   the next section.

## Enable the camera in the DTS

Enable the sensor by editing the DTS (device tree source). The board DTS lives
in `kernel/arch/arm64/boot/dts/rockchip/` in the SDK (the exact file is
board-specific):

1. Add the sensor node to the board DTS: the driver `compatible` string, the I2C
   address, `clock-frequency` (module oscillator) and the CSI `data-lanes`
   (2 for a 2-lane module, 4 for a 4-lane module);
2. Attach the sensor to the MIPI port that belongs to the CSI connector you
   used;
3. Rebuild the kernel (`./build.sh kernel` in the SDK), flash the new
   `boot.img` — the rebuilt device tree is packed inside — and reboot.

Lanes are the usual reason a module is detected but delivers no image: a 2-lane
module configured as 4-lane (or the reverse) fails at stream-on.

## Verify the camera

Take the sensor name from the DTS entry you added, then check the probe:

```bash
dmesg | grep -i <sensor-name>   # driver version, detected chip ID
v4l2-ctl --list-devices         # capture and ISP nodes
media-ctl -p -d /dev/media0     # pipeline: sensor -> csi2 dphy -> rkcif -> rkisp
```

A healthy probe log names the sensor and reports its I2C address, for example
`imx219 4-0010: Detected IMX219 sensor`. If the address is missing, run
`i2cdetect -y <bus>` on the bus the DTS assigns to the sensor — no response means
power, ribbon orientation or a DTS misconfiguration.

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
Each camera must be enabled separately in the DTS (one entry per CSI connector)
and needs a distinct sensor I2C address — most modules offer an address strap
for exactly this reason.

## Troubleshooting

| Symptom | Check |
|---|---|
| No `/dev/video*` node | Sensor not configured in the DTS, or probe failed — look at `dmesg` |
| Probe fails with `-ENODEV` / no address | Ribbon orientation, module power, DTS misconfiguration |
| Node exists, stream-on times out | Lane count mismatch or unsupported link frequency |
| Green/purple image | Wrong Bayer order in the media pipeline |
| Frames drop at high resolution | Increase buffers, or lower the resolution; check `dmesg` for `csi` errors |

## Related

- [Display Output](/display) — previewing the stream.
- [SDK Sources](/sdk-sources) — kernel and board DTS repositories.
- [Linux](/linux#device-tree) — dtb location and replacement.

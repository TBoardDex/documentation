---
title: "MIPI CSI Camera"
sidebar_label: "Camera"
sidebar_position: 9
slug: "/camera"
---

# MIPI CSI Camera

![camera module connection placeholder 800 x 450 px](/img/placeholder-800x450.png)

> Image placeholder: **800 × 450 px** (suggested use: connection photo /
> wiring diagram). Replace it later with a verified image of the same dimensions.

RK3588(S) integrates an ISP with MIPI CSI input. TBoard boards expose CSI
connectors for camera modules; the number of connectors and the supported
camera module family are board-specific — the R5A, for example, works with
IMX219-based modules (see [TBoard R5A](/tboard-r5a)).

## Connecting a camera

1. Power off the board.
2. Lift the FFC latch on the CSI connector, insert the ribbon with contacts in
   the orientation shown on the silkscreen, and press the latch back.
3. Boot and enable the camera overlay shipped with the TBoard image (the exact
   overlay file name matches your image release), then reboot.

## Verify capture

```bash
v4l2-ctl --list-devices
v4l2-ctl -d /dev/video0 --list-formats-ext
# capture one frame:
v4l2-ctl -d /dev/video0 --set-fmt-video=width=1920,height=1080,pixelformat=NV12   --stream-mmap --stream-count=1 --stream-to=frame.nv12
```

If no `/dev/video*` nodes appear, re-check the ribbon orientation and the
overlay.

## Related

- [TBoard R5A](/tboard-r5a) — supported camera modules on the R5A.
- [R5A 40-PIN Pinout](/r5a-pinout)

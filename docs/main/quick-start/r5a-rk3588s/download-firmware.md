---
title: "Download Firmware"
sidebar_label: "Download Firmware"
sidebar_position: 3
slug: "/download-firmware"
---

# Download Firmware

![download page screenshot placeholder 800 x 450 px](/img/placeholder-800x450.png)

> Image placeholder: **800 × 450 px** (suggested use: procedure photo /
> screenshot). Replace it later with a verified image of the same dimensions.

## Pick the right image

All R5A images are published on the [Downloads](/downloads) page. Choose:

1. **Board**: TBoard R5A.
2. **OS**: Debian or Ubuntu image.
3. **Target**: microSD/SD-card image or eMMC `update.img`.
4. **Hardware revision**: match your board revision if several are listed.

## Verify before flashing

Check the SHA-256 checksum of the downloaded file before writing it:

```bash
sha256sum tboard-r5a-debian.img.xz
# compare with the value published next to the download link
```

## Image types at a glance

| Type | Written with | Goes to |
|---|---|---|
| SD-card image | balenaEtcher / Rufus / `dd` | microSD card |
| `update.img` | RKDevTool (Windows) or upgrade_tool (Linux) | eMMC |

## Related

- [Downloads](/downloads)
- [Flashing the Image](/flashing) — next step.

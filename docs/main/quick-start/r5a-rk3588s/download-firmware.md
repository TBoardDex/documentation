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

Check the MD5 checksum of the downloaded file before writing it. The download
page provides the `.img` image together with its `-md5.txt` checksum file.

**Windows** (run in cmd):

```bat
certutil -hashfile TBoard-R5A-ubuntu22.04-GNOME-V1.0.0.img MD5
:: compare the output with the value in the -md5.txt file
```

<img src="/img/r5a-md5-windows.png" alt="Verifying MD5 with certutil on Windows" width="700" />

**Linux** (`md5sum`):

```bash
md5sum TBoard-R5A-debian11-Xfce-V1.0.0.img
# compare the output with the value in the -md5.txt file
```

<img src="/img/r5a-md5-linux.png" alt="Verifying MD5 with md5sum on Linux" width="700" />

## Related

- [Downloads](/downloads)
- [Flashing the Image](/flashing) — next step.

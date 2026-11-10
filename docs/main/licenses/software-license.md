---
title: "Software Open Source License"
sidebar_label: "Software Open Source License"
sidebar_position: 1
slug: "/licenses/software"
---

# Software Open Source License

![TBoard placeholder image 640 x 360 px](/img/placeholder-640x360.png)

> Image placeholder: **640 × 360 px** (suggested use: licence overview graphic). Replace it later
> with a verified image of the same dimensions.


## Layered licensing model

TBoard software is released under a layered model. Each layer keeps the licence
of its original upstream component; the layers are not merged into a single
licence.

| Layer | Components | Licence |
| --- | --- | --- |
| Platform foundation | Linux kernel, U-Boot | GPL v2 |
| Vendor binaries | Rockchip loader / trust binaries (`rkbin`) | Proprietary, Rockchip. Not open source. |
| TBoard-authored code | Board support packages, scripts, device trees, tooling | Apache License 2.0 |

## Your obligations

- GPL v2 components: if you distribute a modified kernel or U-Boot binary, you
  must provide the corresponding source under the same licence.
- Apache 2.0 components: retain copyright and licence notices, state changes,
  and preserve the NOTICE file. The licence grants an express patent grant.
- Proprietary vendor binaries may be redistributed only as supplied; they are
  not covered by any open-source grant and must not be reverse engineered.
- Each layer is independent. Using TBoard code under Apache 2.0 does not
  relicense the GPL or proprietary layers.

## Source code

All TBoard-authored repositories are published under the TBoardDex organisation
on GitHub. Refer to the [downloads section](https://forum.tboard.org) on the forum for release
posts and version mapping.

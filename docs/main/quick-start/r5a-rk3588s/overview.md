---
title: "R5A (RK3588S) Quick Start"
sidebar_label: "Overview"
sidebar_position: 1
slug: "/quick-start"
---

# R5A (RK3588S) Quick Start

![TBoard R5A kit photo placeholder 1200 x 675 px](/img/placeholder-1200x675.png)

> Image placeholder: **1200 × 675 px** (suggested use: kit contents photo).
> Replace it later with a verified image of the same dimensions.

Take the TBoard R5A from box to first boot in four steps. The board runs on the
Rockchip RK3588S (8-core CPU, Mali-G610 MP4 GPU, 6 TOPS NPU) — see the full
specifications on the [TBoard R5A](/tboard-r5a) page.

## In the box

- TBoard R5A board
- Optional heatsink / fan kit (recommended for long-running workloads)

![TBoard R5A box contents placeholder 1200 x 675 px](/img/placeholder-1200x675.png)

> Image placeholder: **1200 × 675 px** (suggested use: box contents photo).
> Replace it later with a verified image of the same dimensions.

You will also need: a **5 V / 3 A USB Type-C** power adapter (board accepts
5–23 V), a microSD card (≥ 32 GB) or eMMC module, a Micro-HDMI cable,
and optionally a 3.3 V USB-to-serial adapter for the debug console.

## Four steps

1. [Assembly & Connections](/assembly) — mount cooling, connect display,
   network and power.
2. [Download Firmware](/download-firmware) — pick the right image for your R5A
   hardware revision.
3. [Flashing the Image](/flashing) — write it to microSD or eMMC.
4. [First Boot](/first-boot) — log in via serial console or display.

## Where to go next

- [R5A 40-PIN Pinout](/r5a-pinout) and the [Common](/common) module pages —
  use the interfaces.
- [Basic Compilation](/basic-compile) — cross-compile your first program.
- [TBoard R5A](/tboard-r5a) — full specifications.

## Naming convention

This section is grouped by board, and every group label carries the SoC model:
`R5A (RK3588S)`. To document a new board, add a sibling folder named
`<board>-<soc>` (lower case) under `quick-start/`, copy this folder's page set,
and give its `_category_.json` a label such as `R5B (RK3576)`. That keeps
multi-platform boards one click away in the sidebar.

## Related

- [Downloads](/downloads)
- [Forum](https://forum.tboard.org)

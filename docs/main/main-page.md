---
title: "TBoard Documentation"
sidebar_label: "Home"
sidebar_position: 0
slug: /
hide_title: true
---

import HomeHero from '@site/src/components/HomeHero';
import PathCards from '@site/src/components/PathCards';
import HomeShowcase from '@site/src/components/HomeShowcase';

<HomeHero />

<PathCards />

<HomeShowcase />

## Start here

New to the board? Follow these steps in order:

1. [R5A (RK3588S) Quick Start](/quick-start) — board introduction and the guided setup path.
2. [Downloads](/downloads) — pick the image, SDK and design files that match your board revision.
3. [Flash the Image](/flashing) and [First Boot](/first-boot) — Maskrom / Loader flashing, then serial console and boot log.

The [R5A (RK3588S)](/tboard-r5a) board page carries all hardware specifications,
connectors and pin definitions.

## Documentation at a glance

| Section | What it covers |
| --- | --- |
| [Quick Start](/quick-start) | Short per-board onboarding: introduction, assembly, firmware download, flashing, first boot and a basic compile |
| [Boards](/tboard-r5a) | Board specifications, connectors, pinout and mechanical data |
| [Downloads](/downloads) | Every board's hardware design files, firmware / OS images, SDK sources and tools |
| [Common](/common) | Conventions, shared resources and common troubleshooting |
| [Accessories](/accessories) | Displays, camera modules, cooling kits, expansion boards and power adapters |
| [Linux](/linux) | Linux images, system configuration and platform services |
| [Android](/android) | Android images, flashing and platform customisation |
| [Others](/others) | Network, remote desktop, package sources, file transfer and board information |
| [Licenses](/licenses/software) | Software and hardware licensing terms |

The Common, Accessories, Linux, Android and Others sections are being expanded progressively;
the left sidebar lists every page.

## Board naming convention

Quick Start is grouped **by board**, and every group label includes the SoC
model — for example `R5A (RK3588S)`. When another platform arrives, add a sibling
folder named `<board>-<soc>` under `quick-start/` and give its category a label
such as `R5B (RK3576)`. That keeps each board one click away, even across
several chip families. Downloads keeps a matching per-board index table.

## Community & support

Release announcements and design files are published on the
[forum](https://forum.tboard.org). Source repositories live under
[TBoardDex on GitHub](https://github.com/TBoardDex), and product information
is on the [overseas website](https://www.tboard.org) and the
[China website](https://www.tboard.cn).

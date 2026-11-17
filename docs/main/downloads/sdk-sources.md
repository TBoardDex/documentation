---
title: "SDK & Sources"
sidebar_label: "SDK & Sources"
sidebar_position: 4
slug: "/sdk-sources"
---

# SDK & Sources

![SDK build flow placeholder 960 x 540 px](/img/placeholder-960x540.png)

> Image placeholder: **960 × 540 px** (suggested use: build or download flow diagram). Replace it later
> with a verified image of the same dimensions.

The TBoard SDK is a Rockchip Linux BSP with the R5A board support added. It is
split into several Git repositories that are fetched together with `repo`.

## Repositories

| Repository | Contents |
|---|---|
| [`TBoardDex/manifests`](https://github.com/TBoardDex/manifests) | `repo` manifest, pins every repository to a revision |
| [`TBoardDex/rockchip-kernel`](https://github.com/TBoardDex/rockchip-kernel) | Linux 5.10 / 6.1 vendor kernel, R5A device trees |
| [`TBoardDex/u-boot`](https://github.com/TBoardDex/u-boot) | U-Boot, TPL/SPL and the R5A board files |
| `rkbin` (Rockchip) | DDR init, BL31 and loader binaries, pulled by the manifest |

Branches follow the kernel line: the manifest's `linux` branch is what the
published images are built from. Do not mix kernel and U-Boot from different
branches — device-tree bindings and the loader ABI are versioned together.

## Build

`./build.sh help` lists every target. The board configuration is chosen with
`chip` (SoC + board defconfig); a bare `./build.sh` then builds everything:

```bash
cd ~/tboard-sdk
./build.sh chip        # RK3588 + tboard-r5a_rk3588s_debian_xfce_defconfig
./build.sh             # loader + U-Boot + kernel + rootfs + update.img
```

The three board defconfigs are:

| Defconfig | Root filesystem |
|---|---|
| `tboard-r5a_rk3588s_debian_xfce_defconfig` | Debian 11 + Xfce (`RK_DEBIAN=y`, `RK_ROOTFS_HOSTNAME="TBoard-R5A"`) |
| `tboard-r5a_rk3588s_ubuntu_gnome_defconfig` | Ubuntu 22.04 + GNOME |
| `tboard-r5a_rk3588s_ubuntu_server_defconfig` | Ubuntu 22.04 server |

Board facts live in that defconfig, not in the kernel tree:
`RK_KERNEL_DTS_NAME="rk3588s-TBoard-R5A"`, `RK_UBOOT_CFG="rk3588-tboard-r5a"`,
`RK_KERNEL_CFG_FRAGMENTS="rk3588s_tboard.config"`, `RK_WIFIBT_CHIP="AIC8800"`,
`RK_USE_FIT_IMG=y`, `RK_PARAMETER="parameter-tboard.txt"`,
`RK_ROOTFS_INSTALL_MODULES=y`. U-Boot is configured by a fragment,
`u-boot/configs/rk3588-tboard-r5a.config`
(`CONFIG_BASE_DEFCONFIG="rk3588_defconfig"`), applied on top of `rk3588_defconfig` —
there is no standalone `rk3588-tboard-r5a_defconfig` file.

Building one component at a time:

| Command | Output |
|---|---|
| `./build.sh loader` | `rockdev/MiniLoaderAll.bin` (rk3588_spl_loader_v1.18.113.bin) |
| `./build.sh uboot` | `u-boot/uboot.img` |
| `./build.sh kernel` | `kernel/boot.img`, `kernel/resource.img`, `kernel/zboot.img` — there is **no** `extboot.img` |
| `./build.sh kernel-modules` | Kernel modules only, into the kernel output tree |
| `./build.sh linux-headers` | The only kernel package emitted: `output/linux-headers/linux-headers-5.10-arm64_arm64.deb` (there is no `linux-image` deb) |
| `./build.sh debian` / `./build.sh ubuntu` | Root filesystem images (Debian Xfce / Ubuntu GNOME) |
| `./build.sh ubuntu-server`, `./build.sh ubuntu-desktop` | Explicit Ubuntu flavours |
| `./build.sh firmware` | Copy partitions into `rockdev/` |
| `./build.sh updateimg` | Pack `rockdev/update.img` |

`rockdev/update.img` is the file you flash to eMMC with [RKDevTool](/tools). A
kernel-only change needs just `./build.sh kernel` plus an image update of
`boot` and `resource` — this is how the optional-hardware recipes on the board
pages are applied.

A complete tree is large: the reference checkout is ~118 GB (one kernel, one
U-Boot, all rootfs flavours). Budget 150 GB if you build several flavours or
keep `ccache`.
## Related

- [Firmware Images](/firmware-images) — prebuilt images if you do not need to build.
- [Linux](/linux) — runtime configuration of a built image.
- [Basic Compilation](/basic-compile) — a first cross-compiled program.

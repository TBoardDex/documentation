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
| [`TBoardDex/rockchip-kernel`](https://github.com/TBoardDex/rockchip-kernel) | Linux 5.10 / 6.1 vendor kernel, R5A device trees and overlays |
| [`TBoardDex/u-boot`](https://github.com/TBoardDex/u-boot) | U-Boot, TPL/SPL and the R5A board files |
| `rkbin` (Rockchip) | DDR init, BL31 and loader binaries, pulled by the manifest |

Branches follow the kernel line: the manifest's `linux` branch is what the
published images are built from. Do not mix kernel and U-Boot from different
branches — device-tree bindings and the loader ABI are versioned together.

## Build host

| Item | Requirement |
|---|---|
| OS | Ubuntu 20.04 or 22.04, 64-bit (Windows hosts run the SDK in a VM or WSL2) |
| Disk | 80 GB free for one build; 150 GB+ for several configurations or a ccache |
| RAM | 8 GB minimum, 16 GB recommended for `-j8` kernel builds |
| Network | Access to GitHub and to the Rockchip binary mirror |

Install the usual build dependencies:

```bash
sudo apt-get update
sudo apt-get install -y git ssh make gcc g++ libssl-dev liblz4-tool \
  expect expect-dev patchelf chrpath gawk texinfo diffstat binfmt-support \
  qemu-user-static live-build bison flex fakeroot cmake gcc-multilib \
  g++-multilib unzip device-tree-compiler ncurses-dev bzip2 bc \
  python-is-python3 python3-pip python3-pyelftools dpkg-dev rsync
```

Install `repo` once and put it on `PATH`:

```bash
mkdir -p ~/bin
curl https://storage.googleapis.com/git-repo-downloads/repo > ~/bin/repo
chmod a+x ~/bin/repo
export PATH=~/bin:$PATH
```

## Fetch the source

| Product | SDK Source |
|---|---|
| TBoard-R5A | [https://github.com/TBoardDex/tboard-manifest](https://github.com/TBoardDex/tboard-manifest) |

```bash
// Refer to the README.md of the manifest repository on GitHub for the actual instructions
mkdir ~/tboard-sdk && cd ~/tboard-sdk
repo init -u https://github.com/TBoardDex/manifests.git -b linux -m tboard_linux_generic.xml
repo sync -c -j4 --no-tags
```

`-c` fetches only the current branch, `-j4` uses four parallel jobs — raise it
on a fast link. The first sync is roughly 30 GB.

Update later with:

```bash
cd ~/tboard-sdk
repo sync -c -j4
```

To update only one repository (for example after local changes elsewhere):

```bash
cd kernel
git pull
```

## Build

```bash
cd ~/tboard-sdk
./build.sh chip        # choose the SoC (RK3588) and the board defconfig
./build.sh            # U-Boot + kernel + rootfs + update.img
```

The output lands in `rockdev/`; `rockdev/update.img` is the file you flash to
eMMC with [RKDevTool](/tools).

Build one component at a time when iterating:

| Command | Output |
|---|---|
| `./build.sh uboot` | `u-boot/uboot.img` |
| `./build.sh kernel` | `kernel/extboot.img` and the kernel `.deb` packages |
| `./build.sh debian` / `./build.sh ubuntu` | Root filesystem image |
| `./build.sh firmware` | Assembles partitions into `rockdev/` |
| `./build.sh updateimg` | Packs `rockdev/update.img` |

## Related

- [Firmware Images](/firmware-images) — prebuilt images if you do not need to build.
- [Linux](/linux) — runtime configuration of a built image.
- [Basic Compilation](/basic-compile) — a first cross-compiled program.

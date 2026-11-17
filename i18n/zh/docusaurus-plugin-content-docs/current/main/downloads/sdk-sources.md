---
title: "SDK 与源码"
sidebar_label: "SDK 与源码"
sidebar_position: 4
slug: "/sdk-sources"
---

# SDK 与源码

![SDK 构建流程占位图 960 x 540 px](/img/placeholder-960x540.png)

> 图片占位：**960 × 540 px**（建议用途：构建 / 下载流程图）。后期请替换为
> 相同尺寸的真实图片。

TBoard SDK 是在瑞芯微 Linux BSP 基础上加入 R5A 板级支持后的完整源码，按仓库
拆分，通过 `repo` 统一拉取。

## 仓库组成

| 仓库 | 内容 |
|---|---|
| [`TBoardDex/manifests`](https://github.com/TBoardDex/manifests) | `repo` manifest，锁定每个仓库的版本 |
| [`TBoardDex/rockchip-kernel`](https://github.com/TBoardDex/rockchip-kernel) | Linux 5.10 / 6.1 vendor 内核、R5A 设备树 |
| [`TBoardDex/u-boot`](https://github.com/TBoardDex/u-boot) | U-Boot、TPL/SPL 与 R5A 板级文件 |
| `rkbin`（瑞芯微） | DDR 初始化、BL31 与 loader 二进制，由 manifest 引入 |

分支与内核主线对应：发布镜像所用的就是 manifest 的 `linux` 分支。内核与
U-Boot 不要跨分支混用——设备树绑定和 loader 接口是配套演进的。

## 编译

`./build.sh help` 会列出全部目标。先用 `chip` 选择 SoC 与板级 defconfig，再直接
执行 `./build.sh` 完整编译：

```bash
cd ~/tboard-sdk
./build.sh chip        # RK3588 + tboard-r5a_rk3588s_debian_xfce_defconfig
./build.sh             # loader + U-Boot + 内核 + rootfs + update.img
```

三个板级 defconfig：

| Defconfig | 根文件系统 |
|---|---|
| `tboard-r5a_rk3588s_debian_xfce_defconfig` | Debian 11 + Xfce（`RK_DEBIAN=y`，`RK_ROOTFS_HOSTNAME="TBoard-R5A"`） |
| `tboard-r5a_rk3588s_ubuntu_gnome_defconfig` | Ubuntu 22.04 + GNOME |
| `tboard-r5a_rk3588s_ubuntu_server_defconfig` | Ubuntu 22.04 服务器 |

板级信息写在这个 defconfig 里，而不是内核树里：
`RK_KERNEL_DTS_NAME="rk3588s-TBoard-R5A"`、`RK_UBOOT_CFG="rk3588-tboard-r5a"`、
`RK_KERNEL_CFG_FRAGMENTS="rk3588s_tboard.config"`、`RK_WIFIBT_CHIP="AIC8800"`、
`RK_USE_FIT_IMG=y`、`RK_PARAMETER="parameter-tboard.txt"`、
`RK_ROOTFS_INSTALL_MODULES=y`。U-Boot 侧是一个片段文件
`u-boot/configs/rk3588-tboard-r5a.config`
（`CONFIG_BASE_DEFCONFIG="rk3588_defconfig"`），叠加在 `rk3588_defconfig` 上——
不存在独立的 `rk3588-tboard-r5a_defconfig`。

单组件编译：

| 命令 | 产物 |
|---|---|
| `./build.sh loader` | `rockdev/MiniLoaderAll.bin`（rk3588_spl_loader_v1.18.113.bin） |
| `./build.sh uboot` | `u-boot/uboot.img` |
| `./build.sh kernel` | `kernel/boot.img`、`kernel/resource.img`、`kernel/zboot.img` —— **没有** `extboot.img` |
| `./build.sh kernel-modules` | 只编译内核模块，输出到内核输出目录 |
| `./build.sh linux-headers` | SDK 唯一的内核包：`output/linux-headers/linux-headers-5.10-arm64_arm64.deb`（没有 `linux-image` 包） |
| `./build.sh debian` / `./build.sh ubuntu` | 根文件系统镜像（Debian Xfce / Ubuntu GNOME） |
| `./build.sh ubuntu-server`、`./build.sh ubuntu-desktop` | 单独指定 Ubuntu 版本 |
| `./build.sh firmware` | 把各分区拷进 `rockdev/` |
| `./build.sh updateimg` | 打包 `rockdev/update.img` |

`rockdev/update.img` 就是用 [RKDevTool](/tools) 烧到 eMMC 的文件。只改内核时，
`./build.sh kernel` 后更新 `boot` 与 `resource` 分区即可——板卡各页里的“可选硬件”
方案都是这样落地的。

整棵源码树很大：参考检出约 118 GB（一套内核、一套 U-Boot、全部 rootfs 版本）。
若要编译多个版本或保留 `ccache`，请准备 150 GB。
## 相关页面

- [固件与镜像](/firmware-images) — 不需要自行编译时直接下载。
- [Linux](/linux) — 编译后镜像的运行期配置。
- [基础编译](/basic-compile) — 第一个交叉编译程序。

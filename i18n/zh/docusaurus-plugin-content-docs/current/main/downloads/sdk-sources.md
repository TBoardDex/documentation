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
| [`TBoardDex/rockchip-kernel`](https://github.com/TBoardDex/rockchip-kernel) | Linux 5.10 / 6.1 vendor 内核、R5A 设备树与 overlay |
| [`TBoardDex/u-boot`](https://github.com/TBoardDex/u-boot) | U-Boot、TPL/SPL 与 R5A 板级文件 |
| `rkbin`（瑞芯微） | DDR 初始化、BL31 与 loader 二进制，由 manifest 引入 |

分支与内核主线对应：发布镜像所用的就是 manifest 的 `linux` 分支。内核与
U-Boot 不要跨分支混用——设备树绑定和 loader 接口是配套演进的。

## 编译主机

| 项目 | 要求 |
|---|---|
| 系统 | Ubuntu 20.04 或 22.04，64 位（Windows 主机请在虚拟机或 WSL2 中编译） |
| 磁盘 | 单次全量编译预留 80 GB；多配置或使用 ccache 建议 150 GB 以上 |
| 内存 | 最低 8 GB，`-j8` 编译内核建议 16 GB |
| 网络 | 可访问 GitHub 与瑞芯微二进制镜像 |

安装常用编译依赖：

```bash
sudo apt-get update
sudo apt-get install -y git ssh make gcc g++ libssl-dev liblz4-tool \
  expect expect-dev patchelf chrpath gawk texinfo diffstat binfmt-support \
  qemu-user-static live-build bison flex fakeroot cmake gcc-multilib \
  g++-multilib unzip device-tree-compiler ncurses-dev bzip2 bc \
  python-is-python3 python3-pip python3-pyelftools dpkg-dev rsync
```

安装 `repo` 并加入 `PATH`：

```bash
mkdir -p ~/bin
curl https://storage.googleapis.com/git-repo-downloads/repo > ~/bin/repo
chmod a+x ~/bin/repo
export PATH=~/bin:$PATH
```

## 拉取源码

| 产品 | SDK 源码 |
|---|---|
| TBoard-R5A | [https://github.com/TBoardDex/tboard-manifest](https://github.com/TBoardDex/tboard-manifest) |

```bash
// 实际以github仓库中manifest的README.md为准
mkdir ~/tboard-sdk && cd ~/tboard-sdk
repo init -u https://github.com/TBoardDex/manifests.git -b linux -m tboard_linux_generic.xml
repo sync -c -j4 --no-tags
```

`-c` 只拉当前分支，`-j4` 为四个并行任务，网络好可以调高。首次同步约 30 GB。

后续更新：

```bash
cd ~/tboard-sdk
repo sync -c -j4
```

只更新单个仓库（例如其他地方有本地改动时）：

```bash
cd kernel
git pull
```

## 编译

```bash
cd ~/tboard-sdk
./build.sh chip        # 选择 SoC（RK3588）与板级 defconfig
./build.sh            # U-Boot + 内核 + 根文件系统 + update.img
```

产物在 `rockdev/` 下，其中 `rockdev/update.img` 就是用
[RKDevTool](/tools) 烧到 eMMC 的镜像。

只改一部分时可以单独编译：

| 命令 | 产物 |
|---|---|
| `./build.sh uboot` | `u-boot/uboot.img` |
| `./build.sh kernel` | `kernel/extboot.img` 与内核 `.deb` 包 |
| `./build.sh debian` / `./build.sh ubuntu` | 根文件系统镜像 |
| `./build.sh firmware` | 汇总各分区到 `rockdev/` |
| `./build.sh updateimg` | 打包 `rockdev/update.img` |

## 相关页面

- [固件与镜像](/firmware-images) — 不需要自行编译时直接下载。
- [Linux](/linux) — 编译后镜像的运行期配置。
- [基础编译](/basic-compile) — 第一个交叉编译程序。

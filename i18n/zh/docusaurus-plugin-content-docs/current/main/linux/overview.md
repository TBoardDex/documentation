---
title: "Linux"
sidebar_label: "概览"
sidebar_position: 1
slug: "/linux"
---

# Linux

![TBoard Linux 系统总览占位图 960 x 540 px](/img/placeholder-960x540.png)

> 图片占位：**960 × 540 px**（建议用途：系统 / 启动流程图）。后期请替换为
> 相同尺寸的真实图片。

TBoard 的 Linux 镜像是瑞芯微 BSP 构建：6.1 vendor 内核、Debian 或 Ubuntu 根文件
系统，以及加入 R5A 板级支持的 U-Boot。本页只讲镜像**启动之后**的事情——账号、
网络、软件包、内核与 overlay；烧录步骤见[烧录镜像](/flashing)。

## 系统基线

| 项目 | 值 |
|---|---|
| 发行版 | Debian 11、Ubuntu 22.04 LTS（桌面版与服务器版） |
| 内核 | 6.1.x vendor 内核，`arch/arm64` |
| Bootloader | U-Boot 2017.09 + TPL/SPL |
| 主机名 | `tboard-r5a` |
| 默认账号 | `tboard` / `tboard`、`root` / `root` |
| 调试串口 | `ttyFIQ0`，**1500000** 波特率，8N1 |

```bash
uname -a                      # 内核版本与构建日期
cat /etc/os-release           # 发行版版本
cat /proc/device-tree/model   # 板卡型号字符串
neofetch                      # 一屏概览
```

## 调试串口

所有镜像都默认打开调试串口，它是显示输出起来之前唯一的观察手段：

```text
ttyFIQ0：1500000 8N1，无流控
```

接线与终端设置见 [UART 与串口](/uart-serial)。请保持 1500000 波特率——瑞芯微
FIQ debugger 不会跟随内核 `console=` 修改后的波特率。

## 网络

有线口首次启动即通过 DHCP 获取地址；Wi-Fi 需要先配置。

```bash
ip a                              # 所有接口与地址
nmcli dev wifi list               # 可见热点
sudo nmcli dev wifi connect <SSID> password '<密码>' ifname wlan0
sudo nmtui                        # 菜单式配置
```

有线口配置静态地址：

```bash
sudo nmcli c modify 'Wired connection 1' ipv4.address 192.168.10.13/24
sudo nmcli c modify 'Wired connection 1' ipv4.method manual
sudo nmcli c modify 'Wired connection 1' ipv4.gateway 192.168.10.1
sudo nmcli c modify 'Wired connection 1' ipv4.dns 8.8.8.8
sudo nmcli c up 'Wired connection 1'
```

必须先设 `ipv4.address`，再设 `ipv4.method manual`，否则连接会退回 DHCP。
`<SSID>` 与示例地址请按实际网络替换。修改主机名：

```bash
sudo hostnamectl set-hostname my-gateway
```

## 软件包与镜像源

```bash
sudo apt update
sudo apt upgrade
```

官方镜像指向厂商镜像源。如果所在网络访问不了，可把 `/etc/apt/sources.list`
（Debian）或 `/etc/apt/sources.list.d/*.list`（Ubuntu）中相同发行版的地址换成
本地镜像源，再执行一次 `sudo apt update`。

瑞芯微用户态库（MPP、RGA、NPU 运行时）已预装，请勿删除 `libmpp*`、`librga*`
与 `librknnrt`，多媒体与 AI 示例都依赖它们。

## 设备树与 overlay

板级设备树位于 `/boot/dtb/rockchip/`，当前生效的文件软链接为
`/boot/dtb/rk-kernel.dtb`。40-pin 功能、摄像头、屏幕、风扇等可选硬件通过
overlay 启用，而**配置文件取决于启动的是哪一类镜像**：

| 镜像类型 | 配置文件 | overlay 目录 | 写法 |
|---|---|---|---|
| TBoard SDK 镜像 | `/boot/uEnv/uEnv.txt` | `/boot/dtb/overlay/` | `dtoverlay=/dtb/overlay/<名称>.dtbo`，一行一个 |
| Armbian 镜像 | `/boot/armbianEnv.txt` | `/boot/dtb/rockchip/overlay/` | `overlays=<名称> <名称>`，写在一行 |
| Ubuntu-rockchip 镜像 | `/boot/firmware/ubuntEnv.txt` | `/boot/firmware/dtbs/rockchip/overlay/` | `overlays=<名称> <名称>`，写在一行 |

SDK 镜像去掉行首 `#`，其他镜像把名称加进 `overlays=`，然后 `sync` 并重启：

```bash
sudo vi /boot/uEnv/uEnv.txt
sync
sudo reboot
```

断电前务必 `sync`——`uEnv.txt` 未同步会让板卡无法启动。各接口对应的 overlay
名称列在接口页面中，规则是一致的：同一个控制器只能选一种引脚复用，例如
`uart3-m1` **或** `uart3-m2`。

## 内核升级

两种方式：

```bash
# 1. 使用 SDK 编译出的 deb 包
sudo dpkg -i linux-image-*.deb linux-headers-*.deb
sudo reboot

# 2. 直接替换启动分区上的文件
./build.sh kernel      # 在编译主机执行，再把 extboot.img / dtb 拷到板卡
```

升级前请把旧内核与 `rk-kernel.dtb` 备份到其他分区或 SD 卡——新内核进不了用户态
时，串口是唯一的恢复途径。

## 存储

```bash
lsblk                # 设备与分区
df -h                # 各文件系统剩余空间
```

根文件系统在首次启动时扩展到介质全部容量。默认镜像中 `/var/log` 是 zram 设备，
好处是不磨损 eMMC，代价是重启后日志丢失；长期运行的设备请改为真实分区。

## 硬件加速

| 单元 | 软件 | 验证方式 |
|---|---|---|
| NPU（6 TOPS） | `librknnrt`，主机侧 RKNN-Toolkit2 | `cat /sys/kernel/debug/rknpu/version` |
| GPU（Mali-G610） | Panfrost / 厂商驱动、OpenGL ES、Vulkan | `glxinfo -B`、`vulkaninfo` |
| VPU | MPP、GStreamer `mpp*` 插件、带 `rkmpp` 的 FFmpeg | `gst-inspect-1.0 mppvideodec` |

只有用与板端匹配的 RKNN-Toolkit2 版本、目标平台选 `rk3588` 转换出的模型才能
加载。版本不匹配时表现为 `rknn_init failed` 并提示 `invalid model`。

## 运行状态观察

```bash
htop                     # 各核负载
cat /proc/cpuinfo        # 核心列表与特性
cat /sys/class/thermal/thermal_zone0/temp   # SoC 温度，毫摄氏度
sudo cat /sys/kernel/debug/clk/clk_summary  # 时钟树，调频时使用
```

## 相关页面

- [固件与镜像](/firmware-images) — 该装哪个镜像。
- [首次启动](/first-boot) — 登录与首轮检查。
- [SDK 与源码](/sdk-sources) — 自己编译镜像。
- [UART 与串口](/uart-serial) — 恢复用控制台。
- [其他](/others) — 板卡信息、文件传输、RTC 与看门狗。

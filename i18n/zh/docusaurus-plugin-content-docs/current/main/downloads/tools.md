---
title: "工具与驱动"
sidebar_label: "工具"
sidebar_position: 5
slug: "/tools"
---

# 工具与驱动

![烧录工具链总览占位图 960 x 540 px](/img/placeholder-960x540.png)

> 图片占位：**960 × 540 px**（建议用途：构建 / 下载流程图）。后期请替换为
> 相同尺寸的真实图片。

下面这些工具都放在 [TBoard 网盘](https://drive.google.com/drive/folders/1x2KOX1F4-DVyyV_9qfdH28PWIORcWH56)
的 **开发工具** 目录中，多为免安装压缩包，解压即用。

## Windows 工具

| 工具 | 可执行文件 | 用途 |
|---|---|---|
| RK Driver Assistant | `DriverInstall.exe` | Maskrom / Loader 模式的 USB 驱动，重装前先卸载旧驱动 |
| RKDevTool | `RKDevTool.exe` | 烧录 `update.img` 到 eMMC、烧录单分区、擦除 SPI NOR |
| SDDiskTool | `SD_Firmware_Tool.exe` | 以 *SD Boot* 模式把瑞芯微镜像写入 microSD |
| SDCardFormatter | `SDCardFormatterv5_WinEN.exe` | 修复烧录工具已无法识别的存储卡 |
| FactoryTool | `FactoryTool.exe` | 量产批量烧录 |
| SN / MAC 写入工具 | 厂商工具 | 在 vendor 分区写入序列号与 MAC |
| CH340 驱动 | `CH341SER.EXE` | 调试串口常用的 USB 转串口芯片 |
| MobaXterm | 免安装 | 串口终端与 SSH 客户端二合一 |

烧录工具一律**以管理员身份运行**。如果 RKDevTool 报 `Download Boot Fail`，
原因基本是线材、USB HUB 或机箱前置口——换后置口和最短的线再试。

## Linux 与 macOS

| 工具 | 用途 |
|---|---|
| `upgrade_tool`（瑞芯微） | 在 Linux 主机上通过 USB 烧录 `update.img` |
| `rkdeveloptool` | 完成同样工作的开源替代 |
| `dd` / `xzcat` | 写入 microSD 镜像 |
| balenaEtcher | 跨平台 microSD 烧录，带校验 |

`upgrade_tool` 位于 SDK 的 `tools/linux/Linux_Upgrade_Tool/`：

```bash
sudo ./upgrade_tool ld                     # 查看已连接设备与工作模式
sudo ./upgrade_tool uf update.img          # 烧录并重启
sudo ./upgrade_tool uf update.img -noreset # 烧录后保持在 Loader 模式
```

`ld` 会打印 `Mode=Maskrom` 或 `Mode=Loader`。如果什么都没列出，说明板卡没进
烧录模式，或使用的 USB 线只能供电、不能传数据。

## 进入烧录模式

| 模式 | 进入方式 | 适用场景 |
|---|---|---|
| Maskrom | 上电时把 **Maskrom** 引脚短接到 GND | eMMC 为空或 bootloader 损坏 |
| Loader | 上电时把 **Loader**/Recovery 引脚短接到 GND | 常规升级，或在系统中执行 `reboot loader` |
| ADB | 系统已启动且打开 USB 调试 | RKDevTool 可把 ADB 设备切到 Rockusb |

烧录需要**两路**连接：PC 到 USB 3.0 口的 USB A-to-A 数据线，以及接入
**PWR IN** 的 Type-C 电源。

## 擦除 SPI NOR（最后手段）

SPI flash 中残留的启动数据会导致新镜像起不来：

1. 在 RKDevTool 打开 **Advanced**，加载 `MiniLoaderAll.bin`，点击 **Download**。
2. 存储选择 **SPINOR**，点击 **Switch Storage**，再点 **Erase All**。
3. 重新上电进入 Maskrom，再次烧录 `update.img`。

## 镜像与工具的对应关系

| 镜像 | 工具 |
|---|---|
| microSD 用的 `*.img` / `*.img.xz` | balenaEtcher、Win32DiskImager、`dd` |
| eMMC 用的 `update.img` | RKDevTool（Windows）或 `upgrade_tool`（Linux） |
| 调试用单分区 | RKDevTool 的 **Advanced** 页、`upgrade_tool di -p` |

## 相关页面

- [固件与镜像](/firmware-images) — 该下载哪个镜像。
- [烧录镜像](/flashing) — 完整烧录流程。
- [USB](/usb) — 接口、线材与供电预算。
- [UART 与串口](/uart-serial) — 串口板接线方法。

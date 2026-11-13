---
title: "USB"
sidebar_label: "USB"
sidebar_position: 7
slug: "/usb"
---

# USB

TBoard 板卡提供 USB 主机口（USB 3.0 / USB 2.0）和一个 USB Type-C 供电口。接口
数量、连接器类型、以及哪一个口同时兼作 OTG / 烧录口，由板卡决定——请查看
Boards 下对应板卡的页面。

## 确认设备

```bash
lsusb                          # USB 总线上的设备树
lsusb -t                       # 每个设备的速度与驱动
dmesg -w                       # 插拔设备时观察枚举过程
```

在 `lsusb` 中能看到、但没有任何驱动绑定的设备，会在 `dmesg -w` 中表现为
`new high-speed USB device … Product: …` 之后没有 interface 绑定——装对应内核
模块即可。

## 供电预算

请使用板卡规格中推荐的适配器。以下规则适用于所有板卡：

- USB 2.0 口 500 mA，USB 3.0 口 900 mA。
- 机械硬盘、4G 模块以及多个大电流设备需要**带电源的 HUB**，否则供电跌落会导致
  板卡在负载下重启。
- 板卡支持宽电压输入（通常为 5 V – 23 V）时，用固定电压的 12 V / 20 V USB-C
  电源也可以，输入电流更小——但板卡不做 PD 协商，请使用固定电压输出的电源。
- Type-C 供电接入时，不要再从 40-pin 排针反向灌入 5 V。

## 传输速率

USB 3.0 口连接 SoC 的 USB 3.0 控制器，配合支持 UAS 的固态硬盘可达
400–450 MB/s。如果速率只有约 35 MB/s，用 `lsusb -t` 看是 `uas` 还是
`usb-storage`：后者说明 UAS 未启用。个别硬盘盒与 UAS 不兼容，可以在内核命令行
加 `usb-storage.quirks` 针对该设备关闭 UAS。

## 通过 USB 烧录

瑞芯微板卡通过 USB OTG 口烧录 eMMC：

1. 断电，用对应的线把板卡的烧录口接到 PC（哪个口、用什么线请查对应板卡页面）。
2. 进入 Maskrom 或 Loader 模式（见[工具与驱动](/tools)）。
3. 用 RKDevTool 或 `upgrade_tool` 烧录。
4. 拔线，重新上电。

烧录时不要经过 USB HUB 或机箱前置口，`Download Boot Fail` 基本都是线材或 HUB
引起的。

## 相关页面

- [烧录镜像](/flashing) — 完整流程。
- [工具与驱动](/tools) — USB 驱动与烧录工具。

---
title: "首次开机"
sidebar_label: "首次上电"
sidebar_position: 5
slug: "/first-boot"
---

# 首次开机

## 上电

把 5 V / 3 A 适配器接到 **PWR IN** 的 Type-C 口。红色电源指示灯常亮表示供电
正常；绿色用户指示灯默认熄灭，系统启动后可由软件控制。

板卡优先从 eMMC 启动，其次 microSD。首次启动会展开根文件系统，可能需要约
一分钟。

## 登录系统

默认账户：

| 账户 | 密码 | 说明 |
|---|---|---|
| `tboard` | `tboard` | 普通用户 |
| `root` | `root` | 超级管理员 |

**用调试串口**：调试串口在 40-pin 排针的 **Pin 8（TX）/
Pin 10（RX）**，GND 取 Pin 6。用 3.3 V USB 转 TTL 线连接，注意**收发交叉**：
板子的 TX（Pin 8）接串口模块的 **RX**，板子的 RX（Pin 10）接串口模块的
**TX**，GND 对 GND：

<img src="/img/r5a-serial-wiring.png" alt="调试串口接线：GND RX TX" width="700" />

串口参数：**1500000 波特率，数据位 8，无校验位，停止位 1**。串口登录成功后
进入 TBoard 欢迎界面：

<img src="/img/r5a-serial-login.png" alt="串口登录成功后的 TBoard 欢迎界面" width="700" />

**有显示器**：按[组装与连接 · 连接显示](/assembly#3-连接显示)接好 Micro HDMI
输出，上电后显示器出现登录界面：

<img src="/img/r5a-hdmi-login.png" alt="HDMI 显示器上的登录界面" width="700" />

输入密码登录后进入 Debian 桌面：

<img src="/img/r5a-hdmi-desktop.png" alt="HDMI 显示器上的 Debian 桌面" width="700" />

## 开机自检

```bash
uname -a                      # 内核版本
ifconfig                      # 以太网是否拿到 DHCP 地址
ping -c3 docs.tboard.org      # 外网连通性
```

以太网接口名为 **`enP4p65s0`**（PCIe 上的 Realtek RTL8111/8168），不是 `eth0`；
NetworkManager 默认有线配置名为 "Wired connection 1"，手动拉起可用
`nmcli con up "Wired connection 1"`。`ip a` 与 `nmcli dev status` 都能看到真实
接口名。

## 无法启动时

- 检查启动介质——eMMC 中无可引导系统时才会落到卡槽的 microSD。
- 看串口是否有 U-Boot 输出；完全没有输出通常是供电或接线问题。
- 重新烧录后再试——见[烧录镜像](/flashing)。

## 相关页面

- [UART 与串口](/uart-serial)
- [基础编译](/basic-compile) — 编译第一个程序。

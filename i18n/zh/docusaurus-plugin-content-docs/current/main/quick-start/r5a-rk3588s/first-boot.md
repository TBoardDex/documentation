---
title: "首次开机"
sidebar_label: "首次上电"
sidebar_position: 5
slug: "/first-boot"
---

# 首次开机

![首次开机串口截图占位图 800 x 450 px](/img/placeholder-800x450.png)

> 图片占位：**800 × 450 px**（建议用途：操作照片 / 截图）。后期请替换为
> 相同尺寸的真实图片。

## 上电

把 5 V / 3 A 适配器接到 **PWR IN** 的 Type-C 口。红色电源指示灯常亮表示供电
正常；绿色用户指示灯默认熄灭，系统启动后可由软件控制。

板卡优先从 eMMC 启动，其次 microSD。首次启动会展开根文件系统，可能需要约
一分钟。

## 登录系统

**用调试串口**：调试串口在 40-pin 排针的 **Pin 8（TX）/
Pin 10（RX）**，GND 取 Pin 6。用 3.3 V USB 转 TTL 线连接，注意**收发交叉**：
板子的 TX（Pin 8）接串口模块的 **RX**，板子的 RX（Pin 10）接串口模块的
**TX**，GND 对 GND：

<img src="/img/r5a-serial-wiring.png" alt="调试串口接线：GND RX TX" width="700" />

串口参数：**1500000 波特率，数据位 8，无校验位，停止位 1**。

默认账户（首次登录后请立即修改密码）：

| 账户 | 密码 | 说明 |
|---|---|---|
| `tboard` | `tboard` | 普通用户 |
| `root` | `root` | 超级管理员 |

登录成功后进入 TBoard 欢迎界面：

<img src="/img/r5a-serial-login.png" alt="串口登录成功后的 TBoard 欢迎界面" width="700" />

**有显示器**：桌面会话自动启动，直接登录即可。

## 开机自检

```bash
uname -a                      # 内核版本
ifconfig                      # 以太网是否拿到 DHCP 地址
ping -c3 docs.tboard.org      # 外网连通性
```

## 无法启动时

- 检查启动介质——eMMC 中无可引导系统时才会落到卡槽的 microSD。
- 看串口是否有 U-Boot 输出；完全没有输出通常是供电或接线问题。
- 重新烧录后再试——见[烧录镜像](/flashing)。

## 相关页面

- [UART 与串口](/uart-serial)
- [基础编译](/basic-compile) — 编译第一个程序。

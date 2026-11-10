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

板卡优先从 microSD 启动，其次 eMMC。首次启动会展开根文件系统，可能需要约
一分钟。

## 登录系统

**有显示器**：桌面会话自动启动。

**用串口**（无显示器场景推荐）：3.3 V USB 转 TTL 接 Pin 8 / Pin 10，
**1500000 波特率，8N1，无流控**：

```bash
sudo picocom -b 1500000 /dev/ttyUSB0
```

使用镜像发布说明中给出的默认账户登录（不同镜像默认账户不同；首次登录后请
立即修改密码）。

## 开机自检

```bash
uname -a                      # 内核版本
ls /dev/video* /dev/i2c-*     # 接口节点是否可见
ip a                          # 以太网是否拿到 DHCP 地址
ping -c3 docs.tboard.org      # 外网连通性
```

## 无法启动时

- 检查启动顺序——卡槽里的旧 microSD 会优先于 eMMC 启动。
- 看串口是否有 U-Boot 输出；完全没有输出通常是供电或接线问题。
- 重新烧录后再试——见[烧录镜像](/flashing)。

## 相关页面

- [UART 与串口](/uart-serial)
- [基础编译](/basic-compile) — 编译第一个程序。
